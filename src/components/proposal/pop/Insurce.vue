<template>
	<div id="main-message">
		<div class="animated zoomIn">
			<div class="bg">
				<img :src="covers[productCode]['1520_2076']" v-if="covers[productCode]!=undefined" width="442" height="610"/>
			</div>
			<div class="self-message">
				<div class="sex-age">{{proposalPlan.pdfMsgDTO.insureName}}
					<span class="age">{{proposalPlan.pdfMsgDTO.insureSex == "1"?"男":"女"}}</span>
					<span class="age">{{proposalPlan.pdfMsgDTO.insureBirday|ageFilter}}周岁</span>
				</div>
				<div class="show-message">
					<ul>
						<li>
							<div style="display: flex;">
								<p>
									<span>首期保费</span>
									<span>{{proposalPlan.pdfMsgDTO.totalPremium}}元</span>
								</p>
								 <p v-show="proposalPlan.point!=''">
									<span>保费积分</span>
									<span>{{proposalPlan.point}}分</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="self-message-show"  @click="expand = !expand">
				<div class="top" @click="toggleContent">
					<i class="fa fa-angle-double-up" style="-webkit-transition:all .2s ease-out;color: #FFF;" :style="{'-webkit-transform':expand?'rotate(180deg)':''}"></i>
				</div>
				<div v-show="!contentShow" style="height: 5px;background: #FEB101;"></div>
				<div v-show="contentShow" @click="expand = !expand">
					<div class="show-content" v-for="item in proposalPlan.pdfMsgDTO.productList" v-if="item.ismain=='1'">
						<p>{{item.productName}}</p>
						<p>被保人：{{proposalPlan.pdfMsgDTO.insureName}}</p>
						<div>
							<span>缴费方式：{{item.payModeName}}</span>
							<span>交费期间：{{item.payPeriodName}}</span>
						</div>
						<div>
							<span>保险金额：{{item.amount}}元</span>
						</div>
						<div>
							<span>首期保费：{{item.premiumDes}}元</span>
							<span v-show="proposalPlan.point!=''">保费积分：{{item.productPoint}}分</span>
						</div>
					</div>
					<div class="show-content" v-for="item in extraPolicy" v-if="item.ismain!='1'">
						<p>{{item.productName}}</p>
						<p>被保人：{{proposalPlan.pdfMsgDTO.insureName}}</p>
						<div>
							<span>缴费方式：{{item.payModeName}}</span>
							<span>交费期间：{{item.payPeriodName}}</span>
						</div>
						<div>
							<span>保险金额：{{item.amount}}元</span>
						</div>
						<div>
							<span>首期保费：{{item.premiumDes}}元</span>
							<span v-show="proposalPlan.point!=''">保费积分：{{item.productPoint}}分</span>
						</div>
					</div>
					<div v-for="item in proposalPlan.pdfMsgDTO.otherInsurantList">
						<div class="show-content" v-for="extra in item.extraList">
							<p>{{extra.productName}}</p>
							<p>被保人：{{item.insurant.name}}</p>
							<div>
								<span>缴费方式：{{extra.payModeName}}</span>
								<span>交费期间：{{extra.payPeriodName}}</span>
							</div>
							<div>
								<span>保险金额：{{extra.amount}}元</span>
							</div>
							<div>
								<span>首期保费：{{extra.premiumDes}}元</span>
								<span v-show="proposalPlan.point!=''">保费积分：{{extra.productPoint}}分</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 产品特色 -->
			<div class="policy-duty">
				<div class="duty">
					<img src="../../../../static/img/manage/tese_1.jpg">
				</div>
				<div class="detail">
					<div v-for="item in proposalPlan.coverageItemList">
						<h1 class="title" v-if="item.title != ''">
							<b class="fa-title">{{item.title}}</b>
						</h1>
						<p>{{item.message}}</p>
					</div>
				</div>
			</div>
			<!-- 利益演示 -->
			<div class="policy-benefit">
				<div class="benefit">
					<img src="../../../../static/img/manage/liyi.jpg"/>
				</div>
				<div class="benefit-detail">
					<div class="benefit-con-detail" >
						<div class="benefit-con" v-if="isNPT012_NPU012 == 2 || isNPT011_NPU012 == 2 || isNPT012_NPU015 == 2 || isNPT011_NPU015 == 2">
							<p>
								<span>
									年金在扣除1%的初始扣费后，进入《光大永明增利宝年金保险（万能型）》万能账户增值
								</span>
							</p>
							<p>
								<span>
									假设不同万能结算利率
								</span>
							</p>
						</div>
						<!--安鑫禧+增利宝-->
						<div style="border-radius:20px;border:1px solid #FFD39F;margin:10px;padding:10px" v-if="isNPT011_NPU012 == 2 || isNPT011_NPU015 == 2">
							<div class="benefit-con2" v-for="(item,index) in itemAttr">
								<p v-if="index == 1">
									安鑫禧：
								</p>
								<p v-if="index == 4">
									增利宝（万能）：
								</p>
								<p>
									<span v-if="index == 0">{{item}}:</span>
									<span v-if="index != 0">□{{item}}:</span>
									<span v-for="(itm,ind) in rangAttr[rangeVal + 1].itemAttr"
									v-if="index == ind"
									style="padding-left:10px;">{{itm}}</span>
								</p>
							</div>
						</div>
						<!--福运金生+增利宝-->
						<div style="border-radius:20px;border:1px solid #FFD39F;margin:10px;padding:10px" v-if="isNPT012_NPU012 == 2 || isNPT012_NPU015 == 2">
							<div class="benefit-con2" v-for="(item,index) in itemAttr">
								<p>
									<span v-html="item">:</span>
									<span v-for="(itm,ind) in rangAttr[rangeVal + 1].itemAttr"
									v-if="index == ind"
									style="padding-left:10px;">{{itm}}</span>
								</p>
							</div>
						</div>
						<!--乐活养老+增利宝-->
						<div style="border-radius:20px;border:1px solid #FFD39F;margin:10px;padding:10px" v-if="isNET004_NPU012 == 2 || isNET004_NPU015 == 2">
							<div class="benefit-con2" v-for="(item,index) in itemAttr">
								<p v-if="index == 1">
									光大乐活：
								</p>
								<p v-if="index == 4">
									增利宝（万能）：
								</p>
								<p>
									<span v-if="index == 0">{{item}}:</span>
									<span v-if="index != 0">□ {{item}}:</span>
									<span v-for="(itm,ind) in rangAttr[rangeVal + 1].itemAttr"
									v-if="index == ind"
									style="padding-left:10px;">{{itm}}</span>
								</p>
							</div>
						</div>
						<!-- 金保安盈 -->
						<div style="border-radius:20px;border:1px solid #FFD39F;margin:10px;padding:10px" v-if="isNPP013 ==true && (isNPP013_NPU012 == 1 || isNPP013_NPU015 == 1)">
							<div class="benefit-con2" v-for="(item,index) in itemAttr">
								<p>
									<span v-for="(itm,ind) in rangAttr[rangeVal + 1].itemAttr" v-if="index == ind && index == 0">在第{{itm}}{{item}}</span>
									<span v-for="(itm,ind) in rangAttr[rangeVal + 1].itemAttr" v-if="index == ind && index != 0">{{item}} : {{itm}}元</span>
								</p>
							</div>
						</div>
						<!--金保安盈+增利宝-->
						<div style="border-radius:20px;border:1px solid #FFD39F;margin:10px;padding:10px" v-if="isNPP013 ==true && (isNPP013_NPU012 == 2 || isNPP013_NPU015 == 2)">
							<div class="benefit-con2" v-for="(item,index) in itemAttr">
								<p v-if="index == 1">
									金保安盈：
								</p>
								<p v-if="index == 5">
									增利宝（万能）：
								</p>
								<p>
									<span v-for="(itm,ind) in rangAttr[rangeVal + 1].itemAttr" v-if="index == ind && index == 0">在第{{itm}}{{item}}</span>
									<span v-for="(itm,ind) in rangAttr[rangeVal + 1].itemAttr" v-if="index == ind && index != 0">{{item}} : {{itm}}元</span>
								</p>
							</div>
						</div>
						<!--其他产品-->
						<div class="benefit-con" v-if="isNPT012_NPU012 != 2 && isNPT011_NPU012 != 2 && isNET004_NPU012 != 2 && isNPT012_NPU015 != 2 && isNPT011_NPU015 != 2 && isNET004_NPU015 != 2 && isNPP013 == false" v-for="(item,index) in itemAttr">
							<p>
								<span v-html="item">:</span>
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
					<div class="benefit-fot-con" v-if="show">
						<p>风险提示：</p>
					</div>
					<div class="benefit-fot-con" v-if="show">
						<p>保险公司不得违规销售非保险金融产品，请勿参加非法集资</p>
					</div>
					<div class="benefit-fot-con" v-for="item in hintList">
						<p>{{item}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import accordion from '../../common/Accordion.vue'
	import { MessageBox } from 'mint-ui'
	export default{
		name:'insurce',
		components:{accordion},
		props:{
			open:{
				type:Boolean,
				default:false
			},
		    proposalPlan:{
		        type:Object
		    }
		},
		data(){
			return{
				covers:utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.cover.covers,
				isNPT011_NPU012:0,
				isNPT012_NPU012:0,
				isNET004_NPU012:0,
				isNPP013_NPU012:0,
				isNPT011_NPU015:0,
				isNPT012_NPU015:0,
				isNET004_NPU015:0,
				isNPP013_NPU015:0,
				isNPP013:false,
				productCode:utils.cache.get('productCode'),
				contentShow:true,
				expand: this.open,
				rangeVal:0,
				names:'',
				holderName:'',//被保人姓名
				jobCode:'',
				policyHolderName:'',
				policyHolderSex:'',
				policyHolderBirthday:'',
				holderSex:'',//被保人性别
				holderBirthday:'',//被保人年龄
				totalAmount:'',//基本保险金额
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
				smsStatus:false,
				allImg:null,
				productImgUrl:null,
				zhuxianMoney:null,
				showManageData:null,
				fujiaExtraList:[],
				prompt:'',
				writeAmountOrPremium:'',
				payModeName:'',
				payPeriodName:'',
				id:'',
				tkStatu:false,
				otherStatus:false,
				make:{
					product:"",
					productContent_1:[],
					productContent_2:[]
				},
				localStorage:'',
				extraPolicy:[],
				hintList:[],
				show:false
			}
		},
		beforeCreate(){
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		},
		mounted(){
			this.getEnjoyDate()
			this.localStorage = utils.cache.get('personsal')
			this.removeMessage()
			let orgID = utils.cache.get('orgID')
			if(orgID!=undefined && orgID.substring(0, 4) == '8661'){
				this.show = true
			}
		},
		watch:{
			'jobVisible':function(value){
				if(value == true){
		        	utils.ui.modal.afterOpen()
		      	}else{
		        	utils.ui.modal.beforeClose()
		      	}
			},
			'tkStatu':function(value){
				if(value == true){
		        	utils.ui.modal.afterOpen()
		      	}else{
		        	utils.ui.modal.beforeClose()
		      	}
			},
			'smsStatus':function(value){
				if(value == true){
		        	utils.ui.modal.afterOpen()
		      	}else{
		        	utils.ui.modal.beforeClose()
		      	}
			},
			'otherStatus':function(value){
				if(value == true){
		        	utils.ui.modal.afterOpen()
		      	}else{
		        	utils.ui.modal.beforeClose()
		      	}
			}
		},
		methods:{
			removeMessage(){
              for(let i = 0;i<this.proposalPlan.coverageItemList.length;i++){
					let index = this.proposalPlan.coverageItemList[i].message.indexOf("**")
					if(index != -1){
						this.proposalPlan.coverageItemList[i].message = this.proposalPlan.coverageItemList[i].message.replace("**","")
					}
			   }
			},
			toggleLoading(show = true) {
	        	this.loading = show
	        },
			toggleContent:function(){
				this.contentShow = !this.contentShow;
			},
			getEnjoyDate(){
				console.log(this.proposalPlan)
				try {
					this.itemAttr = this.proposalPlan.benifitOutLineDtoList[0].benifitOutLineItemDtoList[0].itemAttr
				}catch (err) {
					console.log(err)
			    }
                this.hintList = this.proposalPlan.benifitOutLineDtoList[0].strList
				console.log("利益演示:",this.itemAttr)
				// if(this.productCode =="NPP016"){
				// this.itemAttr[0] = "在第XX保险单年度末"	
				// this.itemAttr[1] = "当年(生存金年金或养老金):"	
				// this.itemAttr[2] = "现金价值:"	
				// this.itemAttr[3] = "当年红利低:"
				// this.itemAttr[4] = "当年红利中:"
				// this.itemAttr[5] = "当年红利高:"
				// this.itemAttr[6] = "累积生存金(年金或养老金):"
				// this.itemAttr[7] = "累计红利低:"
				// this.itemAttr[8] = "累计红利中:"
				// this.itemAttr[9] = "累计红利高:"
				// this.itemAttr[10] = "祝寿金(80周岁保单周年日):"
				// this.itemAttr[11] = "身故保险金:"
				// }
				this.rangAttr = this.proposalPlan.benifitOutLineDtoList["0"].benifitOutLineItemDtoList
				console.log(this.proposalPlan)
		        this.maxAge = this.proposalPlan.benifitOutLineDtoList["0"].benifitOutLineItemDtoList.length - 2
		        this.allImg = this.proposalPlan.mobileImageList
		        let sum = 0
		        for(var i in this.proposalPlan.pdfMsgDTO.productList){
		        	sum += parseInt(this.proposalPlan.pdfMsgDTO.productList[i].amount)
		        }
				this.totalAmount = sum + '.00'
				let numberMonth = ""
		        for(var i in this.proposalPlan.pdfMsgDTO.productList){
		        	if(this.proposalPlan.pdfMsgDTO.productList[i].ismain == "1"){
						this.productCode = this.proposalPlan.pdfMsgDTO.productList[i].productCode
						 numberMonth = parseInt(this.proposalPlan.pdfMsgDTO.productList[i].payPeriodName) -1
						 console.log(this.proposalPlan.pdfMsgDTO.productList[i])
		        	}
		        	if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "HMT007"){
		        		// this.proposalPlan.pdfMsgDTO.productList[i].productName=this.proposalPlan.pdfMsgDTO.productList[i].productName.substring(2,this.proposalPlan.pdfMsgDTO.productList[i].productName.length)
		        		let productNameStart = this.proposalPlan.pdfMsgDTO.productList[i].productName[0] + this.proposalPlan.pdfMsgDTO.productList[i].productName[1]
		        		if(productNameStart){
		        			this.proposalPlan.pdfMsgDTO.productList[i].productName=this.proposalPlan.pdfMsgDTO.productList[i].productName.substring(2,this.proposalPlan.pdfMsgDTO.productList[i].productName.length)
		        		}
		        	}
		        }
				let extraPolicy = []
				let extraNum = null
				console.log(this.proposalPlan.pdfMsgDTO.productList)
				this.isNPT012_NPU012 = 0
				this.isNPT011_NPU012 = 0
				this.isNET004_NPU012 = 0
				this.isNPP013_NPU012 = 0
				this.isNPT012_NPU015 = 0
				this.isNPT011_NPU015 = 0
				this.isNET004_NPU015 = 0
				this.isNPP013_NPU015 = 0
		        for(var i in this.proposalPlan.pdfMsgDTO.productList){
					if(this.proposalPlan.pdfMsgDTO.productList[i].ismain == "1"){
						 extraNum = parseInt(this.proposalPlan.pdfMsgDTO.productList[i].payPeriodName)-1
					}
		        	if(this.proposalPlan.pdfMsgDTO.productList[i].ismain != "1"){
						if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "HDT042"||this.proposalPlan.pdfMsgDTO.productList[i].productCode == "HDT044"){
						  this.proposalPlan.pdfMsgDTO.productList[i].payPeriodName = numberMonth+"年"
						}
						if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "HDT024"){
                          this.proposalPlan.pdfMsgDTO.productList[i].payPeriodName = extraNum + "年"
						}
						if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "HMT039"){
                          this.proposalPlan.pdfMsgDTO.productList[i].amount = "1000000.00"
						}
				        extraPolicy.push(this.proposalPlan.pdfMsgDTO.productList[i])
					}
					if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "NPT012"){
						this.isNPT012_NPU012 ++
						this.isNPT012_NPU015 ++
					}
					if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "NPT011"){
						this.isNPT011_NPU012 ++
						this.isNPT011_NPU015 ++
					}
					if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "NET004"){
						this.isNET004_NPU012 ++
						this.isNET004_NPU015 ++
					}
					if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "NPP013"){
						this.isNPP013_NPU012 ++
						this.isNPP013_NPU015 ++
						this.isNPP013=true
					}
					if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "NPU012"){
						this.isNPT012_NPU012 ++
						this.isNPT011_NPU012 ++
						this.isNET004_NPU012 ++
						this.isNPP013_NPU012 ++
					}
					if(this.proposalPlan.pdfMsgDTO.productList[i].productCode == "NPU015"){
						this.isNPT012_NPU015 ++
						this.isNPT011_NPU015 ++
						this.isNET004_NPU015 ++
						this.isNPP013_NPU015 ++
					}
		        }
		        extraPolicy.sort((a,b) => {
		        	const codeA = parseInt(a.code)
		        	const codeB = parseInt(b.code)
		        	return codeA -codeB
		        })
				this.extraPolicy = extraPolicy
				console.log(this.extraPolicy)
			},
			add(){
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
				})
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	image[lazy=loading] {
	  width: 60px;
	  height: 60px;
	  margin: auto;
	  background: #BBB;
	}
	.fa-angle-left{
		font-size: 30px;
	}
	.tk-titleTop{
		border-bottom: 1px solid #BBB;
		padding-bottom:10px;
		font-size: 18px;
	}
	.tk-titleTop,.tk-titleBottom,.tk-title{
		width: 100%;
		padding-top:40%;
		text-align: center;
	}
	.tk-titleBottom{
		padding-top:0;
		font-size: 18px;
	}
	.tk-title{
		padding: 15px 0;
		p{
			width: 80%;height: 40px;
			margin: auto;
			line-height: 40px;
			background: #FEB101;
			color: #FFF;
			margin-bottom:15px;
			border-radius: 15px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
	.tk-title p:last-child{margin-bottom:0;}
	.image{
		img{
			display: block;
			width: 100%;
		}
	}
	#main-message{
		padding-top: 40px;
		font-size: 12px!important;
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
						width: 60%;
						background: #FDF6AE;
						border-radius: 8px;	
						p{
							width: 100%;
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
			.show-content{
				width: 100%;
				padding:0 5%;
				line-height:35px;
				margin-bottom:15px;
				box-sizing: border-box;
				p:first-child{
					text-align: center;
					background: #FEB101;
				    border-radius: 15px 15px 0 0;
				    color: #FFF;
				}
				p+p{
					background:#fff;
					padding:0 5px;
				}
				div{
					display:flex;
					justify-content: space-between;
					background:#fff;
					padding:0 5px;
				}
				div:last-child{
					border-radius:0 0 15px 15px;
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
					width: 100%;
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
						color: #FEB101;
						font-size: 12px;
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
			float: left;
			background: #FEFACE;
			padding-bottom:15px;
			.benefit{
				width: 100%;	
				float: left;			
				img{
					display: block;
					width: 100%;
				}
			}
			.benefit-detail{
				width: 100%;min-height: 350px;
				float: left;
				background: #FEFACE;
				position: relative;
				.benefit-con-detail{
					width: 82.8%;
					margin: 10px 8.6%;
					background: #FFF;
					border-radius: 20px;
					padding:10px 0;
				}
				.benefit-con{
					p{
						padding: 3px 30px;
						font-weight:bold;
						display: flex;
						justify-content:space-between;
					}
				}
				.benefit-con2{
					p{
						padding: 3px 3px;
						font-weight:bold;
						display: flex;
						justify-content:space-between;
					}
				}
				.benefit-fot-con{
					padding:0 10px;
					p{
						text-align: justify;
						line-height: 23px;
						color: #666466;
						font-weight:bold;
					}
					p:nth-child(1){margin-bottom: 10px;}
				}
				.range{
					padding: 10px 0;
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
		// .policy-footer{
		// 	padding:15px 35px 20px 15px;
		// 	p{
		// 		font-size:14px;
		// 		text-align: left;
		// 		line-height: 15px;
		// 		color: #936646;
		// 	}
		// }
		// .policy-two-footer{
		// 	width: 100%;height: 40px;
		// 	float: left;
		// 	background: #FFF1D4;
		// 	border-top: 1px solid #BBB;
		// 	ul{
		// 		width: 100%;height: 100%;
		// 		display:flex;
		// 		li{
		// 			width: 50%;padding: 10px 0;
		// 			text-align: center;
		// 			span{
		// 				display:inline-block;
		// 				width: 100%;height: auto;
		// 				color: #FFF;
		// 			}
		// 		}
		// 		li:nth-child(1){background: #FDB92C}
		// 		li:nth-child(2){background: #FEB101}
		// 		li:nth-child(1) span{border-right: 1px solid #a5a5a5;}
		// 	}
		// }
	}
	.top i.active{transition:all .2s ease-out;transform:rotate(180deg);}
</style>