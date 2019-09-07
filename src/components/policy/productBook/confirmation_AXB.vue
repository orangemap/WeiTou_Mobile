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
            <div class="content clear">
                <!--log和条码区-->
                <div></div>
                <h1 style="text-align: center">产品认购书</h1>
                <div id="content">
                    <p>尊敬的客户，您好！</p>
                    <p class="para">感谢您选择我公司的产品，这是对我们的充分信任和支持，我们将以用心的服务来给您贴心的感受。</p>
                    <p class="para">您投保的“光大永明安鑫宝保险理财计划（2017）”由《光大永明安鑫宝年金保险》（简称“主合同”）和《光大永明附加增利金账户两全保险（万能型）》（简称“附加合同”）组合而成；其中《光大永明安鑫宝年金保险》是一款普通型年金产品，包含生存保险金和满期保险金责任，身故时给付已交保险费之和与保单现金价值相比金额的较大值，保障期限为16年；《光大永明附加增利金账户两全保险（万能型）》是一款万能型两全产品，包含身故保险金和满期保险金等保险责任，该产品保费来自主合同产品所约定的自动转入附加合同个人账户中的生存保险金，并可追加保费，我们仅在第一个保单年度收取追加保费的1%作为初始费用，其余部分进入个人万能账户，本公司每日按照日结算利率结算利息，个人账户价值按结算的利息额增加，<b>请注意超过万能险最低保证利率之上的投资收益是不确定的，结算利率以实际公布的为准。</b>请您仔细阅读产品条款，特别关注产品条款中关于责任免除的相关描述。</p>
                    <p class="para">自您签收本保险合同之日起十五天内为犹豫期，如果您在犹豫期内要求退保，本公司将扣除您十元工本费后无息退还您所交纳的全部保险费（含追加保费），保险合同自始无效。如果您在犹豫期后要求退保，本公司将退还您申请退保时的现金价值净额或个人账户价值（详见主合同第十八条、附加合同第二十六条），<b>您在犹豫期后退保可能会损失部分已交保费。</b></p>
                    <p class="para">如果您选择了期交方式交纳保险费，需连续交纳<input type="text" style="border: none;width: 100px;border-bottom: 1px solid black;font-size: 15px;text-align: center" id="payYear" v-model="input_text">年，请您及时交纳每期保险费，<b>以免因延误交纳保费而导致保险失效，保险合同失效期间，您的保障也将同时失效。</b></p>
                    <p>希望您继续关注光大永明人寿，您的需求是我们前进的动力，您的选择是我们奋斗的目标，您的幸福是我们的承诺！</p>
                    <p style="font-size: 18px;font-weight: bold">声明</p>
                    <p class="para" style="font-weight: bold;font-size: 18px">我已知晓并认可光大永明人寿保险有限公司的上述提示内容。</p>
                    <div class="sig">
                        <p align="right" style="width:100%">投保人签字：___________
                            <img :src="sign" alt="" style="widh:100%;height:100%;border-bottom:1px solid #000;" >
                        </p>
                        <p align="right">日期：<input readonly type="text" style="border: none;width: 28%;border-bottom: 1px solid black;font-size: 15px;text-align: center" id="nowDate"></p>
                    </div>
                    <div >
                        <p style="font-size: 11px;color: lightgray;text-align: center" >本函仅供客户了解相关信息，我公司与客户的一切权利义务以保险产品条款为准。</p>
                    </div>
                    <div style="margin:5% 0 0 5%;">
                        <input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{appntName}}已认真阅读投保特别提示，且全面知晓理解相关内容，并予以确认。
                    </div>
                </div>
            </div>
        </div>
        <Footerbtns :is_show=false 
            total_premium="10000.00">
            <button class="btnFoote" slot="center" @click="jumpToBack()" :disabled="!isAgree">
                下一步
            </button>
        </Footerbtns>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import Headerbtns from '../../common/Header.vue'
    import Footerbtns from '../../policy/common/Footer.vue'
    import alert from '../common/alert.vue'

    export default{
        name: 'confirmation_AXB',
        components: {Headerbtns,Footerbtns,alert},
        props: {},
        data() {
            return {
                page_title: '安鑫宝认购书',
                current_total_premium: '10000.00',
                isAgree:false,
                input_text:"" ,
                sign:JSON.parse(this.$route.params.signImgs),
                appntName:this.$route.params.applicant,
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
        mounted(){
            $(".btnFoote").css({'opacity':0.5})
            console.log(this.appntName)
            console.log(this.sign)
            
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
        methods:{
            jumpToBack(){
                var isCheck=this.checkall()
                // console.log(isCheck)
                if(this.isAgree && isCheck){
                   this.$router.push({
                   		path: '/policy/ElectronicsPolicyPage.vue',
                   		name: 'electronics_policy_page',
                   		params: {
                   				planId:this.$route.params.planId,
                   				applyCode:this.$route.params.applyCode,
                   				sendInfo:{
                   					name:"3011601_04",
                   					isRed:"0",  
                   					content:{
                   								sign:JSON.stringify(this.sign),
                   								appntName:this.appntName,
                   								input_text:this.input_text,
                   						}
                   				}
                   				
                   		}
                   })
                }else{
                    this.checkall()
                } 
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
                					name:"3011601_04",
                					isRed:"1",  
                					content:{
                								sign:JSON.stringify(this.sign),
                								appntName:this.appntName,
                								input_text:this.input_text,
                						}
                				}
                				
                		}
                })
            },
            checkall(){
                var reg=/[^1-9]/g;
                if(this.input_text==""){
                    MessageBox({
                        title: '提示',
                        message: '期交不能为空'
                    });
                    return false
                }else if(reg.test(this.input_text)){
                    MessageBox({
                        title: '提示',
                        message: '只能输入数字，且为正数'
                    });
                    return false
                }else{
                    return true
                }
            }
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
       margin: 7% auto 0 auto;
   }
    h1{
        text-align: center;
        font-weight:bold;
        margin:20px 0 ;
    }
    .para{
        text-indent: 2em;
    }
    p{
        margin-top: 5px;
        margin-bottom: 5px;
        line-height: 25px;
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