<template>
	<div>
		<Headerbtns :title="page_title">
			<div ref='header' slot="left" class="back" @click="Goback">
				<i class="fa fa-angle-left text-center" style='padding: 6px 8px;font-size: 35px;'></i>
			</div>
		</Headerbtns>
		<div class='my-index-container' ref='container'>
			<div class='my-index-links flex' style="margin: 30px auto 10px;">
				<router-link to='/comprehensiveYinbao/myCommission/myCommissionDetails'>佣金详情</router-link>
				<router-link to='/comprehensiveYinbao/myCommission/myCommissionAnalysis'>佣金分析</router-link>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script type='babel'>
	import Headerbtns from '../../../../../src/components/policy/common/Header'
	import yearPicker from '../../../common/yearPicker.vue'
	export default{
		components: {Headerbtns,yearPicker},
		data() {
			return{
				page_title:'我的佣金'
			}
		},
		mounted(){
			this.$refs.container.style.marginTop = '48px' 
		},
		methods:{
			Goback(){
				this.$router.push('/comprehensiveYinbao/comprehensiveInfo')
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
				padding: 6px 8px;
				font-size: 35px;
				color: #FDB92C;
			}
			.my-index-container {
				background: #F1F1F1;
				padding-top:60px;
			}

			.pickerContent {
				margin: 20px 0;
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
			.pickerContent>.dateShow>p:nth-child(1){
				width:55px!important;
			}
			.pickerContent>.dateShow>p:nth-child(2){
				width:40px!important;
			}
			.pickerContent>.dateShow>p:nth-child(2) .mbsc-control{
				width:40px!important;
			}
			.dateShow {
				width: 95px;
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
			}

			.mbsc-control-ev {
				width: 40px !important;
				text-align: center;
			}

			.my-index-links {
				width: 65%;
				height: 40px;
				margin: 10px auto;
			}

			.my-index-links>a {
				width: 40%;
				height: 30px;
				line-height: 30px;
				text-align: center;
				color: #fff;
				background: #C7C6CB;
				display: inline-block;
				margin: 0 8px;
				border-radius: 15px;
				outline: none;
			}

			.my-index-links>a.router-link-active {
				background: #FEB101;
			}
			.fa{
				color: #FEB101;
			}
		</style>
