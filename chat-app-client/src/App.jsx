import { useState } from "react";
import { ChatRoom, JoinChat } from "./components";


function App() {
  const [username, setUsername] = useState('TestUser');
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState('room1');
  const [roomUsers, setRoomUsers] = useState([]);

  return (
      <div className="app">
        {isJoined ?
          <ChatRoom
            username={username}
            room={room}
            roomUsers={roomUsers}
            setRoomUsers={setRoomUsers}
            setIsJoined={setIsJoined}
            setRoom={setRoom}
          />
          : <JoinChat
            username={username}
            setUsername={setUsername}
            setIsJoined={setIsJoined}
            setRoom={setRoom}
            room={room}
          />
        }
      </div>
  );
}


export default App;
