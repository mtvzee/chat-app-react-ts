import { useState } from 'react';
import Avatar from './Avatar';
import DeleteContentModal from './DeleteContentModal';

const FriendContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-start space-x-1 w-2/3 group">
      <div className="flex-none">
        <Avatar width={40} height={40} src={''} />
      </div>
      <p className="bg-[#f3f3f3] p-2 rounded-lg rounded-tl-none text-lg">
        こんにちは、私の名前は田中太郎です。よろしくお願いします。
        こんにちは、私の名前は田中太郎です。よろしくお願いします。
        こんにちは、私の名前は田中太郎です。よろしくお願いします。
      </p>
      <div className="self-end text-sm">
        <button
          className="group-hover:block hidden"
          onClick={() => setIsOpen(true)}
        >
          削除
        </button>
        <span>12:00</span>
      </div>
      {isOpen && <DeleteContentModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default FriendContent;
