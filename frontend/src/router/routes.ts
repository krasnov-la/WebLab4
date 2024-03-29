import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
       path: '', component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'leaderboard', component: () => import('pages/LeaderboardPage.vue')
      },
      {
        path: 'game', component: () => import('src/pages/GamePage.vue')
      },
      {
        path: 'auth', component: () => import('pages/AuthPage.vue')
      },
      {
        path: 'reg', component: () => import('pages/RegPage.vue')
      },
      {
        path: 'profile', component: () => import('pages/ProfilePage.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
