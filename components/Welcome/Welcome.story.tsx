import { Welcome } from './Welcome';

const DefaultState = {
  component: Welcome,
  parameters: {
    initialUser: {
      isLoading: true,
    },
  },
  title: 'Welcome',
};

function Loading() {
  return <Welcome />;
}

function Logged() {
  return <Welcome />;
}
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

function NotLogged() {
  return <Welcome />;
}
NotLogged.parameters = {
  initialUser: {
    error: 'Something went wrong',
    isLoading: false,
  },
};

export { Loading, Logged, NotLogged };
export default DefaultState;
