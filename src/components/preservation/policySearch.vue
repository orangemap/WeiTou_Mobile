<template>
	<div>
		<Headerbtns :title="page_title">
			<div slot="left" class="back" @click="left">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class="details">
			<div style="width: 100%;overflow-x: hidden;">
				<div class='flexs sel-user-sel'>
					<date-picker v-model="startDay" style="box-sizing: border-box;border:1px solid #ccc;border-radius: 5px;height:2rem;width:33%;padding-left:5px;line-height: 2rem"></date-picker>
					<p style='width:20px;'>至</p>
					<date-picker v-model="endDay" style="fbox-sizing: border-box;border:1px solid #ccc;border-radius: 5px;height:2rem;width:32%;padding-left:5px;line-height: 2rem"></date-picker>
					<div class="btn-sel" @click="timeSear()">查询</div>
				</div>
				<div style="border-bottom: 4px solid #ccc;" v-for="(items,index) in edorInfoList">
					<div style="line-height: 2.5rem;padding: 0 2%;" class="">
						<div class='flexs flex-center'>
							<div class="flexs">
								<p class='num'>{{(items.id)+1}}</p>
								<p style='width:10.5rem;padding-left:5px;'>{{items.edorName}}</p>
							</div>
							<div class="flexs">
								<p>{{items.edorState | serverState}}</p>
								<p>
									<img :src="items.imgUrl" alt="" style='width:0.8rem;height:0.8rem' @click='toggleShow(items,items.id)'/>
								</p>
							</div>
						</div>
					</div>
					<div style="border-top: 1px dashed #BBB;" v-show="!items.expand">
						<div class='list-content'>
							<div class='flex'>
								<div >
									<p style="font-size: 0.7rem;">保单号：{{items.contNo}}</p>
									<p style="font-size: 0.7rem;">受理号：{{items.edorAcceptNo}}</p>
									<p style="font-size: 0.7rem;">申请日期：{{items.edorAppDate}}</p>
									<p style="font-size: 0.7rem;">支付状态：{{items.payGetState | moneyStaue}}</p>
									<p style="font-size: 0.7rem;">申请途径：{{items.appApproach | rootState}}</p>
								</div>
								<div style="display: flex;
    align-items: center;">
									<ul>
										<li style="line-height: 2rem;">
											<button v-if="items.edorState==0"  @click="down(items.edorNo)" style="font-size: 0.7rem;">保单批注函下载</button>
										</li>
										<li style="line-height: 2rem;">
											<button  v-if="items.payGetState==3&&(items.edorType=='AR'||items.edorType=='WT'||items.edorType=='CT')" @click="goToAccount(items.edorType,items.edorAcceptNo)" style="font-size: 0.7rem;">二次支付</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			<Alert ref="showalert"></Alert>
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
	const fillZero = value => {
		if(('' + value).length == 1) {
			value = '0' + value
		}
		return value
	}
	export default {
		name: 'preservationPolicyHolderChange',
		components: {
			Headerbtns,datePicker,Indicator,picker,Alert
		},
		data() {
			let date = new Date()
			let month = date.getMonth() + 1
			
			let lw = new Date(date - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
			let lastY = lw.getFullYear();
			let lastM = lw.getMonth()+1;
			let lastD = lw.getDate();
			return {
				page_title: '保全工单查询',
				isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				startDay: lastY+"-"+(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD),//三十天之前日期,
				endDay: date.getFullYear() + '-' + fillZero(month) + '-' + fillZero(date.getDate()),
				edorInfoList:'',
				expand:'static/img/comprehensive/bottom.png',
				edor:'',
				personsal:utils.cache.get('personsal'),
				whereFrom: 'pList',
				serverList:[
					{id:'IP',serverName:'追加保费',show:false},
					{id:'PC',serverName:'交费信息变更',show:false},
					{id:'CM',serverName:'客户资料变更(客户层)',show:false},
					{id:'LR',serverName:'保单补发',show:false},
					{id:'WT',serverName:'犹豫期退保',show:false},
					{id:'AR',serverName:'账户价值部分领取',show:false},
					{id:'TI',serverName:'账户转换',show:false},
					{id:'CP',serverName:'续期计划保险费变更',show:false},
					{id:'CS',serverName:'签名变更',show:false},
					{id:'AM',serverName:'客户联系方式变更',show:false},
					{id:'DB',serverName:'红利领取',show:false},
					{id:'BC',serverName:'受益人变更',show:false},
					{id:'GC',serverName:'保险金给付转账授权',show:false},
					{id:'AE',serverName:'投保人变更',show:false},
					{id:'CT',serverName:'退保',show:false},
					{id:'FM',serverName:'交费期间变更',show:false},
					{id:'EN',serverName:'续保方式变更',show:false},
					{id:'LN',serverName:'保单贷款',show:false},
					{id:'NS',serverName:'新增保障',show:false},
					{id:'PR',serverName:'保单迁移',show:false},
					{id:'PT',serverName:'减保',show:false},
					{id:'RE',serverName:'保单复效',show:false},
					{id:'TR',serverName:'垫交期交费',show:false},
					{id:'PU',serverName:'减额缴清',show:false},
					{id:'RF',serverName:'保单还款',show:false},
					{id:'XT',serverName:'协议退保',show:false},
					{id:'RB',serverName:'保全回退',show:false},
					{id:'AP',serverName:'保险费逾期未付选择权变更',show:false},
					{id:'LG',serverName:'保险金领取',show:false},
					{id:'BM',serverName:'红利领取方式变更',show:false},
					{id:'PM',serverName:'交费频率变更',show:false},
					{id:'PL',serverName:'保单挂失与挂失解除',show:false},
					{id:'PA',serverName:'账户选择权变更',show:false},
					{id:'HI',serverName:'补充告知',show:false},
					{id:'IC',serverName:'客户资料变更(保单层)',show:false},
					{id:'BJ',serverName:'保单冻结与冻结解除',show:false},
					{id:'GA',serverName:'年金领取方式及年金领取频率变更',show:false},
					{id:'MC',serverName:'满期后续保',show:false},
					{id:'PF',serverName:'投连万能保额调整',show:false},
					{id:'RT',serverName:'退还保险费',show:false},
					{id:'AB',serverName:'自动账户平衡',show:false},
					{id:'PB',serverName:'交纳续期保险费',show:false},
					{id:'BS',serverName:'保单银行质押贷款止付',show:false},
					{id:'BO',serverName:'保单银行质押贷款解付',show:false},
					{id:'BG',serverName:'银行质押保单行使质权',show:false},
					{id:'AG',serverName:'增额交清保险金现金价值提取',show:false},
					{id:'AT',serverName:'投诉通融退保退费',show:false},
					{id:'CD',serverName:'出单前撤件（历史）',show:false},
					{id:'AC',serverName:'年金转换权',show:false},
					{id:'HB',serverName:'年金受益人变更',show:false},
				],
				contNo:'',
			}
		},
		computed:{
			...mapState(['policyData']),
		},store,
		watch:{
			
		},
		mounted() {
			console.log(this.policyData)
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.contNo){//
					this.contNo=queryParams.contNo
				}
			}
			this.timeSearch()
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			...mapMutations(['SetpolicyData']),
			showModals(message) {
		        this.$refs.showalert.showMOdal(message)
		      },
			right() {
				this.stepSave()
			},  
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/preservation/preservationPolicySearch')
			},
			toggleShow(items,id){
//				console.log(items)
				this.edorInfoList[id].expand=!this.edorInfoList[id].expand
				if(items.expand == false) {
					items.imgUrl = 'static/img/comprehensive/top.png'
					//改数组
					this.$set(this.edorInfoList, id, items)
				} else if(items.expand == true) {
					items.imgUrl = 'static/img/comprehensive/bottom.png'
					this.$set(this.edorInfoList, id, items)
				}
			},
			timeSearch(startDate,endDate){
				let dateSub = new Date(this.startDay).getTime() - new Date(this.endDay).getTime()
				if(dateSub > 0) {
					this.showModals("开始时间不能大于结束时间，请重新选择！");
				} else if(dateSub <= 0) {
					let requ = {
						data: {
							"contNo":this.contNo,
							"custNo":'jdsajd',
					        "edorAppName":"dsdsssd",
					        "edorAppStarDate":this.startDay,
					        "edorAppEndDate":this.endDay
						},
						modelName: "conservationService",
						methodName: "taskQuery"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.ResponseCode==0){
							if(body.data.taskQuery.edorInfoList==''){
								this.edorInfoList=body.data.taskQuery.edorInfoList
								this.showModals("没有获取到数据");
							}else{
								this.edorInfoList=body.data.taskQuery.edorInfoList
								for(let i=0;i<this.edorInfoList.length;i++){
									this.edorInfoList[i].id=i
									this.edorInfoList[i].imgUrl='static/img/comprehensive/bottom.png'
									this.edorInfoList[i].expand=true
									this.edor=this.edorInfoList[i].edorType
									for(let j=0;j<this.serverList.length;j++){
										if(this.edor==this.serverList[j].id){
											this.edorInfoList[i].edorName=this.serverList[j].serverName
										}
									}
								}
							}
							
						}
					})
				}
			},
			timeSear(){
				this.timeSearch()
			},
			down(tpl){
				console.log(tpl)
				let host = window.globalConfig.rootUrl.split('/')[2]
				let protocol = window.globalConfig.rootUrl.split(':')[0]
				let LoadUrl = protocol+'://'+host+'/com.ifp.ipartner/edorPdf?EdorNo='+tpl+'&type=conservationEdorPdf'
				console.log(LoadUrl)
				let title
				utils.httpEdorPdf.get(tpl,'conservationEdorPdf').then(response => {
					console.log(response)
					if(response.success){
						console.log(response.message)
						title = '查询到保单批注函<br/>是否下载?'
						alert_n22.confirm('温馨提示',title,'下载','取消',(flag)=>{
							if(this.isiOS){
								var urlObj = {
									"url": LoadUrl
								}
								var urlStr = JSON.stringify(urlObj)
								var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
								//IOS升级
								MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
									alert(JSON.stringify(callbackSucc))
								}, function(callbackFail) {
									alert(callbackFail)
								});
							}else {
								console.log(LoadUrl)
								window.open(LoadUrl, '_system')
							}
						})
					}else{
						this.showModals(response.message);
						console.log(response.message)
					}
				})
			},
			goToAccount(tpl,tpp,tpc){
				if(tpl=='AR'){
					this.go('/preservation/preservationAccount?whereFrom='+this.whereFrom+'&connoTpp='+tpp+'&serverId='+tpl)
				}else if(tpl=='WT'||tpl=='CT'){
					this.go('/preservation/preservationSurrender?whereFrom='+this.whereFrom+'&connoTpp='+tpp+'&serverId='+tpl)
				}
				
			},
		},
	}
</script>

<style lang="scss" scoped type="text/css">
	.details .fa {
		color: #FDB92C;
	}
	
	.details .fa-angle-left {
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
			padding: 15px 0;
			.policy {
				margin-top: 15px;
			}
		}
	}
	.details .sel-user-sel{
	background: #F1F1F1;
	height:3rem;
	align-items: center;
	padding:0 1rem;
	justify-content: space-between;
	input{
		box-sizing: border-box;
		border:1px solid #ccc;
		border-radius: 5px;
		height:2rem;
		width:80%;
		padding-left:5px;
	}
}
	.details .user-list{
	padding:0 0.5rem;
	border-bottom:4px solid #ccc;
}
.details .flexs{
	display: flex;
	align-items: center;
}
.details .num{
	background: #feb101;
	color: #fff;
	border-radius: 50%;
	width:1.3rem;
	height:1.3rem;
	font-size:.8rem;
	text-align:center;
	line-height: 1.3rem
}
.details .btn-sel{
	background: #feb101;
	color: #fff;
	border-radius: 5px;
	outline: none;
	border:none;
	height:2rem;
	line-height: 2rem;
	width:18%;
	text-align: center;
}
.details .flex-center{
	justify-content: space-between;
}
	.flex {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	.photo {
	  display: block;
	  width: 100%;
	  line-height: 45px;
	  border: 0;
	  background: #fff;
	}
	.left {
		margin-left: 4%;
	}
	.right {
		margin-right: 4%;
		display: flex;
	    justify-content: flex-end;
	    align-items: center;
	}
	.info .fa-calendar {
    font-size: 1.2rem !important;
}
.details .list-content{
	margin-left:6%;
}
.details .list-content>div p{
	height:1.5rem;
	line-height: 1.5rem;
}
.details .list-content>div>div{
	/*width: 65%*/
}
.details .list-content button{
	margin-right:1rem;
	border:none;
	outline: none;
	background: #feb101;
	color:#fff;
	border-radius: 5px;
	height:1.5rem;
	width:6rem;
}
.details::-webkit-scrollbar {
	display:none
}
</style>