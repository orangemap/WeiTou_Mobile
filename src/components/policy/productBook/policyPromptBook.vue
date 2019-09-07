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
                <div align="center" style="font-size:16px;margin-top: 5%;"><p style="font-weight:bold;">人身保险投保提示书</p></div><br/>
                <div style="  width: 100%; text-indent: 2em;">
                    尊敬的客户：<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    人身保险是以人的寿命和身体为保险标的的保险。当被保险人发生死亡、伤残、疾病等风险事故时或者
达到合同约定的年龄、期限时，保险公司按照保险合同约定给付保险金。人身保险具有保障和长期储蓄功能，
可以用于为人们的生活进行长期财务规划。为帮助您更好地认识和购买人身保险产品，保护您的合法权益，
中国银保监会请您在填写投保单之前认真阅读以下内容：<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">一 、 请您确认保险机构和销售人员的合法资格</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    请您从持有中国银行保险监督管理委员会颁发《经营保险业务许可证》或《保险兼业代理许可证》的合
法机构或持有《保险代理从业人员展业证书》的销售人员处办理保险业务。如需要查询销售人员的销售资格，
您可以要求销售人员告知具体查询方式，或登录保险中介监督信息系统查询（网址:http：//iir.circ.gov.cn）。
同时请您提高风险防范意识，谨防非法集资、金融诈骗、保险从业人员违规销售非保险金融产品等各类风险
的发生。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">二 、 请您根据实际保险需求和支付能力选择人身保险产品</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    请您根据自身已有的保障水平和经济实力等实际情况，选择适合自身需求的保险产品。多数人身保险产
品期限较长，如果需要分期交纳保费，请您充分考虑是否有足够、稳定的财力长期支付保费，不按时交费可
能会影响您的权益。建议您使用银行划账等非现金方式交纳保费。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">三 、 请您详细了解保险合同的条款内容</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    请您不要将保险产品的广告、公告、招贴画等宣传材料视同为保险合同，应当要求销售人员向您提供相
关保险产品的条款。请您认真阅读条款内容，重点关注保险责任、责任免除、投保人及被保险人权利和义务、
免赔额或免赔率的计算、申请赔款的手续、退保相关约定、费用扣除、产品期限等内容。您若对条款内容有
疑问，您可以要求销售人员进行解释。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">四 、 请您了解犹豫期的有关约定</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    一年期以上的人身保险产品一般有犹豫期的有关约定。您在书面签收保险合同后15日内有全额退保的权
利，超过15日退保有损失。如您购买产品犹豫期不足或超过15日，将按保险合同约定的犹豫期进行办理。除
合同另有约定，犹豫期内你可无条件解除保险合同，但应退还保单，保险公司除扣除不超过 10 元的成本费
以外，应退还您全部保费并不得对此收取其他任何费用。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">五 、 犹豫期后解除保险合同请您慎重</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    若您在犹豫期过后解除保险合同，您会有一定的损失。保险公司应当自收到解除合同通知之日起三十日
内，按照合同约定退还保险单的现金价值（现金价值表附在正式保险合同之中，您若存在疑问，可要求保险
公司予以解释）。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">六 、 请您充分认识分红保险 、 投资连结保险 、 万能保险等人身保险新型产品的风险和特点</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    1、如果您选择购买分红保险产品，请您注意以下事项:分红水平主要取决于保险公司的实际经营成果。
如果实际经营成果优于定价假设，保险公司才会将部分盈余分配给您。如果实际经营成果差于定价假设，保
险公司可能不会派发红利。产品说明书或保险利益测算书中关于未来保险合同利益的预测是基于公司精算假
设，不能理解为对未来的预期，红利分配是不确定的。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    2、如果您选择购买投资连结保险产品，请您注意以下事项:您应当详细了解投资连结保险的费用扣除情
况，包括初始费用、买入卖出差价、死亡风险保险费、保单管理费、资产管理费、手续费、退保费用等。您
应当要求销售人员将投资连结保险账户价值的详细计算方法对您进行解释。投资连结保险产品的投资回报具
有不确定性，投资风险完全由您承担。产品说明书或保险利益测算书中关于未来保险合同利益的预测是基于
公司精算假设，不能理解为对未来的预期，实际投资可能盈利或出现亏损。如果您选择灵活交费方式的，您
应当要求销售人员将您停止交费可能产生的风险和不利后果对您进行解释。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    3、如果您选择购买万能保险产品，请您注意以下事项:万能保险产品通常有最低保证利率的约定，最低
保证利率仅针对投资账户中资金。您应当详细了解万能保险的费用扣除情况，包括初始费用、死亡风险保险
费、保单管理费、手续费、退保费用等。您应当要求销售人员将万能保险账户价值的详细计算方法对您进行
解释。万能保险产品的投资回报具有不确定性，您要承担部分投资风险。保险公司每月公布的结算利率只能
代表一个月的投资情况，不能理解为对全年的预期，结算利率仅针对投资账户中的资金，不针对全部保险费。
产品说明书或保险利益测算书中关于未来保险合同利益的预测是基于公司精算假设，最低保证利率之上的投
资收益是不确定的，不能理解为对未来的预期。如果您选择灵活交费方式的，您应当要求销售人员将您停止
交费可能产生的风险和不利后果对您进行解释。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">七 、 请您正确认识人身保险新型产品与其他金融产品</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    分红保险、投资连结保险、万能保险等人身保险新型产品兼具保险保障功能和投资功能，不同保险产品
对于保障功能和投资功能侧重不同，但本质上属于保险产品，产品经营主体是保险公司。您不宜将人身保险
新型产品与银行存款、国债、基金等金融产品进行片面比较，更不要仅把它作为银行存款的替代品。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">八 、 选择健康保险产品时请您注意产品特性和条款具体约定</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    健康保险产品是具有较强风险保障功能的产品，既有定额给付性质的，也有费用补偿性质的。定额给付
性质的健康保险按约定给付保险金，与被保险人是否获得其他医疗费用补偿无关；对于费用补偿性质的健康
保险，保险公司给付的保险金可能会相应扣除被保险人从其他渠道所获的医疗费用补偿。请您注意条款中是
否有免赔额或赔付比例的约定、是否有疾病观察期约定。如果保险公司以附加险形式销售无保证续保条款的
健康保险产品，请您注意附加健康保险的保险期限应不小于主险保险期限。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">九 、 为未成年子女选择保险产品时保险金额应适当</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    如果您为未成年子女购买保险产品，因被保险人死亡给付的保险金总和应符合中国银保监会的有关规定。
其主要目的是为了保护未成年人权益，防止道德风险；同时，从整个家庭看，父母是家庭的主要经济来源和
支柱，以父母为被保险人购买保险，可以使整个家庭获得更加全面的保险保障。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">十 、 请您如实填写投保资料 、 如实告知有关情况并亲笔签名</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    我国《保险法》对投保人的如实告知行为进行了明确的规定。投保时，您填写的投保单应当属实；对于
销售人员询问的有关被保险人的问题，您也应当如实回答，否则可能影响您和被保险人的权益。为了有效保
障自身权益，请您在投保提示书、投保单等相关文件亲笔签名。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">十一 、 请您配合保险公司做好客户回访工作</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    各保险公司按规定开展客户回访工作，一般通过电话、信函和上门回访等形式进行。为确保自己的权益
得到切实保障，您应对回访问题进行如实答复，不清楚的地方可以立即提出，要求保险公司进行详细解释。
请您投保时准确、完整填写家庭住址、邮编、常用联系电话等个人信息，以便保险公司能够对您及时回访。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">十二 、 请您注意保护自身的合法权益</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    请您慎重保管您的身份证件，避免造成不必要的财务损失。如果您发现销售人员在保险销售过程中存在
误导销售行为，或认为自身权益受到侵犯，请注意保留书面证据或其他证据，可以向保险公司（电话 95348）
反映；也可以向当地银保监局（或保险行业协会）投诉；必要时还可以根据合同约定，申请仲裁或向法院起
诉。<br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">十三 、 关于我公司偿付能力</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    目前我公司偿付能力充足，符合监管要求，详情可登陆我公司官网进行查询。<br/>
                </div><br/>
                <div style="  width: 100%; text-indent: 2em;">
                    <b class="num">十四 、 监管咨询电话</b><br/>
                </div>
                <div style="  width: 100%; text-indent: 2em;">
                    <p>天津银保监局：022-23145068</p>
                    <p>天津保险行业协会：022-23302420</p>
                    <p>安徽银保监局： 12378</p>
                    <p>安徽保险行业协会： 0551-65970368</p>
                    <p>北京银保监局：12378</p>
                    <p>北京保险行业协会：010-95001303</p>
                    <p>湖北银保监局： 12378</p>
                    <p>湖北保险行业协会： 027-88937801</p>
                    <p>浙江银保监局：12378</p>
                    <p>浙江保险行业协会：4006057178</p>
                    <p>苏州银保监局： 12378</p>
                    <p>苏州保险行业协会： 0512-68263682</p>
                    <p>宁波银保监局：0574-87848620</p>
                    <p>宁波保险行业协会：0574-27995000</p>
                    <p>山东银保监局： 12378</p>
                    <p>山东保险行业协会： 0531-82066470</p>
                    <p>江苏银保监局：025-86793909</p>
                    <p>江苏保险行业协会：4008012378</p>
                    <p>河南银保监局： 12378</p>
                    <p>河南省保险行业协会：0371-65803791</p>
                    <p>上海银保监局：021-38656624</p>
                    <p>上海保险行业协会：021-63155940</p>
                    <p>湖南银保监局： 12378</p>
                    <p>湖南省保险行业协会：4008012378</p>
                    <p>广东银保监局：020-85255600</p>
					<p>广东保险行业协会：020-87512378</p>
					<p>黑龙江银保监局：12378</p>
					<p>黑龙江保险行业协会：0451-51996836</p>
					<p>辽宁银保监局：024-22596559</p>
					<p>辽宁保险行业协会：024-22562500</p>
					<p>四川银保监局：028-84112378</p>
					<p>四川保险行业协会： 028-84112378</p>
					<p>深圳银保监局：12378</p>
					<p>深圳保险同业公会：0755-83529699</p>
					<p>河北银保监局：0311-66007891</p>
					<p>河北保险行业协会： 0311-66007872</p>
					<p>山西银保监局：12378</p>
					<p>山西省保险行业协会：0351-4193246</p>
					<p>陕西银保监局：029-83500305</p>
					<p>陕西保险行业协会： 029-82309256</p>
					<p>重庆银保监局：023-86668947</p>
					<p>重庆保险行业协会：023-88060939 023-88061560</p>
					<p>大连银保监局：0411-82563767</p>
					<p>大连保险行业协会： 0411-82827062 0411-83612378</p>
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
</template>
    
<script>
    import Headerbtns from '../../common/Header.vue'
    import Footerbtns from '../../policy/common/Footer.vue' 

    export default{
        name: 'policyPromptBook',
        components: {Headerbtns,Footerbtns},
        props: {},
        data() {
            return {
                page_title: '人身保险投保提示书',
                current_total_premium: '10000.00',
                isAgree:false,
                isShare:this.$route.params.share,
                appntName:this.$route.params.applicant,
                channel:this.$route.params.channel,
                sign:JSON.parse(this.$route.params.signImgs),
                signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
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
                if(this.isAgree){
                    if(!this.isShare){
                        this.$router.push({
                        		path: '/policy/ElectronicsPolicyPage.vue',
                        		name: 'electronics_policy_page',
                        		params: {
                        				planId:this.$route.params.planId,
                        				applyCode:this.$route.params.applyCode,
                        				sendInfo:{
                        					name:"policyPromptBook",
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
                        					name:"policyPromptBook",
                        					isRed:"0",  
                        					content:""
                        				}
                        		}
                        })
                    }
                }else{

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
                    						name:"policyPromptBook",
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
                    						name:"policyPromptBook",
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

<style type="text/css" mce_bogus="1">
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
</style>