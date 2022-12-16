import dayjs from 'dayjs';
import { Content } from '../types/type';
import Avatar from './Avatar';

type Props = Omit<Content, 'autoId' | 'senderId' | 'imageUUID'>;

const FriendContent = ({
  type,
  text,
  timestamp,
  avatarURL,
  photoURL,
}: Props) => {
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
          src={photoURL ?? ''}
          alt="photo"
          className="w-[200px] h-[200px] object-cover"
        />
      )}
      <div className="self-end text-sm">
        <span>{dayjs(timestamp?.toDate()).format('HH:mm')}</span>
      </div>
    </div>
  );
};

export default FriendContent;
