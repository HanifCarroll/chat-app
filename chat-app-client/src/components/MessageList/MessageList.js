import { Message } from "../Message/Message";
import { useEffect, useRef } from "react";
import './styles.scss';

export const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);

  // Scroll message list to bottom when receiving a new message.
  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages])

  return (
      <div ref={messageListRef} className="message-list">
        {messages.map(message =>
          <Message
              username={message.username}
              text={message.text}
              time={message.time}
              key={message.text + message.time + message.username}
          />
        )}
      </div>
  );
};
