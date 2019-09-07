<template>
	<div>
		<div id="home">
			<div class="home-content">
				<div class="top">
					<img src="../../../static/img/home/notice.png" v-if="isHaveNoRead != '1'" style="width:23px;height:19px;" @click="go('/personal/personalMessage/personalMessageKH')" />
					<img src="../../../static/img/home/notice_has.png" v-if="isHaveNoRead == '1'" style="width:23px;height:19px;" @click="go('/personal/personalMessage/personalMessageKH')" />
					<div class="title-name">光速保</div>
				</div>
				<div class="banner" style="width:100%;height: 160px;">
					<div class="swiper swiper-container" style="width:100%;height: 160px;">
						<swiper :options="swiperOption">
							<swiper-slide v-for="(item, index) in slides" :key="index">
								<img :src="item" style="width:100%;height:160px;border-radius:10px;">
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination"></div>
						</swiper>
					</div>
				</div>
				<div class="tops" style="padding:0 15px 0;margin-top:24px;">
					<span>优选服务</span>
					<p>
						<i>更多</i>
						<img src="../../../static/img/home/more.png" />
					</p>
				</div>
				<div class="nav-lists">
					<ul class="nav-list">
						<li @click="go('/proposal/prolist')">
							<p><img src="../../../static/img/home/home_1.png"></p>
							<p>建议书</p>
						</li>
						<li @click="goToProductList()" v-show="loginLimit.mounited =='1'">
							<p><img src="../../../static/img/home/home_2.png"></p>
							<p>在线投保</p>
						</li>
						<li @click="go('/backlog')" v-show="loginLimit.mobacklog =='1'">
							<p><img src="../../../static/img/home/home_3.png"></p>
							<p>待办事项</p>
						</li>
						<li @click="go('/customer/customerManage')">
							<p><img src="../../../static/img/home/home_4.png"></p>
							<p>客户管理</p>
						</li>
						<li @click="goToType()" v-show="loginLimit.mosearch =='1'">
							<p><img src="../../../static/img/home/home_5.png"></p>
							<p>综合查询</p>
						</li>
						<li @click="go('/preservation/preservationPolicySearch')" v-show="loginLimit.mopreservation =='1'">
							<p><img src="../../../static/img/home/home_7.png"></p>
							<p>保单服务</p>
						</li>
					</ul>
				</div>
				<div class="toutiao">
					<p>光大头条</p>
					<span>|</span>
					<div>
						<p>光速保2.0隆重上线！</p>
					</div>
				</div>
				<div class="split"></div>
				<div class="jingcai">
					<div class="tops">
						<span>精彩活动</span>
						<p>
							<i>更多</i>
							<img src="../../../static/img/home/more.png" />
						</p>
					</div>
					<!--
					<div class="content" style="width:100%;padding:0 15px;margin-bottom:14px;">
						<div class="swiper swiper-container">
							<swiper :options="swiperOptions">
								<swiper-slide v-for="(item, index) in activeList" :key="index">
									<img v-show="item.fileType == '2'" :src="item.remoteUrl" style="width:90%;height:100px;border-radius:3px;">
								</swiper-slide>
							</swiper>
						</div>
					</div>
					-->
					<div class="content">
						<img @click="toActivity(item)" v-for="(item, index) in activeList" :key="index" v-show="item.fileType == '2'" :src="item.remoteUrl" />
					</div>
				</div>
				<div class="split"></div>
				<div class="rexiao">
					<div class="tops">
						<span>热销产品</span>
						<p @click="goToProductList()">
							<i>更多</i>
							<img src="../../../static/img/home/more.png" />
						</p>
					</div>
					<div class="content">
						<ul>
							<li v-for="(item,index) in hotProductList">
								<img :src="item.remoteUrl" @click="goProduct(item)">
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class='home-loding' v-show='isChildChannle'>
				<div style='text-align: center;'>
					<p style='color:#fff;font-size:1.4rem;text-align: center;display: flex;align-items: center;justify-content: center;'>
						<span>渠道 </span>
						<span style='font-size:3rem'>&nbsp;·&nbsp;</span>
						<span> 选择</span>
					</p>
					<div class='home-loding-div'>
						<div @click='goSel(1)'>
							<p><img src="../../../static/img/home/channel_1.png"></p>
							<p>{{channelTypes.text}}</p>
						</div>
						<div @click='goSel(2)'>
							<p><img src="../../../static/img/home/channel_2.png"></p>
							<p>续期</p>
						</div>
					</div>
					<img src='../../../static/img/home/close.png' style='width:40px;height:40px;' @click='isChildChannle = false' />
				</div>
			</div>
		</div>
		<tabBar></tabBar>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import tabBar from '../common/TabBar.vue'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'
	export default {
		name: 'home',
		components: {
			tabBar,
			swiper,
			swiperSlide
		},
		data() {
			return {
				isHaveNoRead: utils.cache.get('IS_HAVE_NO_READ'),
				loginLimit: {
					mounited: utils.cache.get("loginMedol").mounited,
					mopersonal: utils.cache.get("loginMedol").mopersonal,
					mosearch: utils.cache.get("loginMedol").mosearch,
					mobacklog: utils.cache.get("loginMedol").mobacklog,
					moclaims: utils.cache.get("loginMedol").moclaims,
					mopreservation: utils.cache.get("loginMedol").mopreservation,
					returnVisit: utils.cache.get("loginMedol").returnVisit,
					integralQuery: utils.cache.get("loginMedol").integralQuery
				},
				//utils.cache.get('agentList') //代理人背景及头像
				slides: utils.cache.get('activeList'), //轮播图
				activeList: utils.cache.get('personsal').activeList, //精彩活动
				hotProductList: utils.cache.get('productList'), //热销产品
				channel: utils.cache.get('personsal').channel,
				childChannel: utils.cache.get("personsal").subChannel,
				channelTypes: { /*渠道弹框*/
					text: '',
					link: ''
				},
				closeImg: '../../../static/img/home/colse.png',
				isChildChannle: false,
				swiperOption: {
					effect: 'coverflow',
					centeredSlides: true,
					slidesPerView: 1.1,
					coverflowEffect: {
						rotate: 30,
						stretch: 10,
						depth: 60,
						modifier: 2,
						slideShadows: true
					},
					loop: true,
					loopedSlides: 2,
					autoplay: {
						delay: 2000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					}
				},
				swiperOptions: {
					slidesPerView: 1.5,
					loop: true,
					loopAdditionalSlides: 1,
					loopedSlides: 2,
					loopFillGroupWithBlank: true,
					autoplay: {
						delay: 2000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					}
				}
			}
		},
		watch: {
			'$route' (to, from) {
				if(to.name == "home" && from.name == "login") {
					console.log("第二次登录到home页面", 'watch route')
					this.loadData(2)
				}
			}
		},
		methods: {
			comptimeTime(beginTime, endTime) {
				console.log(beginTime)
				console.log(endTime)
				let beginTimes = beginTime.substring(0, 10).split('-');
				let endTimes = endTime.substring(0, 10).split('-');
				beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
				endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
				let a = (Date.parse(endTime.replace(/-/g, '/')) - Date.parse(beginTime.replace(/-/g, '/'))) / 3600 / 1000;
				if(a >= 0) {
					return true
				} else {
					return false
				}　
			},
			toActivity(item) {
				if(item.startTime != undefined && item.startTime != '' && item.endTime != undefined && item.endTime != '') {
					Date.prototype.Format = function(fmt) {
						var o = {
							"M+": this.getMonth() + 1, //月份 
							"d+": this.getDate(), //日 
							"H+": this.getHours(), //小时 
							"m+": this.getMinutes(), //分 
							"s+": this.getSeconds(), //秒 
							"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
							"S": this.getMilliseconds() //毫秒 
						};
						if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
						for(var k in o)
							if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						return fmt;
					}
					let currentTime = new Date().Format("yyyy-MM-ddHH:mm:ss")
					let startComptime = this.comptimeTime(item.startTime, currentTime)
					let endComptime = this.comptimeTime(currentTime, item.endTime)
					if(!startComptime) {
						this.showToast('当前活动尚未开启')
					}
					if(!endComptime) {
						this.showToast('当前活动尚已结束')
					}
					if(item.pageCode == 'H5' && startComptime && endComptime) {
						this.$router.push({
							name: "activity",
							params: {
								id: 'dlxk',
								code: '2019001',
								agent: utils.cache.get("personsal").agentCode
							}
						})
					}
				}
			},
			loadData(index) {
				//zhangxin,此数据在电子保单页面使用,用于存储是否查看单证信息,及单证数据
				utils.cache.removeItem("documentInfo");
				//zhangxin,此数据在告知页面使用,用于存储成功保存数据后获取的orderId
				utils.cache.removeItem("policy_orderId");
				utils.cache.removeItem("documentInfo");
				//zhangxin,此数据在告知页面使用,用于存储成功保存数据后获取的orderId
				utils.cache.removeItem("policy_orderId");
				utils.cache.removeItem("documentInfo");
				//zhangxin,此数据在告知页面使用,用于存储成功保存数据后获取的orderId
				utils.cache.removeItem("policy_orderId");
				//liangxin,此数据用于电子投保单页面单证阅读勾选框,判断勾选状态
				utils.cache.removeItem("readStatus");
				utils.cache.removeItem("isReadInstructions");
				utils.cache.removeItem("orderCode");
				this.registJPush()
				if(index == 1) {
					this.getMsg((msgs) => {
						if(msgs.total > 0) {
							this.showToast('您还有消息暂未查看呢！')
							utils.cache.set('IS_HAVE_NO_READ', '1')
						} else {
							utils.cache.set('IS_HAVE_NO_READ', '0')
						}
					}, (error) => {
						window.alert(error)
					})
				}
			},
			//获取
			getMsg(success, fail) {
				let requ = {
					policy: {
						agentCode: utils.cache.get("personsal").agentCode,
						orgCode: utils.cache.get("personsal").orgId,
						noticeType: '',
						size: '9999',
						jgPashType: '1',
						start: '0'
					}
				};
				utils.http
					.post("JGPASHLIST", requ)
					.then(response => {
						let msgs = response.data.response;
						console.log(msgs, '--1--')
						if(success != undefined && msgs != undefined) {
							success(msgs)
						}
					})
					.catch(error => {
						if(fail != undefined) {
							fail(error)
						}
					});
			},
			goToType() {
				if(this.childChannel == '') {
					if(this.channel == '02') { /*银保*/
						this.$router.push('/comprehensiveYinbao/comprehensiveInfo')
					} else if(this.channel == '01' || this.channel == '03' || this.channel == '04') {
						this.$router.push('/comprehensiveGexian/comprehensiveInfo')
					} else if(this.channel == '06') {
						this.$router.push('/comprehensiveXuqi/comprehensiveInfo')
					} else if(this.channel == '05') {
						this.$router.push('/comprehensiveGexian/comprehensiveInfo')
					}
				} else {
					this.isChildChannle = true
					if(this.channel == '02') {
						this.channelTypes.text = '银保'
						this.channelTypes.link = '/comprehensiveYinbao/comprehensiveInfo'
					} else if(this.channel == '01' || this.channel == '03' || this.channel == '04') {
						this.channelTypes.text = '个险'
						this.channelTypes.link = '/comprehensiveGexian/comprehensiveInfo'
					} else if(this.channel == '06') {
						this.channelTypes.text = '续期'
						this.channelTypes.link = '/comprehensiveXuqi/comprehensiveInfo'
					} else if(this.channel == '05') {
						this.channelTypes.text = '经代'
						this.channelTypes.link = '/comprehensiveGexian/comprehensiveInfo'
					}
				}
			},
			goSel(id) {
				this.isChildChannle = false
				if(id == 1) {
					this.$router.push(this.channelTypes.link)
				} else {
					this.$router.push('/comprehensiveXuqi/comprehensiveInfo')
				}
			},
			registJPush() {
				try {
					//设置别名
					console.log('别名设置')
					window.JPush.setAlias({
						sequence: 1,
						alias: utils.cache.get('personsal').agentCode
					}, (result) => {
						let sequence = result.sequence
						let alias = result.alias
						console.log(sequence)
						console.log(alias)
					}, (error) => {
						let sequence = error.sequence
						let errorCode = error.code
					})
					//设置标签
					console.log('标签设置')
					window.JPush.setTags({
						sequence: 1,
						tags: [utils.cache.get('personsal').agentCode,
							utils.cache.get('personsal').orgId, utils.cache.get('personsal').orgId.substring(0, 4),
							utils.cache.get('personsal').channel
						]
					}, (result) => {
						let sequence = result.sequence
						let tags = result.tags // 数组类型
						console.log(sequence)
						console.log(tags)
					}, (error) => {
						let sequence = error.sequence
						let errorCode = error.code
						console.log(sequence)
						console.log(tags)
					})
				} catch(err) {
					console.log('注册推送异常')
					console.log(err)
				}
			},
			showToast(message) {
				Toast({
					message: message,
					duration: 1500
				});
			},
			goToProductList() { //zhangxin,此数据在电子保单页面使用,用于存储是否查看单证信息,及单证数据
				utils.cache.removeItem("documentInfo");
				//liangxin,此数据用于电子投保单页面单证阅读勾选框,判断勾选状态
				utils.cache.removeItem("readStatus");
				this.$router.push("/policy/list");
			},
			//热销产品跳转相应页面
			goProduct(item) {
				console.log(item, 'code')
				utils.cache.set('productCode', item.pageCode)
				utils.cache.set('productCodeDetail', item.pageCode)
				this.$router.push({
					name: "product_details_page",
					params: {
						planId: "new",
						step: 1
					}
				})
			}
		},
		mounted() {
			var _height = $('#home')
			var u = navigator.userAgent;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS) {
				_height.css({
					"marginTop": "20px"
				})
				if(screen.height == 812 && screen.width == 375) {
					_height.css({
						"marginBottom": "87px", //53+34
						"marginTop": "44px"
					})
				}
			}
			this.loadData(1)
			// add spoon 添加调用条款说明书配置文件接口
			utils.n22_http.getConfig(0, function(data) {})
			utils.n22_http.getConfig(1, function(data) {})
		}
	}
</script>

<style lang='scss' scoped type="text/css">
	div ::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
	
	#home {
		overflow-x: hidden;
		margin-bottom: 53px;
		background: rgba(255, 255, 255, 1);
	}
	
	.top {
		box-sizing: border-box;
		display: flex;
		justify-content:center;
		align-items: center;
		height: 48px;
		line-height: 48px;
		padding: 0 20px;
		text-align: center;
		position: relative;
		>img{
			position: absolute;
			left:20px;
		}
		.title-name{
			font-size:20px;
			font-weight:600;
		}
	}
	
	.banner {
		display: flex;
		justify-content: space-between;
		.swiper-slide {
			background-position: center;
			background-size: cover;
			width: 100%;
			height: 160px;
		}
		.swiper-pagination .swiper-pagination-bullet {
			width: 20px !important;
			height: 4px !important;
		}
	}
	
	.nav-lists {
		width: 100%;
		box-sizing: border-box;
		.nav-list {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			overflow: hidden;
			padding: 0 15px 24px;
			li {
				width: 25%;
				text-align: center;
				padding: 20px 0 0 0;
				p:first-child {
					margin-bottom: 16px;
				}
				p:last-child {
					font-size: 12px;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: rgba(102, 102, 102, 1);
				}
				img {
					width: 35px;
					height: 35px;
				}
			}
		}
	}
	
	.toutiao {
		border-top: 1px solid #EFEFEF;
		display: flex;
		justify-content: flex-start;
		height: 38px;
		align-items: center;
		p {
			font-size: 16px;
			color: #FDB92C;
			font-family: SourceHanSansCN-Bold;
			font-weight: bold;
			margin: 0 15px;
		}
		span {
			font-size: 16px;
			color: #EFEFEF;
			margin-left: 12px;
		}
		div {
			flex: 1;
			margin-left: 10px;
			overflow: hidden;
			p {
				font-size: 12px;
				color: #666;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				white-space: nowrap;
				animation: 10s wordsLoop linear infinite normal;
				margin-right: 0;
				border-right: none;
			}
		}
	}
	
	@keyframes wordsLoop {
		0% {
			transform: translateX(100%);
			-webkit-transform: translateX(100%);
		}
		100% {
			transform: translateX(-50%);
			-webkit-transform: translateX(-50%);
		}
	}
	
	.split {
		width: 100%;
		height: 9px;
		background: rgba(245, 245, 245, 1);
	}
	
	.tops {
		box-sizing: border-box;
		padding: 25px 15px 18px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		vertical-align: middle;
		span {
			font-size: 18px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			color: #333;
			font-weight: bold;
		}
		i {
			font-size: 12px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			font-style: normal;
			color: #BABABA;
			margin-right: 9px;
		}
		img {
			width: 7px;
			height: 12px;
			position: relative;
		}
		p {
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}
	
	.jingcai {
		.content {
			width: 97%;
			height: 100px;
			padding: 0 15px 0 5px;
			margin-bottom: 14px;
			overflow-x: auto;
			overflow-y: hidden;
			box-sizing: border-box;
			display: flex;
			img {
				width: 55%;
				border-radius: 10px;
				margin-left: 10px;
			}
			img:last-child {
				margin-right: 15px;
			}
		}
		.content::-webkit-scrollbar {
			display: none;
		}
	}
	
	.rexiao {
		.content {
			margin-bottom: 10px;
			li {
				width: 100%;
				padding: 2px 15px 9px 15px;
				box-sizing: border-box;
				height: 154px;
				img {
					width: 100%;
					height: 143px;
					border-radius: 10px;
				}
			}
		}
	}
	
	.home-loding {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .3);
		z-index: 1000;
		display: flex;
		align-items: center
	}
	
	.home-loding>div {
		position: absolute;
		width: 85%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	
	.home-loding-div {
		background: #fff;
		border-radius: 5px;
		height: 200px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
	
	.home-loding-div>div {
		width: 50%;
		text-align: center;
		margin-bottom: 20px;
	}
	
	.home-loding-div>div>p:first-child {
		background: #FFF7E7;
		border-radius: 50%;
		height: 100px;
		width: 100px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		text-align: center;
	}
	
	.home-loding-div>div>p:last-child {
		padding-top: 10px;
		font-size: 1.1rem;
	}
	
	.home-loding-div img {
		width: 40px;
		height: 40px;
		display: inline-block;
		margin: 0 auto;
	}
</style>