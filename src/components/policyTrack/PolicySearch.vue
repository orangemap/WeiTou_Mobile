<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="detailBack">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="policySearch">
			<!--时间查询-->
			<div>
				<div class='flexs sel-user-sel' v-show="false">
					<date-picker v-model="startDay" style="box-sizing: border-box;border:1px solid #ccc;border-radius: 5px;height:2rem;width:30%;padding-left:5px;line-height: 2rem"></date-picker>
					<p style='width:20px;'>至</p>
					<date-picker v-model="endDay" style="fbox-sizing: border-box;border:1px solid #ccc;border-radius: 5px;height:2rem;width:30%;padding-left:5px;line-height: 2rem"></date-picker>
					<div class="btn-sel" @click="timeSear()">查询</div>
				</div>
				<div class='flexs sel-user-sel'>
					<input type="text" placeholder="请输入姓名" v-model="customName"/>
				</div>
				<div style="border-bottom: 4px solid #ccc;" v-for='items in searchPolicyList' v-if="items.status == 0">
					<div style="border-bottom: 1px dashed #BBB;line-height: 2.5rem;padding: 0 2%;">
						<span>{{items.contNo}}</span>
						<span @click="f5Status(items)" style="float: right;color: #FEB101;font-weight: bold;">{{items.status | policyStaue}}</span>
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
							<span v-if="items.status == 0">投保日期：{{items.cValiDate}}</span>
							<span v-show="items.status == 0" @click="policyInformations(items.prtNo,items.contNo)" style="border: 1px solid #FEB101;background: #FEB101;padding: 0% 1%;border-radius:3px;color: #fff;">详 情</span>
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
	import { Toast } from 'mint-ui'
	import datePicker from '@/components/common/DatePicker.vue'
	import Alert from '@/components/policy/common/alert'
	import "../policy/css/base.css";
	const fillZero = value => {
		if(('' + value).length == 1) {
			value = '0' + value
		}
		return value
	}
	export default {
		name: 'policySearch',
		components: {
			Headerbtns,
			datePicker,
			Alert
		},
		data() {
			let date = new Date()
			let month = date.getMonth() + 1
			return {
				page_title: '投保进度',
				policyList: [],
				holderAge: '',
				customerList: '',
				searchVal: '',
				expand: 'static/img/comprehensive/bottom.png',
				customName: '',
				startDay: date.getFullYear() - 4 + '-' + fillZero(month) + '-' + fillZero(date.getDate()),
				endDay: date.getFullYear() + '-' + fillZero(month) + '-' + fillZero(date.getDate()),
			}
		},
		computed: {
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
//				return this.customerList;
//			},
			searchPolicyList: function() {
				let customName = this.customName;
				if(customName) {
					return this.policyList.filter(function(product) {
						return Object.keys(product).some(function(key) {
							return String(product["appntName"]).toLowerCase().indexOf(customName) > -1
						})
					})
				}
				return this.policyList;
			},
		},
		mounted() {
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.policySearch'))
			$('.policySearch').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
			
			this.timeSear()
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			f5Status(items){
				let requestParam = {
	                "order": {
	                    "agentCode": utils.cache.get("personsal").agentCode,
	                    "applyCodeList": [
	                        { "applyCode": items.policyCode}
	                    ]
	                }
	            }
				utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
					let projectHead = response.data.header
					if(projectHead.responseCode != 0){
						alert_n22.confirm('提示', '保单状态查询异常!', '确定','', (flag) => {
						})
					}else{
						let instance =Toast({
							message:'查询成功',
							position:'bottom',
							duration:1000
						}); 
						setTimeout(() => {
							instance.close()
						}, 1000)
					}
				})
			},
			detailBack() {
				let channel = utils.cache.get("personsal").channel
		  		if(channel == '02') {
					this.$router.push('/comprehensiveYinbao/comprehensiveInfo')
				}  else if(channel == '06') {
					this.$router.push('/comprehensiveXuqi/comprehensiveInfo')
				} else {
					this.$router.push('/comprehensiveGexian/comprehensiveInfo')
				}
			},
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			policyInformations(tpl, tpp) {
				this.$router.push({
					name: 'policyTrack',
					params: {
						policyCode:tpl
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
							"effectiveEndDate": this.endDay,
							"identifying":"Y"
						},
						modelName: "conservationService",
						methodName: "policyList"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						//					console.log()
						if(!body.data.policyList.policyInfoList) {
							//						console.log('=========')
							this.policyList = body.data.policyList
							this.showModals("未查到相关数据");
						} else {
							if(body.data.policyList.policyInfoList.length != 0) {
								let item = body.data.policyList.policyInfoList
//								for(let i=0;i<item.length;i++){
//									if(item[i].status == '0'){
//										this.policyList.push(item)
//									}
//								}
								this.policyList = body.data.policyList.policyInfoList
//								console.log(this.policyList)
							}
						}
					})
				}

			},
		},
	}
</script>

<style lang="scss" scoped type="text/css">
	.policySearch .fa {
		color: #FDB92C;
	}
	
	.policySearch .fa-angle-left {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	
	.policySearch p,
	.policySearch span,
	.policySearch div {
		font-size: 0.8rem;
		margin: 0;
	}
	
	.policySearch .page_content {
		padding-top: 20px;
		background: #F1F1F1;
	}
	
	.policySearch .text-active {
		background: #FEB101;
		color: #000;
	}
	
	.policySearch .Accout-data p {
		display: flex;
		align-items: center;
	}
	
	.policySearch .sel-user-sel {
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
			width: 100%;
			padding-left: 5px;
		}
	}
	
	.policySearch .user-list {
		padding: 0 0.5rem;
		border-bottom: 4px solid #ccc;
	}
	
	.policySearch .flexs {
		display: flex;
		align-items: center;
	}
	
	.policySearch .btn-sel {
		background: #FEB101;
		color: #fff;
		border-radius: 5px;
		outline: none;
		border: none;
		height: 2rem;
		line-height: 2rem;
		width: 18%;
		text-align: center;
	}
	
	.policySearch .flex-center {
		justify-content: space-between;
	}
	.policySearch::-webkit-scrollbar {
	display:none
}
input {
		background-color: white !important;
	}
	.fa{
		color: #FDB92C;
	} 
</style>