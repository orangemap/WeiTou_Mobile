export default [
  {
    name: 'home',
    path: '/home',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/home/Home.vue')), 'home')
    }
  }
]