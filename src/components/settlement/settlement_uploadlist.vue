<template>
	<div>
		<Headerbtns :title="HeaderText" class='sel-user-head'>
			<div slot="left" class="back" @click='backUrl'><i class="fa fa-angle-left" style='font-size:1.8rem;color:#FDB92C'></i></div>
		</Headerbtns>
		<div class='set-upload set-upload-b'>
			<div v-for='item in UpLoadList' class='flex' v-show='item.urlShow' @click='goToImg(item.key)'>
				<p class='flex'>
					<img :src="[item.isShow?AyouOk:AyouNo]" style='width:1.8rem;height:1.8rem'/>
					<span>&nbsp;&nbsp;{{item.text}}</span>
				</p>
				<img src="static/img/settlement/home_right.png">
			</div>
		</div>
		<p class='uploader-add-btn'>
			<button @click='UploadSbm'>提交</button>
		</p>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>
<script>
	import Alert from '@/components/policy/common/alert.vue'
	import Headerbtns from '@/components/policy/common/Header'
    import '../policy/css/base.css'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement'
	export default {
		components:{Alert,Headerbtns},
		data() {
			return {
				HeaderText:'资料补传',
				UpLoadList:[
				{key:'2',text:'被保险人身份证明',isShow:false,urlShow:true},
				{key:'3',text:'申请人身份证明',isShow:false,urlShow:true},
				{key:'4',text:'申请人银行卡/存折',isShow:false,urlShow:true},
				{key:'5',text:'住院病历/出院小结',isShow:false,urlShow:true},
				{key:'6',text:'门诊（急）病历',isShow:false,urlShow:true},
				{key:'7',text:'诊断证明书',isShow:false,urlShow:true},
				{key:'8',text:'医疗费用收据',isShow:false,urlShow:true},
				{key:'9',text:'医疗费用明细清单/医保报销凭证',isShow:false,urlShow:true},
				{key:'10',text:'病理/影像检查报告',isShow:false,urlShow:true},
				{key:'11',text:'意外事故证明/伤残鉴定报告',isShow:false,urlShow:true},
				{key:'12',text:'家庭关系证明',isShow:false,urlShow:true},
				{key:'13',text:'死亡证明书/户籍注销证明/殡葬证明',isShow:false,urlShow:true},
				{key:'14',text:'其他资料',isShow:false,urlShow:true}
				],
				AyouOk:'static/img/settlement/yes.png',
				AyouNo:'static/img/settlement/no.png',
				uuid:'',
				fileImgList:'',
				claimNo:''
			}
		},
		computed:{
			...mapState(['fileType','policyId','policyData','newPolicyCode','policy_1_imgList'])
		},store,
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
			console.log('报案号',this.$route.params.id)
			this.getData()
			this.SetpolicyId(this.$route.params.id)
			this.media.header($('.set-upload'))
			$('.set-upload').css('margin-top',$('.v-header').outerHeight(true)+'px')
		},
		methods: {
			...mapMutations(['SetpolicyId','SetpolicyData','SetnewPolicyCode','Setpolicy_1_imgList']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			backUrl() {
				this.$router.push('/ReportRecord')
			},
			UploadSbm() {
				alert_n22.confirm('提示', '本次补传'+this.policy_1_imgList.length+'张照片', '确定', '取消', (flag) => {
					let requ = {
						data: {
							"uuid":this.uuid,
							"fileImgList":this.fileImgList,
							"claimNo":this.$route.params.id
						},
						"modelName":"claimService",
						"methodName":"dataReissue"
					}
					utils.http.postFast('CusbusinessService',requ,(body,header) => {
						if(body.data.code == 0){
							alert_n22.confirm('提示', '提交成功', '确定', '取消', (flag) => {
								this.Setpolicy_1_imgList([])
								this.$router.push('/ReportRecord')
							})
						}
					})
				})
			},
			getData() {/*分步获取（标准哪些上传了，哪些没上传）*/
				let requ = {
					data: {
						claimNo:this.$route.params.id,
						claimType:"0",
						step:"3"
					},
					modelName: "claimService",
					methodName: "getClaimInfo"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log('分步获取----->>>',body)
					if(body.data.claim.claimId){
						this.SetnewPolicyCode(body.data.claim.claimId)
					}
					this.uuid =  header.uuid
					this.claimNo = body.data.claim.claimId
					console.log('补传的影像id',this.policy_1_imgList)
					this.policy_1_imgList.forEach((item,index) => {
						let id = index === (this.policy_1_imgList.length -1)?item : item+','
						this.fileImgList += id
					})
					let arr = body.data.claim.imageFiles
					let insured = body.data.claim. insured
					let newObject = {
						customerName:insured.insuredname,/*客户姓名*/
						customerSex:insured.insuredsex,/*客户性别*/
						customerBirthDay:insured.insuredbirthday,/*客户⽣⽇*/
						customerIDType:insured.insuredidtype,/*证件类型*/
						customerIDNo:insured.insuredidno,/*证件号*/
						customerNative:insured.insuredNative,/*国籍*/
						customerIDExpDate:insured.insuredidexpdate/*证件有效期*/
					}
					console.log(newObject)
					this.SetpolicyData(newObject)
					if(arr && arr.length>0){
						arr.forEach( item => {
							this.UpLoadList.forEach( tpl => {
								if(item.fileType == tpl.key){
									tpl.isShow = true
								}
							})
						})
					}
				})
			},
			goToImg(id){
				this.$router.push('/settlementUploadImg2/'+id)
			},
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		}
	}
</script>

<style>
.set-upload .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.set-upload img{
	width:1rem;
}
.set-upload>div{
	height:2.2rem;
	padding:0 1rem;
	border-bottom:2px dotted #CECECE;
}
.set-upload-b span{
	font-size:.9rem!important;
}
.set-upload .sel-div-last{
	border:none;
	margin:3rem 0;
	text-align: center;
}
.set-upload .sel-div-last>button{
	background: #feb101;
	color:#fff;
	outline: none;
	border:none;
	height:2rem;
	width:8rem;
	margin-bottom:1rem;
	border-radius: 5px;
}
.uploader-add-btn{
	text-align: center;
	margin: 20px 0;
}
.uploader-add-btn>button{
	width: 120px;
	height:35px;
	border-radius: 5px;
	background: #feb101;
	outline: none;
	color: #fff;
	border: none;
}
</style>