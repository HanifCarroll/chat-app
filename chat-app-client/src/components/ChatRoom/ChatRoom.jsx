import moment from "moment";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { ChatRoomSideBar, MessageList, ChatInput, ChatHeader } from "../";
import './styles.scss';

const BOT_NAME = 'Chat Bot';

export const ChatRoom = ({ username, room, setRoomUsers, roomUsers, setRoom, setIsJoined }) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const onMessageInputChange = event => {
    setMessage(event.target.value);
  };
  const sendMessage = () => {
    socket.emit('room.chat', message);
    setMessage('');
    messageInputRef.current.focus();
  };
  const newChatMessage = (msg) => {
    const { message, username } = msg;
    const newMessage = {
      text: message,
      username,
      time: moment().format('h:mm:ss a')
    };
    setMessages(messages => [...messages, newMessage]);
  };

  const leaveRoom = () => {
    setRoom({ displayName: '', value: '' });
    setIsJoined(false);
  };

  useEffect(() => {
    const newSocket = io('ws://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('room.join', { username, room });

    newSocket.on('room.chat', (newMessage) => {
      newChatMessage(newMessage);
    });

    newSocket.on('room.welcome', message => {
      newChatMessage({ username: BOT_NAME, message });
    });

    newSocket.on('room.join', message => {
      newChatMessage({ username: BOT_NAME, message });
    });

    newSocket.on('room.leave',  message => {
      newChatMessage({ username: BOT_NAME, message });
    });

    newSocket.on('room.users', ({ room, users }) => {
      setRoomUsers(users);
    })

    return () => {
      newSocket.close();
    }
  }, [setSocket]);

  return (
      <div className="App">
        <div className='chat-container'>
          <ChatHeader leaveRoom={leaveRoom} room={room}/>
          <div className='user-message-container'>
            <ChatRoomSideBar users={roomUsers}/>
            <MessageList messages={messages} />
          </div>
          <ChatInput
              sendMessage={sendMessage}
              message={message}
              onMessageInputChange={onMessageInputChange}
              inputRef={messageInputRef}
          />
        </div>
      </div>
  );
}
