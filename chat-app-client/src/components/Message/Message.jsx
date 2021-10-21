import './styles.scss';


export const Message = ({ text, username, time }) => {
  return (
      <div className="message">
        <div className="message-header">
          <span className="message-username">{username}</span>
          <span className="message-time">{time}</span>
        </div>
        <div className="message-text">
          {text}
        </div>
      </div>
  );
};
