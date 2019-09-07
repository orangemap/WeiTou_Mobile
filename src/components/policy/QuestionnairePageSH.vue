<template>
	<div>
		<Headerbtns title="上海测评问卷">
			<div slot="left" @click="goBack">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="main-contents">
			<NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
			<div class="main-contents-right">
				<div class="header"></div>
				<div class="content">
					<div>
						<h1>年长客户投保意愿和经济承受能力测评卷</h1>
						<h2>(针对年龄 60 周岁及以上投保人)</h2>
					</div>
					<div class="begin">
						<p class="one">尊敬的客户 :</p>
						<p class="two">为切实保障保险消费者的权益,在您购买保险产品前,我们将对您进行投保意愿和经济承受能力测评。 问卷调查的结果,并不能完全准确地反映您的风险承受能力,仅供您在购买保险产品时作参考。 在选择保险产品时,请您综合考虑自身的保险需求、财务状况、风险承受能力等因素, 理性选择适合自己的保险产品。以下问题请选择唯一选项,不可多选:</p>
					</div>
					<div class="table">
						<div class="tableContent">
							<div class="tableHead">常年客户意愿和经济承受能力测评表</div>
							<!-- 问题1 -->
							<div class="one">
								<div class="title">1. 您是否能够独立阅读并理解保险条款?</div>
								<ul>
									<li>
										<input type="checkbox" v-model="docTypeInfo.readItem_a" @change="checkreadItem('a')">
										<span>能够独立阅读并完全理解保险条款内容 </span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.readItem_b" @change="checkreadItem('b')">
										<span>可以自行阅读条款,但部分内容需销售人员讲解 </span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.readItem_c" @change="checkreadItem('c')">
										<span>无法自行阅读,完全依赖销售人员讲解 </span>
									</li>
								</ul>
							</div>
							<!-- 问题2 -->
							<div class="two">
								<div class="title">2. 您打算购买保险的主要原因?</div>
								<ul>
									<li>
										<input type="checkbox" v-model="docTypeInfo.buyReason_a" @change="checkbuyReason('a')">
										<span>为自己和家人增加一份保障, 防范可能发生的风险</span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.buyReason_b" @change="checkbuyReason('b')">
										<span>投资理财需要, 期望获得一定收益</span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.buyReason_c" @change="checkbuyReason('c')">
										<span>没有明确概念, 主要是根据销售人员推荐</span>
									</li>
								</ul>
							</div>
							<!-- 问题3 -->
							<div class="three">
								<div class="title">3. 销售人员向您推荐的保险产品与您的缴费能力是否匹配?</div>
								<div class="title">如为趸缴产品请回答以下选项:您的缴费金额为
									<input type="text" class="write" v-model="docTypeInfo.allPayPrem"> 元
								</div>
								<ul>
									<li>
										<input type="checkbox" v-model="docTypeInfo.allPayItem_a" @change="checkallPayItem('a')">
										<span>购买保险的资金属于闲散资金，可以等保险期满时再领取，不会出现提前退保的情况</span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.allPayItem_b" @change="checkallPayItem('b')">
										<span>购买保险的资金短期内暂时没有其他用处，但不能确保在保险期满前是否会提前退保</span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.allPayItem_c" @change="checkallPayItem('c')">
										<span>购买保险的资金随时都可能要挪作他用</span>
									</li>
								</ul>
								<div class="title">
									如为期缴产品请回答以下选项: 您的缴费期限为
									<input type="text" readonly class="write" v-model="docTypeInfo.payYears">, 首期缴费
									<input type="text" readonly class="write" v-model="docTypeInfo.firstPrem">元, 续期缴费
									<input type="text" readonly class="write" v-model="docTypeInfo.renewPrem">元
								</div>
								<ul>
									<li>
										<input type="checkbox" v-model="docTypeInfo.periodPayItem_a" @change="checkperiodPayItem('a')">
										<span>我的收入状况能够确保按期缴纳保费直至交费期结束</span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.periodPayItem_b" @change="checkperiodPayItem('b')">
										<span>目前我的收入状况能够承担保费，但不能确定以后是否能按期缴费</span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.periodPayItem_c" @change="checkperiodPayItem('c')">
										<span>我的收入情况不稳定，很有可能不能按期缴纳保费</span>
									</li>
								</ul>
							</div>
							<!-- 问题4 -->
							<div class="four">
								<div class="title">4. 您对所购买的保险产品的收益是否有预期?</div>
								<ul>
									<li>
										<input type="checkbox" v-model="docTypeInfo.bnfExpItem_a" @change="checkbnfExpItem('a')">
										<span>没有收益预期，只要能够提供保障就可以 </span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.bnfExpItem_b" @change="checkbnfExpItem('b')">
										<span>希望获得一定收益，但可以接受低于银行同期存款利率 </span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.bnfExpItem_c" @change="checkbnfExpItem('c')">
										<span>不得低于银行同期存款利率</span>
									</li>
								</ul>
							</div>
							<!-- 问题5 -->
							<div class="five">
								<div class="title">5. 您是否了解保险合同关于犹豫期的规定？</div>
								<ul>
									<li>
										<input type="checkbox" @click="check5('a')" v-model="docTypeInfo.hesitateItem_a">
										<span>清楚，即在签收保单10日内可以全额退保，超出犹豫期后退保将会产生损失</span>
									</li>
									<li>
										<input type="checkbox" @click="check5('b')" v-model="docTypeInfo.hesitateItem_b">
										<span>不清楚</span>
									</li>
								</ul>
							</div>
							<!-- 问题6 -->
							<div class="sex">
								<div class="title">6. 您是否了解并能接受退保可能造成的损失，即可能不能全额返还所交保费?</div>
								<ul>
									<li>
										<input type="checkbox" v-model="docTypeInfo.refundItem_a" @change="check6('a')">
										<span>清楚，如果我申请退保，我能够接受因此产生的损失 </span>
									</li>
									<li>
										<input type="checkbox" v-model="docTypeInfo.refundItem_b" @change="check6('b')">
										<span>我不能接受因提前退保导致所交保费不能全额返还的情况。</span>
									</li>
								</ul>
							</div>
							<!-- 问题7 -->
							<div class="seven">
								<div class="title">
									您测评的分<input type="text" class="write" v-model="docTypeInfo.score">,您测评结果为:
								</div>
								<div class="result">
									<p>a. 25分以上：您有一定风险承受能力，请您在购买时仔细阅读保险条款，清楚了解保险责任、责任免除、交费期限、犹豫期、退保费用等内容，并谨慎购买投资理财型产品。</p>
									<p>b. 10-25分（含）：您对保险了解不够深入，可能存在风险错配的情况，建议在购买前先进行咨询。</p>
									<p>c. 低于10分（含）：您不适宜作为投保人直接购买保险产品，如有保险需求，建议由家人购买。</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    	<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
		<Footerbtns :is_show=false total_premium="10000.00">
			<button class="btnFoote" slot="center" @click="reportPage">
				下一步
			</button>
		</Footerbtns>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
	import NavigationBox from '../policy/common/NavigationBox.vue'
	import '../policy/css/base.css'
	export default {
		components: {
			Headerbtns,
			Footerbtns,
			NavigationBox
		},
		data() {
			return {
				showNavList: false,
				navigationList: [],
				current_total_premium: '10000.00',
				docTypeInfo: {
					readItem: false,
					readItem_a: false,
					readItem_b: false,
					readItem_c: false,
					buyReason: false,
					buyReason_a: false,
					buyReason_b: false,
					buyReason_c: false,
					allPayPrem: '',
					allPayItem: false,
					allPayItem_a: false,
					allPayItem_b: false,
					allPayItem_c: false,
					payYears: '',
					payMonthes: '',
					firstPrem: '',
					renewPrem: '',
					periodPayItem: false,
					periodPayItem_a: false,
					periodPayItem_b: false,
					periodPayItem_c: false,
					bnfExpItem: false,
					bnfExpItem_a: false,
					bnfExpItem_b: false,
					bnfExpItem_c: false,
					hesitateItem: false,
					hesitateItem_a: false,
					hesitateItem_b: false,
					refundItem: false,
					refundItem_a: false,
					refundItem_b: false,
					score: '',
					scoreItem: '',
					agentSign: '',
					appSign: ''
				}
			}
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
		mounted() {
			this.getSHinfo()
		},
		methods: {
			selectedNav(item) {
				this.SHinfo()
				if(item.step == 1) {
					this.$router.push({
						name: item.name,
						params: {
							planId: this.$route.params.planId,
							step: '1'
						}
					})
				}
			},
			goBack() {
				//投保回退数据保存功能:保存上海测评问卷页面
				this.SHinfo()
				console.log("保存上海测评问卷页面")
				this.$router.push({
					name: 'product_details_page',
					params: {
						planId: this.$route.params.planId,
						step: '3'
					}
				})
			},
			reportPage() {
				if(this.checkAll()) {
					this.SHinfo()
					this.$router.push({
						name: 'customer_details_page',
						params: {
							planId: this.$route.params.planId,
							step: '1'
						}
					})
				}
			},
			getSHinfo() {
				let requ = {
					"policy": {
						"substepNo": "2",
						"orderCode": this.$route.params.planId,
						"stepNo":'0,1,2,3',
						"nothave":'1,3'
					}
				}
				utils.http.post('MOHQPOLICYMSG', requ).then(response => {
					this.navigationList = JSON.parse(JSON.stringify(response.data.response.policy.navigationList))
					this.navigationList.forEach(item => {
						item.path = ''
						if(item.step < '2') {
							item.path = 'cheng'
						}
						if(item.step == '2') {
							item.path = 'lv'
						}
					})
					console.log(response.data.response)
					this.docTypeInfo = response.data.response.policy.docTypeInfo.TB2_2050701
					if(this.docTypeInfo.readItem != "") {
						this.docTypeInfo.readItem = (this.docTypeInfo.readItem == "false") ? false : true
					} else {
						this.docTypeInfo.readItem = false
					}
					if(this.docTypeInfo.readItem_a != "") {
						this.docTypeInfo.readItem_a = (this.docTypeInfo.readItem_a == "false") ? false : true
					} else {
						this.docTypeInfo.readItem_a = false
					}
					if(this.docTypeInfo.readItem_b != "") {
						this.docTypeInfo.readItem_b = (this.docTypeInfo.readItem_b == "false") ? false : true
					} else {
						this.docTypeInfo.readItem_b = false
					}
					if(this.docTypeInfo.readItem_c != "") {
						this.docTypeInfo.readItem_c = (this.docTypeInfo.readItem_c == "false") ? false : true
					} else {
						this.docTypeInfo.readItem_c = false
					}
					if(this.docTypeInfo.buyReason != "") {
						this.docTypeInfo.buyReason = (this.docTypeInfo.buyReason == "false") ? false : true
					} else {
						this.docTypeInfo.buyReason = false
					}
					if(this.docTypeInfo.buyReason_a != "") {
						this.docTypeInfo.buyReason_a = (this.docTypeInfo.buyReason_a == "false") ? false : true
					} else {
						this.docTypeInfo.buyReason_a = false
					}
					if(this.docTypeInfo.buyReason_b != "") {
						this.docTypeInfo.buyReason_b = (this.docTypeInfo.buyReason_b == "false") ? false : true
					} else {
						this.docTypeInfo.buyReason_b = false
					}
					if(this.docTypeInfo.buyReason_c != "") {
						this.docTypeInfo.buyReason_c = (this.docTypeInfo.buyReason_c == "false") ? false : true
					} else {
						this.docTypeInfo.buyReason_c = false
					}
					if(this.docTypeInfo.allPayItem != "") {
						this.docTypeInfo.allPayItem = (this.docTypeInfo.allPayItem == "false") ? false : true
					} else {
						this.docTypeInfo.allPayItem = false
					}
					if(this.docTypeInfo.allPayItem_a != "") {
						this.docTypeInfo.allPayItem_a = (this.docTypeInfo.allPayItem_a == "false") ? false : true
					} else {
						this.docTypeInfo.allPayItem_a = false
					}
					if(this.docTypeInfo.allPayItem_b != "") {
						this.docTypeInfo.allPayItem_b = (this.docTypeInfo.allPayItem_b == "false") ? false : true
					} else {
						this.docTypeInfo.allPayItem_b = false
					}
					if(this.docTypeInfo.allPayItem_c != "") {
						this.docTypeInfo.allPayItem_c = (this.docTypeInfo.allPayItem_c == "false") ? false : true
					} else {
						this.docTypeInfo.allPayItem_c = false
					}
					if(this.docTypeInfo.periodPayItem != "") {
						this.docTypeInfo.periodPayItem = (this.docTypeInfo.periodPayItem == "false") ? false : true
					} else {
						this.docTypeInfo.periodPayItem = false
					}
					if(this.docTypeInfo.periodPayItem_a != "") {
						this.docTypeInfo.periodPayItem_a = (this.docTypeInfo.periodPayItem_a == "false") ? false : true
					} else {
						this.docTypeInfo.periodPayItem_a = false
					}
					if(this.docTypeInfo.periodPayItem_b != "") {
						this.docTypeInfo.periodPayItem_b = (this.docTypeInfo.periodPayItem_b == "false") ? false : true
					} else {
						this.docTypeInfo.periodPayItem_b = false
					}
					if(this.docTypeInfo.periodPayItem_c != "") {
						this.docTypeInfo.periodPayItem_c = (this.docTypeInfo.periodPayItem_c == "false") ? false : true
					} else {
						this.docTypeInfo.periodPayItem_c = false
					}
					if(this.docTypeInfo.bnfExpItem != "") {
						this.docTypeInfo.bnfExpItem = (this.docTypeInfo.bnfExpItem == "false") ? false : true
					} else {
						this.docTypeInfo.bnfExpItem = false
					}
					if(this.docTypeInfo.bnfExpItem_a != "") {
						this.docTypeInfo.bnfExpItem_a = (this.docTypeInfo.bnfExpItem_a == "false") ? false : true
					} else {
						this.docTypeInfo.bnfExpItem_a = false
					}
					if(this.docTypeInfo.bnfExpItem_b != "") {
						this.docTypeInfo.bnfExpItem_b = (this.docTypeInfo.bnfExpItem_b == "false") ? false : true
					} else {
						this.docTypeInfo.bnfExpItem_b = false
					}
					if(this.docTypeInfo.bnfExpItem_c != "") {
						this.docTypeInfo.bnfExpItem_c = (this.docTypeInfo.bnfExpItem_c == "false") ? false : true
					} else {
						this.docTypeInfo.bnfExpItem_c = false
					}
					if(this.docTypeInfo.hesitateItem != "") {
						this.docTypeInfo.hesitateItem = (this.docTypeInfo.hesitateItem == "false") ? false : true
					} else {
						this.docTypeInfo.hesitateItem = false
					}
					if(this.docTypeInfo.hesitateItem_a != "") {
						this.docTypeInfo.hesitateItem_a = (this.docTypeInfo.hesitateItem_a == "false") ? false : true
					} else {
						this.docTypeInfo.hesitateItem_a = false
					}
					if(this.docTypeInfo.hesitateItem_b != "") {
						this.docTypeInfo.hesitateItem_b = (this.docTypeInfo.hesitateItem_b == "false") ? false : true
					} else {
						this.docTypeInfo.hesitateItem_b = false
					}
					if(this.docTypeInfo.refundItem != "") {
						this.docTypeInfo.refundItem = (this.docTypeInfo.refundItem == "false") ? false : true
					} else {
						this.docTypeInfo.refundItem = false
					}
					if(this.docTypeInfo.refundItem_a != "") {
						this.docTypeInfo.refundItem_a = (this.docTypeInfo.refundItem_a == "false") ? false : true
					} else {
						this.docTypeInfo.refundItem_a = false
					}
					if(this.docTypeInfo.refundItem_b != "") {
						this.docTypeInfo.refundItem_b = (this.docTypeInfo.refundItem_b == "false") ? false : true
					} else {
						this.docTypeInfo.refundItem_b = false
					}
				})
			},
			SHinfo() {
				let requ = {
					"policy": {
						"deviceNo": "",
						"channel": utils.cache.get('personsal').channel,
						"substepNo": "2",
						"smartStepNo": "SH",
						"navigationList": this.navigationList,
						"isInsert": "",
						"agentCode": utils.cache.get('personsal').agentCode,
						"orderCode": this.$route.params.planId,
						"docType": "TB2_2050701",
						"docTypeInfo": {
							"TB2_2050701": this.docTypeInfo
						}
					}
				}
				utils.http.post('MODISTRIESAVE', requ).then(response => {
					console.log(response.data.response)
				})
			},
			// 问题1
			checkreadItem(data) {
				if(data == 'a') {
					this.docTypeInfo.readItem_b = false
					this.docTypeInfo.readItem_c = false
					if(this.docTypeInfo.readItem_a == true) {
						this.docTypeInfo.readItem = true
					} else {
						this.docTypeInfo.readItem = false
					}
				}
				if(data == 'c') {
					this.docTypeInfo.readItem_b = false
					this.docTypeInfo.readItem_a = false
					if(this.docTypeInfo.readItem_c == true) {
						this.docTypeInfo.readItem = true
					} else {
						this.docTypeInfo.readItem = false
					}
				}
				if(data == 'b') {
					this.docTypeInfo.readItem_c = false
					this.docTypeInfo.readItem_a = false
					if(this.docTypeInfo.readItem_b == true) {
						this.docTypeInfo.readItem = true
					} else {
						this.docTypeInfo.readItem = false
					}
				}
			},
			// 问题2
			checkbuyReason(data) {
				if(data == 'a') {
					this.docTypeInfo.buyReason_b = false
					this.docTypeInfo.buyReason_c = false
					if(this.docTypeInfo.buyReason_a == true) {
						this.buyReason = true
					} else {
						this.buyReason = false
					}
				}
				if(data == 'b') {
					this.docTypeInfo.buyReason_a = false
					this.docTypeInfo.buyReason_c = false
					if(this.docTypeInfo.buyReason_b == true) {
						this.buyReason = true
					} else {
						this.buyReason = false
					}
				}
				if(data == 'c') {
					this.docTypeInfo.buyReason_b = false
					this.docTypeInfo.buyReason_a = false
					if(this.docTypeInfo.buyReason_c == true) {
						this.buyReason = true
					} else {
						this.buyReason = false
					}
				}
			},
			//问题3
			checkallPayItem(data) {
				if(data == 'a') {
					this.docTypeInfo.allPayItem_b = false
					this.docTypeInfo.allPayItem_c = false
					if(this.docTypeInfo.allPayItem_a == true) {
						this.docTypeInfo.allPayItem = true
					} else {
						this.docTypeInfo.allPayItem = false
					}
				}
				if(data == 'b') {
					this.docTypeInfo.allPayItem_a = false
					this.docTypeInfo.allPayItem_c = false
					if(this.docTypeInfo.allPayItem_b == true) {
						this.docTypeInfo.allPayItem = true
					} else {
						this.docTypeInfo.allPayItem = false
					}
				}
				if(data == 'c') {
					this.docTypeInfo.allPayItem_b = false
					this.docTypeInfo.allPayItem_a = false
					if(this.docTypeInfo.allPayItem_c == true) {
						this.docTypeInfo.allPayItem = true
					} else {
						this.docTypeInfo.allPayItem = false
					}
				}
			},
			checkperiodPayItem(data) {
				if(data == 'a') {
					this.docTypeInfo.periodPayItem_b = false
					this.docTypeInfo.periodPayItem_c = false
					if(this.docTypeInfo.periodPayItem_a == true) {
						this.docTypeInfo.periodPayItem = true
					} else {
						this.docTypeInfo.periodPayItem = false
					}
				}
				if(data == 'b') {
					this.docTypeInfo.periodPayItem_a = false
					this.docTypeInfo.periodPayItem_c = false
					if(this.docTypeInfo.periodPayItem_b == true) {
						this.docTypeInfo.periodPayItem = true
					} else {
						this.docTypeInfo.periodPayItem = false
					}
				}
				if(data == 'c') {
					this.docTypeInfo.periodPayItem_a = false
					this.docTypeInfo.periodPayItem_b = false
					if(this.docTypeInfo.periodPayItem_c == true) {
						this.docTypeInfo.periodPayItem = true
					} else {
						this.docTypeInfo.periodPayItem = false
					}
				}
			},
			// 问题4
			checkbnfExpItem(data) {
				if(data == 'a') {
					this.docTypeInfo.bnfExpItem_b = false
					this.docTypeInfo.bnfExpItem_c = false
					if(this.docTypeInfo.bnfExpItem_a == true) {
						this.docTypeInfo.bnfExpItem = true
					} else {
						this.docTypeInfo.bnfExpItem = false
					}
				}
				if(data == 'b') {
					this.docTypeInfo.bnfExpItem_a = false
					this.docTypeInfo.bnfExpItem_c = false
					if(this.docTypeInfo.bnfExpItem_b == true) {
						this.docTypeInfo.bnfExpItem = true
					} else {
						this.docTypeInfo.bnfExpItem = false
					}
				}
				if(data == 'c') {
					this.docTypeInfo.bnfExpItem_a = false
					this.docTypeInfo.bnfExpItem_b = false
					if(this.docTypeInfo.bnfExpItem_c == true) {
						this.docTypeInfo.bnfExpItem = true
					} else {
						this.docTypeInfo.bnfExpItem = false
					}
				}
			},
			// 问题5
			check5(data) {
				if(data == 'a') {
					this.docTypeInfo.hesitateItem_b = false
					if(this.docTypeInfo.hesitateItem_a == true) {
						this.docTypeInfo.hesitateItem = true
					} else {
						this.docTypeInfo.hesitateItem = false
					}
				}
				if(data == 'b') {
					this.docTypeInfo.hesitateItem_a = false
					if(this.docTypeInfo.hesitateItem_b == true) {
						this.docTypeInfo.hesitateItem = true
					} else {
						this.docTypeInfo.hesitateItem = false
					}
				}
			},
			// 问题6
			check6(data) {
				if(data == 'a') {
					this.docTypeInfo.refundItem_b = false
					if(this.docTypeInfo.refundItem_a == true) {
						this.docTypeInfo.refundItem = true
					} else {
						this.docTypeInfo.refundItem = false
					}
				}
				if(data == 'b') {
					this.docTypeInfo.refundItem_a = false
					if(this.docTypeInfo.refundItem_b == true) {
						this.docTypeInfo.refundItem = true
					} else {
						this.docTypeInfo.refundItem = false
					}
				}
			},
			checkquestion1() {
				if(this.docTypeInfo.readItem_a || this.docTypeInfo.readItem_b || this.docTypeInfo.readItem_c) {} else {
					return '问题1必填项，请进行勾选对应的信息'
				}
				return ''
			},
			checkquestion2() {
				if(this.docTypeInfo.buyReason_b || this.docTypeInfo.buyReason_c || this.docTypeInfo.buyReason_a) {} else {
					return '问题2必填项，请进行勾选对应的信息'
				}
				return ''

			},
			checkquestion3() {
				let errMassage = ''
				if(this.docTypeInfo.periodPayItem == '' && this.docTypeInfo.renewPrem == '' && this.docTypeInfo.firstPrem == '' && this.docTypeInfo.payYears == '') //趸交的情况下
				{
					if(this.docTypeInfo.allPayPrem) {} else {
						errMassage += '问题3趸交金额为必填项'
					}
					if(isNaN(this.docTypeInfo.allPayPrem)) {
						errorMassage += '问题三趸交金额必须为数字'
					}
					if(this.docTypeInfo.allPayItem_b || this.docTypeInfo.allPayItem_a || this.docTypeInfo.allPayItem_c) {} else {
						errMassage += '问题3趸交必填项，请进行勾选对应的信息 '
					}
				} else if(this.docTypeInfo.allPayPrem == '' && this.docTypeInfo.allPayItem == '') { //期缴
					if(this.docTypeInfo.periodPayItem_b || this.docTypeInfo.periodPayItem_c || this.docTypeInfo.periodPayItem_a) {} else {
						errMassage += '问题3期缴必填项，请进行勾选对应的信息 '
					}
					if(this.docTypeInfo.firstPrem && !isNaN(this.docTypeInfo.firstPrem)) {} else {
						errMassage += '问题3期缴首期缴费填写有误'
					}
					if(this.docTypeInfo.renewPrem && !isNaN(this.docTypeInfo.renewPrem)) {} else {
						errMassage += '问题3续期缴费填写有误'
					}
					if(!this.docTypeInfo.payYears) {
						errMassage += '问题3缴费期限为必填项'
					}
				}

				if((this.docTypeInfo.allPayItem != '' || this.docTypeInfo.allPayPrem != '') && (this.docTypeInfo.periodPayItem != '' || this.docTypeInfo.payYears != '' || this.docTypeInfo.firstPrem != '' || this.docTypeInfo.renewPrem != '')) {
					errMassage += '问题3趸交产品和期缴产品不可同时选择'
				}
				return errMassage;
			},
			checkquestion4() {
				if(this.docTypeInfo.bnfExpItem_b || this.docTypeInfo.bnfExpItem_c || this.docTypeInfo.bnfExpItem_a) {} else {
					return '问题4必填项，请进行勾选对应的信息'
				}
				return ''

			},
			checkquestion5() {
				if(this.docTypeInfo.hesitateItem_c || this.docTypeInfo.hesitateItem_a) {} else {
					return '问题5必填项，请进行勾选对应的信息'
				}
				return ''

			},
			checkquestion6() {
				if(this.docTypeInfo.refundItem_b || this.docTypeInfo.refundItem_a) {} else {
					return '问题6必填项，请进行勾选对应的信息'
				}

				return ''

			},
			checkScore() {
				if(this.docTypeInfo.score == '') {
					return '请提交进行测评'
				}
				if(Number(this.docTypeInfo.score) < 10) {
					return '测评分数低于10分'
				}
				return ''
			},
			checkAll() {
				let result = ""
				result += this.checkquestion1()
				if(result != '') {
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkquestion2()
				if(result != '') {
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkquestion3()
				if(result != '') {
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkquestion4()
				if(result != '') {
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkquestion5()
				if(result != '') {
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkquestion6()
				if(result != '') {
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkScore()
				if(result != '') {
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				return true
			}
		}
	}
</script>

<style type="text/css" lang="scss" scope>
	.btnFoote {
		border: 0;
		color: #fff;
		width: 100%;
		height: 50px;
		background: #FEB101;
		height: 50px
	}

	.main-contents {
		.header {
			float: right;
			display: block;
			width: 200px;
			height: 50px;
			background: url("../../../static/img/policy/logo.png")no-repeat right center;
			background-size: 100% 70%;
		}
		.content {
			float: left;
			width: 100%;
			h1 {
				text-align: center;
				padding: 5px 0;
				font-size: 16px;
				font-weight: bold;
			}
			h2 {
				text-align: center;
				padding: 5px 0;
				font-size: 16px;
				font-weight: 500;
			}
			.begin {
				float: left;
				margin-top: 30px;
				width: 90%;
				padding: 0 5%;
				float: left;
				.one,
				.two {
					font-size: 16px;
					font-weight: bold;
				}
				.two {
					text-indent: 40px;
					text-align: justify;
					line-height: 17px;
				}
			}
			.table {
				float: left;
				width: 90%;
				padding: 0 5%;
				margin-top: 3px;
				.tableContent {
					width: 100%;
					border: 1px solid #000;
					padding: 5px 0;
					margin-bottom: 10px;
					.tableHead {
						width: 95%;
						line-height: 25px;
						margin: 5px auto;
						text-align: center;
						border: 1px solid #000;
						font-weight: bold;
					}
					.one,
					.two,
					.three,
					.four,
					.five,
					.sex,
					.seven {
						width: 95%;
						margin: 5px auto;
						border: 1px solid #000;
						.title {
							font-weight: bold;
							padding: 3px 0;
						}
						ul {
							li {
								padding: 2px 0;
								display: flex;
								input {
									margin: 5px 5px 0px 5px;
								}
								span {
									display: inline-block;
									line-height: 20px;
								}
							}
						}
						.write {
							display: inline-block;
							width: 100px;
							border-bottom: 1px solid #000;
							text-align: center;
						}
						.result {
							p {
								padding: 3px 0;
								line-height: 20px;
							}
						}
					}
				}
			}
		}
	}
</style>
