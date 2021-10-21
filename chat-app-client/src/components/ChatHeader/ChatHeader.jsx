import './styles.scss';


export const ChatHeader = ({ room, leaveRoom }) => {
  return (
      <header className='chat-header'>
        <div className="logo-room-container">
          <h2 className='logo'>My Chat App</h2>
          <h3 className='room'>#{room}</h3>
        </div>
        <button onClick={leaveRoom}>Leave Room</button>
      </header>
  );
}
