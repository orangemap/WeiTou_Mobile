<template>
  <div v-show="show">
  <div class="mint-msgbox-wrapper" 
  style="position: absolute; z-index: 2001;">
  <div class="mint-msgbox" style="">
      <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">{{title}}
            <div class="title-boder"></div>
          </div>
        </div> 
        <div class="mint-msgbox-content">
        <div class="mint-msgbox-message" v-html="content" ></div> 
              <div class="mint-msgbox-input" style="display: none;">
                  <input placeholder="" type="text">
                   <div class="mint-msgbox-errormsg" style="visibility: hidden;">
                       </div>
                       </div></div> 
                       <div class="btn-wrapper">
                       <div class="add-btn" @click="handleClick">确定</div>
                       </div></div></div>
                  <div class="v-modal" style="z-index: 2000;"></div>
   </div>
</template>
<script>
export default{
  name:"prompt",
  props: {
   	title: {
				type: String,
				default: '提示'
			},
  },
  data(){
    return{
       show:false,
       content:""
    }
  },
  mounted(){

  },
  methods:{
    showMOdal(msg){
       this.show = true
       this.content = msg
    },
    handleClick(){
      this.show = false
    },
  }
}
</script>
<style type="text/css" scoped >
.mint-msgbox{
  width: 80vw!important;
}
.mint-msgbox-content{
  word-wrap: break-word;
  overflow-y: auto; 
  word-break: normal;
}
.title-boder{
  height: 3px;
  background: #FEB101;
  position: absolute;
  bottom:5px; 
  width: 100%;
}
.btn-wrapper{
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-btn{
   width: 75px;
   height: 35px;
   line-height: 35px;
   text-align: center;
   background-color: #FEB101;
   border-radius: 5px;
   color: #ffffff;
   margin-bottom: 15px;
  }
.mint-msgbox .mint-msgbox-header{
	height: 60px!important;
	line-height: 60px;
}
.mint-msgbox-content{
  border: none!important;
}
.mint-msgbox .mint-msgbox-header .mint-msgbox-title{
   line-height: 60px;
   position: relative;
}
.mint-msgbox-message{
   color: #000000!important;
   padding-left: 5px;
   padding-right: 5px;
   padding-top: 5px;
   padding-bottom: 5px;
}
.mint-msgbox-message{
    max-height: 240px;
}
 
</style>
