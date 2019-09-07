import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	//保单详情
	policyData:{
		contNo:'',
		custNo:'',
		prtNo:'',
		holder:'',//投保人信息
		insurent:[],//被保人信息
		bnfList:[],//受益人信息
		ContInfo:'',
//		server:'',//保全项
	},
	//证件变更
	perData:{
		code:'',//批单寄送方式
		email:'',//邮箱
		front:'',//证件正面ID
		backed:'',//证件反面ID
		cerCard:'',//证件号
		endDate:'请选择',
		startDate:'请选择',
		frontImg:'',
		backImg:'',
	},
	//批量回传
	signData:{
		signNum:'',//签名返回的filedid
		faceNum:'',//人脸识别返回的filedid
		conservationId:'',//保全单号
		conservationIdentityId:'',//证件变更id
		edorNo:'',//保全ID
		conno:'',//保全受理号
		conservationPolicyPayId:'',//保单缴费id
		conservationRetreatsId:'',//退保id
		conservationFeeAddPayId:'',//追加保费id
		conservationPolicyresendId:'',//保单补发id
		conservationAccountvalueId:'',//部分提取id
	},
	//保单交费
	policyPremium:{
		postalType:'',//批单寄送方式
		pEmail:'',//邮箱
		rNPrem:'',//交费金额
		bankCode:'',//交费银行编码
		bankAccName:'',//交费银行名称
		bankCard:'',//卡号
		idFront:'',//证件正面id
		idBack:'',//证件反面id
		frontImg:'',//正面base64
		backImg:'',//反面base64
		insuAccBala:'',//
		address:'',//地址
		zipCode:'',//邮编
		phone:'',//联系电话
		edorReasonCode:'',//退保原因编码
		edorReason:'',//退保原因
		mainRask:'',//主险名称
	},
}	
const mutations = {
	//保单详情
	SetpolicyData(state,newObject){
		state.policyData = newObject
	},
	//证件变更
	SetpolicyCode(state,newStr) {
		state.perData = newStr
	},
	//批量回传
	SetSignData(state,newStr) {
		state.signData = newStr
	},
	//保单交费
	SetPremiumData(state,newStr) {
		state.policyPremium = newStr
	}
}

export default new Vuex.Store({
	state,mutations
})