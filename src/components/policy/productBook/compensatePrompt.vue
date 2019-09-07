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
                <div style="font-size: 14px;width: 100%;">
                    <h2 style="font-weight:bold;">光大永明人寿保险有限公司</h2>
                    <h2 style="font-weight:bold;">关于费用补偿型医疗保险产品提示</h2>
                    <p style="text-indent:2em;font-size:12px;">我公司销售的费用补偿型医疗保险《光大永明无忧住院医疗保险》、《光大永明附加住院医疗保险(A款)》,如果被保险人发生的属于保险责任范围内的各项费用已通过其他途径获得补偿,本公司仅对扣除已获补偿后的剩余部分,在约定的限额内按照本合同规定的给付比例给付保险金。</p>
                    <p style="text-indent:2em;font-size:12px;">本公司承担的保险金给付比例以被保险人是否参加社会医疗保险而不同。如果被保险人未从社会医疗保险机构先行取得补偿,我们将按照非社保人群的给付比例给付保险金。</p>
                    <p style="text-indent:2em;font-size:12px;">投保人对以上内容已充分了解并确认接受。特此声明。</p>
                    <p style="margin-top: 5%;font-size:12px;">投保人签名: <img :src="sign" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;"></p>
                    <p style="font-size:12px;">时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>
                    <p style="margin-top: 5%;font-size:12px;text-align: left">销售人员签名: <img :src="signImgsAgent" alt="" style="border-bottom:1px solid #000;width:30px;height:30px;">  </p>
                    <p style="display:flex;font-size:12px;">
                        <span style="display: inline;" >销售人员代码:</span>
                        <input type="text" style="border-bottom: 1px solid #000; width:43%;text-align:center;" v-model="saleNum">
                    </p>
                    <p style="font-size:12px;">时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p> 
                </div>
                <div>
                    <p style="margin-top: 5%;text-align:right;">光大永明人寿保险有限公司</p>
                </div>
                <div style="margin:5% 0 0 0;">
                    <input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{appntName}}已认真阅读投保特别提示，且全面知晓理解相关内容，并予以确认。
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

    export default{
        name: 'compensatePrompt',
        components: {Headerbtns,Footerbtns},
        props: {},
        data() {
            return {
                page_title: '关于费用补偿型医疗保险产品提示',
                current_total_premium: '10000.00',
                saleNum:"",
                isAgree:false,
                isShare:this.$route.params.share,
                saveName:"2050201",
                channel:this.$route.params.channel,
                sign:JSON.parse(this.$route.params.signImgs),
                signImgsAgent:JSON.parse(this.$route.params.signImgsAgent),
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
            // 判断再次进入单证缓冲有数据且赋值,
            let documentInfo = utils.cache.get("documentInfo")
            if(documentInfo!=null && documentInfo!=undefined && documentInfo.length>0){
                for(var i=0;i<documentInfo.length;i++){
                    if(documentInfo[i].name == this.saveName){
                        this.saleNum = documentInfo[i].content
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
            
            this.saleNum= this.$route.params.agentCode
        },
        methods:{
            jumpToBack(){
               if(!this.isShare){
                    this.$router.push({
                    		path: '/policy/ElectronicsPolicyPage.vue',
                    		name: 'electronics_policy_page',
                    		params: {
                    				planId:this.$route.params.planId,
                    				applyCode:this.$route.params.applyCode,
                    				sendInfo:{
                    						name:"2050201",
                    						isRed:"0",  
                    						content:this.saleNum,
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
                    					name:"2050201",
                    					isRed:"0",  
                    					content:this.saleNum,
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
                    					name:"2050201",
                    					isRed:"1",  
                    					content:this.saleNum,
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
                    					name:"2050201",
                    					isRed:"1",  
                    					content:this.saleNum,
                    				}
                    				
                    		}
                    })
                }
               
            },
        }
    }
</script>

<style>
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
        margin-top: 7%; 
        font-size:12px;
    }
    h2{
        text-align: center;
        /* font-weight:bold; */
        margin:20px 0 ;
        font-size: 18px;
    } 
    p{
        line-height: 28px;
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