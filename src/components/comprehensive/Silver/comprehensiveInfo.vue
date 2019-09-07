<!-- 综合查询 -->
<template>
  <div class='arick-info'>
    <Headerbtns :title="page_title">
      <div slot="left" @click="pre">
        <i class="fa fa-angle-left"></i>
      </div>
    </Headerbtns>
    <div class="main-contents">
      <div style="width:100%;height:180px;padding: 20px 0;box-sizing: border-box;">
    		<img src="../../../../static/img/comprehensive/banner_sive.png" style="width:100%;"/>
    	</div>
    	<div class="content">
    		<p>履职管理</p>
    		<ul>
    			<li v-for="tmp of showModelList" @click="goTo(tmp.code)">
            <div>
            	<p><img :src="imgUrl+tmp.code+'.png'" style="width:50%;"></p>
            	<span>{{tmp.name}}</span>
            </div>
          </li>
    		</ul>
    	</div>
    	<div class="content">
    		<p>服务查询</p>
    		<ul>
    			<li v-for="tmp of List2" @click="goToNew(tmp.id)" v-show="tmp.show">
            <div>
            	<p><img :src="tmp.url" style="width: 36px;"></p>
            	<span>{{tmp.name}}</span>
            </div>
          </li>
    		</ul>
    	</div>
      
      <div class="queryModule">
        <!--二期内容,暂未开放-->
        <!-- <div class='manage-main-contents-btm-div'>业绩预览</div>
        <div class="pickerContent assess-data-picker-left">
          <p class="fontIcon">
            <i style="font-size:18px;color:#FEB001" class="fa fa-calendar" aria-hidden="true"></i>
          </p>
          <div class="dateShow">
            <p>
              <year-picker :values="yearDate" v-model="yearDate" :items="yearList" code="code" text="text">
              </year-picker>年
            </p>
            <p>
              <year-picker :values="monthDate" v-model="monthDate" :items="monthList" code="code" text="text">
              </year-picker>月
            </p>
          </div>
          <p class="fontIcon">
            <i style="font-size:18px;color:#FEB001" class="fa fa-search" aria-hidden="true"></i>
          </p>
        </div>
        <div class='flex comp-cost-parent'>
          <div>
            <div class='comp-cost'>
              <div style='display:flex'>
                <b>0</b>
                <span>万</span>
              </div>
              <p>规模保费</p>
            </div>
            <p>我本人:0万</p>
          </div>
          <div>
            <div class='comp-cost'>
              <div style='display:flex'>
                <b>0</b>
                <span>万</span>
              </div>
              <p>标准保费</p>
            </div>
            <p>我本人:0万</p>
          </div>
        </div>
        <div class='comp-ranking flex'>
          <div>
            <p>全国第</p>
            <span>5282</span>
            <p>名</p>
          </div>
          <div>
            <p>分公司第</p>
            <span>481</span>
            <p>名</p>
          </div>
          <div>
            <p>本机构第</p>
            <span>52</span>
            <p>名</p>
          </div>
        </div> -->
      </div>
    </div>
    <div class='Gx-info-btm' ref='InfoBtm'></div>
    <alert ref="alert"></alert>
    <!--底部Tab-->
    <!--<tabBar :isHome="false" :serviceInfo="true" :productManualInfo="true" :me="true"></tabBar>-->
  </div>
</template>

<!--js-->
<script>
  import {
    Indicator
  } from 'mint-ui';
  import Headerbtns from '../../../../src/components/policy/common/Header'
  import alert from '../../policy/common/alert.vue'
  import picker from '../../common/Picker.vue'
  import tabBar from '../../common/TabBar.vue'
  import yearPicker from '../../common/yearPicker.vue'
  import '../../policy/css/base.css'

  export default {
    name: 'comprehensiveInfo',
    components: {
      Headerbtns,
      alert,
      picker,
      tabBar,
      yearPicker
    },
    props: ['value'],
    data() {
      return {
        page_title: '综合查询',
        toggle: {},
        dict: {},
        selectResult: "1",
        link: ",",
        personsal: utils.cache.get("personsal"),/*代理人信息*/
        imgUrl: "static/img/comprehensive/icon_module_",/*拼图片路径*/
        showModelList: [],/*对接之后要显示的模块*/
        yearList:[],/*年列表*/
        yearDate:"",/*查询年*/
        monthList:[' ','01','02','03','04','05','06','07','08','09','10','11','12'],/*月列表*/
        monthDate:"06",/*查询月*/
        isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        List2:[
          {id:1,name:'回访记录',show:utils.cache.get("loginMedol").returnVisit,url:'./static/img/home/home_9.png'},
          {id:2,name:'客户积分',show:utils.cache.get("loginMedol").integralQuery,url:'./static/img/home/home_10.png'},
          {id:3,name:'投保进度',show:utils.cache.get("loginMedol").integralQuery,url:'./static/img/home/home_11.png'},
          {id:4,name:'个人中心',show:utils.cache.get("loginMedol").mopersonal,url:'./static/img/home/home_12.png'},
          {id:5,name:'理赔',show:utils.cache.get("loginMedol").moclaims,url:'./static/img/home/home_13.png'}
        ]
      }
    },
    mounted() {
      console.log("代理人信息", this.personsal)
      this.getModulePermissionsReq()
      /*时间选择*/
      this.yearDate=new Date().getFullYear() /*获取年数组*/
      let yearList1=[],yearList2=[]
      for(var i=this.yearDate-100; i<this.yearDate;i++){
        yearList1.push(i)
      }
      for(var i=this.yearDate; i<(this.yearDate)+100; i++){
        yearList2.push(i)
      }
      this.yearList=yearList1.concat(yearList2)
    },
    beforeDestroy() {
      Indicator.close();
    },
    methods: {
      /*获取综合查询模块信息*/
      getModulePermissionsReq() {
        console.log(this.personsal.channel)
        let requ = {
          "search": {
            agentCode: this.personsal.agentCode,
            channel: this.personsal.channel
          }
        }
        /* window.alert(JSON.stringify(requ))*/
        utils.http.postFast('ZHSEARCHMODEL', requ, (body) => {
          console.log("返回数据", body)
          let modelList = body.search.modelList
          /* console.log("返回modelList",modelList)*/
          let showModel = []
          if (modelList) {
            for (let i = 0; i < modelList.length; i++) {
            //                      if(modelList[i].existence == "1"){
              showModel.push(modelList[i])
            //                      }
          }
        }
        console.log(showModel)
        /*对要显示的数组按照num排序*/
        let compare = function(obj1, obj2) {
          var val1 = obj1.num;
          var val2 = obj2.num;
          return val1 - val2
        }
        this.showModelList = showModel.sort(compare)
        console.log("要显示的模块----->>>", this.showModelList)
      })
      },
      handleLoad() {
        Indicator.close();
      },
      pre() {
        Indicator.close();
        this.$router.push({
          name: "home"
        })
      },
      showMsg: function(msg) {
        if (msg != undefined && msg != "") {
          this.$refs.alert.showMOdal(msg)
        }
      },
      goTo(code) {
        console.log(code)
      console.log('渠道:', this.personsal.channel) //渠道 01个险 02银保
      let channel = this.personsal.channel
      if (code == 'myAssessment') { /*我的考核*/
        this.$router.push('/comprehensiveYinbao/myAssessment/assessDetail')
      } else if (code == 'myCommission') { /*我的薪酬*/
        this.$router.push('/comprehensiveYinbao/myCommission')
      }else{
        this.$refs.alert.showMOdal('此模块暂未开放！')
      }
    },
    	goToNew(code) {
        if (code == 1) {
          this.$router.push('/replyResultQuery')
        } else if (code == 2) {
          this.$router.push('/customerScore/customerQuery')
        } else if (code == 3) {
          this.$router.push('/policySearch')
        } else if (code == 4) {
          this.$router.push('/personal/personalInfo')
        } else if (code == 5) {
          this.$router.push('/settlement')
        }
      }
  }
}
</script>

<style lang="css" scoped type="text/css">
  .main-contents{
  	bottom:0 !important;
  	padding:0 15px;
  }
  .content{
  	padding: 15px 0;
  }
  .content>p{
		font-size:18px;
		font-weight: 600;
		color:#333;
	}
  .content ul{
  	display: flex;
  	justify-content: flex-start;
  	align-items: center;
  	flex-wrap: wrap;
  	width:100%;
  }
  .content ul li{
  	width:33%;
  	padding: 5% 1% 0 1%;
  	box-sizing: border-box;
  }
  .content ul li div{
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	padding: 20% 0;
  	box-shadow: 2px 5px 5px #f0f0f0;
  }
  .content ul li p{
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	height: 40px;
  	box-sizing: border-box;
  }
  .content ul li div span{
  	font-size:16px;
		font-weight: 400;
		color:#333;
		margin-top: 15%;
  }
  .flex{
    display: flex;
    justify-content: space-between;
  }
 
  .Gx-info-btm{
    background:url('./../../../../static/img/comprehensive/Gx_bg.png') no-repeat;
    background-size:100% 100%;
    width:100%;
    height:330px;
  }
  /*.manage-main-contents-btm-div{
    background:url('/static/img/comprehensive/Yb_preview.png') no-repeat;
    background-size:100% 100%;
    height:30px;
    width:80%;
    margin:0 auto;
    text-align: center;
    color:#fff;
    font-size:1.1rem;
    line-height: 30px;
  }
  .comp-cost-parent{
    width:85%;
    margin:10px auto;
  }
  .comp-cost-parent>div{
    width:45%;
    background:url('/static/img/comprehensive/Yb_btm.png') no-repeat;
    background-size:100% 100%;
    height:120px;
  }
  .comp-cost-parent>div>p{
    width:100%;
    text-align: center;
    color:#000;
    margin-top:10px;
    font-size:1rem;
  }
  .comp-cost{
    width:100%;
    background:url('/static/img/comprehensive/Yb_btm.png') no-repeat;
    background-size:100% 100%;
    height:120px;
  }
  .comp-cost>div{
    padding-top:40px;
    width:100%;
    justify-content: center;
    line-height: 30px;
    color:#fff;
  }
  .comp-cost>div>b{
    font-size:2rem;
    margin-right:5px;
  }
  .comp-cost>p{
    width:100%;
    text-align: center;
    font-size:1rem;
    color:#fff;
  }
  .comp-ranking{
    margin-top:40px;
    height:50px;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    background:#fff;
  }
  .comp-ranking>div{
    width:33.333%;
    display: flex;
    height:30px;
    margin-top:10px;
    justify-content: center;
    align-items: center;
  }
  .comp-ranking>div:nth-child(2){
    border-right:2px dotted #ccc;
    border-left:2px dotted #ccc;
  }
  .comp-ranking span{
    color:#FEB101;
    font-size:1.2rem;
  }*/
	.main-contents {
			-webkit-overflow-scrolling: auto !important;
		}
</style>
