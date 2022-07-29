import { useState } from 'react';

import { UserProfile, useUser } from '@auth0/nextjs-auth0';
import { Avatar, Burger, Container, Group, Menu, Tabs, Text, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
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
import { NextRouter, useRouter } from 'next/router';

import useStyles from './Header.styles';
import { renderHeaderTabs } from './headerTabs';

const confirmLogout = (router: NextRouter) =>
  openConfirmModal({
    centered: true,
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    confirmProps: { color: 'red' },
    labels: { cancel: 'Cancel', confirm: 'Confirm' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => {
      console.log('Confirmed');
      router.push('/api/auth/logout');
    },
    title: 'Are you sure?',
  });

function renderAvatar(user: UserProfile | undefined) {
  if (!user) {
    return null;
  }
  const altText = user.name || user.nickname || 'user avatar';
  return (
    <Group spacing={7}>
      <Avatar alt={altText} radius="xl" size={20} src={user.picture} />
      <Text mr={3} size="sm" sx={{ lineHeight: 1 }} weight={500}>
        {user.name}
      </Text>
      <IconChevronDown size={12} stroke={1.5} />
    </Group>
  );
}

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useStyles();
  const { user } = useUser();

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
                {renderAvatar(user)}
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
              <Menu.Item
                icon={<IconLogout size={14} stroke={1.5} />}
                onClick={() => confirmLogout(router)}
              >
                Logout
              </Menu.Item>

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
          defaultValue="/raindrop"
          onTabChange={(value) => {
            router.push(`${value}`);
          }}
          value={router.pathname}
          variant="outline"
        >
          <Tabs.List>{renderHeaderTabs()}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
