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
					<div class="policy" style="color: #FEB101;" v-if="whereFrom != 'pList'">可领取{{insuAccBala}}元</div>
					<div class="policy" style="color: #FEB101;" v-if="whereFrom == 'pList'">可领取{{fee}}元</div>
					<div class="policy" v-if="whereFrom != 'pList'">
							账户价值提取金额：<input type="text" class="value3" placeholder="输入金额" value="" id="extractingAmount" v-model="perInfo.aRMoney">元
					</div>
					<div v-if="whereFrom == 'pList'" style="width: 100%;line-height: 2rem;background: #fff;align-items: center;">
						<ul>
							<li style="display: flex;-webkit-box-pack: justify;justify-content: flex-start;margin-left: 5%">
								<div>账户价值提取金额：</div>
								<div disabled="disabled" style="border: 1px #eee solid;border-radius: 5px;width: 35%;padding:0 12px;margin-right: 5px;height: 32px;background: #fff;">{{perInfo.aRMoney}}
								</div>
								<div>元</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="insurentInformation">
					<ul>
						<li>
							<div>
								退费账户信息
							</div>
						</li>
					</ul>
				</div>
				<div class="info">
					<ul>
						<li class="flex dash" v-show="whereFrom != 'pList'">
							<div style="margin-left: 3%;">
	
							</div>
							<div style="margin-right: 3%;">
								<span :class="[isXuqi==1?'yellow':'gray']" @click="confirmXuqiAccount()">续期缴费账户</span>
								<span :class="[isXuqi==1?'gray':'yellow']" @click="confirmOtherAccount()">其他账户</span>
							</div>
						</li>
						<li class="flex dash">
							<div class="left">
								户名
							</div>
							<div class="right" v-if="whereFrom != 'pList'" disabled="disabled">
								<div style="text-align: end;background: #fff;">{{policyData.holder.appntName}}</div>
							</div>
							<div class="right" disabled="disabled" v-if="whereFrom == 'pList'">
								<div style="text-align: end;background: #fff;">{{appntName}}</div>
							</div>
						</li>
						<li class="flex dash" v-if="isXuqi==1&&whereFrom != 'pList'">
							<div class="left">
								开户银行
							</div>
							<div disabled="disabled"  class="right" style="background: #fff;">
								{{policyData.ContInfo.bankName}}
							</div>
						</li>
						<li class="flex dash" v-if="isXuqi==1&&whereFrom != 'pList'">
							<div class="left">
								银行卡号
							</div>
							<div style="text-align: end;background: #fff;" disabled="disabled" class="right">
								{{perInfo.card}}
							</div>
						</li>
						<li class="flex dash" v-if="isXuqi!=1 || whereFrom == 'pList'">
							<div style="margin-left: 3%;">
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
						<li class="flex dash" v-if="isXuqi!=1 || whereFrom == 'pList'">
							<div style="margin-left: 3%;">
								银行卡号
							</div>
							<div style="text-align: end;">
								<input type="text" placeholder="请输入银行卡号" v-model="perInfo.card" maxlength="20" id="card" style="text-align: end;" />
							</div>
						</li>
						<li class="infox cerNo" v-if="cont!=1 || conts!=1">
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
							</div>-->
							<!--<mt-popup position="center" class="phone_valid popup" v-model="show" style="width:70%;border:1px solid #eee;position: fixed;
	background: #fff;top:80%;left: 50%;">
								<button class="photo" @click="getUrls()">从相册选择</button>
								<hr>
								<button class="photo" @click="capturePhoto()">拍照</button>
							</mt-popup>-->
						</li>
						<li class="infox cerNo" v-if="cont==1 && conts==1" disabled="disabled">
							<div class="imgInfo">
								<span>
									<img :src="front" alt="" style="width: 47%;margin-right: 4%;height: 100px;" ref='img1'/>
								</span>
								<span>
									<img :src="backed" alt="" style="width: 47%;height: 100px;" ref='img2' />
								</span>
							</div>
						</li>
						<li class="flex dash">
							<div style="margin-left: 3%;">
								保单批注函
							</div>
							<label style="text-align: end;" v-if="whereFrom != 'pList'">
				              <picker v-model="notationCulvert" defaultText="请选择" :items="notationCulvertList" code="code" text="text" :values="notationCulvert"></picker>
				              <i class="fa fa-angle-down" style="color: #FEB101;
						font-size: x-large !important;"></i>
				            </label>
				            <div class="right" v-if="whereFrom == 'pList'" disabled="disabled" style="background: #fff;">
				              <div style="color: #A9A6A6;">{{notationCulvert}}</div>
				              <i class="fa fa-angle-down" style="color: #A9A6A6;
		font-size: x-large !important;"></i>
				            </div>
						</li>
						<li class="flex dash" v-show="emails">
							<div style="margin-left: 3%;">
								电子邮箱
							</div>
							<div style="margin-right: 3%;" v-if="whereFrom != 'pList'">
								<input type="text" placeholder="请输入" style="text-align: end;" v-model="perInfo.email" />
							</div>
							<div class="right" v-if="whereFrom == 'pList'" disabled="disabled" style="background: #fff;">
								<div>{{perInfo.email}}</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="foot">
					<div v-show="WX" style="color: red;">
						请关注“光大永明人寿”官方微信账号下载批注函！
					</div>
					<div v-show="down" style="color: red;">
						请在保全完成后，在保全工单查询中下载批注函！
					</div>
				</div>
				<p>
					<Alert ref="showalert"></Alert>
				</p>
				<div class="confirm">
					<div @click="confirm()">
						确认提交
					</div>
				</div>
			</div>
			<!-- 告知框 -->
			<div v-show="enable">
				<div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2001;">
					<div class="mint-msgbox" style="">
						<div class="mint-msgbox-header">
							<div class="mint-msgbox-title">温馨提示
								<div class="title-boder"></div>
							</div>
						</div>
						<div class="mint-msgbox-content">
							<div class="mint-msgbox-message">
								<p v-if="whereFrom != 'pList'">本次账户价值提取需要{{aRFYMoney}}元手续费，请知悉!</p>
								<p v-if="whereFrom == 'pList'">本次账户价值提取需要{{aRFYMoney}}元手续费，请知悉!</p>
							</div>
							<div class="mint-msgbox-input" style="display: none;">
								<input placeholder="" type="text">
								<div class="mint-msgbox-errormsg" style="visibility: hidden;">
								</div>
							</div>
						</div>
						<div class="btn-wrapper">
							<div class="add-btn" @click="yesClick">确定</div>
							<div class="add-btn" @click="noClick" style="margin-left:20px;">取消</div>
						</div>
					</div>
				</div>
				<div class="v-modal" style="z-index: 2000;"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	import selectPicker from '../common/Picker.vue'
	import Alert from '@/components/policy/common/alert'
	import Picker from '../common/Picker.vue'
	import { Indicator } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import store from '@/vuex/preservation/index.js'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
//	import bankList from '../../../static/dict/bank_new.json'
	export default {
		name: 'preservationAccount',
		components: {
			Headerbtns,
			selectPicker,
			Picker,
			Indicator,
			Alert,
			bankList,
			IDCardScanning
		},
		props: {
			title: {
				type: String,
				default: '提示'
			},
		},
		data() {
			return {
				page_title: '账户价值提取',
				isXuqi: 1, //是否为续期
				userName: "",
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
				idBackBf:'',
				idFrontBf:'',
				code: '',
				cont:0,
				conts:0,
				emails: false,
				WX: false,
				down: false,
				aRFYMoney :'',//手续费
				perInfo: {
					email: '请输入',
					card:'',//银行卡号
					aRMoney :'',//
				},
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
				// 告知框
				enable: false,
				content: "",
				serviceCharge: 5,
				insuAccBala:'',
				trueReceiveFee:'',
				conservationId:'',//保全id
				conservationAccountvalueId:'',//账户价值id
				num:'',
				appntName:'',
				fee:'',
				whereFrom:'',
				connoTpp:'',//受理号
				accountData:'',
				conservation:'',
				change:'change',
				file:'',
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
				getidno:'',
				xuqicard:'',
				xuqibankCode:'',
				modify:'',//修改信息后签字是否显示
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
					if(this.whereFrom == 'pList' || this.num == '1'){
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
				console.log('this.WX'+this.WX)
				console.log('this.down'+this.down)
			},
			'bankCode':function(value){
				if(this.whereFrom == 'pList'){
					this.cont++
					if(this.cont>1){
						this.modify=2
						this.perInfo.card=''
						this.$refs.img1.src=this.front
						this.$refs.img2.src=this.backed
					}
				}
			},
			'perInfo.card':function(value){
				if(this.whereFrom == 'pList'){
					this.conts++
					if(this.conts>1){
						this.modify=2
						this.$refs.img1.src=this.front
						this.$refs.img2.src=this.backed
					}
				}
			},
			//监听OCR人脸识别组件的变化
			cardScannIsOpen(val, oldval) {
				if(!val) {
					this.holder.cerCard = this.cardScanningValue.cusItem.id_card_number
					if(this.whereFrom != 'pList'){
						if(this.holder.cerCard != this.policyData.holder.appntIDNo){
							this.showModals('该身份证件与投保人证件内容不符，无法办理保全业务')
						}
					}else{
						if(this.holder.cerCard != this.getidno){
							this.showModals('该身份证件与投保人证件内容不符，无法办理保全业务')
						}
					}
					this.holder.frontImg = "data:image/jpeg;base64," + this.cardScanningValue.cusItem.renxiangmianimg
					this.holder.backImg = "data:image/jpeg;base64," + this.cardScanningValue.cusItem.guohuimianimg
					this.$refs.img1.src = this.holder.frontImg
					this.$refs.img2.src = this.holder.backImg
					if(this.whereFrom != 'pList'){
						let reques = {
							data: {
								"fileBase64": this.holder.frontImg,
								"imageType": "jpg",
								"fileType": "front",
								"contNo": this.policyData.contNo,
								"custNo": this.policyData.holder.appntCustNo
							},
							modelName: "conAccountValueExtractionService",
							methodName: "partialExtractionFileUpload"
						}
						utils.http.postFast('CusbusinessService', reques, (body) => {
							if(body.data.code == '0') {
//								this.$refs.img1.src = this.holder.frontImg
								this.policyPremium.frontImg = this.holder.frontImg
								this.idFront = body.data.fileId
								this.SetpolicyCode(this.policyPremium)
							} else {
								this.showModals(body.data.msg)
							}
						})
					}else{
						let reques = {
							data: {
								"fileBase64": this.holder.frontImg,
								"imageType": "jpg",
								"fileType": "front",
								"contNo": this.accountData.plicyno,
								"custNo": this.conservation.customerno
							},
							modelName: "conAccountValueExtractionService",
							methodName: "partialExtractionFileUpload"
						}
						utils.http.postFast('CusbusinessService', reques, (body) => {
							if(body.data.code == '0') {
//								this.$refs.img1.src = this.holder.frontImg
								this.idFront = body.data.fileId
							} else {
								this.showModals(body.data.msg)
							}
						})
					}
					if(this.whereFrom != 'pList'){
						let requ = {
							data: {
								"fileBase64": this.holder.backImg,
								"imageType": "jpg",
								"fileType": "back",
								"contNo": this.policyData.contNo,
								"custNo": this.policyData.holder.appntCustNo
							},
							modelName: "conAccountValueExtractionService",
							methodName: "partialExtractionFileUpload"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
//								this.$refs.img2.src = this.holder.backImg
								this.policyPremium.backImg = this.holder.backImg
								this.idBack = body.data.fileId
								this.SetpolicyCode(this.policyPremium)
							} else {
								this.showModals(body.data.msg)
							}
						})
					}else{
						let requ = {
							data: {
								"fileBase64": this.holder.backImg,
								"imageType": "jpg",
								"fileType": "back",
								"contNo": this.accountData.plicyno,
								"custNo": this.conservation.customerno
							},
							modelName: "conAccountValueExtractionService",
							methodName: "partialExtractionFileUpload"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
//								this.$refs.img2.src = this.holder.backImg
								this.idBack = body.data.fileId
							} else {
								this.showModals(body.data.msg)
							}
						})
					}
				}
			},
		},
		computed: {
			...mapState(['policyData', 'perData','signData','policyPremium']),
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
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.serverId) {
					this.serverId = queryParams.serverId;
				}
				if(queryParams.conservationId){
					this.conservationId=queryParams.conservationId
				}
				if(queryParams.conservationAccountvalueId){//账户价值ID
					this.conservationAccountvalueId=queryParams.conservationAccountvalueId
				}
				if(queryParams.num){//账户价值ID
					this.num=queryParams.num
				}
				if(queryParams.whereFrom){
			       this.whereFrom = queryParams.whereFrom;
			    }
				if(queryParams.connoTpp){
			       this.connoTpp = queryParams.connoTpp;
			    }
				if(queryParams.isXuqi){
			       this.isXuqi = queryParams.isXuqi;
			    }
				if(queryParams.modify){
			       this.modify = queryParams.modify;
			    }
				console.log(this.connoTpp)
			}
			this.bank()
			if(this.whereFrom != 'pList'){
				this.trial()
			}
			if(this.num=='1'||this.whereFrom == 'pList'){
				this.aaa()
			}else{
				this.bankCode=this.policyData.ContInfo.bankCode.substring(0, 3)
				this.perInfo.card = this.policyData.ContInfo.bankAccNo
			}
		},
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
        					  "type":"F"
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
			goBack() {
				this.detailBack()
			},
			detailBack() {
				if(this.whereFrom === 'pList'){
					this.go('/preservation/policySearch?contNo='+this.accountData.plicyno)
				}else{
					this.go('/preservation/preservationPolicyDetail')
				}
			},
			cardScanning() {
				this.cardScanningValue.isopen = !this.cardScanningValue.isopen
			},
			checkForm() {
				// 验证提取金额
				let extractingAmount = document.getElementById('extractingAmount');
				if(extractingAmount.value == '') {
					this.showModals("提取金额不能为空");
					extractingAmount.select();
					return false;
				} else if(extractingAmount.value > this.desirableAmount) {
					this.showModals("提取金额不能大于可领取金额");
					extractingAmount.select();
					return false;
				} else {
					return true;
				}
			},
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			confirmXuqiAccount() {
				this.isXuqi = 1;
				this.bankCode=this.policyData.ContInfo.bankCode.substring(0, 3)
				console.log(this.policyData.ContInfo.bankAccNo)
				this.perInfo.card = this.policyData.ContInfo.bankAccNo
			},
			confirmOtherAccount() {
				this.isXuqi = 2;
				if(this.num=='1'){
					this.bankCode=this.xuqibankCode
					this.perInfo.card=this.xuqicard
				}else{
					//此处为判断当前保单是否为花旗渠道保单,需进行特殊处理
					if(this.policyData.ContInfo.bankAgent == '16'){
						this.bankCode='531'
					}else{
						this.bankCode=''
					}
					this.perInfo.card=''
				}
			},
			// 告知框
			showMOdal(msg) {
				this.enable = true
				this.content = msg
			},
			aaa(){
				let requ = {
					data: {
						"conservationId":this.conservationId,
						"conservationAccountvalueId":this.conservationAccountvalueId,
						"conNo":this.connoTpp
					},
					"modelName":"conAccountValueExtractionService",
			   		 "methodName":"getInfomation"
				}
				utils.http.postFast('CusbusinessService', requ, (body) => {
					if(body.data.code == '0') {
						this.accountData=body.data.conservationAccountvalue
						this.conservation=body.data.conservation
						this.perInfo.email = body.data.conservationAccountvalue.email
						this.perInfo.aRMoney = body.data.conservationAccountvalue.receivesum
						this.code = body.data.conservationAccountvalue.letter
						this.bankCode=body.data.conservationAccountvalue.accountbank
						this.xuqibankCode=body.data.conservationAccountvalue.accountbank
						this.perInfo.card = body.data.conservationAccountvalue.banknumber
						this.xuqicard = body.data.conservationAccountvalue.banknumber
						this.appntName=body.data.conservationAccountvalue.name
						this.fee=body.data.conservationAccountvalue.fee
						if(this.whereFrom == 'pList'){
							this.getidno = body.data.conservationAccountvalue.getidno
						}else{
							this.holder.cerCard=body.data.conservationAccountvalue.getidno
						}
						if(this.code == '5') {
							this.notationCulvert = '微信信函'
						} else if(this.code == '4') {
							this.notationCulvert = '电子邮件'
						} else if(this.code == '1') {
							this.notationCulvert = '代理人下载发送'
						}
						this.file=body.data.files
						console.log(this.file)
						if(this.whereFrom == 'pList'){
							if(this.num=='1'){
								for(let i=0;i<this.file.length;i++){
									if(this.file[i].fileType=='back'){
										this.idBackBf=this.file[i].id
										this.idBack=this.file[i].id
										this.$refs.img2.src=body.data.files[i].url==''?this.backed:body.data.files[i].url
									}else if(this.file[i].fileType=='front'){
										this.idFrontBf=this.file[i].id
										this.idFront=this.file[i].id
										this.$refs.img1.src=body.data.files[i].url==''?this.front:body.data.files[i].url
									}
								}
							}else{
								for(let i=0;i<this.file.length;i++){
									if(this.file[i].fileType=='back'){
										this.idBackBf=this.file[i].id
										this.$refs.img2.src=body.data.files[i].url==''?this.backed:body.data.files[i].url
									}else if(this.file[i].fileType=='front'){
										this.idFrontBf=this.file[i].id
										this.$refs.img1.src=body.data.files[i].url==''?this.front:body.data.files[i].url
									}
								}
							}
						}else{
							for(let i=0;i<this.file.length;i++){
								if(this.file[i].fileType=='back'){
									this.idBack=this.file[i].id
									this.$refs.img2.src=body.data.files[i].url==''?this.backed:body.data.files[i].url
								}else if(this.file[i].fileType=='front'){
									this.idFront=this.file[i].id
									this.$refs.img1.src=body.data.files[i].url==''?this.front:body.data.files[i].url
								}
							}
						}
					} else {
						this.showModals(body.data.msg)
					}
				})
			},
			trial(){
				let requ = {
						"data":{
							"contNo":this.policyData.contNo
//							"contNo":"110000272588",
						},
						"modelName": "conAccountValueExtractionService",
						"methodName": "partialExtractionCheck"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.insuAccBala=body.data.insuAccBala
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
					if(this.whereFrom != 'pList'){
						let requ = {
							data: {
								"fileBase64": this.img,
								"imageType": "jpg",
								"fileType": "front",
								"contNo": this.policyData.contNo,
								"custNo": this.policyData.holder.appntCustNo
							},
							modelName: "conAccountValueExtractionService",
							methodName: "partialExtractionFileUpload"
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
					}else{
						let requ = {
							data: {
								"fileBase64": this.img,
								"imageType": "jpg",
								"fileType": "front",
								"contNo": this.accountData.plicyno,
								"custNo": this.conservation.customerno
							},
							modelName: "conAccountValueExtractionService",
							methodName: "partialExtractionFileUpload"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
								this.$refs.img1.src = this.img
								this.idFront = body.data.fileId
							} else {
								this.showModals(body.data.msg)
							}
						})
					}
				} else if(index == '2') {
					if(this.whereFrom != 'pList'){
						let requ = {
							data: {
								"fileBase64": this.img,
								"imageType": "jpg",
								"fileType": "back",
								"contNo": this.policyData.contNo,
								"custNo": this.policyData.holder.appntCustNo
							},
							modelName: "conAccountValueExtractionService",
							methodName: "partialExtractionFileUpload"
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
					}else{
						let requ = {
							data: {
								"fileBase64": this.img,
								"imageType": "jpg",
								"fileType": "back",
								"contNo": this.accountData.plicyno,
								"custNo": this.conservation.customerno
							},
							modelName: "conAccountValueExtractionService",
							methodName: "partialExtractionFileUpload"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
								this.$refs.img2.src = this.img
								this.idBack = body.data.fileId
							} else {
								this.showModals(body.data.msg)
							}
						})
					}
				}
			},
			confirm() {
				let tip = ''
				
				if((!/(^[0-9]{1,7}$)|(^[0-9]{1,7}[\.]{1}[0-9]{1,2}$)/.test(this.perInfo.aRMoney))){
					tip = '账户价值提取金额必须为正数且小数位数不能大于两位。'
				}
//				if((!/^[0-9]{1,7}|(^[0-9]{1,7}.[0-9]{1,2}$)/.test(this.perInfo.aRMoney))){
//					tip = '账户价值提取金额必须为正数且小数位数不能大于两位。'
//				}
//				if((!/^\d+(\.\d{1,2})?$/.test(this.perInfo.aRMoney))){
//					tip = '账户价值提取金额必须为正数且小数位数不能大于两位。'
//				}
//				if((!/^[0-9]{1,12}$/.test(this.perInfo.aRMoney))){
//					tip = '账户价值提取金额输入错误。'
//				}
				if(this.perInfo.aRMoney == '' || this.perInfo.aRMoney == '0') {
					tip = '账户价值提取金额必须大于0。'
				}
				if(parseFloat(this.perInfo.aRMoney) > 1000000) {
					tip = '线上账户价值提取金额不能超过100万元！'
				}
				if(parseFloat(this.perInfo.aRMoney) > parseFloat(this.insuAccBala)) {
					tip = '账户价值提取金额不能超过可领取金额。'
				}
				if(tip != '') {
					this.showModals(tip)
				} else {
					if(this.whereFrom != 'pList'){
						let requ = {
							"data":{
									"contNo":this.policyData.contNo,
	//							"contNo":"110000272588",
								"aRMoney":this.perInfo.aRMoney
							},
							"modelName": "conAccountValueExtractionService",
					     	"methodName": "partialExtractionTrial"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
								this.aRFYMoney =body.data.aRFYMoney
								this.trueReceiveFee=body.data.getMoney
								this.enable = true;
							} else {
								this.showModals(body.data.msg)
							}
						})
					}else{
//						this.enable = true;
						this.sure()
					}
				}
				
			},
			yesClick() {
				this.enable = false;
				this.sure()
			},
			noClick() {
				this.enable = false;
			},
			save(){
				if(this.whereFrom != 'pList'){
					let requ = {
						data: {
							"cardFrontId":this.idFront,//身份证正面id
							"cardBackId":this.idBack,//身份证反面id
//							"cardFrontId":"84fdc6c3ea714c19a59745654a4078fd",//身份证正面id
//							"cardBackId":"f46ff77608f241ce9e4cbf2842a827d8",//身份证反面id
							"cardFrontIdBf":"",
							"cardBackIdBf":"",
							"conservationId":this.conservationId,
							"conservationAccountvalueId":this.conservationAccountvalueId,
							"conNo":this.connoTpp,
							"contNo":this.policyData.contNo,//保单号
	//						"contNo":"110000272588",
							"postalType":this.code,//批单寄送方式，是1（代理人下载），4（邮箱），5（微信）
							"pEmail":this.perInfo.email,
							"getBankCode":this.bankCode,//交费银行编码
							"getBankAccNo":this.perInfo.card,
							"getAccName":this.bankName,
							"getName":this.policyData.holder.appntName,
							"getSex":this.policyData.holder.appntSex,
							"getIDType":this.policyData.holder.appntIDType,
							"getIDNo":this.policyData.holder.appntIDNo,
							"getBirthday":this.policyData.holder.appntBirthday,
							"edorAppName":this.policyData.holder.appntName,
							"aRMoney":this.perInfo.aRMoney,
							"insuAccBala":this.insuAccBala,
							"holder":this.policyData.holder.appntName,
							"agentCode":"",
							"holderIdno":this.holder.cerCard,
							"customerNo":this.policyData.holder.appntCustNo,
							"trueReceiveFee":this.trueReceiveFee,
							"commissionFee":this.aRFYMoney,
							"isTwoPay":'N'
						},
						"modelName":"conAccountValueExtractionService",
				   		 "methodName":"saveInfomation"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.conservationId=body.data.conservationId
							this.conservationAccountvalueId=body.data.conservationAccountvalueId
							this.go('/preservation/preservationPolicyReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationAccountvalueId='+this.conservationAccountvalueId+'&isXuqi='+this.isXuqi)
						} else {
							this.showModals(body.data.msg)
						}
					})
				}else{
					let requ = {
						data: {
							"cardFrontId":this.idFront,//身份证正面id
							"cardBackId":this.idBack,//身份证反面id
//							"cardFrontId":"84fdc6c3ea714c19a59745654a4078fd",//身份证正面id
//							"cardBackId":"f46ff77608f241ce9e4cbf2842a827d8",//身份证反面id
							"cardFrontIdBf":this.idFrontBf,
							"cardBackIdBf":this.idBackBf,
							"conservationId":this.accountData.conservationid,
							"conservationAccountvalueId":this.accountData.id,
							"conNo":this.connoTpp,
							"contNo":this.accountData.plicyno,//保单号
	//						"contNo":"110000272588",
							"postalType":this.code,//批单寄送方式，是1（代理人下载），4（邮箱），5（微信）
							"pEmail":this.perInfo.email,
							"getBankCode":this.bankCode,//交费银行编码
							"getBankAccNo":this.perInfo.card,
							"getAccName":this.bankName,
							"getName":this.accountData.getname,
							"getSex":this.accountData.getsex,
							"getIDType":this.accountData.getidtype,
							"getIDNo":this.accountData.getidno,
							"getBirthday":this.accountData.getbirthday,
							"edorAppName":this.accountData.appntName,
							"aRMoney":this.accountData.receivesum,
							"insuAccBala":this.accountData.fee,
							"holder":this.accountData.appntName,
							"agentCode":"",
							"holderIdno":this.accountData.getidno,
							"customerNo":this.conservation.customerno,
							"trueReceiveFee":this.accountData.trueReceiveFee,
							"commissionFee":this.accountData.commissionFee,
							"isTwoPay":'Y'
						},
						"modelName":"conAccountValueExtractionService",
				   		 "methodName":"saveInfomation"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.conservationId=body.data.conservationId
							this.conservationAccountvalueId=body.data.conservationAccountvalueId
							this.go('/preservation/preservationPolicyReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationAccountvalueId='+this.conservationAccountvalueId+'&whereFrom='+this.whereFrom+'&connoTpp='+this.connoTpp+'&change='+this.change+'&modify='+this.modify)
						} else {
							this.showModals(body.data.msg)
						}
					})
				}
			},
			sure(){
				let showModals = ''
				if(this.whereFrom != 'pList'){
					if(this.idFront == '' || this.idBack == '') {
						showModals = '影像件未上传。'
					}
				}else{
					if(this.cont != 1 || this.conts != 1){
						if(this.idFront == '' || this.idBack == '' || this.idFrontBf == '' || this.idBackBf == '') {
							showModals = '影像件未上传。'
						}
					}else{
						if(this.idFrontBf == '' || this.idBackBf == '') {
							showModals = '影像件未上传。'
						}
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
				if(this.whereFrom != 'pList'){
					if(this.holder.cerCard != this.policyData.holder.appntIDNo){
						showModals = '该身份证件与投保人证件内容不符，无法办理保全业务'
					}
				}else{
					if(this.cont != 1 || this.conts != 1){
						if(this.holder.cerCard != this.getidno){
							showModals = '该身份证件与投保人证件内容不符，无法办理保全业务'
						}
					}
				}
				if(showModals != '') {
					this.showModals(showModals)
				} else {
					for(let i=0;i<this.dict.bankList.length;i++){
						if(this.bankCode==this.dict.bankList[i].code){
							this.bankName=this.dict.bankList[i].text
						}
					}
					if(this.whereFrom=='pList'){
//						if(this.cont != 1 || this.conts != 1 || this.num=='1'){
						if(this.cont != 1 || this.conts != 1 || this.modify == 2){
							this.save()
						}else{
							this.go('/preservation/preservationPolicyReissueAffirm?connoTpp='+this.connoTpp+'&whereFrom='+this.whereFrom+'&serverId='+this.serverId)
						}
					}else{
						this.save()
					}
				}
			},
		},
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
	
	.details .value3 {
				border: 1px #eee solid;
				border-radius: 5px;
				padding: 8px;
				padding-left: 15px;
				width: 35%;
				margin-right: 5px;
			}
	.details div,span,p{
		font-size: 0.8rem;
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
	
	/*.fa.fa-angle-down {
		color: #000;
		font-size: 1.6rem;
		padding-left: 4px;
		vertical-align: middle;
		z-index: -100;
	}*/
	
	.details .yellow {
		border: 1px solid #FEB101;
		background: #FEB101;
		padding: 3px;
		margin-left: 5px;
		border-radius: 10%;
		color: #fff;
	}
	
	.details .gray {
		border: 1px solid #BBB;
		background: #fff;
		padding: 3px;
		margin-left: 5px;
		border-radius: 10%;
		color: #BBB;
	}
	.details .info {
		width: 100%;
		/*height: 40px;
		line-height: 40px;*/
		line-height: 2rem;
		background: #fff;
		border-top: 1px solid #A9A9A9;
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
		margin-top: 20%;
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
	/* 告知框CSS */
	
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
		border-top: 1px dashed #BBB;
		padding-top: 6%;
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.add-btn {
		width: 75px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #FEB101;
		border-radius: 5px;
		color: #ffffff;
		margin-bottom: 15px;
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
	
	.details .infox {
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