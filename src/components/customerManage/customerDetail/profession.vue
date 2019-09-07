<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="left">
				<i class="fa fa-angle-left" style="color: #FDB92C!important;margin-left: 5px;"></i>
			</div>
			<div slot="right" class="server" @click="save()">
				保存
			</div>
		</Headerbtns>
		<div class="details">
			<div style="background: #F5F5F5;width: 100%;text-align: center;">
				<textarea placeholder="请输入对该客户的描述..." style="width: 90%;height: 100px;background: #F5F5F5;border:none;font-size: 0.9rem;color: #000;margin: auto;padding: 2% 0;" v-model="user.profession"></textarea>
			</div>
		</div>
	</div>
</template>
<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	export default {
		name: 'customerInfo',
		components: {
			Headerbtns,
		},
		data() {
			return {
				page_title: '备注',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				infoId:'',
				user:{
					name:'',
					profession:'',
				},
			}
		},
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height', this.media.container(this.screenHeight, 0))
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.infoId) {
					this.infoId = queryParams.infoId;
				}
				if(queryParams.profession) {
					this.user.profession = queryParams.profession;
				}
			}
		},
		methods: {
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/customer/detail?infoId='+this.infoId)
			},
			goTo(){
				this.go('/customer/profession?infoId='+this.infoId)
			},
			save(){
				let requ = {
					"data":{
						 "infoId": this.infoId,
        				 "description": this.user.profession
					},
					"methodName": "customerListDetails",
					"modelName": "customerManagementListQueryService"
				}
				console.log(JSON.stringify(requ))
				utils.http.postFast('BusinessService', requ, (body) => {
					if(body.data.ResponseCode=='0'){
						this.user.profession=body.data.details.description
						console.log(this.user.profession)
						this.go('/customer/detail?infoId='+this.infoId+'&profession='+this.user.profession)
					}
				})
			},
			poliy(){
				this.go('/backlog?infoId='+this.infoId)
			},
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	.details {
		div,span,p {
			font-size: 0.85rem;
		}
		.flexs {
			display: flex;
			align-items: center;
		}
		.flex{
			flex: 1;
			justify-content: space-between;
			margin-right: 3%;
		}
	}
	
.server{
	position: absolute;
	width: 60px;
    right: -3px;
    line-height: 0rem;
    font-size: 0.85rem;
    color: #FEB101;
    font-weight: bold;
}
</style>