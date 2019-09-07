
export default [
  {//待办事项
    name: 'backlog',
    path: '/backlog',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/Backlog.vue')), 'backlog')
    }
  },{//支付
    name: 'pay',
    path: '/pay/:orderId',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/Pay.vue')), 'pay')
    }
  },{//保单详情
    name: 'orderDetail',
    path: '/orderDetail/:applyCode/:agentCode',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/OrderDetail.vue')), 'orderDetail')
    }
  },{//撤件  投保要约说明书
    name: 'recall',
    path: '/recall/:orderId/:applyCode',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/Recall.vue')), 'recall')
    }
  },{//投保结果
    name: 'insureResult',
    path:  '/insureResult/:orderId/:result',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/InsureResult.vue')), 'insureResult')
    }
  },{//回执回销
    name: 'receipt',
    path: '/receipt/:orderId',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/Receipt.vue')), 'receipt')
    }
  },{//银行变更页面
    name: 'bankChange',
    path: '/bankChange/:orderId/:applyCode/:agentCode',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/BankChange.vue')), 'bankChange')
    }
  },{//银行变更预览页面
    name: 'preview',
    path: '/preview/:payChangeInfo',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/Preview.vue')), 'preview')
    }
  },{//问题件
    name: 'problem',
    path: '/problem/:orderId/:applyCode',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/Problem.vue')), 'problem')
    }
  },{//回执分享空中签字
    name: 'receiptShare',
    path: '/receiptShare/:orderId/:applyCode/:index/:result/:resultmsg',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/ReceiptShare.vue')), 'receiptShare')
    }
  },{//银行变更页面分享
    name: 'bankChangeShare',
    path: '/bankChangeShare/:orderId/:applyCode/:index/:result/:resultmsg',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/BankChangeShare.vue')), 'bankChangeShare')
    }
  },{//问题件分享
    name: 'problemShare',
    path: '/problemShare/:orderId/:applyCode/:index/:result/:resultmsg/:type',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/ProblemShare.vue')), 'problemShare')
    }
  },{//撤件  投保要约说明书
    name: 'recallShare',
    path: '/recallShare/:orderId/:applyCode/:index/:result/:resultmsg',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/backlog/RecallShare.vue')), 'recallShare')
    }
  }
]