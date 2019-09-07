export default [
{/*自助理赔*/
	path: '/settlement',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_home.vue')), 'settlement')
	}
},
{/*客户选择*/
	path: '/settlement_user/:type',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlementUserChange.vue')), 'settlement_user')
	}
},
/*报案*/
{/*出险信息*/
	path: '/settlement_details',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_details.vue')), 'settlement_details')
	},
	children:[
	{
		path:'',
		redirect:'settlement_policy',
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_detail/settlement_policy.vue')), 'settlement_policy')
		}
	},
	{
		path:'settlement_policy/:claimId',/*出险信息*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_detail/settlement_policy.vue')), 'settlement_policy')
		}
	},
	{
		path:'settlement_user/:claimId',/*出险人信息*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_detail/settlement_user.vue')), 'settlement_user')
		}
	},
	{
		path:'settlement_upload/:type',/*资料上传*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_detail/settlement_upload.vue')), 'settlement_upload')
		}
	},
	{
		path:'data_affirm/:fileId',/*信息确认*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_detail/dataAffirm.vue')), 'data_affirm')
		}
	}
	]
},
{/*报案记录查询*/
	path:'/ReportRecord',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/ReportRecord.vue')), 'ReportRecord')
	}
},
{/*影像上传*/
	path:'/settlementUploadImg/:type',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlementUploadImg.vue')), 'settlementUploadImg')
	}
},
{/*影像补传*/
	path:'/settlementUploadList/:id',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_uploadList.vue')), 'settlementUploadList')
	}
},
{/*影像补传 上传页*/
	path:'/settlementUploadImg2/:type',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlementUploadImg2.vue')), 'settlementUploadImg2')
	}
},
/*赔案*/
{/*赔案记录查询*/
	path:'/pReportRecord',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/pReportRecord.vue')), 'pReportRecord')
	}
},
{/*赔案须知*/
	path:'/settlement_notice/:type/:id',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_notice.vue')), 'settlement_notice')
	}
},
{/*赔案*/
	path: '/settlement_content',
	meta: {
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_content.vue')), 'settlement_details')
	},
	children:[
	{
		path:'',
		redirect:'settlement_policy',/*出险信息*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_content/settlement_policy.vue')), 'settlement_policy')
		}
	},
	{
		path:'settlement_policy/:type/:claimId',/*出险信息*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_content/settlement_policy.vue')), 'settlement_policy')
		}
	},
	{
		path:'settlement_user/:claimId',/*出险人信息*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_content/settlement_user.vue')), 'settlement_user')
		}
	},
	{
		path:'settlement_upload/:type',/*资料上传*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_content/settlement_upload.vue')), 'settlement_upload')
		}
	},
	{
		path:'data_affirm/:fileId',/*信息确认*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_content/dataAffirm.vue')), 'data_affirm')
		}
	},
	{
		path:'data_affirm_share/:claimsId/:fileId',/*信息确认*/
		meta: {
			login: false,
			hasFooter: false,
			hasTabs: false,
			hasHeader:false
		},
		component(r) {
			require.ensure([], () => r(require('../components/settlement/settlement_content/dataAffirmShare.vue')), 'data_affirm_share')
		}
	}
	]
},
{/*赔案影像上传页*/
	path:'/uploadFile/:type',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_content/uploadFile.vue')), 'uploadFile')
	}
},
{/*赔案影像补传列表*/
	path:'/settlementUploadListAdd/:id',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_content/settlement_uploadList_add.vue')), 'settlementUploadListAdd')
	}
},
{/*赔案影像补传页*/
	path:'/settlementUploadAdd/:id',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_content/settlement_upload_add.vue')), 'settlementUploadAdd')
	}
},
{/*已赔案列表理赔详情*/
	path:'/settlementDetail/:id',
	meta:{
		login: false,
		hasFooter: false,
		hasTabs: false,
		hasHeader:false
	},
	component(r) {
		require.ensure([], () => r(require('../components/settlement/settlement_content/settlement_detail.vue')), 'settlementDetail')
	}
},
]