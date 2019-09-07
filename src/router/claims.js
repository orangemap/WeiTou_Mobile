export default [
  {
    name: 'claims',
    path: '/claims',
    meta: {
      login: false,
      hasFooter: false,
      hasTabs: false,
      hasHeader:false
    },
    component(r) {
      require.ensure([], () => r(require('../components/claims/Claims.vue')), 'claims')
    },
    children: [
      {
        name: 'service_guide',
        path: 'serviceGuide',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/claims/ServiceGuide.vue')), 'service_guide')
        }
      },
      {
        name: 'common_questions',
        path: 'questions',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/claims/CommonQuestions.vue')), 'common_questions')
        }
      },
      {
        name: 'necessary_materials',
        path: 'materials',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/claims/NecessaryMaterials.vue')), 'necessary_materials')
        }
      },
      {
        name: 'acquisition_path',
        path: 'path',
        meta: {
          login: false,
          hasFooter: false,
          hasTabs: false,
          hasHeader: false
        },
        component(r) {
          require.ensure([], () => r(require('../components/claims/AcquisitionPath.vue')), 'acquisition_path')
        }
      }
    ]
  }
]
