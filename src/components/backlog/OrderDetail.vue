<template>
	<div style="background:#F5F5F5;font-size:12px">
		<Headerbtns :title="'保单详情'">
			<router-link to="/backlog" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<ul class="manage-main-contents mar-btm">
			<li>
				<div @click="expand1 = !expand1">
					<p @click="toggleContent1"><i class="fa fa-user logo-color" aria-hidden="true"></i> &nbsp;&nbsp; 投保人信息<i class="fa fa-angle-double-up rt-ft logo-color" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand1?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow1" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow1" @click="expand = !expand" class="border">
						<div class="bd-btm f-flex">
							<span>{{orderDetail.appntInfo.appntName}}</span>
							<span>{{orderDetail.appntInfo.appntSex == 2 ? '女':'男'}}</span>
							<span>{{orderDetail.appntInfo.appntBirthday}}</span>
						</div>
						<p>证件类型：{{orderDetail.appntInfo.appntIDType | Notype}}</p>
						<p>证件号码：{{orderDetail.appntInfo.appntIDNo}}</p>
						<p>职业代码：{{orderDetail.appntInfo.appntProfession}}</p>
						<p>手机号码：{{orderDetail.appntInfo.appntMobile}}</p>
					</div>
				</div>
				<div @click="expand = !expand" v-for="item in orderDetail.insuInfo">
					<p @click="toggleContent"><i class="fa fa-user logo-color" aria-hidden="true"></i> &nbsp;&nbsp;被保人信息<i class="fa fa-angle-double-up rt-ft logo-color" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow" @click="expand = !expand" class="border">
						<div class="bd-btm f-flex">
							<span>{{item.insuName}}</span>
							<span>{{item.insuSex == 2 ? '女':'男'}}</span>
							<span>{{item.insuBirthday}}</span>
						</div>
						<p>证件类型：{{item.insuIDType | Notype}}</p>
						<p>证件号码：{{item.insuIDNo}}</p>
						<p>职业代码：{{item.insuProfession}}</p>
						<p>手机号码：{{item.insuMoblie}}</p>
					</div>
				</div>
				<div @click="expand2 = !expand2">
					<p @click="toggleContent2"><i class="fa fa-file-text-o logo-color" aria-hidden="true"></i> &nbsp;&nbsp;险种信息<i class="fa fa-angle-double-up rt-ft logo-color" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand2?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow2" style="height: 5px;background: #FEB101;"></div>
					<div v-for="item in orderDetail.riskInfo" v-show="contentShow2" @click="expand = !expand" class="border">
						<p>险种名称：{{item.riskName}}</p>
						<p>交费期间：{{item.cValiDate}}</p>
						<p>保险期间：{{item.endDat}}</p>
						<p>交费频次：{{item.payIntv}}</p>
						<p>基本保险金额(元/份)：{{item.amnt|getAmnt}}</p>
						<p>险种核保决定：{{item.riskState | policyState}}</p>
						<p v-if="item.rebatePremium == '0'" :class="[(item.riskState == 1 || item.riskState == 2 || item.riskState == 'a') ? 'active':'']">保费(元)：{{item.prem}}</p>
						<p v-if="item.rebatePremium != '0'" style="color:#f00">保费(元)：{{item.rebatePremium}}</p>
					</div>
				</div>
				<div v-for="item in orderDetail.bnfInfo">
					<p><i class="fa fa-user logo-color" aria-hidden="true"></i> &nbsp;&nbsp;身故受益人：{{item.bnfNam}}</p>
				</div>
				<div @click="expand3 = !expand3">
					<p @click="toggleContent3">
						<i class="fa fa-credit-card logo-color" aria-hidden="true"></i>&nbsp;&nbsp;缴费信息
						<i class="fa fa-angle-double-up rt-ft logo-color" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand3?'rotate(180deg)':''}"></i>
					</p>
					<div v-show="!contentShow3" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow3" @click="expand = !expand" class="border" style="border-bottom:0">
						<p>缴费方式：{{orderDetail.payMode == 3 ? '银行转账':(orderDetail.payMode == 1 ? '现金':(orderDetail.payMode == 2 ? '支票':(orderDetail.payMode == 4 ? '网银':'内部转账')))}}</p>
						<p>付款银行：{{orderDetail.bankName}}</p>
						<p>户名：{{orderDetail.bankAccName}}</p>
						<p>账号：{{orderDetail.bankAccNo}}</p>
						<p>纸质合同：{{orderDetail.isPaperPrint == 'Y'?'是':'否'}}</p>
						<p style="font-weight:bold">需转账总保费金额（元）：{{orderDetail.allPrem}}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	export default {
		name: 'orderDetail',
		components: {
			Headerbtns
		},
		props: {
			open: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				orderDetail: {
					appntInfo: {},
					insuInfo: [],
					bnfInfo: [],
					riskInfo: []
				},
				contentShow: true,
				contentShow1: true,
				contentShow2: true,
				contentShow3: true,
				expand: this.open,
				expand1: this.open,
				expand2: this.open,
				expand3: this.open
			}
		},
		mounted() {
			this.policyDetail();
			var _header = $(".manage-main-contents")
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS) {
				if(screen.height == 812 && screen.width == 375) {
					_header.css({
						"bottom": "34px"
					})
				}
			}
		},
		methods: {
			// 控制列表显示 隐藏
			toggleContent() {
				this.contentShow = !this.contentShow;
			},
			toggleContent1() {
				this.contentShow1 = !this.contentShow1;
			},
			toggleContent2() {
				this.contentShow2 = !this.contentShow2;
			},
			toggleContent3() {
				this.contentShow3 = !this.contentShow3;
			},
			// 获取保单列表详情
			policyDetail() {
				let requestParam = {
					"order": {
						"agentCode": this.$route.params.agentCode,
						"applyCode": this.$route.params.applyCode,
						"policyCode": ''
					}
				}
				console.log(requestParam, '详情请求参数======')
				utils.http.postFast('MOPOLICYDETAIL', requestParam, (body) => {
					this.orderDetail = body.order;
					console.log('保单详情返回', this.orderDetail);
				})
			}
		},
		filters: {
			getAmnt(code) {
				if(code == "0" || code == "0.0" || code == "0.00") {
					return ''
				}
				return code
			},
			getIns(code) {
				if(code == '1') {
					return '一'
				} else if(code == '2') {
					return '二'
				} else if(code == '3') {
					return '三'
				} else if(code == '4') {
					return '四'
				} else if(code == '5') {
					return '五'
				} else if(code == '6') {
					return '六'
				}
			}
		}
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'static/css/backlog/page';
	.fa-angle-left{
		text-align: center;
	}
	.manage-main-contents {
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 48px;
		bottom: 0;
		overflow-y: auto;
	}
	
	.padd {
		padding: 2%;
	}
	
	li>div>p {
		font-size: 14px;
		padding: 10px 20px;
		background: #f5f5f5;
		border-top: 1px solid #E4E4E4;
		border-bottom: 1px solid #E4E4E4;
	}
	
	li>div>div {
		padding: 3px 25px;
		line-height: 25px;
	}
	
	.logo-color {
		color: #FFB101;
	}
	
	.border {
		background: #fff;
		width: 100%;
	}
	
	.bd-btm {
		border-bottom: 1px dashed #A2A2A2;
		line-height: 30px;
	}
	
	.active {
		color: #6E6E6E
	}
</style>