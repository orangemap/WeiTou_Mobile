<!--个人资料-->
<template>
	<div class="personalData">
        <Headerbtns :title = "page_title" style="left:0;">
            <div slot="left" class="back" @click="pre">
                <i class="fa fa-angle-left" ></i>
            </div>
        </Headerbtns>
        <div class="manage-main-contents">
            <div class="personalContent">
                <img src="../../../static/img/personal/icon_data_background.png" style="width: 100%;position: absolute;top: 0;left: 0;margin-bottom: 20px;"> 
                <div class="personalInform">
                    <div class="personalAvator">
                        <img v-if="agentAvator != null && agentAvator != ''" :src="agentAvator" style="width:80px;height:80px;border-radius:50%;50%;margin:5% auto;">
                        <p class="personalInform_P">{{personsal.agentName}}</p>
                    </div>
                    <div class="personalText">   
                        <p>职级: {{personsal.jobNum}}</p>
                        <p>工号: {{personsal.agentCode}}</p>
                        <p>入司生效日期: {{personsal.insureDate}}</p>
                        <p>手机: {{personsal.mobile}}</p>
                        <p>所属机构/部门: {{personsal.comName}}</p>
                    </div>
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
    import {mapState} from "vuex"
    export default{
        name:'personalData',
        components: {Headerbtns,alert,picker},
        props: ['value'],
        data () {
            return {
                page_title:'个人资料',
                toggle:{},
                dict:{},
                selectResult:"1",
                link:",",
                personsal:'',//代理人对象信息
                agentAvator:"",
                sex:"",//代理人性别
            }
        },
        watch:{

        },
        computed:{
            ...mapState(["home"])
        },
        beforeMount(){
           
        },
        mounted(){
            //从缓存中获取代理人对象信息
            this.personsal = utils.cache.get('personsal')
            console.log("从缓存中获取代理人对象信息",this.personsal)
            //截取代理人身份证号取性别
            let agentIdno = this.personsal.cerdNum.substring(16,17)
            console.log("sex",agentIdno)
            let agentSex=agentIdno%2
            console.log("取余",agentSex)
            if(agentSex==0){
                this.sex='2'//偶数为女
            }else{
                this.sex='1'//奇数为男
            }
            //头像数组
            let avatorList=utils.cache.get("agentList")
            console.log("touxiang",avatorList)
            for(var i=0;i<avatorList.length;i++){
                if(avatorList[i].pageCode=="3"){
                    this.agentAvator=avatorList[i].remoteUrl
                }else{
                    if(this.sex=="1"){
                        this.agentAvator="../../../static/img/personal/man.png"
                    }else if(this.sex=="2"){
                        this.agentAvator="../../../static/img/personal/women.png"
                    }
                }
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
    /* .personalData{
       /* width: 6.4rem; 
       width: 100%;
       height: auto;
       margin: 0 auto;
    } */
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
    .personalContent{
        width: 90%;
        height: 90%;
        margin: 5% 5%;
        position: absolute;
    }
    .personalInform{
       width: 82%;
       border-radius: 10px;
       position: absolute;
       background: #fff;
       top: 11%;
       left: 9%;
       margin: 11% auto;
    }
    .personalInform_P{
        font-size:16px;
        color:#FFB108;
        text-align:center;
        margin-bottom:20px;
    }
    .personalAvator{
        width: 90%;
        margin: 0 auto;
        border-bottom:1px dashed #AEAEAE;
        text-align: center;
    }
    .personalText{
        width: 90%;
        margin: 10% auto 10% 15%;
        line-height: 30px;
        font-size: 12px;
        color: #4E4A4A;
    }
</style>
