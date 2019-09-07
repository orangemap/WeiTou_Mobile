<template>
	<div>
		<div class="pickerContent my-index-picker">
			<p class="fontIcon">
				<i style="font-size:18px;color:#FEB001" class="fa fa-calendar" aria-hidden="true"></i>
			</p>
			<div class="dateShow">
				<p>
					<year-picker :values="yearDate" v-model="yearDate" :items="yearList" code="code" text="text">
					</year-picker>
					年
				</p>
				<p>
					<year-picker :values="monthDate" v-model="monthDate" :items="monthList" code="code" text="text">
					</year-picker>
					月
				</p>
			</div>
			<p class="fontIcon" @click = 'SearchData()'>
				<i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true"></i>
			</p>
		</div>
		<div class='Gx-Analysis-top'>
			<a href="#" v-for='item in TopLinks' :class='[item.active==true?"text-active":" "]' @click='TopActive(item.id)'>{{item.name}}</a>
		</div>
		<div class='Gx-Analysis-cnt'>
			<div class='Gx-Analysis-cnt-div1 Gx-Analysis-bg'>
				<p>实发金额</p>
				<h2>¥{{summoney}}<span style='font-size:1rem;'>元</span>
				</h2>
				<div>
					<div>
						<p>全国</p>
						<p>第
							<span>{{countryRank}}</span>
							名
						</p>
					</div>
					<div>
						<p>分公司</p>
						<p>第
							<span>{{branchRank}}</span>
							名
						</p>
					</div>
					<div>
						<p>中支</p>
						<p>第
							<span>{{midBraRank}}</span>
							名
						</p>
					</div>
					<div>
						<p>营服</p>
						<p>第
							<span>{{battalionRank}}</span>
							名
						</p>
					</div>
				</div>
				<!-- <div class='Gx-Analysis-load'>
					<router-link to='/comprehensiveGexian/AriskmyCommissionDownload/1'>佣金报告下载</router-link>
					<router-link to='/comprehensiveGexian/AriskmyCommissionDownload/2'>收入明细详情下载</router-link>	
				</div> -->
			</div>	
			<!-- 月度 -->
			<ul class='Gx-Analysis-details'>
				<!-- 新单销售类 -->
				<li>
					<div>
						<p>新单销售类</p>
						<p>{{newPolicySale.sumMoney}}</p>
						<div style='width:20%' class='flex'>
							<p>{{newPolicySale.rate+'%'}}</p>
							<img :src="directionUrl" @click='DataChildShow(1)' ref='ShowLi1'/>
						</div>
					</div>
					<ul v-show='ShowChild1' style='background:#fff'>
						<li class='Gx-Analysis-details-child-li'>
							<p>首期佣金</p>
							<p>{{newPolicySale.monthfyc}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>个人月奖金</p>
							<p>{{newPolicySale.monthbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>个人年奖金</p>
							<p>{{newPolicySale.yearprbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>新人津贴</p>
							<p>{{newPolicySale.newbonus}}</p>
						</li>
					</ul>
				</li>
				<!-- 续期销售类 -->
				<li>
					<div>
						<p>续期销售类</p>
						<p>{{renewalSale.sumMoney}}</p>
						<div style='width:20%' class='flex'>
							<p>{{renewalSale.rate+'%'}}</p>
							<img :src="directionUrl" @click='DataChildShow(2)' ref='ShowLi2'/>
						</div>	
					</div>
					<ul v-show='ShowChild2'>
						<li class='Gx-Analysis-details-child-li'>
							<p>续期佣金</p>
							<p>{{renewalSale.monthryc}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>ABC佣金</p>
							<p>{{renewalSale.abcfee}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>服务费</p>
							<p>{{renewalSale.serverfee}}</p>
						</li>
					</ul>
				</li>
				<!-- 组织类奖励 -->
				<li>
					<div>
						<p>组织管理类</p>
						<p>{{organizeManage.sumMoney}}</p>
						<div style='width:20%' class='flex'>
							<p>{{organizeManage.rate+'%'}}</p>
							<img :src="directionUrl" @click='DataChildShow(3)' ref='ShowLi3'/>
						</div>	
					</div>
					<ul v-show='ShowChild3'  style='background:#fff'>
						<li class='Gx-Analysis-details-child-li'>
							<p>辅导津贴</p>
							<p>{{organizeManage.coachbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>月管理津贴</p>
							<p>{{organizeManage.monthmagbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>职务津贴</p>
							<p>{{organizeManage.dutybonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>育成奖金</p>
							<p>{{organizeManage.rearbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>区管理奖金</p>
							<p>{{organizeManage.deptmagbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>区培育奖金</p>
							<p>{{organizeManage.deptraisebonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>区域管理奖</p>
							<p>{{organizeManage.areamagbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>组织发展津贴</p>
							<p>{{organizeManage.orgbonus}}</p>
						</li>
					</ul>
				</li>
				<!-- 其他类奖励 -->
				<li>
					<div>
						<p>其他奖励类</p>
						<p>{{reward.sumMoney}}</p>
						<div style='width:20%' class='flex'>
							<p>{{reward.rate+'%'}}</p>
							<img :src="directionUrl" @click='DataChildShow(4)' ref='ShowLi4'/>
						</div>	
					</div>
					<ul v-show='ShowChild4'>
						<li class='Gx-Analysis-details-child-li'>
							<p>长期服务金</p>
							<p>{{reward.longserbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>社保津贴</p>
							<p>{{reward.socialbonus}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>税前加扣款</p>
							<p>{{reward.taxbefmoney}}</p>
						</li>
						<!-- <li class='Gx-Analysis-details-child-li'>
							<p>团险综开</p>
							<p>{{reward.grouptomoney}}</p>
						</li> -->
						<li class='Gx-Analysis-details-child-li'>
							<p>方案现金加扣款</p>
							<p>{{reward.planmoney}}</p>
						</li>
						<li class='Gx-Analysis-details-child-li'>
							<p>税后扣款</p>
							<p>{{reward.taxaftfmoney}}</p>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<Alert ref="showalert"></Alert>
	</div>
</template>

<script>
	import yearPicker from '../../../common/Picker.vue'
	import Alert from '@/components/policy/common/alert.vue'
	import { mapState,mapMutations } from 'vuex'
	import store from '../../../../vuex/comprehensive/comprehensive'
	export default {
		components:{yearPicker,Alert},
		data() {
			return {
				agentCode:utils.cache.get('personsal').agentCode,
				channel:'',
				directionUrl:'./static/img/comprehensive/bottom.png',
				yearList:[],/*年列表*/
				yearDate:"",/*查询年*/
				monthList:['01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
				monthDate:"",/*查询月*/
				TopLinks:[
				{id:'1',active:true,name:'月度'},
				{id:'2',active:false,name:'季度'},
				{id:'3',active:false,name:'半年'},
				{id:'4',active:false,name:'年度'}
				],
				ShowList:'1',/*控制显示哪个季度的数据*/
				summoney:'',/*实发金额*/
				countryRank:'',/*全国排名*/
				branchRank:'',/*分公司收入排名*/
				midBraRank:'',/*中支公司排名*/
				battalionRank:'',/*营服排名*/
				ShowChild1:false,
				ShowChild2:false,
				ShowChild3:false,
				ShowChild4:false,
				newPolicySale:{/*新单销售类*/
					monthfyc:'',/*首期佣金*/
					monthbonus:'',/*个人月奖金*/
					yearprbonus:'',/*个人年奖金*/
					newbonus:'',/*新人津贴*/
					sumMoney:'',/*总和*/
					rate:''/*总和占实发金额的比例*/
				},
				renewalSale:{/*续期管理类*/
					monthryc:'',/*续期佣金*/
					abcfee:'',/*ABC佣金*/
					serverfee:'',/*服务费*/
					sumMoney:'',/*总和*/
					rate:''/*总合占实发金额的比例*/
				},
				organizeManage:{/*组织管理类*/
					coachbonus:'',/*辅导津贴*/
					monthmagbonus:'',/*月管理津贴*/
					dutybonus:'',/*职务津贴*/
					rearbonus:'',/*育成奖金*/
					deptmagbonus:'',/*区管理奖金*/
					deptraisebonus:'',/*区培育奖金*/
					areamagbonus:'',/*区域管理奖*/
					orgbonus:'',/*组织发展金*/
					sumMoney:'',/*总和*/
					rate:''/*总和占实发金额的比例*/
				},
				reward:{/*其他奖励类*/
					longserbonus:'',/*长期服务金*/
					socialbonus:'',/*社保津贴*/
					taxbefmoney:'',/*税前加扣款*/
					grouptomoney:'',/*团险综开*/
					planmoney:'',/*方案现金加扣款*/
					taxaftfmoney:'',/*税后扣款*/
					sumMoney:'',/*总和*/
					rate:'',/*总和占实发金额的比例*/
				}
			}
		},
		mounted(){
			this.yearDate=new Date().getFullYear()
			let yearList1=[],yearList2=[]
			for(var i=this.yearDate-100; i<this.yearDate;i++){
				yearList1.push(i)
			}
			for(var i=this.yearDate; i<(this.yearDate)+100; i++){
				yearList2.push(i)
			}
			this.yearList=yearList1.concat(yearList2)
			this.channel = utils.cache.get('channel')
			if(this.ComprehensiveGeXianMonthDate){/*获取月*/
				this.monthDate = this.ComprehensiveGeXianMonthDate
				this.SetComprehensiveGeXianMonthDate(this.monthDate)
			}else{
				this.monthDate=(new Date().getMonth())+1
				if(this.monthDate<=9){
					this.monthDate = '0'+this.monthDate
				}else{
					this.monthDate = this.monthDate+''
				}
			}
			if(this.ComprehensiveGeXianYearDate){/*获取年*/
				this.yearDate = this.ComprehensiveGeXianYearDate
				this.SetComprehensiveGeXianYearDate(this.yearDate.toString())
			}else{
				this.yearDate = this.yearDate.toString()
			}
			let _header = $(".manage-main-contents")
	      let u = navigator.userAgent;
	      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	      if(isiOS) {
	        if(screen.height == 812 && screen.width == 375){
	          console.log('iphone X')
	           _header.css({
	             "top": "92px",
	             "bottom": "34px"
	           })
	           $('.pickerContent').css('margin','40px auto 10px auto')
	           $('.pickerContent').css('top','87px')
	        }else{
	      		$('.pickerContent').css('margin','20px auto 10px auto')
	      	}
	      	$('.myAssion').css('margin-top','48px')
	      }else{
	      	$('.myAssion .pickerContent').css('margin','0 auto 10px auto')
	      }
			console.log('佣金分析年----->>>',this.yearDate)
			console.log('佣金分析月----->>>',this.monthDate)
			this.GetData(this.ShowList,this.agentCode,this.yearDate,this.monthDate)
		},
		computed: {
			...mapState(['ComprehensiveGeXianYearDate','ComprehensiveGeXianMonthDate'])
		},store,
		methods:{
			...mapMutations(['SetComprehensiveGeXianYearDate','SetComprehensiveGeXianMonthDate']),
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			TopActive(code){
				this.ShowList = code
				this.TopLinks.forEach( (item) => {
					item.active = false
					if(code == item.id) {
						item.active = true
					}
				})
				this.GetData(this.ShowList,this.agentCode,this.yearDate,this.monthDate)
			},
			DataChildShow(id){//点击查看对应详情
				if(id == 1){
					this.ShowChild1 = !this.ShowChild1
					if(this.ShowChild1){
						this.$refs.ShowLi1.src = './static/img/comprehensive/top.png'
					}else{
						this.$refs.ShowLi1.src = './static/img/comprehensive/bottom.png'
					}
				}else if(id == 2){
					this.ShowChild2 = !this.ShowChild2
					if(this.ShowChild2){
						this.$refs.ShowLi2.src = './static/img/comprehensive/top.png'
					}else{
						this.$refs.ShowLi2.src = './static/img/comprehensive/bottom.png'
					}
				}else if(id == 3){
					this.ShowChild3 = !this.ShowChild3
					if(this.ShowChild3){
						this.$refs.ShowLi3.src = './static/img/comprehensive/top.png'
					}else{
						this.$refs.ShowLi3.src = './static/img/comprehensive/bottom.png'
					}
				}else if(id == 4){
					this.ShowChild4 = !this.ShowChild4
					if(this.ShowChild4){
						this.$refs.ShowLi4.src = './static/img/comprehensive/top.png'
					}else{
						this.$refs.ShowLi4.src = './static/img/comprehensive/bottom.png'
					}
				}
			},
			GetData(index,agentCode,year,month){
				let requ = {
					search:{
						"agentCode": agentCode, /*this.agentCode*/ /*1100000006*/
						"channel": this.channel,
						"year":year,
						"month":month,
						"model":index
					}
				}
				console.log(index)
				utils.http.postFast('ZHPAYANALYSISGX',requ,(body,header) => {
					console.log(body)
					console.log(header)
					let data = body.search
					if(header.resultCode==0){
						this.summoney = data.summoney/*实发金额*/
						this.countryRank = data.countryRank/*全国排名*/
						this.branchRank = data.branchRank/*分公司收入排名*/
						this.midBraRank = data.midBraRank/*中支公司排名*/
						this.battalionRank = data.battalionRank/*营服排名*/
						/********************新单销售类/********************/
						this.newPolicySale.monthfyc = data.newPolicySale.monthfyc/*首期佣金*/
						this.newPolicySale.monthbonus = data.newPolicySale.monthbonus/*个人月奖金*/
						this.newPolicySale.yearprbonus = data.newPolicySale.yearprbonus/*个人年奖金*/
						this.newPolicySale.newbonus = data.newPolicySale.newbonus/*新人津贴*/
						if(data.newPolicySale.sumMoney == '0' || data.newPolicySale.sumMoney == '0.0' || data.newPolicySale.sumMoney == ''){/*总和*/
							this.newPolicySale.sumMoney = '0.00'
						}else {
							this.newPolicySale.sumMoney = data.newPolicySale.sumMoney
						}
						this.newPolicySale.rate = data.newPolicySale.rate/*总和占实发金额的比例*/
						console.log('新增销售类----->>>',this.newPolicySale)
						/********************续期销售类/********************/
						this.renewalSale.monthryc = data.renewalSale.monthryc/*续期佣金*/
						this.renewalSale.abcfee = data.renewalSale.abcfee /*ABC佣金*/
						this.renewalSale.serverfee = data.renewalSale.serverfee /*服务费*/
						if(data.renewalSale.sumMoney == '0' || data.renewalSale.sumMoney == '0.0' || data.renewalSale.sumMoney == ''){/*总和*/
							this.renewalSale.sumMoney = '0.00'
						}else{
							this.renewalSale.sumMoney = data.renewalSale.sumMoney
						}
						this.renewalSale.rate = data.renewalSale.rate /*总合占实发金额的比例*/
						console.log('续期销售类----->>>',this.renewalSale)
						/********************组织管理类/********************/
						this.organizeManage.coachbonus = data.organizeManage.coachbonus/*辅导津贴*/
						this.organizeManage.monthmagbonus = data.organizeManage.monthmagbonus/*月管理津贴*/
						this.organizeManage.dutybonus = data.organizeManage.dutybonus/*职务津贴*/
						this.organizeManage.rearbonus = data.organizeManage.rearbonus/*育成奖金*/
						this.organizeManage.deptmagbonus = data.organizeManage.deptmagbonus/*区管理奖金*/
						this.organizeManage.deptraisebonus = data.organizeManage.deptraisebonus/*区培育奖金*/
						this.organizeManage.areamagbonus = data.organizeManage.areamagbonus/*区域管理奖*/
						this.organizeManage.orgbonus = data.organizeManage.orgbonus/*组织发展金*/
						if(data.organizeManage.sumMoney == '0' || data.organizeManage.sumMoney == '0.0' || data.organizeManage.sumMoney == ''){/*总和*/
							this.organizeManage.sumMoney = '0.00'
						}else{
							this.organizeManage.sumMoney = data.organizeManage.sumMoney
						}
						this.organizeManage.rate = data.organizeManage.rate/*总和占实发金额的比例*/
						console.log('组织管理类----->>>',this.organizeManage)
						/********************其他奖励类/********************/
						this.reward.longserbonus = data.reward.longserbonus/*长期服务金*/
						this.reward.socialbonus = data.reward.socialbonus/*社保津贴*/
						this.reward.taxbefmoney = data.reward.taxbefmoney/*税前加扣款*/
						this.reward.grouptomoney = data.reward.grouptomoney/*团险综开*/
						this.reward.planmoney = data.reward.planmoney/*方案现金加扣款*/
						this.reward.taxaftfmoney = data.reward.taxaftfmoney/*税后扣款*/
						if(data.reward.sumMoney == '0' || data.reward.sumMoney == '0.0' || data.reward.sumMoney == ''){/*总和*/
							this.reward.sumMoney = '0.00'
						}else{
							this.reward.sumMoney = data.reward.sumMoney
						}
						this.reward.rate = data.reward.rate/*总和占实发金额的比例*/
						console.log('其他奖励类----->>>',this.reward)
					}else{
						this.showModals(header.resultMsg)
					}
				})
			},
			SearchData(){
				this.GetData(this.ShowList,this.agentCode,this.yearDate,this.monthDate)
			}
		},
		watch:{
			yearDate(tpl){
				this.yearDate = tpl.toString()
				this.SetComprehensiveGeXianYearDate(tpl.toString())
			},
			monthDate(tpl){
				this.monthDate = tpl
				this.SetComprehensiveGeXianMonthDate(tpl)
			}
		}
	}
</script>

<style>
.my-index-links{
	/*margin:70px auto 20px auto!important;*/
}
.fa{
	color: #FDB92C;
}
.fa-angle-left{
	display: inline-block;
	width: 100%;height: 100%;
	line-height: 48px;
	text-align: center;
	font-size: 35px;
}
.Gx-Analysis-top{
	width:100%;
	margin:-10px 0 0 0;
	display: flex;
	justify-content: space-between;
	border-top:2px solid #CCC;
	border-bottom:2px solid #CCC;
	background:#fff;
	padding:5px 0;
	box-sizing: border-box;
}
.Gx-Analysis-top>a{
	font-size:.9rem;
	width:25%;
	color:#010101;
	display: inline-block;
	box-sizing: border-box;
	text-align: center;
	height:30px;
	line-height: 30px;
	outline: none;
	border-right: 2px dashed #CCC;
}
.Gx-Analysis-top>a:last-child{
	border:none;
}
.Gx-Analysis-top .text-active{
	color:#FEB101!important;
}

.Gx-Analysis-cnt-div1{
	background:url('./../../../../../static/img/comprehensive/Gx_yjbj.png') no-repeat;
	background-size:100% 100%;
	height:150px;
}
.Gx-Analysis-cnt-div1>p{
	padding-top:20px;
	color:#fff;
	font-size:1rem;
}
.Gx-Analysis-cnt-div1>h2{
	font-size:2rem;
	color:#FFF;
}
.Gx-Analysis-cnt-div1{
	padding-top:30px;
}
.Gx-Analysis-cnt-div1>h2,
.Gx-Analysis-cnt-div1>p{
	margin-bottom:10px;
	text-align: center;
}
.Gx-Analysis-cnt-div1>div:nth-child(3){
	display: flex;
	width:100%;
}
.Gx-Analysis-cnt-div1>div:nth-child(3)>div{
	width:25%;
	box-sizing: border-box;
	border-right: 2px dotted #FFF;
}
.Gx-Analysis-cnt-div1>div:nth-child(3)>div:last-child{
	border:none;
}
.Gx-Analysis-cnt-div1>div:nth-child(3)>div>p{
	text-align: center;
	color:#fff;
	font-size:.9rem;
}
.Gx-Analysis-load{
	width:90%;
	margin:20px auto!important;
	display: flex;
	justify-content: space-between;
}
.Gx-Analysis-load>a{
	color:#294580;
	display: block;
	outline: none;
	width:45%;
	height:30px;
	line-height: 30px;
	text-align: center;
	background:#FFF;
	border-radius:15px;
}
	/*.Gx-Analysis-details{
		margin-top:-10px;
		}*/

		.Gx-Analysis-details>li>div{
			height:30px;
			padding:0 4%;
			display: flex;
			justify-content: space-between;
			background:#fff;
			align-items: center;
		}
		.Gx-Analysis-details img{
			width:15px;
			height:15px;
		}
		.Gx-Analysis-details>li:nth-of-type(even)>div{
			background:#F1F1F1;
		}
		.Gx-Analysis-details>li>div>p:nth-child(1){
			width:25%;
		}
		.Gx-Analysis-details>li>div>p:nth-child(2){
			width:15%;
			text-align: right;
		}
		.Gx-Analysis-details-child-li{
			display: flex;
			justify-content: space-between;
			width:53%;
			margin:0 auto;
			height:30px;
			align-items: center;
		}
		.Gx-Analysis-details-child-li>p:nth-child(2){
			width:50%;
			text-align: right;
		}
		.Gx-Analysis-bg{
			position:relative;
		}
		.Gx-Analysis-bg>div{
			position:absolute;
			bottom:20px;
		}
	</style>
