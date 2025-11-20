import React from 'react';
import NavbarClient from './NavbarClient';
import { auth } from '@/auth';

export default async function Navbar() {
  // auth() returns the current session for this request when used in a server component
  const session = await auth();
  const user = session?.user ?? null;

  return <NavbarClient user={user} />;
}







