export default[{
	name: 'down',
	path: '/down',
	component(r) {
		require.ensure([], () => r(require('../components/downInfo/down.vue')), 'down')
	},
	children:[
		{
		name: 'info',
		path: 'info/:platform',
		component(r){
			require.ensure([], () => r(require('../components/downInfo/downInfo.vue')), 'info')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}
  ]
}]