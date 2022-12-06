import { AiOutlineSend } from 'react-icons/ai';
import { HiOutlinePhotograph } from 'react-icons/hi';

const ChatForm = () => {
  return (
    <form className="flex-none bg-[#f3f3f3] h-20 flex items-center justify-center space-x-4">
      <input
        className="w-2/3 py-4 px-8 rounded-full outline-none"
        type="text"
        placeholder="メッセージを入力..."
      />
      <input type="file" id="file" style={{ display: 'none' }} />
      <label
        className="hover:scale-110 transition cursor-pointer"
        htmlFor="file"
      >
        <HiOutlinePhotograph className="w-8 h-8" />
      </label>
      <button className="hover:scale-110 transition">
        <AiOutlineSend className="w-8 h-8" />
      </button>
    </form>
  );
};

export default ChatForm;
