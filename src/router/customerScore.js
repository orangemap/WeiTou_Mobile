export default [
  {
    name: 'customerScore',
    path: '/customerScore',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/customerScore/CustomerScore.vue')), 'customerScore')
    },
    children: [
      {
        name: 'customer_query',
        path: 'customerQuery',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/customerScore/CustomerQuery.vue')), 'customer_query')
        }
      },
      {
        name: 'integral_query',
        path: 'integralQuery/:customer',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/customerScore/IntegralQuery.vue')), 'integral_query')
        }
      },
      {
        name: 'add_service',
        path: 'addService',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/customerScore/AddService.vue')), 'add_service')
        }
      }
    ]
  }
]
