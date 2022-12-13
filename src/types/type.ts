import { Timestamp } from 'firebase/firestore';

// export type ImageContent = {
//   type: string;
//   autoId: string;
//   senderId: string;
//   avatarURL: string;
//   photoURL: string;
//   timestamp: Timestamp;
// };

// export type TextContent = {
//   type: string;
//   autoId: string;
//   senderId: string;
//   avatarURL: string;
//   text: string;
//   timestamp: Timestamp;
// };

export type Content={
  type: string;
  autoId: string;
  senderId: string;
  avatarURL: string;
  photoURL?: string;
  text?: string;
  timestamp: Timestamp;
}