<template>
	<div>
		<Headerbtns :title="page_title">
			<div ref='header' slot="left" class="back" @click='goBack'>
				<i class="fa fa-angle-left text-center font_35"></i>
			</div>
		</Headerbtns>
		<div class='my-comm-download-content text-center'>
			<ul>
				<li>
					<img :src="list2[0].url" alt="" style='width:80%;'/>
				</li>
				<li class='my-comm-download-li-title'>{{BtnTitle}}</li>
				<li v-for='item in loadList' class='my-comm-download-li-for'>
					<a @click='Download(item.id)'>{{item.text}}</a>
				</li>
			</ul>
		</div>
		<Alert ref="showalert"></Alert>
	</div>
</template>

<script>
	import Headerbtns from '../../../../../src/components/policy/common/Header'
	import { mapState,mapMutations } from 'vuex'
	import Alert from '@/components/policy/common/alert.vue'
	import store from '../../../../vuex/comprehensive/comprehensive'
	export default{
		components:{Headerbtns,Alert},
		data() {
			return {
				page_title:'下载页面',
				list1:[
				{title:'佣金报告下载',BtnList:[
				{text:'佣金报告',id:1}
				]}
				],
				list2:[
				{title:'收入明细详情下载',url:'./static/img/comprehensive/Gx_pos.png',
				BtnList:[
				{text:'个人NPC',id:2},
				{text:'下辖组员业绩',id:3},
				{text:'回访不成功扣款明细',id:4},
				{text:'个人继续率保单明细',id:5},
				{text:'团队继续率明细',id:6}
				]}
				],
				list3:[
				{title:'团队人员考核详情下载',BtnList:[
				{text:'维持考核',id:1},
				{text:'晋升考核',id:2}
				]}
				],
				loadList:[],
				BtnTitle:'',
				personsal:utils.cache.get('personsal'),
				isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
			}
		},
		computed: {
			...mapState(['ComprehensiveGeXianYearDate','ComprehensiveGeXianMonthDate'])
		},store,
		methods: {
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			goBack(){
				this.$router.push('/comprehensiveGexian/AriskmyCommission')
			},
			Download(id){
				console.log(id)
				let LoadUrl = ''
				let requ = {
					search:{
						"agentCode": this.agentCode, /*this.agentCode*/
						"channel": this.channel,
						"year":this.ComprehensiveGeXianYearDate,
						"month":this.ComprehensiveGeXianMonthDate,
						"model":id+''
					}
				}
				console.log('请求数据',requ)
				utils.http.postFast('ZHPAYDOWNLOADGX',requ,(body,header) => {
					console.log(header)
					console.log(body)
					if(header.resultCode == 0){
						LoadUrl = body.search.downloadURL
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
					}else{
						console.log('数据异常')
						this.showModals(header.resultMsg)
					}
				});
			}
		},
		mounted(){
			if(this.$route.params.type == 1){
				this.loadList = this.list1[0].BtnList
				this.BtnTitle = this.list1[0].title
			}else if(this.$route.params.type == 2){
				this.loadList = this.list2[0].BtnList
				this.BtnTitle = this.list2[0].title
			}else if(this.$route.params.type == 3){/*个险渠道团队人员考核详情下载*/
				this.loadList = this.list3[0].BtnList
				this.BtnTitle = this.list3[0].title
			}
			this.channel = utils.cache.get('channel')
			console.log('渠道',this.channel)
			this.agentCode = utils.cache.get('personsal').agentCode
			console.log('代理人工号',this.agentCode)
			console.log(document.documentElement.clientHeight)
			let LoginHeight = document.documentElement.clientHeight
			$('.my-comm-download-content').css('height',LoginHeight-83+'px');
			window.onresize = function() {
				let LoginHeight = document.documentElement.clientHeight+'px';
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
		font-size: 30px;
		color:#FDB92C;
	}
	.my-comm-download-content{
		background:#F4F4F4;
		margin:48px 0 0 0;
		padding-top:35px;
		height:100%;
		overflow: auto!important;
	}
	.my-comm-download-content>img{
		display: block;
		width:70%;
		margin:20px auto;
	}
	.my-comm-download-content>ul{
		margin:10px 0 20px 0;
	}
	.my-comm-download-li-title{
		font-size:1rem;
		color:#FEB101;
		margin-bottom:5px;
	}
	.my-comm-download-li-for{
		margin-top:10px;
		margin-bottom:10px;
	}
	.my-comm-download-li-for>a{
		display: block;
		color:#fff;
		background:#FEB101;
		border-radius: 20px;
		border:none;
		width:80%;
		margin:0 auto;
		height:40px;
		line-height: 40px;
		font-size:.9rem;
		outline: none;
	}
</style>
