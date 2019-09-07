<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="left">
				<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
			</div>
		</Headerbtns>
		<div class="details" style="background: #F4F4F4;">
			<div style="height: 13px;"></div>
			<div>
				<div class="info" v-for="(item,index) in familyListList" style="background: #fff;">
					<div class="cerinfo">
						<div class="flexs">
							<div>{{item.name}}</div>
							<div style="margin-left: 3%;background: #EFEFEF;border-radius: 20px;padding: 0 2%;color: #999;font-size: 12px;height: 18px;line-height: 18px;">{{item.emergencyContactRelation | ralationCustomerFilter}}</div>
						</div>
						<div class="flexs flex" style="color: #999;">
							<div style="width: 85%;">
								<span style="font-size: 12px;">证件号码</span>
								<span style="font-size: 12px;">{{item.certificateNo}}</span>
							</div>
							<div style="width: 14px;height: 14px;" @click="goToDetail(item,item.infoId)">
								<img src="static/img/customerManage/write.png" alt="" style="width: 100%;height: 100%;"/>
							</div>
							<div style="width: 14px;height: 14px;" v-if="item.emergencyContactRelation != '本人'" @click="del(item,item.infoId,index)">
								<img src="static/img/customerManage/del.png" alt="" style="width: 100%;height: 100%;"/>
							</div>
						</div>
					</div>
					<div style="height: 8px;background: #F4F4F4;"></div>
				</div>
				<div class="confirm flexs flex" @click="addmember()">
					<div style="width: 12px;height: 12px;margin-right: 10px;margin-bottom: 3px;">
						<img src="static/img/customerManage/add.png" alt="" style="width: 100%;height: 100%;"/>
					</div>
					<div style="font-size: 14px;">
						新增家庭成员
					</div>
				</div>
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
				page_title: '家庭成员',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				infoId:'',
				familyListList:'',
				itemIndex:'',
				infoIdMember:'',
				delInfoId:'',
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
			}
			this.infomation()
		},
		methods: {
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/customer/detail?infoId='+this.infoId)
			},
			infomation(){
				let requ = {
						"data":{
							 "infoId":this.infoId,
						},
						"methodName": "customerFamilyList",
    					"modelName": "customerManagementService"
					}
				console.log(JSON.stringify(requ))
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.ResponseCode=='0'){
							this.familyListList=body.data.familyListList
						}
					})
			},
			del(item,infoId,index){
				this.delInfoId = infoId
				this.itemIndex = index
				alert_n22.confirm('提示', '只删除关系不对客户本身做操作，确定要删除？', '确定','取消', (flag) => {
					this.yes()
				})
			},
			yes(){
				let requ = {
						"data":{
							 "infoId":this.delInfoId,
						},
						"methodName": "customerInformationDeletion",
    					"modelName": "customerManagementService"
					}
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode =='0'){
							console.log(this.familyListList)
							console.log(this.itemIndex)
							this.familyListList.splice(this.itemIndex, 1)
							console.log(this.familyListList)
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
					})
			},
			goToDetail(item,info){
				this.infoIdMember=info
				this.go('/customer/customerInfo?infoIdMember='+this.infoIdMember+'&infoId='+this.infoId+'&edit=1')
			},
			addmember(){
				this.go('/customer/customerAddPerson?infoId='+this.infoId)
			},
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	.details {
		div,span,p {
			font-size: 16px;
		}
		.info{
			line-height: 1.1rem;
			.cerinfo{
				width: 92%;
				margin: auto;
				line-height: 1.5rem;
				padding: 2% 0;
			}
		}
		.confirm {
			width: 100%;
			background: #fff;
			padding-bottom: 15px;
			padding-top: 15px;
			justify-content: center !important;
			align-items: center;
			div {
				color: #FEB101;
			}
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
</style>