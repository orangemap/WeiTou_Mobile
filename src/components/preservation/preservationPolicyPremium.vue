<template>
	<div>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue" @click=""></IDCardScanning>
		<div v-show="!cardScanningValue.isopen">
			<Headerbtns :title="page_title">
				<div slot="left" class="back" @click="left">
					<i class="fa fa-angle-left"></i>
				</div>
			</Headerbtns>
			<div class="details">
				<div>
					<div class="policy">
						本次需交保费：{{shouldPayPrem}}元
					</div>
				</div>
				<div>
					<div class="insurentInformation">
						<ul>
							<li>
								<div>
									收费账户信息
								</div>
							</li>
						</ul>
					</div>
					<div class="info">
						<ul>
							<li class="flex dash">
								<div class="left">
									支付方式
								</div>
								<div class="right">
									<img src="../../../static/img/preservation/38.png" alt="" style="width: 30px;height: 21px;vertical-align: middle;" />
								</div>
							</li>
							<!--<li class="flex dash">
								<div class="left">
									户名
								</div>
								<div class="right">
									<input type="text" placeholder="请输入" style="text-align: end;" v-model="perInfo.name"/>
								</div>
							</li>-->
							<li class="flex dash">
								<div class="left">
									开户银行
								</div>
								<label class="right" v-if="policyData.ContInfo.bankAgent == '16'">
									<div v-for="item in dict.bankList" v-if="item.code == bankCode">
										{{item.text}}
									</div>
	             					<i class="fa fa-angle-down" style="color: #CCCDDD;font-size: x-large !important;"></i>
	            				</label>
	            				<label class="right" v-if="policyData.ContInfo.bankAgent != '16'">
	              					<picker v-model="bankCode" defaultText="请选择开户银行" :items="dict.bankList" code="code" text="text" :values="bankCode"></picker>
	             					<i class="fa fa-angle-down" style="color: #FEB101;font-size: x-large !important;"></i>
	            				</label>
							</li>
							<li class="flex dash">
								<div class="left">
									银行卡号
								</div>
								<div class="right">
									<input type="text" placeholder="请输入银行卡号" style="text-align: end;" v-model="perInfo.card" maxlength="20"/>
								</div>
							</li>
							<li class="infox cerNo">
								<div class="imgInfo">
									<span>
										<img :src="front" alt="" style="width: 47%;margin-right: 4%;height: 100px;" @click="cardScanning()" ref='img1'/>
									</span>
									<span>
										<img :src="backed" alt="" style="width: 47%;height: 100px;" @click="cardScanning()" ref='img2' />
									</span>
								</div>
								<!--<div class="imgInfo">
									<span>
										<img :src="front" alt="" style="width: 47%;margin-right: 4%;height: 100px;" @click="handleShow(1)" ref='img1'/>
									</span>
									<span>
										<img :src="backed" alt="" style="width: 47%;height: 100px;" @click="handleShow(2)" ref='img2' />
									</span>
								</div>
								<mt-popup position="center" class="phone_valid popup" v-model="show" style="width:70%;border:1px solid #eee;position: fixed;
		            background: #fff;top:80%;left: 50%;">
									<button class="photo" @click="getUrls()">从相册选择</button>
									<hr>
									<button class="photo" @click="capturePhoto()">拍照</button>
								</mt-popup>-->
							</li>
							<li class="flex dash">
								<div class="left">
									保单批注函
								</div>
								<label  class="right">
					             <picker v-model="notationCulvert" defaultText="请选择" :items="notationCulvertList" code="code" text="text" :values="notationCulvert"></picker>
					              <i class="fa fa-angle-down" style="color: #FEB101;
		font-size: x-large !important;"></i>
					            </label>
							</li>
							<li class="flex dash" v-show="emails">
								<div class="left">
									电子邮箱
								</div>
								<div class="right">
									<input type="text" placeholder="请输入" style="text-align: end;" v-model="perInfo.email" />
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="foot">
					<div v-show="WX" style="color: red;">
						请关注“光大永明人寿”官方微信账号下载批注函！
					</div>
					<div v-show="down" style="color: red;">
						请在保全完成后，在保全工单查询中下载批注函！
					</div>
				</div>
				<!--<div style="color: #FFB829; background: #F0F0F0;padding:10px 0;">
									<p style="width: 95%;margin: auto;line-height: 1.3rem;">温馨提示：该银行单笔限额{{policy.productInfo.bankRemark}}万，日累计限额 {{policy.productInfo.remark_day}}万</p>
									<p style="width: 95%;margin: auto;line-height: 1.3rem;">批量单笔扣款限额 {{policy.productInfo.remark_batch}}万</p>
				</div>-->
				<div class="confirm">
					<div @click="confirm()">
						确认提交
					</div>
				</div>
				<p>
					<Alert ref="showalert"></Alert>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	import Picker from '../common/Picker.vue'
	import { Indicator } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import store from '@/vuex/preservation/index.js'
	import Alert from '@/components/policy/common/alert'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
	export default {
		name: 'preservationPolicyPremium',
		components: {
			Headerbtns,Picker,Indicator,Alert,IDCardScanning
		},
		data() {
			return {
				page_title: '保单交费',
				bankCode: "", //查询银行
				bankName:"",
				notationCulvert: '',
				notationCulvertList: ['微信信函', '电子邮件', '代理人下载发送'], //批注涵列表
				show: false,
				backed:'static/img/preservation/cerFirst.png',
				front: 'static/img/preservation/cerLast.png',
				num: 0,
				img:'',
				idFront: '',
				idBack: '',
				code: '',
				emails: false,
				WX: false,
				down: false,
				perInfo: {
					email: '请输入',
					card:'',//银行卡号
//					name:'',//户名
				},
				shouldPayPrem:'',//应交保费
				dict: {
					bankList: '',
				},
				server:'',
				serverId:'',
				policy: {
					productInfo: {
						products:{
							product:[]
						},
						newPayMode: "", //首期交费方式
						sumPremL: "", //首期保险费合计（小写）
						planSumPremL: "", //续期计划保险费合计（小写）金额
						payIntv: "", //交费频率
						bankCode: "", //银行代码
						bankAccNo: "", //银行账号（投保人）
						bankAccName: "", //银行扣款户名
						bankRemark: "", //银行限额
						remark_day: "", //银行单日限额
						remark_batch: "", //银行批量限额
						bonusGetMode: "", //红利领取方式
						rnewFlag: "", //自动续保
						getYear: "", //年金领取年龄
						getDutyKind: "", //年金领取频率
						getYears: "", //年金领取方式
						getYearsMQ: "", //满期金领取方式
						autoPayFlag: "", //逾期未付选择权
					},
				},
				conservationPolicyPayId:'',
				conservationId:'',
				num:'',
				cardScanningValue: {
					isopen: false,
					type: '',
					cusItem: {}
				},
				holder: {
					cerCard: '',
					frontImg: '',
					backImg: '',
				},
			}
		},
		watch: {
			'notationCulvert': function(value) {
				if(value == '微信信函') {
					this.code = 5
					this.emails = false
					this.WX = true
					this.down = false
					this.perInfo.email = ''
				} else if(value == '电子邮件') {
					this.code = 4
					this.emails = true
					this.WX = false
					this.down = false
					if(this.num == '1'){
						this.perInfo.email = this.perInfo.email
					}else{
						this.perInfo.email = this.policyData.holder.appntEmail
					}
				} else if(value == '代理人下载发送') {
					this.code = 1
					this.emails = false
					this.WX = false
					this.down = true
					this.perInfo.email = ''
				}
			},
//			payBankCode(val) {
//				for(var i = 0; i < this.dict.bankList.length; i++) {
//					let thisBank = this.dict.bankList[i]
//					console.log(thisBank)
//					if(val == thisBank.code) {
//						this.policy.productInfo.bankRemark = this.dict.bankList[i].remark
//						this.policy.productInfo.remark_day = this.dict.bankList[i].remark_day
//						this.policy.productInfo.remark_batch = this.dict.bankList[i].remark_batch
//						let thisBankRemark = this.dict.bankList[i].remark * 10000
//						if(thisBankRemark < this.policy.productInfo.sumPremL) {
//							console.log("银行限额:" + thisBankRemark)
//						}
//					}
//				}
//			},
			//监听OCR人脸识别组件的变化
			cardScannIsOpen(val, oldval) {
				if(!val) {
					this.holder.cerCard = this.cardScanningValue.cusItem.id_card_number
					if(this.holder.cerCard != this.policyData.holder.appntIDNo){
						this.showModals('该身份证件与投保人证件内容不符，无法办理保全业务')
					}
					this.holder.frontImg = "data:image/jpeg;base64," + this.cardScanningValue.cusItem.renxiangmianimg
					this.holder.backImg = "data:image/jpeg;base64," + this.cardScanningValue.cusItem.guohuimianimg
					this.$refs.img1.src = this.holder.frontImg
					this.$refs.img2.src = this.holder.backImg
					let requs = {
						data: {
							"fileBase64": this.holder.frontImg,
							"imageType": "jpg",
							"fileType": "front",
							"contNo": this.policyData.contNo,
							"custNo": this.policyData.holder.appntCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requs, (body) => {
						if(body.data.code == '0') {
							this.idFront = body.data.fileId
						} else {
							this.showModals(body.data.msg)
						}
					})
					let requ = {
						data: {
							"fileBase64": this.holder.backImg,
							"imageType": "jpg",
							"fileType": "back",
							"contNo": this.policyData.contNo,
							"custNo": this.policyData.holder.appntCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.idBack = body.data.fileId
						} else {
							this.showModals(body.data.msg)
						}
					})
				}
			},
		},
		mounted() {
			this.SetSignData({
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
			})
			console.log(this.policyData)
			console.log(this.perData)
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
			this.bank()
			this.trial()
			let queryParams = this.$route.query;
			if(queryParams) {
//				if(queryParams.server) {
//					this.server = queryParams.server;
//				}
				if(queryParams.serverId) {
					this.serverId = queryParams.serverId;
				}
				if(queryParams.conservationId){
					this.conservationId=queryParams.conservationId
				}
				if(queryParams.conservationPolicyPayId){//
					this.conservationPolicyPayId=queryParams.conservationPolicyPayId
				}
				if(queryParams.num){//
					this.num=queryParams.num
				}
			}
			if(this.num=='1'){
				this.aaa()
			}else{
				this.perInfo.card = this.policyPremium.bankCard
				this.bankCode=this.policyPremium.bankCode
				this.bankCode=this.bankCode.substring(0, 3)
			}
			//限额
//			for(var i = 0; i < this.dict.bankList.length; i++) {
//				let thisBank = this.dict.bankList[i]
//				if(this.bankCode== thisBank.code) {
//					this.policy.productInfo.bankRemark = this.dict.bankList[i].remark
//					this.policy.productInfo.remark_day = this.dict.bankList[i].remark_day
//					this.policy.productInfo.remark_batch = this.dict.bankList[i].remark_batch
//					let thisBankRemark = this.dict.bankList[i].remark * 10000
//					if(thisBankRemark < this.policy.productInfo.sumPremL) {
//						console.log("银行限额:" + thisBankRemark)
//					}
//				}
//			}
		},
		computed: {
			...mapState(['policyData', 'perData','signData','policyPremium']),
			payBankCode() {
				console.log(this.bankCode)
				return this.bankCode
				
			},
			cardScannIsOpen() {
				return this.cardScanningValue.isopen
				//				alert(this.cardScanningValue.isopen)
			},
		},
		store,
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			bank(){
				let requ = {
						"data":{
							 "orgCode":utils.cache.get('personsal') ? utils.cache.get('personsal').orgId.substring(0, 4):'8611',
        					  "type":"K"
						},
						"modelName":"claimInformationService",
    					"methodName":"getBankList"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.ResponseCode == '0') {
							let arr = []
							body.data.bankList.forEach(item => {
								let newObject = {
									code:item.code,
									text:item.name
								}
								arr.push(newObject)
							})
							this.dict.bankList = arr
						} else {
							this.showModals(body.data.msg)
						}
					})
			},
			...mapMutations(['SetpolicyData', 'SetpolicyCode','SetSignData','SetPremiumData']),
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			cardScanning() {
				this.cardScanningValue.isopen = !this.cardScanningValue.isopen
			},
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/preservation/preservationPolicyDetail')
			},
			aaa(){
				let requ = {
					data: {
						"conservationId":this.conservationId,
						"conservationPolicyPayId":this.conservationPolicyPayId,
						"conNo":""
					},
					"modelName":"conPolicyPayService",
			   		 "methodName":"getInfomation"
				}
				utils.http.postFast('CusbusinessService', requ, (body) => {
					if(body.data.code == '0') {
						this.perInfo.email = body.data.conservationPolicyPay.email
						this.shouldPayPrem = body.data.conservationPolicyPay.fee
						this.code = body.data.conservationPolicyPay.letter
						this.bankCode=body.data.conservationPolicyPay.accountbank
						this.perInfo.card = body.data.conservationPolicyPay.banknumber
						this.holder.cerCard=body.data.conservation.holderidno
//						for(var i = 0; i < this.dict.bankList.length; i++) {
//							let thisBank = this.dict.bankList[i]
//							if(this.bankCode== thisBank.code) {
//								this.policy.productInfo.bankRemark = this.dict.bankList[i].remark
//								this.policy.productInfo.remark_day = this.dict.bankList[i].remark_day
//								this.policy.productInfo.remark_batch = this.dict.bankList[i].remark_batch
//								let thisBankRemark = this.dict.bankList[i].remark * 10000
//								if(thisBankRemark < this.policy.productInfo.sumPremL) {
//									console.log("银行限额:" + thisBankRemark)
//								}
//							}
//						}
						if(this.code == '5') {
							this.notationCulvert = '微信信函'
						} else if(this.code == '4') {
							this.notationCulvert = '电子邮件'
						} else if(this.code == '1') {
							this.notationCulvert = '代理人下载发送'
						}
						this.$refs.img1.src=body.data.files[1].url==''?this.front:body.data.files[1].url
						this.$refs.img2.src=body.data.files[0].url==''?this.backed:body.data.files[0].url
						this.idFront=body.data.files[1].id
						this.idBack=body.data.files[0].id
					} else {
						this.showModals(body.data.msg)
					}
				})
			},
			trial(){
				let requ = {
						"data":{
							"contNo":this.policyData.contNo
//							"contNo":'410001078288'
							},
							"modelName":"conPolicyPayService",
							"methodName":"validate"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.shouldPayPrem=body.data.shouldPayPrem
//							this.policyPremium.isOnlinePay=body.data.bankOnTheWay
						} else {
							this.showModals(body.data.msg)
						}
					})
			},
			handleShow(index) {
				this.num = index
				this.show = true;

			},
			/*从相册选择*/
			getUrls() {
				this.show = false;
				try {
					getNewPhoto(
						pictureSource.SAVEDPHOTOALBUM,
						imageData => {
							this.addAppImageAndUpload(this.num, imageData);
						},
						message => {
							Indicator.close(); // alert(message)
						});
				} catch(err) {
					Indicator.close();
				}
			},
			/*照相*/
			capturePhoto() {
				this.show = false;
				try {
					capturePhotoCallback(
						imageData => {
							this.addAppImageAndUpload(this.num, imageData);
						},
						message => {
//							alert(2)
						})
				} catch(err) {
//					alert(3)
				}
			},
			/*转base64*/
			addAppImageAndUpload(index, imageUrl) {
				this.img = "data:image/jpeg;base64," + imageUrl;
				if(index == '1') {
					let requ = {
						data: {
							"fileBase64": this.img,
							"imageType": "jpg",
							"fileType": "front",
							"contNo": this.policyData.contNo,
							"custNo": this.policyData.holder.appntCustNo
						},
						modelName: "conPolicyPayService",
						methodName: "policyPayFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.$refs.img1.src = this.img
							this.policyPremium.frontImg = this.img
							this.idFront = body.data.fileId
							this.SetpolicyCode(this.policyPremium)
						} else {
							this.showModals(body.data.msg)
						}
					})
				} else if(index == '2') {
					let requ = {
						data: {
							"fileBase64": this.img,
							"imageType": "jpg",
							"fileType": "back",
							"contNo": this.policyData.contNo,
							"custNo": this.policyData.holder.appntCustNo
						},
						modelName: "conPolicyPayService",
						methodName: "policyPayFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.$refs.img2.src = this.img
							this.policyPremium.backImg = this.img
							this.idBack = body.data.fileId
							this.SetpolicyCode(this.policyPremium)
						} else {
							this.showModals(body.data.msg)
						}
					})
				}
			},
			save(){
				let requ = {
						data: {
							"agentCode":"",//代理人编号
							"contNo":this.policyData.contNo,//保单号
//							"contNo":"010012349",//保单号
							"customerNo":this.policyData.custNo,//客户号
							"cardFrontId":this.idFront,//身份证正面id
							"cardBackId":this.idBack,//身份证反面id
//							"cardFrontId":"246f3ccec2f4455daa8c70b5d7ff69f1",//身份证正面id
//							"cardBackId":"ce2c1fa06b1f4102ab82d415c0d307b0",//身份证反面id
							"postalType":this.code,//批单寄送方式，是1（代理人下载），4（邮箱），5（微信）
							"pEmail":this.perInfo.email,
							"edorAppName":this.policyData.holder.appntName,//申请人姓名（投保人）
							"rNPrem":this.shouldPayPrem,//交费金额
							"bankCode":this.bankCode,//交费银行编码
							"bankAccNo":this.perInfo.card,//交费银行账户
							"bankAccName":this.bankName,//交费银行名称
							"isOnlinePay":"Y",//是否在线支付（Y是，N否）
							"conNo":"",
							"cardFrontIdBf":"",
							"cardBackIdBf":"",
							"conservationId":this.conservationId,
							"conservationPolicyPayId":this.conservationPolicyPayId,
							"holderIdno":this.holder.cerCard,
							"customerNo":this.policyData.holder.appntCustNo
						},
						"modelName":"conPolicyPayService",
				   		 "methodName":"saveInfomation"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.conservationId=body.data.conservationId
							this.conservationPolicyPayId=body.data.conservationPolicyPayId
							this.go('/preservation/preservationPolicyReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationPolicyPayId='+this.conservationPolicyPayId)
						} else {
							this.showModals(body.data.msg)
						}
					})
			},
			confirm() {
				let showModals = ''
				if(this.idFront == '' || this.idBack == '') {
					showModals = '影像件未上传。'
				}
				if(this.notationCulvert == '' || this.notationCulvert == '请选择') {
					showModals = '保单批注函不能为空。'
				} else if(this.notationCulvert == '电子邮件') {
					if(this.perInfo.email == '' || this.perInfo.email == '请输入') {
						showModals = '邮箱不能为空。'
					}
					if(this.perInfo.email != '') {
						let msg = utils.valid.email(this.perInfo.email)
						if(msg != undefined && msg != '') {
							showModals = msg
						}
					}
				}
				if(this.perInfo.card==''||this.perInfo.card=='请输入银行卡号'){
					showModals = '银行卡号不能为空。'
				}
				if(this.perInfo.card!=''){
					let msg = utils.valid.BankCodeCard(this.bankCode,this.perInfo.card)
					if(msg != undefined && msg != '') {
						showModals = msg
					}
				}
				if(this.bankCode == '' || this.bankCode == '请选择') {
					showModals = '开户银行不能为空。'
				}
				if(this.holder.cerCard != this.policyData.holder.appntIDNo){
					showModals = '该身份证件与投保人证件内容不符，无法办理保全业务'
				}
				if(showModals != '') {
					this.showModals(showModals)
				} else {
					for(let i=0;i<this.dict.bankList.length;i++){
						if(this.bankCode==this.dict.bankList[i].code){
							this.bankName=this.dict.bankList[i].text
						}
					}
					this.save()
				}

			},
		},
	}
</script>

<style lang="scss" scoped type="text/css">
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
	
	.details {
		font-size: 0.8rem;
		color: #3E3A39;
	}
	.details div,span,p{
		font-size: 0.8rem;
	}
	.details .insurentInformation {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #F8F8F8;
		text-align: left;
		color: #FEB101;
		padding: 0.1rem 0;
		font-size: 0.85rem;
		ul {
			margin: auto;
			width: 95%;
			li {
				margin-left: 4%;
			}
		}
	}
	
	.details .info {
		width: 100%;
		/*height: 40px;
		line-height: 40px;*/
		line-height: 2rem;
		background: #fff;
		/*border-top: 1px solid #A9A9A9;*/
		/*border-bottom: 1px solid #A9A9A9;*/
		.left {
			margin-left: 4%;
		}
		.right {
			margin-right: 4%;
			display: flex;
		    justify-content: flex-end;
		    align-items: center;
		}
	}
	
	.details .flex {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	
	.details .dash {
		border-bottom: 1px dashed #BBB;
		width: 95%;
		margin: auto;
	}
	.details .policy {
		height: 40px;
		line-height: 40px;
		margin-left: 5%;
	}
	.details .foot{
		color: #FEB101;
		width: 95%;
		margin: auto;
		margin-top: 15px;
		margin-bottom: 15px;
		div{
			height: 20px;
			line-height: 20px;
		}
	}
	.details .confirm{
		width: 95%;
		margin: auto;
		div{
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
			margin-top: 20px;
		}
	}
	.details .infox{
			border-bottom: 1px dashed #BBB;
		}
		.details .cerinfo {
			margin-top: 15px;
			div {
				width: 95%;
				margin: auto;
				height: 20px;
				line-height: 20px;
				padding: 0px 10px;
			}
		}
		.details .delInfo div {
			width: 95%;
			margin: auto;
			height: 34px;
			line-height: 34px;
			padding: 5px 0;
		}
		.details .cerNo {
			width: 95%;
			margin: auto;
			padding: 15px 0 8px 0;
			.policy {
				margin-top: 15px;
			}
		}
	.details .photo {
		display: block;
		width: 100%;
		line-height: 45px;
		border: 0;
		background: #fff;
	}
	.details::-webkit-scrollbar {
	display:none
}
</style>