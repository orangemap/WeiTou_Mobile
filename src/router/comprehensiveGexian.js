export default[{
	/*综合查询-个险*/
	path: '/comprehensiveGexian',
	component(r) {
		require.ensure([], () => r(require('../components/comprehensive/Arisk/comprehensive.vue')), 'comprehensive')
	},
	children:[{
		/*综合查询default*/
		path: 'comprehensiveInfo',
		component(r){
			require.ensure([], () => r(require('../components/comprehensive/Arisk/comprehensiveInfo.vue')), 'comprehensiveInfo')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{/*下载*/
		path: 'AriskmyCommissionDownload/:type',
		component(r){
			require.ensure([], () => r(require('../components/comprehensive/Arisk/myCommission/myCommissionDownload.vue')), 'AriskmyCommissionDownload')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{/*考核预警*/
		path: 'AssessmentYujing/:type',
		component(r){
			require.ensure([], () => r(require('../components/comprehensive/Arisk/myAssessment/AssessmentYujing.vue')), 'AssessmentYujing')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{/*团队考核下载*/
		path: 'AssessmentYujingLoad/:year/:mounth',
		component(r){
			require.ensure([], () => r(require('../components/comprehensive/Arisk/myAssessment/AssessmentYujingLoad.vue')), 'AssessmentYujingLoad')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},
	{/*正式考核*/
		path: 'FormalAssessment',
		component(r){
			require.ensure([], () => r(require('../components/comprehensive/Arisk/myAssessment/FormalAssessment.vue')), 'FormalAssessment')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		},
		children:[
			{/*默认left*/
				path:'',
				redirect:'left1',
				component(r){
					require.ensure([],() => r(require('../components/comprehensive/Arisk/myAssessment/Fromal/left1.vue')), 'left1')
				},
				meta: {
					login: false,
					hasTabs: false,
					hasHeader: false
				}

			},
			{/*left1*/
				path:'left1',
				component(r){
					require.ensure([],() => r(require('../components/comprehensive/Arisk/myAssessment/Fromal/left1.vue')), 'left1')
				},
				meta: {
					login: false,
					hasTabs: false,
					hasHeader: false
				}

			},
			{/*left2*/
				path:'left2',
				component(r){
					require.ensure([],() => r(require('../components/comprehensive/Arisk/myAssessment/Fromal/left2.vue')), 'left2')
				},
				meta: {
					login: false,
					hasTabs: false,
					hasHeader: false
				}

			},
			{/*right*/
				path:'right',
				component(r){
					require.ensure([],() => r(require('../components/comprehensive/Arisk/myAssessment/Fromal/right.vue')), 'right')
				},
				meta: {
					login: false,
					hasTabs: false,
					hasHeader: false
				}

			},
		]
	},
	{/*我的佣金*/
		path: 'AriskmyCommission',
		component(r){
			require.ensure([], () => r(require('../components/comprehensive/Arisk/myCommission/myCommission.vue')), 'AriskmyCommission')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		},
		children:[
		{
			path:'',
			redirect:'AriskmyCommissionDetails',
			component(r){
				require.ensure([], () => r(require('../components/comprehensive/Arisk/myCommission/myCommissionDetails.vue')),'AriskmyCommissionDetails')
			},
			meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
			}
		},
		{
			path:'AriskmyCommissionDetails',
			component(r){
				require.ensure([], () => r(require('../components/comprehensive/Arisk/myCommission/myCommissionDetails.vue')),'AriskmyCommissionDetails')
			},
			meta: {
				login: false,
				hasTabs: false,
				hasHeader:false
			}
		},
		{
			path:'AriskmyCommissionAnalysis',
			component(r){
				require.ensure([], () => r(require('../components/comprehensive/Arisk/myCommission/myCommissionAnalysis.vue')),'AriskmyCommissionAnalysis')
			},
			meta: {
				login: false,
				hasTabs: false,
				hasHeader:false
			}
		}]
	}
	]
}]
