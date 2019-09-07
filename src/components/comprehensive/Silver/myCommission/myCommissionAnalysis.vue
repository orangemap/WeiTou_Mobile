<template>
	<div id='Analysis'>
		<div class="pickerContent my-index-picker" style="top: 100px;">
			<p class="fontIcon">
				<i style="font-size:18px;color:#FEB001" class="fa fa-calendar" aria-hidden="true"></i>
			</p>
			<div class="dateShow">
				<p>
					<year-picker :values="yearDate" v-model="yearDate" :items="yearList" code="code" text="text">
					</year-picker>年
				</p>
				<p>
					<year-picker :values="monthDate" v-model="monthDate" :items="monthList" code="code" text="text">
					</year-picker>月
				</p>
			</div>
			<p class="fontIcon" @click='DataSearch()'>
				<i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true"></i>
			</p>
		</div>
		<div style='position:relative;'>
			<div id='container1'>

			</div>
			<p style='position:absolute;left:5%;top:10.5%;z-index: 1000;width:20px;'>(元)</p>
			<p style='position:absolute;right:1%;bottom:26.5%;z-index: 1000;width:20px;'>(月)</p>
			<div class='flex echart-title'>
				<p class='flex'>
					<b></b>
					<span>全国人均</span>
				</p>
				<p class='flex'>
					<b></b>
					<span>分公司人均</span>
				</p>
				<p class='flex'>
					<b></b>
					<span>本机构人均</span>
				</p>
			</div>
		</div>
		<div class='flex my-comm-Anal-btm'>
			<div>
				<img src="static/img/comprehensive/Stars.png" alt="" />
				<p><b style='font-size:.9rem;'>全国排名</b></p>
				<p>
					<b style='font-size:.9rem;'>第</b>
					<b style='color:#FDB202;font-size:1.2rem;'>{{countryRank}}</b>
					<b style='font-size:.9rem;'>名</b>
				</p>
			</div>
			<div>
				<img src="static/img/comprehensive/Stars.png" alt="" />
				<p><b style='font-size:.9rem;'>分公司排名</b></p>
				<p>
					<b style='font-size:.9rem;'>第</b>
					<b style='color:#FDB202;font-size:1.2rem;'>{{branchRank}}</b>
					<b style='font-size:.9rem;'>名</b>
				</p>
			</div>
			<div>
				<img src="static/img/comprehensive/Stars.png" alt="" />
				<p><b style='font-size:.9rem;'>本机构排名</b></p>
				<p>
					<b style='font-size:.9rem;'>第</b>
					<b style='color:#FDB202;font-size:1.2rem;'>{{orgRank}}</b>
					<b style='font-size:.9rem;'>名</b>
				</p>
			</div>
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

<script>
	import yearPicker from '../../../common/Picker.vue'
	import { mapState,mapMutations } from 'vuex'
	import store from '../../../../vuex/comprehensive/comprehensive'
	export default {
		components:{yearPicker},
		data() {
			return {
				yearList:[],/*年列表*/
				monthList:[' ','01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
				yearDate:"",/*查询年*/
				monthDate:"",/*查询月*/
				yeardate:'',/*字符串年*/
				monthdate:'',/*字符串月*/
				newModel:false,/*默认提示框不显示*/
				modelContent:'',/*提示信息*/
				personsal:utils.cache.get("personsal"),
				maxpayList:[],/*最大值(元)*/
				countryAverageIncomeList:[],/*全国人均*/
				branchAverageIncomeList:[],/*分公司人均*/
				orgAverageIncomeList:[],/*本机构人均*/
				tableDataList:[],/*月份*/
				countryRank:'',/*全国排名*/
				branchRank:'',/*分公司收入排名*/
				orgRank:'',/*本机构收入排名*/
			}
		},
		mounted(){
			this.yearDate=new Date().getFullYear() /*获取年*/
			let yearList1=[],yearList2=[]
			for(var i=2018; i<this.yearDate;i++){
				yearList1.push(i)
			}
			for(var i=this.yearDate; i<(this.yearDate)+100; i++){
				yearList2.push(i)
			}
			this.yearList=yearList1.concat(yearList2)
			/*console.log( "年数组",this.yearList)*/
			/*获取月*/
			this.monthDate=(new Date().getMonth())+1
			if(this.monthDate<=9){
				this.monthDate = '0'+this.monthDate
			}else{
				this.monthDate = this.monthDate.toString()
			}
			let divHeight = parseInt($('.my-index-container').css('height'))
			if(divHeight>document.documentElement.clientHeight){
				let BodyHeight = document.documentElement.clientHeight-108+'px'
				console.log(document.documentElement.clientHeight)
				$('.my-index-container').css('height',BodyHeight);
				window.onresize = function() {
					let BodyHeight = document.documentElement.clientHeight-108+'px';
					$('.my-index-container').css('height',BodyHeight);
				}
			}else{
				let BodyHeight = document.documentElement.clientHeight+'px'
				$('#Analysis').css('background','#F1F1F1')
			}
			this.yeardate = this.yearDate.toString()
			if(this.monthDate>=10){
				this.monthdate = this.monthDate.toString()
			}else{
				this.monthdate = '0'+this.monthDate
			}
			if(this.ComprehensiveYearDate){
				this.yearDate = this.ComprehensiveYearDate.toString()
			}
			if(this.ComprehensiveMonthDate){
				this.monthDate = this.ComprehensiveMonthDate
			}
			console.log('年---------->>>',this.yearDate)
			console.log('月---------->>>',this.monthDate)
			this.getdata(this.yearDate,this.monthDate)

			/*高度调节*/
			let Height = document.documentElement.clientHeight-108+'px'
			console.log(Height)
			$('.my-index-container').css('height',Height);
			window.onresize = function() {
				let Height = document.documentElement.clientHeight-108+'px';
				$('.my-index-container').css('height',Height);
			}
		},
		computed: {
			...mapState(['ComprehensiveYearDate','ComprehensiveMonthDate'])
		},store,
		methods:{
			...mapMutations(['SetComprehensiveYearDate','SetComprehensiveMonthDate']),
			getdata(yeardate,monthdate){
				let requ = {
					"search": {
						agentCode: this.personsal.agentCode,
						channel: '02',
						year:yeardate,
						month:monthdate
					}
				}
				this.maxpayList = []/*立柱最大值*/
				this.tableDataList = []/*月份*/
				this.branchAverageIncomeLis = []/*分公司人均*/
				this.orgAverageIncomeList = []/*本机构人均*/
				this.countryAverageIncomeList = []/*本机构人均数组*/
				utils.http.postFast('ZHPAYANALYSIS', requ, (body,header) => {
					console.log(body)
					console.log(header)
					if(header.resultCode == 0){
						let data = body.search
						this.countryRank = data.countryRank/*全国排名*/
						this.branchRank = data.branchRank/*分公司收入排名*/
						this.orgRank = data.orgRank/*本机构收入排名*/
						data.analysisList.forEach( item => {
							let i = parseInt(item.indexcalno)
							let c = i-1
							if(item.indexcalno == 1){
								this.maxpayList[0] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[0] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[0] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[0] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[0] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 2){
								this.maxpayList[1] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[1] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[1] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[1] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[1] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 3){
								this.maxpayList[2] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[2] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[2] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[2] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[2] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 4){
								this.maxpayList[3] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[3] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[3] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[3] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[3] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 5){
								this.maxpayList[4] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[4] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[4] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[4] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[4] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 6){
								this.maxpayList[5] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[5] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[5] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[5] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[5] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 7){
								this.maxpayList[6] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[6] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[6] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[6] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[6] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 8){
								this.maxpayList[7] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[7] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[7] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[7] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[7] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 9){
								this.maxpayList[8] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[8] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[8] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[8] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[8] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 10){
								this.maxpayList[9] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[9] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[9] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[9] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[9] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 11){
								this.maxpayList[10] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[10] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[10] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[10] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[10] = parseInt(item.countryAverageIncome)/*全国人均*/
							}else if(item.indexcalno == 12){
								this.maxpayList[11] = parseInt(item.maxMoney)/*立柱最大值*/
								this.tableDataList[11] = parseInt(item.indexcalno)/*月份*/
								this.branchAverageIncomeList[11] = parseInt(item.branchAverageIncome)/*分公司人均*/
								this.orgAverageIncomeList[11] = parseInt(item.orgAverageIncome)/*本机构人均*/
								this.countryAverageIncomeList[11] = parseInt(item.countryAverageIncome)/*全国人均*/
							}
						})
						console.log('分公司人均数组----->>>',this.branchAverageIncomeList)
						console.log('全国人均数组----->>>',this.countryAverageIncomeList)
						console.log('本机构人均数组----->>>',this.orgAverageIncomeList)
						console.log('立柱最大值数组----->>>',this.maxpayList)
						console.log('月份数组----->>>',this.tableDataList)
						let maxValue = 0
						if(body.search.maxValue>=1000){
							maxValue = parseInt(body.search.maxValue/1000)
						}else{
							maxValue = 1000
						}
						console.log(maxValue+1)
						let Max = maxValue+1+'000'
						console.log(Max)
						createBarLineBlend(document.getElementById('container1'),30,580,1,'',
							/*v1:最小刻度 v2:最大刻度 v3:间隔 v4:轴标外边距 v5:刻度标签默认朝外*/
							[{
								min: 0,
								max: Max,
								interval: Max/10,
								splitNumber:1,
								axisLabel:{
									margin:5
								},
								axisTick:{
									show: false
								}
							}],
							/*月份数组*/
							this.tableDataList,
							/*立柱最大值数组*/
							this.maxpayList,
							/*全国人均数组*/
							this.countryAverageIncomeList,
							/*分公司人均数组*/
							this.branchAverageIncomeList,
							/*本机构人均数组*/
							this.orgAverageIncomeList
							)
					}else {
						this.newModel = true
						this.modelContent = header.resultMsg
					}
				})
			},
			DataSearch(){
				this.getdata(this.yeardate,this.monthdate)
			},
			ClosenewModel(){
				this.newModel = false
			}
		},
		watch:{
			yearDate(index){
				this.yeardate = index.toString()
				this.SetComprehensiveYearDate(this.yeardate)
			},
			monthDate(index){
				this.monthdate = index
				this.SetComprehensiveMonthDate(this.monthdate)
			}
		}
	}
</script>

<style>
	.my-index-picker{
		position:absolute;
		top:80px;
		left:10%;
	}
	#container1{
		height:300px!important;
		width:100%;
		min-width:350px;
	}
	#container1,#container1>div{
		width:105%!important;
		left:0!important;
	}
	#container1>div:last-child{
		width:200px!important;
		padding-left:20px!important;
	}
	#zr_0{
		width:100%;
	}
	#Analysis{
		overflow-x: hidden;
	}
	.echart-title{
		width:80%;margin:0 10%;
		position:absolute;
		top:5px;
		left:0;
	}
	.echart-title b{
		background:#91888D;
		height:3px;
		width:15px;
		display: inline-block;
		margin-right:3px;
	}
	.echart-title>p:nth-child(2)>b{
		background:#0000FD;
	}
	.echart-title>p:nth-child(3)>b{
		background:#C6CED9;
	}
	.my-comm-Anal-btm{
		width:95%;
		margin:-50px auto 0 auto;
		padding-bottom:10px;
	}
	.my-comm-Anal-btm>div{
		width:33%;
		text-align: center;
	}
	.my-comm-Anal-btm>div img{
		width:70%;
	}
	.my-comm-Anal-btm>div>p{
		margin-top:8px;
		font-size:.8rem;
	}
	.my-comm-Anal-btm b{
		font-weight: 700;
	}
	#container1>div:nth-child(2){/*隐藏点击图表的title提示框*/
		display: none!important;
	}
</style>
