export default [{
  /*综合查询-银保渠道*/
  name: 'comprehensive',
  path: '/comprehensiveYinbao',
  component(r) {
    require.ensure([], () => r(require('../components/comprehensive/Silver/comprehensive.vue')), 'comprehensive')
  },
  children: [{
      /*综合查询default*/
      name: 'comprehensiveInfo',
      path: 'comprehensiveInfo',
      component(r) {
        require.ensure([], () => r(require('../components/comprehensive/Silver/comprehensiveInfo.vue')), 'comprehensiveInfo')
      },
      meta: {
        login: false,
        hasTabs: false,
        hasHeader: false
      }
    },
    { /*下载*/
      path: 'myCommissionDownload/:type',
      component(r) {
        require.ensure([], () => r(require('../components/comprehensive/Silver/myCommission/myCommissionDownload.vue')), 'myCommissionDownload')
      },
      meta: {
        login: false,
        hasTabs: false,
        hasHeader: false
      }
    },
    { /*我的考核*/
      path: 'myAssessment',
      component(r) {
        require.ensure([], () => r(require('../components/comprehensive/Silver/myAssessment/myAssessment.vue')), 'myAssessment')
      },
      meta: {
        login: false,
        hasTabs: false,
        hasHeader: false
      },
      children: [{
        path: '',
        redirect: 'assessDetail',
        component(r) {
          require.ensure([], () => r(require('../components/comprehensive/Silver/myAssessment/assessDetail.vue')), 'assessDetail')
        },
        meta: {
          login: false,
          hasTabs: false,
          hasHeader: false
        }
      }, {
        path: 'assessDetail',
        component(r) {
          require.ensure([], () => r(require('../components/comprehensive/Silver/myAssessment/assessDetail.vue')), 'assessDetail')
        },
        meta: {
          login: false,
          hasTabs: false,
          hasHeader: false
        }
      }, {
        path: 'assessAnalyze',
        component(r) {
          require.ensure([], () => r(require('../components/comprehensive/Silver/myAssessment/assessAnalyze.vue')), 'assessAnalyze')
        },
        meta: {
          login: false,
          hasTabs: false,
          hasHeader: false
        }
      }]
    },
    { /*我的佣金*/
      path: 'myCommission',
      component(r) {
        require.ensure([], () => r(require('../components/comprehensive/Silver/myCommission/myCommission.vue')), 'myCommission')
      },
      meta: {
        login: false,
        hasTabs: false,
        hasHeader: false
      },
      children: [{
          path: '',
          redirect: 'myCommissionDetails',
          component(r) {
            require.ensure([], () => r(require('../components/comprehensive/Silver/myCommission/myCommissionDetails.vue')), 'myCommissionDetails')
          },
          meta: {
            login: false,
            hasTabs: false,
            hasHeader: false
          }
        },
        {
          path: 'myCommissionDetails',
          component(r) {
            require.ensure([], () => r(require('../components/comprehensive/Silver/myCommission/myCommissionDetails.vue')), 'myCommissionDetails')
          },
          meta: {
            login: false,
            hasTabs: false,
            hasHeader: false
          }
        },
        {
          path: 'myCommissionAnalysis',
          component(r) {
            require.ensure([], () => r(require('../components/comprehensive/Silver/myCommission/myCommissionAnalysis.vue')), 'myCommissionAnalysis')
          },
          meta: {
            login: false,
            hasTabs: false,
            hasHeader: false
          }
        }
      ]
    },
    { /*我的佣金*/
      path: 'renewaltable',
      component(r) {
        require.ensure([], () => r(require('../components/comprehensive/renewal/renewalTable.vue')), 'renewalTable')
      },
      meta: {
        login: false,
        hasTabs: false,
        hasHeader: false
      }
    }
  ]
}]
