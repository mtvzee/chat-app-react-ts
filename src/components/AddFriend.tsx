import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
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
          id: doc.id,
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
        <input
          className="flex-auto  outline-none p-2 rounded-md text-black"
          type="text"
          placeholder="友達を追加(ユーザー名を入力)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
        />
        <button onClick={handleSearchUser}>
          <BsFillPersonPlusFill className="w-8 h-8 hover:scale-110 transition" />
        </button>
      </div>

      {matchedUsers?.map((matchedUser) => (
        <MatchedUser
          key={matchedUser.id}
          displayName={matchedUser.displayName}
          photoURL={matchedUser.photoURL}
          friendId={matchedUser.uid}
        />
      ))}
    </div>
  );
};

export default AddFriend;
