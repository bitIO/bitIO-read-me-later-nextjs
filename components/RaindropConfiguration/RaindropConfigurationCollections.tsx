/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

import {
  Avatar,
  Checkbox,
  Group,
  Paper,
  Skeleton,
  Text,
  TransferList,
  TransferListData,
  TransferListItem,
  TransferListItemComponentProps,
} from '@mantine/core';

import useRaindropCollections from '../../hooks/raindrop/useRaindropCollections';
import { RaindropCollection } from '../../types/raindrop';
import { useRaindrop } from '../Context/Raindrop';

function buildTransferListItem(item: RaindropCollection): TransferListItem {
  return {
    description: item.description,
    group: item.title,
    image: item.cover,
    label: item.title,
    value: `${item._id}`,
  };
}

function findItem(
  collectionId: number,
  root: RaindropCollection[],
  children: RaindropCollection[],
) {
  const childNode = children.find((childItem) => {
    return childItem._id === collectionId;
  });
  if (childNode) {
    return childNode;
  }
  const rootNode = root.find((rootItem) => {
    return rootItem._id === collectionId;
  });
  if (rootNode) {
    return rootNode;
  }
  throw new Error(`Cannot find collection ${collectionId}`);
}

function findMyParent(
  collectionId: number,
  root: RaindropCollection[],
  children: RaindropCollection[],
): RaindropCollection {
  const childNode = children.find((childItem) => {
    return childItem._id === collectionId;
  });
  const rootNode = root.find((rootItem) => {
    return rootItem._id === childNode?.parent?.$id;
  });
  if (rootNode) {
    return rootNode;
  }
  if (childNode && childNode.parent) {
    return findMyParent(childNode?.parent?.$id, root, children);
  }
  throw new Error(`Cannot find parent node for collection ${collectionId}`);
}

function buildTransferData(
  children: RaindropCollection[],
  root: RaindropCollection[],
  alreadySelectedCollections: number[],
): TransferListData {
  if (!root || root.length === 0) {
    return [[], []];
  }

  const leftSideItems: TransferListItem[] = root
    .filter((rootItem) => {
      return !alreadySelectedCollections.includes(rootItem._id);
    })
    .map((item): TransferListItem => {
      return buildTransferListItem(item);
    });

  if (children && children && children.length > 0) {
    children.forEach((item) => {
      const parentNode = findMyParent(item._id, root || [], children || []);
      leftSideItems.push({
        description: item.description,
        group: parentNode.title,
        image: item.cover,
        label: item.title,
        value: `${item._id}`,
      });
    });
  }
  const rightSideItems = alreadySelectedCollections.map((collectionId) => {
    const collection = findItem(collectionId, root, children);
    return buildTransferListItem(collection);
  });

  return [leftSideItems, rightSideItems];
}

function TransferListItemComponent({
  data,
  selected,
}: TransferListItemComponentProps) {
  return (
    <Group noWrap>
      <Avatar size="lg" src={data.image} />
      <div
        style={{
          flex: 1,
        }}
      >
        <Text size="sm" weight={500}>
          {data.label}
        </Text>
        <Text color="dimmed" size="xs" weight={400}>
          {data.description}
        </Text>
      </div>
      <Checkbox
        checked={selected}
        onChange={() => {}}
        sx={{
          pointerEvents: 'none',
        }}
        tabIndex={-1}
      />
    </Group>
  );
}

function RaindropConfigurationCollections() {
  const { raindropDispatch, raindropState } = useRaindrop();
  const { data, error } = useRaindropCollections();
  const [transferListData, setTransferListData] = useState<TransferListData>([
    [],
    [],
  ]);

  useEffect(() => {
    const defaultTransferListData = buildTransferData(
      data.children ? data.children.items : [],
      data.root ? data.root.items : [],
      raindropState.configuration.collections,
    );
    setTransferListData(defaultTransferListData);
  }, [data.children, data.root, raindropState.configuration.collections]);

  if (error.root) {
    return (
      <div>
        Something failed retrieving root collections: {error.root.message}
      </div>
    );
  }
  if (error.children) {
    return (
      <div>
        Something failed retrieving root children: {error.children.message}
      </div>
    );
  }

  if (!data) {
    return (
      <>
        <Skeleton circle height={50} mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" width="70%" />
      </>
    );
  }

  return (
    <>
      <Paper>
        <Text>
          Select from which collections we can look for raindrops top be added
          to your reading list, removed when expired, etc.
        </Text>
      </Paper>
      <TransferList
        breakpoint="sm"
        filter={(query, item) => {
          return (
            item.label.toLowerCase().includes(query.toLowerCase().trim()) ||
            item.description.toLowerCase().includes(query.toLowerCase().trim())
          );
        }}
        itemComponent={TransferListItemComponent}
        listHeight={300}
        nothingFound="No one here"
        onChange={(currentValue: TransferListData) => {
          raindropDispatch({
            payload: currentValue[1].map((item) => {
              return parseInt(item.value, 10);
            }),
            type: 'saveConfigCollections',
          });
        }}
        searchPlaceholder="Search employees..."
        titles={['Collections to include', 'Included collections']}
        value={transferListData}
      />
    </>
  );
}

export default RaindropConfigurationCollections;
