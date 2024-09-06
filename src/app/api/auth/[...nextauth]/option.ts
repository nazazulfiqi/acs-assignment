import type { AuthOptions } from 'next-auth';
import type { Session, SessionStrategy, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { loginUser } from '../../../../redux/slices/userSlice';
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
          const resultAction = await store.dispatch(
            loginUser({ username: credentials!.username, password: credentials!.password })
          );

          if (loginUser.fulfilled.match(resultAction)) {
            const user = resultAction.payload;
            return { id: user.id, name: user.username, email: user.email };
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      // Tambahkan ID pengguna ke dalam session
      if (token?.id) {
        session!.user!.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: User }) {
      // Tambahkan ID pengguna ke dalam token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
