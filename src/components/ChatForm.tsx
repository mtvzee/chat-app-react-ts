import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AuthContext } from '../context/AuthContext';
import { SelectedUserContext } from '../context/SelectedUserContext';
import { db, storage } from '../firebase';

const ChatForm = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(SelectedUserContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(text || image)) return;
    try {
      if (image) {
        // 画像を送信する場合
        // cloud storageに選択した画像をアップロードして、その画像のURLをダウンロード
        const imageUUID = crypto.randomUUID();
        const imageRef = ref(storage, `image/${currentUser?.uid}/${imageUUID}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);

        // messagesサブコレクションに投稿内容を追加（画像）
        await addDoc(collection(db, 'chats', state.chatId, 'messages'), {
          type: 'IMAGE',
          senderId: currentUser?.uid,
          avatarURL: currentUser?.photoURL,
          photoURL: downloadURL,
          imageUUID,
          timestamp: serverTimestamp(),
        });

        // 自分のfriendListのデータを更新
        await updateDoc(doc(db, `friendList/${currentUser?.uid}`), {
          [state.chatId +
          '.latestContent']: `${currentUser?.displayName}が写真を送信しました`,
          [state.chatId + '.timestamp']: serverTimestamp(),
        });
        // 友達のfriendListのデータを更新
        await updateDoc(doc(db, `friendList/${state.friendInfo?.uid}`), {
          [state.chatId +
          '.latestContent']: `${currentUser?.displayName}が写真を送信しました`,
          [state.chatId + '.timestamp']: serverTimestamp(),
        });
      } else {
        // テキストを送信する場合
        // messagesサブコレクションに投稿内容を追加（テキスト）
        await addDoc(collection(db, 'chats', state.chatId, 'messages'), {
          type: 'TEXT',
          senderId: currentUser?.uid,
          avatarURL: currentUser?.photoURL,
          text,
          timestamp: serverTimestamp(),
        }); 
        
        // 自分のfriendListのデータを更新
        await updateDoc(doc(db, `friendList/${currentUser?.uid}`), {
          [state.chatId + '.latestContent']: text,
          [state.chatId + '.timestamp']: serverTimestamp(),
        });
        // 友達のfriendListのデータを更新
        await updateDoc(doc(db, `friendList/${state.friendInfo?.uid}`), {
          [state.chatId + '.latestContent']: text,
          [state.chatId + '.timestamp']: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setText('');
      setImage(null);
    }
  };

  return (
    <form
      className="flex-none bg-[#f3f3f3] h-20 flex items-center justify-center space-x-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="w-2/3 py-4 px-8 rounded-full outline-none"
        type="text"
        placeholder={image ? '画像が選択されました' : 'メッセージを入力...'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!!image}
      />
      <input
        type="file"
        id="file"
        style={{ display: 'none' }}
        accept=".jpeg, .jpg, .png"
        onChange={(e) => e.target.files && setImage(e.target.files[0])}
        // disabled={!!text}
      />
      <label
        className={`hover:scale-110 transition cursor-pointer ${
          text && 'invisible'
        }`}
        htmlFor="file"
      >
        <HiOutlinePhotograph className="w-8 h-8" />
      </label>
      <button
        className={` ${(text || image) && 'text-blue-500 animate-bounce'}`}
      >
        <AiOutlineSend className="w-8 h-8" />
      </button>
    </form>
  );
};

export default ChatForm;
