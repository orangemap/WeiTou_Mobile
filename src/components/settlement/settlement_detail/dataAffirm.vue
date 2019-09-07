<template>
	<div class='data-affirm'>
		<p class='title' style='border-top:none'>出险人信息</p>
		<div class='data-affirm-div'>
			<div class='flex'>
				<p>{{insuredData.insuredname}}</p>
				<p>{{insuredData.insuredsex =='0'?"男":'女'}}</p>
				<p>{{insuredData.insuredidexpdate}}</p>
			</div>
			<p>证件类型：{{zjText(insuredData.insuredidtype)}}</p>
			<p>证件号码：{{insuredData.insuredidno}}</p>
		</div>
		<p class='title' v-show='linkMans.length>0'>联系人信息</p>
		<div class='flex h-2 data-affirm-div' v-for='item in linkMans' style='width:73%' v-show='linkMans.length>0'>
			<p>{{item.linkname}}</p>
			<p>{{item.relation | ralationFilter}}</p>
			<p>{{item.linksex == '0'?'男':'女'}}</p>
			<p>{{item.linktel}}</p>
		</div>
		<p class='title'>报案人信息</p>
		<div class='flex h-2 data-affirm-div' style='width:70%'>
			<p>{{insuredData.rptorname}}</p>
			<p>{{insuredData.rptorsex=='0'?'男':'女'}}</p>
			<p>{{insuredData.rptormobile}}</p>
		</div>
		<p class='title'>出险信息</p>
		<div style='margin-bottom:2.5rem'  class='data-affirm-div'>
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
		</div>
		<div class='foot-btn data-affirm-div'>
			<button @click='close'>取消报案</button>
			<button @click='Next'>立即报案</button>
		</div>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement/index.js'
	import Alert from '@/components/policy/common/alert'
	import myaddress from '@/../static/dict/pre_code.json'
	export default {
		components:{Alert},
		data() {
			return {
				insuredData:{},/*出险人、报案人信息*/
				accidentInfo:{},/*出险信息*/
				linkMans:[],/*联系人信息*/
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
				{code:'01',text:'门诊治疗中'},
				{code:'02',text:'住院治疗中'},
				{code:'03',text:'静休恢复中'},
				{code:'04',text:'痊愈'},
				{code:'05',text:'残疾'},
				{code:'06',text:'死亡'}
				],
				thisPolicyType:'',
				policyList:[]
			}
		},
		computed: {
			...mapState(['policyState','policyCode','newPolicyType','fileImgList'])
		},store,
		mounted() {
			this.SetPolicyState(4)
			console.log(this.policyCode)
			console.log(this.$route.params.fileId)
			this.getInitData()
			console.log('待上传的影像id----->>>',this.fileImgList)
		},
		methods: {
			...mapMutations(['SetPolicyState','SetnewPolicyType']),
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
			close() {
				alert_n22.confirm('提示', '是否取消报案?', '确定', '取消', (flag) => {
					this.$router.push('/settlement')
				})
			},
			Next() {
				let requ = {
					data: {
						claimsId: this.policyCode,
						fileImgList: this.$route.params.fileId == 'new'?"":this.$route.params.fileId,
						handleType: "addReport"
					},
					modelName: "claimService",
					methodName: "reportCase"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(body)
					console.log(header)
					if(body.data.code != 0){
						this.Aleart(body.data.msg)
					}else{
						alert_n22.confirm('提示','报案成功', '确定', '', (flag) => {
							this.$router.push('/settlement')
						})
					}
				})
			},
			getInitData() {
				let requ = {
					"data": {
						"claimId":this.policyCode,
						"claimType":"0",
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
						this.accidentInfo = body.data.claim.accidentInfo/*出险信息*/
						this.accidentInfo.accidentMode.forEach( item => {
							if(item.isselected == '1'){
								this.thisPolicyType += item.reasoncode+','
							}
						})
						let newCodeArr = this.codeText(this.accidentInfo.accidentprovince,this.accidentInfo.accidentcity,this.accidentInfo.accidentcounty)
						this.accidentInfo.accidentprovinceText = newCodeArr[0]
						this.accidentInfo.accidentcityText = newCodeArr[1]
						this.accidentInfo.accidentcountyText = newCodeArr[2]
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
						/*联系人数据*/
						if(body.data.claim.linkMans && body.data.claim.linkMans.length>0){
							this.linkMans = body.data.claim.linkMans
							this.linkMans.forEach( (item,index) => {
								if(item.linkname == '' && item.linktel == ''){
									this.linkMans.splice(index,1)
								}
							})
						}
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
			}
		}
	}
</script>

<style>
.data-affirm .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.data-affirm p{
	font-size: .9rem;
}
.data-affirm>.title{
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
.data-affirm>.data-affirm-div{
	padding:0 10px;
}
.data-affirm>div p{
	min-height:1.5rem;
	line-height: 1.5rem;
	font-size:.8rem;
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
</style>