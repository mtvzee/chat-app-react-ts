import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const ChatHeader = () => {
  return (
    <header className="flex-none bg-[#f3f3f3] flex  items-center space-x-2 h-20 border-b">
      <button className="hover:scale-110 transition">
        <MdOutlineArrowBackIosNew className="w-8 h-8" />
      </button>
      <h1 className="text-2xl">takuya</h1>
    </header>
  );
};

export default ChatHeader;
