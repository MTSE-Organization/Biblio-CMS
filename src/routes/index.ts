import { apiConfig } from '@/constants';

const defineRoute = <T extends Record<string, any>>(routes: T): T => routes;

const route = defineRoute({
  home: {
    path: '/'
  },
  account: {
    getList: {
      path: '/account',
      auth: true,
      permissionCode: [apiConfig.account.getList.permissionCode]
    }
  },
  employee: {
    path: '/employee'
  },
  group: {
    getList: {
      path: '/group-permission',
      auth: true,
      permissionCode: [apiConfig.group.getList.permissionCode]
    },
    savePage: {
      path: '/group-permission/:id',
      auth: true,
      permissionCode: [
        apiConfig.group.create.permissionCode,
        apiConfig.group.update.permissionCode
      ]
    }
  },
  login: {
    path: '/login',
    auth: false
  },
  profile: {
    savePage: {
      path: '/profile',
      auth: true
    }
  },
  category: {
    getList: {
      path: '/category',
      auth: true,
      permissionCode: [apiConfig.category.getList.permissionCode]
    },
    savePage: {
      path: '/category/:id',
      auth: true,
      permissionCode: [
        apiConfig.category.create.permissionCode,
        apiConfig.category.update.permissionCode
      ]
    }
  },
  product: {
    getList: {
      path: '/product',
      auth: true,
      permissionCode: [apiConfig.product.getList.permissionCode]
    },
    savePage: {
      path: '/product/:id',
      auth: true,
      permissionCode: [
        apiConfig.product.create.permissionCode,
        apiConfig.product.update.permissionCode
      ]
    }
  }
});

export default route;
