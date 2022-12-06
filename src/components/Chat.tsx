import ChatArea from './ChatArea';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';

const Chat = () => {
  return (
    <div className="flex-auto flex flex-col">
      <ChatHeader />

      <ChatArea />

      <ChatForm />
    </div>
  );
};

export default Chat;
