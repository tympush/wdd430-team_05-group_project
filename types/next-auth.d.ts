import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    account_type?: 'user' | 'seller' | 'admin';
  }

  interface Session {
    user: {
      account_type?: 'user' | 'seller' | 'admin';
    } & DefaultSession['user'];
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    account_type?: 'user' | 'seller' | 'admin';
  }
}
