import type { AuthOptions } from 'next-auth';
import type { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { login } from '../../../../redux/slices/userSlice';
import { store } from '../../../../redux/store';

import { TLoginData } from '@/types/authentications';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<TLoginData | null> {
        try {
          store.dispatch(login({ username: credentials!.username, password: credentials!.password }));
          const state = store.getState();
          const user = state.user;

          if (user.isLoggedIn) {
            return { id: 1, name: user.username, email: user.email };
          }
        } catch (error) {
          console.error(error);
          return null;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: '/',
  },
};
