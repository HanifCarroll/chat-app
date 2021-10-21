import './styles.scss';

export const ChatInput = ({ sendMessage, message, onMessageInputChange, inputRef }) => {
  const onMessageInputEnter = event => {
    if (event.which === 13) {
      event.preventDefault();
      if (message.trim()) {
        sendMessage();
      }
    }
  };

  const autoGrow = () => {
    inputRef.current.style.height = '2px';
    inputRef.current.style.height = (inputRef.current.scrollHeight)+'px';
  }

  return (
      <div className='chat-input-container'>
        <textarea
               className='chat-input'
               onChange={onMessageInputChange}
               value={message}
               ref={inputRef}
               onKeyDown={onMessageInputEnter}
               onInput={autoGrow}
        />
        <button className='chat-input-send' onClick={sendMessage}>Send</button>
      </div>
  );
}
