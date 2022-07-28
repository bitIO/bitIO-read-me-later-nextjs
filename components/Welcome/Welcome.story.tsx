import { Welcome } from './Welcome';

export default {
  component: Welcome,
  parameters: {
    initialUser: {
      isLoading: true,
    },
  },
  title: 'Welcome',
};

export const Loading = () => <Welcome />;

export const Logged = () => <Welcome />;
Logged.parameters = {
  initialUser: {
    isLoading: false,
    user: {
      email: 'john@doe.com',
      email_verified: true,
      name: 'John Doe',
      nickname: 'Joe',
      picture: 'https://picsum.photos/200',
      sub: 'mock:john_doe',
      updated_at: '2021-04-02T12:42:42.042Z',
    },
  },
};

export const NotLogged = () => <Welcome />;
NotLogged.parameters = {
  initialUser: {
    error: 'Something went wrong',
    isLoading: false,
  },
};
