import useSWR from 'swr';

import { useRaindrop } from '../../components/Context/Raindrop';
import {
  RaindropApiCollectionsResponse,
  RaindropApiResponse,
} from '../../types/raindrop';
import { fetcherAuthenticated } from '../../utils/fetcher';

function getCollection(
  data: RaindropApiCollectionsResponse | undefined,
  isRootNode: boolean,
): RaindropApiCollectionsResponse {
  if (!data) {
    return {
      items: [],
      result: false,
    };
  }

  const updatedCollection = {
    ...data,
  };
  if (!updatedCollection.items) {
    updatedCollection.items = [];
  }
  updatedCollection.items = updatedCollection.items.map((item) => {
    return {
      ...item,
      isRootNode,
    };
  });

  return updatedCollection;
}

function useRaindropCollections(): RaindropApiResponse {
  const { raindropState } = useRaindrop();
  const responseRootCollections = useSWR<RaindropApiCollectionsResponse>(
    [
      'https://api.raindrop.io/rest/v1/collections',
      raindropState.session.access_token || '',
      raindropState.session.token_type || '',
    ],
    fetcherAuthenticated,
  );
  const responseChildrenCollections = useSWR<RaindropApiCollectionsResponse>(
    [
      'https://api.raindrop.io/rest/v1/collections/childrens',
      raindropState.session.access_token || '',
      raindropState.session.token_type || '',
    ],
    fetcherAuthenticated,
  );

  return {
    data: {
      children: getCollection(responseChildrenCollections.data, false),
      root: getCollection(responseRootCollections.data, false),
    },
    error: {
      children: responseChildrenCollections.error,
      root: responseRootCollections.error,
    },
  };
}

export default useRaindropCollections;
