import './styles.scss';
import { useRef } from "react";

export const ChatInput = ({ sendMessage, message, onMessageInputChange, inputRef }) => {
  const onMessageInputEnter = event => {
    if (event.which === 13) {
      sendMessage();
    }
  };

  return (
      <div className='chat-input-container'>
        <input type="text"
               className='chat-input'
               onChange={onMessageInputChange}
               value={message}
               ref={inputRef}
               onKeyDown={onMessageInputEnter}
        />
        <button className='chat-input-send' onClick={sendMessage}>Send</button>
      </div>
  );
}
