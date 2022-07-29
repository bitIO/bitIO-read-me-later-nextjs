import { Tabs } from '@mantine/core';

export const tabs = [
  {
    link: '/',
    order: 0,
    title: 'Home',
  },
  {
    link: '/pocket',
    order: 2,
    title: 'Pocket',
  },
  {
    link: '/raindrop',
    order: 1,
    title: 'Raindrop',
  },
  {
    link: '/reading-list',
    order: 3,
    title: 'Read List',
  },
];

export function renderHeaderTabs() {
  return tabs
    .sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    })
    .map((tab) => (
      <Tabs.Tab key={tab.order} value={tab.link}>
        {tab.title}
      </Tabs.Tab>
    ));
}
