import dayjs from 'dayjs';
import { useState } from 'react';
import { Content } from '../types/type';
import DeleteContentModal from './DeleteContentModal';

type Props = Omit<Content, 'avatarURL'>;

const UserContent = ({
  type,
  autoId,
  photoURL,
  text,
  timestamp,
  imageUUID,
  senderId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-end items-end self-end space-x-1 text-justify group max-w-max">
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
        <img
          src={photoURL}
          alt="photo"
          className="w-[200px] h-[200px] object-cover"
        />
      )}
      {isOpen && (
        <DeleteContentModal
          autoId={autoId}
          imageUUID={imageUUID}
          text={text}
          photoURL={photoURL}
          senderId={senderId}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default UserContent;
