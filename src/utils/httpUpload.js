/**
	示例: 

 */
import axios from 'axios'
import cache from './cache'
import format from './format'
import store from '../vuex/store'
import { MessageBox } from 'mint-ui'
import router from '../router/index.js'

//开启后在提示失败后会重新加载页面
let globalIsReload = false

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
  	config.url = globalConfig.rootUploadUrl + "/com.ifp.imgbusiness/interface/image/upload"
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
		let resp = JSON.parse(response.data)
		if(resp.resultCode=='0'){
			return response
		}else{
			utils.ui.modal.afterOpen()
		    MessageBox({
		      title:'提示',
		      message:resp.resultMessage,
		      closeOnClickModal: false
		    }).then(() => {
		      	utils.ui.modal.beforeClose()
		    })
	  		return
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
  
  upload(service, params,isReload) {
  	
  	if(isReload != undefined){
  		globalIsReload = isReload
  	}else{
  		globalIsReload = false
  	}
  	
  	console.log("%c 是否开启重新加载>>>>>>>", 'color:blue', globalIsReload)
    console.log("%c 请求数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(params)))
    
  	return instance.post(service, params)
  }
}