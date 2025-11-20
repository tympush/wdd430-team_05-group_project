import React from 'react';
import NavbarClient from './NavbarClient';
import { auth } from '@/auth';

export default async function Navbar() {
  const session = await auth();
  const user = session?.user ?? null;

  return <NavbarClient user={user} />;
}







