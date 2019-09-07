export default [{
	name: 'preservation',
	path: '/preservation',
	component(r) {
		require.ensure([], () => r(require('../components/preservation/Preservation.vue')), 'preservation')
	},
	children:[
		{
		name: 'preservationPolicySearch',
		path: 'preservationPolicySearch',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPolicySearch.vue')), 'preservationPolicySearch')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPolicyDetail',
		path: 'preservationPolicyDetail',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPolicyDetail.vue')), 'preservationPolicyDetail')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPolicyHolderChange',
		path: 'preservationPolicyHolderChange',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPolicyHolderChange.vue')),'preservationPolicyHolderChange')
			},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPolicybnfChange',
		path: 'preservationPolicybnfChange',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPolicybnfChange.vue')),'preservationPolicybnfChange')
			},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPolicyInsurentChange',
		path: 'preservationPolicyInsurentChange',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPolicyInsurentChange.vue')), 'preservationPolicyInsurentChange')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPolicyOverChange',
		path: 'preservationPolicyOverChange',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPolicyOverChange.vue')), 'preservationPolicyOverChange')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPolicyReissue',
		path: 'preservationPolicyReissue',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPolicyReissue.vue')), 'preservationPolicyReissue')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPolicyPremium',
		path: 'preservationPolicyPremium',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPolicyPremium.vue')), 'preservationPolicyPremium')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPremiumAddition',
		path: 'preservationPremiumAddition',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationPremiumAddition.vue')), 'preservationPremiumAddition')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationSurrender',
		path: 'preservationSurrender',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationSurrender.vue')), 'preservationSurrender')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationAccount',
		path: 'preservationAccount',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PreservationAccount.vue')), 'preservationAccount')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationAccountAffirm',
		path: 'preservationAccountAffirm',
		component(r){
			require.ensure([], () => r(require('../components/preservation/preservationAccountAffirm.vue')), 'preservationAccountAffirm')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'preservationPolicyReissueAffirm',
		path: 'preservationPolicyReissueAffirm',
		component(r){
			require.ensure([], () => r(require('../components/preservation/preservationPolicyReissueAffirm.vue')), 'preservationPolicyReissueAffirm')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}
	,{
		name: 'preservationPolicyShareReissueAffirm',
		path: 'preservationPolicyShareReissueAffirm',
		component(r){
			require.ensure([], () => r(require('../components/preservation/preservationPolicyShareReissueAffirm.vue')), 'preservationPolicyShareReissueAffirm')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}
	,{
		name: 'preservationPolicyChangeAffirm',
		path: 'preservationPolicyChangeAffirm',
		component(r){
			require.ensure([], () => r(require('../components/preservation/preservationPolicyChangeAffirm.vue')), 'preservationPolicyChangeAffirm')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'policySearch',
		path: 'policySearch',
		component(r){
			require.ensure([], () => r(require('../components/preservation/PolicySearch.vue')), 'policySearch')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}
	]
}]
