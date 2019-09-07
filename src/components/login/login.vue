<template>
	<div class="loginCon">
	<!--公司logo-->
		<!--<p style="height:14%;"></p>-->
		<div class="logo">
			<img src="../../../static/img/login/logos.png" style="width:80%;"/>
		</div>
		<!--<p style="height:12%;"></p>-->
		<div class="login-content">
			<div class="uName">
				<input type="text" placeholder="手机号/身份证号/工号" v-model="input_text">
				<img src="../../../static/img/login/delete.png" @click="clearinput()">
			</div>
			<div class="uPwd">
				<input v-show="isOpen" type="text" placeholder="请输入密码" v-model="input_passWord">
				<input v-show="!isOpen" type="password" placeholder="请输入密码" v-model="input_passWord">
<!--				<img v-show="isOpen" src="../../../static/img/login/open.png" @click="showHidePassword()">-->
<!--				<img v-show="!isOpen" src="../../../static/img/login/close.png" @click="showHidePassword()">-->
			</div>
			<!-- 记住密码 -->
			<div class="rememberPassword">
				<input type="checkbox" v-model="checked" class="choose" @change="handleChange()">
				<div class="choose_text">
					<span style="font-size: 16px;">记住密码</span>
				</div>
			</div>
			<!-- 建议书显示问题:去除注册和忘记密码功能 -->
			<div class="valid">
				<div class="phone_number">
					<a style="font-size: 16px;color:#007ED0;text-decoration: underline;" @click="phoneRegister()">注册</a>
				</div>
				<div class="pass_word">
					<a style="font-size: 16px;color:#007ED0;text-decoration: underline;" @click="forgetPassword()">忘记密码</a>
				</div>
			</div>
			<div class="button">
				<input type="submit" @click="logIN()" value="登  录" class="login_button">
			</div>
		</div>
		<mt-popup position="center" v-model="isShow" class="phone_valid">
			<div class="mobileNumber">
				<div class="mNumber_text">手机号码</div>
				<div class="mNumber_input">
					<input type="text" v-model="input_phone">
				</div>
			</div>
			<div class="valid_number">
				<div class="vNumber_text">验证码</div>
				<div class="vNumber_input">
					<input type="text" v-model="input_validNum">
				</div>
				<div @click="sendNum()">
					<mt-button v-show="validNotShow" :disabled="disabled.sendDisabled">{{time}}秒后重发</mt-button>
					<mt-button v-html="timeEnd" v-show="validShow" :disabled="disabled.endDisabled"></mt-button>
				</div>
			</div>
			<div class="line"></div>
			<div class="confirmButton">
				<div class="confirm_button">
					<div style="color:#fff" @click="validPhoneNum()">确定</div>
				</div>
				<div class="cancle_button" style="color:#fff" @click="handleCancel()">取消</div>
			</div>
		</mt-popup>
		<p style="position:relative;top:25%;left:32%;">{{"版本号："+version}}</p>
		<alert ref="alert" style="position:absolute;z-index:9999999999999"></alert>
	</div>
</template>

<script>
	import alert from '../policy/common/alert.vue'
	import { Toast } from 'mint-ui'
	export default {
		name: "login",
		components: {
			alert,
			Toast
		},
		data() {
			return {
				isOpen: false,
				isChanle: false,
				isShow: false,
				input_text: "",
				input_passWord: "",
				checked: false,
				isChecked: '',
				validShow: true,
				validNotShow: false,
				input_phone: "",
				input_validNum: "",
				input_code: '',
				timer: '',
				time: 60,
				timeEnd: "发送验证码",
				disabled: {
					sendDisabled: false,
					endDisabled: false
				},
				opinion: true,
				version: ""
			}
		},
		methods: {
			clearinput() {
				this.input_text = "";
				this.input_passWord = "";
			},
			showHidePassword() {
				this.isOpen = !this.isOpen
			},
			//验证手机号不能为空
			validPhoneNum1: function() {
				var phoneNum = true;
				if(this.input_phone == "") {
					this.$refs.alert.showMOdal('手机号码不可为空,请确认！')
					phoneNum = false;
				} else {
					phoneNum = true;
				}
				return phoneNum
			},
			//验证手机号格式
			validPhoneNum2: function() {
				var phoneNum = true;
				// var reg=/^1[34578]\d{9}$/;
				var reg = /^[\d]{11}$/;
				if(!reg.test(this.input_phone)) {
					this.$refs.alert.showMOdal('手机号码格式不正确,请重新输入！')
					phoneNum = false;
				} else {
					phoneNum = true;
				}
				return phoneNum
			},
			//验证手机验证码不能为空
			validNumText: function() {
				var phoneNum = true;
				if(this.input_validNum == "") {
					this.$refs.alert.showMOdal('验证码不能为空！')
					phoneNum = false;
				} else {
					phoneNum = true;
				}
				return phoneNum
			},
			//验证码定时器状态
			ControlTime() {
				this.timer = setInterval(() => {
					if(this.time <= 60 && this.time > 0) {
						this.time--
							this.disabled.sendDisabled = true
					} else if(this.time == 0) {
						this.timeEnd = "重新获取"
						this.validShow = true
						this.validNotShow = false
						clearInterval(this.timer)
						this.time = 60
						this.disabled.endDisabled = false
					}
				}, 1000)
			},
			//请求验证码事件
			sendNum() {
				let isSend = true;
				if(isSend == true) {
					isSend = this.validPhoneNum1();
				}
				if(isSend == true) {
					isSend = this.validPhoneNum2();
				}
				if(isSend == true) {
					this.validNotShow = true
					this.validShow = false
					//请求验证码 
					let requ = {
						"personsal": {
							"mobile": this.input_phone
						}
					}
					utils.http.post('MOSENDCODE', requ).then(response => {
						console.log(response);
						let personsal = response.data.response.personsal
						console.log("验证返回", personsal)
						if(response.data.header.responseCode == "0") {
							console.log("验证码返回成功");
							if(globalConfig.buildType != undefined && globalConfig.buildType == 'Test') {
								Toast({
									message: '验证码: ' + personsal.message,
									position: 'bottom',
									duration: 3000
								});
							}
							this.ControlTime();
						} else if(response.data.header.responseCode != "0") {
							console.log("验证码返回失败");
							this.validShow = true
							this.validNotShow = false
						}
					}).catch(error => {
						console.log("请求失败")
						this.validNotShow = false
						this.validShow = true
					})
				}
			},
			//点击验证手机号注册事件
			phoneRegister: function() {
				this.isShow = !this.isShow;
				this.opinion = true;
			},
			//点击忘记密码事件
			forgetPassword: function() {
				this.isShow = !this.isShow;
				this.opinion = false;
			},
			//点击取消按钮事件
			handleCancel: function() {
				this.isShow = !this.isShow
				// clearInterval(this.timer);
			},
			//点击确定验证手机验证码并跳转到注册页面
			validPhoneNum: function() {
				var validNum = true;
				if(validNum == true) {
					validNum = this.validPhoneNum1();
				}
				if(validNum == true) {
					validNum = this.validPhoneNum2();
				}
				if(validNum == true) {
					validNum = this.validNumText();
				}
				if(validNum == true) {
					utils.cache.set('login_phone', this.input_phone)
					//验证验证码 
					let requ = {
						"personsal": {
							"mobile": this.input_phone,
							"message": this.input_validNum
						}
					}
					utils.http.post('MOVALICODE', requ).then(response => {
						this.ControlTime();
						console.log(response.data);
						let personsal = response.data.response.personsal
						console.log("验证结果返回", personsal)
						if(response.data.header.responseCode == "0") {
							if(this.opinion == true) {
								this.$router.push("/logins/register");
							} else if(this.opinion == false) {
								this.resetPassword();
							}
						} else if(response.data.header.responseCode != "0") {
							let stringIndex = response.data.header.errorMessage.indexOf("at com")
							let errorMessage = response.data.header.errorMessage.slice(0, stringIndex)
							console.log(errorMessage);
							this.$refs.alert.showMOdal(errorMessage)
						}
					}).catch(error => {

					})
					this.isShow = false;
					clearInterval(this.timer);
				}
			},
			//点击忘记密码并重置密码为初始密码
			resetPassword: function() {
				console.log("请求初始密码")
				//发送初始密码请求
				let requ = {
					"personsal": {
						"agentName": this.input_text,
						"cerdNum": "",
						"mobile": this.input_phone
					}
				}
				utils.http.post('MOINITPWD', requ).then(response => {
					// console.log(response);	
					let personsal = response.data.response.personsal
					// console.log("初始密码返回",personsal)
					if(response.data.header.responseCode == "0") {
						this.$refs.alert.showMOdal('密码重置为初始密码')
					} else if(response.data.header.responseCode != "0") {
						let stringIndex = response.data.header.errorMessage.indexOf("at com")
						let errorMessage = response.data.header.errorMessage.slice(0, stringIndex)
						console.log(errorMessage);
						this.$refs.alert.showMOdal(errorMessage)
					}
				}).catch(error => {

				})
			},
			//记住密码
			handleChange: function() {
				console.log('是否记住密码', this.checked);
			},
			//登录事件
			logIN() {
				utils.cache.removeItem('activeList')
				utils.cache.removeItem('agentList')
				utils.cache.removeItem('productList')
				let isValid = true;
				//验证用户账号
				if(this.input_text == "") {
					this.$refs.alert.showMOdal('账号不能为空')
					isValid = false;
				} else if(this.input_text.length > 30) {
					this.$refs.alert.showMOdal('账号请输入30个以内字符')
					isValid = false;
				}
				// 		    	if(this.input_text=="" && this.input_passWord==""){
				// 		    		this.$refs.alert.showMOdal('账号/密码不可为空,请确认！')
				// 		    		isValid=false;
				// 		    	}
				//验证用户密码
				//花旗银行（用户名：Citi1 身份证号：110101199003078312    手机：13581804879）
				//民生银行（用户名：Cmbc1 身份证号：110101199003078099    手机：13693036973）
				//光大银行（用户名：Ceb1 身份证号：110101199003077053     手机：13601091317）
				if(this.input_text == 'Citi1' || this.input_text == '110101199003078312' || this.input_text == '13581804879' ||
					this.input_text == 'Cmbc1' || this.input_text == '110101199003078099' || this.input_text == '13693036973' ||
					this.input_text == 'Ceb1' || this.input_text == '110101199003077053' || this.input_text == '13601091317') {
					let ip = returnCitySN.cip
					console.log(ip)
					let ip_t = ip.split(".")
					//console.log(ip_t)
					//192.193.132.*，192.193.160.*，192.193.164.*
					if(ip_t[0] == '192' && ip_t[1] == '193' && ip_t[2] == '132') {
						//this.$refs.alert.showMOdal('无需输入密码'+ip_t)
					} else if(ip_t[0] == '192' && ip_t[1] == '193' && ip_t[2] == '160') {
						//this.$refs.alert.showMOdal('无需输入密码'+ip_t)
					} else if(ip_t[0] == '192' && ip_t[1] == '193' && ip_t[2] == '164') {
						//this.$refs.alert.showMOdal('无需输入密码'+ip_t)
					} else if(ip_t[0] == '106' && ip_t[1] == '39' && ip_t[2] == '37') { //无线
						//this.$refs.alert.showMOdal('无需输入密码'+ip_t)
					} else if(this.input_passWord == "") {
						this.$refs.alert.showMOdal('密码不能为空' + ip_t)
						isValid = false;
					} else if(this.input_passWord.length > 30) {
						this.$refs.alert.showMOdal('密码请输入30个以内字符')
						isValid = false;
					}
				} else if(this.input_passWord == "") {
					this.$refs.alert.showMOdal('密码不能为空')
					isValid = false;
				} else if(this.input_passWord.length > 30) {
					this.$refs.alert.showMOdal('密码请输入30个以内字符')
					isValid = false;
				}
				if(isValid == true) {
					let requ
					//发送登录请求
					if(this.input_text == 'Citi1' || this.input_text == '110101199003078312' || this.input_text == '13581804879') {
						requ = {
							"personsal": {
								"agentCode": this.input_text,
								"password": hex_hmac_md5(globalConfig.transfer, '078312')
							}
						}
					} else if(this.input_text == 'Cmbc1' || this.input_text == '110101199003078099' || this.input_text ==
						'13693036973') {
						requ = {
							"personsal": {
								"agentCode": this.input_text,
								"password": hex_hmac_md5(globalConfig.transfer, '078099')
							}
						}
					} else if(this.input_text == 'Ceb1' || this.input_text == '110101199003077053' || this.input_text ==
						'13601091317') {
						requ = {
							"personsal": {
								"agentCode": this.input_text,
								"password": hex_hmac_md5(globalConfig.transfer, '077053')
							}
						}
					} else {
						requ = {
							"personsal": {
								"agentCode": this.input_text,
								"password": hex_hmac_md5(globalConfig.transfer, this.input_passWord)
							}
						}
					}
					requ.personsal.update = "00"
	    			this.requestToLogin(requ)
				}
			},
			//发送登录请求
			requestToLogin(requ){
				utils.http.post('MOLOGIN', requ).then(response => {
					// console.log("数据",response);	
					let personsal = response.data.response.personsal
					console.log("登录返回", personsal)
					//获取主页面所有图片并存缓存
					let arr = [],
						productList = [],
						agentList = [];
					for(let i of personsal.activeList) {
						if(i.fileType == '1') {
							arr = arr.concat(i.remoteUrl)
						}
					}
					//获取热销产品图
					for(let i of personsal.productList) {
						productList = productList.concat(i)
					}
					console.log(productList, '11111111')
					//获取代理人头像背景图
					for(let i of personsal.agentList) {
						agentList = agentList.concat(i)
					}
					utils.cache.set('activeList', arr)
					utils.cache.set('agentList', agentList)
					utils.cache.set('productList', productList)
					if(response.data.header.responseCode == "0") {
						if(personsal.channel == '13' //（金融市场部渠道）
							||
							personsal.channel == '02' //（银保渠道）
						) {
							personsal.edition = '1' //银保版本
						} else if(personsal.channel == '01' //（01代理人渠道）
							||
							personsal.channel == '03' //（03老综金渠道）
							||
							personsal.channel == '04' //（04综金渠道）
							||
							personsal.channel == '05' //（04中介渠道）
							||
							personsal.channel == '06' // (06续期渠道)
							||
							personsal.channel == '11' //（团险职域渠道）
							||
							personsal.channel == '00' // 特殊配置
						) {
							personsal.edition = '2' //综金版本
						}
						utils.cache.set("personsal", personsal)
						//账号存缓存
						utils.cache.set("agentCode", this.input_text)
						//用户工号存缓存
						utils.cache.set("agentCodeNum", personsal.agentCode)
						utils.native.loginRecord(personsal.agentCode,personsal.agentName,personsal.channel, (body) => {}, (err) => {})
						//用户权限模块保存
						console.log("模块权限返回", personsal.loginMedol)
						utils.cache.set("loginMedol", personsal.loginMedol)
						//业务人员姓名身份证号
						utils.cache.set("agent", personsal.agentName)
						utils.cache.set("agentNum", personsal.cerdNum)
						//代理人地区存缓冲
						utils.cache.set("orgID", personsal.orgId)
						//渠道存缓冲
						utils.cache.set("channel", personsal.channel)
						// console.log(this.checked)
						// 密码存缓存
						let password = {
							"password": this.input_passWord,
							"checked": this.checked
						}
						if(this.checked == true) {
							utils.cache.set("passwordInfo", password);
						} else {
							utils.cache.removeItem("passwordInfo")
						}
						if(personsal.agentCode == '6100I01207' ||
						   	personsal.agentCode == '3600000073' ||
						   	personsal.agentCode == '1200A27206' ||
						   	personsal.agentCode == '5108000208' ||
						   	personsal.agentCode == '4502000985' ||
						   	personsal.agentCode == '1100000069' ||
						   	personsal.agentCode == '3703000295' ||
						   	personsal.agentCode == '3206000292' ||
						   	personsal.agentCode == '3301000031' ||
						   	personsal.agentCode == '2104000389' ||
						   	personsal.agentCode == '1200A06989' ||
						   	personsal.agentCode == '3100000048' ||
						   	personsal.agentCode == '2801001404' ||
						   	personsal.agentCode == '3704000078' ||
						   	personsal.agentCode == '4103000113' ||
						   	personsal.agentCode == '2200000159' ||
						   	personsal.agentCode == '3202F02246' ||
						   	personsal.agentCode == '1307000622' ||
						   	personsal.agentCode == '2809000425' ||
						   	personsal.agentCode == '6100000296'
						){
							this.$router.push({
								name: "ambassadorImage",
								query: {
									t: new Date().getTime()
								}
							})
						}else if(personsal.channel=='00'){
							this.$router.push({
								name: "personalInfo",
								query: {
									t: new Date().getTime()
								}
							})
						}else{
							this.$router.push({
								name: "home",
								query: {
									t: new Date().getTime()
								}
							})
						}
					} else if(response.data.header.responseCode != "0") {
						let stringIndex = response.data.header.errorMessage.indexOf("at com")
						let errorMessage = response.data.header.errorMessage.slice(0, stringIndex)
						console.log(errorMessage);
						this.$refs.alert.showMOdal(errorMessage)
					}
				}).catch(error => {

				})
			},
			//提示框
			showMsg: function(msg) {   
				if(msg != undefined && msg != "") {         
					this.$refs.alert.showMOdal(msg)
				}
			},
		},
		mounted() {
			var _height = $('.logo')
			var u = navigator.userAgent;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS) {
				if(screen.height == 812 && screen.width == 375) {
					_height.css({
						"marginTop": "30%"
					})
				}
			}
			
			let LoginHeight = document.documentElement.clientHeight + 'px';
			$('.loginCon').css('height', LoginHeight).css('overflow', 'hidden');
			window.onresize = function() {
				let LoginHeight = document.documentElement.clientHeight + 'px';
				$('.loginCon').css('height', LoginHeight).css('overflow', 'hidden');
			}
			//给版本号赋值
			this.version = globalConfig.version;
			console.log("本地版本号", this.version);
			//记住账号
			if(this.input_text == "") {
				this.input_text = utils.cache.get("agentCode");
				// console.log(this.input_text);
			}
			//记住密码
			if(!this.checked && utils.cache.get("passwordInfo") != null) {
				this.input_passWord = utils.cache.get("passwordInfo").password;
				this.checked = utils.cache.get("passwordInfo").checked;
				// console.log(this.input_passWord)
			}
			/*清除除帐号密码外所有缓存*/
			utils.cache.removeItem("personsal");
			utils.cache.removeItem("productCode");
			utils.cache.removeItem("planId");
			utils.cache.removeItem("proposalConfig");
			utils.cache.removeItem("holderSexFlag");
			utils.cache.removeItem("insurantSexFlag");
			utils.cache.removeItem("zhuxianPremium");
			utils.cache.removeItem("zhuxianMoney");
			utils.cache.removeItem("totalPremium");
			utils.cache.removeItem("job");
			utils.cache.removeItem("proposalPlan");
			utils.cache.removeItem("productCodeDetail");
			utils.cache.removeItem("signInfo");
			utils.cache.removeItem("orgID");
			utils.cache.removeItem("channel");
			//zhangxin,此数据在电子保单页面使用,用于存储是否查看单证信息,及单证数据
			utils.cache.removeItem("documentInfo");
			//zhangxin,此数据在告知页面使用,用于存储成功保存数据后获取的orderId
			utils.cache.removeItem("policy_orderId");
			//liangxin,此数据用于电子投保单页面单证阅读勾选框,判断勾选状态
			utils.cache.removeItem("readStatus");
		}
	}
</script>

<style type="text/css" scoped>
	.loginCon {
		width: 100%;
		height: 100%;
		background: url('./../../../static/img/login/bg.png') no-repeat bottom left #F7F6F5;
		background-size: 100% 15%;
		text-align: center;
	}
	
	.logo {
		width: 100%;
		margin:14% 0 12% 0;
		box-sizing: border-box;
	}
	
	.login-content ::-webkit-input-placeholder {
		/* WebKit browsers */
		font-size: 14px;
	}
	
	.login-content {
		width: 100%;
		height: 40%;
	}
	
	.login-content>.uName,
	.login-content>.uPwd {
		width: 62%;
		height: 35px;
		line-height: 35px;
		margin: 15px auto;
		padding: 0 5px 0 10px;
		border: 2px solid #C6C6C6;
		border-radius: 8px;
		background: #fff;
		position: relative;
	}
	
	.login-content>.uName>img,
	.login-content>.uPwd>img {
		width: 25px;
		height: 25px;
		position: absolute;
		bottom: 4px;
		right: 12px;
		cursor: pointer;
	}
	
	input {
		width: 100%;
		height: 100%;
		font-size: 16px;
	}
	/*忘记密码 */
	
	.valid {
		width: 69%;
		height: 35px;
		margin: 0px auto;
		display: flex;
		margin: 5px auto;
	}
	
	.phone_number,
	.pass_word {
		height: 50px;
		line-height: 50px;
		text-align: left;
	}
	
	.phone_number {
		width: 60%;
	}
	
	.pass_word {
		width: 40%;
		text-align: right;
	}
	
	.button {
		width: 52%;
		height: 25px;
		margin: 15px auto;
		background: #FEB101;
		border-radius: 7px;
	}
	
	.login_button {
		color: #fff;
		font-size: 18px;
		border: none;
		outline: none;
		background: transparent;
	}
	/*记住密码 */
	
	.rememberPassword {
		width: 69%;
		height: 20px;
		margin: 0 auto;
		display: flex;
	}
	
	.choose {
		width: 10%;
		margin-left: 0px;
	}
	
	.choose_text {
		width: 90%;
		text-align: left;
	}
	/*验证注册 */
	
	.phone_valid {
		width: 313px;
		height: 194px;
		background: #fff;
		margin: 0px auto;
		border-radius: 10px;
	}
	
	.mobileNumber {
		width: 264px;
		margin: 21px 24px 0px 24px;
		display: flex;
	}
	
	.mNumber_text {
		width: 75px;
		height: 34px;
		text-align: left;
		line-height: 34px;
	}
	
	.mNumber_input {
		width: 187px;
		height: 34px;
		border: 1px solid #CCCCCC;
		border-radius: 7px;
		background: #fff;
	}
	
	.mNumber_input>input {
		width: 95%;
	}
	
	.valid_number {
		width: 264px;
		margin: 10px 24px 0px 24px;
		display: flex;
	}
	
	.valid_number button {
		display: inline-block;
		width: 89px;
		height: 34px;
		color: #fff;
		border-radius: 7px;
		background: #FF5527;
		margin-left: 11px;
		line-height: 34px;
		text-align: center;
		padding: 0;
		font-size: 14px;
	}
	
	.vNumber_text {
		width: 73px;
		height: 34px;
		text-align: center;
		line-height: 34px;
	}
	
	.vNumber_input {
		width: 101px;
		height: 34px;
		text-align: left;
		border: 1px solid #CCCCCC;
		border-radius: 7px;
		background: #fff;
	}
	
	.vNumber_input {
		width: 89px;
		height: 34px;
		text-align: left;
	}
	
	.vNumber_input>input {
		width: 90%;
	}
	
	.send_vNumber,
	.vNumber_timer {
		width: 89px;
		height: 34px;
		color: #fff;
		border-radius: 7px;
		background: #FF5527;
		margin-left: 11px;
		line-height: 34px;
		text-align: center;
	}
	/*其他 */
	
	.line {
		width: 283px;
		height: 17px;
		margin: 0px auto;
		border-bottom: 3px dashed #D4D4D4;
	}
	
	.confirmButton {
		width: 204px;
		height: 39px;
		margin: 20px 58px 0px 58px;
		display: flex;
		justify-content: space-between;
	}
	
	.confirm_button,
	.cancle_button {
		width: 91px;
		height: 39px;
		border-radius: 7px;
		background: #FEB101;
		text-align: center;
		line-height: 39px;
	}
</style>
