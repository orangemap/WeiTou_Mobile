export default[{
	name: 'productManual',
	path: '/productManual',
	component(r) {
		require.ensure([], () => r(require('../components/productManual/productManual.vue')), 'productManual')
	},
	children:[{
		name: 'productManualInfo',
		path: 'productManualInfo',
		component(r){
			require.ensure([], () => r(require('../components/productManual/productManualInfo.vue')), 'productManualInfo')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}]
}]