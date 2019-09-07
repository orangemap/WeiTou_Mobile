<!--理赔资料获取途径页面-->
<template>
	<div id="content">
		<Headerbtns :title = page_title>
			<div slot="left" class="back" @click="goBack">
				<i class="fa fa-angle-left" ></i>
			</div>
		</Headerbtns>
		<div class="manage-main-contents">
      <div v-for="(materials,index) in path">
        <div class="material">
          <div class="icon"><img src="static/img/claims/fileIcon.png"></div>
          <div class="font"><p>{{materials.material}}</p></div>
          <div class="fold"><i :class="[materials.isActive?'fa fa-angle-double-up':'fa fa-angle-double-down']" @click="toAnswer(index)"></i></div>
        </div>
        <div class="answer" v-if='materials.isActive'>
          <ul>
            <li>{{materials.pathway}}</li>
          </ul>
        </div>
        <div class="oneQuestion"></div>
      </div>
		</div>
	</div>
</template>

<!--js-->
<script>
	import Headerbtns from '@/components/policy/common/Header'
  import '../policy/css/base.css'
	export default{
		name:'acquisition_path',
  	components: {Headerbtns},
		data () {
			return {
        page_title: '理赔资料获取途径',
        path: [
          {
            isActive:false,
            material: '《理赔申请书》、《法定继承人声明书》',
            pathway: '可以登陆我公司官网→服务指南→单证下载中下载；可以在各分支公司网点领取；可以向业务代表索取。'
          },
          {
            isActive:false,
            material: '诊断证明',
            pathway: '在医院就诊后请向您的医生索取，并在医务部门盖章。'
          },
          {
            isActive:false,
            material: '住院病历/出院小结',
            pathway: '在医院住院治疗结束后，请向您的医生索取出院小结。'
          },
          {
            isActive:false,
            material: '住院收据/费用清单',
            pathway: '在办理出院手续时向医院索取住院费收据及清单。'
          },
          {
            isActive:false,
            material: '社保报销单',
            pathway: '通常情况下，社保机构仅接受发票原件，不接受医疗费用分割单。因此若您有社保报销，建议您先到社保报销后，持社保费用分割单和发票复印件到我公司进行理赔。社保机构对票据的具体要求，请咨询当地的社保机构。（住院医疗发生社保报销时使用）。'
          },
          {
            isActive:false,
            material: '门/急诊病历、门诊收据/费用清单',
            pathway: '在医院门/急诊就诊时，向医院索取“门诊手册或门诊病历”和收据及清单。'
          },
          {
            isActive:false,
            material: '病理报告/检查报告',
            pathway: '请您在进行检查后请及时向医生索取病理检查报告。'
          },
          {
            isActive:false,
            material: '鉴定文件',
            pathway: '请您与我司联系，确定在具有相关资质的鉴定机构进行伤残或重疾鉴定，鉴定结束后，鉴定机构会出具鉴定文件。'
          },
          {
            isActive:false,
            material: '意外事故证明',
            pathway: '如交通事故应向交警部门索要“交通事故责任认定书”； 若是工伤事故由相关单位开具工伤证明。'
          },
          {
            isActive:false,
            material: '死亡证明、户籍注销证明、殡葬证明',
            pathway: '在医院身故，医院会出具“居民医学死亡证明书”；若在医院以外的地方身故，公安机关会核实死亡原因，并出具“死亡证明”；户籍注销证明由户口所在地户籍管理部门出具；殡葬证明（包括火化证或土葬证明）由殡葬管理部门出具，土葬证明可由相关单位出具。'
          }
        ]
			}
    },
    methods:{
      goBack() {
        this.$router.push("/claims/serviceGuide");
      },
      toAnswer(index){
        let materials = this.path[index];
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
		color: #FFB30E;
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
    }
    .oneQuestion {
      width: 100%;
      height: 5px;
      background: rgb(231, 231, 231);
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    ul {
      margin-left: 15px;
      margin-right: 15px;
    }
    ul li {
      line-height: 16px;
      padding-left: 5px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

	}
</style>
