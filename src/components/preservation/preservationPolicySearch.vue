<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="detailBack">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="main-contents">
			<div class="page_content">
				<div style="border: 2px solid #FEB101;border-radius: 5px;width: 90%;margin: auto;line-height: 1.2rem;">
					<ul style="float: left;width: 50%;" v-for="item in dataList">
						<li style="float: left;width: 100%;text-align: center;padding: 3px 0;" @click="dataShow(item.value)" :class='[item.active?"text-active":" "]'>{{item.name}}</li>
					</ul>
					<div style="clear: both;"></div>
				</div>
			</div>
			<!--客户查询-->
			<div v-show="search">
				<div class='flexs sel-user-sel'>
					<input type="text" placeholder="请输入姓名" v-model="customName"/>
					<button class='btn-sel' @click="saveSearch()">查询</button>
				</div>
				<div v-for="items in customerList" v-show="customerList!=''">
					<div class="user-list">
						<div class='flexs flex-center' style='height:2.8rem;'>
							<img :src="[items.customerSex==0?nanUrl:nvUrl]" style='width:1.5rem;height:1.5rem'>
							<p style="margin-left: -5%;width: 3rem;">{{items.customerName}}</p>
							<p>{{items.holderAge}}岁</p>
							<div class='flexs flex-center' style='width:38%'>
								<p>{{items.customerBirthday}}</p>
								<img :src="items.imgUrl" style='width:0.8rem;height:0.8rem' @click='toggleShow(items,items.id,items.customerNo)'>
							</div>
						</div>
					</div>
					<div>
						<div v-for="itt in items.list" v-show="items.list.length>0">
							<!--<div v-for="item in itt.insuredList">-->
								<div style="border-bottom: 5px solid #ccc;">
									<div style="border-bottom: 1px dashed #BBB;line-height: 2.5rem;padding: 0 2%;">
										<span>{{itt.contNo}}</span>
										<span style="float: right;color: #FEB101;font-weight: bold;">{{itt.state | policyStaue}}</span>
									</div>
									<div style="border-bottom: 1px dashed #BBB;padding: 2% 2%;">
										<div style="line-height: 1.5rem;">
											<span>投保险种：{{itt.mainRiskName}}</span>
										</div>
										<div style="line-height: 1.5rem;">
											<span style="margin-right: 10%;">投保人：{{items.customerName}}</span>
											<span>被保人：{{itt.insuredList[0].insuredName}}</span>
											<span v-if="itt.insuredList.length>1">等</span>
										</div>
									</div>
									<div style="line-height: 1.5rem;padding: 2%;">
										<div class='flexs flex-center' style="white-space:nowrap;">
											<span>生效日期：{{itt.cValidate}}</span>
											<span style="border: 1px solid #FEB101;background: #FEB101;padding: 0% 1%;border-radius:3px;margin-left: 11%;color: #fff;" @click="goToSearch(itt.contNo,items.customerNo)">保全工单查询</span>
											<span @click="policyInformation(itt.contNo)" style="border: 1px solid #FEB101;background: #FEB101;padding: 0% 1%;border-radius:3px;color: #fff;margin-left: 4px;">详情</span>
										</div>
									</div>
								</div>
							<!--</div>-->
						</div>
					</div>

				</div>
			</div>
			<!--时间查询-->
			<div v-show="!search">
				<div class='flexs sel-user-sel'>
					<date-picker v-model="startDay" style="box-sizing: border-box;border:1px solid #ccc;border-radius: 5px;height:2rem;width:34%;padding-left:5px;line-height: 2rem"></date-picker>
					<p style='width:20px;'>至</p>
					<date-picker v-model="endDay" style="box-sizing: border-box;border:1px solid #ccc;border-radius: 5px;height:2rem;width:34%;padding-left:5px;line-height: 2rem"></date-picker>
					<div class="btn-sel" @click="timeSear()">查询</div>
				</div>
				<div style="border-bottom: 4px solid #ccc;" v-for='items in policyList' v-if="policyInfoList!=''">
					<div style="border-bottom: 1px dashed #BBB;line-height: 2.5rem;padding: 0 2%;">
						<span>{{items.contNo}}</span>
						<span style="float: right;color: #FEB101;font-weight: bold;">{{items.status | policyStaue}}</span>
					</div>
					<div style="border-bottom: 1px dashed #BBB;padding: 2% 2%;">
						<div style="line-height: 1.5rem;">
							<span>投保险种：{{items.mainRiskName}}</span>
						</div>
						<div style="line-height: 1.5rem;">
							<span style="margin-right: 10%;">投保人：{{items.appntName}}</span>
							<span>被保人：{{items.insuredName}}</span>
						</div>
					</div>
					<div style="line-height: 1.5rem;padding: 2%;">
						<div class='flexs flex-center' style="white-space:nowrap;">
							<span>生效日期：{{items.cValiDate}}</span>
							<span style="border: 1px solid #FEB101;background: #FEB101;padding: 0% 1%;border-radius:3px;margin-left: 11%;color: #fff;" @click="goToTimeSearch(items.contNo)">保全工单查询</span>
							<span @click="policyInformations(items.prtNo,items.contNo)" style="border: 1px solid #FEB101;background: #FEB101;padding: 0% 1%;border-radius:3px;color: #fff;margin-left: 4px;">详情</span>
						</div>

					</div>
				</div>
			</div>
			<Alert ref="showalert"></Alert>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/policy/common/Header'
	import { MessageBox } from 'mint-ui'
	import datePicker from '@/components/common/DatePicker.vue'
	import Alert from '@/components/policy/common/alert'
	import { mapState, mapMutations } from 'vuex'
	import store from '@/vuex/preservation/index.js'
	import "../policy/css/base.css";
	const fillZero = value => {
		if(('' + value).length == 1) {
			value = '0' + value
		}
		return value
	}
	export default {
		name: 'preservationPolicySearch',
		components: {
			Headerbtns,
			datePicker,
			Alert
		},
		data() {
			let date = new Date()
			let month = date.getMonth() + 1
			
			let lw = new Date(date - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
			let lastY = lw.getFullYear();
			let lastM = lw.getMonth()+1;
			let lastD = lw.getDate();
			return {
				page_title: '保单查询',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				dataList: [{
					name: "根据客户查询",
					value: "0",
					active: true
				}, {
					name: "根据时间查询",
					value: "1",
					active: false
				}, ],
				search: true,
				policyList: '',
				holderAge: '',
				customerList: '',
				searchVal: '',
//				expand: 'static/img/comprehensive/bottom.png',
				expand: false,
				customName: '',
				startDay: lastY+"-"+(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD),//三十天之前日期,
				endDay: date.getFullYear() + '-' + fillZero(month) + '-' + fillZero(date.getDate()),
				policyInfoList:'',
				applyContList:'',
			}
		},
		computed: {
			...mapState(['policyData']),
			//模糊查询
//			searchData: function() {
//				let searchVal = this.searchVal;
//				if(searchVal) {
//					return this.customerList.filter(function(product) {
//						return Object.keys(product).some(function(key) {
//							return String(product[key]).toLowerCase().indexOf(searchVal) > -1
//						})
//					})
//				}
//				
//				return this.customerList;
//			}
		},
		store,
		mounted() {
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
//			if(this.search == true) {
//				this.customSearch()
//			}
			this.SetpolicyData({
				contNo: '',
				prtNo: '',
				custNo: '',
				holder: '',
				insurent: [],
				bnfList: [],
				ContInfo:'',
			})
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			...mapMutations(['SetpolicyData']),
			right() {
				this.stepSave()
			},
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/home')
			},
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			dataShow(value) {
				//				console.log(value)
				let a = ''
				this.dataList.forEach((item) => {
					item.active = false
					if(value === item.value) {
						//						console.log('+++', item.value)
						item.active = true
						this.search = false
						a = 1
					} else {
						//						console.log(item.value)
						this.search = true
						a = 2
					}

				})
				//				console.log(a)
				if(a == 1) {
					this.timeSearch()
				} else {
//					this.customSearch()
				}
			},
			policyInformation(tpp) {
				//				console.log(tpp)
				this.policyData.contNo = tpp
				this.SetpolicyData(this.policyData)
				this.go('/preservation/preservationPolicyDetail')
			},
			policyInformations(tpl, tpp) {
				//				console.log(tpl,tpp)
				this.policyData.contNo = tpp
				this.policyData.prtNo = tpl
				this.SetpolicyData(this.policyData)
				this.go('/preservation/preservationPolicyDetail')
			},
			listDetail(customerNo){
				let requ = {
					data: {
						clientName: '',
						agentCode: utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
						customerNo:customerNo,
						
					},
					modelName: "conservationService",
					methodName: "clientPolicyList"
				}
				utils.http.postFast('CusbusinessService', requ, (body) => {
					if(!body.data.clientPolicyList.customerList) {
						//						console.log('++++++')
						this.customerList = body.data.clientPolicyList.customerList
						this.showModals("未查到相关数据");
					} else {
						if(body.data.clientPolicyList.customerList.length != 0) {
							this.customerList.forEach((item,index)=>{
								if(item.customerNo==customerNo){
									item.list=body.data.clientPolicyList.customerList[0].applyContList
								}
								this.$set(this.customerList,index,item)
							})
							console.log(this.customerList)
						}
					}

				})
			},
			saveSearch() {
				this.customSearch()
			},
			customSearch(name) {
				//客户查询
				let requ = {
					data: {
						clientName: this.customName,
						agentCode: utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
						customerNo:'',
						
					},
					modelName: "conservationService",
					methodName: "clientPolicyList"
				}
				utils.http.postFast('CusbusinessService', requ, (body) => {
					if(!body.data.clientPolicyList.customerList) {
						//						console.log('++++++')
						this.customerList = body.data.clientPolicyList.customerList
						this.showModals("未查到相关数据");
					} else {
						if(body.data.clientPolicyList.customerList.length != 0) {
							this.customerList = body.data.clientPolicyList.customerList
							for(let i = 0; i < this.customerList.length; i++) {
								this.customerList[i].holderAge = utils.valid.getAge(this.customerList[i].customerBirthday)
								this.customerList[i].imgUrl = 'static/img/comprehensive/bottom.png'
								this.customerList[i].id = i
								this.customerList[i].expand = true
							}
						}
					}

				})
			},
			timeSear() {
				this.timeSearch()
			},
			timeSearch(startDate, endDate) {
				let dateSub = new Date(this.startDay).getTime() - new Date(this.endDay).getTime()
				//				console.log(dateSub)
				if(dateSub > 0) {
					this.showModals("开始时间不能大于结束时间，请重新选择！");
				} else if(dateSub <= 0) {
					let requ = {
						data: {
							"agentCode": utils.cache.get('personsal') ? utils.cache.get('personsal').agentCode : '1100D12336',
							"effectiveStartDate": this.startDay,
							"effectiveEndDate": this.endDay
						},
						modelName: "conservationService",
						methodName: "policyList"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						//					console.log()
						this.policyInfoList=body.data.policyList.policyInfoList
						if(!body.data.policyList.policyInfoList) {
							//						console.log('=========')
							this.policyList = body.data.policyList
							this.showModals("未查到相关数据");
						} else {
							if(body.data.policyList.policyInfoList.length != 0) {
								this.policyList = body.data.policyList.policyInfoList
							}
						}
					})
				}

			},
			toggleShow(items, id,customerNo) {
				//				console.log(items)
				this.customerList[id].expand = !this.customerList[id].expand
				if(items.expand == false) {
					items.imgUrl = 'static/img/comprehensive/top.png'
					//改数组
					console.log(customerNo)
					this.listDetail(customerNo)
				} else if(items.expand == true) {
					items.list=[]
					items.imgUrl = 'static/img/comprehensive/bottom.png'
				}
				this.$set(this.customerList, id, items)
				console.log(this.customerList)
			},
			goToSearch(tpp, tpc) {
				//				this.showModals('该模块暂未开放')
				this.policyData.contNo = tpp
				this.policyData.custNo = tpc
				this.SetpolicyData(this.policyData)
				this.go('/preservation/policySearch?contNo='+tpp)
			},
			goToTimeSearch(tpp) {
				this.policyData.contNo = tpp
				this.SetpolicyData(this.policyData)
				this.go('/preservation/policySearch?contNo='+tpp)
			}
		},
		watch: {

		}
	}
</script>

<style lang="scss" scoped type="text/css">
	.main-contents .fa {
		color:#FDB92C;
	}
	
	.fa-angle-left {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	
	.main-contents p,
	.main-contents span,
	.main-contents div {
		font-size: 0.8rem;
		margin: 0;
	}
	
	.main-contents .page_content {
		padding-top: 20px;
		background: #F1F1F1;
	}
	
	.main-contents .text-active {
		background: #FEB101;
		color: #000;
	}
	
	.main-contents .Accout-data p {
		display: flex;
		align-items: center;
	}
	
	.main-contents .sel-user-sel {
		background: #F1F1F1;
		height: 3rem;
		align-items: center;
		padding: 0 1rem;
		justify-content: space-between;
		input {
			box-sizing: border-box;
			border: 1px solid #ccc;
			border-radius: 5px;
			height: 2rem;
			width: 80%;
			padding-left: 5px;
		}
	}
	
	.main-contents .user-list {
		padding: 0 0.5rem;
		border-bottom: 4px solid #ccc;
	}
	
	.main-contents .flexs {
		display: flex;
		align-items: center;
	}
	
	.main-contents .btn-sel {
		background: #FEB101;
		color: #fff;
		border-radius: 5px;
		outline: none;
		border: none;
		height: 2rem;
		line-height: 2rem;
		width: 16%;
		text-align: center;
	}
	
	.main-contents .flex-center {
		justify-content: space-between;
	}
	.main-contents::-webkit-scrollbar {
	display:none
}
input {
		background-color: white !important;
	}
	.main-contents {
		bottom: 0 !important;
		-webkit-overflow-scrolling: auto !important;
	}
</style>