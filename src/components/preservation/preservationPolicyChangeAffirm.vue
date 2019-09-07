<template>
	<div>
		<div v-show="!caValue.isCAOpen">
			<Headerbtns :title=page_title>
				<div slot="left" class="back" @click="goBack">
					<i class="fa fa-angle-left"></i>
				</div>
			</Headerbtns>
			<div class="details">
				<div v-if="tpl=='0'">
					<!--<div class="application">{{uuid}}</div>-->
					<div class="application">保险合同变更申请书</div>
					<div class="date">申请日期：{{currentDate}}</div>
					<div class="info">
						<div style="margin-left: 3%;float:left;">保险单号码：{{policyData.contNo}}</div>
						<div style="margin-right: 3%;float:right;">申请人:{{policyData.holder.appntName}}（投保人）</div>
					</div>
					<div>
						<ul>
							<li>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">客户资料变更</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										投保人{{policyData.holder.appntName}}自{{currentDate}}起证件有效期变更为{{perData.startDate}}至<span v-if="perData.endDate!='2200-12-31'">{{perData.endDate}}</span><span v-if="perData.endDate=='2200-12-31'">长期</span>
									</div>
								</div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;函件寄送方式：
									<span v-if="notationCulvert!='电子邮件'">{{notationCulvert}}</span>
									<span v-if="notationCulvert=='电子邮件'">{{notationCulvert}}</span>
								</div>
								<div style="margin-left: 3%;line-height: 1.1rem;">{{perData.email}}</div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;申请办理类型：<span>本人申请</span></div>
							</li>
							<!--<li>
								<div class="title">&nbsp;&nbsp;申请人声明及签名</div>
								<div style="margin:auto 4px;margin-bottom:5.5rem;">
									<div class="tips">请您在签名前再次核对填写内容，对于与保险条款及申请书事项不符的解释，说明或书写承诺均无效。</div>
									<div style="line-height:1.1rem;">声明：本人申请办理上述变更业务，并同意以贵公司核准后确认的内容及生效日期为准</div>
									<div style="font-size:1rem;padding-right:3rem;text-align:end;line-height:2rem;" @click="faceTest()">申请人签字</div>
									<div style="width:5rem;height:5rem;float:right;padding-right:3rem;">
										<img style="width:5rem;height:5rem;" :class="{rotate:isRotate}" :src="writing" @click="faceTest()">
									</div>
								</div>
							</li>-->
						</ul>
					</div>
				</div>
				<div v-if="tpl=='1'">
					<!--<div class="application">{{uuid}}</div>-->
					<div class="application">保险合同变更申请书</div>
					<div class="date">申请日期：{{currentDate}}</div>
					<div class="info">
						<div style="margin-left: 3%;float:left;">保险单号码：{{policyData.contNo}}</div>
						<div style="margin-right: 3%;float:right;">申请人:{{insurent.insuName}}（被保人）</div>
					</div>
					<div>
						<ul>
							<li>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">客户资料变更</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										被保人{{insurent.insuName}}自{{currentDate}}起证件有效期变更为{{perData.startDate}}至<span v-if="perData.endDate!='2200-12-31'">{{perData.endDate}}</span><span v-if="perData.endDate=='2200-12-31'">长期</span>
									</div>
								</div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;函件寄送方式：
									<span v-if="notationCulvert!='电子邮件'">{{notationCulvert}}</span>
									<span v-if="notationCulvert=='电子邮件'">{{notationCulvert}}</span>
								</div>
								<div style="margin-left: 3%;line-height: 1.1rem;">{{perData.email}}</div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;申请办理类型：<span>本人申请</span></div>
							</li>
							<!--<li>
								<div class="title">&nbsp;&nbsp;申请人声明及签名</div>
								<div style="margin:auto 4px;margin-bottom:5.5rem;">
									<div class="tips">请您在签名前再次核对填写内容，对于与保险条款及申请书事项不符的解释，说明或书写承诺均无效。</div>
									<div style="line-height:1.1rem;">声明：本人申请办理上述变更业务，并同意以贵公司核准后确认的内容及生效日期为准</div>
									<div style="font-size:1rem;padding-right:3rem;text-align:end;line-height:2rem;" @click="faceTest()">申请人签字</div>
									<div style="width:5rem;height:5rem;float:right;padding-right:3rem;">
										<img style="width:5rem;height:5rem;" :class="{rotate:isRotate}" :src="writing" @click="faceTest()">
									</div>
								</div>
							</li>-->
						</ul>
					</div>
				</div>
				<div v-if="tpl=='2'">
					<!--<div class="application">{{uuid}}</div>-->
					<div class="application">保险合同变更申请书</div>
					<div class="date">申请日期：{{currentDate}}</div>
					<div class="info">
						<div style="margin-left: 3%;float:left;">保险单号码：{{policyData.contNo}}</div>
						<div style="margin-right: 3%;float:right;">申请人:{{bnf.bnfName}}（受益人）</div>
					</div>
					<div>
						<ul>
							<li>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">客户资料变更</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										受益人{{bnf.bnfName}}自{{currentDate}}起证件有效期变更为{{perData.startDate}}至<span v-if="perData.endDate!='2200-12-31'">{{perData.endDate}}</span><span v-if="perData.endDate=='2200-12-31'">长期</span>
									</div>
								</div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;函件寄送方式：
									<span v-if="notationCulvert!='电子邮件'">{{notationCulvert}}</span>
									<span v-if="notationCulvert=='电子邮件'">{{notationCulvert}}</span>
								</div>
								<div style="margin-left: 3%;line-height: 1.1rem;">{{perData.email}}</div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;申请办理类型：<span>本人申请</span></div>
							</li>
							<!--<li>
								<div class="title">&nbsp;&nbsp;申请人声明及签名</div>
								<div style="margin:auto 4px;margin-bottom:5.5rem;">
									<div class="tips">请您在签名前再次核对填写内容，对于与保险条款及申请书事项不符的解释，说明或书写承诺均无效。</div>
									<div style="line-height:1.1rem;">声明：本人申请办理上述变更业务，并同意以贵公司核准后确认的内容及生效日期为准</div>
									<div style="font-size:1rem;padding-right:3rem;text-align:end;line-height:2rem;" @click="faceTest()">申请人签字</div>
									<div style="width:5rem;height:5rem;float:right;padding-right:3rem;">
										<img style="width:5rem;height:5rem;" :class="{rotate:isRotate}" :src="writing" @click="faceTest()">
									</div>
								</div>
							</li>-->
						</ul>
					</div>
				</div>
				<div class="confirm">
					<div @click="toSubmit()">
						确认提交
					</div>
				</div>
				<!--<mt-popup v-model="toggle.success">
					<div>
						<div class="mint-msgbox-wrapper" style="position: absolute;">
							<div class="mint-msgbox" style="">
								<div class="mint-msgbox-header">
									<div class="mint-msgbox-title">温馨提示
										<div class="title-boder"></div>
									</div>
								</div>
								<div style="display: flex;flex-wrap: wrap;width: 100%;height: 60px;">
									<div style="width: 90%;margin:8% auto;line-height: 1rem;text-align: center;">
										信息已变更成功
									</div>
								</div>
								<div style="border: 1px dashed #959595;margin: 10px 0;">

								</div>
								<div class="btn-wrapper">
									<div class="add-btn" @click="goToPolicy()">继续保全申请</div>
									<div class="add-btn" style="margin-left: 10px;" @click="sure()">返回首页</div>
								</div>
							</div>
						</div>
						<div class="v-modal" style=""></div>
					</div>
				</mt-popup>-->
				<p>
					<Alert ref="showalert"></Alert>
				</p>
			</div>

		</div>
		<!--<NewCA v-show="caValue.isCAOpen" v-model="caValue" :value="caValue" @ChildMsg='getChild'></NewCA>-->
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	import NewCA from '../common/NewCA'
	import store from '@/vuex/preservation/index.js'
	import { mapState, mapMutations } from 'vuex'
	import Alert from '@/components/policy/common/alert'
	const fillZero = value => {
		if(('' + value).length == 1) {
			value = '0' + value
		}
		return value
	}
	export default {
		name: 'preservationAccountAffirm',
		components: {
			Headerbtns,
			NewCA,
			Alert,
		},
		data() {
			return {
				uuid: '',
				page_title: '申请确认',
				date:'', //当前日期
				currentDate:'',
				nowDate:'',
				policyNum: '000000000', //保险单号码
				userName: '', //申请人
				bank: '',
				card: '',
				toggle: {
					success: false
				},
				caValue: {
					isCAOpen: false,
					context_id: '',
					image: '',
					applyCode: 'xxxxx1',
					orderId: 'xxxxxx2'
				},
				tpl: '',
				id: '',
				insurent: '',
				bnf:'',
				notationCulvert: '',
				signNum: '',
				faceNum: '',
				nums:'1',
				writing: 'data:image/jpeg;base64,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',
				isRotate: false
			}
		},
		computed: {
			caShow() {
				return this.caValue.isCAOpen
			},
			...mapState(['policyData', 'perData', 'signData']),
		},
		store,
		watch: {
			caShow(val, oldval) {
				if(!val) {
					//监听到签字框关闭,可从新获取信息
					this.signAdd();
				}
			},
			writing() {
				if(this.writing != 'data:image/jpeg;base64,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') {
					console.log(111)
					this.isRotate = true;
				} else {
					console.log(222)
					this.isRotate = false;
				}
			}
		},
		mounted() {
			console.log(this.policyData)
			console.log(this.perData)
			if(this.perData.code == '5') {
				this.notationCulvert = '微信信函'
			} else if(this.perData.code == '4') {
				this.notationCulvert = '电子邮件'
			} else if(this.perData.code == '1') {
				this.notationCulvert = '代理人下载发送'
			}
			this.userName = utils.cache.get('userName');
			this.bank = utils.cache.get('bank');
			this.card = utils.cache.get('card');
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
			//当前日期的格式
//			this.formatDate();
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.tpl) {
					this.tpl = queryParams.tpl;
				}
				if(queryParams.id) {
					this.id = queryParams.id;
				}
			}
			let aa = this.policyData.insurent
			for(let i = 0; i < aa.length; i++) {
				if(this.id == aa[i].id) {
					this.insurent = aa[i]
				}
			}
			let bnf = this.policyData.bnfList
			for(let i = 0; i < bnf.length; i++) {
				if(this.id == bnf[i].id) {
					this.bnf = bnf[i]
				}
			}
			if(this.insurent.insuIDExpDate=='长期有效'){
				this.insurent.insuIDExpDate='2200-12-31'
			}
			if(this.policyData.holder.appntIDExpDate=='长期有效'){
				this.policyData.holder.appntIDExpDate='2200-12-31'
			}
			if(this.bnf.iDExpDate=='长期有效'){
				this.bnf.iDExpDate='2200-12-31'
			}
			console.log(this.bnf)
			let date=new Date()
			this.nowDate=date.getHours()+':'+date.getMinutes()+':'+'00'//带时间
			this.currentDate=date.getFullYear()+'-'+fillZero(date.getMonth()+1)+'-'+fillZero(date.getDate())//年月日
			console.log(this.nowDate)
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			sure() {
				this.go('/home')
			},
			goToPolicy(){
				this.go('/preservation/preservationPolicyDetail?ContNo='+this.policyData.contNo)
			},
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			...mapMutations(['SetpolicyData', 'SetpolicyCode', 'SetSignData']),
			getChild(msg) {
//				console.log("从签字组件接收到的数据是", msg)
				this.writing = msg;
				this.signAdd()
			},
			signAdd(){
				if(this.tpl == '0') {
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.policyData.contNo,
							"custNo": this.policyData.holder.appntCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
							this.signData.signNum = this.signNum
							this.SetSignData(this.signData)
						} else {
							this.showModals(body.data.msg)
						}
					})
				} else if(this.tpl == '1'){
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.policyData.contNo,
							"custNo": this.insurent.insuCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
							this.signData.signNum = this.signNum
							this.SetSignData(this.signData)
						} else {
							this.showModals(body.data.msg)
						}
					})
				}else if(this.tpl == '2'){
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.policyData.contNo,
							"custNo": this.bnf.bnfCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
							this.signData.signNum = this.signNum
							this.SetSignData(this.signData)
						} else {
							this.showModals(body.data.msg)
						}
					})
				}
			},
			goBack() {
				this.detailBack()
			},
			detailBack() {
				//				this.SetpolicyCode(this.policyData)
				if(this.tpl == '0') {
					this.SetpolicyCode(this.perData)
					this.go('/preservation/preservationPolicyHolderChange?nums=' + this.nums)
				}else if(this.tpl == '1') {
					this.SetpolicyCode(this.perData)
					this.go('/preservation/preservationPolicyInsurentChange?id=' + this.id + '&nums=' + this.nums)
				}else if(this.tpl == '2') {
					this.SetpolicyCode(this.perData)
					this.go('/preservation/preservationPolicybnfChange?id=' + this.id + this.id + '&nums=' + this.nums)
				}

			},
			/* 更改当前日期格式 */
//			formatDate() {
//				let date = this.date;
//				let y = date.getFullYear();
//				let MM = date.getMonth() + 1;
//				MM = MM < 10 ? ('0' + MM) : MM;
//				let d = date.getDate();
//				d = d < 10 ? ('0' + d) : d;
//				this.date = y + '年' + MM + '月' + d + '日';
////				console.log(this.date);
//			},
			/* 进行人脸识别 */
			faceTest() {
				//插件调用需真机操作
				MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?', (callbackSucc) => {
					this.ficeDistinguish(callbackSucc)
				}, (callbackFail) => {
					this.$refs.showalert.showMOdal(callbackFail)
				});
			},
			ficeDistinguish: function(image) {
				if(this.tpl == '0'){
					let reques = {
						"policy": {
							"agentCode": utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
							"name": this.policyData.holder.appntName,
							"cardId": this.policyData.holder.appntIDNo,
							"functionCode": "RECEIPT",
							"imageByte": image,
							"applyCode": "",
							"policyCode": ""
						}
					}
					utils.http.postFast('FACEIDKSHL', reques, (body) => {
						if(body.policy.resultCode == '0') {
//							console.log(body.policy.resultMsg);
							let requ = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.policyData.contNo,
									"custNo": this.policyData.holder.appntCustNo
								},
								modelName: "conservationService",
								methodName: "certFileUpload"
							}
							utils.http.postFast('CusbusinessService', requ, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.signData.faceNum = this.faceNum
									this.SetSignData(this.signData)
									this.openCA();
								} else {
									this.showModals(body.data.msg)
								}
							})
						} else {
							this.showModals(body.data.msg)
						}
					})
				}else if(this.tpl == '1'){
					let reques = {
						"policy": {
							"agentCode": utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
							"name":this.insurent.insuName ,
							"cardId":this.insurent.insuIDNo,
							"functionCode": "RECEIPT",
							"imageByte": image,
							"applyCode": "",
							"policyCode": ""
						}
					}
					utils.http.postFast('FACEIDKSHL', reques, (body) => {
						if(body.policy.resultCode == '0') {
//							console.log(body.policy.resultMsg);
							let requs = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.policyData.contNo,
									"custNo": this.insurent.insuCustNo
								},
								modelName: "conservationService",
								methodName: "certFileUpload"
							}
							utils.http.postFast('CusbusinessService', requs, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.signData.faceNum = this.faceNum
									this.SetSignData(this.signData)
									this.openCA();
								} else {
									this.showModals(body.data.msg)
								}
							})
						} else {
							this.showModals(body.data.msg)
						}
					})
				}else if(this.tpl == '2'){
					let reques = {
						"policy": {
							"agentCode": utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
							"name":this.bnf.bnfName ,
							"cardId":this.bnf.bnfIDNo,
							"functionCode": "RECEIPT",
							"imageByte": image,
							"applyCode": "",
							"policyCode": ""
						}
					}
					utils.http.postFast('FACEIDKSHL', reques, (body) => {
						if(body.policy.resultCode == '0') {
//							console.log(body.policy.resultMsg);
							let requs = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.policyData.contNo,
									"custNo": this.bnf.bnfCustNo
								},
								modelName: "conservationService",
								methodName: "certFileUpload"
							}
							utils.http.postFast('CusbusinessService', requs, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.signData.faceNum = this.faceNum
									this.SetSignData(this.signData)
									this.openCA();
								} else {
									this.showModals(body.data.msg)
								}
							})
						} else {
							this.showModals(body.data.msg)
						}
					})
				}
			},
			//CA签字
			openCA() {
				this.caValue.isCAOpen = !this.caValue.isCAOpen
				this.caValue.image = ""
				this.caValue.context_id = 999 + 'HZ'
			},
			getMsg() {
				// console.log(1111);
			},
			alert(){
				alert_n22.confirm('提示', '保全申请成功。', '返回首页','继续保全申请', (flag) => {
					this.sure()
				},()=>{
					this.goToPolicy()
				})
			},
			getHolderAdd(){
				let requu = {
					data: {
//						"signFileId": this.signData.signNum, //签字图片id
//						"faceFileId": this.signData.faceNum, //人脸图片id
						"cardFrontId": this.perData.front, //证件正面id
						"cardBackId": this.perData.backed, //证件反面id
						"conservationId": this.signData.conservationId, //保全id
						"conservationIdentityId": this.signData.conservationIdentityId, //证件变更id
						"conno":this.signData.conno,
						"contNo": this.policyData.contNo, //保单号
						"bussNo": this.signData.edorNo, //保全单号
						"bussType":'1',  //1
						"subType": 'CM',  //保全类型
						"customerNo":this.policyData.holder.appntCustNo, //客户号
//						"recognitionDate":this.currentDate, // 识别日期  2011-11-11
//						"recognitionTime":this.nowDate, // 识别时间  2011-11-11 10:11:11
//						"recognitionResult":"Y", // 识别结果Y\N
//						"recognitionFIResult":"Y", //   活体照片与身份证照片对比结果识别结果Y\N
//						"recognitionFI":"识别成功", //      活体照片与身份证照片对比结果描述
//						"recognitionFPResult":"Y", //  活体照片与公安部照片对比结果   Y\N
//						"recognitionFP":"识别成功", //   活体照片与公安部照片对比结果描述
//						"recognitionIPResult":"Y", //  身份证照片与公安部照片对比结果  Y\N
//						"recognitionIP":"识别成功", //  身份证照片与公安部照片对比结果
					},
					modelName: "conservationService",
					methodName: "batchPostBack"
				}
				utils.http.postFast('CusbusinessService', requu, (body, header) => {
					if(body.data.code == '0') {
//						this.toggle.success = true
						this.alert()
					} else {
						this.showModals(body.data.msg)
						this.uuid = header.uuid
					}
				})
			},
			getInsurentAdd(){
				let requu = {
					data: {
//						"signFileId": this.signData.signNum, //签字图片id
//						"faceFileId": this.signData.faceNum, //人脸图片id
						"cardFrontId": this.perData.front, //证件正面id
						"cardBackId": this.perData.backed, //证件反面id
						"conservationId":this.signData.conservationId, //保全id
						"conservationIdentityId": this.signData.conservationIdentityId, //证件变更id
						"conno":this.signData.conno,
						"contNo": this.policyData.contNo, //保单号
						"bussNo": this.signData.edorNo, //保全单号
						"bussType":'1',  //1
						"subType": 'CM',  //保全类型
						"customerNo":this.insurent.insuCustNo, //客户号
//						"recognitionDate":this.currentDate, // 识别日期  2011-11-11
//						"recognitionTime":this.nowDate, // 识别时间  2011-11-11 10:11:11
//						"recognitionResult":"Y", // 识别结果Y\N
//						"recognitionFIResult":"Y", //   活体照片与身份证照片对比结果识别结果Y\N
//						"recognitionFI":"识别成功", //      活体照片与身份证照片对比结果描述
//						"recognitionFPResult":"Y", //  活体照片与公安部照片对比结果   Y\N
//						"recognitionFP":"识别成功", //   活体照片与公安部照片对比结果描述
//						"recognitionIPResult":"Y", //  身份证照片与公安部照片对比结果  Y\N
//						"recognitionIP":"识别成功", //  身份证照片与公安部照片对比结果
					},
					modelName: "conservationService",
					methodName: "batchPostBack"
				}
				utils.http.postFast('CusbusinessService', requu, (body, header) => {
					if(body.data.code == '0') {
//						this.toggle.success = true
						this.alert()
					} else {
						this.showModals(body.data.msg)
						this.uuid = header.uuid
					}
				})
			},
			getbnfAdd(){
				let requu = {
					data: {
//						"signFileId": this.signData.signNum, //签字图片id
//						"faceFileId": this.signData.faceNum, //人脸图片id
						"cardFrontId": this.perData.front, //证件正面id
						"cardBackId": this.perData.backed, //证件反面id
						"conservationId":this.signData.conservationId, //保全id
						"conservationIdentityId": this.signData.conservationIdentityId, //证件变更id
						"conno":this.signData.conno,
						"contNo": this.policyData.contNo, //保单号
						"bussNo": this.signData.edorNo, //保全单号
						"bussType":'1',  //1
						"subType": 'CM',  //保全类型
						"customerNo":this.bnf.bnfCustNo, //客户号
//						"recognitionDate":this.currentDate, // 识别日期  2011-11-11
//						"recognitionTime":this.nowDate, // 识别时间  2011-11-11 10:11:11
//						"recognitionResult":"Y", // 识别结果Y\N
//						"recognitionFIResult":"Y", //   活体照片与身份证照片对比结果识别结果Y\N
//						"recognitionFI":"识别成功", //      活体照片与身份证照片对比结果描述
//						"recognitionFPResult":"Y", //  活体照片与公安部照片对比结果   Y\N
//						"recognitionFP":"识别成功", //   活体照片与公安部照片对比结果描述
//						"recognitionIPResult":"Y", //  身份证照片与公安部照片对比结果  Y\N
//						"recognitionIP":"识别成功", //  身份证照片与公安部照片对比结果
					},
					modelName: "conservationService",
					methodName: "batchPostBack"
				}
				utils.http.postFast('CusbusinessService', requu, (body, header) => {
					if(body.data.code == '0') {
//						this.toggle.success = true
						this.alert()
					} else {
						this.showModals(body.data.msg)
						this.uuid = header.uuid
					}
				})
			},
			holderIdenty(){
				let requ = {
					data: {
						"agentCode": utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
						"contNo": this.policyData.contNo,
						"postalType": this.perData.code,
						"pEmail": this.perData.email,
						"edorAppName": this.policyData.holder.appntName,
						"role": "0",
						"cardFrontId": this.perData.front,
						"cardBackId": this.perData.backed,
						"custNo": this.policyData.holder.appntCustNo,
						"iDType": "11",
						"iDNo": this.perData.cerCard,
						"iDChangeExpDate": this.perData.endDate,
						"iDChangeStartExpDate": this.perData.startDate,
						"iDExpDate": this.policyData.holder.appntIDExpDate,
						"iDStartExpDate": this.policyData.holder.iDStartDate
					},
					modelName: "conservationService",
					methodName: "identityChange"
				}
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						this.signData.conservationId = body.data.conservationId
						this.signData.conservationIdentityId = body.data.conservationIdentityId
						this.signData.edorNo = body.data.edorNo
						this.signData.conno=body.data.conno
						this.SetSignData(this.signData)
						this.getHolderAdd()
					} else {
						this.showModals(body.data.msg)
						this.uuid = header.uuid
					}
				})
			},
			insurentIdenty(){
				let requ = {
					data: {
						"agentCode": utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
						"contNo": this.policyData.contNo,
						"postalType": this.perData.code,
						"pEmail": this.perData.email,
						"edorAppName": this.insurent.insuName,
						"role": "0",
						"cardFrontId": this.perData.front,
						"cardBackId": this.perData.backed,
						"custNo": this.insurent.insuCustNo,
						"iDType": "11",
						"iDNo": this.perData.cerCard,
						"iDChangeExpDate": this.perData.endDate,
						"iDChangeStartExpDate": this.perData.startDate,
						"iDExpDate": this.insurent.insuIDExpDate,
						"iDStartExpDate": this.insurent.iDStartDate
					},
					modelName: "conservationService",
					methodName: "identityChange"
				}
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						
						this.signData.conservationId = body.data.conservationId
						this.signData.conservationIdentityId = body.data.conservationIdentityId
						this.signData.edorNo = body.data.edorNo
						this.signData.conno=body.data.conno
						this.SetSignData(this.signData)
						this.getInsurentAdd()
					} else {
						this.showModals(body.data.msg)
						this.uuid = header.uuid
					}
				})
			},
			bnfIdenty(){
				let requ = {
					data: {
						"agentCode": utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
						"contNo": this.policyData.contNo,
						"postalType": this.perData.code,
						"pEmail": this.perData.email,
						"edorAppName": this.bnf.bnfName,
						"role": "0",
						"cardFrontId": this.perData.front,
						"cardBackId": this.perData.backed,
						"custNo": this.bnf.bnfCustNo,
						"iDType": "11",
						"iDNo": this.perData.cerCard,
						"iDChangeExpDate": this.perData.endDate,
						"iDChangeStartExpDate": this.perData.startDate,
						"iDExpDate": this.bnf.iDExpDate,
						"iDStartExpDate": this.bnf.iDStartDate
					},
					modelName: "conservationService",
					methodName: "identityChange"
				}
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						
						this.signData.conservationId = body.data.conservationId
						this.signData.conservationIdentityId = body.data.conservationIdentityId
						this.signData.edorNo = body.data.edorNo
						this.signData.conno=body.data.conno
						this.SetSignData(this.signData)
						this.getbnfAdd()
					} else {
						this.showModals(body.data.msg)
						this.uuid = header.uuid
					}
				})
			},
			toSubmit() {
//				if(this.signNum == '') {
//					this.showModals('请确认签字信息是否完整')
//				} else {
					if(this.tpl == '0') {
						this.holderIdenty()
					} else if(this.tpl == '1') {
						this.insurentIdenty()
					}else if(this.tpl == '2') {
						this.bnfIdenty()
					}

//				}

			}
		}
	}
</script>

<style lang="scss" scoped type="text/css">
	/* 标题样式 */
	
	.fa {
		color: #FDB92C;
	}
	
	.fa-angle-left {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	/* 内容区样式 */
	
	.details .flex {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	
	.details .dash {
		border-bottom: 1px dashed #BBB;
	}
	.details div,span,p{
		font-size: 0.8rem;
	}
	.details .application {
		color: #FEB101;
		text-align: center;
		font-size: 0.8rem;
		padding-top: 0.8rem;
		font-weight: bold;
	}
	
	.details .date {
		padding-top: 0.6rem;
		padding-bottom: 0.6rem;
		margin-right: 3%;
		text-align: end;
		color: #9A9A9B;
	}
	
	.details .info {
		background: #F8F8F8;
		height: 2.5rem;
		line-height: 2.5rem;
	}
	
	.details ul>li {
		margin-left: 2%;
		margin-right: 2%;
		border-bottom: 1px dashed #BBB;
		.title {
			border-left: 3px solid #FEB101;
			margin-top: 0.6rem;
			margin-bottom: 0.4rem;
			margin-left: 1%;
			font-size: 0.8rem;
			font-weight: bold;
		}
		.hetong {
			font-size: 0.8rem;
			border-top: 1px solid #BBB;
			padding-top: 6px;
			padding-bottom: 6px;
		}
		.tips {
			color: #985D16;
			line-height: 1.1rem;
			border-top: 1px solid #BBB;
			padding-top: 6px;
			padding-bottom: 10px;
		}
	}
	
	.details .confirm {
		width: 95%;
		margin-top: 4%;
		div {
			width: 30%;
			margin: auto;
			color: #fff;
			background: #FEB101;
			border: 1px solid #FEB101;
			border-radius: 5px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			margin-bottom: 20px;
		}
	}
	
	.mint-msgbox {
		width: 90vw!important;
	}
	
	.mint-msgbox-content {
		word-wrap: break-word;
		overflow-y: auto;
		word-break: normal;
	}
	
	.title-boder {
		height: 3px;
		background: #FEB101;
		position: absolute;
		bottom: 5px;
		width: 100%;
	}
	
	.btn-wrapper {
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.add-btn {
		width: 100px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #FEB101;
		border-radius: 5px;
		color: #ffffff;
		margin-bottom: 15px;
		padding: 0 10px;
	}
	
	.mint-msgbox .mint-msgbox-header {
		height: 60px!important;
		line-height: 60px;
	}
	
	.mint-msgbox-content {
		border: none!important;
	}
	
	.mint-msgbox .mint-msgbox-header .mint-msgbox-title {
		line-height: 60px;
		position: relative;
	}
	
	.mint-msgbox-message {
		color: #000000!important;
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	
	.mint-msgbox-message {
		max-height: 240px;
	}
	.details::-webkit-scrollbar {
	display:none
}
</style>