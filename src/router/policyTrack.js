
export default [
	{//保单列表页面
    name: 'policySearch',
    path: '/policySearch',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/policyTrack/PolicySearch.vue')), 'policySearch')
    }
 	},
  {//回访明细页面
    name: 'policyTrack',
    path: '/policyTrack/:policyCode',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/policyTrack/PolicyTrack.vue')), 'policyTrack')
    }
  }
]
