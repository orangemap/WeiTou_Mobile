<template>
	<div>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue" @click=""></IDCardScanning>
		<div v-show="!cardScanningValue.isopen">
			<Headerbtns :title=page_title>
				<div slot="left" class="back" @click="goBack">
					<i class="fa fa-angle-left"></i>
				</div>
			</Headerbtns>
			<div class="details">
				<div>
					<div class="insurentInformation">
						<ul>
							<li>
								<div>
									保单补发信息
								</div>
							</li>
						</ul>
					</div>
					<div class="info" style="border-bottom: 1px solid #A9A9A9;">
						<ul>
							<li class="flex dash">
								<div>
									合同类型
								</div>
								<div>
									<span class="type">纸质保单</span>
								</div>
							</li>
							<li class="flex dash">
								<div>
									工本费
								</div>
								<div>
									<span style="color: #FEB101;">{{cost}}</span>
									<span style="display: inline-block;margin-left: 5px;">元</span>
								</div>
							</li>
							<li class="flex dash">
								<div>
									联系地址
								</div>
								<div>
									<input type="text" placeholder="请输入" v-model="perInfo.address" maxlength="30" style="text-align: end;" />
								</div>
							</li>
							<li class="flex dash">
								<div>
									邮政编码
								</div>
								<div>
									<input type="text" placeholder="请输入" v-model="perInfo.zipCode" maxlength="6" style="text-align: end;"  onkeyup="this.value=this.value.replace(/[^\d]/g,'');"/>
								</div>
							</li>
							<li class="flex">
								<div>
									联系电话
								</div>
								<div>
									<input type="text" placeholder="请输入" v-model="perInfo.phone" maxlength="11" style="text-align: end;"  onkeyup="this.value=this.value.replace(/[^\d]/g,'');"/>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<div class="insurentInformation">
						<ul>
							<li class="flex">
								<div>
									收费账户信息
								</div>
							</li>
						</ul>
					</div>
					<div class="info">
						<ul>
							<li class="flex dash">
								<div>
									支付方式
								</div>
								<div>
									<img src="../../../static/img/preservation/38.png" alt="" style="width: 25px;height: 21px;vertical-align: middle;" />
								</div>
							</li>
							<li class="flex dash">
								<div>
									户名
								</div>
								<div>
									<input type="text" placeholder="请输入" style="text-align: end;background: #fff;" v-model="policyData.holder.appntName" disabled="disabled" />
								</div>
							</li>
							<li class="flex dash">
								<div>
									开户银行
								</div>
								<label style="margin-right: 4%;display: flex;justify-content: flex-end;align-items: center;" v-if="policyData.ContInfo.bankAgent == '16'">
					                <div v-for="item in dict.bankList" v-if="item.code == bankCode">
										{{item.text}}
									</div>
					                <i class="fa fa-angle-down" style="color: #CCCDDD;font-size: x-large !important;"></i>
					            </label>
								<label style="text-align: end;" v-if="policyData.ContInfo.bankAgent != '16'">
					                <select-picker v-model="bankCode" defaultText="请选择开户银行" :items="dict.bankList" code="code" text="text" :values="bankCode"></select-picker>
					                <i class="fa fa-angle-down" style="color: #FEB101;font-size: x-large !important;"></i>
					            </label>
							</li>
							<li class="flex dash">
								<div>
									银行卡号
								</div>
								<div>
									<input type="text" placeholder="请输入银行卡号" v-model="perInfo.card" maxlength="20" style="text-align: end;" />
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
								<div>
									保单批注函
								</div>
								<label style="text-align: end;">
	                <select-picker v-model="notationCulvert" defaultText="请选择" :items="notationCulvertList" code="code" text="text" :values="notationCulvert"></select-picker>
	                <i class="fa fa-angle-down" style="color: #FEB101;
			font-size: x-large !important;"></i>
	              </label>
							</li>
							<li class="flex dash" v-show="emails">
								<div>
									电子邮箱
								</div>
								<div>
									<input type="text" placeholder="请输入" v-model="perInfo.email" style="text-align: end;" />
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
				<Alert ref="showalert"></Alert>
				<!--<div style="color: #FFB829; background: #F0F0F0;padding:10px 0;">
					<p style="width: 95%;margin: auto;line-height: 1.3rem;">温馨提示：该银行单笔限额{{policy.productInfo.bankRemark}}万，日累计限额 {{policy.productInfo.remark_day}}万</p>
					<p style="width: 95%;margin: auto;line-height: 1.3rem;">批量单笔扣款限额{{policy.productInfo.remark_batch}}万</p>
				</div>-->
				<div class="confirm">
					<div @click="toSubmit()">
						确认提交
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	import selectPicker from '../common/Picker.vue'
	import Alert from '@/components/policy/common/alert'
	import { Indicator } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import store from '@/vuex/preservation/index.js'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
	export default {
		name: 'preservationPolicyReissue',
		components: {
			Headerbtns,
			selectPicker,
			Alert,
			bankList,
			Indicator,
			IDCardScanning
		},
		data() {
			return {
				page_title: '保单补发',
				bankCode: "", //查询银行
				bankName: "",
				notationCulvert: '',
				notationCulvertList: ['微信信函', '电子邮件', '代理人下载发送'], //批注涵列表
				show: false,
				backed: 'static/img/preservation/cerFirst.png',
				front: 'static/img/preservation/cerLast.png',
				num: 0,
				img: '',
				idFront: '',
				idBack: '',
				code: '',
				emails: false,
				WX: false,
				down: false,
				aRFYMoney: '', //手续费
				perInfo: {
					email: '请输入',
					card: '', //银行卡号
					address: '',
					zipCode: '',
					phone: '',
				},
				dict: {
					bankList: '',
				},
				server: '',
				serverId: '',
				policy: {
					productInfo: {
						products: {
							product: []
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
				cost: '',
				conservationPolicyresendId:'',
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
//				console.log(val)
//				for(var i = 0; i < this.dict.bankList.bank.item.length; i++) {
//					let thisBank = this.dict.bankList.bank.item[i]
//					if(val == thisBank.code) {
//						this.policy.productInfo.bankRemark = this.dict.bankList.bank.item[i].remark
//						this.policy.productInfo.remark_day = this.dict.bankList.bank.item[i].remark_day
//						this.policy.productInfo.remark_batch = this.dict.bankList.bank.item[i].remark_batch
//						let thisBankRemark = this.dict.bankList.bank.item[i].remark * 10000
//						console.log(thisBankRemark)
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
		computed: {
			...mapState(['policyData', 'perData', 'signData', 'policyPremium']),
			payBankCode() {
				return this.bankCode
			},
			cardScannIsOpen() {
				return this.cardScanningValue.isopen
				//				alert(this.cardScanningValue.isopen)
			},
		},
		store,
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
				if(queryParams.conservationPolicyresendId){//
					this.conservationPolicyresendId=queryParams.conservationPolicyresendId
				}
				if(queryParams.num){//
					this.num=queryParams.num
				}
			}
			if(this.num=='1'){
				this.aaa()
			}else{
				this.bankCode = this.policyPremium.bankCode.substring(0, 3)
				this.perInfo.card = this.policyPremium.bankCard
				this.perInfo.address=this.policyData.holder.holderProvince+this.policyData.holder.holderCity+this.policyData.holder.county+this.policyData.holder.street+this.policyData.holder.community+this.policyData.holder.appntPostalAddress
				this.perInfo.zipCode = this.policyData.holder.zipCode
				this.perInfo.phone = this.policyData.holder.appntMobile
			}
			//限额
//			for(var i = 0; i < this.dict.bankList.bank.item.length; i++) {
//				let thisBank = this.dict.bankList.bank.item[i]
//				if(this.bankCode == thisBank.code) {
//					this.policy.productInfo.bankRemark = this.dict.bankList.bank.item[i].remark
//					this.policy.productInfo.remark_day = this.dict.bankList.bank.item[i].remark_day
//					this.policy.productInfo.remark_batch = this.dict.bankList.bank.item[i].remark_batch
//					let thisBankRemark = this.dict.bankList.bank.item[i].remark * 10000
//					if(thisBankRemark < this.policy.productInfo.sumPremL) {
//						console.log("银行限额:" + thisBankRemark)
//					}
//				}
//			}
//			console.log(this.dict.bankList.bank.item)
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
			...mapMutations(['SetpolicyData', 'SetpolicyCode', 'SetSignData', 'SetPremiumData']),
			goBack() {
				this.detailBack()
			},
			detailBack() {
				this.go('/preservation/preservationPolicyDetail')
			},
			cardScanning() {
				this.cardScanningValue.isopen = !this.cardScanningValue.isopen
			},
			aaa(){
				let requ = {
					data: {
						"conservationId":this.conservationId,
						"conservationPolicyresendId":this.conservationPolicyresendId,
						"conNo":""
					},
					"modelName":"conPolicyReissueService",
			   		 "methodName":"getInfomation"
				}
				utils.http.postFast('CusbusinessService', requ, (body) => {
					if(body.data.code == '0') {
						this.perInfo.email = body.data.conservationPolicyresend.email
						this.cost = body.data.conservationPolicyresend.fee
						this.code = body.data.conservationPolicyresend.letter
						this.bankCode=body.data.conservationPolicyresend.accountbank
						this.perInfo.card = body.data.conservationPolicyresend.banknumber
						this.perInfo.address = body.data.conservationPolicyresend.address
						this.perInfo.zipCode = body.data.conservationPolicyresend.postcode
						this.perInfo.phone = body.data.conservationPolicyresend.tel
						this.holder.cerCard=body.data.conservation.holderidno
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
			save(){
				let requ = {
						data: {
							"cardFrontId":this.idFront,//身份证正面id
							"cardBackId":this.idBack,//身份证反面id
//							"cardFrontId":"246f3ccec2f4455daa8c70b5d7ff69f1",//身份证正面id
//							"cardBackId":"ce2c1fa06b1f4102ab82d415c0d307b0",//身份证反面id
							"conservationId":this.conservationId,
							"conservationPolicyresendId":this.conservationPolicyresendId,
							"contNo":this.policyData.contNo,//保单号
//							"contNo":"110000426888",
							"postalType":this.code,//批单寄送方式，是1（代理人下载），4（邮箱），5（微信）
							"pMobile":this.perInfo.phone,
							"pEmail":this.perInfo.email,
							"bankCode":this.bankCode,//交费银行编码
							"bankAccNo":this.perInfo.card,//交费银行账户
							"bankAccName":this.bankName,//交费银行名称
							"edorAppName":this.policyData.holder.appntName,//申请人姓名（投保人）
							"fee":this.cost,
							"pAddress":this.perInfo.address,
							"pZipCode":this.perInfo.zipCode,
							"agentCode":"",
							"contractType":"0",
							"cardFrontIdBf":"",
							"cardBackIdBf":"",
							"conNo":"",
							"holderIdno":this.holder.cerCard,
							"customerNo":this.policyData.holder.appntCustNo
						},
						"modelName":"conPolicyReissueService",
				   		 "methodName":"saveInfomation"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.conservationId=body.data.conservationId
							this.conservationPolicyresendId=body.data.conservationPolicyresendId
							this.go('/preservation/preservationPolicyReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationPolicyresendId='+this.conservationPolicyresendId)
						} else {
							this.showModals(body.data.msg)
						}
					})
			},
			toSubmit() {
				console.log(this.holder.cerCard)
				let showModals = ''
				if(this.idFront == '' || this.idBack == '') {
					showModals = '影像件未上传。'
				}
				if(this.perInfo.address == '' || this.perInfo.address == '请输入') {
					showModals = '联系地址不能为空。'
				}
				if((!/^[0-9]{6}$/.test(this.perInfo.zipCode))){
					showModals = '邮编输入错误。'
				}
				if(this.perInfo.zipCode == '' || this.perInfo.zipCode == '请输入') {
					showModals = '邮编不能为空。'
				}
				if(this.perInfo.phone == '' || this.perInfo.phone == '请输入') {
					showModals = '联系电话不能为空。'
				}
				if(this.perInfo.phone != '') {
					let msg = utils.valid.mobilePhone(this.perInfo.phone)
					if(msg != undefined && msg != '') {
						showModals = msg
					}
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
				if(this.perInfo.card == '' || this.perInfo.card == '请输入银行卡号') {
					showModals = '银行卡号不能为空。'
				}
				if(this.perInfo.card != '') {
					let msg = utils.valid.BankCodeCard(this.bankCode, this.perInfo.card)
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
					for(let i = 0; i < this.dict.bankList.length; i++) {
						if(this.bankCode == this.dict.bankList[i].code) {
							this.bankName = this.dict.bankList[i].text
						}
					}
					this.save()
				}
			},
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			trial() {
				let requ = {
					"data": {
						"contNo": this.policyData.contNo
//						"contNo":"110000426888",
					},
					"modelName": "conPolicyReissueService",
					"methodName": "policyReplacementTrial"
				}
				utils.http.postFast('CusbusinessService', requ, (body) => {
					if(body.data.code == '0') {
						if(body.data.gBFlag == 1) {
							this.cost = 10
						} else if(body.data.gBFlag == 0) {
							this.cost = 0
						}
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
						modelName: "conPolicyReissueService",
						methodName: "policyRenewalFileUpload"
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
						modelName: "conPolicyReissueService",
						methodName: "policyRenewalFileUpload"
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
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
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
	
	.fa.fa-angle-down {
		color: #646260;
		font-size: 1.6rem;
		padding-left: 4px;
		vertical-align: middle;
	}
	
	.details div,
	span,
	p {
		font-size: 0.8rem;
	}
	
	.details .insurentInformation {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #F8F8F8;
		text-align: left;
		color: #FEB101;
		padding: 0.2rem 0;
		font-size: 0.85rem;
		ul {
			margin: auto;
			width: 95%;
		}
	}
	
	.details .type {
		border: 1px solid #FEB101;
		padding: 3px;
		margin-left: 5px;
		border-radius: 10%;
		color: #FEB101;
	}
	
	.details .infox {
		border-bottom: 1px dashed #BBB;
	}
	
	.details .info {
		width: 100%;
		line-height: 2rem;
		background: #fff;
		border-top: 1px solid #A9A9A9;
		ul {
			margin: auto;
			width: 95%;
		}
	}
	
	.details .flex {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	
	.details .dash {
		border-bottom: 1px dashed #BBB;
	}
	
	.details .foot {
		color: #FEB101;
		width: 95%;
		margin: auto;
		margin-top: 15px;
		div {
			height: 20px;
			line-height: 20px;
		}
	}
	
	.details .confirm {
		width: 95%;
		margin: auto;
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
			margin-top: 20px;
		}
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
	
	.details .policy {
		height: 40px;
		line-height: 40px;
		margin-left: 5%;
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
			width: 98%;
			li {
				margin-left: 4%;
			}
		}
	}
	.details::-webkit-scrollbar {
	display:none
}
</style>