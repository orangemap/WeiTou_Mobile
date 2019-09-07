<template>
	<div id="show-manag-contents">
		<Headerbtns :title="'保险理财计划'">
			<!-- <router-link  replace slot="left" class="back"> -->
				<i @click="goAddmanage" slot="left" class="fa fa-angle-left"></i>
			<!-- </router-link> -->
			<i slot="right" @click="goEnjoy" class="fa fa-share-square-o back"></i>
		</Headerbtns>
		<div class="content show-content">
			<div style="position: fixed;width: 100%;z-index: 2;">
				<div class="tabs">
					<div class="tab">
						<div class="item-list"
						v-for="(item,index) in tabs" 
						v-bind:class="{'active':index == num}" 
						@click="changeIndex(index)">{{item}}</div>
					</div>
				</div>
				<div class="two-title">
					<div>代理人姓名：{{agentName}}</div>
					<div>手机号：{{agentTel}}</div>
				</div>
			</div>
			<!-- 险种解读 -->
			<Insurce v-if="dataReady" v-show="insurceStatus" v-on:planId="getChildData"></Insurce>
			<Read v-show="readStatus"></Read>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '../common/Header.vue'
	import Insurce from './pop/Insurce.vue'
	import Read from './pop/Read.vue'
	import { MessageBox } from 'mint-ui'
	export default{
		name:'Showmanage',
		components:{Headerbtns,Insurce,Read},
		data(){
			return{
				dataReady:false,
				tabs:["险种解读","公司介绍"],
				num:0,
				insurceStatus:true,
				introStatus:false,
				readStatus:false,
				names:'',//险种名称
				agentName:'',//代理人姓名
				agentTel:'',//代理人电话
				holderName:'',//被保人姓名
				jobCode:'',
				policyHolderName:'',//投保人姓名
				holderSex:'',//被保人性别
				policyHolderSex:'',//投保人性别
				holderBirthday:'',//被保人生日
				policyHolderBirthday:'',//投保人生日
				amount:'',//基本保险金额
				totalPremium:'',//保费
				productName:'',//险种
				productCode:'',//险种code
				selectedWay_0:'',//交费期间
				selectedWay_1:'',//保险期间
				selectedWay_2:'',//领取年龄或者其他
				term_0:'',
				term_1:'',
				term_2:'',
				attCode_1:'',
				term:'',
				holderBir:'',
				riderList:[],
				planId:null,
				zhuxianMoney:null,
				zhuxianPremium:null,
				showManageData:null,
				itemAttr:[],
				tit:[],
				fujiaExtraList:[]
			}
		},
		mounted(){
			this.imgNone()
			this.getParams()
			let id = this.$route.params.id
			if(id){
				this.enjoyShowManage()
			}else{
				this.dataReady = true
			}
		},
		methods:{
			getChildData:function(data){
				this.planId = data
				console.log(this.planId)
			},
			/*分享的请求报文*/
			enjoyShowManage:function(){
				let requ = {
					"proposal": {
		    			"agentCode": "1100D12336",
                    	"planid": this.$route.params.id
                	}
				}
				utils.http.post("PROPOSALSAVE",requ).then(response => {
					console.log(response.data)
					let project = response.data.response
					console.log(project)
					let productList = project.trialPremiumMobile.pdfMsgDTO.productList
					//取被保人的信息
					let insureMsg = project.trialPremiumMobile.pdfMsgDTO
					this.holderName = insureMsg.insureName
					this.holderBirthday = insureMsg.insureBirday
					console.log(this.holderBirthday)
					//取主险的信息
					for(var i in productList){
						if(productList[i].ismain == "1"){
							this.names = productList[i].productName
							this.productCode = productList[i].productCode
							this.selectedWay_0 = productList[i].paymode
							this.selectedWay_1 = productList[i].payperiod
							console.log(this.names + ',' + this.productCode + ',' + this.selectedWay_0 + ',' + this.selectedWay_1)
							this.totalPremium = productList[i].premiumDes
							this.amount = productList[i].amount
							this.payMode = productList[i].payMode
							this.payModeName = productList[i].payModeName
							this.payPeriod = productList[i].payPeriod
							this.payPeriodName = productList[i].payPeriodName
						}else{
							this.fujiaExtraList.push(productList[i])
							console.log(this.fujiaExtraList)
						}
					}
					//产品特色
					this.tit = project.trialPremiumMobile.coverageItemList
					console.log("产品特色:",this.tit)
					//利益演示
					this.itemAttr = project.trialPremiumMobile.benifitOutLineDtoList["0"].benifitOutLineItemDtoList["0"].itemAttr
					console.log("利益演示:",this.itemAttr)
					this.rangAttr = project.trialPremiumMobile.benifitOutLineDtoList["0"].benifitOutLineItemDtoList
					console.log("利益演示数据:",this.rangAttr)
					this.maxAge = project.trialPremiumMobile.benifitOutLineDtoList["0"].benifitOutLineItemDtoList.length - 2
					//保险条款
					this.allImg = project.trialPremiumMobile.mobileImageList
					console.log(this.allImg)
					this.dataReady = true
				})
			},
			goAddmanage:function(){
				this.$router.push({
					path:'/manage/addmanage',
					name:'addmanage',
					params:{
						planId:this.planId
					}
				})
			},
			imgNone:function(){
				let timer;
				let ele = $('.cover');
				timer = setInterval(()=>{
					ele.addClass('cover-none');
				},3000)
			},
			changeIndex:function(index){
		  		this.num = index;
		  		console.log(index);
		  		if(index == '0'){
		  			this.insurceStatus = true;
		  			this.readStatus = false;
		  		}else if(index == '1'){
		  			this.insurceStatus = false;
		  			this.readStatus = true;
		  		}
		  	},
		  	getParams:function(){
		  		if(this.$route.params.id){
		  			return
		  		}
		  		this.names = this.$route.params.names
		  		this.bindCode = this.$route.params.bindCode
		  		this.agentName = this.$route.params.agentName
		  		this.agentTel = this.$route.params.agentTel
		  		this.holderName = this.$route.params.holderName
		  		this.jobCode = this.$route.params.jobCode
		  		this.policyHolderName = this.$route.params.policyHolderName
		  		this.holderSex = this.$route.params.holderSex
		  		this.policyHolderSex = this.$route.params.policyHolderSex
		  		this.policyHolderBirthday = this.$route.params.policyHolderBirthday
		  		let holderBir = this.$route.params.holderBirthday
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
		  		let premiumDes1 = this.$route.params.premiumDes1
		  		let premiumDes2 = this.$route.params.premiumDes2
		  		this.amount = this.$route.params.amount
		  		this.totalPremium = this.$route.params.totalPremium
		  		this.zhuxianMoney = this.$route.params.zhuxianMoney
		  		this.zhuxianPremium = this.$route.params.zhuxianPremium
		  		console.log("录入的保额或者保费：" + this.amount)
		  		console.log("保费算保额：" + this.zhuxianMoney)
		  		console.log("保额算保费：" + this.zhuxianPremium)
		  		console.log('主险的保费为：' + premiumDes1 + ',' + '附加险的保费为：' + premiumDes2 + ',' + '需要交的保额或者保费：' + this.totalPremium)
		  		console.log(this.zhuxianMoney)
		  		this.productName = this.$route.params.productName
		  		this.productCode = this.$route.params.productCode
		  		this.selectedWay_0 = this.$route.params.selectedWay_0
		  		this.selectedWay_1 = this.$route.params.selectedWay_1
		  		this.selectedWay_2 = this.$route.params.selectedWay_2
		  		this.term = this.$route.params.term
		  		this.term_0 = this.$route.params.term_0
		  		this.term_1 = this.$route.params.term_1
		  		this.term_2 = this.$route.params.term_2
		  		this.attCode_1 = this.$route.params.attCode_1
		  		console.log("根据保费算保额还是保额算保费：" + this.attCode_1)
		  		this.level = this.$route.params.level
		  		console.log("职业编号:" + this.jobCode + ',' + "职业等级:" + this.level)
		  		console.log(this.selectedWay_0 + ',' + this.selectedWay_1 + ',' + this.selectedWay_2 + ',' + this.term)
		  		console.log(this.term_0 + ',' + this.term_1 + ',' + this.term_2)
		  		console.log(this.holderName +','+ this.policyHolderName)
		  		console.log(this.holderSex +','+ this.policyHolderSex)
		  		console.log(this.policyHolderBirthday)
		  		console.log(this.productName +','+ this.productCode)
		  		/*console.log(newtime)
		  		console.log(yeartime)
		  		console.log(nowtime)
		  		console.log(nowtime - yeartime)*/
		  		this.riderList = this.$route.params.riderList
		  		this.showManageData = this.$route.params.showManageData
		  		console.log(this.showManageData)
		  	},
		  	goEnjoy:function(){
		  		this.$router.push({
		  			path:'/manage/addmanage/enjoy',
		  			name:'enjoy',
		  			params:{
		  				bindCode:this.$route.params.bindCode,
		  				holderName:this.$route.params.holderName,
		  				jobCode:this.$route.params.jobCode,
		  				level:this.$route.params.level,
		  				policyHolderName:this.$route.params.policyHolderName,
		  				holderSex:this.$route.params.holderSex,
		  				policyHolderSex:this.$route.params.policyHolderSex,
		  				holderBirthday:this.$route.params.holderBirthday,
		  				policyHolderBirthday:this.policyHolderBirthday,
		  				productName:this.$route.params.productName,
		  				productCode:this.$route.params.productCode,
		  				amount:this.$route.params.amount,
		  				zhuxianMoney:this.$route.params.zhuxianMoney,
		  				zhuxianPremium:this.$route.params.zhuxianPremium,
		  				premiumDes1:this.$route.params.premiumDes1,
		  				premiumDes2:this.$route.params.premiumDes2,
		  				selectedWay_0:this.$route.params.selectedWay_0,
		  				selectedWay_1:this.$route.params.selectedWay_1,
		  				selectedWay_2:this.$route.params.selectedWay_2,
		  				term_0:this.$route.params.term_0,
		  				term_1:this.$route.params.term_1,
		  				term_2:this.$route.params.term_2,
		  				term:this.$route.params.term,
		  				riderList:this.$route.params.riderList,
		  				showManageData:this.$route.params.showManageData,
		  				planId:this.planId,
		  				attCode_1:this.$route.params.attCode_1
		  			}
		  		})
		  	}
		},
		// updated(){
		// 	console.log(this.$child.planId)
		// },
		watch:{
			'$route':'getParams'
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.cover{
		width: 100%;height: 100%;
		position: fixed;
		top: 0;right: 0;bottom: 0;left: 0;
		z-index: 3;
		img{
			display: inline-block;
			width: 100%;height: 100%;
		}
	}
	.cover-none{
		display: none;
	}
	.fa-angle-left,.fa-share-square-o{
		display: inline-block;
		width: 100%;height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
		color:#FDB92C;
	}
	.fa-share-square-o{
		font-size: 25px;
		line-height: 55px;
	}
	.content{
		width: 100%;
		position: absolute;
		top: 48px;
		background-color: #fff1d4;
		.tabs{
			width: 100%;height: 44px;
			overflow: hidden;
			background-color: #FFF;
			.tab{
				width: 100%;
				font-size: 15px;
				text-align: center;
				padding: 10px 0;
				background-color: #FFF;
				display:flex;
				.item-list{
					width: 50%;
					font-size: 16px;
					font-weight: bold;
				}
				.item-list:nth-child(2){
					border-left:1px solid rgb(165,165,165);
				}
			}
		}
		.two-title{
			width: 100%;height: 30px;
			margin-top: 0.1%;
			background: rgba(0,0,0,0.5);
			color: #FFF;
			text-align: center;
			div{
				width: 50%;height: 30px;
				line-height: 30px;
				float: left;
			}
		}
	}
	.tab .item-list.active{color: #E9D495;}
</style>