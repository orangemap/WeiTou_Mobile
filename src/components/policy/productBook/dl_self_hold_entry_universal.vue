<template> 
	<div>
		<Headerbtns :title = page_title>
		    <div slot="left" class="back">
		        <i class="fa fa-angle-left" @click="back()"></i>
		    </div>
		</Headerbtns>
		<!-- 内容区 -->
		<div class="manage-contents">
			<!-- <div class="header"></div> -->
			<div id="DLSelfHoldUniversalCtrl1" class="content clear">
				<div>
					<h1>自保件投保声明确认书（万能险）</h1>
					<p class="level">
						1、我是光大永明人寿保险有限公司大连分公司销售人员，执业证号是
						<input type="text" style="border-bottom: 1px solid black" v-model="DLSelfHoldUniversalInfo.agentQuafNo">
		<!--                （内勤人员为身份证号码-->
		<!--                <input type="text" style="border-bottom: 1px solid black" readonly v-model="DLSelfHoldUniversalInfo.agentIDCardNo">-->
		<!--                ）-->
		                ，现对我自己的签单过程进行全程记录。
					</p>
					<p class="level">
						2.我投保的是公司
						<!--<input type="text" style="border-bottom: 1px solid black" readonly v-model="DLSelfHoldUniversalInfo.productName">，-->
						<span style="border-bottom: 1px black solid">{{DLSelfHoldUniversalInfo.productName}}</span>
						产品，投保人和被保险人均是我本人，每年缴费
						<input type="text" style="border-bottom: 1px solid black;width:30%" readonly v-model="DLSelfHoldUniversalInfo.payment">
						元，缴费期是
						<input type="text" style="border-bottom: 1px solid black;width:30%" readonly v-model="DLSelfHoldUniversalInfo.paymentPeriod">
						年，保险期限是
						<input type="text" style="border-bottom: 1px solid black;width:30%" readonly v-model="DLSelfHoldUniversalInfo.periodYear">
						年（或至被保险人
						<input type="text" style="border-bottom: 1px solid black;width:30%" readonly v-model="DLSelfHoldUniversalInfo.periodTo">
						周岁），我已清楚知悉这份保单的犹豫期是从收到保险合同起
						<input type="text" style="border-bottom: 1px solid black;width:30%" readonly v-model="DLSelfHoldUniversalInfo.hesitationPeriod">
						天，并已清楚了解犹豫期内外退保的区别。
					</p>
					<p class="level">3.我清楚了解本产品的保险责任是
						<u style="letter-spacing: 1px;line-height: 24px;">
							{{DLSelfHoldUniversalInfo.insuranceLiability}}
						</u>
						免除责任是
						<u style="letter-spacing: 1px;line-height: 24px;">
							{{DLSelfHoldUniversalInfo.exemptionFromLiability}}
						</u>
						<!-- <input type="text" style="border-bottom: 1px solid black" readonly/> -->
						<!-- <input type="text" style="border-bottom: 1px solid black" v-model="DLSelfHoldUniversalInfo.insuranceLiability">；
		                <input type="text" style="border-bottom: 1px solid black" v-model="DLSelfHoldUniversalInfo.exemptionFromLiability">。 -->
						<u>相关详细内容我已全部清楚了解。</u>
					</p>
					<p class="level">4.保单的宽限期、复效期、质押贷款、生存金转换等合同重要权益，本人已经清楚知悉。
					</p>
					<p class="level">5.投保单、投保提示书都是由我本人亲笔签名，对投保单、投保提示书的相关内容已清楚知悉。
					</p>
					<p class="level">6.投保单上的风险提示语句是我本人亲自抄写的，内容是“本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性”。相关含义及其法律后果本人也清楚了解。</p>
					<p class="level">
						7.我清楚了解
						<u style="letter-spacing: 1px;">{{DLSelfHoldUniversalInfo.productName}}</u>
						<!-- <input type="text" style="border-bottom: 1px solid black" v-model="DLSelfHoldUniversalInfo.productName"> -->
						产品的保证利率是
						<input type="text" style="border-bottom: 1px solid black;width:20%" v-model="DLSelfHoldUniversalInfo.ensureMoneyRate">
						%，在此之上的投资收益是不确定的，投资收益可能有，也可能为零。
					</p>
					<p class="level">
						8.我清楚了解这张保单账户部分领取或退保的手续费，在前    个保单年度我需要支付部分提取或退保部分的手续费，依次为 <input type="text" style="border-bottom: 1px solid black;width:20%" v-model="DLSelfHoldUniversalInfo.input1">%、<input type="text" style="border-bottom: 1px solid black;width:20%" v-model="DLSelfHoldUniversalInfo.input2">%、<input type="text" style="border-bottom: 1px solid black;width:20%" v-model="DLSelfHoldUniversalInfo.input3">%、……，手续费逐年递减，直至为零。第   个保单年度及以后，部分提取或退保将不再收取任何手续费。
					</p>
				</div>
				<div class="stat">
					<p class="level">以上陈述是我的真实意思的表达，本声明书的签名也是本人亲笔签字。</p>
				</div>
				<div>
					<table>
						<tr>
							<td>投保人签名：<img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;"></td>
							<td></td>
							<td> 日期：</td>
							<td></td>
						</tr>
						<tr>
							<td>销售人员签名：<img :src="signImgsAgent" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;"></td>
							<td></td>
							<td>日期：</td>
							<td></td>
						</tr>
					</table>
				</div>
			</div>
			<div style="margin:5% 0 0 0;line-height: 20px;">
			    <input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{DLSelfHoldUniversalInfo.appntName}}已认真阅读投保特别提示，且全面知晓理解相关内容，并予以确认。
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
	    name: 'dl_self_hold_entry_universal',
	    components: {Headerbtns,Footerbtns,alert},
	    props: {},
	    data() {
	        return {
	            page_title: '自保件投保声明确认书（万能险）',
	            current_total_premium: '10000.00',
	            isAgree:false,
	            isShare:this.$route.params.share,
	            saveName:"2050901_07",
	            channel:this.$route.params.channel,
	            sign:JSON.parse(this.$route.params.signImgs),
	            signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
	            DLSelfHoldUniversalInfo:{
	            	agentQuafNo:this.$route.params.agentQuafno,
	            	productName:"",
	            	payment:"",
	            	paymentPeriod:"",
	            	periodYear:"",
	            	periodTo:"",
	            	hesitationPeriod: this.$route.params.hesitationPeriod,
	            	insuranceLiability:"",
	            	exemptionFromLiability:"",
	            	ensureMoneyRate:"",
	            	input1:"",
	            	input2:"",
	            	input3:"",
	            	appntName:this.$route.params.applicant,
	            },
	            
	            policyResult:this.$route.params.policyResult,
	            productCode:this.$route.params.productCode,
	            productExtraCode:this.$route.params.productExtraCode,
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
            if(documentInfo!=null && documentInfo!=undefined && documentInfo.length>0){
                for(var i=0;i<documentInfo.length;i++){
                    if(documentInfo[i].name == this.saveName){
                        this.DLSelfHoldUniversalInfo = documentInfo[i].content
                    }
                }
            }else{
                
            }
        },
        mounted(){
            $(".btnFoote").css({'opacity':0.5})
            
            var _header = $(".manage-contents")
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
            
            let products=this.policyResult.allProducts
            console.log(products)
            let premSum=this.policyResult.payInfo.sumPremL
            console.log(premSum)
            //产品名称
            let productList=[]
            let productName=[]
            for(var i=0;i<products.length;i++){
				var compare = function (obj1, obj2) {
	                var val1 = obj1.isMaster;
	                var val2 = obj2.isMaster;
	                if (val1 < val2) {
	                    return -1;
	                } else if (val1 > val2) {
	                    return 1;
	                } else {
	                    return 0;
	                }            
            	} 
            	products.sort(compare)
            	productList[productList.length]=products[i].prodName
            	productName=productList
            	console.log("险种名称=====",this.DLSelfHoldUniversalInfo.productName)
            	if(products[i].isMaster=="1"){
            		//缴费期
            		this.DLSelfHoldUniversalInfo.paymentPeriod=this.getPayFreq(products[i].payYear)	
            		//保险期限
            		this.DLSelfHoldUniversalInfo.periodYear=this.getInsure(products[i].insureYear)
            	}
            }
            console.log("+++++++++",productName)
            let productNameList=""
            for(var i=0;i<productName.length;i++){
            	productNameList+=productName[i]+"、"
            }
            this.DLSelfHoldUniversalInfo.productName=productNameList.substring(0,productNameList.length-1)
            //缴费*元
            this.DLSelfHoldUniversalInfo.payment=premSum
            //保险期限至被保险人多少岁periodTo
            // this.DLSelfHoldUniversalInfo.periodTo=
            //保险责任免除责任
            this.getDlSelfHoldEntryUniversal()
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
	    	    							name:"2050901_07",
	    	    							isRed:"0",  
	    	    							content:this.DLSelfHoldUniversalInfo,
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
	    	    							name:"2050901_07",
	    	    							isRed:"0",  
	    	    							content:this.DLSelfHoldUniversalInfo,
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
	    								name:"2050901_07",
	    								isRed:"1",  
	    								content:this.DLSelfHoldUniversalInfo,
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
	    								name:"2050901_07",
	    								isRed:"1",  
	    								content:this.DLSelfHoldUniversalInfo,
	    							}
	    							
	    					}
	    			})
	    		}
	    	   
	    	},
	    	//请求免除责任接口
	    	getDlSelfHoldEntryUniversal(){
	    	    let products = this.policyResult.allProducts
	    		let mainProduct = null
	    		let otherProduct = [] 
	    		for(let i=0;i<products.length;i++){
	    			if(products[i].isMaster == '1'){
	    				otherProduct.push({'productCode':products[i].prodCode,'zerenList':products[i].zerenList,'rank':products[i].rank})
	    			}else if(products[i].isMaster != '1'){
	    				otherProduct.push({'productCode':products[i].prodCode,'zerenList':products[i].zerenList,'rank':products[i].rank})
	    			}
	    		}
	    	    let requ = {
	    	       "policy": {
	    	           "agentCode": this.$route.params.agentCode,
	    	           "productCode": this.productCode,
	    	           "strList":this.productExtraCode,
	    	           "zerenList":otherProduct
	    	        }
	    	    }
	    	    console.log(requ)
	    	    utils.http.post('MOHQPRODUCTMSG',requ).then(response => {
	    	        console.log(response)
	    	        if(response.data.header.responseCode == "0"){
    	        		let insuranceList =response.data.response.policy.proposalCoverageItemsList;
	    	           	console.log(insuranceList)
	    	           	//主险保险责任/主险免除责任
	    	           	var insuranceLiability_main="",exemptionFromLiability_main="";
	    	           	//附加险保险责任/附加险免除责任
	    	           	var insuranceLiability_extra="",exemptionFromLiability_extra=""
	    	           	for(var i=0;i<insuranceList.length;i++){
	    	           		//主险
	    	           		if(insuranceList[i].isMain==1){
	    	           			insuranceLiability_main+=insuranceList[i].productName+"："
	    	           			exemptionFromLiability_main+=insuranceList[i].productName+"："
	    	           			//主险保险责任
	    	           			if(insuranceList[i].strList2.length>0){
	    	           				for(var j=0;j<insuranceList[i].strList2.length;j++){
		    	           				insuranceLiability_main+=insuranceList[i].strList2[j].slice(2)+" "
		    	           			}
	    	           			}
	    	           			if(insuranceList[i].strList4.length>0){
	    	           				for(var j=0;j<insuranceList[i].strList4.length;j++){
		    	           				insuranceLiability_main+=insuranceList[i].strList4[j]+" "
		    	           			}
	    	           			}
	    	           			//主险免除责任
	    	           			for(var k=0;k<insuranceList[i].strList3.length;k++){
	    	           				exemptionFromLiability_main+=insuranceList[i].strList3[k].slice(2)+" "
	    	           			}
	    	           		//附加险
	    	           		}else if(insuranceList[i].isMain!=1){
	    	           			insuranceLiability_extra+=insuranceList[i].productName+"："
	    	           			exemptionFromLiability_extra+=insuranceList[i].productName+"："
	    	           			//附加险保险责任
	    	           			if(insuranceList[i].strList2.length>0){
	    	           				for(var j=0;j<insuranceList[i].strList2.length;j++){
		    	           				insuranceLiability_extra+=insuranceList[i].strList2[j].slice(2)+" "
		    	           			}
	    	           			}
	    	           			if(insuranceList[i].strList4.length>0){
	    	           				for(var j=0;j<insuranceList[i].strList4.length;j++){
		    	           				insuranceLiability_extra+=insuranceList[i].strList4[j]+" "
		    	           			}
	    	           			}
	    	           			//附加险免除责任
	    	           			for(var k=0;k<insuranceList[i].strList3.length;k++){
	    	           				exemptionFromLiability_extra+=insuranceList[i].strList3[k].slice(2)+" "
	    	           			}
	    	           		}
	    	           	}
	    	           	//console.log("主险保险责任："+insuranceLiability_main)
	    	           	//console.log("附加险保险责任："+insuranceLiability_extra)
	    	           	//console.log("主险免除责任："+exemptionFromLiability_main)
	    	           	//console.log("附加险免除责任："+exemptionFromLiability_extra)
	    	           	this.DLSelfHoldUniversalInfo.insuranceLiability = insuranceLiability_main+" "+insuranceLiability_extra
	    	           	this.DLSelfHoldUniversalInfo.exemptionFromLiability = exemptionFromLiability_main+" "+exemptionFromLiability_extra
	    	        }
	    	    }).catch(error => {
	    	        
	    	    
	    	    })
	    	},
	    	//获取缴费期
	    	getPayFreq(code){
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
	    	checkall() {
	    		// var reg1=/^\d+(\.\d+)?$/;
	    		// if(!reg1.test(this.input3)){
	    		// 	MessageBox({
	    		// 	     title:"提示",
	    		// 	      message:"第三次手续费请录入数字，正数；"
	    		// 	})
	    		// }
	    		// if(this.input3=="" ){
	    		// 	MessageBox({
	    		// 	     title:"提示",
	    		// 	      message:"第三次手续费不能为空"
	    		// 	})
	    		// }
	    		// if(!reg1.test(this.input2)){
	    		// 	MessageBox({
	    		// 	     title:"提示",
	    		// 	      message:"第二次手续费请录入数字，正数；"
	    		// 	})
	    		// }
	    		// if(this.input2=="" ){
	    		// 	MessageBox({
	    		// 	     title:"提示",
	    		// 	      message:"第二次手续费不能为空"
	    		// 	})
	    		// }
	    		// if(!reg1.test(this.input1)){
	    		// 	MessageBox({
	    		// 	     title:"提示",
	    		// 	      message:"第一次手续费请录入数字，正数；"
	    		// 	})
	    		// }
	    		// if(this.input1=="" ){
	    		// 	MessageBox({
	    		// 	     title:"提示",
	    		// 	      message:"第一次手续费不能为空"
	    		// 	})
	    		// }
    			// if(!reg1.test(this.DLSelfHoldUniversalInfo.ensureMoneyRate)){
    			// 	MessageBox({
    			// 	     title:"提示",
    			// 	      message:"保证利率只能录入数字，正数；"
    			// 	})
    			// }
    			// if(this.DLSelfHoldUniversalInfo.ensureMoneyRate==""){
    			// 	MessageBox({
    			// 	     title:"提示",
    			// 	      message:"保证利率不能为空"
    			// 	})
    			// }
	    		var reg=/^\d{10}$/;
    			if(this.DLSelfHoldUniversalInfo.agentQuafNo == "") {
    				this.$refs.alert.showMOdal("请填写代理人执业证号")
    				return false
    			}else if(!reg.test(this.DLSelfHoldUniversalInfo.agentQuafNo)){
    				this.$refs.alert.showMOdal("请录入十位数字的执业证号")
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

<style scoped type="text/css">
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
	}
	.clear{
	    content:"";
	    clear:both;
	    display:block
	}  
    .manage-contents{
        position: absolute;
        padding: 0 5%;
        left: 0;right: 0;top: 48px;bottom: 50px;
        overflow-y: auto;
        overflow-x: hidden;
        background: #FFF;
    }
	h1{
	    text-align: center;
	    font-weight:bold;
	    margin: 40px 0 20px 0;
	} 
	input {
		border: none;
		text-align: center;
		font-size: 15px;
		width: auto;
	}
	.btnFoote{
	    border:0;
	    color:#fff;
	    width:100%;
	    height: 50px;
	    background:#FEB101;
	    height:50px
	}
	p{
		line-height: 25px;
	}
</style>