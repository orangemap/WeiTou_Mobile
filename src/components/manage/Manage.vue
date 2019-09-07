<template>
	<div id="manage-content">
		<Headerbtns :title="'产品详情'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<!-- <loading v-show="loading"></loading> -->
		<div class="manage-main-contents">
			<div class="manage-main-content_1">
				<ul>
					<li class="manage-caozuo">
						<p>
							<span @click="popupAccordion = !popupAccordion">
								<img src="../../assets/img/manage/add.png" height="17" width="18">
								<span>新增</span>
							</span>
							<span @click="search">
								<img src="../../assets/img/manage/search.png" height="18" width="19">
								<span>查询</span>
							</span>
							<span @click="resert">
								<img src="../../assets/img/manage/resert.png" height="18" width="20">
								<span>重置</span>
							</span>
						</p>
					</li>
					<li class="product-name">
						<span class="product-title">产品名称</span>
						<!-- <span><input type="text" name="" v-model="productName"/></span> -->
						<select v-model="productSelected" @change="productSelectValue($event)">
							<option v-for="item in productOpt"
							:disabled="item.proCode==''"
							:value="item.proCode">
								{{item.proText}}
							</option>
						</select>
					</li>
					<li class="policyholder-names">
						<span class="product-title">投保人姓名</span>
						<input type="text" name="" v-model="holderName"/>
					</li>
					<li class="policyholder-names">
						<span class="product-title">被保人姓名</span>
						<input type="text" name="" v-model="policyHolderName"/>
					</li>
					<li class="manage-data">
						<span class="product-title">制作日期</span>
						<p class="manage-data-begin" @click="setDate">
							<label class="begin">
								{{date1 | dateFilterYear}}
							</label>
							<i class="fa fa-calendar"></i>
						</p>
						<p class="manage-data-to">至</p>
						<p class="manage-data-end" @click="setDate2">
							<label class="end">
								{{date2 | dateFilterYear}}
							</label>
							<i class="fa fa-calendar"></i>
						</p>
					</li>
					<li class="manage-pdf">
						<span class="product-title">是否生成PDF</span>
						<!-- <span class="manage-yes" 
							v-for="item in datas" 
							v-bind:class="{'active':activeName == item}" 
							@click="changeIndex(item)">{{item.text}}</span> -->
						<mt-switch v-model="yes_or_no" @change="turn"
						style="position: relative;">
							<label style="font-size: 14px;color: #FFF;font-weight:bold;
							position: absolute;left:5px;bottom: 4px;">{{yes_or_no_num == "Y"?'是':''}}</label>
							<label style="font-size: 14px;color: #FEB101;font-weight:bold;
							position: absolute;left:35px;bottom: 4px;">
							{{yes_or_no_num == "N"?'否':''}}</label>
						</mt-switch>
					</li>
				</ul>
			</div>
			<div class="manage-main-content_2">
				<table>
					<thead>
						<tr>
							<th style="width: 40%;text-align: left;padding-left:20px;">产品名称</th>
							<th style="width: 15%;">投保人</th>
							<th style="width: 15%;">被保人</th>
							<th style="width: 25%;">制作日期</th>
						</tr>
					</thead>
				</table>
				<table v-for="(item,index) in proList">
					<tbody>
						<tr style="width: 43%;text-align: left;padding-left:5px;">
							{{item.productName}}		
						</tr>
						<tr style="width: 15%">
							{{item.holderName}}
						</tr>
						<tr style="width: 15%">
							{{item.insureName}}
						</tr>
						<tr style="width: 25%">{{item.makeTime}}</tr>
					</tbody>
					<tfoot>
						<tr @click="msgDelete(item,index)">
							<i class="fa fa-trash-o" style="color: #C3141B;font-size:25px;margin-right: 20px;"></i>
						</tr>
						<tr @click="toManage(item)">
							<i class="fa fa fa-pencil" style="color: #FEB101;font-size:25px;margin-right: 20px;"></i>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
		<!-- 险种选择弹出框 -->
		<mt-popup v-model="popupAccordion" position="center" style="width: 80%;height: 200px;background: #FFF;border-radius:20px;">
			<mt-header title="险种选择" fixed 
			style="border-radius: 20px 20px 0 0;background: #0C3073;color: #FFF;">
      		</mt-header>
			<div class="policy-choose">
				<select v-model="selected" @change="selectValue($event)">
					<option v-for="item in opt" 
						:disabled="item.code==''"
						:value="item.code">
						{{item.text}}
					</option>
				</select>
			</div>
			<div class="button">
				<div @click="popupAccordion = !popupAccordion">
					<mt-button id="button-cancel">取消</mt-button>	
				</div>
				<div @click="goAddManage">
					<mt-button id="button-sure">确认</mt-button>					
				</div>
			</div>
		</mt-popup>
		<!-- 删除弹出框 -->
		<!-- <mt-popup v-model="popupDelete" position="center" style="width: 80%;height: 200px;background: #FFF;border-radius:20px;">
			<mt-header title="删除计划书" fixed style="border-radius: 10px 10px 0 0;">
			</mt-header>
			<div class="policy-choose">
				<span style="color:#999">确定删除建议书吗？</span>
			</div>
			<div class="button">
				<div @click="popupDelete = !popupDelete">
					<mt-button id="button-cancel">取消</mt-button>	
				</div>
				<div>
					<mt-button id="button-sure">确认</mt-button>					
				</div>
			</div>
		</mt-popup> -->
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import Headerbtns from '../common/Header.vue'
	export default{
		name:'manage',
  		components: {Headerbtns},
		data () {
	    return {
	      loading:false,
	      M:{},
	      alert:this.M,
	      datas:[
	      	{code:"Y",text:"是"},
	      	{code:"N",text:"否"}
	      ],
	      date1:'',//制作日期开始
	      date2:'',//制作日期结束
	      bj_date1:'',
	      bj_date2:'',
	      activeName:'',
	      popupAccordion:false,
	      popupDelete:false,
	      productSelected:'',
	      selected:'',
	      opt:[
	      	{code:'',text:'请选择险种'},
	      	{code:'LBT029',text:'关爱永逸2018'},
	      	{code:'NPT006',text:'安鑫福年金保险'}
	      ],
	      productOpt:[
	      	{proCode:'',proText:'请选择险种'},
	      	{proCode:'LBT029',proText:'关爱永逸2018'},
	      	{proCode:'NPT006',proText:'安鑫福年金保险'}
	      ],
	      optionsValue:'',
	      productOptionsValue:'',
	      policyName:'',
	      productName:'',//产品名称
	      holderName:'',//投保人姓名
	      policyHolderName:'',//被保人姓名
	      pdfId:'',
	      AllProList:[],
	      proList:[],
	      yes_or_no_num:"N",
	      yes_or_no:false
	    }
	  },
	  beforeMount(){
	  	let nowTime = new Date()
	  	console.log(nowTime.getFullYear())
	  	var month = nowTime.getMonth()+1
	  	console.log(month)
	  	console.log(nowTime.getDate())
	  	this.date1 = nowTime.getFullYear() + '-' + month + '-' + nowTime.getDate() + 'T00:00:00.000Z'
	  	this.date2 = nowTime.getFullYear() + '-' + month + '-' + nowTime.getDate() + 'T00:00:00.000Z'
	  	console.log(this.date1 + ',' + this.date2)
	  },
	  mounted(){
	  	window.localStorage.removeItem('addManage')
	  	window.localStorage.removeItem('editList')
	  },
	  methods:{
	  	changeIndex:function(item){
	  		this.activeName = item;
	  		for(var i in this.datas){
	  			if (item.text == this.datas[i].text) {
	  				this.isBuild = this.datas[i].code
	  				console.log("是否生成PDF:" + this.isBuild)
	  			}
	  		}
	  		console.log(parseInt(Math.random(1,10)*10000000000000000));
	  	},
	  	turn: function(){
			console.log(this.yes_or_no);
			if (this.yes_or_no) {
				this.yes_or_no_num = "Y"
				console.log(this.yes_or_no_num + ':是')
			}else if(!this.yes_or_no){
				this.yes_or_no_num = "N"
				console.log(this.yes_or_no_num + ':否')
			}
		},
	  	toggleLoading(show = true) {
        	this.loading = show
        },
	  	search:function(){
	  		this.proList = []
	  		var beginVal = $('.begin').html().trim()
	  		var endVal = $('.end').html().trim()
	  		console.log(new Date(beginVal).getTime() + ',' + new Date(endVal).getTime())
	  		this.dateSub = new Date(beginVal).getTime() - new Date(endVal).getTime()
	  		console.log(this.dateSub)
	  		if(this.dateSub > 0){
	  			MessageBox({
				  title: '提示',
				  message: '开始时间不能大于结束时间，请重新选择！'
				});
	  		}else if(this.dateSub <= 0){
		  		let requ = {
		  			"proposal": {
		  				"isbuild": this.yes_or_no_num,
	                    "zyzh": "1100D12336",
	                    "netWorkCode": "1200000487",
	                    "productCode": this.productOptionsValue,
	                    "holderName": this.holderName,
	                    "insureName": this.policyHolderName,
	                    "startDay": this.date1,
	                    "endDay": this.date2
	                }
		  		}
		  		utils.http.post('PROPOSALLIST',requ).then(response => {
					console.log(response.data)
					console.log(response.data.header)
					console.log(response.data.response)
					let project = response.data.response
					let showArray = project.proposal
					console.log(showArray)
					if(showArray.length <= 0){
						MessageBox({
						  title: '提示',
						  message: '没有查询到相关数据！'
						});
					}
					for(var i in showArray){
						console.log(showArray[i])
						this.AllProList.push(showArray[i])
						console.log(this.AllProList)
						for(var j in showArray[i].productList){
							showArray[i].productList[j].makeTime = showArray[i].makeTime
							showArray[i].productList[j].pdfid = showArray[i].pdfid
							showArray[i].productList[j].holderName = showArray[i].holderName
							showArray[i].productList[j].insureName = showArray[i].insureName
							this.pdfId = showArray[i].productList[j].pdfid
							if(showArray[i].productList[j].ismain == "1"){
								this.proList.push(showArray[i].productList[j])
								console.log(this.proList)
							}
						}
					}					
				}).catch(error => {
					
				})
			}
	  	},
	  	msgDelete:function(item,index){
	  		console.log(item)
	  		console.log(index)
			let requ = {
				"proposal": {
                    "zyzh": "1100D12336",
                    "netWorkCode": "",
                    "pdfid": item.pdfid
                }
			}
			utils.http.post('PROPOSALDELETE',requ).then(response => {
				console.log(response.data)
				console.log(response.data.header)
				console.log(response.data.response)
				let project = response.data.response
				let projectHead = response.data.header
				this.proList.splice(index,1)
				let newArr = this.proList
				console.log(newArr)
				if(projectHead.responseCode == 1){
					MessageBox({
					  title: '提示',
					  message: projectHead.errorMessage
					});
				}else if(projectHead.responseCode != 1){
					console.log('....................')
					console.log("保单：" + item.pdfid + "删除成功");
					MessageBox({
					  title: '提示',
					  message: "建议书删除成功！"
					});
				}
			}).catch(error => {

			})		
	  	},
	  	setDate:function(){
	  		this.$calendar.show({
	  			year:[1925,2080],
	  			date:this.date1,
	  			onOk:(date)=>{
	  				this.date1 = date
	  				// let newtime = this.date1.split('T')[0]
	  				// let splittime = newtime.split('-')[1]
	  				// if (splittime < 10) {
	  				// 	splittime = '0' + splittime
	  				// }
	  				// let othsplittime = newtime.split('-')[2]
	  				
	  				// if (othsplittime < 10) {
	  				// 	othsplittime = '0' + othsplittime
	  				// }
	  				// this.date1 = newtime.split('-')[0] + '-' + splittime + '-' +othsplittime + 'T00:00:00.000Z'
	  				//let bj_date1 = newtime.split('-')[0] + '-' + splittime + '-' +othsplittime
	  				let bj_date1 = this.date1
	  				console.log(new Date(bj_date1).getTime())
	  				this.bj_date1 = new Date(bj_date1).getTime()
	  			},
	  			onCancel:()=>{
	  				console.log('关闭')
	  			}
	  		})
  		},
	  	setDate2:function(){
	  		this.$calendar.show({
	  			year:[1925,2080],
	  			date:this.date2,
	  			onOk:(date)=>{
	  				this.date2 = date
	  				// let newtime = this.date2.split('T')[0]
	  				// let splittime = newtime.split('-')[1]
	  				// if (splittime < 10) {
	  				// 	splittime = '0' + splittime
	  				// }
	  				// let othsplittime = newtime.split('-')[2]
	  				// if (othsplittime < 10) {
	  				// 	othsplittime = '0' + othsplittime
	  				// }
	  				// this.date2 = newtime.split('-')[0] + '-' + splittime + '-' +othsplittime + 'T00:00:00.000Z'
	  				// let bj_date2 = newtime.split('-')[0] + '-' + splittime + '-' +othsplittime
	  				let bj_date2 = this.date2
	  				console.log(new Date(bj_date2).getTime())
	  				this.bj_date2 = new Date(bj_date2).getTime()
	  			},
	  			onCancel:()=>{
	  				console.log('关闭')
	  			}
	  		})
  		},
	  	selectValue(event){
	  		this.optionsValue = event.target.value;
	  		console.log(this.optionsValue);
	  	},
	  	productSelectValue(event){
	  		this.productOptionsValue = event.target.value;
	  		console.log(this.productOptionsValue);
	  	},
	  	goAddManage:function(){
	  		if(this.selected == null || this.selected == ''){
	  			MessageBox({
				  title: '提示',
				  message: '您当前没有险种，请选择！'
				});
	  		}else{
	  			this.$router.push({
		  			path:"/manage/addmanage",
		  			name:"addmanage",
		  			params:{
		  				policyName:this.optionsValue
		  			}
		  		})
	  		}
	  	},
	  	toManage:function(item){
	  		console.log(item)
	  		for(var i in this.AllProList){
	  			if(item.pdfid == this.AllProList[i].pdfid){
	  				var editList = this.AllProList[i]
	  				console.log(editList)
	  				window.localStorage.setItem("editList",JSON.stringify(editList));
	  				this.$router.push("/manage/addmanage")
	  			}
	  		}
	  	},
	  	resert:function(){
	  		this.productName = ''
	  		this.holderName = ''
	  		this.policyHolderName = ''
	  		this.date1 = new Date()
	  		this.date2 = new Date()
	  		this.activeName = ''
	  		this.productSelected = ''
	  	}
	  }
	}
</script>

<style lang="scss" scoped type="text/css">
	select{
		background:url("../../assets/img/common/jiantou.png") no-repeat scroll right center;
		background-size: 15px 20px;
	}
	.mint-msgbox{
		background: red !important;
	}
	.product-title{
		display: inline-block;
		float:left;
		width: 102px;
		line-height: 32px;
		text-align: right;
		margin-right: 10px;
	}
	.back{
			display: block;
			height: 100%;width: 100%;
			position: relative;
			img{
				position: absolute;
				top: 50%;left: 50%;
				margin-top: -10px;
				margin-left: -20px;
			}
		}
	.fa{
		color: #FDB92C;
	}
	.fa-angle-left{
		display: inline-block;
		width: 100%;height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	#manage-content .mint-header{
		font-size: 18px;
		color: #E51C23;
		background: #12294A;
		font-weight: bold;
	}
	input{
			display: inline-block;
			float: left;
			border:1px solid #BBBBBB;
			border-radius:5px;
		}
	.manage-main-contents{
		width: 100%;height: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;
		background: #F5F5F5;
		.manage-main-content_1{
			width: 100%;
			margin: auto;
			float: left;
			border-bottom: 1px solid #A3A2A2;
			margin-bottom: 10px;
			background: #FFF;
			ul{
				width: 100%;height: 100%;
				li{
					float: left;
					width: 100%;height: 32px;
					font-weight:bold;
					span{
						font-weight:bold;
						font-size: 16px;
						color: #2E4360;
					}
				}
				.product-name{
					margin-top: 12px;
					select{
						width: 55%;height: 32px;
						border-radius:8px;
						padding-left:5px;
					}
				}
				.policyholder-names{
					width: 100%;height: 32px;
					margin-top: 12px;
					input{
						width: 53%;height: 30px;
						border-radius:8px;
						padding-left:5px;
						border:1px solid #E7A545;
					}
				}
				.manage-data{
					width: 100%;height: 32px;
					margin-top: 12px;
					.manage-data-begin{
						height: 30px;width: 27%;
						float: left;
						border:1px solid #E7A545;
						border-radius: 8px;
						line-height: 30px;
						position: relative;
						.begin{
							font-size:14px;
						}
						.fa-calendar{
							position: absolute;
							top: 5px;
							right:3px;
							color: #FEC134;
						}
					}
					.manage-data-to{
						float: left;line-height: 30px;
						padding: 0 3px;
					}
					.manage-data-end{
						float: left;
						height: 30px;width: 27%;
						border:1px solid #E7A545;
						border-radius: 8px;
						line-height: 30px;
						// padding-right: 12px;
						position: relative;
						.end{
							font-size:14px;
						}
						.fa-calendar{
							position: absolute;
							top: 5px;
							right:3px;
							color: #FEC134;
						}
					}
				} 
				.manage-pdf{
					width: 100%;height: 32px;
					line-height: 22px;
					margin-top: 12px;
					margin-bottom:12px;
					overflow: hidden;
					.manage-yes,.manage-no{
						display: inline-block;
						width: 21px;height: 20px;
						line-height: 20px;
						border:1px solid #12294A;
						border-radius:50%;
						font-size: 14px;
						margin-right:20px;
						text-align: center;
						margin-top: 5px;
					}
				}
				.manage-caozuo{
					float: right;
					width: 100%;height: auto;
					text-align: right;
					background: #F5F5F5;
					margin-top:0;
					p{
						float: right;
						height: 25px;
						padding:12px;
						display: inline-block;
						span{
							margin-right: 10px;
						}
						img{
							display: inline;
						}
					}
				}
			}
		}
		.manage-main-content_2{
			width: 100%;
			float: left;
			table{
				display: inline-block;
				width: 100%;
				thead{
					width: 100%;height: 47px;
					background: #FEB101;
					display: inline-block;
					line-height: 47px;
					color: #FFF;
					font-size: 14px;
					tr{
						width:100%;height: 100%;
						display: inline-table;
					}
				}
				tbody{
					width: 100%;height: 55px;
					background: #FFF;
					display: flex;
					overflow: hidden;
					position: relative;
					tr{
						margin-top: 10px;
						color: #12294A;
					}
				}
				tfoot{
					display: block;
					width: 100%;height: 40px;
					line-height: 45px;
					border-bottom: 1px solid #A3A2A2;
					background: #F5F5F5;
					tr{
						float: right;
					}
				}
			}
		}
	}
	#manage-content{ 
		.policy-choose{
			width: 100%;height: 100px;
			border-bottom:1px solid #CCC;
			position: absolute;
			top: 41px;
			text-align: center;
			line-height: 90px;
			select{
				width: 70%;height: 40px;
				border-radius: 15px;
				padding-left: 10px;
				font-size:16px;
			}
		}
		.button{
			width: 85%;
			position: absolute;
			bottom: 8px;
			padding: 0 20px;
			text-align: center;
			div{
				float: left;
				width: 50%;
			}
			.mint-button{
				padding: 0 20px;
			}
			#button-sure,#button-cancel{
				background-color: #FEB101;
				color: #FFF;
			}
		}
	}
	.manage-pdf .manage-yes.active{color: #E51C23}
</style>