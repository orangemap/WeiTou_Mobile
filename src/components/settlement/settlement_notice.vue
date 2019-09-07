<template>
	<div class='not'>
		<Headerbtns title="代办理赔服务须知" class='sel-user-head'>
			<div slot="left" class="back" @click='backUrl'><i class="fa fa-angle-left" ></i></div>
		</Headerbtns>
		<div class='notice'>
			<div style='width:95%;margin:0 auto'><!-- 
				<p style='font-weight: bold;font-size: 1rem;text-align: center;margin:1rem 0'>	代办理赔服务须知
				</p> -->
				<p>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					光大永明人寿时刻秉承“以客为尊”的服务理念，凭借“极速理赔”的服务特色，用心呵护客户的健康和保障。
				</p>
				<p>1、申请资格人：</p>
				<p>
					&nbsp;&nbsp;（1）申领
					<span>非身故类保险金：</span>应由被保险人本人申请，当被保险人为未成年人，应由其法定监护人提出申请
				</p>
				<p>
					&nbsp;&nbsp;（2）申领
					<span>身故保险金：</span>应由指定的受益人申请；未指定受益人则应由被保险人的法定继承人提出申请
				</p>
				<p>
					&nbsp;&nbsp;（3）申请
					<span>豁免保险费：</span>
					应由豁免险的被保险人申请，如豁免险的被保险人身故则由主险的被保险人申请，当主险的被保险人为未成年人，应由其法定监护人提出申请
				</p>
				<p>
					2、申请医疗保险金，请在医
					<span>疗费用收据原始凭证</span>
					上用签字笔注明
					<span>“仅供光大永明理赔使用”</span>。
				</p>
				<p>
					3、请妥善保管好理赔原始资料，当申请医疗保险金的全部医疗收据累计个人支付金额
					<span>超过3千元</span>
					时，提交理赔申请后请您协助客户在
					<span>3个工作日内</span>
					将原始
					<span>医疗费用收据原始凭证</span>
					递交至我公司各客户服务部。
				</p>
				<p>
					4、我们以收到
					<span>完整齐全</span>
					的索赔资料作为理赔受理时间，如上传资料不清晰或资料不全，我们会及时与您沟通。
				</p>
				<!-- <label style='margin-bottom:2.5rem;display: block'>
					<p :class='[isOk?"text-active":""]'>
						<input type="checkbox" name="" v-model='isOk'>
						我确认录入的出险信息属实。知晓并了解故意伪造证明资料属于违法行为，需承担法律责任。
					</p>
				</label> -->
			</div>
		</div>
		<button class='not-btn' @click='goTocontent'>开始申请</button>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>
<script>
	import Headerbtns from '@/components/policy/common/Header'
    import '../policy/css/base.css'
	import Alert from '@/components/policy/common/alert.vue'
	export default {
		components:{Headerbtns,Alert},
		data() {
			return {
				isOk:false
			}
		},
		mounted() {
			console.log(this.$route.params)
			this.media.header($('.notice'))
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
			$('.notice').css('height',this.media.container(this.screenHeight,$('.not-btn'))).css('overflow','scroll')
		},	
		methods: {
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			backUrl() {
				this.$router.push('/settlement')
			},
			goTocontent() {
				// if(this.isOk == true){
					if(this.$route.params.type == 'start'){
						this.$router.push('/settlement_user/1')
					}else if(this.$route.params.type == 'end') {
						this.$router.push('/settlement_content/settlement_policy/end/'+this.$route.params.id)
					}
				// }else{
					// this.Aleart('请阅读须知')
				// }
			}
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		}
	}
</script>
<style>
.not{
	overflow:hidden;
}
.notice::-webkit-scrollbar,
.not::-webkit-scrollbar {
	display:none
}
.not .notice>.not-title{
	width:95%;
	margin: 0 auto;
	height:2rem;
	line-height: 2rem;
	font-size: .8rem;
	border-bottom:2px solid #0334A0;
}
.not .notice p{
	line-height: 1.5rem;
}
.not .notice>div>p{
	font-size: .8rem;
	margin-top:.5rem;
}
.not .notice>div p>span{
	font-size: .8rem;
	font-weight: bold;
}
.not .text-active{
	color: #feb101;
}
.not .not-btn{
	position:fixed;
	bottom:0;
	width:100%;
	outline: none;
	background: #feb101;
	border: none;
	color:#fff;
	left:0;
	font-size:.9rem;
	height:2.5rem;
}
.fa{
	color: #feb101;
}
</style>