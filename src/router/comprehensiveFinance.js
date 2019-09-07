export default [{
	name: 'comprehensiveFinance',
	path: '/comprehensiveFinance',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader: false
	},
	component(r) {
		require.ensure([], () => r(require('../components/comprehensiveFinance/comprehensiveFinance.vue')), 'comprehensiveFinance')
	}
}]