import { useUser } from '@auth0/nextjs-auth0';

const defaultUserImageSrc = 'https://freesvg.org/img/abstract-user-flat-1.png';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img alt={user.name || 'no name'} src={user.picture || defaultUserImageSrc} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
