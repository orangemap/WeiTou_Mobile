<!--关于-->
<template>
	<div class="about">
        <Headerbtns :title = "page_title" style="left:0;">
            <div slot="left" class="back" @click="pre">
                <i class="fa fa-angle-left" ></i>
            </div>
        </Headerbtns>
        <div class="manage-main-contents">
             <div class="aboutContent">
                 <img src="../../../static/img/personal/icon_about_us.png" style="width: 70%;height: 45%;margin-top:7%">
                 <div class="aboutText">
                     <p v-if="isIos">版本信息: {{ios_infos.IOS_versionNo}}</p>
										 <p v-if="isAnd">版本信息: {{and_infos.andriod_versionNo}}</p>
										 <p>更新内容：</p>
										 <p v-if="isIos">{{ios_infos.IOS_Description}}</p>
										 <p v-if="isAnd">{{and_infos.Description}}</p>
										 <p v-if="isIos">更新日期：{{ios_infos.IOS_CreateTime}}</p>
										 <p v-if="isAnd">更新日期：{{and_infos.AndCreateTime}}</p>
                     <p>客服电话: 95348</p>
                     <p>官网地址: http://sunlife-everbright.com</p>
                 </div>
             </div>
        </div>
        <alert ref="alert"></alert>
	</div>
</template>

<!--js-->
<script>
    import { MessageBox } from 'mint-ui'
    import { Indicator } from 'mint-ui';
    import Headerbtns from '../../../src/components/policy/common/Header'
    import alert from '../policy/common/alert.vue'
    import picker from '../common/Picker.vue'
    import serviceList from '../../../static/dict/service_info_sunlife.json'
    import imgList from '../../../static/dict/img_sunlife.json'

    export default{
        name:'about',
        components: {Headerbtns,alert,picker},
        props: ['value'],
        data () {
            return {
                isIos:false,
								isAnd:false,
								page_title:'关于',
                toggle:{},
                dict:{},
                selectResult:"1",
                link:",",
                version:globalConfig.version,
								and_infos:utils.cache.get("and_infos"),
								ios_infos:utils.cache.get("ios_infos")
            }
        },
        watch:{

        },
        beforeMount(){
            
        },
        mounted(){
					let platform =  globalConfig.os
					console.log(platform)
					if(platform == 'android'){
						console.log("安卓")
						this.isAnd = true
					}else{
						console.log("IOS")
						this.isIos = true
					}
        },
        beforeDestroy(){

        },
        methods:{
            handleLoad(){

            },
            pre(){
                Indicator.close();
                this.$router.push({
                    name:"personalInfo"
                })
            },
            showMsg:function(msg){
                if(msg!=undefined && msg!=""){
                    this.$refs.alert.showMOdal(msg)
                }
            },
        }
    }
</script>

<style lang="css" scoped type="text/css">
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
      font-size: 35px;
    }
    .about{
       /* width: 6.4rem; */
       width: 100%;
       height: auto;
       margin: 0 auto;
    }
    .manage-main-contents{
        width: 100%;
        background: #F6F5F4; 
        position: absolute;
        left: 0;
        right: 0;
        top: 48px;
        bottom: 0px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .aboutContent{
        width: 85%;
        height: 100%;
        margin: 0 auto;
				text-align:center;
    }
    .aboutText{
        line-height: 30px;
        text-align: left;
        font-size: 14px;
        color: #0E3275;
    }
</style>
