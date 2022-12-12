import { useContext } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { SelectedUserContext } from '../context/SelectedUserContext';

const ChatHeader = () => {
  const { state, dispatch } = useContext(SelectedUserContext);
  return (
    <header className="flex-none bg-[#f3f3f3] flex  items-center space-x-2 h-20 border-b">
      <button
        className="hover:scale-110 transition"
        onClick={() => dispatch({ type: 'RESET_USER' })}
      >
        <MdOutlineArrowBackIosNew className="w-8 h-8" />
      </button>
      <h1 className="text-2xl">{state.friendInfo?.displayName}</h1>
    </header>
  );
};

export default ChatHeader;
