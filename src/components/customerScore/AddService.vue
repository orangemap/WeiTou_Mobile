<!-- 增值服务指南界面 -->
<template>
	<div>
		<Headerbtns title="展业工具">
			<div slot="left" class="back" @click='goBack'>
        <i class="fa fa-angle-left" style='font-size:1.8rem;color:#FDB92C'></i>
      </div>
		</Headerbtns>
		<div class='details'>
      <!-- 标题部分 -->
      <div class="titles">
        <label class="question">
          <div style="width:70%;float:left;text-align: start;">
            <picker :values="selectResult" v-model="selectResult":items="dict.serviceList.service.item" code="code" text="text"></picker>
          </div>
          <div style="width:10%;float:right;">
            <img style="width:1.5rem;height:1.5rem;margin-top: 0.2rem;" src="static/img/customerScore/questionIcon.png">
          </div>
        </label>
        <div style="display:block;font-size:1.5rem;margin-top:4rem;font-weight:bold;">增值服务指南</div>
        <div :class="[isIntegralSystem?'introduce1':'introduce2']" style="margin-left:6%;" @click="integralSystem()">积分体系介绍</div>
        <div :class="[isIntegralSystem?'introduce2':'introduce1']" style="margin-left:4%;" @click="addedServices()">增值服务介绍</div>
      </div>
      <!-- 积分体系介绍 -->
      <div v-show="isIntegralSystem" class="integralSystem">
        <div class="tipss">{{integralSystemTips}}</div>
        <div style="line-height:1rem;margin-left:5%;margin-right:5%;padding: 5px;">
          <span style="font-size:1rem;font-weight:bold;color:#FEBA24;">积分体系的构成：</span>
          <span style="font-size:0.8rem;">光大永明人寿积分体系中设置了</span>
          <span style="font-size:0.9rem;font-weight:bold;color:#FEBA24;">级别积分</span>
          <span style="font-size:0.8rem;">和</span>
          <span style="font-size:0.9rem;font-weight:bold;color:#FEBA24;">消费积分</span>
          <span style="font-size:0.8rem;">两大类别。</span>
        </div>
        <!-- 级别积分 -->
        <div style="width:100%;text-align: center;margin-top:1rem;">
          <img style="width:50%;" src="static/img/customerScore/integralSystemIcon.png" alt="">
        </div>
        <div style="width:88%;background:#FBFEC7;margin-left:6%;position:relative;bottom:1rem;z-index:-1;">
          <div class="levelOfIntegral">
            <p v-for="(item,index) in levelOfIntegral" v-html="item" style="margin-top:0.6rem;">{{item}}</p>
            <div style="font-size:0.9rem;margin-top:0.7rem;font-weight:bold;">客户级别划分标准：</div>
          </div>
          <div style="width:100%;color:#96580D;">
            <table style="width:100%;">
              <tr style="color:#fff;background:#FEBA24;height:2rem;font-size:0.9rem;">
                <td style="width:40%;padding-left:0.5rem;line-height:2rem;">客户级别</td>
                <td style="width:60%;padding-left:0.2rem;line-height:2rem;">客户级别</td>
              </tr>
              <tr>
                <td style="width:40%;padding-left:0.5rem;">普通客户</td>
                <td style="width:60%;padding-left:0.2rem;white-space:nowrap;">3000积分以下</td>
              </tr>
              <tr>
                <td style="width:40%;padding-left:0.5rem;">三星级客户</td>
                <td style="width:60%;padding-left:0.2rem;white-space:nowrap;">3000积分（含）-5000积分</td>
              </tr>
              <tr>
                <td style="width:40%;padding-left:0.5rem;">四星级客户</td>
                <td style="width:60%;padding-left:0.2rem;white-space:nowrap;">5000积分（含）-10000积分</td>
              </tr>
              <tr>
                <td style="width:40%;padding-left:0.5rem;">五星级客户</td>
                <td style="width:60%;padding-left:0.2rem;white-space:nowrap;">10000积分（含）以上</td>
              </tr>
            </table>
          </div>
        </div>
        <!-- 消费积分 -->
        <div style="width:100%;text-align: center;margin-top:1.5rem;">
          <img style="width:50%;" src="static/img/customerScore/addedServicesIcon.png" alt="">
        </div>
        <div style="width:88%;background:#FBFEC7;margin-left:6%;position:relative;bottom:1rem;z-index:-1;">
          <div class="consumptionPoints">
            <p v-for="(item,index) in consumptionPoints" v-html="item" style="margin-top:0.6rem;">{{item}}</p>
          </div>
        </div>
        <!-- 积分查询和兑换途径 -->
        <div style="font-size:1rem;margin-left:6%;font-weight:bold;">{{queryTipTitle}}</div>
        <div style="margin:0.5rem 6% 0 6%;line-height:0.9rem;">{{queryTip}}</div>
        <div style="width:88%;height:5rem;margin:1rem 6% 1rem 6%;background:#E2E2E4;border-radius:4%;overflow:hidden;">
          <div style="width:28%;border-right:1px #BEBEC0 solid;float:left;box-sizing: border-box;text-align:center;margin-top:0.5rem;">
            <p style="margin-bottom:0.3rem;">官方微信</p>
            <img style="width:3rem;height:3rem;" src="static/img/customerScore/weixin.png">
          </div>
          <div style="width:72%;float:left;box-sizing: border-box;text-align:center;margin-top:0.8rem;">
            <p style="margin-bottom:0.8rem;">官方网站</p>
            <a href="http://www.sunlife-everbright.com/" style="margin-bottom:0.3rem;color:#158FD3;text-decoration:underline;">www.sunlife-everbright.com</a>
            <p style="color:#158FD3;">客户服务</p>
          </div>
        </div>
      </div>
      <!-- 增值服务介绍 -->
      <div  v-show="!isIntegralSystem" style="font-size:0.8rem;">
        <div style="text-indent: 2em;margin:1rem 6% 1rem 6%;line-height:1rem;">{{addedServicesTips}}</div>
        <table style="width:100%;background:#FEBA24;color:#fff;">
          <tr align="center" style="border-top: 1px solid #FFFFFF;border-left: 1px solid #FFFFFF;">
            <td rowspan="2" style="width:45%;text-align:left;vertical-align:middle;padding-left:6%;border-top: 1px solid #FFFFFF;border-left: 1px solid #FFFFFF;">增值服务项目</td>
            <td colspan="3" style="width:55%;text-align:center;border-top: 1px solid #FFFFFF;border-left: 1px solid #FFFFFF;">客户级别</td>
          </tr>
          <tr align="center" style="border-top: 1px solid #FFFFFF;border-left: 1px solid #FFFFFF;">
            <td style="width:17%;text-align:center;border-top: 1px solid #FFFFFF;border-left: 1px solid #FFFFFF;">三星级</td>
            <td style="width:17%;text-align:center;border-top: 1px solid #FFFFFF;border-left: 1px solid #FFFFFF;">四星级</td>
            <td style="width:21%;text-align:center;border-top: 1px solid #FFFFFF;border-left: 1px solid #FFFFFF;">五星级</td>
          </tr>
        </table>
        <div style="width:100%;" v-for="(item,index) in servicesList">
        	<table style="width:100%;border-bottom: 1px solid rgb(173, 173, 173)">
	          <tr align="center">
	            <td 
	            	@click="select(index)"
	            	rowspan="2" 
	            	style="width:45%;
	            	text-align:left;
	            	vertical-align:middle;
	            	border-right: 1px solid rgb(173, 173, 173);
	            	padding-left:6%;
	            	color: rgb(84, 164, 220);
    				text-decoration: underline;">
    				{{item.service}}
	            </td>
	          </tr>
	          <tr align="center">
	            <td style="width:17%;text-align:center;border-right: 1px solid rgb(173, 173, 173);">
	            	<img :class="item.isThreeStar ? 'yesStar' : 'noStar'" src="static/img/customerScore/yellowStar.png">
	            </td>
	            <td style="width:17%;text-align:center;border-right: 1px solid rgb(173, 173, 173);">
	            	<img :class="item.isFourStar ? 'yesStar' : 'noStar'" src="static/img/customerScore/yellowStar.png">
	            </td>
	            <td style="width:21%;text-align:center;border-right: 1px solid rgb(173, 173, 173);">
	            	<img :class="item.isFiveStar ? 'yesStar' : 'noStar'" src="static/img/customerScore/yellowStar.png">
            		<p style="font-size: smaller;" v-if="index == 8">(高端)</p>
	            </td>
	          </tr>
	        </table>
        </div>
        <!-- 注 -->
        <div style="height:3rem;line-height:3rem;color:#CE4857;margin-left:6%;">
          <p>注：点击服务项目，查看相关信息。</p>
        </div>
        <!-- 服务名称 -->
        <div style="width:90%;margin-left:6%;">
          <p style="font-weight:bold;">{{serviceTitle}}</p>
        </div>
        <!-- 服务内容 -->
        <div class="content_addservice">
          <p v-for="detail in serviceDetail" v-html="detail">
            {{detail}}
            <div style="text-indent: 0;" v-if="index == 9">
              <p style="font-weight:bold;text-indent: 2em;">基因检测项目：</p>
              <table style="margin-top: 0.1rem;">
                <tr align="center">
                  <td rowspan="2" style="line-height:0.9rem;width:24%;border:1px #000 solid;vertical-align:middle;">常见肿瘤基因检测</td>
                  <td style="line-height:0.9rem;width:12%;border:1px #000 solid;vertical-align:middle;">男性</td>
                  <td style="line-height:0.9rem;width:12%;border:1px #000 solid;vertical-align:middle;">9项</td>
                  <td style="line-height:0.9rem;border:1px #000 solid;text-align:left;vertical-align:middle;">肺癌、胃癌、肝癌、结直肠癌、食管癌、胰腺癌、前列腺癌、膀胱癌、肾癌</td>
                </tr>
                <tr align="center">
                  <td style="line-height:0.9rem;width:12%;border:1px #000 solid;vertical-align:middle;">女性</td>
                  <td style="line-height:0.9rem;width:12%;border:1px #000 solid;vertical-align:middle;">10项</td>
                  <td style="line-height:0.9rem;border:1px #000 solid;text-align:left;vertical-align:middle;">肺癌、胃癌、肝癌、结直肠癌、食管癌、胰腺癌、乳腺癌、宫颈癌、子宫内膜癌、卵巢癌</td>
                </tr>
              </table>
            </div>
            <div style="text-indent: 0;margin:0.2rem 2rem auto 2rem;" v-if="index == 14">
              <table style="border:1px #000 solid;margin-top: 0.1rem;">
                <tr style="height:1.5rem;">
                  <td rowspan="2" style="width:5%;padding-left:1rem;border:1px #000 solid;vertical-align:middle;">个人业务</td>
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">财务管理及传承</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">婚姻与继承</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td rowspan="3" style="width:5%;padding-left:1rem;border:1px #000 solid;vertical-align:middle;">公司业务</td>
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">公司事务</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">企业并购</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">私募与风控</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td rowspan="2" style="width:5%;padding-left:1rem;border:1px #000 solid;">国际业务</td>
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">国际贸易</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">境外投资</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:5%;padding-left:1rem;border:1px #000 solid;">诉讼业务</td>
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">诉讼与仲裁</td>
                </tr>
              </table>
            </div>
            <div style="text-indent: 0;margin:0.2rem 2rem auto 2rem;" v-if="index == 15">
              <table style="border:1px #000 solid;margin-top: 0.1rem;">
                <tr style="height:1.5rem;">
                  <td rowspan="4" style="width:5%;padding-left:1rem;border:1px #000 solid;vertical-align:middle;">个人税务</td>
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;vertical-align:middle;">高净值个人境内税务</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">个人境外纳税申报</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">移民税务筹划方案</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">境外资产管理</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td rowspan="4" style="width:5%;padding-left:1rem;border:1px #000 solid;vertical-align:middle;">企业税务</td>
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">企业境内外纳税申报</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">企业日常运营</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">企业并购重组</td>
                </tr>
                <tr style="height:1.5rem;">
                  <td style="width:8%;padding-left:1rem;border:1px #000 solid;">企业投融资</td>
                </tr>
              </table>
            </div>
          </p>
        </div>
      </div>
      <div style="width:100%;height:0.5rem;background:#E2E2E4"></div>
    </div>
    <tabBar :isHome="false" :addServices="false"></tabBar>
	</div>
</template>

<script>
  import Headerbtns from '@/components/common/newHeader/newheader.vue'
  import picker from '../common/Picker.vue'
  import tabBar from '../common/TabBar.vue'
  import serviceList from '../../../static/dict/service_info_sunlife.json'
	export default {
    name:'addServices',
		components:{Headerbtns,tabBar,picker},
		data() {
			return {
        toggle:{
          popupVisible1:false,
          popupVisible2:false,
          popupVisible3:false,
          popupVisible4:false,
          popupVisible5:false,
          popupVisible6:false,
          popupVisible7:false,
          popupVisible8:true,
        },
        selectResult:"8",
        isIntegralSystem: true,
        integralSystemTips: '为使广大客户一同分享光大永明人寿的发展成果，光大永明人寿集中优质服务资源，开行业先河推出“V•爱”客户尊享服务计划。该计划依托全新的多维度积分体系，全面升级VIP专属服务，使VIP客户不仅免费享有更多高品质专属服务项目，还可利用手中积分随心兑换，尽享光大永明人寿的专业服务与贴心呵护。',
        // 级别积分
        levelOfIntegral: [
          '将您所缴首\续期保费金额、购买保单次数、同一保单续保次数分别折算成积分分值后，再进行累加得到的总分即为级别积分。该积分用于划分客户级别，并据此配置差异化的服务项目。详情如下：',
          '计算方式：级别积分=保费积分+忠诚积分',
          '&nbsp;&nbsp;（1）<b>保费积分：</b>将您所缴首期保费和历年续期保费分别折算并累加而成。',
          '&nbsp;&nbsp;（2）<b>忠诚积分：</b>',
          '&nbsp;&nbsp;&nbsp;&nbsp;a. 您作为投保人自第二次购买我司产品开始，每次可额外获赠200积分，不限次数。',
          '&nbsp;&nbsp;&nbsp;&nbsp;b. 同一张保单每连续续保五年可额外获赠100积分。'
        ],
        // 消费积分
        consumptionPoints: [
          '将上述级别积分与您参与我司各项活动所赚取的积分相加，即为消费积分。该积分可用于兑换我司提供的各类好礼，其增加或减少对于级别积分和客户级别均不构成影响。计算方式如下：',
          '<b>消费积分=保费积分+忠诚积分+活动积分+特殊项目积分。</b>',
          '&nbsp;&nbsp;<b>（1）活动积分：</b>',
          '&nbsp;&nbsp;&nbsp;&nbsp;a. 绿色环保积分：如您提供本人电子邮箱并取消纸质信函可获赠50积分，每位客户仅赠送一次，如后期任一保单恢复纸质信函，扣回已赠送的50积分。',
          '&nbsp;&nbsp;&nbsp;&nbsp;b. 完整信息积分：如您将本人名下保单中的手机号、地址、电子邮箱、职业类别信息填写完整可获赠100积分，同一客户限赠送一次。',
          '如您将本人名下保单中的手机号、地址、电子邮箱其中任意一项或多项进行更新，每次可获赠50积分，每季度累积上限为100积分。',
          '&nbsp;&nbsp;&nbsp;&nbsp;c. 官网、官微注册积分：如您在光大永明官网或官微注册成功，可分别获赠100积分。',
          '&nbsp;&nbsp;（2）特殊项目积分：我司将不定期举办各类活动，如您参与即可获赠相应积分。'
        ],
        queryTipTitle: '积分查询和兑换途径：',
        queryTip: '您可通过光大永明人寿官方微信、官方站网、全国统一客服热线和各机构柜面等途径，进行积分查询和兑换使用。',
        // 增值服务
        addedServicesTips: '作为“健康保障”和“健康管理”融合发展理念的倡导者，光大永明人寿整合各方优质服务资源，为不同需求的客户提供多样化个性化的服务项目，用我们最热情的服务换取您满意的微笑。',
        servicesList: [
          {
            service: '7*24小时电话医生',
            serviceName:'',
            isFiveStar: true,
            isFourStar: true,
            isThreeStar: true,
            detail: [
              '只需动动手指拨通电话，客户就可以随时享受到我们提供的24小时全科医生在线咨询服务，包括个性化健康咨询和常见疾病咨询（如就医指导、心理指导、特殊人群指导等），接线医生均持有国家卫生部颁发的执业医师资格证书，且具有超过十年临床经验的主治医师级别以上资质，全天候为客户的健康保驾护航。'
            ]
          },
          {
            service: '国内医疗紧急救援',
            serviceName:'',
            isFiveStar: true,
            isFourStar: true,
            isThreeStar: true,
            detail: [
              '若客户在国内因旅游或出差（单次外出不超过90天）遭受意外伤害事故或患急性病需要救助时，可享受我们提供的24小时国内医疗紧急救援服务。',
              '具体项目：',
              '（1）医疗机构推介',
              '若客户感觉身体不适或生病，我们会根据客户的要求及身体状况、病情等，介绍并推荐当地符合治疗要求的、经我们审查认证或与我们有合作关系的医疗机构。',
              '（2）协助安排就医',
              '若客户遭遇意外事故或因疾病需要住院，我们会协助安排客户住院治疗，发生的相关费用需由客户承担。',
              '（3）紧急医疗转送',
              '若客户遭遇意外事故或因疾病住院，据具体病情，经我们提供的医师判断所在医院无法处理时，我们可安排医疗护送小组将客户就近转移至最适合的医院，并支付必要的交通费用及在安排服务过程中发生的附属费用。',
              '（4）医疗转运回居住地',
              '当客户完成初步治疗后，对于经医师判断符合转送条件的客户，我们将安排适当的交通工具将其送回居住地继续治疗，并支付相关费用。我们负责提供适当的通讯和语言翻译支持，同时提供必要的移动医疗设备及专业医疗护理人员。',
              '（5）遗体/骨灰运送回居住地',
              '若客户在国内旅行时因意外事故不幸身故，我们将根据客户的遗愿或其直系亲属的愿望，安排运送其遗体或骨灰返回居住地并支付费用, 也可应家属要求安排在事发当地安葬。棺木/骨灰罈规格需要符合航空运输标准。此项费用不包含购买墓地、宗教仪式、鲜花、告别仪式、或其他非必需的费用。',
              '（6）未成年子女返回居住地',
              '若客户因遭受意外伤害、紧急医疗转运或遭遇身故而导致随行未满十六周岁（含）的未成年子女无人照料，我们将安排并支付其未成年子女乘坐最近途径的飞机（限一张单程经济舱机票）返回居住地。必要时，我们还将安排并支付护送人员随行返回。',
              '（7）紧急口讯传递',
              '若客户发生紧急情况或伤病事故，我们可根据客户的要求将情况尽快通知相关人员。',
            ]
          },
          {
            service: '三甲医院非指定专家门诊预约',
            serviceName:'三甲医院专家门诊快速预约',
            isFiveStar: true,
            isFourStar: true,
            isThreeStar: true,
            detail: [
              '我们为客户提供快速预约全国三甲医院专家门诊服务，在客户申请后我们将安排专人与客户联系了解具体信息，并尽快协助客户完成就诊。',
              '具体包括：',
              '项目一：三甲医院非指定专家门诊预约（不可指定医院科室及专家）',
              '项目二：三甲医院指定医院及科室专家门诊预约（可指定医院科室，不可指定专家）',
              '项目三：三甲医院指定专家门诊预约及全程导医（可指定医院科室及专家，就诊当日有一名健康助理全程陪同，协助客户办理就诊手续，并根据客户的需求提供健康指导）',
            ]
          },
          {
            service: '国内二次诊疗',
            serviceName:'',
            isFiveStar: true,
            isFourStar: true,
            isThreeStar: false,
            detail: [
              '我们根据客户提供的完整医疗诊断信息和资料，结合实际病情，推荐会诊专家供客户选择，安排专人将客户的完整医疗资料发送至指定专家，专家诊断确认后，我们将诊断和治疗意见及时反馈给客户，供后续就医治疗参考使用。'
            ]
          },
          {
            service: '国际二次诊疗',
            serviceName:'',
            isFiveStar: true,
            isFourStar: true,
            isThreeStar: false,
            detail: [
              '我们根据客户提供的完整医疗诊断信息和资料，结合实际病情，在全球优选医疗网络中，确定一家医疗机构为您提供二次诊疗建议，我们负责将完整医疗资料翻译后寄往指定医疗机构由专家进行会诊，会诊后将二次诊疗建议再次翻译反馈给客户，并提供报告解读服务。'
            ]
          },
          {
            service: '国际旅行管家',
            serviceName:'',
            isFiveStar: true,
            isFourStar: true,
            isThreeStar: false,
            detail: [
              '我们可根据客户的境外旅行计划，提供有关目的地的实用资讯，如在行程中发生特殊状况，我们还可协助为客户重新规划路线、追踪遗失行李或补发证件等，助客户畅享欢乐旅途。',
              '（1）旅行信息资讯',
              '具体包括：',
              '护照和签证要求；',
              '当地疫苗接种的要求和需要；',
              '当地天气；',
              '当地语言；',
              '汇率',
              '（2）大使馆/领事馆信息',
              '根据客户的旅行计划，我们可提供中国驻目的地国家大使馆或领事馆的电话、地址；目的地国家驻中国大使馆或领事馆的电话、地址。',
              '（3）重新安排旅行计划：若您因紧急情况不能按原计划的线路继续旅行，我们可协助客户重新安排航班、酒店及旅行计划。',
              '（4）护照遗失补发：若客户在国外旅行时遗失或被盗重要的身份证件如护照、旅行证件等，我们可向客户提供与补发手续相关的信息，并介绍适当的部门或机构，以便补发相关证件。',
              '（5）行李延误、遗失追踪：当客户搭乘商业航班旅行时，在旅途中若发生行李丢失或延误，我们可介绍相关部门如航空公司、海关等，以协助客户找回行李。'
            ]
          },
          {
            service: '国际医疗紧急救援',
            serviceName:'',
            isFiveStar: true,
            isFourStar: true,
            isThreeStar: false,
            detail: [
              '若客户在国外因旅游或出差（单次外出不超过90天）遭受意外事故或突发疾病需要救助时，可享受我们提供的24小时国际医疗紧急救援服务。',
              '（1）医疗机构介绍和建议',
              '根据客户要求，我们可为客户提供医疗服务提供者的姓名或名称、地址、电话号码及工作时间，由客户自主选择。我们的服务基于协助安排或者转介绍，不负责为客户提供医疗诊断和治疗服务，因治疗产生的费用需由客户自行承担。',
              '（2）协助安排就医住院',
              '根据客户身体状况及病情，我们可协助客户在当地尽可能符合治疗要求的、经我们审查认证或有合作关系的医疗机构就医。如病情严重，我们将协助安排该客户住院治疗。',
              '当客户在境外遭遇紧急情况需要住院时，我们将安排救护车把客户就近转入当地医院，并协助办理住院手续。',
              '（3）住院期间医疗费用担保或垫付及监控',
              '当客户在境外需要住院治疗时，我们可根据客户的要求担保或垫付其在住院期间的医疗费用，在符合保密及授权条件和可能的情况下，救援提供方医生会联系客户的主治医生，对客户住院期间的医疗情况进行跟踪监控。',
              '提供住院费用的财务担保需基于如下前提：需事先从客户或者从客户家属处获得充分的财务支付的保证后方可进行。由此产生的医疗费用由客户自行承担。',
              '（4）紧急医疗翻译服务',
              '在紧急情况下，我们可通过电话为客户提供紧急医疗翻译服务。',
              '（5）递送必需药物和医疗用品',
              '在有医疗必要的情况下，我们可安排递送客户护理、治疗所必需的，但在客户所在地无法获得的药品及医疗用品，递送须遵守当地的法律规定，发生的相关费用需由客户承担。',
              '（6）紧急医疗转送',
              '若客户在国外遭遇意外事故或因疾病住院，根据具体病情，经我们提供的医师判断所在医院无法处理时，我们可安排医疗护送小组将客户就近转移至最适合的医院，但不确保位于客户国内。我们将支付必要的交通费用以及在其安排的该服务过程中发生的附属费用。',
              '（7）医疗转运回国',
              '当客户于国外完成初步治疗后，经我们认证的医师判断符合转送条件时，我们将安排适当的交通工具将其转送回国，同时提供合适的通讯和语言翻译支持，并根据实际情况提供必要的移动医疗设备及专业医疗护理人员。我们将支付必要的交通费用及该服务过程中通常发生的附属费用。',
              '（8）遗体/骨灰运送回国',
              '若客户在国外因意外事故不幸身故，我们将根据客户的遗愿或其直系亲属的愿望，安排并支付运送其遗体或骨灰返回国内的费用, 也可应家属要求安排在事发当地安葬。棺木/骨灰罈规格须符合国际航空运输标准。此项费用不包括购买墓地、宗教仪式、鲜花、告别仪式、或任何其他非必需的费用。',
              '（9）未成年子女返回居住地',
              '若客户因遭受意外伤害、紧急医疗转运或遭遇身故而导致随行未满十六周岁（含）之未成年子女无人照料，我们将安排并支付其未成年子女乘坐最近途径的飞机（限一张单程经济舱机票）返回国内，但原订机票应交由我们处理。必要时，我们还将安排护送人员随行回国并支付费用。',
              '（10）消息传递',
              '若客户在国外发生紧急情况或伤病事故，我们可根据客户的要求将情况尽快通知相关人员。'
            ]
          },
          {
            service: '国际旅行紧急救援',
            serviceName:'',
            isFiveStar: true,
            isFourStar: true,
            isThreeStar: false,
            detail: [
              '若客户在国际旅行途中遭遇紧急状况，可享受我们提供的24小时紧急救援服务，以解客户在旅途中的燃眉之急。',
              '（1）紧急口讯传递和文件递送',
              '若客户在国外发生紧急伤病情况，我们可协助尽快通知家属。也可根据客户的要求协助将紧急文件递送给客户的亲友或同事，费用需由客户自行承担。',
              '（2）紧急电话翻译/介绍当地翻译',
              '当客户在国外旅行途中遇到紧急情况时，我们可通过电话为客户提供免费的短时电话翻译服务。我们也可介绍当地翻译人员，包括所在地址、电话和工作时间等信息，雇佣翻译的费用需由客户自行承担。',
              '（3）紧急法律援助',
              '我们可按照客户的要求提供当地享有盛誉的律师事务所及其他法律从业者的名称、地址和电话。相关费用需由客户自行承担。',
              '（4）协助安排酒店住宿',
              '若客户在国外因突发情况住院，需要亲友陪同时，我们可协助安排该亲友在境外酒店住宿。发生的相关费用需由客户自行承担。'
            ]
          },
          {
            service: '健康体检',
            serviceName: '中端/高端健康体检',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: ['我们与国内数百家顶级体检中心及医院合作，甄选体检套餐，在常规体检项目的基础上，增设了心脑血管疾病、甲状腺功能、口腔、眼科专项、女性专项等深度检测项目，客户可以自行指定时间至任一机构参检，在体检完毕后我们会为客户提供详细报告。']
          },
          {
            service: '深度基因检测',
            serviceName: '深度基因检测（与高端体检二选一）',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '我们与国内技术领先的基因检测公司合作，为客户制定个性化的基因检测服务计划，采用安全的唾液检测方式，项目涵盖了呼吸、消化、泌尿、生殖等人体四大系统，通过全方位检测，协助客户解码先天遗传方面存在的缺陷和风险，在环境因素上给客户以针对性的预防建议，防患于未然。',
              '预约服务成功后我们会为客户寄送物料包，客户可自行取样并将样本寄回指定地点（选择到付），专业机构检测后为客户送达报告并由专家提供个性化报告解读。全程采用快递服务（费用均由我们承担），安全便捷，且样本不会因为寄送时长而影响检测结果。'
            ]
          },
          {
            service: '三甲医院指定医院及科室专家门诊预约',
            serviceName:'三甲医院专家门诊快速预约',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '我们为客户提供快速预约全国三甲医院专家门诊服务，在客户申请后我们将安排专人与客户联系了解具体信息，并尽快协助客户完成就诊。',
              '具体包括：',
              '项目一：三甲医院非指定专家门诊预约（不可指定医院科室及专家）',
              '项目二：三甲医院指定医院及科室专家门诊预约（可指定医院科室，不可指定专家）',
              '项目三：三甲医院指定专家门诊预约及全程导医（可指定医院科室及专家，就诊当日有一名健康助理全程陪同，协助客户办理就诊手续，并根据客户的需求提供健康指导）'
            ]
          },
          {
            service: '三甲医院指定专家门诊预约及全程导医',
            serviceName:'三甲医院专家门诊快速预约',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '我们为客户提供快速预约全国三甲医院专家门诊服务，在客户申请后我们将安排专人与客户联系了解具体信息，并尽快协助客户完成就诊。',
              '具体包括：',
              '项目一：三甲医院非指定专家门诊预约（不可指定医院科室及专家）',
              '项目二：三甲医院指定医院及科室专家门诊预约（可指定医院科室，不可指定专家）',
              '项目三：三甲医院指定专家门诊预约及全程导医（可指定医院科室及专家，就诊当日有一名健康助理全程陪同，协助客户办理就诊手续，并根据客户的需求提供健康指导）'
            ]
          },
          {
            service: '住院快速协调',
            serviceName:'住院、手术快速协调',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '若医生已为客户开具需要住院或手术的证明，我们会根据客户的自身临床病征，参照客户的需求推荐和预约全国三甲医院，安排住院治疗或手术治疗服务，并全程特派健康助理（具有医学从业经验的护士或医生）陪同，关注客户的治疗进程，助客户早日恢复健康。',
              '<b>健康助理为客户提供：</b>',
              '<b>住院探视：</b>入院后提供探视服务，并根据客户的病情与专家沟通相关治疗方案。',
              '<b>出院陪同：</b>出院时，健康助理全程陪同，并协助客户办理出院相关手续。',
              '<b>出院问候：</b>出院后， 健康助理会通过电话跟进客户的康复情况，并给出恰当的保健建议。'
            ]
          },
          {
            service: '手术快速协调',
            serviceName:'住院、手术快速协调',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '若医生已为客户开具需要住院或手术的证明，我们会根据客户的自身临床病征，参照客户的需求推荐和预约全国三甲医院，安排住院治疗或手术治疗服务，并全程特派健康助理（具有医学从业经验的护士或医生）陪同，关注客户的治疗进程，助客户早日恢复健康。',
              '<b>健康助理为客户提供：</b>',
              '<b>住院探视：</b>入院后提供探视服务，并根据客户的病情与专家沟通相关治疗方案。',
              '<b>出院陪同：</b>出院时，健康助理全程陪同，并协助客户办理出院相关手续。',
              '<b>出院问候：</b>出院后， 健康助理会通过电话跟进客户的康复情况，并给出恰当的保健建议。'
            ]
          },
          {
            service: '私人法律顾问',
            serviceName:'',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '我们与国内知名律师事务所合作，聘请专业律师及资深企业法律顾问团队，全方位为客户提供私人定制的法律咨询服务。',
              '具体包括：'
            ]
          },
          {
            service: '私人税务顾问',
            serviceName:'',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '我们与世界四大顶级会计师事务所之一合作，由资深税务专家为客户提供一对一私享咨询服务，协助客户设计纳税方案，充分享受税收优惠政策。',
              '（1）不定期为客户提供税务沙龙、圆桌讨论会等专题讲座；',
              '（2）为客户提供有关家庭、金融、房地产、公司企业、信托、移民等方面的中国税收政策、办税程序及有关涉税事项问题的一般税务咨询；',
              '（3）对于中国大陆以外的国家和地区，税务顾问会就该国/地区税收居民的界定，税收申报制度、应税收入、税率的法规层面问题为您提供一般税务咨询。',
              '具体包括：'
            ]
          },
          {
            service: '专业汽车代驾',
            serviceName:'',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '我们与专业代驾服务公司合作，免费为客户提供代驾电子代金券，只需通过手机操作即可完成预约，为客户的出行生活增添更多便利！'
            ]
          },
          {
            service: '生日鲜花速递',
            serviceName:'',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '每年在客户的生日来临之际，我们都会奉上一束鲜花，表达最诚挚的关怀与祝福！客户于生日前会收到短信提示，可通过我司官方微信兑换专属生日礼遇。'
            ]
          },
          {
            service: '国内汽车道路救援',
            serviceName:'',
            isFiveStar: true,
            isFourStar: false,
            isThreeStar: false,
            detail: [
              '若客户在国内因汽车行驶过程中遭受意外伤害事故或汽车出现故障需要救助时，可享受我们提供的24小时国内汽车道路紧急救援服务。',
              '具体项目如下：',
              '（1）紧急送油（1次/年）',
              '若客户的车辆发生行驶途中燃油耗尽的情况，我们将派遣技术人员提供紧急送油服务，每次最多送油5升，油费需由客户自行承担（油价参考当日购买燃油的加油站实际价格）。',
              '（2）汽车服务供应商介绍、推荐、建议',
              '若客户的汽车因故障或事故不能继续行驶，我们会为客户介绍事发地点附近的维修点。',
              '（3）路边快修（1次/年）',
              '当客户的汽车发生故障或事故，且符合快速维修条件的，我们可在30分钟内安排汽车维修工到达现场，为客户提供路边快修服务，更换零配件的相关费用需由客户自行承担。',
              '（4）紧急拖车服务（1次/年）',
              '若客户的汽车发生故障或事故不能行驶，且不能通过快修恢复正常，我们将协助安排将汽车拖至客户指定的维修地点修理，服务区域限同城范围。该服务不包括交通或其他部门规定限制第三方道路救援活动的路段，以及在高速公路、隧道、大桥、高架道路等收费路段，所需通行费用需由客户自行承担。',
              '（5）继续旅行',
              '若车辆维修不能在当天完成，且当时客户身处异地，需要继续完成旅程或返回家中，我们将会根据客户的情况安排可供选择的交通方式。如客户要求在故障发生地等待车辆完成维修，我们可为客户安排或预订当地酒店。上述服务产生的费用由客户自行承担。',
              '（6）维修养护服务',
              '若客户的车辆需要维修，更换零部件或者保养服务，我们可为客户推荐附近的修理厂或4S店，产生的费用由客户自行承担。',
              '（7）全程监控服务',
              '我们可跟踪、监控路边快修、拖车等服务的全过程并及时与客户保持联系。',
              '（8）紧急口讯传达',
              '当客户的车辆发生问题不能继续行驶时，我们可按照客户要求向相关人员转达口讯。',
              '（9）安排紧急医疗救援',
              '若客户在驾车途中遭受意外伤害或突发疾病等并入住当地医院，且当地医疗条件不能够满足客户的治疗需求，我们将根据客户的情况，协助安排将其转送至可提供适当医疗服务的最近城市的医院，并在转送过程中安排医疗护送人员。由此产生的费用由客户自行承担。',
              '（10）安排转送回国内居住地',
              '在当地经过初步治疗、病情稳定后，我们将客户转送回国内居住地。由此产生的转运费用由客户自行承担。'
            ]
          },
        ],
        serviceTitle: '',
        serviceDetail: '',
        index: ''
      }
    },
    computed:{
      dict(){
        return {
          serviceList:serviceList
        }
      }
    },
    watch:{
      selectResult(val, oldval){
        if(val == "1"){
          this.toggle.popupVisible1 = true
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
          this.$router.push({
            path: '/service/serviceInfo',
            query: {
              val: val
            }
          });
        }else if(val == "2"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = true
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
          this.$router.push({
            path: '/service/serviceInfo',
            query: {
              val: val
            }
          });
        }else if(val == "3"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = true
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
          this.$router.push({
            path: '/service/serviceInfo',
            query: {
              val: val
            }
          });
        }else if(val == "4"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = true
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
          this.$router.push({
            path: '/service/serviceInfo',
            query: {
              val: val
            }
          });
        }else if(val == "5"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = true
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
          this.$router.push({
            path: '/service/serviceInfo',
            query: {
              val: val
            }
          });
        }else if(val == "6"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = true
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
          this.$router.push({
            path: '/service/serviceInfo',
            query: {
              val: val
            }
          });
        }else if(val == "7"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = true
          this.toggle.popupVisible8 = false
          this.$router.push({
            path: '/service/serviceInfo',
            query: {
              val: val
            }
          });
        }else if(val == "8"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = true
          this.$router.push("/customerScore/addService");
        }
      }
    },
		methods: {
			goBack() {
        this.$router.push("/home")
      },
      integralSystem() {
        this.isIntegralSystem = true
      },
      addedServices() {
        this.isIntegralSystem = false
      },
      /* 点击服务项目，查看相关信息 */
      select(index) {
        this.index = index
        if(this.servicesList[index].serviceName == '') {
          this.serviceTitle = this.servicesList[index].service
          this.serviceDetail = this.servicesList[index].detail
        } else {
          this.serviceTitle = this.servicesList[index].serviceName
          this.serviceDetail = this.servicesList[index].detail
        }
      }
    },
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
      htmlDOM.style.fontSize = this.screenWidth/20+'px'
      this.media.header($('.details'))
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		}
	}
</script>

<style lang="scss" scoped type="text/css">
  /* 隐藏滚动条 */
  .details::-webkit-scrollbar{
    display: none;
  }
  .details {
    margin-bottom: 53px;
  }
  /* 标题部分 */
  .titles {
    height: 10rem;
    width: 100%;
    color: #fff;
    background: url('./../../../static/img/customerScore/addedBackground.png') no-repeat;
    background-size: 100% 10rem;
    text-align: center;
    overflow: hidden;
  }
  .question {
    width: 80%;
    height: 2rem;
    line-height: 2rem;
    margin-top: 0.8rem;
    margin-left: 5%;
    padding-left: 5%;
    padding-right: 5%;
    background: #fff;
    font-size: 0.9rem;
    border-radius: 2%;
    float: left;
  }
  	.question>div>input{
    	border: 0px;
  	}
  .introduce1 {
    background: #fff;
    width: 42%;
    height: 2.5rem;
    float: left;
    position: relative;
    top: 2.1rem;
    color: #FEBA24;
    font-size: 1rem;
    line-height: 2.5rem;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
  }
  .introduce2 {
    background:rgba(233, 233, 233, 0.727);
    width: 42%;
    height: 2.5rem;
    float: left;
    position: relative;
    top: 2.1rem;
    color: #fff;
    font-size: 1rem;
    line-height: 2.5rem;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
  }
  /* 积分体系介绍 */
  .integralSystem {
    font-size: 0.8rem;
  }
  .tipss {
    margin: 1rem 5% 1rem 5%;
    line-height: 1rem;
    text-indent: 2em;
    padding: 5px;
  }
  .levelOfIntegral {
    color: #96580D;
    line-height: 1rem;
    box-sizing: border-box;
    padding: 1rem 1.1rem 0.5rem 1.1rem;
  }
  tr td {
    height: 1.5rem;
    line-height: 1.5rem;
    /*border-top: 1px solid rgb(173, 173, 173);
    border-left: 1px solid rgb(173, 173, 173);*/
  }
  .consumptionPoints {
    color: #96580D;
    line-height: 1rem;
    box-sizing: border-box;
    padding: 1rem 1.1rem 1rem 1.1rem;
  }
  /* 增值服务介绍 */
  .yesStar {
    width:0.8rem;
    height:0.8rem;
  }
  .noStar {
    width:0.8rem;
    height:0.8rem;
    visibility:hidden;
  }
  .content_addservice {
    margin: 0.8rem 6% 12% 6%;  /* 设置上右下左外边距 */
    text-indent: 2em; /* 首行缩进字符 */
    line-height: 0.9rem;
  }
</style>
