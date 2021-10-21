import './styles.scss';

const CHAT_ROOMS = [
  {
    displayName: 'Room 1',
    value: 'room1',
  },
  {
    displayName: 'Room 2',
    value: 'room2',
  },
  {
    displayName: 'Room 3',
    value: 'room3',
  },
  {
    displayName: 'Room 4',
    value: 'room4',
  },
];

export const JoinChat = ({ username, setUsername, setIsJoined, room, setRoom }) => {
  const onUsernameInputChange = event => setUsername(event.target.value);
  const joinRoom = () => setIsJoined(true);
  const onRoomChange = event => setRoom(event.target.value);

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
                <option key={chatRoom.value} value={chatRoom.value}>{chatRoom.displayName}</option>)}
          </select>
        </div>
        <div className="join-room-button-container">
          <button className='join-room-button' onClick={joinRoom}>Join</button>
        </div>
      </div>
  );
}
