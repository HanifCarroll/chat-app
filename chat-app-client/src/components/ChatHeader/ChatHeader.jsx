import './styles.scss';


export const ChatHeader = ({ leaveRoom }) => {
  return (
      <header className='chat-header'>
        <h2>My Chat App</h2>
        <button onClick={leaveRoom}>Leave Room</button>
      </header>
  );
}
