import { createContext, useContext, useMemo, useReducer } from 'react';

import { useCookies } from 'react-cookie';

import {
  RaindropAction,
  RaindropDispatch,
  RaindropProviderProps,
  RaindropState,
} from '../../types/raindrop';

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
    token_type: undefined,
  },
  user: undefined,
};

const RaindropContext = createContext<
  | { raindropDispatch: RaindropDispatch; raindropState: RaindropState }
  | undefined
>(undefined);

function raindropReducer(
  state: RaindropState,
  action: RaindropAction,
): RaindropState {
  switch (action.type) {
    case 'saveConfigCollections': {
      return {
        ...state,
        configuration: {
          ...state.configuration,
          collections: action.payload,
        },
      };
    }
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
  const [cookies] = useCookies(['raindrop-access']);
  if (cookies['raindrop-access']) {
    initialState.session = {
      access_token: cookies['raindrop-access'].access_token,
      expires: cookies['raindrop-access'].expires,
      expires_in: cookies['raindrop-access'].expires_in,
      refresh_token: cookies['raindrop-access'].refresh_token,
      token_type: cookies['raindrop-access'].token_type,
    };
  }
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
    throw new Error('useRaindrop must be used within a RaindropProvider');
  }
  return context;
}

export { RaindropContext, RaindropProvider, useRaindrop };
