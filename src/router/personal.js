export default[{
	name: 'personal',
	path: '/personal',
	component(r) {
		require.ensure([], () => r(require('../components/personal/personal.vue')), 'personal')
	},
	children:[{
		name: 'personalInfo',
		path: 'personalInfo',
		component(r){
			require.ensure([], () => r(require('../components/personal/personalInfo.vue')), 'personalInfo')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'personalData',
		path: 'personalData',
		component(r){
			require.ensure([], () => r(require('../components/personal/personalData.vue')), 'personalData')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'about',
		path: 'about',
		component(r){
			require.ensure([], () => r(require('../components/personal/about.vue')), 'about')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'updatePass',
		path: 'updatePass',
		component(r){
			require.ensure([], () => r(require('../components/personal/updatePass.vue')), 'updatePass')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'personalPersonal',
		path: 'personalPersonal',
		component(r){
			require.ensure([], () => r(require('../components/personal/personalPersonal.vue')), 'personalPersonal')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'personalMessageDetail',
		path: 'personalMessageDetail',
		component(r){
			require.ensure([], () => r(require('../components/personal/personalMessageDetail.vue')), 'personalMessageDetail')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name: 'personalMessage',
		path: 'personalMessage',
		component(r){
			require.ensure([], () => r(require('../components/personal/personalMessage.vue')), 'personalMessage')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		},
		children:[{
			name: 'personalMessageKH',
			path: 'personalMessageKH',
			component(r){
				require.ensure([], () => r(require('../components/personal/message/personalMessageKH.vue')), 'personalMessageKH')
			},
			meta: {
				login: false,
				hasTabs: false,
				hasHeader:false
			}
		},{
			name: 'personalMessageGR',
			path: 'personalMessageGR',
			component(r){
				require.ensure([], () => r(require('../components/personal/message/personalMessageGR.vue')), 'personalMessageGR')
			},
			meta: {
				login: false,
				hasTabs: false,
				hasHeader:false
			}
		},{
			name: 'personalMessageSys',
			path: 'personalMessageSys',
			component(r){
				require.ensure([], () => r(require('../components/personal/message/personalMessageSys.vue')), 'personalMessageSys')
			},
			meta: {
				login: false,
				hasTabs: false,
				hasHeader:false
			}
		}]
	}]
}]