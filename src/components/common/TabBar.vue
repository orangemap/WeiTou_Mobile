<template>
	<div class="footer-content">
		<div class="footer-tab">
			<div @click="goto(1)">
				<div>
					<img src="../../../static/img/home/home.png" v-if="!isHome">
					<img src="../../../static/img/home/home_active.png" v-if="isHome">
				</div>
				<span :class="{active: isHome}">首页</span>
			</div>
			<div @click="goto(2)">
				<div>
					<img src="../../../static/img/home/tool.png" v-if="serviceInfo">
					<img src="../../../static/img/home/tool_active.png" v-if="!serviceInfo">
				</div>
				<span :class="{active:!serviceInfo}">展业工具</span>
			</div>
			<div @click="goto(3)">
				<div>
					<img src="../../../static/img/home/manual.png" v-if="productManualInfo">
					<img src="../../../static/img/home/manual_active.png" v-if="!productManualInfo">
				</div>
				<span :class="{active:!productManualInfo}">产品手册</span>
			</div>
			<div @click="goto(4)">
				<div>
					<img src="../../../static/img/home/user.png" v-if="me">
					<img src="../../../static/img/home/user_active.png" v-if="!me">
				</div>
				<span :class="{active:!me}">我</span>
			</div>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	export default {
		name: 'tabBar',
		props: {
			isHome: {
				type: Boolean,
				default: true
			},
			serviceInfo: {
				type: Boolean,
				default: true
			},
			productManualInfo: {
				type: Boolean,
				default: true
			},
			me: {
				type: Boolean,
				default: true
			}
		},
		mounted() {
			var _height = $('.footer-content')
			var u = navigator.userAgent;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS) {
				if(screen.height == 812 && screen.width == 375) {
					_height.css({
						"height": "87px" //53+34
					})
				}
			}
		},
		methods: {
			show(msg) {
				Toast({
					message: msg,
					duration: 1000
				});
			},
			goto(index) {
				let channel = utils.cache.get('personsal').channel;
				if(index == 1) {
					if(channel=='00'){
						this.show('开发中，敬请期待')
					}else{
						this.$router.push({
							name: 'home',
							params: {}
						})
					}
				} else if(index == 2) {
					if(channel=='00'){
						this.show('开发中，敬请期待')
					}else{
						this.$router.push({
							name: 'serviceInfo',
							params: {}
						})
					}
				} else if(index == 3) {
					/*
					this.$router.push({
						name: 'productManualInfo',
						params: {}
					})*/
					this.show('开发中，敬请期待')
				} else if(index == 4) {
					let agentCode = utils.cache.get('personsal').agentCode;
					if(agentCode == 'Citi1' || agentCode == 'Cmbc1' || agentCode == 'Ceb1') {
						return
					} else {
						this.$router.push({
							name: 'personalInfo',
							params: {}
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped type="text/css">
	.footer-content {
		width: 100%;
		height: 53px;
		background: #fff;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.35);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 500;
		box-sizing: border-box;
	}
	
	.fa-angle-double-right {
		font-size: 18px;
	}
	
	.footer-tab {
		display: flex;
		height: 48px;
		justify-content: space-around;
		text-align: center;
		padding-top: 3px;
		box-sizing: border-box;
	}
	.footer-tab>div{
		height:48px;
		padding:4px 0;
		box-sizing: border-box;
		span {
			color: #BABABA;
			font-size: 10px;
			font-family:PingFangSC-Medium;
			font-weight:500;
			box-sizing: border-box;
		}
		.active {
			color: #FDB92C;
		}
	}
	.footer-tab>div>div{
		margin-bottom:3px;
	}
	.footer-tab>div:nth-child(1) img{
		width: 24px;
		height: 23px;
	}
	.footer-tab>div:nth-child(2) img{
		width: 23px;
		height: 23px;
	}
	.footer-tab>div:nth-child(3) img{
		width: 21px;
		height: 24px;
	}
	.footer-tab>div:nth-child(4) img{
		width: 18px;
		height: 24px;
	}
</style>
