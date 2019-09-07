<template>
	<div>
		<Headerbtns :title="page_title" class='inform-header' ref='inform_header'>
			<div slot="left" class="back" @click="goBack">
				<i class="fa fa-angle-left" style='font-size:30px;line-height: 48px;width: 40px;text-align: center;'></i>
			</div>
			<div slot="right" class="back" @click="sheetVisible = !sheetVisible">
				<i class="fa fa-ellipsis-v" style="display: inline-block;width: 24px;line-height: 55px;text-align: center;font-size: 24px;"></i>
			</div>
		</Headerbtns>
		<div class='rule-inform-container'>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;光大永明人寿为提升承保时效，打造良好的客户体验，积极引进中国再保险公司的“寿再智保系统”，实现投保流程自动化、核保管控风险智能化。该智能核保系统的主要功能为“核保交互式问卷”，针对客户在投保时所回答的告知问题进行逐级的人机对话。客户在系统的指引下依次点击相应的答案。完成所有问题后，系统给出实时的核保结论。从而避免了只要告知问题回答为“是”则均需要进入人工核保的情况。客户体验更好，流程更为顺畅。1期上线的产品为个险渠道产品“关爱永逸2018”和“附加关爱永逸重大疾病2018”。1期上线的交互式问卷中共包含25种常见疾病及3种常见核保问题。</p>
			<p>简要操作流程如下：</p>
			<p>1、客户投保的主险是“关爱永逸2018”和“附加关爱永逸重大疾病2018”，无其他附加险，被保险人存有健康告知，例：告知第6项为是</p>
			<img :src="images1">
			<img :src="images2">
			<p>2、按照光速保界面提示，进行互动问答。</p>
			<img :src="images3">
			<img :src="images4">
			<p>3、完成互动问答</p>
			<img :src="images5">
			<p>4、检查答题结果是否与本人回答相符</p>
			<img :src="images6">
			<p>5、如果检查后发现答题过程中出现失误，造成答案与事实不符，则可将“告知”按钮修改为“否”后，重新作答。</p>
			<img :src="images7">
			<p>6、确认无误后，点击“提交健康告知结果”，经过系统判断可以核保通过的投保申请实时得到核保结论，不能通过的投保申请提示“进入人工核保”。</p>
			<img :src="images8">
		</div>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
	import { Actionsheet } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	export default {
		components:{Headerbtns},
		data() {
			return {
				page_title:"智能核保使用说明",
				images1:'static/img/policy/Intelligence/images1.png',
				images2:'static/img/policy/Intelligence/images2.png',
				images3:'static/img/policy/Intelligence/images3.png',
				images4:'static/img/policy/Intelligence/images4.png',
				images5:'static/img/policy/Intelligence/images5.png',
				images6:'static/img/policy/Intelligence/images6.png',
				images7:'static/img/policy/Intelligence/images7.png',
				images8:'static/img/policy/Intelligence/images8.png',
				sheetVisible:false,
				actions: [{
						name: "刷新页面",
						method: this.winReload
					},
					{
						name: "返回首页",
						method: this.backHome
					}
				],
			}
		},
		mounted() {
			let h = $('.v-header').outerHeight(true)
			console.log(h)
			$('.rule-inform-container').css('margin-top',h+'px')
		},
		methods: {
			goBack() {
				this.$router.push('/policy/inform/'+this.$route.params.planId)
			},
			winReload: function(cond) {
				window.location.reload();
			},
			backHome() {
				this.$router.push("/home")
			},
		}
	}
</script>

<style>
	.rule-inform-container{
		width:95%;
		margin:10px auto;
		overflow: hidden;
	}
	.rule-inform-container>p{
		font-size: 1rem;
		margin-bottom:10px;
		line-height: 25px;
	}
	.rule-inform-container>img{
		width: 100%;
	}
</style>