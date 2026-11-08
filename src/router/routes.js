import RecentSystem from 'src/pages/RecentSystem.vue'

const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    component: () => import('layouts/0903.vue'),

    // component: () => import('layouts/mechanism.vue'),

    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      // { path: 'MainLayout', component: () => import('pages/MainLayout.vue') },
      // ??


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
      { path: 'GPS', component: () => import('components/GPS.vue'), name: 'GPS' },
      // { path: 'software_nb_firedb', component: () => import('components/software_nb_firedb.vue'), name: 'software_nb_firedb' },

      { path: 'iPad', component: () => import('components/iPad.vue'), name: 'iPad' },
      { path: 'android', component: () => import('components/android.vue'), name: 'android' },
      { path: 'voice', component: () => import('components/voice.vue'), name: 'voice' },
      { path: 'voice_manual', component: () => import('components/voice_manual.vue'), name: 'voice_manual' },
      { path: 'YTcontinue', component: () => import('components/YTcontinue.vue'), name: 'YTcontinue' },
      { path: 'laundry', component: () => import('components/laundry.vue'), name: 'laundry' },

      // joey 快速管道 ------

      // ------ speed zone -------

      // { path: 'ED', component: () => import('components/ED.vue'), name: 'ED' },
      // { path: 'EDcellPhone', component: () => import('components/EDcellPhone.vue'), name: 'EDcellPhone' },


      {
        path: 'software_nb_firedb', component: () => import('components/software_nb_firedb.vue'), name: 'software_nb_firedb',
        meta: {
          menu: true,
          label: 'software_nb_firedb',
          icon: 'map',
          group: '病痛',
        },
      },

      {
        path: 'ED', component: () => import('components/ED.vue'), name: 'ED',
        meta: {
          menu: true,
          label: 'ED',
          icon: 'map',
          group: '病痛',
        },
      },
      {
        path: 'EDcellPhone', component: () => import('components/EDcellPhone.vue'), name: 'EDcellPhone',
        meta: {
          menu: true,
          label: 'EDcellPhone',
          icon: 'map',
          group: '病痛',
        },
      },

      {
        path: 'Firedb_Body', component: () => import('components/Firedb_Body.vue'), name: 'Firedb_Body',
        meta: {
          menu: true,
          label: 'Firedb_Body',
          icon: 'map',
          group: '病痛',
        },
      },

      {
        path: 'ED_hospitalization', component: () => import('components/ED_hospitalization.vue'), name: 'ED_hospitalization',
        meta: {
          menu: true,
          label: '手術行程(膽結石)',
          icon: 'map',
          group: '病痛',
        },
      },

      {
        path: 'EDbag', component: () => import('components/EDbag.vue'), name: 'EDbag',
        meta: {
          menu: true,
          label: 'ED bag 住院包 🎒 ',
          icon: 'luggage',
          group: '病痛',
        },
      },
      {
        path: 'ED_operation', component: () => import('components/ED_operation.vue'), name: 'ED_operation',
        meta: {
          menu: true,
          label: '手術副作用 ',
          icon: 'luggage',
          group: '病痛',
        },
      },



      { path: '1', component: () => import('components/1.vue'), name: '1' },
      { path: '2', component: () => import('components/2.vue'), name: '2' },
      { path: '2_2', component: () => import('components/2_2.vue'), name: '2_2' },

      { path: '3', component: () => import('components/3.vue'), name: '3' },
      { path: 'carousel_104Electric', component: () => import('components/carousel_104Electric.vue'), name: 'carousel_104Electric' },

      // carousel_104Electric
      // Firedb_Umeda_Onlyview
      { path: 'Firedb_Umeda_Onlyview', component: () => import('components/Firedb_Umeda_Onlyview.vue'), name: 'Firedb_Umeda_Onlyview' },
      { path: 'Tripjapan', component: () => import('pages/Tripjapan.vue'), name: 'Tripjapan' },
      { path: 'Firedb_Tokyo_Onlyview', component: () => import('components/Firedb_Tokyo_Onlyview.vue'), name: 'Firedb_Tokyo_Onlyview' },

      {
        path: 'Tripjapan', component: () => import('pages/Tripjapan.vue'), name: 'Tripjapan',
        meta: {
          menu: true,
          label: 'Only View',
          icon: 'map',
          group: 'Japan',
        },
      },


      // RecentSystem
      // { path: 'RecentSystem', component: () => import('pages/RecentSystem.vue'), name: 'RecentSystem' },

      {
        path: 'RecentSystem', component: () => import('pages/RecentSystem.vue'), name: 'RecentSystem',
        meta: {
          menu: true,
          label: 'RecentSystem',
          icon: 'map',
          group: 'recent',
        },
      },

      { path: 'RecentSystemChecklist', component: () => import('components/recentSystem/RecentSystemChecklist.vue'), name: 'RecentSystemChecklist' },
      { path: 'RecentSystemHeader', component: () => import('components/recentSystem/RecentSystemHeader.vue'), name: 'RecentSystemHeader' },
      { path: 'RecentSystemNoteDialog', component: () => import('components/recentSystem/RecentSystemNoteDialog.vue'), name: 'RecentSystemNoteDialog' },
      { path: 'RecentSystemOutline', component: () => import('components/recentSystem/RecentSystemOutline.vue'), name: 'RecentSystemOutline' },
      { path: 'RecentSystemTest', component: () => import('components/recentSystem/RecentSystemTest.vue'), name: 'RecentSystemTest' },
      { path: 'RecentSystemTimeline', component: () => import('components/recentSystem/RecentSystemTimeline.vue'), name: 'RecentSystemTimeline' },
      { path: 'RecentSystemVisibility', component: () => import('components/recentSystem/RecentSystemVisibility.vue'), name: 'RecentSystemVisibility' },
      { path: 'recentSelectDialog', component: () => import('components/recentSystem/recentSelectDialog.vue'), name: 'recentSelectDialog' },

      // --------

      {
        path: '104MainLayout', component: () => import('pages/104MainLayout.vue'), name: '104MainLayout',
        meta: {
          menu: true,
          label: 'VTOL',
          icon: 'note',
          group: '104',
        },
      },
      {
        path: '104mechanism', component: () => import('pages/104mechanism.vue'), name: '104mechanism',
        meta: {
          menu: true,
          label: '機構 CAD',
          icon: 'note',
          group: '104',
        },
      },

      {
        path: '104Thermal', component: () => import('pages/104Thermal.vue'), name: '104Thermal',
        meta: {
          menu: true,
          label: 'Thermal',
          icon: 'note',
          group: '104',
        },
      },

      {
        path: '104Electric', component: () => import('pages/104Electric.vue'), name: '104Electric',
        meta: {
          menu: true,
          label: '機電保修',
          icon: 'note',
          group: '104',
        },
      },

      // --------

      {
        path: 'recent26-08', component: () => import('components/recent26-08.vue'), name: 'recent26-08',
        meta: {
          menu: true,
          label: 'recent26-08',
          icon: 'note',
          group: 'Doc',
        },
      },
      {
        path: 'GPT', component: () => import('components/GPT.vue'), name: 'GPT',
        meta: {
          menu: true,
          label: 'GPT',
          icon: 'note',
          group: 'Doc',
        },
      },

      // joey 手工目錄
      {
        path: 'Firedb_recent', component: () => import('components/Firedb_recent.vue'), name: 'Firedb_recent',
        meta: {
          menu: true,
          label: '*Firedb_大方向 校準*',
          icon: 'note',
          group: 'recent',
        },
      },

      {
        path: 'roi', component: () => import('components/roi.vue'), name: 'roi',
        meta: {
          menu: true,
          label: '*ROI 項目優先 校準*',
          icon: 'note',
          group: 'recent',
        },
      },



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
          group: 'suao-Trip',
        },
      },

      {
        path: 'a2F_album_combine', component: () => import('components/a2F_album_combine.vue'), name: 'a2F_album_combine',
        meta: {
          menu: true,
          label: 'a2F_album_combine(NG)',
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

      {
        path: 'Firedb_Watch', component: () => import('components/Firedb_Watch.vue'), name: 'Firedb_Watch',
        meta: {
          menu: true,
          label: 'Firedb_Watch',
          icon: 'map',
          group: 'Japan',
        },
      },

      {
        path: 'GAS_picUP', component: () => import('components/GAS_picUP.vue'), name: 'GAS_picUP',
        meta: {
          menu: true,
          label: '照片上傳',
          icon: 'photo',
          group: 'Japan',
        },
      },


      { path: 'a3F_color', component: () => import('components/a3F_color.vue'), name: 'a3F_color' },
      { path: 'a3F_color2', component: () => import('components/a3F_color2.vue'), name: 'a3F_color2' },
      { path: 'a3F_floorPlan', component: () => import('components/a3F_floorPlan.vue'), name: 'a3F_floorPlan' },
      // { path: 'a3F_structure', component: () => import('components/a3F_structure.vue'), name: 'a3F_structure' },
      // { path: 'a3F_color_desk', component: () => import('components/a3F_color_desk.vue'), name: 'a3F_color_desk' },

      {
        path: 'a3F_color_desk', component: () => import('components/a3F_color_desk.vue'), name: 'a3F_color_desk',
        meta: {
          menu: true,
          label: '書桌整理記錄',
          icon: 'photo',
          group: '3F',
        },
      },
      {
        path: 'a3F_structure', component: () => import('components/a3F_structure.vue'), name: 'a3F_structure',
        meta: {
          menu: true,
          label: '3F_Fn Tree',
          icon: 'photo',
          group: '3F',
        },
      },
      {
        path: 'a3F_floorPlan', component: () => import('components/a3F_floorPlan.vue'), name: 'a3F_floorPlan',
        meta: {
          menu: true,
          label: '3F收納 整合',
          icon: 'photo',
          group: '3F',
        },
      },





      // AreaManager 重構 \
      // { path: '1', component: () => import('components/1.vue'), name: '1' },
      // 主資料夾 : VTOL\src\components\area
      // composables/useAreas.js
      // pages/AreaManager.vue

      {
        path: 'AreaManager', component: () => import('pages/AreaManager.vue'), name: 'AreaManager',
        meta: {
          menu: true,
          label: 'AreaManager',
          icon: 'map',
          group: 'Doc',
        },
      },
      {
        path: 'AreaCard',
        component: () => import('components/area/AreaCard.vue'),
        name: 'AreaCard'
      },
      {
        path: 'AreaCardView',
        component: () => import('components/area/AreaCardView.vue'),
        name: 'AreaCardView'
      },
      {
        path: 'AreaCategoryBar',
        component: () => import('components/area/AreaCategoryBar.vue'),
        name: 'AreaCategoryBar'
      },

      {
        path: 'AreaHeader',
        component: () => import('components/area/AreaHeader.vue'),
        name: 'AreaHeader'
      },
      {
        path: 'AreaListView',
        component: () => import('components/area/AreaListView.vue'),
        name: 'AreaListView'
      },

      {
        path: 'dialogs/AreaAddDialog',
        component: () => import('components/area/dialogs/AreaAddDialog.vue'),
        name: 'AreaAddDialog'
      },
      {
        path: 'AreaEditDialog',
        component: () => import('components/area/dialogs/AreaEditDialog.vue'),
        name: 'AreaEditDialog'
      },

      {
        path: 'AreaSelectorDialog',
        component: () => import('components/area/dialogs/AreaSelectorDialog.vue'),
        name: 'AreaSelectorDialog'
      },
      // ----- ----- -----

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
