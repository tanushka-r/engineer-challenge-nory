interface MessageProps {
  type: string;
  message: string;
  classNames?: string;
}

const Message = ({ type, message, classNames='' }: MessageProps) => {
  return (
    <div className={`message message-${type} ${classNames}`}>
      {message}
    </div>
  );
};

export default Message;
