<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="left">
				<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
			</div>
		</Headerbtns>
		<div class="details" style="background:#F5F5F5 ;width: 100%;">
			<div style="height: 13px"></div>
			<div style="background: #fff;width: 100%;">
				<div class="info">
					<div class="flexs">
						<div class="info-left">银行账号</div>
						<div class="flexs flex">
							<input class="info-size" type="text" placeholder="请输入银行账号" v-model="bankAccNo" maxlength="20" v-support-number/>
						</div>
					</div>
				</div>
				<div class="info">
					<div class="flexs">
						<div class="info-left">银行名称</div>
						<div class="flexs flex nation">
							<p :class="bankCode=='' || bankCode==undefined ? 'grun':'black'" style="font-size: 14px;">{{bankCode==''||bankCode==undefined?'请选择':bankCode}}</p>
							<picker v-model="bankCode" defaultText="请选择银行" :items="dict.bankList" code="code" text="text" :values="bankCode"></picker>
						</div>
						<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
					</div>
				</div>
			</div>
			<!--<div class="confirm flexs flex">
				<div @click="next()" style="background: #fff;color:#FEB101">保存</div>
				<div @click="cancle()">取消</div>
			</div>-->
			<div class="footer">
				<mt-button style="width: 40%;background: #fff;color: #FEBA00;border-radius:5x;border: 1px solid #FEBA00;margin-right: 30px;margin-top: 10px;height: 44px;" @click="next()">保存</mt-button>
				<mt-button style="width: 40%;background: #FEBA00;color: white;border-radius: 5px;height: 44px;margin-top: 10px;" @click="cancle()">
					取消
				</mt-button>
			</div>
			<p><Alert ref="showalert"></Alert></p>
		</div>
	</div>
</template>
<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import Alert from '@/components/policy/common/alert'
	import bankList from '../../../../static/dict/bank_sunlife.json'
	import Picker from '../../common/Picker.vue'
	export default {
		name: 'customerInfo',
		components: {
			Headerbtns,bankList,Picker,Alert
		},
		data() {
			return {
				page_title: '银行账户信息',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				bankCode: "", //查询银行
				bankName:'',
				dict: {
					bankList: '',
				},
				infoIdMember:'',
				bankAccNo:'',
				infoId:'',
			}
		},
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height', this.media.container(this.screenHeight, 0))
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.id) {
					this.id = queryParams.id;
				}
				if(queryParams.infoIdMember) {
					this.infoIdMember = queryParams.infoIdMember;
				}
				if(queryParams.infoId) {
					this.infoId = queryParams.infoId;
				}
			}
			let arr = []
			bankList.bank.item.forEach(item => {
				let newObject = {
					code:item.code,
					text:item.text
				}
				arr.push(newObject)
			})
			this.dict.bankList = arr
			this.infomation()
		},
		watch:{
			'bankCode':function(value){
				this.dict.bankList.forEach(item => {
					if(item.code==value){
						this.bankCode=item.text
					}
				})
			},
		},
		methods: {
			left() {
				this.cancle()
			},
//			detailBack() {
//				this.go('/customer/customerInfo?systemId='+this.systemId+'&infoId='+this.infoId)
//			},
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			infomation(){
				let requ = {
						"data":{
							 "id":this.id,
        					 "requestOrder":"4"
						},
						"methodName": "customerInformation",
    					"modelName": "customerManagementService"
					}
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.ResponseCode=='0'){
							if(body.data.newCustomerOne.resultCode =='0'){
								this.bankName=body.data.bankAccount.bankName
								this.bankAccNo=body.data.bankAccount.bankAccount
								this.bankCode=body.data.bankAccount.bankCode
								this.dict.bankList.forEach(item => {
									if(item.code==this.bankCode){
										this.bankCode=item.text
									}
								})
							}
						}
					})
			},
			next(){
				let AlertText = ''
				this.dict.bankList.forEach(item => {
					if(item.text==this.bankCode){
						this.bankCode=item.code
					}
				})
				if(this.bankAccNo != '' && this.bankCode != '') {
					let msg = utils.valid.BankCodeCard(this.bankCode, this.bankAccNo)
					if(msg != undefined && msg != '') {
						AlertText = msg
					}
				}
				if(AlertText != ''){
					this.Aleart(AlertText)
				}else{
					for(let i=0;i<this.dict.bankList.length;i++){
						if(this.bankCode==this.dict.bankList[i].code){
							this.bankName=this.dict.bankList[i].text
						}
					}
					if(this.bankName=='' && this.bankAccNo=='' &&this.bankCode==''){
						this.go('/customer/customerInfo?infoIdMember='+this.infoIdMember+'&infoId='+this.infoId)
					}else{
						let requ = {
							"data":{
								"agentCode": utils.cache.get('personsal').agentCode,
								"bankName": this.bankName,//银行
								"bankAccount": this.bankAccNo,//银行账号
			                    "requestOrder": "4",
			                    "id": this.id,
			                    "infoId":this.infoIdMember,
			                    "bankCode":this.bankCode,
							},
							"methodName": "customerManagement",
		            		"modelName": "customerManagementService"
						}
						console.log(requ)
						utils.http.postFast('BusinessService', requ, (body) => {
							if(body.data.ResponseCode=='0'){
								this.go('/customer/customerInfo?infoIdMember='+this.infoIdMember+'&infoId='+this.infoId)
							}
						})
					}
					
				}
			},
			cancle(){
				this.go('/customer/customerInfo?infoIdMember='+this.infoIdMember+'&infoId='+this.infoId)
			},
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	.details {
		div,span,p {
			font-size: 16px;
		}
		.grun{
			color: #9F9F9F;
		}
		.black{
			color: #000;
		}
		.info-size{
			font-size: 14px;
		}
		.info{
			line-height: 1.1rem;
			border-bottom: 1px solid #EFEFEF;
			padding:4% 5% 4% 5%;
			.info-left{
				width: 30%;
			}
			.fa{
				width: 7px;
			}
		}
	}
	.flexs {
		display: flex;
		align-items: center;
	}
	.flex{
		flex: 1;
		justify-content: space-between;
		padding-right: 3%;
	}
	.confirm {
			/*width: 100%;*/
			background: #fff;
			padding-bottom: 20px;
			padding-top: 10px;
			div {
				width: 40%;
				margin: auto;
				color: #fff;
				background: #FEB101;
				border: 1px solid #FEB101;
				border-radius: 5px;
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}
	.footer{
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 62px;
		line-height: 50px;
		color: #fff;
		background: #fff;
	}
	::-webkit-input-placeholder { color:#9F9F9F;font-size: 14px; }
</style>
<style type="text/css">
	.nation .mbsc-control-ev{
		text-align:left !important;
	    position: absolute;
	    right: 3%;
	     min-width: 70% !important;
    	max-width: 80% !important;
	    width: 30px;
	    opacity: 0;
	}
</style>