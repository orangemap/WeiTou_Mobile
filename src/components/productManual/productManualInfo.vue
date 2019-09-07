<!--
	产品手册主页
-->
<template>
	<div class="content_page">
    <Headerbtns :title = "page_title">
         <div slot="left" class="back" @click="pre">
          <i class="fa fa-angle-left" ></i>
        </div>
    </Headerbtns>
    <iframe  class="manage-main-contents" scrolling="auto" style="height:100%;" :src="link" @load="handleLoad"></iframe>
    <alert ref="alert"></alert>
     <tabBar :isHome="false" :serviceInfo="true" :productManualInfo="false"></tabBar>
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
import tabBar from '../common/TabBar.vue'

export default{
    name:'productManualInfo',
    components: {Headerbtns,alert,picker,tabBar},
    props: ['value'],
    data () {
        return {
            page_title:'产品手册',
            toggle:{},
            dict:{},
            selectResult:"1",
            link:","
        }
    },
    watch:{

    },
    beforeMount(){
        Indicator.open('正在加载...');
        let host = window.globalConfig.rootUrl.split('/')[2]
        let protocol = window.globalConfig.rootUrl.split(':')[0]
        this.link = protocol + "://" + host + "/com.ifp.ipartner/productManual/index.html"
    },
    mounted(){
      utils.common.setH('content_page')
   },
   beforeDestroy(){
      Indicator.close();
   },
    methods:{
        handleLoad(){
            Indicator.close();
        },
        pre(){
            Indicator.close();
            this.$router.push({
                name:"home"
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

<style lang="scss" scoped type="text/css">
.manage-main-contents{
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 48px;
  bottom: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #FFF;
}
.fa-search{
    color:#FFAB00;
    font-size:25px;
}
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
.logo{
  float:right;
  color:#FDAA00;
}
.lh{line-height:20px;}
/*列表*/
ul>li>div>p:nth-child(1){

  color: #FFAC00;
  background-color:#F8F8F8;
  border:1px solid #C8C8C8;
  padding:10px;
  line-height: 20px;
}
.line-bottom p{
  padding:10px;
  margin: 0 15px;
  border-bottom:1px dashed #A9A6A2;
  line-height: 20px;
}
</style>
