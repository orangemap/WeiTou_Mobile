/**
	示例: 
	//http://mitst.sunlife-everbright.com:8010/com.ifp.ipartner/edorPdf?EdorNo=2020501A04308274&type=conservationEdorPdf
	
	utils.httpEdorPdf.get('2020501B05008039','conservationEdorPdf').then(response => {
		console.log(response)
		if(response.success){
			console.log(response.message)
			console.log(response.data)
		}else{
			console.log(response.message)
			console.log(response.data)
		}
	})
 */
import axios from 'axios'
import cache from './cache'
import format from './format'
import store from '../vuex/store'
import { MessageBox } from 'mint-ui'
import router from '../router/index.js'

//开启后在提示失败后会重新加载页面
let globalIsReload = false
let globalType = ''

let instance = axios.create({
  timeout: 50000,
  withCredentials: true,
})

function showError() {
  store.commit('SHOWLOADING', {
    showLoding: false
  })
  store.commit('TOGGLE_TOAST', {
    toast: true,
    toastMsg: '网络异常,请检查网络'
  })
};

/*请求拦截器----request*/
instance.interceptors.request.use(function(config) {
  	store.commit('SHOWLOADING', {
    	showLoding: true
  	})
  	return config
}, error => {
  store.commit('TOGGLE_TOAST', {
    toast: true,
    toastMsg: '发送请求失败！'
  })
  utils.ui.modal.afterOpen()
  MessageBox({
    title: '提示',
    message: '网络异常,请检查网络！',
    closeOnClickModal: false
  }).then(() => {
    	utils.ui.modal.beforeClose()
    	if(globalIsReload){
  			router.replace({
		      path: '/used/empty',
		      query: { redirect: router.currentRoute.fullPath },
			})
		}	
  })
})

/*返回拦截器----response*/
instance.interceptors.response.use(function(response) {
  	store.commit('HIDELOADING', {
    	loading: true
  	})
  	try {
  		console.log(response)
		if(JSON.stringify(response.headers).indexOf('application/PDF') != -1 || response.data.indexOf('fail') == -1){
			//成功返回PDF
			let resp = {}
			if(globalType == 'claimEdorPdf'){
				resp = {
					success:true,
					message:'请跳转浏览器下载理赔通知书!',
					data:response.data
				}
			}else{
				resp = {
					success:true,
					message:'请跳转浏览器下载批注含!',
					data:response.data
				}
			}
			return resp
		}else{
			let resp = {}
			if(globalType == 'claimEdorPdf'){
				resp = {
					success:false,
					message:'抱歉，由于结案时间较久，理赔通知书下载失败，请您联系分公司客服人员获取！',
					data:response.data
				}
			}else{
				resp = {
					success:false,
					message:'批单正在生成中，请您24小时之后查看！',
					data:response.data
				}
			}
			return resp
		}
	} catch (e) {
    	utils.ui.modal.afterOpen()
	    MessageBox({
	      title:'提示',
	      message:'系统异常，请稍后重试！',
	      closeOnClickModal: false
	    }).then(() => {
	      	utils.ui.modal.beforeClose()
	      	if(globalIsReload){
	  			router.replace({
			      path: '/used/empty',
			      query: { redirect: router.currentRoute.fullPath },
				})
	  		}
	    })
  		return
  	}
}, error => {
  store.commit('HIDELOADING', {
    loading: true
  })
  let errMsg = ''+error
  console.log(errMsg)
  if(errMsg.indexOf('timeout') != -1 || errMsg.indexOf('Network') != -1){
    utils.ui.modal.afterOpen()
    MessageBox({
      title: '提示',
      message: '网络超时,请检查网络！',
      closeOnClickModal: false
    }).then(() => {
      	utils.ui.modal.beforeClose()
      	if(globalIsReload){
  			router.replace({
		      path: '/used/empty',
		      query: { redirect: router.currentRoute.fullPath },
			})
  		}
    })
  }else if(errMsg.indexOf('404') != -1 || errMsg.indexOf('500') != -1 || errMsg.indexOf('503') != -1){
    utils.ui.modal.afterOpen()
    MessageBox({
      title: '提示',
      message: '系统繁忙，请稍后重试！',
      closeOnClickModal: false
    }).then(() => {
      	utils.ui.modal.beforeClose()
      	if(globalIsReload){
  			router.replace({
		      path: '/used/empty',
		      query: { redirect: router.currentRoute.fullPath },
			})
  		}
    })
  }else{
  	utils.ui.modal.afterOpen()
    MessageBox({
      title: '提示',
      message: '系统繁忙，请稍后重试！',
      closeOnClickModal: false
    }).then(() => {
      	utils.ui.modal.beforeClose()
      	if(globalIsReload){
  			router.replace({
		      path: '/used/empty',
		      query: { redirect: router.currentRoute.fullPath },
			})
  		}
    })
  }
})
export default {
  axios: axios,
  
  get(params,type,isReload) {
  	
  	if(isReload != undefined){
  		globalIsReload = isReload
  	}else{
  		globalIsReload = false
  	}
  	
  	console.log("%c 是否开启重新加载>>>>>>>", 'color:blue', globalIsReload)
    console.log("%c 请求数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(params)))
    console.log("%c 请求数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(type)))
    
	let host = window.globalConfig.rootUrl.split('/')[2]
	let protocol = window.globalConfig.rootUrl.split(':')[0]
  	let postil_down_url = protocol + '://' + host + '/com.ifp.ipartner/edorPdf'
  	globalType = type
    return instance.get(postil_down_url ,{params: {'EdorNo': params,'type': type}})
  }
}