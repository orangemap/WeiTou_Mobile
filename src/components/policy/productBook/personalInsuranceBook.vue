<template>  
	<div>
		<Headerbtns :title = page_title>
		    <div slot="left" class="back">
		        <i class="fa fa-angle-left" @click="back()"></i>
		    </div>
		</Headerbtns>
		<!-- 内容区 -->
		<div class="manageContents">
			<div class="header"></div>
			<div id="personalCtrl1" class="contents clear">
				<div id="div1">
					<h1 style="font-size: 15px;">人身保险产品销售服务确认书</h1>
					<div id="div2">
						<div>
							<div><b class="btext">尊敬的投保人：</b></div>
				　			&nbsp;为保护您的合法权益，请您在购买人身保险产品时详细了解产品特点，查阅保险销售人员的资质证明，要求其与您共同填写本服务确认书，并亲笔签名确认,本服务确认书一式两联，其中投保人个人留存联作为您个人投保备查资料，请妥善保存。  — — <b class="btext">天津保监局</b>
						</div>
					</div>
					<div class="table">
						<table>
							<tr>
								<td style="width:26%;font-size:10px">保险公司名称</td>
								<td style="width:24%;font-size:10px"><span style="word-break:break-all">{{TJPersonalInfo.mngFullName}}</span>
								</td>
								<td style="width:26%;font-size:10px">代理银行网点（机构）名称</td>
								<td style="width:24%;font-size:10px">
									<span style="font-size:10px">{{TJPersonalInfo.agentComName}}</span>
								</td>
							</tr>
							<tr>
								<td  style="width:26%;font-size:10px">销售人员姓名</td>
								<td style="width:24%;font-size:10px">
									<span style="font-size:10px">{{TJPersonalInfo.agentName}}</span>
								</td>
								<td  style="width:26%;font-size:10px">展业证（资格证）号</td>
								<td style="width:24%;font-size:10px">
									<input type="text" v-model="TJPersonalInfo.agentQuafNo" style="font-size:10px">
								</td>
							</tr>
							<tr>
								<td style="width:26%;font-size:10px">销售险种名称</td>
								<td style="width:24%;font-size:10px">
									<span style="font-size:10px">{{TJPersonalInfo.riskName}}</span>
								</td>
								<td  style="width:26%;font-size:10px">投保人核对签字</td>
								<td style="width:24%;font-size:10px"><img :src="signs.appnt" alt="" style="width:30px;height:30px;" ></td>
							</tr>
							<tr>							
								<td colspan="4" style="text-align:left;">
									&nbsp;&nbsp;1、<b>投保人所交钱款是用于购买<input type="text" readonly style="    border-bottom: 1px solid #000;" v-model="TJPersonalInfo.mngShortName">公司的保险产品，不是购买银行理财产品，也不是办理银行存款赠送的保险，银行不承担保本保息的责任，投保人提前退保可能承担一定损失。</b>
								</td>		
							</tr>
							<tr>	
								<td colspan="4" style="text-align:left;">
									&nbsp;&nbsp;2、本保险产品的缴费方式为（在方框内打勾选择类型）：<br/>
									&nbsp;&nbsp;<input type="checkbox" disabled v-model="TJPersonalInfo.periodPayItem" readonly> 缴费期为
									<input type="text" readonly style="width: 30%;border-bottom: 1px solid #000;" v-model="TJPersonalInfo.payYears">年，按（年/月）缴纳，每期需缴费
									<input type="text" readonly style="width: 30%;border-bottom: 1px solid #000;" v-model="TJPersonalInfo.prem">元，投保人共需缴费
									<input type="text" readonly style="width: 30%;border-bottom: 1px solid #000;" v-model="TJPersonalInfo.allPayPrem">元。<br/>
									&nbsp;&nbsp;<input type="checkbox" disabled v-model="TJPersonalInfo.allPayItem">  一次性缴费，投保人共需缴费
									<input type="text" readonly style="width: 30%;border-bottom: 1px solid #000;" v-model="TJPersonalInfo.allPayPrem1">元。<br/>
									&nbsp;&nbsp;<input type="checkbox" disabled v-model="TJPersonalInfo.otherPayItem"> 可以根据投保人需要灵活缴费，具体方式为
									<input type="text" style="border-bottom: 1px solid #000;" v-model="TJPersonalInfo.otherPayIntvDes"><br/>
								</td>
							</tr>
							<tr>	
								<td colspan="4" style="text-align:left;">
									&nbsp;&nbsp;3、本保险产品属于以下类型之一（在方框内打勾选择类型）：<br/>
									&nbsp;&nbsp;<input type="checkbox" disabled v-model="TJPersonalInfo.riskTypeItem_0"> 分红保险。<b class="btext">请投保人注意：该类保险的未来红利分配水平主要取决于保险公司实际经营成果，红利分配是不确定的</b>。<br/>
									&nbsp;&nbsp;<input type="checkbox" disabled v-model="TJPersonalInfo.riskTypeItem_1">  投资连结保险。<b>请投保人注意：该类保险需要扣除相关费用，并且未来投资回报具有不确定性，甚至可能亏损</b>。<br/>
									&nbsp;&nbsp;<input type="checkbox" disabled v-model="TJPersonalInfo.riskTypeItem_2">  万能保险。<b class="btext">请投保人注意：该类保险需要扣除相关费用，最低保证利率之上的投资收益是不确定的，实际结算利率仅针对投资账户中的资金，不针对全部保费</b>。<br/>
									&nbsp;&nbsp;<input type="checkbox" disabled v-model="TJPersonalInfo.riskTypeItem_3">  其他保险。
								</td>
							</tr>
							<tr>
								<td colspan="4" style="text-align:left;">
									&nbsp;&nbsp;<b>4、请投保人仔细阅读保险条款，重点关注保险责任、责任免除、投保人及被保险人权利和义务、免赔额或免赔率的计算、费用扣除、退保相关约定等内容。</b>
								</td>
							</tr>
							<tr>
								<td colspan="4" style="text-align:left;">
									&nbsp;&nbsp;5、投保人签收保险单后有<b class="btext">15天犹豫期</b>。犹豫期内投保人可以无条件退保，保险公司扣除不超10元的成本费后退还全部保费。<b class="btext">超过犹豫期后退保，投保人将承担一定的退保损失</b>，具体损失金额可查阅保险单所附“现金价值表”或询问保险公司。<br/>
								</td>
							</tr>
							<tr>
								<td colspan="4" style="text-align:left;">
									&nbsp;&nbsp;<b class="btext">请投保人注意，销售人员以下情形均属于违规误导销售行为，请您保留相关证据，立即向<input type="text" readonly style="border-bottom:1px solid #000;" v-model="TJPersonalInfo.mngShortName1">保险公司或天津市保险行业协会、天津保监局投诉：<br/>
									&nbsp;&nbsp;①将保险产品介绍为银行存款赠送保险或银行理财产品，并暗示有较高投资收益；<br/>
									&nbsp;&nbsp;②出示非保险公司统一印制的产品宣传材料，或者代替投保人、被保险人签名；<br/>
									&nbsp;&nbsp;③向您承诺分红保险的分红水平或承诺固定投资收益；<br/>
									&nbsp;&nbsp;④未向您解释投资连结和万能保险的费用扣除情况以及万能保险的账户价值计算方法；<br/>
									&nbsp;&nbsp;⑤向您承诺投资连结保险的投资收益，或承诺万能保险高于最低保证利率的投资收益。<br/>
									&nbsp;&nbsp;<input type="text" readonly  style="border-bottom:1px solid #000;width:80%;"v-model="TJPersonalInfo.mngShortName2">保险公司投诉电话：<input type="text" readonly style="border-bottom:1px solid #000;" v-model="TJPersonalInfo.comPhone"> <br/>
									&nbsp;&nbsp;天津市保险行业协会投诉电话：022-23304432       天津保监局投诉电话：022-23145068</b>

								</td>
							</tr>
							<tr>
								<td colspan="4" style="text-align:left;">
									&nbsp;&nbsp;销售人员声明：我已向投保人逐条宣讲以上内容。                签字：<img :src="signs.agent" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;"> 日期：
								</td>
							</tr>
							<tr>
								<td colspan="4" style="text-align:left;">
									&nbsp;&nbsp;投保人声明：该销售人员已向我逐条宣讲以上内容。        签字：<img :src="signs.appnt" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">日期：
								</td>
							</tr>
						</table>
					</div>			
				</div>
			</div>
			<div style="margin:5% 0 0 0;line-height: 20px;">
			    <input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{newPolicy.custInfo.appnt.appntName}}已认真阅读投保特别提示，且全面知晓理解相关内容，并予以确认。
			</div>
		</div>
		<alert ref="alert"></alert>
		<Footerbtns :is_show=false 
		    total_premium="10000.00">
		    <button class="btnFoote" slot="center" @click="jumpToBack()" :disabled="!isAgree">
		        下一步
		    </button>
		</Footerbtns>
	</div>
</template>

<script>
	import alert from '../common/alert.vue'
	import Headerbtns from '../../common/Header.vue'
	import Footerbtns from '../../policy/common/Footer.vue'
	import premList from '../../../../static/dict/prem_sunlife.json'

	export default{
	    name: 'personalInsuranceBook',
	    components: {Headerbtns,Footerbtns,alert},
	    props: {},
	    data() {
	        return {
	        	newPolicy: this.$route.params.newPolicy,
				signs: {
					agent: '',
					appnt: '',
				},
	            page_title: '人身保险产品销售服务确认书',
	            current_total_premium: '10000.00',
	            isAgree:false,
	            isShare:this.$route.params.share,
	            saveName:"2050101",
	            channel:this.$route.params.channel,
	            sign:JSON.parse(this.$route.params.signImgs),
	            signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
	            appntName:this.$route.params.applicant,
	            TJPersonalInfo:{
	            	mngFullName:"光大永明人寿保险有限公司",
	            	agentComName:"",
	            	agentName:"",
	            	agentQuafNo:"",
	            	riskName:"",
	            	appCheckSign:"",
	            	mngShortName:"光大永明人寿",
	            	payYears:"",
	            	prem:"",
	            	allPayPrem:"",
	            	allPayPrem1:"",
	            	otherPayIntvDes:"",
	            	mngShortName1:"光大永明人寿",
	            	mngShortName2:"光大永明人寿",
	            	comPhone:"95348",
	            	typeProduct:"",	
	            	riskTypeItem:"",
		            riskTypeItem_0: false,
	                riskTypeItem_1: false,
	                riskTypeItem_2: false,
	                riskTypeItem_3: false,
	            	periodPayItem: false,
	            	otherPayItem: false,
	            	allPayItem: false,
	            },

	        }
	    },
	    watch:{
            'isAgree': {
                handler(val) {
                    if(val){
                        $(".btnFoote").attr({'disabled':false})
                        $(".btnFoote").css({'opacity':1})
                    }else{
                        $(".btnFoote").css({'opacity':0.5})
                        $(".btnFoote").attr({'disabled':true})
                    }
                },
                deep: true
            },
        },
        beforeMount(){
            $(".btnFoote").css({'opacity':0.5})
            // 判断再次进入单证缓冲有数据且赋值,
            let documentInfo = utils.cache.get("documentInfo")
            console.log(documentInfo)
            if(documentInfo!=null && documentInfo!=undefined && documentInfo.length>0){
                for(var i=0;i<documentInfo.length;i++){
                    if(documentInfo[i].name == this.saveName){
                        this.TJPersonalInfo = documentInfo[i].content
                    }
                }
            }else{
                
            }
        },
        mounted(){
            $(".btnFoote").css({'opacity':0.5})
            
            var _header = $(".manageContents")
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS) {
				if(screen.height == 812 && screen.width == 375){
					_header.css({
						"top": "72px",
						"bottom": "84px"
					})
				}
			}
			this.TJPersonalInfo.agentComName = this.newPolicy.agentInfo.manageName
			this.TJPersonalInfo.agentName = this.newPolicy.agentInfo.name
			let premSum = this.newPolicy.payInfo.sumPremL
			this.newPolicy.allProducts.forEach(item => {
				if(item.isMaster == '1') {
					this.TJPersonalInfo.riskName = item.prodName
					if(item.payIntv == 'single') {
						this.TJPersonalInfo.allPayItem = "true"
						this.TJPersonalInfo.allPayPrem1 = premSum
					} else {
						this.TJPersonalInfo.periodPayItem = 'true'
						this.TJPersonalInfo.payYears = this.getPay(item.payYear)
						this.TJPersonalInfo.prem = premSum
						this.TJPersonalInfo.allPayPrem = ((premSum) * this.getPay(item.payYear)).toFixed(2)
					}
				}
			})
			this.newPolicy.agentInfo.imageData.forEach(item => {
				if(item.imageName == '23') {
					this.signs.agent = item.reaPath
				}
			})
			if(this.newPolicy.custInfo.appnt.imageData.length > 0) {
				this.newPolicy.custInfo.appnt.imageData.forEach(item => {
					if(item.imageName == '24') {
						this.signs.appnt = item.reaPath
					}
				})
			}

            
            this.TJPersonalInfo.typeProduct=this.$route.params.typeProducts
            console.log(this.TJPersonalInfo)
            //this.TJPersonalInfo.typeProduct=["1020","1030",""]
            //this.TJPersonalInfo.typeProduct=[""]
            // 险种类型
            for(let i=0,typeProducts="";i<this.TJPersonalInfo.typeProduct.length;i++){
            	if(this.TJPersonalInfo.typeProduct[i]=="1020"||this.TJPersonalInfo.typeProduct[i]=="1030"||this.TJPersonalInfo.typeProduct[i]=="1040"){
            		if(this.TJPersonalInfo.typeProduct[i]=="1020"){
            			this.TJPersonalInfo.riskTypeItem_0= true
            			this.TJPersonalInfo.riskTypeItem_3 = false
            			if(typeProducts==""){
            				typeProducts='0';
            			}else{
            				typeProducts+='0';
            			}
            		}
            		if(this.TJPersonalInfo.typeProduct[i]=="1030"){
            			this.TJPersonalInfo.riskTypeItem_1= true
            			this.TJPersonalInfo.riskTypeItem_3 = false
            			if(typeProducts==""){
            				typeProducts='1';
            			}else{
            				typeProducts+='1';
            			}
            		}
            		if(this.TJPersonalInfo.typeProduct[i]=="1040"){
            			this.TJPersonalInfo.riskTypeItem_2= true
            			this.TJPersonalInfo.riskTypeItem_3 = false
            			if(typeProducts==""){
            				typeProducts='2';
            			}else{
            				typeProducts+='2';
            			}
            		}
            	}else if(this.TJPersonalInfo.typeProduct.length==1&&this.TJPersonalInfo.typeProduct.indexOf("")!=-1){
            		this.TJPersonalInfo.riskTypeItem_3 = true
            		typeProducts=3;
            	}
            	this.TJPersonalInfo.riskTypeItem=typeProducts;
            }
            /*
            if (this.TJPersonalInfo.typeProduct=="1020") {// desc="分红寿险" 
            	this.TJPersonalInfo.riskTypeItem_0=true
            	this.TJPersonalInfo.riskTypeItem="0"
            } else if (this.TJPersonalInfo.typeProduct=="1030") {//desc="投资连接保险"
            	this.TJPersonalInfo.riskTypeItem_1= true
            	this.TJPersonalInfo.riskTypeItem="1"
            } else if (this.TJPersonalInfo.typeProduct=="1040") {//desc="万能保险"
            	this.TJPersonalInfo.riskTypeItem_2 = true
            	this.TJPersonalInfo.riskTypeItem="2"
            }else{
            	this.TJPersonalInfo.riskTypeItem_3 = true
            	this.TJPersonalInfo.riskTypeItem="3"
            }*/
        },
	    methods:{
	    	jumpToBack(){
				// if(this.isShare){
				// 	var isCheck=this.checkall()
				// 	if(this.isAgree && isCheck){
				// 	 this.$router.back()
				// 	}
				// 	return
				// }
	    	    var isCheck=this.checkall()
	    	    // console.log(isCheck)
	    	    if(this.isAgree && isCheck){
	    	    	if(!this.isShare){
	    	    		this.$router.push({
	    	    				path: '/policy/ElectronicsPolicyPage.vue',
	    	    				name: 'electronics_policy_page',
	    	    				params: {
	    	    						planId:this.$route.params.planId,
	    	    						applyCode:this.$route.params.applyCode,
	    	    						sendInfo:{
	    	    							name:"2050101",
	    	    							isRed:"0",  
	    	    							content:this.TJPersonalInfo
	    	    						}
	    	    						
	    	    				}
	    	    		})
	    	    	}else{
	    	    		this.$router.push({
	    	    				path: '/policy/ElectronicsPolicySharePage.vue',
	    	    				name: 'electronics_policy_share_page',
	    	    				params: {
	    	    						planId:this.$route.params.planId,
	    	    						applyCode:this.$route.params.applyCode,
	    	    						index:this.$route.params.index,
	    	    						result:"-1",
	    	    						resultmsg:this.$route.params.resultmsg,
	    	    						sendInfo:{
	    	    							name:"2050101",
	    	    							isRed:"0",  
	    	    							content:this.TJPersonalInfo
	    	    						}
	    	    						
	    	    				}
	    	    		})
	    	    	}
	    	       
	    	    }else{
	    	        this.checkall()
	    	    } 
	    	},
	    	//按钮返回
	    	back(){
	    		if(!this.isShare){
	    			this.$router.push({
	    					path: '/policy/ElectronicsPolicyPage.vue',
	    					name: 'electronics_policy_page',
	    					params: {
	    							planId:this.$route.params.planId,
	    							applyCode:this.$route.params.applyCode,
	    							sendInfo:{
	    								name:"2050101",
	    								isRed:"1",  
	    								content:this.TJPersonalInfo,
	    							}
	    							
	    					}
	    			})
	    		}else{
	    			this.$router.push({
	    					path: '/policy/ElectronicsPolicySharePage.vue',
	    					name: 'electronics_policy_share_page',
	    					params: {
	    							planId:this.$route.params.planId,
	    							applyCode:this.$route.params.applyCode,
	    							index:this.$route.params.index,
	    							result:"-1",
	    							resultmsg:this.$route.params.resultmsg,
	    							sendInfo:{
	    								name:"2050101",
	    								isRed:"1",  
	    								content:this.TJPersonalInfo,
	    							}
	    							
	    					}
	    			})
	    		}
	    	    
	    	},
	    	//获取缴费期
	    	getPayFreq(code){
	    	    if(code != undefined && code != ""){
	    	    if (premList != undefined && premList !="") {
	    	        let pay_freq=premList.declare.parameter.pay_freq.item
	    	     for (var i = 0; i < pay_freq.length; i++) {
	    	          if(pay_freq[i].code == code){
	    	            return pay_freq[i].show
	    	          }
	    	      }
	    	    }
	    	  }
	    	},
	    	//获取缴费期年交
	    	getPay(code){
	    	    if(code != undefined && code != ""){
	    	    if (premList != undefined && premList !="") {
	    	        let pay=premList.declare.parameter.pay.item
	    	     for (var i = 0; i < pay.length; i++) {
	    	          if(pay[i].code == code){
	    	            return pay[i].value
	    	          }
	    	      }
	    	    }
	    	  }
	    	},
	    	//获取保险期限
	    	getInsure(code){
	    	    if(code != undefined && code != ""){
	    	    if (premList != undefined && premList !="") {
	    	        let insure=premList.declare.parameter.insure.item
	    	     for (var i = 0; i < insure.length; i++) {
	    	          if(insure[i].code == code){
	    	            return insure[i].show
	    	          }
	    	      }
	    	    }
	    	  }
	    	},
	    	checkall(){
	    		/*
	    		if (this.TJPersonalInfo.riskTypeItem == '0'){
		            this.TJPersonalInfo.riskTypeItem_0 = true;
		        }else if (this.TJPersonalInfo.riskTypeItem == '1'){
		            this.TJPersonalInfo.riskTypeItem_1 = true;
		        }else if (this.TJPersonalInfo.riskTypeItem == '2'){
		            this.TJPersonalInfo.riskTypeItem_2 = true;
		        }else if (this.TJPersonalInfo.riskTypeItem == '3'){
		            this.TJPersonalInfo.riskTypeItem_3 = true;
		        }*/
		        if (this.TJPersonalInfo.periodPayItem == '1'){
		            this.TJPersonalInfo.periodPayItem = true;
		        }
		        if (this.TJPersonalInfo.allPayItem == '1'){
		            this.allPayItem = true;
		        }
		        if (this.TJPersonalInfo.otherPayItem == '1'){
		            this.TJPersonalInfo.otherPayItem = true;
		        }
		        if (this.TJPersonalInfo.agentQuafNo == ''){
					this.$refs.alert.showMOdal("请输入代理人的展业证(资格证)号")
					return false
		        }else if (isNaN(this.TJPersonalInfo.agentQuafNo)){
					this.$refs.alert.showMOdal("输入的代理人的展业证(资格证)号格式有误")
					return false
		        }else if (this.TJPersonalInfo.agentQuafNo.length != 10){
		        	this.$refs.alert.showMOdal("输入代理人的展业证(资格证)位数有误,应10位")
					return false
				}else{
					return true
				}
	    	},
	    	//提示框
	    	showMsg:function(msg){
	    	    if(msg!=undefined && msg!=""){
	    	         this.$refs.alert.showMOdal(msg)
	    	    }
	    	},
	    }
	}
</script>

<style>
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
	.header{
	    float: right;
	    display: block;
	    width: 120px;height: 60px;
	    background: url("../../../../static/img/policy/logo.png")no-repeat right center;
	    background-size: 100% 70%;
		margin-top: 5%;
	}
	.clear{
	    content:"";
	    clear:both;
	    display:block
	}  
    .manageContents{
        position: absolute;
        padding: 0 5%;
        left: 0;right: 0;top: 48px;bottom: 50px;
        overflow-y: auto;
        overflow-x: hidden;
        background: #FFF;
		line-height: 20px;
		font-size: 14px;
    }
	h1{
	    text-align: center;
	    font-weight:bold;
	    margin:20px 0 ;
	}
	.btext{
		font-weight: bold;
		font-size: 14px;
	}
	.table{
		width: 100%;
		border: 1px solid #000;
		margin-top: 10px;
	}
	table>tr>td{
		border: 1px solid #000;
		text-align: center;
		vertical-align: middle !important;
	}
	table>tr:nth-child(1) input,table>tr:nth-child(2) input,table>tr:nth-child(3) input{
		width: 100%;
	}
/* 	table>tr:nth-child(1) td:nth-child(1),table>tr:nth-child(1) td:nth-child(3),table>tr:nth-child(2) td:nth-child(1),table>tr:nth-child(2) td:nth-child(3),table>tr:nth-child(3) td:nth-child(1),table>tr:nth-child(3) td:nth-child(3){
		width: 70%;
		background: yellow;
	} */
	input{
		border: none;
		outline:none;
		text-align: center;
		font-size: 15px;
	}	
	.btnFoote{
	    border:0;
	    color:#fff;
	    width:100%;
	    height: 50px;
	    background:#FEB101;
	    height:50px
	}
</style>