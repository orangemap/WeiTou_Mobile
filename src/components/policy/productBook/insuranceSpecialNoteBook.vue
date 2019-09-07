<template> 
    <div>
        <Headerbtns :title = page_title>
            <div slot="left" class="back">
                <i class="fa fa-angle-left" @click="back()"></i>
            </div>
        </Headerbtns>
        <div class="manage-contents">
            <div style="width:120px;height:60px;float:left;">
                <img src="../../../../static/img/policy/2050601.jpg">
            </div>
            <!-- <div class="header"></div> -->
            <!-- 内容区 -->
            <div class="content clear">
                <p>附件：</p>
                <h1 style="font-weight:bold;">人身保险新型产品投保风险特别提示</h1>
                <p><b style="font-weight:bold;">尊敬的投保人:</b></p>
                <p class="lineText">为维护您保险消费的合法权益，<u><b style="font-weight:bold;">中国保险监督管理委员会宁波监管局</b></u>提醒您认真阅读并亲笔填写以下内容，在填写过程中若有问题您有权要求销售人员做出详尽解释:</p>
                <p class="lineText">一、你所购买的是一款名称为
                    <input type="text" readonly style="border-bottom: 1px solid black;text-align:center;" v-model="NBSpecialBookInfo.riskName">的<input type="text" readonly style="border-bottom: 1px solid black;width:30%;text-align:center;" v-model="NBSpecialBookInfo.riskType">型保险产品。</p>
                <p class="lineText">二、这款保险产品需每年交<input type="text" readonly style="border-bottom: 1px solid black;width:30%;text-align:center;" v-model="NBSpecialBookInfo.prem">元保费，共需持续交费<input type="text" readonly style="border-bottom: 1px solid black;width:30%;text-align:center;" v-model="NBSpecialBookInfo.payYears">年。</p>
                <p class="lineText">三、这款保险产品的保险期间为
                <input type="text" readonly style="border-bottom: 1px solid black;width:30%;text-align:center;" v-model="NBSpecialBookInfo.insuYears">年。
                <p class="lineText">四、犹豫期的起算时间为<input type="text" style="border-bottom: 1px solid black" v-model="NBSpecialBookInfo.hesitateStartDesc">，共有<input type="text" readonly style="border-bottom: 1px solid black;;width:30%;text-align:center;" v-model="NBSpecialBookInfo.hesitateEnd">天，在犹豫期内您享有的权利是<input type="text" style="border-bottom: 1px solid black" v-model="NBSpecialBookInfo.hesitateRightDesc">。</p>
                <p class="lineText">五、超过犹豫期退保，只能按照合同约定退还保单当时的现金价值，<input type="text" style="border-bottom: 1px solid black; width: 240px" v-model="NBSpecialBookInfo.refundDesc"> (填写<b style="font-weight:bold;">"退保金额可能大大低于所交保费"</b>)。 特别提示您收到保单后仔细查看现金价值表， 如有问题请及时拨打保险公司客服电话。</p>
                <p class="lineText">六、分红型、万能型或投资连结型等人身保险新型产品，<input type="text" style="border-bottom: 1px solid black; width: 275px" v-model="NBSpecialBookInfo.bonusDesc">(填写"未来的红利分配、投资收益是不确定的")，产品说明书或保险利益测算书中的测算数字<input type="text" style="border-bottom: 1px solid black; width: 270px" v-model="NBSpecialBookInfo.bnfDesc">。(填写<b style="font-weight:bold;">"只是对未来收益的假设，不能保证未来的实际收益"</b>)</p>
                <p class="lineText">七、最后特别提醒您:如果在投保过程中，您对销售人员的宣传内容或宣传材料存在疑义，可以要求销售人员就某些宣传内容或在宣传资料上进行签字确认，作为您今后维权的重要证据。</p>
                <div class="blank"></div>
                <div class="inp">
                    <p class="inp_p">&nbsp;&nbsp;&nbsp;&nbsp;投保人签字&nbsp;&nbsp;:
                        <img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">
                    </p>
                    <p class="inp_p">&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期&nbsp;&nbsp;&nbsp;:
                        <!-- <input type="text" readonly="readyonly" class="r_text"/> -->
                    </p>
                    <p class="inp_p">&nbsp;&nbsp;&nbsp;&nbsp;销售人员签字:
                        <img :src="signImgsAgent" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">
                    </p>
                    <p class="inp_p">&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期&nbsp;&nbsp;&nbsp;:
                       <!--  <input type="text" readonly="readyonly" class="r_text"/> -->
                    </p>
                </div>
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
        name: 'insuranceSpecialNoteBook',
        components: {Headerbtns,Footerbtns,alert},
        props: {},
        data() {
            return {
                page_title: '人身保险新型产品投保风险特别提示(宁波)',
                current_total_premium: '10000.00',
                isAgree:false,
                isShare:this.$route.params.share,
                saveName:"2050601",
                channel:this.$route.params.channel,
                sign:JSON.parse(this.$route.params.signImgs),
                signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
                appntName:this.$route.params.applicant,
                NBSpecialBookInfo:{
                    bnfDesc : "",
                    bonusDesc : "",
                    hesitateEnd : this.$route.params.hesitationPeriod,
                    hesitateRightDesc : "",
                    hesitateStartDesc : "",
                    insuYears : "",
                    payYears : "",
                    prem : "",
                    refundDesc : "",
                    regulator : "管理机构名称",
                    riskName : "",
                    riskType : "" ,
                    typeProduct:"",
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
            if(documentInfo!=null && documentInfo!=undefined && documentInfo.length>0){
                for(var i=0;i<documentInfo.length;i++){
                    if(documentInfo[i].name == this.saveName){
                        this.NBSpecialBookInfo = documentInfo[i].content
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
            
            //险种名称
            let productsList=this.$route.params.policyResult
            // console.log(productsList)
            let products=productsList.productInfo.products.product
            for(var i=0;i<products.length;i++){
                this.NBSpecialBookInfo.riskName = products[0].prodName
                //缴费*元
                this.NBSpecialBookInfo.prem=products[0].prem
                //缴费期
                this.NBSpecialBookInfo.payYears=this.getPayFreq(products[0].payYear)
                //保险期限
                this.NBSpecialBookInfo.insuYears=this.getInsure(products[0].insureYear)
            }
            // 险种类型
            this.NBSpecialBookInfo.typeProduct=this.$route.params.typeProduct
            if (this.NBSpecialBookInfo.typeProduct=="1020") {// desc="分红寿险" 
                this.NBSpecialBookInfo.riskType="分红型"
            } else if (this.NBSpecialBookInfo.typeProduct=="1030") {//desc="投资连接保险"
                this.NBSpecialBookInfo.riskType= "投资连结型"
            } else if (this.NBSpecialBookInfo.typeProduct=="1040") {//desc="万能保险"
                this.NBSpecialBookInfo.riskType = "万能型"
            }else{
                this.NBSpecialBookInfo.riskType = "其他"
            } 
        },
        methods:{
            jumpToBack(){
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
                        					name:"2050601",
                        					isRed:"0",  
                        					content:this.NBSpecialBookInfo,
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
                        					name:"2050601",
                        					isRed:"0",  
                        					content:this.NBSpecialBookInfo,
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
                    					name:"2050601",
                    					isRed:"1",  
                    					content:this.NBSpecialBookInfo,
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
                    					name:"2050601",
                    					isRed:"1",  
                    					content:this.NBSpecialBookInfo,
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
            //校验
            checkall(){
                if (this.NBSpecialBookInfo.riskName.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写购买的保险名称")
                    return false
                }else if(this.NBSpecialBookInfo.riskType.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写产品类型")
                    return false
                }else if(this.NBSpecialBookInfo.prem.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写年交保费")
                    return false
                }else if(this.NBSpecialBookInfo.payYears.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写缴费年期")
                    return false
                }else if(this.NBSpecialBookInfo.insuYears.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写保险年期")
                    return false
                }else if(this.NBSpecialBookInfo.hesitateStartDesc.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写犹豫期起算时间")
                    return false
                }else if(this.NBSpecialBookInfo.hesitateEnd.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写犹豫期")
                    return false
                }else if(this.NBSpecialBookInfo.hesitateRightDesc.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写犹豫期内的享有权利")
                    return false
                }else if(this.NBSpecialBookInfo.refundDesc.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写退保描述")
                    return false
                }else if(this.NBSpecialBookInfo.refundDesc.replace(/(^s*)|(s*$)/g, "").length != 14) {
                    this.$refs.alert.showMOdal("退保描述字数与提示不符")
                    return false
                }else if(this.NBSpecialBookInfo.bonusDesc.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写分红分配,投资收益")
                    return false
                }else if(this.NBSpecialBookInfo.bonusDesc.replace(/(^s*)|(s*$)/g, "").length != 17){
                    this.$refs.alert.showMOdal("分红分配描述与提示字数不符")
                    return false
                }else if(this.NBSpecialBookInfo.bnfDesc.replace(/(^s*)|(s*$)/g, "").length== 0){
                    this.$refs.alert.showMOdal("请填写测试的收益")
                    return false
                }else if (this.NBSpecialBookInfo.bnfDesc.replace(/(^s*)|(s*$)/g, "").length != 22){
                    this.$refs.alert.showMOdal("测试的收益与提示字数不符")
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
    h2{
        text-align: center;
        font-weight:bold;
        margin:20px 0 ;
    }
    .lineText{
        text-indent:2em;
    }
    .blank{
        height: 20px;
    }
    h1{
        margin-bottom: 30px;
        text-align: center;
    }
   /*  p{
        margin-left: 10%;
        margin-right: 10%;
    } */
    .inp_p{
        /* text-align: center; */
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
</style>