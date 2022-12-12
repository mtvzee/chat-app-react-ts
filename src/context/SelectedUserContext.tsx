import { createContext, ReactNode, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';

type State = {
  chatId: string;
  friendInfo: {
    displayName: string;
    photoURL: string;
    uid: string;
  } | null;
};
type Action = {
  type: 'CHANGE_USER';
  payload: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
};

const initialState = {
  chatId: 'null',
  friendInfo: null,
};

export const SelectedUserContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<Action>;
  }
);

export const SelectedUserContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { currentUser } = useContext(AuthContext);
  const reducer = (state: State, action: Action): State => {
    if (!currentUser) return state;
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          friendInfo: action.payload,
          chatId:
            currentUser?.uid > action.payload.uid
              ? currentUser?.uid + action.payload.uid
              : action.payload.uid + currentUser?.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SelectedUserContext.Provider value={{ state, dispatch }}>
      {children}
    </SelectedUserContext.Provider>
  );
};
