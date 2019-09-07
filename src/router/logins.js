export default[{
	name: 'logins',
	path: '/logins',
	component(r) {
		require.ensure([], () => r(require('../components/login/logins.vue')), 'logins')
	},
	children:[{
		name: 'login',
		path: 'login',
		component(r){
			require.ensure([], () => r(require('../components/login/login.vue')), 'login')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{
		name: 'register',
		path: 'register',
		component(r){
			require.ensure([], () => r(require('../components/login/register.vue')), 'register')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{
		name: 'videoUpload',
		path: 'videoUpload/:planId',
		component(r){
			require.ensure([], () => r(require('../components/login/videoUpload.vue')), 'register')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{
		name: 'humanNucleus',
		path: 'humanNucleus',
		component(r){
			require.ensure([], () => r(require('../components/login/humanNucleus.vue')),'humanNucleus')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}
]
}]