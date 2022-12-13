import dayjs from 'dayjs';
import { useState } from 'react';
import { Content } from '../types/type';
import DeleteContentModal from './DeleteContentModal';

type Props = Omit<Content, 'avatarURL' | 'autoId' | 'senderId'>;

const UserContent = ({ type, photoURL, text, timestamp }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-end self-end space-x-1 w-2/3 text-justify group">
      <div className="self-end text-sm">
        <button
          className="group-hover:block hidden ml-auto"
          onClick={() => setIsOpen(true)}
        >
          削除
        </button>
        <span>{dayjs(timestamp?.toDate()).format('HH:mm')}</span>
      </div>
      {type === 'TEXT' ? (
        <p className="bg-[#93ed53] p-2 rounded-lg rounded-tr-none text-lg ">
          {text}
        </p>
      ) : (
        <div className="w-[200px] h-[200px]">
          <img src={photoURL} alt="photo" />
        </div>
      )}
      {isOpen && <DeleteContentModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default UserContent;
