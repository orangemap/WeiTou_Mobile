<!--业务员报告书页面-->
<template>
	<div>
		<Headerbtns title="业务人员报告书">
			<div slot="left" @click="pre">
				<i class="fa fa-angle-left"></i>
			</div>
			<div slot="right" @click="sheetVisible = !sheetVisible">
				<i class="fa fa-ellipsis-v"></i>
			</div>
		</Headerbtns>
		<div class="main-contents">
			<NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
			<div class="main-contents-right">
				<div class="part">
					<p class="title"><img style="width: 5px;margin-right: 2%;" src="../../../static/img/policy/icon_shu.png" />第一部分</p>
					<div style="padding:0 0 0 4%;">
						<p>1、本投保是经由下列途径完成：</p>
						<SwitchMultipleBox :optionList="dict.approachList" v-model="policy.report.approach" :desc="policy.report.approachDes" @desc="getApproachDesc"></SwitchMultipleBox>
					</div>
					<div style="padding:0 0 0 4%;">
						<p>2.投保人的投保目的（如未选择，默认为“保障”）：</p>
						<SwitchMultipleBox :optionList="dict.purposeList" v-model="policy.report.purpose" :desc="policy.report.purposeDes" @desc="getPurposeDesc"></SwitchMultipleBox>
					</div>
					<div>
						<p>3.投保人的经济状况：</p>
						<div style="text-indent: 2em;line-height: 1.5;margin-bottom: 2%;">
							年收入（人民币）：
							<input type="text" v-model="policy.report.annualIncome" v-filterAmountOfBillionMoney maxlength="9" />万元, 来源：
							<input style="width: 160px;" type="text" v-model="policy.report.sourceOfIncome" maxlength="10" />， 总资产约
							<input type="text" v-model="policy.report.totalAssets" v-filterAmountOfBillionMoney maxlength="9" />万元
						</div>
					</div>
				</div>
				<div class="part">
					<p class="title"><img style="width: 5px;margin-right: 2%;" src="../../../static/img/policy/icon_shu.png" />第二部分</p>
					<div style="padding: 2% 2% 0 4%;">
						<p style="text-indent: 28px;line-height: 2;">投保人的投保行为是否受“除投保人、被保险人、受益人以外的人员或机构（即第三方）”的要求或是由其提供资金而发生的：</p>
						<SwitchSingleBox :optionList="dict.thirdPtIdentityList" v-model="policy.report.thirdPtIdentity"></SwitchSingleBox>
					</div>
					<div class="salesflex" v-show="policy.report.thirdPtIdentity == '1'">
						<p>若“是”，请填写以下有关第三方的信息：</p>
						<div>
							<p>姓名/机构名称：</p>
							<input type="text" v-model="policy.report.thirdPtName" placeholder="请输入姓名或机构名称" maxlength="15" />
						</div>
						<div>
							<p>联系方式：</p>
							<input type="text" v-model="policy.report.thirdPtContact" v-supportNumber placeholder="请输入联系方式" maxlength="11" />
						</div>
						<div>
							<p>与投保人关系：</p>
							<label>
							<picker v-model="temp.relToApp" :values="temp.relToApp" :items="dict.relationList.relation.item" code="code" text="text" @change="changeRelation()"></picker>
							<i class="fa fa-angle-right" style="color:#ccc;"></i>
						</label>
						</div>
						<div v-show="temp.showOtherRelToApp">
							<p>其他关系：</p>
							<input type="text" v-model="temp.otherRelToApp" readonly/>
						</div>
						<div>
							<p>地址：</p>
							<input type="text" v-model="policy.report.thirdPtAddr" placeholder="请输入详细地址" maxlength="25" />
						</div>
					</div>
					<div class="salesflex" v-show="policy.report.thirdPtIdentity == '2'">
						<p>若“无法识别，但有理由怀疑存在第三方”，请注明怀疑原因：</p>
						<div>
							<p>怀疑原因：</p>
							<input type="text" v-model="policy.report.thirdPtRemark" placeholder="请输入怀疑理由" maxlength="25" />
						</div>
					</div>
				</div>
			</div>
		</div>
    	<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
		<FooterBar>
			<div slot="center" @click="next">下一步</div>
		</FooterBar>
		<prompt ref="btns" @detonate="relationEdit"></prompt>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		<Modal ref="btn" :title="'温馨提示'" :content="hintContent" @detonate="detonate" @cancel="cancel"></Modal>
	</div>
</template>

<script>
	import { Actionsheet } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import FooterBar from '../policy/common/FooterBar.vue'
	import SwitchSingleBox from '../policy/common/SwitchSingleBox.vue'
	import SwitchMultipleBox from '../policy/common/SwitchMultipleBox.vue'
	import NavigationBox from '../policy/common/NavigationBox.vue'
	import picker from '../common/Picker.vue'
	import prompt from '../policy/common/prompt.vue'
	import Modal from '../policy/common/Modal.vue'
	import relationList from '../../../static/dict/relation_salesman_sunlife.json'
	import '../policy/css/base.css'
	export default {
		name: 'salesman_report_page',
		components: {
			Actionsheet,
			Headerbtns,
			FooterBar,
			SwitchSingleBox,
			SwitchMultipleBox,
			NavigationBox,
			picker,
			prompt,
			Modal
		},
		data() {
			return {
				showNavList: false,
				navigationList: [],
				policy: {
					agentCode: utils.cache.get('personsal').agentCode,
					channel: utils.cache.get('personsal').channel,
					orderCode: this.$route.params.planId,
					substepNo: '7',
					report: {
						annualIncome: "", //年收入
						approach: "", //途径
						approachDes: "", //其他途径
						purpose: "", //目的
						purposeDes: "", //其他目的
						sourceOfIncome: "", //来源
						thirdPtAddr: "", //联系地址
						thirdPtContact: "", //联系方式
						thirdPtIdentity: "", //第二部分是,否,无法识别
						thirdPtName: "", //机构名称
						thirdPtRelToApp: "", //其他关系
						thirdPtRemark: "", //怀疑原因
						totalAssets: "", //总资产
					}
				},
				sheetVisible: false,
				actions: [{
						name: "刷新页面",
						method: this.winReload
					},
					{              
						name: "返回首页",
						method: this.backHome            
					}
				],
				dict: {
					relationList: relationList,
					approachList: [{
							code: '0',
							text: '家属',
							checked: false,
						},
						{
							code: '1',
							text: '亲戚',
							checked: false,
						},
						{
							code: '2',
							text: '朋友介绍',
							checked: false,
						},
						{
							code: '3',
							text: '直接销售',
							checked: false,
						},
						{
							code: '4',
							text: '主动投保',
							checked: false,
						},
						{
							code: '5',
							text: '加保',
							checked: false,
						},
						{
							code: '6',
							text: '其他方式',
							checked: false,
						}
					],
					purposeList: [{
							code: '0',
							text: '保障',
							checked: false
						},
						{
							code: '1',
							text: '储蓄',
							checked: false
						},
						{
							code: '2',
							text: '教育金',
							checked: false
						},
						{
							code: '3',
							text: '投资',
							checked: false
						},
						{
							code: '4',
							text: '其他',
							checked: false
						}
					],
					thirdPtIdentityList: [{
							code: '1',
							text: '是'
						},
						{
							code: '0',
							text: '否'
						},
						{
							code: '2',
							text: '无法识别，但有理由怀疑存在第三方'
						},
					],
					salaryList: [{
							"code": '1',
							"val": '10'
						},
						{
							"code": '2',
							"val": '20'
						},
						{
							"code": '3',
							"val": '30'
						},
						{
							"code": '4',
							"val": '40'
						},
						{
							"code": '5',
							"val": '50'
						},
						{
							"code": '6',
							"val": ''
						}

					],
				},
				temp: {
					relToApp: '',
					showOtherRelToApp: false,
					otherRelToApp: '',
				},
				hintContent: '',
				applyCode: ''
			}
		},
		mounted() {
			this.getPolicyMsg()
			utils.cache.removeItem("documentInfo")
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
			'policy.report.thirdPtIdentity': {
				handler(val) {
					if(val == '0' || val == '1') {
						this.policy.report.thirdPtRemark = ''
					}
					if(val == '0' || val == '2') {
						this.policy.report.thirdPtName = ''
						this.policy.report.thirdPtContact = ''
						this.policy.report.thirdPtRelToApp = ''
						this.policy.report.thirdPtAddr = ''

					}
				},
				deep: true
			},
		},
		methods: {
			selectedNav(item) {
				if(item.step < 7) {
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
				}
			},
			getApproachDesc(value) {
				this.policy.report.approachDes = value
			},
			getPurposeDesc(value) {
				this.policy.report.purposeDes = value
			},
			changeRelation() {
				if(this.temp.relToApp != '30') {
					this.temp.showOtherRelToApp = false
					this.temp.otherRelToApp = ''
					this.dict.relationList.relation.item.forEach(item => {
						if(item.code == this.temp.relToApp) {
							this.policy.report.thirdPtRelToApp = item.text
							console.log('关系11==》', this.policy.report.thirdPtRelToApp)
						}
					})
				} else {
					this.$refs.btns.showMOdal()
					this.temp.showOtherRelToApp = true
				}
			},
			relationEdit(index, value) {
				value = value.replace(/(^\s*)|(\s*$)/g, "")
				this.temp.otherRelToApp = value
				this.policy.report.thirdPtRelToApp = value
				console.log('关系22==》', this.policy.report.thirdPtRelToApp)
			},
			backHome() {
				this.$router.push("/home")
			},
			winReload: function(cond) {
				window.location.reload()
			},
			pre() {
				this.$router.push({
					name: 'inform_page',
					params: {
						planId: this.$route.params.planId
					}
				})
			},
			next() {
				let result = this.checkData()
				if(result.length > 0) {
					let msg = ''
					for(let i = 0; i < result.length; i++) {
						msg += i + 1 + '：' + result[i] + '</br>'
					}
					alert_n22.alert("提示", msg, "确定")
				} else {
					let requ = {
						"policy": JSON.parse(JSON.stringify(this.policy))
					}
					requ.policy.report.approach = requ.policy.report.approach.join(',')
					requ.policy.report.purpose = requ.policy.report.purpose.join(',')
					console.log(requ)
					this.dict.salaryList.forEach(item => {
						if(item.val == requ.policy.report.annualIncome) {
							requ.policy.report.annualIncomeCode = item.code
						}
					})
					if(requ.policy.report.annualIncomeCode == '') {
						requ.policy.report.annualIncomeCode = '6'
					}
					utils.http.postFast('MODISTRIESAVE', requ, body => {
						utils.cache.set('yesOrNo', body.policy.problemFlag)
						if(body.policy.resultCode == '0') {
							this.$router.push({
								name: 'electronics_policy_page',
								params: {
									planId: this.$route.params.planId
								}
							})
						} else if(body.policy.resultCode == '1') {
							if(body.policy.problemFlag == "1") {
								this.applyCode = body.policy.applyCode
								this.hintContent = body.policy.applyCode + "\n" + body.policy.resultMessage + "\n是否进行修改?"
								this.$refs.btn.showMOdal()
							} else {
								alert_n22.alert("提示", body.policy.resultMessage, "确定")
							}
						} else if(body.policy.resultCode == '2') {
							alert_n22.confirm('提示', body.policy.resultMessage + ",请修改后继续操作!", '确定', '', (flag) => {
								this.$router.push({
									name: 'product_details_page',
									params: {
										planId: this.$route.params.planId,
										step: '1'
									}
								})
							})
						} else {
							alert_n22.alert("提示", body.policy.resultMessage, "确定")
						}
					})
				}
			},
			getPolicyMsg() {
				let requ = {
					"policy": {
						"substepNo": "7",
						"orderCode": this.$route.params.planId,
						"stepNo":'0,1,2,7',
						"nothave":'1,2,3'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requ, (body) => {
					this.policy.report = JSON.parse(JSON.stringify(body.policy.report))
					this.policy.report.annualIncome = body.policy.custInfo.appnt.salary
					this.navigationList = JSON.parse(JSON.stringify(body.policy.navigationList))
					this.navigationList.forEach(item => {
						item.path = ''
						if(item.step < '7') {
							item.path = 'cheng'
						}
						if(item.step == '7') {
							item.path = 'lv'
						}
					})
					if(this.policy.report.thirdPtRelToApp != '') {
						this.dict.relationList.relation.item.forEach(item => {
							if(item.text == this.policy.report.thirdPtRelToApp) {
								this.temp.relToApp = item.code
							}
						})
						if(this.temp.relToApp == '') {
							this.temp.relToApp = '30'
							this.temp.showOtherRelToApp = true
							this.temp.otherRelToApp = this.policy.report.thirdPtRelToApp
						}
					}
				}, true)
			},
			detonate() {
				this.problemmodify("0")
			},
			cancel() {
				this.problemmodify("1")
			},
			problemmodify(tag) {
				utils.cache.set('yesOrNo', tag)
				if(tag == "0") {
					this.$router.push({
						name: 'product_details_page',
						params: {
							planId: this.$route.params.planId,
							step: '1'
						}
					})
				} else {
					this.$router.push({
						name: 'electronics_policy_page',
						params: {
							planId: this.$route.params.planId
						}
					})
				}
			},
			checkData() {
				let result = []
				if(this.policy.report.approach.length == 0) {
					result.push('请选择投保途径')
				} else if(this.policy.report.approach.indexOf('6') > -1 && this.policy.report.approachDes == '') {
					result.push('请输入投保途径')
				}
				if(this.policy.report.purpose.length == 0) {
					result.push('请选择投保目的')
				} else if(this.policy.report.purpose.indexOf('4') > -1 && this.policy.report.purposeDes == '') {
					result.push('请输入投保目的')
				}
				if(this.policy.report.annualIncome == '') {
					result.push('请输入年收入')
				} else if(Number(this.policy.report.annualIncome) == 0) {
					result.push('年收入不可为0万元')
				}
				if(this.policy.report.sourceOfIncome == '') {
					result.push('请输入收入来源')
				}
				if(this.policy.report.totalAssets == '') {
					result.push('请输入总资产')
				} else if(Number(this.policy.report.annualIncome) > Number(this.policy.report.totalAssets)) {
					result.push('总资产必须大于等于投保人年收入')
				}
				if(this.policy.report.thirdPtIdentity == '1') {
					if(this.policy.report.thirdPtName == '') {
						result.push('请输入姓名/机构名称')
					}
					if(this.policy.report.thirdPtContact == '') {
						result.push('请输入联系方式')
					} else if(this.policy.report.thirdPtContact.length != 11) {
						result.push('手机号必须为11位数字')
					} else if(this.policy.report.thirdPtContact.substring(0, 1) != 1) {
						result.push('手机号开头必须以1开头')
					}
					if(this.policy.report.thirdPtRelToApp == '') {
						result.push('请输入与投保人关系')
					}
					if(this.policy.report.thirdPtAddr == '') {
						result.push('请输入地址')
					}
				} else if(this.policy.report.thirdPtIdentity == '2') {
					if(this.policy.report.thirdPtRemark == '') {
						result.push('请输入怀疑原因')
					}
				}
				return result
			}
		}
	}
</script>

<style lang="scss" scoped type="text/css">
	.main-contents {
		bottom: 50px;
		.part {
			font-size: 14px;
			.title {
				padding: 0 4%;
				line-height: 45px;
				background: #F5F5F5;
				color: #333;
				font-size: 15px;
				display: flex;
				align-items: center;
			}
			div {
				font-size: 14px;
				p {
					line-height: 35px;
					font-size: 14px;
					color: #333;
				}
				input {
					border-bottom: 1px solid #333;
					font-size: 14px;
					width: 50px;
					text-align: center;
				}
			}
			.switch {
				border-bottom: 1px solid #EFEFEF;
				padding-bottom: 2%;
			}
			.salesflex {
				div {
					display: flex;
					justify-content: flex-start;
					padding-left: 4%;
					p {
						width: 35%;
					}
					input {
						width: 60%;
						text-align: left;
						border: none;
						outline: none;
						border-bottom: 1px solid #EFEFEF;
					}
					label {
						width: 60%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid #EFEFEF;
					}
				}
			}
		}
		.part>div {
			padding: 4%;
		}
	}
</style>
