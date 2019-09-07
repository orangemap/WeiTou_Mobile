export default [
  {
    name: 'userQuery',
    path: '/userQuery',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/userQuery/userQuery.vue')), 'userQuery')
    }
  }
]
