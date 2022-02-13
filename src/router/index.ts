import { createRouter, createWebHistory } from '@ionic/vue-router';
import { Router, RouteRecordRaw } from 'vue-router';
import TabsPage from '@/components/base/Tabs.vue';
import Paths from './routePaths';
import introGuard from './guards/introGuard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: Paths.LOGIN,
  },
  {
    path: Paths.LOGIN,
    component: () => import('@/pages/LoginPage.vue'),
  },
  // {
  //   path: Paths.INTRO,
  //   component: () => import('@/pages/IntroPage.vue'),
  // },
  {
    path: Paths.TABS,
    component: TabsPage,
    meta: { requiredAuth: true },
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

// router.beforeEach(introGuard);

export default router;
