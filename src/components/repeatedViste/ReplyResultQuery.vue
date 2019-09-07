<!-- 回复结果查询页面 -->
<template>
	<div style="background-color:#F5F5F5;font-size:12px">
		<Headerbtns :title="'回访记录'">
			<div slot="left" @click="goBack">
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<!--内容区域-->
	    <div class="manage-main-contents">
	      <ul class="mar-btm" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
	        <!--搜索区域-->
	        <li>
	          <ul style="padding:10px;background-color:#fff">
	            <li class="line-h f-flex">
	              <span>保单号</span>
	              <input class="ipt-border" style="width:70%" v-model='selectInfo.applyCodes' type="text" placeholder="请输入想要查询的保单号" >
	            </li>
	            <li class="line-h f-flex">
	              <span>投保人姓名</span>
	              <input class="ipt-border" v-model="selectInfo.holderNames" type="text" style="width:70%">
	            </li>
	            <li style="text-align:right;padding-top:5px">
	              <button class="btn bgcolor txtColor statu-p" @click="selectPolicy(2)">查询</button>
	              <button class="btn bgcolor txtColor statu-p" @click="clearInput">重置</button>
	            </li>
	          </ul>
	        </li>
	        <!--列表区域-->
	        <li class="ul-li" v-for="(item,index) in  succOrder" :key="index" v-if="item.status!='6'">
	          <div class="f-flex lh">
	            <span>{{item.policyCode}}</span>
	            <div>
	              	<button class="btn clear status-btn" v-if="item.trafficinsno==''">尚未回访</button>
					<button class="btn clear status-btn" v-if="item.trafficinsno==1">回访成功</button>
					<button class="btn clear status-btn" v-if="item.trafficinsno==2">回访问题件</button>
					<button class="btn clear status-btn" v-if="item.trafficinsno==3">回访不成功</button>
	            </div>
	          </div>
	          <div class=" bx-list dashed">
	            <p>投保险种：{{item.riskName}}</p>
	            <table style="width: 100%;">
				  <tr>
				    <th style="width: 50%;">投保人：{{item.holderName}}</th>
				    <th>被保人：{{item.insuredName}}</th>
				  </tr>
				</table>
	          </div>
	          <div style="line-height:25px;">
	            <i class="fa fa-clock-o" aria-hidden="true"></i>
	            <span>{{item.orderDate}}</span>
	            <button class="btn bgcolor txtColor rt-ft padd"  @click="goReturnDetail(item)">详情</button>
	          </div>
	        </li>
	        <li v-show="allSize2 == succOrder.length && succOrder.length>3">
	          <p style="text-align:center">我是有底线的！</p>
	        </li>
	        <li v-if="succOrder.length == 0">
	          <div style="line-height:100px;text-align:center">
	    		当前列表为空!
	          </div>
	        </li>
	      </ul>
	    </div>
    	<alert ref="showalert"></alert>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { MessageBox } from 'mint-ui'
	import { InfiniteScroll } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import alert from '../policy/common/alert.vue'
	import "../policy/css/base.css";
	export default {
	  name: 'replyResultQuery',
	  components: {Headerbtns,alert},
	  data(){
	  	return {
	        policyCode: '', //保单号
	        productArray:[],  //主险产品列表
	        isRepeatedVisted: true, //是否回访
	  		selectInfo:{
	  			holderName:'',  //投保人姓名
	  			applyCode:'', //投保单号
	  			productCode:'', //主险名称
	  			holderNames:'', //投保人姓名
	  			applyCodes:'',  //投保单号
	  			productCodes:'' //主险名称
	  		},
	  		number:1,
	  		index:1,
	  		number1:1,
	  		succOrder:[],
	  		unsuccOrder:[],
	  		allSize1:'',
	  		allSize2:'',
	  		array:"",
	  		array1:"",
	  		orderId:'', //支付传orderId获取信息
	  		agentCode:utils.cache.get('personsal').agentCode  //代理人编号
	  	}
	  },
	  created(){
	  	this.getOrderList(1,this.number);
	  	this.getOrderList(2,this.number1);
	  	this.productLists()
	  },
	  mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
      this.media.header($('.manage-main-contents'))
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
	  methods:{
	  	goBack(){
	  		let channel = utils.cache.get("personsal").channel
	  		if(channel == '02') {
				this.$router.push('/comprehensiveYinbao/comprehensiveInfo')
			}  else if(channel == '06') {
				this.$router.push('/comprehensiveXuqi/comprehensiveInfo')
			} else {
				this.$router.push('/comprehensiveGexian/comprehensiveInfo')
			}
	  	},
	  	//点击状态按钮更新
	  	statusChange(item,index){
			if(item.applyCode != ""){
				let requestParam = {
	                "order": {
	                    "agentCode": this.agentCode,
	                    "applyCodeList": [
	                        { "applyCode": item.applyCode}
	                        // {"applyCode": "M511387727975988"}/\
	                    ]
	                }
	            }
				utils.http.post('MOPOLICYSTATUE',requestParam).then(response=>{
					let projectHead = response.data.header
					if(projectHead.responseCode != 0){
						this.$refs.showalert.showMOdal(response.data.header.errorMessage)
					}else{
						let instance =Toast({
							message:'查询成功',
							position:'bottom',
							duration:1000
						}); 
						setTimeout(() => {
							instance.close()
						}, 1000)
						let result = response.data.response.order
						console.log('按钮更新状态',result)
						if(result[0].state != item.status){
							item.status = result[0].state
							console.log(result[0].state)
						}
						if(result[0].problemState != item.problemStatue){
							item.problemStatue = result[0].problemState;
							console.log(result[0].problemState)
						}
						//保单状态为1时才能获取转批扣状态
						if(item.status == 1){
							if(result[0].payState != item.pkState){
								item.pkState = result[0].payState
								console.log(result[0].payState,'核心转批扣状态返回')
							}
						}
					}
				})
			}
	  	},
      loadMore() {
        if (this.index === 1) {
          if(this.array.length == 10){
            this.getOrderList(1,++this.number)
            return
          }else{
            console.log('列表加载完毕')
          }
        }else if(this.index === 2){
          if(this.array1.length == 10){
            this.getOrderList(2,++this.number1);
            return
          }
        }
      },
      //获取产品列表
	  	productLists(){
				let requ = {
					"personsal": {
            "agentCode": this.agentCode,
            "channel": utils.cache.get('personsal').channel
          }
        }
        utils.http.postFast('MOPRODUCTLIST',requ,(body)=>{
          console.log(body.personsal)
          let productList_1 = body.personsal.productList1
          let productList_2 = body.personsal.productList2
          let productList_3 = body.personsal.productList3
          let productList_4 = body.personsal.productList4
          this.productArray = this.productArray.concat(productList_1,productList_2,productList_3,productList_4)
          console.log(this.productArray,'产品列表')
        })
      },
      //保单查询
	  	selectPolicy(num){
	  		let requ = null
	  		if(num == 1){
		  		requ = {
	  				"order": {
              "agentCode": this.agentCode,
					    "docType": "1",
					    "applyCode": this.selectInfo.applyCode,
					    "productCode": this.selectInfo.productCode,
					    "holderName": this.selectInfo.holderName
            }
	  			}
	  		}else{
		  		requ = {
	  				"order": {
              "agentCode": this.agentCode,
					    "docType": "2",
					    "applyCode": this.selectInfo.applyCodes,
					    "productCode": this.selectInfo.productCodes,
					    "holderName": this.selectInfo.holderNames
            }
	  			}
	  		}
  			console.log('查询请求参数',requ)
  			utils.http.post('MOPOLICYLIST',requ).then(response => {
  				let projectHead = response.data.header
			    if(projectHead.responseCode != 0){
			    	this.$refs.showalert.showMOdal(response.data.header.errorMessage)
			    }else{
			    	if(num == 1){
	  					this.allSize1 = response.data.response.allSize
	  					this.array = response.data.response.order
	  					this.unsuccOrder = this.array
	  					console.log(this.allSize1,'alllength')
		  				console.log('获取查询列表',this.array)
		  				console.log(this.allSize1,'allsize')
		  				if(this.unsuccOrder == undefined || this.unsuccOrder == ""){
		  					this.$refs.showalert.showMOdal('未查到该订单!')
		  				}
	  				}else{
	  					this.allSize2 = response.data.response.allSize
	  					this.array1 = response.data.response.order
	  					this.succOrder = this.array1
		  				console.log('获取查询列表',this.array1)
		  				if(this.succOrder == undefined || this.succOrder == ""){
		  					this.$refs.showalert.showMOdal('未查到该订单!')
		  				}
	  				}
			    }
  			}).catch(error => {
  			})
      },
      // 获取订单列表
	  	getOrderList(num,value){
	  		console.log(value,'value')
		  	let	requ = {
          "order": {
            "agentCode": this.agentCode,
            "docType": String(num),
            "num":String(value)
          }
        }
	  		console.log(requ,'请求保单参数')
  			utils.http.post('MOPOLICYLIST',requ).then(response => {
  				let projectHead = response.data.header
			    if(projectHead.responseCode != 0){
			    	this.$refs.showalert.showMOdal(response.data.header.errorMessage)
			    }else{
			    	if(num == 1){
	  					if(value == 1){
	  						this.number = 1;
	  						this.allSize1 = response.data.response.allSize
	  						console.log(this.allSize1,'未完成')
	  						this.array = response.data.response.order
	  						this.unsuccOrder = [];
	  						this.unsuccOrder = this.unsuccOrder.concat(this.array);
	  						this.orderId = this.unsuccOrder;
	  						this.getStatusAll();
	  						console.log(this.number,'number')
	  						console.log(this.array.length,'array')
	  						console.log(this.unsuccOrder,'未完成')
	  					}else{
	  						this.allSize1 = response.data.response.allSize
							console.log(this.allSize1,'未完成')
							this.array = response.data.response.order
							this.unsuccOrder = this.unsuccOrder.concat(this.array);
							this.orderId = this.unsuccOrder;
							console.log('array',this.array.length)
							this.getStatusAll();
	  					}
	  				}else if(num == 2){
					  	this.allSize2 = response.data.response.allSize
					  	this.array1 = response.data.response.order
						  this.succOrder = this.succOrder.concat(this.array1);
					  	console.log(this.array1,'已完成=========')
	  				}
			    }
  			}).catch(error => {
  			})
	  	},
	  	// 点击重置清空文本框
	  	clearInput(){
	  		this.selectInfo.holderName = ''
	  		this.selectInfo.productCode = ''
	  		this.selectInfo.applyCode = ''
	  		this.selectInfo.holderNames = ''
	  		this.selectInfo.productCodes = ''
	  		this.selectInfo.applyCodes = ''
	  	},
      //跳转回访详情页面
      goReturnDetail(item) {
      	if(item.policyCode==""){
  			let status;
		  	if(item.status == 4){
		    	status = '拒保'
		  	}else if(item.status == 5){
		    	status = '延期'
		  	}else if(item.status == 6){
		    	status = '撤件'
		  	}
      		MessageBox({
	            title: '提示',
	            message: '当前保单已'+status+'。',
	            closeOnClickModal: false
          	}).then(() => {
    	  	});
      	}else{
      		this.$router.push({name:'returnDetail',params:{policyCode:item.policyCode}});
      	}
      },
	  }
	}
</script>

<style lang='scss' scoped type="text/css">
	@import 'static/css/backlog/page';
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
		background: #F5F5F5;
		overflow-y: auto;
	}
	/* 按钮设置 */
	.btn{
		border-radius: 10px;
		border: 0;
		outline: none;
		font-size: 12px;
	}
	.color{background: #F4A200}
	.color1{background: #BABABA}
	.color2{background: #F4A200}
	.status-p{padding: 5px 20px;margin:0 5px;font-size: 14px;color: #fff;}
	.statu-p{padding:5px 15px;}
	.padd{padding: 2px 5px;margin:0 2px;}
	.line-h{
		line-height: 30px;
		margin: 5px 0;
	}
	/* 保险列表 */
	.bx-list p{
		line-height: 25px;
		/* padding-left: 100px; */
	}
	.dashed{border:1px dashed #A3A3A3;border-right:0;border-left:0;margin:5px 0;padding:5px 0;}
	ul li.ul-li{
		padding:5px 10px;
		background-color: #fff;margin: 10px 0;
	}
	.bgcolor{
		background: #F4A200;
	}
	.textColor{
		color:#F4A200;
	}
	.txtColor{
		color:#fff;
	}
	.status-btn{
		border: 1px solid #28D4D5;
		background-color: #fff;
		color:#28D4D5 ;
		padding: 5px;
		display: inline-block;
		margin: 0 2px;
	}
	/* 弹出框 */
	.popup{
		width: 80%;line-height: 100px;border-radius: 10px;
		padding: 10px;text-align: center;
	}
	.ipt-border{border:1px solid #C8C7C8;border-radius: 5px;line-height: 30px;
			padding-left: 5px;
		}
	.lh{
		line-height:30px;
	}
	/* 消息数量提醒 */
	.warn{
		width: 25px;
		/* padding: 2px 0px; */
		border-radius: 50%;background-color: #f00;
		color: #fff;text-align: center;line-height: 20px;
	}
	.warn-position{position: absolute;top:3px;right: 10px;}
	.warn-position1{position: absolute;top:3px;right:105px;}
	.fa{
		color: #FDB92C;
	} 
	.fa-clock-o{
		font-size: 20px;
	}
</style>
