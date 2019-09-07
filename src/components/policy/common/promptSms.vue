<template>
  <div v-show="show">
  <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2005;">
      <div class="mint-msgbox" style="">
          <div class="mint-msgbox-header">
              <div class="mint-msgbox-title">请输入手机号码</div>
        </div> 
    <div class="mint-msgbox-content">
        <div class="mint-msgbox-message">
        </div> 
             <div class="mint-msgbox-input">
                 <input placeholder="" type="text" @blur="handleBlur($event)"> 
                 <div class="mint-msgbox-errormsg" style="visibility: hidden;">
                 </div>
            </div>
        </div> 
         <div class="mint-msgbox-btns">
            <button class="mint-msgbox-btn mint-msgbox-cancel " @click="cancelClick">
                  取消</button>
            <button class="mint-msgbox-btn mint-msgbox-confirm " @click="handleClick">
                  确定</button>
        </div>
        </div>
        <alerts ref="alert"></alerts>
    </div>
    <div class="v-modal" style="z-index: 2000;"></div>
   </div>
</template>
<script>
import alerts from '../common/alert.vue'
export default{
  name:"prompt2",
  components: {alerts},
  props: {
   	title: {
				type: String,
				default: '提示'
			},
      number:{
        type: Number,
				default: 0
      }
  },
  data(){
    return{
       show:false,
       value:"",
       index:"",
    }
  },
  methods:{
    showMsg:function(msg){
      if(msg!=undefined && msg!=""){
        this.$refs.alert.showMOdal(msg)
      }
  	},
    showMOdal(index){
       this.index = index
       console.log("序号:"+this.index)
       this.show = true
    },
    handleBlur(e){
      this.value = e.target.value
    },
    handleClick(){
      if(this.value==undefined || this.value == ""){
        this.showMsg("请输入手机号码!")
        return
      }
      let msg = this.mobilePhone(this.value)
      if(msg!=undefined && msg!=""){
         this.showMsg(msg)
          return
      }
      this.show = false
      this.$emit('detonate',this.index,this.value)
    },
    cancelClick(){
      this.show = false
    },
    //手机号校验
    mobilePhone(mobilePhone){
      console.log('手机号')
      console.log(mobilePhone)
      let tel=mobilePhone;
      let reg=/^1[34578]\d{9}$/;
      if(tel==""){
        return "手机号码不能为空。\n"
      }else if(tel.length!=11){
        return "手机号码长度有误,请核对。\n"
      }else if(!reg.test(tel)){
        return "手机号码格式有误,请核对。\n"
      }
    },
  }
}
</script>
<style type="text/css" scoped >
.mint-msgbox-input input{
  padding: 0;
  margin-left: 10%;
  height: 35px;
  width: 80%!important;
}
.mint-msgbox-content{
	padding: 0 !important;
	max-height: 270px !important;
	min-height: 90px!important;
	overflow-y: auto;
	border-top:3px solid #FEB101!important;
	background-size: 100%;
	display: inline;
	/* justify-content:center; */
	/* align-items:center; */
}
</style>
