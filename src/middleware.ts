import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/',
  },
});

export const config = {
  matcher: ['/pokemon', '/list-pokemon', '/list-pokemon/:path*', '/user-login', '/change-password'],
};
