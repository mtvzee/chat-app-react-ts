import dayjs from 'dayjs';
import { doc, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { AuthContext } from '../context/AuthContext';
import { SelectedUserContext } from '../context/SelectedUserContext';
import { db } from '../firebase';
import Avatar from './Avatar';
import FriendDeleteModal from './FriendDeleteModal';

type FriendListData = {
  [key: string]: {
    friendInfo: {
      displayName: string;
      photoURL: string;
      uid: string;
    };
    latestMessage: string;
    timestamp: Timestamp;
  };
};

const FriendList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [friendList, setFriendList] = useState<FriendListData>({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(SelectedUserContext);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, `friendList/${currentUser?.uid}`),
      (snapshot) => {
        setFriendList(snapshot.data() ?? {});
      }
    );
    return unsub;
  }, [currentUser?.uid]);

  return (
    <ul className="overflow-y-scroll">
      {Object.entries(friendList).map((friend) => (
        <li
          className="flex justify-evenly space-x-2 rounded-md py-3 hover:bg-primary-hover cursor-pointer relative group transition"
          key={friend[0]}
          onClick={() =>
            dispatch({ type: 'CHANGE_USER', payload: friend[1].friendInfo })
          }
        >
          <Avatar src={friend[1].friendInfo.photoURL} />
          <div className="flex-auto">
            <span className="text-lg">{friend[1].friendInfo.displayName}</span>
            <p className="text-sm">{friend[1].latestMessage}</p>
          </div>
          <span className="text-sm">
            {dayjs(friend[1]?.timestamp.toDate()).format('YYYY/MM/DD HH:mm:ss')}
          </span>
          <button
            className="absolute bottom-2 right-2 hidden group-hover:block hover:scale-110 hover:text-red-500 transition"
            onClick={() => setIsOpen(true)}
          >
            <BsTrashFill className="w-4 h-4" />
          </button>
          {isOpen && <FriendDeleteModal setIsOpen={setIsOpen} />}
        </li>
      ))}
    </ul>
  );
};

export default FriendList;
