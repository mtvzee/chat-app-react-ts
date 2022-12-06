import { BsThreeDotsVertical } from 'react-icons/bs';
import Avatar from './Avatar';

const SidebarHeader = () => {
  return (
    <div className="flex items-center justify-between border-b border-[#263d54] py-4 ">
      <div className="flex items-center space-x-3 ">
        <Avatar width={40} height={40} />
        <span className="text-xl">takuya</span>
      </div>
      <button className="relative">
        <BsThreeDotsVertical className="w-6 h-6 hover:scale-110 transition " />
        <ul className="absolute top-10 right-0 w-52 bg-[#071d34] border border-white rounded-md overflow-hidden z-10">
          <li className="p-3 hover:bg-[#283d55] border-b border-white">
            プロフィールを変更
          </li>
          <li className="p-3 hover:bg-[#283d55]">ログアウト</li>
        </ul>
      </button>
    </div>
  );
};

export default SidebarHeader;
