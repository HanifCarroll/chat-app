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
      <div className="join-chat-container">
        <input
            type="text"
            value={username}
            onChange={onUsernameInputChange}
        />
        <select onChange={onRoomChange} value={room}>
          {CHAT_ROOMS.map(chatRoom =>
              <option key={chatRoom.value} value={chatRoom.value}>{chatRoom.displayName}</option>)}
        </select>
        <button onClick={joinRoom}>Join</button>
      </div>
  );
}
