const defineRoute = <T>(routes: T): T => routes;

const route = defineRoute({
    home: {
        path: '/'
    },
    account: {
        path: '/account'
    },
    employee: {
        path: '/employee'
    },
    group: {
        path: '/group-permission',
        create: {
            path: '/group-permission/create'
        }
    },
    permission: {
        path: '/permission',
        create: {
            path: '/permission/create'
        }
    },
    login: {
        path: '/login'
    },
    profile: {
        path: '/profile'
    }
});

export default route;
