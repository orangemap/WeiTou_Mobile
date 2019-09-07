<template>
	<div>
		<Headerbtns title="险种信息确认">
			<div slot="left" @click="back">
				<i class="fa fa-angle-left"></i>
			</div>
			<div slot="right" @click="sheetVisible = !sheetVisible">
				<i class="fa fa-ellipsis-v"></i>
			</div>
		</Headerbtns>
		<div class="main-contents process">
			<NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
			<div class="main-contents-right">
				<ul v-for="(item,index) in allProductsList">
					<li v-show="item.extra.isMaster == '1'||policy.custInfo.insurants.otherInsurant.insurant.length == 0" style="justify-content: space-between;">
						<span class="prodName-text">{{item.extra.prodName}}</span>
						<img height="14" src="static/img/policy/icon_bi.png" @click="pushBack()"  style="width:13px!important;"/>
					</li>
					<li v-show="item.extra.isMaster != '1' && policy.custInfo.insurants.otherInsurant.insurant.length>0" style="justify-content: space-between;">
						<div class="title">
							<p style="font-size:14px;">{{item.extra.prodName}}</p>
							<p style="font-size:12px;color:#FEB101;">第{{item.insurantNo|getInsNo}}被保人 {{item.insurantName}}</p>
						</div>
						<img style="width: 20px;" src="static/img/policy/icon_bi.png" @click="pushBack()" />
					</li>
					<li>
						<p>交费方式</p>
						<p>{{item.extra.payIntvName}}</p>
					</li>
					<li>
						<p>保险期间</p>
						<p>{{item.extra.insureYearName}}</p>
					</li>
					<li>
						<p>交费期间</p>
						<p>{{item.extra.payYearName|getExempt(allProductsList,item.extra.payYearName)}}</p>
					</li>
					<li>
						<p>基本保险金额</p>
						<p>{{item.extra.amnt|getAmnt}}</p>
					</li>
					<li>
						<p>保费</p>
						<p>{{item.extra.prem}}</p>
					</li>
				</ul>
			</div>
		</div>
    	<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
		<FooterBars :premium="totalPremium">
			<div slot="right" @click="stepSave">下一步</div>
		</FooterBars>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>
<script>
	import { Actionsheet } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import FooterBars from '../policy/common/FooterBars.vue'
	import NavigationBox from '../policy/common/NavigationBox.vue'
	import '../policy/css/base.css'
	import '../policy/css/process.css'

	export default {
		name: 'productsPage',
		components: {
			Headerbtns,
			FooterBars,
			NavigationBox
		},
		data() {
			return {
				showNavList: false,
				navigationList: [],
				policy: {},
				allProductsList: [],
				totalPremium: '',
				reasonList: '',
				sheetVisible: false,
				actions: [{
						name: "刷新页面",
						method: this.winReload
					},
					{
						name: "返回首页",
						method: this.backHome
					}
				]
			}
		},
		beforeMount() {
			this.getPolicyMsg()
		},
		watch: {
			showNavList(val, oldval) {
				if(val == true) {
					let sum = 0
					let interval = setInterval(() => {
						sum += 1
						$(".main-contents-right").css({
							"left": sum + '%'
						})
						if(sum == 50) {
							clearInterval(interval)
						}
					}, 5)
				} else {
					let sum = 50
					let interval = setInterval(() => {
						sum -= 1
						$(".main-contents-right").css({
							"left": sum + '%'
						})
						if(sum == 0) {
							clearInterval(interval)
						}
					}, 5)
				}
			},
		},
		filters: {
			getInsNo(code) {
				if(code == '-1') {
					return '一'
				} else if(code == '0') {
					return '二'
				} else if(code == '1') {
					return '三'
				} else if(code == '2') {
					return '四'
				} else if(code == '3') {
					return '五'
				} else if(code == '4') {
					return '六'
				}
			},
			getExempt(code, policy) {
				if(code == "豁免期间") {
					for(let item of policy) {
						if(item.extra.isMaster == '1') {
							if(item.extra.payYear.indexOf("term_") != -1) {
								return(item.extra.payYear.replace("term_", "") - 1) + "年期"
							}
						}
					}
				} else {
					return code
				}
			},
			getAmnt(code) {
				if(code == "0" || code == "0.0" || code == "0.00") {
					return ''
				}
				return code
			}
		},
		methods: {
			selectedNav(item) {
				if(item.step < 5) {
					let requ = {
						policy: this.policy
					}
					utils.http.postFast("MODISTRIESAVE", requ, body => {
						if(body.policy.resultCode == '0') {
							if(item.step == 1 || item.step == 3) {
								this.$router.push({
									name: item.name,
									params: {
										planId: this.$route.params.planId,
										step: '1'
									}
								})
							} else if(item.step == 4) {
								this.$router.push({
									name: item.name,
									params: {
										planId: this.$route.params.planId,
										insNo: item.seqNumber,
										step: '1'
									}
								})
							} else {
								this.$router.push({
									name: item.name,
									params: {
										planId: this.$route.params.planId
									}
								})
							}
						} else {
							alert_n22.alert("提示", body.policy.resultMessage, "确定")
						}
					})
				} else {
					if(this.$route.meta.step == 5 && item.step >= 5) {
						alert_n22.alert("提示", "请您点击右下角下一步按钮确认信息！", "确定")
					}
				}
			},
			getPolicyMsg() {
				let requ = {
					"policy": {
						"substepNo": "5",
						"orderCode": this.$route.params.planId,
						"stepNo":'0,1,2,8',
						"nothave":'1,3'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requ, (body) => {
					this.policy = JSON.parse(JSON.stringify(body.policy))
					this.policy.substepNo = '5'
					this.navigationList = this.policy.navigationList
					this.navigationList.forEach(item => {
						item.path = ''
						if(item.step < '5') {
							item.path = 'cheng'
						}
						if(item.step == '5') {
							item.path = 'lv'
						}
					})
					for(let i = 0; i < this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.length; i++) {
						if(this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary[i].belongWith == '') {
							this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.splice(i--, 1)
						}
					}
					for(let i = 0; i < this.policy.custInfo.insurants.otherInsurant.insurant.length; i++) {
						if(this.policy.custInfo.insurants.otherInsurant.insurant[i].name == '') {
							this.policy.custInfo.insurants.otherInsurant.insurant.splice(i--, 1)
						} else {
							for(let j = 0; j < this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.length; j++) {
								if(this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary[j].belongWith == '') {
									this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.splice(j--, 1)
								}
							}
						}
					}
					this.policy.custInfo.insurants.otherInsurant.insurant.sort(function(a, b) {
						return parseInt(a.seqNumber) - parseInt(b.seqNumber)
					})
					console.log('policy===>>>', this.policy)
					let allProductsList = []
					this.policy.custInfo.insurants.firstInsurant.products.product.sort(function(a, b) {
						return parseInt(a.seqNumber) - parseInt(b.seqNumber)
					})
					for(let firstItem of this.policy.custInfo.insurants.firstInsurant.products.product) {
						allProductsList.push({
							insurantNo: '-1',
							insurantName: this.policy.custInfo.insurants.firstInsurant.name,
							extra: firstItem
						})
					}
					if(this.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
						this.policy.custInfo.insurants.otherInsurant.insurant.forEach(otherItem => {
							if(otherItem.products.product.length > 0) {
								otherItem.products.product.sort(function(a, b) {
									return parseInt(a.seqNumber) - parseInt(b.seqNumber)
								})
								for(let item of otherItem.products.product) {
									allProductsList.push({
										insurantNo: otherItem.seqNumber,
										insurantName: otherItem.name,
										extra: item
									})
								}
							}
						})
					}
					this.allProductsList = allProductsList
					console.log('allProductsList===>>>', this.allProductsList)
					let newRequ = JSON.parse(JSON.stringify({
						proposalPlan: this.policy.proposalPlan
					}))
					newRequ.proposalPlan.holder.birthday += 'T00:00:00.000Z'
					newRequ.proposalPlan.insurantProductList[0].insurant.birthday += 'T00:00:00.000Z'
					if(newRequ.proposalPlan.insurantProductList[0].otherInsurantList.length > 0) {
						for(let item of newRequ.proposalPlan.insurantProductList[0].otherInsurantList) {
							item.insurant.birthday += 'T00:00:00.000Z'
						}
					}
					utils.http.postFast('PRODUCTPREMIUM', newRequ, (body) => {
						console.log('保费试算===>>>', body.trialPremiumMobile.isPass, body)
						if(body.trialPremiumMobile.isPass == 'true') {
							this.totalPremium = body.trialPremiumMobile.totalPremium
							this.policy.payInfo.sumAmntL = body.trialPremiumMobile.totalAmount
							this.policy.payInfo.sumPremL = body.trialPremiumMobile.totalPremium
							let firstInsProduct = this.policy.custInfo.insurants.firstInsurant.products.product
							for(let item of firstInsProduct) {
								if(item.isMaster == '1') {
									item.amnt = body.trialPremiumMobile.insurantProductList[0].plan.productList[0].amount
									item.prem = body.trialPremiumMobile.insurantProductList[0].plan.productList[0].premiumDes
									item.zeRenPremStr = body.trialPremiumMobile.insurantProductList[0].plan.productList[0].zeRenPremStr
								} else {
									for(let extra of body.trialPremiumMobile.insurantProductList[0].plan.productList[0].extraList) {
										if(item.prodCode == extra.productCode) {
											item.amnt = extra.amount
											item.prem = extra.premiumDes
											item.zeRenPremStr = extra.zeRenPremStr
										}
									}
								}
							}
							if(body.trialPremiumMobile.otherInsurantProductList.length > 0) {
								for(let trial of body.trialPremiumMobile.otherInsurantProductList) {
									for(let ins of this.policy.custInfo.insurants.otherInsurant.insurant) {
										if(trial.seqNumber == ins.seqNumber) {
											for(let trialPro of trial.productList) {
												for(let insPro of ins.products.product) {
													if(trialPro.productCode == insPro.prodCode) {
														insPro.amnt = trialPro.amount
														insPro.prem = trialPro.premiumDes
														insPro.zeRenPremStr = trialPro.zeRenPremStr
													}
												}
											}
										}
									}
								}
							}
						} else {
							let message = ''
							if(body.trialPremiumMobile.insurantProductList[0].checkResult.isPass == 'false') {
								for(let item of body.trialPremiumMobile.insurantProductList[0].checkResult.reasonList) {
									message += this.policy.custInfo.insurants.firstInsurant.name + '：' + item.info
								}
							}
							if(body.trialPremiumMobile.otherInsurantProductList.length > 0) {
								for(let i in body.trialPremiumMobile.otherInsurantProductList) {
									if(body.trialPremiumMobile.otherInsurantProductList[i].checkResult.isPass == 'false') {
										for(let j in body.trialPremiumMobile.otherInsurantProductList[i].checkResult.reasonList) {
											message += '<br/>' + this.policy.custInfo.insurants.otherInsurant.insurant[i].name + '：' + body.trialPremiumMobile.otherInsurantProductList[i].checkResult.reasonList[j].info
										}
									}
								}
							}
							this.totalPremium = ''
							this.reasonList = message
							if(this.reasonList != '') {
								console.log('保费试算问题===>', this.reasonList)
								alert_n22.alert("提示", this.reasonList, "确定")
							}
						}
					})
				})
			},
			stepSave() {
				if(this.reasonList != '') {
					alert_n22.alert("提示", "请返回修改信息后继续", "确定")
				} else {
					let requ = {
						policy: this.policy
					}
					utils.http.postFast("MODISTRIESAVE", requ, body => {
						if(body.policy.resultCode == '0') {
							this.$router.push({
								name: 'inform_page',
								params: {
									planId: this.$route.params.planId
								}
							})
						} else {
							alert_n22.alert("提示", body.policy.resultMessage, "确定")
						}
					})
				}
			},
			winReload: function(cond) {
				window.location.reload();
			},
			pushBack() {
				this.$router.push({
					name: 'product_details_page',
					params: {
						planId: this.$route.params.planId,
						step: '3'
					}
				})
			},
			backHome() {
				this.$router.push("/home")
			},
			back() {
				let i
				this.navigationList.forEach((item, index) => {
					if(item.step == 5) {
						i = index
					}
				})
				this.$router.push({
					name: this.navigationList[i - 1].name,
					params: {
						planId: this.$route.params.planId,
						insNo: this.navigationList[i - 1].seqNumber,
						step: '3'
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.main-contents {
		bottom: 50px;
		padding-bottom: 20px;
		ul {
			padding-bottom: 8px;
		}
		.title {
			flex-direction: column;
			line-height: 2;
			p {
				width: 100%;
			}
		}
	}
	.prodName-text{
		font-size:16px;
		font-weight:bold;
	}
</style>
