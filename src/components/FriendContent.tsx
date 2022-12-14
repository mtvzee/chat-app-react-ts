import dayjs from 'dayjs';
import { useState } from 'react';
import { Content } from '../types/type';
import Avatar from './Avatar';
import DeleteContentModal from './DeleteContentModal';

type Props = Content;

const FriendContent = ({
  type,
  autoId,
  text,
  timestamp,
  avatarURL,
  photoURL,
  senderId,
  imageUUID,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-start space-x-1 group max-w-max">
      <div className="flex-none">
        <Avatar width={40} height={40} src={avatarURL} />
      </div>
      {type === 'TEXT' ? (
        <p className="bg-[#f3f3f3] p-2 rounded-lg rounded-tl-none text-lg">
          {text}
        </p>
      ) : (
        <img
          src={photoURL}
          alt="photo"
          className="w-[200px] h-[200px] object-cover"
        />
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

export default FriendContent;
