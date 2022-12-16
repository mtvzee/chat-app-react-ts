import {
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useContext } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import Avatar from './Avatar';

type Props = {
  displayName: string;
  photoURL: string;
  friendId: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsDummy: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchedUsers: React.Dispatch<React.SetStateAction<DocumentData[] | null>>;
};

const MatchedUser = ({
  displayName,
  photoURL,
  friendId,
  setUsername,
  setIsDummy,
  setMatchedUsers,
}: Props) => {
  const { currentUser } = useContext(AuthContext);

  const handleAddUser = async () => {
    if (currentUser) {
      // チャットIDをユーザーのID同士を結びつけて作成
      const chatId =
        currentUser.uid > friendId
          ? currentUser.uid + friendId
          : friendId + currentUser.uid;
      try {
        const res = await getDoc(doc(db, 'chats', chatId));
        if (!res.exists()) {
          // 自分のFriendListにチャットのデータを作成
          await updateDoc(doc(db, 'friendList', currentUser.uid), {
            [chatId + '.friendInfo']: {
              uid: friendId,
              displayName,
              photoURL,
            },
            [chatId + '.timestamp']: serverTimestamp(),
            [chatId + '.latestContent']: '',
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setUsername('');
        setIsDummy(false);
        setMatchedUsers(null);
      }
    }
  };

  return (
    <div
      className="flex  space-x-2 rounded-md py-3 bg-primary-hover cursor-pointer transition  relative group"
      onClick={handleAddUser}
    >
      <Avatar src={photoURL} />
      <span className="text-lg">{displayName}</span>
      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse group-hover:scale-110 transition">
        <AiOutlinePlus className="w-10 h-10" />
      </button>
    </div>
  );
};

export default MatchedUser;
