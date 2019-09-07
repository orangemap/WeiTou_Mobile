
export default [
  {//回访明细页面
    name: 'returnDetail',
    path: '/returnDetail/:policyCode',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/repeatedViste/ReturnDetail.vue')), 'returnDetail')
    }
  },{//回复结果查询页面
    name: 'replyResultQuery',
    path: '/replyResultQuery',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/repeatedViste/ReplyResultQuery.vue')), 'replyResultQuery')
    }
  }
]
