import {
  Box,
  Checkbox,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Text,
} from '@mantine/core';
import { Link1Icon } from '@modulz/radix-icons';

import useRaindropCollections from './useRaindropCollections';

import { useRaindrop } from '../Context/Raindrop';
import NotFound from '../NotFound/NotFound';

function RaindropConfigurationCollections() {
  const { raindropDispatch, raindropState } = useRaindrop();
  const { data, error } = useRaindropCollections();

  if (error) {
    return <div>Something failed: {error.message}</div>;
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

  if (!data.result || !data.items || data.items.length === 0) {
    return <NotFound />;
  }

  return (
    <SimpleGrid
      breakpoints={[
        {
          cols: 1,
          maxWidth: 755,
        },
      ]}
      cols={2}
    >
      <Box
        sx={(theme) => {
          return {
            backgroundImage: `linear-gradient(135deg, ${
              theme.colors[theme.primaryColor][6]
            } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
            borderRadius: theme.radius.md,
            padding: theme.spacing.xl,
          };
        }}
      >
        <Text>
          Select from which collections we can look for raindrops top be added
          to your reading list, removed when expired, etc.
        </Text>
      </Box>

      <Box
        sx={(theme) => {
          return {
            backgroundColor: theme.white,
            borderRadius: theme.radius.md,
            padding: theme.spacing.xl,
          };
        }}
      >
        <ScrollArea.Autosize
          maxHeight={300}
          mx="auto"
          sx={{
            maxWidth: 400,
          }}
        >
          <SimpleGrid cols={1}>
            {data.items.map((item) => {
              return (
                <Checkbox
                  checked={
                    raindropState.configuration.collections.indexOf(
                      // eslint-disable-next-line no-underscore-dangle
                      `${item._id}`,
                    ) !== -1
                  }
                  icon={Link1Icon}
                  // eslint-disable-next-line no-underscore-dangle
                  id={`${item._id}`}
                  label={item.title}
                  onChange={(event) => {
                    if (event.target.checked) {
                      raindropState.configuration.collections.push(
                        event.target.value,
                      );
                    } else {
                      raindropState.configuration.collections =
                        raindropState.configuration.collections.filter(
                          (collectionId) => {
                            return collectionId !== event.target.value;
                          },
                        );
                    }
                    raindropDispatch({
                      payload: {
                        ...raindropState,
                      },
                      type: 'authSave',
                    });
                  }}
                  // eslint-disable-next-line no-underscore-dangle
                  value={item._id}
                />
              );
            })}
          </SimpleGrid>
        </ScrollArea.Autosize>
      </Box>
    </SimpleGrid>
  );
}

export default RaindropConfigurationCollections;
