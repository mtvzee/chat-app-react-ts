import { BsTrashFill } from 'react-icons/bs';
import Avatar from './Avatar';

const FriendList = () => {
  return (
    <ul className="overflow-y-scroll">
      <li className="flex justify-evenly space-x-2 rounded-md py-3 hover:bg-[#283d55] cursor-pointer relative group transition">
        <Avatar />
        <div className="flex-auto">
          <span className="text-lg">matsutani</span>
          <p className="text-sm">hello</p>
        </div>
        <span className="text-sm">12:00</span>
        <button className="absolute bottom-2 right-2 hidden group-hover:block hover:scale-110 hover:text-red-500 transition">
          <BsTrashFill className="w-4 h-4" />
        </button>
      </li>
    </ul>
  );
};

export default FriendList;
