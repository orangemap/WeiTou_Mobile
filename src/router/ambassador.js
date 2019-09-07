export default[{
	name: 'ambassador',
	path: '/ambassador',
	component(r) {
		require.ensure([], () => r(require('../components/ambassador/ambassador.vue')), 'ambassador')
	},
	children:[{
		name: 'ambassadorImage',
		path: 'ambassadorImage',
		component(r){
			require.ensure([], () => r(require('../components/ambassador/ambassadorImage.vue')), 'ambassadorImage')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}
]
}]