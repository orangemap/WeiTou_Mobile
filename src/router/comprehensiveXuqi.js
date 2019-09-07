export default[{
   /*综合查询-个险*/
   path: '/comprehensiveXuqi',
   component(r) {
      require.ensure([], () => r(require('../components/comprehensive/renewal/comprehensive.vue')), 'comprehensive')
   },
   children:[
   {
      /*综合查询default*/
      path: 'comprehensiveInfo',
      component(r){
         require.ensure([], () => r(require('../components/comprehensive/renewal/comprehensiveInfo.vue')), 'comprehensiveInfo')
      },
      meta: {
         login: false,
         hasTabs: false,
         hasHeader:false
      }
   },
   {/*催缴明细Index*/
      path: 'calldetailindex',
      component(r){
         require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallDetailIndex.vue')), 'calldetailindex')
      },
      meta: {
         login: false,
         hasTabs: false,
         hasHeader:false
      },
      children:[
      // {
      //    path: '',
      //    component(r){
      //       require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallSel/renwalcallSel.vue')), 'renwalcallSel')
      //    },
      //    meta: {
      //       login: false,
      //       hasTabs: false,
      //       hasHeader:false
      //    }
      // },
      {
         path: 'renwalcallSel',/*催缴明细*/
         component(r){
            require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallSel/renwalcallSel.vue')), 'renwalcallSel')
         },
         meta: {
            login: false,
            hasTabs: false,
            hasHeader:false
         }
      },
      {
         path: 'renwalShortSel',/*一年期短险清单*/
         component(r){
            require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallSel/renwalShortSel.vue')), 'renwalShortSel')
         },
         meta: {
            login: false,
            hasTabs: false,
            hasHeader:false
         }
      },
      {
         path: 'renwalFiveYearSel',/*五年期保证续保到期提醒清单*/
         component(r){
            require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallSel/renwalFiveYearSel.vue')), 'renwalFiveYearSel')
         },
         meta: {
            login: false,
            hasTabs: false,
            hasHeader:false
         }
      },
      {
         path: 'renwalStillValidSel',/*主险交费期满附加险仍有效清单*/
         component(r){
            require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallSel/renwalStillValidSel.vue')), 'renwalStillValidSel')
         },
         meta: {
            login: false,
            hasTabs: false,
            hasHeader:false
         }
      },
      {
         path: 'renwalnavlidSel',/*失效可复效及垫交保单明细*/
         component(r){
            require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallSel/renwalnavlidSel.vue')), 'renwalnavlidSel')
         },
         meta: {
            login: false,
            hasTabs: false,
            hasHeader:false
         }
      },
      ]
   },
   {/*催缴明细Tabel页*/
      path: 'renewalCallDetailTable',
      component(r){
         require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallTables/renewalCallDetailTable.vue')), 'renewalCallDetailTable')
      },
      meta: {
         login: false,
         hasTabs: false,
         hasHeader:false
      }
   },
   {/*一年期短险清单Tabel页*/
      path: 'renewalShortTable',
      component(r){
         require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallTables/renewalShortTable.vue')), 'renewalShortTable')
      },
      meta: {
         login: false,
         hasTabs: false,
         hasHeader:false
      }
   },
   {/*五年期保证续保到期提醒清单Tabel页*/
      path: 'renewalFiveYearTable',
      component(r){
         require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallTables/renewalFiveYearTable.vue')), 'renewalFiveYearTable')
      },
      meta: {
         login: false,
         hasTabs: false,
         hasHeader:false
      }
   },
   {/*主险交费期满附加险仍有效清单Tabel页*/
      path: 'renewalStillValidTable',
      component(r){
         require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallTables/renewalStillValidTable.vue')), 'renewalStillValidTable')
      },
      meta: {
         login: false,
         hasTabs: false,
         hasHeader:false
      }
   },
   {/*失效可复效及垫交保单明细Tabel页*/
      path: 'renewalInvalidTable',
      component(r){
         require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/CallTables/renewalInvalidTable.vue')), 'renewalInvalidTable')
      },
      meta: {
         login: false,
         hasTabs: false,
         hasHeader:false
      }
   },
   {/*代理人信息页*/
      path: 'renewal_agentdetails',
      component(r){
         require.ensure([], () => r(require('../components/comprehensive/renewal/CallDetail/agentdetails.vue')), 'renewal_agentdetails')
      },
      meta: {
         login: false,
         hasTabs: false,
         hasHeader:false
      }
   }
   ]/*export default children*/
}]
