<template>
	<div class='Gx_select'>
		<Headerbtns :title="page_title">
			<div  slot="left" ref='header'  @click="Goback">
				<i class="fa fa-angle-left "></i>
			</div>
		</Headerbtns>
		<div class='my-index-container myAssion' ref='container'>
			<div class='my-index-links flex'>
				<router-link to='/comprehensiveGexian/AriskmyCommission/AriskmyCommissionDetails'>佣金详情</router-link>
				<router-link to='/comprehensiveGexian/AriskmyCommission/AriskmyCommissionAnalysis'>佣金分析</router-link>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/policy/common/Header.vue'
	import yearPicker from '../../../common/Picker.vue'
	import "../../../policy/css/base.css";
	export default{
		components: {Headerbtns,yearPicker},
		data() {
			return{
				page_title:'我的佣金',
				yearList:[],/*年列表*/
				yearDate:"",/*查询年*/
				monthList:[],/*月列表*/
				monthDate:"",/*查询月*/
			}
		},
		mounted(){

			this.$refs.container.style.marginTop = '48px' /*获取当前时间*/
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
			this.monthDate=(new Date().getMonth())+1
			for(var i=1; i<=12; i++){
				this.monthList.push(i)
			}
				let _header = $(".manage-main-contents")
				let u = navigator.userAgent;
      		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      		let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	      	if(isiOS) {
	      		if(screen.height == 812 && screen.width == 375){
	      			_header.css({
	      				"top": "44px",
	      				"bottom": "34px"
	      			})
	      			$('.my-index-picker').css('top','87px')
	      			$('.my-index-links').css('margin','107px auto 20px auto')
	      		}else{
	      			$('.my-index-links').css('margin','70px auto 20px auto')
	      		}
	      	}else{
	      		$('.pickerContent').css('margin','0 auto 10px auto')
	      		$('.my-index-links').css('margin','54px auto 20px auto')
	      	}
		},
		methods:{
			Goback(){
				this.$router.push('/comprehensiveGexian/comprehensiveInfo')
			},
			getDate(){
				console.log(this.yearDate)
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text-center {
		text-align: center;
	}

.font_35 {
	font-size: 30px;
	color:#FDB92C;
}
.Gx_select .myAssion {
	padding-top:10px;
	background:#F1F1F1!important;
}
.datePicker,
.detailAnalyze {
	width: 80%;
	height: 30px;
	line-height: 30px;
	margin: 5px auto 5px auto;
	display: flex;
	justify-content: space-between;
}

	.detailAnalyze {
		width: 65%;
	}

	.detailAnalyze>p {
		width: 40%;
		height: 25px;
		margin: auto;
		color: #fff;
		line-height: 25px;
		text-align: center;
		border-radius: 30px;
		background: #FEB001;
	}

	.datePicker {
		border-radius: 100px;
		background: #fff;
	}

	.fontIcon {
		width: 10%;
	}
	.pickerContent>.dateShow>p:nth-child(1),
	.pickerContent>.dateShow>p:nth-child(2){
		width:60px!important;
	}
	.pickerContent>.dateShow>p:nth-child(2){
		width:50px!important;
	}
	.pickerContent>.dateShow>p:nth-child(2) .mbsc-control{
		width:30px!important;
	}
	.dateShow {
		min-width: 105px!important;
		color: #06306B;
		font-size: 13px;
		display: flex;
		justify-content: space-between;
	}
	.pickerContent {
		width: 60%;
		display: flex;
		margin: auto;
		justify-content: space-between;
		background: #fff;
		padding: 0 20px;
		align-items: center;
		height: 30px;
		border-radius: 15px;
	}

	.my-index-picker {
		width: 65%!important;
		background:#fff;
	}

	.mbsc-control-ev {
		width: 40px !important;
		text-align: center;
		background:#fff!important;
	}

	.my-index-links {
		width: 70%;
		height: 40px;
		margin: 70px auto 20px auto;
	}

	.my-index-links>a {
		width: 45%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #FFF;
		display: inline-block;
		margin: 0 8px;
		outline: none;
		font-size:.8rem;
		background:#CCC;
		border-radius: 15px;
	}

	.my-index-links>a.router-link-active {
		background:#FEB101;
	}

	.myAssion .pickerContent{
		margin: 20px auto 10px auto;
		
	}
	.myAssion{
		background:#f1f1f1!important;
	}
	.pickerContent>.dateShow>p:nth-child(1) .mbsc-control,
	.pickerContent>.dateShow>p:nth-child(2) .mbsc-control{
		background: #fff!important;
	}
</style>
