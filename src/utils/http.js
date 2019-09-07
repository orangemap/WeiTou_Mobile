 import axios from 'axios'
import cache from './cache'
import format from './format'
import store from '../vuex/store'
import { MessageBox } from 'mint-ui'
import router from '../router/index.js'

//开启后在提示失败后会重新加载页面
let globalIsReload = false

let instance = axios.create({
  method: 'post',
  timeout: 150000,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': ''
    }
  }
})


function showMsgBox(errorMessage){
	utils.ui.modal.afterOpen()
	if(globalIsReload){
		MessageBox({
		    title: '提示',
		    message: errorMessage,
		    closeOnClickModal: false,
		    confirmButtonText: '重试',
		    showCancelButton: true,
		    cancelButtonText: '退出'
	  	}).then((action) => {
	  		utils.ui.modal.beforeClose()
	  		if(action == 'confirm'){
	  			router.replace({
			      	path: '/used/empty',
			      	query: { redirect: router.currentRoute.fullPath },
				})
		  	}else if(action == 'cancel'){
		  		router.replace({path: '/logins/login'})
		  	}
	  	});
	}else{
		MessageBox({
		    title: '提示',
		    message: errorMessage,
		    closeOnClickModal: false,
	  	}).then((action) => {
	  		utils.ui.modal.beforeClose()
	  	});
	}
}


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
  let params = {
    "packageList": {
      "packages": {
        "header": {
            "requestType": config.url,
            "comId": globalConfig.comId,
            "from": globalConfig.from,
            "sendTime": new Date().format('yyyy-MM-dd HH:mm:ss'),
            "orderSerial": "orderId",
            "comSerial": "comSerial",
            "uuid": utils.common.getUUID()
        },
        request: DES3.encrypt('', JSON.stringify(config.data)).replace(/\s/g, "")
      }
    }
  }
  let paramStr = JSON.stringify(params)
  let sign = hex_hmac_md5(globalConfig.transfer, paramStr)
  config.url = globalConfig.rootUrl  + sign + '&com_id=' + globalConfig.comId
  config.data = paramStr
  return config
}, error => {
  store.commit('TOGGLE_TOAST', {
    toast: true,
    toastMsg: '发送请求失败！'
  })
  showMsgBox('网络异常,请检查网络！')
})

/*返回拦截器----response*/
instance.interceptors.response.use(function(response) {
  store.commit('HIDELOADING', {
    loading: true
  })
  try {
    response.data.packageList.packages.response = JSON.parse(DES3.decrypt('', response.data.packageList.packages.response))
    console.log("%c 返回接口>>>>>>>", 'color:blue', response.data.packageList.packages.header.requestType)
    console.log("%c 返回数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(response.data)))
  } catch (e) {
  	showMsgBox('系统异常，请稍后重试！')
  	return
  }
  response.data = response.data.packageList.packages;
  return response
}, error => {
  store.commit('HIDELOADING', {
    loading: true
  })

  let errMsg = ''+error
  console.log(errMsg)
  if(errMsg.indexOf('timeout') != -1 || errMsg.indexOf('Network') != -1){
  	showMsgBox('网络超时,请检查网络！')
  }else if(errMsg.indexOf('404') != -1 || errMsg.indexOf('500') != -1 || errMsg.indexOf('503') != -1){
    showMsgBox('系统繁忙，请稍后重试！')
  }else{
  	showMsgBox('系统繁忙，请稍后重试！')
  }
})
export default {
  axios: axios,
  post(service, params,isReload) {
  	if(isReload != undefined){
  		globalIsReload = isReload
  	}else{
  		globalIsReload = false
  	}
  	console.log("%c 请求接口>>>>>>>", 'color:blue', service)
  	console.log("%c 是否开启重新加载>>>>>>>", 'color:blue', globalIsReload)
    console.log("%c 请求数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(params)))
    return instance.post(service, params)
  },
  postFast(service ,params,success,isReload){
    utils.http.post(service,params,isReload).then(response => {
      if(response == undefined){
      	showMsgBox('网络超时,请检查网络！')
    	return
      }
      let data = response.data.response
      let projectHead = response.data.header
      if(projectHead.responseCode != 0){
        let stringIndex=response.data.header.errorMessage.indexOf("at com")
        let errorMessage=response.data.header.errorMessage.slice(0,stringIndex)
        if(stringIndex>-1){
    		showMsgBox(errorMessage)
        }else{
        	showMsgBox(projectHead.errorMessage)
        }
      }else if(projectHead.responseCode == 0){
        //此处返回为response部分
        success(data,projectHead)
      }
    }).catch(error => {
    	console.error('异常输出 ==> ',error)
      	console.log('系统异常，请联系管理员!' + error)
    })
  }
}
