import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Avatar from './Avatar';

const AddFriend = () => {
  return (
    <div>
      <div className="flex items-center py-4 space-x-3">
        <input
          className="flex-auto  outline-none p-2 rounded-md text-black"
          type="text"
          placeholder="友達を追加(ユーザー名を入力)"
        />
        <button>
          <BsFillPersonPlusFill className="w-8 h-8 hover:scale-110 transition" />
        </button>
      </div>
      <div className="flex  space-x-2 rounded-md py-3 bg-[#283d55] cursor-pointer transition  relative group">
        <Avatar />
        <span className="text-lg">matsutani</span>
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse group-hover:scale-110 transition">
          <AiOutlinePlus className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default AddFriend;
