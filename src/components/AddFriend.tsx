import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { db } from '../firebase';
import MatchedUser from './MatchedUser';

const AddFriend = () => {
  const [username, setUsername] = useState('');
  const [isDummy, setIsDummy] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<DocumentData[] | null>(null);

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && handleSearchUser();
  };
  const handleSearchUser = async () => {
    try {
      // inputの中身が空欄の場合、ダミーのユーザーを表示する
      if (!username) {
        const q = query(
          collection(db, 'userInfo'),
          where('displayName', '==', 'Anonymous')
        );
        const querySnapshot = await getDocs(q);
        setMatchedUsers(
          querySnapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }))
        );
        setIsDummy(true);
      } else {
        const q = query(
          collection(db, 'userInfo'),
          where('displayName', '==', username)
        );
        const querySnapshot = await getDocs(q);
        setMatchedUsers(
          querySnapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUsername = () => {
    setUsername('');
    setIsDummy(false);
    setMatchedUsers(null);
  };

  return (
    <div>
      <div className="flex items-center py-4 space-x-3">
        <span className="flex-auto relative text-black">
          <input
            className="w-full outline-none p-2 rounded-md"
            type="text"
            placeholder="ユーザー名を入力"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e)}
          />
          {(isDummy || username) && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 transition hover:scale-110"
              onClick={handleDeleteUsername}
            >
              <RxCrossCircled className="w-6 h-6" />
            </button>
          )}
        </span>
        <button onClick={handleSearchUser} className="relative group">
          {!username && (
            <div className="invisible opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 absolute top-0 left-[40px] bg-black w-[150px] px-2 py-1  rounded-lg">
              ダミーを作成する
            </div>
          )}
          <BsFillPersonPlusFill
            className={`w-8 h-8 hover:scale-110 transition ${
              username && 'animate-pulse'
            }`}
          />
        </button>
      </div>

      {matchedUsers?.map((matchedUser) => (
        <MatchedUser
          key={matchedUser.uid}
          displayName={matchedUser.displayName}
          photoURL={matchedUser.photoURL}
          friendId={matchedUser.uid}
          setUsername={setUsername}
          setIsDummy={setIsDummy}
          setMatchedUsers={setMatchedUsers}
        />
      ))}
    </div>
  );
};

export default AddFriend;
