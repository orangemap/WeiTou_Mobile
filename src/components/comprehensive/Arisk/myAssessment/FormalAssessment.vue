<template>
  <div class='firmal-Assessment'>
    <Headerbtns :title="page_title">
      <div ref='header' slot="left"  @click="Goback">
        <i class="fa fa-angle-left font_35"></i>
      </div>
    </Headerbtns>
    <div class='Form-content'>
      <div class='my-index-container' ref='container'>
      <div class='flex ass-yj-top-div'>
        <p @click="topType('1')" :class='[topColor==1?"bg-active":" "]'>维持考核</p>
        <p @click="topType('2')" :class='[topColor==2?"bg-active":" "]'>晋升考核</p>
        <p @click="topType('3')" :class='[topColor==3?"bg-active":" "]'>考核分析</p>
      </div>
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>

<script>
  import Headerbtns from '@/components/policy/common/Header.vue'
  import "../../../policy/css/base.css";
  export default{
    components: {Headerbtns},
    data() {
      return{
        page_title:'正式考核',
        yearList:[],/*年列表*/
        yearDate:"",/*查询年*/
        monthList:[],/*月列表*/
        monthDate:"",/*查询月*/
        topColor:1,
        isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      }
    },
    mounted(){
       if(this.isiOS){
            
            if(screen.height == 812 && screen.width == 375){
              this.$refs.container.style.marginTop = '90px'
            }else{
              this.$refs.container.style.marginTop = '70px'
            }
         }else{
            console.log(this.$refs.container)
            this.$refs.container.style.marginTop = '50px'
         }
    },
    methods:{
      Goback(){
        this.$router.push('/comprehensiveGexian/comprehensiveInfo')
      },
      topType(id){
        this.topColor = id
        if( id == 1){
          this.$router.push('/comprehensiveGexian/FormalAssessment/left1')
        }else if( id == 2){
          this.$router.push('/comprehensiveGexian/FormalAssessment/left2')
        }else if( id == 3){
          this.$router.push('/comprehensiveGexian/FormalAssessment/right')
        }
      }
    }
  }
</script>

<style>
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text-center {
    text-align: center;
  }

  .font_35 {
    font-size: 30px;
    color:#FDB92C;
  }
  .firmal-Assessment .Form-content,.my-index-container,.Form-content {
    background:#FFF!important;
  }

  .firmal-Assessment .pickerContent {
    margin: 10px auto!important;
    background:#F1F1F1!important;
  }
  /*时间框state*/
  .firmal-Assessment .datePicker {
    border-radius: 100px;
    background: #fff;
  }

  .firmal-Assessment .fontIcon {
    width: 10%;
  }
  .firmal-Assessment .pickerContent>.dateShow>p:nth-child(1){
    width:60px!important;
  }
  .firmal-Assessment .pickerContent>.dateShow>p:nth-child(1) .mbsc-control{
    background:#f1f1f1!important;
  }
 .firmal-Assessment .pickerContent>.dateShow>p:nth-child(2){
    width:50px!important;
  }
  .firmal-Assessment .pickerContent>.dateShow>p:nth-child(2) .mbsc-control{
    width:30px!important;
    background:#f1f1f1!important;
  }
  .firmal-Assessment .dateShow {
    width: 105px!important;
    color: #06306B;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .firmal-Assessment .pickerContent {
    width: 60%;
    display: flex;
    margin: auto;
    justify-content: space-between;
    background: #fff;
    padding: 0 20px;
    align-items: center;
    height: 30px;
    border-radius: 15px;
  }

  .firmal-Assessment .my-index-picker {
    width: 70%!important;
    background:#FFF;
    position:static;
  }

  .firmal-Assessment .mbsc-control-ev {
    width: 40px !important;
    text-align: center;
    background:#F1F1F1;
  }
  /*时间框end*/

  .firmal-Assessment .ass-yj-top-div{
    width:100%;
    margin:0 auto 0 auto;
    background:#FFF;
  }
  .firmal-Assessment .ass-yj-top-div>p{
    width:33.333%;
    border-bottom:4px solid #E5E5E5;
    text-align: center;
    color:#959595;
    font-size:.9rem;
    height:35px;
    line-height: 35px;
    font-weight: bold;
  }
  .firmal-Assessment .bg-active{
    color:#FEB101!important;
    border-bottom: 4px solid #FEB101!important;
  }
</style>
