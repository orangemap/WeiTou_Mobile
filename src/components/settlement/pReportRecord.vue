<template>
	<div class='report'>
		<Headerbtns :title="headerText" class='sel-user-head'>
			<div slot="left" class="back" @click='goBack'><i class="fa fa-angle-left" ></i></div>
		</Headerbtns>
		<div class='report-content'>
			<div class='flex title'>
				<p v-for='item in typeList' :class="[item.active?'active-text':'']" @click='toggleType(item.key)'>{{item.text}}</p>
			</div>
			<div class='search' style='margin-top:-10px;'>
				<!-- <div style='width:100%;' class='flex' v-if='titleType=="2"'>
					<div>
						<date-picker v-model="startData" style="width:65%;display:inline-block;text-align:right;float: right;"></date-picker>
					</div>
					<p style="flex:1;text-align: center;">至</p>
					<div>
						<date-picker v-model="endData" style="width:65%;display:inline-block;text-align:right;float: right;"></date-picker>
					</div>
				</div> -->
				&nbsp;
				<div style='margin-top:0;background: #fff'>
					&nbsp;
					<input type="text" name="" placeholder='请输入出险人姓名查询' v-model='searchName'/>
					<img src="static/img/settlement/search.png" style='width:1.2rem;height:1.2rem' @click='SearchData()'>
					&nbsp;
				</div>
			</div>
			<div class='report-list'>
				<!-- 报案记录 -->
				<div v-for='(item,index) in detailList' v-if='!show'>
					<div :class='[item.open==false?"flex title border-none":"flex title"]'>
						<div class='flex'>
							<p class='num'>{{index+1}}</p>
							<p style='width:6.5rem;padding-left:5px;'>出险人：{{item.insured.insuredname}}</p>
						</div>
						<div class='flex'>
							<p style='font-size:.9rem;color:#e4393c;font-weight: bold;'>未提交</p>
							<img :src="item.url" @click='toggleShow(item.id)'>
						</div>
					</div>
					<div class='list-content' v-show='item.open'>
						<div class="flex" style="min-height:2rem">
							<div v-if='item.applicants!="" && item.applicants[0].accname!=""'>
								<p>申请人：{{item.applicants[0].accname}}</p>
								<p v-if='item.applicants[0].relationtoinsured=="30"'>与出险人关系：{{item.applicants[0].relationtoinsured | ralationFilter}}
								</p>
								<p v-else>与出险人关系：{{item.applicants[0].relationtoinsured | ralationFilter}}</p>
							</div>
							<p v-else>无申请人数据</p>
							<button @click='goToPolicy(item.id,2)'>继续填写</button>
						</div>
						<div class='flex'>
							<div>
								<p>出险类型：{{item.cxtype}}</p>
								<p>事故日期：{{item.cxdate}}</p>
							</div>
							<button @click='goToPolicy(item.id,1)'>删除</button>
						</div>
					</div>
				</div>
				<!-- 已报案 -->
				<div v-for='(item,index) in detailList' v-if='show'>
					<div class='flex title'>
						<div class='flex'>
							<p class='num'>{{index+1}}</p>
							<p v-if='item.customerInfo.customerName'>出险人：{{item.customerInfo.customerName}}</p>
						</div>
						<div class='flex'>
							<p  style='font-size:.9rem;color:#e4393c;font-weight: bold;'>{{item.caseStateName}}</p>
							<img :src="item.url" @click='toggle2Show(item.caseNo)'>
						</div>
					</div>
					<div class='list-content' v-show='item.open'>
						<div class='flex'>
							<div>
								<p>赔案号：{{item.caseNo}}</p>
								<p>理赔受理机构：{{item.caseComCode}}</p>
								<p>申请日期：{{item.applyDate}}</p>
								<p v-if="item.caseStateCode!='30'">理赔结果：{{item.caseResultName}}</p>
							</div>
							<p>
								<button v-if='item.caseStateCode == "50" && item.caseResultCode == "01"' @click='goToLoad(item)'>理赔详情</button>
								<button v-if='item.caseStateCode!="70" && item.caseStateCode!="50"' @click='goToUpload(item.caseNo)'>资料补传</button>
							</p>
						</div>
						<!-- <div class='flex'>
							<div>
								<p>申请日期：{{item.rptDate}}</p>
								<p>关联赔案号：{{item.rgtNo}}</p>
							</div>
							<button @click='goToupload(item.rptAccidentInfo.rptClaimTypeInfoList)'>资料补全</button>
						</div> -->
					</div>
				</div>
			</div>
		</div>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>

<script>
	import Headerbtns from '@/components/policy/common/Header'
    import '../policy/css/base.css'
	import Alert from '@/components/policy/common/alert'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement/index.js'
	// import datePicker from '@/components/common/DatePicker.vue'
	export default {
		components:{Headerbtns,Alert},
		data() {
			return {
				typeList:[
				{key:"0",text:'未成功申请记录查询',active:true},
				{key:"1",text:'已申请记录查询',active:false},
				],
				headerText:'理赔申请查询',
				detailList:[],
				titleType:'1',
				dataRange:[],
				childShow:false,
				show:false,
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
				// startData:'请选择',
				// endData:'请选择',
				// 05	报案登记
				// 10	报案确认
				// 15	录入
				// 20	立案
				// 25	小额理赔
				// 30	审核
				// 35	预付
				// 40	审批
				// 45	律师审批
				// 50	结案
				// 70	关闭
				searchName:''
			}
		},
		mounted() {
			this.media.header($('.report-content'))
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
			this.getInitData('0','')
		},
		computed: {
			...mapState(['compensate'])
		},store,
		methods: {
			...mapMutations(['Setcompensate']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			goToPolicy(id,index) {
				if(index == 1){
					alert_n22.confirm('提示','是否删除？', '确定', '取消', (flag) => {
						let requ = {
							data: {
								claimsId: id,
								fileImgList: "",
								handleType: "deleteReport"
							},
							modelName: "claimService",
							methodName: "reportCase"
						}
						console.log(id)
						console.log(this.detailList)
						utils.http.postFast('CusbusinessService',requ,(body,header) => {
							console.log(body)
							if(body.data.code == 0){
								this.Aleart('删除理赔记录成功')
								console.log(this.detailList)
								this.detailList.forEach((item,index)=>{
									if(item.id == id){
										this.detailList.splice(index,1)
									}
								})
								console.log(this.detailList)
							}
						})
					})
					
				}else if(index == 2){
					this.$router.push('/settlement_content/settlement_user/'+id)
				}
			},
			getInitData(type,name) {
				this.detailList = []
				let requ = {
					data:{
						agentCode:utils.cache.get('personsal').agentCode,
						customerName:name,
						startDate:"",
						endDate:"",
						caseStatus:type
					},
					modelName: "claimInformationService",
					methodName: "selectClaimInformation"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(body)
					console.log(header)
					if(body.data.code == 0){
						this.detailList = body.data.reportList/*最外层数据*/
						console.log(this.detailList)
						if(this.detailList && this.detailList.length>0){
							this.detailList.forEach( v=> {
								v.open = true
								v.url = 'static/img/preservation/fold.png'
								if(v.claimsAccidentinfo && v.claimsAccidentinfo.claimsAccidetntypeList.length>0) {
									let newArr = v.claimsAccidentinfo.claimsAccidetntypeList
									newArr.forEach( item => {
										if(item.acrossdate){
											v.cxdate = item.acrossdate
											this.PolicyType.forEach( c => {
												if(item.reasoncode == c.key){
													v.cxtype = c.text
												}
											})
										}
									})
								}
							})
						}
					}else{
						this.Aleart(body.data.msg)
					}
				})
			},
			policyTypeText(str) {
				let typeText = ''
				this.PolicyType.forEach( tpl => {
					if(str == tpl.key){
						typeText = tpl.text
					}
				})
				return typeText;
			},
			goToupload(list) {
				console.log(list)
			},
			toggleType(id){
				this.getInitData(id,'')
				this.typeList.map( v=> {
					v.active = false
					if(id == v.key){
						v.active = true
					}
				})
				if(id == 0){
					this.headerText = '理赔记录查询'
					this.titleType = '1'
					this.show = false
				}else if(id == 1){
					this.headerText = '已申请记录查询'
					this.titleType = '2'
					this.show = true
				}
			},
			toggleShow(id){/*显示隐藏详细数据*/
				console.log(this.detailList)
				this.detailList.map((v,index)=> {
					if(id == v.id){
						v.open = !v.open
						if(v.open){
							v.url = 'static/img/preservation/fold.png'
						}else{
							v.url = 'static/img/preservation/open.png'
						}
						this.$set(this.detailList,index,v)
					}
				})
			},
			toggle2Show(id) {
				console.log(id)
				this.detailList.map((v,index)=> {
					if(id == v.caseNo){
						v.open = !v.open
						if(v.open){
							v.url = 'static/img/preservation/fold.png'
						}else{
							v.url = 'static/img/preservation/open.png'
						}
						this.$set(this.detailList,index,v)
					}
				})
			},
			goBack(){
				this.$router.push('/settlement')
			},
			goToLoad(item) {
				console.log(item)
				if(item){
					let data = {
						user:{
							name:item.customerInfo.customerName,
							sex:item.customerInfo.customerSex,
							brakCode:item.customerInfo.customerIDNo,
							brakType:item.customerInfo.customerIDType,
							brakDate:item.customerInfo.customerIDEndDate,
						},
						policy:{
							policyList:item.conts,
						money:item.sumRealPay,//赔付金额
						newMoney:item.claimPay,//实际给付金额
						sendMoney:item.balancePay,//结算金额
						payList:item.payeeCustomers.payeeCustomer
					}
				}
				this.Setcompensate(data)
				this.$router.push('/settlementDetail/'+item.caseNo)
			}
			
		},
		goToUpload(id) {
			this.$router.push('/settlementUploadListAdd/'+id)
		},
		SearchData() {
			console.log(this.titleType)
			if(this.titleType == '1'){
				this.getInitData('0',this.searchName)
			}else if(this.titleType == '2'){
				this.getInitData('1',this.searchName)
			}
		}
	},
	beforeDestroy() {
		let htmlDOM = document.getElementsByTagName('html')[0]
		htmlDOM.style.fontSize = ''
	}
}
</script>

<style>
.report .report-content{
	background:#f3f3f3;
}
.report .report-content .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.report .flex-end{
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.report .report-content>.title,
.report .report-content>.search{
	width:90%;
	margin: 0 auto;
}
.report .report-content>.search>div>div{
	width:45%;
	border:1px;
	background: #fff;
	border:1px solid #BCBABB;
	border-radius: 5px;
	height:2rem;
	display: flex;
	align-items: center;
}
.report .report-content>.search>div>div>.manage-data-begin{
	width:80%!important;
	margin:0 auto;
	display: flex!important;
	justify-content: space-between;
	align-items: center;
	height:1.8rem;
}
.report .report-content>.search>div>div>.manage-data-begin>.fa-calendar{
	font-size:1.2rem;
}
.report .report-content>.flex>p{
	margin:1rem auto;
	font-size:.9rem;
	width:50%;
	border:1px solid #feb101;
	height:2rem;
	line-height: 2rem;
	text-align: center;
}
.report .report-content>.flex>p:first-child{
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.report .report-content>.flex>p:last-child{
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
.report .report-content>.title>p{
	background: #fff;
	color:#feb101;
}
.report .active-text{
	background:#feb101!important;
	color: #fff!important;
}
.report .report-content .search{
	width:90%;
	margin-bottom:1rem;
}
.report .report-content .search>div{
	height:2rem;
	border-radius: 5px;
	box-sizing: border-box;
}
.report .report-content .search>div:last-child{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width:100%;
	margin-left:.5%;
	border:1px solid #BCBABB;
}
.report .report-content .search>div:last-child>input{
	width:72%;
	outline: none;
}
.report .report-content .report-list{
	background: #fff;
}
.report .report-content .report-list>div{
	border-bottom:5px solid #ccc;
}
.report .report-content .report-list .title{
	border-bottom:1px dashed #ccc;
}
.report .report-content .report-list img{
	width:1.2rem;
	height:1.2rem;
}
.report .report-content .report-list .title>div{
	width:35%;
	padding:0 .5rem;
}
.report .report-content .report-list .title>div:last-child{
	width:25%;
}
.report .report-content .report-list .title div{
	height:2.2rem;
}
.report .report-content .report-list .title .num{
	background: #feb101;
	color: #fff;
	border-radius: 50%;
	width:1.3rem;
	height:1.3rem;
	font-size:.8rem;
	text-align:center;
	line-height: 1.3rem
}
.report .report-list .list-content{
	margin-left:12%;
}
.report .report-list .list-content>div{
	border-bottom:1px dashed #ccc;
}
.report .report-list .list-content>div p{
	height:1.5rem;
	line-height: 1.5rem;
}
.report .report-list .list-content>div>div{
	width: 65%
}
.report .report-list .list-content>div button{
	margin-right:1rem;
	border:none;
	outline: none;
	background: #feb101;
	color:#fff;
	border-radius: 5px;
	height:1.5rem;
	width:5rem;
}
.report>.mint-popup-bottom{
	width:100%;
	padding:0 1rem;
}
.report>.mint-popup-bottom .picker-item{
	font-size:.9rem;
}
.report .pieker-title{
	width:100%;
	background: #feb101;
	color: #fff;
	text-align: center;
	height:2rem;
	line-height: 2rem;
	font-size:1rem;
}
.report .pieker-footer{
	width:100%;
	display: flex;
	border-top:1px solid #ccc;
}
.report .pieker-footer>button{
	width:50%;
	box-sizing: border-box;
	height:2rem;
	border:none;
	background:#fff;
}
.report .pieker-footer>button:first-child{
	border-right: 1px solid #ccc;
}
.report .border-none{
	border:none!important;
}
.fa{
	color: #feb101;
}
</style>