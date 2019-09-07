<!--理赔申请应备材料页面-->
<template>
	<div id="content">
		<Headerbtns :title = page_title>
			<div slot="left" class="back" @click="goBack">
				<i class="fa fa-angle-left" ></i>
			</div>
		</Headerbtns>
		<div class="manage-main-contents">
      <div v-for="(materials,index) in necessaryMaterials">
        <div class="material">
          <div class="icon"><img src="static/img/claims/fileIcon.png"></div>
          <div class="font"><p>{{materials.type}}</p></div>
          <div class="fold"><i :class="[materials.isActive?'fa fa-angle-double-up':'fa fa-angle-double-down']" @click="toAnswer(index)"></i></div>
        </div>
        <div class="answer" v-if='materials.isActive'>
          <div class="ziliao"><p v-for="(material,index) in materials.material" v-html="material">{{material}}</p></div>
          <div class="zhengming"><p v-for="(prove,index) in materials.prove" v-html="prove">{{prove}}</p></div>
        </div>
        <div class="oneQuestion"></div>
      </div>
      <!-- 尾部提示* -->
      <div class="tips"><p v-for="tip in tips">{{tip}}</p></div>
      <div class="footer"><img src="static/img/claims/tipIcon.png"><p>{{footer}}</p></div>
		</div>
	</div>
</template>

<!--js-->
<script>
	import Headerbtns from '@/components/policy/common/Header'
  import '../policy/css/base.css'
	export default{
		name:'necessary_materials',
  	components: {Headerbtns},
		data () {
			return {
        page_title: '理赔申请应备材料',
        necessaryMaterials: [
          {
            isActive:false,
            type: '医疗',
            material: ['资料：','1. 理赔申请书','2. 被保险人有效身份证件（身故无需提供）','3. 申请人有效身份证件、银行账户','4. 保险合同<span style="color:#F79646;">（身故、重疾、高残提供）</span>'],
            prove: ['相关证明：','1.  门诊病历<span style="color:#F79646;">（门诊医疗提供）</span>','2.  住院病历/出院小结','3.  收据、费用清单','4.  已在社保或第三方报销医疗费用的，需提供社保报销单或第三方报销凭证']
          },
          {
            isActive:false,
            type: '津贴',
            material: ['资料：','1. 理赔申请书','2. 被保险人有效身份证件（身故无需提供）','3. 申请人有效身份证件、银行账户','4. 保险合同<span style="color:#F79646;">（身故、重疾、高残提供）</span>'],
            prove: ['相关证明：','1.  住院病历/出院小结','2.  费用清单']
          },
          {
            isActive:false,
            type: '身故',
            material: ['资料：','1. 理赔申请书','2. 被保险人有效身份证件（身故无需提供）','3. 申请人有效身份证件、银行账户','4. 保险合同<span style="color:#F79646;">（身故、重疾、高残提供）</span>'],
            prove: ['相关证明：','1.	死亡证明、户籍注销证明、殡葬证明（任意两种）','2.	法定继承人声明书<span style="color:#F79646;">（无指定受益人提供）</span>']
          },
          {
            isActive:false,
            type: '重大疾病',
            material: ['资料：','1. 理赔申请书','2. 被保险人有效身份证件（身故无需提供）','3. 申请人有效身份证件、银行账户','4. 保险合同<span style="color:#F79646;">（身故、重疾、高残提供）</span>'],
            prove: ['相关证明：','1.	诊断证明/住院病历/出院小结','2.	病理报告/检查报告']
          },
          {
            isActive:false,
            type: '残疾',
            material: ['资料：','1. 理赔申请书','2. 被保险人有效身份证件（身故无需提供）','3. 申请人有效身份证件、银行账户','4. 保险合同<span style="color:#F79646;">（身故、重疾、高残提供）</span>'],
            prove: ['相关证明：','1.	诊断证明/住院病历/出院小结','2.	检查报告/伤残鉴定文件']
          },
          {
            isActive:false,
            type: '豁免',
            material: ['资料：','1.	理赔申请书','2.	投保人有效身份证件','3.	申请人有效身份证件'],
            prove: ['相关证明：','1.	诊断证明/住院病历/出院小结<span style="color:#F79646;">（重疾/高残提供）</span>','2.	病理报告/检查报告<span style="color:#F79646;">（重疾提供）</span>','3.	检查报告/伤残鉴定文件<span style="color:#F79646;">（高残提供）</span>','4.	死亡证明、户籍注销证明、殡葬证明<span style="color:#F79646;">（任意两种）（身故提供）</span>']
          }
        ],
        tips:[
          '1.	有效身份证件：指由中华人民共和国政府主管部门规定的能够证明其身份的证件，如：居民身份证、按规定可使用的有效护照、户口簿等证件。委托他人代办理赔申请，需提供代办人有效身份证件。',
          '2.	法定继承人声明书：法定继承人为两人或两人以上时，需明确继承人与被保险人关系证明及各自继承份额，并全部继承人亲笔签名。',
          '3.	保险金作为被保险人遗产时，须提供可证明合法继承权的相关权利文件（如户口本、出生证、公安户籍机关/居委会/村委会出具的关系证明等）。',
          '4.	所能提供的与确认保险事故的性质、原因有关的其他证明和资料，如交通事故需提供交通管理部门出具的交通事故责任认定书、工伤事故需提供相关单位的工伤证明等。'
        ],
        footer: '如以上应备资料信息与保险合同条款所列不符，将以保险合同条款为准。'
			}
    },
    methods:{
      goBack() {
        this.$router.push("/claims/serviceGuide");
      },
      toAnswer(index){
        let materials = this.necessaryMaterials[index];
        materials.isActive = !materials.isActive;
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
		color:#FFB30E;
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
    .material {
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
          font-size: 14px;
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
    .answer {
      border-top: 1px dashed #ccc;
      .ziliao,.zhengming {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        p {
          line-height: 15px;
        }
      }
      .zhengming {
        margin-top: 15px;
      }
    }
    .oneQuestion {
      width: 100%;
      height: 5px;
      background: rgb(231, 231, 231);
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .tips {
      margin: 10px;
      p {
        color: #5F2400;
        margin-top: 10px;
        line-height: 15px;
      }
    }
    .footer {
      margin: 10px;
      img {
        width: 20px;
        height: 20px;
        float: left;
      }
      p {
        width: 90%;
        float: left;
        margin-left: 10px;
        line-height: 15px;
        color: #FBB101;
      }
    }
	}
</style>

