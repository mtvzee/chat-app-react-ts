import { signOut } from 'firebase/auth';
import { useContext, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import Avatar from './Avatar';

const SidebarHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="relative flex items-center justify-between border-b border-[#263d54] py-4 ">
      <div className="flex items-center space-x-3 ">
        <Avatar width={40} height={40} src={currentUser?.photoURL ?? ''} />
        <span className="text-xl">{currentUser?.displayName}</span>
      </div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <BsThreeDotsVertical className="w-6 h-6 hover:scale-110 transition " />
      </button>
      {isOpen && (
        <ul className="absolute top-16 right-0 w-52 bg-black border border-gray-600 rounded-md overflow-hidden z-10">
          <li
            className="p-3 hover:bg-primary-hover transition"
            onClick={() => signOut(auth)}
          >
            ログアウト
          </li>
        </ul>
      )}
    </div>
  );
};

export default SidebarHeader;
