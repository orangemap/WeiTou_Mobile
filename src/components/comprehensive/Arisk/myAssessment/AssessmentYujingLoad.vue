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
					<img src="./../../../../../static/img/comprehensive/Gx_pad.png" alt="" style='width:80%;'/>
				</li>
				<li class='my-comm-download-li-title'>{{BtnTitle}}</li>
				<li v-for='item in loadList' class='my-comm-download-li-for'>
					<a @click='Download(item.id)'>{{item.text}}</a>
				</li>
			</ul>
		</div>
		<!-- <mt-popup v-model="newModel" position="bottom" style='width:80vw!important;height:210px;top:30%;border-radius: 15px;'>
			<div class='mint-msgbox-header' style='background:#002D4E;height:30px;border-top-left-radius: 10px;border-top-right-radius: 10px;'>
				<div class='mint-msgbox-title' style='color:#fff;'>提示</div>
			</div>
			<div class='mint-msgbox-content'>
				<div style='font-size:1rem;text-align:center;padding:0 10px;'>{{modelContent}}</div>
			</div>
			<div class='btn-wrapper'>
				<button @click='ClosenewModel()' style='display: block;height:40px;background:#FEB101;color:#fff;width:80px;margin:10px auto;border:none;border-radius: 8px;outline: none;' >确定</button>
			</div>
		</mt-popup> -->
		<Alert ref="showalert"></Alert>
	</div>
</template>

<script>
	import Headerbtns from '@/components/policy/common/Header'
	import Alert from '@/components/policy/common/alert.vue'
	import { mapState,mapMutations } from 'vuex'
	import store from '@/vuex/comprehensive/comprehensive'
	export default{
		components:{Headerbtns,Alert},
		data() {
			return {
				page_title:'下载页面',
				list3:[
				{title:'团队人员考核详情下载',
				BtnList:[
				{text:'维持考核',id:1},
				{text:'晋升考核',id:2}
				]
			}
			],
			loadList:[],
			BtnTitle:'',
			year:'',
			month:'',
			personsal:utils.cache.get('personsal'),
			isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		}
	},
	computed:{
		...mapState(['YuJingYear','YuJingMounth'])
	},store,
	mounted(){
		console.log(this.$route.params)
		this.year = this.$route.params.year
		this.month = this.$route.params.mounth
		this.loadList = this.list3[0].BtnList
		this.BtnTitle = this.list3[0].title
		this.channel = utils.cache.get('channel')
		console.log('渠道',this.channel)
		this.agentCode = utils.cache.get('personsal').agentCode
		console.log('代理人工号',this.agentCode)
		let LoginHeight = document.documentElement.clientHeight
		$('.my-comm-download-content').css('height',LoginHeight-83+'px');
		window.onresize = function() {
			let LoginHeight = document.documentElement.clientHeight+'px';
			$('.my-comm-download-content').css('height',LoginHeight);
		}
		console.log(this.YuJingYear)
		console.log(this.YuJingMounth)
		this.SetYuJingYear(this.YuJingYear)
		this.SetYuJingMounth(this.YuJingMounth)
	},
	methods: {
		...mapMutations(['SetYuJingYear','SetYuJingMounth']),
		goBack(){
			this.$router.push('/comprehensiveGexian/AssessmentYujing/3')
		},
		showModals(message) {
         this.$refs.showalert.showMOdal(message)
      },
		Download(id){
			let LoadUrl = ''
			console.log(this.agentCode)
			let requ = {
				search:{
					"agentCode":this.agentCode , //this.agentCode
					"channel": this.channel,
					"year":this.year,
					"month":this.month,
					"model":'3',
					"secondModel":id.toString(),
					"flag":'2'
				}
			}
			utils.http.postFast('ZHWARNDOWNLOADGX',requ,(body,header) => {
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
					this.showModals(header.resultMsg)
				}
			});
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
	margin:5px 0;
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
