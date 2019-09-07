<template>
	<div class='data-affirm data-affirm-4'>
		<div class='data-affirm-header-bar'>
			<div class='header-title'>
				<div class="back" @click='backList'><i class="fa fa-angle-left" style='font-size:1.8rem;color:#FDB92C'></i></div>
				<p style='color:rgb(51, 51, 51);font-size: 1rem;font-weight: bold;'>信息确认</p>
				<p class="fa fa-ellipsis-v" style="display: inline-block;width: 24px;text-align: center;font-size: 20px;line-height: 46px;" @click='sheetVisible = !sheetVisible'></p>
			</div>
		</div>
		<div class='sel-tel-title flex data-affirm-header' style="padding-left:0">
			<p v-for='item in TitleList' :class="[item.active?'active':'']" style="padding-top:5px;font-size: .8rem">
				{{item.text}}
			</p>
		</div>
		<div class='data-affirm-container' style='width: 100%;padding:0;margin-top:30px'>
			<p class='title sel-tel-title-p' style='border-top:none;'>出险人信息</p>
			<div class='rows'>
				<p>与投保人关系：{{insuredData.relation | ralationFilter}}</p>
				<div class='flex'>
					<p>{{insuredData.insuredname}}</p>
					<p>{{insuredData.insuredsex =='0'?"男":'女'}}</p>
					<p>国籍：{{insuredData.insurednation | nativeText}}</p>
				</div>
				<p>证件类型：{{zjText(insuredData.insuredidtype)}}</p>
				<p>证件号码：{{insuredData.insuredidno}}</p>
				<p>证件有效期：{{insuredData.insuredidexpdate}}</p>
				<p>联系电话：{{insuredData.insuredmobile}}</p>
				<p>职业：{{insuredData.insuredprofess}}</p>
				<p>联系地址：{{insuredData.insuredaddress}}</p>
			</div>
			<p class='title'>申请人信息</p>
			<div class='applicants rows'>
				<div v-for='item in applicants'>
					<div>
						<p>申请人身份：{{item.bntidentityText}}</p>
						<p>与投保人关系：{{item.relationtoholder | ralationFilter}}</p>
						<p>与出险人关系：{{item.relationtoinsured  | ralationFilter}}</p>
					</div>
					<div class='flex h-2'>
						<p>{{item.accname}}</p>
						<p>{{item.bnfissex=='0'?'男':'女'}}</p>
						<p>国籍：{{item.bnfnation | nativeText}}</p>
					</div>
					<div>
						<p>证件类型：{{zjText(item.bnfidtype)}}</p>
						<p>证件号码：{{item.bnfidno}}</p>
						<p>证件有效期：{{item.bnfidvalidenddate}}</p>
						<p>联系电话：{{item.bnfmobile}}</p>
						<p>职业：{{item.bntprofess}}</p>
						<p>仅为中国税收居民：{{item.bnfislong =='0'?'是':'否'}}</p>
						<p>联系地址：{{item.bntaddress}}</p>
						<p>开户银行：{{item.bankaccname}}</p>
						<p>户名：{{item.accname}}</p>
						<p>银行账户：{{item.bankcode}}</p>
					</div>
				</div>
			</div>
			<p class='title'>出险信息</p>
			<div style='margin-bottom:5.5rem;min-height: 290px;' class='rows'>
				<p>事故日期：{{accidentInfo.accidentdate}}</p>
				<p>事故地点：{{accidentInfo.accidentprovinceText+accidentInfo.accidentcityText+accidentInfo.accidentcountyText+accidentInfo.accidentaddress}}</p>
				<p>出险原因：{{accidentInfo.accidenttype=='1'?'意外':'疾病'}}</p>
				<p>治疗医院：{{accidentInfo.hospital}}</p>
				<p>目前状况：{{insuredData.zk}}</p>
				<div class='flex' v-for='item in policyList' style='width:100%'>
					<p>出险类型：{{item.text}}</p>
					<p>出险日期：{{item.date}}</p>
				</div>
				<p>事故经过：{{accidentInfo.accidentdesc}}</p>
				<div class='title-text-bold'>
					<p style='text-align: center;'>反保险欺诈提示</p>
					<p>
						<b>反保险欺诈提示：</b>
						<span>诚信是保险合同基本原则，根据《中华人民共和国刑法》、《中华人民共和国保险法》、《中华人民共和国治安管理处罚法》等相关法律法规，涉嫌保险欺诈将承担以下责任: </span>
						<b>【刑事责任】</b>
						<span>进行保险诈骗犯罪活动，可能会受到拘役、有期徒刑，并处罚金或者没收财产的刑事处罚。保险事故的鉴定人，证明人故意提供虚假的证明文件，为他人诈骗提供条件的，以保险诈骗罪的共犯论处。</span>
						<b>【行政责任】</b>
						<span>进行保险诈骗活动，尚不构成犯罪的，可能会受到15日以下拘留、5000元以下罚款的行政处罚；保险事故的鉴定人、证明人故意提供虚假的证明文件、为他人诈骗提供条件的，也会受到相应的行政处罚。</span>
						<b>【民事责任】</b>
						<span>故意或因重大过失未履行如实告知义务，保险公司不承担赔偿或给付保险金的责任。</span>
					</p>
				</div>
				<div class='title-text-bold'>
					<p style='text-align: center;'>声明及授权</p>
					<p>声明及授权：1、本人已阅读并知晓《反保险欺诈提示》，并承诺理赔申请书上所填写内容真实详尽，与投保人、被保险人或受益人关系属实。2、本人同意并授权光大永明人寿保险有限公司向医疗机构、行政司法机关、单位和个人检索、调阅、摘抄、复印或其他方式获取，任何本人或被保险人与理赔申请相关的资料。本人愿意承担由此产生的一切法律责任。本授权之影印件亦属有效。3、本人同意贵司向中国保险信息技术管理有限责任公司（简称“中国保信”）报送本人的全部保单信息和理赔信息，并通过医疗机构、中国保信及知悉本人信息的其他机构查询与本人有关的承保、理赔、医疗等信息。中国保信基于为本人或保险公司提供服务的需要可对上述信息进行必要的使用及与相关机构进行信息共享，但均应严格履行保密义务。 4、因本人或代办人过错导致银行转账不成功或提供信息资料错误导致的一切后果，贵公司不承担责任。</p>
				</div>
				<div style='display: flex;justify-content: flex-end;'>
					<p style='width:80px;height:60px;' @click='faceTest(1,1)'>
						<span>代办人签字</span>
						<img :src="writing1" style='width:60px;height:60px;'>
					</p>
					<p v-for='item in applicants' style='width:80px;height:60px;' @click='faceTest(2,1)'>
						<span>申请人签字</span>
						<img :src="item.writing2" style='width:60px;height:60px;'>
					</p>
				</div>
			</div>
		</div>
		<div class='foot-btn'>
			<button @click='close'>取消理赔</button>
			<button @click='Next'>确认提交</button>
		</div>
		<p><Alert ref="showalert"></Alert></p>
		<NewCA v-show="caValue.isCAOpen" v-model="caValue" :value="caValue" @ChildMsg='getChild'></NewCA>
		<mt-actionsheet :actions="actions" v-model="sheetVisible">
		</mt-actionsheet>
	</div>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement/index.js'
	import Alert from '@/components/policy/common/alert'
	import NewCA from '@/components/common/NewCA'
	import myaddress from '@/../static/dict/pre_code.json'
	import { Actionsheet } from 'mint-ui'
	export default {
		components:{Alert,NewCA,Actionsheet},
		data() {
			return {
				sheetVisible:false,
				insuredData:{},/*出险人、报案人信息*/
				accidentInfo:{},/*出险信息*/
				applicants:[],/*申请人信息*/
				insuredFaceId:'',/*代办人人脸识别返回id*/
				appliFaceId:'',/*申请人人脸识别返回id*/
				applicantSignFileId:'',//申请人签字返回id
				rptormangcom:'',/*受理机构*/
				cardFrontId:'',//申请人身份证正面图片文件id
				cardBackId:'',//申请人身份证正面图片文件id
				TitleList:[
				{key:'1',text:'出险信息',active:false,url:'/settlement_user/1'},
				{key:'2',text:'出险人信息',active:false,url:'/settlement/settlement_content/settlement_policy'},
				{key:'3',text:'资料上传',active:false,url:'/settlement/settlement_user'},
				{key:'4',text:'信息确认',active:true,url:'/settlement/settlement_upload'},
				],
				PolicyType:[
				{key:'100',text:'意外医疗',active:false,date:'请选择',show:false,type:'1'},
				{key:'101',text:'意外伤残',active:false,date:'请选择',show:false,type:'1'},
				{key:'102',text:'意外死亡',active:false,date:'请选择',show:false,type:'1'},
				{key:'103',text:'意外高残',active:false,date:'请选择',show:false,type:'1'},
				{key:'104',text:'意外大病',active:false,date:'请选择',show:false,type:'1'},
				{key:'105',text:'意外特种疾病',active:false,date:'请选择',show:false,type:'1'},
				{key:'106',text:'意外失业失能',active:false,date:'请选择',show:false,type:'1'},
				{key:'107',text:'意外津贴',active:false,date:'请选择',show:false,type:'1'},
				{key:'109',text:'意外豁免',active:false,date:'请选择',show:false,type:'1'},
				{key:'200',text:'疾病医疗',active:false,date:'请选择',show:false,type:'2'},
				{key:'201',text:'疾病伤残',active:false,date:'请选择',show:false,type:'2'},
				{key:'202',text:'疾病身故',active:false,date:'请选择',show:false,type:'2'},
				{key:'203',text:'疾病高残',active:false,date:'请选择',show:false,type:'2'},
				{key:'204',text:'疾病大病',active:false,date:'请选择',show:false,type:'2'},
				{key:'205',text:'疾病特种疾病',active:false,date:'请选择',show:false,type:'2'},
				{key:'206',text:'疾病失业失能',active:false,date:'请选择',show:false,type:'2'},
				{key:'207',text:'疾病津贴',active:false,date:'请选择',show:false,type:'2'},
				{key:'209',text:'疾病豁免',active:false,date:'请选择',show:false,type:'2'}
				],
				relationTypes: [
				{code:'01',text:'被保险人'},
				{code:'02',text:'法定继承人'},
				{code:'03',text:'指定受益人'},
				{code:'04',text:'监护人'},
				{code:'05',text:'其他'}
				],
				ralationList:[
				{code:'1',text:'本人'},
				{code:'2',text:'其他'},
				{code:'3',text:'配偶'},
				{code:'4',text:'父子'},
				{code:'5',text:'父女'},
				{code:'6',text:'母子'},
				{code:'7',text:'母女'}
				],
				UserCertificatesList:[
				{code:'11',text:'身份证'},
				{code:'12',text:'户口本'},
				{code:'17',text:'中国护照'},
				{code:'24',text:'外国护照'},
				{code:'23',text:'台胞证'},
				{code:'26',text:'港澳通行证'},
				{code:'20',text:'出生证'},
				{code:'29',text:'外国人永久居留身份证'}
				],
				situationList:[
				{code:'02',text:'治疗中'},
				{code:'03',text:'治疗结束'},
				{code:'05',text:'残疾（失能）'},
				{code:'06',text:'身故'}
				],
				thisPolicyType:'',
				policyList:[],
				caValue:{
					isCAOpen: false,
					context_id: '',
					image: '',
					applyCode: 'xxxxx1',
					orderId: 'xxxxxx2'
				},
				actions:[{
					name:"微信分享(申请人签字)",
					method:this.shareApp
				}],
				bankText:'',
				agentAddressCode:utils.cache.get('personsal').orgId.substring(0, 4),//代理人地址
				writing1:'',//代办人签字影像
				writing: 'data:image/jpeg;base64,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',
			}
		},
		computed: {
			...mapState(['policyState','policyCode','newPolicyType','fileImgList'])
		},store,
		mounted() {
			this.SetPolicyState(4)
			console.log('赔案号->',this.policyCode)
			console.log(this.$route.params.fileId)
			console.log('出险类型->',this.newPolicyType)
			this.getInitData()
			console.log('待上传的影像id----->>>',this.fileImgList)
			console.log(this.agentAddressCode)
			let u = navigator.userAgent;
			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if(isiOS) {
				if(screen.height == 812 && screen.width == 375){
					$('.data-affirm-header-bar').css('height','68px').css('top','0')
					$('.data-affirm-header-bar .header-title').css('padding-top','20px')
				}else {
					$('.data-affirm-header-bar').css('height','58px').css('top','0')
					$('.header-title').css('padding-top','10px')
				}
			}else {
				$('.data-affirm-header-bar').css('height','48px').css('top','0')
			}
			$('.data-affirm-header').css('top',$('.data-affirm-header-bar').outerHeight(true)+'px')
			// console.log($('.data-affirm-header').outerHeight(true))
			$('.data-affirm').css('height',this.media.container(this.screenHeight,0)+'px').css('overflow','scroll')
			// $('.data-affirm-container').css('margin-top',$('.data-affirm-header-bar').outerHeight(true)+$('.data-affirm-header').outerHeight(true)+'px')

			this.writing1 = this.writing/*初始化代办人签字图片*/
			this.writing2 = this.writing/*初始化申请人签字图片*/
		},
		methods: {
			...mapMutations(['SetPolicyState','SetnewPolicyType']),
			backList() {
				this.$router.push('/settlement_content/settlement_upload/'+this.newPolicyType)
			},
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			codeText(code1,code2,code3) {
				let arr = []
				myaddress.forEach( item => {
					if( code1 == item.code){
						arr[0] = item.name
					}
					item.children.forEach( tpl => {
						if(code2 == tpl.code){
							arr[1] = tpl.name
						}
						tpl.children.forEach( cpl => {
							if(code3 == cpl.code){
								arr[2] = cpl.name
							}
						})
					})
				})
				return arr;
			},
			faceTest(id,type) {/*进行人脸识别*/
				console.log('id是',id)
				if(id == 1){
					this.openCA(1)
				}else if(id == 2){
					MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?', (callbackSucc) => {//插件调用需真机操作
						this.ficeDistinguish(callbackSucc)
					}, (callbackFail) => {
						this.$refs.showalert.showMOdal(callbackFail)
					});
				}
			},
			close() {
				alert_n22.confirm('提示', '是否取消理赔?', '确定', '取消', (flag) => {
					this.$router.push('/settlement')
				})
			},
			Next() {
				if(this.insuredFaceId!=''){
					let requ = {
						data: {
							applicantSignFileId:this.applicantSignFileId,//申请人签字文件返回id
							linkManFileId:this.insuredFaceId,//代办人签字文件id
							faceFileId:this.appliFaceId,//申请人人脸图片文件id
							cardFrontId:this.cardFrontId,//申请人身份证正面图片文件id
							cardBackId:this.cardBackId,//申请人身份证反面图片文件id
							claimsId:this.policyCode,//赔案id
							acceptCom:this.rptormangcom,//受理机构
							bussType:"2",//1.保全 2.理赔 3.新契约
							subType:"LP",//业务子类型 PL写死
							saleChnl:"13", //渠道类型 13写死
							recognitionDate:"2018-08-09",//当前时间年月日
							recognitionTime:"09:09:09",//当前时间时分秒
							recognitionResult:"Y",
							recognitionFIResult:"Y",
							recognitionFI:"识别成功",
							recognitionFPResult:"Y",
							recognitionFP:"识别成功",
							recognitionIPResult:"Y",
							recognitionIP:"识别成功",
							isInHospitil:"Y",
							fileImgList:this.$route.params.fileId,//影像id
							custName:this.applicants[0].accname,/*客户姓名*/
							custIDType:this.applicants[0].bnfidtype,/*证件类型*/
							custIDNo:this.applicants[0].bnfidno/*证件号*/
						},
						modelName: "claimToService",
						methodName: "claimCase"
					}
					utils.http.postFast('CusbusinessService',requ,(body,header) => {
						if(body.data.code != 0){
							alert_n22.confirm('提示',body.data.msg, '确定', '', (flag) => {
								if(body.data.msg == "该理赔已申请成功，请勿重复操作！" ){
									this.$router.push('/settlement')
								}
							})
						}else{
							alert_n22.confirm('提示','理赔申请成功', '确定', '', (flag) => {
								this.$router.push('/settlement')
							})
						}
					})
				}else {
					if(this.insuredFaceId == ''){
						this.Aleart('请完成代办人签字')
					}
					// else if(this.appliFaceId == ''){
					// 	this.Aleart('请完成申请人人脸识别')
					// }else if(this.applicantSignFileId == ''){
					// 	this.Aleart('请完成申请人签字')
					// }
				}
			},
			ficeDistinguish: function(image) {
				let reques = {
					"policy": {
						"agentCode":utils.cache.get('personsal').agentCode,
						"name": this.applicants[0].bnfname,
						"cardId": this.applicants[0].bnfidno,
						"functionCode": "COMMON",
						"idType":this.applicants[0].bnfidtype,
						"imageByte": image,
						"applyCode": "",
						"policyCode": ""
					}
				}
				utils.http.postFast('FACEIDKSHL', reques, (body) => {
					if(body.policy.resultCode == '0') {
						this.ImgGet('face_appl','sign_appl',image)/*调用接口，上传图片，区分类型*/
					}else {
						this.Aleart(body.policy.resultMsg)
					}
				})
			},
			ImgGet(fileType,sign,img) {/*影像上传*/
				let requ =  {
					data:{
						fileBase64:img,
						claimsId:this.policyCode,/*赔案号*/
						claimsType:this.newPolicyType,/*出险类型*/
						fileType:fileType,//影像类型 face_appl人脸识别/sign_ins代办人签字/sign_appl申请人签字
						sign:sign,//身份类型 sign_ins代办人/sign_appl申请人
						imageType:"jpg",
						businessType:"claims" /*报案report，赔案claims*/
					},
					modelName: "claimService",
					methodName: "attachFileUpload"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					if(body.data.code == 0){
						if(sign == 'sign_ins'){
							//代办人签字返回id
							this.insuredFaceId = body.data.fileId
						}else if(sign == 'sign_appl' && fileType == 'face_appl'){
							//申请人人脸识别返回id
							this.appliFaceId = body.data.fileId
							this.openCA(2)
						}else if(sign == 'sign_appl' && fileType == 'sign_appl') {
							//申请人签字返回id
							this.applicantSignFileId = body.data.fileId
						}
					}
				})
			},
			getInitData() {
				let requ = {
					"data": {
						"claimId":this.policyCode,
						"claimType":"1",
						"step":""
					},
					"modelName": "claimService",
					"methodName": "getClaimInfo"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log('报案信息页分步获取----->>>',body)
					console.log(header)
					if(body.data.code == 0){
						this.insuredData = body.data.claim.insured/*出险人信息*/
						this.insuredData.relation = body.data.claim.relation/*与出险人关系*/
						this.accidentInfo = body.data.claim.accidentInfo/*出险信息*/
						let newCodeArr = this.codeText(this.accidentInfo.accidentprovince,this.accidentInfo.accidentcity,this.accidentInfo.accidentcounty)
						this.accidentInfo.accidentprovinceText = newCodeArr[0]
						this.accidentInfo.accidentcityText = newCodeArr[1]
						this.accidentInfo.accidentcountyText = newCodeArr[2]
						console.log(newCodeArr)
						let relationship = body.data.claim.applicants[0].relationtoinsured
						this.rptormangcom = body.data.claim.insured.rptormangcom/*受理机构*/
						if(body.data.claim.imageFiles.length>0){
							let newArr = []
							body.data.claim.imageFiles.forEach( item => {
								if(relationship != '00'){//申请人与出险人不是本人
									if(item.fileType == '3'){
										newArr.push(item)
									}
								}else{
									if(item.fileType == '2'){//申请人与出险人是本人
										newArr.push(item)
									}
								}
							})
							if(newArr.length == 2){
								this.cardFrontId = newArr[0].id//申请人身份证正面图片文件id
								this.cardBackId = newArr[1].id//申请人身份证正面图片文件id
							}
						}
						console.log('申请人身份证正面id->',this.cardFrontId)
						console.log('申请人身份证反面id->',this.cardBackId)
						this.accidentInfo.accidentMode.forEach( item => {
							if(item.isselected == '1'){
								this.thisPolicyType += item.reasoncode+','
							}
						})
						this.thisPolicyType = this.thisPolicyType.substr(0,this.thisPolicyType.length-1)
						console.log('出险类型----->>返回上一步的路由参数',this.thisPolicyType)
						this.SetnewPolicyType(this.thisPolicyType)

						console.log(this.PolicyType)
						/*出险类型*/
						this.PolicyType.forEach( item => {
							this.accidentInfo.accidentMode.forEach( tpl => {
								if(tpl.reasoncode == item.key && tpl.isselected == '1'){
									let newObject = {
										text:item.text,
										date:tpl.acrossdate
									}
									this.policyList.push(newObject)
								}
							})
						})
						console.log(this.policyList)
						/*申请人数据*/
						if(body.data.claim.applicants && body.data.claim.applicants.length>0){
							this.applicants = body.data.claim.applicants
							this.applicants.forEach( (item,index) => {
								item.writing2 = this.writing
								if(item.bntidentity == '01'){
									item.bntidentityText = '被保险人'
								}else if(item.bntidentity == '02'){
									item.bntidentityText = '法定继承人'
								}else if(item.bntidentity == '03'){
									item.bntidentityText = '指定受益人'
								}else if(item.bntidentity == '04'){
									item.bntidentityText = '监护人'
								}else if(item.bntidentity == '05'){
									item.bntidentityText = '其他'
								}
								if(item.linkname == '' && item.linktel == ''){
									this.applicants.splice(index,1)
								}
							})
						}
						console.log(this.applicants)
						/*目前状况*/
						//this.insuredData
						this.situationList.forEach(item=>{
							// situation
							if(item.code == this.accidentInfo.situation){
								this.insuredData.zk = item.text
							}
						})
						console.log(this.insuredData.zk)
					}
				})
			},
			gxText(id) {
				let text = ''
				this.ralationList.forEach( item => {
					if(id == item.code){
						text = item.text
					}
				})
				return text;
			},
			zjText(id) {
				let text = ''
				this.UserCertificatesList.forEach( item =>{
					if(id == item.code){
						text = item.text
					}
				})
				return text;
			},
			getChild(msg) {
				console.log(this.userType)
				console.log(this.caValue)
				if(this.userType == 1){/*如果为代办人签字,则赋值到代办人*/
					this.ImgGet('sign_ins','sign_ins',msg)
					this.writing1 = msg
				}else if(this.userType == 2){/*申请人签字1.赋值到数组,2.调接口保存签字影像*/
					this.applicants.forEach( (item,index) =>{
						if(index == 0){
							item.writing2 = msg
						}
						this.$set(this.applicants,index,item)
					})
					this.ImgGet('sign_appl','sign_appl',msg)
				}
				this.caValue.isCAOpen = false
			},
			openCA(id) {
				if(id == 1){
					this.userType = 1
					this.userItem = ''
				}else{
					this.userType = 2
					this.userItem = ''
				}
				this.caValue.isCAOpen = !this.caValue.isCAOpen
				this.caValue.image = ""
				this.caValue.context_id = 999 + 'HZ'
			},

			//分享
			shareApp:function(){
				if(this.insuredFaceId != ''){
					let host = window.globalConfig.rootUrl.split('/')[2]
					let protocol = window.globalConfig.rootUrl.split(':')[0]   
					let shareLink = protocol + "://" + host + '/com.ifp.ipartner/proposalShare/index.html#/settlement_content/data_affirm_share/'+this.policyCode+'_'+ utils.cache.get('personsal').orgId.substring(0, 4) +'_'+ this.insuredFaceId + '/' +this.$route.params.fileId
					console.log("分享地址 ===>" + shareLink)
					Wechat.share({
						message: {
							title: "赔案申请确认书",
							description:"该链接有效期至业务申请日24时止",
							thumb: "www/static/img/common/0.png",
							mediaTagName:'链接',
							media: {
								type: Wechat.Type.WEBPAGE,
								webpageUrl: shareLink
							}
						},
						scene: Wechat.Scene.SESSION    // share to Timeline
					}, () => {
						utils.ui.modal.afterOpen()
						this.$refs.showalert.showMOdal('分享成功')
						utils.ui.modal.beforeClose()
					}, (reason) => {
						utils.ui.modal.afterOpen()
						this.$refs.showalert.showMOdal(reason)
						utils.ui.modal.beforeClose()
					});
				}else{
					this.Aleart('请完成代办人签字')
				}
			}
		},
		watch: {

		}
	}
</script>

<style scoped>
.data-affirm-header-bar{
	position: fixed;
	width: 100%;
	background: #fff;
	top:0;
	box-sizing: border-box;
	border: 2px solid #efefef;
}
.data-affirm-header-bar>div{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height:100%;
	padding:0 10px;
	box-sizing: border-box;
	padding-bottom: 0!important;
}
.data-affirm-4 .sel-tel-title{
	width: 100%;
}
.data-affirm-container::-webkit-scrollbar {
	display:none
}
.data-affirm-4{
	margin-top:5px;
}
.data-affirm .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.data-affirm p{
	font-size: .9rem;
}
.data-affirm .title{
	color: #feb101;
	font-size: .9rem;
	padding-left: 10px;
	background: #f8f8f8;
	height: 2.2rem;
	line-height: 2.2rem;
	border-bottom: 2px solid #DDD;
	border-top: 2px solid #DDD;
}
.h-2{
	height:2.2rem;
	line-height: 2.2rem;
}
.data-affirm .rows{
	padding:0 10px;
}
.data-affirm>div p{
	min-height:1.5rem;
	line-height: 1.5rem;
	font-size:.8rem;
}
.applicants>div:nth-child(2){
	margin-top:20px;
	padding-top:20px;
	border-top:1px solid #ddd;
}
.foot-btn{
	padding:0!important;
	position:fixed;
	bottom:0;
	width:100%;
	height:2.5rem;
	display: flex;
}
.foot-btn>button{
	border:none;
	outline: none;
	width:50%;
	color: #fff;
}
.foot-btn>button:first-child{
	background: #FDB92C;
}
.foot-btn>button:last-child{
	background: #feb101;
}
.title-text-bold{
	border: 2px solid #000;
	padding:5px;
	margin-top:10px;
}
.title-text-bold>p,
.title-text-bold>p>b{
	font-weight: bold;
}
</style>