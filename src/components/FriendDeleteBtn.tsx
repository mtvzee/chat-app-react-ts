import { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import FriendDeleteModal from './FriendDeleteModal';

type Props = {
  chatId: string;
  displayName: string;
  photoURL: string;
};

const FriendDeleteBtn = ({ chatId, displayName, photoURL }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  return (
    <>
      <button
        className="absolute bottom-2 right-2 hidden group-hover:block hover:scale-110 hover:text-red-500 transition"
        onClick={(e) => handleClick(e)}
      >
        <BsTrashFill className="w-4 h-4" />
      </button>
      {isOpen && (
        <FriendDeleteModal
          chatId={chatId}
          friendName={displayName}
          photoURL={photoURL ?? ''}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default FriendDeleteBtn;
