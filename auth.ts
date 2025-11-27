import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import dbConnect from './lib/mongoose';
import User from './models/User';
import bcrypt from 'bcryptjs';

// Credentials provider that validates against the `users` collection.
// Passwords are securely hashed using bcrypt.
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
          const user = await User.findOne({ email }).lean();
          if (!user) return null;
          
          // Compare hashed password using bcrypt
          const isValidPassword = await bcrypt.compare(password, (user as any).password);
          if (isValidPassword) {
            return { id: (user as any)._id.toString(), name: (user as any).username, email, account_type: (user as any).account_type };
          }
          return null;
        } catch (err) {
          console.error('Auth authorize error:', err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.account_type = token.account_type;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user?.account_type) {
        token.account_type = user.account_type;
      }
      return token;
    },
  },
});
