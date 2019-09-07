<template> 
    <div id="comfirmBook">
        <Headerbtns :title = page_title>
            <div slot="left" class="back">
                <i class="fa fa-angle-left" @click="back()"></i>
            </div>
        </Headerbtns>
        <div class="manage-contents-crc">
            <div id="firstTab">
                <!--内容-->
                <div class="content">
                    <div v-for="items in newproductContent">
                        <div v-for="(item,index) in items.data" class="enlarge">
                            <img :src="item.fileurl" @click="enlarge(index)" style="width: 100%;">
                            	<!--<img :src="item.fileurl" preview="0" preview-text="描述文字" style="width: 100%;">-->
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin:5% 0 5% 0;">
                <input type="checkbox" v-model="isAgree">&nbsp;&nbsp;本人{{appntName}}已认真阅读当前产品说明书，且全面知晓理解相关内容，并予以确认。
            </div>
        </div>
        <alert ref="alert"></alert>
        <Footerbtns :is_show=false 
            total_premium="10000.00">
            <button class="btnFoote" slot="center" :disabled="!isAgree" @click="jumpToBack()">
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
//import proposalPlans from '../../../assets/data/proposalPlan.json'

export default{
    name: 'commonResponsibilityConfirm',
    components: {Headerbtns,Footerbtns,alert},
    props: {},
    data() {
        return {
        	proposalPlans:'',
            page_title: '责任免除确认书',
            current_total_premium: '10000.00',
            isAgree:false,
            isShare:this.$route.params.share,
            channel:"",
            sign:JSON.parse(this.$route.params.signImgs),
            appntName:this.$route.params.applicant,
            planId:this.$route.params.planId,
            applyCode:this.$route.params.applyCode,
            productCode:this.$route.params.productCode,
            haveInstructionsCode:this.$route.params.haveInstructionsCode,
            docNum:this.$route.params.docNum,
            newproductContent:[],
            isEnlarge:false,
        }
    },
    watch:{
        'isAgree': {
            handler(val) {
                if(val){
                    $(".btnFoote").attr({'disabled':false})
                    $(".btnFoote").css({'color':'#fff'})
                }else{
                    $(".btnFoote").css({'color':'silver'})
                    $(".btnFoote").attr({'disabled':true})
                }
            },
            deep: true
        },
    },
    beforeMount(){
        $(".btnFoote").css({'color':'silver'})
    },
    mounted(){
		// `options.escKey = false` will not work
        $(".btnFoote").css({'color':'silver'})
        
        var _header = $(".manage-contents-crc")
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
        
        this.channel=this.$route.params.channel
        console.log(this.channel)
        console.log(this.docNum)
        //add spoon 读取缓存中的配置文件
	    let CONFIG_proposalPlan = utils.cache.get('CONFIG_proposalPlan')
	    if(CONFIG_proposalPlan==null||CONFIG_proposalPlan==''){
	    	//缓存不存在请求服务器获取配置文件
	    	utils.n22_http.getConfig(0,(data)=>{
	    		this.proposalPlans = data
	    		this.shuomingshuCallback(this.docNum)
	    	})
	    }else{
	    	//正常将缓存中的数据复制到相应节点
	    	this.proposalPlans = CONFIG_proposalPlan
	    	this.shuomingshuCallback(this.docNum)
	    }
//	    this.$nextTick(()=>{this.$previewRefresh()})
    },
    methods:{
    	enlarge(index){
			let list = document.getElementsByClassName('enlarge')
			if(this.isEnlarge == false){
				for(let i = 0;i<list.length;i++){
					this.isEnlarge = true
					list[i].style.cssText = "width: 250%;"
				}
			}else{
				for(let i = 0;i<list.length;i++){
					this.isEnlarge = false
					list[i].style.cssText = "width: 100%;"
				}
			}
		},
        //免责单证过滤
        shuomingshuCallback(productCode){
            let productContent = []
            for(let i in this.proposalPlans.proposalPlan.item){
                if(productCode == this.proposalPlans.proposalPlan.item[i].productCode){
                    if(this.proposalPlans.proposalPlan.item[i].proposalType == "4"){
                        productContent.push(this.proposalPlans.proposalPlan.item[i])
                    }
                }
            }
            console.log(productContent)
            this.newproductContent = utils.common.arrGrouping(productContent)
            if(this.newproductContent!=undefined&&this.newproductContent.length>0)
            for(let i in this.newproductContent){
                this.newproductContent[i].data.sort((a,b) => {
                    const codeA = parseInt(a.code)
                    const codeB = parseInt(b.code)
                    return codeA -codeB
                })
            }
            if(this.newproductContent.length > 0){
                console.log('存在免责条款')
            }else{
                console.log('不存在免责条款')
            }
        },
        jumpToBack(){
            if(this.isAgree){
                console.log(this.isAgree)
                if(!this.isShare){
                    this.$router.push({
                    		path: '/policy/ElectronicsPolicyPage.vue',
                    		name: 'electronics_policy_page',
                    		params: {
                    				planId:this.planId,
                    				applyCode:this.applyCode,
                    				sendInfo:{
                    					name:this.docNum,
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
                    				planId:this.planId,
                    				applyCode:this.applyCode,
                    				index:this.$route.params.index,
                    				result:"-1",
                    				resultmsg:this.$route.params.resultmsg,
                    				sendInfo:{
                    					name:this.docNum,
                    					isRed:"0",  
                    					content:"" 
                    				}
                    				
                    		}
                    })
                }
               
            }else{
                this.showMsg("请确认勾选按钮!")
            }
            
        },
        back(){
            if(!this.isShare){
                this.$router.push({
                		path: '/policy/ElectronicsPolicyPage.vue',
                		name: 'electronics_policy_page',
                		params: {
                				planId:this.planId,
                				applyCode:this.applyCode,
                				sendInfo:{
                					name:this.docNum,
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
                				planId:this.planId,
                				applyCode:this.applyCode,
                				index:this.$route.params.index,
                				result:"-1",
                				resultmsg:this.$route.params.resultmsg,
                				sendInfo:{
                					name:this.docNum,
                					isRed:"1",  
                					content:"" 
                				}
                				
                		}
                })
            }
            
        },
        showMsg:function(msg){
                if(msg!=undefined && msg!=""){
                    this.$refs.alert.showMOdal(msg)
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
.manage-contents-crc{
    position: absolute;
    padding: 0 2%;
    left: 0;right: 0;top: 48px;bottom: 50px;
    overflow-y: auto;
    /*overflow-x: hidden;*/
    background: #FFF;
    margin-top: 7%; 
}
h1{
    text-align: center;
    font-weight:bold;
    margin:20px 0 ;
}
.btnFoote{
    border:0;
    color:#fff;
    width:100%;
    height: 50px;
    background:#FEB101;
    height:50px
}
.suojinP{
    text-indent: 2em;
    margin-top: 5px;
    margin-bottom: 5px;
    line-height: 25px;
}
.boldP{
    font-weight: bold;
}
</style>