<!--问卷页面-->
<template>
	<div id="content">
		<Headerbtns :title = page_title>
			<div slot="left" class="back" @click="back">
				<i class="fa fa-angle-left" ></i>
			</div>
		</Headerbtns>
		<div class="manage-main-contents">
			<div class="header"></div>
			<div class="content">
				<div>
					<h1>人身保险客户需求分析基准问卷(2014版)</h1>
					<ul>
						<li>
							<span>姓名:</span>
							<input type="text" readonly class="underText" placeholder="请输入姓名" v-model="docTypeInfo.appntName">
						</li>
						<li>
							<span>性别:</span>
							<input type="text" readonly class="underText" placeholder="请输入性别" v-model="docTypeInfo.appntSex">
						</li>
						<li>
							<span>年龄:</span>
							<input type="text" readonly class="underText" placeholder="请输入年龄" v-model="docTypeInfo.appntAge">
						</li>
					</ul>
					<p>
						本问卷能够帮助您选择购买最适合的保险产品。请您在所选答案前"打钩"(可多选),并填写有关内容。
					</p>
					<p style="font-weight: bold;">
						我们将对您的信息保密。
					</p>
				</div>
				<div class="content_1">
					<u>保险需求分析</u>
					<div class="one">
						<p class="title">
							1.您和您家人已经获得的保险保障有哪些? 
						</p>
						<div class="choose">
							<div>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.socialInsu">
									A 社会保险
									(
									<input type="checkbox" disabled v-model="docTypeInfo.socialInsuA">
									a工伤保险
									<input type="checkbox" disabled v-model="docTypeInfo.socialInsuB">
									b社会医疗保险
									<input type="checkbox" disabled v-model="docTypeInfo.socialInsuC">
									c社会养老保险
									)
								</p>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.commercialInsu">
									B 商业保险
									(
									<input type="checkbox" disabled v-model="docTypeInfo.commercialInsuA">
									a意外险
									<input type="checkbox" disabled v-model="docTypeInfo.commercialInsuB">
									b健康险
									<input type="checkbox" disabled v-model="docTypeInfo.commercialInsuC">
									c人寿保险
									<input type="checkbox" disabled v-model="docTypeInfo.commercialInsuD">
									d年金保险
									)
								</p>
							</div>
							<p style="margin-bottom:5px;">如果购买了商业保险,您和您家人每年共花费多少钱购买商业保险</p>
							<div class="choose">
								<div>
									<p>
										<input type="checkbox" disabled v-model="docTypeInfo.insuCostA">
										A 5000元以下
										<input type="checkbox" disabled v-model="docTypeInfo.insuCostB">
										B 5000-10000元以下
										<input type="checkbox" disabled v-model="docTypeInfo.insuCostC">
										C 10000-20000元以下
										<input type="checkbox" disabled v-model="docTypeInfo.insuCostD">
										D 20000-50000元以下
										<input type="checkbox" disabled v-model="docTypeInfo.insuCostE">
										E 50000元以上
									</p>
								</div>
								<p style="margin-bottom:5px;">您和您的家人现在每年用于购买商业保险的资金是否超过家庭年收入的20%?</p>
								<div class="choose">
									<div>
										<p>
											<input type="checkbox" disabled v-model="docTypeInfo.exceedTwentyA">
											A 超过
											<input type="checkbox" disabled v-model="docTypeInfo.exceedTwentyB">
											B 未超过
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="two">
						<p class="title">
							2.您和您家人现在最需要购买哪些保险保障,每种保证赔付(给付)多少钱比较合适,保障期限多少年比较合适?
						</p>
						<div class="choose">
							<div>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.deathInsu">
									A 身故和残疾保障
									<input type="number" readonly class="yuan" v-model="docTypeInfo.deathInsuValue">元，
									保障<input type="text" readonly class="year" v-model="docTypeInfo.deathInsuYear">年
								</p>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.majorDiseaseInsu">
									B 重大疾病保障
									<input type="number" readonly class="yuan" v-model="docTypeInfo.majorDiseaseInsuValue">元，
									保障<input type="text" readonly class="year" v-model="docTypeInfo.majorDiseaseInsuYear">年
								</p>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.medicalInsu">
									C 医疗费用保障
									<input type="number" readonly class="yuan" v-model="docTypeInfo.medicalInsuValue">元，
									保障<input type="text" readonly class="year" v-model="docTypeInfo.medicalInsuYear">年
								</p>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.educationInsu">
									D 教育金
									<input type="number" readonly class="yuan" v-model="docTypeInfo.educationInsuValue">元，
									保障<input type="text" readonly class="year" v-model="docTypeInfo.educationInsuYear">年
								</p>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.survivalInsu">
									E 生存金返还 
									<input type="number" readonly class="yuan" v-model="docTypeInfo.survivalInsuValue">元，
									保障<input type="text" readonly class="year" v-model="docTypeInfo.survivalInsuYear">年
								</p>
								<p>
									<input type="checkbox" disabled  v-model="docTypeInfo.annuityInsu">
									F 年金/退休金收入保障 
									<input type="number" readonly class="yuan" v-model="docTypeInfo.annuityInsuValue">元，
									保障<input type="text" readonly class="year" v-model="docTypeInfo.annuityInsuYear">年
								</p>
							</div>
						</div>
					</div>
					<div class="three">
						<p class="title">
							3.您是否希望所购买的保险具有投资功能?如果是,请选择您想购买的类型;如果否,请选择D。
						</p>
						<div class="choose">
							<div>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.fengHong">
									A 分红保险:您可以每年分红,<b>但红利水平不确定,</b>如果保险公司没赚到钱,可能不分红。
								</p>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.wanNeng">
									B 万能保险:您可以从所交保险费中拿出一些钱,交给保险公司投资。投资收益率有最低保证, <b>但最低保证以上的收益不确定。</b>您的保险费被扣除一定初始费用和死亡风险保险费后,再交给保险公司投资,在投资过程中还可能定期被扣除一些保单管理费。
								</p>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.touLian">
									C 投资连结保险:您可以从所交保险费中拿出一些钱,交给保险公司投资,并根据自己的风险承受能力选择投资账号。<b>投资回报不确定,可能赚钱或亏钱。</b>您的保险费可能被扣除一些初始费用和死亡风险保险费后,再交给保险公司投资,在投资过程中还可能定期被扣除一些保单管理费和资产管理费。可投资保险费通过买入或卖出投资单位的方式进入投资账号,买入、卖出价格之间存在一定差价。
								</p>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.buKanZhong">
									D <b>不看重投资功能</b>
								</p>
							</div>
						</div>
					</div>
					<div class="four">
						<p class="title">
							4.在对家庭生活不造成过大影响的情况下,您打算用多少钱购买保险?您愿意一次性交费,还是分期交费?
						</p>
						<div class="choose">
							<div>
								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.allPayItem">
									A 一次性交 
									<input type="text" readonly class="yuan" v-model="docTypeInfo.allPayPrem">元
 								</p>
 								<p>
									<input type="checkbox" disabled v-model="docTypeInfo.periodPayItem">
									B 每年交
									<input type="text" readonly class="year" v-model="docTypeInfo.periodPayPrem">元,能够持续交
									<input type="text" readonly class="year" v-model="docTypeInfo.payYears">年
 								</p>
							</div>
						</div>
						<p class="title">提示:退保需谨慎,保障期满前要求退还保费一般会有损失。</p>
					</div>
				</div>
				<div class="content_2">
					<u>需求分析结果</u>
					<p style="padding-top: 5px;padding-bottom: 5px;">本栏由销售人员填写</p>
					<div class="choose">
						<div class="fenxi">
							<p>经分析，建议您购买<input type="text" readonly class="write" v-model="docTypeInfo.riskName">险，保险期间
                            <input type="text" readonly class="write" v-model="docTypeInfo.insuYears">年,基本保险金额
                            <input type="text" readonly class="write" v-model="docTypeInfo.amnt" @blur="clearNoNum">元。</p>
							<p>交费方式为:
								<span style="border-bottom: 1px solid #000;">
									<input type="checkbox" disabled v-model="docTypeInfo.payIntv_all">趸交/
									<input type="checkbox" disabled v-model="docTypeInfo.payIntv_year">年交/
									<input type="checkbox" disabled v-model="docTypeInfo.payIntv_halfYear">半年交/
									<input type="checkbox" disabled v-model="docTypeInfo.payIntv_quarter">季交/
									<input type="checkbox" disabled v-model="docTypeInfo.payIntv_month">月交/,
								</span>
								保险费<input type="text" readonly class="yuan" v-model="docTypeInfo.prem">元,
								交费期限<input type="text" readonly class="yuan" v-model="docTypeInfo.payYears1">年。
							</p>
						</div>
					</div>
				</div>
				<div class="content_3">
					<u>投保人确认栏</u>
					<p>如果以上问题都是由您本人回答,请在这里签名确认:
						<!-- <input type="text" readonly v-model="docTypeInfo.appSign" readonly> -->
						<img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;"><br>
						日期:<input type="text" readonly v-model="docTypeInfo.appSignDate">
					</p>
				</div>
				<div class="content_4">
					<u>销售人员确认栏</u>
					<p>
						销售人员签名:<!-- <input type="text" readonly v-model="docTypeInfo.agentSign"> -->
						<img :src="signImgsAgent" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;"><br>
						工号:<input readonly type="text" v-model="docTypeInfo.agentCode">
					</p>
					<p>
						单位:<input type="text" readonly v-model="docTypeInfo.agentCompany" readonly style="width:80%;">
					</p>
				</div>
				<div class="content_5">
					<u>审核人员确认栏</u>
					<p>审核意见:</p>
					<p>
						<input type="checkbox" disabled v-model="docTypeInfo.checkSugItem_yes">同意
					</p>
					<p>
						<input type="checkbox" disabled v-model="docTypeInfo.checkSugItem_no">不同意,原因
						<input type="text" readonly class="reason" v-model="docTypeInfo.checkReason">
					</p>
					<p class="data" style="padding-bottom: 10px;">日期:<input type="text" readonly v-model="docTypeInfo.checkSignDate"></p>
					<p style="margin-bottom:2px;">
						<span style="font-weight: bold;">本人已知晓保险从业人员不得违规销售非保险金融产品，由此造成的风险自行承担。</span>
					</p>
				</div>
				<!-- <div class="content_1_footer">
					<div class="top">
						<span>光大永明人寿保险有限公司重庆分公司</span>
						<span>地址:重庆市渝中区八一路108号纽约·纽约大厦16层</span>
					</div>
					<div class="bottom">
						<span>全国咨询热线:95348</span>
						<span>网址:www.sunlife-everbright.com</span>
						<span>邮编:400010</span>
					</div>
				</div> -->
				<div style="margin-left:5%;">
					<input type="checkbox" v-model="isAgree" @click="">&nbsp;&nbsp;本人{{docTypeInfo.appntName}}理解并回答问卷全部内容,情况属实,真实有效。
				</div>
			</div>
		</div>
		<Footerbtns :is_show=false
			total_premium="10000.00">
			<button class="btnFoote" slot="center" @click="next" :disabled="!isAgree">
				下一步
			</button>
		</Footerbtns>
	</div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
	import Headerbtns from '../../common/Header.vue'
	import Footerbtns from '../../policy/common/Footer.vue'
	import office from '../../../../static/dict/branch_office_sunlife.json'

    export default{
        name: 'cqSurveyBook',
        components: {Headerbtns,Footerbtns},
		data () {
			return {
				isShare:this.$route.params.share,
				page_title: '重庆测评问卷',
				current_total_premium: '10000.00',
				optionsValue: '',
				appSignDate:'',
				ordId:'',
				CQinfoData:'',
				channel:this.$route.params.channel,
				sign:JSON.parse(this.$route.params.signImgs),
				signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
				docTypeInfo: {
					prtNo:'',
					appntName:'',
					appntSex:'',
					appntAge:'',
					socialInsu:false,
					socialInsuA:false,
					socialInsuB:false,
					socialInsuC:false,
					commercialInsu:false,
					commercialInsuA:false,
					commercialInsuB:false,
					commercialInsuC:false,
					commercialInsuD:false,
					insuCost:false,
					insuCostA:false,
					insuCostB:false,
					insuCostC:false,
					insuCostD:false,
					insuCostE:false,
					exceedTwenty:false,
					exceedTwentyA:false,
					exceedTwentyB:false,
					deathInsu:false,
					deathInsuValue:'',
					deathInsuYear:'',
					majorDiseaseInsu:false,
					majorDiseaseInsuValue:'',
					majorDiseaseInsuYear:'',
					medicalInsu:false,
					medicalInsuValue:'',
					medicalInsuYear:'',
					educationInsu:false,
					educationInsuValue:'',
					educationInsuYear:'',
					survivalInsu:false,
					survivalInsuValue:'',
					survivalInsuYear:'',
					annuityInsu:false,
					annuityInsuValue:'',
					annuityInsuYear:'',
					buyType:'',
					fengHong:false,
					wanNeng:false,
					touLian:false,
					buKanZhong:false,
					payItem:'',
					allPayItem:false,
					allPayPrem:'',
					periodPayItem:false,
					periodPayPrem:'',
					payYears:'',
					riskName:'',
					insuYears:'',
					amnt:'',
					payIntv:'',
					payIntv_all:false,
					payIntv_year:false,
					payIntv_halfYear:false,
					payIntv_quarter:false,
					payIntv_month:false,
					prem:'',
					payYears1:'',
					appSign:'',
					appSignDate:'',
					agentSign:'',
					agentCode:'',
					agentCompany:'',
					checkSugItem:'',
					checkSugItem_yes:false,
					checkSugItem_no:false,
					checkReason:'',
					checkSign:'',
					checkSignDate:'',
					isSpecialPage:''
				},
				isAgree:false
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
		},
		beforeDestroy(){
           utils.cache.set('planId',this.ordId)
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
	    	
	    	this.docTypeInfo.agentCode = this.$route.params.agentCode,
	    	this.docTypeInfo.agentCompany = '光大永明人寿保险有限公司'
	  		this.getNowFormatDate()
	  		if(this.$route.params.planId != 'new'){
	  			this.quCQinfo()
	  		}
	    },
	    methods:{
			  computAge(value) {
			  var today = new Date();
			  var birthDate = new Date(value);
			  var age = today.getFullYear() - birthDate.getFullYear();
			  var m = today.getMonth() - birthDate.getMonth();
			  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			    age--;
			  }
			  return age;
			},
	    	/*获取*/
	    	quCQinfo(){
	    		let requ = {
					"policy": {
						"substepNo": "",
						"orderCode": this.$route.params.planId,
					}
	    		}
	    		utils.http.post('MOHQPOLICYMSG',requ).then(response => {
	    			console.log(response.data.response.policy.docTypeInfo.TB2_2050301)
	    			this.docTypeInfo = response.data.response.policy.docTypeInfo.TB2_2050301
					this.docTypeInfo.appntName = response.data.response.policy.custInfo.appnt.appntName
					this.docTypeInfo.appntSex = response.data.response.policy.custInfo.appnt.appntSex=="1"?"男":"女"
				    this.docTypeInfo.appntAge = this.computAge(response.data.response.policy.custInfo.appnt.appntBirthday)
	    			this.docTypeInfo.allPayItem=(this.docTypeInfo.allPayItem == "false")?false:true
	    			this.docTypeInfo.annuityInsu=(this.docTypeInfo.annuityInsu == "false")?false:true
	    			this.docTypeInfo.buKanZhong=(this.docTypeInfo.buKanZhong == "false")?false:true
	    			this.docTypeInfo.checkSugItem_no=(this.docTypeInfo.checkSugItem_no == "false")?false:true
	    			this.docTypeInfo.checkSugItem_yes=(this.docTypeInfo.checkSugItem_yes == "false")?false:true
	    			this.docTypeInfo.commercialInsu=(this.docTypeInfo.commercialInsu == "false")?false:true
	    			this.docTypeInfo.commercialInsuA=(this.docTypeInfo.commercialInsuA == "false")?false:true
	    			this.docTypeInfo.commercialInsuB=(this.docTypeInfo.commercialInsuB == "false")?false:true
	    			this.docTypeInfo.commercialInsuC = (this.docTypeInfo.commercialInsuC == "false")?false:true
	    			this.docTypeInfo.commercialInsuD = (this.docTypeInfo.commercialInsuD == "false")?false:true
	    			this.docTypeInfo.deathInsu = (this.docTypeInfo.deathInsu == "false")?false:true
	    			this.docTypeInfo.educationInsu = (this.docTypeInfo.educationInsu == "false")?false:true
	    			this.docTypeInfo.exceedTwenty = (this.docTypeInfo.exceedTwenty == "false")?false:true
	    			this.docTypeInfo.exceedTwentyA = (this.docTypeInfo.exceedTwentyA == "false")?false:true
	    			this.docTypeInfo.exceedTwentyB = (this.docTypeInfo.exceedTwentyB == "false")?false:true
	    			this.docTypeInfo.fengHong = (this.docTypeInfo.fengHong == "false")?false:true
	    			this.docTypeInfo.insuCost = (this.docTypeInfo.insuCost == "false")?false:true
	    			this.docTypeInfo.insuCostA = (this.docTypeInfo.insuCostA == "false")?false:true
	    			this.docTypeInfo.insuCostB = (this.docTypeInfo.insuCostB == "false")?false:true
	    			this.docTypeInfo.insuCostC = (this.docTypeInfo.insuCostC == "false")?false:true
	    			this.docTypeInfo.insuCostD = (this.docTypeInfo.insuCostD == "false")?false:true
	    			this.docTypeInfo.insuCostE = (this.docTypeInfo.insuCostE == "false")?false:true
	    			this.docTypeInfo.majorDiseaseInsu = (this.docTypeInfo.majorDiseaseInsu == "false")?false:true
	    			this.docTypeInfo.medicalInsu=(this.docTypeInfo.medicalInsu == "false")?false:true
	    			this.docTypeInfo.payIntv_all=(this.docTypeInfo.payIntv_all == "false")?false:true
	    			this.docTypeInfo.payIntv_halfYear=(this.docTypeInfo.payIntv_halfYear == "false")?false:true
	    			this.docTypeInfo.payIntv_month=(this.docTypeInfo.payIntv_month == "false")?false:true
	    			this.docTypeInfo.payIntv_quarter=(this.docTypeInfo.payIntv_quarter == "false")?false:true
	    			this.docTypeInfo.payIntv_year=(this.docTypeInfo.payIntv_year == "false")?false:true
	    			this.docTypeInfo.periodPayItem=(this.docTypeInfo.periodPayItem == "false")?false:true
	    			this.docTypeInfo.socialInsu=(this.docTypeInfo.socialInsu == 'false')?false:true
	    			this.docTypeInfo.socialInsuA = (this.docTypeInfo.socialInsuA == "false")?false:true
	    			this.docTypeInfo.socialInsuB= (this.docTypeInfo.socialInsuB == "false")?false:true
					this.docTypeInfo.socialInsuC= (this.docTypeInfo.socialInsuC == "false")?false:true
	    			this.docTypeInfo.survivalInsu=(this.docTypeInfo.survivalInsu == "false")?false:true
	    			this.docTypeInfo.touLian=(this.docTypeInfo.touLian == "false")?false:true
	    			this.docTypeInfo.wanNeng=(this.docTypeInfo.wanNeng == "false")?false:true
	    		})
            },
            back(){
				if(!this.isShare){
					this.$router.push({
							path: '/policy/ElectronicsPolicyPage.vue',
							name: 'electronics_policy_page',
							params: {
									planId:this.$route.params.planId,
									applyCode:this.$route.params.applyCode,
									sendInfo:{
											name:"2050301",
											isRed:"1",  
											content:""
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
											name:"2050301",
											isRed:"1",  
											content:""
									}
									
							}
					})
				}
                
            },
	    	next(){
	    		 if(this.isAgree){
					if(!this.isShare){
						this.$router.push({
								path: '/policy/ElectronicsPolicyPage.vue',
								name: 'electronics_policy_page',
								params: {
										planId:this.$route.params.planId,
										applyCode:this.$route.params.applyCode,
										sendInfo:{
											name:"2050301",
											isRed:"0",  
											content:this.docTypeInfo
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
											name:"2050301",
											isRed:"0",  
											content:this.docTypeInfo
										}
										
								}
						})
					}
                   
                }else{

                }
	    	},
			toCustomerDetailsPage: function() {
				if(this.checkAll()){
					this.CQinfo()
					if(this.CQinfoData == true){
						this.$router.push({
							name: 'product_details_page',
							params: {
								planId: "02deec7261244901b7901682fbd3cdc9"
							}
						})
					}
				}
			},
			checkAll(){
				let result = ""
				result += this.checkName()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkSex()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkAge()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkSocial()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkinsuCost()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkExceedTwenty()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkSuitInsu()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkProduct()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkPayItem()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkSuggest()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkPayIntv()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkPrem()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkSeller()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkSugItem()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				result += this.checkReason()
				if(result != ''){
					MessageBox({
						title: '提示',
						message: result
					}).then(() => {})
					return false
				}
				console.log(result)
				return true
			},
			/*校验姓名*/
			checkName(){
				let inputName = this.docTypeInfo.appntName.replace(/[^\x00-\xff]/g, "***").length
				let nameTest = new RegExp("[0123456789`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
				if(this.docTypeInfo.appntName.indexOf(" ") != -1){
					return '姓名不能包含空格,请检查！'
				}
				if(this.docTypeInfo.appntName == 'undefined' || inputName == 0){
					return '姓名未填写,请检查！'
				}
				if(inputName < 3){
					return '姓名不能小于三个字节,请检查！'
				}
				if(this.docTypeInfo.appntName.length > 120){
					return '姓名长度不能超过120位,请检查！'
				}
				if(nameTest.test(this.docTypeInfo.appntName)){
					return '姓名不能包含特殊字符或数字,请检查！'
				}
				return ""
			},
			/*校验性别*/
			checkSex(){
				if(this.docTypeInfo.appntSex.indexOf(" ") != -1){
					return '性别不能包含空格,请检查！'
				}
				if(this.docTypeInfo.appntSex == "" || this.docTypeInfo.appntName == 'undefined'){
					return '性别未填写,请检查!'
				}
				if(this.docTypeInfo.appntSex != '男' && this.docTypeInfo.appntSex != '女'){
					return '性别必须为男或女,请检查!'
				}
				return ""
			},
			/*校验年龄*/
			checkAge(){
				if(this.docTypeInfo.appntSex.indexOf(" ") != -1){
					return '年龄不能包含空格,请检查！'
				}
				if(this.docTypeInfo.appntAge == "" || this.docTypeInfo.appntAge == "undefined"){
					return '年龄未填写,请检查!'
				}
				if(isNaN(this.docTypeInfo.appntAge)){
					return '年龄格式输入有误,请检查!'
				}
				if (Number(this.docTypeInfo.appntAge) > 110 || Number(this.docTypeInfo.appntAge) < 0) {
					return '年龄必须在0-110之间,请检查!'
				}
				if(parseInt(this.docTypeInfo.appntAge) != this.docTypeInfo.appntAge){
					return '年龄必须在0-110之间的整数,请检查!'
				}
				return ''
			},
			/*校验社会保险，商业保险*/
			checkSocial(){
				if (this.docTypeInfo.socialInsu == true && this.docTypeInfo.socialInsuA != true && this.docTypeInfo.socialInsuB != true && this.docTypeInfo.socialInsuC != true) {
					return '请选择社会保险的类型!'
				}
				if (this.docTypeInfo.socialInsu != true && (this.docTypeInfo.socialInsuA == true || this.docTypeInfo.socialInsuB == true || this.docTypeInfo.socialInsuC == true)) {
					return '若选择社会保险的类型,请勾选社会保险!'
				}
				if (this.docTypeInfo.commercialInsu == true && this.docTypeInfo.commercialInsuA != true && this.docTypeInfo.commercialInsuB != true && this.docTypeInfo.commercialInsuC != true && this.docTypeInfo.commercialInsuD != true) {
					return '请选择商业保险的类型!'
				}
				if (this.docTypeInfo.commercialInsu != true && (this.docTypeInfo.commercialInsuA == true || this.docTypeInfo.commercialInsuB == true || this.docTypeInfo.commercialInsuC == true || this.docTypeInfo.commercialInsuD == true)) {
					return '若选择商业保险的类型,请勾选商业保险!'
				}
				return ''
			},
			/*校验商业保险下的选项*/
			checkinsuCost() {
				if (this.docTypeInfo.insuCostA != true && this.docTypeInfo.insuCostB != true && this.docTypeInfo.insuCostC != true && this.docTypeInfo.insuCostD != true && this.docTypeInfo.insuCostE != true && this.docTypeInfo.commercialInsu == true) {
					return '请选择您和您的家人每年共花费多少钱购买商业保险!'
				}
				return ''
			},
			/*校验超过还是未超过*/
			checkExceedTwenty(){
				if (this.docTypeInfo.exceedTwentyA != true && this.docTypeInfo.exceedTwentyB != true && this.docTypeInfo.commercialInsu == true) {
					return '当选择商业保险时,请选择是否用于购买商业保险的资金超过家庭年收入的20%!'
				}
				return ''
			},
			/*校验问题2*/
			checkSuitInsu(){
				if (this.docTypeInfo.deathInsu != true && this.docTypeInfo.majorDiseaseInsu != true && this.docTypeInfo.medicalInsu != true && this.docTypeInfo.educationInsu != true && this.docTypeInfo.survivalInsu != true && this.docTypeInfo.annuityInsu != true) {
					return '请选择现阶段最需要购买的保险类型!'
				}
				if (this.docTypeInfo.deathInsu == true) {
					if (this.docTypeInfo.deathInsuValue == '' || this.docTypeInfo.deathInsuValue == 'undefined') {
						return '请填写身故和残疾保障的适合赔付钱数!'					}
					if (this.docTypeInfo.deathInsuYear == '' || this.docTypeInfo.deathInsuYear == 'undefined') {
						return '请填写身故和残疾保障的适合保障期限!'
					}
					if(this.docTypeInfo.deathInsuValue.indexOf(" ") != -1){
						return '您填写身故和残疾保障的适合赔付钱数中有空格!'
					}
					var reg = /^[0-9]*$/
					if(!reg.test(this.docTypeInfo.deathInsuValue)){
                       return '您填写身故和残疾保障的适合赔付钱数中不应有汉字!'
					}
					if(this.docTypeInfo.deathInsuYear.indexOf(" ") != -1){
						return '您填写身故和残疾保障的适合保障期限中有空格!'
					}
				}
				if (this.docTypeInfo.majorDiseaseInsu == true) {
					if (this.docTypeInfo.majorDiseaseInsuValue == '' || this.docTypeInfo.majorDiseaseInsuValue == 'undefined') {
						return '请填写重大疾病保障的适合赔付钱数!'
					}
					if(this.docTypeInfo.majorDiseaseInsuValue.indexOf(" ") != -1){
						return '您填写重大疾病保障的适合赔付钱数中有空格!'
					}
					var reg = /^[0-9]*$/
					if(!reg.test(this.docTypeInfo.majorDiseaseInsuValue)){
                       return '您填写重大疾病保障的适合赔付钱数中不应有汉字!'
					}
					if (this.docTypeInfo.majorDiseaseInsuYear == '' || this.docTypeInfo.majorDiseaseInsuYear == 'undefined') {
						return '请填写重大疾病保障的适合保障期限!'
					}
					if(this.docTypeInfo.majorDiseaseInsuYear.indexOf(" ") != -1){
						return '您填写重大疾病保障的适合保障期限中有空格!'
					}
				}
				if (this.docTypeInfo.medicalInsu == true) {
					if (this.docTypeInfo.medicalInsuValue == '' || this.docTypeInfo.medicalInsuValue == 'undefined') {
						return '请填写医疗费用保障的适合赔付钱数!'
					}
					if(this.docTypeInfo.medicalInsuValue.indexOf(" ") != -1){
						return '您填写医疗费用保障的适合赔付钱数中有空格!'
					}
					if (this.docTypeInfo.medicalInsuYear == '' || this.docTypeInfo.medicalInsuYear == 'undefined') {
						return '请填写医疗费用保障的适合保障期限!'
					}
					if(this.docTypeInfo.medicalInsuYear.indexOf(" ") != -1){
						return '您填写医疗费用保障的适合保障期限中有空格!'
					}
				}
				if (this.docTypeInfo.educationInsu == true) {
					if (this.docTypeInfo.educationInsuValue == '' || this.docTypeInfo.educationInsuValue == 'undefined') {
						return '请填写教育金的适合赔付钱数!'
					}
					if(this.docTypeInfo.educationInsuValue.indexOf(" ") != -1){
						return '您填写教育金的适合赔付钱数中有空格!'
					}
					if (this.docTypeInfo.educationInsuYear == '' || this.docTypeInfo.educationInsuYear == 'undefined') {
						return '请填写教育金的适合保障期限!'
					}
					if(this.docTypeInfo.educationInsuYear.indexOf(" ") != -1){
						return '您填写教育金的适合保障期限中有空格!'
					}
				}
				if (this.docTypeInfo.survivalInsu == true) {
					if (this.docTypeInfo.survivalInsuValue == '' || this.docTypeInfo.survivalInsuValue == 'undefined') {
						return '请填写生存金返还的适合赔付钱数!'
					}
					if(this.docTypeInfo.survivalInsuValue.indexOf(" ") != -1){
						return '您填写生存金返还的适合赔付钱数中有空格!'
					}
					if (this.docTypeInfo.survivalInsuYear == '' || this.docTypeInfo.survivalInsuYear == 'undefined') {
						return '请填写生存金返还的适合保障期限!'
					}
					if(this.docTypeInfo.survivalInsuYear.indexOf(" ") != -1){
						return '您填写生存金返还的适合保障期限中有空格!'
					}
				}
				if (this.docTypeInfo.annuityInsu == true) {
					if (this.docTypeInfo.annuityInsuValue == '' || this.docTypeInfo.annuityInsuValue == 'undefined') {
						return '请填写退休金收入保障的适合赔付钱数!'
					}
					if(this.docTypeInfo.annuityInsuValue.indexOf(" ") != -1){
						return '您填写退休金收入保障的适合赔付钱数中有空格!'
					}
					if (this.docTypeInfo.annuityInsuYear == '' || this.docTypeInfo.annuityInsuYear == 'undefined') {
						return '请填写退休金收入保障的适合保障期限!'
					}
					if(this.docTypeInfo.annuityInsuYear.indexOf(" ") != -1){
						return '您填写退休金收入保障的适合保障期限中有空格!'
					}
				}
				return ''
			},
			/*校验问题3*/
			checkProduct() {
				if (this.docTypeInfo.wanNeng != true && this.docTypeInfo.fengHong != true && this.docTypeInfo.touLian != true && this.docTypeInfo.buKanZhong != true) {
					return '请选择3.中您想购买的类型!'
				}
				return ''
			},
			/*一次性交费和分期交费的校验*/
			checkPayItem() {
				if (this.docTypeInfo.allPayItem != true && this.docTypeInfo.periodPayItem != true) {
					return '请填写您打算用多少钱购买保险!'
				}
				if (this.docTypeInfo.allPayItem == true) {
					if (this.docTypeInfo.allPayPrem == '' || this.docTypeInfo.allPayPrem == 'undefined') {
						return '请填写一次性交清的保费!'
					}
					if(this.docTypeInfo.allPayPrem.indexOf(" ") != -1){
						return '您填写一次性交清的保费中有空格!'
					}
				}
				if (this.docTypeInfo.periodPayItem == true) {
					if (this.docTypeInfo.periodPayPrem == '' || this.docTypeInfo.periodPayPrem == 'undefined') {
						return '请填写每年交的保费!'
					}
					if(this.docTypeInfo.periodPayPrem.indexOf(" ") != -1){
						return '您填写每年交的保费中有空格!'
					}
					if (this.docTypeInfo.payYears == '' || this.docTypeInfo.payYears == 'undefined') {
						return '请填写保费将持续交多少年!'
					}
					if(this.docTypeInfo.payYears.indexOf(" ") != -1){
						return '您填写保费将持续交多少年中有空格!'
					}
				}
				return ''
			},
			/*建议校验*/
			checkSuggest() {
				let riskTest = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$")
				if (this.docTypeInfo.riskName == '' || this.docTypeInfo.riskName == 'undefined') {
					return '请填写建议购买的的险种!'
				}
				if(this.docTypeInfo.riskName.indexOf(" ") != -1){
						return '您填写的险种中有空格!'
					}
				if(!riskTest.test(this.docTypeInfo.riskName)){
					return '您填写的险种中只能输入汉字、字母或数字!'
				}
				if (this.docTypeInfo.insuYears == '' || this.docTypeInfo.insuYears == 'undefined') {
					return '请填写建议的保险期间!'
				}
				if(this.docTypeInfo.insuYears.indexOf(" ") != -1){
						return '您填写的保险期间中有空格!'
					}
				if(!riskTest.test(this.docTypeInfo.insuYears)){
					return '您填写的保险期间中只能输入汉字、字母或数字!'
				}
				if (this.docTypeInfo.amnt == '' || this.docTypeInfo.amnt == 'undefined') {
					return '请填写建议的保险金额!'
				}
				if(this.docTypeInfo.amnt.indexOf(" ") != -1){
					return '您填写的保险金额中有空格!'
				}
				return '';
			},
			clearNoNum() {
				//先把非数字的都替换掉，除了数字和.    
				this.docTypeInfo.amnt = this.docTypeInfo.amnt.replace(/[^\d.]/g, "");
				//保证只有出现一个.而没有多个.    
				this.docTypeInfo.amnt = this.docTypeInfo.amnt.replace(/\.{2,}/g, ".");
				//必须保证第一个为数字而不是.    
				this.docTypeInfo.amnt = this.docTypeInfo.amnt.replace(/^\./g, "");
				//保证.只出现一次，而不能出现两次以上    
				this.docTypeInfo.amnt = this.docTypeInfo.amnt.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				//只能输入两个小数  
				this.docTypeInfo.amnt = this.docTypeInfo.amnt.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			},
			/*保险费 缴费期限校验*/
			checkPrem() {
			    if(this.docTypeInfo.prem == '' || this.docTypeInfo.prem == 'undefined'){
			        return '请填写保险费!'
			    }
			    if(this.docTypeInfo.prem.indexOf(" ") != -1){
			    	return '您填写的保险费中有空格!'
			    }
			    if (this.docTypeInfo.payYears1 == '' || this.docTypeInfo.payYears1 == 'undefined'){
			        return '请选择缴费期限!'
			    }
			    if(this.docTypeInfo.payYears1.indexOf(" ") != -1){
			    	return '您填写的缴费期限中有空格!'
			    }
		        return ''
			},
			/*代理人校验*/
			checkSeller() {
		        if (this.docTypeInfo.agentCode == '' && this.docTypeInfo.agentCode == 'undefined'){
		            return '请填写销售人员工号!'
		        }
		        if(this.docTypeInfo.agentCompany == '' && this.docTypeInfo.agentCompany == 'undefined'){
		            return '请填写销售人员的单位!'
		        }
		        return '';
		    },
		    /*审核意见校验*/
			checkSugItem() {
				if (this.docTypeInfo.checkSugItem != true && this.docTypeInfo.checkSugItem != false) {
					return '请勾选审核意见!'
				} else if (this.docTypeInfo.checkSugItem_no == false && this.docTypeInfo.checkSugItem_yes == false) {
					return '请勾选审核意见!'
				}

				return '';
			},
			/*理由校验*/
			checkReason() {
				if (this.docTypeInfo.checkSugItem == false && this.docTypeInfo.checkSugItem_no == true) {
					if (this.docTypeInfo.checkReason == '' || this.docTypeInfo.checkReason == 'undefined') {
						return '请填写审核不通过原因!'
					}
					if(this.docTypeInfo.checkReason.indexOf(" ") != -1){
						return '您填写的审核不通过原因中不能有空格!'
					}
				}
				return ''
			},
			/*交费方式校验*/
			checkPayIntv(){
				if (this.docTypeInfo.payIntv == '' || this.docTypeInfo.payIntv == 'undefined') {
					return '未选择交费方式,请检查!'
				}
				return ''
			},
			clickPayItem(data){
				if (data == 'all') {
					this.docTypeInfo.periodPayItem = false;
					this.docTypeInfo.periodPayPrem = ''
					this.docTypeInfo.payYears = ''
					if (this.docTypeInfo.allPayItem == true) {
						this.docTypeInfo.allPayPrem = ''
					}
				}
				if (data == 'period') {
					this.docTypeInfo.allPayItem = false;
					this.docTypeInfo.allPayPrem = ''
					if (this.docTypeInfo.periodPayItem == true) {
						this.docTypeInfo.periodPayPrem = ''
						this.docTypeInfo.payYears = ''
					}
				}
			},
			socialInsurance(){
				if (this.docTypeInfo.socialInsu == false) {
					this.docTypeInfo.socialInsuA = false
					this.docTypeInfo.socialInsuB = false
					this.docTypeInfo.socialInsuC = false
				}
			},
			commercialInsurance(){
				if(this.docTypeInfo.commercialInsu == false){
					this.docTypeInfo.commercialInsuA = false
					this.docTypeInfo.commercialInsuB = false
					this.docTypeInfo.commercialInsuC = false
					this.docTypeInfo.commercialInsuD = false
					this.docTypeInfo.insuCostA = false
					this.docTypeInfo.insuCostB = false
					this.docTypeInfo.insuCostC = false
					this.docTypeInfo.insuCostD = false
					this.docTypeInfo.insuCostE = false
					this.docTypeInfo.exceedTwentyA = false
					this.docTypeInfo.exceedTwentyB = false
				}
			},
			clickinsuCost(data){
				console.log(data)
				if(data == "A"){
					this.docTypeInfo.insuCostB = false
					this.docTypeInfo.insuCostC = false
					this.docTypeInfo.insuCostD = false
					this.docTypeInfo.insuCostE = false
				}
				if (data == 'B') {
					this.docTypeInfo.insuCostA = false
					this.docTypeInfo.insuCostC = false
					this.docTypeInfo.insuCostD = false
					this.docTypeInfo.insuCostE = false
				}
				if (data == 'C') {
					this.docTypeInfo.insuCostA = false
					this.docTypeInfo.insuCostB = false
					this.docTypeInfo.insuCostD = false
					this.docTypeInfo.insuCostE = false
				}
				if (data == 'D') {
					this.docTypeInfo.insuCostA = false
					this.docTypeInfo.insuCostC = false
					this.docTypeInfo.insuCostB = false
					this.docTypeInfo.insuCostE = false
				}
				if (data == 'E') {
					this.docTypeInfo.insuCostA = false
					this.docTypeInfo.insuCostC = false
					this.docTypeInfo.insuCostD = false
					this.docTypeInfo.insuCostB = false
				}
			},
			clickExceedTwenty(data){
				if (data == 'A') {
					this.docTypeInfo.exceedTwentyB = false
				}
				if (data == 'B') {
					this.docTypeInfo.exceedTwentyA = false
				}
			},
			clickSuit(data){
				if (data == 'death') {
					if (this.docTypeInfo.deathInsu == false) {
						this.docTypeInfo.deathInsuValue = ''
						this.docTypeInfo.deathInsuYear = ''
					}
				}
				if (data == 'major') {
					if (this.docTypeInfo.majorDiseaseInsu == false) {
						this.docTypeInfo.majorDiseaseInsuValue = ''
						this.docTypeInfo.majorDiseaseInsuYear = ''
					}
				}
				if (data == 'medical') {
					if (this.docTypeInfo.medicalInsu == false) {
						this.docTypeInfo.medicalInsuValue = ''
						this.docTypeInfo.medicalInsuYear = ''
					}
				}
				if (data == 'education') {
					if (this.docTypeInfo.educationInsu == false) {
						this.docTypeInfo.educationInsuValue = ''
						this.docTypeInfo.educationInsuYear = ''
					}
				}
				if (data == 'survival') {
					if (this.docTypeInfo.survivalInsu == false) {
						this.docTypeInfo.survivalInsuValue = ''
						this.docTypeInfo.survivalInsuYear = ''
					}
				}
				if (data == 'annuity') {
					if (this.docTypeInfo.annuityInsu == false) {
						this.docTypeInfo.annuityInsuValue = ''
						this.docTypeInfo.annuityInsuYear = ''
					}
				}
			},
			clickProdcut(data){
				if (data == 'wanNeng' || data == 'fenHong' || data == 'touLian') {
					this.docTypeInfo.buKanZhong = false
				}
				if (data == 'touzi') {
					this.docTypeInfo.fengHong = false
					this.docTypeInfo.touLian = false
					this.docTypeInfo.wanNeng = false
				}
			},
			clickPayIntv(data){
				if (data == 'all') {
					this.docTypeInfo.payIntv_halfYear = false;
					this.docTypeInfo.payIntv_quater = false;
					this.docTypeInfo.payIntv_year = false;
					this.docTypeInfo.payIntv_month = false;
					if (this.docTypeInfo.payIntv_all == true) { //取消
						this.docTypeInfo.payIntv = '趸交';
					} else { //选中
						$scope.docTypeInfo.payIntv = '';
					}
				}
				if (data == 'year') {
					this.docTypeInfo.payIntv_halfYear = false;
					this.docTypeInfo.payIntv_quater = false;
					this.docTypeInfo.payIntv_all = false;
					this.docTypeInfo.payIntv_month = false;
					if (this.docTypeInfo.payIntv_year == true) { //取消
						this.docTypeInfo.payIntv = '年交';
					} else { //选中
						this.docTypeInfo.payIntv = '';
					}
				}
				if (data == 'halfYear') {
					this.docTypeInfo.payIntv_all = false;
					this.docTypeInfo.payIntv_quarter = false;
					this.docTypeInfo.payIntv_year = false;
					this.docTypeInfo.payIntv_month = false;
					if (this.docTypeInfo.payIntv_halfYear == true) { //取消
						this.docTypeInfo.payIntv = '半年交';
					} else { //选中
						this.docTypeInfo.payIntv = '';
					}
				}
				if (data == 'quarter') {
					this.docTypeInfo.payIntv_halfYear = false;
					this.docTypeInfo.payIntv_all = false;
					this.docTypeInfo.payIntv_year = false;
					this.docTypeInfo.payIntv_month = false;
					if (this.docTypeInfo.payIntv_quarter == true) { //取消
						this.docTypeInfo.payIntv = '季交';
					} else { //选中
						this.docTypeInfo.payIntv = '';
					}
				}
				if (data == 'month') {
					this.docTypeInfo.payIntv_halfYear = false;
					this.docTypeInfo.payIntv_quater = false;
					this.docTypeInfo.payIntv_all = false;
					this.docTypeInfo.payIntv_quarter = false;
					if (this.docTypeInfo.payIntv_month == true) { //取消
						this.docTypeInfo.payIntv = '月交';
					} else { //选中
						this.docTypeInfo.payIntv = '';
					}
				}
			},
			clickCheckSugItem(data){
				if(data == 'yes'){
					if (this.docTypeInfo.checkSugItem_yes == true) {
						this.docTypeInfo.checkSugItem_no = false;
						this.docTypeInfo.checkSugItem = '';
						this.docTypeInfo.checkReason = '';
					} else {
						this.docTypeInfo.checkSugItem = true;
						this.docTypeInfo.checkSugItem_no = false;
						this.docTypeInfo.checkReason = '';
					}
				}
				if(data == 'no'){
					if (this.docTypeInfo.checkSugItem_no == true) {
						this.docTypeInfo.checkSugItem_yes = false;
						this.docTypeInfo.checkSugItem = '';
						this.docTypeInfo.checkReason = '';
					} else {
						this.docTypeInfo.checkSugItem = false;
						this.docTypeInfo.checkSugItem_yes = false;
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
				this.docTypeInfo.appSignDate = currentdate
				this.docTypeInfo.checkSignDate = currentdate
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
	.content_1_footer{
		border-top: 1px solid #000;
		padding-top: 5px;
		margin-top: 10px;
		.top,.bottom{
			width: 100%;
			span{
				display: block;
				padding-left: 10px;
				padding-bottom: 5px;
			}
		}
	}
	.fenxi .write,.fenxi .yuan{
		border-bottom: 1px solid #000;
		text-align: center;
	}
	.fenxi .yuan{
		width: 120px;
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
			width: 200px;height: 50px;
			background: url("../../../../static/img/policy/logo.png")no-repeat right center;
			background-size: 100% 70%;
		}
		.content{
			float: left;
			width: 100%;
			h1{
				text-align: center;
				padding: 5px 0;
				font-size: 16px;
				font-weight: bold;
			}
			ul{
				height: 120px;
				overflow:hidden;
				li{
					float: left;
					width: 100%;height: 40px;
					overflow:hidden;
					span{
						display: inline-block;
						height: 40px;width: 30%;
						line-height: 40px;
						float: left;
						text-align: center;
						font-weight: bold;
					}
					input{
						display: inline-block;
						height: 27px;width: 55%;
						border-bottom: 1px solid #000;
						float: left;
						overflow:hidden;
						padding-left: 10px;
					}
				}
			}
			p{
				width: 95%;
				padding-left: 10px;
				text-align: justify;
				line-height: 20px;
			}
			.content_1,.content_2,.content_3,.content_4,.content_5{
				margin-top:5px;
				u{
					font-weight: bold;
					padding-left: 10px;
				}
				.one,.two,.three,.four{
					margin-top:5px;
					.title{
						font-weight: bold;
						margin-bottom: 5px;
					}
					.choose{
						div{
							p{
								margin-bottom:5px;}
						}
					}
				}
			}
			.content_3 input,.content_4 input{
				border-bottom: 1px solid #000;
				text-align: center;
			}
			.content_5 .data input{
				border-bottom:1px solid #000;
				text-align: center;
			}
		}
	}
	.two,.four{
		.yuan,.year{
			border-bottom:1px solid #000;
			width: 100px;
			text-align: center;
		}
	}
	.three{
		b{
			font-weight: bold;
		}
	}
	.reason{
		border-bottom:1px solid #000;
		text-align: center;
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
