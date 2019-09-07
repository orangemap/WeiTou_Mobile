<template>
	<div>
		<Headerbtns title="订单详情">
			<router-link to="/backlog" replace slot="left">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<div class="main-contents">
			<ul>
				<li>
					<span>支付保费</span>
					<span>{{showPolicy.sumPremL}}</span>
				</li>
				<li>
					<span>投保人</span>
					<span>{{showPolicy.appntName}}</span>
				</li>
				<li>
					<span>投保险种</span>
					<span>{{showPolicy.prodName}}</span>
				</li>
				<li @click="goBankChange()">
					<span>付款银行</span>
					<span>{{showPolicy.bankInfo.text}}</span>
					<span style="color:#FEB101;margin-left: 10px;">单笔限额{{showPolicy.bankInfo.remark}}万</span>
				</li>
				<li @click="goBankChange()">
					<span>付款卡号</span>
					<span>{{showPolicy.bankAccNo}}</span>
				</li>
				<li>
					<span style="color:#FEB101;">银行预留 <br /> 手机号码</span>
					<input type="text" maxlength="11" v-model="showPolicy.appntMobile" placeholder="请填写银行卡预留手机号码" />
				</li>
				<li style="color:#5B87DF;border: none;line-height: 1.4;">受监管政策及网联系统等影响，将当日实时扣款不成功的数据在当日24时转到线下通过批扣方式进行扣款。</li>
				<li style="align-items: baseline;margin-top: 10px;border: none;">
					<span>支付方式选择</span>
					<div>
						<label style="line-height: 30px;"><input type="radio" name="pay_fs" v-model="pays" value="1" style="position:relative;top:2px;margin-right: 5px;">实时扣款转账</label>
						<br />
						<label style="line-height: 30px;"><input type="radio" name="pay_fs" v-model="pays" value="2" style="position:relative;top:2px;margin-right: 5px;">转批扣</label>
					</div>
				</li>
			</ul>
		</div>
		<FooterBar>
			<div slot="center" @click="paymentRequest">立即付款</div>
		</FooterBar>
		<div class="showZ" :style="{width:darkHeight+'px'}" v-if="isShowZ"></div>
		<div id="countdown" :style="{width:screenWidth+'px',height:screenHeight+'px'}" v-if="isShowCountDown">
			<div class="countdown">
				<div class="countdowns">
					<div>{{countdown}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '../policy/common/Header.vue'
	import FooterBar from '../policy/common/FooterBar.vue'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import '../policy/css/base.css'
	export default {
		name: 'pay',
		components: {
			Headerbtns,
			FooterBar
		},
		data() {
			return {
				policy: {},
				showPolicy: {
					appntName: '',
					appntMobile: '',
					prodName: '',
					bankInfo: {
						text: '',
						remark: '',
					},
					bankAccNo: '',
					sumPremL: '',
				},
				pays: '1',
				payCount: 0,
				isShowZ: false, //遮罩层
				isShowCountDown: false, //倒计时
				countdown: 35,
				darkHeight: "",
				screenWidth: window.screen.width,
				screenHeight: window.screen.height,
			}
		},
		mounted() {
			this.getPolicyMsg()
			if(this.screenWidth > this.screenHeight) {
				this.darkHeight = this.screenWidth
			} else {
				this.darkHeight = this.screenHeight
			}
			this.orient()
			window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.orient, false)
		},
		methods: {
			orient() {
				if(window.orientation == 90 || window.orientation == -90) {
					//ipad、iphone竖屏；Andriod横屏
					this.screenWidth = window.screen.width
					this.screenHeight = window.screen.height
					$(".countdown").css({
						"margin": "15% auto"
					})
				} else if(window.orientation == 0 || window.orientation == 180) {
					//ipad、iphone横屏；Andriod竖屏
					this.screenWidth = window.screen.width
					this.screenHeight = window.screen.height
					$(".countdown").css({
						"margin": "35% auto"
					})
				}
			},
			/*
			 * MOPAYACCEPTYL
			 * MOPAYSTATUEACCEPT
			 * MOBATCHNBPAY
			 * */
			paymentRequest() {
				if(this.pays == '1') {
					console.log('===>实时扣款转账', this.showPolicy.bankInfo.code)
					if(this.showPolicy.bankInfo.code == '314' || this.showPolicy.bankInfo.code == '321') {
						alert_n22.alert("提示", '该银行暂不支持实时支付', "确定")
						return
					} else {
						this.isShowZ = true
						this.payCount++
							if(this.payCount == 1) {
								let requ = {
									"policy": {
										"agentCode": this.policy.agentInfo.agentCode,
										"applyCode": this.policy.applyCode,
										"ID": this.policy.custInfo.appnt.idNo,
										"bankCode": this.showPolicy.bankInfo.code,
										"bankNo": this.showPolicy.bankAccNo,
										"activityid": "N",
										"tel": this.policy.agentInfo.mobile
									}
								}
								utils.http.postFast('MOPAYACCEPTYL', requ, (body) => {
									this.payCount = 0
									if(body.policy.resultCode == '0') {
										this.isShowCountDown = true
										let timer = setInterval(() => {
											this.countdown--
												console.log('===>倒计时', this.countdown)
											if(this.countdown == 0) {
												clearInterval(timer)
												this.isShowCountDown = false
												this.countdown = 15
												let requ = {
													"policy": {
														"agentCode": this.policy.agentInfo.agentCode,
														"applyCode": this.policy.applyCode,
														"serialNo": body.policy.serialNo
													}
												}
												utils.http.postFast('MOPAYSTATUEACCEPT', requ, (body) => {
													this.$router.push({
														name: 'insureResult',
														params: {
															orderId: this.$route.params.orderId,
															result: body.policy
														}
													})
												})
											}
										}, 1500)
									} else {
										this.$router.push({
											name: 'insureResult',
											params: {
												orderId: this.$route.params.orderId,
												result: body.policy
											}
										})
									}
								})
							}
					}
				} else {
					console.log('===>转批扣')
					this.payCount++
						if(this.payCount == 1) {
							let requ = {
								"policy": {
									"accountName": this.showPolicy.appntName,
									"accountNo": this.showPolicy.bankAccNo,
									"applyCode": this.policy.applyCode,
									"bankCode": this.showPolicy.bankInfo.code,
									"activityid": "N"
								},
							}
							utils.http.postFast('MOBATCHNBPAY', requ, (body) => {
								this.payCount = 0
								this.$router.push({
									name: 'insureResult',
									params: {
										orderId: this.$route.params.orderId,
										result: body.policy
									}
								})
							})
						}
				}
			},
			getPolicyMsg() {
				let requ = {
					"policy": {
						"substepNo": '',
						"orderCode": this.$route.params.orderId,
						"stepNo": '1,2,8',
						"nothave":'2,3'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requ, (body) => {
					this.policy = body.policy
					console.log('===>policy', this.policy)
					this.showPolicy.appntName = this.policy.custInfo.appnt.appntName
					this.showPolicy.appntMobile = this.policy.custInfo.appnt.mobile
					this.policy.custInfo.insurants.firstInsurant.products.product.forEach(item => {
						if(item.isMaster == '1') {
							this.showPolicy.prodName = item.prodName
						}
					})
					let bankCode = this.policy.payInfo.bankCode
					bankList.bank.item.forEach((item) => {
						if(item.code == bankCode) {
							this.showPolicy.bankInfo = item
						}
					})
					this.showPolicy.bankAccNo = this.policy.payInfo.bankAccNo
					this.showPolicy.sumPremL = this.policy.payInfo.sumPremL
					console.log('===>显示信息showPolicy', this.showPolicy)
				}, true)
			},
			goBankChange() {
				utils.cache.removeItem("bankinfo")
				utils.cache.removeItem("bankImg")
				utils.cache.removeItem("bankcaimage")
				this.$router.push({
					name: 'bankChange',
					params: {
						orderId: this.$route.params.orderId,
						applyCode: this.policy.applyCode,
						agentCode: this.policy.agentInfo.agentCode

					}
				})
			},
		}
	}
</script>

<style lang='scss' scoped type="text/css">
	.main-contents {
		ul {
			width: 100%;
			box-sizing: border-box;
			li {
				width: 100%;
				height: 55px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0 15px;
				border-bottom: 1px solid #ddd;
				box-sizing: border-box;
				font-size: 14px;
				input {
					text-align: left;
				}
			}
			li>span:first-child {
				width: 40%;
				font-size: 16px;
				color: #333;
			}
			li>span+span {
				font-size: 14px;
				color: #3E3A39;
			}
		}
	}
	
	.showZ {
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
		z-index: 1500;
		position: fixed;
		overflow: hidden;
	}
	
	#countdown {
		position: fixed;
		z-index: 1999;
		.countdown {
			width: 200px;
			height: 200px;
			border-radius: 50%;
			background: #F4A200;
			margin: 35% auto;
			box-sizing: border-box;
			border: 5px solid #F4A200;
			.countdowns {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background: #fff;
				text-align: center;
				line-height: 190px;
				div {
					font-size: 54px;
					color: #F4A200;
				}
			}
		}
	}
</style>