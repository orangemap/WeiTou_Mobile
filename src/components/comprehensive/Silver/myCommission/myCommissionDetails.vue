<template>
	<div>
		<div class="pickerContent my-index-picker" style="top: 100px;">
			<p class="fontIcon">
				<i style="font-size:18px;color:#FEB001" class="fa fa-calendar" aria-hidden="true"></i>
			</p>
			<div class="dateShow">
				<p>
					<year-picker class="picker"  :values="yearDate" v-model="yearDate" :items="yearList" code="code" text="text">
					</year-picker>年
				</p>
				<p>
					<year-picker :values="monthDate" v-model="monthDate" :items="monthList" code="code" text="text">
					</year-picker>月
				</p>
			</div>
			<p class="fontIcon" @click='SelectData'>
				<i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true"></i>
			</p>
		</div>
		<div class='my-comm-details'>
			<p class='text-center'>实发金额</p>
			<h2 class='text-center'>
				¥{{afterawardnext}}
				<span style='font-size:1.5rem;margin-left:-5px'>元</span>
			</h2>
			<div class='flex my-comm-details-div-top'>
				<div>
					<p>税前合计</p>
					<p>{{beforawardm}}元</p>
				</div>
				<div>
					<p>应缴税金</p>
					<p>{{beforaward}}元</p>
				</div>
				<div>
					<p>税后佣金</p>
					<p>{{sumaward}}元</p>
				</div>
			</div>
			<div class='my-comm-details-links flex'>
				<a @click='goToLoad(2)'>收入保单明细下载</a>
				<a @click='goToLoad(1)'>品质指标明细下载</a>
			</div>
		</div>
		<div class='flex my-comm-list'>
			<a v-for='item in TitleList' @click='ListClick(item.id)' :class='[item.active==true?"text-active":" "]'>{{item.text}}</a>
		</div>
		<div>
			<!--绩效明细List-->
			<ul class='my-comm-btm-ul' v-if='ListShow==1'>
				<li class='flex'>
					<div>个人首期有效保费</div>
					<div>{{jixiaoDetail.ftransmoney}}元</div>
				</li>
				<li class='flex'>
					<div>个人首期绩效提奖</div>
					<div>{{jixiaoDetail.faward}}元</div>
				</li>
				<li class='flex'>
					<div>团队首期有效保费</div>
					<div>{{jixiaoDetail.fgtransmoney}}元</div>
				</li>
				<li class='flex'>
					<div>团队首期绩效提奖</div>
					<div>{{jixiaoDetail.fgaward}}元</div>
				</li>
				<li class='flex'>
					<div>续期保费</div>
					<div>{{jixiaoDetail.stransmoney}}元</div>
				</li>
				<li class='flex'>
					<div>续期绩效提奖</div>
					<div>{{jixiaoDetail.saward}}元</div>
				</li>
				<li class='flex'>
					<div>岗位津贴</div>
					<div>{{jixiaoDetail.jobaward}}元</div>
				</li>
				<li class='flex'>
					<div>年终奖</div>
					<div>{{jixiaoDetail.yearbonus}}元</div>
				</li>
			</ul>
			<!--加扣款明细List-->
			<ul class='my-comm-btm-ul' v-if='ListShow==2'>
				<li v-if='listTitle'>
					<p style='color:#FEB101;'>税前加扣款</p>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.qrqwPlan'>
					<div>千人千网计划</div>
					<div>{{jiakoukuanDetail.qrqwPlan}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.jobaward'>
					<div>岗位津贴</div>
					<div>{{jiakoukuanDetail.jobaward}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.cqMoney'>
					<div>差勤加扣款</div>
					<div>{{jiakoukuanDetail.cqMoney}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.eataward'>
					<div>午餐补贴</div>
					<div>{{jiakoukuanDetail.eataward}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.festivalPacket'>
					<div>节日礼金</div>
					<div>{{jiakoukuanDetail.festivalPacket}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.payReturnVisit || jiakoukuanDetail.paymentHesitate || jiakoukuanDetail.returnMoney || jiakoukuanDetail.cusCard'>
					<div>单证品质</div>
					<div style='display:flex;align-items:center'>
						<img :src="openImg" alt="" style='width:20px;height:15px;' @click='openChild'>
						<span style='margin-left:10px;'>{{jiakoukuanDetail.danzhengpinzhi+'元'}}</span>
					</div>
					<ul v-show='childDataShow'>
						<li class='flex' v-if='jiakoukuanDetail.payReturnVisit'>
							<div>期缴回访扣款</div>
							<div>{{jiakoukuanDetail.payReturnVisit}}元</div>
						</li>
						<li class='flex' v-if='jiakoukuanDetail.paymentHesitate'>
							<div>期缴综合犹退扣款</div>
							<div>{{jiakoukuanDetail.paymentHesitate}}元</div>
						</li>
						<li class='flex' v-if='jiakoukuanDetail.returnMoney'>
							<div>回执回销扣款</div>
							<div>{{jiakoukuanDetail.returnMoney}}元</div>
						</li>
						<li class='flex' v-if='jiakoukuanDetail.cusCard'>
							<div>大额客户身份识别扣款</div>
							<div>{{jiakoukuanDetail.cusCard}}元</div>
						</li>
					</ul>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.waitWrite'>
					<div>代签字扣款</div>
					<div>{{jiakoukuanDetail.waitWrite}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.pinzhiAndSign'>
					<div>单证品质/代签字扣款调整</div>
					<div>{{jiakoukuanDetail.pinzhiAndSign}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.question'>
					<div>合规问题</div>
					<div>{{jiakoukuanDetail.question}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.quitWithhold'>
					<div>离职暂扣/补发</div>
					<div>{{jiakoukuanDetail.quitWithhold}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.specialMasster'>
					<div>特殊事项</div>
					<div>{{jiakoukuanDetail.specialMasster}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.other'>
					<div>其他</div>
					<div>{{jiakoukuanDetail.other}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.renewalService'>
					<div>续期服务费</div>
					<div>{{jiakoukuanDetail.renewalService}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.orphanCharge'>
					<div>孤儿保单服务费</div>
					<div>{{jiakoukuanDetail.orphanCharge}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.jianzhiPeople'>
					<div>兼职续收人员佣金</div>
					<div>{{jiakoukuanDetail.jianzhiPeople}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.returnWithdrawing'>
					<div>回执加扣款</div>
					<div>{{jiakoukuanDetail.returnWithdrawing}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.returnVisit'>
					<div>回访</div>
					<div>{{jiakoukuanDetail.returnVisit}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.cretExam'>
					<div>认证考试</div>
					<div>{{jiakoukuanDetail.cretExam}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.allowance'>
					<div>月度管理津贴</div>
					<div>{{jiakoukuanDetail.allowance}}元</div>
				</li>
				<li v-if='jiakoukuanDetail.cash'>
					<p style='color:#FEB101;'>现金激励案</p>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.cash'>
					<div>现金激励案</div>
					<div>{{jiakoukuanDetail.cash}}元</div>
				</li>
				<li v-if='jiakoukuanDetail.shiti || jiakoukuanDetail.yuti'>
					<p style='color:#FEB101;'>实物激励案</p>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.shiti'>
					<div>实物-据实提</div>
					<div>{{jiakoukuanDetail.shiti}}元</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.yuti'>
					<div>实物-冲预提</div>
					<div>{{jiakoukuanDetail.yuti}}元</div>
				</li>
				<li>
					<p style='color:#FEB101;'>HR工资及调整</p>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.hraward'>
					<div>HR应税工资</div>
					<div>{{jiakoukuanDetail.hraward+'元'}}</div>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.hrawards'>
					<div>HR个人所得税</div>
					<div>{{jiakoukuanDetail.hrawards+'元'}}</div>
				</li>
				<li class='flex'>
					<div>税前财务佣金调整</div>
					<div>{{jiakoukuanDetail.beforawardm+'元'}}</div>
				</li>
				<li class='flex'>
					<div>税后财务佣金调整</div>
					<div>{{jiakoukuanDetail.afterawardm+'元'}}</div>
				</li>
				<li v-if='jiakoukuanDetail.afterAdjustment'>
					<p style='color:#FEB101;'>税后调整</p>
				</li>
				<li class='flex' v-if='jiakoukuanDetail.afterAdjustment'>
					<div>税后调整</div>
					<div>{{jiakoukuanDetail.afterAdjustment}}</div>
				</li>
			</ul>
			<!--福利明细List-->
			<ul class='my-comm-btm-ul' v-if='ListShow==3'>
				<li class='flex'>
					<span>午餐补贴</span>
					<span>{{fuliDetail.eataward+'元'}}</span>
				</li>
				<li class='flex'>
					<span>司龄津贴</span>
					<span>{{fuliDetail.ageaward+'元'}}</span>
				</li>
				<li class='flex'>
					<span>学历津贴</span>
					<span>{{fuliDetail.degreeaward+'元'}}</span>
				</li>
			</ul>
			<!--税金明细-->
			<ul class='my-comm-btm-ul' v-if='ListShow==4'>
				<li class='flex'>
					<span>HR应税工资</span>
					<span>{{shuijinDetai.hraward+'元'}}</span>
				</li>
				<li class='flex'>
					<span>HR个人所得税</span>
					<span>{{shuijinDetai.hrawards+'元'}}</span>
				</li>
				<li class='flex'>
					<span>总应税工资</span>
					<span>{{shuijinDetai.sumaward+'元'}}</span>
				</li>
				<li class='flex'>
					<span>总个人所得税</span>
					<span>{{shuijinDetai.sumawards+'元'}}</span>
				</li>
				<li class='flex'>
					<span>税前财务佣金</span>
					<span>{{shuijinDetai.beforawardm+'元'}}</span>
				</li>
				<li class='flex'>
					<span>财务佣金个人所得税</span>
					<span>{{shuijinDetai.sumcwawards+'元'}}</span>
				</li>
				<li class='flex' v-if='shuijinDetai.yearbonus'>
					<span>年终奖</span>
					<span>{{shuijinDetai.yearbonus+'元'}}</span>
				</li>
				<li class='flex' v-if='shuijinDetai.yearbonuss'>
					<span>年终奖个人所得税</span>
					<span>{{shuijinDetai.yearbonuss+'元'}}</span>
				</li>
				<li class='flex' v-if='shuijinDetai.lastaward'>
					<span>税后上期余额</span>
					<span>{{shuijinDetai.lastaward+'元'}}</span>
				</li>
				<li class='flex' v-if='shuijinDetai.afterawardnext'>
					<span>税后净收入转下期</span>
					<span>{{shuijinDetai.afterawardnext+'元'}}</span>
				</li>
			</ul>
		</div>
		<mt-popup v-model="newModel" position="bottom" style='width:80vw!important;height:210px;top:30%;border-radius: 15px;'>
			<div class='mint-msgbox-header' style='background:#002D4E;height:30px;border-top-left-radius: 10px;border-top-right-radius: 10px;'>
				<div class='mint-msgbox-title' style='color:#fff;'>提示</div>
			</div>
			<div class='mint-msgbox-content'>
				<div style='font-size:1rem;text-align:center;padding:0 10px;'>{{modelContent}}</div>
			</div>
			<div class='btn-wrapper'>
				<button @click='ClosenewModel()' style='display: block;height:40px;background:#FEB101;color:#fff;width:80px;margin:10px auto;border:none;border-radius: 8px;outline: none;' >确定</button>
			</div>
		</mt-popup>
	</div>

</template>

<script type='text/babel'>
	import alert from '../../../policy/common/alert.vue'
	import yearPicker from '../../../common/Picker.vue'
	import { mapState,mapMutations } from 'vuex'
	import store from '../../../../vuex/comprehensive/comprehensive'
	import { Popup } from 'mint-ui'
	export default{
		components:{yearPicker},
		data() {
			return {
				openImg:'static/img/comprehensive/bottom.png',
				childDataShow:false,
				yearList:[],/*年列表*/
				monthList:[' ','01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
				yearDate:"",/*查询年*/
				monthDate:"",/*查询月*/
				yeardate:'',/*字符串格式年*/
				monthdate:'',/*字符串格式月*/
				listTitle:true,/*控制税前加扣款显示与否*/
				newModel:false,/*提示框默认不显示*/
				modelContent:'',/*提示框显示内容*/
				jixiaoDetail:{
					ftransmoney:'',/*个人首期保费*/
					faward:'',/*个人首期绩效提奖*/
					fgtransmoney:'',/*团队首期保费*/
					fgaward:'',/*团队首期绩效提奖*/
					stransmoney:'',/*续期保费（个人）*/
					saward:'',/*续期绩效提奖（个人）*/
					jobaward:'',/*岗位津贴*/
					yearbonus:'',/*年终奖*/
				},
				jiakoukuanDetail:{
					qrqwPlan:'',/*千人千网计划*/
					jobaward:'',/*岗位津贴*/
					cqMoney:'',/*差勤加扣款*/
					eataward:'',/*午餐补贴*/
					festivalPacket:'',/*节日礼金*/
					danzhengpinzhi:'',/*单证品质*/
					payReturnVisit:'',/*期缴回访扣款*/
					paymentHesitate:'',/*期缴综合犹退扣款*/
					returnMoney:'',/*回执回销扣款*/
					cusCard:'',/*大额客户身份识别扣款*/
					waitWrite:'',/*代签字扣款*/
					pinzhiAndSign:'',/*单证品质/代签字扣款调整*/
					question:'',/*合规问题*/
					quitWithhold:'',/*离职暂扣/补发*/
					other:'',/*其他*/
					specialMasster:'',/*特殊事项*/
					renewalService:'',/*续期服务费*/
					orphanCharge:'',/*孤儿保单服务费*/
					jianzhiPeople:'',/*兼职续收人员佣金*/
					returnWithdrawing:'',/*回执加扣款*/
					returnVisit:'',/*回访*/
					cretExam:'',/*认证考试*/
					allowance:'',/*月度管理津贴*/
					cash:'',/*现金激励案*/
					shiti:'',/*实物-据实提*/
					yuti:'',/*实物-冲预提*/
					hraward:'',/*HR应税工资*/
					hrawards:'',/*HR个人所得税*/
					beforawardm:'',/*税前财务佣金调整*/
					afterawardm:'',/*税后财务佣金调整*/
					afterAdjustment:''/*税后调整*/
				},
				fuliDetail:{
					eataward:'',/*午餐补贴*/
					ageaward:'',/*司龄津贴*/
					degreeaward:''/*学历津贴*/
				},
				shuijinDetai:{
					hraward:'',/*HR应税工资*/
					hrawards:'',/*HR个人所得税*/
					sumaward:'',/*总应税工资*/
					sumawards:'',/*总个人所得税*/
					beforawardm:'',/*税前财务佣金*/
					sumcwawards:'',/*财务佣金个人所得税*/
					yearbonus:'',/*年终奖*/
					yearbonuss:'',/*年终奖个人所得税*/
					lastaward:'',/*税后上期余额*/
					afterawardnext:''/*税后净收入转下期*/
				},
				ListShow:'1',/*显示的是哪个模块*/
				TitleList:[
				{text:'绩效明细',id:1,active:true},
				{text:'加扣款明细',id:2,active:false},
				{text:'福利明细',id:3,active:false},
				{text:'税金明细',id:4,active:false}
				],
				channel:'',/*渠道*/
				agentCode:'',/*代理人工号*/
				afterawardnext:'',/*实发金额*/
				beforawardm:'',/*税前合计*/
				beforaward:'',/*应缴税金*/
				sumaward:''/*税后薪酬*/
			}
		},
		mounted(){
			this.channel = utils.cache.get('channel')
			console.log('渠道',this.channel)
			this.agentCode = utils.cache.get('personsal').agentCode
			console.log('代理人工号',this.agentCode)
			this.yearDate=new Date().getFullYear() /*获取年默认*/
			let yearList1=[],yearList2=[]
			for(var i=2018; i<this.yearDate;i++){
				yearList1.push(i)
			}
			for(var i=this.yearDate; i<(this.yearDate)+100; i++){
				yearList2.push(i)
			}
			this.yearList=yearList1.concat(yearList2)
			/*初始化月份*/
			if(this.ComprehensiveMonthDate){
				this.monthDate = this.ComprehensiveMonthDate
			}else{
				let date = new Date;
				let month_date = date.getMonth()+1

				if(month_date>=10){
					this.monthDate = month_date.toString()
				}else{
					this.monthDate = '0'+month_date
				}
			}
			/*初始化年份*/
			if(this.ComprehensiveYearDate){
				this.yearDate = this.ComprehensiveYearDate.toString()
			}else{
				this.yearDate = this.yearDate.toString()
			}
			
			console.log('年---------->>>',this.yearDate)
			console.log('月---------->>>',this.monthDate)
			this.getContent(this.ListShow,this.yearDate,this.monthDate)
		},
		computed: {
			...mapState(['ComprehensiveYearDate','ComprehensiveMonthDate'])
		},store,
		methods:{
			...mapMutations(['SetComprehensiveYearDate','SetComprehensiveMonthDate']),
			ListClick(code){//点击切换不同薪酬详情
				this.TitleList.forEach( (item) => {
					item.active = false
					if( item.id == code){
						item.active = true
						this.ListShow = item.id.toString()
						this.getContent(this.ListShow,this.yeardate,this.monthdate)
					}
				})
			},
			/*封装薪酬详情接口*/
			getContent(index,yeardate,monthdate){
				let requ = {
					'search':{
						"agentCode": this.agentCode,/*this.agentCode*/
						"channel": '02',
						"year":yeardate,
						"month":monthdate,
						"model":index
					}
				}
				console.log(requ)
				//ZHPAYDETAIL 接口地址
				utils.http.postFast('ZHPAYDETAIL',requ,(body,header) => {
					console.log(body)
					console.log(header)
					if(header.resultCode == 0){
						let data = body.search
						console.log(data)
						this.afterawardnext = data.afterawardnext/*实发金额*/
						this.beforawardm = data.beforawardm /*税前合计*/
						this.beforaward = data.beforaward/*应缴税金*/
						this.sumaward = data.sumaward/*税后薪酬*/
						/*******************绩效明细*************************/
						this.jixiaoDetail.ftransmoney = data.jixiaoDetail.ftransmoney/*个人首期保费*/
						if(this.jixiaoDetail.ftransmoney == '0' || this.jixiaoDetail.ftransmoney == '0.00' || this.jixiaoDetail.ftransmoney == ''){
							this.jixiaoDetail.ftransmoney = '0'
						}
						this.jixiaoDetail.faward = data.jixiaoDetail.faward/*个人首期绩效提奖*/
						if(this.jixiaoDetail.faward == '0' || this.jixiaoDetail.faward == '0.00' || this.jixiaoDetail.faward == ''){
							this.jixiaoDetail.faward = '0'
						}
						this.jixiaoDetail.fgtransmoney = data.jixiaoDetail.fgtransmoney/*团队首期保费*/
						if(this.jixiaoDetail.fgtransmoney == '0' || this.jixiaoDetail.fgtransmoney == '0.00' || this.jixiaoDetail.fgtransmoney == ''){
							this.jixiaoDetail.fgtransmoney = '0'
						}
						this.jixiaoDetail.fgaward = data.jixiaoDetail.fgaward/*团队首期绩效提奖*/
						if(this.jixiaoDetail.fgaward == '0' || this.jixiaoDetail.fgaward == '0.00' || this.jixiaoDetail.fgaward == ''){
							this.jixiaoDetail.fgaward = '0'
						}
						this.jixiaoDetail.stransmoney = data.jixiaoDetail.stransmoney/*续期保费（个人）*/
						if(this.jixiaoDetail.stransmoney == '0' || this.jixiaoDetail.stransmoney == '0.00' || this.jixiaoDetail.stransmoney == ''){
							this.jixiaoDetail.stransmoney = '0'
						}
						this.jixiaoDetail.saward = data.jixiaoDetail.saward/*续期绩效提奖（个人）*/
						if(this.jixiaoDetail.saward == '0' || this.jixiaoDetail.saward == '0.00' || this.jixiaoDetail.saward == ''){
							this.jixiaoDetail.saward = '0'
						}
						this.jixiaoDetail.jobaward = data.jixiaoDetail.jobaward/*岗位津贴*/
						if(this.jixiaoDetail.jobaward == '0' || this.jixiaoDetail.jobaward == '0.00' || this.jixiaoDetail.jobaward == ''){
							this.jixiaoDetail.jobaward = '0'
						}
						this.jixiaoDetail.yearbonus = data.jixiaoDetail.yearbonus/*年终奖*/
						if(this.jixiaoDetail.yearbonus == '0' || this.jixiaoDetail.yearbonus == '0.00' || this.jixiaoDetail.yearbonus == ''){
							this.jixiaoDetail.yearbonus = '0'
						}
						console.log('绩效明细------>>>',this.jixiaoDetail)
						/*******************加扣款明细*************************/
						this.jiakoukuanDetail.qrqwPlan = data.jiakoukuanDetail.qrqwPlan/*千人千网计划*/
						this.jiakoukuanDetail.jobaward = data.jiakoukuanDetail.jobaward/*岗位津贴*/
						this.jiakoukuanDetail.cqMoney = data.jiakoukuanDetail.cqMoney/*差勤加扣款*/
						this.jiakoukuanDetail.eataward = data.jiakoukuanDetail.eataward/*午餐补贴*/
						this.jiakoukuanDetail.festivalPacket = data.jiakoukuanDetail.festivalPacket/*节日礼金*/
						this.jiakoukuanDetail.danzhengpinzhi = data.jiakoukuanDetail.danzhengpinzhi/*单证品质*/
						this.jiakoukuanDetail.waitWrite = data.jiakoukuanDetail.waitWrite/*代签字扣款*/
						this.jiakoukuanDetail.pinzhiAndSign = data.jiakoukuanDetail.pinzhiAndSign/*单证品质/代签字扣款调整*/
						this.jiakoukuanDetail.question = data.jiakoukuanDetail.question/*合规问题*/
						this.jiakoukuanDetail.quitWithhold = data.jiakoukuanDetail.quitWithhold/*离职暂扣/补发*/
						this.jiakoukuanDetail.specialMasster = data.jiakoukuanDetail.specialMasster/*特殊事项*/
						this.jiakoukuanDetail.other = data.jiakoukuanDetail.other/*其他*/
						this.jiakoukuanDetail.renewalService = data.jiakoukuanDetail.renewalService/*续期服务费*/
						this.jiakoukuanDetail.orphanCharge = data.jiakoukuanDetail.orphanCharge/*孤儿保单服务费*/
						this.jiakoukuanDetail.jianzhiPeople = data.jiakoukuanDetail.jianzhiPeople/*兼职续收人员佣金
						*/
						this.jiakoukuanDetail.returnWithdrawing = data.jiakoukuanDetail.returnWithdrawing/*回执加扣款*/
						this.jiakoukuanDetail.returnVisit = data.jiakoukuanDetail.returnVisit/*回访*/
						this.jiakoukuanDetail.cretExam = data.jiakoukuanDetail.cretExam/*认证考试*/
						this.jiakoukuanDetail.allowance = data.jiakoukuanDetail.allowance/*月度管理津贴*/





						/*“单证品质”字段后的下拉按钮后展示字段*/
						this.jiakoukuanDetail.payReturnVisit = data.jiakoukuanDetail.payReturnVisit/*期缴回访扣款*/
						this.jiakoukuanDetail.paymentHesitate = data.jiakoukuanDetail.paymentHesitate/*期缴综合犹退扣款*/
						this.jiakoukuanDetail.returnMoney = data.jiakoukuanDetail.returnMoney/*回执回销扣款*/
						this.jiakoukuanDetail.cusCard = data.jiakoukuanDetail.cusCard/*大额客户身份识别扣款*/
						/*“单证品质”字段后的下拉按钮后展示字段*/


						if(!this.jiakoukuanDetail.qrqwPlan && !this.jiakoukuanDetail.jobaward && !this.jiakoukuanDetail.cqMoney && !this.jiakoukuanDetail.allowance && !this.jiakoukuanDetail.eataward && !this.jiakoukuanDetail.festivalPacket && !this.jiakoukuanDetail.danzhengpinzhi && !this.jiakoukuanDetail.payReturnVisit && !this.jiakoukuanDetail.paymentHesitate && !this.jiakoukuanDetail.returnMoney && !this.jiakoukuanDetail.cusCard && !this.jiakoukuanDetail.waitWrite && !this.jiakoukuanDetail.pinzhiAndSign && !this.jiakoukuanDetail.question&& !this.jiakoukuanDetail.quitWithhold&& !this.jiakoukuanDetail.specialMasster&& !this.jiakoukuanDetail.other&& !this.jiakoukuanDetail.renewalService&& !this.jiakoukuanDetail.orphanCharge&& !this.jiakoukuanDetail.jianzhiPeople&& !this.jiakoukuanDetail.returnWithdrawing&& !this.jiakoukuanDetail.returnVisit&& !this.jiakoukuanDetail.allowance&&!this.jiakoukuanDetail.cretExam&& !this.jiakoukuanDetail.allowance){
							this.listTitle = false
						}else{
							this.listTitle = true
						}

						this.jiakoukuanDetail.cash = data.jiakoukuanDetail.cash/*现金激励案*/
						this.jiakoukuanDetail.shiti = data.jiakoukuanDetail.shiti/*实物-据实提*/
						this.jiakoukuanDetail.yuti = data.jiakoukuanDetail.yuti/*实物-冲预提*/

						this.jiakoukuanDetail.hraward = data.jiakoukuanDetail.hraward/*HR应税工资*/
						if(this.jiakoukuanDetail.hraward == '' || this.jiakoukuanDetail.hraward == '0' || this.jiakoukuanDetail.hraward == '0.00'){
							this.jiakoukuanDetail.hraward = '0.00'
						}
						this.jiakoukuanDetail.hrawards = data.jiakoukuanDetail.hrawards/*HR个人所得税*/
						if(this.jiakoukuanDetail.hrawards == '' || this.jiakoukuanDetail.hrawards == '0' || this.jiakoukuanDetail.hrawards == '0.00'){
							this.jiakoukuanDetail.hrawards = '0.00'
						}
						this.jiakoukuanDetail.beforawardm = data.jiakoukuanDetail.beforawardm/*税前财务佣金调整*/
						if(this.jiakoukuanDetail.beforawardm == '' || this.jiakoukuanDetail.beforawardm == '0' || this.jiakoukuanDetail.beforawardm == '0.00'){
							this.jiakoukuanDetail.beforawardm = '0.00'
						}
						this.jiakoukuanDetail.afterawardm = data.jiakoukuanDetail.afterawardm/*税后财务佣金调整*/
						if(this.jiakoukuanDetail.afterawardm == '' || this.jiakoukuanDetail.afterawardm == '0' || this.jiakoukuanDetail.afterawardm == '0.00'){
							this.jiakoukuanDetail.afterawardm = '0.00'
						}
						this.jiakoukuanDetail.afterAdjustment = data.jiakoukuanDetail.afterAdjustment/*税后调整*/
						console.log('加扣款明细------>>>',this.jiakoukuanDetail)
						/*******************福利明细*************************/
						this.fuliDetail.eataward = data.fuliDetail.eataward/*午餐补贴*/
						if(this.fuliDetail.eataward == '' || this.fuliDetail.eataward == '0' || this.fuliDetail.eataward == '0.00'){
							this.fuliDetail.eataward = '0.00'
						}
						this.fuliDetail.ageaward = data.fuliDetail.ageaward/*司龄津贴*/
						if(this.fuliDetail.ageaward == '' || this.fuliDetail.ageaward == '0' || this.fuliDetail.ageaward == '0.00'){
							this.fuliDetail.ageaward = '0.00'
						}
						this.fuliDetail.degreeaward = data.fuliDetail.degreeaward/*学历津贴*/
						if(this.fuliDetail.degreeaward == '' || this.fuliDetail.degreeaward == '0' || this.fuliDetail.degreeaward == '0.00'){
							this.fuliDetail.degreeaward = '0.00'
						}
						console.log('福利明细------>>>',this.fuliDetail)
						/*******************税金明细*************************/
						this.shuijinDetai.hraward = data.shuijinDetail.hraward/*HR应税工资*/
						if(this.shuijinDetai.hraward == '' || this.shuijinDetai.hraward == '0' || this.shuijinDetai.hraward == '0.00'){
							this.shuijinDetai.hraward = '0.00'
						}
						this.shuijinDetai.hrawards = data.shuijinDetail.hrawards/*HR个人所得税*/
						if(this.shuijinDetai.hrawards == '' || this.shuijinDetai.hrawards == '0' || this.shuijinDetai.hrawards == '0.00'){
							this.shuijinDetai.hrawards = '0.00'
						}
						this.shuijinDetai.sumaward = data.shuijinDetail.sumaward/*总应税工资*/
						if(this.shuijinDetai.sumaward == '' || this.shuijinDetai.sumaward == '0' || this.shuijinDetai.sumaward == '0.00'){
							this.shuijinDetai.sumaward = '0.00'
						}
						this.shuijinDetai.sumawards = data.shuijinDetail.sumawards/*总个人所得税*/
						if(this.shuijinDetai.sumawards == '' || this.shuijinDetai.sumawards == '0' || this.shuijinDetai.sumawards == '0.00'){
							this.shuijinDetai.sumawards = '0.00'
						}
						this.shuijinDetai.beforawardm = data.shuijinDetail.beforawardm/*税前财务佣金*/
						if(this.shuijinDetai.beforawardm == '' || this.shuijinDetai.beforawardm == '0' || this.shuijinDetai.beforawardm == '0.00'){
							this.shuijinDetai.beforawardm = '0.00'
						}
						this.shuijinDetai.sumcwawards = data.shuijinDetail.sumcwawards/*财务佣金个人所得税*/
						if(this.shuijinDetai.sumcwawards == '0' || this.shuijinDetai.sumcwawards == '0.00'){
							this.shuijinDetai.sumcwawards = '0.00'
						}


						this.shuijinDetai.yearbonus = data.shuijinDetail.yearbonus/*年终奖*/
						this.shuijinDetai.yearbonuss = data.shuijinDetail.yearbonuss/*年终奖个人所得税*/
						this.shuijinDetai.lastaward = data.shuijinDetail.lastaward/*税后上期余额*/
						this.shuijinDetai.afterawardnext = data.shuijinDetail.afterawardnext/*税后净收入转下期*/
						console.log('税金明细------>>>',this.shuijinDetai)
					}else {
						this.newModel = true
						this.modelContent = header.resultMsg
					}
				})
},
openChild(){/*点击显示隐藏数据*/
	this.childDataShow = !this.childDataShow
	if(this.childDataShow){
		this.openImg = 'static/img/comprehensive/top.png'
	}else {
		this.openImg = 'static/img/comprehensive/bottom.png'
	}
},
SelectData(){/*点击搜索按钮*/
	console.log(this.yeardate)
	console.log(this.monthdate)
	this.getContent(this.ListShow,this.yeardate,this.monthdate)
},
goToLoad(id){
	this.$router.push('/comprehensiveYinbao/myCommissionDownload/'+id)
},
ClosenewModel(){
	this.newModel = false
}
},
watch:{
	yearDate(index){/*监听年份的变化*/
		this.yeardate = index.toString()
		this.SetComprehensiveYearDate(this.yeardate)
	},
	monthDate(index){/*监听月份的变化*/
		this.monthdate = this.monthDate
		this.SetComprehensiveMonthDate(this.monthdate)
	},
}
}
</script>

<style>
	.my-index-picker{
		position:absolute;
		top:80px;
		left:10%;
	}
	.my-comm-details {
		background: url('../../../../../static/img/comprehensive/Bg_green.png') no-repeat;
		min-height: 180px;
		background-size:100% 100%;
		padding: 15px 0 10px 0;
	}

	.flex {
		display: flex;
		justify-content: space-between;
	}

	.text-center {
		text-align: center;
	}

	.my-comm-details>p,
	.my-comm-details>h2 {
		font-size: 1.2rem;
		color: #fff;
	}

	.my-comm-details>h2 {
		font-size: 2.2rem;
		margin: 15px 0;
	}

	.my-comm-details-div-top {
		width: 90%;
		margin: 0 auto;
	}

	.my-comm-details-div-top>div {
		width: 33%;
		min-height: 40px;
	}

	.my-comm-details-div-top>div:nth-child(2) {
		border-left: 2px dashed #fff;
		border-right: 2px dashed #fff;
	}

	.my-comm-details-div-top>div>p {
		text-align: center;
		color: #fff;
		font-size: .8rem;
		margin-top: 5px;
	}

	.my-comm-details-links {
		width: 75%;
		margin: 20px auto;
	}

	.my-comm-details-links>a {
		display: block;
		background: #fff;
		border-radius: 15px;
		color: #FFB305;
		padding: 8px;
		width: 40%;
		text-align: center;
		outline: none;
	}

	.my-comm-list {
		width: 100%;
		height: 30px;
		background: #fff;
		padding: 15px 0 10px 0;
		border-bottom: 2px solid #ccc;
	}

	.my-comm-list>a {
		width: 25%;
		display: block;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color:#000;
		font-size: .9rem;
		border-right: 2px dashed #ccc;
	}

	.my-comm-list>a:last-child {
		border: none;
	}
	.my-comm-btm-ul {
		width: 100%;
		background: #fff;
	}

	.my-comm-btm-ul>li {
		flex-wrap: wrap;
		line-height: 35px;
		background: #fff;
		padding: 0 5%;
	}

	.my-comm-btm-ul>li:nth-of-type(even) {
		background: #F1F1F1;
	}

	.my-comm-btm-ul>li>ul {
		width: 100%;
		padding:1% 10%;
	}
	.text-active{
		color:#FA770F!important;
	}
</style>
