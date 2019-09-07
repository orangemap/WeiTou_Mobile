export default [
  {
    name: 'manage',
    path: '/manage',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/manage/Manage.vue')), 'manage')
    }
  },{
    name: 'addmanage',
    path: '/manage/addmanage',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/manage/Addmanage.vue')), 'addmanage')
    }
  },{
    name: 'showmanage',
    path: '/manage/addmanage/showmanage/enjoymanage/:id',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/manage/Showmanage.vue')), 'showmanage')
    }
  },{
    name: 'enjoy',
    path: '/manage/addmanage/enjoy',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/manage/Enjoy.vue')), 'enjoy')
    }
  },{
    name: 'statements',
    path: '/manage/addmanage/showmanage/statements',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/manage/pop/Statements.vue')), 'statements')
    }
  },{
    name: 'direction',
    path: '/manage/addmanage/showmanage/direction',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/manage/pop/Direction.vue')), 'direction')
    }
  }
]