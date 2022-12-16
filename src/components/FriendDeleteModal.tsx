import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import Avatar from './Avatar';

type Props = {
  chatId: string;
  friendName: string;
  photoURL: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FriendDeleteModal = ({
  chatId,
  friendName,
  photoURL,
  setIsOpen,
}: Props) => {
  const { currentUser } = useContext(AuthContext);
  const handleDelete = async () => {
    await updateDoc(doc(db, `friendList/${currentUser?.uid}`), {
      [chatId]: deleteField(),
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white text-black rounded-md w-[400px] h-[280px] flex flex-col items-center justify-center space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg">友達を削除しますか？</h2>
        <div className="flex items-center space-x-6">
          <Avatar width={60} height={60} src={photoURL ?? ''} />
          <p className="text-2xl">{friendName}</p>
        </div>
        <div className="space-x-4">
          <button
            className="w-40 border border-black rounded-md py-2 hover:scale-105 transition"
            onClick={() => setIsOpen(false)}
          >
            キャンセル
          </button>
          <button
            className="w-40 rounded-md py-2.5 bg-red-500 text-white hover:scale-105 transition"
            onClick={handleDelete}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendDeleteModal;
