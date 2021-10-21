import './styles.scss';

const CHAT_ROOMS = ['Room 1', 'Room 2', 'Room 3', 'Room 4'];

export const JoinChat = ({ username, setUsername, setIsJoined, room, setRoom }) => {
  const onUsernameInputChange = event => setUsername(event.target.value);
  const onRoomChange = event => {
    setRoom(event.target.value);
    console.log('event', event.target.value);
  }
  const joinRoom = () => setIsJoined(true);

  return (
      <div className='join-chat-container'>
        <div className='username-container'>
          <label htmlFor='username-input'>Username</label>
          <input
              id='username-input'
              type='text'
              value={username}
              onChange={onUsernameInputChange}
          />
        </div>
        <div className='room-container'>
          <label htmlFor="room-select">Room</label>
          <select id='room-select' onChange={onRoomChange} value={room}>
            {CHAT_ROOMS.map(chatRoom =>
                <option key={chatRoom} value={chatRoom}>{chatRoom}</option>)}
          </select>
        </div>
        <div className="join-room-button-container">
          <button className='join-room-button' onClick={joinRoom}>Join</button>
        </div>
      </div>
  );
}
