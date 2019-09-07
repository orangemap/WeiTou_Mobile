<template>
	<div style='overflow:hidden' class='fromal-right'>
		<div class="pickerContent my-index-picker">
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
			<p class="fontIcon">
				<i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true" @click='getDataMessage'></i>
			</p>
		</div>
		<!-- <div id='container1' style='margin-top:-30px;'></div> -->
		<div id="myChart" :style="{width: '100%', height: '300px',marginTop:'-50px'}"></div>
		<div class='Formright-btm'>
			<ul class='Formright-btm-ul'>
				<li class='flex Formright-btm-li'>
					<p>机构</p>
					<p>参考人数</p>
					<p>达标人数</p>
					<p>晋升人数</p>
					<p>达标率</p>
					<p>晋升率</p>
				</li>
				<li v-for='item in RightList' class='flex Formright-btm-li'>
					<p>{{item.manage}}</p>
					<p>{{item.jionPeople}}</p>
					<p>{{item.quaPeople}}</p>
					<p>{{item.promPeople}}</p>
					<p>{{item.quaRate+'%'}}</p>
					<p>{{item.promRate+'%'}}</p>
				</li>
			</ul>
		</div>
		<Alert ref="showalert"></Alert>
	</div>
</template>
<script>
	import yearPicker from '@/components/common/Picker.vue'
  	import Alert from '@/components/policy/common/alert.vue'
  	import { mapState,mapMutations } from 'vuex'
  	import store from '@/vuex/comprehensive/comprehensive'
	export default {
		components:{yearPicker,Alert},
		data() {
			return {
				yearList:[],/*年列表*/
				yearDate:"",/*查询年*/
				monthList:['01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
				monthDate:"",/*查询月*/
				RightList:[],
				agentCode:utils.cache.get('personsal').agentCode
			}
		},
		mounted(){
			this.yearDate=new Date().getFullYear() /*获取年数组*/
			let yearList1=[],yearList2=[]
			for(var i=this.yearDate-100; i<this.yearDate;i++){
				yearList1.push(i)
			}
			for(var i=this.yearDate; i<(this.yearDate)+100; i++){
				yearList2.push(i)
			}
			this.yearList=yearList1.concat(yearList2)
			/*console.log( "年数组",this.yearList)*/
			/*获取月*/
			if(this.MonthDate1){
				this.monthDate = this.MonthDate1
			}else{
				let month = (new Date().getMonth())+1
				if(month<=9){
					this.monthDate = '0'+month
				}else{
					this.monthDate = month+''
				} 
			}
			if(this.YearDate1){
				this.yearDate = this.YearDate1
			}else{
				this.yearDate=new Date().getFullYear() /*获取年数组*/
			}
			console.log(this.yearDate)
			console.log(this.monthDate)
			let BodyHeight = document.documentElement.clientHeight+'px'
			$('.my-index-container').css('height',BodyHeight);
			window.onresize = function() {
				let BodyHeight = document.documentElement.clientHeight+'px';
				$('.my-index-container').css('height',BodyHeight);
			}
			//this.getMessage('1100000006','2018','04')
			let year = this.yearDate.toString()
			this.getMessage(this.agentCode,year,this.monthDate,'1')
		},
		computed: {
			...mapState(['YearDate1','MonthDate1'])
		},store,
		methods:{
			...mapMutations(['SetYearDate','SetMonthDate']),
			showModals(message) {
	        this.$refs.showalert.showMOdal(message)
	      },
			getMessage(agentCode,year,month,flag){
				let requ = {
					search:{
						"agentCode": agentCode, /*this.agentCode*/
						"channel": this.channel,
						"year":year,
						"month":month,
						"model":'3',
						"flag":flag
					}
				}
				utils.http.postFast('ZHFORMALDETAILGX',requ,(body,header) => {
					console.log(body)
					console.log(header)
					let data = body.search
					this.yearDate = data.year
					this.monthDate = data.month
					if(header.resultCode == 0){
						this.RightList = body.search.assessmentAnalysis.assTableList
						console.log(this.RightList)
						let BtmList = []
						let TopList = []
						let NewList = body.search.assessmentAnalysis.analysisList
						NewList.forEach( item =>{
							BtmList.push(item.indexcalno)
							if(item.grade == '降级'){
								item.count = '2'
							}else if(item.grade == '保级'){
								item.count = '4'
							}else if(item.grade == '维持'){
								item.count = '6'
							}else if(item.grade == '晋升'){
								item.count = '8'
							}
							TopList.push(item.count)
						})
						this.drawLine(BtmList,TopList);
					}else{	
						console.log('数据异常')
						this.showModals(header.resultMsg)
					}
				})
			},
			drawLine(BtmList,TopList){
        		// 基于准备好的dom，初始化echarts实例
        		let myChart = this.$echarts.init(document.getElementById('myChart'))
        		// 绘制图表
        		myChart.setOption({
        			tooltip: {
        				show:false/*禁用提示框*/
        			},
        			legend: {
        				selectedMode:false/*禁用点击事件*/
        			},
        			grid: {show: true,borderColor:'#8C6FA7',borderWidth: 1},
        			xAxis: {
        				type: 'category',
        				data: BtmList,
        				axisLabel:{
        					interval:0,  
        					rotate:40/*字体旋转40C*/ 
        				},
		        		"axisTick":{       //x轴刻度线
		        			"show":false
		        		},
		        		axisLine: {
		        			lineStyle:{
		        				color:'#000',
		        				width:1
		        			},
		        			textStyle: {
		        				color: 'red',
		        				fontSize: 12,
		        				fontWeight: 300
		        			}
		        		}
		        	},
		        	yAxis: {
		        		type: 'value',
        		 "axisTick":{       //y轴刻度线
        		 	"show":false
        		 },
        		 min:1,
        		 max:9,
        		 interval: 1,
        		 axisLine: {
        		 	lineStyle:{
        		 		color:'#000',
        		 		width:1
        		 	},
        		 	textStyle: {
        		 		color: '#56595e',
        		 		fontSize: 12,
        		 		fontWeight: 300
        		 	}
        		 },
        		 axisLabel:{
        		 	formatter: function (value) {
        		 		var texts = [];
        		 		if(value==1){
        		 			texts.push('');
        		 		}else if (value == 2) {
        		 			texts.push('降级');
        		 		}else if (value == 4) {
        		 			texts.push('保级');
        		 		}else if(value == 6){
        		 			texts.push('维持');
        		 		}else if(value == 8){
        		 			texts.push('晋升');
        		 		}
        		 		return texts;

        		 	}
        		 }
        		},
        		series: [{
        			data: TopList,
        			type: 'line',
        			color:'blue',
        			itemStyle : {
        				normal : {
        					lineStyle:{
        						color:'blue'
        					}
        				}
        			},
        			lineStyle: {
        				normal: {
        					width:1.5,
                color: "#111"   // 线条颜色
             }
          },
       			}]
    			});
        	},
        	getDataMessage(){
        		let year = this.yearDate.toString()
        		this.getMessage(this.agentCode,year,this.monthDate,'2')
        	}
        },
        watch:{
        	// yearDate(tpl){
        	// 	this.SetYearDate(tpl.toString())
        	// },
        	// monthDate(tpl){
        	// 	this.SetMonthDate(tpl)
        	// }
        }
     }
  </script>

  <style>
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
  	#container1>div:nth-child(2){/*隐藏点击图表的title提示框*/
  		display: none!important;
  	}
  	.Formright-btm-ul{
  		width:100%;
  		margin-top:-20px;
  	}
  	.Formright-btm-ul>li:nth-child(1)>p{
  		color:#fff;
  	}
  	.Formright-btm-li{
  		padding:0 2%;
  		height:30px;
  	}
  	.Formright-btm-li>p{
  		width:16.66%;
  		text-align: center;
  	}
  	.Formright-btm-li>p:nth-child(1){
  		text-align: left;
  	}
  	.Formright-btm-ul>li:nth-child(odd){
  		background:#F1F1F1;
  	}
  	.Formright-btm-ul>li:nth-child(1){
  		background:url('../../../../../../static/img/comprehensive/Gx_khyj_Bj.png') no-repeat;
  		background-size:100% 100%;
  	}
  	canvas{
  		left:4%!important;
  	}
  	/*.fromal-right .my-index-picker{
  		position:relative;
  		z-index: 1000
  	}*/
  	#myChart{
  		margin-top:-10px!important;
  	}
  </style>