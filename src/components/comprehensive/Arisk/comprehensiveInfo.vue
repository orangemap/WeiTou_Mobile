<!-- 综合查询 -->
<template>
  <div>
    <Headerbtns :title="page_title">
      <div slot="left" @click="pre">
      	<i class="fa fa-angle-left"></i>
      </div>
    </Headerbtns>
    <div class="main-contents">
    	<div style="width:100%;height:180px;padding: 20px 0;box-sizing: border-box;">
    		<img src="../../../../static/img/comprehensive/banner_sive.png" style="width:100%;"/>
    	</div>
    	<div class="content" v-show="personsal.channel == '01' || personsal.channel == '03' || personsal.channel == '04'">
    		<p>履职管理</p>
    		<ul>
    			<li v-for="tmp of List" @click="goTo(tmp.id)">
            <div>
            	<p><img :src="tmp.url"></p>
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
    </div>
    <Alert ref="showalert"></Alert>
  </div>
</template>

<!--js-->
<script>
  import {
    Indicator
  } from 'mint-ui';
  import Headerbtns from '@/components/policy/common/Header'
  import Alert from '@/components/policy/common/alert.vue'
  import picker from '../../common/Picker.vue'
  import tabBar from '../../common/TabBar.vue'
  import '../../policy/css/base.css'

  export default {
    name: 'comprehensiveInfo',
    components: {
      Headerbtns,
      Alert,
      picker,
      tabBar
    },
    data() {
      return {
        newModel:false,/*默认不弹框*/
        modelContent:'',/*提示框内容*/
        page_title: '综合查询',
        personsal: utils.cache.get("personsal") /*代理人信息*/ ,
        List:[
          {id:1,name:'我的佣金',url:'./static/img/comprehensive/Gx_01.png'},
          {id:2,name:'考核预警',url:'./static/img/comprehensive/Gx_02.png'},
          {id:3,name:'正式考核',url:'./static/img/comprehensive/Gx_03.png'}
        ],
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
      console.log('渠道:', this.personsal.channel)
    },
    beforeDestroy() {
      Indicator.close();
    },
    methods: {
      showModals(message) {
        this.$refs.showalert.showMOdal(message)
      },
      pre() {
        this.$router.push({
          name: "home"
        })
      },
      goTo(code) {
        console.log(code)
        console.log('渠道:', this.personsal.channel)
        if (code == 1) { /*我的佣金*/
          this.$router.push('/comprehensiveGexian/AriskmyCommission')
        } else if (code == 2) { /*考核预警*/
          this.$router.push('/comprehensiveGexian/AssessmentYujing/1')
        } else if (code == 3) { /*正式考核*/
          this.$router.push('/comprehensiveGexian/FormalAssessment')
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
  .w-btn,.window-panel .w-btn{
    margin:8px auto!important;
  }
.main-contents {
		-webkit-overflow-scrolling: auto !important;
	}
</style>
