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
      { path: 'testNavi', name: 'testNavi', component: () => import('pages/testNavi.vue') },
      { path: 'test', name: 'test', component: () => import('pages/test.vue') },

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

      { path: 'ScrollTrigger', component: () => import('components/ScrollTrigger.vue'), name: 'ScrollTrigger' },
      { path: 'outsourcingSOP', component: () => import('components/outsourcingSOP.vue'), name: 'outsourcingSOP' },
      { path: 'outsourceDefined', component: () => import('components/outsourceDefined.vue'), name: 'outsourceDefined' },
      { path: 'outsourceSimulation', component: () => import('components/outsourceSimulation.vue'), name: 'outsourceSimulation' },
      { path: 'outsourceAlign', component: () => import('components/outsourceAlign.vue'), name: 'outsourceAlign' },
      { path: 'outsourceComunication', component: () => import('components/outsourceComunication.vue'), name: 'outsourceComunication' },
      { path: 'outsourceScript', component: () => import('components/outsourceScript.vue'), name: 'outsourceScript' },

      { path: 'lock', component: () => import('components/lock.vue'), name: 'lock' },
      { path: '2Finference', component: () => import('components/2Finference.vue'), name: '2Finference' },
      { path: 'notion', component: () => import('components/notion.vue'), name: 'notion' },
      { path: 'interview', component: () => import('components/interview.vue'), name: 'interview' },
      { path: '104priority', component: () => import('components/104priority.vue'), name: '104priority' },
      { path: 'aiFn', component: () => import('components/aiFn.vue'), name: 'aiFn' },

      { path: 'stock', component: () => import('components/stock.vue'), name: 'stock' },
      { path: 'stockBLGlist', component: () => import('components/stockBLGlist.vue'), name: 'stockBLGlist' },
      { path: 'stockValue', component: () => import('components/stockValue.vue'), name: 'stockValue' },
      { path: 'stockNews', component: () => import('components/stockNews.vue'), name: 'stockNews' },
      { path: 'stockValue_US', component: () => import('components/stockValue_US.vue'), name: 'stockValue_US' },
      { path: 'stockValue_exchange.vue', component: () => import('components/stockValue_exchange.vue'), name: 'stockValue_exchange.vue' },
      { path: 'stockFB.vue', component: () => import('components/stockFB.vue'), name: 'stockFB.vue' },
      { path: 'stockRailway.vue', component: () => import('components/stockRailway.vue'), name: 'stockRailway.vue' },

      { path: 'sixDiff', component: () => import('components/sixDiff.vue'), name: 'sixDiff' },
      { path: 'sixDiffExsample', component: () => import('components/sixDiffExsample.vue'), name: 'sixDiffExsample' },
      { path: 'sixDiffCheck', component: () => import('components/sixDiffCheck.vue'), name: 'sixDiffCheck' },
      { path: 'sixDiffMCP', component: () => import('components/sixDiffMCP.vue'), name: 'sixDiffMCP' },
      { path: 'sixDiffPrj', component: () => import('components/sixDiffPrj.vue'), name: 'sixDiffPrj' },
      { path: 'sixDiffPrj24hrs', component: () => import('components/sixDiffPrj24hrs.vue'), name: 'sixDiffPrj24hrs' },
      { path: 'sixDiffPrjSuggest', component: () => import('components/sixDiffPrjSuggest.vue'), name: 'sixDiffPrjSuggest' },
      { path: 'CFDtimeline', component: () => import('components/CFDtimeline.vue'), name: 'CFDtimeline' },
      { path: 'CFD', component: () => import('components/CFD.vue'), name: 'CFD' },

      { path: 'fastAPI', component: () => import('components/fastAPI.vue'), name: 'fastAPI' },
      { path: 'sunTzu', component: () => import('components/sunTzu.vue'), name: 'sunTzu' },

      { path: 'aiLoopLevel', component: () => import('components/aiLoopLevel.vue'), name: 'aiLoopLevel' },


      { path: 'English', component: () => import('components/English.vue'), name: 'English' },
      { path: 'stockPureText', component: () => import('components/stockPureText.vue'), name: 'stockPureText' },

      { path: '2F_aiDesign', component: () => import('components/2F_aiDesign.vue'), name: '2F_aiDesign' },
      { path: '2F_aiToolComparisonDB', component: () => import('components/2F_aiToolComparisonDB.vue'), name: '2F_aiToolComparisonDB' },
      { path: '2F_layoutInference', component: () => import('components/2F_layoutInference.vue'), name: '2F_layoutInference' },
      { path: '2F_PresentationBoard', component: () => import('components/2F_PresentationBoard.vue'), name: '2F_PresentationBoard' },
      { path: '2F_aiGallery', component: () => import('components/2F_aiGallery.vue'), name: '2F_aiGallery' },

      { path: '2F_aiAnalysis', component: () => import('components/2F_aiAnalysis.vue'), name: '2F_aiAnalysis' },
      { path: 'F_aiAnalysis_Radar', component: () => import('components/F_aiAnalysis_Radar.vue'), name: 'F_aiAnalysis_Radar' },
      { path: '2F_Gemini', component: () => import('components/2F_Gemini.vue'), name: '2F_Gemini' },


      { path: 'id_manager', component: () => import('components/id_manager.vue'), name: 'id_manager' },
      { path: 'id_manager_CRUD', component: () => import('components/id_manager_CRUD.vue'), name: 'id_manager_CRUD' },

      { path: '3F_color_googleForm', component: () => import('components/3F_color_googleForm.vue'), name: '3F_color_googleForm' },

      { path: 'a3F_color', component: () => import('components/a3F_color.vue'), name: 'a3F_color' },
      { path: 'a3F_color2', component: () => import('components/a3F_color2.vue'), name: 'a3F_color2' },
      { path: 'a3F_floorPlan', component: () => import('components/a3F_floorPlan.vue'), name: 'a3F_floorPlan' },
      { path: 'a3F_structure', component: () => import('components/a3F_structure.vue'), name: 'a3F_structure' },
      { path: 'a3F_color_desk', component: () => import('components/a3F_color_desk.vue'), name: 'a3F_color_desk' },

      { path: 'roi', component: () => import('components/roi.vue'), name: 'roi' },
      { path: 'roi_doc', component: () => import('components/roi_doc.vue'), name: 'roi_doc' },
      { path: 'roi_doc_rfq', component: () => import('components/roi_doc_rfq.vue'), name: 'roi_doc_rfq' },

      { path: 'ProjectDashboard', component: () => import('pages/ProjectDashboard.vue') },
      { path: 'OverviewTab', component: () => import('components/OverviewTab.vue'), name: 'OverviewTab' },
      { path: 'ParaTab', component: () => import('components/ParaTab.vue'), name: 'ParaTab' },
      { path: 'EvaluationTab', component: () => import('components/EvaluationTab.vue'), name: 'EvaluationTab' },
      { path: 'searchTab', component: () => import('components/searchTab.vue'), name: 'searchTab' },
      { path: 'import_exportTab', component: () => import('components/import_exportTab.vue'), name: 'import_exportTab' },


      { path: 'hobby', component: () => import('components/hobby.vue'), name: 'hobby' },

      { path: 'a2F_layout', component: () => import('components/a2F_layout.vue'), name: 'a2F_layout' },
      { path: 'a2F_CAD', component: () => import('components/a2F_CAD.vue'), name: 'a2F_CAD' },
      { path: 'a2F_CADcombine', component: () => import('components/a2F_CADcombine.vue'), name: 'a2F_CADcombine' },
      { path: 'a2F_contractor', component: () => import('components/a2F_contractor.vue'), name: 'a2F_contractor' },
      { path: 'a2F_areaAlbum', component: () => import('components/a2F_areaAlbum.vue'), name: 'a2F_areaAlbum' },
      { path: 'a2F_btn', component: () => import('components/a2F_btn.vue'), name: 'a2F_btn' },
      { path: 'a2F_areaZoom', component: () => import('components/a2F_areaZoom.vue'), name: 'a2F_areaZoom' },
      { path: 'a2F_btnLink', component: () => import('components/a2F_btnLink.vue'), name: 'a2F_btnLink' },

      { path: 'Firebase_img_map', component: () => import('components/Firebase_img_map.vue'), name: 'Firebase_img_map' },
      { path: 'Firebase_img_map_Onlyview', component: () => import('components/Firebase_img_map_Onlyview.vue'), name: 'Firebase_img_map_Onlyview' },
      { path: 'Firedb_RC10', component: () => import('components/Firedb_RC10.vue'), name: 'Firedb_RC10' },
      { path: 'Firedb_RC10_Onlyview', component: () => import('components/Firedb_RC10_Onlyview.vue'), name: 'Firedb_RC10_Onlyview' },
      { path: 'Firedb_Building', component: () => import('components/Firedb_Building.vue'), name: 'Firedb_Building' },
      { path: 'Firedb_Building_Onlyview', component: () => import('components/Firedb_Building_Onlyview.vue'), name: 'Firedb_Building_Onlyview' },

      { path: 'GPT', component: () => import('components/GPT.vue'), name: 'GPT' },


      { path: '1', component: () => import('components/1.vue'), name: '1' },
      { path: '2', component: () => import('components/2.vue'), name: '2' },
      { path: '2_2', component: () => import('components/2_2.vue'), name: '2_2' },



      {
        path: 'Firedb_Kyoto', component: () => import('components/Firedb_Kyoto.vue'), name: 'Firedb_Kyoto',
        meta: {
          menu: true,
          label: 'Firedb_Kyoto',
          icon: 'note',
          group: 'Japan',
        },

      },

      {
        path: 'Firedb_Umeda', component: () => import('components/Firedb_Umeda.vue'), name: 'Firedb_Umeda',
        meta: {
          menu: true,
          label: 'Firedb_Umeda',
          icon: 'note',
          group: 'Japan',
        },
      },

      {
        path: 'Firedb_Todolist', component: () => import('components/Firedb_Todolist.vue'), name: 'Firedb_Todolist',
        meta: {
          menu: true,
          label: 'Firedb_Todolist',
          icon: 'note',
          group: 'Doc',
        },
      },

      {
        path: 'a2F_album_combine', component: () => import('components/a2F_album_combine.vue'), name: 'a2F_album_combine',
        meta: {
          menu: true,
          label: 'a2F_album_combine',
          icon: 'note',
          group: 'suao-Trip',
        },
      },

      {
        path: 'FCampLife', component: () => import('components/FCampLife.vue'), name: 'FCampLife',
        meta: {
          menu: true,
          label: 'FCampLife',
          icon: 'note',
          group: 'suao-Trip',
        },
      },

      {
        path: 'FCampLife_add', component: () => import('components/FCampLife_add.vue'), name: 'FCampLife_add',
        meta: {
          menu: true,
          label: 'FCampLife_add',
          icon: 'note',
          group: 'suao-Trip',
        },
      },

      {
        path: 'suao', component: () => import('components/suao.vue'), name: 'suao',
        meta: {
          menu: true,
          label: 'suao',
          icon: 'note',
          group: 'suao-Trip',
        },
      },

      {
        path: 'suao_oneDay', component: () => import('components/suao_oneDay.vue'), name: 'suao_oneDay',
        meta: {
          menu: true,
          label: 'suao_oneDay',
          icon: 'note',
          group: 'suao-Trip',
        },
      },

      {
        path: 'suao3day', component: () => import('components/suao3day.vue'), name: 'suao3day',
        meta: {
          menu: true,
          label: 'suao3day',
          icon: 'note',
          group: 'suao-Trip',
        },
      },

      {
        path: 'recent_sys', component: () => import('components/recent_sys.vue'), name: 'recent_sys',
        meta: {
          menu: true,
          label: 'recent_sys',
          icon: 'note',
          group: 'Doc',
        },
      },

      {
        path: 'recent2', component: () => import('components/recent2.vue'), name: 'recent2',
        meta: {
          menu: true,
          label: 'recent2',
          icon: 'note',
          group: 'Doc',
        },
      },

      {
        path: 'Firedb_Tokyo', component: () => import('components/Firedb_Tokyo.vue'), name: 'Firedb_Tokyo',
        meta: {
          menu: true,
          label: 'Firedb_Tokyo',
          icon: 'map',
          group: 'Japan',
        },
      },

      {
        path: 'Firedb_Numba', component: () => import('components/Firedb_Numba.vue'), name: 'Firedb_Numba',
        meta: {
          menu: true,
          label: 'Firedb_Numba',
          icon: 'map',
          group: 'Japan',
        },
      },
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
