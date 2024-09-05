// /middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/',
  },
});

export const config = {
  matcher: ['/pokemon', '/pokemon-list', '/user', '/change-password'],
};
