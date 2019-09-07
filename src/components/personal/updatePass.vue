<!--修改密码-->
<template>
	<div class="updatePass">
        <Headerbtns :title = "page_title" style="left:0;">
            <div slot="left" class="back" @click="pre">
                <i class="fa fa-angle-left" ></i>
            </div>
        </Headerbtns>
        <div class="manage-main-contents">
            <div class="updatePassContent">
                <div class="input_old">
                    <p class="input_text">原密码</p>
                    <p class="input_box">  
                        <input type="password" class="inputType" v-model="inputOldPass">
                        <img class="close" src="../../../static/img/personal/close.png" v-show="!showPass" @click="showPassword()">
                        <img class="open" src="../../../static/img/personal/open.png" v-show="showPass" @click="showPassword()">
                    </p>
                </div>
                <div class="input_new">
                    <p class="input_text">新密码</p>
                    <p class="input_box">  
                        <input type="password" class="inputType" v-model="inputNewPass">
                        <img src="../../../static/img/personal/close.png" style="visibility: hidden;">
                    </p>
                </div>
                <div class="confirm_new">
                    <p class="input_text">确认新密码</p>
                    <p class="input_box">  
                        <input type="password" class="inputType" v-model="inputComPassword">
                        <img src="../../../static/img/personal/close.png" style="visibility: hidden;">
                    </p>
                </div>
                
                <div class="submit_btn" @click="submit()">
                    <p style="color:#fff;font-size:16px;">提&nbsp;&nbsp;交</p>
                </div>
                <div class="update_img">
                    <img src="../../../static/img/personal/icon_keyboard.png" style="width:70%;height:190px;">
                </div>
            </div>
        </div>
        <mt-popup v-model="updatePassBox" style="width: 80%;height: 216px;border-radius: 20px;" position="center">
            <div class="updateHeader">
                温馨提示    
            </div>
            <div class="updateContent">
                <p style="margin:15px auto -20px auto;">您确认修改密码吗?</p>
                <p>修改后原密码将不能使用。</p>
            </div>
            <div class="updateFooter">
                <a id="confirmBtn" @click="updateEvent()">确定</a>
                <a @click="updatePassBox = !updatePassBox" v-model="isChanle">取消</a>
            </div>
        </mt-popup>
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
        name:'updatePass',
        components: {Headerbtns,alert,picker},
        props: ['value'],
        data () {
            return {
                page_title:'修改密码',
                toggle:{},
                dict:{},
                selectResult:"1",
                link:",",
                showPass:false,
                inputOldPass:'',
                inputNewPass:'',
                inputComPassword:'',
                updatePassBox:false,
                isChanle:false,
                loginPassword:'',
                devWidth:'',//设备宽度
                devHeight:''//设备高度
            }
        },
        watch:{
        },
        computed:{
        },
        beforeMount(){
            
        },
        mounted(){
//          //每10s获取页面宽度高度,进行比较设置屏幕适配
//          setInterval(function(){
//              //获取当前设备高度
//              this.devHeight = document.documentElement.clientHeight;  
//              // console.log(this.devHeight,'当前设备高度')
//              //获取当前设备宽度
//              this.devWidth = document.documentElement.clientWidth
//              // console.log(this.devWidth,'当前设备宽度')
//              if(this.devHeight < this.devWidth){
//                  $('.manage-main-contents').css('height','160%')
//              }else{
//                  $('.manage-main-contents').css('height','')
//              }
//              console.log('计算高度')
//          },10) 
            //登录密码取缓存
            this.loginPassword = utils.cache.get("passwordInfo").password
        },
        beforeDestroy(){

        },
        methods:{
        	//修改密码接口
        	modifyThePassword(){
        		let requ = {
						    "agent": {
						        "agentCode": utils.cache.get("personsal").agentCode,
						        "deviceNo": "",
						        "fromChannel": "",
						        "loginPwdNew": hex_hmac_md5(globalConfig.transfer, this.inputNewPass),
						        "loginPwdOld": hex_hmac_md5(globalConfig.transfer, this.inputOldPass),
						        "token": ""
						    }
						}
        		console.log(requ,'修改密码参数')
                utils.http.postFast('MOMDFPWD',requ,(body)=>{
                    console.log(body,'修改密码返回')
                    let agent = body.agent
                    if(agent.resultCode == 0){
                        this.showMsg(agent.resultMessage)
                    }else{
                        this.showMsg(agent.resultMessage)
                    }
                })
        	},
            //点击确定修改密码按钮执行操作
            updateEvent(){
                this.updatePassBox = !this.updatePassBox
                this.modifyThePassword()
            },
            //验证原密码
            validOldPass(){
                if(this.inputOldPass==""){
                    this.$refs.alert.showMOdal("原密码不能为空")
                    return false
//                 }else if(this.inputOldPass !== this.loginPassword){
//                     this.$refs.alert.showMOdal("原密码与当前登录密码不一致")
//                     return false
                }else{
                    return true
                }
            },
            //验证新密码
            validNewPass(){
                if(this.inputNewPass==""){
                    this.$refs.alert.showMOdal("新密码不能为空")
                    return false
                }else{
                    return true
                }
            },
            //验证确认密码
            validComPass(){
                if(this.inputComPassword==""){
                    this.$refs.alert.showMOdal("确认密码不能为空")
                    return false
                }else if(this.inputNewPass !== this.inputComPassword){
                    this.$refs.alert.showMOdal("与新密码不一致")
                    return false
                }else{
                    return true
                }
            },
            //点击提交事件弹出确认框
            submit(){
                let isSubmit=true
                if(isSubmit){
                    isSubmit = this.validOldPass()
                }
                if(isSubmit){
                    isSubmit = this.validNewPass()
                }
                if(isSubmit){
                    isSubmit = this.validComPass()
                }
                if(isSubmit){
                    this.updatePassBox=true
                }
            },
            //切换密码加密显示
            showPassword(){
                if($(".inputType").attr("type")=='password'){
                    $(".inputType").attr("type","text");
                    $(".close").hide();
                    $(".open").show();
                }else if($(".inputType").attr("type")=='text'){
                    // console.log(2);
                    $(".inputType").attr("type","password");
                    $(".close").show();
                    $(".open").hide();
                }
            },
            //返回个人中心
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
    .updatePass{
        background: #F6F5F4 !important; 
       /*  width: 6.4rem; 
       width: 100%;
       height: 100%;
       margin: 0 auto; */
    }
    .manage-main-contents{
        width: 100%;
        background: #F6F5F4; 
        position: absolute;
        left: 0;
        right: 0;
        top: 48px !important;
        bottom: 0px;
        overflow-y: hidden;
        overflow-x: hidden;
    }
    .updatePassContent{
        width: 80%;
        height: 90%;
        margin: 10% auto;
    }
    .input_old,.input_new,.confirm_new{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }
    .input_text{
        width: 35%;
        line-height: 50px;
        font-size: 16px;
    }
    .input_box{
        width: 65%;
        height: 30px;
        margin: 10px auto;
        align-items: center;
        border: 1px solid #949494;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        background: #fff;
    }
    .input_box>input,.input_new>input,.confirm_new>input{
        width: 85%;
        height: 28px;
        margin: 10px 10px;
        font-size: 16px;
    }
    .input_box>img,.input_new>img,.confirm_new>img{
        width: 25px;
        height: 30px;
        margin: 10px 10px;
    }
    .submit_btn{
        width: 40%;
        height: 40px;
        display: block;
        background: #FEB101;
        text-align: center;
        line-height: 40px;
        border-radius: 10px;
        margin: 6% auto 0 auto;
    }
    .update_img{
        width: 100%;
        height: 200px;
        display: block;
        text-align: center;
       /*  position: absolute;
        left: 0;
        bottom: 0; */
    }
    .updateHeader{
        width: 100%;height: 50px;
        text-align: center;
        font:18px/50px"";
        color:#FFF;
        background-color: #0C3073;
        font-weight: bold;
        border-bottom: 3px solid #FEB101;
        border-radius: 20px 20px 0 0;
    }
    .updateContent{
        width: 100%;
        text-align: center;
        line-height: 50px;
    }
    .updateFooter{
        width: 100%;height: 60px;
        border-top: 1px dashed #BBB;
        display: flex;
        justify-content: space-around;
    }
    .updateFooter a{
        display: inline-block;
        width: 80px;height: 41px;
        text-align: center;
        line-height: 41px;
        font-size: 18px;
        margin-top: 10px;
        background-color: #FEB101;
        color: #FFF;
        border-radius: 10px;
    }
</style>
