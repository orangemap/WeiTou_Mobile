<template>
 <div>
    <Headerbtns :title = page_title>
        <div slot="left" class="back">
            <i class="fa fa-angle-left" @click="back()"></i>
        </div>
    </Headerbtns>
    <div class="manage-contents">
        <div style="display:flex;justify-content:space-between;margin-top:10px;">
            <div style="width:40%;height:100%;">
                <img src="../../../../static/img/policy/2050401.jpg" alt="" style="width:100%;">
            </div>
            <div style="width:100px;height:100px;">
                <img src="../../../../static/img/policy/GD-Logo.png" alt="" style="width:100%;height:50%;">
            </div> 
        </div>
        <div style="height: 1px;width: 100%;background-color: black;margin-top: -45px;margin-bottom: 10px;">
        </div>
        <h2 style="text-align: center;font-weight:bold;">人身保险产品风险提示书</h2>
        <br><br>
        <div class="text-title">尊敬的客户:</div>
        <p style="text-indent:2em;">为维护您的合法权益，请您在投保前仔细阅读以下重要内容，购买人身保险产品具有一定风险，投保人应充分认识以下风险：</p>
        <p style="text-indent:2em;"><b class="fontBold">1、解除保险合同风险：</b>一般规定，一年期以上的人身保险产品有一定期限的犹豫期。在犹豫期内，您可以无条件解除保险合同，保险公司退还您已缴纳的保险费；<b class="fontBold">如果您在犹豫期过后解除保险合同，您会遭受一定的损失，特别是前几年解除保险合同，您会遭受较大的损失</b>（因为犹豫期过后解除保险合同是一种提前解约行为，保险公司已经为您承担了相应的风险与运营成本，退保时需要从您所缴纳的保险费中进行扣除），通常退还给您的是保单的现金价值。<u>请您关注保险合同所附现金价值表并慎重决策。</u></p>
        <p style="text-indent:2em;"><b class="fontBold">2、收益不确定性风险：</b>请您特别注意分红保险、万能保险和投资连结保险，这些产品的分红和收益是不确定的，主要取决于保险公司的经营成果或投资回报。这些产品具有风险保障和投资理财功能，您不宜将其与银行存款、国债、基金等金融产品进行片面比较，更不能将其作为银行存款的替代品。</p>
        <p style="text-indent:2em;"><b class="fontBold">3、财务缴费风险：</b>如果您购买的是分期缴费的人身保险产品，请您注意缴费年限，并充分评估自身是否有足够稳定的持续缴费能力，通常缴费能力可能受到个人资产、收入、年龄、健康等相关因素的影响。</p>
        <p style="text-indent:2em;"><b class="fontBold">4、其他相关风险：</b>除上述风险外，如果您购买的保险产品包含有自动续保、自动垫缴、效力恢复等条款，这些条款可能产生额外费用并涉及附加条件，请您仔细阅读相关内容，并在投保书上谨慎选择。</p>
        <p style="text-indent:2em;"> 以上内容，您可以要求销售人员为您解释说明。本文本仅作为投保风险提示使用，不构成合同内容。对合同内容的解释请以合同正文条款为准。</p>
        <br><br>
        <p style="text-indent:2em;"><b class="fontBold">本人已经阅读上述风险提示，充分了解并清楚知晓购买本保险产品的风险，愿意承担相关风险。</b></p>
        <br>
        <div class="inp">
            <p class="inp_p">&nbsp;&nbsp;&nbsp;&nbsp;投&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;人&nbsp;&nbsp;:
                <img :src="shenZhenAlert.sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">
            </p>
            <p class="inp_p" v-model="shenZhenAlert.appSignDate">&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期&nbsp;&nbsp;&nbsp;:
            </p>
        </div>
        <div style="margin:5% 0 0 0;line-height: 20px;">
            <input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{shenZhenAlert.appntName}}已认真阅读投保特别提示，且全面知晓理解相关内容，并予以确认。
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
    name: 'shenZhenAlertBook',
    components: {Headerbtns,Footerbtns,alert},
	props: {
	},
	data() {
		return {
            page_title:"人身保险产品风险提示书" ,
            current_total_premium: '10000.00',
            isAgree:false,
            isShare:this.$route.params.share,
            saveName:"2050401",
            channel:this.$route.params.channel,
            shenZhenAlert:{
                sign:JSON.parse(this.$route.params.signImgs),
                signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
                appntName:this.$route.params.applicant,
                recommendReason:"",//推荐原因
                buyReason:"",//购买原因
                appSignDate:""//投保人签字日期
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
                    this.shenZhenAlert = documentInfo[i].content
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
                					name:"2050401",
                					isRed:"0",  
                					content:this.shenZhenAlert,
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
                					name:"2050401",
                					isRed:"0",  
                					content:this.shenZhenAlert,
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
                						name:"2050401",
                						isRed:"1",  
                						content:this.shenZhenAlert,
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
                						name:"2050401",
                						isRed:"1",  
                						content:this.shenZhenAlert,
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
    }
}
</script>
<style type="text/css">
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
   .fontBold{
    font-weight: bold;
   }
</style>
