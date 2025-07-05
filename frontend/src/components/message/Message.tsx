interface MessageProps {
  type: string;
  message: string;
}

const Message = ({ type, message }: MessageProps) => {
  return (
    <div className={`message message-${type}`}>
      {message}
    </div>
  );
};

export default Message;
