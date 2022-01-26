import { createRouter, createWebHistory, } from '@ionic/vue-router';
import { RouteRecordRaw, } from 'vue-router';
import TabsPage from '@/components/base/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/scan',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/scan',
      },
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL,),
  routes,
},);

export default router;
