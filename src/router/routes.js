const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      { path: 'classC', component: () => import('components/classC.vue') },
      { path: 'timeCurve', component: () => import('components/timeCurve.vue') },

      { path: 'MyPage', component: () => import('pages/MyPage.vue'), name: 'MyPage' },
      { path: 'Services', component: () => import('pages/Services.vue'), name: 'Services' },
      { path: 'Experience', component: () => import('pages/Experience.vue'), name: 'Experience' },
      { path: 'BLG', component: () => import('pages/BLG.vue'), name: 'BLG' },

      { path: 'Configurator', component: () => import('pages/Configurator.vue') },


      { path: 'bannerWhoAmI', component: () => import('components/bannerWhoAmI.vue'), name: 'bannerWhoAmI' },
      { path: 'bannerService', component: () => import('components/bannerService.vue'), name: 'bannerService' },
      { path: 'bannerBLG', component: () => import('components/bannerBLG.vue'), name: 'bannerBLG' },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
