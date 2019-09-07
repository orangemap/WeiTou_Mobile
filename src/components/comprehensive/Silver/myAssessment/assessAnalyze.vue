<!-- 考核预警、考核分析页面 -->
<template>
	<div class="analyzeCon">
		<div class="pickerContent assess-data-picker-left">
			<p class="fontIcon">
				<i style="font-size:18px;" class="fa fa-calendar" aria-hidden="true"></i>
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
			<p class="fontIcon" @click='getFenxidetail'>
				<i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true"></i>
			</p>
		</div>
		<!--承包标准保费-->
			<div class='new-table' v-show='manager == 1'>
				<p style='color:#FEB101;text-align: left;margin:5% 0 5% 7%;'>承保标准保费:</p>
				<div style='display: flex;'>
					<div style='width:30px;padding-top:15px;'>
						<p style='font-size:.6rem;'>实际</p>
						<p style='font-size:.6rem;margin-top:12px'>维持</p>
						<p style='font-size:.6rem;margin-top:12px'>晋升</p>
					</div>
					<svg id="s5" width="89%" height="80px" ref='s5'>
						<rect height="1" width="88.5%" x="0" y="0" fill="#E2DDE3" id='qjjs'></rect><!--上-->
						<rect height="1" width="88.5%" x="0" y="99%" fill="#000"></rect><!--下-->
						<rect height="100%" width="1" x="0" y="0" fill="#E2DDE3"></rect><!--左-->
						<rect height="100%" width="1" x="88.5%" y="0" fill="#E2DDE3"></rect><!--右-->
						<rect height="99%" width="1" x="45.5%" y="0" fill="#E2DDE3"></rect><!--中-->
						<rect height='5' width='0%' x='0' y='14.4' fill='#FFCA32' class='s5_width1'></rect><!--18%-->
						<rect height='5' width='0%' x='0' y='36.8' fill='#FFCA32' class='s5_width2'></rect><!--46%-->
						<rect height='5' width='0%' x='0' y='57.6' fill='#FFCA32' class='s5_width3'></rect><!--72%-->
						<text  x="88.8%" y="97%" fill="#000" style='font-size:12'>(万元)</text>
					</svg>
				</div>
				<p style='margin-left:30px;' class='flex' id='numList5'>
					<span>0</span>
					<span>{{acceptPrem.width2}}</span>
					<span>{{acceptPrem.width3}}</span>
				</p>
			</div>	
		<div class="plot">
			<!--期交件数-->
			<div v-show='manager == 2'>
				<p style='color:#FEB101;text-align: left;margin:5% 0 5% 15%;'>期交件数:</p>
				<div style='display: flex;'>
					<div style='width:30px;height:80px;'>
						<p style='font-size:.6rem;margin-top:24px'>实际</p>
						<p style='font-size:.6rem;margin-top:22px'>维持</p>
					</div>
					<svg id="s1" width="90%" height="80px">
						<rect height="1" width="75%" x="0" y="0" fill="#E2DDE3" id='qjjs'></rect><!--上-->
						<rect height="1" width="75%" x="0" y="99%" fill="#000"></rect><!--下-->
						<rect height="100%" width="1" x="0" y="0" fill="#E2DDE3"></rect><!--左-->
						<rect height="100%" width="1" x="74%" y="0" fill="#E2DDE3"></rect><!--右-->
						<rect height="100%" width="1" x="38%" y="0" fill="#E2DDE3"></rect><!--中-->
						<rect height='5' width='0%' x='0' y='24' fill='#FFCA32' class='s1_width1'></rect>
						<rect height='5' width='0%' x='0' y='56' fill='#FFCA32' class='s1_width2'></rect>
						<text  x="80%" y="95%" fill="#000" style='font-size:12'>(件)</text>
					</svg>
				</div>
				<p style='margin-left:25px;' class='flex' id='numList1'>
					<span>{{intersectNum.width1}}</span>
					<span>{{Math.floor(intersectNum.width2)}}</span>
					<span>{{intersectNum.width3}}</span>
				</p>
			</div>	
			<!--承包标准保费-->
			<div v-show='manager == 2'>
				<p style='color:#FEB101;text-align: left;margin:5% 0 5% 16%;'>承保标准保费:</p>
				<div style='display: flex;'>
					<div style='width:30px;padding-top:15px;'>
						<p style='font-size:.6rem;'>实际</p>
						<p style='font-size:.6rem;margin-top:12px'>维持</p>
						<p style='font-size:.6rem;margin-top:12px'>晋升</p>
					</div>
					<svg id="s2" width="90%" height="80px" ref='s2'>
						<rect height="1" width="75%" x="0" y="0" fill="#E2DDE3" id='qjjs'></rect><!--上-->
						<rect height="1" width="75%" x="0" y="99%" fill="#000"></rect><!--下-->
						<rect height="100%" width="1" x="0" y="0" fill="#E2DDE3"></rect><!--左-->
						<rect height="100%" width="1" x="74%" y="0" fill="#E2DDE3"></rect><!--右-->
						<rect height="100%" width="1" x="38%" y="0" fill="#E2DDE3"></rect><!--中-->
						<rect height='5' width='0%' x='0' y='14.4' fill='#FFCA32' class='s2_width1'></rect><!--18%-->
						<rect height='5' width='0%' x='0' y='36.8' fill='#FFCA32' class='s2_width2'></rect><!--46%-->
						<rect height='5' width='0%' x='0' y='57.6' fill='#FFCA32' class='s2_width3'></rect><!--72%-->
						<text  x="75%" y="95%" fill="#000" style='font-size:12'>(万元)</text>
					</svg>
				</div>
				<p style='margin-left:27px;' class='flex' id='numList2'>
					<span>0</span>
					<span>{{acceptPrem.width2}}</span>
					<span>{{acceptPrem.width3}}</span>
				</p>
			</div>	
			<!--回访成功率-->
			<div>
				<p style='color:#FEB101;text-align: left;margin:5% 0 5% 17%;'>回访成功率:</p>
				<div style='display: flex;'>
					<div style='width:30px;padding-top:18px;'>
						<p style='font-size:.6rem;'>实际</p>
						<p style='font-size:.6rem;margin-top:13px'>维持</p>
						<p style='font-size:.6rem;margin-top:13px'>晋升</p>
					</div>
					<svg id="s3" width="90%" height="80px">
						<rect height="1" width="75%" x="0" y="0" fill="#E2DDE3" id='qjjs'></rect><!--上-->
						<rect height="1" width="75%" x="0" y="99%" fill="#000"></rect><!--下-->
						<rect height="100%" width="1" x="0" y="0" fill="#E2DDE3"></rect><!--左-->
						<rect height="100%" width="1" x="74%" y="0" fill="#E2DDE3"></rect><!--右-->
						<rect height="100%" width="1" x="38%" y="0" fill="#E2DDE3"></rect><!--中-->
						<rect height='5' width='0%' x='0' y='20' fill='#FFCA32' class='s3_width1'></rect><!--25%-->
						<rect height='5' width='0%' x='0' y='41.6' fill='#FFCA32' class='s3_width2'></rect><!--52%-->
						<rect height='5' width='0%' x='0' y='61.6' fill='#FFCA32' class='s3_width3'></rect><!--77%-->
						<text  x="80%" y="95%" fill="#000" style='font-size:12'>(%)</text>
					</svg>
				</div>
				<p style='margin-left:25px;' class='flex' id='numList3'>
					<span>0</span>
					<span>50</span>
					<span>100</span>
				</p>
			</div>	
			<!--13个月综合继续率-->
			<div>
				<p style='color:#FEB101;text-align: left;margin:5% 0 5% 16%;'>13个月综合继续率:</p>
				<div style='display: flex;'>
					<div style='width:30px;padding-top:18px;'>
						<p style='font-size:.6rem;'>实际</p>
						<p style='font-size:.6rem;margin-top:13px'>维持</p>
						<p style='font-size:.6rem;margin-top:13px'>晋升</p>
					</div>
					<svg id="s4" width="90%" height="80px">
						<rect height="1" width="75%" x="0" y="0" fill="#E2DDE3" id='qjjs'></rect><!--上-->
						<rect height="1" width="75%" x="0" y="99%" fill="#000"></rect><!--下-->
						<rect height="100%" width="1" x="0" y="0" fill="#E2DDE3"></rect><!--左-->
						<rect height="100%" width="1" x="74%" y="0" fill="#E2DDE3"></rect><!--右-->
						<rect height="100%" width="1" x="38%" y="0" fill="#E2DDE3"></rect><!--中-->
						<rect height='5' width='0%' x='0' y='20' fill='#FFCA32' class='s4_width1'></rect><!--25%-->
						<rect height='5' width='0%' x='0' y='41.6' fill='#FFCA32' class='s4_width2'></rect><!--52%-->
						<rect height='5' width='0%' x='0' y='61.6' fill='#FFCA32' class='s4_width3'></rect><!--77%-->
						<text  x="80%" y="95%" fill="#000" style='font-size:12'>(%)</text>
					</svg>
				</div>
				<p style='margin-left:25px;' class='flex' id='numList4'>
					<span>0</span>
					<span>50</span>
					<span>100</span>
				</p>
			</div>	
		</div>
		<div class='organization'>
			<p style='color:#fff'>区域</p>
			<p>
				<span>参加人数</span>
				<span>(人)</span>
			</p>
			<p>
				<span>通过人数</span>
				<span>(人)</span>
			</p>
			<p>
				<span>通过率</span>
				<span>(%)</span>
			</p>
		</div>
		<div class='organization assess-ana-btm1'>
			<p style='color:#fff'>本机构</p>
			<p>{{orgJoinPerpon}}</p>
			<p>{{orgPassPerpon}}</p>
			<p>{{orgPassRate}}</p>
		</div>
		<div class='organization assess-ana-btm2'>
			<p style='color:#fff'>分公司</p>
			<p>{{branchJoinPerpon}}</p>
			<p>{{branchPassPerpon}}</p>
			<p>{{branchPassRate}}</p>
		</div>
		<div class='organization assess-ana-btm3'>
			<p style='color:#fff'>全国</p>
			<p>{{countryJoinPerpon}}</p>
			<p>{{countryPassPerpon}}</p>
			<p>{{countryPassRate}}</p>
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
	// import picker from '../../../common/Picker.vue'
	import yearPicker from '../../../common/Picker.vue'
	import { mapState,mapMutations } from 'vuex'
	export default{
		name:'assessAnalyze',
		components:{alert,yearPicker},
		data () {
			return {
				manager:"2",/*是否是经理*/
				personsal:utils.cache.get("personsal"),
				newModel:false,/*默认关闭弹框*/
				modelContent:'',/*弹框提示语*/
				yearList:[],/*年列表*/
				yearDate:"",/*查询年*/
				year:'',
				monthList:['01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
				monthDate:'',/*查询月*/
				orgJoinPerpon:"0",/*本机构参加人数*/
				orgPassPerpon:"0",/*本机构通过人数*/
				orgPassRate:"0",/*本机构通过率*/

				branchJoinPerpon:"0",/*分公司参加人数*/
				branchPassPerpon:"0",/*分公司通过人数*/
				branchPassRate:"0",/*分公司通过率*/

				countryJoinPerpon:"0",/*全国参加人数*/
				countryPassPerpon:"0",/*全国通过人数*/
				countryPassRate:"0",/*全国通过率*/

				intersectNum:{/*期交件数*/
					polnumqj:0,/*实际*/
					f01:0,/*维持*/
					width1:0,
					width2:0,
					width3:0
				},
				returnAccessRate:{/*回执成功率*/
					f02:0,/*维持*/
					f03:0,/*晋升*/
					visitpr:0,/*实际*/
					width1:0,
					width2:0,
					width3:0
				},
				monthtoConton:{/*13个月综合继续率*/
					alperpr:0,/*实际*/
					f04:0,/*维持*/
					f05:0,/*晋升*/
					width1:0,
					width2:0,
					width3:0
				},
				acceptPrem:{/*承保标准保费*/
					standprem:0,/*实际*/
					standpremardw:0,/*维持*/
					standpremardj:0,/*晋升*/
					width1:0,
					width2:0,
					width3:0
				}
			}
		},
		mounted(){
			/*时间选择*/
			this.yearDate=new Date().getFullYear() /*获取年数组*/
			this.year = this.yearDate.toString()
			let dateMounth = this.ComprehensiveSearchMonthDate
			if(dateMounth!=='0'){/*初始化月*/
				this.monthDate = dateMounth
			}else {
				if(new Date().getMonth()<=9){
					this.monthDate = '0' + (new Date().getMonth()+1)
				}else {
					this.monthDate = new Date().getMonth()+''
				}
			}
			console.log('月-->>',this.monthDate)
			let yearList1=[],yearList2=[]
			for(var i=2018; i<this.yearDate;i++){
				yearList1.push(i)
			}
			for(var i=this.yearDate; i<(this.yearDate)+100; i++){
				yearList2.push(i)
			}
			this.yearList=yearList1.concat(yearList2)
			let dateYear = this.ComprehensiveSearchYearDate
			if(dateYear!=0){
				this.yearDate = dateYear
			}
			this.year = this.yearDate.toString()
			console.log('年-->>',this.year)
			let svg1Width = parseFloat($('#s1').css('width'))
			$('#numList1').css('width',svg1Width*0.8+'px')
			let svg2Width = parseFloat($('#s2').css('width'))
			$('#numList2').css('width',svg2Width*0.8+'px')
			let svg3Width = parseFloat($('#s3').css('width'))
			$('#numList3').css('width',svg3Width*0.8+'px')
			let svg4Width = parseFloat($('#s4').css('width'))
			$('#numList4').css('width',svg4Width*0.8+'px')
			window.onresize = function() {
				let svg1Width = parseFloat($('#s1').css('width'))
				$('#numList1').css('width',svg1Width*0.8+'px')
				let svg2Width = parseFloat($('#s2').css('width'))
				$('#numList2').css('width',svg2Width*0.8+'px')
				let svg3Width = parseFloat($('#s3').css('width'))
				$('#numList3').css('width',svg3Width*0.8+'px')
				let svg4Width = parseFloat($('#s4').css('width'))
				$('#numList4').css('width',svg4Width*0.8+'px')
			}
			setTimeout( () =>{
				if(this.ComprehensiveTitleType == 1){/*考核预警*/
					this.getFenxiData(this.monthDate,'ZHWARNANALYSIS',this.year)
				}else if(this.ComprehensiveTitleType == 2){/*正式考核*/
					this.getFenxiData(this.monthDate,'ZHFORMALANALYSIS',this.year)
				}
			},500)
		},
		computed: {
			...mapState(['ComprehensiveTitleType','ComprehensiveSearchMonthDate','ComprehensiveSearchYearDate'])
		},
		watch:{
			ComprehensiveTitleType(old){
				if(old == 1){
					this.getFenxiData(this.monthDate,'ZHWARNANALYSIS',this.year)
				}else if(old == 2){
					this.getFenxiData(this.monthDate,'ZHFORMALANALYSIS',this.year)
				}
			},
			monthDate(index){
				this.SetComprehensiveSearchMonthDate(index)
			},
			yearDate(index){
				this.year = index.toString()
				this.SetComprehensiveSearchYearDate(index)
			}
		},
		methods:{
			...mapMutations(['SetComprehensiveSearchMonthDate','SetComprehensiveSearchYearDate']),
			ClosenewModel(){/*点击关闭弹框*/
				this.newModel = false
			},
			showMsg:function(msg){
				if(msg!=undefined && msg!=""){
					this.$refs.alert.showMOdal(msg)
				}
			},
			getFenxidetail(){/*点击搜索按钮*/
				if(this.ComprehensiveTitleType == 1){
					this.getFenxiData(this.monthDate,'ZHWARNANALYSIS',this.year)
				}else if(this.ComprehensiveTitleType == 2){
					this.getFenxiData(this.monthDate,'ZHFORMALANALYSIS',this.year)
				}
			},
			getFenxiData(mount,url,year){/*月份,接口,代理,年份*/
				let requ = {
					/*考核预警-1100000011   正式考核-1300000032*/
					"search": {
						agentCode:this.personsal.agentCode,  /*this.personsal.agentCode*/
						channel:'02',
						year:year,
						month:mount
					}
				}
				console.log(requ)
				/*考核预警-ZHWARNANALYSIS   正式考核-ZHFORMALANALYSIS*/
				utils.http.postFast(url,requ,(body,header)=> {
					console.log('返回数据',body)
					console.log('返回header',header)
					let Data = body.search
					console.log(header.resultCode)
					/*N 不是经理级*/
					if(Data.isManagerZ == 'Y' || Data.isManagerY == 'Y'){
						console.log('是经理')
						this.manager = '1'
					}else{
						console.log('不是经理')
						this.manager = '2'
					}
					if(header.resultCode == 0){
						/*************************期交件数***************************/
						this.intersectNum.polnumqj = Data.intersectNum.polnumqj/*实际*/
						this.intersectNum.f01 = Data.intersectNum.f01/*维持*/
						console.log('期交件数图表数据----->>>',this.intersectNum)
						let B1 = parseFloat(Data.intersectNum.maxNum);
						/*期交图表最大值为72%*/
						if(B1<=2 || Data.intersectNum.maxNum == ''){
							this.intersectNum.width1 = '0'
							this.intersectNum.width2 = '50'
							this.intersectNum.width3 = '100'
						}else{
							this.intersectNum.width1 = '0'
							this.intersectNum.width2 = B1/2
							this.intersectNum.width3 = B1
						}

						let T1_width1 = parseFloat(this.intersectNum.polnumqj)
						let T1_width2 = parseFloat(this.intersectNum.f01)
						if(!isNaN(T1_width1)){
							$('.s1_width1').css('width',T1_width1/(B1/74)+'%')
						}else {
							$('.s1_width1').css('width','0%')
						}
						if(!isNaN(T1_width2)){
							$('.s1_width2').css('width',T1_width2/(B1/74)+'%')
						}else {
							$('.s1_width2').css('width','0%')
						}
						/*************************承保标准保费***************************/
						this.acceptPrem.standprem = parseInt(Data.acceptPrem.standprem)/10000/*维持*/
						this.acceptPrem.standpremardw = parseInt(Data.acceptPrem.standpremardw)/10000/*晋升*/
						this.acceptPrem.standpremardj = parseInt(Data.acceptPrem.standpremardj)/10000/*实际*/
						this.acceptPrem.width2 = parseFloat(Data.acceptPrem.maxNum)/10000/2
						this.acceptPrem.width3 = parseFloat(Data.acceptPrem.maxNum)/10000
						console.log(Data.acceptPrem.maxNum)
						if(Data.acceptPrem.maxNum){/*如果存在最大值*/
							let width3 = parseInt((Data.acceptPrem.maxNum)/10000) +1
							// console.log(width3.split('.')[1])
							let width2 = parseInt(width3/2)
							this.acceptPrem.width2 = width2
							this.acceptPrem.width3 = width3
							console.log(this.acceptPrem.width2)
							console.log(this.acceptPrem.width3)
						}else {
							this.acceptPrem.width2 = '50'
							this.acceptPrem.width3 = '100'
						}
						console.log('承保标准保费图表数据----->>>',this.acceptPrem)
						if(this.acceptPrem.standprem!=0){
							$('.s2_width1').css('width',this.acceptPrem.standprem/(this.acceptPrem.width3/74)+'%')
							$('.s5_width1').css('width',this.acceptPrem.standprem/(this.acceptPrem.width3/84)+'%')
						}else {
							$('.s2_width1').css('width','0')
							$('.s5_width1').css('width','0')
						}
						if(this.acceptPrem.standpremardw!=0){
							$('.s2_width2').css('width',this.acceptPrem.standpremardw/(this.acceptPrem.width3/74)+'%')
							$('.s5_width2').css('width',this.acceptPrem.standpremardw/(this.acceptPrem.width3/84)+'%')
						}else {
							$('.s2_width2').css('width','0')
							$('.s5_width2').css('width','0')
						}
						if(this.acceptPrem.standpremardj!=0){
							$('.s2_width3').css('width',this.acceptPrem.standpremardj/(this.acceptPrem.width3/74)+'%')
							$('.s5_width3').css('width',(this.acceptPrem.standpremardj/(this.acceptPrem.width3/84)).toFixed(2)+'%')
						}else if(this.acceptPrem.standpremardj == 0){
							$('.s2_width3').css('width','0')
							$('.s5_width3').css('width','0')
						}
						// console.log(this.acceptPrem.standpremardj)
						// console.log((this.acceptPrem.standpremardj/(this.acceptPrem.width3/84)).toFixed(2)+'%')
						// console.log($('.s5_width1').css('width'))
						// console.log($('.s5_width2').css('width'))
						// console.log($('.s5_width3').css('width'))
						/*************************回执成功率***************************/
						this.returnAccessRate.f02 = parseFloat(Data.returnAccessRate.f02)/*维持*/
						this.returnAccessRate.f03 = parseFloat(Data.returnAccessRate.f03)/*晋升*/
						this.returnAccessRate.visitpr = parseFloat(Data.returnAccessRate.visitpr)/*实际*/
						console.log('回访成功率图表数据----->>>',this.returnAccessRate)
						if(!isNaN(this.returnAccessRate.visitpr)){
							$('.s3_width1').css('width',this.returnAccessRate.visitpr*0.74+'%')
						}else {
							$('.s3_width1').css('width','0')
						}
						if(!isNaN(this.returnAccessRate.f02)){
							$('.s3_width2').css('width',this.returnAccessRate.f02*0.74+'%')
						}else {
							$('.s3_width2').css('width','0')
						}
						if(!isNaN(this.returnAccessRate.f03)){
							$('.s3_width3').css('width',this.returnAccessRate.f03*0.74+'%')
						}else {
							$('.s3_width3').css('width','0')
						}
						/*************************13个月综合继续率***************************/
						this.monthtoConton.f04 = parseFloat(Data.monthtoConton.f04)/*维持*/
						this.monthtoConton.f05 = parseFloat(Data.monthtoConton.f05)/*晋升*/
						this.monthtoConton.alperpr = parseFloat(Data.monthtoConton.alperpr)/*实际*/
						console.log('13个月综合继续率图表数据----->>>',this.monthtoConton)
						if(!isNaN(this.monthtoConton.alperpr)){
							$('.s4_width1').css('width',this.monthtoConton.alperpr*0.74+'%')
						}else {
							$('.s4_width1').css('width','0')
						}
						if(!isNaN(this.monthtoConton.f04)){
							$('.s4_width2').css('width',this.monthtoConton.f04*0.74+'%')
						}else{
							$('.s4_width2').css('width','0')
						}
						if(!isNaN(this.monthtoConton.f05)){
							$('.s4_width3').css('width',this.monthtoConton.f05*0.74+'%')
						}else {
							$('.s4_width3').css('width','0')
						}

						/*************************List 数据显示***************************/
						this.orgJoinPerpon = Data.areamsg.orgJoinPerpon/*本机构参加人数*/
						this.orgPassPerpon = Data.areamsg.orgPassPerpon/*本机构通过人数*/
						this.orgPassRate = Data.areamsg.orgPassRate/*本机构通过率*/

						this.branchJoinPerpon = Data.areamsg.branchJoinPerpon/*分公司参加人数*/
						this.branchPassPerpon = Data.areamsg.branchPassPerpon/*分公司通过人数*/
						this.branchPassRate = Data.areamsg.branchPassRate/*分公司通过率*/

						this.countryJoinPerpon = Data.areamsg.countryJoinPerpon/*全国参加人数*/
						this.countryPassPerpon = Data.areamsg.countryPassPerpon/*全国通过人数*/
						this.countryPassRate = Data.areamsg.countryPassRate/*全国通过率*/
					}else{
						this.modelContent = header.resultMsg
						this.newModel = true
						$('.s1_width1').css('width','0')
						$('.s1_width2').css('width','0')
						$('.s2_width1').css('width','0')
						$('.s2_width2').css('width','0')
						$('.s2_width3').css('width','0')
						$('.s3_width1').css('width','0')
						$('.s3_width2').css('width','0')
						$('.s3_width3').css('width','0')
						$('.s4_width1').css('width','0')
						$('.s4_width2').css('width','0')
						$('.s4_width3').css('width','0')
					}
				});
}
}
}	
</script>

<style>
	.analyzeCon{
		width: 100%;
		height: 332px;
		background: #fff;
	}
	.organization{
		width: 100%;
		font-size: 16px;
		height:30px;
		
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		background: url('../../../../../static/img/comprehensive/Bg_green.png') no-repeat;	
	}
	.organization>p{
		width:25%;
		text-align: center;
		line-height: 30px;
		display: flex;
		justify-content: center;
		font-size:.9rem;
	}
	.organization>p>span{
		color:#fff;
	}
	.organization>p>span:last-child{
		font-size:.6rem!important;
	}
	.assess-ana-btm1,.assess-ana-btm3{
		background:#fff;
	}
	.assess-ana-btm2{
		background:#F1F1F1;
	}
	.assess-ana-btm1>p,.assess-ana-btm2>p,.assess-ana-btm3>p{
		color:#000!important;
		font-size:.8rem;
	}
	.assess-ana-btm3{
		margin-bottom:30px;
	}
	.nameList{
		background: #FF941B;
		color: #fff;
		font-size: 14px;
	}
	.colorChange{
		height: 40px;
		line-height: 40px;
		background: #F1F1F1;
	}
	.textLeft{
		width: 15%;
		text-align: center;
		margin-left: 15px;
		font-size: 14px;
	}
	.textRight{
		margin-right: 15px;
		font-size: 14px;
		width: 23%;
		text-align: center;
	}
	.marginLCenter{
		width: 30%;
		text-align: center;
	}
	.marginRCenter{
		width: 30%;
		text-align: center;
	}
	/*修改画图div css*/
	.flex{
		display: flex;
		justify-content: space-between;
	}
	.plot{
		display: flex;
		flex-wrap: wrap;
	}
	.plot>div{
		width:50%;
		height:150px!important;
		box-sizing: border-box;
		padding:0 0 0 2%;
	}
	.plot>div{
		border:2px dashed #ccc;
		border-bottom:none;
		border-left:none;
		height:188px;
	}
	.plot>div:nth-child(1),.plot>div:nth-child(2){
		border-top:none;
	}
	.plot>div:nth-child(2),.plot>div:nth-child(4){
		border-right: none;
	}
	#numList1,#numList2,#numList3,#numList4,#numList5{
		margin-top:5px;
	}
	.new-table{
		height:150px!important;
		margin-left:8px;
		padding-top:5px;
		margin-top:5px;
		margin-bottom:10px;
	}
	.new-table>p{
		width:81%!important;
	}
	#numList5{
		width:83%!important;
	}
	.fa{
		color: #FEB101;
	}
</style>