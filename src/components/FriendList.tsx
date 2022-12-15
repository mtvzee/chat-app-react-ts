import dayjs from 'dayjs';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SelectedUserContext } from '../context/SelectedUserContext';
import { db } from '../firebase';
import Avatar from './Avatar';
import FriendDeleteBtn from './FriendDeleteBtn';

type FriendListData = {
  [key: string]: {
    friendInfo: {
      displayName: string;
      photoURL: string;
      uid: string;
    };
    latestContent: string;
    timestamp: Timestamp;
  };
};

const FriendList = () => {
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
      {Object.entries(friendList)
        .sort((a, b) => b[1].timestamp?.seconds - a[1].timestamp?.seconds)
        .map((friend) => (
          <li
            className="flex justify-evenly space-x-2 rounded-md py-3 hover:bg-primary-hover cursor-pointer relative group transition"
            key={friend[0]}
            onClick={() =>
              dispatch({ type: 'CHANGE_USER', payload: friend[1].friendInfo })
            }
          >
            <Avatar src={friend[1].friendInfo.photoURL} />
            <div className="flex-auto">
              <span className="text-lg">
                {friend[1].friendInfo.displayName}
              </span>
              <p className="text-sm">{friend[1].latestContent}</p>
            </div>
            <span className="text-sm text-gray-500">
              {dayjs(friend[1]?.timestamp?.toDate()).format('HH:mm')}
            </span>
            <FriendDeleteBtn
              chatId={friend[0]}
              displayName={friend[1].friendInfo.displayName}
              photoURL={friend[1].friendInfo.photoURL}
            />
          </li>
        ))}
    </ul>
  );
};

export default FriendList;
