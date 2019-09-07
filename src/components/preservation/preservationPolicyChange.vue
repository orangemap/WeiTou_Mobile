<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="details">
			<div>
				<div class="insurentInformation">
					<span>
						被保人信息
					</span>
				</div>
				<div style="border: 1px solid #A9A9A9;"></div>
				<div class="insurentContent">
					<div class="info cerinfo">
						<div>
							<span style="margin-right: 10%;">二爷</span>
							<span style="margin-right: 10%;">男</span>
							<span >1990-09-23</span>
						</div>
						<div>
							<span>证件类型：身份证</span>
						</div>
						<div>
							<span>证件号码：111111111111111111</span>
						</div>
						<div>
							<span>证件有效期：2019-10-09</span>
						</div>
						<div style="margin-bottom: 10px;">
							<span>证件有效止期：2020-9-10</span>
						</div>
					</div>
					<div class="info delInfo">
						<div>
							<!--<ul>
								<li class="flex">
									<div>
										证件号码：
									</div>
									<div>
										<input type="text" placeholder="请输入" />
									</div>
								</li>
							</ul>-->
							<span>证件号码：</span>
							<span></span>
						</div>
					</div>
					<div class="info delInfo">
						<div>
							<span>证件有效起期：</span>
							<span></span>
						</div>
					</div>
					<div class="info delInfo">
						<div>
							<span>证件有效止期：</span>
							<span></span>
						</div>
					</div>
					<div class="info cerNo">
						<div class="imgInfo">
							<span>
								<img src="../../../static/img/preservation/cerLast.png" alt="" style="width: 47%;margin-right: 4%;"/>
							</span>
							<span>
								<img src="../../../static/img/preservation/cerFirst.png" alt="" style="width: 47%;"/>
							</span>
						</div>
						<div class="policy">
							<span>保单批注函</span>
						</div>
					</div>
					<div class="info cerNo">
						<div class="poicy">
							<span>电子邮箱</span>
						</div>
					</div>
				</div>
				<div class="foot">
					<div>
						请关注“光大永明人寿”官方微信账号下载批注函！
					</div>
					<div>
						请在保全完成后，在保全工单查询中下载批注函！
					</div>
				</div>
				<div class="confirm">
					<div>
						确认提交
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	export default {
		name: 'preservationPolicySearch',
		components: {
			Headerbtns,
		},
		data() {
			return {
				page_title: '证件有效期变更',
			}
		},
		mounted() {
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media($('.details'))
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
//			left() {
//				this.detailBack()
//			},
//			detailBack() {
//				this.go('/preservation/preservationPolicySearch')
//			},
			
		},
	}
</script>

<style lang="scss" scoped type="text/css">
	.fa {
		color: #FEB101;
	}
	
	.fa-angle-left {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	.details{
		font-size: 0.8rem;
	}
	.insurentInformation{
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #F8F8F8;
		text-align: left;
		color: #FEB101;
		padding: 0.2rem 0;
		span{
			margin-left: 3%;
			font-size: 0.85rem;
			
		}
	}
	.insurentContent{
		margin-bottom: 15px;
		.info{
			border-bottom: 1px dashed #BBB;
		}
		.cerinfo{
			margin-top: 15px;
			div{
				width: 95%;
				margin: auto;
				height: 20px;
				line-height: 20px;
				padding: 0px 10px;
			}
		} 
		.delInfo div{
			width: 95%;
			margin: auto;
			height: 34px;
			line-height: 34px;
			padding: 5px 0;
		}
		.cerNo{
			width: 95%;
			margin: auto;
			padding: 15px 0;
			.policy{
				margin-top: 15px;
			}
		}
		
	}
	.foot{
		color: #FEB101;
		width: 95%;
		margin: auto;
		div{
			height: 20px;
			line-height: 20px;
		}
	}
	.confirm{
		width: 95%;
		margin: auto;
		div{
			width: 30%;
			margin: auto;
			color: #fff;
			background: #FEB101;
			border: 1px solid #FEB101;
			border-radius: 5px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			margin-bottom: 20px;
			margin-top: 20px;
		}
	}
	.flex{
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	.details::-webkit-scrollbar {
	display:none
}
</style>