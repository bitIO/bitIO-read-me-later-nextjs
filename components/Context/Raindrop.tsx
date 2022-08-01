import React, { useMemo } from 'react';

type Action =
  | { type: 'authSave' }
  | { type: 'authRemove' }
  | { type: 'authRefresh' };
type Dispatch = (action: Action) => void;
type State = {
  access_token: string | undefined;
  expires: number | undefined;
  expires_in: number | undefined;
  refresh_token: string | undefined;
  token_type: 'Bearer';
};
type RaindropProviderProps = { children: React.ReactNode };

const RaindropContext = React.createContext<
  { raindropDispatch: Dispatch; raindropState: State } | undefined
>(undefined);

function raindropReducer(state: State, action: Action) {
  switch (action.type) {
    case 'authRefresh': {
      return {
        ...state,
      };
    }
    case 'authRemove': {
      return {
        ...state,
      };
    }
    case 'authSave': {
      return {
        ...state,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function RaindropProvider({ children }: RaindropProviderProps) {
  const initialState: State = {
    access_token: undefined,
    expires: undefined,
    expires_in: undefined,
    refresh_token: undefined,
    token_type: 'Bearer',
  };
  const [raindropState, raindropDispatch] = React.useReducer(
    raindropReducer,
    initialState,
  );
  const value = useMemo(() => {
    return {
      raindropDispatch,
      raindropState,
    };
  }, []);
  return (
    <RaindropContext.Provider value={value}>
      {children}
    </RaindropContext.Provider>
  );
}

function useRaindrop() {
  const context = React.useContext(RaindropContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { RaindropContext, RaindropProvider, useRaindrop };
