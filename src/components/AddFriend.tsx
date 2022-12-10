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
  const [matchedUsers, setMatchedUsers] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState(false);

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && handleSearchUser();
  };
  const handleSearchUser = async () => {
    if (!username) return;
    const q = query(
      collection(db, 'userInfo'),
      where('displayName', '==', username)
    );
    try {
      const querySnapshot = await getDocs(q);
      setMatchedUsers(
        querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }))
      );
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <div className="flex items-center py-4 space-x-3">
        <span className="flex-auto relative text-black">
          <input
            className="w-full outline-none p-2 rounded-md"
            type="text"
            placeholder="友達を追加(ユーザー名を入力)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e)}
          />
          {username && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 transition hover:scale-110"
              onClick={() => setUsername('')}
            >
              <RxCrossCircled className="w-6 h-6" />
            </button>
          )}
        </span>
        <button onClick={handleSearchUser}>
          <BsFillPersonPlusFill className="w-8 h-8 hover:scale-110 transition" />
        </button>
      </div>

      {matchedUsers?.map((matchedUser) => (
        <MatchedUser
          key={matchedUser.uid}
          displayName={matchedUser.displayName}
          photoURL={matchedUser.photoURL}
          friendId={matchedUser.uid}
          setUsername={setUsername}
          setMatchedUsers={setMatchedUsers}
        />
      ))}
    </div>
  );
};

export default AddFriend;
