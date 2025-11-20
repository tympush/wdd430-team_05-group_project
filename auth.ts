import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

// Development Credentials provider.
// Replace with a database lookup (bcrypt) in production.
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        // Demo user — for development only. Replace with DB lookup & bcrypt.
        if (email === 'user@nextmail.com' && password === '123456') {
          return { id: '1', name: 'Demo User', email };
        }

        return null;
      },
    }),
  ],
});
