import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { MoonIcon, SunIcon } from '@modulz/radix-icons';

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group mt="xl" position="center">
      <ActionIcon
        onClick={() => {
          return toggleColorScheme();
        }}
        size="xl"
        sx={(theme) => {
          return {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.yellow[4]
                : theme.colors.blue[6],
          };
        }}
      >
        {colorScheme === 'dark' ? (
          <SunIcon height={20} width={20} />
        ) : (
          <MoonIcon height={20} width={20} />
        )}
      </ActionIcon>
    </Group>
  );
}

export default ColorSchemeToggle;
