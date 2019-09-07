<template>
	<div>
		<Headerbtns :title="page_title">
			<div ref='header' slot="left" class="back" @click='goBack'>
				<i class="fa fa-angle-left text-center font_35"></i>
			</div>
		</Headerbtns>
		<div class='my-comm-download-content text-center'>
			<img src="../../../../../static/img/comprehensive/detail_download.png" alt="" />
			<ul>
				<li class='my-comm-download-li-title'>{{BtnTitle}}</li>
				<li v-for='item in loadList' class='my-comm-download-li-for'>
					<button @click='Load(item.id)'>{{item.text}}</button>
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
	import Headerbtns from '../../../../../src/components/policy/common/Header'
	import { mapState,mapMutations } from 'vuex'
	import store from '../../../../vuex/comprehensive/comprehensive'
	import { Popup } from 'mint-ui'
	export default{
		components:{Headerbtns},
		data() {
			return {
				page_title:'下载页面',
				isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				agentCode:utils.cache.get('personsal').agentCode,
				personsal:utils.cache.get('personsal'),
				newModel:false,/*默认提示框不弹出*/
				modelContent:'',/*异常信息*/
				list1:[
				{title:'品质指标详情下载',BtnList:[
				{text:'期交回访扣款明细',id:2},
				{text:'期交综合犹退扣款明细',id:3},
				{text:'回执回销扣款明细',id:4},
				{text:'代签字品质扣款明细',id:5},
				{text:'大额客户身份识别问题件扣款明细',id:6}
				]}
				],
				list2:[
				{title:'收入保单明细下载',BtnList:[
				{text:'收入保单明细',id:1}
				]}
				],
				loadList:[],
				BtnTitle:''
			}
		},
		computed: {
			...mapState(['ComprehensiveYearDate','ComprehensiveMonthDate'])
		},store,
		methods: {
			goBack(){
				this.$router.push('/comprehensiveYinbao/myCommission')
			},
			Load(index){
				let id = index.toString()
				console.log(id)
				console.log(this.agentCode)
				this.LoadData(id)
			},
			ClosenewModel(){
				this.newModel = false
			},
			LoadData(index){
				let LoadUrl = ''/*url init*/
				let requ = {
					'search':{
						"agentCode": this.agentCode,/*this.agentCode*/
						"channel": '02',
						"year":this.ComprehensiveYearDate,
						"month":this.ComprehensiveMonthDate,
						"model":index
					}
				}
				utils.http.postFast('ZHPAYDOWNLOAD', requ, (body,header) => {
					console.log(body)
					console.log(header)
					console.log(this.isiOS)
					if(header.resultCode == 0){
						console.log(index)
						if(index == 1){/*收入保单明细*/
							LoadUrl = body.search.laincomURL
						}else if(index == 2){/*期交回访扣款明细*/
							LoadUrl = body.search.laqjvisitURL
						}else if(index == 3){/*期交综合犹退扣款明细*/
							LoadUrl = body.search.laqjhestitateURL
						}else if(index == 4){/*回执回销扣款明细*/
							LoadUrl = body.search.lacustomgetpolURL
						}else if(index == 5){/*代签字品质扣款明细*/
							LoadUrl = body.search.lareplacesignURL
						}else if(index == 6){/*大额客户身份识别问题件扣款明细*/
							LoadUrl = body.search.lalargeidentityURL
						}
						let title = '生成Excel成功<br/>是否下载?'
						alert_n22.confirm('温馨提示',title,'下载','取消',(flag)=>{
							if(this.isiOS){
								var url = this.personsal.IOS_URL
								var urlObj = {
									"url": LoadUrl
								}
								var urlStr = JSON.stringify(urlObj)
								var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
								//IOS升级
								MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
									alert(JSON.stringify(callbackSucc))
								}, function(callbackFail) {
									alert(callbackFail)
								});
							}else {
								console.log(LoadUrl)
								window.open(LoadUrl, '_system')
							}
						})
					}else {
						console.log('数据异常')
						this.newModel = true
						this.modelContent = header.resultMsg
					}
				})
			}
		},
		mounted(){
			console.log(this.ComprehensiveYearDate)
			console.log(this.ComprehensiveMonthDate)
			if(this.$route.params.type == 1){
				this.loadList = this.list1[0].BtnList
				this.BtnTitle = this.list1[0].title
			}else if(this.$route.params.type == 2){
				this.loadList = this.list2[0].BtnList
				this.BtnTitle = this.list2[0].title
			}
			console.log('List--------->>>',this.loadList)
			let LoginHeight = document.documentElement.clientHeight-48+'px'
			$('.my-comm-download-content').css('height',LoginHeight);
			window.onresize = function() {
				let LoginHeight = document.documentElement.clientHeight-48+'px';
				$('.my-comm-download-content').css('height',LoginHeight);
			}
		}
	}
</script>

<style>
	.text-center{
		text-align: center;
	}
	.font_35 {
		padding: 6px 8px;
		font-size: 35px;
		color: #FDB92C;
	}
	.my-comm-download-content{
		background:#F4F4F4;
		margin:48px 0 0 0;
		height:100%;
		overflow: auto!important;
	}
	.my-comm-download-content>img{
		display: block;
		width:70%;
		margin:30px auto;
	}
	.my-comm-download-content>ul{
		margin:10px 0 20px 0;
	}
	.my-comm-download-li-title{
		color:#FEB101;
		font-size:1rem;
		margin:10px 0;
	}
	.my-comm-download-li-for{
		margin-bottom:10px;
	}
	.my-comm-download-li-for>button{
		color:#fff;
		background:#FEB101;
		border-radius: 20px;
		border:none;
		width:80%;
		margin:0 auto;
		height:40px;
		font-size:.9rem;
		outline: none;
	}
</style>
