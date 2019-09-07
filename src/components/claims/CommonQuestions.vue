<!--理赔申请常见问题页面-->
<template>
	<div id="content">
		<Headerbtns :title = page_title>
			<div slot="left" class="back" @click="goBack">
				<i class="fa fa-angle-left" ></i>
			</div>
		</Headerbtns>
		<div class="manage-main-contents">
			<div class="content">
        <div v-for="(questions,index) in CommonQuestions">
          <div class="question">
            <div class="icon"><img src="static/img/claims/questionIcon.png"></div>
            <div class="font"><p>{{questions.question}}</p></div>
            <div class="fold"><i :class="[questions.isActive?'fa fa-angle-double-up':'fa fa-angle-double-down']" @click="toAnswer(index)"></i></div>
          </div>
          <div class="answer" v-if='questions.isActive'>
            <ul>
              <li v-for="(answers,index) in questions.answer">{{answers}}</li>
            </ul>
            <!-- 重疾险表格 -->
            <div v-if="index ==7">
              <table>
                <thead>
                  <tr>
                    <th width="23%" align="center">{{periodTitle}}</th>
                    <th width="23%" align="center">{{serviceNameTitle}}</th>
                    <th width="20%" align="center">{{serviceItemTitle}}</th>
                    <th width="34%" align="center">{{specificContentTitle}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in dataTest">
                    <td width="23%" align="center" :rowspan="item.periodspan" v-show='item.perioddis == false'>{{item.period}}</td>
                    <td width="23%" align="center" style="font-weight:bolder;" :rowspan="item.serviceNamespan" v-show='item.serviceNamedis == false'>{{item.serviceName}}</td>
                    <td width="20%" align="center" :rowspan="item.serviceItemspan" v-show='item.serviceItemdis == false'>{{item.serviceItem}}</td>
                    <td width="34%" style="padding-left:5px;padding-right:5px;" :rowspan="item.specificContentspan" v-show='item.specificContentdis == false'>{{item.specificContent}}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <div class="lingxing"></div>
                <p>{{tip}}</p>
              </div>
            </div>
          </div>
          <div class="oneQuestion" v-show="!(index == CommonQuestions.length-1)"></div>
        </div>
			</div>
		</div>
	</div>
</template>

<!--js-->
<script>
  import Headerbtns from '@/components/policy/common/Header'
  import '../policy/css/base.css'
	export default{
		name:'common_questions',
  	components: {Headerbtns},
		data () {
			return {
        page_title: '理赔申请适用范围',
        CommonQuestions:[
          {
            isActive:false,
            question:'什么人具备理赔申请资格？',
            answer:[
              '1、申领非身故类保险金的理赔应由被保险人本人申请，如被保险人为未成年人，应由被保险人法定监护人提出理赔申请；',
              '2、申领身故保险金的理赔可由指定身故受益人来申请，未指定则应由被保险人的法定继承人提出理赔申请，在申请时须提供证明其法定继承人资格的相关材料。',
              '根据《继承法》规定继承开始后，由第一顺序继承人继承，第二顺序继承人不继承。没有第一顺序继承人继承的，由第二顺序继承人继承。',
              '第一顺位继承人：父母、配偶、子女',
              '第二顺位继承人：兄弟姐妹、祖父母、外祖父母。'
            ]
          },
          {
            isActive:false,
            question:'发生保险事故后，该怎么办呢？',
            answer:[
              '建议您先及时进行理赔报案，报案后1个工作日内我公司客服专员电话回访、指导理赔申请。'
            ]
          },
          {
            isActive:false,
            question:'出险人的姓名及证件号码与投保时发生变化如何处理？',
            answer:[
              '首先请您先向我公司申请姓名或身份证号码的保全变更，变更成功后，可正常进行理赔申请。'
            ]
          },
          {
            isActive:false,
            question:'被保险人发生交通事故，申请理赔时有何特殊要求吗？',
            answer:[
              '需要提供交管部门出具的交通事故责任认定书，双方调解书，如被保险人为机动车驾驶者，需提供行车证、驾驶证原件。'
            ]
          },
          {
            isActive:false,
            question:'赔款如何获取？',
            answer:[
              '我公司会通过转账方式将保险金转到申请人的账户。在理赔申请时，需要您完整、准确地填写申请人的开户行及账号。同时，我公司会在理赔金转账成功后会进行短信通知。'
            ]
          },
          {
            isActive:false,
            question:'何时可以补充上传资料？',
            answer:[
              '您在光速宝的理赔申请已经受理成功，在我公司理赔处理过程中，您可以通过【我的理赔】--【补充资料】进行资料的补充上传。',
              '建议您在我公司客服人员指导下进行缺少的资料补上传操作，以免应备资料重复上传。'
            ]
          },
          {
            isActive:false,
            question:'极速理赔服务',
            answer:[
              '我公司极速理赔服务，即无论金额大小、无论出险类型、事实明确、无需调查的理赔案件，当日受理当日结案。'
            ]
          },
          {
            isActive:false,
            question:'“光之翼护佑天使”健康增值服务',
            answer:[
              '如果客户是拥有我公司有效重大疾病保单（非团险）的被保险人，在保险等待期后首次确诊或疑似确诊重疾（重疾条款中重大疾病种类的一种或多种），可根据“重疾前咨询”、“重疾求医就诊”和“重疾后续治疗”',
              '实际需求进行申请，具体服务内容详见下表。'
            ]
          },
          {
            isActive:false,
            question:'健康增值服务申请方式：',
            answer:[
              '①	客户拨打光大永明人寿全国统一客服热线95348→按6进入健康服务→按2向公司提出重疾增值服务申请；',
              '②	客户登录光大永明人寿官方网站→客服中心→玩赚积分页面中的“健康服务”选项，进行自助服务申请；',
              '③	客户至光大永明人寿各地分公司客服中心，亲临柜面进行服务申请。'
            ]
          }
        ],
        /* 表格数据 */
        dataTest: [],
        periodTitle:'功能阶段',
        serviceNameTitle:'服务名称',
        serviceItemTitle:'服务项目',
        specificContentTitle:'具体内容说明',
        heavyDiseaseService:[
          {
            period:'重疾前期咨询',
            serviceName:'重疾专属顾问',
            serviceItem:'精确分诊',
            specificContent:'就诊前根据症状、既往检查结果及就诊经过进行精确分诊，为您推荐适合的专家就诊。'
          },
          {
            period:'重疾求医就诊',
            serviceName:'专家门诊预约',
            serviceItem:'专家预约',
            specificContent:'接到服务申请且审核无误后为您提供指定医院及科室门诊预约服务。出诊专家均为三甲医院副主任医师/副教授及以上级别。'
          },
          {
            period:'重疾求医就诊',
            serviceName:'现场全程导医',
            serviceItem:'诊前沟通',
            specificContent:'就诊前温馨提示您注意事项（提醒携带的相关物品、检查报告、饮食注意事项等）'
          },
          {
            period:'重疾求医就诊',
            serviceName:'现场全程导医',
            serviceItem:'诊中服务',
            specificContent:'全程导诊，全程陪同您完成就诊过程，并在就诊过程中根据客户的需求对您的疾病问题提供健康指导。'
          },
          {
            period:'重疾求医就诊',
            serviceName:'现场全程导医',
            serviceItem:'诊后管理',
            specificContent:'就诊结束后，整理您的健康档案，全程记录就诊状况，便于您后续再次复诊。'
          },
          {
            period:'重疾后续治疗',
            serviceName:'快速住院安排',
            serviceItem:'住院协调',
            specificContent:'根据临床病征，综合您关于就诊时间、地点、医院、偏好等要求，推荐和预约医院安排住院治疗服务。'
          },
          {
            period:'重疾后续治疗',
            serviceName:'快速住院安排',
            serviceItem:'住院探访',
            specificContent:'住院过程中给您提供温馨探视服务，根据病情与专家沟通相关治疗方案（仅根据病情与专家进行咨询，增加您对疾病及治疗方案的认识度，对您的治疗方案不做任何建议）。'
          },
          {
            period:'重疾后续治疗',
            serviceName:'快速住院安排',
            serviceItem:'出院协助',
            specificContent:'出院时陪同并协助您办理出院相关手续。'
          },
          {
            period:'重疾后续治疗',
            serviceName:'快速住院安排',
            serviceItem:'康复指导',
            specificContent:'出院后电话跟进您的康复情况及诊疗效果，并提出切实适当的保健意见。'
          },
          {
            period:'重疾后续治疗',
            serviceName:'手术绿色通道',
            serviceItem:'优先手术',
            specificContent:'根据临床病征，综合您关于就诊时间、地点、医院、偏好等要求，推荐和预约医院安排手术治疗服务。'
          },
          {
            period:'重疾后续治疗',
            serviceName:'手术绿色通道',
            serviceItem:'方案沟通',
            specificContent:'根据病情与您的专家沟通相关手术治疗方案。'
          },
        ],
        tip:'温馨提示：享受该系列服务不作为将来能否获得重疾理赔的依据。'
			}
    },
    mounted() {
      this.query();
    },
    methods:{
      goBack() {
        this.$router.push("/claims/serviceGuide");
      },
      toAnswer(index){
        let questions = this.CommonQuestions[index];
        questions.isActive = !questions.isActive;
      },
      query() {
        /* 动态判断跨几行和显示隐藏问题 */
        for (var item in this.heavyDiseaseService[0]) {
          console.log(item)
          var k = 0;
          while ( k < this.heavyDiseaseService.length) {
            this.heavyDiseaseService[k][item + 'span'] = 1
            this.heavyDiseaseService[k][item + 'dis'] = false
            for (var i = k + 1; i < this.heavyDiseaseService.length; i ++) {
              if (this.heavyDiseaseService[k][item] == this.heavyDiseaseService[i][item] && this.heavyDiseaseService[k][item] != '') {
                this.heavyDiseaseService[k][item + 'span']++;
                this.heavyDiseaseService[k][item + 'dis'] = false;
                this.heavyDiseaseService[i][item + 'span'] = 1;
                this.heavyDiseaseService[i][item + 'dis'] = true;
              } else {
                break;
              }
            }
            k = i;
          }
        }
        this.dataTest = this.heavyDiseaseService;
      }
    }
	}
</script>

<style lang="scss" scoped type="text/css">
  /* 隐藏滚动条 */
  .manage-main-contents::-webkit-scrollbar,
  .content::-webkit-scrollbar{
    display: none
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
		color: #FDB92C;
	}
	.fa-angle-left{
		display: inline-block;
		width: 100%;height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	.manage-main-contents{
		width: 100%;
		position: absolute;
		left: 0;right: 0;top: 48px;bottom: 0;
		overflow-y: auto;
		overflow-x: hidden;
    background: #FFF;
    .content .question {
      widows: 100%;
      min-height: 40px;
      /* 实现垂直居中 */
      display: flex;
      align-items:center;
      .icon {
        float: left;
        margin-left: 10px;
        margin-right: 10px;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .font {
        width: 80%;
        float: left;
        p {
          padding-left: 1px;
          font-size: 16px;
          float: left;
          line-height: 22px;
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
      .fold {
        float: left;
        .fa.fa-angle-double-down {
          color: #FFB30E;
          font-size: 25px;
        }
        .fa.fa-angle-double-up {
          color: #FFB30E;
          font-size: 25px;
          line-height: 40px;
        }
      }
    }
    .content .answer {
      border-top: 1px dashed #ccc;
    }
    .oneQuestion {
      width: 100%;
      height: 5px;
      background: rgb(231, 231, 231);
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .content ul {
      margin-left: 15px;
      margin-right: 15px;
    }
    .content ul li {
      line-height: 16px;
      padding-left: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
	}
  /* 表格CSS */
  table {
    width: 100%;
    border: 2px #03345C solid;
    th,td {
      height: 20px;
      border: 1px #03345C solid;
      vertical-align: middle;
      padding-top: 5px;
      padding-bottom: 5px;
      line-height: 120%;  /*以字体大小的百分比为标准*/
    }
    th {
      color: yellow;
      background: rgb(5, 87, 155);
      font-weight: bolder;
    }
  }
  .lingxing {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: black;
    transform:rotate(45deg);
    margin-left: 10px;
    margin-top: 10px;
  }
  p {
    display: inline;
    margin-left: 10px;
    line-height: 20px;
  }
</style>
