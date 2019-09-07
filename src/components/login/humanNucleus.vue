<template>
  <div class="humanNucleus-content">
     <div class="humanNucleus-img">
         <img src="../../../static/img/login/red.jpg" alt="">
     </div>
     <div class="humanNucleus-text">
        <span style="font-size: 16px;font-weight: bold;">您的保单已进入人工核保,请耐心等待!</span>
        <p v-show="message!=undefined&&message!=''" style="margin: 30px;"><span style="width: 100%;height: auto; word-wrap:break-word;word-break:break-all;overflow: hidden;line-height: 1.4;font-size: 14px;color: red;">提示：{{message}}</span></p>
     </div>
     <div class="btn-wrapper">
        <div @click="go({name:'home'})">
             <span style="font-size: 16px;">返回首页</span>
        </div>
        <div @click="go({name:'backlog'})">
             <span style="font-size: 16px;">待办事项</span>
        </div>
     </div>
  </div> 
</template>
<script>
export default {
  name: '',
  data() {
    return {
    	message:this.$route.query.message
    }
  },
  methods:{
  }
}
</script>
<style scoped type="text/css" lang="scss">
.humanNucleus-content{
    border:3px solid #3E3D3D;
    margin: 0 auto;
    height: 100vh;
    font-size: 12px;
}
.humanNucleus-img{
    width: 50px;
    margin:100px auto 50px auto;
}
.humanNucleus-text{
    text-align: center;
    font-size: #555659;
    margin-bottom:200px; 
}
.btn-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    div{
        width:75px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        color: #7B7B79;
        border-radius:5px; 
        border: 1px solid #E2E2E2;
        margin: 0 auto;
    }
}
</style>

