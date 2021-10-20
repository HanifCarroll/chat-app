import moment from "moment";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { ChatRoomUserList, MessageList } from "../";
import './styles.scss';

const BOT_NAME = 'Chat Bot';
const users = ['Me', 'You']
export const ChatRoom = ({ username, room, setRoomUsers, roomUsers }) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const onMessageInputEnter = event => {
    if (event.which === 13) {
      sendMessage();
    }
  };
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
        <input type="text"
               onChange={onMessageInputChange}
               value={message}
               ref={messageInputRef}
               onKeyDown={onMessageInputEnter}
        />
        <button onClick={sendMessage}>Send</button>
        <div className='chat-container'>
          <ChatRoomUserList users={roomUsers}/>
          <MessageList messages={messages} />
        </div>
      </div>
  );
}
