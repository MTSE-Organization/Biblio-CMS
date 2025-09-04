const defineRoute = <T>(routes: T): T => routes;

const route = defineRoute({
  home: '/',
  account: '/account',
  employee: '/employee',
  permission: '/permission',
  login: '/login',
  profile: '/profile'
});

export default route;
