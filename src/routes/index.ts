import { apiConfig } from '@/constants';

type RouteConfig = {
  path: string;
  permissionCode?: string[];
  ignoredAuth?: boolean;
  children?: Record<string, RouteConfig>;
};

const defineRoute = <T extends Record<string, any>>(routes: T): T => routes;

const route = defineRoute({
  home: {
    path: '/'
  },
  account: {
    getList: {
      path: '/account',
      permissionCode: [apiConfig.account.getList.permissionCode]
    }
  },
  employee: {
    path: '/employee'
  },
  group: {
    getList: {
      path: '/group-permission',
      permissionCode: [apiConfig.group.getList.permissionCode]
    },
    savePage: {
      path: '/group-permission/:id',
      permissionCode: [
        apiConfig.group.create.permissionCode,
        apiConfig.group.update.permissionCode
      ]
    }
  },
  login: {
    path: '/login',
    ignoredAuth: true
  },
  profile: {
    savePage: {
      path: '/profile',
      permissionCode: [apiConfig.account.updateProfile.permissionCode]
    }
  },
  category: {
    getList: {
      path: '/category',
      permissionCode: [apiConfig.category.getList.permissionCode]
    },
    savePage: {
      path: '/category/:id',
      permissionCode: [
        apiConfig.category.create.permissionCode,
        apiConfig.category.update.permissionCode
      ]
    }
  },
  product: {
    getList: {
      path: '/product',
      permissionCode: [apiConfig.product.getList.permissionCode]
    },
    savePage: {
      path: '/product/:id',
      permissionCode: [
        apiConfig.product.create.permissionCode,
        apiConfig.product.update.permissionCode
      ]
    }
  }
});

export default route;
