export default [
    {
      name: 'wxIndex',
      path: '/wxIndex',
      meta: {
        login: false,
        hasFooter: false,
        hasTabs: false,
        hasHeader:false
      },
      component(r) {
        require.ensure([], () => r(require('../components/wxIndex/index.vue')), 'wxIndex')
      }
    }
  ]