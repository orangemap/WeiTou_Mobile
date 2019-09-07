<template>
	<div>
		<Headerbtns :title="infoId!=undefined&&infoId!=''?'我的保单':'待办事项'">
			<div @click="goTo()" slot="left">
				<i class="fa fa-angle-left"></i>
			</div>
			<div slot="right" @click="showSea()">
				<img src="static/img/policy/icon_search.png" width="18" height="18" style=" position:relative;top:5px;right:5px;"/>
			</div>
		</Headerbtns>
		<div class="main-contents">
			<div class="list-btn">
				<p @click="changeShow(1)" :class="[showList=='1'?'show':'']">未完成</p>
				<p @click="changeShow(2)" :class="[showList=='2'?'show':'']">已完成</p>
			</div>
			<div class="content" v-show="showList=='1'">
				<div class="show-list" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="loadUnFu" ref="loadmoreUnFu" bottomPullText='加载中...' @bottom-status-change="handleBottomChange" :auto-fill="false">
						<div class="empty" v-show="unFulfilList.length==0">当前列表为空!</div>
						<div class="content" v-for="(item,index) in unFulfilList" :key="index">
							<div class="list_top">
								<p>
									<i class="fa fa-list-ol" aria-hidden="true" v-show="item.applyCode!=''"></i>
									<span>{{item.applyCode}}</span>
								</p>
								<p @click="statusChange(item)">{{item | getStatus}}</p>
							</div>
							<div class="list_middle">
								<p>
									<span style="width: 25%;">投保险种</span>
									<span>{{item.riskName}}</span>
								</p>
								<p>
									<span>投保人</span>
									<span>{{item.holderName}}</span>
								</p>
								<p>
									<span>被保人</span>
									<span>
										{{item.insuredName}}
										<b style="font-weight: normal;" v-show="Number(item.insurantCount)>1">等{{item.insurantCount}}人</b>
									</span>
								</p>
								<p>
									<span>创建时间</span>
									<span>{{item.orderDate}}</span>
								</p>
							</div>
							<div class="list_bottom">
								<span @click="goProblem(item)" v-if="(item.status == -1 ||item.status == 0||item.status == 16||item.status == 17||item.status == 18||item.status == 19)& item.problemStatue == 92 ">问题件回复</span>
								<span @click="getStatusPay(item)" v-if="item.status == 1 && item.pkState != 5 && item.pkState!=2">支付</span>
								<span @click="getStatausDetail(item)" v-if="item.status != 80 && item.status != 81 && item.status != 82 && item.status != 83 && item.status != 84  && item.status != -1 && item.status != 5 &&  item.status != 7 || item.status == 1 && item.pkState == 5">查看</span>
								<span @click="getStatusRecall(item)" v-if="item.status == 1 && item.pkState != 1 && item.pkState != 2 && item.pkState != 5 || item.status == -1 && item.problemStatue == 91 || item.status == -1 && item.problemStatue == 92 || item.status == -1 && item.problemStatue == 93">撤件</span>
								<span @click="goDelete(item,index)" v-if="item.status == -1 && item.problemStatue == 90">删除</span>
								<span @click="goDelete(item,index)" v-if="item.status == 80 || item.status == 81 || item.status == 82 || item.status == 84">删除</span>
								<span @click="goFillout(item)" v-if="item.status == -1 && item.problemStatue == 90">继续填写</span>
								<span @click="goFillout(item)" v-if="item.problemStatue != 91 && item.status == 80 || item.status == 81 || item.status == 82 || item.status == 84">继续填写</span>
							</div>
						</div>
					</mt-loadmore>
				</div>
			</div>
			<div class="content" v-show="showList=='2'">
				<div class="show-list" style="overflow-y: scroll;" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="loadFu" ref="loadmoreFu" bottomPullText='加载中...' @bottom-status-change="handleBottomChange" :auto-fill="false">
						<div class="empty" v-show="fulfilList.length==0">当前列表为空!</div>
						<div class="content" v-for="(item,index) in fulfilList" :key="index" @click="go(item)">
							<div class="list_top">
								<p>
									<i class="fa fa-list-ol" aria-hidden="true" v-show="item.applyCode!=''"></i>
									<span>{{item.policyCode}}</span>
								</p>
								<p>{{item | getStatus}}</p>
							</div>
							<div class="list_middle">
								<p>
									<span>投保险种</span>
									<span>{{item.riskName}}</span>
								</p>
								<p>
									<span>投保人</span>
									<span>{{item.holderName}}</span>
								</p>
								<p>
									<span>被保人</span>
									<span>
										{{item.insuredName}}
										<b style="font-weight: normal;" v-show="Number(item.insurantCount)>1">等{{item.insurantCount}}人</b>
									</span>
								</p>
								<p>
									<span>创建时间</span>
									<span>{{item.orderDate}}</span>
								</p>
							</div>
							<div class="list_bottom">
								<span @click="getStatusReceipt(item)" v-if="item.status == '3' && item.isReceiptFlag == '0'">回执</span>
								<span @click="goDetail(item)" v-if="item.status != 6 || item.status == 6 && item.problemStatue == '' ">查看</span>
							</div>
						</div>
					</mt-loadmore>
				</div>
			</div>
		</div>
		<mt-popup v-model="showSelect" position="top" class="select_search">
			<Headerbtns :title="'查询条件'">
				<div slot="left" @click="showSelect=false">
					<i class="fa fa-angle-left"></i>
				</div>
				<div slot="right">
					<i class="fa fa-search" aria-hidden="true" style="color: transparent;"></i>
				</div>
			</Headerbtns>
			<div class="eject-contents">
				<div class="search_content">
					<div class="flex" style="color:#999;font-size:16px;justify-content: flex-start;">
						<img src="../../../static/img/backlog/seach.png" style='width: 16px;height:16px;margin-right:10px;' />搜索条件
					</div>
					<div v-show="showList=='1'" class="flex">
						<p>投保单号</p>
						<input type="text" v-model='selectInfo.applyCode' v-filterLetterNumber placeholder="请输入您要查询的投保单号" />
					</div>
					<div v-show="showList=='2'" class="flex">
						<p>保单号</p>
						<input type="text" v-model='selectInfo.policyCode' v-filterLetterNumber placeholder="请输入您要查询的保单号" />
					</div>
					<div class="flex">
						<p>主险名称</p>
						<label style="position:relative;">
						<div :class="selectInfo.productCode==''?'right':''" style="margin-right: 10px;"><picker v-model="selectInfo.productCode" :items="productArray" code="productCode" text="productName"></picker></div>
						<i class="fa fa-angle-right" style="color:#ccc;"></i>
					</label>
					</div>
					<div class="flex">
						<p>投保人姓名</p>
						<input type="text" v-model="selectInfo.holderName" v-supportLetterChinese placeholder="请输入您要查询的投保人姓名" maxlength="15" />
					</div>
				</div>
				<div class="search_footer">
					<p @click="clearInput" style="color:#ccc;">重置</p>
					<p @click="selectPolicy">查询</p>
				</div>
			</div>
		</mt-popup>
		<alert ref="showalert"></alert>
		<Modal ref="btns" :title="'提示'" :content="hintContent" @detonate="detonate" @cancel="cancel"></Modal>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import picker from '../common/Picker.vue'
	//import picker from '../policy/common/Picker.vue'
	import Headerbtns from '../policy/common/Header.vue'
	import alert from '../policy/common/alert.vue'
	import Modal from '../policy/common/Modal.vue'
	import '../policy/css/base.css'
	export default {
		name: 'backlog',
		components: {
			Headerbtns,
			picker,
			alert,
			Modal
		},
		data() {
			return {
				showSelect: false,
				sreach: {
					unFulfilListNum: 1,
					fulfilListNum: 1,
					limit: 10
				},
				loadUnFu: false,
				loadFu: false,
				wrapperHeight: 0,
				clickNum: 0,
				agentCode: utils.cache.get('personsal').agentCode,
				productArray: [],
				showList: 1,
				selectInfo: {
					applyCode: '',
					productCode: '',
					holderName: '',
					policyCode: '',
				},
				unFulfilList: [],
				fulfilList: [],
				unFuEmpty: false,
				fuEmpty: false,
				problemApplyCode: '', //问题件投保单号
				problemOrderId: '', //问题件orderId
				hintContent: '', //问题件修改
				where: '',
				infoId: '',
			}
		},
		created() {
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.infoId) {
					this.infoId = queryParams.infoId;
				}
				if(queryParams.where) {
					this.where = queryParams.where;
				}
			}
			console.log(this.infoId)
			this.getOrderList(1, this.sreach.unFulfilListNum, this.infoId)
			this.getOrderList(2, this.sreach.fulfilListNum, this.infoId)
			this.productLists()
		},
		filters: {
			getStatus(item) {
				let status
				if(item.status == '0') { //核保中
					status = '人核'
				} else if(item.status == 1) { //待转账
					if(item.pkState == '0') {
						status = '未支付'
					} else if(item.pkState == 1) {
						status = '支付成功'
					} else if(item.pkState == 2) {
						status = '支付中'
					} else if(item.pkState == 3) {
						status = '支付失败'
					} else if(item.pkState == 5) {
						status = '转批扣'
					} else {
						status = '核保成功'
					}
				} else if(item.status == 2) { //待承保
					status = '支付成功'
				} else if(item.status == 3) { //承保
					let restate = ''
					if(item.restate == 0) {
						if(item.trafficinsno == 1) {
							restate = '回访成功'
						} else if(item.trafficinsno == 2) {
							restate = '回访问题件'
						} else if(item.trafficinsno == 3) {
							restate = '回访不成功'
						}else {
							restate = '待回访'
						}
					}
					if(item.isReceiptFlag == '0') {//承保未回执
						status = '承保成功  '+ restate
					} else if(item.isReceiptFlag == 1) {//承保已回执
						status = '已回执  '+ restate
					} else {//isReceiptFlag服务端遇空必须返0,按照承保未回执处理
						status = '承保成功  '+ restate
					}
				} else if(item.status == 4) { //拒保
					status = '拒保'
				} else if(item.status == 5) { //延期
					status = '延期'
				} else if(item.status == 6) { //撤件
					status = '已撤件'
				} else if(item.status == -1) { //进入问题件
					if(item.problemStatue == 90) { //投保初始化状态
						status = '投保初始化状态'
					} else if(item.problemStatue == 91) { //问题件
						status = '问题件'
					} else if(item.problemStatue == 92) {
						status = '待回复'
					} else if(item.problemStatue == 93) {
						status = '已回复'
					}
				} else if(item.status == 16) {
					status = '影像匹配中'
				} else if(item.status == 17) {
					status = '等待核保'
				} else if(item.status == 18) {
					status = '下发核保需求'
				} else if(item.status == 19) {
					status = '下发新契约问题件'
				} else if(item.status == 80) { //规则校验失败
					status = '投保初始化状态'
				} else if(item.status == 81) { //规则校验成功
					status = '投保校验失败'
				} else if(item.status == 82) { //保费试算失败
					status = '投保校验成功'
				} else if(item.status == 83) { //保费试算成功
					status = '试算失败'
				} else if(item.status == 84) { //核保失败
					status = '核保失败'
				}
				return status
			},
		},
		watch: {
			showSelect(val) {
				if(!val) {
					this.clearInput()
				}
			},
		},
		methods: {
			showSea() {
				this.showSelect = true
			},
			goTo() {
				if(this.where == 1) {
					this.go('/customer/detail?infoId=' + this.infoId)
				} else {
					this.go('/home')
				}
			},
			handleBottomChange(status) {
				this.bottomStatus = status
				this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
			},
			loadBottom() {
				if(this.showList == 1) {
					if(!this.unFuEmpty) {
						this.sreach.unFulfilListNum++
							this.getOrderList(1, this.sreach.unFulfilListNum, this.infoId)
						setTimeout(() => {
							this.loadUnFu = true
							this.$refs.loadmoreUnFu.onBottomLoaded()
						}, 1500)
						setTimeout(() => {
							this.loadUnFu = false
							this.$refs.loadmoreUnFu.onBottomLoaded()
						}, 2500)
					} else {
						this.loadUnFu = true
						this.$refs.loadmoreUnFu.onBottomLoaded()
					}
				} else if(this.showList == 2) {
					if(!this.fuEmpty) {
						this.sreach.fulfilListNum++
							this.getOrderList(2, this.sreach.fulfilListNum, this.infoId)
						setTimeout(() => {
							this.loadFu = true
							this.$refs.loadmoreFu.onBottomLoaded()
						}, 1500)
						setTimeout(() => {
							this.loadFu = false
							this.$refs.loadmoreFu.onBottomLoaded()
						}, 2500)
					} else {
						this.loadFu = true
						this.$refs.loadmoreFu.onBottomLoaded()
					}
				}
			},
			showToast(message) {
				Toast({
					message: message,
					position: 'bottom',
					duration: 1500
				})
			},
			changeShow(index) {
				this.showList = index
				if(index == 2 && this.clickNum == 0) {
					this.clickNum = 1
					//this.getOrderList(2, this.sreach.fulfilListNum)
				}
			},
			clearInput() {
				this.selectInfo.applyCode = ''
				this.selectInfo.productCode = ''
				this.selectInfo.holderName = ''
				this.selectInfo.policyCode = ''
			},
			productLists() {
				let requ = {
					"personsal": {
						"agentCode": utils.cache.get('personsal').agentCode,
						"channel": utils.cache.get('channel')
					}
				}
				utils.http.postFast('MOPRODUCTLIST', requ, (body) => {
					this.productArray = this.productArray.concat(body.personsal.productList1, body.personsal.productList2, body.personsal.productList3, body.personsal.productList4)
				})
			},
			getOrderList(index, value, infoId) {
				let requ = {
					"order": {
						"agentCode": utils.cache.get('personsal').agentCode,
						"docType": String(index),
						"num": String(value),
						"infoId": String(infoId)
					}
				}
				utils.http.post('MOPOLICYLIST', requ).then(response => {
					console.log('===>获取列表及返回', index, value, response)
					if(response.data.header.responseCode != '0') {
						alert_n22.alert("提示", response.data.header.errorMessage, "确定")
					} else {
						if(index == 1) {
							if(response.data.response.order.length < 10) {
								this.unFuEmpty = true
							}
							let arr = response.data.response.order
							if(arr.length != 0) {
								let applyCodeList = []
								arr.forEach(item => {
									if(item.applyCode != '') {
										applyCodeList.push({
											'applyCode': item.applyCode
										})
									}
								})
								let requestParam = {
									"order": {
										"agentCode": utils.cache.get('personsal').agentCode,
										"applyCodeList": applyCodeList
									}
								}
								utils.http.post('MOPOLICYSTATUE', requestParam).then(response => {
									if(response.data.header.responseCode != '0') {
										alert_n22.alert("提示", response.data.header.errorMessage, "确定")
									} else {
										let newOrderList = response.data.response.order
										newOrderList.forEach(item => {
											arr.forEach(order => {
												if(order.applyCode == item.prtNo) {
													order.status = item.state
												}
											})
										})
									}
								})
							}
							this.unFulfilList = this.unFulfilList.concat(arr)
							if(this.unFulfilList.length == 0) {
								alert_n22.alert("提示", "暂无数据", "确定")
							}
							console.log('===>未完成列表', this.unFulfilList)
						} else if(index == 2) {
							this.fulfilList = this.fulfilList.concat(response.data.response.order)
							if(response.data.response.order.length < 10) {
								this.fuEmpty = true
							}
							console.log('===>已完成列表', this.fulfilList)
						}
					}
				}).catch(error => {})
			},
			selectPolicy() {
				let requ
				if(this.showList == 1) {
					requ = {
						"order": {
							"agentCode": utils.cache.get('personsal').agentCode,
							"docType": '1',
							"applyCode": this.selectInfo.applyCode,
							"productCode": this.selectInfo.productCode,
							"holderName": this.selectInfo.holderName,
						}
					}
				} else {
					requ = {
						"order": {
							"agentCode": utils.cache.get('personsal').agentCode,
							"docType": '2',
							"applyCode": this.selectInfo.policyCode,
							"productCode": this.selectInfo.productCode,
							"holderName": this.selectInfo.holderName,
						}
					}
				}
				utils.http.post('MOPOLICYLIST', requ).then(response => {
					this.showSelect = false
					this.clearInput()
					this.loadUnFu = true
					if(response.data.header.responseCode != '0') {
						alert_n22.alert("提示", response.data.header.errorMessage, "确定")
					} else {
						if(this.showList == 1) {
							if(response.data.response.order.length == 0) {
								alert_n22.alert("提示", '未查到该订单', "确定")
							} else {
								this.unFulfilList = response.data.response.order
							}
						} else {
							if(response.data.response.order.length == 0) {
								alert_n22.alert("提示", '未查到该订单', "确定")
							} else {
								this.fulfilList = response.data.response.order
							}
						}
					}
				}).catch(error => {})
			},
			goFillout(item) {
				console.log('===>继续填写', item)
				let requestParam = {
					"policy": {
						"substepNo": "",
						"orderCode": item.orderId,
						"stepNo": '0'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requestParam, (body) => {
					let substepNo = body.policy.substepNo
					console.log('===>继续填写返回 当前步数', body.policy.mainRiskCode, substepNo, body.policy.smartStepNo)
					utils.cache.set('orderCode', body.policy.orderCode)
					utils.cache.set('productCode', body.policy.mainRiskCode)
					utils.cache.set('productCodeDetail', body.policy.mainRiskCode)
					/*
					 * 试算节点.drawMode = products[i].getYears
					 * 试算节点.premium = products[i].prem
					 * 试算节点.amount = products[i].amnt
					 * 试算节点.drawFreq = products[i].getDutyKind
					 * 试算节点.drawAge = products[i].getYear
					 * 试算节点.isAutoXubao = products[i].isAutoXubao
					 * 试算节点.dividend = products[i].bonusGetMode
					 * 试算节点.automatic = products[i].autoPayFlag
					 * 试算节点.survival = products[i].survival.substring(1)
					 * 试算节点.rank = products[i].rank
					 * 试算节点.addList = products[i].addList
					 * 试算节点.drawlist = products[i].drawlist
					 * 试算节点.productName = products[i].prodName.split('计划')[0]  //  HMT039  AAT069
					 */
					if(body.policy.navigationList.length == 0){
						this.$router.push({
							name: "product_details_page",
							params: {
								planId: item.orderId,
								step: '1'
							}
						})
					}else if(substepNo == 7) {
						let requ = {
							"policy": {
								"agentCode": utils.cache.get('personsal').agentCode,
								"activityid": "",
								"orderCode": item.orderId
							}
						}
						utils.http.postFast('MOORDERDEAL', requ, (body) => {
							console.log('===>请求投保', body)
							if(body.policy.resultCode == '0') {
								this.$router.push({
									name: 'electronics_policy_page',
									params: {
										planId: item.orderId,
										applyCode: body.policy.applyCode
									}
								})
							} else if(body.policy.resultCode == '1') {
								if(body.policy.problemFlag == '1') { //问题件
									this.problemApplyCode = body.policy.applyCode
									this.problemOrderId = item.orderId
									this.hintContent = body.policy.applyCode + '\n' + body.policy.resultMessage + '\n是否进行修改?'
									this.$refs.btns.showMOdal()
								} else {
									alert_n22.alert("提示", body.policy.resultMessage, "确定")
								}
							} else if(body.policy.resultCode == '2') {
								alert_n22.confirm('提示', body.policy.resultMessage + ",请修改后继续操作!", '确定', '', (flag) => {
									this.$router.push({
										name: 'product_details_page',
										params: {
											planId: item.orderId,
											step: '1'
										}
									})
								})
							} else {
								alert_n22.alert("提示", body.policy.resultMessage, "确定")
							}
						})
					} else {
						let nextPage = {}
						body.policy.navigationList.forEach(tpl => {
							if(substepNo == 4 && tpl.step == substepNo && tpl.seqNumber == body.policy.smartStep) {
								nextPage = tpl
							} else if(tpl.step == substepNo) {
								nextPage = tpl
							}
						})
						console.log('nextPage===>', nextPage, item.orderId)
						if(substepNo == 4) {
							this.$router.push({
								name: nextPage.name,
								params: {
									planId: item.orderId,
									insNo: nextPage.seqNumber,
									step: '1'
								}
							})
						} else if(substepNo == 1 || substepNo == 3) {
							this.$router.push({
								name: nextPage.name,
								params: {
									planId: item.orderId,
									step: '1'
								}
							})
						} else {
							this.$router.push({
								name: nextPage.name,
								params: {
									planId: item.orderId
								}
							})
						}
					}
				})
			},
			goDelete(item, index) {
				alert_n22.confirm('提示', '确认是否删除？', '确定', '取消', (flag) => {
					let requestParam = {
						"policy": {
							"orderCode": item.orderId
						}
					}
					utils.http.postFast('MODELPOLICY', requestParam, (body) => {
						alert_n22.alert("提示", body.policy.resultMsg, "确定")
						if(body.policy.resultCode == 0) {
							this.unFulfilList.splice(index, 1)
							if(this.unFulfilList.length == 0) {
								this.getOrderList(1, 1, this.infoId)
							}
						}
					})
				})
			},
			getStatusRecall(item) {
				let requestParam = {
					"order": {
						"agentCode": item.agentCode,
						"applyCodeList": [{
							"applyCode": item.applyCode
						}]
					}
				}
				utils.http.post('MOPOLICYSTATUE', requestParam).then(response => {
					if(response.data.header.responseCode != '0') {
						alert_n22.alert("提示", response.data.header.errorMessage, "确定")
					} else {
						if(response.data.response.order[0].state == item.status) {
							this.goRecall(item)
						} else {
							item.status = response.data.response.order[0].state
						}
					}
				})
			},
			goDetail(item) {
				this.$router.push({
					name: 'orderDetail',
					params: {
						applyCode: item.applyCode,
						agentCode: item.agentCode
					}
				})
			},
			detonate() {
				this.problemmodify('0')
			},
			cancel() {
				this.problemmodify('1')
			},
			problemmodify(tag) {
				utils.cache.set('yesOrNo', tag)
				if(tag == '0') {
					this.$router.push({
						name: 'product_details_page',
						params: {
							planId: this.problemOrderId,
							step: '1'
						}
					})
				} else if(tag == '1') {
					this.$router.push({
						name: 'electronics_policy_page',
						params: {
							planId: this.problemOrderId,
							applyCode: this.problemApplyCode
						}
					})
				}
			},
			statusChange(item, index) {
				if(item.pkState == '0' || item.pkState == 2 || item.pkState == 3) {
					console.log('===========', item)
					let requ = {
						"policy": {
							"agentCode": item.agentCode,
							"applyCode": item.applyCode,
							"serialNo": ""
						}
					}
					utils.http.post('MOPAYSTATUEACCEPT', requ).then(response => {
						if(response.data.header.responseCode != '0') {
							alert_n22.alert("提示", response.data.header.errorMessage, "确定")
						} else {
							//this.showToast('查询成功')
							//this.statusChange(item)
							let requestParam = {
								"order": {
									"agentCode": item.agentCode,
									"applyCodeList": [{
										"applyCode": item.applyCode
									}]
								}
							}
							utils.http.post('MOPOLICYSTATUE', requestParam).then(response => {
								if(response.data.header.responseCode != '0') {
									alert_n22.alert("提示", response.data.header.errorMessage, "确定")
								} else {
									this.showToast('查询成功')
									let result = response.data.response.order
									item.status = result[0].state
									item.problemStatue = result[0].problemState
									if(item.status == 1) {
										item.pkState = result[0].payState
									}
								}
							})
						}
					})
				} else {
					if(item.applyCode != '') {
						let requestParam = {
							"order": {
								"agentCode": item.agentCode,
								"applyCodeList": [{
									"applyCode": item.applyCode
								}]
							}
						}
						utils.http.post('MOPOLICYSTATUE', requestParam).then(response => {
							if(response.data.header.responseCode != '0') {
								alert_n22.alert("提示", response.data.header.errorMessage, "确定")
							} else {
								this.showToast('查询成功')
								let result = response.data.response.order
								item.status = result[0].state
								item.problemStatue = result[0].problemState
								if(item.status == 1) {
									item.pkState = result[0].payState
								}
							}
						})
					}
				}
			},
			// 跳转支付
			goPay(item) {
				this.$router.push({
					name: 'pay',
					params: {
						orderId: item.orderId,
						applyCode: item.applyCode,
						agentCode: this.agentCode,
						holderName: item.holderName,
						idCard: item.idCard
					}
				});
			},
			// 跳转回执回销
			goReceipt(item) {
				this.$router.push({
					name: 'receipt',
					params: {
						orderId: item.orderId,
						applyCode: item.applyCode
					}
				});
			},
			//撤单
			goRecall(item) {
				utils.cache.removeItem("recallInfo")
				this.$router.push({
					name: 'recall',
					params: {
						orderId: item.orderId,
						applyCode: item.applyCode
					}
				})
			},
			//问题件回复
			goProblem(item) {
				utils.cache.removeItem("content1")
				utils.cache.removeItem("content2")
				utils.cache.removeItem("content3")
				utils.cache.removeItem("content4")
				this.$router.push({
					name: 'problem',
					params: {
						orderId: item.orderId,
						applyCode: item.applyCode
					}
				})
			},
			//详情查询核心
			getStatausDetail(item) {
				let requestParam = {
					"order": {
						"agentCode": this.agentCode,
						"applyCodeList": [{
							"applyCode": item.applyCode
						}]
					}
				}
				console.log('状态请求参数', requestParam)
				utils.http.post('MOPOLICYSTATUE', requestParam).then(response => {
					let projectHead = response.data.header
					if(projectHead.responseCode != 0) {
						this.$refs.showalert.showMOdal(response.data.header.errorMessage)
					} else {
						let result = response.data.response.order
						console.log('核心状态返回', result)
						if(result[0].state == item.status) {
							this.goDetail(item);
						} else {
							item.status = result[0].state;
						}
					}
				})
			},
			// 支付查询核心
			getStatusPay(item) {
				if(item.applyCode != "" && item.applyCode != "") {
					let requ = {
						"policy": {
							"agentCode": item.agentCode,
							"applyCode": item.applyCode,
							"serialNo": ""
						}
					}
					utils.http.post('MOPAYSTATUEACCEPT', requ).then(response => {
						console.log(response)
						if(response.data.header.responseCode != 0) {
							this.$refs.showalert.showMOdal(response.data.header.errorMessage)
						} else {
							let payStatus = response.data.response.policy.payStatus
							console.log(payStatus)
							if(item.applyCode != "") {
								let requestParam = {
									"order": {
										"agentCode": this.agentCode,
										"applyCodeList": [{
											"applyCode": item.applyCode
										}]
									}
								}
								utils.http.post('MOPOLICYSTATUE', requestParam).then(response => {
									if(response.data.header.responseCode != 0) {
										this.$refs.showalert.showMOdal(response.data.header.errorMessage)
									} else if(response.data.response.order[0].state == 1 && payStatus != 5 && payStatus != 2) {
										this.goPay(item)
									} else {
										this.statusChange(item)
									}
								})
							}
						}
					})
				}
			},
			//回执查询核心
			getStatusReceipt(item) {
				let requestParam = {
					"order": {
						"agentCode": this.agentCode,
						"applyCodeList": [{
							"applyCode": item.applyCode
						}]
					}
				}
				utils.http.post('MOPOLICYSTATUE', requestParam).then(response => {
					let projectHead = response.data.header
					if(projectHead.responseCode != 0) {
						this.$refs.showalert.showMOdal(response.data.header.errorMessage)
					} else {
						let result = response.data.response.order
						console.log('回执核心返回', result)
						if(result[0].state == item.status) {
							this.goReceipt(item)
						} else {
							item.status = result[0].state;
						}
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped type="text/css">
	input {
		text-align: right !important;
	}
	
	.fa-search {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 20px;
		color:#FDB92C;
	}
	
	.main-contents {
		background: #f5f5f5;
		bottom: 0 !important;
		font-size: 14px;
		.list-btn {
			width: 100%;
			display: flex;
			justify-content: space-around;
			border-bottom: 1px solid #efefef;
			background: #fff;
			p {
				font-size: 16px;
				padding: 15px 0;
				border-bottom: 2px solid transparent;
			}
			p.show {
				color: #F4A200;
				border-bottom-color: #F4A200;
			}
		}
		.content {
			width: 100%;
			box-sizing: border-box;
			.show-list {
				.empty {
					line-height: 100px;
					text-align: center;
				}
				.content {
					width: 100%;
					background: #fff;
					margin-bottom: 10px;
					div {
						border-bottom: 1px solid #efefef;
						padding: 0 10px;
					}
					.list_top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 45px;
						.fa-list-ol {
							color: #b6c5cc;
						}
						p {
							line-height: 35px;
						}
						p+p {
							color: #51a2f5;
						}
					}
					.list_middle {
						padding: 10px;
						p {
							display: flex;
							justify-content: space-between;
							line-height: 30px;
							span {
								color: #666;
							}
						}
					}
					.list_bottom {
						display: flex;
						justify-content: flex-end;
						align-items: center;
						height: 60px;
						span {
							background: #FDB92C;
							color: #fff;
							margin-left: 10px;
							font-size: 14px;
							width: 84px;
							height: 34px;
							display: flex;
							justify-content: space-around;
							align-items: center;
							border-radius: 3px;
						}
					}
				}
				.finish {
					height: 30px;
					line-height: 30px;
					text-align: center;
				}
			}
		}
	}
	
	.select_search {
		width: 100%;
		.eject-contents {
			width: 100%;
			background: #fff;
			position: absolute;
			top: 48px;
			font-size: 14px;
			input {
				text-align: right !important;
			}
			.search_content,
			.search_footer {
				width: 100%;
				box-sizing: border-box;
				line-height: 42px;
			}
			.search_content {
				padding: 0 15px;
				border-bottom: 1px solid #ddd;
				div.flex {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #ddd;
					padding-right: 5px;
					p {
						width: 30%;
						font-size: 16px;
						color: #333;
					}
					p+input {
						width: 68%;
						text-align: right;
						font-size: 14px;
						color: #999;
					}
					p+label {
						width: 60%;
						display: flex;
						justify-content: flex-end;
						align-items: center;
					}
					.fa-angle-down {
						margin-left: 5px;
					}
					.mbsc-control-ev {
						text-align: right !important;
					}
					.right{
						position:absolute;
						right: -30%;
					}
				}
				div:last-child {
					border-bottom: none;
				}
			}
			.search_footer {
				display: flex;
				justify-content: space-between;
				p {
					text-align: center;
					width: 50%;
				}
				p+p {
					background: #F4A200;
					color: #fff;
				}
			}
		}
	}
	.main-contents {
		bottom: 0 !important;
		-webkit-overflow-scrolling: auto !important;
	}
</style>