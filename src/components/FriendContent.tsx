import dayjs from 'dayjs';
import { useState } from 'react';
import { Content } from '../types/type';
import Avatar from './Avatar';
import DeleteContentModal from './DeleteContentModal';

type Props =  Omit<Content, 'autoId' | 'senderId'>;

const FriendContent = ({
  type,
  text,
  timestamp,
  avatarURL,
  photoURL,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-start space-x-1 w-2/3 group">
      <div className="flex-none">
        <Avatar width={40} height={40} src={avatarURL} />
      </div>
      {type === 'TEXT' ? (
        <p className="bg-[#93ed53] p-2 rounded-lg rounded-tr-none text-lg ">
          {text}
        </p>
      ) : (
        <div className="w-[200px] h-[200px] ">
          <img src={photoURL} alt="photo" />
        </div>
      )}
      <div className="self-end text-sm">
        <button
          className="group-hover:block hidden"
          onClick={() => setIsOpen(true)}
        >
          削除
        </button>
        <span>{dayjs(timestamp?.toDate()).format('HH:mm')}</span>
      </div>
      {isOpen && <DeleteContentModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default FriendContent;
