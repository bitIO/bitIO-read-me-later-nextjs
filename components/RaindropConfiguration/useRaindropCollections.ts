import useSWR from 'swr';

import { useRaindrop } from '../Context/Raindrop';

interface CollectionsData {
  items: RaindropCollection[];
  result: boolean;
}
interface RaindropCollection {
  _id: number;
  access: RaindropAccess;
  author: boolean;
  count: number;
  cover: any[];
  created: string;
  creatorRef: RaindropCreatorRef;
  description: string;
  expanded: boolean;
  lastAction: string;
  lastUpdate: string;
  public: boolean;
  slug: string;
  sort: number;
  title: string;
  user: RaindropUser;
  view: string;
}

interface RaindropAccess {
  draggable: boolean;
  for: number;
  level: number;
  root: boolean;
}

interface RaindropCreatorRef {
  _id: number;
  email: string;
  name: string;
}

interface RaindropUser {
  $db: string;
  $id: number;
  $ref: string;
}

async function fetcher(url: string, token: string, tokenType: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  const json = await response.json();
  return json;
}

function useRaindropCollections() {
  const { raindropState } = useRaindrop();
  const { data, error } = useSWR<CollectionsData>(
    [
      'https://api.raindrop.io/rest/v1/collections',
      raindropState.session.access_token,
      raindropState.session.token_type,
    ],
    fetcher,
  );

  return {
    data,
    error,
  };
}

export default useRaindropCollections;
