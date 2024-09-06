import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/',
  },
});

export const config = {
  matcher: ['/pokemon', '/pokemon-list', '/user-login', '/change-password'],
};
