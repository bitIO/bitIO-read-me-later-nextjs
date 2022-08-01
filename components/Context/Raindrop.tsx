import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';

type RaindropAction =
  | { payload: RaindropState; type: 'authSave' }
  | { type: 'authRemove' }
  | { type: 'authRefresh' };
type RaindropDispatch = (action: RaindropAction) => void;
type RaindropConfiguration = {
  collections: string[];
  collectionsIncludeAll: boolean;
  initialized: boolean;
  tags: string[];
};
type RaindropSession = {
  access_token: string | undefined;
  expires: number | undefined;
  expires_in: number | undefined;
  refresh_token: string | undefined;
  token_type: string | undefined;
};
type RaindropState = {
  configuration: RaindropConfiguration;
  session: RaindropSession;
};
type RaindropProviderProps = { children: ReactNode };

const initialState: RaindropState = {
  configuration: {
    collections: [],
    collectionsIncludeAll: false,
    initialized: false,
    tags: [],
  },
  session: {
    access_token: undefined,
    expires: undefined,
    expires_in: undefined,
    refresh_token: undefined,
    token_type: 'Bearer',
  },
};

const RaindropContext = createContext<
  | { raindropDispatch: RaindropDispatch; raindropState: RaindropState }
  | undefined
>(undefined);

function raindropReducer(state: RaindropState, action: RaindropAction) {
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
        ...action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
    }
  }
}

function RaindropProvider({ children }: RaindropProviderProps) {
  const [raindropState, raindropDispatch] = useReducer(
    raindropReducer,
    initialState,
  );
  const value = useMemo(() => {
    return {
      raindropDispatch,
      raindropState,
    };
  }, [raindropState]);
  return (
    <RaindropContext.Provider value={value}>
      {children}
    </RaindropContext.Provider>
  );
}

function useRaindrop() {
  const context = useContext(RaindropContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { RaindropContext, RaindropProvider, useRaindrop };
