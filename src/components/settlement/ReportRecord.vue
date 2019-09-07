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
				<div style='width:100%;' class='flex' v-if='titleType=="2"'>
					<div @click='hideday'>
						<date-picker v-model="startData" style="width:65%;display:inline-block;text-align:right;float: right;"></date-picker>
					</div>
					<p style="flex:1;text-align: center;">至</p>
					<div @click='hideday'>
						<date-picker v-model="endData" style="width:65%;display:inline-block;text-align:right;float: right;"></date-picker>
					</div>
				</div>
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
				<div v-for='(item,index) in detailList' v-if='!show && detailList.length>0'>
					<div :class='[item.open==false?"flex title border-none":"flex title"]'>
						<div class='flex'>
							<p class='num'>{{index+1}}</p>
							<p style='width:6.5rem;padding-left:5px;'>出险人：{{item.insured.insuredname}}</p>
						</div>
						<div class='flex'>
							<p v-if='item.iscommit=="1"' style='font-size:.9rem;color:#e4393c;font-weight: bold;'>已提交</p>
							<p v-if='item.iscommit=="0"' style='font-size:.9rem;color:#e4393c;font-weight: bold;'>未提交</p>
							<img :src="item.url" @click='toggleShow(item.id)'>
						</div>
					</div>
					<div class='list-content' v-show='item.open'>
						<div class="flex" style="min-height:2rem">
							<div v-if='item.claimsLinkManList!="" && item.claimsLinkManList[0].linkname!=""'>
								<p>联系人：{{item.claimsLinkManList[0].linkname}}</p>
								<p v-if='item.claimsLinkManList[0].relation=="30"'>与出险人关系：{{item.claimsLinkManList[0].relation | ralationFilter}}({{item.claimsLinkManList[0].othermsg}})</p>
								<p v-else>与出险人关系：{{item.claimsLinkManList[0].relation | ralationFilter}}</p>
							</div>
							<p v-else>无联系人数据</p>
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
				<div v-for='(item,index) in detailList' v-if='show && item.show && detailList.length>0'>
					<div class='flex title'>
						<div class='flex'>
							<p class='num'>{{index+1}}</p>
							<p>出险人：{{item.customer.customerName}}</p>
						</div>
						<div class='flex'>
							<p>{{item.rptAcceptComName}}</p>
							<img :src="item.url" @click='toggle2Show(item.rptNo)'>
						</div>
					</div>
					<div class='list-content' v-show='item.open'>
						<div class='flex'>
							<div>
								<p>报案号：{{item.rptNo}}</p>
								<p>报案受理机构：{{item.rptComCode}}</p>
							</div>
							<button v-if='item.rptType=="光速保报案" && item.rgtNo == ""' @click='goToNotice(item.rptNo)'>理赔申请</button>
							<p style='width:10px' v-else></p>
						</div>
						<div class='flex'>
							<div>
								<p>报案日期：{{item.rptDate}}</p>
								<p>关联赔案号：{{item.rgtNo}}</p>
							</div>
							<button @click='goToupload(item)' v-if='item.rptType=="光速保报案" && item.rgtNo == ""'>资料补传</button>
							<p style='width:10px' v-else></p>
						</div>
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
	import Alert from '@/components/policy/common/alert.vue'
	import datePicker from '@/components/common/DatePicker.vue'
	export default {
		components:{Headerbtns,Alert,datePicker},
		data() {
			return {
				typeList:[
				{key:"0",text:'未成功申请记录查询',active:true},
				{key:"1",text:'已报案记录查询',active:false},
				],
				headerText:'报案记录查询',
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
				startData:'请选择',
				endData:'请选择',
				searchName:'',
				timer:''
			}
		},
		mounted() {
			this.media.header($('.report-content'))
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
			this.getInitData('0','')
			this.timer = setInterval(() =>{
				$('.mbsc-dt-whl-d').css('display','none')
			},100)
		},
		methods: {
			hideday() {
				$('.mbsc-fr .mbsc-dt-whl-d').css('display','none!important')
			},
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
								this.Aleart('删除报案成功')
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
					this.$router.push('/settlement_details/settlement_user/'+id)
				}
			},
			getInitData(type,name) {
				this.detailList = []
				let requ = {
					data:{
						agentCode: utils.cache.get('personsal').agentCode,/*代理人*/
						caseStatus: type,/*查未完成0，或已完成1报案*/
						customerName: name?name:'',/*出险人姓名*/
						customerType: "01"/*01-出险人；02-报案人；03-代理人*/
					},
					modelName: "claimService",
					methodName: "reportCaseList"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(JSON.stringify(body))
					console.log(header)
					if(body.data.code == 0){
						this.detailList = body.data.reportList/*最外层数据*/
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
						console.log(this.detailList)
						if(type == '1'){
							this.detailList.forEach( item => {
								item.show = true
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
			goToupload(item) {
				this.$router.push('/settlementUploadList/'+item.rptNo)
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
					this.headerText = '报案记录查询'
					this.titleType = '1'
					this.show = false
				}else if(id == 1){
					this.headerText = '已报案记录查询'
					this.titleType = '2'
					this.show = true
				}
				this.searchName = ''
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
				this.detailList.map((v,index)=> {
					if(id == v.rptNo){
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
			getChildMsg(Data){
				this.dataRange = Data
				console.log(this.dataRange)
			},
			goToNotice(id) {
				this.$router.push('/settlement_notice/end/'+id)
			},
			SearchData() {
				console.log(this.titleType)
				if(this.titleType == '1'){
					this.getInitData('0',this.searchName)
				}else if(this.titleType == '2'){
					this.getInitData('1',this.searchName)
					// if(this.startData == '请选择' && this.endData != '请选择' || this.startData != '请选择' && this.endData == '请选择'){
					// 	if(this.startData == '请选择'){
					// 		this.Aleart('请选择要查询的起始时间')
					// 	}else if(this.endData == '请选择'){
					// 		this.Aleart('请选择要查询的结束时间')
					// 	}
					// }else if(this.endData<this.startData){
					// 	this.Aleart('结束时间应晚于起始时间')
					// }else if(this.startData == '请选择' && this.endData == '请选择'){
					// 	this.detailList.forEach( (item,index) => {
					// 		if(item.customer.customerName.search(this.searchName) != -1){
					// 			item.show = true
					// 		}else {
					// 			item.show = false
					// 		}
					// 		this.$set(this.detailList,index,item)
					// 	})
					// }else{
					// 	console.log(this.searchName)
					// 	this.detailList.forEach( (item,index) => {
					// 		item.newDate = item.rptDate.substring(0,7)
					// 		if(item.newDate<this.startData || item.newDate>this.endData){/*超出时间范围内*/
					// 			item.show = false
					// 		}else{
					// 			if(this.searchName == ''){
					// 				item.show = true
					// 			}else{
					// 				if(item.customer.customerName.search(this.searchName) != -1){
					// 					item.show = true
					// 				}else {
					// 					item.show = false
					// 				}
					// 			}
					// 		}
					
					// 		this.$set(this.detailList,index,item)
					// 	})
					// }
					console.log(this.detailList)
				}
				this.searchName = ''
			}
		},
		watch: {
			startData(){
				this.startData = this.startData.substring(0,7)
			},
			endData(){
				this.endData = this.endData.substring(0,7)
			},
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
			clearInterval(this.timer);  
			this.timer = null
		}
	}
</script>

<style>
.report-content{
	background:#f3f3f3;
}
.report-content .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.flex-end{
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.report-content>.title,
.report-content>.search{
	width:90%;
	margin: 0 auto;
}
.report-content>.search>div>div{
	width:45%;
	border:1px;
	background: #fff;
	border:1px solid #BCBABB;
	border-radius: 5px;
	height:2rem;
	display: flex;
	align-items: center;
}
.report-content>.search>div>div>.manage-data-begin{
	width:80%!important;
	margin:0 auto;
	display: flex!important;
	justify-content: space-between;
	align-items: center;
	height:1.8rem;
}
.report-content>.search>div>div>.manage-data-begin>.fa-calendar{
	font-size:1.2rem;
}
.report-content>.flex>p{
	margin:1rem auto;
	font-size:.9rem;
	width:50%;
	border:1px solid #feb101;
	height:2rem;
	line-height: 2rem;
	text-align: center;
}
.report-content>.flex>p:first-child{
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.report-content>.flex>p:last-child{
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
.report-content>.title>p{
	background: #fff;
	color:#feb101;
}
.active-text{
	background:#feb101!important;
	color: #fff!important;
}
.report-content .search{
	width:90%;
	margin-bottom:1rem;
}
.report-content .search>div{
	height:2rem;
	border-radius: 5px;
	box-sizing: border-box;
}
.report-content .search>div:last-child{
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
	width:1rem;
	height:1rem;
}
.report .report-content .report-list .title>div{
	width:41%;
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