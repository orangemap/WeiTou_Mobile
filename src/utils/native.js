const native = {
    //获取手机通讯录
	/*	
		https://www.npmjs.com/package/cordova-plugin-contacts
		https://blog.csdn.net/u011127019/article/details/79256447
		
		utils.native.contactsFind((contacts)=>{
		    this.contacts = contacts
		},(err)=>{
			console.log(err)
		})
		<div v-for="item in contacts">
			<div v-for="itm in item.phoneNumbers">
				<p>{{item.displayName}}</p>
				<p v-if="itm.type == 'mobile'">{{itm.value}}</p>
			</div>
		</div>
	 */
    contactsFind(success, fail) {
        try {
            //获取列表
            var contactFileds = ["displayName", "nickname", "name", "phoneNumbers", "emails", "address"];
            //filter制定为空或不指定返回所有联系人列表
            var options = { filter: "", multiple: true };
            navigator.contacts.find(contactFileds, success, fail, options)
        } catch (err) {
            alert(err)
        }
    },
    //1 如果是竖排，则改为横排 / !1 如果是横排，则改为竖排
    changeScreen(status, success, fail) {
        try {
            var hybrid = 'hybrid://MAScreenChange:401/invokeChange?' + JSON.stringify({ "isPortrait": status })
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            alert(err)
        }
    },
    //调用原生拨打电话界面
    /*
          utils.native.callPhone("15321776071",(body)=>{
        console.log(body)
    },(err)=>{
        console.log(err)
    })
    */
    callPhone(iphone, success, fail) {
        try {
            var hybrid = 'hybrid://MAApkIphone:401/invokeApkIphone?' + JSON.stringify({ "url": iphone })
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            alert(err)
        }
    },
    //调用原生发送短信页面
    /*
        utils.native.sendSms("15321776071", "今天天气不错",(body)=>{
        console.log(body)
    },(err)=>{
        console.log(err)
    }) 
    */
    sendSms(iphone, body, success, fail) {
        try {
            var hybrid = 'hybrid://MASendSms:401/invokeSend?' + JSON.stringify({ "iphone": iphone, "body": body })
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            alert(err)
        }
    },
    //调用原生旷世人脸识别获取人脸图像,用于后续接口验证
    faceVerify(success, fail) {
        try {
            var hybrid = 'hybrid://MAFaceIdentify:401/invokeFaceIdentify?'
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            alert(err)
        }
    },
    //调用原生旷世人脸识别获取人脸图像,用于后续接口验证
    face3Verify(name, idno, success, fail) {
    	utils.getBizToken.get(name, idno).then(response => {
			if(response.success){
				console.log(response.data)
				try {
		            var hybrid = 'hybrid://MAFaceId3entify:401/invokeFaceIdentify?' + JSON.stringify({ "bizToken": response.data })
		            console.log(hybrid)
		            MAPlugin.hybridCallAction(hybrid, success, fail);
		        } catch (err) {
		            alert(err)
		        }
			}else{
				alert_n22.alert('提示', response.message)
			}
		})
    },
    //调用科大讯飞语音转文字功能进行内容录入
    speechRec(success, fail) {
        try {
            var hybrid = 'hybrid://MASpeech:401/invokeSpeech?0'
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            alert(err)
        }
    },
    //调用原生二维码识别功能获取二维码内容
    qrCode(success, fail) {
        try {
            var hybrid = 'hybrid://MAQRCode:401/invokeQRCode?0'
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            alert(err)
        }
    },
    //调用原生OCR身份证识别获取身份证影像,isPortrait为true获取人像正面,反之国徽反面
    ocrIdCard(isPortrait, success, fail) {
        try {
            var hybrid = 'hybrid://MAOcrIdCard:401/invokeOcrIdCard?' + isPortrait ? 0 : 1
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            alert(err)
        }
    },
    loginRecord(agentCode, username, channel, success, fail) {
        try {
            var hybrid = 'hybrid://MALoginRecord:401/invokeRecord?' + JSON.stringify({ "agentCode": agentCode,"username": username,"channel": channel })
            console.log(hybrid)
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            console.log(err, "<<<请移至真机验证函数调用>>>")
        }
    },
    openWeChar(success, fail) {
        try {
            var hybrid = 'hybrid://MAOpenWeChar:401/invokeOpen?0'
            console.log(hybrid)
            MAPlugin.hybridCallAction(hybrid, success, fail);
        } catch (err) {
            console.log(err, "<<<请移至真机验证函数调用>>>")
        }
    }
}
export default native
