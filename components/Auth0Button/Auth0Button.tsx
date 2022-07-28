import { Button, ButtonProps } from '@mantine/core';
import Link from 'next/link';
import Auth0Icon from './Auth0Icon';

export default function Auth0Button(props: ButtonProps) {
  return (
    <Link href="/api/auth/login" passHref>
      <Button color="gray" leftIcon={<Auth0Icon />} variant="default" {...props} />
    </Link>
  );
}
