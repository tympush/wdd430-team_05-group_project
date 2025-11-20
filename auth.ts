import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import dbConnect from './lib/mongoose';
import Seller from './models/Seller';

// Credentials provider that validates against the `sellers` collection.
// NOTE: Passwords are stored/compared in plaintext for now (development only).
// Replace with bcrypt + proper validation for production.
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

        if (!email || !password) return null;

        // Ensure DB connected
        try {
          await dbConnect();
        } catch (err) {
          console.error('DB connect error in auth:', err);
          return null;
        }

        try {
          const seller = await Seller.findOne({ email }).lean();
          if (!seller) return null;
          // Plaintext compare for dev/testing only
          if ((seller as any).password === password) {
            return { id: (seller as any)._id.toString(), name: (seller as any).username, email };
          }
          return null;
        } catch (err) {
          console.error('Auth authorize error:', err);
          return null;
        }
      },
    }),
  ],
});
