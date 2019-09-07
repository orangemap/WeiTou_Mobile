<template>
  <div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'comprehensive',
  data() {
    return {
      transitionName: 'slide-left',
    }
  }
}
</script>
<style>
  /*时间选择框*/
  .queryModule .pickerContent {
    width:65%;
    margin:10px auto 0 auto;
    background:#fff;
    border-radius: 15px;
    height:30px;
    display: flex;
    justify-content: space-between;
    padding:0 20px;
    align-items: center;
    position:static;
  }
  .fontIcon {
    width: 10%;
  }
  .dateShow {
    width: 95px;
    color: #06306B;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .dateShow>p{
    display: flex;
    align-items: center;
    color:#000;
  }
  .dateShow>p:nth-child(1){
    width:55px;
  }
  .dateShow>p:nth-child(1)>input{
    width:40px;
    height:15px;
    background:#fff;
  }
  .dateShow>p:nth-child(2){
    width:40px;
  }
  .dateShow>p:nth-child(2) input{
    width:20px!important;
    height:15px;
    background:#fff;
  }
  .textShow{
    width: 33%;
    text-align: center;
    border-right: 2px dashed #fff;
  }
  .bigFont{
    font-size: 14px;
  }
  .mbsc-control-ev {
    width: 40px !important;
    text-align: center;
  }
  .taskData{
    width: 100%;
    background: #fff;
    height:35px;
    border-bottom: 2px solid #DDDBD7;
    padding:10px 0 5px 0;
  }
</style>
