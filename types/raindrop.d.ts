// RAINDROP CONTEXT
// -----------------------------------------------------------------------------
export type RaindropAction =
  | { payload: RaindropState; type: 'authSave' }
  | { type: 'authRemove' }
  | { type: 'authRefresh' };
export type RaindropDispatch = (action: RaindropAction) => void;
export type RaindropConfiguration = {
  collections: string[];
  collectionsIncludeAll: boolean;
  initialized: boolean;
  tags: string[];
};
export type RaindropSession = {
  access_token: string | undefined;
  expires: number | undefined;
  expires_in: number | undefined;
  refresh_token: string | undefined;
  token_type: string | undefined;
};
export type RaindropState = {
  configuration: RaindropConfiguration;
  session: RaindropSession | undefined;
  user: RaindropUser | undefined;
};
export type RaindropProviderProps = { children: ReactNode };

// RAINDROP COLLECTIONS
// -----------------------------------------------------------------------------
export interface RaindropApiResponse {
  data: {
    children: RaindropApiCollectionsResponse | undefined;
    root: RaindropApiCollectionsResponse | undefined;
  };
  error: {
    children: Error;
    root: Error;
  };
}

export interface RaindropApiCollectionsResponse {
  items: RaindropCollection[] | undefined;
  result: boolean;
}

export interface RaindropCollection {
  _id: number;
  access: RaindropAccess;
  author: boolean;
  count: number;
  cover: any[];
  created: string;
  creatorRef: RaindropCreatorRef;
  description: string;
  expanded: boolean;
  isRootNode: boolean;
  lastAction: string;
  lastUpdate: string;
  parent?: RaindropParentRef;
  public: boolean;
  slug: string;
  sort: number;
  title: string;
  user: RaindropUserRef;
  view: string;
}

export interface RaindropAccess {
  draggable: boolean;
  for: number;
  level: number;
  root: boolean;
}

export interface RaindropCreatorRef {
  _id: number;
  email: string;
  name: string;
}

export interface RaindropUserRef {
  $db: string;
  $id: number;
  $ref: string;
}

export interface RaindropParentRef {
  $db: string;
  $id: number;
  $ref: string;
}

// RAINDROP USER
// -----------------------------------------------------------------------------
export interface RaindropUserApiResponse {
  result: boolean;
  user: RaindropUser;
}

export interface RaindropUser {
  _id: number;
  apple: RaindropUserApple;
  avatar: string;
  config: RaindropUserConfig;
  dropbox: RaindropUserApple;
  email: string;
  files: RaindropUserFiles;
  fullName: string;
  google: RaindropUserApple;
  groups: RaindropUserGroup[];
  lastAction: string;
  lastUpdate: string;
  lastVisit: string;
  name: string;
  pro: boolean;
  provider: string;
  registered: string;
}

export interface RaindropUserApple {
  enabled: boolean;
}

export interface RaindropUserConfig {
  acknowledge: any[];
  add_default_collection: number;
  broken_level: string;
  browser_extension_mode: string;
  font_size: number;
  lang: string;
  raindrops_buttons: string[];
  raindrops_hide: string[];
  raindrops_search_by_score: boolean;
  raindrops_search_incollection: boolean;
  raindrops_sort: string;
  raindrops_view: string;
}

export interface RaindropUserFiles {
  lastCheckPoint: string;
  size: number;
  used: number;
}

export interface RaindropUserGroup {
  collections: number[];
  hidden: boolean;
  sort: number;
  title: string;
}
