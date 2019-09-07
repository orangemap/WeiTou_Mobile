<!--更换头像-->
<template>
	<div class="personal">
		<Headerbtns title="个人中心">
			<!-- <i class="fa fa-angle-left" slot="left" @click="pre" v-show="personsal.channel != '00'"></i> -->
		</Headerbtns>
		<div class="main-contents">
			<div class="agentInfo">
				<div class="agentInfo_top" style="padding: 5% 5%;">
					<div>
						<p style="font-size: 18px;color:#333;font-weight: 500;margin-top: 4%;">{{personsal.agentName}}</p>
						<img @click="previewPortrait()" id="bbb" v-if="agentAvator != null && agentAvator != ''" :src="agentAvator" style="width: 55px;height: 55px;border-radius: 50%;">
					</div>
					<p>
						<img src="../../../static/img/personal/icon_01.png" style="width:7px;height:14px;margin-right: 10px;" />
						<span style="font-size: 16px;color:#666;">{{personsal.jobNum}}</span>
					</p>
					<p>
						<img src="../../../static/img/personal/icon_02.png" style="width:14px;height:9px;margin-right: 3px;" />
						<span style="font-size: 14px;color:#666;">{{personsal.agentCode}}</span>
					</p>
				</div>
				<div class="agentInfo_bottom" style="padding: 5% 5%;border-top: 1px solid #EFEFEF;" v-show="personsal.channel=='00' || personsal.channel=='01' || personsal.channel=='03' || personsal.channel=='04' || personsal.channel=='11'">
					<div @click="loc('0')" style="width:50%;padding-right: 20px;">
						<p>
							<img src="../../../static/img/personal/icon_sign_in.png" style="width:14px;height:14px;margin-right: 5px;" />
							<span style="font-size:16px;color:#FDB92C;">签到</span>
						</p>
						<i class="fa fa-angle-right"></i>
					</div>
					<div @click="loc('1')" style="width:49%;padding-left: 20px;border-left:1px solid #ccc;">
						<p>
							<img src="../../../static/img/personal/icon_sign_out.png" style="width:13px;height:14px;margin-right: 5px;" />
							<span style="font-size:16px;color:#666;">签退</span>
						</p>
						<i class="fa fa-angle-right"></i>
					</div>
				</div>
			</div>
			<ul>
				<li @click="go('/personal/personalData')">
					<p>
						<img src="../../../static/img/personal/icon_per_01.png" style="width:18px;height:18px;margin-right: 7px;" />
						<span>个人资料</span>
					</p>
					<i class="fa fa-angle-right"></i>
				</li>
				<li style="height:9px;background: #F5F5F5;"></li>
			<!-- 	<li @click="go('/proposal/list')" v-show="personsal.channel != '00'">
					<p>
						<img src="../../../static/img/personal/icon_per_02.png" style="width:18px;height:15px;margin-right: 7px;" />
						<span>建议书列表</span>
					</p>
					<i class="fa fa-angle-right"></i>
				</li> -->
				<li style="height:9px;background: #F5F5F5;"></li>
				<li @click="go('/personal/about')" style="border-bottom:1px solid #EFEFEF;">
					<p>
						<img src="../../../static/img/personal/icon_per_03.png" style="width:18px;height:18px;margin-right: 7px;" />
						<span>关于</span>
					</p>
					<i class="fa fa-angle-right"></i>
				</li>
				<li @click="go('/personal/updatePass')" style="border-bottom:1px solid #EFEFEF;">
					<p>
						<img src="../../../static/img/personal/icon_per_04.png" style="width:14px;height:18px;margin-right: 11px;" />
						<span>修改密码</span>
					</p>
					<i class="fa fa-angle-right"></i>
				</li>
				<li @click="loginOut()">
					<p>
						<img src="../../../static/img/personal/icon_per_05.png" style="width:18px;height:18px;margin-right: 7px;" />
						<span>退出登录</span>
					</p>
					<i class="fa fa-angle-right"></i>
				</li>
				<li style="height:9px;background: #F5F5F5;"></li>
			</ul>
		</div>
		<!-- 更改头像 -->
		<mt-actionsheet :actions="actionsAvator" v-model="showUpdateAvator">
		</mt-actionsheet>
		<!--文本提示框-->
		<alert ref="alert"></alert>
		<!--签到成功/失败-->
		<div class="showMsg_su" v-if="showMsg_su">
			<div>
				<img src="../../../static/img/personal/icon_ok.png" alt="">
				<p>{{showMsg_msg}}</p>
			</div>
		</div>
		<div class="showMsg_er" v-if="showMsg_er">
			<div>
				<img src="../../../static/img/personal/icon_x.png" alt="">
				<p>{{showMsg_msg}}</p>
			</div>
		</div>
		<!--右角菜单-->
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		<!--提示对话框-->
		<Modal ref="HintDialog" :title="'温馨提示'" :content="hint.login" @detonate="confirmToLogin" @cancel="cancelToLogin"></Modal>
		<!--底部Tab-->
		<tabBar :isHome="false" :serviceInfo="true" :productManualInfo="true" :me="false"></tabBar>
	</div>
</template>

<!--js-->
<script>
	import { Spinner } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import Headerbtns from '../../../src/components/policy/common/Header'
	import Modal from '../../../src/components/policy/common/Modal.vue'
	import alert from '../policy/common/alert.vue'
	import picker from '../common/Picker.vue'
	import tabBar from '../common/TabBar.vue'
	import '../policy/css/base.css'

	export default {
		name: 'personalPersonal',
		components: {
			Headerbtns,
			alert,
			picker,
			tabBar,
			Actionsheet,
			Toast,
			Modal,
			Spinner
		},
		props: ['value'],
		data() {
			return {
				personsal: '', //代理人对象信息
				locInfo: {}, //定位信息
				agentAvator: "",
				sex: "", //代理人性别
				extUrl: "", //代理人agentList中的值,再次存缓存时使用
				imageName: "", //代理人agentList中的值,再次存缓存时使用
				sheetVisible: false,
				showUpdateAvator: false,
				actionsAvator: [{
						name: "从相册选择",
						method: this.getNewPhotos
					},
					{
						name: "拍照",
						method: this.capturePhoto
					}
				],
				//提示语
				hint: {
					login: '退出当前登录账户?'
				},
				toggle: {},
				dict: {},
				selectResult: "1",
				link: "",
				locationInfo: '',
				isLoc: false, //定位成功关闭等待圈
				actions: [{
						name: "消息中心",
						method: this.toMessage
					},
					{
						name: "返回首页",
						method: this.pre
					}
				],
				showMsg_su: false,
				showMsg_er: false,
				showMsg_msg: ''
			}
		},
		watch: {

		},
		beforeMount() {

		},
		mounted() {
			//从缓存中获取代理人对象信息
			this.personsal = utils.cache.get('personsal')
			console.log("从缓存中获取代理人对象信息", this.personsal)
			//截取代理人身份证号取性别
			let agentIdno = this.personsal.cerdNum.substring(16, 17)
			console.log("sex", agentIdno)
			let agentSex = agentIdno % 2
			console.log("取余", agentSex)
			if(agentSex == 0) {
				this.sex = '2' //偶数为女
			} else {
				this.sex = '1' //奇数为男
			}
			//头像数组
			let avatorList = utils.cache.get("agentList")
			console.log("touxiang", avatorList)
			for(var i = 0; i < avatorList.length; i++) {
				if(avatorList[i].pageCode == "3") {
					this.agentAvator = avatorList[i].remoteUrl
				} else {
					if(this.sex == "1") {
						this.agentAvator = "../../../static/img/personal/man.png"
					} else if(this.sex == "2") {
						this.agentAvator = "../../../static/img/personal/women.png"
					}
				}
			}
		},
		beforeDestroy() {
			Indicator.close();
		},
		methods: {
			toMessage() {
				this.$router.push('/personal/personalMessage/personalMessageKH')
			},
			// 头像新页面跳转预览
			previewPortrait() {
				this.$router.push({
					name: 'personalPersonal'
				})
			},
			locAMap(isRegeo, complete, error) {
				let map, geolocation;
				//加载地图，调用浏览器定位服务
				map = new AMap.Map('container', {
					resizeEnable: true
				});
				map.plugin('AMap.Geolocation', () => {
					geolocation = new AMap.Geolocation({
						enableHighAccuracy: true, //是否使用高精度定位，默认:true
						timeout: 300000, //超过5分钟后停止定位，默认：无穷大
						buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
						zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
						buttonPosition: 'RB'
					});
					map.addControl(geolocation);
					geolocation.getCurrentPosition();
					//返回定位信息
					AMap.event.addListener(geolocation, 'complete', (data) => {
						console.log('定位成功===>' + ' 经度：' + data.position.getLng() + ' 纬度：' + data.position.getLat() + ' 精度：' + data.accuracy + ' 米' + '是否经过偏移：' + (data.isConverted ? '是' : '否'))
						//是否进行逆地理编码
						if(isRegeo) {
							this.regeocoder([data.position.getLng(), data.position.getLat()], (result) => {
								console.log('逆地理编码结果===>', result)
								complete(data.position.getLng(), data.position.getLat(), result)
							})
						} else {
							complete(data.position.getLng(), data.position.getLat(), null)
						}
					});
					//返回定位出错信息
					AMap.event.addListener(geolocation, 'error', (data) => {
						error(data.message)
						console.log('定位失败===>' + data.message)
					});
				});
			},
			//逆地理编码
			regeocoder(lnglatXY, complete) {
				let resultInfo = {}
				let geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});
				geocoder.getAddress(lnglatXY, (status, result) => {
					if(status === 'complete' && result.info === 'OK') {
						let addressComponent = result.regeocode.addressComponent; //地址信息
						let aois = result.regeocode.aois; //返回地址描述
						let crosses = result.regeocode.crosses; //定位点附近的道路交叉口信息
						let pois = result.regeocode.pois; //定位点附近的POI信息
						let roads = result.regeocode.roads; //定位点附近的道路信息
						let address = result.regeocode.formattedAddress; //返回地址描述
						resultInfo.address = result.regeocode.formattedAddress; //返回地址描述
						resultInfo.province = addressComponent.province; //所在省
						resultInfo.city = addressComponent.city; //所在城市
						resultInfo.citycode = addressComponent.citycode; //所在城市编码
						resultInfo.district = addressComponent.district; //所在区
						resultInfo.adcode = addressComponent.adcode; //所在区域编码
						resultInfo.township = addressComponent.township; //所在乡镇
						resultInfo.street = addressComponent.street; //所在街道
						resultInfo.streetNumber = addressComponent.streetNumber; //门牌号
						resultInfo.neighborhood = addressComponent.neighborhood; //所在社区
						resultInfo.neighborhoodType = addressComponent.neighborhoodType; //社区类型
						resultInfo.building = addressComponent.building; //所在楼/大厦
						complete(resultInfo)
					}
				});
			},
			//点击头像,修改头像
			updateAvator() {
				console.log("头像修改")
				this.showUpdateAvator = !this.showUpdateAvator
			},
			//获取本地相册
			getNewPhotos: function() {
				getNewPhoto(pictureSource.SAVEDPHOTOALBUM, (imageData) => {
					let index = 1;
					if(index == 1) {
						let positive = document.getElementById('bbb');
						positive.style.display = 'inline-block'
						positive.src = "data:image/jpeg;base64," + imageData
						this.imageUpload(1, imageData)
					}
				}, (message) => {
					// alert(message)
				})
			},
			//调取相机拍照
			capturePhoto: function() {
				let index = 1;
				capturePhotoCallback((imageData) => {
					if(index == 1) {
						let positive = document.getElementById('bbb');
						positive.style.display = 'inline-block'
						positive.src = "data:image/jpeg;base64," + imageData
						// this.avatar = imageData
						this.imageUpload(1, imageData)
					}
				}, (message) => {
					// alert(message)
				})
			},
			//上传头像
			imageUpload: function(context_id, image) {
				let agentCode = utils.cache.get('personsal').agentCode
				if(image != "") {
					let requ = {
						"upload": {
							"agentCode": agentCode,
							"applyCode": '',
							"orderId": '12345',
							"policyCode": "",
							"deviceNo": "",
							"imageList": [{
								"imageType": 'agent',
								"imageName": agentCode + ".jpg",
								"imageByte": image
							}]
						}
					}
					if(requ.upload.imageList[0].imageByte != undefined && requ.upload.imageList[0].imageByte != "") {
						console.log(requ, '上传头像请求参数')
						utils.http.postFast('MOUPLOAD', requ, (body) => {
							console.log(body, '头像返回')
							if(body.resultMessage == "上传影像成功！") {
								//更改后头像更新到缓存
								let agentAvatorList = utils.cache.get("agentList")
								let agenthu = this.personsal.agentList
								if(agenthu != undefined && agenthu != "") {
									for(var i = 0; i < agenthu.length; i++) {
										if(agenthu[i].pageCode == "3") {
											this.extUrl = agenthu[i].extUrl
											this.imageName = agenthu[i].imageName
										}
									}
								}
								if(agentAvatorList != undefined && agentAvatorList != "") {
									for(var i = 0; i < agentAvatorList.length; i++) {
										if(agentAvatorList[i].pageCode == "3") {
											agentAvatorList[i].extUrl = this.extUrl
											agentAvatorList[i].imageName = this.imageName
											agentAvatorList[i].pageCode = "3"
											agentAvatorList[i].remoteUrl = "data:image/jpeg;base64," + image
										}
									}
									utils.cache.removeItem('agentList')
									utils.cache.set("agentList", agentAvatorList)
								}
								if(this.agentList.length == 2) {
									let pic = document.getElementById('bbb')
									pic = "data:image/jpeg;base64," + image
								} else {
									let pic = document.getElementById('ddd')
									pic = "data:image/jpeg;base64," + image
								}
							}
						})
					}
				}
			},
			//点击确定退出当前账户执行操作
			outEvent() {
				try {
					window.JPush.deleteAlias({
							sequence: 1
						},
						(result) => {}, (error) => {})
					window.JPush.cleanTags({
							sequence: 1
						},
						(result) => {}, (error) => {})
					window.JPush.stopPush()
				} catch(err) {
					console.log("%c " + '退出推送异常', 'color:blue', "LOG")
					console.log("%c " + err, 'color:blue', "LOG")
				}
				utils.cache.removeItem("activeList")
				utils.cache.removeItem("agentList")
				utils.cache.removeItem("productList")
				utils.cache.removeItem("personsal")
				//utils.cache.removeItem("agentCode")
				//utils.cache.removeItem("agentCodeNum")
				utils.cache.removeItem("loginMedol")
				utils.cache.removeItem("agent")
				utils.cache.removeItem("agentNum")
				utils.cache.removeItem("orgID")
				utils.cache.removeItem("channel")
				//utils.cache.removeItem("passwordInfo")
				utils.cache.removeItem("IS_HAVE_NO_READ")
				utils.cache.removeItem("CONFIG_newPtoduct_policyName_product")
				utils.cache.removeItem("CONFIG_proposalPlan")
				this.$router.push({
					name: "login"
				})
				window.location.reload()
			},
			//点击退出登录弹出确认弹框
			loginOut() {
				alert_n22.confirm('温馨提示', "退出当前登录账户?", '确定', '', (flag) => {
					this.outEvent()
				})
			},
			//请求签到接口
			requestSignInOrBack(tag, qRcode) {
				if(this.locInfo.lng == undefined || this.locInfo.lat == undefined) {
					this.loc()
					this.showMsg('请等待定位成功后进行签到!')
					return
				}
				let requ = {
					'cusMemberInfoDto': {
						'objects': {
							'addre': this.locInfo.address, //签到地址信息
							'functionCode': tag == 0 ? 'SIGNIN' : 'SIGNOUT', //SIGNIN 签到 , SIGNOUT签退
							'ip': returnCitySN.cip, //IP地址
							'latitude': this.locInfo.lat.toString(), //纬度
							'longitude': this.locInfo.lng.toString(), //经度
							'ruleType': 'ZCSB', //规则类型
							'url': qRcode, //二维码图片地址
							'commonObject': {
								'channel': this.personsal.channel, //所属渠道
								'deviceNo': this.personsal.agentCode, //客户端序列号
								'loginCode': this.personsal.agentCode, //操作人工号
								'openId': '',
								'tokenCode': ''
							}
						}
					}
				}
				utils.http.postFast('SIGN_IN_OR_OUT', requ, (body) => {
					let signInorout = body.signInorout
					//记录签到次数
					let myDate = new Date()
					let key_sign_in = utils.cache.get('KEY_SIGN_IN_')
					if(key_sign_in == undefined || key_sign_in == '') {
						utils.cache.set('KEY_SIGN_IN_', {
							"date": myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate(),
							"count": "1"
						})
					} else {
						key_sign_in.count = parseInt(key_sign_in.count) + 1
						utils.cache.set('KEY_SIGN_IN_', {
							"date": myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate(),
							"count": key_sign_in.count.toString()
						})
					}
					if(signInorout.resultCode == 0) {
						if(signInorout.resultMsg.indexOf("成功") > -1) {
							let signIn = utils.cache.get('KEY_SIGN_IN_')
							this.showMsg_su = true;
							if(signIn != undefined && signIn != '') {
								this.showMsg_msg = signInorout.resultMsg + "\n每日可扫描6次二维码，已扫描" + signIn.count + "次，剩余" + (6 - signIn.count) + "次。";
							} else {
								this.showMsg_msg = signInorout.resultMsg
							}
							setTimeout(() => {
								this.showMsg_su = false;
							}, 2000)
						} else {
							let signIn = utils.cache.get('KEY_SIGN_IN_')
							if(signIn != undefined && signIn != '') {
								this.showMsg(signInorout.resultMsg + "\n每日可扫描6次二维码，已扫描" + signIn.count + "次，剩余" + (6 - signIn.count) + "次。")
							} else {
								this.showMsg(signInorout.resultMsg)
							}
						}
					} else {
						let signIn = utils.cache.get('KEY_SIGN_IN_')
						if(signIn != undefined && signIn != '') {
							this.showMsg(signInorout.resultMsg + "\n每日可扫描6次二维码，已扫描" + signIn.count + "次，剩余" + (6 - signIn.count) + "次。")
						} else {
							this.showMsg(signInorout.resultMsg)
						}
					}
				})
			},
			//二维码扫描调用
			qrcode(tag) {
				//签到识别
				if(tag == '0') {
					MAPlugin.hybridCallAction('hybrid://MAQRCode:401/invokeQRCode?0', (callbackSucc) => {
						this.requestSignInOrBack('0', callbackSucc.result)
					}, function(callbackFail) {
						window.alert(callbackFail)
					});
				} else
					//签退识别
					if(tag == '1') {
						MAPlugin.hybridCallAction('hybrid://MAQRCode:401/invokeQRCode?0', (callbackSucc) => {
							this.requestSignInOrBack('1', callbackSucc.result)
						}, function(callbackFail) {
							window.alert(callbackFail)
						});
					}
			},
			//获取定位数据
			loc(tag) {
				//判断签到次数
				let signIn = utils.cache.get('KEY_SIGN_IN_')
				if(signIn != undefined && signIn != '') {
					let myDate = new Date()
					if(signIn.date.split('-')[0] == myDate.getFullYear() &&
						signIn.date.split('-')[1] == (myDate.getMonth() + 1) &&
						signIn.date.split('-')[2] == myDate.getDate()) {
						if(signIn.count != undefined && signIn.count != '' && signIn.count >= 6) {
							this.showMsg("每日可扫描6次二维码，已扫描6次，剩余0次。 ")
							return
						}
					} else {
						utils.cache.set('KEY_SIGN_IN_', {
							"date": myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate(),
							"count": "0"
						})
					}
				}

				if(globalConfig.os == 'android') {
					//          		alert_n22.confirm('提示','定位模式选择 ','模式二','模式一',(flag)=>{
					//						//模式二
					//						MAPlugin.hybridCallAction('hybrid://MALocInfoIsOpen:401/invokeIsOpen?0', (callbackSucc)=>{
					//	                        if(callbackSucc.result == '0'){
					//	                        	this.showMsg('系统检测到您尚未打开手机<位置信息>选项,请在<设置>中打开后重新登录光速保!')
					//	                        	return
					//	                        }else{
					//	                        	this.getlocInfo(tag)
					//	                        }
					//	                    }, function(callbackFail){
					//	                        window.alert(callbackFail)
					//	                    });
					//					},(flag)=>{
					//模式一
					MAPlugin.hybridCallAction('hybrid://MAGetLocInfo:401/invokeIsOpen?0', (callbackSucc) => {
						if(callbackSucc.result == '0') {
							this.showMsg('系统检测到您尚未打开手机<位置信息>选项,请在<设置>中打开后重新登录光速保!')
							return
						} else {
							this.getlocInfo(tag, callbackSucc.address, callbackSucc.latitude, callbackSucc.longitude)
						}
					}, function(callbackFail) {
						window.alert(callbackFail)
					});
					//					})
				} else {
					//          		alert_n22.confirm('提示','定位模式选择 ','模式二','模式一',(flag)=>{
					//						//模式二
					this.getlocInfo(tag)
					//					},(flag)=>{
					//模式一
					//						MAPlugin.hybridCallAction('hybrid://MAGetLocInfo:401/invokeIsOpen?0', (callbackSucc)=>{
					//	                        if(callbackSucc.result == '0'){
					//		                    	this.showMsg('系统检测到您尚未打开手机<位置信息>选项,请在<设置>中打开后重新登录光速保!')
					//		                    	return
					//	                        }else{
					//	                        	this.getlocInfo(tag,callbackSucc.address,callbackSucc.latitude,callbackSucc.longitude)
					//	                        }
					//	                    }, function(callbackFail){
					//	                        window.alert(callbackFail)
					//	                    });
					//					})
				}
			},
			getlocInfo(tag, address, latitude, longitude) {
				if(globalConfig.os == 'android' &&
					address != undefined && address != "" &&
					latitude != undefined && latitude != "" &&
					longitude != undefined && longitude != "") {
					this.isLoc = false
					alert_n22.confirm('提示', '当前位置 : ' + address + '，请确认。', '确认', '取消', (flag) => {
						this.locInfo.lng = longitude
						this.locInfo.lat = latitude
						this.locInfo.address = address
						this.qrcode(tag)
					})
				} else {
					this.isLoc = true
					Indicator.open('正在获取位置信息...');
					this.locAMap(true, (lng, lat, result) => {
						Indicator.close();
						this.isLoc = false
						alert_n22.confirm('提示', '当前位置 : ' + result.address + '，请确认。', '确认', '取消', (flag) => {
							this.locInfo.lng = lng
							this.locInfo.lat = lat
							this.locInfo.address = result.address
							this.qrcode(tag)
						})
					}, (error) => {
						Indicator.close();
						this.isLoc = false
						Toast({
							message: '获取位置信息失败: ' + error,
							position: 'bottom',
							duration: 2000
						});
					})
				}
			},
			//取消退出
			cancelToLogin() {
				window.alert('no')
			},
			//确认退出
			confirmToLogin() {
				window.alert('ok')
			},
			//是否退出登录
			isToLogin() {
				this.$refs.HintDialog.showMOdal()
			},
			//跳转修改密码页面
			toModifyPwd() {
				this.$router.push({
					name: "updatePass"
				})
			},
			//返回首页
			pre() {
				if(!this.isLoc) {
					this.$router.push({
						name: "home"
					})
				}
			},
			showMsg: function(msg) {
				if(msg != undefined && msg != "") {
					this.$refs.alert.showMOdal(msg)
				}
			},
		}
	}
</script>

<style lang="css" scoped type="text/css">
	.fa-angle-right {
		color: #ccc;
	}
	
	.agentInfo {
		width: 92%;
		margin: 7% 4%;
		box-shadow: 0 0 8px #ccc;
		box-sizing: border-box;
	}
	
	.agentInfo_top>div {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	
	.agentInfo_top>p {
		line-height: 2;
	}
	
	.agentInfo_bottom,
	.agentInfo_bottom>div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	ul>li {
		line-height: 55px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 4%;
	}
	
	ul>li p {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	ul>li span {
		font-size: 16px;
		color: #333;
	}
	
	.mint-spinner-fading-circle {
		position: relative!important;
		top: 0!important;
	}
	/*/签到成功/失败*/
	
	.showMsg_su,
	.showMsg_er {
		width: 75%;
		height: 25%;
		background: #fff;
		border: 1px solid #ddd;
		position: fixed;
		z-index: 1000;
		margin: 30% 14%;
		border-radius: 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	
	.showMsg_su div,
	.showMsg_er div {
		text-align: center;
	}
	
	.showMsg_su img,
	.showMsg_er img {
		width: 80px;
	}
	
	.showMsg_su p,
	.showMsg_er p {
		font-size: 18px;
	}
</style>
