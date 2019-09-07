<template>
	<div>
		<Headerbtns title="综合金融">
			<div slot="left" @click="go('/home')">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="main-contents">
			<ul class="navbar_top">
				<li @click="choose(1)" :class="[show_1 ? 'active':'']">光大信用卡</li>
				<li @click="choose(2)" :class="[show_2 ? 'active':'']">中青旅耀悦</li>
				<li style="color:#999">更多</li>
			</ul>
			<ul class="navbar_content" v-show="show_1">
				<li>
					<p class="title">申请办卡</p>
					<div>
						<img src="../../../static/img/comprehensiveFinance/comprehensiveFinance_01.png" />
						<div>
							<p>光大羽你同行信用卡</p>
							<span>新客户首刷送300积分</span>
							<p @click="jump(1)">立即申请</p>
						</div>
					</div>
				</li>
				<li>
					<p class="title">进度查询</p>
					<div>
						<img src="../../../static/img/comprehensiveFinance/comprehensiveFinance_02.png" />
						<div>
							<p>光大羽你同行信用卡</p>
							<span>新客户首刷送300积分</span>
							<p @click="jump(2)">点击查询</p>
						</div>
					</div>
				</li>
			</ul>
			<ul class="navbar_content" v-show="show_2">
				<li>
					<p class="title">抢游惠</p>
					<div>
						<img src="../../../static/img/comprehensiveFinance/comprehensiveFinance_03.png" />
						<div>
							<p>大自然的赋予</p>
							<span>有温度的旅行，360°服务</span>
							<p @click="jump(3)">立即预订</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '../policy/common/Header.vue'
	import '../policy/css/base.css'
	export default {
		name: 'comprehensiveFinance',
		components: {
			Headerbtns
		},
		data() {
			return {
				show_1: true,
				show_2: false,
				isShow: true,
				selected: '1',
			}
		},
		created() {

		},
		mounted() {

		},
		filters: {

		},
		watch: {

		},
		methods: {
			showToast(message) {
				Toast({
					message: message,
					position: 'bottom',
					duration: 1500
				})
			},
			choose(index) {
				this.selected = index
				this.show_1 = false
				this.show_2 = false
				if(index == '1') {
					this.show_1 = true
				} else if(index == '2') {
					this.show_2 = true
				}
			},
			jump(index) {
				console.log('跳转', index)
				if(index == 1) {

				} else if(index == 2) {

				} else if(index == 3) {

				}
			}
		}
	}
</script>

<style lang='scss' scoped type="text/css">
	.main-contents {
		.navbar_top {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #efefef;
			line-height: 48px;
			box-sizing: border-box;
			padding-left: 15px;
			li {
				font-size: 16px;
				color: #333;
				margin-right: 20px;
				border-bottom: 2px solid transparent;
			}
			li.active {
				color: #FDB92C;
				border-bottom-color: #FDB92C;
			}
		}
		.navbar_content {
			width: 100%;
			box-sizing: border-box;
			li {
				width: 100%;
				padding: 24px 15px;
				box-sizing: border-box;
				border-bottom: 1px solid #EFEFEF;
				.title {
					font-size: 18px;
					color: #333;
					font-weight: bold;
					margin-bottom: 29px;
				}
				.title+div {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img {
						width: 132px;
						height: 84px;
						margin-right: 15px;
					}
					div p:first-child {
						font-size: 16px;
						color: #333;
						margin-bottom: 12px;
					}
					div span {
						font-size: 12px;
						color: #999;
					}
					div p:last-child {
						width: 84px;
						height: 30px;
						font-size: 14px;
						color: #fff;
						background: #FDB92C;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 3px;
						margin-top: 16px;
					}
				}
			}
		}
	}
	.main-contents {
		bottom: 0 !important;
		-webkit-overflow-scrolling: auto !important;
	}
</style>