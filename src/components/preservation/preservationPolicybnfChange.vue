<template>
	<div>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue" @click=""></IDCardScanning>
		<div v-show="!cardScanningValue.isopen">
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="left">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="details">
			<div>
				<div class="insurentInformation">
					<span>
						受益人信息
					</span>
				</div>
				<div style="border: 1px solid #A9A9A9;"></div>
				<div class="insurentContent">
					<div class="info cerinfo">
						<div>
							<span style="margin-right: 10%;">{{bnf.bnfName}}</span>
							<span style="margin-right: 10%;">{{bnf.bnfSex == "0"?"男":"女"}}</span>
							<!--<span>{{}}</span>-->
						</div>
						<div>
							<span>证件类型：{{idTypeText(bnf.bnfIDType)}}</span>
						</div>
						<div>
							<span>证件号码：{{bnf.bnfIDNo}}</span>
						</div>
						<div>
							<span>证件有效起期：{{bnf.iDStartDate}}</span>
						</div>
						<div style="margin-bottom: 10px;">
							<span>证件有效止期：{{bnf.iDExpDate}}</span>
						</div>
					</div>
					<div class="info delInfo">
						<div class="flex">
							<div class="left">证件号码：</div>
							<div class="right">
								<!--<input type="text" placeholder="请输入" style="text-align: end;" v-model="holder.cerCard" maxlength="18"/>-->
								<p disabled="disabled">{{holder.cerCard}}</p>
             					 <img src="../../../static/img/preservation/camera.png" alt="" style="width: 25px;height: 21px;vertical-align: middle;padding-left: 4px;" @click="cardScanning()">
							</div>
						</div>
					</div>
					<div class="info delInfo">
						<div class="flex">
							<div class="left">证件有效起期：</div>
							<div class="right">
								<!--<date-picker  v-model="holder.startDate" placeholder="请选择" style="font-size: 1.2rem;" :values="holder.startDate"></date-picker>-->
								<p disabled="disabled">{{holder.startDate}}</p>
							</div>
						</div>
					</div>
					<div class="info delInfo">
						<div class="flex">
								<p style="">证件有效止期：</p>
								<!--<p style="height: 39px;line-height: 39px;">
									<input class="checkbox" v-model="ischecked" type="checkbox" style="" />
									<span>长期有效</span>
								</p>
								<date-picker v-show="!ischecked" v-model="holder.endDate" placeholder="请选择" style="font-size: 1.2rem;display:inline-block;text-align:right;float: right;" :values="holder.endDate"></date-picker>-->
								<p disabled="disabled">{{holder.endDate}}</p>
							</div>
					</div>
					<div class="info cerNo">
							<div class="imgInfo">
								<span>
									<img :src="holder.frontImg==''?front:holder.frontImg" alt="" style="width: 47%;margin-right: 4%;height: 100px;" ref='img1'/>
								</span>
								<span>
									<img :src="holder.backImg==''?back:holder.backImg" alt="" style="width: 47%;height: 100px;" ref='img2'/>
								</span>
							</div>
							<!--<div class="imgInfo">
								<span>
									<img :src="holder.frontImg==''?front:holder.frontImg" alt="" style="width: 47%;margin-right: 4%;height: 100px;" @click="handleShow(1)" ref='img1'/>
								</span>
								<span>
									<img :src="holder.backImg==''?back:holder.backImg" alt="" style="width: 47%;height: 100px;" @click="handleShow(2)" ref='img2'/>
								</span>
							</div>-->
							<!--<mt-popup position="center" class="phone_valid popup" v-model="show"
				style="width:70%;border:1px solid #eee;position: fixed;
	            background: #fff;top:80%;left: 50%;">
				<button class="photo" @click="getUrls()">从相册选择</button>
				<hr>
				<button class="photo" @click="capturePhoto()">拍照</button>
				</mt-popup>-->
							<div class="flex" style="padding-top: 3%;">
								<div>
									保单批注函
								</div>
								<label class="right">
									<picker v-model="notationCulvert" defaultText="请选择" :items="notationCulvertList" code="code" text="text" :values="notationCulvert" @click="nation()"></picker>
					              <i class="fa fa-angle-down"></i>
					            </label>
							</div>
						</div>
					<div class="info cerNo" v-show="emails">
							<div class="flex">
								<div>电子邮箱</div>
								<div class="right">
									<input type="text" placeholder='请输入' style='text-align:right' v-model="holder.email"/>
								</div>
							</div>
						</div>
				</div>
				<div class="foot">
						<div v-show="WX" style="color: red;">
							请关注“光大永明人寿”官方微信账号下载批注函！
						</div>
						<div v-show="down" style="color: red;">
							请在保全完成后，在保全工单查询中下载批注函！
						</div>
					</div>
				<div class="confirm">
					<div @click="confirm">
						确认提交
					</div>
				</div>
				<p><Alert ref="showalert"></Alert></p>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	import { Indicator } from 'mint-ui';
	import datePicker from '@/components/common/DatePicker.vue'
	import picker from '@/components/common/Picker.vue'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/preservation/index.js'
	import Alert from '@/components/policy/common/alert'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
	const fillZero = value => {
		if(('' + value).length == 1) {
			value = '0' + value
		}
		return value
	}
	export default {
		name: 'preservationPolicyHolderChange',
		components: {
			Headerbtns,datePicker,Indicator,picker,Alert,IDCardScanning
		},
		data() {
			return {
				page_title: '证件有效期变更',
				holderDate:'请输入',
				AccidentData:'请输入',
				notationCulvert:'',
				notationCulvertList: ['微信信函','电子邮件','代理人下载发送'], //批注涵列表
				cerCard:'',
				show: false,
				img:'',
				num:0,
				nums:'',
				holder:{
					cerCard:'',
					startDate:'',
					endDate:'',
					email:'请输入',
					frontImg:'',
					backImg:'',
				},
				fronted:'',
				backed:'',
				code:'',
				emails:false,
				WX:false,
				down:false,
				cardScanningValue:{
					isopen: false,
					type: '',
					cusItem: {}
				},
				bnf:'',
				bnfId:'',
				bb:'2',
				id:'',
				back:'static/img/preservation/cerFirst.png',
				front:'static/img/preservation/cerLast.png',
				age:'',
				appntIsCheckeds: false,
				ischecked:false,
				idTypeList:[
					{code:'11',text:'身份证'},
					{code:'12',text:'户口本'},
					{code:'17',text:'中国护照'},
					{code:'24',text:'外国护照'},
					{code:'23',text:'台胞证'},
					{code:'26',text:'港澳通行证'},
					{code:'20',text:'出生证'},
					{code:'29',text:'外国人永久居留身份证'}
				],
			}
		},
		computed:{
			...mapState(['policyData', 'perData','signData']),
			cardScannIsOpen() {
				return this.cardScanningValue.isopen
//				alert(this.cardScanningValue.isopen)
			},
		},store,
		watch:{
			'notationCulvert':function(value){
				if(value=='微信信函'){
					this.code=5
					this.emails=false
					this.WX=true
					this.holder.email=''
				}else if(value=='电子邮件'){
					this.code=4
					this.emails=true
					this.WX=false
					this.down=false
					if(this.nums == '1'){
						this.holder.email = this.perData.email
					}else{
						this.holder.email = this.policyData.holder.appntEmail
					}
				}else if(value=='代理人下载发送'){
					this.code=1
					this.emails=false
					this.WX=false
					this.down=true
					this.holder.email=''
				}
			},
			//监听OCR人脸识别组件的变化
			cardScannIsOpen(val, oldval) {
				if(!val) {
//					if(this.ischecked==true){
//						this.holder.endDate="2200-12-31"
//					}else{
//						this.holder.endDate=
//					}
					if(this.cardScanningValue.cusItem.valid_date=='2200-12-31'){
						this.holder.endDate="长期有效"
					}else{
						this.holder.endDate=this.cardScanningValue.cusItem.valid_date
					}
					this.holder.cerCard=this.cardScanningValue.cusItem.id_card_number
					this.holder.startDate=this.cardScanningValue.cusItem.idStaDate
//					this.holder.endDate=this.cardScanningValue.cusItem.valid_date
					this.holder.frontImg="data:image/jpeg;base64," + this.cardScanningValue.cusItem.renxiangmianimg
					this.holder.backImg="data:image/jpeg;base64," + this.cardScanningValue.cusItem.guohuimianimg
					this.perData.frontImg=this.holder.frontImg
					this.perData.backImg=this.holder.backImg
					this.SetpolicyCode(this.perData)
					let requs = {
						data: {
							"fileBase64":this.holder.frontImg,
							"imageType":"jpg",
							"fileType":"front",
							"contNo":this.policyData.contNo,
							"custNo":this.bnf.bnfCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requs, (body) => {
						if(body.data.code=='0'){
							this.$refs.img1.src=this.holder.frontImg
							this.fronted=body.data.fileId
							this.SetpolicyCode(this.perData)
						}else{
							this.showModals(body.data.msg)
						}
					})
				let requ = {
						data: {
							"fileBase64":this.holder.backImg,
							"imageType":"jpg",
							"fileType":"back",
							"contNo":this.policyData.contNo,
							"custNo":this.bnf.bnfCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code=='0'){
							this.$refs.img2.src=this.holder.backImg
							this.backed=body.data.fileId
							this.SetpolicyCode(this.perData)
						}else{
							this.showModals(body.data.msg)
						}
					})
				}
			}
		},
		mounted() {
			this.SetSignData({
				signNum:'',//签名返回的filedid
				faceNum:'',//人脸识别返回的filedid
				conservationId:'',//保全单号
				conservationIdentityId:'',//证件变更id
				edorNo:'',//保全ID
				conno:'',//保全受理号
				conservationPolicyPayId:'',//保单缴费id
				conservationRetreatsId:'',//退保id
				conservationFeeAddPayId:'',//追加保费id
				conservationPolicyresendId:'',//保单补发id
				conservationAccountvalueId:'',//部分提取id
			})
//			alert(JSON.stringify(this.policyData))
//			console.log(this.perData)
			if(this.perData.endDate=='2200-12-31'){
				this.holder.endDate='长期有效'
			}else{
				this.holder.endDate=this.perData.endDate==''?'':this.perData.endDate
			}
			this.holder.cerCard=this.perData.cerCard
			this.holder.startDate=this.perData.startDate==''?'':this.perData.startDate
//			this.holder.endDate=this.perData.endDate==''?'请选择':this.perData.endDate
			this.holder.email=this.perData.email
			this.fronted=this.perData.front
			this.backed=this.perData.backed
			this.holder.frontImg=this.perData.frontImg
			this.holder.backImg=this.perData.backImg
			this.code=this.perData.code
			if(this.code=='5'){
				this.notationCulvert='微信信函'
			}else if(this.code=='4'){
				this.notationCulvert='电子邮件'
			}else if(this.code=='1'){
				this.notationCulvert='代理人下载发送'
			}
			let aa=this.policyData.bnfList
			let queryParams = this.$route.query;
			if(queryParams){
				if(queryParams.id){
			        this.bnfId = queryParams.id;
			      }
				if(queryParams.nums){
			        this.nums = queryParams.nums;
			      }
			}
			for(let i=0;i<aa.length;i++){
				if(this.bnfId==aa[i].id){
					this.bnf=aa[i]
				}
			}
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			//证件有效期长期监听
			handleChangeValidity() {
				if(this.appntIsCheckeds) {
					this.holder.endDate = "2200-12-31"
				}
			},
			...mapMutations(['SetpolicyData', 'SetpolicyCode','SetSignData']),
			idTypeText(id) {
				let text = ''
				this.idTypeList.forEach( item =>{
					if(id == item.code){
						text = item.text
					}
				})
				return text;
			},
			cardScanning() {
				this.cardScanningValue.isopen = !this.cardScanningValue.isopen
			},
			showModals(message) {
				this.$refs.showalert.showMOdal(message)
			},
			left() {
				this.detailBack()
			},
			detailBack() {
				this.SetpolicyData(this.policyData)
				this.$router.push('/preservation/preservationPolicyOverChange')
			},
			handleShow(index) {
			  this.num=index
		      this.show = true;
		      
		    },
		    /*从相册选择*/
			getUrls(){
				this.show = false;
				try{
					getNewPhoto(
						pictureSource.SAVEDPHOTOALBUM,
						imageData => {
							this.addAppImageAndUpload(this.num,imageData);
						},
						message => {
							Indicator.close(); // alert(message)
						});
				}catch (err) {
					Indicator.close();
				}
			},
			/*照相*/
			capturePhoto(){
				this.show = false;
				try{
					capturePhotoCallback(
						imageData => {
							this.addAppImageAndUpload(this.num,imageData);
						},
						message => {
//							alert(2)
						})
				}catch (err) {
//					alert(3)
				}
			},
			/*转base64*/
			addAppImageAndUpload(index,imageUrl) {
//				alert(index)
//				console.log()
				if(index=='1'){
					this.holder.frontImg = "data:image/jpeg;base64," + imageUrl;
					let requ = {
						data: {
							"fileBase64":this.holder.frontImg,
							"imageType":"jpg",
							"fileType":"front",
							"contNo":this.policyData.contNo,
							"custNo":this.bnf.bnfCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code=='0'){
							this.$refs.img1.src=this.holder.frontImg
							this.perData.frontImg=this.holder.frontImg
							this.fronted=body.data.fileId
							this.SetpolicyCode(this.perData)
						}else{
							this.showModals(body.data.msg)
						}
					})
				}else if(index=='2'){
					this.holder.backImg = "data:image/jpeg;base64," + imageUrl;
					let requ = {
						data: {
							"fileBase64":this.holder.backImg,
							"imageType":"jpg",
							"fileType":"back",
							"contNo":this.policyData.contNo,
							"custNo":this.bnf.bnfCustNo
						},
						modelName: "conservationService",
						methodName: "certFileUpload"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code=='0'){
							this.$refs.img2.src=this.holder.backImg
							this.perData.backImg=this.holder.backImg
							this.backed=body.data.fileId
							this.SetpolicyCode(this.perData)
						}else{
							this.showModals(body.data.msg)
						}
					})
				}
			},
			confirm(){
				let showModals=''
				let date=new Date()
				let newDate=date.getFullYear()+'-'+fillZero(date.getMonth()+1)+'-'+fillZero(date.getDate())
				if(this.holder.cerCard == ''){
					showModals='被保人证件号码不能为空。'
				}
				if(this.holder.cerCard!=this.bnf.bnfIDNo){
					showModals='变更人证件号码不一致。'
				}
				if(this.ischecked==false){
					if(this.holder.endDate == '' || this.holder.endDate == '请选择'){
						showModals='投保人证件止期不能为空。'
					}
				}
				if(this.holder.endDate<=newDate){
//					console.log(this.holder.endDate)
//					console.log(newDate)
					showModals='被保人证件止期不可早于今天。'
				}
				if(this.holder.startDate == '' || this.holder.startDate == '请选择') {
					showModals = '投保人证件起期不能为空。'
				}else if(this.holder.startDate != ''){
					if(this.holder.startDate > this.holder.endDate) {
						showModals = '证件起期不能大于证件止期。'
					}
				}
				if(this.notationCulvert == '' || this.notationCulvert == '请选择'){
					showModals='被保人保单批注函不能为空。'
				}else if(this.notationCulvert == '电子邮件'){
					if(this.holder.email==''||this.holder.email=='请输入'){
						showModals='被保人邮箱不能为空。'
					}
					if(this.holder.email!=''){
						let msg = utils.valid.email(this.holder.email)
						if(msg != undefined && msg != ''){
							showModals = msg
						}
					}
				}
				if(this.backed==''||this.fronted==''){
					showModals='影像件未上传。'
				}
				if(showModals != ''){
	               this.showModals(showModals)
	            }else{
	            	if(this.bnf.bnfIDType=='11'){
	            		this.perData.front=this.fronted
		            	this.perData.backed=this.backed
		            	this.perData.code=this.code
		            	this.perData.cerCard=this.holder.cerCard
		            	if(this.holder.endDate=='长期有效') {
							this.perData.endDate = "2200-12-31"
						} else {
							this.perData.endDate = this.holder.endDate
						}
//		            	this.perData.endDate=this.holder.endDate
		            	this.perData.startDate=this.holder.startDate
		            	this.perData.email=this.holder.email
		            	this.SetpolicyCode(this.perData)
		            					this.go('/preservation/preservationPolicyChangeAffirm?tpl='+this.bb+'&id='+this.bnfId)
	            	}else{
	            		showModals='证件类型非身份证，请到官微、官网或拨打客服热线95348进行信息变更。'
	            		this.showModals(showModals)
	            	}
	            }
				
			},
		},
	}
</script>

<style lang="scss" scoped type="text/css">
	.fa {
		color: #FDB92C;
	}
	
	.fa-angle-left {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	
	.details {
		font-size: 0.8rem;
	}
	
	.details .insurentInformation {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #F8F8F8;
		text-align: left;
		color: #FEB101;
		padding: 0.2rem 0;
		span {
			margin-left: 3%;
			font-size: 0.85rem;
		}
	}
	
	.details .insurentContent {
		margin-bottom: 15px;
		.info {
			border-bottom: 1px dashed #BBB;
		}
		.cerinfo {
			margin-top: 15px;
			div {
				width: 95%;
				margin: auto;
				height: 20px;
				line-height: 20px;
				padding: 0px 10px;
			}
		}
		.delInfo div {
			width: 95%;
			margin: auto;
			height: 34px;
			line-height: 34px;
			padding: 5px 0;
		}
		.cerNo {
			width: 95%;
			margin: auto;
			padding: 15px 0 8px 0;
			.policy {
				margin-top: 15px;
			}
		}
	}
	
	.details .foot {
		color: #FEB101;
		width: 95%;
		margin: auto;
		margin-top: 15px;
		div {
			height: 20px;
			line-height: 20px;
		}
	}
	
	.details .confirm {
		width: 95%;
		margin: auto;
		div {
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
	
	.details .flex {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	.details .photo {
	  display: block;
	  width: 100%;
	  line-height: 45px;
	  border: 0;
	  background: #fff;
	}
	.details .left {
		margin-left: 4%;
	}
	.details .right {
		margin-right: 4%;
		display: flex;
	    justify-content: flex-end;
	    align-items: center;
	}
	.details .info .fa-calendar {
    font-size: 1.2rem !important;
}
.details::-webkit-scrollbar {
	display:none
}
</style>