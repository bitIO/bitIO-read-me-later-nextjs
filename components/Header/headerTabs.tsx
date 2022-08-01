import { UserProfile } from '@auth0/nextjs-auth0';
import { Tabs } from '@mantine/core';

export const tabs = [
  {
    link: '/',
    order: 0,
    requireUser: false,
    title: 'Home',
  },
  {
    link: '/pocket',
    order: 2,
    requireUser: true,
    title: 'Pocket',
  },
  {
    link: '/raindrop',
    order: 1,
    requireUser: true,
    title: 'Raindrop',
  },
  {
    link: '/reading-list',
    order: 3,
    requireUser: true,
    title: 'Read List',
  },
];

export function renderHeaderTabs(user: UserProfile | undefined) {
  return tabs
    .filter((tab) => {
      if (!user && !tab.requireUser) {
        return true;
      }
      if (user) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    })
    .map((tab) => {
      return (
        <Tabs.Tab key={tab.order} value={tab.link}>
          {tab.title}
        </Tabs.Tab>
      );
    });
}
