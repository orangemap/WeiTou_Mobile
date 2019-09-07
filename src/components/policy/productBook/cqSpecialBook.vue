<template>
	<div>
		<NewCAS v-show="caValue.isCASOpen" v-model="caValue" :value="caValue"></NewCAS>
		<div v-show="!caValue.isCASOpen">
			<Headerbtns :title = page_title>
				<div slot="left" class="back">
					<i class="fa fa-angle-left" @click="back()" style="left:5px!important;"></i>
				</div>
			</Headerbtns>
			<!-- 内容区 -->
			<div class="manage-contents">
				<!-- <div class="header"></div> -->
				<div class="content clear">
					<div align="center" style="font-size:16px;margin-top: 5%;"><p style="font-weight:bold;">关于防范保险从业人员违规销售非保险金融产品的风险提示书</p></div><br/>
					<div style="  width: 100%; text-indent: 2em;font-weight: bold;">
						尊敬的客户：<br/><br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
						为规范保险销售行为，防范保险从业人员违规销售非保险金融产品，切实维护您的合法权益，根据银保监会相关规定，光大永明人寿保险有限公司重庆分公司特提醒您在办理投保、保全等保险业务时高度关注以下风险提示：<br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
						<b class="num">一、保险公司及其从业人员不得违规销售非保险金融产品</b><br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
						我司销售人员不得违规销售非保险金融产品。若有我司销售人员向您推荐非保险金融产品，请提高警惕，查验其相关资质，提高自我保护意识。<br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
						<b class="num">二、细读合同，确认产品属性</b><br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
					   您在签署保险合同时，一定要认真阅读保险合同内容，确认保险产品的细则条款和重要信息（如保险责任、缴费方式、承保公司等），防止销售人员以假乱真。购买保险产品时尽量做到“三查、两配合”，即通过公司网站、客户服务热线或监管部门、行业协会网站查人员、查产品、查单证，配合做好转账缴费、配合做好承保后回访。投保后，您可以通过拨打我司统一客服电话95348、登录官方网站或者前往我司柜面等方式，查验保单真伪。<br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
						<b class="num">三、保全退费后，资金使用风险自行承担</b><br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
						请您切勿盲目退保，或轻信他人购买非保险金融产品，谨防发生经济损失，切实增强风险意识。您办理了犹豫期退保、退保、减保、生存金/满期金领取、红利领取、部分领取、账户价值提取和保单贷款等支出类业务后，资金使用风险自行承担。<br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
						<b class="num">四、理性消费，不受“保本高收益”诱惑</b><br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
					   您在购买金融产品时，应当了解投资风险与投资收益成正比，不要盲目相信推销人员“保本高收益”的承诺，应根据自己的实际需求和风险承受能力，通过正规销售渠道购买金融产品。若通过非正规销售渠道购买金融产品，将不受法律保护。<br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
						<b class="num">五、请投保时务必认真阅读以下内容并亲笔抄录和签名确认</b><br/><br/>
					</div>
					<div style="  width: 100%; text-indent: 2em;">
					   <b class="num">“本人已知晓保险从业人员不得违规销售非保险金融产品，由此造成的风险自行承担。”</b><br/><br/>
					   <div @click="opensCA(31)" style="width:60%;height:20%;position:relative;left:15%;">
							 <img style="width:100%;height:100%;" v-if="signImgsCqspecial==''" :src="wrting">
							 <img style="width:100%;height:100%;" v-if="signImgsCqspecial!=''" :src="signImgsCqspecial">
						 </div>
					</div>
					<div style="  width: 100%; text-indent: 1em;">
						<P>投保人签字:<span id="AppnQZ"></span>
							<img :src="sign" alt="" style="width:30px;height:30px;border-bottom:1px solid #000">
						</P>
						<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;日期：
						&nbsp;&nbsp;&nbsp;&nbsp;<span id="AppnYear"></span>年
						&nbsp;&nbsp;&nbsp;&nbsp;<span id="AppnMonth"></span>月
						&nbsp;&nbsp;&nbsp;&nbsp;<span id="AppnDay"></span>日
					</div><br/>
				</div>
				<div style="margin:5% 0 0 0;line-height: 25px;">
					<input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{appntName}}已认真阅读投保特别提示，且全面知晓理解相关内容，并予以确认。
				</div>
			</div>
			<Footerbtns :is_show=false 
				total_premium="10000.00">
				<button class="btnFoote" slot="center" @click="jumpToBack()" :disabled="!isAgree">
					下一步
				</button>
			</Footerbtns>
		</div>
	</div>
</template>
    
<script>
    import Headerbtns from '../../common/Header.vue'
    import Footerbtns from '../../policy/common/Footer.vue' 
    import NewCAS from '../../common/NewCAS'

    export default{
        name: 'cqSpecialBook',
        components: {Headerbtns,Footerbtns,NewCAS},
        props: {},
        data() {
            return {
                page_title: '关于防范保险从业人员违规销售非保险金融产品的风险提示书',
                current_total_premium: '10000.00',
                isAgree:false,
                isShare:this.$route.params.share,
                appntName:this.$route.params.applicant,
                channel:this.$route.params.channel,
                sign:JSON.parse(this.$route.params.signImgs),
                signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
				signImgsCqspecial:'',
				caValue:{
					isCASOpen:false,
					image:"",
					context_id: '',
					applyCode:this.$route.params.applyCode,
					orderId:this.$route.params.planId
				},
				wrting:'data:image/jpeg;base64,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',
            }
        },
		computed:{
		
		},
        watch:{
            'caValue.isCASOpen': {
				handler(val, oldval) {
					if(!val && this.caValue.image != "") {
						this.signImgsCqspecial = this.caValue.image

					}
				},
				deep: true
			},
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
			console.log('========>',this.$route.params.signImgsCqspecial,this.$route.params.signImgsCqspecial=='""')
			if(this.$route.params.signImgsCqspecial!='""'){
				this.signImgsCqspecial = JSON.parse(this.$route.params.signImgsCqspecial)
			}
        },
        methods:{
            opensCA(signNums){
            	this.caValue.isCASOpen = !this.caValue.isCASOpen
            	$('html,body').animate({scrollTop: this.offsetHeight+'px'})
            	this.caValue.image = ""
            	this.caValue.context_id = signNums
            },
			jumpToBack(){
				console.log('==跳转',this.signImgsCqspecial)
				if(this.signImgsCqspecial==''){
					alert_n22.alert('提示', '请完成签字抄录!', '确定')
				}else{
					if(this.isAgree){
						if(!this.isShare){
							this.$router.push({
									path: '/policy/ElectronicsPolicyPage.vue',
									name: 'electronics_policy_page',
									params: {
											planId:this.$route.params.planId,
											applyCode:this.$route.params.applyCode,
											sendInfo:{
												name:"3012701",
												isRed:"0",  
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
												name:"3012701",
												isRed:"0",  
												content:""
											}
									}
							})
						}
					}
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
                    						name:"3012701",
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
                    						name:"3012701",
                    						isRed:"1",  
                    						content:""
                    				}
                    				
                    		}
                    })
                }
            },
        
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
        color:#FDB92C;
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
        display:block;
        line-height: 20px;
    }  
    .manage-contents{
        position: absolute;
        padding: 0 5%;
        left: 0;right: 0;top: 48px;bottom: 50px;
        overflow-y: auto;
        overflow-x: hidden;
        background: #FFF;
        margin-top: 5%; 
        font-size: 12px;
    }
    .class{
        margin-bottom: 10px;
    }
    .class1{
        text-indent:2em;
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
    .num{
        font-weight:  bold;
    }
	.header-title{
		width: 80%;
	}
</style>
<style >
.header-title{
		width: 89%;
	}
</style>