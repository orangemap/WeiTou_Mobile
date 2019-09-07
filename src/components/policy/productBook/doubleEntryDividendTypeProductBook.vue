<template>
 <div  id="DLDoubleEntryAllTypeProductCtrl1">
    <!-- 条码区 -->
   <!--  <div class="barcode-area">
        <img src="../../../../static/img/policy/2050901.jpg" alt="" width="200" height="60">
    </div> -->
    <Headerbtns :title = page_title>
        <div slot="left" class="back" v-if="!isShare">
            <i class="fa fa-angle-left" @click="back()"></i>
        </div>
    </Headerbtns>
    <div class="manage-contents">
      <div>
        <h1>投保双录确认声明书（{{queType}}）</h1>
        <p>【适用于所有产品】</p>
        <p class="level">1.投保信息：</p>
        <p class="level">我是投保人<input type="text" style="border-bottom: 1px solid black;width:30%;text-align:center;" readonly v-model="appntName">，系投保单号<input type="text" style="border-bottom: 1px solid black;width:60%;text-align:center;" readonly v-model="doubleEntryDividendBook.prtNo">的投保人，同意<u>{{doubleEntryDividendBook.manageName}}</u>对我的签单过程进行全程记录，我的身份证号码为<input type="text" style="border-bottom: 1px solid black;width:60%;text-align:center;" readonly v-model="doubleEntryDividendBook.appntIDNo">。</p>
        <p class="level">我同意为我本人（或被保险人
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.insuredName}}
            </span>）购买光大永明人寿保险有限公司的
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.riskName}}
            </span>产品，此产品为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.payIntv}}
            </span>交产品，保险金额为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.amnt}}
            </span>万元，交费期限为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.payYears}}
            </span>年，每年（一次性）交纳的保险费为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.prem}}
            </span>元，保险期间为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.insuYears}}
            </span>年（至被保险人
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.insuAges}}
            </span>周岁）。
            <span style="border-bottom:1px solid black">{{doubleEntryDividendBook.riskName}}
            </span>产品，此产品为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.payIntv}}
            </span>交产品，保险金额为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.amnt}}
            </span>万元，交费期限为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.payYears}}
            </span>年，每年（一次性）交纳的保险费为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.prem}}
            </span>元，保险期间为
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.insuYears}}
            </span>年（至被保险人
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.insuAges}}
            </span>周岁）。
        </p>
        <p class="level">2.我这份保单的销售人员是
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.agentName}}
            </span>，执业证号是
            <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.agentQuafNo}}
            </span>。在签单过程中销售人员已经向本人出示了保险条款、产品说明书并明确说明条款及产品说明书的重要内容，其中包括保险责任、免除责任、保单重要权益、犹豫期内外退保等合同重要要素，本人已经清楚知悉并同意投保。</p>
        <p class="level">3.我已清楚了解关于条款中被保险人酒后驾驶、无合法有效驾驶证驾驶、驾驶无有效行驶证的机动车等违法行为导致保险事故为免除责任条款的内容。</p>
        <p class="level">4.我已清楚知悉这份保单的犹豫期是
        <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.hesitateEnd}}
        </span>天，犹豫期是从收到保险合同并签名确认之日起，在犹豫期内退保，保险公司扣除10元工本费后退还已支付保险费；超过犹豫期退保，只能退回退保时保单对应的现金价值，已支付保险费会有损失。</p>
        <p class="level">5.我对投保单填写内容已经逐项进行了核对，对投保单、投保提示书的相关内容已清楚知悉，确认投保单上的填写内容是自己的真实意愿表示，不存在任何人的欺诈、胁迫或乘人之危等；投保单、投保提示书等资料上的投保人和被保险人的签名，都是由我和被保险人亲笔签名。</p>
        <p class="level">6.对投保过程中要求投保人、被保险人如实告知的内容均由我本人亲自如实<br/>告知的，没有不实告知。</p>
        <p>【适用于分红险产品】</p>
        <p class="level">1.本人确认投保单上的风险提示语句是本人亲自抄写的，内容是：本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性。相关含义及其法律后果本人也清楚了解。</p>
        <p class="level">2.我已知道
        <span style="border-bottom: 1px solid black">{{doubleEntryDividendBook.fHRiskName}}
        </span>产品宣传材料上的分红演示是基于保险公司的精算假设，保单的红利分配是不确定的，红利可能有，也可能为零。</p>
   </div>
    <div class="stat">
         <p class="level">以上陈述是我的真实意思的表达，本声明书的签名也是本人亲笔签字。</p>
    </div>
    <div class="inp">
        <p class="inp_p">&nbsp;&nbsp;&nbsp;&nbsp;投&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;人&nbsp;&nbsp;:
            <img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">
        </p>
        <p class="inp_p" v-model="doubleEntryDividendBook.appSignDate">&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期&nbsp;&nbsp;&nbsp;:
        </p>
        <p class="inp_p">&nbsp;&nbsp;&nbsp;&nbsp;银行销售人员:
            <img :src="signImgsAgent" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">
        </p>
        <p class="inp_p"  v-model="doubleEntryDividendBook.bankAgentSignDate">&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期&nbsp;&nbsp;&nbsp;:
        </p>
    </div>
    <div style="margin:5% 0 0 0;line-height: 20px;">
        <input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{appntName}}已认真阅读投保特别提示，且全面知晓理解相关内容，并予以确认。
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
import Headerbtns from '../../common/Header.vue'
import Footerbtns from '../../policy/common/Footer.vue'
import premList from '../../../../static/dict/prem_sunlife.json'
import alert from '../common/alert.vue'
export default{
    name: 'doubleEntryDividendTypeProductBook',
    components: {Headerbtns,Footerbtns,alert},
	props: {
	},
	data() {
		return {
            page_title:"投保双录确认声明书" ,
            queType:"分红险",//问卷类型
            current_total_premium: '10000.00',
            isAgree:false,
            isShare:this.$route.params.share,
            saveName:"doubleEntryDividendTypeProductBook",
            channel:utils.cache.get('channel'),
            sign:JSON.parse(this.$route.params.signImgs),
            signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
            appntName:this.$route.params.applicant,
            doubleEntryDividendBook:{
                appntIDNo:"",//身份证号
                prtNo:"" ,//投保单号
                prem:"",//每期保费
                agentCode:"",//销售人员编码
                comName:"", //保险公司
                riskName:"",//产品名称
                insuYears:"",//保险年期
                payYears:"",//缴费年期
                agentName:"",//销售人员姓名
                agentCode:"",//销售工号
                appSign:"",//投保人签字
                appSignDate:"",//投保人签字日期
                agentSign:"",//销售人员签字
                agentSignDate:"",//销售人员签字日期
                payIntv:"",//缴费方式
                amnt:"",//保险金额
                insuAges:"",//保险期间岁
                agentQuafNo:"",//销售人员执业证号
                hesitateEnd:"",//犹豫期
                insuredName:"",//被保险人姓名
                manageName:"光大永明人寿保险有限公司",//分公司
                fHRiskName:"",
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
    },
    beforeMount(){
        $(".btnFoote").css({'opacity':0.5})
        // 判断再次进入单证缓冲有数据且赋值,
        let documentInfo = utils.cache.get("documentInfo")
        if(documentInfo!=null && documentInfo!=undefined && documentInfo.length>0){
            for(var i=0;i<documentInfo.length;i++){
                if(documentInfo[i].name == this.saveName){
                    this.doubleEntryDividendBook = documentInfo[i].content
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
        
        let policyResult=this.$route.params.policyResult
        console.log("获取投保书信息",policyResult)
        //投保人身份证号
        this.doubleEntryDividendBook.appntIDNo=policyResult.custInfo.appnt.idNo
        //投保单号
        this.doubleEntryDividendBook.prtNo=policyResult.applyCode
        //被保险人信息
        var insurant=policyResult.custInfo.insurants.insurant
        for(var i=0;i<insurant.length;i++){
            console.log("被保人姓名",insurant[i].name)
            this.doubleEntryDividendBook.insuredName += insurant[i].name
            console.log(this.doubleEntryDividendBook.insuredName)
        }
        //产品相关信息
        var products=policyResult.productInfo.products.product
        for(var i=0;i<products.length;i++){
            console.log("险种产品",products[i].prodName)
            this.doubleEntryDividendBook.riskName += products[i].prodName
            console.log("产品",this.doubleEntryDividendBook.riskName)
            if(products[i].isMaster=="1"){
                this.doubleEntryDividendBook.payIntv=this.getPayFreq(products[i].payIntv)
                this.doubleEntryDividendBook.amnt=products[i].amnt
                this.doubleEntryDividendBook.payYears=this.getPayFreq(products[i].payYear)
                this.doubleEntryDividendBook.prem=products[i].prem
                this.doubleEntryDividendBook.insuYears=this.getInsure(products[i].insureYear)
                this.doubleEntryDividendBook.fHRiskName=products[i].prodName
            }
        }
        //销售人员姓名
        this.doubleEntryDividendBook.agentName=policyResult.agentInfo.name
        //销售人员工号
        this.doubleEntryDividendBook.agentCode=policyResult.agentInfo.agentcode
        //犹豫期天数
        this.doubleEntryDividendBook.hesitateEnd=this.$route.params.hesitationPeriod
    },
    methods: {
        jumpToBack(){
            if(this.isShare){
                this.$router.back()
                return
            }
           this.$router.push({
           		path: '/policy/ElectronicsPolicyPage.vue',
           		name: 'electronics_policy_page',
           		params: {
           				planId:this.$route.params.planId,
           				applyCode:this.$route.params.applyCode,
           				sendInfo:{
           					name:"doubleEntryDividendTypeProductBook",
           					isRed:"0",  
           					content:this.doubleEntryDividendBook,
           				}
           				
           		}
           })
        },
        //按钮返回
        back(){
            this.$router.push({
            		path: '/policy/ElectronicsPolicyPage.vue',
            		name: 'electronics_policy_page',
            		params: {
            				planId:this.$route.params.planId,
            				applyCode:this.$route.params.applyCode,
            				sendInfo:{
            						name:"doubleEntryDividendTypeProductBook",
            						isRed:"1",  
            						content:this.doubleEntryDividendBook,
            				}   
            		}
            })
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
.manage-contents{
    position: absolute;
    padding: 0 5%;
    left: 0;right: 0;top: 48px;bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #FFF;
    margin-top: 7%; 
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
h1{
    text-align: center;
    font-weight:bold;
    margin:20px 0 ;
}
.blank{
    height: 20px;
}
.level{
    text-indent:2em;
}
.r_text{
    width:50%;
    border-bottom:1px solid black
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
.inp_p{
    /* text-align: center; */
    margin:10px auto;
}
</style>
