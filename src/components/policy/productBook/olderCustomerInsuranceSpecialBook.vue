<template>
 <div id="shOlderSpecialTipCtrl1">
    <Headerbtns :title = page_title>
        <div slot="left" class="back">
            <i class="fa fa-angle-left" @click="back()"></i>
        </div>
    </Headerbtns>
    <div class="manage-contents">
        <div style="margin-top:10px;">附件3：</div>
        <div>
            <h1 align="center">年长客户购买保险特别提示</h1>
            <h1>（针对年龄超过60周岁或以上客户）</h1>
        </div>
        <div>
            <div style="margin-top:20px;">尊敬的客户：</div>
            <p class="inp_text">您可能属于风险承受能力较低客户，建议您在购买保险时
            先征求家人意见，并综合考虑自身的保险需求、财务状况、风
            险承受能力等因素，谨慎选择适合自己的保险产品。</p>
        </div>
        <div>
            <p class="inp_text"><b>如果您确定要作为投保人购买保险产品，为保障您的权益，请您确认已了解以下内容：</b></p>
            <p class="inp_text">1.您所购买的是保险产品，如在保险期满前退保可能会产生损失。</p>
            <p class="inp_text">2.万能险、投资连结险需要扣除初始费用、风险保费、保单管理费等费用，请您详细了解；</p>
            <p class="inp_text">3.分红险的分红分配是不确定的；万能险超过最低保证利率的收益是不确定的；投资连结险投资回报是不确定的，实际投资收益可能会出现亏损。</p>
            <p class="inp_text">4.一年期以上人身保险产品自收到保险单并书面签收日起10日内为“犹豫期”，在犹豫期内投保人可以无条件解除保险合同，保险公司除扣除不超过10元的成本费以外，将退还全部保费。</p>
            <p class="inp_text">除上述内容外，请您在购买保险时仔细阅读销售人员提供的《人身保险投保提示书》，并确认投保书、投保提示书均为您本人签名。</p>
            <p class="inp_text"><b>在此特别提示您：</b>如选择了和自己保险需求、交费能力或风险承受能力不相符的保险产品，可能会出现以下情况，造成您的损失：</p>
            <p class="inp_text">1.因经济原因，在保险合同期满前退保，产生退保损失；</p>
            <p class="inp_text">2.不能按期缴费，导致保险合同失效；</p>
            <p class="inp_text">3.保险责任与您的需求不匹配，无法提供您所需的保障或收益。</p>
        </div>
        <div >
            <div style="font-size:12px;margin:10px auto;">推介该保险产品原因（保险销售人员填写）：<input type="text"  v-model="olderCustomerBook.recommendReason" class="r_txt" style='border-bottom:1px solid #000;width:100%;text-align:center;margin-top:10px;'></div>
            <div style="font-size:12px;margin:10px auto;">选择该保险产品原因（客户填写）：<input type="text"  v-model="olderCustomerBook.buyReason" class="r_text" style='border-bottom:1px solid #000;width:100%;text-align:center;;margin-top:10px;'> </div>
            <div style="font-size:12px;margin:10px auto;"><b>保险销售人员签名 ：</b>
                <!-- <input type="text" readonly  class="r_text" style='width:0%;'> -->
                <img :src="signImgsAgent" alt="" style='border-bottom:1px solid #000;;width:30px;height:30px;'>
            </div>
            <h1 align="center">客户声明及承诺</h1>
            <p class="inp_text">&nbsp;&nbsp;本人已完全阅读并了解上述“年长客户购买保险特别提示”的内容和含义，理解所揭示的风险，将根据自身情况理性谨慎保险产品，并愿意承担可能出现的风险及损失。</p>
            <p  class="inp_text" style="font-size:12px;">声明人（签名）：
                <!-- <input type="text" readonly class="r_text"  style='width:0%;'> -->
                <img :src="sign" alt="" style='border-bottom:1px solid #000;width:30px;height:30px;'>
            </p>
            <p class="inp_text" style="font-size:12px;">日期：<input type="text" readonly class="r_text" v-model="olderCustomerBook.appSignDate"></p>
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
    name: 'olderCustomerInsuranceSpecialBook',
    components: {Headerbtns,Footerbtns,alert},
	props: {
	},
	data() {
		return {
            page_title: '年长客户购买保险特别提示',
            current_total_premium: '10000.00',
            isAgree:false,
            isShare:this.$route.params.share,
            saveName:"2050801",
            channel:this.$route.params.channel,
            sign:JSON.parse(this.$route.params.signImgs),
            signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
            appntName:this.$route.params.applicant,
            olderCustomerBook:{
                recommendReason:"",//推荐原因
                buyReason:"",//购买原因
                appSignDate:"",//投保人签字日期
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
                    this.olderCustomerBook = documentInfo[i].content
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

    },
	methods: {
        jumpToBack(){
            if(!this.isShare){
                this.$router.push({
                		path: '/policy/ElectronicsPolicyPage.vue',
                		name: 'electronics_policy_page',
                		params: {
                				planId:this.$route.params.planId,
                				applyCode:this.$route.params.applyCode,
                				sendInfo:{
                						name:"2050801",
                						isRed:"0",  
                						content:this.olderCustomerBook,
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
                						name:"2050801",
                						isRed:"0",  
                						content:this.olderCustomerBook,
                				}  
                		}
                })
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
                					name:"2050801",
                					isRed:"1",  
                					content:this.olderCustomerBook,
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
                					name:"2050801",
                					isRed:"1",  
                					content:this.olderCustomerBook,
                				}
                				
                		}
                })
            }
           
        },
        //提示框
        showMsg:function(msg){
            if(msg!=undefined && msg!=""){
                 this.$refs.alert.showMOdal(msg)
            }
        },
    },
}
</script>

<style type="text/scss">
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
    margin: 10px auto;
}
.inp_text{
    text-indent:2em;
    line-height: 25px;
}
.blank{
    height: 20px;
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
</style>
