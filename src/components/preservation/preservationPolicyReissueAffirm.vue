<template>
	<div>
		<div v-show="!caValue.isCAOpen">
			<Headerbtns :title=page_title>
				<div slot="left" class="back" @click="goBack">
					<i class="fa fa-angle-left"></i>
				</div>
				<i class="fa fa-ellipsis-v back" style="line-height: 55px;font-size: 24px" slot="right" 
						@click="share()"
						v-clipboard:copy="shareLink"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError"></i>
						<!--sheetVisible = !sheetVisible-->
			</Headerbtns>
			<div class="details">
				<div>
					<!--<div class="application">保险合同变更申请书</div>
					<div class="date">申请日期：{{accountData.applydate}}</div>-->
					<div>
						<ul>
							<!--保单交费-->
							<li v-if="serverId=='PC'">
								<div class="application">保险合同变更申请书</div>
								<div class="date">申请日期：{{accountData.applydate}}</div>
								<div class="info" style="margin: 0 -2%;">
									<div style="margin-left: 3%;float:left;">保险单号码:{{accountData.plicyno}}</div>
									<div style="margin-right: 3%;float:right;">申请人:{{accountData.name}}(投保人)</div>
								</div>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">{{conservation.contype | ttState}}</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										保险单投保人于{{accountData.applydate}}交纳续期保险费，交费金额<span style="color: red;font-weight: bold;">{{accountData.fee}}元</span>。大写:{{premiumD}}
									</div>
									<div style="color:#FEB101;margin-bottom:4px;">保险款项补退费方式：</div>
									<div style="line-height:1.1rem;">
										<div>委托银行转账授权</div>
										<div>开户银行：<span style="color: red;font-weight: bold;">{{accountData.accountname}}</span> 户名：<span style="color: red;font-weight: bold;">{{accountData.name}}</span></div>
										<div>结算账户：<span style="color: red;font-weight: bold;">{{accountData.banknumber}}</span></div>
									</div>
								</div>
							</li>
							<!--保单补发-->
							<li v-if="serverId=='LR'">
								<div class="application">保险合同变更申请书</div>
								<div class="date">申请日期：{{accountData.applydate}}</div>
								<div class="info" style="margin: 0 -2%;">
									<div style="margin-left: 3%;float:left;">保险单号码:{{accountData.plicyno}}</div>
									<div style="margin-right: 3%;float:right;">申请人:{{accountData.name}}(投保人)</div>
								</div>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">{{conservation.contype | ttState}}</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										保险合同于{{accountData.applydate}}申请补发，原保险合同于申请日作废。补发工本费<span style="color: red;font-weight: bold;">{{accountData.fee}}元</span>，大写：{{premiumD}}。
									</div>
									<div style="color:#FEB101;margin-bottom:4px;">保险款项补退费方式：</div>
									<div style="line-height:1.1rem;">
										<div>委托银行转账授权</div>
										<div>开户银行：<span style="color: red;font-weight: bold;">{{accountData.accountname}}</span> 户名：<span style="color: red;font-weight: bold;">{{accountData.name}}</span></div>
										<div>结算账户：<span style="color: red;font-weight: bold;">{{accountData.banknumber}}</span></div>
									</div>
								</div>
							</li>
							<!--追加保费-->
							<li v-if="serverId=='IP'">
								<div class="application">投资账户变更申请书</div>
								<div class="date">申请日期：{{accountData.applydate}}</div>
								<div class="info" style="margin: 0 -2%;">
									<div style="margin-left: 3%;float:left;">保险单号码:{{accountData.plicyno}}</div>
									<div style="margin-right: 3%;float:right;">申请人:{{accountData.name}}(投保人)</div>
								</div>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">{{conservation.contype | ttState}}</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										保险单投保人于{{accountData.applydate}}申请交纳追加保险费，交费金额<span style="color: red;font-weight: bold;">{{accountData.fee}}元</span>，大写：{{premiumD}}。
									</div>
									<div style="color:#FEB101;margin-bottom:4px;">保险款项补退费方式：</div>
									<div style="line-height:1.1rem;">
										<div>委托银行转账授权</div>
										<div>开户银行：<span style="color: red;font-weight: bold;">{{accountData.accountname}}</span> 户名：<span style="color: red;font-weight: bold;">{{accountData.name}}</span></div>
										<div>结算账户：<span style="color: red;font-weight: bold;">{{accountData.banknumber}}</span></div>
									</div>
								</div>
							</li>
							<!--犹豫期退保-->
							<li v-if="isHesitationTime=='Y' && whereFrom != 'pList'">
								<div class="application">保险合同解除申请书</div>
								<div class="date">申请日期：{{accountData.applydate}}</div>
								<div class="info" style="margin: 0 -2%;">
									<div style="margin-left: 3%;float:left;">保险单号码:{{accountData.plicyno}}</div>
									<div style="margin-right: 3%;float:right;">申请人:{{accountData.name}}(投保人)</div>
								</div>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">{{conservation.contype | ttState}}</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										{{accountData.riskname}}及附加险自{{accountData.applydate}}起作犹豫期内解除合同处理，退还保险费<span style="color: red;font-weight: bold;">{{accountData.fee}}元</span>（{{premiumD}}）。
									</div>
									<div style="line-height:1.1rem;">
										提示：如通过银行转账退费，退费金额将于公司收到您申请后的十个工作日退至您指定的退款账户中。
									</div>
									<div style="color:#FEB101;margin-bottom:4px;">保险款项补退费方式：</div>
									<div style="line-height:1.1rem;">
										<div>委托银行转账授权</div>
										<div>开户银行：<span style="color: red;font-weight: bold;">{{accountData.accountname}}</span> 户名：<span style="color: red;font-weight: bold;">{{accountData.name}}</span></div>
										<div>结算账户：<span style="color: red;font-weight: bold;">{{accountData.banknumber}}</span></div>
									</div>
								</div>
							</li>
							<!--退保-->
							<li v-if="isHesitationTime=='N' && whereFrom != 'pList'">
								<div class="application">保险合同解除申请书</div>
								<div class="date">申请日期：{{accountData.applydate}}</div>
								<div class="info" style="margin: 0 -2%;">
									<div style="margin-left: 3%;float:left;">保险单号码:{{accountData.plicyno}}</div>
									<div style="margin-right: 3%;float:right;">申请人:{{accountData.name}}(投保人)</div>
								</div>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">{{conservation.contype | ttState}}</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										{{accountData.riskname}}及附加险自{{accountData.applydate}}起作解除合同处理，退费金额<span style="color: red;font-weight: bold;">{{accountData.fee}}元</span>（{{premiumD}}）。
									</div>
									<div style="line-height:1.1rem;">
										提示：如通过银行转账退费，退费金额将于公司收到您申请后的十个工作日退至您指定的退款账户中。
									</div>
									<div style="color:#FEB101;margin-bottom:4px;">保险款项补退费方式：</div>
									<div style="line-height:1.1rem;">
										<div>委托银行转账授权</div>
										<div>开户银行：<span style="color: red;font-weight: bold;">{{accountData.accountname}}</span> 户名：<span style="color: red;font-weight: bold;">{{accountData.name}}</span></div>
										<div>结算账户：<span style="color: red;font-weight: bold;">{{accountData.banknumber}}</span></div>
									</div>
								</div>
							</li>
							<!--犹豫期退保-->
							<li v-if="whereFrom == 'pList' && this.serverId=='WT'">
								<div class="application">保险合同解除申请书</div>
								<div class="date">申请日期：{{accountData.applydate}}</div>
								<div class="info" style="margin: 0 -2%;">
									<div style="margin-left: 3%;float:left;">保险单号码:{{accountData.plicyno}}</div>
									<div style="margin-right: 3%;float:right;">申请人:{{accountData.name}}(投保人)</div>
								</div>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">{{conservation.contype | ttState}}</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										{{accountData.riskname}}及附加险自{{accountData.applydate}}起作犹豫期内解除合同处理，退还保险费<span style="color: red;font-weight: bold;">{{accountData.fee}}元</span>（{{premiumD}}）。
									</div>
									<div style="line-height:1.1rem;">
										提示：如通过银行转账退费，退费金额将于公司收到您申请后的十个工作日退至您指定的退款账户中。
									</div>
									<div style="color:#FEB101;margin-bottom:4px;">保险款项补退费方式：</div>
									<div style="line-height:1.1rem;">
										<div>委托银行转账授权</div>
										<div>开户银行：<span style="color: red;font-weight: bold;">{{accountData.accountname}}</span> 户名：<span style="color: red;font-weight: bold;">{{accountData.name}}</span></div>
										<div>结算账户：<span style="color: red;font-weight: bold;">{{accountData.banknumber}}</span></div>
									</div>
								</div>
							</li>
							<!--退保-->
							<li v-if="whereFrom == 'pList' && this.serverId=='CT'">
								<div class="application">保险合同解除申请书</div>
								<div class="date">申请日期：{{accountData.applydate}}</div>
								<div class="info" style="margin: 0 -2%;">
									<div style="margin-left: 3%;float:left;">保险单号码:{{accountData.plicyno}}</div>
									<div style="margin-right: 3%;float:right;">申请人:{{accountData.name}}(投保人)</div>
								</div>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">{{conservation.contype | ttState}}</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										{{accountData.riskname}}及附加险自{{accountData.applydate}}起作解除合同处理，退费金额<span style="color: red;font-weight: bold;">{{accountData.fee}}元</span>（{{premiumD}}）。
									</div>
									<div style="line-height:1.1rem;">
										提示：如通过银行转账退费，退费金额将于公司收到您申请后的十个工作日退至您指定的退款账户中。
									</div>
									<div style="color:#FEB101;margin-bottom:4px;">保险款项补退费方式：</div>
									<div style="line-height:1.1rem;">
										<div>委托银行转账授权</div>
										<div>开户银行：<span style="color: red;font-weight: bold;">{{accountData.accountname}}</span> 户名：<span style="color: red;font-weight: bold;">{{accountData.name}}</span></div>
										<div>结算账户：<span style="color: red;font-weight: bold;">{{accountData.banknumber}}</span></div>
									</div>
								</div>
							</li>
							<!--账户价值-->
							<li v-if="serverId=='AR'">
								<div class="application">投资账户变更申请书</div>
								<div class="date">申请日期：{{accountData.applydate}}</div>
								<div class="info" style="margin: 0 -2%;">
									<div style="margin-left: 3%;float:left;">保险单号码:{{accountData.plicyno}}</div>
									<div style="margin-right: 3%;float:right;">申请人:{{accountData.name}}(投保人)</div>
								</div>
								<div class="title">&nbsp;&nbsp;申请事项</div>
								<div style="margin:auto 4px;">
									<div class="hetong">{{conservation.contype | ttState}}</div>
									<div style="color:#FEB101;margin-bottom:4px;">变更描述：</div>
									<div style="line-height:1.1rem;">
										投保人{{accountData.getname}}于{{accountData.applydate}}申请账户价值部分提取，按{{accountData.applydate}}价格卖出，各账户提取金额为:
										<div>万能账户:<span style="color: red;font-weight: bold;">{{accountData.receivesum}}元</span></div>
										实际到账提取金额合计<span style="color: red;font-weight: bold;">{{accountData.receivesum}}元</span>（{{premiumD}}）。
									</div>
									<div style="line-height:1.1rem;">
										提示：如通过银行转账退费，退费金额将于公司收到您申请后的十个工作日退至您指定的退款账户中。
									</div>
									<div style="color:#FEB101;margin-bottom:4px;">保险款项补退费方式：</div>
									<div style="line-height:1.1rem;">
										<div>委托银行转账授权</div>
										<div>开户银行：<span style="color: red;font-weight: bold;">{{accountData.accountname}}</span> 户名：<span style="color: red;font-weight: bold;">{{accountData.getname}}</span></div>
										<div>结算账户：<span style="color: red;font-weight: bold;">{{accountData.banknumber}}</span></div>
									</div>
								</div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;函件寄送方式：
									<span v-if="accountData.letter != 4">{{accountData.letter | letterStaue}}</span>
									<span v-if="accountData.letter == 4">{{accountData.letter | letterStaue}}</span>
								</div>
								<div style="margin-left: 3%;line-height: 1.1rem;">{{accountData.email}}</div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;申请办理类型：<span>本人申请</span></div>
							</li>
							<li>
								<div class="title">&nbsp;&nbsp;申请人声明及签名</div>
								<div style="margin:auto 4px;margin-bottom:5.5rem;">
									<div class="tips">请您在签名前再次核对填写内容，对于与保险条款及申请书事项不符的解释、说明或书面承诺均无效。</div>
									<div style="line-height:1.1rem;">声明：本人申请办理上述变更业务，并同意以贵公司核准后确认的内容及生效日期为准</div>
									<div v-if="change=='change' || whereFrom != 'pList'">
										<div style="font-size:1rem;text-align:end;line-height:2rem;padding-right: 1rem;font-size: 0.8rem;" @click="faceTest()">申请人身份验证及签名</div>
										<div style="width:5rem;height:5rem;float:right;padding-right:3rem;">
											<img style="width:5rem;height:5rem;" :class="{rotate:isRotate}" :src="writing" @click="faceTest()">
										</div>
									</div>
									<div v-if="change != 'change' && whereFrom == 'pList'" disabled="disabled">
										<div style="font-size:1rem;text-align:end;line-height:2rem;padding-right: 1rem;font-size: 0.8rem;">申请人身份验证及签名</div>
										<div style="width:5rem;height:5rem;float:right;padding-right:3rem;">
											<img style="width:5rem;height:5rem;" ref='signImg'>
										</div>
									</div>
								</div>
							</li>
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
										保全申请成功
									</div>
								</div>
								<div style="border: 1px dashed #959595;margin: 10px 0;">

								</div>
								<div class="btn-wrapper" v-if="this.whereFrom!='pList'">
									<div class="add-btns" @click="goToPolicy()">继续保全申请</div>
									<div class="add-btns" style="margin-left: 10px;" @click="sure()">返回首页</div>
								</div>
								<div class="btn-wrapper" v-if="this.whereFrom=='pList'">
									<div class="add-btn" @click="sure()">确定</div>
								</div>
							</div>
						</div>
						<div class="v-modal" style=""></div>
					</div>
				</mt-popup>-->
				<mt-actionsheet
				:actions="actions"
				v-model="sheetVisible">
			</mt-actionsheet>
				<p>
					<Alert ref="showalert"></Alert>
				</p>
			</div>

		</div>
		<NewCA v-show="caValue.isCAOpen" v-model="caValue" :value="caValue" @ChildMsg='getChild'></NewCA>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	import NewCA from '../common/NewCA'
	import store from '@/vuex/preservation/index.js'
	import { mapState, mapMutations } from 'vuex'
	import Alert from '@/components/policy/common/alert'
	import albo from '../../utils/albo.js'
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
				num:'1',
				page_title: '申请确认',
				date: '', //当前日期
				currentDate: '',
				nowDate: '',
				policyNum: '000000000', //保险单号码
				userName: '', //申请人
				bank: '',
				card: '',
//				toggle: {
//					success: false
//				},
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
				bnf: '',
				notationCulvert: '',
				signNum: '',
				faceNum: '',
				server: '',
				serverId: '',
				isXuqi: '',
				premiumD: '',
				isHesitationTime:'',//是否犹豫期内
				signNum:'',//签名返回的filedid
				faceNum:'',//人脸识别返回的filedid
				edorNo:'',//保全ID
				conno:'',//保全受理号
				conservationAccountvalueId:'',//账户价值id
				conservationFeeAddPayId:'',//保险费追加ID
				conservationRetreatsPayId:'',//退保
				conservationPolicyresendId:'',
				conservationPolicyPayId:'',
				conservationId:'',//保全id
				conNo:'',//二次支付  保全受理号
				whereFrom:'',
				accountData:'',//账户价值返回的数据
				conservation:'',
				change:'',
				idFront:'',
				idBack:'',
				beforeSign:'',
				beforeFace:'',
				beforeBack:'',
				beforeFront:'',
				sheetVisible:false,
				actions:[{
							name:"微信分享",
							method:this.shareApp 
						 },
						 ],
				shareLink:"",
				file:'',
				t:'',
				isXuqi:'',
				modify:'',
				writing: 'data:image/jpeg;base64,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',
				isRotate: false
			}
		},
		computed: {
			caShow() {
				return this.caValue.isCAOpen
			},
			...mapState(['policyData', 'perData', 'signData', 'policyPremium']),
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
			console.log(this.policyPremium)
//			if(this.policyPremium.rNPrem=='0'){
//				console.log(11111111)
//				this.premiumD = '零'
//			}else if(this.policyPremium.rNPrem==''){
//				this.premiumD = ''
//			}else{
//				this.premiumD = albo.Arabia_To_SimplifiedChinese(this.policyPremium.rNPrem)
//			}
			//大写albo.Arabia_To_SimplifiedChinese
//			if(this.policyPremium.postalType == '5') {
//				this.notationCulvert = '微信信函'
//			} else if(this.policyPremium.postalType == '4') {
//				this.notationCulvert = '电子邮件'
//			} else if(this.policyPremium.postalType == '1') {
//				this.notationCulvert = '代理人下载发送'
//			}
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
			//当前日期的格式
			let queryParams = this.$route.query;
			if(queryParams) {
//				if(queryParams.server) {
//					this.server = queryParams.server;
//				}
				if(queryParams.serverId) {
					this.serverId = queryParams.serverId;
				}
				if(queryParams.isHesitationTime){
					this.isHesitationTime=queryParams.isHesitationTime
				}
				if(queryParams.conservationId){
					this.conservationId=queryParams.conservationId
				}
				if(queryParams.conservationAccountvalueId){//账户价值ID
					this.conservationAccountvalueId=queryParams.conservationAccountvalueId
				}
				if(queryParams.conservationFeeAddPayId){//保险费追加ID
					this.conservationFeeAddPayId=queryParams.conservationFeeAddPayId
				}
				if(queryParams.conservationRetreatsPayId){//
					this.conservationRetreatsPayId=queryParams.conservationRetreatsPayId
				}
				if(queryParams.conservationPolicyresendId){//
					this.conservationPolicyresendId=queryParams.conservationPolicyresendId
				}
				if(queryParams.conservationPolicyPayId){//
					this.conservationPolicyPayId=queryParams.conservationPolicyPayId
				}
				if(queryParams.connoTpp){//
					this.connoTpp=queryParams.connoTpp
				}
				if(queryParams.whereFrom){//
					this.whereFrom=queryParams.whereFrom
				}
				if(queryParams.change){//
					this.change=queryParams.change
				}
				if(queryParams.isXuqi){//
					this.isXuqi=queryParams.isXuqi
				}
				if(queryParams.modify){//
					this.modify=queryParams.modify
				}
			}
			let date = new Date()
			this.t=Number(new Date())
			this.nowDate = date.getHours() + ':' + date.getMinutes() + ':' + '00' //带时间
			this.currentDate = date.getFullYear() + '-' + fillZero(date.getMonth() + 1) + '-' + fillZero(date.getDate()) //年月日
			console.log(this.nowDate)
			if(this.serverId == 'PC'){//保单交费
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
						this.accountData=body.data.conservationPolicyPay
						this.conservation=body.data.conservation
						this.file=body.data.files
						console.log(this.file)
						for(let i=0;i<this.file.length;i++){
							if(this.file[i].fileType=='back'){
								this.idBack=this.file[i].id
							}else if(this.file[i].fileType=='front'){
								this.idFront=this.file[i].id
							}
						}
						if(this.accountData.fee=='0'){
							console.log(11111111)
							this.premiumD = '零元'
						}else if(this.accountData.fee==''){
							this.premiumD = ''
						}else{
							this.premiumD=albo.Arabia_To_SimplifiedChinese(this.accountData.fee)
						}
					} else {
						this.showModals(body.data.msg)
					}
				})
			}else if(this.serverId == 'IP'){//保险费追加
				let requ = {
					data: {
						"conservationId":this.conservationId,
						"conservationFeeAddPayId":this.conservationFeeAddPayId,
						"conNo":""
					},
					"modelName":"conFeeAddService",
			   		 "methodName":"getInfomation"
				}
				utils.http.postFast('CusbusinessService', requ, (body) => {
					if(body.data.code == '0') {
						this.accountData=body.data.conservationFeeAdd
//						this.accountData.fee=Number(this.accountData.fee)+Number(this.accountData.ipfymoney)
						this.conservation=body.data.conservation
						this.file=body.data.files
						console.log(this.file)
						for(let i=0;i<this.file.length;i++){
							if(this.file[i].fileType=='back'){
								this.idBack=this.file[i].id
							}else if(this.file[i].fileType=='front'){
								this.idFront=this.file[i].id
							}
						}
						if(this.accountData.fee=='0'){
							console.log(11111111)
							this.premiumD = '零元'
						}else if(this.accountData.fee==''){
							this.premiumD = ''
						}else{
							this.premiumD=albo.Arabia_To_SimplifiedChinese(this.accountData.fee)
						}
					} else {
						this.showModals(body.data.msg)
					}
				})
			}else if(this.serverId == 'AR'){//账户价值提取
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
						console.log(this.accountData.letter)
						if(this.accountData.receivesum=='0'){
							console.log(11111111)
							this.premiumD = '零元'
						}else if(this.accountData.receivesum==''){
							this.premiumD = ''
						}else{
							this.premiumD=albo.Arabia_To_SimplifiedChinese(this.accountData.receivesum)
						}
						this.file=body.data.files
						console.log(this.file)
						if(this.whereFrom=='pList'){//二次支付
							if(this.change!='change'){//没有修改信息
								for(let i=0;i<this.file.length;i++){
									if(this.file[i].fileType=='sign'){
										this.$refs.signImg.src = this.file[i].url
										this.signNum=this.file[i].id
									}
								}
							}else{//修改了信息的
								for(let i=0;i<this.file.length;i++){
									if(this.file[i].fileType=='sign'){
										this.beforeSign = this.file[i].id
									}else if(this.file[i].fileType=='face'){
										this.beforeFace = this.file[i].id
									}else if(this.file[i].fileType=='back'){
										this.beforeBack = this.file[i].id
									}else if(this.file[i].fileType=='front'){
										this.beforeFront = this.file[i].id
									}
								}
							}
						}else{//非二次支付
							for(let i=0;i<this.file.length;i++){
								if(this.file[i].fileType=='back'){
									this.idBack=this.file[i].id
								}else if(this.file[i].fileType=='front'){
									this.idFront=this.file[i].id
								}
							}
						}
					} else {
						this.showModals(body.data.msg)
					}
				})
			}else if(this.serverId == 'LR'){//保单补发
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
						this.accountData=body.data.conservationPolicyresend
						this.conservation=body.data.conservation
						this.file=body.data.files
						console.log(this.file)
						for(let i=0;i<this.file.length;i++){
							if(this.file[i].fileType=='back'){
								this.idBack=this.file[i].id
							}else if(this.file[i].fileType=='front'){
								this.idFront=this.file[i].id
							}
						}
						if(this.accountData.fee=='0'){
							console.log(11111111)
							this.premiumD = '零元'
						}else if(this.accountData.fee==''){
							this.premiumD = ''
						}else{
							this.premiumD=albo.Arabia_To_SimplifiedChinese(this.accountData.fee)
						}
					} else {
						this.showModals(body.data.msg)
					}
				})
			}else if(this.isHesitationTime == 'Y' || this.serverId=='WT'){//犹豫期退保
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
						this.file=body.data.files
						console.log(this.file)
						if(this.whereFrom=='pList'){//二次支付
							if(this.change!='change'){//没有修改信息
								for(let i=0;i<this.file.length;i++){
									if(this.file[i].fileType=='sign'){
										this.$refs.signImg.src = this.file[i].url
										this.signNum=this.file[i].id
									}
								}
							}else{//修改了信息的
								for(let i=0;i<this.file.length;i++){
									if(this.file[i].fileType=='sign'){
										this.beforeSign = this.file[i].id
									}else if(this.file[i].fileType=='face'){
										this.beforeFace = this.file[i].id
									}else if(this.file[i].fileType=='back'){
										this.beforeBack = this.file[i].id
									}else if(this.file[i].fileType=='front'){
										this.beforeFront = this.file[i].id
									}
								}
							}
						}else{//非二次支付
							for(let i=0;i<this.file.length;i++){
								if(this.file[i].fileType=='back'){
									this.idBack=this.file[i].id
								}else if(this.file[i].fileType=='front'){
									this.idFront=this.file[i].id
								}
							}
						}
						if(this.accountData.fee=='0'){
							console.log(11111111)
							this.premiumD = '零元'
						}else if(this.accountData.fee==''){
							this.premiumD = ''
						}else{
							this.premiumD=albo.Arabia_To_SimplifiedChinese(this.accountData.fee)
						}
					} else {
						this.showModals(body.data.msg)
					}
				})
			}else if(this.isHesitationTime == 'N' || this.serverId=='CT'){//退保
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
						this.file=body.data.files
						console.log(this.file)
						if(this.whereFrom=='pList'){//二次支付
							if(this.change!='change'){//没有修改信息
								for(let i=0;i<this.file.length;i++){
									if(this.file[i].fileType=='sign'){
										this.$refs.signImg.src = this.file[i].url
										this.signNum=this.file[i].id
									}
								}
							}else{//修改了信息的
								for(let i=0;i<this.file.length;i++){
									if(this.file[i].fileType=='sign'){
										this.beforeSign = this.file[i].id
									}else if(this.file[i].fileType=='face'){
										this.beforeFace = this.file[i].id
									}else if(this.file[i].fileType=='back'){
										this.beforeBack = this.file[i].id
									}else if(this.file[i].fileType=='front'){
										this.beforeFront = this.file[i].id
									}
								}
							}
						}else{//非二次支付
							for(let i=0;i<this.file.length;i++){
								if(this.file[i].fileType=='back'){
									this.idBack=this.file[i].id
								}else if(this.file[i].fileType=='front'){
									this.idFront=this.file[i].id
								}
							}
						}
						if(this.accountData.fee=='0'){
							console.log(11111111)
							this.premiumD = '零元'
						}else if(this.accountData.fee==''){
							this.premiumD = ''
						}else{
							this.premiumD=albo.Arabia_To_SimplifiedChinese(this.accountData.fee)
						}
					} else {
						this.showModals(body.data.msg)
					}
				})
			}
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			share(){
				alert_n22.confirm('提示', '该申请请在当日24时之前完成提交，否则请重新申请！', '确定','', (flag) => {
					this.yes()
				})
			},
			yes(){
				this.sheetVisible=true
			},
			sure() {
				this.go('/home')
			},
			goToPolicy(){
				this.go('/preservation/preservationPolicyDetail?ContNo='+this.accountData.plicyno)
			},
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			...mapMutations(['SetpolicyData', 'SetpolicyCode', 'SetSignData', 'SetPremiumData']),
			getChild(msg) {
				//				console.log("从签字组件接收到的数据是", msg)
				this.writing = msg;
				this.signAdd()
			},
			onCopy:function(e){
//				this.toast('分享链接已拷贝!');
			},
			onError:function(e){
//				this.toast('分享链接拷贝失败');
			},
			//分享
			shareApp:function(){
				let host = window.globalConfig.rootUrl.split('/')[2]
				let protocol = window.globalConfig.rootUrl.split(':')[0]
				let shareLink
				if(this.serverId=='PC'){
					shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/preservation/preservationPolicyShareReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationPolicyPayId='+this.conservationPolicyPayId+'&connoTpp='+''+'&whereFrom='+''+'&change='+''+'&t='+this.t
				}else if(this.serverId=='IP'){
					shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/preservation/preservationPolicyShareReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationFeeAddPayId='+this.conservationFeeAddPayId+'&connoTpp='+''+'&whereFrom='+''+'&change='+''+'&t='+this.t
				}else if(this.serverId=='AR'){
					shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/preservation/preservationPolicyShareReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationAccountvalueId='+this.conservationAccountvalueId+'&connoTpp='+this.connoTpp+'&whereFrom='+this.whereFrom+'&change='+this.change+'&t='+this.t
				}else if(this.serverId=='LR'){
					shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/preservation/preservationPolicyShareReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationPolicyresendId='+this.conservationPolicyresendId+'&connoTpp='+''+'&whereFrom='+''+'&change='+''+'&t='+this.t
				}else if(this.isHesitationTime == 'Y' || this.serverId=='WT'){
					if(this.whereFrom != 'pList'){
						shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/preservation/preservationPolicyShareReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&isHesitationTime='+this.isHesitationTime+'&connoTpp='+this.connoTpp+'&whereFrom='+this.whereFrom+'&change='+this.change+'&t='+this.t
					}else{
						shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/preservation/preservationPolicyShareReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&isHesitationTime=Y'+'&connoTpp='+this.connoTpp+'&whereFrom='+this.whereFrom+'&change='+this.change+'&t='+this.t
					}
				}else if(this.isHesitationTime == 'N' || this.serverId=='CT'){
					if(this.whereFrom != 'pList'){
						shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/preservation/preservationPolicyShareReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&isHesitationTime='+this.isHesitationTime+'&connoTpp='+this.connoTpp+'&whereFrom='+this.whereFrom+'&change='+this.change+'&t='+this.t
					}else{
						shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/preservation/preservationPolicyShareReissueAffirm?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&isHesitationTime=N'+'&connoTpp='+this.connoTpp+'&whereFrom='+this.whereFrom+'&change='+this.change+'&t='+this.t
					}
				}
				console.log("分享地址 ===>" + shareLink)
				Wechat.share({
					message: {
						title: "保全申请确认书",
						description:"该链接有效期至业务申请日24时止",
						thumb: "www/static/img/common/0.png",
						mediaTagName:'链接',
						media: {
							type: Wechat.Type.WEBPAGE,
							webpageUrl: shareLink
						}
					},
				scene: Wechat.Scene.SESSION    // share to Timeline
				}, function () {
					utils.ui.modal.afterOpen()
					this.$refs.alert.showMOdal('分享成功')
					utils.ui.modal.beforeClose()
				}, function (reason) {
					utils.ui.modal.afterOpen()
					this.$refs.alert.showMOdal(reason)
					utils.ui.modal.beforeClose()
				});
			},
			signAdd() {
				//保单交费
				if(this.serverId == 'PC') {
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.accountData.plicyno,
							"custNo": this.conservation.customerno
						},
						"modelName": "conPolicyPayService",
						"methodName": "policyPayFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
						} else {
							this.showModals(body.data.msg)
						}
					})
				} else if(this.serverId == 'IP') { //保险费追加
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.accountData.plicyno,
							"custNo": this.conservation.customerno
						},
						"modelName": "conFeeAddService",
						"methodName": "feeAddPayFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
						} else {
							this.showModals(body.data.msg)
						}
					})
				} else if(this.serverId == 'AR') { //账户价值提取
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.accountData.plicyno,
							"custNo": this.conservation.customerno
						},
						"modelName": "conAccountValueExtractionService",
						"methodName": "partialExtractionFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
						} else {
							this.showModals(body.data.msg)
						}
					})
				} else if(this.serverId == 'LR') { //保单补发
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.accountData.plicyno,
							"custNo": this.conservation.customerno
						},
						"modelName": "conPolicyReissueService",
						"methodName": "policyRenewalFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
						} else {
							this.showModals(body.data.msg)
						}
					})
				} else if(this.isHesitationTime == 'Y' || this.serverId=='WT') { //犹豫期退保
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.accountData.plicyno,
							"custNo": this.conservation.customerno
						},
						"modelName": "conRetreatsService",
						"methodName": "retreatsPayFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
						} else {
							this.showModals(body.data.msg)
						}
					})
				} else if(this.isHesitationTime == 'N' || this.serverId=='CT') { //退保
					let requ = {
						data: {
							"fileBase64": this.writing,
							"imageType": "jpg",
							"fileType": "sign",
							"contNo": this.accountData.plicyno,
							"custNo": this.conservation.customerno
						},
						"modelName": "conRetreatsService",
						"methodName": "retreatsPayFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '0') {
							this.signNum = body.data.fileId
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
				this.SetpolicyCode(this.policyPremium)
				if(this.serverId == 'PC') {
					this.go('/preservation/preservationPolicyPremium?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationPolicyPayId='+this.conservationPolicyPayId+'&num='+this.num)
				} else if(this.serverId == 'IP') {
					this.go('/preservation/preservationPremiumAddition?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationFeeAddPayId='+this.conservationFeeAddPayId+'&num='+this.num)
				} else if(this.serverId == 'AR') {
					if(this.whereFrom=='pList'){
						this.go('/preservation/preservationAccount?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationAccountvalueId='+this.conservationAccountvalueId+'&num='+this.num+'&whereFrom='+this.whereFrom+'&connoTpp='+this.connoTpp+'&modify='+this.modify)
					}else{
						this.go('/preservation/preservationAccount?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationAccountvalueId='+this.conservationAccountvalueId+'&num='+this.num+'&isXuqi='+this.isXuqi)
					}
				} else if(this.serverId == 'LR') {
					this.go('/preservation/preservationPolicyReissue?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationPolicyresendId='+this.conservationPolicyresendId+'&num='+this.num)
				} else if(this.isHesitationTime == 'Y' || this.serverId=='WT') {
					if(this.whereFrom=='pList'){
						this.go('/preservation/preservationSurrender?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&num='+this.num+'&whereFrom='+this.whereFrom+'&connoTpp='+this.connoTpp+'&modify='+this.modify)
					}else{
						this.go('/preservation/preservationSurrender?serverId='+this.serverId+'&isHesitationTime='+this.isHesitationTime+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&num='+this.num+'&isXuqi='+this.isXuqi)
					}
				}else if(this.isHesitationTime == 'N' || this.serverId=='CT') {
					if(this.whereFrom=='pList'){
						this.go('/preservation/preservationSurrender?serverId='+this.serverId+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&num='+this.num+'&whereFrom='+this.whereFrom+'&connoTpp='+this.connoTpp+'&modify='+this.modify)
					}else{
						this.go('/preservation/preservationSurrender?serverId='+this.serverId+'&isHesitationTime='+this.isHesitationTime+'&conservationId='+this.conservationId+'&conservationRetreatsPayId='+this.conservationRetreatsPayId+'&num='+this.num+'&isXuqi='+this.isXuqi)
					}
				}
			},
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
				let reques = {
					"policy": {
						"agentCode": utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
						"name": this.accountData.name,
						"cardId": this.conservation.holderidno,
						"functionCode":"COMMON",
						"idType":'11',
						"imageByte": image,
						"applyCode": "",
						"policyCode": ""
					}
				}
				utils.http.postFast('FACEIDKSHL', reques, (body) => {
					if(body.policy.resultCode == '0') {
						if(this.serverId == 'PC') {
							let requ = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.accountData.plicyno,
									"custNo": this.conservation.customerno
								},
								"modelName": "conPolicyPayService",
								"methodName": "policyPayFileUpload"
							}
							utils.http.postFast('CusbusinessService', requ, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.openCA();
								} else {
									this.showModals(body.data.msg)
									this.showModals("人脸识别比对不成功，无法线上申请该业务。")
								}
							})
						} else if(this.serverId == 'IP') {
							let requ = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.accountData.plicyno,
									"custNo": this.conservation.customerno
								},
								"modelName": "conFeeAddService",
								"methodName": "feeAddPayFileUpload"
							}
							utils.http.postFast('CusbusinessService', requ, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.openCA();
								} else {
									this.showModals(body.data.msg)
									this.showModals("人脸识别比对不成功，无法线上申请该业务。")
								}
							})
						} else if(this.serverId == 'AR') {
							let requ = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.accountData.plicyno,
									"custNo": this.conservation.customerno
								},
								"modelName": "conAccountValueExtractionService",
								"methodName": "partialExtractionFileUpload"
							}
							utils.http.postFast('CusbusinessService', requ, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.openCA();
								} else {
									this.showModals(body.data.msg)
									this.showModals("人脸识别比对不成功，无法线上申请该业务。")
								}
							})
						} else if(this.serverId == 'LR') {
							let requ = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.accountData.plicyno,
									"custNo": this.conservation.customerno
								},
								"modelName": "conPolicyReissueService",
								"methodName": "policyRenewalFileUpload"
							}
							utils.http.postFast('CusbusinessService', requ, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.openCA();
								} else {
									this.showModals(body.data.msg)
									this.showModals("人脸识别比对不成功，无法线上申请该业务。")
								}
							})
						} else if(this.isHesitationTime == 'Y' || this.serverId=='WT') {
							let requ = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.accountData.plicyno,
									"custNo": this.conservation.customerno
								},
								"modelName": "conRetreatsService",
								"methodName": "retreatsPayFileUpload"
							}
							utils.http.postFast('CusbusinessService', requ, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.openCA();
								} else {
									this.showModals(body.data.msg)
									this.showModals("人脸识别比对不成功，无法线上申请该业务。")
								}
							})
						} else if(this.isHesitationTime == 'N' || this.serverId=='CT') {
							let requ = {
								data: {
									"fileBase64": image,
									"imageType": "jpg",
									"fileType": "face",
									"contNo": this.accountData.plicyno,
									"custNo": this.conservation.customerno
								},
								"modelName": "conRetreatsService",
								"methodName": "retreatsPayFileUpload"
							}
							utils.http.postFast('CusbusinessService', requ, (body) => {
								if(body.data.code == '0') {
									this.faceNum = body.data.fileId
									this.openCA();
								} else {
									this.showModals(body.data.msg)
									this.showModals("人脸识别比对不成功，无法线上申请该业务。")
								}
							})
						}
					} else {
						this.showModals(body.policy.resultMsg)
					}
				})
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
			goToSearch(){
				this.go('/preservation/policySearch?contNo='+this.accountData.plicyno)
			},
			alert(){
				if(this.whereFrom != 'pList'){
					alert_n22.confirm('提示', '保全申请成功。', '返回首页','继续保全申请', (flag) => {
						this.sure()
					},()=>{
						this.goToPolicy()
					})
				}else if(this.whereFrom == 'pList'){
					alert_n22.confirm('提示', '保全申请成功。', '确定','', (flag) => {
						this.goToSearch()
					})
				}
			},
			//保单交费
			accountPremium() {
				let requ = {
					data: {
						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"conservationId":this.conservationId,
						"conservationPolicyPayId":this.conservationPolicyPayId
					},
					"modelName": "conPolicyPayService",
					"methodName": "policyPay"
				}
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						this.conservationId = body.data.conservationId
						this.conservationPolicyPayId = body.data.conservationPolicyPayId
						this.edorNo = body.data.edorNo
						this.conno = body.data.conno
						this.premiumSure()
					} else {
						this.showModals(body.data.msg)
					}
				})
			},
			//保单交费批量回传
			premiumSure() {
				let requu = {
					data: {
						"bussType": "1", //业务类型 1-保全；2-理赔;3-新契约
						"contNo": this.accountData.plicyno, //保单号
						"customerNo": this.conservation.customerno, //客户号
						"subType": this.serverId, //保全类型 

						"bussNo": this.edorNo, //	-对应证件变更-edorNo-批单号
						"conno": this.conno, //保全受理号-对应证件变更-conno-保全受理号
						"conservationId": this.conservationId, //保全id-对应证件变更-conservationId-对应保全表主键
						"conservationIdentityId": this.conservationPolicyPayId, //保单交费id-对应保单交费-conservationIdentityId

						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"cardFrontId": this.idFront, //证件正面id
						"cardBackId": this.idBack, //证件反面id
						"recognitionDate": this.currentDate, // 识别日期  2011-11-11
						"recognitionTime": this.nowDate, // 识别时间  2011-11-11 10:11:11
						"recognitionResult": "Y", // 识别结果Y\N
						"recognitionFIResult": "Y", //   活体照片与身份证照片对比结果识别结果Y\N
						"recognitionFI": "识别成功", //      活体照片与身份证照片对比结果描述
						"recognitionFPResult": "Y", //  活体照片与公安部照片对比结果   Y\N
						"recognitionFP": "识别成功", //   活体照片与公安部照片对比结果描述
						"recognitionIPResult": "Y", //  身份证照片与公安部照片对比结果  Y\N
						"recognitionIP": "识别成功", //  身份证照片与公安部照片对比结果
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
					}
				})
			},
			//追加保费受理接口
			premiumAddition() {
				let requ = {
					data: {
						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"conservationId":this.conservationId,
						"conservationFeeAddPayId":this.conservationFeeAddPayId
					},
					"modelName": "conFeeAddService",
					"methodName": "feeAddPay"
				}
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						this.conservationId = body.data.conservationId
						this.conservationFeeAddPayId = body.data.conservationFeeAddPayId
						this.edorNo = body.data.edorNo
						this.conno = body.data.conno
						this.premiumAdditionSure()
					} else {
						this.showModals(body.data.msg)
					}
				})
			},
			//追加保费批量回传
			premiumAdditionSure() {
				let requu = {
					data: {
						"bussType": "1", //业务类型 1-保全；2-理赔;3-新契约
						"contNo": this.accountData.plicyno, //保单号
						"customerNo": this.conservation.customerno, //客户号
						"subType": this.serverId, //保全类型 

						"bussNo": this.edorNo, //	-对应证件变更-edorNo-批单号
						"conno": this.conno, //保全受理号-对应证件变更-conno-保全受理号
						"conservationId": this.conservationId, //保全id-对应证件变更-conservationId-对应保全表主键
						"conservationIdentityId": this.conservationFeeAddPayId, //保单交费id-对应保单交费-conservationIdentityId

						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"cardFrontId": this.idFront, //证件正面id
						"cardBackId": this.idBack, //证件反面id
						"recognitionDate": this.currentDate, // 识别日期  2011-11-11
						"recognitionTime": this.nowDate, // 识别时间  2011-11-11 10:11:11
						"recognitionResult": "Y", // 识别结果Y\N
						"recognitionFIResult": "Y", //   活体照片与身份证照片对比结果识别结果Y\N
						"recognitionFI": "识别成功", //      活体照片与身份证照片对比结果描述
						"recognitionFPResult": "Y", //  活体照片与公安部照片对比结果   Y\N
						"recognitionFP": "识别成功", //   活体照片与公安部照片对比结果描述
						"recognitionIPResult": "Y", //  身份证照片与公安部照片对比结果  Y\N
						"recognitionIP": "识别成功", //  身份证照片与公安部照片对比结果
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
					}
				})
			},
			//账户价值提取受理接口
			premiumAccount() {
				let requ = {
					data: {
						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"conservationId":this.conservationId,
						"conservationAccountvalueId":this.conservationAccountvalueId
					},
					"modelName": "conAccountValueExtractionService",
					"methodName": "partialExtractionAndAcceptance"
				}
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						this.conservationId = body.data.conservationId
						this.conservationAccountvalueId = body.data.conservationAccountvalueId
						this.edorNo = body.data.edorNo
						this.conno = body.data.conno
						this.premiumAccountSure()
					} else {
						this.showModals(body.data.msg)
					}
				})
			},
			//账户价值批量回传
			premiumAccountSure() {
				let requu = {
					data: {
						"bussType": "1", //业务类型 1-保全；2-理赔;3-新契约
						"contNo": this.accountData.plicyno, //保单号
						"customerNo": this.conservation.customerno, //客户号
						"subType": this.serverId, //保全类型 

						"bussNo": this.edorNo, //	-对应证件变更-edorNo-批单号
						"conno": this.conno, //保全受理号-对应证件变更-conno-保全受理号
						"conservationId": this.conservationId, //保全id-对应证件变更-conservationId-对应保全表主键
						"conservationIdentityId": this.conservationAccountvalueId, //保单交费id-对应保单交费-conservationIdentityId

						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"cardFrontId": this.idFront, //证件正面id
						"cardBackId": this.idBack, //证件反面id
						"recognitionDate": this.currentDate, // 识别日期  2011-11-11
						"recognitionTime": this.nowDate, // 识别时间  2011-11-11 10:11:11
						"recognitionResult": "Y", // 识别结果Y\N
						"recognitionFIResult": "Y", //   活体照片与身份证照片对比结果识别结果Y\N
						"recognitionFI": "识别成功", //      活体照片与身份证照片对比结果描述
						"recognitionFPResult": "Y", //  活体照片与公安部照片对比结果   Y\N
						"recognitionFP": "识别成功", //   活体照片与公安部照片对比结果描述
						"recognitionIPResult": "Y", //  身份证照片与公安部照片对比结果  Y\N
						"recognitionIP": "识别成功", //  身份证照片与公安部照片对比结果
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
					}
				})
			},
			//保单补发受理接口
			premiumReissue() {
				let requ = {
					data: {
						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"conservationId":this.conservationId,
						"conservationPolicyresendId":this.conservationPolicyresendId
					},
					"modelName": "conPolicyReissueService",
					"methodName": "policyRenewal"
				}
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						this.conservationId = body.data.conservationId
						this.conservationPolicyresendId = body.data.conservationPolicyresendId
						this.edorNo = body.data.edorNo
						this.conno = body.data.conno
						this.premiumReissueSure()
					} else {
						this.showModals(body.data.msg)
					}
				})
			},
			//保单补发批量回传
			premiumReissueSure() {
				let requu = {
					data: {
						"bussType": "1", //业务类型 1-保全；2-理赔;3-新契约
						"contNo": this.accountData.plicyno, //保单号
						"customerNo": this.conservation.customerno, //客户号
						"subType": this.serverId, //保全类型 

						"bussNo": this.edorNo, //	-对应证件变更-edorNo-批单号
						"conno": this.conno, //保全受理号-对应证件变更-conno-保全受理号
						"conservationId": this.conservationId, //保全id-对应证件变更-conservationId-对应保全表主键
						"conservationIdentityId": this.conservationPolicyresendId, //保单交费id-对应保单交费-conservationIdentityId

						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"cardFrontId": this.idFront, //证件正面id
						"cardBackId": this.idBack, //证件反面id
						"recognitionDate": this.currentDate, // 识别日期  2011-11-11
						"recognitionTime": this.nowDate, // 识别时间  2011-11-11 10:11:11
						"recognitionResult": "Y", // 识别结果Y\N
						"recognitionFIResult": "Y", //   活体照片与身份证照片对比结果识别结果Y\N
						"recognitionFI": "识别成功", //      活体照片与身份证照片对比结果描述
						"recognitionFPResult": "Y", //  活体照片与公安部照片对比结果   Y\N
						"recognitionFP": "识别成功", //   活体照片与公安部照片对比结果描述
						"recognitionIPResult": "Y", //  身份证照片与公安部照片对比结果  Y\N
						"recognitionIP": "识别成功", //  身份证照片与公安部照片对比结果
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
					}
				})
			},
			//犹豫期退保受理接口
			premiumSurrenderWT() {
				let requ = {
					data: {
						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"conservationId":this.conservationId,
						"conservationretReatsPayId":this.conservationRetreatsPayId
					},
					"modelName": "conRetreatsService",
					"methodName": "retreatsPay"
				}
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						this.conservationId = body.data.conservationId
						this.conservationretReatsPayId=body.data.conservationretReatsPayId
						this.edorNo = body.data.edorNo
						this.conno = body.data.conno
						this.premiumSurrenderSureWT()
					} else {
						this.showModals(body.data.msg)
					}
				})
			},
			//犹豫期退保批量回传
			premiumSurrenderSureWT() {
				let requu = {
					data: {
						"bussType": "1", //业务类型 1-保全；2-理赔;3-新契约
						"contNo": this.accountData.plicyno, //保单号
						"customerNo": this.conservation.customerno, //客户号
						"subType": 'WT', //保全类型 

						"bussNo": this.edorNo, //	-对应证件变更-edorNo-批单号
						"conno": this.conno, //保全受理号-对应证件变更-conno-保全受理号
						"conservationId": this.conservationId, //保全id-对应证件变更-conservationId-对应保全表主键
						"conservationIdentityId": this.conservationretReatsPayId, //保单交费id-对应保单交费-conservationIdentityId

						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"cardFrontId": this.idFront, //证件正面id
						"cardBackId": this.idBack, //证件反面id
						"recognitionDate": this.currentDate, // 识别日期  2011-11-11
						"recognitionTime": this.nowDate, // 识别时间  2011-11-11 10:11:11
						"recognitionResult": "Y", // 识别结果Y\N
						"recognitionFIResult": "Y", //   活体照片与身份证照片对比结果识别结果Y\N
						"recognitionFI": "识别成功", //      活体照片与身份证照片对比结果描述
						"recognitionFPResult": "Y", //  活体照片与公安部照片对比结果   Y\N
						"recognitionFP": "识别成功", //   活体照片与公安部照片对比结果描述
						"recognitionIPResult": "Y", //  身份证照片与公安部照片对比结果  Y\N
						"recognitionIP": "识别成功", //  身份证照片与公安部照片对比结果
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
					}
				})
			},
			//退保受理接口
			premiumSurrenderCT() {
				let requ = {
					data: {
						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"conservationId":this.conservationId,
						"conservationretReatsPayId":this.conservationRetreatsPayId,
					},
					"modelName": "conRetreatsService",
					"methodName": "retreatsPay"
				}
				console.log(requ)
				utils.http.postFast('CusbusinessService', requ, (body, header) => {
					if(body.data.code == '0') {
						this.conservationId = body.data.conservationId
						this.conservationretReatsPayId=body.data.conservationretReatsPayId
						this.edorNo = body.data.edorNo
						this.conno = body.data.conno
						this.premiumSurrenderSureCT()
					} else {
						this.showModals(body.data.msg)
					}
				})
			},
			//退保批量回传
			premiumSurrenderSureCT() {
				let requu = {
					data: {
						"bussType": "1", //业务类型 1-保全；2-理赔;3-新契约
						"contNo": this.accountData.plicyno, //保单号
						"customerNo": this.conservation.customerno, //客户号
						"subType": 'CT', //保全类型 

						"bussNo": this.edorNo, //	-对应证件变更-edorNo-批单号
						"conno": this.conno, //保全受理号-对应证件变更-conno-保全受理号
						"conservationId": this.conservationId, //保全id-对应证件变更-conservationId-对应保全表主键
						"conservationIdentityId": this.conservationretReatsPayId, //保单交费id-对应保单交费-conservationIdentityId

						"signFileId": this.signNum, //签字图片id
						"faceFileId": this.faceNum, //人脸图片id
						"cardFrontId": this.idFront, //证件正面id
						"cardBackId": this.idBack, //证件反面id
						"recognitionDate": this.currentDate, // 识别日期  2011-11-11
						"recognitionTime": this.nowDate, // 识别时间  2011-11-11 10:11:11
						"recognitionResult": "Y", // 识别结果Y\N
						"recognitionFIResult": "Y", //   活体照片与身份证照片对比结果识别结果Y\N
						"recognitionFI": "识别成功", //      活体照片与身份证照片对比结果描述
						"recognitionFPResult": "Y", //  活体照片与公安部照片对比结果   Y\N
						"recognitionFP": "识别成功", //   活体照片与公安部照片对比结果描述
						"recognitionIPResult": "Y", //  身份证照片与公安部照片对比结果  Y\N
						"recognitionIP": "识别成功", //  身份证照片与公安部照片对比结果
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
					}
				})
			},
			premium() {
				if(this.serverId == 'PC') {
					this.accountPremium()
				} else if(this.serverId == 'IP') {
					this.premiumAddition()
				} else if(this.serverId == 'AR') {
					this.premiumAccount()
				} else if(this.serverId == 'LR') {
					this.premiumReissue()
				} else if(this.isHesitationTime == 'Y') {
					this.premiumSurrenderWT()
				}else if(this.isHesitationTime == 'N'){
					this.premiumSurrenderCT()
				}
			},
			pay(){
				if(this.change=='change'){//有修改
					let requu = {
						data: {
						   "contNo": this.accountData.plicyno, 
			               "edorNo":this.conservation.edorno, 
			               "getBankCode": this.accountData.accountbank, 
			               "getBankAccNo": this.accountData.banknumber, 
			               "getBankAccName": this.accountData.getname, 
			               "recognitionFlag": "Y", 
			               "customerNo": this.conservation.customerno, 
			               "recognitionDate": this.currentDate, 
			               "recognitionTime": this.nowDate, 
			               "recognitionResult": "Y", 
			               "recognitionFIResult": "Y", 
			               "recognitionFI": "识别成功", 
			               "recognitionFPResult": "Y", 
			               "recognitionFP": "识别成功", 
			               "recognitionIPResult": "Y", 
			               "recognitionIP": "识别成功", 
			               "faceFileId": this.faceNum, 
			               "signFileId": this.signNum, 
			               "cardBackId": this.beforeBack,
			               "conNo": this.connoTpp,
			               "conservationId": this.conservationId,
			               "faceFileIdBf": this.beforeFace,
			               "signFileIdBf": this.beforeSign,
			               "cardBackIdBf": "",
			               "cardFrontIdBf": "",
			               "cardFrontId": this.beforeFront
			              },
						"modelName": "conRetreatsService",
				     	"methodName": "retreatsPayAgain"
					}
					utils.http.postFast('CusbusinessService', requu, (body, header) => {
						if(body.data.code == '0') {
//							this.toggle.success = true
							this.alert()
						} else {
							this.showModals(body.data.msg)
						}
					})
				}else{//没有修改
					let requu = {
						data: {
						   "contNo": this.accountData.plicyno, 
			               "edorNo":this.conservation.edorno, 
			               "getBankCode": this.accountData.accountbank, 
			               "getBankAccNo": this.accountData.banknumber, 
			               "getBankAccName": this.accountData.getname, 
			               "recognitionFlag": "N", 
			               "customerNo": this.conservation.customerno,
			               "recognitionDate": "", 
			               "recognitionTime": "", 
			               "recognitionResult": "", 
			               "recognitionFIResult": "", 
			               "recognitionFI": "", 
			               "recognitionFPResult": "", 
			               "recognitionFP": "", 
			               "recognitionIPResult": "", 
			               "recognitionIP": "", 
			               "faceFileId": "", 
			               "signFileId": "", 
			               "cardBackId": "",
			               "conNo": this.connoTpp,
			               "conservationId": "",
			               "faceFileIdBf": this.beforeFace,
			               "signFileIdBf": this.beforeSign,
			               "cardBackIdBf": "",
			               "cardFrontIdBf": "",
			               "cardFrontId": ""
			              },
						"modelName": "conRetreatsService",
				     	"methodName": "retreatsPayAgain"
					}
					utils.http.postFast('CusbusinessService', requu, (body, header) => {
						if(body.data.code == '0') {
//							this.toggle.success = true
							this.alert()
						} else {
							this.showModals(body.data.msg)
						}
					})
				}
			},
			toSubmit() {
//				if(this.signNum == '') {
//					this.showModals('请确认签字信息是否完整')
//				} else {
					if(this.whereFrom != 'pList'){
						this.premium()
					}else{
						//二次支付
						this.pay()
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
	
	.details div,
	span,
	p {
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
		width: 75px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #FEB101;
		border-radius: 5px;
		color: #ffffff;
		margin-bottom: 15px;
	}
	.add-btns{
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