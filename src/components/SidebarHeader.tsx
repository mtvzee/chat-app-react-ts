import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Avatar from './Avatar';

const SidebarHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between border-b border-[#263d54] py-4 ">
      <div className="flex items-center space-x-3 ">
        <Avatar width={40} height={40} />
        <span className="text-xl">takuya</span>
      </div>
      <button className="relative" onClick={() => setIsOpen(!isOpen)}>
        <BsThreeDotsVertical className="w-6 h-6 hover:scale-110 transition " />
        {isOpen && (
          <ul className="absolute top-10 right-0 w-52 bg-black border border-gray-600 rounded-md overflow-hidden z-10">
            <li className="p-3 hover:bg-[#283d55] border-b border-gray-600 transition">
              プロフィールを変更
            </li>
            <li className="p-3 hover:bg-[#283d55] transition">ログアウト</li>
          </ul>
        )}
      </button>
    </div>
  );
};

export default SidebarHeader;
