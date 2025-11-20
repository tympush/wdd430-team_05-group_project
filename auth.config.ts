import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: any) {
      // Protect only dashboard routes. Do not auto-redirect users from other pages.
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        return isLoggedIn; // only allow access to /dashboard when authenticated
      }
      return true;
    },
  },
  providers: [], // Add providers (e.g. Credentials, Google) below
};
