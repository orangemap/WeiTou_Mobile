<template>
	<div id="enjoy-contents">
		<Headerbtns :title="'光大永明人寿'"></Headerbtns>
		<div class="enjoy-content">
			<!-- <div class="enjoy-head-img">
				<img src="../../assets/img/manage/enjoy.jpg">
			</div> -->
			<div>
				<p class="setting">
					<span>封面设置</span>
				</p>
				<div class="slide-wraper">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="item in banners">
								<img :src="item.src" :style="{height:screenWidth*0.6666+'px'}">
							</div>
						</div>
					</div>
					<div class="button-prev" id="btn1">
						<span @click="chooseImg" class="fa fa-arrow-left"></span>
					</div>
		        	<div class="button-next" id="btn2">
		        		<span class="fa fa-arrow-right"></span>
		        	</div>
				</div>
			</div>
			<div style="background-color: rgb(241,242,244);">
				<p class="setting">
					<span>结束语设置</span>
					<select name="setting" @change="selectChange($event)">
						<option v-for="opt in options"
						v-bind:value="opt.id">{{opt.text}}</option>
					</select>
				</p>
				<div class="setting-content">
					<div class="tag-one" v-if="optionsValue == 1">
						<p class="textWay">
							保险是家庭责任的分期付款，你可以说不需要保险，但是，你不可以代替你的妻子，儿女说他们不需要。虽然，你死去以后，可以一走了之什麽都不要，但是，妻子儿女活着却万事艰难，什麽都需要。
						</p>
						<span>引自《生命的呐喊》</span>
					</div>
					<div class="tag-two" v-if="optionsValue == 2">
						<p class="textWay">
							保险的意义无需多做赘述，其重要性不言而喻，早已融入了现代人类社会的边边角角。
						</p>
						<span>——毛泽东</span>
					</div>
					<div class="tag-three" v-if="optionsValue == 3">
						<p class="textWay">
							别人都说我很富有，拥有很多的财富。其实真正属于我个人的财富是给自己和亲人买了充足的人寿保险。
						</p>
						<span>——李嘉诚</span>
					</div>
				</div>
			</div>
			<div class="choose">
				<div class="one">
					<div class="choose-one">
						<span>封面设置：</span>
						<mt-switch v-model="value1" @change="chooseImg"></mt-switch>
					</div>
					<div class="choose-two">
						<span>公司介绍：</span>
						<mt-switch v-model="value2" @change="chooseImg"></mt-switch>
					</div>
				</div>
				<div class="two">
					<div class="choose-three">
						<span>致谢信：</span>
						<mt-switch v-model="value3" @change="chooseImg"></mt-switch>
					</div>
					<div class="choose-four">
						<span>结束语：</span>
						<mt-switch v-model="value4" @change="chooseImg"></mt-switch>
					</div>
				</div>
			</div>
			<!-- PDF弹出框 -->
			<div class="pdf-send">
				<mt-popup v-model="pdfShow" position="center"
				style="width: 80%;height: 200px;background: #FFF;border-radius:20px;">
					<mt-header title="PDF发送" fixed 
					style="border-radius: 20px 20px 0 0;
					background-color: #12294A;
					font-size: 16px;">
		      		</mt-header>
		      		<div id="send-text">
      					<span>邮箱地址：</span>
      					<input v-model="email"
      					type="text" 
      					name="email" 
      					placeholder="请输入邮箱"/>
		      		</div>
		      		<div class="down">
	      				<a id="filePath">点击下载PDF</a>
	      			</div>
		      		<div class="button">
						<div @click="pdfShow = !pdfShow">
							<mt-button id="button-cancel">取消</mt-button>	
						</div>
						<div @click="sendDataStatus">
							<mt-button id="button-sure">确认</mt-button>			
						</div>
					</div>
				</mt-popup>
			</div>
		</div>
		<div class="enjoy-btn">
			<ul>
				<li @click="pdfShowStatus">
					<mt-button size="normal" id="send">发送PDF</mt-button>
				</li>
				<li @click="makeMsgData">
					<mt-button size="normal">生成PDF</mt-button>
				</li>
				<li @click="enjoy">
					<mt-button size="normal">分享</mt-button>
				</li>
				<li @click="goManage">
					<mt-button size="normal">返回</mt-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '../common/Header.vue'
	import Swiper from '../../../static/js/swiper-3.4.2.min.js'
	import { MessageBox } from 'mint-ui'
	require('../../../static/css/swiper-3.4.2.min.css')
	export default{
		name:'enjoy',
		components:{Headerbtns},
		data(){
			return{
				value1:false,
				value1Status:'0',
				value2:false,
				value2Status:'0',
				value3:false,
				value3Status:'0',
				value4:false,
				value4Status:'0',
				myName:'010.jpg',
				banners:[{
					imgName:'010.jpg',
					src:require('../../assets/img/enjoy/010.jpg')
				},{
					imgName:'011.jpg',
					src:require('../../assets/img/enjoy/011.jpg')
				},{
					imgName:'012.jpg',
					src:require('../../assets/img/enjoy/012.jpg')
				},{
					imgName:'020.jpg',
					src:require('../../assets/img/enjoy/020.jpg')
				},{
					imgName:'030.jpg',
					src:require('../../assets/img/enjoy/030.jpg')
				},{
					imgName:'040.jpg',
					src:require('../../assets/img/enjoy/040.jpg')
				},{
					imgName:'050.jpg',
					src:require('../../assets/img/enjoy/050.jpg')
				},{
					imgName:'060.jpg',
					src:require('../../assets/img/enjoy/060.jpg')
				},{
					imgName:'070.jpg',
					src:require('../../assets/img/enjoy/070.jpg')
				},{
					imgName:'080.jpg',
					src:require('../../assets/img/enjoy/080.jpg')
				},{
					imgName:'090.jpg',
					src:require('../../assets/img/enjoy/090.jpg')
				},{
					imgName:'101.jpg',
					src:require('../../assets/img/enjoy/101.jpg')
				}],
				options:[
					{id:0,text:'生命的呐喊'},
					{id:1,text:'毛泽东谈保险'},
					{id:2,text:'李嘉诚谈保险'}
				],
				swiperInd:'',
				optionsValue:'1',
				pdfShow:false,
				holderName:'',
				policyHoliderName:'',
				holderSex:'',
				jobCode:'',
				policyHolderSex:'',
				holderBirthday:'',
				policyHolderBirthday:'',
				productName:'',
				productCode:'',
				amount:'',
				pdfId:'',
				premiumDes1:'',
				premiumDes2:'',
				email:'',
				selectedWay_0:'',
				selectedWay_1:'',
				selectedWay_2:'',
				term_0:'',
				term_1:'',
				term_2:'',
				riderList:'',
				riderList_1:'',
				term:'',
				planId:null,
				totalPremium:null,
				zhuxianMoney:null,
				zhuxianPremium:null,
				sendExtraList:'',
				writeRiderList:'',
				level:'',
				filePath:'',
				sendBtnStatus:'1'
			}
		},
		mounted(){
			console.log('挂载好了')
			console.log("所选封面图片为：" + this.myName)
			var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        paginationClickable: '.swiper-pagination',
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 30,
		        effect: 'slide',
		        onSlideChangeEnd:function(swiper){
			    	console.log(swiper.activeIndex);
			    	this.swiperInd = swiper.activeIndex
			    	console.log(this.swiperInd)
			    	if(this.swiperInd == 0){
			    		this.myName = "010.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 1){
			    		this.myName = "011.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 2){
			    		this.myName = "012.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 3){
			    		this.myName = "020.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 4){
			    		this.myName = "030.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 5){
			    		this.myName = "040.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 6){
			    		this.myName = "050.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 7){
			    		this.myName = "060.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 8){
			    		this.myName = "070.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 9){
			    		this.myName = "080.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 10){
			    		this.myName = "090.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}else if(this.swiperInd == 11){
			    		this.myName = "101.jpg"
			    		console.log("所选封面图片为：" + this.myName)
			    	}
			    	
			    }

			})
		    $('#btn1').click(function(){
				swiper.slidePrev();
				return this.swiperInd
			})
			$('#btn2').click(function(){
				swiper.slideNext();
			})
			console.log(swiper)
			this.getParams()
		},
		methods:{
			selectChange:function(event){
				this.optionsValue = event.target.value;
				console.log(this.optionsValue);
				var language = Number(this.optionsValue)
				console.log(language + 1)
				this.optionsValue = language + 1
				console.log(this.optionsValue.toString())
			},
			chooseImg:function(){
				if(this.value1 == false){
					this.value1Status = 0
					console.log("不需要封面：" + this.value1Status)
				}else{
					this.value1Status = 1
					console.log("需要封面：" + this.value1Status)
				}
				if(this.value2 == false){
					this.value2Status = 0
					console.log("不需要公司介绍：" + this.value2Status)
				}else{
					this.value2Status = 1
					console.log("需要公司介绍：" + this.value2Status)
				}
				if(this.value3 == false){
					this.value3Status = 0
					console.log("不需要致谢信：" + this.value3Status)
				}else{
					this.value3Status = 1
					console.log("需要致谢信：" + this.value3Status)
				}
				if(this.value4 == false){
					this.value4Status = 0
					console.log("不需要结束语：" + this.value4Status)
				}else{
					this.value4Status = 1
					console.log("需要结束语：" + this.value4Status)
				}
			},
			makeMsgData(){
				let requ = {
					"proposalPlan": {
                    "planId": this.planId,
                    "cusType": "self",
                    "holder": {
                        "birthday": this.policyHolderBirthday,
                        "name": this.policyHolderName,
                        "profession": "",
                        "sex": this.policyHolderSex
                    },
                    "insurantProductList": [
                        {
                            "insurant": {
                                "birthday": this.holderBirthday,
                                "name": this.holderName,
                                "profession": this.jobCode,
                                "leval":this.level,
                                "sex": this.holderSex
                            },
                            "insuredId": "",
                            "planId": "",
                            "planInsureDate": "",
                            "productList": [
                                {
                                    "amount": this.attCode_1 == "amount"?this.amount:this.zhuxianMoney,
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
                                            "attValue": this.amount,
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
                                    "coreCode":this.productCode,
                                    "extraList": this.writeRiderList,
                                    "hasCoverage": "1",
                                    "hasService": "false",
                                    "id": "C762509FE4200001AC5D12002C501638",
                                    "isSelect": true,
                                    "main": "true",
                                    "mobileId": "C762509FE4200001AC5D12002C501638",
                                    "mutiBenefit": "0",
                                    "payMode":this.term_0,
                                    "payPeriod": this.term_1,
                                    "planId": "",
                                    "policyPeriod": this.term_2,
                                    "premiumDes": this.attCode_1 == "amount"?this.zhuxianPremium:this.amount,
                                    "productCode":this.productCode,
                                    "productName": this.productName,
                                    "productShortName": "",
                                    "productText": "dividend",
                                    "productType": "0",
                                    "sell": "false",
                                    "type": "0"
                                }
                            ],
                            "proposalId": "",
                            "totalPremium": 0
                        }
                    ],
                    "proposalPrintItem": {
                        "corver": this.value1Status,
                        "coverUrl": this.value1Status == 1?this.myName:"",
                        "isNetWork": "2",
                        "netWorkCode": "1200000487",
                        "netWorkName": null,
                        "sxgw": "贾铁林",
                        "zyzh": "1100D12336",
                        "phone": "13312126677",
                        "email": "",
                        "zxx":this.value3Status,
                        "gsjs":this.value2Status,
                        "jsy": this.value4Status,
                        "language": this.value4Status == 1?this.optionsValue.toString():"",
                        "benefitTable": "1",
                        "benefitAnalysis": "1",
                        "ensureDes": "1",
                        "printYears": 1,
                        "ensureDetail": "1",
                        "riskDesc": "1",
                        "importantContent": "1"
                    },
                    "sourceType": "1",
                    "totalAmount": this.amount,
                    "totalPremium": JSON.parse(this.riderList).totalPremium
                	}
				}
				utils.http.post('PROPOSALPDFBUILD',requ).then(response => {
					console.log(response.data)
					let projectHead = response.data.header
					console.log(projectHead)
					this.filePath = response.data.response.proposalPlan.filePath
					console.log(this.filePath)
					$("#filePath").attr("href",this.filePath)
					let project = response.data.response
					if(projectHead.responseCode == 0){
						let pdfId = project.proposalPlan.planId
						this.pdfId = pdfId
						MessageBox({
						  title: '提示',
						  message: '生成PDF成功！'
						});
						$("#send").addClass('btnActive')
						/*发送按钮是否可以点击:1为不可发送、2为可以发送*/
						this.sendBtnStatus = "2"
					}else{
						MessageBox({
						  title: '提示',
						  message: projectHead.errorMessage
						});
					}
				}).catch(error => {

				})
			},
			sendDataStatus:function(){
				if(this.sendBtnStatus == "2"){
					this.sendData()
				}
			},
			pdfShowStatus:function(){
				if(this.sendBtnStatus == "2"){
					this.pdfShow = true
				}else{
					MessageBox({
					  title: '提示',
					  message: '当前还未生成PDF！'
					});
				}
			},
			sendData:function(){
				let requ = {
					"proposal": {
		                "zyzh": "1100D12336",
		                "netWorkCode": "1200000487",
		                "pdfid": this.pdfId,
		                "email": this.email
		            }
				}
				utils.http.post('PROPOSALSEND',requ).then(response => {
					this.pdfShow = false
					console.log(response.data)
					let project = response.data.response
					let projectHead = response.data.header
					if(projectHead.responseCode == 0){
						MessageBox({
						  title: '提示',
						  message: '发送PDF成功！'
						});
					}else{
						MessageBox({
						  title: '提示',
						  message: projectHead.errorMessage
						});
					}
				}).catch(error => {

				})
			},
			getParams:function(){
				this.bindCode = this.$route.params.bindCode
				console.log(this.bindCode)
				this.holderName = this.$route.params.holderName
				this.jobCode = this.$route.params.jobCode
				this.level = this.$route.params.level
				this.policyHolderName = this.$route.params.policyHolderName
				this.holderSex = this.$route.params.holderSex
				this.policyHolderSex = this.$route.params.policyHolderSex
				this.holderBirthday = this.$route.params.holderBirthday
				this.policyHolderBirthday = this.$route.params.policyHolderBirthday
				this.productName = this.$route.params.productName
				this.productCode = this.$route.params.productCode
				this.amount = this.$route.params.amount
				this.zhuxianMoney = this.$route.params.zhuxianMoney
		  		this.zhuxianPremium = this.$route.params.zhuxianPremium
		  		console.log("保费算保额：" + this.zhuxianMoney)
		  		console.log("保额算保费：" + this.zhuxianPremium)
				this.premiumDes1 = this.$route.params.premiumDes1
				this.premiumDes2 = this.$route.params.premiumDes2
				this.selectedWay_0 = this.$route.params.selectedWay_0
				this.selectedWay_1 = this.$route.params.selectedWay_1
				this.selectedWay_2 = this.$route.params.selectedWay_2
				this.term = this.$route.params.term
				this.term_0 = this.$route.params.term_0
				this.term_1 = this.$route.params.term_1
				this.term_2 = this.$route.params.term_2
				// this.riderList = this.$route.params.riderList
				this.riderList = this.$route.params.showManageData
				this.riderList_1 = this.$route.params.riderList
				console.log(JSON.parse(this.riderList_1))
				console.log(JSON.parse(this.riderList))
				var writeRiderList = JSON.parse(this.riderList_1)
				var sendRiderList = JSON.parse(this.riderList).productList
				for(var i in sendRiderList){
					this.sendExtraList = sendRiderList[i].extraList
					console.log(this.sendExtraList)
					for(var j in this.sendExtraList){
						console.log(this.sendExtraList[j].premiumDes)
						for(var k in writeRiderList){
							if(this.sendExtraList[j].productCode == writeRiderList[k].productCode){
								console.log(writeRiderList[k].premiumDes)
								writeRiderList[k].premiumDes = this.sendExtraList[j].premiumDes
								console.log(writeRiderList[k])
								for(var l in writeRiderList[k].attList){
									if(writeRiderList[k].attList[l].attCode == "policyPeriod"){
										writeRiderList[k].policyPeriodName = writeRiderList[k].attList[l].attText
									}else if(writeRiderList[k].attList[l].attCode == "rank"){
										writeRiderList[k].rank = writeRiderList[k].attList[l].attValue
									}
								}
							}
						}
						this.writeRiderList = writeRiderList
						console.log(this.writeRiderList)
					}
				}
				this.planId = this.$route.params.planId
				this.attCode_1 = this.$route.params.attCode_1
				console.log("根据保费算保额还是保额算保费：" + this.attCode_1)
				console.log("职业编号：" + this.jobCode + "," + "职业等级：" + this.level)
				console.log(this.selectedWay_0 + ',' + this.selectedWay_1 + (this.term) + ',' + this.selectedWay_2)
				console.log(this.term_0 + ',' + this.term_1 + ',' + this.term_2)
				console.log(this.holderName +','+ this.policyHolderName)
				console.log(this.holderSex +','+ this.policyHolderSex)
				console.log(this.holderBirthday +','+ this.policyHolderBirthday)
				console.log(this.productName +','+ this.productCode +','+ this.amount+'(保险金额)')
				console.log('主险的保费为：' + this.premiumDes1 + ',' + '附加险的保费为：' + this.premiumDes2)
				this.totalPremium = Number(this.premiumDes1) + Number(this.premiumDes2)
				console.log(this.totalPremium)
				console.log(this.totalPremium.toString())
				console.log('利益演示的：' + this.planId)
			},
			enjoy:function(){
				console.log('%c即将进行分享操作','color:#E7A545')
				/*Wechat.isInstalled(function (installed) {
				    alert("Wechat installed: " + (installed ? "Yes" : "No"));
				}, function (reason) {
				    alert("Failed: " + reason);
				})
				var scope = "snsapi_userinfo",
			    state = "_" + (+new Date());
				Wechat.auth(scope, state, function (response) {
				    // you may use response.code to get the access token.
				    alert(JSON.stringify(response));
				}, function (reason) {
				    alert("Failed: " + reason);
				})*/
				/*Wechat.share({
				    message: {
				    		title:'建议书',
				    		mediaTagName:'链接',
					        media: {
					            type: Wechat.Type.WEBPAGE,
					            webpageUrl: "http://192.168.10.139:7003/com.ifp.ipartner/guangda_index.html"
					        }	
				    	},
				    	scene: Wechat.Scene.TIMELINE
					}, function (result) {
						console.log(result)
					    alert("Success");
					}, function (reason) {
					    alert("Failed: " + reason);
				})*/
				Wechat.share({
				    message: {
				        title: "建议书",
				        mediaTagName:'链接',
				        media: {
				            type: Wechat.Type.WEBPAGE,
				            webpageUrl: "http://mitst.sunlife-everbright.com:7003/com.ifp.ipartner/proposalShare/index.html#/manage/addmanage/showmanage/enjoymanage/"+this.planId
				        }
				    },
					scene: Wechat.Scene.TIMELINE   // share to Timeline
				}, function () {
				    MessageBox({
						  title: '提示',
						  message: '分享成功'
						});
				}, function (reason) {
				    MessageBox({
						  title: '提示',
						  message: '分享失败' + reason
						});
				});
			},
			goManage:function(){
				window.localStorage.removeItem('addManage')
				this.$router.push({
					path:'/manage/addmanage/enjoy',
					name:'manage',
					params:{}
				})
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.setting{
		height: 55px;
		line-height: 55px;
		padding-left:15px;
		color: #002D4E;
		font-size: 18px;
		font-weight: bold;
		background: #FFF;
		margin-bottom:10px;
		span{
			background:url(../../assets/img/manage/line.jpg) no-repeat left center;
			padding-left:10px;
		}
		select{
			background:url("../../assets/img/common/jiantou.png") no-repeat right center;
			background-size: 15px 20px;
			float: right;
			width: 130px;height: 30px;
			font-size: 16px;
			line-height: 30px;
			padding-left: 5px;
			margin-right:20px;
			margin-top:12px;
			border-radius: 8px;
			color: #002D4E;
		}
	}
	.textWay{
		text-align: justify;
	}
	.swiper-slide{
		img{
			display: block;
			width: 100%;height:100%;
		}
	}
	#enjoy-contents{
		.enjoy-content{
			position: absolute;
			top: 50px;bottom: 41px;left: 50%;
			width: 100%;
			transform: translate(-50%);
			background: #F1F2F4;
			.enjoy-head-img{
				width: 100%;height: 35px;
				img{
					display: block;
					width: 100%;height: 100%;
				}
			}
			.slide-wraper{
				width: 80%;
				margin: auto;
				background: #FFF;
				border-radius: 10px;
				padding: 0 5%;
				position: relative;
				margin-bottom:10px;
				.swiper-container{
					width: 220px;height: 150px;
					margin: auto;
					img{
						display: block;
						width: 100%;
					}
				}
				.button-prev{
					position: absolute;
					left:2px;top: 65px;
					width: 30px;height: 30px;
					font-size: 25px;
					line-height: 40px;
					text-align: center;
					color: #FFF;
					border-radius: 20px;
					background-color: #ED9F3A;
					background-image: none;
					.fa-arrow-left{
						font-size: initial;
						transform: translateY(-50%);
					}
				}
				.button-next{
					position: absolute;
					right:2px;top: 65px;
					width: 30px;height: 30px;
				    background-image: none;
				    background-color: #ED9F3A;
				    border-radius: 20px;
				    font-size: 25px;
					line-height: 40px;
					text-align: center;
					color: #FFF;
					.fa-arrow-right{
						font-size: initial;
					    transform: translateY(-50%);
					}
				}
			}
			.setting-content{
				width: 80%;min-height: 200px;
				margin: auto;
				background-color: #B4B8B9;
				border-radius: 10px;
				padding: 0 5%;
				margin-bottom:10px;
				.tag-one,.tag-two,.tag-three{
					width: 93%;height: 130px;
					background-color: #FFF;
					float: left;
					border-radius: 8px;
					padding: 10px;
					text-indent: 25px;
					line-height: 20px;
					position: relative;
					color: #002D4E;
					span{
						position: absolute;
						right: 5px;bottom: 5px;
						font-size: 14px;
						color: #002D4E;
					}
				}
			}
			.choose{
				width: 100%;height: 150px;
				background-color: #FFF;
				.one,.two{
					float: left;
					width: 100%;
					display: flex;
					.choose-one,.choose-two{
						margin-top:20px;
					}
					.choose-two{
						span{
							padding-left:15px;
						}
					}
					.choose-four{
						span{
							padding-left:15px;
						}
					}
					div{
						width: 50%;
						float: left;
						margin-bottom: 20px;
						span{
							float: left;
							line-height: 32px;
							width: 80px;
							padding-left:25px;
						}
					}
					// div{
					// 	padding: 10px 0;
					// 	span{
					// 		float: left;
					// 		display: inline-block;
					// 		transform:translateY(50%);
					// 		color: #142947;
					// 		font-weight:bold;
					// 		margin-right: 15px;
					// 	}
					// }
				}
			}
		}
	}
	.button{
		width: 85%;
		position: absolute;
		bottom: 8px;
		padding: 0 20px;
		text-align: center;
		div{
			float: left;
			width: 50%;
		}
		.mint-button{
			padding: 0 20px;
		}
		#button-sure{
			background-color: #E7A545;
			color: #FFF;
		}
		#button-cancel{
			background-color: #E7A545;
			color: #FFF;
		}
	}
	#send-text{
		height: 50px;
		margin-top:45px;
		display: flex;
		justify-content:space-around;
		span{
			display: inline-block;
			height: 100%;width: 35%;
			line-height: 50px;
			padding-left:20px;
		}
		input{
			display: inline-block;
			height: 60%;width: 55%;
			border: 1px solid #BBB;
			margin-top:9px;
			margin-right: 20px;
			border-radius: 10px;
			padding-left:10px;
		}
	}
	.down{
		text-align: center;
		height: 40px;
		a{
			display: inline-block;
			width: 90%;height: 100%;
			line-height: 40px;
			color: #000;
			border: 1px solid #BBB;
			border-radius: 10px;
		}
	}
	.enjoy-btn{
		width: 100%;
		position: fixed;
		bottom: 0;left:0;
		background-color: #FFF;
		ul{
			width: 100%;
			overflow:hidden;
			display: flex;
			justify-content:space-between;
			li{
				button{
					background-color: #E7A545;
					color: #FFF;
				}
			}
			li:nth-child(1) button{background: #A1A2A3;color: #FFF;}
			li:nth-child(1) button.btnActive{background: #E7A545;color: #FFF;}
		}
	}
</style>