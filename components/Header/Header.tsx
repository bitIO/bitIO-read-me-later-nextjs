import { Avatar, Burger, Container, Group, Menu, Tabs, Text, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from '@tabler/icons';
import { useState } from 'react';
import useStyles from './Header.styles';

interface HeaderTabsProps {
  user: { name: string; image: string };
  tabs: string[];
}

export function Header({ user, tabs }: HeaderTabsProps) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab key={tab} value={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <MantineLogo size={28} />

          <Burger className={classes.burger} onClick={toggle} opened={opened} size="sm" />

          <Menu
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            position="bottom-end"
            transition="pop-top-right"
            width={260}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar alt={user.name} radius="xl" size={20} src={user.image} />
                  <Text mr={3} size="sm" sx={{ lineHeight: 1 }} weight={500}>
                    {user.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconHeart color={theme.colors.red[6]} size={14} stroke={1.5} />}>
                Liked posts
              </Menu.Item>
              <Menu.Item icon={<IconStar color={theme.colors.yellow[6]} size={14} stroke={1.5} />}>
                Saved posts
              </Menu.Item>
              <Menu.Item icon={<IconMessage color={theme.colors.blue[6]} size={14} stroke={1.5} />}>
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                Change account
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
                Pause subscription
              </Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          classNames={{
            root: classes.tabs,
            tab: classes.tab,
            tabsList: classes.tabsList,
          }}
          defaultValue="Home"
          variant="outline"
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
