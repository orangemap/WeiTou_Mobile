export default [{
	name: 'proposal',
	path: '/proposal',
	component(r) {
		require.ensure([], () => r(require('../components/proposal/Proposal.vue')), 'proposal')
	},
	children:[
		{
		name: 'prolist',
		path: 'prolist',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProductListPage.vue')), 'prolist')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{
		name: 'prodetails',
		path: 'prodetails/:planId/:step',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProductDetailsPage.vue')), 'prodetails')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
		{
		name: 'proposalList',
		path: 'list',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProposalList.vue')), 'proposalList')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{
		name: 'addProduct',
		path: 'addProduct',
		component(r){
			require.ensure([], () => r(require('../components/proposal/AddProduct.vue')), 'addProduct')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{
		name: 'proposalDemo',
		path: 'demo/:planId',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProposalDemo.vue')), 'proposalDemo')
		},
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'proposalShare',
		path: 'share/:planId',
		component(r){
			require.ensure([], () => r(require('../components/proposal/ProposalShare.vue')), 'proposalDemoShare')
		},
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		}
	}]
}]