<!-- 考核预警  考核详情页面  -->
<template>
	<div class="detailCon assess-detail compre-content" id='top'>
		<div class="pickerContent assess-data-picker-left">
			<p class="fontIcon">
				<i style="font-size:18px;color:#FEB001" class="fa fa-calendar" aria-hidden="true"></i>
			</p>
			<div class="dateShow">
				<p>
					<year-picker class="picker" :values="yearDate" v-model="yearDate" :items="yearList" code="code" text="text">
					</year-picker>年
				</p>
				<p>
					<year-picker :values="monthDate" v-model="monthDate" :items="monthList" code="code" text="text">
					</year-picker>月
				</p>
			</div>
			<p class="fontIcon" @click='AssessSelectDate'>
				<i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true"></i>
			</p>
		</div>

		<div class="assessAns" ref='assessAns'>
			<table></table>
			<p class="timeProgress text-center" ref='timeProgress' v-if='ComprehensiveTitleType == 1'>时间进度</p>
			<div class="progressBox" ref='progressBox'  v-if='ComprehensiveTitleType == 1'>
				<mt-progress :value="progressValue" :bar-height="8" class="progress"></mt-progress>{{progressScale+"%"}}
			</div>
			<div class="excircle">
				<!-- <p style="color:#fff" class='text-center'>考核结果</p> -->
				<p style="color:#fff" class='text-center'>
					<a>考核结果</a>
				</p>
				<p class="text-center" style='font-size:1.4rem;color:#fff'>{{assessResult}}</p>
			</div>
			<div class="textAns">
				<div class="textShow">
					<p>考核后职级</p>
					<p class="bigFont">{{assessRank}}</p>
				</div>
				<div class="textShow">
					<p>考核类型</p>
					<p class="bigFont">{{testType}}</p>
				</div>
				<div style="text-align:center;width:33%;">
					<p>连续考核降级次数</p>
					<p class="bigFont">{{reduceCount}}</p>
				</div>
			</div>
		</div>
		<div class="taskData flex">
			<a v-for='item in EarlyWarningTypes' @click='SetbtmList(item.id)' :class='[item.active==true?"text-active":" "]'>{{item.name}}</a>
		</div>
		<!-- 业绩指标List -->
		<ul v-show='listNum==1'>
			<li class='flex ass-details-btm-list'>
				<span>期交件数</span>
				<span v-if='Achievement.polnumqj'>{{Achievement.polnumqj}}件</span>
			</li>
			<li class='flex ass-details-btm-list' v-if='titleType == 1'>
				<span>期交件数-维持</span>
				<span v-if='Achievement.polnumqjdw'>{{Achievement.polnumqjdw}}件</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>期交件数-差额</span>
				<span v-if='Achievement.polnumqjDiff'>{{Achievement.polnumqjDiff}}件</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>承保标准保费</span>
				<div class='flex' style='width:50%;'>
					<a id='achievement_load' ref='achievement_load' target='_blank' style='outline:none'>
						<span id='achievement_load_span' @click='Loades(1)'  style='color:#FF6600;text-decoration:underline;height:30px;line-height:30px;outline:none'>详情下载</span>
					</a>
					<span v-if='Achievement.standprem'>{{Achievement.standprem}}元</span>
				</div>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>标准保费任务-维持</span>
				<span v-if='Achievement.standpremardw'>{{Achievement.standpremardw}}元</span>
			</li>
			<li class='flex ass-details-btm-list'  v-if='titleType == 1'>
				<span>标准保费维持-差额</span>
				<span v-if='Achievement.standpremardwDiff'>{{Achievement.standpremardwDiff}}元</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>标准保费任务-晋升</span>
				<span v-if='Achievement.standpremardj'>{{Achievement.standpremardj}}元</span>
			</li>
			<li class='flex ass-details-btm-list' v-if='titleType == 1'>
				<span>标准保费晋升-差额</span>
				<span v-if='Achievement.standpremardjDiff'>{{Achievement.standpremardjDiff}}元</span>
			</li>
		</ul>
		<!-- 品质指标List -->
		<ul v-show='listNum==2'>
			<li class='flex ass-details-btm-list'>
				<span>回访成功率</span>
				<span v-if='Quality.visitpr'>{{Quality.visitpr}}</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>13个月综合继续率</span>
				<div class='flex' style='width:40%'>
					<a atarget='_blank' id='quality_load' ref='quality_load' target='_blank' style='outline:none'></a>
					<span style='color:#FF6600;text-decoration:underline;height:30px;line-height:30px;outline:none' target='_blank' id='quality_load_span' @click='Loades(2)'>详情下载</span>
					<span v-if='Quality.alperpr'>{{Quality.alperpr}}</span>
				</div>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>品质得分</span>
				<span v-if='Quality.monthabc'>{{Quality.monthabc}}分</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>期交回访成功率</span>
				<span v-if='Quality.qjvisitpr'>{{Quality.qjvisitpr}}</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>期交综合犹退率</span>
				<span v-if='Quality.qjhestitatepr'>{{Quality.qjhestitatepr}}</span>
			</li>
		</ul>
		<!-- 认证考试List -->
		<ul v-show='listNum==3'>
			<li class='flex ass-details-btm-list'>
				<span>是否通过</span>
				<span v-if='Authentication.doneorno'>{{Authentication.doneorno}}</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>通过日期</span>
				<span v-if='Authentication.donedate'>{{Authentication.donedate}}</span>
			</li>
		</ul>
		<!-- 人力指标List -->
		<ul v-show='listNum==4'>
			<li class='flex ass-details-btm-list'>
				<span>下辖人力指标</span>
				<span v-if='RenliTarget.underpowre'>{{RenliTarget.underpowre}}人</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>下辖人力指标-维持</span>
				<span v-if='RenliTarget.underpowrew'>{{RenliTarget.underpowrew}}人</span>
			</li>
			<li class='flex ass-details-btm-list' v-if='titleType == 1'>
				<span>下辖人力维持-差距</span>
				<span v-if='RenliTarget.underpowrewc'>{{RenliTarget.underpowrewc}}人</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>下辖人力指标-晋升</span>
				<span v-if='RenliTarget.underpowrej'>{{RenliTarget.underpowrej}}人</span>
			</li>
			<li class='flex ass-details-btm-list' v-if='titleType == 1'>
				<span>下辖人力晋升-差距</span>
				<span v-if='RenliTarget.underpowrejc'>{{RenliTarget.underpowrejc}}人</span>
			</li>

			<li class='flex ass-details-btm-list'>
				<span>合格人力指标</span>
				<span v-if='RenliTarget.qualifiypower'>{{RenliTarget.qualifiypower}}人</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>合格人力指标-维持</span>
				<span v-if='RenliTarget.qualifiypowerw'>{{RenliTarget.qualifiypowerw}}人</span>
			</li>
			<li class='flex ass-details-btm-list' v-if='titleType == 1'>
				<span>合格人力维持-差距</span>
				<span v-if='RenliTarget.qualifiypowerwc'>{{RenliTarget.qualifiypowerwc}}人</span>
			</li>
			<li class='flex ass-details-btm-list'>
				<span>合格人力指标-晋升</span>
				<span v-if='RenliTarget.qualifiypowerj'>{{RenliTarget.qualifiypowerj}}人</span>
			</li>
			<li class='flex ass-details-btm-list' v-if='titleType == 1'>
				<span>合格人力晋升-差距</span>
				<span v-if='RenliTarget.qualifiypowerjc'>{{RenliTarget.qualifiypowerjc}}人</span>
			</li>
		</ul>
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

<script>
	import alert from '../../../policy/common/alert.vue'
	import { Progress } from 'mint-ui'
	import { mapState,mapMutations } from 'vuex'
	import yearPicker from '../../../common/Picker.vue'
	import store from '../../../../vuex/comprehensive/comprehensive'
	import { Popup } from 'mint-ui'
	export default{
		name:'assessDetail',
		components:{alert,Progress,yearPicker},
		data () {
			return {
				isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				newModel:false,/*提示框默认不弹出*/
				modelContent:'',/*提示框内容*/
				yearList:[],/*年列表*/
				yearDate:"",/*查询年*/
				year:'',
				titleType:'',
				monthList:['01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
				monthDate:"06",/*查询月*/
				loadTextTitle:'',

				progressValue:0,/*进度值*/
				progressScale:0,/*进度百分比*/
				assessResult:"",/*考核结果*/
				assessRank:"",/*考核后职级*/
				testType:"",/*考核类型*/
				reduceCount:"",/*考核降级次数*/
				listNum:'1',/*控制显示最下面的ul*/
				manager:"",/*是否是经理*/
				EarlyWarningTypes:[
				{id:'1',name:'业绩指标',active:true},
				{id:'2',name:'品质指标',active:false},
				{id:'3',name:'认证考试',active:false},
				{id:'4',name:'人力指标',active:false}
				],
				personsal:utils.cache.get("personsal"),
				Achievement:{/*业绩指标数据*/
					polnumqj:'',/*期交件数*/
					polnumqjdw:'',/*期交件数-维持*/
					polnumqjDiff:'',/*期交件数-差额*/
					standprem:'',/*承保标准保费*/
					standpremardw:'',/*标准保费任务-维持*/
					standpremardwDiff:'',/*标准保费维持-差额*/
					standpremardj:'',/*标准保费任务-晋升*/
					standpremardjDiff:''/*标准保费晋升-差额*/
				},
				Quality:{/*品质指标*/
					visitpr:'',/*回访成功率*/
					alperpr:'',/*13个月综合继续率*/
					monthabc:'',/*品质得分*/
					qjvisitpr:'',/*期交回访成功率*/
					qjhestitatepr:''/*期交综合犹退率*/
				},
				Authentication:{/*认证考试*/
					donedate:'',/*是否通过*/
					doneorno:''/*通过日期*/
				},
				RenliTarget:{/*人力指标*/
					underpowre:'',/*下辖人力指标*/
					underpowrew:'',/*下辖人力指标-维持*/
					underpowrewc:'',/*下辖人力维持-差距*/
					underpowrej:'',/*下辖人力指标-晋升*/
					underpowrejc:'',/*下辖人力晋升-差距*/
					qualifiypower:'',/*合格人力指标*/
					qualifiypowerj:'',/*合格人力指标-晋升*/
					qualifiypowerw:'',/*合格人力指标-维持*/
					qualifiypowerwc:'',/*合格人力维持-差距*/
					qualifiypowerjc:'',/*合格人力晋升-差距*/
				}
			}
		},
		mounted(){
			this.titleType = this.ComprehensiveTitleType
			/*时间选择*/
			this.yearDate=new Date().getFullYear() /*获取年数组*/
			if(this.ComprehensiveSearchMonthDate!='0'){/*修改月份的初始化*/
				this.monthDate = this.ComprehensiveSearchMonthDate
			}else {
				if(new Date().getMonth()<=9){
					this.monthDate = '0' + (new Date().getMonth()+1)
				}else {
					this.monthDate = new Date().getMonth()+''
				}
			}
			let yearList1=[],yearList2=[]
			for(var i=2018; i<this.yearDate;i++){
				yearList1.push(i)
			}
			for(var i=this.yearDate; i<(this.yearDate)+100; i++){
				yearList2.push(i)
			}
			this.yearList=yearList1.concat(yearList2)
			if(this.ComprehensiveSearchYearDate!=0){/*修改年份的初始化*/
				this.yearDate = this.ComprehensiveSearchYearDate
			}
			this.year = this.yearDate.toString()
			console.log('考核预警/正式考核-------->>>',this.ComprehensiveTitleType)
			console.log("代理人信息---------->>>>", this.personsal.agentCode)
			console.log('年---------->>>>',this.year)
			console.log('月---------->>>>',this.monthDate)
			let count = 1;
			let timer = setInterval( ()=>{
				count++;
				if(this.ComprehensiveTitleType == 1){/*考核预警*/
					this.EarlywarningSelect(this.listNum,this.monthDate,'ZHWARNDETAIL',this.year)
				}else if (this.ComprehensiveTitleType == 2){
					this.EarlywarningSelect(this.listNum,this.monthDate,'ZHFORMALDETAIL',this.year)
				}
				clearInterval(timer)
			},100)
		},
		computed: {
			...mapState(['ComprehensiveTitleType','ComprehensiveSearchMonthDate','ComprehensiveSearchYearDate'])
		},store,
		methods:{
			...mapMutations(['SetComprehensiveSearchMonthDate','SetComprehensiveSearchYearDate']),
			ClosenewModel(){
				this.newModel = false
			},
			Loades(id){
				if(this.ComprehensiveTitleType == 1){/*考核预警*/
					if(id == 1){/*业绩指标*/
						this.EarlywarningLoad('ZHWARNDOWNLOAD',this.monthDate,'1',this.year)
					}else if(id == 2){/*品质指标*/
						this.EarlywarningLoad('ZHWARNDOWNLOAD',this.monthDate,'2',this.year)
					}
				}else if(this.ComprehensiveTitleType == 2){/*正式考核*/
					if(id == 1){/*业绩指标*/
						this.EarlywarningLoad('ZHFORMALDOWNLOAD',this.monthDate,'1',this.year)
					}else if(id == 2){/*品质指标*/
						this.EarlywarningLoad('ZHFORMALDOWNLOAD',this.monthDate,'2',this.year)
					}
				}
			},
			/*业绩指标，品质指标，认证考试  点击切换数据并且高亮显示，并给下载元素赋值*/
			SetbtmList(code){
				this.EarlyWarningTypes.forEach( (item) => {
					item.active = false
					if(code == item.id){
						console.log(item)
						this.listNum = code
						if(this.ComprehensiveTitleType == 1){
							/*考核预警*/
							this.EarlywarningSelect(this.listNum,this.monthDate,'ZHWARNDETAIL',this.year)
						}else if(this.ComprehensiveTitleType == 2){
							/*正式考核*/
							this.EarlywarningSelect(this.listNum,this.monthDate,'ZHFORMALDETAIL',this.year)
						}
						item.active = true
					}
				})
			},
			/*数据查询 考核预警-ZHWARNDETAIL 正式考核-ZHFORMALDETAIL*/
			EarlywarningSelect(model,month,url,year){ /*bottom模块,月份,接口,*/
				if(this.$parent.yearDate && this.$parent.monthDate){
					let requ = {
						"search": {
							agentCode:this.personsal.agentCode,//考核预警测1100000011  正式考试1300000032
							channel:'02',
							year:year,
							month:month,
							model:model
						}
					}
					utils.http.postFast(url,requ,(body,header)=> {
						$('#achievement-load').removeAttr('href').removeAttr('target')
						$('#quality-load').removeAttr('href').removeAttr('target')
						console.log('返回数据',body)
						console.log('返回数据头',header)
						let Data = body.search
						console.log(this.ComprehensiveTitleType)
						if(this.ComprehensiveTitleType == 1){
							this.manager = Data.isManagerY
						}else if(this.ComprehensiveTitleType == 2){
							this.manager = Data.isManagerZ
						}
						console.log(this.manager)
						if(header.resultCode == '0'){/*if数据正常*/
							/*如果不是经理级代理人,则不显示人力指标项*/
							if(this.manager!=='Y'){
								let len = this.EarlyWarningTypes.length-1;
								this.EarlyWarningTypes.splice(3,1)
								if(model == '4'){
									this.EarlyWarningTypes[0].active = true
									this.listNum = 1
								}
							}else {/*是经理级代理人，则显示*/
								if(model == '4'){
									this.EarlyWarningTypes[3] = {id:'4',name:'人力指标',active:true}
								}else{
									this.EarlyWarningTypes[3] = {id:'4',name:'人力指标',active:false}
								}
							}
							console.log(this.EarlyWarningTypes)
							let timeProcess = parseInt(Data.timeProcess)
							this.progressValue = timeProcess/*进度值*/
							this.progressScale = parseInt(Data.timeProcess)/*进度百分比*/
							this.assessResult = Data.monthIndex/*考核结果*/
							if(Data.assessResult == '清退'){/*考核后职级*/
								this.assessRank = '-'
							}else {
								this.assessRank = Data.agentgradeafter
							}
							if(Data.assesstype){/*考核类型*/
								this.testType = Data.assesstype
							}else {
								this.testType = ' '
							}
							if(Data.rearum){/*考核降级次数*/
								this.reduceCount = Data.rearum
							}else{
								this.reduceCount = ' '
							}
							/********************************业绩指标****************************/
							this.Achievement.polnumqj = Data.yejiTarget.polnumqj/*期交件数*/
							this.Achievement.polnumqjdw = Data.yejiTarget.polnumqjdw/*期交件数-维持*/
							if(parseFloat(Data.yejiTarget.polnumqjDiff)<=0 || Data.yejiTarget.polnumqjDiff == 0){/*期交件数-差额*/
								this.Achievement.polnumqjDiff = '0'
							}else{
								this.Achievement.polnumqjDiff = Data.yejiTarget.polnumqjDiff
							}
							console.log('期交件数-差额',this.Achievement.polnumqjDiff)
							if(Data.yejiTarget.standprem){/*承保标准保费*/
								this.Achievement.standprem = parseFloat(Data.yejiTarget.standprem).toFixed(2)
							}else{
								this.Achievement.standprem = ''
							}
							if(Data.yejiTarget.standpremardw){/*标准保费任务-维持*/
								this.Achievement.standpremardw = parseFloat(Data.yejiTarget.standpremardw).toFixed(2)
							}else {
								this.Achievement.standpremardw = ''
							}
							if(Data.yejiTarget.standpremardwDiff){/*标准保费维持-差额*/
								this.Achievement.standpremardwDiff = parseFloat(Data.yejiTarget.standpremardwDiff).toFixed(2)
							}else{
								this.Achievement.standpremardwDiff = '0.00'
							}
							if(Data.yejiTarget.standpremardj){/*标准保费任务-晋升*/
								this.Achievement.standpremardj = parseFloat(Data.yejiTarget.standpremardj).toFixed(2)
							}else {
								this.Achievement.standpremardj = ''
							}
							if(Data.yejiTarget.standpremardjDiff){/*标准保费晋升-差额*/
								this.Achievement.standpremardjDiff = parseFloat(Data.yejiTarget.standpremardjDiff).toFixed(2)
							}else {
								this.Achievement.standpremardjDiff = '0.00'
							}
							console.log('业绩指标',this.Achievement)
							/********************************品质指标****************************/
							/*回访成功率*/
							if(Data.pinzhiTarget.visitpr == '-1'){
								this.Quality.visitpr = '-1'
							}else{
								this.Quality.visitpr = Data.pinzhiTarget.visitpr+'%'
							}
							/*13个月综合继续率*/
							if(Data.pinzhiTarget.alperpr == '-1'){
								this.Quality.alperpr = '-1'
							}else{
								this.Quality.alperpr = Data.pinzhiTarget.alperpr+'%'
							}
							/*期交回访成功率*/
							if(Data.pinzhiTarget.qjvisitpr == '-1'){
								this.Quality.qjvisitpr = '-1'
							}else{
								this.Quality.qjvisitpr = Data.pinzhiTarget.qjvisitpr+'%'
							}
							/*期交综合犹退率*/
							if(Data.pinzhiTarget.qjhestitatepr == '-1'){
								this.Quality.qjhestitatepr  = '-1'
							}else{
								this.Quality.qjhestitatepr  = Data.pinzhiTarget.qjhestitatepr+'%'
							}
							this.Quality.monthabc = Data.pinzhiTarget.monthabc/*品质得分*/
							console.log('品质指标-----》》》',Data.pinzhiTarget)
							console.log(this.Quality.monthabc)
							console.log('品质指标',this.Quality)
							/********************************认证考试****************************/
							this.Authentication.donedate = Data.certifiExam.donedate.substr(0,10)/*通过日期*/
							this.Authentication.doneorno = Data.certifiExam.doneorno/*是否通过*/
							console.log('认证考试',this.Authentication)
							/********************************人力指标****************************/
							this.RenliTarget.qualifiypower = Data.renliTarget.qualifiypower/*合格人力指标*/
							this.RenliTarget.qualifiypowerj = Data.renliTarget.qualifiypowerj/*合格人力指标-晋升*/
							this.RenliTarget.qualifiypowerw = Data.renliTarget.qualifiypowerw/*合格人力指标-维持*/
							this.RenliTarget.qualifiypowerwc = Data.renliTarget.qualifiypowerwc/*合格人力维持-差距*/
							this.RenliTarget.underpowre = Data.renliTarget.underpowre/*下辖人力指标*/
							this.RenliTarget.underpowrej = Data.renliTarget.underpowrej/*下辖人力指标-晋升*/
							this.RenliTarget.underpowrejc = Data.renliTarget.underpowrejc/*下辖人力晋升-差距*/
							this.RenliTarget.underpowrew = Data.renliTarget.underpowrew/*下辖人力指标-维持*/
							this.RenliTarget.qualifiypowerjc = Data.renliTarget.qualifiypowerjc/*合格人力晋升-差距*/
							this.RenliTarget.underpowrewc = Data.renliTarget.underpowrewc/*下辖人力指标-差距*/
							console.log('人力指标',this.RenliTarget)
						}else {
							this.newModel = true
							this.modelContent = header.resultMsg
							console.log('数据异常')
							/*如果不是经理级代理人,则不显示人力指标项*/
							if(this.manager!=='Y'){
								let len = this.EarlyWarningTypes.length-1;
								this.EarlyWarningTypes.splice(3,1)
								if(model == 4){
									this.EarlyWarningTypes[0].active = true
									this.listNum = 1
								}
							}else {/*是经理级代理人，则显示*/
								if(model == 4){
									this.EarlyWarningTypes[3] = {id:'4',name:'人力指标',active:true}
								}else{
									this.EarlyWarningTypes[3] = {id:'4',name:'人力指标',active:false}
								}
							}
							/********************业绩指标数据******************/
							this.Achievement.polnumqj = ''/*期交件数*/
							this.Achievement.polnumqjdw = ''/*期交件数-维持*/
							this.Achievement.polnumqjDiff = ''/*期交件数-差额*/
							this.Achievement.standprem = ''/*承保标准保费*/
							this.Achievement.standpremardw = ''/*标准保费任务-维持*/
							this.Achievement.standpremardwDiff = ''/*标准保费维持-差额*/
							this.Achievement.standpremardj = ''/*标准保费任务-晋升*/
							this.Achievement.standpremardjDiff = ''/*标准保费晋升-差额*/
							/********************品质指标数据******************/
							this.Quality.visitpr = ''
							this.Quality.visitpr = ''/*回访成功率*/
							this.Quality.alperpr = ''/*13个月综合继续率*/
							this.Quality.monthabc = ''/*品质得分*/
							this.Quality.qjvisitpr = ''/*期交回访成功率*/
							this.Quality.qjhestitatepr = ''/*期交综合犹退率*/
							/********************认证考试数据******************/
							this.Authentication.donedate = ''/*是否通过*/
							this.Authentication.doneorno = ''/*通过日期*/
							/********************人力指标数据******************/

							this.RenliTarget.qualifiypower = ''/*合格人力指标*/
							this.RenliTarget.qualifiypowerj = ''/*合格人力指标-晋升*/
							this.RenliTarget.qualifiypowerw = ''/*合格人力指标-维持*/
							this.RenliTarget.qualifiypowerwc = ''/*合格人力维持-差距*/
							this.RenliTarget.qualifiypowerjc = ''/*合格人力晋升-差距*/

							this.RenliTarget.underpowre = ''/*下辖人力指标*/
							this.RenliTarget.underpowrew = ''/*下辖人力指标-维持*/
							this.RenliTarget.underpowrewc = ''/*下辖人力维持-差距*/
							this.RenliTarget.underpowrej = ''/*下辖人力指标-晋升*/
							this.RenliTarget.underpowrejc = ''/*下辖人力晋升-差距*/
							/*时间进度*/
							this.progressValue = 0/*进度值*/
							this.progressScale = ' '/*进度百分比*/
							this.assessResult = ' '/*考核结果*/
							this.assessRank = ''/*考核后职级*/
							this.testType = ''/*考核类型*/
							this.reduceCount = ' '/*考核降级次数*/
						}
					});
}
},
/*下载 考核预警-ZHWARNDOWNLOAD  正式考核-ZHFORMALDOWNLOAD */
EarlywarningLoad(url,month,model,year){/*接口地址,月份,bottom模块,年份*/
	let requ = {
		"search": {
			agentCode:this.personsal.agentCode,  /*this.personsal.agentCode*/
			channel:'02',
			year:year,
			month:month,
			model:model
		}
	}
	utils.http.postFast(url,requ,(body,header)=> {
		console.log('返回数据',body.search)
		console.log('header---->>>',header)
		console.log(this.ComprehensiveTitleType)
		let LoadUrl = ''
		if(header.resultCode == 0){
			if(body.search.model == '1'){/*业绩指标下载*/
				if(this.ComprehensiveTitleType == 1){
					LoadUrl = body.search.laassesstemplistURL/*考核预警返回的url*/
				}else if(this.ComprehensiveTitleType == 2){
					LoadUrl = body.search.laassessURL/*正式考核返回的url*/
				}
				console.log('业绩指标url------->>>',LoadUrl)
				/*标题,提示信息，确定，取消*/
				let title = '生成Excel成功<br/>是否下载?'
				alert_n22.confirm('温馨提示',title,'下载','取消',(flag)=>{
					if(this.isiOS){
						var url = this.personsal.IOS_URL
						var urlObj = {
							"url": LoadUrl
						}
						var urlStr = JSON.stringify(urlObj)
							// console.log(urlStr);
							var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
							console.log(hybrid)
							//IOS升级
							MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
								alert(JSON.stringify(callbackSucc))
							}, function(callbackFail) {
								alert(callbackFail)
						});
					}else {
						window.open(LoadUrl, '_system')
					}
				})
			}else if(body.search.model == '2'){/*品质指标下载*/
				let load2Url = ''
				if(this.ComprehensiveTitleType == 1){
					load2Url = body.search.laassesstemprateURL/*考核预警返回的url*/
				}else if(this.ComprehensiveTitleType == 2){
					load2Url = body.search.laassessrateURL/*正式考核返回的url*/
				}
				/*标题,提示信息，确定，取消*/
				let title = '生成Excel成功 \n 是否下载?'
				alert_n22.confirm('温馨提示',title,'下载','取消',(flag)=>{
					if(this.isiOS){
						var url = this.personsal.IOS_URL
						var urlObj = {
							"url": load2Url
						}
					var urlStr = JSON.stringify(urlObj)
						// console.log(urlStr);
						var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
							console.log(hybrid)
							//IOS升级
							MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
								alert(JSON.stringify(callbackSucc))
							}, function(callbackFail) {
								alert(callbackFail)
							});
						}else {
							window.open(LoadUrl, '_system')
						}
				})
			}	
		}else {
			this.newModel = true
			this.modelContent = header.resultMsg
		}
	})
},
AssessSelectDate(){/*点击搜索按钮*/
	console.log(this.year)
	if(this.ComprehensiveTitleType == 1){/*考核预警*/
		this.EarlywarningSelect(this.listNum,this.monthDate,'ZHWARNDETAIL',this.year)
	}else if(this.ComprehensiveTitleType == 2){/*正式考核*/
		this.EarlywarningSelect(this.listNum,this.monthDate,'ZHFORMALDETAIL',this.year)
	}
}
},
watch:{/*监听页面是考核预警or正式考核*/
	ComprehensiveTitleType(old){
		this.titleType = old
		if(old == '1'){
			this.EarlywarningSelect(this.listNum,this.monthDate,'ZHWARNDETAIL',this.year)
		}else if(old == '2'){
			this.EarlywarningSelect(this.listNum,this.monthDate,'ZHFORMALDETAIL',this.year)
		}
	},
	monthDate(index){/*监听月份的变化*/
		this.SetComprehensiveSearchMonthDate(index)
	},
	yearDate(index){/*监听年份的变化*/
		this.year = index.toString()
		this.SetComprehensiveSearchYearDate(index)
	}
}
}	
</script>
<style>
	.detailCon{
		width: 100%;
	}
	.assessAns{
		background: url('../../../../../static/img/comprehensive/Bg_blue.png') no-repeat;
		min-height: 180px;
		background-size:100% 100%;
		padding: 15px 0 10px 0;
	}
	.timeProgress{
		color: #fff;
		margin: 5px auto;
	}
	.progressBox{
		width:80%;
		display:flex;
		justify-content: space-around;
		line-height:30px;
		color:#fff; 
		margin:-10px auto 0 auto;
	}
	.progress{
		width: 85%;
	}
	.mt-progress-runway{
		border-radius: 8px;
	}
	.mt-progress-progress{
		border-radius: 8px;
		background-color: #FEB002;
	}
	.excircle{
		width: 126px;
		height:120px;
		margin:0 auto;
		background:url('../../../../../static/img/comprehensive/Result.png') no-repeat;
		background-size:100% 100%;
	}
	.excircle>p:nth-child(1){
		padding-top:35px;
	}
	.excircle>p:nth-child(2){
		padding-top:10px;
	}
	.textFont{
		color:#fff;
		font: bold 28px simhei;
	}
	.textAns{
		width: 100%;
		margin: 10px auto 0 auto;
		display: flex;
		justify-content: center;
		line-height: 17px;
		color: #fff;

	}
	/*时间选择框*/
	.pickerContent {
		width:65%;
		margin:10px auto 0 auto;
		background:#fff;
		border-radius: 15px;
		height:30px;
		display: flex;
		justify-content: space-between;
		padding:0 20px;
		align-items: center;
	}
	.fontIcon {
		width: 10%;
	}
	.dateShow {
		width: 95px;
		color: #06306B;
		font-size: 13px;
		display: flex;
		justify-content: space-between;
	}
	.dateShow>p{
		display: flex;
		align-items: center;
		color:#000;
	}
	.dateShow>p:nth-child(1){
		width:55px;
	}
	.dateShow>p:nth-child(1)>input{
		width:40px;
		height:15px;
	}
	.dateShow>p:nth-child(2){
		width:40px;
	}
	.dateShow>p:nth-child(2) input{
		width:40px!important;
		height:15px;
	}
	.textShow{
		width: 33%;
		text-align: center;
		border-right: 2px dashed #fff;
	}
	.bigFont{
		font-size: 14px;
	}
	.mbsc-control-ev {
		width: 40px !important;
		text-align: center;
	}
	.taskData{
		width: 100%;
		background: #fff;
		height:35px;
		border-bottom: 2px solid #DDDBD7;
		padding:10px 0 5px 0;
	}
	.target{
		font-size: 16px;
		width: 95%;
		display: flex;
		justify-content: center;
		height: 20px;
		line-height: 20px;
		margin: 10px auto;
	}
	.target>div{
		font-size:.9rem!important;
	}
	/*修改*/
	.text-center{
		text-align: center;
	}
	.flex{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.taskData>a{
		font-size:.9rem;
		width:33%;
		height:35px;
		line-height: 35px;
		text-align: center;
		color:#333;
		border-right: 2px dashed #CCC;
	}
	.taskData>a:last-child{
		border:none;
	}
	/*btm-list*/
	.detailCon ul{
		background:#fff;
	}
	.ass-details-btm-list{
		width:90%;
		padding:0 5%;
		margin:0 auto;
		height:30px;
	}
	.assess-detail ul{
		padding-bottom:30px;
	}
	.assess-detail ul>.ass-details-btm-list:nth-of-type(even) {
		background: #F1F1F1;
	}
	.text-active{
		color:#FA770F!important;
	}


	.assess-data-picker-left{
		position:absolute;
		top:40px;
		left:10%;
	}
</style>