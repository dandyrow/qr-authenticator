import { useSettings } from './../stores/settings.store';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { Router, RouteRecordRaw } from 'vue-router';
import TabsPage from '@/components/base/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/scan',
  },
  {
    path: '/login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/tabs',
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'account',
        component: () => import('@/pages/AccountPage.vue'),
      },
      {
        path: 'scan',
        component: () => import('@/pages/ScanPage.vue'),
      },
      {
        path: 'log',
        component: () => import('@/pages/LogPage.vue'),
      },
    ],
  },
];

const router: Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const settingsStore = useSettings();

  if (to.meta.requiresAuth && !settingsStore.loggedIn) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
