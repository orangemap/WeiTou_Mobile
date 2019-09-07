export default [{
	name:'customer',
	path: '/customer',
	component(r) {
		require.ensure([], () => r(require('../components/customerManage/customer.vue')), 'customer')
	},
	children:[
		{
		name:'customerManage',
		path: 'customerManage',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerManage/customerManage.vue')), 'customerManage')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerPhone',
		path: 'customerPhone',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerAdd/customerPhone.vue')), 'customerPhone')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerInfoAll',
		path: 'customerInfoAll',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerAdd/customerInfoAll.vue')), 'customerInfoAll')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerAdd',
		path: 'customerAdd',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerAdd/customerInfo.vue')), 'customerInfo')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerAddress',
		path: 'customerAddress',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerAdd/customerAddress.vue')), 'customerAddress')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerBank',
		path: 'customerBank',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerAdd/customerBank.vue')), 'customerBank')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerAddPerson',
		path: 'customerAddPerson',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerInfo/customerAddPerson.vue')), 'customerAddPerson')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerInfo',
		path: 'customerInfo',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerInfo/customerInfo.vue')), 'customerInfo')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerList',
		path: 'customerList',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerInfo/customerList.vue')), 'customerList')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerInfoAddress',
		path: 'customerInfoAddress',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerInfo/customerAddress.vue')), 'customerAddress')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'customerInfoBank',
		path: 'customerInfoBank',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerInfo/customerBank.vue')), 'customerBank')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'detail',
		path: 'detail',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerDetail/detail.vue')), 'detail')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	},{
		name:'profession',
		path: 'profession',
		component(r){
			require.ensure([], () => r(require('../components/customerManage/customerDetail/profession.vue')), 'profession')
		},
		meta: {
			login: false,
			hasTabs: false,
			hasHeader:false
		}
	}
	]
}]
