import { Timestamp } from 'firebase/firestore';

export type Content = {
  type: string;
  autoId: string;
  imageUUID: string;
  senderId: string;
  avatarURL: string;
  photoURL?: string;
  text?: string;
  timestamp: Timestamp;
};
