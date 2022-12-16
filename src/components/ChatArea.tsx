import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SelectedUserContext } from '../context/SelectedUserContext';
import { db } from '../firebase';
import { Content } from '../types/type';
import FriendContent from './FriendContent';
import UserContent from './UserContent';

const ChatArea = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(SelectedUserContext);
  const endOfContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, `chats/${state.chatId}/messages`),
      orderBy('timestamp')
    );
    const unsub = onSnapshot(q, (snapshot) =>
      setContents(
        snapshot.docs.map((doc: DocumentData) => ({
          ...doc.data(),
          autoId: doc.id,
        }))
      )
    );
    return unsub;
  }, [state]);

  useEffect(() => {
    endOfContentsRef.current?.scrollIntoView();
  }, [contents]);

  return (
    <div className="flex-auto overflow-y-scroll">
      <div className="w-[90%] mx-auto flex flex-col space-y-3 py-3 ">
        {contents.map((content) =>
          content.senderId === currentUser?.uid ? (
            <UserContent
              key={content.autoId}
              autoId={content.autoId}
              imageUUID={content.imageUUID}
              senderId={content.senderId}
              type={content.type}
              photoURL={content.photoURL}
              text={content.text}
              timestamp={content.timestamp}
            />
          ) : (
            <FriendContent
              key={content.autoId}
              type={content.type}
              avatarURL={content.avatarURL}
              photoURL={content.photoURL}
              text={content.text}
              timestamp={content.timestamp}
            />
          )
        )}
        <div ref={endOfContentsRef} />
      </div>
    </div>
  );
};

export default ChatArea;
