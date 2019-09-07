/**
	无请求中的等待提示 
	连续调用接口eg:
	import { Indicator } from 'mint-ui';
	
	let requ = {
        "personsal": {
			"mobile": ""
		}
    }
	Indicator.open('加载中...');
    utils.n22_http.postFast('MOSENDCODE',requ,(body)=>{
    	utils.n22_http.postFast('MOSENDCODE',requ,(body)=>{
    		utils.n22_http.postFast('MOSENDCODE',requ,(body)=>{
    			Indicator.close();
    			alert_n22.alert('系统提示','三次请求执行结束','关闭')
    		})
    	})
    })
*/
import axios from 'axios'

let instance = axios.create({
	method: 'post',
	timeout: 50000,
	withCredentials: true,
	headers: {
		post: {
			'Content-Type': ''
		}
	}
})

/*请求拦截器----request*/
instance.interceptors.request.use(function(config) {
	let params = {
		"packageList": {
			"packages": {
				"header": {
					"requestType": config.url,
					"comId": globalConfig.comId,
					"from": globalConfig.from,
					"sendTime": new Date().format('yyyy-MM-dd HH:mm:ss'),
					"orderSerial": "orderId",
					"comSerial": "comSerial"
				},
				request: DES3.encrypt('', JSON.stringify(config.data)).replace(/\s/g, "")
			}
		}
	}
	let paramStr = JSON.stringify(params)
	let sign = hex_hmac_md5(globalConfig.transfer, paramStr)
	config.url = globalConfig.rootUrl + sign + '&com_id=' + globalConfig.comId
	config.data = paramStr
	return config
}, error => {
	alert_n22.alert('系统提示', '网络异常,请检查网络！', '关闭')
})

/*返回拦截器----response*/
instance.interceptors.response.use(function(response) {
	try {
		response.data.packageList.packages.response = JSON.parse(DES3.decrypt('', response.data.packageList.packages.response))
		console.log("%c 返回接口名称>>>>>>>", 'color:blue', response.data.packageList.packages.header.requestType + '	END_TIME : ' + new Date().format('yyyy-MM-dd HH:mm:ss'))
		console.log("%c 返回数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(response.data)))
		console.log("--------↑-↑-↑-↑-↑-↑-↑-↑-↑-↑-↑-↑----------------")
	} catch(e) {
		alert_n22.alert('系统提示', '系统异常，请稍后重试！', '关闭')
		return
	}
	response.data = response.data.packageList.packages;
	return response
}, error => {
	let errMsg = '' + error
	console.log(errMsg)
	if(errMsg.indexOf('timeout') != -1 || errMsg.indexOf('Network') != -1) {
		alert_n22.alert('系统提示', '网络超时,请检查网络！', '关闭')
	} else if(errMsg.indexOf('404') != -1 || errMsg.indexOf('500') != -1 || errMsg.indexOf('503') != -1) {
		alert_n22.alert('系统提示', '系统繁忙，请稍后重试！', '关闭')
	} else {
		alert_n22.alert('系统提示', '系统繁忙，请稍后重试！', '关闭')
	}
})

export default {
	axios: axios,
	post(service, params) {
		console.log("--------↓-↓-↓-↓-↓-↓-↓-↓-↓-↓-↓-↓----------------")
		console.log("%c 请求接口名称>>>>>>>", 'color:blue', service + '	START_TIME : ' + new Date().format('yyyy-MM-dd HH:mm:ss'))
		console.log("%c 请求数据>>>>>>>", 'color:green', JSON.parse(JSON.stringify(params)))
		return instance.post(service, params)
	},
	postFast(service, params, success) {
		utils.n22_http.post(service, params).then(response => {
			console.log(response)
			let data = response.data.response
			let projectHead = response.data.header
			if(projectHead.responseCode != 0) {
				let stringIndex = response.data.header.errorMessage.indexOf("at com")
				let errorMessage = response.data.header.errorMessage.slice(0, stringIndex)
				if(stringIndex > -1) {
					alert_n22.alert('系统提示', errorMessage, '关闭')
				} else {
					alert_n22.alert('系统提示', projectHead.errorMessage, '关闭')
				}
			} else if(projectHead.responseCode == 0) {
				//此处返回为response部分
				success(data, projectHead)
			}
		}).catch(error => {
			console.log(error)
//			alert_n22.alert('系统提示', error, '关闭')
		})
	},
	getConfig(index,result){
		let requ = {
	        "proposalPlan": {
				"fileType": index
			}
	    }
	    utils.n22_http.postFast('TERMSPRODUCT',requ,(body)=>{
	    	console.log(body)
	    	if(index == 0){
	    		utils.cache.set('CONFIG_proposalPlan',body)
	    	}else{
	    		utils.cache.set('CONFIG_newPtoduct_policyName_product',body)
	    	}
	    	result(body)
	    })
	}
}