import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useContext } from 'react';
import { SelectedUserContext } from '../context/SelectedUserContext';
import { db, storage } from '../firebase';

type Props = {
  autoId: string;
  imageUUID: string;
  text?: string;
  photoURL?: string;
  senderId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteContentModal = ({
  autoId,
  imageUUID,
  text,
  photoURL,
  senderId,
  setIsOpen,
}: Props) => {
  const { state } = useContext(SelectedUserContext);
  const handleDelete = async () => {
    // firestoreから投稿削除
    await deleteDoc(doc(db, `chats/${state.chatId}/messages/${autoId}`));
    // 削除対象が画像の場合、cloud storageから削除
    if (photoURL) {
      const deleteRef = ref(storage, `image/${senderId}/${imageUUID}`);
      await deleteObject(deleteRef);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-md w-[400px] h-[280px] flex flex-col items-center justify-center space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg">削除しますか？</h2>
        {text && <p className="text-lg">{text}</p>}
        {photoURL && (
          <img
            src={photoURL}
            alt="photo"
            className="w-[100px] h-[100px] object-cover"
          />
        )}
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

export default DeleteContentModal;
