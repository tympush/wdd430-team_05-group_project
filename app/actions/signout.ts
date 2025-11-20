'use server';

export default async function signOutAction() {
  const { signOut } = await import('@/auth');
  await signOut({ redirectTo: '/' });
}
