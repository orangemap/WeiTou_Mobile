<template>
	<div class='my-details'>
		<div class="pickerContent my-index-picker" style='background:#fff!important'>
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
			<p class="fontIcon" @click = 'getDate()'>
				<i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true"></i>
			</p>
		</div>
		<div class='my-comm-details-1'>
			<p>实发金额</p>
			<h2 style='font-size:1.8rem'>
				¥{{summoney}}
				<span style='font-size:.8rem;margin-left:-5px'>元</span>
			</h2>
			<div class='flex my-comm-details-div-top'>
				<div>
					<p>税前收入</p>
					<p>{{befshouldmoney}}元</p>
				</div>
				<div>
					<p>应缴税金</p>
					<p>{{persontax}}元</p>
				</div>
				<div>
					<p>税后收入</p>
					<p>{{afttaxmoney}}元</p>
				</div>
			</div>
			<div class='my-comm-details-links flex'>
				<router-link to='/comprehensiveGexian/AriskmyCommissionDownload/1'>佣金报告下载</router-link>
				<router-link to='/comprehensiveGexian/AriskmyCommissionDownload/2'>收入明细详情下载</router-link>
			</div>
		</div>
		<div class='flex my-comm-list'>
			<div>
				<a v-for='item in TitleList' @click='ListClick(item.id)' :class='[item.active==true?"text-active":" "]'>{{item.text}}</a>
			</div>
		</div>
		<div>
			<!--收入指标List-->
			<ul class='my-comm-btm-ul' v-if='ShowList==1'>
				<li class='flex'>
					<p>个人NPC</p>
					<p style='margin-right:32px'>{{incomeTarget.permonthpc}}</p>
				</li>
				<li class='flex'>
					<p>直辖组NPC</p>
					<p style='margin-right:32px'>{{incomeTarget.teammonthpc}}</p>
				</li>
				<li class='flex'>
					<p>直辖区NPC</p>
					<p style='margin-right:32px'>{{incomeTarget.deptmonthpc}}</p>
				</li>
				<li>
					<div class='flex'>
						<p>个人继续率</p>
						<div class='flex'>
							<p>{{perRate.perpr}}</p>
							<img :src="openImg" alt="" style='width:15px;margin-left:10px;'  ref='ulImg1' @click='Contrary(1)'>
						</div>
					</div>
					<ul style='width:70%;background:#f1f1f1' v-show='LiChild1'>
						<li class='flex'>
							<p>保费继续率</p>
							<p>{{perRate.persmoneyrate}}</p>
						</li>
						<li class='flex'>
							<p>件数继续率</p>
							<p>{{perRate.persnumrate}}</p>
						</li>
						<li class='flex'>
							<p>综合继续率</p>
							<p>{{perRate.percollrate}}</p>
						</li>
					</ul>
				</li>
				<li>
					<div class='flex'>
						<p>组继续率</p>
						<div class='flex'>
							<p>{{groupRate.teampr}}</p>
							<img :src="openImg" alt="" style='width:15px;margin-left:10px;' ref='ulImg2'  @click='Contrary(2)'>
						</div>
					</div>
					<ul style='width:70%' v-show='LiChild2'>
						<li class='flex'>
							<p>保费继续率</p>
							<p>{{groupRate.groupsmoneyrate}}</p>
						</li>
						<li class='flex'>
							<p>件数继续率</p>
							<p>{{groupRate.grouppersnumrate}}</p>
						</li>
						<li class='flex'>
							<p>综合继续率</p>
							<p>{{groupRate.grouppercollrate}}</p>
						</li>
					</ul>
				</li>
				<li class='flex'>
					<p>区继续率</p>
					<p style='margin-right:32px'>{{incomeTarget.deptrate}}</p>
				</li>
			</ul>
			<!--佣金明细List-->
			<ul class='my-comm-btm-ul' v-if='ShowList==2'>
				<li class='flex'>
					<p>首期佣金</p>
					<p>{{moneryTarget.monthfyc}}</p>
				</li>
				<li class='flex'>
					<p>续期佣金</p>
					<p>{{moneryTarget.monthryc}}</p>
				</li>
				<li class='flex'>
					<p>ABC佣金</p>
					<p>{{moneryTarget.abcfee}}</p>
				</li>
				<li class='flex'>
					<p>服务费</p>
					<p>{{moneryTarget.serverfee}}</p>
				</li>
				<li class='flex'>
					<p>个人月奖金</p>
					<p>{{moneryTarget.monthbonus}}</p>
				</li>
				<li class='flex'>
					<p>个人年奖金</p>
					<p>{{moneryTarget.yearprbonus}}</p>
				</li>
				<li class='flex'>
					<p>辅导津贴</p>
					<p>{{moneryTarget.coachbonus}}</p>
				</li>
				<li class='flex'>
					<p>长期服务金</p>
					<p>{{moneryTarget.longserbonus}}</p>
				</li>
				<li class='flex'>
					<p>社保津贴</p>
					<p>{{moneryTarget.socialbonus}}</p>
				</li>
				<li class='flex'>
					<p>月管理津贴</p>
					<p>{{moneryTarget.monthmagbonus}}</p>
				</li>
				<li class='flex'>
					<p>职务津贴</p>
					<p>{{moneryTarget.dutybonus}}</p>
				</li>
				<li class='flex'>
					<p>育成奖金</p>
					<p>{{moneryTarget.rearbonus}}</p>
				</li>
				<li class='flex'>
					<p>区管理奖金</p>
					<p>{{moneryTarget.deptmagbonus}}</p>
				</li>
				<li class='flex'>
					<p>区培育奖金</p>
					<p>{{moneryTarget.deptraisebonus}}</p>
				</li>
				<li class='flex'>
					<p>区域管理奖</p>
					<p>{{moneryTarget.areamagbonus}}</p>
				</li>
				<li class='flex'>
					<p>新人津贴</p>
					<p>{{moneryTarget.newbonus}}</p>
				</li>
				<li class='flex'>
					<p>组织发展津贴</p>
					<p>{{moneryTarget.orgbonus}}</p>
				</li>
			</ul>
			<!--加扣款明细List-->
			<ul class='my-comm-btm-ul' v-if='ShowList==3'>
				<li class='flex'>
					<p>税前加扣款</p>
					<p>{{jiakoukuanTarget.taxbefmoney}}</p>
				</li>
				<li class='flex'>
					<p>团险综开</p>
					<p>{{jiakoukuanTarget.grouptomoney}}</p>
				</li>
				<li class='flex'>
					<p>方案现金加扣款</p>
					<p>{{jiakoukuanTarget.planmoney}}</p>
				</li>
				<li class='flex'>
					<p>实物加扣款</p>
					<p>{{jiakoukuanTarget.goodspunish}}</p>
				</li>
				<li class='flex'>
					<p>税后扣款</p>
					<p>{{jiakoukuanTarget.taxaftfmoney}}</p>
				</li>
			</ul>
			<!--税金及其他List-->
			<ul class='my-comm-btm-ul' v-if='ShowList==4'>
				<li class='flex'>
					<p>税前上期余额</p>
					<p>{{taxAndOtherTarget.lasttaxbefmoney}}</p>
				</li>
				<li class='flex'>
					<p>税前收入转下期</p>
					<p>{{taxAndOtherTarget.taxbeftrans}}</p>
				</li>
				<li class='flex'>
					<p>税前收入</p>
					<p>{{taxAndOtherTarget.befshouldmoney}}</p>
				</li>
				<li class='flex'>
					<p>增值附加税</p>
					<p>{{taxAndOtherTarget.saletax}}</p>
				</li>
				<li class='flex'>
					<p>个人所得税</p>
					<p>{{taxAndOtherTarget.persontax}}</p>
				</li>
				<li class='flex'>
					<p>税后收入</p>
					<p>{{taxAndOtherTarget.afttaxmoney}}</p>
				</li>
				<li class='flex'>
					<p>税后上期余额</p>
					<p>{{taxAndOtherTarget.lasttaxaftfmoney}}</p>
				</li>
				<li class='flex'>
					<p>税后收入转下期</p>
					<p>{{taxAndOtherTarget.taxaftfmoneytrans}}</p>
				</li>
				<li class='flex'>
					<p>实发金额</p>
					<p>{{taxAndOtherTarget.summoney}}</p>
				</li>
			</ul>
		</div>
		<Alert ref="showalert"></Alert>
	</div>

</template>

<script>
	import yearPicker from '../../../common/Picker.vue'
	import { Popup } from 'mint-ui'
	import Alert from '@/components/policy/common/alert.vue'
	import { mapState,mapMutations } from 'vuex'
	import store from '../../../../vuex/comprehensive/comprehensive'
	export default{
		components:{yearPicker,Alert},
		data() {
			return {
				agentCode:utils.cache.get('personsal').agentCode,
				yearList:[],/*年列表*/
				yearDate:"",/*查询年*/
				monthList:['01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
				monthDate:"",/*查询月*/
				openImg:'static/img/comprehensive/bottom.png',
				ShowList:1,
				TitleList:[
				{text:'收入指标',id:1,active:true},
				{text:'佣金明细',id:2,active:false},
				{text:'加扣款明细',id:3,active:false},
				{text:'税金及其他',id:4,active:false}
				],
				channel:'',/*渠道*/
				agentCode:'',/*代理人工号*/
				newModel:false,/*默认不弹框*/
				summoney:'',/*实发金额*/
				befshouldmoney:'',/*税前收入*/
				afttaxmoney:'',/*税后收入*/
				persontax:'',/*应缴税金*/
				incomeTarget:{/*收入指标*/
					permonthpc:'',/*个人NPC*/
					teammonthpc:'',/*直辖组NPC*/
					deptmonthpc:'',/*直辖区NPC*/
					deptrate:'',/*区继续率*/
				},
				perRate:{/*收入指标>个人继续率*/
					percollrate:'',/*综合继续率*/
					perpr:'',
					persmoneyrate:'',/*保费继续率*/
					persnumrate:''/*件数继续率*/
				},
				groupRate:{/*收入指标>组继续率*/
					grouppercollrate:'',/*综合继续率*/
					teampr:'',
					grouppersnumrate:'',/*件数继续率*/
					groupsmoneyrate:''/*保费继续率*/
				},
				LiChild1:false,/*第一个展开的ul*/
				LiChild2:false,/*第二个展开的ul*/
				moneryTarget:{/*佣金明细*/
					monthfyc:'',/*首期佣金*/
					monthryc:'',/*续期佣金*/
					abcfee:'',/*ABC佣金*/
					serverfee:'',/*服务费*/
					monthbonus:'',/*个人月奖金*/
					yearprbonus:'',/*个人年奖金*/
					coachbonus:'',/*辅导津贴*/
					longserbonus:'',/*长期服务金*/
					socialbonus:'',/*社保津贴*/
					monthmagbonus:'',/*月管理津贴*/
					dutybonus:'',/*职务津贴*/
					rearbonus:'',/*育成奖金*/
					deptmagbonus:'',/*区管理奖金*/
					deptraisebonus:'',/*区培育奖金*/
					areamagbonus:'',/*区域管理奖*/
					newbonus:'',/*新人津贴*/
					orgbonus:'',/*组织发展津贴*/
				},
				jiakoukuanTarget:{/*加扣款明细*/
					taxbefmoney:'',/*税前加扣款*/
					grouptomoney:'',/*团险综开*/
					planmoney:'',/*方案现金加扣款*/
					goodspunish:'',/*实物加扣款*/
					taxaftfmoney:''/*税后扣款*/
				},
				taxAndOtherTarget:{/*税金及其他*/
					lasttaxbefmoney:'',/*税前上期余额*/
					taxbeftrans:'',/*税前收入转下期*/
					befshouldmoney:'',/*税前收入*/
					saletax:'',/*增值附加税*/
					persontax:'',/*个人所得税*/
					afttaxmoney:'',/*税后收入*/
					lasttaxaftfmoney:'',/*税后上期余额*/
					taxaftfmoneytrans:'',/*税后收入转下期*/
					summoney:'',/*实发金额*/
				}
			}
		},
		mounted(){
			this.channel = utils.cache.get('channel')
			console.log('渠道',this.channel)
			this.agentCode = utils.cache.get('personsal').agentCode
			console.log('代理人工号',this.agentCode)
			this.yearDate=new Date().getFullYear() /*获取年数组*/
			let yearList1=[],yearList2=[]
			for(var i=this.yearDate-100; i<this.yearDate;i++){
				yearList1.push(i)
			}
			for(var i=this.yearDate; i<(this.yearDate)+100; i++){
				yearList2.push(i)
			}
			this.yearList=yearList1.concat(yearList2)
			console.log('佣金详情年----->>>',this.ComprehensiveGeXianYearDate)
			console.log('佣金详情月----->>>',this.ComprehensiveGeXianMonthDate)
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
	      }else {
	      	$('.pickerContent').css('margin','0 auto 10px auto')
	      }
			this.getContent(this.ShowList,this.agentCode,this.yearDate,this.monthDate)
		},
		computed: {
			...mapState(['ComprehensiveGeXianYearDate','ComprehensiveGeXianMonthDate'])
		},store,
		methods:{
			...mapMutations(['SetComprehensiveGeXianYearDate','SetComprehensiveGeXianMonthDate']),
			ListClick(code){//点击切换不同薪酬详情
				this.TitleList.forEach( (item) => {
					item.active = false
					if( item.id == code){
						item.active = true
						this.ShowList = item.id
					}
				})
				let year = this.yearDate+''
				this.getContent(this.ShowList,this.agentCode,this.yearDate,this.monthDate)
			},
			/*封装薪酬详情接口*/
			getContent(index,agentCode,year,month){
				let requ = {
					search:{
						"agentCode": agentCode, /*this.agentCode*/
						"channel": this.channel,
						"year":year,
						"month":month,
						"model":index+''
					}
				}
				utils.http.postFast('ZHPAYDETAILGX',requ,(body,header) => {
					console.log(body)
					console.log(header)
					if(header.resultCode==0){
						let data = body.search
						this.summoney = data.summoney/*实发金额*/
						this.befshouldmoney = data.befshouldmoney/*税前收入*/
						this.afttaxmoney = data.afttaxmoney/*税后收入*/
						this.persontax = data.persontax/*应缴税金*/
						/*************************1.收入指标*************************/
						if(data.incomeTarget.permonthpc == '' || data.incomeTarget.permonthpc == '0'){/*个人NPC*/
							this.incomeTarget.permonthpc = '0.00'
						}else{
							this.incomeTarget.permonthpc = data.incomeTarget.permonthpc
						}
						if(data.incomeTarget.teammonthpc == '' || data.incomeTarget.teammonthpc == '0'){/*直辖组NPC*/
							this.incomeTarget.teammonthpc = '0.00'
						}else{
							this.incomeTarget.teammonthpc = data.incomeTarget.teammonthpc
						}
						if(data.incomeTarget.deptmonthpc == '' || data.incomeTarget.deptmonthpc == '0'){/*直辖区NPC*/
							this.incomeTarget.deptmonthpc = '0.00'
						}else{
							this.incomeTarget.deptmonthpc = data.incomeTarget.deptmonthpc
						}

						if(data.incomeTarget.deptrate == '' || data.incomeTarget.deptrate == '0'){/*区继续率*/
							this.incomeTarget.deptrate = '0.00'
						}else{
							if(data.incomeTarget.deptrate>0){
								this.incomeTarget.deptrate = data.incomeTarget.deptrate+'%'
							}
						}
						/*收入指标>个人继续率*/	
						if(data.incomeTarget.perRate.perpr == '' || data.incomeTarget.perRate.perpr == '0'){/*个人继续率*/
							this.perRate.perpr = '0.00'
						}else{
							if(data.incomeTarget.perRate.perpr>0){
								this.perRate.perpr = data.incomeTarget.perRate.perpr+'%'
							}else{
								this.perRate.perpr = data.incomeTarget.perRate.perpr
							}
						}
						if(data.incomeTarget.perRate.percollrate == '' || data.incomeTarget.perRate.percollrate == '0'){/*综合继续率*/
							this.perRate.percollrate = '0.00'
						}else{
							if(data.incomeTarget.perRate.percollrate>0){
								this.perRate.percollrate = data.incomeTarget.perRate.percollrate+'%'
							}else{
								this.perRate.percollrate = data.incomeTarget.perRate.percollrate
							}
						}
						if(data.incomeTarget.perRate.persmoneyrate == ''){/*保费继续率*/
							this.perRate.persmoneyrate = '0.00'
						}else{
							if(data.incomeTarget.perRate.persmoneyrate>0){
								this.perRate.persmoneyrate = data.incomeTarget.perRate.persmoneyrate+'%'
							}else{
								this.perRate.persmoneyrate = data.incomeTarget.perRate.persmoneyrate
							}
						}
						if(data.incomeTarget.perRate.persnumrate == ''){/*件数继续率*/
							this.perRate.persnumrate = '0.00'
						}else{
							if(data.incomeTarget.perRate.persnumrate>0){
								this.perRate.persnumrate = data.incomeTarget.perRate.persnumrate+'%'
							}else{
								this.perRate.persnumrate = data.incomeTarget.perRate.persnumrate
							}
						}
						console.log('个人继续率----->>>',this.perRate)

						/*收入指标>组继续率*/
						if(data.incomeTarget.groupRate.teampr == '' || data.incomeTarget.groupRate.teampr == '0'){/*组继续率*/
							this.groupRate.teampr = '0.00'
						}else{
							if(data.incomeTarget.groupRate.teampr>0){
								this.groupRate.teampr = data.incomeTarget.groupRate.teampr+'%'
							}else{
								this.groupRate.teampr = data.incomeTarget.groupRate.teampr
							}
						}
						console.log(data.incomeTarget.groupRate.teampr)
						console.log(this.groupRate.teampr)
						if(data.incomeTarget.groupRate.grouppercollrate == '' || data.incomeTarget.groupRate.grouppercollrate == '0'){/*综合继续率*/
							this.groupRate.grouppercollrate = '0.00'
						}else{
							if(data.incomeTarget.groupRate.grouppercollrate>0){
								this.groupRate.grouppercollrate = data.incomeTarget.groupRate.grouppercollrate+'%'
							}else{
								this.groupRate.grouppercollrate = data.incomeTarget.groupRate.grouppercollrate
							}
						}
						if(data.incomeTarget.groupRate.grouppersnumrate == '' || data.incomeTarget.groupRate.grouppersnumrate == '0'){/*件数继续率*/
							this.groupRate.grouppersnumrate = '0.00'
						}else{
							if(data.incomeTarget.groupRate.grouppersnumrate>0){
								this.groupRate.grouppersnumrate = data.incomeTarget.groupRate.grouppersnumrate+'%'
							}else{
								this.groupRate.grouppersnumrate = data.incomeTarget.groupRate.grouppersnumrate
							}
						}
						if(data.incomeTarget.groupRate.groupsmoneyrate == '' ||data.incomeTarget.groupRate.groupsmoneyrate == '0'){/*保费继续率*/
							this.groupRate.groupsmoneyrate = '0.00'
						}else{
							if(data.incomeTarget.groupRate.groupsmoneyrate>0){
								this.groupRate.groupsmoneyrate = data.incomeTarget.groupRate.groupsmoneyrate+'%'
							}else{
								this.groupRate.groupsmoneyrate = data.incomeTarget.groupRate.groupsmoneyrate
							}
						}
						
						console.log('组继续率----->>>',this.groupRate)
						/*************************2.佣金明细*************************/
						if(data.moneryTarget.monthfyc == '' || data.moneryTarget.monthfyc == '0'){/*首期佣金*/
							this.moneryTarget.monthfyc = '0.00'
						}else{
							this.moneryTarget.monthfyc = data.moneryTarget.monthfyc
						}
						if(data.moneryTarget.monthryc == '' || data.moneryTarget.monthryc == '0'){/*续期佣金*/
							this.moneryTarget.monthryc = '0.00'
						}else{
							this.moneryTarget.monthryc = data.moneryTarget.monthryc
						}
						if(data.moneryTarget.abcfee == '' || data.moneryTarget.abcfee == '0'){/*ABC佣金*/
							this.moneryTarget.abcfee = '0.00'
						}else{
							this.moneryTarget.abcfee = data.moneryTarget.abcfee
						}
						if(data.moneryTarget.serverfee == '' || data.moneryTarget.serverfee == '0'){/*服务费*/
							this.moneryTarget.serverfee = '0.00'
						}else{
							this.moneryTarget.serverfee = data.moneryTarget.serverfee
						}
						if(data.moneryTarget.monthbonus == '' || data.moneryTarget.monthbonus == '0'){/*个人月奖金*/
							this.moneryTarget.monthbonus = '0.00'
						}else{
							this.moneryTarget.monthbonus = data.moneryTarget.monthbonus
						}
						if(data.moneryTarget.yearprbonus == '' || data.moneryTarget.yearprbonus == '0'){/*个人年奖金*/
							this.moneryTarget.yearprbonus = '0.00'
						}else{
							this.moneryTarget.yearprbonus = data.moneryTarget.yearprbonus
						}
						if(data.moneryTarget.coachbonus == '' || data.moneryTarget.coachbonus == '0'){/*辅导津贴*/
							this.moneryTarget.coachbonus = '0.00'
						}else{
							this.moneryTarget.coachbonus = data.moneryTarget.coachbonus
						}
						if(data.moneryTarget.longserbonus == '' || data.moneryTarget.longserbonus == '0'){/*长期服务金*/
							this.moneryTarget.longserbonus = '0.00'
						}else{
							this.moneryTarget.longserbonus = data.moneryTarget.longserbonus
						}
						if(data.moneryTarget.socialbonus == '' || data.moneryTarget.socialbonus == '0'){/*社保津贴*/
							this.moneryTarget.socialbonus = '0.00'
						}else{
							this.moneryTarget.socialbonus = data.moneryTarget.socialbonus
						}
						if(data.moneryTarget.monthmagbonus == '' || data.moneryTarget.monthmagbonus == '0'){/*月管理津贴*/
							this.moneryTarget.monthmagbonus = '0.00'
						}else{
							this.moneryTarget.monthmagbonus = data.moneryTarget.monthmagbonus
						}
						if(data.moneryTarget.dutybonus == '' || data.moneryTarget.dutybonus == '0'){/*职务津贴*/
							this.moneryTarget.dutybonus = '0.00'
						}else{
							this.moneryTarget.dutybonus = data.moneryTarget.dutybonus
						}
						if(data.moneryTarget.rearbonus == '' || data.moneryTarget.rearbonus == '0'){/*育成奖金*/
							this.moneryTarget.rearbonus = '0.00'
						}else{
							this.moneryTarget.rearbonus = data.moneryTarget.rearbonus
						}
						if(data.moneryTarget.deptmagbonus == '' || data.moneryTarget.deptmagbonus == '0'){/*区管理奖金*/
							this.moneryTarget.deptmagbonus = '0.00'
						}else{
							this.moneryTarget.deptmagbonus = data.moneryTarget.deptmagbonus
						}
						if(data.moneryTarget.deptraisebonus == '' || data.moneryTarget.deptraisebonus == '0'){/*区培育奖金*/
							this.moneryTarget.deptraisebonus = '0.00'
						}else{
							this.moneryTarget.deptraisebonus = data.moneryTarget.deptraisebonus
						}
						if(data.moneryTarget.areamagbonus == '' || data.moneryTarget.areamagbonus == '0'){/*区域管理奖*/
							this.moneryTarget.areamagbonus = '0.00'
						}else{
							this.moneryTarget.areamagbonus = data.moneryTarget.areamagbonus
						}
						if(data.moneryTarget.newbonus == '' || data.moneryTarget.newbonus == '0'){/*新人津贴*/
							this.moneryTarget.newbonus = '0.00'
						}else{
							this.moneryTarget.newbonus = data.moneryTarget.newbonus
						}
						if(data.moneryTarget.orgbonus == '' || data.moneryTarget.orgbonus == '0'){/*首期佣金*/
							this.moneryTarget.orgbonus = '0.00'
						}else{
							this.moneryTarget.orgbonus = data.moneryTarget.orgbonus
						}
						
						console.log('佣金明细 ----->>>',this.moneryTarget)
						/*************************3.加扣款明细*************************/
						if(data.jiakoukuanTarget.taxbefmoney == '' || data.jiakoukuanTarget.taxbefmoney == '0'){/*税前加扣款*/
							this.jiakoukuanTarget.taxbefmoney = '0.00'
						}else{
							this.jiakoukuanTarget.taxbefmoney =  data.jiakoukuanTarget.taxbefmoney
						}
						if(data.jiakoukuanTarget.grouptomoney == '' || data.jiakoukuanTarget.grouptomoney == '0'){/*团险综开*/
							this.jiakoukuanTarget.grouptomoney = '0.00'
						}else{
							this.jiakoukuanTarget.grouptomoney = data.jiakoukuanTarget.grouptomoney
						}
						if(data.jiakoukuanTarget.planmoney == '' || data.jiakoukuanTarget.planmoney == '0'){/*方案现金加扣款*/
							this.jiakoukuanTarget.planmoney = '0.00'
						}else{
							this.jiakoukuanTarget.planmoney = data.jiakoukuanTarget.planmoney
						}
						if(data.jiakoukuanTarget.goodspunish == '' || data.jiakoukuanTarget.goodspunish == '0'){/*实物加扣款*/
							this.jiakoukuanTarget.goodspunish = '0.00'
						}else{
							this.jiakoukuanTarget.goodspunish = data.jiakoukuanTarget.goodspunish
						}
						if(data.jiakoukuanTarget.taxaftfmoney == '' || data.jiakoukuanTarget.taxaftfmoney == '0'){/*税后扣款*/
							this.jiakoukuanTarget.taxaftfmoney = '0.00'
						}else{
							this.jiakoukuanTarget.taxaftfmoney = data.jiakoukuanTarget.taxaftfmoney
						}
						
						/*************************4.税金及其他*************************/
						if(data.taxAndOtherTarget.lasttaxbefmoney == '' || data.taxAndOtherTarget.lasttaxbefmoney == '0'){/*税前上期余额*/
							this.taxAndOtherTarget.lasttaxbefmoney = '0.00'
						}else{
							this.taxAndOtherTarget.lasttaxbefmoney = data.taxAndOtherTarget.lasttaxbefmoney
						}
						if(data.taxAndOtherTarget.taxbeftrans == '' || data.taxAndOtherTarget.taxbeftrans == '0'){/*税前收入转下期*/
							this.taxAndOtherTarget.taxbeftrans = '0.00'
						}else{
							this.taxAndOtherTarget.taxbeftrans = data.taxAndOtherTarget.taxbeftrans
						}
						if(data.taxAndOtherTarget.befshouldmoney == '' || data.taxAndOtherTarget.befshouldmoney == '0'){/*税前收入*/
							this.taxAndOtherTarget.befshouldmoney = '0.00'
						}else{
							this.taxAndOtherTarget.befshouldmoney = data.taxAndOtherTarget.befshouldmoney
						}
						if(data.taxAndOtherTarget.saletax == '' || data.taxAndOtherTarget.saletax == '0'){/*增值附加税*/
							this.taxAndOtherTarget.saletax = '0.00'
						}else{
							this.taxAndOtherTarget.saletax = data.taxAndOtherTarget.saletax
						}
						if(data.taxAndOtherTarget.persontax == '' || data.taxAndOtherTarget.persontax == '0'){/*个人所得税*/
							this.taxAndOtherTarget.persontax = '0.00'
						}else{
							this.taxAndOtherTarget.persontax = data.taxAndOtherTarget.persontax
						}
						if(data.taxAndOtherTarget.afttaxmoney == '' || data.taxAndOtherTarget.afttaxmoney == '0'){/*税后收入*/
							this.taxAndOtherTarget.afttaxmoney = '0.00'
						}else{
							this.taxAndOtherTarget.afttaxmoney = data.taxAndOtherTarget.afttaxmoney
						}
						if(data.taxAndOtherTarget.lasttaxaftfmoney == '' || data.taxAndOtherTarget.lasttaxaftfmoney == '0'){/*税后上期余额*/
							this.taxAndOtherTarget.lasttaxaftfmoney = '0.00'
						}else{
							this.taxAndOtherTarget.lasttaxaftfmoney = data.taxAndOtherTarget.lasttaxaftfmoney
						}
						if(data.taxAndOtherTarget.taxaftfmoneytrans == '' || data.taxAndOtherTarget.taxaftfmoneytrans == '0'){/*税后收入转下期*/
							this.taxAndOtherTarget.taxaftfmoneytrans = '0.00'
						}else{
							this.taxAndOtherTarget.taxaftfmoneytrans = data.taxAndOtherTarget.taxaftfmoneytrans
						}
						if(data.taxAndOtherTarget.summoney == '' || data.taxAndOtherTarget.summoney == '0'){/*实发金额*/
							this.taxAndOtherTarget.summoney = '0.00'
						}else{
							this.taxAndOtherTarget.summoney = data.taxAndOtherTarget.summoney
						}
					}else{
						this.showModals(header.resultMsg)
					}
				})
},
showModals(message) {
	this.$refs.showalert.showMOdal(message)
},
Contrary(id){/*展开/关闭 child*/
	if(id == 1){
		this.LiChild1 = !this.LiChild1
		if(this.LiChild1){
			this.$refs.ulImg1.src = 'static/img/comprehensive/top.png'
		}else{
			this.$refs.ulImg1.src = 'static/img/comprehensive/bottom.png'
		}
	}else if(id == 2){
		this.LiChild2 = !this.LiChild2
		if(this.LiChild2){
			this.$refs.ulImg2.src = 'static/img/comprehensive/top.png'
		}else{
			this.$refs.ulImg2.src = 'static/img/comprehensive/bottom.png'
		}
	}
},
getDate(){
	this.getContent(this.ShowList,this.agentCode,this.yearDate,this.monthDate)
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
.my-index-picker{
	margin-bottom:70px!important;
	position:absolute;
	top:70px;
	margin-left:10%!important;
	widows:70%!important;
}
.my-details .my-comm-details-1 {
	background: url('./../../../../../static/img/comprehensive/Gx_yjbj.png') no-repeat;
	width:100%;
	background-size:100% 100%;
	padding: 15px 0 0 0;
	min-height:175px;
	margin-top:-10px;
}

.flex {
	display: flex;
	justify-content: space-between;
}
.back{

}
.text-center {
	text-align: center;
}
.my-comm-details-1>p{
	color:#aaa;
}
.my-comm-details-1>p,
.my-comm-details-1>h2 {
	font-size: .8rem;
	color: #fff;
	width:95%;
	margin-bottom:10px;
	text-align: right;
}

.my-details .my-comm-details-1>h2 {
	font-size: 2.2rem;
	margin-top:15px;
}

.my-details .my-comm-details-div-top {
	width: 90%;
	margin: 0 auto;
}

.my-details .my-comm-details-div-top>div {
	width: 33%;
	min-height: 40px;
}

.my-details .my-comm-details-div-top>div:nth-child(2) {
	border-left: 2px dotted #FFF;
	border-right: 2px dotted #FFF;
}

.my-details .my-comm-details-div-top>div>p {
	text-align: center;
	color: #fff;
	font-size: .8rem;
	margin-top: 5px;
}
.my-details .my-comm-details-links {
	width: 95%;
	margin: 20px auto 0 auto;
}

.my-details .my-comm-details-links>a {
	display: block;
	background: #fff;
	color: #294580;
	height:30px;
	line-height: 30px;
	width: 40%;
	text-align: center;
	outline: none;
	border-radius:15px;
}

.my-details .my-comm-list {
	width: 100%;
	height: 30px;
	background: #fff;
	padding: 10px 0 5px 0;
}
.my-details .my-comm-list>div{
	display: flex;
	width:100%;
	margin:0;
	border-bottom:2px solid #CCC;
	padding:5px 0;
}
.my-details .my-comm-list a {
	width: 20%;
	font-size: .7rem;
	display: block;
	box-sizing: border-box;
	height: 30px;
	line-height: 30px;
	text-align: center;
	color:#101010;
	border-right: 2px dashed #ccc;
}
.my-details .my-comm-list>div>a:last-child{
	border:none;
}
.my-details .my-comm-btm-ul {
	width: 100%;
	background: #fff;
}

.my-details .my-comm-btm-ul>li {
	flex-wrap: wrap;
	line-height: 35px;
	background: #fff;
	padding: 0 5%;
}

.my-details .my-comm-btm-ul>li:nth-of-type(even) {
	background: #f1f1f1;
}

.my-details .my-comm-btm-ul>li>ul {
	width: 100%;
	margin-left: 5%;
	background: #fff;
}
.my-details .my-index-links .text-active,.my-details .my-comm-list .text-active{
	color:#fEB101!important;
}
.my-details .myAssion{
	background:#f1f1f1;
}
</style>
