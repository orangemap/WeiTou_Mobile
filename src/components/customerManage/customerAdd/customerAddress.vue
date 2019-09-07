<template>
	<div>
		<SelectArea v-show="SelectAreaValue.isOpen" @selectadress="selectActions" v-model="SelectAreaValue" @cancel="cancels"></SelectArea>
		<div v-show="contentIsOpen">
			<Headerbtns :title="page_title">
				<div slot="left" class="back" @click="left">
					<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
				</div>
			</Headerbtns>
			<div class="details" style="background:#F5F5F5 ;width: 100%;">
				<div style="height: 13px"></div>
				<div style="background: #fff;width: 100%;">
					<div class="info">
						<div class="flexs" >
							<div class="info-left">联系地址</div>
							<div @click="selectAdress()" class="flexs flex">
								<div>
									<p v-show="!user.appnt.province&&!user.appnt.city" style="color: #9E9E9E;text-align:right;" class="text-hide info-size">
										请选择联系地址
									</p>
									<p v-show="user.appnt.province&&user.appnt.city&&user.appnt.county != null" style="text-align:right;" class="text-hide info-size">
										{{user.appnt.province|getProvinceText}}{{user.appnt.city|getCityText}}{{user.appnt.county}}
									</p>
								</div>
								<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
							</div>
						</div>
					</div>
					<div class="info">
						<div class="flexs">
							<div class="info-left">镇/街道</div>
							<input class="info-size" type="text" placeholder="请输入镇/街道" v-model="user.appnt.street"/>
						</div>
					</div>
					<div class="info">
						<div class="flexs">
							<div class="info-left">村/社区</div>
							<input class="info-size" type="text" placeholder="请输入村/社区" v-model="user.appnt.community"/>
						</div>
					</div>
					<div class="info">
						<div class="flexs">
							<div class="info-left">详细地址</div>
							<input class="info-size" type="text" placeholder="请输入详细地址" v-model="user.appnt.postalAddress"/>
						</div>
					</div>
					<div class="info">
						<div class="flexs">
							<div class="info-left">邮政编码</div>
							<input class="info-size" type="text" placeholder="请输入邮政编码" v-model="user.appnt.zipCode" v-support-number maxlength="6"/>
						</div>
					</div>
					<div class="info">
						<div class="flexs">
							<div class="info-left">电子邮箱</div>
							<div class="flexs flex">
								<input class="info-size" type="text" placeholder="请输入电子邮箱" v-model="user.appnt.email"/>
							</div>
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
	</div>
</template>
<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import SelectArea from '../../policy/common/SelectArea.vue'
	import Alert from '@/components/policy/common/alert'
	import provinceList from '../../../../static/dict/province_sunlife.json'
	import cityList from '../../../../static/dict/city_sunlife.json'
	export default {
		name: 'customerInfo',
		components: {
			Headerbtns,SelectArea,Alert
		},
		data() {
			return {
				page_title: '客户联系地址',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				SelectAreaValue: {
					isOpen: false,
					areaItem: ''
				},
				user:{
					appnt:{
						province:'',
						provinceDesc:'',
						city:'',
						cityDesc:'',
						county:'',
						street:'',//街道
						community:'',//社区
						postalAddress:'',//详细地址
						zipCode:'',//邮政编码
						email:'',//邮箱
					}
				},
				id:'',
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
				if(queryParams.infoId) {
					this.infoId = queryParams.infoId;
				}
			}
			this.infomation()
		},
		filters:{
			getProvinceText(code) {
				for(let item of provinceList.province.item) {
					if(item.code == code) {
						return item.text
					}
				}
			},
			getCityText(code) {
				for(let item of cityList.city.item) {
					if(item.code == code) {
						return item.text
					}
				}
			},
		},
		computed: {
			contentIsOpen() {
				if(this.SelectAreaValue.isOpen) {
					return false
				} else {
					return true
				}
			},
		},
		methods: {
			left() {
				this.cancle()
			},
//			detailBack() {
//				this.go('/customer/customerInfoAll?systemId='+this.systemId+'&infoId='+this.infoId)
//			},
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			selectAdress() {
				this.SelectAreaValue.isOpen = true
				this.SelectAreaValue.areaItem = ''
				//console.log('选择地址前', this.SelectAreaValue)
			},
			selectActions() {
				this.SelectAreaValue.isOpen = false
				//console.log('选择地址后', this.SelectAreaValue)
				this.user.appnt.province = this.SelectAreaValue.areaItem.provinceCode
				this.user.appnt.provinceDesc = this.SelectAreaValue.areaItem.provinceDesc
				this.user.appnt.city = this.SelectAreaValue.areaItem.cityCode
				this.user.appnt.cityDesc = this.SelectAreaValue.areaItem.cityDesc
				this.user.appnt.county = this.SelectAreaValue.areaItem.county
			},
			cancels() {
				this.SelectAreaValue.isOpen = false
				this.SelectAreaValue.areaItem = ''
			},
			//获取省份
			getProvince(code){
				if(code != undefined && code != ""){
			    if (provinceList != undefined && provinceList !="") {
			     for (var i = 0; i < provinceList.province.item.length; i++) {
			          if(provinceList.province.item[i].code == code){
			            return provinceList.province.item[i].text
			          }
			      }
			      return ""
			    }
			  }
			},
			//获取市区
			getCity(code){
				if(code != undefined && code != ""){
			    if (cityList != undefined && cityList !="") {
			     for (var i = 0; i < cityList.city.item.length; i++) {
			          if(cityList.city.item[i].code == code){
			            return cityList.city.item[i].text
			          }
			     }
			    }
			  }
			},
			infomation(){
				let requ = {
						"data":{
        					  "requestOrder":"3",
        					  "id":this.id,
						},
						"methodName": "customerInformation",
    					"modelName": "customerManagementService"
					}
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode =='0'){
							this.user.appnt.province=body.data.contactAddress.province
							this.user.appnt.city=body.data.contactAddress.city
							this.user.appnt.county=body.data.contactAddress.county
							this.user.appnt.street=body.data.contactAddress.town
							this.user.appnt.community=body.data.contactAddress.village
							this.user.appnt.postalAddress=body.data.contactAddress.address
							this.user.appnt.zipCode=body.data.contactAddress.zipNo
							this.user.appnt.email=body.data.contactAddress.email
						}
					})
			},
			next(){
				let AlertText = ''
				if(this.user.appnt.zipCode != ''){
					if((!/^[0-9]{6}$/.test(this.user.appnt.zipCode))){
						AlertText = '邮编输入错误。'
					}
				}
				if(this.user.appnt.email != '') {
						let msg = utils.valid.email(this.user.appnt.email)
						if(msg != undefined && msg != '') {
							AlertText = msg
						}
					}
				let str1=this.user.appnt.postalAddress+this.user.appnt.community+this.user.appnt.street
					let min=parseInt(str1.length)
					let province
					let city
					if(this.user.appnt.province!=''){
						province=this.getProvince(this.user.appnt.province)
						console.log(province)
					}else if(this.user.appnt.province==''||this.user.appnt.province==undefined||this.user.appnt.province=='undefined'){
						province=""
					}
					if(this.user.appnt.city!=''){
						city=this.getCity(this.user.appnt.city)
					}else if(this.user.appnt.city==''||this.user.appnt.city==undefined||this.user.appnt.city=='undefined'){
						city=""
					}
					if(this.user.appnt.county==''||this.user.appnt.county==undefined||this.user.appnt.county=='undefined'){
						this.user.appnt.county=""
					}
					let str2=str1//+province+city+this.user.appnt.county
					let max=parseInt(str2.length)
					console.log(min)
					console.log(max)
					if(min<10&&min>0){
						AlertText = '村/社区+镇/街道+详细地址长度不可小于10个字符。'
					}else if(max>30){
						AlertText = '村/社区+镇/街道+详细地址长度不可大于30个字符。'
					}else if(min==0||max==0){
						this.go('/customer/customerInfo?infoId='+this.infoId+'&infoIdMember='+this.infoIdMember)
					}
				if(AlertText != ''){
					this.Aleart(AlertText)
				}else{
					if(this.user.appnt.postalAddress =='' && this.user.appnt.province =='' && this.user.appnt.city =='' && this.user.appnt.county =='' && this.user.appnt.street =='' && this.user.appnt.community=='' && this.user.appnt.email =='' && this.user.appnt.zipCode==''){
						this.go('/customer/customerInfoAll?infoId='+this.infoId)
					}else{
						let requ = {
							"data":{
								"agentCode": utils.cache.get('personsal').agentCode,
								"address": this.user.appnt.postalAddress,//详细地址
			                    "province": this.user.appnt.province,//省
			                    "city": this.user.appnt.city,//市
			                    "county": this.user.appnt.county,//县
			                    "town": this.user.appnt.street,//镇
			                    "village": this.user.appnt.community,//村
			                    "email": this.user.appnt.email,//邮箱
			                    "zipNo": this.user.appnt.zipCode,//邮政编码
			                    "requestOrder": "3",
			                    "id":this.id,
			                    "infoId":this.infoId,
							},
							"methodName": "customerManagement",
	                		"modelName": "customerManagementService"
						}
					console.log(JSON.stringify(requ))
						utils.http.postFast('BusinessService', requ, (body) => {
							if(body.data.newCustomerOne.resultCode=='0'){
								this.go('/customer/customerInfoAll?infoId='+this.infoId)
							}else{
								this.Aleart(body.data.newCustomerOne.resultMessage)
							}
						})
					}
					
				}
			},
			cancle(){
				this.go('/customer/customerInfoAll?infoId='+this.infoId)
			},
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	.details {
		div,span,p {
			font-size: 16px;
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
		.text-hide {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.flexs {
			display: flex;
			align-items: center;
		}
		.flex{
			flex: 1;
			justify-content: space-between;
			/*padding-right: 3%;*/
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
	}
	::-webkit-input-placeholder { color:#9F9F9F;font-size: 14px; }
</style>