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
				<div style="font-size: 17px;font-weight: bold;text-align: center;">关于《光大永明富贵双全年金保险（分红型）》的投保特别告知</div><br/>
				<div class="class">尊敬的投保人：<br/></div>
				<div class="class1">
					根据中国保监会相关规定，我公司自2017年1月1日起，将《光大永明富<br/>
					贵双全年金保险（分红型）》产品条款中提及的《光大永明附加富贵双全两<br/>
					全保险（万能型）》产品统一替换为《光大永明附加增利金账户两全保险<br/>
					（万能型）》产品，您所享有的各项重要权益和承担的义务以《光大永明<br/>
					附加增利金账户两全保险（万能型）》产品条款中各项约定为准。
				</div><br/><br/><br/>
				<div class="class1">
					签署此特别告知视为您已知晓并认可上述事宜。
				</div><br/><br/><br/><br/>
				<div class="class2">
						<p align="right">投保人签字：___________<img :src="sign" alt=""style="border-bottom:1px solid #000"></p>
						<p align="right">日期：<input readonly type="text" style="border: none;width: 33%;border-bottom: 1px solid black;font-size: 15px;text-align: center" id="nowDate"></p>
				</div>
				<div style="margin:5% 0 0 5%;">
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
	import Headerbtns from '../../common/Header.vue'
	import Footerbtns from '../../policy/common/Footer.vue'

	export default{
	    name: 'fgsqbxtbgz',
	    components: {Headerbtns,Footerbtns},
	    props: {},
	    data() {
	        return {
	            page_title: '关于《光大永明富贵双全年金保险（分红型）》的投保特别告知',
	            current_total_premium: '10000.00',
	            isAgree:false,
	            saveName:"fgsqbxtbgz",
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
	        // 判断再次进入单证缓冲有数据且赋值,
	        let documentInfo = utils.cache.get("documentInfo")
	        if(documentInfo!=null && documentInfo!=undefined && documentInfo.length>0){
	            for(var i=0;i<documentInfo.length;i++){
	                if(documentInfo[i].name == this.saveName){
	                    //content
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
	    methods:{
	    	jumpToBack(){
    	        this.$router.push({
    	        		path: '/policy/ElectronicsPolicyPage.vue',
    	        		name: 'electronics_policy_page',
    	        		params: {
    	        				planId:this.$route.params.planId,
    	        				applyCode:this.$route.params.applyCode,
    	        				sendInfo:{
    	        					name:"fgsqbxtbgz",
    	        					isRed:"0",  
    	        					content:"",
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
	    	    					name:"fgsqbxtbgz",
	    	    					isRed:"1",  
	    	    					content:"",
	    	    				}
	    	    				
	    	    		}
	    	    })
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
	    margin: 10% auto 0 auto; 
	}
	.class { 
		line-height:25px;
		font-size: 18px;
	}
	.class1 {
		line-height:25px;
		font-size: 18px;
		text-indent: 2em;
	}
	.class2 {
		font-size: 18px;
		text-indent: 4em;
		line-height:25px;
	}
	.img_log {
		vertical-align: baseline;
		position: relative;
		width: 13em;
		height: 4em;
		top: 2.6em;
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