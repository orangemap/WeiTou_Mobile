<template>
	<div id="main-message">
		<div class="animated zoomIn">
			<div class="bg">
				<img src="../../../assets/img/common/guanai.jpg" v-if="productCode == 'LBT029'"/>
				<img src="../../../assets/img/common/anxinfu.jpg" v-if="productCode == 'NPT006'"/>
			</div>
			<div class="self-message">
				<div class="sex-age">{{holderName}}<span class="age">{{holderBirthday}}周岁</span></div>
				<div class="show-message">
					<ul>
						<li>
							<p>
								<span>年交保费</span>
								<span>{{totalPremium}}</span>
							</p>
							<p>
								<span>基本保险金</span>
								<span>{{amount}}</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="self-message-show"  @click="expand = !expand">
				<div class="top" @click="toggleContent">
					<i class="fa fa-angle-double-up" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand?'rotate(180deg)':''}"></i>
				</div>
				<div v-show="!contentShow" style="height: 5px;background: #FEB101;"></div>
				<div v-show="contentShow" @click="expand = !expand">
					<div class="show-title">
						<!-- <span>投保险种</span>
						<span>基本保险金</span>
						<span>保险期间</span>
						<span>交费期间</span>
						<span>首期保费</span>		 -->			
					</div>
					<div class="show-title-content">
						<p class="title">
							<span>{{names}}</span>
						</p>
						<p class="content_1">
							<span>缴费方式:{{selectedWay_0 || payModeName}}</span>
							<span>交费期限:{{selectedWay_1 || payPeriodName}}</span>
						</p>
						<p class="content_2">
							<span>{{first_amount}}</span>
							<span>{{first_totalPremium}}</span>
						</p>
					</div>
					<div class="show-title-content" v-for="item in fujiaExtraList">
						<p class="title">
							<span>{{item.productName}}</span>
						</p>
						<p class="content_1" v-if="id == ''">
							<span>缴费方式:{{item.payMode}}</span>
							<span>交费期限:{{item.payPeriod}}</span>
						</p>
						<p class="content_1" v-if="id != ''">
							<span>缴费方式:{{payModeName}}</span>
							<span>交费期限:{{payPeriodName}}</span>
						</p>
						<p class="content_2">
							<span>{{item.amount}}</span>
							<span>{{item.premium}}</span>
						</p>
					</div>
				</div>
			</div>
			<!-- 产品特色 -->
			<div class="policy-duty">
				<div class="duty">
					<img src="../../../assets/img/manage/tese_1.jpg">
				</div>
				<div class="detail">
					<div v-for="item in tit">
						<h1 class="title" v-if="item.title != ''">
<!-- 							<i class="fa fa-hand-o-right"
							style="font-size: 25px;color: #E84E40;"></i> -->
							<i class="fa-title">{{item.title}}</i>
						</h1>
						<p>{{item.message}}</p>
					</div>
				</div>
			</div>
			<!-- 利益演示 -->
			<div class="policy-benefit">
				<div class="benefit">
					<img src="../../../assets/img/manage/liyi.jpg"/>
				</div>
				
				<div class="benefit-detail">
					<div class="benefit-con-detail">
						<div class="benefit-con" v-for="(item,index) in itemAttr">
							<p>
								{{item}}:
								<span v-for="(itm,ind) in rangAttr[rangeVal + 1].itemAttr"
								v-if="index == ind"
								style="padding-left:10px;">{{itm}}</span>
							</p>
						</div>
					</div>

					<div class="range">
						<mt-range
						v-model="rangeVal"
						:step="step"
						:bar-height="3"
						:min="minAge"
						:max="maxAge"
						:disabled="btnDisabled">
							<i class="fa fa-minus-square-o"
							slot="start"
							@click="sub"
							style="font-size:35px;padding-right:5px;color:#E84E40;"></i>
							<i class="fa fa-plus-square-o"
							slot="end"
							@click="add"
							style="font-size: 35px;padding-left:5px;color:#E84E40;"></i>
						</mt-range>
						<div>拖动按钮查看不同年龄的保单利益</div>
					</div>
					<div class="benefit-fot-con" v-if="productCode == 'LBT029'">
						<p>重要提示</p>
						<p>1.现金价值演示的是对应年度的保险单年度末数值。生存给付的累积账户演示的是对应年度的保险单周年日数值。</p>
						<p>2.演示使用的生存给付累积利率为年复利3%，实际使用的累积利率根据我们当时公布的值而定，投保人可拨打客服电话查询</p>
						<p>3.演示中的生存给付，其金额是各险种所有以生存为给付条件的保险金总和，包括生存保险金、祝寿金、养老金、满期保险金等。</p>
						<p>4.保费豁免险请参见本建议书“单个险种的保障利益说明”部分或保险条款。</p>
						<p>5.以上保险金给付，均假设保险事故发生在等待期过后。</p>
					</div>
				</div>
			</div>
			<div class="policy-footer">
				<p>温馨提示：以上演示说明为本平台对上述产品的理解便于保险从业人员学习、交流，演示数据仅供参考，请以实际为准。</p>
			</div>
			<div class="policy-two-footer">
				<ul>
					<li @click="jobVisible = !jobVisible"><span>保险条款</span></li>
					<li><span>产品说明书</span></li>
				</ul>
			</div>
			<div @click="jobVisible = !jobVisible">
				<mt-popup v-model="jobVisible" position="bottom" style="width: 100%;height: 100%;overflow-y:auto;">
					<div class="image" v-for="item in allImg" style="float: left;">
						<img :src="item.fileurl" style="width: 100%;height: 100%;display: block;">
					</div>
				</mt-popup>
			</div>
		</div>
	</div>
</template>

<script>
	import accordion from '../../common/Accordion.vue'
	import product from '../../../assets/data/product.json'
	export default{
		name:'insurce',
		components:{accordion},
		props:{
			open:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				contentShow:true,
				expand: this.open,
				rangeVal:0,
				productCode:'',
				names:'',
				holderName:'',//被保人姓名
				jobCode:'',
				policyHolderName:'',
				policyHolderSex:'',
				policyHolderBirthday:'',
				holderSex:'',//被保人性别
				holderBirthday:'',//被保人年龄
				amount:'',//基本保险金额
				totalPremium:'',//保费
				first_totalPremium:'',//主险首期保费
				first_amount:'',//主险基本保费
				timesYear:'',//保单年度
				maxAge:0,
				minAge:0,
				step:1,
				status:false,
				btnDisabled:false,
				itemAttr:[],
				rangAttr:[],
				times:[],
				selectedWay_0:'',
				selectedWay_1:'',
				selectedWay_2:'',
				term:'',
				attCode_1:'',
				tit:null,
				riderList:[],
				jobVisible:false,
				allImg:null,
				productImgUrl:null,
				zhuxianMoney:null,
				showManageData:null,
				fujiaExtraList:[],
				prompt:'',
				writeAmountOrPremium:'',
				payModeName:'',
				payPeriodName:'',
				id:''
			}
		},
		beforeCreate(){
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		},
		mounted(){
			console.log(this.$route.params.id)
			this.id = this.$route.params.id
			if(!this.$route.params.id){
				console.log("...............................")
				this.getParentData()
			}else if(this.$route.params.id){
				console.log("++++++++++++++++++++++++++++++")
				this.getEnjoyDate()
			}
		},
		methods:{
			toggleLoading(show = true) {
	        	this.loading = show
	        },
			toggleContent:function(){
				this.contentShow = !this.contentShow;
			},
			getEnjoyDate:function(){
				this.names = this.$parent.names
				this.holderName = this.$parent.holderName
				// this.holderBirthday = this.$parent.holderBirthday
				this.selectedWay_0 = this.$parent.selectedWay_0
				this.selectedWay_1 = this.$parent.selectedWay_1
				this.tit = this.$parent.tit
				console.log(this.tit)
				this.productCode = this.$parent.productCode
				this.itemAttr = this.$parent.itemAttr
				console.log(this.itemAttr)
				this.rangAttr = this.$parent.rangAttr
				console.log(this.rangAttr)
				this.maxAge = this.$parent.maxAge
				this.allImg = this.$parent.allImg
				let holderBir = this.$parent.holderBirthday
		  		console.log(holderBir)
		  		this.holderBir = holderBir//暂时存一下
		  		let newtime = holderBir.split('T')[0]
		  		console.log(newtime)
		  		let yeartime = newtime.split('-')[0]
		  		let monthtime = newtime.split('-')[1]
		  		let daytime = newtime.split('-')[2]
		  		console.log(yeartime + ',' + monthtime + ',' + daytime)
		  		let nowDate = new Date()
		  		let nowYear = nowDate.getFullYear()
		  		let nowMonth = nowDate.getMonth() + 1
		  		let nowDay = nowDate.getDate()
		  		console.log(nowYear + ',' + nowMonth + ',' + nowDay)
		  		let suishu = nowYear - yeartime
		  		if(nowMonth > monthtime){
		  			this.holderBirthday = suishu
		  		}else{
		  			if(nowMonth == monthtime){
		  				if(nowDay >= daytime){
		  					this.holderBirthday = suishu
		  				}else{
		  					this.holderBirthday = suishu - 1 
		  				}
		  			}else{
		  				this.holderBirthday = suishu 
		  			}
		  		}
		  		this.fujiaExtraList = this.$parent.fujiaExtraList
		  		this.totalPremium = this.$parent.totalPremium
		  		this.amount = this.$parent.amount
		  		this.payMode = this.$parent.payMode
		  		this.payModeName = this.$parent.payModeName
		  		this.payPeriod = this.$parent.payPeriod
		  		this.payPeriodName = this.$parent.payPeriodName
		  		this.first_amount = this.amount
		  		this.first_totalPremium = this.totalPremium
			},
			getParentData:function(){
				this.names = this.$parent.names
				this.holderName = this.$parent.holderName
				this.holderSex = this.$parent.holderSex
				this.holderBirthday = this.$parent.holderBirthday
				this.holderBir = this.$parent.holderBir
				this.jobCode = this.$parent.jobCode
				this.writeAmountOrPremium = this.$parent.amount
				console.log("录入的保额或者保费：" + this.writeAmountOrPremium)
				console.log("职业编号：" + this.jobCode)
				this.selectedWay_0 = this.$parent.selectedWay_0
				this.selectedWay_1 = this.$parent.selectedWay_1
				this.selectedWay_2 = this.$parent.selectedWay_2
				this.term = this.$parent.term
				this.term_0 = this.$parent.term_0
				this.term_1 = this.$parent.term_1
				this.term_2 = this.$parent.term_2
				this.attCode_1 = this.$parent.attCode_1
				console.log("根据保费算保额还是保额算保费：" + this.attCode_1)
				this.productCode = this.$parent.productCode
				console.log('主险code：' + this.productCode)
				console.log('交费期间:' + this.selectedWay_0 + ',' + 
							'保险期间:' + this.selectedWay_1 + (this.term) + ',' + 
							'领取年龄:' + this.selectedWay_2)
				console.log(this.term_0 + ',' + this.term_1 + ',' + this.term_2)
				this.policyHolderName = this.$parent.policyHolderName
				this.policyHolderSex = this.$parent.policyHolderSex
				this.policyHolderBirthday = this.$parent.policyHolderBirthday
				this.zhuxianPremium = this.$parent.zhuxianPremium
				this.zhuxianMoney = this.$parent.zhuxianMoney
				console.log(this.zhuxianPremium)
				console.log(this.zhuxianMoney)
				console.log(this.holderName + ',' + this.policyHolderName)
				console.log(this.holderSex + ',' + this.policyHolderSex)
				console.log(this.holderBirthday + ',' + this.policyHolderBirthday)
				let riderList = this.$parent.riderList
				if(riderList && riderList != ''){
					this.riderList = JSON.parse(riderList)
				}
				console.log(this.riderList)
				this.showManageData = this.$parent.showManageData
				if(this.showManageData){
					let showManageData = JSON.parse(this.showManageData)
					console.log(showManageData)
					this.totalPremium = showManageData.totalPremium
					this.first_amount = showManageData.productList["0"].amount
					this.first_totalPremium = showManageData.productList["0"].premium
					/*附加险的显示内容*/
					this.fujiaExtraList = showManageData.productList["0"].extraList
					console.log(this.fujiaExtraList)
					var sum = 0;
					for(var i in this.fujiaExtraList){
						console.log(this.fujiaExtraList[i].amount)
						sum += parseInt(this.fujiaExtraList[i].amount)
					}
					console.log(sum)
					this.amount = sum + parseInt(this.first_amount)
					this.tit = this.$parent.tit
					this.itemAttr = this.$parent.itemAttr
					this.allImg = this.$parent.allImg
				}
				
				console.log(this.allImg)
				this.showData()
			},
			add:function(){
				let num = this.rangeVal
				console.log(num)
				console.log(num == this.maxAge-this.holderBirthday)
				if(num == this.maxAge){
					console.log('已经到最大年龄')
				}else{
					this.rangeVal++
				}
			},
			sub:function(){
				let num = this.rangeVal
				if(num == this.minAge){
					console.log('已经到最小年龄')
				}else{
					this.rangeVal--
				}
			},
			showData:function(){
				let requ = {
					"proposalPlan": {
		                    "holder": {
		                        "birthday": this.policyHolderBirthday,
		                        "name": this.policyHolderName,
		                        "profession": "",
		                        "sex": this.policyHolderSex
		                    },
	                    "insurantProductList": [
	                        {
	                            "insurant": {
	                                "birthday": this.holderBir,
	                                "isChiefInsured": "",
	                                "job": "",
	                                "name": this.holderName,
	                                "profession": this.jobCode,
	                                "sex": this.holderSex
	                            },
	                            "insuredId": "",
	                            "planId": "",
	                            "planInsureDate": "",
	                            "productList": [
	                                {
	                                    "additional": [
	                                        {
	                                            "key": "attachment_filter_coverage",
	                                            "value": "coverage"
	                                        },
	                                        {
	                                            "key": "MAIN",
	                                            "value": "yes"
	                                        },
	                                        {
	                                            "key": "attachment_benefit_table",
	                                            "value": "[lerrain.project.insurance.product.attachment.table.TableDef@3fb2acb7, lerrain.project.insurance.product.attachment.table.TableDef@6b69430c, lerrain.project.insurance.product.attachment.table.TableTextDef@4bb0ffeb, lerrain.project.insurance.product.attachment.table.TableTextDef@5171c41f, lerrain.project.insurance.product.attachment.table.TableTextDef@402f8ff, lerrain.project.insurance.product.attachment.table.TableTextDef@5f292f67, lerrain.project.insurance.product.attachment.table.TableTextDef@8e74400, lerrain.project.insurance.product.attachment.table.TableTextDef@7216091]"
	                                        },
	                                        {
	                                            "key": "THREE_DIMENSION",
	                                            "value": "lqlife3"
	                                        },
	                                        {
	                                            "key": "startAge",
	                                            "value": "0"
	                                        },
	                                        {
	                                            "key": "attachment_coverage",
	                                            "value": "lerrain.project.insurance.product.attachment.coverage.Coverage@204ad33f"
	                                        },
	                                        {
	                                            "key": "ONE_DIMENSION",
	                                            "value": "rlife1"
	                                        },
	                                        {
	                                            "key": "attachment_filter_benefit_table",
	                                            "value": "table"
	                                        },
	                                        {
	                                            "key": "AA",
	                                            "value": "55"
	                                        },
	                                        {
	                                            "key": "calculate_type",
	                                            "value": "2"
	                                        },
	                                        {
	                                            "key": "stopAge",
	                                            "value": "55"
	                                        },
	                                        {
	                                            "key": "startDay",
	                                            "value": "30"
	                                        },
	                                        {
	                                            "key": "QXFL",
	                                            "value": "changqi"
	                                        }
	                                    ],
	                                    "amount": this.attCode_1 == "amount" ? this.writeAmountOrPremium:this.zhuxianMoney,
	                                    "attList": [
	                                        {
	                                            "attCode": "payMode",
	                                            "attId": "C762509FE4200001AC5D12002C501638",
	                                            "attName": "缴费方式",
	                                            "attText": this.selectedWay_0,
	                                            "attValue": this.term_0,
	                                            "attValueList": [
	                                                {
	                                                    "className": "ProductAttributeItem",
	                                                    "code": "year",
	                                                    "text": "年交"
	                                                }
	                                            ],
	                                            "attViewType": "1",
	                                            "className": "ProductAttribute",
	                                            "productId": "C762509FE4200001AC5D12002C501638",
	                                            "sort": 3
	                                        },
	                                        {
	                                            "attCode": "payPeriod",
	                                            "attId": "C762509FE4200001AC5D12002C501638",
	                                            "attName": "交费期限",
	                                            "attText": this.selectedWay_1,
	                                            "attValue": this.term_1,
	                                            "attValueList": [
	                                                {
	                                                    "className": "ProductAttributeItem",
	                                                    "code": "term_5",
	                                                    "text": "5年期"
	                                                },
	                                                {
	                                                    "className": "ProductAttributeItem",
	                                                    "code": "term_10",
	                                                    "text": "10年期"
	                                                },
	                                                {
	                                                    "className": "ProductAttributeItem",
	                                                    "code": "term_15",
	                                                    "text": "15年期"
	                                                },
	                                                {
	                                                    "className": "ProductAttributeItem",
	                                                    "code": "term_20",
	                                                    "text": "20年期"
	                                                }
	                                            ],
	                                            "attViewType": "1",
	                                            "className": "ProductAttribute",
	                                            "productId": "C762509FE4200001AC5D12002C501638",
	                                            "sort": 4
	                                        },
	                                        {
	                                            "attCode": "policyPeriod",
	                                            "attId": "C762509FE4200001AC5D12002C501638",
	                                            "attName": "保险期限",
	                                            "attText": this.selectedWay_2,
	                                            "attValue": this.term_2,
	                                            "attValueList": [
	                                                {
	                                                    "className": "ProductAttributeItem",
	                                                    "code": "to_full",
	                                                    "text": "保终身"
	                                                }
	                                            ],
	                                            "attViewType": "1",
	                                            "className": "ProductAttribute",
	                                            "productId": "C762509FE4200001AC5D12002C501638",
	                                            "sort": 2
	                                        },
	                                        {
	                                            "attCode": this.attCode_1,
	                                            "attName": this.attCode_1 == "amount" ? "保险金额":"保费",
	                                            "attValue": this.writeAmountOrPremium,
	                                            "attValueList": [],
	                                            "attViewType": "2",
	                                            "className": "ProductAttribute",
	                                            "sort": 1
	                                        }
	                                    ],
	                                    "baseAmount": "100000.0",
	                                    "bind": "0",
	                                    "bindCode": "",
	                                    "bindExtraList": [],
	                                    "className": "ProposalProductDef",
	                                    "coreCode": this.productCode,
	                                    "extraList": this.riderList,
	                                    "hasCoverage": "1",
	                                    "hasService": "false",
	                                    "id": "C762509FE4200001AC5D12002C501638",
	                                    "isSelect": true,
	                                    "main": "true",
	                                    "mobileId": "C762509FE4200001AC5D12002C501638",
	                                    "mutiBenefit": "0",
	                                    "payMode": this.term_0,
	                                    "payPeriod": this.term_1,
	                                    "planId": "",
	                                    "policyPeriod": this.term_2,
	                                    "premiumDes": this.attCode_1 == "amount" ? this.zhuxianPremium:this.writeAmountOrPremium,
	                                    "productCode": this.productCode,
	                                    "productName": this.names,
	                                    "productShortName": "",
	                                    "productText": "dividend",
	                                    "productType": "0",
	                                    "rank": "",
	                                    "sell": "false",
	                                    "shebao": "",
	                                    "type": "0"
	                                }
	                            ],
	                            "proposalId": "",
	                            "totalPremium": 0
	                        }
	                    ],
	                    "orgAgent": {
	                        "channel": "1",
	                        "deviceNo": "572032449254344960",
	                        "loginCode": "1100D12336",
	                        "openId": "xxxx",
	                        "token": ""
	                    }
	                }
				}
				utils.http.post('PRODUCTINTEREST',requ).then(response=>{
					console.log(response.data)
					let project = response.data.response
					this.allImg = project.trialPremiumMobile.mobileImageList
					console.log(this.allImg)
					let itemAttr = project.trialPremiumMobile.benifitOutLineDtoList["0"].benifitOutLineItemDtoList["0"].itemAttr
					console.log(itemAttr)
					this.itemAttr = itemAttr
					this.rangAttr = project.trialPremiumMobile.benifitOutLineDtoList["0"].benifitOutLineItemDtoList
					console.log(this.rangAttr)
					let times = project.trialPremiumMobile.benifitOutLineDtoList["0"].benifitOutLineItemDtoList[1].itemAttr
					this.times = times
					this.maxAge = project.trialPremiumMobile.benifitOutLineDtoList["0"].benifitOutLineItemDtoList.length - 2
					console.log(this.maxAge)
					console.log(this.times)
					this.tit = project.trialPremiumMobile.coverageItemList
					console.log(this.tit)
					this.planId = project.trialPremiumMobile.planId
					console.log(this.planId)
					this.$emit('planId',this.planId)
					console.log(this.$emit('planId',this.planId))
					/*利益演示滑块下的重要提示*/
					// this.prompt = 
				}).catch(error=>{

				})
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	#main-message{
		padding-top: 45px;
		background: #FFF1D4;
		.bg{
			border-bottom: 1px solid #CCC;
			background: #FFF;
			img{
				width: 100%;height: 100%;
			}
			.policy-tishi{
				display: inline-block;
				width: 95%;
				padding: 2px 0 3px 10px;
				text-align: left;
				font-size: 12px;
				color: #E84E40;
				line-height: 14px;
			}
		}
		.self-message{
			min-height: 130px;
			background: #FEB101;
			margin-top:5px;
			padding-top:10px;
			.sex-age{
				width: 80%;height: 35px;
				background: #FFF;
				color: #936646;
				border-radius: 30px;
				text-align: center;
				line-height: 35px;
				margin: auto;
				.age{
					padding-left: 15px;
				}
			}
			.show-message{
				width: 100%;height: 80px;
				ul{
					width: 100%;height: 100%;
					display: flex;
					justify-content:space-around;
					li{
						width: 70%;
						background: #FDF6AE;
						border-radius: 8px;	
						p{
							width: 50%;
							float: left;
							span{
								display: block;
								line-height: 40px;width: 100%;
								text-align: center;
							}
							span:nth-child(2){color: #FF5527;}
						}					
					}
				}
			}
		}
		.self-message-show{
			margin-top:-15px;
			.top{
				width: 45px;height: 20px;
				background: #FEB101;
				color: #FFF;
				font-size: 20px;
				margin:auto;
				text-align: center;
				line-height: 15px;
				border-radius:30px 30px 0 0;
				border: 5px solid #FFF;
				border-bottom:none;
			}
			.show-title{
				width: 100%;height: 15px;
				background: #FEB101;
				margin-bottom:10px;
			}
			.show-title-content{
				width: 90%;height: 102px;
				margin: auto;
				margin-bottom:10px;
				.title{
					width: 100%;height: 37px;
					background: #FEB101;
					border-radius:15px 15px 0 0;
					text-align: center;
					line-height: 37px;
					color: #FFF;
				}
				.content_2{
					border-radius:0 0 15px 15px;
				}
				.content_1,.content_2{
					height: 30px;width: 100%;
					background: #FFF;
					span{
						display: inline-block;
						width: 48.5%;line-height: 30px;
						text-align: center;
					}
				}
			}
		}
		.policy-duty{
			margin-top: 10px;
			min-height: 290px;
			padding-bottom: 10px;
			background: #FFF;
			float: left;
			.duty{
				width: 100%;
				float: left;
				img{
					display: inline-block;
					width: 100%;
				}
			}
			.detail{
				width: 95%;min-height: 200px;
				background: #FEFACE;
				margin:0 2.5%;
				float: left;
				border-radius: 15px;
				div{
					margin-bottom:10px;
					float: left;
				}
				.title{
					font-size: 16px;
					padding-top:10px;
					padding-bottom: 15px;
					padding-left: 0px;
					display: flex;
					.fa-title{
						flex: 1;
					    text-indent: 8px;
					    font-weight: bold;
					    text-align:center;
					}
				}
				p{
					line-height: 22px;
				}
				.other{
					margin-top: 15px;
				}
				.has-margin{
					margin-bottom: 10px;
				}
			}
		}
		.policy-benefit{
			min-height: 400px;
			padding-bottom:20px;
			float: left;
			.benefit{
				width: 100%;	
				float: left;			
				img{
					display: block;
					width: 100%;
				}
			}
			.benefit-detail{
				width: 95%;min-height: 350px;
				float: left;
				margin:0 2.5%;
				background: #FEFACE;
				border-radius: 15px;
				position: relative;
				.benefit-con-detail{
					width: 82.8%;
					margin: 10px 8.6%;
					background: #FFF;
					border-radius: 50px;
					p{
						text-align: center;
					}
				}
				.benefit-con{

					p{
						padding: 3px 0;
						font-weight:bold;
					}
				}
				.benefit-fot-con{
					p{
						text-align: justify;
						line-height: 23px;
						color: #666466;
						font-weight:bold;
					}
					p:nth-child(1){margin-bottom: 10px;}
				}
				.range{
					padding: 30px 0;
					div{
						text-align: center;
						color:#F6A721;
					}
				}
				.provision{
					width: 75px;height: 25px;
					background: #E84E40;
					border-radius: 10px;
					color: #FFF;
					text-align:center;
					line-height: 25px;
					position: absolute;
					bottom: 20px;left: 50%;
					transform:translate(-50%);
				}
			}
		}
		.policy-risk{
			min-height: 155px;width: 93%;
			padding:20px 8px;
			margin:auto;
			border:1px solid #BBB;
			border-radius:10px;
			.title{
				text-align: center;
				padding-bottom:15px;
				font-size: 16px;
				font-weight:bold;
			}
			p{
				line-height: 22px;
			}
		}
		.policy-waver{
			padding:20px 9px;
			min-height: 100px;width: 93%;
			margin: auto;
			border:1px solid #BBB;
			border-radius:10px;
			margin-top:10px;
			.title{
				text-align: center;
				font-size: 16px;
				font-weight:bold;
				padding-bottom:15px;
			}
			p{
				line-height: 22px;
			}
		}
		.policy-footer{
			padding:15px 35px 20px 15px;
			p{
				font-size:14px;
				text-align: left;
				line-height: 15px;
				color: #936646;
			}
		}
		.policy-two-footer{
			width: 100%;height: 40px;
			float: left;
			background: #FFF1D4;
			border-top: 1px solid #BBB;
			ul{
				width: 100%;height: 100%;
				display:flex;
				li{
					width: 50%;padding: 10px 0;
					text-align: center;
					span{
						display:inline-block;
						width: 100%;height: auto;
						color: #FFF;
					}
				}
				li:nth-child(1){background: #FDB92C}
				li:nth-child(2){background: #FEB101}
				li:nth-child(1) span{border-right: 1px solid #a5a5a5;}
			}
		}
	}
	.top i.active{transition:all .2s ease-out;transform:rotate(180deg);}
</style>