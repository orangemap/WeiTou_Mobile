export default [
  {
    name: 'used',
    path: '/used',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/used/Used.vue')), 'used')
    },
    children: [
      {
        name: 'receipt_share',
        path: 'share/:appntName/:idType/:idNo/:applyCode/:policyCode/:isReceipt/:result/:resultmsg',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/used/ReceiptShare.vue')), 'receipt_share')
        }
      },
      {
        name: 'receipt_share_v2',
        path: 'sharev2/:args',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/used/ReceiptShareV2.vue')), 'receipt_share_v2')
        }
      },
      {
        name: 'supplement',
        path: 'supplement',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/used/Supplement.vue')), 'supplement')
        }
      },
      {
        name: 'empty',
        path: 'empty',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/used/EmptyPage.vue')), 'empty')
        }
      },
      {
        name: 'activity',
        path: 'activity/:id/:code/:agent',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/used/Activity.vue')), 'activity')
        }
      }
    ]
  }
]
