import { AiOutlinePlus } from 'react-icons/ai';
import {
  BsFillPersonPlusFill,
  BsThreeDotsVertical,
  BsTrashFill,
} from 'react-icons/bs';
import Avatar from './Avatar';

const Sidebar = () => {
  return (
    <div className="flex-[0_0_350px] bg-[#071d34] text-white">
      <div className="px-4">
        <div className="flex items-center justify-between border-b border-[#263d54] py-4 ">
          {/* サイドバーのヘッダー */}
          <div className="flex items-center space-x-3 ">
            <Avatar width={40} height={40} />
            <span className="text-xl">takuya</span>
          </div>
          <button>
            <BsThreeDotsVertical className="w-6 h-6 hover:scale-110 transition" />
          </button>
        </div>

        {/* フレンドを追加 */}
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
          <div className="flex  space-x-2 rounded-md py-3 hover:bg-[#283d55] cursor-pointer transition  relative group">
            <Avatar />
            <span className="text-lg">matsutani</span>
            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block animate-pulse">
              <AiOutlinePlus className="w-10 h-10" />
            </button>
          </div>
        </div>

        {/* フレンド一覧 */}
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
      </div>
    </div>
  );
};

export default Sidebar;
