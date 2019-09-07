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
				<div class="content">
					<div style="width: 95%;margin: auto;line-height: 1.5rem;" v-if="whereFrom != 'pList'">退费金额：<span style="color: #FEB101;">{{cTMoney}}</span>元</div>
					<div style="width: 95%;margin: auto;line-height: 1.5rem;" v-if="whereFrom == 'pList'">退费金额：<span style="color: #FEB101;">{{accountData.fee}}</span>元</div>
					<div v-if="whereFrom != 'pList'">
						<div v-if="isHesitationTime=='Y'">
							<div style="color: #FEB101;width: 95%;margin: auto;line-height: 1.5rem;">
								犹豫期内退保，将按上述金额返还。
							</div>
						</div>
						<div v-if="isHesitationTime=='N'">
							<div style="color: #FEB101;width: 95%;margin: auto;line-height: 1.5rem;">
								该保单已超过犹豫期，退保将按上述金额返还。
							</div>
						</div>
					</div>
					<div v-if="whereFrom == 'pList'">
						<div v-if="serverId=='WT'">
							<div style="color: #FEB101;width: 95%;margin: auto;line-height: 1.5rem;">
								犹豫期退保将返还您所有金额
							</div>
						</div>
						<div v-if="serverId=='CT'">
							<div style="color: #FEB101;width: 95%;margin: auto;line-height: 1.5rem;">
								超过犹豫期，将按上述金额返还。
							</div>
						</div>
					</div>
					<div class="flex" style="margin-top: 10px;width: 95%;margin: auto;line-height: 1.5rem;">
						<p>退保原因</p>
						<label style='width:50%;margin-right:1.8rem' class='flex-end' v-if="whereFrom != 'pList'">
	               			<picker v-model="reason" code="code" :items="reasonList" :values="reason"></picker>&nbsp;&nbsp;
	              			 <i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#FEB101;'></i>
	           			</label>
	           			<div style='width:50%;margin-right:1.8rem;background: #fff;' class='flex-end' disabled="disabled" v-if="whereFrom == 'pList'">
	               			<div>{{reason}}</div>&nbsp;&nbsp;
	              			 <i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#FEB101;'></i>
	           			</div>
					</div>
				</div>
				<div>
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
							<li class="dash"  v-if="whereFrom != 'pList'">
								<div style="text-align: right;margin-right: 5%;">
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
									<div style="text-align: end;background: #fff;">{{accountData.getname}}</div>
								</div>
							</li>
							<li class="flex dash" v-if="isXuqi==1&&whereFrom != 'pList'">
								<div class="left">
									开户银行
								</div>
								<div disabled="disabled" class="right" style="background: #fff;">
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
							<li class="flex dash" v-if="isXuqi!=1 || whereFrom == 'pList'">
								<div class="left">
									银行卡号
								</div>
								<div class="right">
									<input type="text" placeholder="请输入银行卡号" v-model="perInfo.card" maxlength="20" style="text-align: end;" />
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
								</div>
								<mt-popup position="center" class="phone_valid popup" v-model="show" style="width:70%;border:1px solid #eee;position: fixed;
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
								<div class="left">
									保单批注函
								</div>
								<label class="right" v-if="whereFrom != 'pList'">
					              <picker v-model="notationCulvert" defaultText="请选择" :items="notationCulvertList" code="code" text="text" :values="notationCulvert"></picker>
					              <i class="fa fa-angle-down" style="color: #FEB101;
			font-size: x-large !important;"></i>
					            </label>
					            <div class="right" v-if="whereFrom == 'pList'">
					              <div style="color: #A9A6A6;">{{notationCulvert}}</div>
					              <i class="fa fa-angle-down" style="color: #A9A6A6;
			font-size: x-large !important;"></i>
					            </div>
							</li>
							<li class="flex dash" v-show="emails">
								<div class="left">
									电子邮箱
								</div>
								<div class="right" v-if="whereFrom != 'pList'">
									<input type="text" placeholder="请输入" style="text-align: end;" v-model="perInfo.email"/>
								</div>
								<div class="right" v-if="whereFrom == 'pList'">
									{{perInfo.email}}
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
				<p>
					<Alert ref="showalert"></Alert>
				</p>
				<div class="confirm">
					<div @click="confirm()">
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
	import picker from '@/components/common/Picker.vue'
	import Alert from '@/components/policy/common/alert'
	import { Indicator } from 'mint-ui';
	import { mapState, mapMutations } from 'vuex'
	import store from '@/vuex/preservation/index.js'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
//	import bankList from '../../../static/dict/bank_new.json'
	export default {
		name: 'preservationPolicyPremium',
		components: {
			Headerbtns,
			picker,
			Indicator,
			Alert,
			bankList,
			IDCardScanning
		},
		data() {
			return {
				page_title: '退保/犹豫期退保',
				isXuqi: 1, //是否为续期
				reasonList: ['个人经济原因','对公司服务不满意','对险种不满意'],
				reason: '', //退保原因
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
				reasonCode:'',
				emails: false,
				WX: false,
				down: false,
				aRFYMoney :'',//手续费
				cTMoney:'',//退费金额
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
				mainRiskName:'',//主险名称
				isHesitationTime:'',//是否犹豫期内
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
				conservationRetreatsPayId:'',
				conservationId:'',
				num:'',
				appntName:'',
				whereFrom:'',
				fee:'',
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
			},
			'reason': function(value) {
				if(value == '个人经济原因') {
					this.reasonCode = 1
				} else if(value == '对公司服务不满意') {
					this.reasonCode = 2
				} else if(value == '对险种不满意') {
					this.reasonCode = 3
				}
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
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
//			this.trial()
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
				if(queryParams.conservationRetreatsPayId){//
					this.conservationRetreatsPayId=queryParams.conservationRetreatsPayId
				}
				if(queryParams.num){//
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
//				if(queryParams.change){//
//					this.change=queryParams.change
//				}
			}
			this.bank()
			if(this.whereFrom != 'pList'){
				this.trial()
			}
			if(this.num=='1' || this.whereFrom == 'pList'){
				this.aaa()
			}else{
				this.bankCode=this.policyPremium.bankCode.substring(0, 3)
//				this.bankCode=this.policyPremium.bankCode
				this.perInfo.card = this.policyPremium.bankCard
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
			left() {
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
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			confirmXuqiAccount() {
				this.isXuqi = 1;
				this.bankCode=this.policyPremium.bankCode.substring(0, 3)
				this.perInfo.card = this.policyPremium.bankCard
			},
			confirmOtherAccount() {
				this.isXuqi = 2;
				if(this.num=='1'){
					this.bankCode=this.xuqibankCode
					this.perInfo.card=this.xuqicard
				}else{
					if(this.policyData.ContInfo.bankAgent == '16'){
						this.bankCode='531'
					}else{
						this.bankCode=''
					}
					this.perInfo.card=''
				}
			},
			aaa(){
				let requ = {
					data: {
						"conservationId":this.conservationId,
						"conservationRetreatsPayId":this.conservationRetreatsPayId,
						"conNo":this.connoTpp
					},
					"modelName":"conRetreatsService",
			   		 "methodName":"getInfomation"
				}
				utils.http.postFast('CusbusinessService', requ, (body) => {
					if(body.data.code == '0') {
						this.accountData=body.data.conservationRetreats
						this.conservation=body.data.conservation
						this.perInfo.email = body.data.conservationRetreats.email
						console.log(this.perInfo.email)
						this.perInfo.iPFYMoney = body.data.conservationRetreats.fee
						this.code = body.data.conservationRetreats.letter
						this.bankCode=body.data.conservationRetreats.accountbank
						this.xuqibankCode=body.data.conservationRetreats.accountbank
						this.xuqicard = body.data.conservationRetreats.banknumber
						this.perInfo.card = body.data.conservationRetreats.banknumber
						if(this.whereFrom == 'pList'){
							this.getidno = body.data.conservationRetreats.getidno
						}else{
							this.holder.cerCard=body.data.conservationRetreats.getidno
						}
						if(this.code == '5') {
							this.notationCulvert = '微信信函'
						} else if(this.code == '4') {
							this.notationCulvert = '电子邮件'
						} else if(this.code == '1') {
							this.notationCulvert = '代理人下载发送'
						}
						this.reason=body.data.conservationRetreats.edorreason
						this.reasonCode=body.data.conservationRetreats.reason
						if(this.reasonCode == '1') {
							this.reason = '个人经济原因'
						} else if(this.reasonCode == '2') {
							this.reason = '对公司服务不满意'
						} else if(this.reasonCode == '3') {
							this.reason = '对险种不满意'
						}
						this.file=body.data.files
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
					}else {
						this.showModals(body.data.msg)
					}
				})
			},
			trial(){
				let requ = {
						"data":{
							"contNo":this.policyData.contNo
//							"contNo":"130005753788",
						},
						"modelName": "conRetreatsService",
						"methodName": "retreatsValidate"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.cTMoney=body.data.cTMoney
							this.mainRiskName=body.data.mainRiskName
							this.isHesitationTime=body.data.isHesitationTime
						} else {
							if(body.data.resultCode == 'B200700011'){
								this.showModals('线上退保金额不能超过100万元！')
							}else{
								this.showModals(body.data.msg)
							}
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
							modelName: "conRetreatsService",
							methodName: "retreatsPayFileUpload"
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
							modelName: "conRetreatsService",
							methodName: "retreatsPayFileUpload"
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
							modelName: "conRetreatsService",
							methodName: "retreatsPayFileUpload"
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
							modelName: "conRetreatsService",
							methodName: "retreatsPayFileUpload"
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
			save(){
				if(this.whereFrom != 'pList'){
					if(this.isHesitationTime=='Y'){
						let requ = {
							data: {
								"cardFrontId":this.idFront,//身份证正面id
								"cardBackId":this.idBack,//身份证反面id
	//							"cardFrontId":"4d895f7bf1cb4810b811551e20f2c743",//身份证正面id
	//							"cardBackId":"74f8e88c96544eaba16a3f7d78ea74b6",//身份证反面id
								"cardFrontIdBf":"",
								"cardBackIdBf":"",
								"conservationId":this.conservationId,
								"conservationRetreatsPayId":this.conservationRetreatsPayId,
								"retreatsFee":this.cTMoney,//退费金额
								"edorReasonCode":this.reasonCode,
								"getBankCode":this.bankCode,//交费银行编码
								"getAccName":this.bankName,
								"getBankAccNo":this.perInfo.card,
								"postalType":this.code,//批单寄送方式，是1（代理人下载），4（邮箱），5（微信）
								"pEmail":this.perInfo.email,
								"contNo":this.policyData.contNo,//保单号
	//							"contNo":"130005753788",
								"edorAppName":this.policyData.holder.appntName,//申请人姓名（投保人）
								"riskName":this.mainRiskName,
								"agentCode":"",
								"getname":this.policyData.holder.appntName,
								"getsex":this.policyData.holder.appntSex,
								"getidtype":this.policyData.holder.appntIDType,
								"getidno":this.holder.cerCard,
								"getbirthday":this.policyData.holder.appntBirthday,
								"edorType":"WT",
								"edorreason":this.reason,
								"holderIdno":this.holder.cerCard,
								"customerNo":this.policyData.holder.appntCustNo,
								"isTwoPay":'N'
							},
							"modelName":"conRetreatsService",
					   		 "methodName":"saveInfomation"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
								this.conservationId=body.data.conservationId
								this.conservationRetreatsPayId=body.data.conservationRetreatsPayId
								this.go('/preservation/preservationPolicyReissueAffirm?server='+this.server+'&serverId='+this.serverId+'&isHesitationTime='+this.isHesitationTime+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&isXuqi='+this.isXuqi)
							} else {
								this.showModals(body.data.msg)
							}
						})
					}else if(this.isHesitationTime=='N'){
						let requ = {
							data: {
								"cardFrontId":this.idFront,//身份证正面id
								"cardBackId":this.idBack,//身份证反面id
	//							"cardFrontId":"4d895f7bf1cb4810b811551e20f2c743",//身份证正面id
	//							"cardBackId":"74f8e88c96544eaba16a3f7d78ea74b6",//身份证反面id
								"cardFrontIdBf":"",
								"cardBackIdBf":"",
								"conservationId":this.conservationId,
								"conservationRetreatsPayId":this.conservationRetreatsPayId,
								"retreatsFee":this.cTMoney,//退费金额
								"edorReasonCode":this.reasonCode,
								"getBankCode":this.bankCode,//交费银行编码
								"getAccName":this.bankName,
								"getBankAccNo":this.perInfo.card,
								"postalType":this.code,//批单寄送方式，是1（代理人下载），4（邮箱），5（微信）
								"pEmail":this.perInfo.email,
								"contNo":this.policyData.contNo,//保单号
	//							"contNo":"130005753788",
								"edorAppName":this.policyData.holder.appntName,//申请人姓名（投保人）
								"riskName":this.mainRiskName,
								"agentCode":"",
								"getname":this.policyData.holder.appntName,
								"getsex":this.policyData.holder.appntSex,
								"getidtype":this.policyData.holder.appntIDType,
								"getidno":this.holder.cerCard,
								"getbirthday":this.policyData.holder.appntBirthday,
								"edorType":"CT",
								"edorreason":this.reason,
								"holderIdno":this.holder.cerCard,
								"customerNo":this.policyData.holder.appntCustNo,
								"isTwoPay":'N'
							},
							"modelName":"conRetreatsService",
					   		 "methodName":"saveInfomation"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
								this.conservationId=body.data.conservationId
								this.conservationRetreatsPayId=body.data.conservationRetreatsPayId
								this.go('/preservation/preservationPolicyReissueAffirm?serverId='+this.serverId+'&isHesitationTime='+this.isHesitationTime+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&isXuqi='+this.isXuqi)
							} else {
								this.showModals(body.data.msg)
							}
						})
					}
				}else{
					if(this.serverId=='WT'){
						let requ = {
							data: {
								"cardFrontId":this.idFront,//身份证正面id
								"cardBackId":this.idBack,//身份证反面id
	//							"cardFrontId":"4d895f7bf1cb4810b811551e20f2c743",//身份证正面id
	//							"cardBackId":"74f8e88c96544eaba16a3f7d78ea74b6",//身份证反面id
								"cardFrontIdBf":this.idFrontBf,
								"cardBackIdBf":this.idBackBf,
								"conservationId":this.accountData.conservationid,
								"conservationRetreatsPayId":this.accountData.id,
								"retreatsFee":this.accountData.fee,//退费金额
								"edorReasonCode":this.accountData.reason,
								"getBankCode":this.bankCode,//交费银行编码
								"getAccName":this.bankName,
								"getBankAccNo":this.perInfo.card,
								"postalType":this.code,//批单寄送方式，是1（代理人下载），4（邮箱），5（微信）
								"pEmail":this.perInfo.email,
								"contNo":this.accountData.plicyno,//保单号
	//							"contNo":"130005753788",
								"edorAppName":this.accountData.getname,//申请人姓名（投保人）
								"riskName":this.accountData.riskname,
								"agentCode":"",
								"getname":this.accountData.getname,
								"getsex":this.accountData.getsex,
								"getidtype":this.accountData.getidtype,
								"getidno":this.accountData.getidno,
								"getbirthday":this.accountData.getbirthday,
								"edorType":"WT",
								"edorreason":this.accountData.edorreason,
								"holderIdno":this.accountData.getidno,
								"customerNo":this.conservation.customerno,
								"isTwoPay":'Y'
							},
							"modelName":"conRetreatsService",
					   		 "methodName":"saveInfomation"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
								this.conservationId=body.data.conservationId
								this.conservationRetreatsPayId=body.data.conservationRetreatsPayId
								this.go('/preservation/preservationPolicyReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&whereFrom='+this.whereFrom+'&connoTpp='+this.connoTpp+'&change='+this.change+'&modify='+this.modify)
							} else {
								this.showModals(body.data.msg)
							}
						})
					}else if(this.serverId=='CT'){
						let requ = {
							data: {
								"cardFrontId":this.idFront,//身份证正面id
								"cardBackId":this.idBack,//身份证反面id
	//							"cardFrontId":"4d895f7bf1cb4810b811551e20f2c743",//身份证正面id
	//							"cardBackId":"74f8e88c96544eaba16a3f7d78ea74b6",//身份证反面id
								"cardFrontIdBf":this.idFrontBf,
								"cardBackIdBf":this.idBackBf,
								"conservationId":this.accountData.conservationid,
								"conservationRetreatsPayId":this.accountData.id,
								"retreatsFee":this.accountData.fee,//退费金额
								"edorReasonCode":this.accountData.reason,
								"getBankCode":this.bankCode,//交费银行编码
								"getAccName":this.bankName,
								"getBankAccNo":this.perInfo.card,
								"postalType":this.code,//批单寄送方式，是1（代理人下载），4（邮箱），5（微信）
								"pEmail":this.perInfo.email,
								"contNo":this.accountData.plicyno,//保单号
	//							"contNo":"130005753788",
								"edorAppName":this.accountData.getname,//申请人姓名（投保人）
								"riskName":this.accountData.riskname,
								"agentCode":"",
								"getname":this.accountData.getname,
								"getsex":this.accountData.getsex,
								"getidtype":this.accountData.getidtype,
								"getidno":this.accountData.getidno,
								"getbirthday":this.accountData.getbirthday,
								"edorType":"CT",
								"edorreason":this.accountData.edorreason,
								"holderIdno":this.accountData.getidno,
								"customerNo":this.conservation.customerno,
								"isTwoPay":'Y'
							},
							"modelName":"conRetreatsService",
					   		 "methodName":"saveInfomation"
						}
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(body.data.code == '0') {
								this.conservationId=body.data.conservationId
								this.conservationRetreatsPayId=body.data.conservationRetreatsPayId
								this.go('/preservation/preservationPolicyReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&whereFrom='+this.whereFrom+'&connoTpp='+this.connoTpp+'&change='+this.change+'&modify='+this.modify)
							} else {
								this.showModals(body.data.msg)
							}
						})
					}
				}
			},
			confirm() {
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
				if(this.reason == '' || this.reason == '请选择') {
					showModals = '退保原因不能为空。'
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
//					console.log(this.bankCode)
					for(let i=0;i<this.dict.bankList.length;i++){
						if(this.bankCode==this.dict.bankList[i].code){
							this.bankName=this.dict.bankList[i].text
						}
					}
				if(this.whereFrom=='pList'){
					console.log(this.cont)
					console.log(this.conts)
					console.log(this.change)
//					if(this.cont != 1 || this.conts != 1 || this.num=='1'){
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
	
	.details .dash {
		border-bottom: 1px dashed #BBB;
		width: 100%;
		margin: auto;
	}
	
	.details .policy {
		line-height: 1.3rem;
		/*margin-left: 5%;*/
	}
	
	.details .flex {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	
	.details .flex-end {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-right: 0!important;
	}
	
	.details .content {
		width: 95%;
		margin: auto;
		padding: 3% 0;
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
	.details .infox {
		border-bottom: 1px dashed #BBB;
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