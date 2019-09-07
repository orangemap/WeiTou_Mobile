<template>
	<div>
		<Headerbtns :title = page_title>
			<div slot="left" class="back">
				<i class="fa fa-angle-left" @click="back()"></i>
			</div>
		</Headerbtns>
		<div class="manage-main-contents">
			<div class="barcode-area">
			    <img src="../../../../static/img/policy/2050501.jpg">
			</div>
			<div class="header"></div>
			<div class="content">
				<div style="margin-top:20px;">
					<h4 style="font-weight:bold;text-align:center;">投保人身保险新型产品风险测评问卷(宁波)</h4>
					<div class="title">
						<p class="left">
							投保人:<input type="text" readonly v-model="docTypeInfo.appntName">
						</p>
						<p class="right">
							投保单号:<input type="text" readonly readonly v-model="docTypeInfo.prtNo">
						</p>
					</div>
				</div>
				<div class="titName">
					<h1 style="float: left;width: 90%;text-align: left;padding-left: 10%;">尊敬的投保人:</h1>
					<p style="width: 80%;float: left;padding-left: 10%;padding-right: 10%;text-align: justify;line-height: 20px;">根据中国保险监督管理委员会宁波监管局的要求,为了协助销售人员客观评价您的风险承受能力、缴费能力、保障需求和投保目的,请您如实回答以下问题:</p>
				</div>
				<!-- 问题1 -->
				<div class="question1">
					<p>1. &nbsp;&nbsp;&nbsp;您此次的投保目的:(
						<input type="text" readonly class="kuohaoInput" maxlength="1" v-model="docTypeInfo.purpose">)
					</p>
					<ul>
                        <li>a.理财为主,人身保险保障为辅</li>
                        <li>b.人身保险保障为主,理财为辅</li>
                        <li>c.人身保险保障</li>
                    </ul>
				</div>
				<!-- 问题2 -->
				<div class="question2">
					<p>2. &nbsp;&nbsp;&nbsp;您的主要收入来源:(
						<input type="text" readonly class="kuohaoInput" maxlength="1" v-model="docTypeInfo.sourceOfIncome">)
					</p>
					<ul>
                        <li>a.工薪/退休金、银行利息、房产租赁输入</li>
                        <li>b.股票、债券收益、企业利润</li>
                        <li>c.其他</li>
                    </ul>
				</div>
				<!-- 问题3 -->
				<div class="question3">
					<p>3. &nbsp;&nbsp;&nbsp;您的家庭年收入为(折合人民币):(
						<input type="text" readonly class="kuohaoInput" maxlength="1" v-model="docTypeInfo.familySalay">)
					</p>
					<ul>
                        <li>a. 20万以上</li>
                        <li>b.10-20万元</li>
                        <li>c.9.99万-5万元</li>
                        <li>d.5万元以下</li>
                    </ul>
				</div>
				<!-- 问题4 -->
				<div class="question4">
					<p>
						4.&nbsp;&nbsp;&nbsp;您本次所投保产品的保险期间是<input type="text" readonly maxlength="8" v-model="docTypeInfo.insuYears">年,
						交费期间是<input type="text" readonly maxlength="8" v-model="docTypeInfo.payYears">年交;
					</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;您所购买保险产品需要缴纳一定的保费:</p>
					<p>
						<span class="chooseTit">
							&nbsp;&nbsp;&nbsp;&nbsp;(1)若您选择一次性缴纳全部保费,在缴纳保费后是否有足够的流动资金用于支付家庭日常开支?
						</span>
						<span class="choose">
							a.<input type="checkbox" disabled v-model="docTypeInfo.allPayItem_a" 
							@click="click4_1('yes')">是&nbsp;&nbsp;&nbsp;&nbsp;
							b.<input type="checkbox" disabled v-model="docTypeInfo.allPayItem_b" 
							@click="click4_1('no')">否
						</span>
					</p>
					<p>
						<span class="chooseTit">
							&nbsp;&nbsp;&nbsp;&nbsp;(2)若您本次选择的产品是分期缴纳保险费,则您是否确保在以后的交费期间内具有持续缴费能力?(我们提醒您根据自己的实际交费能力,慎重选择适合您的保险期间、交费期间,无法持续缴纳保险费可能导致合同效力中止或合同解除,可能因此给您造成损失)
						</span>
						<span class="choose">
							a.<input type="checkbox" disabled v-model="docTypeInfo.periodPayItem_a" @change="click4_2('yes')">是&nbsp;&nbsp;&nbsp;&nbsp;
							b.<input type="checkbox" disabled v-model="docTypeInfo.periodPayItem_b" @change="click4_2('no')">否
						</span>
					</p>
					<p>
						<span class="chooseTit">
							5.&nbsp;&nbsp;&nbsp;您是否清楚保单的红利分配是不确定的?是否清楚分红及红利数额是由保险公司根据每年的实际经营成果而确定?
						</span>
						<span class="choose">
							a.<input type="checkbox" disabled v-model="docTypeInfo.bonusItem_a" @change="click5('yes')">是&nbsp;&nbsp;&nbsp;&nbsp;
							b.<input type="checkbox" disabled v-model="docTypeInfo.bonusItem_b" @change="click5('no')">否
						</span>
					</p>
					<p>
						<span class="chooseTit">
							6.&nbsp;&nbsp;&nbsp;您是否清楚在犹豫期外、合同满期前退保可能是有损失的? 是否清楚退保金额可能大大低于所交保费?
						</span>
						<span class="choose">
							a.<input type="checkbox" disabled v-model="docTypeInfo.refundItem_a" @change="click6('yes')">是&nbsp;&nbsp;&nbsp;&nbsp;
							b.<input type="checkbox" disabled v-model="docTypeInfo.refundItem_b" @change="click6('no')">否
						</span>
					</p>
					<p>
						<span class="chooseTit">
							7.&nbsp;&nbsp;&nbsp;您是否接受新型保险产品收益的不确定性,实际收益可能与预期收益不相符? 
						</span>
						<span class="choose">
							a.<input type="checkbox" disabled v-model="docTypeInfo.bnfItem_a" @change="click7('yes')">是&nbsp;&nbsp;&nbsp;&nbsp;
							b.<input type="checkbox" disabled v-model="docTypeInfo.bnfItem_b" @change="click7('no')">否
						</span>
					</p>
					<p>
						<span class="chooseTit">
							8.&nbsp;&nbsp;&nbsp;在您投保过程中,本公司业务人员或银行销售人员是否就保险责任、责任免除、犹豫期和退保等内容向您进行了解释和说明?
						</span>
						<span class="choose">
							a.<input type="checkbox" disabled v-model="docTypeInfo.explainItem_a" @change="click8('yes')">是&nbsp;&nbsp;&nbsp;&nbsp;
							b.<input type="checkbox" disabled v-model="docTypeInfo.explainItem_b" @change="click8('no')">否
						</span>
					</p>
					<p>
						<span class="chooseTit">
							9.&nbsp;&nbsp;&nbsp;您及被保险人是否在投保申请书上亲笔签名 (若被保险人未满 18 周岁则由其监护人亲笔签名) ?
						</span>
						<span class="choose">
							a.<input type="checkbox" disabled v-model="docTypeInfo.signItem_a" @change="click9('yes')">是&nbsp;&nbsp;&nbsp;&nbsp;
							b.<input type="checkbox" disabled v-model="docTypeInfo.signItem_b" @change="click9('no')">否
						</span>
					</p>
					<p>
						<span class="chooseTit">
							10.&nbsp;&nbsp;&nbsp;您每月基本生活支出占您个人当月收入比例? 
						</span>
						<span class="choose">
							a.<input type="checkbox" disabled v-model="docTypeInfo.salayItem_a" @change="click10('yes')">40%以下
							b.<input type="checkbox" disabled v-model="docTypeInfo.salayItem_b" @change="click10('no')">40%-80%
						</span>
					</p>
				</div>
				<!-- 投保人声明 -->
				<div class="shengming">
					<b>投保人声明:</b>
					<p>本人已经接受承受能力评估,就上述问题已全部真实作答,
						<b>且知晓自签收保单之日起10天内为犹豫期,犹豫期内可以无条件解除保险合同,应退还全部所交保费。</b>
					</p>
					<div style="margin-top:10px;">
						<span>投保人签字:
						<!-- <input type="text" disabled v-model="docTypeInfo.appSign"> -->
							<img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">
						</span>
						<br>
						<br>
						<span>日期:
							<!-- <input type="text" readonly v-model="docTypeInfo.appSignDate"> -->
						</span>
					</div>
				</div>
				<!-- 客户风险承受能力等级表 -->
				<div class="table">
					<h1>客户风险承受能力等级表</h1>
					<table>
						<tr>
							<td>等级</td>
							<td>累计分数</td>
						</tr>
						<tr>
							<td>低级</td>
							<td>50分及以下</td>
						</tr>
						<tr>
							<td>中级</td>
							<td>51分-70分</td>
						</tr>
						<tr>
							<td>高级</td>
							<td>71分以上</td>
						</tr>
					</table>
					<h1>测评标准: a. 8分    b. 5分    c. 3分    d. 1分</h1>
				</div>
				<div>
					<!-- <button style="width:22%;margin-left:10%;margin-top:5px;margin-bottom:10px;" @click="calculation">提交</button> -->
				</div>
				<!-- 结果 -->
				<div class="result">
					<p style="margin-bottom:15px;">测评结果 (销售人员填写)</p>
					<p class="level">该客户风险承受能力为<input type="text" readonly v-model="docTypeInfo.riskLevel">级</p>
					<p style="margin-top:10px;">
						<span style="padding: 3px 0;">销售人员签字:
						<!-- <input type="text" disabled v-model="docTypeInfo.agentSign" style="width:75px"> -->
						<img :src="signImgsAgent" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">
						</span>
						<br>
						<span style="padding: 3px 0;display: inline-block;height: 10px;">日期:
							<!-- <input type="text" readonly v-model="docTypeInfo.agentSignDate" style="width:75px"> -->
						</span>
					</p>
				</div>
				<div style="margin-left:5%;margin-bottom:5%;">
					<input type="checkbox"  v-model="isAgree">&nbsp;&nbsp;本人{{docTypeInfo.appntName}}理解并回答问卷全部内容,情况属实,真是有效。
				</div>
			</div>
		</div>
		<alert ref="alert"></alert>
		<Footerbtns :is_show=false v-if="!calPass"
			total_premium="10000.00">
			<button class="btnFoote" slot="center" @click="jumpToBack" :disabled="!isAgree">
				测  评
			</button>
		</Footerbtns>
	</div>
</template>

<script>
	import Headerbtns from '../../common/Header.vue'
	import Footerbtns from '../../policy/common/Footer.vue'
	import alert from '../../policy/common/alert.vue'
	export default{
		name:'nbSurveyBook',
		components: {Headerbtns,Footerbtns,alert},
		data(){
			return{
				calPass:false,
				page_title: '宁波测评问卷',
				current_total_premium: '10000.00',
				isAgree:false,
				isShare:this.$route.params.share,
				saveName:"2050501",
				channel:this.$route.params.channel,
				sign:JSON.parse(this.$route.params.signImgs),
				signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
				docTypeInfo:{
					appntName:this.$route.params.applicant,
					prtNo:'',
					purpose:'',
					sourceOfIncome:'',
					familySalay:'',
					insuYears:'',
					payYears:'',
					allPayItem:'',
					allPayItem_a:false,
					allPayItem_b:false,
					periodPayItem:'',
					periodPayItem_a:false,
					periodPayItem_b:false,
					bonusItem:'',
					bonusItem_a:false,
					bonusItem_b:false,
					refundItem:'',
					refundItem_a:false,
					refundItem_b:false,
					bnfItem:'',
					bnfItem_a:false,
					bnfItem_b:false,
					explainItem:'',
					explainItem_a:false,
					explainItem_b:false,
					signItem:'',
					signItem_a:false,
					signItem_b:false,
					salayItem:'',
					salayItem_a:false,
					salayItem_b:false,
					appSign:'',
					appSignDate:'',
					riskLevel:'',
					agentSign:'',
					agentSignDate:''
				}
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
			// 'docTypeInfo.riskLevel': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval && val == ""){
			// 			this.calPass = false
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.purpose': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.sourceOfIncome': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.familySalay': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.allPayItem_a': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.periodPayItem_a': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.bonusItem_a': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.refundItem_a': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.bnfItem_a': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.explainItem_a': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.signItem_a': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
			// 'docTypeInfo.salayItem_a': {
			// 	handler(val,oldval) {
			// 		if(val!=oldval){
			// 			this.docTypeInfo.riskLevel = ""
			// 		}
			// 	},
			// 	deep: true
			// },
		},
		beforeMount(){
			$(".btnFoote").css({'opacity':0.5})
		},
		mounted(){
			$(".btnFoote").css({'opacity':0.5})
			
			var _header = $(".manage-main-contents")
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
			
			this.getNBinfo()
		},
		updated(){
			this.getNowFormatDate()
		},
		methods:{
			jumpToBack(){
				this.calculation()
			    // if(this.isShare){
			    //     var isCheck=this.checkall()
			    //     if(this.isAgree && isCheck){
			    //      this.$router.back()
			    //     }
			    //     return
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
			    							name:"2050501",
			    							isRed:"0",  
			    							content:this.docTypeInfo,
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
			    							name:"2050501",
			    							isRed:"0",  
			    							content:this.docTypeInfo,
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
										name:"2050501",
										isRed:"1",  
										content:this.docTypeInfo,
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
										name:"2050501",
										isRed:"1",  
										content:this.docTypeInfo,
									}
									
							}
					})
				}
			    
			},
			calculation(){
				let totalScore = 0
				//第1题
				if(this.docTypeInfo.purpose == "a"){
					totalScore+=8
				}else if(this.docTypeInfo.purpose == "b"){
					totalScore+=5
				}else if(this.docTypeInfo.purpose == "c"){
					totalScore+=3
				}
				//第2题
				if(this.docTypeInfo.sourceOfIncome == "a"){
					totalScore+=8
				}else if(this.docTypeInfo.sourceOfIncome == "b"){
					totalScore+=5
				}else if(this.docTypeInfo.sourceOfIncome == "c"){
					totalScore+=3
				}
				//第3题
				if(this.docTypeInfo.familySalay == "a"){
					totalScore+=8
				}else if(this.docTypeInfo.familySalay == "b"){
					totalScore+=5
				}else if(this.docTypeInfo.familySalay == "c"){
					totalScore+=3
				}else if(this.docTypeInfo.familySalay == "d"){
					totalScore+=1
				}
				//第4-1题
				if(this.docTypeInfo.allPayItem_a){
					totalScore+=8
				}else if(this.docTypeInfo.allPayItem_b){
					totalScore+=5
				}
				//第4-2题
				if(this.docTypeInfo.periodPayItem_a){
					totalScore+=8
				}else if(this.docTypeInfo.periodPayItem_b){
					totalScore+=5
				}
				//第5题
				if(this.docTypeInfo.bonusItem_a){
					totalScore+=8
				}else if(this.docTypeInfo.bonusItem_b){
					totalScore+=5
				}
				//第6题
				if(this.docTypeInfo.refundItem_a){
					totalScore+=8
				}else if(this.docTypeInfo.refundItem_b){
					totalScore+=5
				}
				//第7题	
				if(this.docTypeInfo.bnfItem_a){
					totalScore+=8
				}else if(this.docTypeInfo.bnfItem_b){
					totalScore+=5
				}
				//第8题
				if(this.docTypeInfo.explainItem_a){
					totalScore+=8
				}else if(this.docTypeInfo.explainItem_b){
					totalScore+=5
				}
				//第9题
				if(this.docTypeInfo.signItem_a){
					totalScore+=8
				}else if(this.docTypeInfo.signItem_b){
					totalScore+=5
				}
				//第10题
				if(this.docTypeInfo.salayItem_a){
					totalScore+=8
				}else if(this.docTypeInfo.salayItem_b){
					totalScore+=5
				}
				if(this.checkall(2)){
					this.docTypeInfo.riskLevel = ""
					console.log("最终得分: "+totalScore)
					if(totalScore <= 50){
						this.docTypeInfo.riskLevel = "低"
					}else if(50 < totalScore && totalScore <= 70){
						this.docTypeInfo.riskLevel = "中"
					}else if(70 < totalScore){
						this.docTypeInfo.riskLevel = "高"
					}
					this.calPass = true
				}
			},
			showMsg:function(msg){
				if(msg!=undefined && msg!=""){
					this.$refs.alert.showMOdal(msg)
				}
			},
			reportPage(){
				if(this.checkall(1)){
					this.calculation()
					this.NBinfo()
					this.$router.push({
						name: 'customer_details_page',
						params: {
							planId: this.$route.params.planId
						}
					})
				}
			},
			getNBinfo(){
				let requ = {
					"policy": {
						"substepNo": "1",
						"orderCode": this.$route.params.planId
					}
	    		}
	    		utils.http.post('MOHQPOLICYMSG',requ).then(response => {
	    			console.log(response.data.response.policy.docTypeInfo.TB2_2050501)
					if(response.data.header.responseCode == 0){
                        this.docTypeInfo = response.data.response.policy.docTypeInfo.TB2_2050501
                        this.docTypeInfo.prtNo = response.data.response.policy.applyCode
						this.docTypeInfo.appntName = response.data.response.policy.custInfo.appnt.appntName
                       	console.log(response.data.response.policy.docTypeInfo.TB2_2050501)
						if(this.docTypeInfo.allPayItem != ""){
							this.docTypeInfo.allPayItem=(this.docTypeInfo.allPayItem == "false")?false:true
						}else{
							this.docTypeInfo.allPayItem = false
						}
						if(this.docTypeInfo.allPayItem_a != ""){
							this.docTypeInfo.allPayItem_a=(this.docTypeInfo.allPayItem_a == "false")?false:true
						}else{
							this.docTypeInfo.allPayItem_a = false
						}
						if(this.docTypeInfo.allPayItem_b != ""){
							this.docTypeInfo.allPayItem_b=(this.docTypeInfo.allPayItem_b == "false")?false:true
						}else{
							this.docTypeInfo.allPayItem_b = false
						}
						if(this.docTypeInfo.bnfItem != ""){
							this.docTypeInfo.bnfItem=(this.docTypeInfo.bnfItem == "false")?false:true
						}else{
							this.docTypeInfo.bnfItem = false
						}
						if(this.docTypeInfo.bnfItem_a != ""){
							this.docTypeInfo.bnfItem_a=(this.docTypeInfo.bnfItem_a == "false")?false:true
						}else{
							this.docTypeInfo.bnfItem_a = false
						}
						if(this.docTypeInfo.bnfItem_b != ""){
							this.docTypeInfo.bnfItem_b=(this.docTypeInfo.bnfItem_b == "false")?false:true
						}else{
							this.docTypeInfo.bnfItem_b = false
						}
						if(this.docTypeInfo.bonusItem != ""){
							this.docTypeInfo.bonusItem=(this.docTypeInfo.bonusItem == "false")?false:true
						}else{
							this.docTypeInfo.bonusItem = false
						}
						if(this.docTypeInfo.bonusItem_a != ""){
							this.docTypeInfo.bonusItem_a=(this.docTypeInfo.bonusItem_a == "false")?false:true
						}else{
							this.docTypeInfo.bonusItem_a = false
						}
						if(this.docTypeInfo.bonusItem_b != ""){
							this.docTypeInfo.bonusItem_b=(this.docTypeInfo.bonusItem_b == "false")?false:true
						}else{
							this.docTypeInfo.bonusItem_b = false
						}
						if(this.docTypeInfo.explainItem != ""){
							this.docTypeInfo.explainItem=(this.docTypeInfo.explainItem == "false")?false:true
						}else{
							this.docTypeInfo.explainItem = false
						}
						if(this.docTypeInfo.explainItem_a != ""){
							this.docTypeInfo.explainItem_a=(this.docTypeInfo.explainItem_a == "false")?false:true
						}else{
							this.docTypeInfo.explainItem_a = false
						}
						if(this.docTypeInfo.explainItem_b != ""){
							this.docTypeInfo.explainItem_b=(this.docTypeInfo.explainItem_b == "false")?false:true
						}else{
							this.docTypeInfo.explainItem_b = false
						}
						if(this.docTypeInfo.periodPayItem != ""){
							this.docTypeInfo.periodPayItem=(this.docTypeInfo.periodPayItem == "false")?false:true
						}else{
							this.docTypeInfo.periodPayItem = false
						}
						if(this.docTypeInfo.periodPayItem_a != ""){
							this.docTypeInfo.periodPayItem_a=(this.docTypeInfo.periodPayItem_a == "false")?false:true
						}else{
							this.docTypeInfo.periodPayItem_a = false
						}
						if(this.docTypeInfo.periodPayItem_b != ""){
							this.docTypeInfo.periodPayItem_b=(this.docTypeInfo.periodPayItem_b == "false")?false:true
						}else{
							this.docTypeInfo.periodPayItem_b = false
						}
						if(this.docTypeInfo.refundItem != ""){
							this.docTypeInfo.refundItem=(this.docTypeInfo.refundItem == "false")?false:true
						}else{
							this.docTypeInfo.refundItem = false
						}
						if(this.docTypeInfo.refundItem_a != ""){
							this.docTypeInfo.refundItem_a=(this.docTypeInfo.refundItem_a == "false")?false:true
						}else{
							this.docTypeInfo.refundItem_a = false
						}
						if(this.docTypeInfo.refundItem_b != ""){
							this.docTypeInfo.refundItem_b=(this.docTypeInfo.refundItem_b == "false")?false:true
						}else{
							this.docTypeInfo.refundItem_b = false
						}
						if(this.docTypeInfo.salayItem != ""){
							this.docTypeInfo.salayItem=(this.docTypeInfo.salayItem == "false")?false:true
						}else{
							this.docTypeInfo.salayItem = false
						}
						if(this.docTypeInfo.salayItem_a != ""){
							this.docTypeInfo.salayItem_a=(this.docTypeInfo.salayItem_a == "false")?false:true
						}else{
							this.docTypeInfo.salayItem_a = false
						}
						if(this.docTypeInfo.salayItem_b != ""){
							this.docTypeInfo.salayItem_b=(this.docTypeInfo.salayItem_b == "false")?false:true
						}else{
							this.docTypeInfo.salayItem_b = false
						}
						if(this.docTypeInfo.signItem != ""){
							this.docTypeInfo.signItem=(this.docTypeInfo.signItem == "false")?false:true
						}else{
							this.docTypeInfo.signItem = false
						}
						if(this.docTypeInfo.signItem_a != ""){
							this.docTypeInfo.signItem_a=(this.docTypeInfo.signItem_a == "false")?false:true
						}else{
							this.docTypeInfo.signItem_a = false
						}
						if(this.docTypeInfo.signItem_b != ""){
							this.docTypeInfo.signItem_b=(this.docTypeInfo.signItem_b == "false")?false:true
						}else{
							this.docTypeInfo.signItem_b = false
						}
					}else{
						this.showMsg(response.data.header.errorMessage)
					}
	    		})
			},
			NBinfo(){
				let requ = {
					"policy": {
						"deviceNo": "",
						"channel": this.$route.params.channel,
						"substepNo": "CQ",
						"isInsert": "",
						"agentCode": this.$route.params.agentCode,
						"orderCode": this.$route.params.planId,
						"docType": "TB2_2050501",
						"docTypeInfo": {
							"TB2_2050501": this.docTypeInfo
						}
					}
				}
				utils.http.post('MODISTRIESAVE', requ).then(response => {
					console.log(response.data.response)
				})
			},
			checkall(type){
				let result = ""
				result += this.checkName()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkPurpose()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkSourceOfIncome()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkFamilySalay()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkInsuYears()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkPayYears()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkquestion4()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkquestion5()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkquestion6()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkquestion7()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkquestion8()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkquestion9()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkquestion10()
				if(result != ''){
					this.showMsg(result)
					return false
				}
				result += this.checkRiskLevel(type)
				if(result != ''){
					this.showMsg(result)
					return false
				}
				return true
			},
			click4_1(data){
				if(data == 'yes'){
					this.docTypeInfo.allPayItem_b = false
					if(this.docTypeInfo.allPayItem_a == false){
						this.docTypeInfo.allPayItem_a = true
						this.docTypeInfo.allPayItem = true
					}else{
						this.docTypeInfo.allPayItem_a = false
						this.docTypeInfo.allPayItem = false
					}
				}
				if(data == 'no'){
					this.docTypeInfo.allPayItem_a = false
					if(this.docTypeInfo.allPayItem_b == false){
						this.docTypeInfo.allPayItem_b = true
						this.docTypeInfo.allPayItem = true
					}else{
						this.docTypeInfo.allPayItem_b = false
						this.docTypeInfo.allPayItem = false
					}
				}
			},
			click4_2(data){
				if(data == 'yes'){
					this.docTypeInfo.periodPayItem_b = false
					if(this.docTypeInfo.periodPayItem_a == true){
						this.docTypeInfo.periodPayItem_a = true
						this.docTypeInfo.periodPayItem = true
					}else{
						this.docTypeInfo.periodPayItem_a = false
						this.docTypeInfo.periodPayItem = false
					}
				}
				if(data == 'no'){
					this.docTypeInfo.periodPayItem_a = false
					if(this.docTypeInfo.periodPayItem_b == true){
						this.docTypeInfo.periodPayItem_b = true
						this.docTypeInfo.periodPayItem = true
					}else{
						this.docTypeInfo.periodPayItem_b = false
						this.docTypeInfo.periodPayItem = false
					}
				}
			},
			click5(data){
				if(data == 'yes'){
					this.docTypeInfo.bonusItem_b = false
					if(this.docTypeInfo.bonusItem_a == true){
						this.docTypeInfo.bonusItem = true
					}else{
						this.docTypeInfo.bonusItem = false
					}
				}
				if(data == 'no'){
					this.docTypeInfo.bonusItem_a = false
					if(this.docTypeInfo.bonusItem_b == true){
						this.docTypeInfo.bonusItem = true
					}else{
						this.docTypeInfo.bonusItem = false
					}
				}
			},
			click6(data){
				if(data == 'yes'){
					this.docTypeInfo.refundItem_b = false
					if(this.docTypeInfo.refundItem_a == true){
						this.docTypeInfo.refundItem = true
					}else{
						this.docTypeInfo.refundItem = false
					}
				}
				if(data == 'no'){
					this.docTypeInfo.refundItem_a = false
					if(this.docTypeInfo.refundItem_b == true){
						this.docTypeInfo.refundItem = true
					}else{
						this.docTypeInfo.refundItem = false
					}
				}
			},
			click7(data){
				if(data == 'yes'){
					this.docTypeInfo.bnfItem_b = false
					if(this.docTypeInfo.bnfItem_a == true){
						this.docTypeInfo.bnfItem = true
					}else{
						this.docTypeInfo.bnfItem = false
					}
				}
				if(data == 'no'){
					this.docTypeInfo.bnfItem_a = false
					if(this.docTypeInfo.bnfItem_b == true){
						this.docTypeInfo.bnfItem = true
					}else{
						this.docTypeInfo.bnfItem = false
					}
				}
			},
			click8(data){
				if(data == 'yes'){
					this.docTypeInfo.explainItem_b = false
					if(this.docTypeInfo.explainItem_a == true){
						this.docTypeInfo.explainItem = true
					}else{
						this.docTypeInfo.explainItem = false
					}
				}
				if(data == 'no'){
					this.docTypeInfo.explainItem_a = false
					if(this.docTypeInfo.explainItem_b == true){
						this.docTypeInfo.explainItem = true
					}else{
						this.docTypeInfo.explainItem = false
					}
				}
			},
			click9(data){
				if(data == 'yes'){
					this.docTypeInfo.signItem_b = false
					if(this.docTypeInfo.signItem_a == true){
						this.docTypeInfo.signItem = true
					}else{
						this.docTypeInfo.signItem = false
					}
				}
				if(data == 'no'){
					this.docTypeInfo.signItem_a = false
					if(this.docTypeInfo.signItem_b == true){
						this.docTypeInfo.signItem = true
					}else{
						this.docTypeInfo.signItem = false
					}
				}
			},
			click10(data){
				if(data == 'yes'){
					this.docTypeInfo.salayItem_b = false
					if(this.docTypeInfo.salayItem_a == true){
						this.docTypeInfo.salayItem = true
					}else{
						this.docTypeInfo.salayItem = false
					}
				}
				if(data == 'no'){
					this.docTypeInfo.salayItem_a = false
					if(this.docTypeInfo.salayItem_b == true){
						this.docTypeInfo.salayItem = true
					}else{
						this.docTypeInfo.salayItem = false
					}
				}
			},
			getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ":";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
				// this.docTypeInfo.appSignDate = currentdate
				// this.docTypeInfo.agentSignDate = currentdate
			},
			checkName(){
				let inputName = this.docTypeInfo.appntName.replace(/[^\x00-\xff]/g, "***").length;
				if(this.docTypeInfo.appntName.indexOf(" ") != -1){
					return '姓名不能包含空格,请检查！'
				}
				if (inputName < 3) {
					return '姓名不能小于三个字节,请检查'
				}
				if (this.docTypeInfo.appntName == 'undefined' || this.docTypeInfo.appntName == "") {
					return '姓名未填写,请检查.'
				}
				if (this.docTypeInfo.appntName.length > 120) {
					return '姓名长度不能超过120位,请检查'
				}
				let pattern = new RegExp("[0123456789`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
				if (pattern.test(this.docTypeInfo.appntName)) {
					return '姓名不能包含特殊字符或数字,请检查'
				}
				return '';
			},
			checkquestion4() {
				if (this.docTypeInfo.allPayItem_a == false && this.docTypeInfo.allPayItem_b == false && this.docTypeInfo.periodPayItem_a == false && this.docTypeInfo.periodPayItem_b == false) {
					return '请回答第4题'
				}
				if ((this.docTypeInfo.allPayItem_a == true || this.docTypeInfo.allPayItem_b) && (this.docTypeInfo.periodPayItem_a == true || this.docTypeInfo.periodPayItem_b == true)) {
					return '4.1与4.2不可同时勾选'
				}
				return '';
			},
			checkquestion5() {
				if ((this.docTypeInfo.bonusItem != true && this.docTypeInfo.bonusItem != false) || (this.docTypeInfo.bonusItem_a == false && this.docTypeInfo.bonusItem_b == false)) {
					return '请回答第5题'
				}
				return '';

			},
			checkquestion6() {
				if ((this.docTypeInfo.refundItem != true && this.docTypeInfo.refundItem != false) || (this.docTypeInfo.refundItem_a == false && this.docTypeInfo.refundItem_b == false)) {
					return '请回答第6题'
				}
				return '';
			},
			checkquestion7() {
				if ((this.docTypeInfo.bnfItem != true && this.docTypeInfo.bnfItem != false) || (this.docTypeInfo.bnfItem_a == false && this.docTypeInfo.bnfItem_b == false)) {
					return '请回答第7题'
				}
				return '';

			},
			checkquestion8() {
				if ((this.docTypeInfo.explainItem != true && this.docTypeInfo.explainItem != false) || (this.docTypeInfo.explainItem_a == false && this.docTypeInfo.explainItem_b == false)) {
					return '请回答第8题'
				}
				return '';

			},
			checkquestion9() {
				if ((this.docTypeInfo.signItem != true && this.docTypeInfo.signItem != false) || (this.docTypeInfo.signItem_a == false && this.docTypeInfo.signItem_b == false)) {
					return '请回答第9题'
				}
				return '';

			},
			checkquestion10() {
				if (this.docTypeInfo.salayItem == '' || this.docTypeInfo.salayItem == 'undefined') {
					return '请回答第10题'
				}
				return '';
			},
			checkRiskLevel(type) {
				if(type == 1){
					if (this.docTypeInfo.riskLevel == '') {
						return '请提交问卷进行承受能力评估'
					}
				}
				return '';
			},
			/*第1题*/
			checkPurpose() {
				if (this.docTypeInfo.purpose == '' || this.docTypeInfo.purpose == null) {
					return '请回答第1题'
				} else if (this.docTypeInfo.purpose != 'a' && this.docTypeInfo.purpose != 'b' && this.docTypeInfo.purpose != 'c') {
					return '投保目的请输入a/b/c'
				}
				return ''
			},
			/*第2题*/
			checkSourceOfIncome(){
				if (this.docTypeInfo.sourceOfIncome == '' || this.docTypeInfo.sourceOfIncome == null) {
					return '请回答第2题'
				} else if (this.docTypeInfo.sourceOfIncome != 'a' && this.docTypeInfo.sourceOfIncome != 'b' && this.docTypeInfo.sourceOfIncome != 'c') {
					return '收入来源请输入a/b/c'
				}
				return ''
			},
			/*第3题*/
			checkFamilySalay(){
				if (this.docTypeInfo.familySalay == '' || this.docTypeInfo.familySalay == null) {
					return '请回答第3题' + '\n';
				} else if (this.docTypeInfo.familySalay != 'a' && this.docTypeInfo.familySalay != 'b' && this.docTypeInfo.familySalay != 'c' && this.docTypeInfo.familySalay != 'd') {
					return '家庭收入请输入a/b/c/d'
				}
				return ''
			},
			/*保险期间*/
			checkInsuYears(){
				if (this.docTypeInfo.insuYears == '' || this.docTypeInfo.insuYears == null) {
					return '请填写保险期间'
				}
				return ''
			},
			/*交费期间*/
			checkPayYears(){
				if (this.docTypeInfo.payYears == '' || this.docTypeInfo.payYears == null) {
					return '请填写交费期间'
				}
				return ''
			}
		}
	}
</script>

<style lang="scss" scoped type="text/css">
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
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 50px;
		overflow-y: auto;
		overflow-x: hidden;
		background: #FFF;
		font-size:12px;
		.header{
			float: right;
			display: block;
			width: 120px;height: 60px;
			background: url("../../../../static/img/policy/logo.png")no-repeat right center;
			background-size: 100% 70%;
		}
		.content{
			float: left;
			width: 100%;
			h1{
				text-align: center;
				padding: 5px 0;
				font-size: 14px;
				font-weight: bold;
			}
			.title{
				width: 100%;height: 40px;
				.left,.right{
					float: left;
					padding-left: 10%;
					width: 100%;line-height: 40px;
					input{
						display: inline-block;
						width: 65%;
						border-bottom: 1px solid #000;
						text-align: center;
					}
				}
			}
			.question1,.question2,.question3,.question4{
				width: 80%;
				float: left;
				margin-top:5px;
				padding: 0 10%;
				input{
					display: inline-block;
					width: 30px;
					text-align: center;
				}
				li{
					padding:2px 0 2px 15%;
					line-height: 20px;
				}
			}
			.question3{
				padding-right: 5%;
				width: 90%;
				li:nth-child(1){width: 45%;float: left;}
				li:nth-child(3){width: 45%;float: left;}
			}
			.question4{
				p{
					padding-bottom: 10px;
				}
				input{
					display: inline-block;
					width: 60px;
					border-bottom:1px solid #000;
				}
				.chooseTit{
					float: left;
					display: block;
					line-height: 20px;
				}
				.choose{
					float: right;
					height: 18px;
					line-height: 18px;
					margin-bottom: 10px;
					input{
						width: 30px;height: 15px;
						margin-top:2px;
					}
				}
			}
		}
		.shengming{
			float: left;
			width: 80%;
			padding-left:10%;
			padding-right:10%;
			b{
				font-size: 14px;
				font-weight: bold;
				margin-bottom: 10px;
			}
			p{
				line-height: 20px;
				b{
					padding-left:0;
					font-size: 14px;
				}
			}
			div{
				input{
					display: inline-block;
					width: 85px;
					border-bottom:1px solid #000;
					background: none;
				}
			}
		}
		.table{
			float: left;
			width: 100%;
			margin:auto;
			table{
				width: 80%;
				margin: auto;
				border: 2px solid #000;
				tr{
					height: 30px;
					line-height: 30px;
					border-bottom: 1px solid #000;
				}
				td{
					border-right: 1px solid #000;
					text-align: center;
				}
			}
		}
		.result{
			float: left;
			width: 80%;
			margin-top: 10px;
			padding-right:10%;
			padding-left: 10%;
			padding-bottom:15px;
			input{
				background: none;
				border-bottom: 1px solid #000;
				text-align: center;
			}
			.level{
				margin-bottom: 5px;
				input{
					display: inline-block;
					width: 75px;
					border-bottom: 1px solid #000;
				}
			}
		}
	}
	.barcode-area>img{
		width:120px;
		height:60px;
		float:left;
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