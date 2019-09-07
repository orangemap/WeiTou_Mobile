export default [
  {
    name: 'ca_sign',
    path: '/ca_sign',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/common/ca_sign.vue')), 'ca_sign')
    }
  }
]
