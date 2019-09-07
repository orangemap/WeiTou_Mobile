<template>
	<div>
		<Headerbtns :title="page_title">
			<div ref='header' slot="left" class="back" @click="Goback">
				<i class="fa fa-angle-left text-center" style='padding: 6px 8px;font-size: 35px;color: #FDB92C;'></i>
			</div>
		</Headerbtns>
		<div class='agent-conttainer' ref='agt'>
			<div class='agent-cnt'>
				<ul>
					<li>
						<span>代理人姓名</span>
						<span style='text-align: right;'>{{resData.signagentname}}</span>
					</li>
					<li>
						<span>所在区部</span>
						<span style='width:65%;text-align: right;'>{{resData.serbranchattrname}}</span>
					</li>
					<li>
						<span>业务代码</span>
						<span style='text-align: right;'>{{resData.seragentcode}}</span>
					</li>
					<li>
						<span>联系电话</span>
						<p @click='callPhone(resData.seragentphone)'>
							<img src="static/img/comprehensive/Xuqi/iphone.png" />
							<span style='text-align: right;'>{{resData.seragentphone}}</span>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import Headerbtns from '@/components/policy/common/Header'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/comprehensive/comprehensive'
	export default {
		components:{Headerbtns},
		data() {
			return {
				page_title:'代理人信息',
				resData:{},
				personsal:utils.cache.get('personsal')
			}
		},
		computed:{
			...mapState(['XuQiAgentData'])
		},store,
		mounted(){
			console.log(this.XuQiAgentData)
			this.resData = this.XuQiAgentData
			this.$refs.agt.style.height = document.documentElement.clientHeight+'px'
		},
		methods:{
			Goback(){
				this.$router.back(-1)
			},
			callPhone (iphone) {
				var url = this.personsal.IOS_URL
				var urlObj = {
					"url": iphone
				}
				var urlStr = JSON.stringify(urlObj)
				var hybrid = 'hybrid://MAApkIphone:401/invokeApkIphone?' + urlStr
				MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
					alert(JSON.stringify(callbackSucc))
				}, function(callbackFail) {
					alert(callbackFail)
				});
			}
		}
	}
</script>
<style>
.agent-conttainer{
	background:url('../../../../../static/img/comprehensive/Xuqi/ctd_bg.png') no-repeat;
	background-size: 100% 100%;
	position:relative;
}
.agent-cnt{
	background:url('../../../../../static/img/comprehensive/Xuqi/agent_cnt.png') no-repeat;
	background-size:100% 100%;
	left: 50%;
	top: 50%;
	width:80%;
	height:300px;
	position:absolute;
	transform: translate(-50%, -50%);
}
.agent-conttainer ul{
	position:absolute;
	bottom:5%;
	left:10%;
	width:80%;
}
.agent-conttainer li{
	border-bottom:1px dotted #ccc;
	padding:0 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height:30px;
}
.agent-conttainer li img{
	width:20px;
	height:20px;
	margin-right:5px;
}
.agent-conttainer li>p{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>