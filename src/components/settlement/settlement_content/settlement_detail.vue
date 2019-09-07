<template>
	<div>
		<Headerbtns title="详情" class='sel-user-head'>
			<div slot="left" class="back" @click='backUrl'><i class="fa fa-angle-left" style='font-size:1.8rem;color:#FDB92C'></i></div>
		</Headerbtns>
		<div class='set-new-detail'>
			<div>
				<p class='title'>1.出险人信息</p>
				<p class='insured-title'>
					<span>{{compensate.user.name}}</span>
					<span>{{compensate.user.sex=='0'?'男':'女'}}</span>
					<span>{{compensate.user.birthday}}</span>
				</p>
				<div class='insured-btm'>
					<p>证件类型：{{compensate.user.brakType | certifica}}</p>
					<p>证件号码：{{compensate.user.brakCode}}</p>
					<!-- <p>证件有效期：{{compensate.user.brakDate}}</p> -->
					<!-- <p>手机号：{{insured.insuredmobile}}</p> -->
				</div>
			</div>
			<div style='margin-bottom: 3rem'>
				<p class='title'>2.理赔详细信息</p>
				<div class='insured-btm'>
					<p>实际给付金额:{{compensate.policy.newMoney}}元:赔付金额:{{compensate.policy.money}}元、结算金额:{{compensate.policy.sendMoney}}元</p>
					<div style='border-bottom:1px dashed #ddd;padding:10px;' v-for='item in compensate.policy.policyList.cont'>
						<p>保单号：{{item.contNo}}</p>
						<div v-for='tpl in item.risk'>
							<div v-for='ts in tpl.getDutyInfo'>
								<p>赔付责任名称：{{ts.getDutyCodeName}}</p>
								<p>赔付金额：{{ts.realPay}}元</p>
							</div>
						</div>
					</div>
				</div>
				<p class='title'>3.支付信息</p>
				<div class='insured-btm' style='padding-bottom:2.2rem'>
					<div v-for='item in compensate.policy.payList'>
						<p>支付方式：银行转账</p> <!-- item.casePayMode == '3' -->
						<p>支付时间：{{item.actuGetDate}}</p>
						<p>领款人姓名：{{item.payeeCustomerName}}</p>
						<p>领款金额：{{item.actuGetMoney}}元</p>
					</div>
				</div>
			</div>
			<div class='detail-btn-fiexd'>
				<button @click='down'>理赔通知书下载</button>
			</div>
			<p><Alert ref="showalert"></Alert></p>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import Alert from '@/components/policy/common/alert'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement/index.js'
	export default {
		components: {Headerbtns,Alert},
		data() {
			return {
				// insured:{} //出险人信息
				isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
			}
		},
		computed: {
			...mapState(['compensate'])
		},store,
		mounted() {
			$('.set-new-detail').css('height',this.media.container(this.screenHeight,0)+'px').css('margin-top',$('.sel-user-head').outerHeight(true)+'px')
			console.log(this.compensate)
			console.log(this.$route.params.id)
		},
		methods: {
			backUrl() {
				this.$router.push('/pReportRecord')
			},
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			down(){
				console.log('1')
				let host = window.globalConfig.rootUrl.split('/')[2]
				let protocol = window.globalConfig.rootUrl.split(':')[0]
				let code = this.$route.params.id
				let LoadUrl = protocol+'://'+host+'/com.ifp.ipartner/edorPdf?EdorNo='+code+'&type=claimEdorPdf'
				let title
				utils.httpEdorPdf.get(code,'claimEdorPdf').then(response => {
					console.log(response)
					if(response.success){
						console.log(response.message)
						title = '查询到理赔通知书<br/>是否下载?'
						alert_n22.confirm('温馨提示',title,'下载','取消',(flag)=>{
							if(this.isiOS){
								var urlObj = {
									"url": LoadUrl
								}
								var urlStr = JSON.stringify(urlObj)
								var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
							//IOS升级
							MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
								alert(JSON.stringify(callbackSucc))
							}, function(callbackFail) {
								alert(callbackFail)
							});
				}else {
					console.log(LoadUrl)
					window.open(LoadUrl, '_system')
				}
			})
					}else{
						this.showModals(response.message);
						console.log(response.message)
					}
				})
			}
		}
	}
</script>

<style>
.set-new-detail p{
	font-size: .9rem;
}
.set-new-detail .title{
	padding:0 1rem;
	border-bottom:1px solid #ddd;
	height: 2rem;
	line-height: 2rem;
	font-weight: bold;
	color: blue;
	font-size: 1rem;
}
.set-new-detail .insured-title {
	width: 95%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height:2rem;
	border-bottom:1px dashed #ddd;
}

.insured-btm p {
	margin-left:10px;
	margin-right: 10px;
	margin-top:10px;
}
.detail-btn-fiexd{
	position: fixed;
	bottom:0;
	width: 100%;
	height:2.2rem;
	background: #fff;
}
.detail-btn-fiexd>button{
	background: #feb101;
	width: 100%;
	outline: none;
	border: none;
	color:#fff;
	height: 2.2rem;
}
</style>