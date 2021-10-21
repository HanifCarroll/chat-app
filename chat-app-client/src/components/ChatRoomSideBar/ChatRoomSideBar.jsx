import './styles.scss';


export const ChatRoomSideBar = ({ users }) => {
  return (
      <div className="user-list-container">
        <ul className="user-list">
          {users.map(user => <li key={user.id}>{user.username}</li>)}
        </ul>
      </div>
  );
}
