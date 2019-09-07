<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="left">
				<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
			</div>
		</Headerbtns>
		<div class="details" style="background: #fff;">
			<!--<div style="width: 85%;margin: auto;margin-top:10px;box-shadow:5px 5px 5px rgb(244, 244, 242,0.3),5px -5px 5px rgb(244, 244, 242,0.3),-5px 5px 5px rgb(244, 244, 242,0.3),-5px -5px 5px rgb(244, 244, 242,0.3);border-radius: 8%;border: 1px solid rgb(244, 244, 242,0.5);text-align: center;padding: 3%;line-height: 1.5rem;position: relative;">-->
			<div style="position: relative;text-align: center;">
				<img class="image" src="static/img/customerManage/back.png" alt="" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;" />
				<div style="position: relative;padding: 9% 5%;">
					<div style="position: absolute;right: 10%;top:15%;width: 13px;height: 14px;"  @click="remark()">
						<img src="static/img/customerManage/edit.png" alt="" style="width: 100%;height: 100%;"/>
					</div>
					<div v-if="headPortrait!=''">
						<img :src=headPortrait alt="" ref='img1' style="width: 55px;height: 55px;border: 1px solid #fff;border-radius: 55px;" @click="handleShow(1)" />
					</div>
					<div v-if="headPortrait==''">
						<img  :src="imgUrl" alt="" ref='img1' style="width: 55px;height: 55px;border: 1px solid #fff;border-radius: 55px;" @click="handleShow(1)" />
						<!-- <img v-if="user.sex == '2'" src="static/img/settlement/nv.png" alt="" ref='img1' style="width: 55px;height: 55px;border: 1px solid #fff;border-radius: 55px;" @click="handleShow(1)" />
						<img v-if="user.sex == undefined || user.sex == ''" src="static/img/settlement/sex.png" alt="" style="width: 55px;height: 55px;border: 1px solid #fff;border-radius: 55px;" @click="handleShow(1)" /> -->
					</div>
					<div style="margin-top: 6px;">
						<span style="font-size: 18px;font-family: PingFangSC-Regular;font-weight: bold;color: rgb(51, 51, 51);margin-left: 15px;">{{user.name}}</span><span style="font-size: 16px;font-family: PingFangSC-Regular;font-weight: bold;color: rgba(51,51,51,1);margin-left: 15px;">{{user.mobilePhone}}</span>
					</div>
					<div style="color: #7F7F7F;">
						<div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;height: 15px;line-height: 15px;margin-top: 6px;">
							{{user.pfhtml}}
						</div>
					</div>
					<div class="flexs flex" style="padding: 3%;margin-left: 4%;margin-top: 10px;">
						<div @click="message()" style="width: 50%;margin-left: 20px;margin-right: 20px;">
							<div>
								<img src="static/img/customerManage/message.png" alt="" style="width: 26px;height: 19px;text-align: center;" />
							</div>
							<div style="color: #AEAEAE;margin-top: 10px;">
								短信
							</div>
						</div>
						<div @click="next()" style="width: 50%;margin-left: 20px;margin-right: 20px;">
							<div>
								<img src="static/img/customerManage/phone.png" alt="" style="width: 25px;height: 23px;text-align: center;" />
							</div>
							<div style="color: #AEAEAE;margin-top: 10px;">
								拨号
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="position: relative;text-align: center;margin-top: -10px;">
				<img class="image" src="static/img/customerManage/back.png" alt="" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;height: 138px;" />
				<div style="position: relative;padding: 4% 5%;">
					<div style="border-bottom: 1px solid #F6F6F6;height: 54px;" class="flexs" @click="info()">
						<div class="info-left img">
							<img src="static/img/customerManage/info.png" alt="" />
						</div>
						<div class="flexs flex">
							<div style="font-size: 16px;">基本信息</div>
							<i class="fa fa-angle-right" style="color: #CDCDCD;font-size: x-large !important;"></i>
						</div>
					</div>
					<div style="height: 54px;" class="flexs" @click="poliy()">
						<div class="info-left img">
							<img src="static/img/customerManage/policy.png" alt="" />
						</div>
						<div class="flexs flex">
							<div style="font-size: 16px;">保单信息</div>
							<i class="fa fa-angle-right" style="color: #CDCDCD;font-size: x-large !important;"></i>
						</div>
					</div>
					<!-- <div style="height: 54px;" class="flexs" @click="proposal()">
						<div class="info-left img">
							<img src="static/img/customerManage/book.png" alt="" />
						</div>
						<div class="flexs flex">
							<div style="font-size: 16px;">建议书</div>
							<i class="fa fa-angle-right" style="color: #CDCDCD;font-size: x-large !important;"></i>
						</div>
					</div> -->
				</div>
			</div>
		</div>
		<div v-show="show" style="border:1px solid #eee;">
			<div style="width:100%; height:100%;position:fixed; top :0px;background-color:rgba(0,0,0,0.1);text-align:center;z-index:22222;" @click="vvv()"></div>
	        <div style="position:absolute; bottom :0;right:0;z-index:33333;width:100%;background:#fff">
	        	<button class="photo" @click="getUrls()">从相册选择</button>
				<hr>
				<button class="photo" @click="capturePhoto()">拍照</button>
	        </div>
		</div>
		<div v-show="active">
			<div style="width:100%; height:100%;position:fixed; top :0px;background-color:rgba(0,0,0,0.1);text-align:center;z-index:22222;" @click="www()">
			</div>
			<div style="position:absolute; bottom :0;right:0;z-index:33333;width:100%;background:#fff">
				<div class="flex flexs" style="border-bottom: 1px solid #ccc;margin-right: 0;line-height: 1.5rem;padding: 3% 4%;">
					<div style="color:#666;font-size: 16px;">{{user.mobilePhone}}</div>
					<div style="width: 18px;height: 18px;" @click="next()">
						<img src="static/img/customerManage/phone.png" alt="" style="width: 100%;height: 100%;" />
					</div>
				</div>
				<div style="text-align: center;color: #FDB92C;padding: 3% 3%;line-height: 1.5rem;font-size:16px" @click="cancle()">
					取消
				</div>
			</div>
		</div>
		<!--备注-->
		<mt-popup v-model="popupVisible" modal=false style="width: 80%;border-radius: 5px;">
			<textarea placeholder="请输入对该客户的描述..." style="width: 92%;height: 100px;background: #F5F5F5;border:none;font-size: 0.9rem;color: #000;margin:4% 0 0 4%;padding: 2% 0;" ref=val v-model="user.profession"></textarea>
			<div style="color: #FDB92C;line-height: 1.5rem;font-size:16px;width:50%;float:left;text-align: center;line-height:38px;cursor: pointer;" @click="saveShare()" >保存</div>
			<div style="color: #FDB92C;line-height: 1.5rem;font-size:16px;width:50%;float:right;text-align: center;line-height:38px;cursor: pointer;"  @click="hiddenShare()">取消</div>
		</mt-popup>
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
				page_title: '客户详情',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				infoId: '',
				user: {
					name: '',
					profession: '',
					pfhtml:'',
					mobilePhone: '',
				},
				imgUrl:"",
				show: false,
				active: false,
				popupVisible:false,
				hxkuang:'',
				num: '',
				systemId: '',
				headPortrait: '',
				prosess:'',
			}
		},
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height', this.media.container(this.screenHeight, 0))
			$('.image').css('width', this.screenWidth)
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.infoId) {
					this.infoId = queryParams.infoId;
				}
				if(queryParams.profession) {
					console.log(this.user.profession )
					this.user.profession = queryParams.profession;
				}
				if(queryParams.prosess) {
					this.prosess = queryParams.prosess
				}
			}
			this.infomation()
		},
		methods: {
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/customer/customerManage')
			},
			//备注弹框
			remark(){
				this.popupVisible = true;
			},
			saveShare(){
				this.popupVisible = false;
				this.user.pfhtml = this.user.profession;
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
			hiddenShare(){
				this.popupVisible = false;
			},
			phone() {
				this.active = true
			},
			next() {
				utils.native.callPhone(this.user.mobilePhone, (body) => {
					console.log(body)
				}, (err) => {
					console.log(err)
				})
			},
			cancle() {
				this.active = false
			},
			www() {
				this.active = false
			},
			vvv() {
				this.show = false
			},
			message() {
				utils.native.sendSms(this.user.mobilePhone, "今天天气不错", (body) => {
					console.log(body)
				}, (err) => {
					console.log(err)
				})
			},
			weixin() {
				utils.native.openWeChar((body) => {
					console.log(body)
				}, (err) => {
					console.log(err)
				})
			},
			handleShow(index) {
				this.num = index
				this.show = true;
			},
			/*从相册选择*/
			getUrls() {
				this.show = false;
				try {
					getNewPhoto(
						pictureSource.SAVEDPHOTOALBUM,
						imageData => {
							this.addAppImageAndUpload(this.num, imageData);
						},
						message => {
							Indicator.close(); // alert(message)
						});
				} catch(err) {
					Indicator.close();
				}
			},
			/*照相*/
			capturePhoto() {
				this.show = false;
				try {
					capturePhotoCallback(
						imageData => {
							this.addAppImageAndUpload(this.num, imageData);
						},
						message => {
							//							alert(2)
						})
				} catch(err) {
					//					alert(3)
				}
			},
			/*转base64*/
			addAppImageAndUpload(index, imageUrl) {
				//				alert(imageUrl)
				if(index == '1') {
					let imageByte = "data:image/jpeg;base64," + imageUrl;
					let requ = {
						"data": {
							"imageByte": imageUrl,
							"imageName": '22',
							"infoId": this.infoId,
							"suffix": '.jpg'
						},
						"methodName": "ListHeadImgUpload",
						"modelName": "customerManagementListQueryService"
					}
					console.log(JSON.stringify(requ))
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.ResponseCode == '0') {
							if(body.data.newCustomerOne.resultCode == '0') {
								this.$refs.img1.src = imageByte
							}
						}
					})
				}
			},
			infomation() {
				if(this.user.profession=='undefined'){
					this.user.profession=''
				}
				let requ = {
					"data": {
						"infoId": this.infoId,
						"description": this.user.profession,
						"staue":'1'
					},
					"methodName": "customerListDetails",
					"modelName": "customerManagementListQueryService"
				}
				console.log(JSON.stringify(requ))
				utils.http.postFast('BusinessService', requ, (body) => {
					if(body.data.newCustomerOne.resultCode == '0') {
						this.user.name = body.data.details.name
						this.user.profession = body.data.details.description
						this.user.mobilePhone = body.data.details.mobilePhone
						this.user.pfhtml = body.data.details.description
						this.user.sex = body.data.details.sex
						if(this.user.sex=="1"){
							this.imgUrl = "static/img/settlement/nan.png"
						}else if(this.user.sex=="2"){
							this.imgUrl = "static/img/settlement/nv.png"
						}else{
							this.imgUrl = "static/img/settlement/sex.png"
						}
						this.systemId = body.data.details.systemId
						if(body.data.details.fileurl!=undefined&&body.data.details.fileurl!=""){
							this.headPortrait = body.data.details.fileurl
						}
					}else{
						this.Aleart(body.data.newCustomerOne.resultMessage)
					}
				})
			},
			info() {
				this.go('/customer/customerList?infoId=' + this.infoId + '&systemId=' + this.systemId)
			},
			poliy() {
				this.go('/backlog?infoId=' + this.infoId + '&where=1')
			},
			proposal(){
				this.go('/proposal/list?infoId=' + this.infoId + '&where=1')
			}
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	.details {
		div,
		span,
		p {
			font-size: 14px;
		}
		.info-left {
			width: 10%;
		}
		.img {
			img {
				width: 14px;
				height: 14px;
			}
		}
		.footer {
			text-align: center;
			position: fixed;
			left: 0;
			bottom: 0;
			/*background: #F4A200;*/
			width: 100%;
			height: 43px;
			line-height: 50px;
			/*color: #fff;*/
			border: 0;
		}
	}
	.photo {
		display: block;
		width: 100%;
		line-height: 45px;
		border: 0;
		background: #fff;
		font-size: 14px;
	}
	.flexs {
		display: flex;
		align-items: center;
	}
	
	.flex {
		flex: 1;
		justify-content: space-between;
		margin-right: 3%;
	}
	input,button,select,textarea{outline:none}
    textarea{resize:none;outline:none}
</style>