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
      { path: 'testNavi', name: 'testNavi',component: () => import('pages/testNavi.vue') },
      { path: 'test', name: 'test',component: () => import('pages/test.vue') },


      { path: 'bannerWhoAmI', component: () => import('components/bannerWhoAmI.vue'), name: 'bannerWhoAmI' },
      { path: 'bannerService', component: () => import('components/bannerService.vue'), name: 'bannerService' },
      { path: 'bannerBLG', component: () => import('components/bannerBLG.vue'), name: 'bannerBLG' },
      { path: 'bannerBike', component: () => import('components/bannerBike.vue'), name: 'bannerBike' },
      { path: 'bannerDesign', component: () => import('components/bannerDesign.vue'), name: 'bannerDesign' },
      { path: 'bannerERP', component: () => import('components/bannerERP.vue'), name: 'bannerERP' },
      { path: 'bannerDroneBox', component: () => import('components/bannerDroneBox.vue'), name: 'bannerDroneBox' },
      { path: 'bannerMotor', component: () => import('components/bannerMotor.vue'), name: 'bannerMotor' },
      { path: 'bannerGearbox', component: () => import('components/bannerGearbox.vue'), name: 'bannerGearbox' },
      { path: 'bannerGearAnimate', component: () => import('components/bannerGearAnimate.vue'), name: 'bannerGearAnimate' },
      { path: 'bannerDC10', component: () => import('components/bannerDC10.vue'), name: 'bannerDC10' },


      { path: 'timeline_g12', component: () => import('components/timeline_g12.vue'), name: 'timeline_g12' },
      { path: 'timeLine_lightSop', component: () => import('components/timeLine_lightSop.vue'), name: 'timeLine_lightSop' },
      { path: 'imageGridG12sop', component: () => import('components/imageGridG12sop.vue'), name: 'imageGridG12sop' },
      { path: 'imageTr', component: () => import('components/imageTr.vue'), name: 'imageTr' },
      { path: 'imgMap_iF', component: () => import('components/imgMap_iF.vue'), name: 'imgMap_iF' },
      { path: 'ExpansionG12', component: () => import('components/ExpansionG12.vue'), name: 'ExpansionG12' },
      { path: 'ERP', component: () => import('components/ERP.vue'), name: 'ERP' },
      { path: 'DroneBox', component: () => import('components/DroneBox.vue'), name: 'DroneBox' },
      { path: 'Motor', component: () => import('components/Motor.vue'), name: 'Motor' },
      { path: 'classCtree', component: () => import('components/classCtree.vue') },
      { path: 'classCtimeLine', component: () => import('components/classCtimeLine.vue') },
      { path: 'Gearbox', component: () => import('components/Gearbox.vue'), name: 'Gearbox' },
      { path: 'GearAnimate', component: () => import('components/GearAnimate.vue'), name: 'GearAnimate' },
      // { path: 'Drift', component: () => import('components/Drift.vue'), name: 'Drift' },
      { path: 'DC10', component: () => import('components/DC10.vue'), name: 'DC10' },
      { path: 'ninestep', component: () => import('components/ninestep.vue'), name: 'ninestep' },
      { path: 'schoolCards', component: () => import('components/schoolCards.vue'), name: 'schoolCards' },
      { path: 'ansysTree', component: () => import('components/ansysTree.vue'), name: 'ansysTree' },
      { path: 'imageMap', component: () => import('components/imageMap.vue'), name: 'imageMap' },

      { path: 'draggable', component: () => import('components/draggable.vue'), name: 'draggable' },
      { path: 'Qtable', component: () => import('components/Qtable.vue'), name: 'Qtable' },
      { path: 'sysTree', component: () => import('components/sysTree.vue'), name: 'sysTree' },





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
