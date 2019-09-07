<!-- 积分查询界面 -->
<template>
	<div class='sel-user'>
		<Headerbtns title="积分查询" class='sel-user-head'>
			<div slot="left" class="back" @click='goBack'>
				<i class="fa fa-angle-left" style='font-size:1.8rem;'></i>
			</div>
		</Headerbtns>
		<div class='details'>
      <!-- 积分显示部分 -->
      <div class="stars">
        <div style="margin-top:2rem;width:100%;height:2rem;">
          <img v-show="isThreeStar||isFourStar||isFiveStar" style="width:2rem;height:2rem;" :src="star">
          <img v-show="isThreeStar||isFourStar||isFiveStar" style="width:2rem;height:2rem;" :src="star">
          <img v-show="isThreeStar||isFourStar||isFiveStar" style="width:2rem;height:2rem;" :src="star">
          <img v-show="isFourStar||isFiveStar" style="width:2rem;height:2rem;" :src="star">
          <img v-show="isFiveStar" style="width:2rem;height:2rem;" :src="star">
        </div>
        <div style="margin-top:0.5rem;font-size:0.7rem;">{{customerLevel}}客户</div>
        <div style="margin-top:1rem;">&nbsp;<div v-show="!isFiveStar">距下一级积分：<span style="color:#FFB614">{{integralObj.nextLevelPoint}}</span></div></div>
        <div style="margin-top:0.7rem;">
          <div class="integral" style="margin-left:15%;">消费积分：<span style="color:#FFB614">{{integralObj.canusePoint}}</span></div>
          <div class="integral" style="margin-left:10%;">级别积分：<span style="color:#FFB614">{{integralObj.levelPoint}}</span></div>
        </div>
      </div>
      <!-- 温馨提示部分 -->
      <div class="tips">
        <p style="margin-bottom:0.5rem;font-size:0.7rem;">温馨提示</p>
        <p style="line-height:0.9rem;">客户可通过注册光大永明人寿官方微信和官方网站，拨打全国统一客服热线95348，或前往各机构柜面，进行可享受服务申请和消费积分兑换。</p>
      </div>
      <div v-show="isThreeStar||isFourStar||isFiveStar">
        <!-- 可享受服务标题 -->
        <div style="height:2rem;width:100%;line-height:2rem;color:#FFB614;">
          <p>级别可享受服务</p>
        </div>
        <!-- 可享受服务列表 -->
        <div style="height:2rem;width:100%;line-height:2rem;color:#FFF;background:#FFB614;">
          <span style="width:60%;float:left;"><p>增值服务项目</p></span>
          <span style="width:15%;float:left;text-align:center;">服务次数</span>
          <span style="width:25%;float:left;text-align:center;">服务止期</span>
        </div>
        <div>
          <div v-for="(item,index) in newservicesList" style="height:1.8rem;width:100%;line-height:1.8rem;border-bottom:1px solid #6B6B6B">
            <div style="width:60%;float:left;color:#54A4DC;text-decoration: underline;white-space: nowrap;" @click="select(index)"><p>{{item.service}}</p></div>
            <div style="width:15%;float:left;text-align:center;">{{item.num}}</div>
            <div style="width:25%;float:left;text-align:center;">{{item.stopTime}}</div>
          </div>
          <!-- 注 -->
          <div style="height:2rem;width:100%;line-height:2rem;color:#CE4857;">
            <p>注：点击服务项目，查看相关信息。</p>
          </div>
          <div style="width:100%;">
            <p style="font-weight:bold;">{{serviceTitle}}</p>
          </div>
          <div class="content">
            <p v-for="detail in serviceDetail" v-html="detail">
              {{detail}}
              <div style="text-indent: 0;margin:0.2rem 2rem auto 2rem;" v-if="index == 9">
                <b>基因检测项目：</b>
                <table>
                  <tr align="center">
                    <td rowspan="2" style="width:24%;">常见肿瘤基因检测</td>
                    <td style="width:12%;">男性</td>
                    <td style="width:12%;">9项</td>
                    <td>肺癌、胃癌、肝癌、结直肠癌、食管癌、胰腺癌、前列腺癌、膀胱癌、肾癌</td>
                  </tr>
                  <tr align="center">
                    <td style="width:12%;">女性</td>
                    <td style="width:12%;">10项</td>
                    <td>肺癌、胃癌、肝癌、结直肠癌、食管癌、胰腺癌、乳腺癌、宫颈癌、子宫内膜癌、卵巢癌</td>
                  </tr>
                </table>
              </div>
              <div style="text-indent: 0;margin:0.2rem 2rem auto 2rem;" v-if="index == 14">
                <table style="border:1px #000 solid">
                  <tr style="height:1.5rem;">
                    <td rowspan="2" style="width:5%;padding-left:1rem;">个人业务</td>
                    <td style="width:8%;padding-left:1rem;">财务管理及传承</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">婚姻与继承</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td rowspan="3" style="width:5%;padding-left:1rem;">公司业务</td>
                    <td style="width:8%;padding-left:1rem;">公司事务</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">企业并购</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">私募与风控</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td rowspan="2" style="width:5%;padding-left:1rem;">国际业务</td>
                    <td style="width:8%;padding-left:1rem;">国际贸易</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">境外投资</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:5%;padding-left:1rem;">诉讼业务</td>
                    <td style="width:8%;padding-left:1rem;">诉讼与仲裁</td>
                  </tr>
                </table>
              </div>
              <div style="text-indent: 0;margin:0.2rem 2rem auto 2rem;" v-if="index == 15">
                <table style="border:1px #000 solid">
                  <tr style="height:1.5rem;">
                    <td rowspan="4" style="width:5%;padding-left:1rem;">个人税务</td>
                    <td style="width:8%;padding-left:1rem;">高净值个人境内税务</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">个人境外纳税申报</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">移民税务筹划方案</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">境外资产管理</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td rowspan="4" style="width:5%;padding-left:1rem;">企业税务</td>
                    <td style="width:8%;padding-left:1rem;">企业境内外纳税申报</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">企业日常运营</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">企业并购重组</td>
                  </tr>
                  <tr style="height:1.5rem;">
                    <td style="width:8%;padding-left:1rem;">企业投融资</td>
                  </tr>
                </table>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
    <alert ref="alert"></alert>
	</div>
</template>

<script>
import Headerbtns from '@/components/policy/common/Header'
import alert from '../../../src/components/policy/common/alert.vue'
import "../policy/css/base.css";
export default {
	components:{Headerbtns,alert},
	data() {
		return {
		    customerLevel: '',  //客户级别
		    distanceNext: '',   //距下一级别积分
		    consumptionPoints: 1610,  //消费积分
		    integralLevel: 10001,  //级别积分
		    star: 'static/img/customerScore/star.png',
		    isFiveStar: false,
		    isFourStar: false,
		    isThreeStar: false,
		    serviceTitle: '',
		    serviceDetail: '',
		    newservicesList: [],
		    index: '',
		    integralObj:{
		    	canusePoint: "0", //消费积分
				customerLevel: "0",//客户级别
				levelPoint: "0",//客户级别积分
				nextLevelPoint: "0"//距下一个级别积分
		    },
		    detail_href:"#customerScore/integralQuery/"+this.$route.params.customer,
		    detail_id:"customerScore/integralQuery/"+this.$route.params.customer,
		}
	},
	filters:{
		frequency_filter(code){
			if(code == 'BX'){
				return '不限'
			}else{
				return code
			}
		}
	},
	methods: {
		get_integral(){
			let customerObj = JSON.parse(this.$route.params.customer)
			console.log(customerObj)
			let requ = {
				'policy':{
					'customername':customerObj.customerName,//姓名	           
					'sex':customerObj.customerSex,//性别	           
					'birthday':customerObj.customerBirthday,//生日	           
					'documentno':customerObj.customerIDNo,//证件号	         
					'documenttype':customerObj.customerIDType,//证件类型
				}
			}
			utils.http.postFast("JFCEREQUEST", requ, (body) => {
				console.log(body)
				if(body.policy.resultCode == 0){
					this.integralObj = body.policy
					if(this.integralObj.canusePoint == '0'&&
						this.integralObj.customerLevel == ''&&
						this.integralObj.levelPoint == ''&&
						this.integralObj.nextLevelPoint == ''){
						this.$refs.alert.showMOdal('暂未查询到当前客户积分记录!')
					}
					console.log(this.integralObj)
					this.isStar(this.integralObj)
					let problemInfo = this.integralObj.problemInfo
					this.newservicesList = []
					for(let i=0;i<problemInfo.length;i++){
						let item = problemInfo[i]
						let temp = {
							service:item.servicename,
							num:item.servicefrequency,
							stopTime:item.serviceenddate,
							detail:[item.servicedesc]
						}
						this.newservicesList.push(temp)
					}
				}else{
					console.log(body.policy.resultMessage)
					this.$refs.alert.showMOdal(body.policy.resultMessage)
				}
			})
		},
		goBack() {
			this.go('/customerScore/customerQuery')
  		},
	  	/* 点击服务项目，查看相关信息 */
	  	select(index) {
		    this.index = index
	      	this.serviceTitle = this.newservicesList[index].service
	      	this.serviceDetail = this.newservicesList[index].detail
	  	},
	  	/* 通过级别积分判定星级客户 */
	  	isStar(integralObj) {
		    let integralLevel = integralObj.customerLevel
		    if(integralLevel == '04') {
		      this.customerLevel = '五星级'
		      this.isFiveStar = true
		    } else if(integralLevel == '03') {
		      this.customerLevel = '四星级'
		      this.isFourStar = true
		    } else if(integralLevel == '02') {
		      this.customerLevel = '三星级'
		      this.isThreeStar = true
		      console.log(this.newservicesList)
		    } else if(integralLevel == '01') {
		      this.customerLevel = '普通'
		    }
	  	}
	},
	mounted() {
		let htmlDOM = document.getElementsByTagName('html')[0]
		htmlDOM.style.fontSize = this.screenWidth/20+'px'
      	this.media.header($('.details'))
      	this.get_integral()
	},
	beforeDestroy() {
		let htmlDOM = document.getElementsByTagName('html')[0]
		htmlDOM.style.fontSize = ''
	}
}
</script>

<style scoped lang="scss" type="text/css">
	.details p,
	.details div,
	.details span{
		font-size: 0.7rem;
	}
  /* 隐藏滚动条 */
  .details::-webkit-scrollbar{
    display: none;
  }
  /* 积分显示部分 */
  .stars {
    height: 10.5rem;
    width: 100%;
    color: #fff;
    background: url('./../../../static/img/customerScore/IntegralBackground.png') no-repeat;
    background-size: cover;
    text-align: center;
    overflow: hidden;
  }
  .integral {
    height: 1.5rem;
    line-height: 1.5rem;
    color: black;
    background: #fff;
    float: left;
    text-align: center;
    border-radius: 25%;
    padding: 2px;
  }
  /* 温馨提示部分 */
  .tips {
    /*height: 4.5rem;*/
    width: 94%;
    margin: 3%;
    background: #E2E2E4;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }
  p {
    margin-left: 0.8rem;
    margin-right:0.8rem;
  }
  .content {
    margin: 0.8rem 0 auto 0;  /* 设置上右下左外边距 */
    text-indent: 2em; /* 首行缩进字符 */
  }
  table {
    margin-top: 0.1rem;
  }
  tr td {
    border: 1px #000 solid;
    vertical-align: middle;
  }
  b {
    font-weight: bold;
  }
  .fa{
		color: #FDB92C;
	} 
</style>
