<template>
	<div class='set-upload set-upload-1'>
		<div v-for='item in UpLoadList' class='flex' v-show='item.urlShow' @click='goToImg(item.key)'>
			<p class='flex'>
				<img :src="[item.isShow?AyouOk:AyouNo]" style='width:1.8rem;height:1.8rem'/>
				<span>&nbsp;&nbsp;{{item.text}}</span>
			</p>
			<img src="static/img/settlement/home_right.png">
		</div>
		<p><Alert ref="showalert"></Alert></p>
		<div class='sel-div-last'>
			<button @click='Next'>下一步</button>
		</div>
	</div>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement'
	import Alert from '@/components/policy/common/alert'
	export default {
		components:{Alert},
		data() {
			return {
				UpLoadList:[
				// {key:'1',text:'理赔申请书',isShow:false,urlShow:false},
				{key:'2',text:'被保险人身份证明',isShow:false,urlShow:false},
				{key:'3',text:'申请人身份证明',isShow:false,urlShow:false},
				{key:'4',text:'申请人银行卡/存折',isShow:false,urlShow:false},
				{key:'5',text:'住院病历/出院小结',isShow:false,urlShow:false},
				{key:'6',text:'门（急）诊病历',isShow:false,urlShow:false},
				{key:'7',text:'诊断证明书',isShow:false,urlShow:false},
				{key:'8',text:'医疗费用收据',isShow:false,urlShow:false},
				{key:'9',text:'医疗费用明细清单/医保报销凭证',isShow:false,urlShow:false},
				{key:'10',text:'病理/影像检查报告',isShow:false,urlShow:false},
				{key:'11',text:'意外事故证明/伤残鉴定报告',isShow:false,urlShow:false},
				{key:'12',text:'家庭关系证明',isShow:false,urlShow:false},
				{key:'13',text:'死亡证明书/户籍注销证明/殡葬证明',isShow:false,urlShow:false},
				{key:'14',text:'其他资料',isShow:false,urlShow:false}
				],
				AyouOk:'static/img/settlement/yes.png',
				AyouNo:'static/img/settlement/no.png',
				NecessaryList:[],
				fileId:'',
				fileImges:[],
				insuredidtype:'',//出险人证件类型
			}
		},
		computed:{
			...mapState(['VuxPolicyType','policyState','policyCode','newPolicyType','fileImgList'])
		},store,
		mounted() {
			this.SetPolicyState('3')
			console.log('出险类型',this.$route.params.type)
			this.getInitData()
		},
		methods: {
			...mapMutations(['SetPolicyState','SetpolicyCode','SetnewPolicyType','SetfileImgList']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			Next() {
				let str = ''
				this.UpLoadList.forEach( item => {
					/*显示了 && 没有影像的*/
					if(item.urlShow == true && item.isShow == false){
						str += item.key+','
					}
				})
				str = str.substr(0,str.length-1)
				let alertText = ''
				this.UpLoadList.forEach( item => {
					this.NecessaryList.forEach(tpl => {
						if(item.key == tpl && item.isShow == false){
							alertText+= item.text+'、'
							console.log('必须要上传,且没上传的类型为',tpl)
						}
					})
				})
				alertText = alertText.substr(0,alertText.length-1)
				// if(alertText!=''){
				// 	alertText = '请上传'+alertText
				// 	this.Aleart(alertText)
				// }else{
					console.log('待上传的影像id 报案所需----->>>',str)
					let cardNum = 0/*申请人身份证照片数量*/
					let hodNum = 0/*被保险人身份证照片数量*/
					if(this.fileImges.length>0){
						this.fileImges.forEach( item => {
							this.fileId+= item.id+','
							if(item.fileType == '2'){
								hodNum++
							}
							if(item.fileType == '3'){
								cardNum++
							}
						})
						this.fileId = this.fileId.substr(0,this.fileId.length-1)
					}else{
						this.fileId = 'new'
					}
					// if(cardNum!=2){
					// 	this.Aleart('申请人身份证照片必须上传正反面')
					// 	return false;
					// }
					// if(hodNum!=2 && this.insuredidtype == '11') {
					// 	this.Aleart('被保险人身份证照片必须上传正反面')
					// 	return false;
					// }
					console.log(this.fileId)
					this.SetfileImgList(str)
					this.SetPolicyState('4')
					alert_n22.confirm('提示', '共上传'+this.fileImges.length+'张照片', '确定', '取消', (flag) => {
						this.$router.push('/settlement_details/data_affirm/'+this.fileId)
					})
				// }	
			},
			getData() {/*分步获取（标准哪些上传了，哪些没上传）*/
				let requ = {
					data: {
						claimId:this.policyCode,
						claimType:"0",
						step:"3"
					},
					modelName: "claimService",
					methodName: "getClaimInfo"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log('分步获取----->>>',body)
					if(body.data.code == 0){
						this.insuredidtype = body.data.claim.insured.insuredidtype//出险人证件类型
						console.log(this.insuredidtype )
						this.fileImges = body.data.claim.imageFiles
						if(body.data.claim.imageFiles){
							let arr = body.data.claim.imageFiles
							console.log(arr)
							this.UpLoadList.forEach( (item,index) =>{
								arr.forEach(tpl => {
									if(tpl.fileType == item.key){
										item.isShow = true
									}
								})
							})
						}
					}
				})
			},
			getInitData() {
				let requ = {
					data:{
						"getDutyKind":this.$route.params.type
					},
					modelName: "claimService",
					methodName: "claimFileType"
				}
				console.log(requ)
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(body)
					console.log(header)
					if(body.data.code == 0){
						let arr = body.data.allUploadFileType.split(',')
						this.NecessaryList = body.data.mustUploadFileType.split(',')
						this.UpLoadList.map( v=> {
							v.urlShow = false
							arr.map( t=>{
								if(v.key == t){
									v.urlShow = true
								}
							})
						})
						this.getData()
					}
				})
			},
			goToImg(id){
				console.log(id)
				this.SetnewPolicyType(this.$route.params.type)
				this.$router.push('/settlementUploadImg/'+id)
			}
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
.set-upload span,
.set-upload-1 span{
	font-size:.8rem!important;
}
.set-upload .sel-div-last{
	border:none;
	margin:1rem 0 2rem 0;
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
</style>