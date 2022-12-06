import ChatArea from './ChatArea';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';
import DefaultChatArea from './DefaultChatArea';

const Chat = () => {
  return (
    <>
      {/* <DefaultChatArea /> */}
      <div className="flex-auto flex flex-col">
        <ChatHeader />

        <ChatArea />

        <ChatForm />
      </div>
    </>
  );
};

export default Chat;
