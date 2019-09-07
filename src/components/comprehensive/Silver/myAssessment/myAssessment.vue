<!-- 我的考核 -->
<template>
	<div>
    <Headerbtns :title = "page_title">
      <div slot="left" class="back" >
        <i class="fa fa-angle-left" @click='Goback'></i>
      </div>
    </Headerbtns>
    <div class="manage-main-contents">
      <div class="assessments">
        <p class="warn" @click="topType('1')"  ref='warn' :class='[topColor==1?"bg-active":" "]'>考核预警</p>
        <p class="official" @click="topType('2')" ref='official' :class='[topColor==2?"bg-active":" "]'>正式考核</p>
      </div>
      <div style='height:30px;'></div>
      <div class="detailAnalyze my-index-links">
        <router-link to='/comprehensiveYinbao/myAssessment/assessDetail'>考核详情</router-link>
        <router-link to='/comprehensiveYinbao/myAssessment/assessAnalyze'>考核分析</router-link>
      </div>
      <router-view></router-view>
      <alert ref="alert"></alert>
    </div>
  </div>
</template>

<!--js-->
<script>

  import { Indicator } from 'mint-ui';
  import Headerbtns from '../../../../../src/components/policy/common/Header'
  import alert from '../../../policy/common/alert.vue'
  import picker from '../../../common/Picker.vue'
  import yearPicker from '../../../common/yearPicker.vue'
  import store from '../../../../vuex/comprehensive/comprehensive'
  import { mapState,mapMutations } from 'vuex'

  export default{
    name:'myAssessment',
    components: {Headerbtns,alert,picker,yearPicker},
    props: ['value'],
    data () {
      return {
        page_title:'我的考核',

        assessResult:"清退",/*考核结果*/
        assessRank:"资深专职",/*考核后职级*/
        testType:"常规考核",/*考核类型*/
        reduceCount:"5",/*考核降级次数*/
        yearList:[],/*年列表*/
        yearDate:"",/*查询年*/
        monthList:['01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
        monthDate:"01",/*查询月*/
        topColor:1
      }
    },
    watch:{
    },
    computed:{
      ...mapState(['ComprehensiveTitleType'])
    },store,
    mounted(){
      /*时间选择*/
      this.yearDate=new Date().getFullYear() /*获取年数组*/
      let yearList1=[],yearList2=[]
      for(var i=2018; i<this.yearDate;i++){
        yearList1.push(i)
      }
      for(var i=this.yearDate; i<(this.yearDate)+100; i++){
        yearList2.push(i)
      }
      this.yearList=yearList1.concat(yearList2)
      /*console.log( "年数组",this.yearList)*/
      /*初始化赋值*/

      console.log(this.yearDate)
    },
    beforeDestroy(){
      Indicator.close();
    },
    methods:{
      ...mapMutations(['SetComprehensiveTitleType']),
      topType(type){
        this.topColor = type
        this.SetComprehensiveTitleType(type)
      },
      Goback(){ /*返回跳转*/
        this.$router.push('/comprehensiveYinbao/comprehensiveInfo')
      },
      handleLoad(){
        Indicator.close();
      },
      showMsg:function(msg){
        if(msg!=undefined && msg!=""){
          this.$refs.alert.showMOdal(msg)
        }
      }
    }
  }
</script>

<style lang="css" scoped type="text/css">
  .manage-main-contents{
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 48px;
    bottom: 0px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #F6F5F4;
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
    color: #FFAB00;
  }
  .fa-angle-left{
    display: inline-block;
    width: 100%;height: 100%;
    line-height: 48px;
    text-align: center;
    font-size: 35px;
  }
  .assessments{
    width: 100%;
    height: 40px;
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
  .assessments>p{
    color:#CCC;
    border-bottom:4px solid #CCC;
  }
  /*.assessments>p:nth-child(1){
    color:#FEB002;
    border-bottom:4px solid #FEB002;
  }*/
  .warn,.official{
    width: 50%;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
  }
  /*考核预警,正式考核*/
  .bg-active{
    border-bottom:4px solid #FEB002!important;
    color:#FEB002!important;
  }
  .detailCon{
    width: 100%;
  }
  .assessAns{
    background: url('../../../../../static/img/comprehensive/Bg_blue.png') no-repeat;
    min-height: 180px;
    background-size:100% 100%;
    padding: 15px 0 10px 0;
  }
  .timeProgress{
    color: #fff;
    margin: 5px auto;
  }
  .progressBox{
    width:80%;
    display:flex;
    justify-content: space-around;
    line-height:30px;
    color:#fff;
    margin:-10px auto 0 auto;
  }
  .progress{
    width: 85%;
  }
  .mt-progress-runway{
    border-radius: 8px;
  }
  .mt-progress-progress{
    height:30px;
    background-color: #FFAA00!important;
  }
  .excircle{
    width: 126px;
    height:120px;
    margin:0 auto;
    background:url('../../../../../static/img/comprehensive/Result.png') no-repeat;
    background-size:100% 100%;
  }
  .excircle>p:nth-child(1){
    padding-top:35px;
  }
  .excircle>p:nth-child(2){
    padding-top:10px;
  }
  .textFont{
    color:#fff;
    font: bold 28px simhei;
  }
  .textAns{
    width: 100%;
    margin: 10px auto 0 auto;
    display: flex;
    justify-content: center;
    line-height: 17px;
    color: #fff;

  }
  .textShow{
    width: 33%;
    text-align: center;
    border-right: 2px dashed #fff;
  }
  .bigFont{
    font-size: 14px;
  }
  .taskData{
    width: 100%;
    background: #fff;
    height:35px;
    padding:10px 0;
    border-bottom: 2px solid #DDDBD7;
  }
  .target{
    font-size: 16px;
    width: 95%;
    display: flex;
    justify-content: center;
    height: 20px;
    line-height: 20px;
    margin: 10px auto;
  }
  .target>div{
    font-size:.9rem!important;
  }
  /*修改*/
  .flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text-center{
    text-align: center;
  }
  .taskData>a{
    font-size:.9rem;
    width:33%;
    height:35px;
    line-height: 35px;
    text-align: center;
    color:#CCC;
  }
  .taskData>a:nth-child(2){
    border-right:2px dashed #ccc;
    border-left:2px dashed #ccc;
  }
  ::-webkit-scrollbar{
    width:0;
  }
  /*考核详情,考核分析*/
  .my-index-links {
    width: 65%;
    height: 40px;
    margin: 20px auto 0 auto;
  }

  .my-index-links>a {
    width: 40%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: #C7C6CB;
    display: inline-block;
    margin: 0 8px;
    border-radius: 15px;
    outline: none;
  }

  .my-index-links>a.router-link-active {
    background: #FEB101;
  }
</style>
