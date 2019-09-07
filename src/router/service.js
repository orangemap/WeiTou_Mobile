export default[{
	name: 'service',
	path: '/service',
	component(r) {
		require.ensure([], () => r(require('../components/serviceInfo/service.vue')), 'service')
	},
	children:[{
		name: 'serviceInfo',
		path: 'serviceInfo',
		component(r){
			require.ensure([], () => r(require('../components/serviceInfo/serviceInfo.vue')), 'serviceInfo')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}
  ]
}]