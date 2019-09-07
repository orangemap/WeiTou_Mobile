import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	policyState:1,/*页数*/
	VuxPolicyType:'',/*出险类型*/
	policyData:{
		customerName:'',/*出险人姓名*/
		customerSex:'',/*出险人性别*/
		customerBirthDay:'',/*出险人生日*/
		customerIDType:'',/*出险人证件类型*/
		customerIDNo:'',/*出险人证件号*/
		customerNative:'',/*出险人国籍*/
		relation:'',/*被保人与投保人关系*/
	},
	newPolicyType:'',/*字符串出险类型*/
	policyCode:'new',/*理赔/报案id*/
	fileImgList:'',/*待上传的报案id,报案请求报文需要*/
	policyId:'',/*报案号(已报案列表的)*/
	newPolicyCode:'',/*已报案列表分步获取返回的报案id*/
	customerName:'',/*赔案出险人信息页所需(投保人名字)*/
	compensate:{},/*以赔案理赔详情展示数据*/
	policy_1_imgList:[],/*已报案影像补传的影像id*/
	policy_2_imgList:[]/*已赔案影像补传的影像id*/
}	
const mutations = {
	SetPolicyState(state,newNum) {
		state.policyState = newNum
	},
	SetPolictType(state,arr) {
		let newStr = ''
		console.log(arr)
		for(let i = 0; i<arr.length ;i++){
			if(arr[i].active){
				newStr+= (arr[i].key+',')
			}
		}
		state.VuxPolicyType = newStr
		state.VuxPolicyType = state.VuxPolicyType.substr(0,state.VuxPolicyType.length-1)
	},
	SetpolicyData(state,newObject){
		state.policyData = newObject
	},
	SetpolicyCode(state,newStr) {
		state.policyCode = newStr
	},
	SetnewPolicyType(state,newStr) {
		state.newPolicyType = newStr
	},
	SetfileImgList(state,newStr) {
		state.fileImgList = newStr
	},
	SetpolicyId(state, newStr) {
		state.policyId = newStr
	},
	SetnewPolicyCode(state, newStr) {
		state.newPolicyCode = newStr
	},
	SetcustomerName(state, newStr){
		state.customerName = newStr
	},
	Setcompensate(state, newObject){
		state.compensate = newObject
	},
	Setpolicy_1_imgList(state, newArr) {
		state.policy_1_imgList = newArr
	},
	Setpolicy_2_imgList(state, newArr) {
		state.policy_2_imgList = newArr
	}
}

export default new Vuex.Store({
	state,mutations
})