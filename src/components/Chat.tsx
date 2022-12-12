import { useContext } from 'react';
import { SelectedUserContext } from '../context/SelectedUserContext';
import ChatArea from './ChatArea';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';
import DefaultChatArea from './DefaultChatArea';

const Chat = () => {
  const { state } = useContext(SelectedUserContext);
  console.log(state);

  return (
    <>
      {state.friendInfo ? (
        <div className="flex-auto flex flex-col">
          <ChatHeader />

          <ChatArea />

          <ChatForm />
        </div>
      ) : (
        <DefaultChatArea />
      )}
    </>
  );
};

export default Chat;
