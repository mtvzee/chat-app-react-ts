import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../firebase';

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext(
  {} as {
    currentUser: User | null;
  }
);

// ログインユーザーのデータを保持する。
// また、ユーザーがログイン状態か判定するために使用する
export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value = { currentUser };

  useEffect(() => {
    // ユーザのログイン状態を監視するメソッドで、ログイン状態が変化するたびに呼ばれる
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
