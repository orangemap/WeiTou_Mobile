<!--
	展业工具页面
-->
<template>
	<div class="content_page">
    <Headerbtns :title = page_title>
      <router-link to="/home" replace slot="left" class="back">
				<!-- <i class="fa fa-angle-left"></i> -->
			</router-link>
    </Headerbtns>
    <div id="maincontent" class="manage-main-contents">
        <div  class="service-guide">
          <div class="service-guide-left">服务指南:</div>
           <div class="service-guide-center">
              <picker  :values="selectResult"
                  v-model="selectResult"
                  :items="dict.serviceList.service.item"
                  code="code" text="text">
               </picker>
           </div>
         <div class="service-guide-right">
            <i @click="search" class="fa fa-search" aria-hidden="true" style="line-height: 40px;text-align:right;"></i>
         </div>
        </div>
        <!-- <mt-popup v-model="toggle.popupVisible1" position="bottom" style="width:100%;height:85%;overflow-y:auto"> -->
            <div id="content" v-if="toggle.popupVisible1">
              <p align="center" style="border-bottom: 1px solid black;margin-bottom: 30px;">运营管理部新契约业务规则-新契约客户投保应备资料 <span style="float: right;">版本号：3.0</span></p>
              <h1 align="center">新契约客户投保应备资料</h1>
              <div>
                <p>一、新契约投保时客户应完整提供投保应备资料，具体投保应备资料见下表（一）。</p>
                <p>表（一）：</p>
                <table width="100%" border="1" cellspacing="0" >
                 <thead>
                 <tr style="background: cornflowerblue;text-align: center;color: black;height: 10px;">
                    <td style="text-align: center;">产品类型</td>
                    <td style="text-align: center;">投保单</td>
                    <td style="text-align: center;">人身投保提示（仅针对一年期以上产品）</td>
                    <td style="text-align: center;width: 10%;">产品说明书</td>
                    <td style="text-align: center;width: 10%;">投资风险评估问卷</td>
                    <td style="text-align: center;width: 10%;">投连产品风险提示</td>
                    <td style="text-align: center;width: 10%;">银行自动转帐授权书</td>
                    <td style="text-align: center;width: 20%;">客户有效身份证明文件</td>
                    <td style="text-align: center;width: 10%;">其他投保所需资料</td>
                  </tr>
                 </thead>
                  <tbody>
                  <tr>
                    <td style="text-align: center;">普通寿险</td>
                    <td rowspan="4">
                      <p>1、凡客户在银邮兼业代理机构购买保险，均填写《人身保险投保单（健康告知A版）》；</p>
                      <p>2、客户投保家庭保单产品，使用《综合金融投保单（家庭保单版）》；</p>
                      <p>3、花旗银行业务：《花旗投保书（简单告知版）》、《 花旗投保书（复杂告知版）》</p>
                      <p>4、除此之外均填写《综合金融投保单（复杂版》</p>
                    </td>
                    <td rowspan="3">均需提供（客户投保时应单独签署并与其它投保资料一并提交）</td>
                    <td rowspan="3">
                      <p>1、光大永明瑞盈无忧定期重大疾病保险须提供，其他普通寿险均无需提供。</p>
                      <p>2、银保通线上业务需提供单独的经客户签字的产品说明书。光大永明鸿祥人生定期寿险、光大永明康爱无忧更新型防癌保险两款产品无需提供。</p>
                    </td>
                    <td style="text-align: center;">无需提供</td>
                    <td style="text-align: center;">无需提供</td>
                    <td rowspan="4">商业银行网点销售光大永明产品，须提供：《银行自动转账授权书》，分公司新契约须收取交回的《银行自动转账授权书》保险公司留存联并进行扫描留档。《银行自动转账授权书》目前分为两版，一版为花旗专用，一版为非花旗销售渠道使用。</td>
                    <td rowspan="4">
                      <p>以下情况需提供客户有效身份证明文件的复印件或影印件：</p>
                      <p>1、有效身份证件类型非中国居民身份证；</p>
                      <p>2、单张保单、单一被保险人转账方式交纳保险费达20万元（含）以上时，须提供。投保人、被保险人和法定继承人以外的指定身故受益人有效身份证明文件的复印件或影印件；</p>
                      <p>3、不符合常规的证件号及其他要求提供有效证件复印件或影印件的情况。</p>
                    </td>
                    <td rowspan="4">
                      <p>1、地方监管要求在投保时提供的资料，如天津、北京分公司《个人寿险销售确认书》、北京分公司《费用补偿型医疗保险产品提示》、重庆分公司《人身保险客户需求分析基准问卷》、深圳分公司《人身保险产品风险提示书》等。</p>
                      <p>2、商业银行网点销售人员应请投保人本人填写投保单，如投保人填写困难，可填写《投保单证填写委托授权书》，由投保人进行书面授权后，由银行的销售人员代填投保信息。客户投保时要求提供的其他资料。</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center;">分红/万能寿险</td>
                    <td style="text-align: center;">无需提供</td>
                    <td style="text-align: center;">无需提供</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;">投连寿险</td>
                    <td style="text-align: center;">须提供</td>
                    <td style="text-align: center;">须提供</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;">意外险</td>
                    <td style="text-align: center;">无需提供</td>
                    <td style="text-align: center;">无需提供</td>
                    <td style="text-align: center;">无需提供</td>
                    <td style="text-align: center;">无需提供</td>
                  </tr>
                  </tbody>
                </table>
                <br/>
              </div>
              <div>
                <p>二、留存客户有效身份证明文件应符合以下要求：</p>
                <p>&nbsp;&nbsp;1、认可为客户的有效身份证明文件具体见下表（二）。应遵照优先原则首先提供一级优先证件，无法提供一级优先证件时，可提供二级优先证件。</p>
                <p>&nbsp;&nbsp;2、客户有效身份证明文件复印件或影印件中应包含证件有效期内容。如复印件或影印件中无有效期的，按自身份证明文件签发日起30天内有效处理。</p>
                <p>&nbsp;&nbsp;3、客户有效身份证明文件复印件或影印件应清晰可辨，能清楚识别客户信息。</p>
                <p>&nbsp;&nbsp;4、按照《光大永明人寿保险有限公司反洗钱和反恐融资管理办法》(光保发[2011]312号)，对于销售渠道通过银行等第三方金融机构销售的保单，符合下列条件时，可接受销售渠道通过第三方金融机构识别客户身份，不再重复进行已完成的客户身份识别程序。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;（1）能够证明第三方按反洗钱法律、行政法规和《金融机构客户身份识别和客户身份资料及交易记录保存管理办法》的要求，采取了客户身份识别和身份资料保存的必要措施。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;（2）第三方为公司提供客户信息，不存在法律制度、技术等方面的障碍。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;（3）公司在办理业务时，能立即获得第三方提供的客户信息，还可在必要时从第三方获得客户的有效身份证件、身份证明文件的原件、复印件或者影印件。</p>
                <p>表（二）：</p>
                <table width="100%" border="1px" style="border-color: black" cellspacing="0">
                 <thead>
                    <tr style="background: cornflowerblue;text-align: center;color: black;height: 40px;">
                    <td style="text-align: center;width: 20%;" colspan="2">客户类别</td>
                    <td style="text-align: center;width: 20%;">一级优先证件</td>
                    <td style="text-align: center;width: 60%;" colspan="2">二级优先证件</td>
                  </tr>
                 </thead>
                    <tbody>
                      <tr>
                    <td style="text-align: center;" rowspan="3">居住在境内的中国公民</td>
                    <td>0-3周岁以内（不含3周岁）</td>
                    <td style="text-align: center;" rowspan="3">居民身份证（二代）</td>
                    <td>
                      <p>1、临时居民身份证、户口簿；</p>
                      <p>2、幼儿本人出生医学证明以及投保人有效身份证明文件。</p>
                    </td>
                  </tr>
                  <tr>
                    <td>3-16周岁以内（不含16周岁）</td>
                    <td>临时居民身份证、户口簿</td>
                  </tr>
                  <tr>
                    <td>16周岁及以上</td>
                    <td>临时居民身份证</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" colspan="2">香港、澳门居民</td>
                    <td style="text-align: center;">港澳居民往来内地通行证</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" colspan="2">台湾居民</td>
                    <td style="text-align: center;">台湾居民来往大陆通行证</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" colspan="2">外国公民</td>
                    <td style="text-align: center;">护照</td>
                    <td>获得在中国永久居留资格的外国人，还可出具外国人永久居留证。</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" colspan="2">居住在境内或境外的中国籍华侨</td>
                    <td style="text-align: center;">中国护照</td>
                    <td>华侨身份证明文件（如：国外的永久居留证）</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" colspan="2">中国人民解放军军人、中国人民武装警察</td>
                    <td style="text-align: center;">居民身份证（二代）</td>
                    <td>-</td>
                  </tr>
                    </tbody>
                </table>
              </div>
              <p align="center" style="border-top: 1px solid black;margin-top: 30px;;margin-bottom: 30px;"><span style="float: left;">受控文件未经批准不得外传</span><span style="float: right;">生效日期： 2016年10月8日</span></p>
            </div>
        <!-- </mt-popup> -->
        <!-- <mt-popup v-model="toggle.popupVisible2" position="bottom" style="width:100%;height:85%;overflow-y:auto"> -->
          <div id="content" v-if="toggle.popupVisible2">
            <h1 align="center">保全办理指南</h1>
            <div id="weixin_banli">
              <p class="headerBoldText">
                一、 微信办理
              </p>
              <p>1、关注“光大永明人寿”官方微信公众号或扫描二维码 <img class="erweimaImg" src="./../../../static/img/service/weixinlipei.png" alt="">进行注册绑定光大永明保单；</p>
              <p>2、保单查询：【自助服务】--【保单服务】，可查询其名下所购买的所有保单（第三方平台购买的保单除外）；</p>
              <p>3、业务办理：【自助服务】--【保单服务】，可办理变更类、收费类、付费类保全业务，具体办理规则详见下表：</p>
              <table width="100%" border="1px" style="border-color: black" cellspacing="0">
                <tr style="background: cornflowerblue;text-align: center;color: black;height: 40px;">
                  <td colspan="4">常见保单服务项目微信办理规则</td>
                </tr>
                <tr>
                  <td style="text-align: center;width: 10%;">序号</td>
                  <td style="text-align: center;width: 20%;">项目名称</td>
                  <td style="text-align: center;width: 20%;">申请资格人</td>
                  <td style="text-align: center;width: 50%;">办理规则</td>
                </tr>
                <tr>
                  <td style="text-align: center;">1</td>
                  <td>交费</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请时限：保单周年日前15天至宽限期末 </p>
                    <p>（2）申请条件：未产生保险费自动垫缴的有效保单</p>
                    <p>（3）如果保单正处于转账期间，请等待结果后再申请交费，以免重复划扣保费</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">2</td>
                  <td>复效</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请时限：保单中止期间 </p>
                    <p>（2）申请条件：投被保险人为同一人的传统险失效保单 </p>
                    <p>（3）健康告知无异常</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">3</td>
                  <td>联系方式变更</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请条件：有效保单 </p>
                    <p>（2）变更手机号码、家庭电话、电子邮箱时，需正确填写公司留存手机号码接收的短信验证码后方可办理</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">4</td>
                  <td>证件信息变更</td>
                  <td>投保人/被保险人</td>
                  <td>
                    <p>（1）变更证件号码仅支持身份证15位升18位</p>
                    <p>（2）支持所有证件的有效期更新</p>
                    <p>（3）投保人可申请变更投保人和被保险人的证件信息，被保险人仅可申请变更本人的证件信息</p>
                    <p>（4）身份证号升位及身份证有效期更新业务需拍照上传被变更人的身份证原件</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">5</td>
                  <td>银行账号变更</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请条件：有效保单 </p>
                    <p>（2）如果保单正处于转账期间，需等待结果后再申请银行账号变更 </p>
                    <p>（3）银行账号变更需通过人脸识别验证 </p>
                    <p>（4）通过微信完成银行账号变更的保单，交费方式同时变更为银行转账</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">6</td>
                  <td>退保</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）通过微信购买的保单，可申请退保（犹豫期内/犹豫期外），保险产品的犹豫期天数请以产品条款为准</p>
                    <p>（2）如果不是通过微信购买的保单，仅支持申请趸交产品的犹豫期外退保，通过财付通、网易宝等各大电商平台购买的理财产品需在当时购买的电商平台申请退保 </p>
                    <p>（3）未申请打印过增值税发票的保单</p>
                    <p>（4）投连险产品是以退保受理当天公布的最新价格进行试算，实际到账金额以退保受理日下一个评估日的投资单位卖出价格为基准进行计算</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">7</td>
                  <td>红利领取</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请条件：有效保单或满期保单，保单已产生可领取红利</p>
                    <p>（2）红利领取方式为现金红利或累积生息</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">8</td>
                  <td>保险金领取</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请条件：投被保险人为同一人，保单已产生可领取保险金 </p>
                    <p>（2）保单贷款期间不支持申请保险金领取</p>
                    <p>（3）满期保单如包含红利，可通过此项目直接申请领取全部满期金和红利</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">9</td>
                  <td>保单贷款</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请时限：犹豫期之后，不存在欠缴保费及利息的保险合同有效期内任意时间 </p>
                    <p>（2）申请条件：投被保险人为同一人，不含投连账户，保险条款中支持保单贷款功能的有效保单 </p>
                    <p>（3）贷款金额原则上不高于该合同当时现金价值净额的80%（除合同特殊约定外），且不得低于2000元 </p>
                    <p>（4）保单贷款期限不得超过180天，起息日为贷款到账日 </p>
                    <p>（5）根据国家相关税法规定，每次贷款需征收贷款金额的0.05‰作为印花税，由公司直接在投保人申请的贷款账户中代为扣缴，印花税起征点为人民币2000元</p>
                    <p>（6）投保人应按时偿还贷款本息；如保单贷款期满180天不能全部偿还本金及利息，应一次性归还全部利息，未归还的本金办理贷款展期，贷款利率按照公司最新保单贷款利率计算,贷款展期最多以四次为限 </p>
                    <p>（7）保单贷款满期时，如本金及利息未偿还，从贷款逾期开始，贷款利率将在公司最新保单贷款利率基础上额外加收100个基点。当贷款本息总额达到其保单现金价值时，我公司有权直接以其保单的现金价值抵扣贷款本息，且无须通知投保人，双方的保险合同效力中止，在保险合同效力中止期间，公司不承担保险责任</p>
                    <p>（8）投保人贷款未偿还之前如发生退保、减保、生存给付、理赔或其他变更而导致退费的，我公司有权直接从质押保险单现金价值或各种保险给付金中扣除贷款本息</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">10</td>
                  <td>保单还款</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请时限：全部还款-贷款后任意时间；部分还款-贷款到期日（含当日）前任意时间 </p>
                    <p>（2）申请条件：有效保单且已贷款</p>
                    <p>（3）贷款到期日（含当天）前申请保单还款，可以选择部分还款或全部还款，即还款金额可选择大于或等于利息，小于或等于贷款本息和之间的任意金额</p>
                    <p>（4）贷款到期日后，只能申请全部还款，还款金额为贷款本息和</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">11</td>
                  <td>追加保费</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请时限：保险合同有效期内，各期保费均已交纳的保险合同有效期内任意时间 </p>
                    <p>（2）申请条件：不含投连账户，保险条款中支持追加保费功能的有效保单 </p>
                    <p>（3）申请追加保费1000元起 </p>
                    <p>（4）申请追加保费的金额需符合我公司当时的规定</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">12</td>
                  <td>账户价值提取</td>
                  <td>投保人</td>
                  <td>
                    <p>（1）申请条件：不含投连账户，保险条款中支持账户价值提取功能的有效保单 </p>
                    <p>（2）账户价值提取的金额及提取后账户最低留存金额需符合我公司当时的规定 </p>
                    <p>（3）保单贷款或质押贷款期间，不支持申请账户价值提取</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;background: #E2DB04;" colspan="4">其他说明</td>
                </tr>
                <tr>
                  <td style="text-align: center;">1</td>
                  <td colspan="3">短信验证码将发送至投保人在我公司留存的手机号码上，而不是微信注册的手机号码</td>
                </tr>
                <tr>
                  <td style="text-align: center;">2</td>
                  <td colspan="3">微信端申请的付费业务转账失败，申请二次代付时如变更账号退费需再次进行人脸识别验证</td>
                </tr>
                <tr>
                  <td style="text-align: center;">3</td>
                  <td colspan="3">微信端申请的收费业务转账失败后，我公司会自动终止该申请，如该保单仍符合申请条件，投保人可再次申请该业务</td>
                </tr>
                <tr>
                  <td style="text-align: center;">4</td>
                  <td colspan="3">
                    <p>微信端申请的付费业务支持：</p>
                    <p>&nbsp;&nbsp;（1）原账号退费金额不能超过100万元人民币，变更账号退费金额不能超过50万元人民币 </p>
                    <p>&nbsp;&nbsp;（2）原账号退费金额不超过5万元人民币可使用短信验证码方式或人脸识别方式申请；原账号退费金额5万元人民币以上或变更账号退费仅支持使用人脸识别方式申请。</p>
                  </td>
                </tr>
              </table>
              <p>4、保单服务进度查询：【自助服务】--【保单服务】--【保单服务进度查询】。</p>
              <p>&nbsp&nbsp（1）可查询在我公司申请并已成功受理的保单服务项目；</p>
              <p>&nbsp&nbsp（2）输入的起止日期间隔最长为6个月，可查询该段时间内任意时点的保单服务申请信息；如不输入起止时间，则默认查询最近1个月内的保单服务申请信息；</p>
              <p>&nbsp&nbsp（3）微信端申请的退费类业务如付款失败，申请人可通过此菜单更新付款银行账号，并申请再次付款；</p>
              <p>&nbsp&nbsp（4）已完结的保单服务项目可在此菜单查看并下载批单</p>
            </div>
            <div id="dianhua_banli">
              <p class="headerBoldText">
                二、 电话办理
              </p>
              <p>1、拨打全国统一咨询热线95348可进行保单自助查询及业务办理，具体办理规则详见下表：</p>
              <table width="100%" border="1px" style="border-color: black" cellspacing="0">
                <tr style="background: cornflowerblue;text-align: center;color: black;height: 40px;">
                  <td colspan="6">常见保单服务项目电话办理规则</td>
                </tr>
                <tr>
                  <td style="text-align: center;" width="10%">序号</td>
                  <td style="text-align: center;" width="10%">项目名称</td>
                  <td style="text-align: center;" width="10%">申请资格人</td>
                  <td style="text-align: center;" width="10%">来电类型</td>
                  <td style="text-align: center;" width="20%">申请时限</td>
                  <td style="text-align: center;" width="40%">办理规则</td>
                </tr>
                <tr>
                  <td style="text-align: center;">1</td>
                  <td>客户联系方式变更</td>
                  <td>投保人</td>
                  <td>公司留存电话或任意电话</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>
                    <p>(1)联系地址变更可通过任意电话申请</p>
                    <p>(2)联系电话和电子邮箱的变更需通过公司留存电话申请</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">2</td>
                  <td>保单补发</td>
                  <td>投保人</td>
                  <td>公司留存电话</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）客户需提供完整、有效的保单邮寄地址和联系电话</p>
                    <p>（2）已办理保单贷款、银行质押贷款的保险合同不支持申请保单补发</p>
                    <p>（3）效力中止的保险合同复效成功后可提出申请</p>
                    <p>（4）需交纳保险合同工本费10元</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">3</td>
                  <td>客户资料更正</td>
                  <td>投保人或变更主体</td>
                  <td>任意电话</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>可申请身份证号升位和证件有效期变更</td>
                </tr>
                <tr>
                  <td style="text-align: center;">4</td>
                  <td>追加保险费</td>
                  <td>投保人</td>
                  <td>公司留存电话</td>
                  <td>保险合同有效期内且各期保费均已交纳情况下的任意时间</td>
                  <td>富贵双全产品可使用任意电话追加保费</td>
                </tr>
                <tr>
                  <td style="text-align: center;">5</td>
                  <td>交纳续期保费</td>
                  <td>投保人</td>
                  <td>公司留存电话或任意电话</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）投连、万能产品可通过公司留存电话申请</p>
                    <p>（2）其它产品可通过任意电话申请</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">6</td>
                  <td>保单还款</td>
                  <td>投保人</td>
                  <td>任意电话</td>
                  <td>保险合同贷款期内任意时间</td>
                  <td>
                    <p>（1）部分还款需在贷款到期日（含）前申请，最多申请四次</p>
                    <p>（2）如在贷款到期日后申请全部还款，会产生罚息</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">7</td>
                  <td>退保</td>
                  <td>投保人</td>
                  <td>公司留存电话或任意电话</td>
                  <td>保险合同犹豫期后</td>
                  <td>
                    <p>（1）受理范围：个险及银保渠道销售的期交保单除外</p>
                    <p>（2）可申请保单退保或附加险退保；如附加险退费金额为0，可使用任意电话申请；如附加险退费金额不为0，需要使用公司留存电话申请</p>
                    <p>（3）可受理退费至保单预留账号且退费金额在5万元（含）以下的保单（投连产品无金额限制）</p>
                    <p>（4）可受理电销渠道退费至原/非原账号金额在5万元（含）以下的保单</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">8</td>
                  <td>账户价值部分提取</td>
                  <td>投保人</td>
                  <td>公司留存电话</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）可受理退费至保单系统预留账号且退费金额在5万元（含）以下的保单</p>
                    <p>（2）保单贷款或质押贷款期间，不支持申请账户价值部分提取</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">9</td>
                  <td>保单贷款</td>
                  <td>投保人</td>
                  <td>公司留存电话</td>
                  <td>犹豫期后且各期保费、欠款利息均已交纳的保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）投保人、被保险人须为同一人</p>
                    <p>（2）可受理退费至保单预留账号且退费金额在5万元（含）以下的保单</p>
                    <p>（3）可受理电销渠道退费至原/非原账号金额在5万元（含）以下的保单</p>
                    <p>（4）含投连账户的险种，电话不支持申请此项业务</p>
                  </td>
                </tr>
              </table>
            </div>
            <div id="柜面_banli">
              <p class="headerBoldText">
                三、 客服中心柜面办理
              </p>
              <p>1、可前往我公司客服中心柜面办理，由客服中心的服务人员协助您。具体办理规则详见下表：</p>
              <table width="100%" border="1px" style="border-color: black" cellspacing="0">
                <tr style="background: cornflowerblue;text-align: center;color: black;height: 40px;">
                  <td colspan="6">常见保单服务项目柜面办理规则</td>
                </tr>
                <tr>
                  <td style="text-align: center;" width="10%">序号</td>
                  <td style="text-align: center;" width="10%">项目名称</td>
                  <td style="text-align: center;" width="10%">申请资格人</td>
                  <td style="text-align: center;" width="10%">申请时限</td>
                  <td style="text-align: center;" width="20%">办理规则</td>
                  <td style="text-align: center;" width="40%">应备资料</td>
                </tr>
                <tr>
                  <td style="text-align: center;">1</td>
                  <td>客户资料变更</td>
                  <td>投保人或变更主体</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）可申请变更姓名、出生日期、职业类别、证件类型、证件号码等资料</p>
                    <p>（2）该项目有保单自动关联功能，客户的其他保单会同时进行变更</p>
                  </td>
                  <td>
                    <p>（1）保险合同正本(涉及费率变化时提供)</p>
                    <p>（2）保险合同变更申请书</p>
                    <p>（3）申请资格人有效身份证明</p>
                    <p>（4）被变更主体户口本、公安机构相关证明等</p>
                    <p>（5）在职证明（职业类别变更时提供）</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">2</td>
                  <td>客户联系方式变更</td>
                  <td>投保人</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）可申请变更家庭住址、单位地址、联系地址、联系电话、电子邮箱、信函方式</p>
                    <p>（2）该项目有保单关联功能，客户可选择是否同时变更名下其他保单</p>
                  </td>
                  <td>
                    <p>（1）保险合同变更申请书</p>
                    <p>（2）投保人有效身份证明</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">3</td>
                  <td>交费信息变更</td>
                  <td>投保人</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）可申请变更银行账号和续期交费方式（自交或转账）</p>
                    <p>（2）该项目有保单关联功能，客户可选择是否同时变更名下其他保单</p>
                  </td>
                  <td>
                    <p>（1）保险合同变更申请书</p>
                    <p>（2）投保人有效身份证明</p>
                    <p>（3）银行存折或卡</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">4</td>
                  <td>保单补发</td>
                  <td>投保人 </td>
                  <td>保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）客户需提供完整、有效的保单邮寄地址和联系电话</p>
                    <p>（2）已办理保单贷款、银行质押贷款的保险合同不支持申请保单补发</p>
                    <p>（3）效力中止的保险合同复效成功后可提出申请</p>
                    <p>（4）需交纳保险合同工本费10元</p>
                  </td>
                  <td>
                    <p>（1）保险合同变更申请书</p>
                    <p>（2）投保人有效身份证明</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">5</td>
                  <td>保单复效</td>
                  <td>投保人</td>
                  <td>保险合同失效（即宽限期满或垫交期结束）后两年内的任意时点</td>
                  <td>
                    <p>（1）申请保单复效需被保险人签字确认并填写健康告知</p>
                    <p>（2）办理复效业务须经公司核保通过后方可办理，可能要求客户体检或提供核保所需材料</p>
                    <p>（3）办理复效需同时还清贷款</p>
                    <p>（4）保险合同恢复效力后将重新计算观察期</p>
                    <p>（5）短期险不支持申请复效</p>
                  </td>
                  <td>
                    <p>（1）保险合同变更申请书</p>
                    <p>（2）投保人有效身份证明</p>
                    <p>（3）健康告知</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">6</td>
                  <td>交纳续期保险费</td>
                  <td>投保人</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>在保险合同宽限期内，对于续期收费方式为转账的保险合同，公司会通过批量代扣、单笔代扣以及柜面代收等形式进行收费，请客户申请此项业务前确认未重复交费</td>
                  <td>
                    <p>（1）保险合同变更申请书（转账交费时填写）</p>
                    <p>（2）交费通知单或支票</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">7</td>
                  <td>保单还款</td>
                  <td>投保人</td>
                  <td>保险合同贷款期内任意时间</td>
                  <td>
                    <p>（1）部分还款须在贷款到期日（含）前申请，最多申请四次</p>
                    <p>（2）如在贷款到期日后申请全部还款，会产生罚息</p>
                  </td>
                  <td>
                    <p>（1）保险合同变更申请书</p>
                    <p>（2）投保人有效身份证明</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">8</td>
                  <td>账户价值部分提取</td>
                  <td>投保人</td>
                  <td>保险合同有效期内任意时间</td>
                  <td>保单贷款或质押贷款期间，不支持申请账户价值部分提取</td>
                  <td>
                    <p>（1）投资账户变更申请书</p>
                    <p>（2）投保人有效身份证明</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">9</td>
                  <td>退保</td>
                  <td>投保人</td>
                  <td>保险合同犹豫期后</td>
                  <td>保单如有尚未偿还的贷款本息，公司将扣除未偿还本息后向客户支付退保金</td>
                  <td>
                    <p>（1）保险合同正本</p>
                    <p>（2）保险合同解除申请书</p>
                    <p>（3）投保人有效身份证明</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">10</td>
                  <td>保单贷款</td>
                  <td>投保人（无法代办）</td>
                  <td>犹豫期后且各期保费、欠款利息均已交纳的保险合同有效期内任意时间</td>
                  <td>
                    <p>（1）贷款金额不得低于2000元</p>
                    <p>（2）投保人贷款未偿还之前发生退保、减保、生存给付、理赔或其他变更而导致退费的，公司有权从质押保险单现金价值或各种保险给付金中扣除贷款本息</p>
                    <p>（3）保单贷款满期时，如本金及利息未偿还，从贷款逾期开始，贷款利率将在公司最新保单贷款利率的基础上额外加收100个基点</p>
                  </td>
                  <td>
                    <p>（1）保险合同正本</p>
                    <p>（2）保单贷款申请书</p>
                    <p>（3）投保人和被保险人有效身份证明</p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;background: #E2DB04;" colspan="6">注意事项</td>
                </tr>
                <tr>
                  <td style="text-align: center;">1</td>
                  <td colspan="5">如委托他人代办，需提供代办人有效身份证明</td>
                </tr>
                <tr>
                  <td style="text-align: center;">2</td>
                  <td colspan="5">如退费至非原账号或使用非原账号交费则需提供银行卡或存折</td>
                </tr>
              </table>
            </div>
          </div>
        <!-- </mt-popup> -->
        <!-- <mt-popup v-model="toggle.popupVisible3" position="bottom" style="width:100%;height:85%;overflow-y:auto"> -->
          <div id="content"  v-if="toggle.popupVisible3">
            <!--理赔流程-->
            <div>
                <p class="headerBoldText">
                    理赔办理指南
                </p>
                <p><u class="boldText">理赔流程:</u> </p>
                <p>理赔流程分四个步骤:</p>
                <p>1.报案:出险后,客户本人由他人及时向我公司报案;</p>
                <p>2.申请：客户本人或委托他人（如业务代表、亲戚朋友等）将理赔资料递交至我公司；</p>
                <p>3.审核：收到客户的理赔申请资料后，我公司会进行必要的审核，做出理赔决定;</p>
                <p>4.转账支付：我公司做出理赔决定后告知客户，并通过转账的方式支付保险金。</p>
            </div>
            <!--报案途径-->
            <div>
                <p><u class="boldText">报案途径:</u></p>
                <p>您可以通过以下三种方式报案:</p>
                <p>1.微信:关注"光大永明人寿"官方微信公众号或扫描二维码 <img class="erweimaImg" src="./../../../static/img/service/baoantujing.png" alt="">,自助服务】--【自助理赔】--【我要报案】进行报案；</p>
                <p>2.官网：通过光大永明人寿官网www.sunlife-everbright.com首页通过【客服中心】--【理赔服务】--【网上报案】进行报案；</p>
                <p>3.电话：拨打24小时全国统一咨询热线95348报案，按照语音提示选择0，我公司专业坐席将接听您的报案电话；</p>
                <p>4.柜面：前往我公司客服大厅报案，我们的理赔人员将接待您的报案。</p>
            </div>
            <!--报案提供信息-->
            <div>
                <p><u class="boldText">报案提供信息:</u> </p>
                <p>报案需要提供以下信息：</p>
                <p>1.出险人姓名、年龄、证件号码；</p>
                <p>2.保单号；</p>
                <p>3.报案人姓名、电话；</p>
                <p>4.事故信息（包括出险时间、出险地点、出险原因、出险经过、目前状况等项目）。</p>
            </div>
            <!--出险后应多长时间内通知公司:-->
            <div>
                <p><u class="boldText">出险后应多长时间内通知公司:</u></p>
                <p>保险事故发生后，<span class="redText">建议您在3日之内</span>通过微信、电话、网络等形式及时通知我们；对于意外原因或不明原因导致的保险事故、可能涉及到身故、重大疾病、残疾等索赔金额较高的保险事故，您应于事故发生后立即通知我们。及时的进行报案，可最快速度享受我们的理赔服务与专业指导。早报案，早结案。</p>
            </div>
            <!--微信报案-->
            <div>
                <p><u class="boldText">微信报案</u></p>
                <p>关注“光大永明人寿”官方微信公众号，进入微信对话页面，点击【自助服务】选择【自助理赔】，点击【我要报案】根据提示绑定客户身份，进入报案申请，填写出险人信息、报案人信息和保险事故信息后核实无误点击“确认”，微信理赔报案完成。</p>
            </div>
            <!--出险后应在多长时间内申请理赔-->
            <div>
                <p><u class="boldText">出险后应在多长时间内申请理赔：</u></p>
                <p>发生保险事故后，建议您在3日之内通过微信、电话、网络等形式及时报案，在我们专业的理赔指导下尽快提出给付保险金申请。</p>
                <p>1.如果您申请寿险产品的保险金，那么您必须在保险事故发生之日起五年内向我公司提出申请；</p>
                <p>2.如果您申请重疾险、意外险、医疗险的保险金，那么您必须在保险事故发生之日起两年内向我公司提出申请。</p>
            </div>
            <!--什么人具备理赔申请资格-->
            <div>
                <p><u class="boldText">什么人具备理赔申请资格：</u></p>
                <p>1、申领<span class="redText">非身故类</span>保险金的理赔：应由被保险人本人申请，如被保险人为未成年人，应由被保险人法定监护人提出理赔申请；</p>
                <p>2、申领<span class="redText">身故</span>保险金的理赔：可由受益人来申请，保单已指定受益人的应由指定的受益人申请；未指定受益人则应由被保险人的法定继承人提出理赔申请，在申请时须提供证明其法定继承人资格的相关材料；</p>
                <p>3、申请保险费<span class="redText">豁免</span>的理赔：应由主险的被保险人申请，如被保险人为未成年人，应由被保险人法定监护人提出理赔申请；</p>
                <p>4、<span class="redText">特殊情况:</span>被保险人生前医疗费用保险金应作为其遗产由法定继承人提出索赔申请。</p>
            </div>
            <!--理赔申请途径-->
            <div>
                <p><u class="boldText">理赔申请途径:</u></p>
                <p>您可通过以下途径进行理赔申请：</p>
                <p>1.微信：请点击这里【链接至自助理赔】通过“理赔申请”进行理赔申请</p>
                <p>2.柜面：客户亲自或委托他人（如业务代表、亲戚朋友等）前往我公司客服大厅办理；</p>
                <p>3.邮寄：将资料邮寄到我公司机构客户服务部；</p>
                <p>4.上门：您可以电话联系我公司机构客服我们可以上门收取</p>
            </div>
            <!--微信理赔-->
            <div>
                <p><u class="boldText">微信理赔:</u></p>
                <p>关注关注“光大永明人寿”官方微信公众号或扫描二维码 <img class="erweimaImg" src="./../../../static/img/service/weixinlipei.png">，【自助服务】--【自助理赔】--【理赔申请】根据提示进行身份识别，进入理赔申请，填写出险人信息、保险事故信息、银行账户信息后核实无误，上传资料点击“确认”，微信理赔申请完成。</p>
            </div>
            <!--理赔应备资料-->
            <div>
                <p><u class="boldText">理赔应备资料</u></p>
                <table width="100%" border="1px" style="border-color: cornflowerblue" cellspacing="0">
                    <tr style="background: #6495ed;text-align: center;color: white">
                        <td width="25%">申请类型</td>
                        <td colspan="2">应备资料</td>
                    </tr>
                    <tr>
                        <td style="text-align: center">医疗</td>
                        <td rowspan="5" width="30%">
                            <p>1.理赔申请书</p>
                            <p>2.被保险人身份证明</p>
                            <p>3.申请人身份证明、银行账户</p>
                            <p>4.保险合同<span class="yellowText">(身故、重疾、高残提供)</span></p>
                        </td>
                        <td>
                            <p>1.门诊病历<span class="yellowText">(门诊医疗提供)</span></p>
                            <p>2.住院病历/出院小结</p>
                            <p>3.收据\费用清单</p>
                            <p>4.已在社保或第三方报销医疗费用的,需提供社保报销单或第三方报销凭证</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">津贴</td>
                        <td>
                            <p>1.住院病历/出院小结</p>
                            <p>2.费用清单</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">身故</td>
                        <td>
                            <p>1.死亡证明、户籍注销证明、殡葬证明(任意两种)</p>
                            <p>2.法定继承人声明书(无指定受益人提供)</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">重大疾病</td>
                        <td>
                            <p>1.诊断证明/住院病历/出院小结</p>
                            <P>2.病理报告/检查报告</P>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">疾病</td>
                        <td>
                            <p>1.诊断证明/住院病历/出院小结</p>
                            <p>2.检查报告/伤残鉴定文件</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">豁免</td>
                        <td>
                            <p>1.理赔申请书</p>
                            <p>2.投保人身份证明</p>
                            <p>3.申请人身份证明</p>
                        </td>
                        <td>
                            <p>1.诊断证明/住院病历/出院小结<span class="yellowText">(重疾/搞残提供)</span></p>
                            <p>2.病理报告/检查报告<span class="yellowText">(重疾提供)</span></p>
                            <p>3.检查报告/伤残鉴定文件<span class="yellowText">(高残提供)</span></p>
                            <p>4.死亡证明、户籍注销证明、殡葬证明(任意两种)<span class="yellowText">(身故提供)</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <p>1.身份证明:身份证、户口本、户籍证明、护照、出生证等。</p>
                            <p>2.法定继承人声明书:法定继承人为两人或两人以上时,需明确继承人与被保险人关系证明及各自继承份额,并全部继承人亲笔签名。</p>
                            <p>3.如投保单未指定受益人或指定法定继承人,需提供全部法定第一顺位继承人身份证明及关系证明(户口本、出生证、公安户籍机关/居委会/村委会出具的关系证明等)。</p>
                            <p>4.若是交通事故需提供交通管理部门出具的交通事故责任认定书(被保险人如为驾驶员,需提供驾照及行驶证);若是工伤事故需提供相关单位的工伤证明等。</p>
                        </td>
                    </tr>
                </table>
            </div>
            <!--理赔应备资料获取途径 -->
            <div>
                <p><u class="boldText">应备资料获取途径</u></p>
                <table border="1" width="100%" cellspacing="0" style="border-color: #6495ed">
                    <tr style="background: #6495ed">
                        <td width="30%"></td>
                        <td width="70%" style="text-align: center">理赔应备资料获取途径</td>
                    </tr>
                    <tr >
                        <td style="text-align: center">
                            <p>理赔申请书</p>
                            <p>法定继承人声明书</p>
                        </td>
                        <td>
                            <p>可以登陆我公司官网→客服中心→理赔服务→单证下载中下载;</p>
                            <p>可以在各分支公司网点领取；可以向业务代表索取。 </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">诊断证明</td>
                        <td>在医院就诊后请向您的医生索取，并在医务部门盖章。 </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">住院病历/出院小结 </td>
                        <td>在医院住院治疗结束后，请向您的医生索取出院小结。  </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">  住院收据/费用清单</td>
                        <td>在办理出院手续时向医院索取住院费收据及清单。 </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">  社保报销单 </td>
                        <td>通常情况下，社保机构仅接受发票原件，不接受医疗费用分割单。因此若您有社保报销，建议您先到社保报销后，持社保费用分割单和发票复印件到我公司进行理赔。社保机构对票据的具体要求，请咨询当地的社保机构。（住院医疗发生社保报销时使用）。 </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">门/急诊病历、门诊收据/费用清单 </td>
                        <td>在医院门/急诊就诊时，向医院索取“门诊手册或门诊病历”和收据及清单。 </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">  病理报告/检查报告 </td>
                        <td>请您在进行检查后请及时向医生索取病理检查报告。 </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">  鉴定文件 </td>
                        <td>请您与我司联系，确定在具有相关资质的鉴定机构进行伤残或重疾鉴定，鉴定结束后，鉴定机构会出具鉴定文件。 </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">
                            意外事故证明
                        </td>
                        <td>
                            如交通事故应向交警部门索要“交通事故责任认定书”； 若是工伤事故由相关单位开具工伤证明。
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">死亡证明、户籍注销证 明、殡葬证明 </td>
                        <td>在医院身故，医院会出具“居民医学死亡证明书”；若在医院以外的地方身故，公安机关会核实死亡原因，并出具“死亡证明”；户籍注销证明由户口所在地户籍管理部门出具；殡葬证明（包括火化证或土葬证明）由殡葬管理部门出具，土葬证明可由相关单位出具。 </td>
                    </tr>
                </table>
            </div>
            <!--法定继承人-->
            <div>
                <p><u class="boldText">法定继承人:</u></p>
                <p>您应该前往我公司认可的医疗机构就诊，我们认可的医疗机构是指：中华人民共和国卫生部门评审确定的二级或二级以上的公立医院。联合病房、精神病院、专供康复、休养、戒毒、戒酒、护理、养老等非以直接诊治病人为目的的医疗机构除外。该医院必须具有符合国家有关医院管理规则设置标准的医疗设备，且全天二十四小时有合格医师及护士驻院提供医疗及护理服务。</p>
            </div>
            <!--理赔进度查询-->
            <div>
                <p><u class="boldText">理赔进度查询</u></p>
                <p>1.微信：关注“光大永明人寿”官方微信公众号或扫描二维码 <img class="erweimaImg" src="./../../../static/img/service/weixinlipei.png" alt="">，【自助服务】--【自助理赔】--【我的理赔】，通过“我的理赔”进行报案、理赔申请进度和结果查询。</p>
                <p>2.官网：通过光大永明人寿官网www.sunlife-everbright.com首页通过【客服中心】--【理赔服务】--【理赔查询】--【理赔进度查询 】进行查询；</p>
                <p>3.电话：拨打24小时全国统一咨询热线95348；</p>
                <p>4.柜面：客户亲自或委托他人前往我公司客服大厅查询</p>
            </div>
          </div>
        <!-- </mt-popup> -->
        <!-- <mt-popup v-model="toggle.popupVisible4" position="bottom" style="width:100%;height:85%;overflow-y:auto"> -->
          <div id="content"  v-if="toggle.popupVisible4">
            <div>
              <p class="level1">
              财务核保指保险公司的核保人员根据客户的实际经济状况，来评估被保险人已经生效和正在申请的投保金额、保险需求状况及投保人
              的缴费能力是否合理的审核过程。
              </p>
            </div>
            <div>
              <p class="level2">
              <span class="boldText">一、保费限制：</span>
              </p>
              <p class="level1">投保人的年交保险费一般不得超过其年收入的20%；投保人年收入50万以上，年交保险费一般不得超过其年收入的30%。年交保险</p>
              <p>费包括该客户在本公司的所有新申请的和已生效的在交费期内的保单的保费总和。</p>
              <p class="level1">年收入指各种合法的收入。工资以100%计入收入评估；奖金、佣金、兼职收入以80%计入收入评估；</p>
              <p>股票、基金等其他收入以60%计入收入评估。   </p>
            </div>
            <div>
              <p><span class="boldText">二、	保额限制：</span></p>
              <p class="level1">被保险人的最高保险金额与其年收入的关系如下表：</p>
              <p><img  class="img1" src="./../../../static/img/service/premium.png"></img></p>
              <p class="level1">
              最高保险金额包括该客户在本公司及其他公司的所有新申请的和已生效的寿险、重大疾病险和意外险保单的保险金额。核保人员有
              最高保险金额包括该客户在本公司及其他公司的所有新申请的和已生效的寿险、重大疾病险和意外险保单的保险金额。核保人员有
              </p>
            </div>
            <div>
              <P><span class="boldText">三、高额投保：</span></P>
              <p class="level1">1、高保额件定义：</p>
              <p class="level1">若客户累计有效保单及正在申请投保的本公司重疾、寿险及意外险产品超过100万元，则当前保单为高额件。</p>
              <p class="level1">2、高额件核保要求：</p>
              <p class="level1">1）投保时需提供被保险人财务问卷及业务员报告书。</p>
              <p class="level1">2）非质优代理人，需要进行契约调查。</p>
              <p class="level1">3）其他个人财务资料需求：</p>
              <table style="width: 100%" border="1px" cellspacing="0">
                <tr>
                  <td class="fontbig boldText">累计寿险和重疾险保额/累计意外险保额</td>
                  <td class="fontbig boldText">私营企业主或股东</td>
                  <td class="fontbig boldText">非私营企业主或股东</td>
                </tr>
                <tr>
                  <td>100万＜保额≤200万</td>
                  <td>个人收入证明,或企业法人执照&个人资产证明</td>
                  <td colspan="3" valign="middle" style="text-align: center;">个人收入证明</td>
                </tr>
                <tr>
                  <td>200万＜保额≤300万</td>
                  <td>个人收入证明,或企业法人执照&企业财务报表&个人资产证明</td>
                </tr>
                <tr>
                  <td>保额>300万</td>
                  <td>个人收入证明,或企业法人执照&企业财务报表&验资报告或者企业年审报告&个人资产证明</td>
                </tr>
              </table>
              <p>注： 1、上述证明文件均可提供复印件；如果首次提供的资料不足以证明其财务情况与投保保额相匹配，核保师可能会要求进一步提供其他财务资料；</p>
              <p class="level1">2、个人收入证明：指能够证明个人收入情况的文件，包括：个人所得税完税凭证或银行个人工资账户明细；</p>
              <p class="level1">3、个人资产证明：指能够证明个人资产状况的文件，包括：银行储蓄资产或中低风险的个人理财产品、购房合同、汽车行驶证等；</p>
              <p class="level1">4、企业财务报表：指资产负债表、利润表、现金流量表（须加盖公司公章）。</p>
              <p class="level1">5、验资报告：指会计师事务所或者审计事务所及其他具有验资资格的机构出具的证明资金真实性的文件。</p>
              <p class="level1">6、企业年审报告：指注册会计师事务所的年度审计报告。</p>
            </div>

          </div>
        <!-- </mt-popup> -->
        <!-- <mt-popup v-model="toggle.popupVisible5" position="bottom" style="width:100%;height:85%;overflow-y:auto"> -->
          <div id="content" v-if="toggle.popupVisible5">
            <div>
              <p class="level2">
              <span>体检额度：</span>被保险人累计投保本公司重疾产品及寿险产品超过以下
              保额需体检，累计保额包括本公司正在申请和已生效的寿险及重疾险的保单。
              </p>
            </div>
            <div>
              <p class="level2">
              <span>非质优销售人员 & 非银(邮)证代理 & 非团险职域开拓& 非经代渠道</span>
              </p>
              <table style="width: 100%" border="1px" cellspacing="0">
                <tr style="text-align: center;">
                  <td>保额</td>
                  <td>18周岁-40周岁</td>
                  <td>41周岁-45周岁</td>
                  <td>46周岁-50周岁</td>
                  <td>51周岁-55周岁</td>
                  <td>56周岁及以上</td>
                </tr>
                <tr>
                  <td>保额≤10万</td>
                  <td class="">免体检</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>T1</td>
                  <td class="tdColor">T1</td>
                </tr>
                <tr>
                  <td>10万＜保额≤25万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>T1</td>
                  <td class="tdColor">T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>25万＜保额≤40万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td class="tdColor">T1</td>
                  <td class="tdColor">T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>40万＜保额≤50万</td>
                  <td>免体检</td>
                  <td>T1</td>
                  <td class="tdColor">T1</td>
                  <td class="tdColor">T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>50万＜保额≤85万</td>
                  <td class="tdColor">T2</td>
                  <td class="tdColor">T2</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T6</td>
                  <td class="tdColor">T6</td>
                </tr>
                <tr>
                  <td>85万＜保额≤100万</td>
                  <td class="tdColor">T2</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T6</td>
                  <td class="tdColor">T6</td>
                </tr>
                <tr>
                  <td>100万＜保额≤200万</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T7</td>
                  <td class="tdColor">T7</td>
                </tr>
                <tr>
                  <td>200万＜保额≤500万</td>
                  <td class="tdColor">T8</td>
                  <td class="tdColor">T8</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                </tr>
                <tr>
                  <td>500万以上</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                </tr>
              </table>
            </div>
            <div>
              <p class="level2">
              <span>质优销售人员 & 银(邮)证代理 & 团险职域开拓</span>
              </p>
              <table style="width: 100%" border="1px" cellspacing="0">
                <tr style="text-align: center;">
                  <td>保额</td>
                  <td>18周岁-40周岁</td>
                  <td>41周岁-45周岁</td>
                  <td>46周岁-50周岁</td>
                  <td>51周岁-55周岁</td>
                  <td>56周岁及以上</td>
                </tr>
                <tr>
                  <td>保额≤10万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td class="tdColor">T1</td>
                </tr>
                <tr>
                  <td>10万＜保额≤20万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>20万＜保额≤30万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td class="tdColor">T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>30万＜保额≤35万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>T1</td>
                  <td class="tdColor">T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>35万＜保额≤50万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T6</td>
                  <td class="tdColor">T6</td>
                </tr>
                <tr>
                  <td>50万＜保额≤60万</td>
                  <td>免体检</td>
                  <td>T2</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T6</td>
                  <td class="tdColor">T6</td>
                </tr>
                <tr>
                  <td>60万＜保额≤100万</td>
                  <td>T2</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T6</td>
                  <td class="tdColor">T6</td>
                </tr>
                <tr>
                  <td>100万＜保额≤110万</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T7</td>
                  <td class="tdColor">T7</td>
                </tr>
                <tr>
                  <td>110万＜保额≤200万</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T7</td>
                  <td class="tdColor">T7</td>
                </tr>
                <tr>
                  <td>200万＜保额≤500万</td>
                  <td class="tdColor">T8</td>
                  <td class="tdColor">T8</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                </tr>
                <tr>
                  <td>500万以上</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                </tr>
              </table>
            </div>
            <div>
              <p class="level2">
              <span>注：光大、民生银行销售“金保安康”18至45周岁免体检保额为75万。</span>
              </p>
              <p class="level2">
              <span>经代渠道</span>
              </p>
              <table style="width: 100%" border="1px" cellspacing="0">
                <tr style="text-align: center;">
                  <td>保额</td>
                  <td>18周岁-40周岁</td>
                  <td>41周岁-45周岁</td>
                  <td>46周岁-50周岁</td>
                  <td>51周岁-55周岁</td>
                  <td>56周岁及以上</td>
                </tr>
                <tr>
                  <td>保额≤10万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td class="tdColor">T1</td>
                </tr>
                <tr>
                  <td>10万＜保额≤30万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td class="tdColor">T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>30万＜保额≤40万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td class="tdColor">T1</td>
                  <td class="tdColor">T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>40万＜保额≤50万</td>
                  <td>免体检</td>
                  <td>免体检</td>
                  <td class="tdColor">T1</td>
                  <td class="tdColor">T3</td>
                  <td class="tdColor">T3</td>
                </tr>
                <tr>
                  <td>50万＜保额≤85万</td>
                  <td>T2</td>
                  <td class="tdColor">T2</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T6</td>
                  <td class="tdColor">T6</td>
                </tr>
                <tr>
                  <td>85万＜保额≤100万</td>
                  <td class="tdColor">T2</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T4</td>
                  <td class="tdColor">T6</td>
                  <td class="tdColor">T6</td>
                </tr>
                <tr>
                  <td>100万＜保额≤200万</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T5</td>
                  <td class="tdColor">T7</td>
                  <td class="tdColor">T7</td>
                </tr>
                <tr>
                  <td>200万＜保额≤500万</td>
                  <td class="tdColor">T8</td>
                  <td class="tdColor">T8</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                </tr>
                <tr>
                  <td>500万以上</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                  <td class="tdColor">T9</td>
                </tr>
              </table>
            </div>
            <div>
              <p class="level2">
              <span>历史保额计算方法</span>
              </p>
              <p>

              </p>
            </div>
            <div>
              <p class="level2">
                （1）保单生效（或复效）时间满5年以上，该保单风险保额不再计入客户的累计寿险体检保额和重疾险体检保额。
              </p>
              <p class="level2">
                （2）保单生效（或复效）时间已满3年但不足5年，该保单风险保额按照50%计入客户的累计寿险体检保额和重疾险体检保额。
              </p>
              <p>（3）上述标准生效条件为</p>
              <p>A、既往保单为标准体；</p>
              <p>B、客户无延期拒保记录、无理赔记录、无异常品质记录；</p>
              <p>C、客户职业风险等级为1-4级；</p>
              <p>D、当寿险风险保额累计达到200万和重疾风险保额累计达到100万时，历史保单的风险保额计算不打折。</p>
              <p></p>
            </div>
            <div>
              <p class="level2">
                <span>说明：</span>
              </p>
              <p class="level2">1、上表中重大疾病险体检规则从非阴影部分开始，寿险体检规则从阴影部分开始。如同时投保寿险+重大疾病险，</p>
              <p>首先分别考虑重大疾病险及寿险是否需要体检，如均不需体检，则再将两者累计保额，应用于寿险体检规则。</p>
              <p><span>T1=常规+血检</span></p>
              <p><span>T2=常规+血检+血常规</span></p>
              <p><span>T3=常规+血检+血常规+PSA（男）</span></p>
              <p><span>T4=常规+血检+血常规+胸片</span></p>
              <p><span>T5=常规+血检+血常规+胸片+HIV+甲状腺B超</span></p>
              <p><span>T6=常规+血检+血常规+胸片+PSA（男）</span></p>
              <p><span>T5=常规+血检+血常规+胸片+HIV+甲状腺B超</span></p>
              <p><span>T7=常规+血检+血常规+胸片+HIV+PSA（男）+甲状腺B超</span></p>
              <p><span>T8=常规+血检+血常规+胸片+HIV+HCV+糖化血红蛋白+甲胎蛋白+癌胚抗原+ PSA（男）+甲状腺、乳腺（女）、前列腺B超（男）+宫颈TCT检查（已婚女性）</span></p>
              <p><span>T9=常规+血检+血常规+胸片+HIV+HCV+糖化血红蛋白+甲胎蛋白+癌胚抗原+PSA（男）+甲状腺、乳腺（女）、前列腺B超（男）+超声心动+宫颈TCT检查（已婚女性）</span></p>
              <p>常规：健康状况询问、身高、体重、视力、血压、心肺听诊、一般外科检查、心电图、腹部B超（肝胆胰脾双肾）、妇科B超（女性）、尿常规。</p>
              <p>血检： 肝功七项（ALT、AST、GGT、ALP、TP、ALB、T-Bil、）、乙肝五项、肾功、血糖、血脂三项（甘油三酯、总胆固醇、高密度脂蛋白）。</p>
              <p>3、0-17岁无异常告知的被保险人免体检，但核保人员可视个案情况要求客户体检或提供健康证明。</p>
              <p>
              4、体检结果有效期为自体检当日始的六个月以内，在有效期内新增保险金额的客户，不需重复做原体检项目。核保人员可视被保险人的
              身体情况或随机抽样将免体检件改为体检件，或加作其他体检项目，或要求被保险人提供相关病历。
              </p>
            </div>

          </div>
        <!-- </mt-popup> -->
        <!-- <mt-popup v-model="toggle.popupVisible6" position="bottom" style="width:100%;height:85%;overflow-y:auto"> -->
          <div id="content"  v-if="toggle.popupVisible6">
            <P class="level1">
              保全核保规则是指在保险单有效期内，或因未交纳保费导致保单效力中止两年内，投保人因变更有关投保事项而需由核保人员重新审核的保全件。
              需要进行核保的保全变更项目包括：保单复效、新增保障、补充健康告知、增加保额、客户资料变更、满期后续保、红利领取方式变更为增额交清。
            </P>
            <p class="fontbig boldText">一、保单复效</p>
            <p class="level2">
              1、	保单复效填写健康告知无异常、失效时间≤180天，并且原承保条件是标准费率承保，可免体检与高额件审核维持保单原核保决定。
            </p>
            <p>2、	保单复效填写健康告知无异常并且原承保条件是健康风险因素评点EM≥50时，均应进行体检。
            （对于失效时间≤180天，承保时评估EM≤100者可由核保师依加费原因酌情处理）。
            </p>
            <p>3、失效时间超过180天复效件体检与高额件标准与新契约标准相同。</p>
            <p>4、保单复效核保师可根据具体情况要求客户体检或提供健康及财务资料</p>
            <p class="fontbig boldText">二、新增保障、增加保额</p>
            <p class="level1">
              申请新增保障，申请新增的附加险均需为在售产品，需在主险交费期内申请新增且符合产品投保规则。新增保障的申请规则与新契约投保规则、
              核保原则相同。增加保额仅限条款中允许申请增加保额的产品，规则与新契约投保规则、核保原则相同，条款明确加保规则者依条款规定。
              申请新增住院医疗和住院医疗津贴类产品，符合以下任一条件均需体检，体检项目依累计保额与新契约体检项目一致：<br/>
              ①	申请新增住院医疗产品保额超过10000元或者申请住院医疗津贴产品累计大于200元 <br/>
              ②	主险生效超过两个保单年度申请新增医疗类产品
            </p>
            <p class="fontbig boldText">三、补充健康告知</p>
            <p class="level1">核保师针对客户补充告知的事项分析是否影响原来的承保条件。若影响到原来的承保条件，则核保决定追溯。</p>
            <p class="fontbig boldText">四、客户资料变更</p>
            <p class="level2">
              1、	年龄变更：真实年龄符合险种的投保年龄范围，生效超过两年依真实年龄费率变更；生效不足两年根需据新契约投保规则重新核保。。
            </p>
            <p class="level2">
              2、	投保人变更：变更后的投保人对被保险人需具有可保利益。变更后非本人、父母、夫妻、子女、（外）祖父母需人工核保审核可保利益。
              被保险人0-9岁投保人不接受父母以外的变更。投保产品对投保人有特殊规定者，变更后的投保人需符合产品投保规则的要求
            </p>
            <p class="level2">
              3、	职业变更：产品条款对于职业变更有明确规定者依产品条款执行。产品条款对于职业变更无明确规定，而被保险人申请职业变更时，
              职业类别降低者，需单位提供工作证明，内容包括：变更后职业、从事变更后工作时间超过3个月，加盖单位公章，经核保师审核同意后变更；
              被保险人申请职业变更职业类别提高者，经核保师审核同意后可以变更。
            </p>
            <p class="fontbig boldText">五、满期后续保</p>
            <p class="level1">
              客户申请满期后续保须填写健康告知，健康告知无异常可以续保时年龄免体检续保，健康告知有异常依新契约核保原则。
            </p>
            <p class="fontbig boldText">六、红利领取方式变更为增额交清</p>
            <p class="level1">
              客户投保时寿险核保评点EM值大于等于100，不能选择增额缴清的分红方式。
            </p>
          </div>
        <!-- </mt-popup> -->
        <!-- <mt-popup v-model="toggle.popupVisible7" position="bottom" style="width:100%;height:85%;overflow-y:auto"> -->
          <div id="content" v-if="toggle.popupVisible7">
            <div>
              <p class="fontbig"><u class="boldText">一、未成年人的投保要求：</u></p>
              <p class="level2">
              1、为0至9周岁未成年人投保，必须由父母作为投保人；10至17周岁，可以由对被保险人具有可保利益的人作为投保人，但必须同时
              得到其父母或法定监护人的书面同意。
              </p>
              <p class="level2">
              2、投保以死亡为保险金给付条件的保障，累计保额不得超过保监规定的最高限额：对于被保险人不满10周岁的，不得超过20万元；对
              于被保险人已满10周岁但未满18周岁的，不得超过50万元（包括其他公司投保的有效保单）。
              </p>
            </div>
            <div>
              <p class="fontbig"><u class="boldText">二、儿童、青年学生、家庭主妇及退休人员投保限额：</u></p>
              <p class="level2">
              1、儿童、青年学生、家庭主妇及退休人员投保住院医疗津贴保险类累计每日给付金额不得超过100元/日。
              </p>
              <p class="level2">
              2、投保寿险、重疾险、意外险、年金险累计最高保额：
              </p>
              <table style="width: 100%" border="1px" cellspacing="0">
                <tr style="text-align: center;">
                  <td>人员类别</td>
                  <td>财务资料</td>
                  <td>寿险、重疾险、意外险、年金险累计最高保额</td>
                </tr>
                <tr>
                  <td rowspan="4">儿童、青年学生、家庭主妇（小于等于50岁）</td>
                  <td>提供家庭中主要经济来源者已生效保单复印件</td>
                  <td>可申请保额不得超过家庭中主要经济来源者累计已生效保额</td>
                </tr>
                <tr>
                  <td>提供家庭中主要经济来源者收入证明：工资单、个人税单</td>
                  <td>可申请保额不得超过家庭中主要经济来源者可申请保额的50%，且累计不得超过200万。</td>
                </tr>

                <tr>
                  <td>无财务资料</td>
                  <td>可申请保额不得超过60万</td>
                </tr>
                <tr>
                  <td>退休人员及年龄大于50岁的家庭主妇</td>
                  <td>可申请保额不得超过50万</td>
                </tr>
              </table>
            </div>
            <div>
              <p class="fontbig"><u class="boldText">三、残疾人员投保规定：</u></p>
              <p class="level2">
              核保人员可视被保险人的残疾状况，对被保险人进行体检及契约调查，或要求提供相关残疾证明及病史资料；
              </p>
              <p class="level2">
              残疾人员投保的保险产品，凡条款中有残疾保险金给付责任的，必须在承保时对其已经残疾的部分进行责任除外。
              </p>
            </div>
            <div>
              <p class="fontbig"><u class="boldText">四、孕妇投保限制：</u></p>
              <p class="level2">
              怀孕8个月及以上的妇女须延期至分娩一个月后方可申请投保寿险、重大疾病险和意外险； 核保人员可视个案情况
              要求孕妇提供孕期检查记录，孕妇不能投保包含有医疗保障、生育保障的险种。
              </p>
              <p class="level2">
              残疾人员投保的保险产品，凡条款中有残疾保险金给付责任的，必须在承保时对其已经残疾的部分进行责任除外。
              </p>
            </div>
            <div>
              <p class="fontbig"><u class="boldText">五、异地生活和工作者投保：</u></p>
              <p class="level2">
              在投保地区有固定住址或工作单位的投被保险人，可以投保。
              </p>
              <p class="level2">
              残疾人员投保的保险产品，凡条款中有残疾保险金给付责任的，必须在承保时对其已经残疾的部分进行责任除外。
              </p>
            </div>
            <div>
              <p class="fontbig"><u class="boldText">六、外籍人士投保：</u></p>
              <p class="level2">
              外籍人士需每年在当地居住时间长于半年，有固定居住地址。投保时必须附有效身份证件的复印件，如护照。
              </p>
            </div>
            <div>
              <p class="fontbig"><u class="boldText">七、出国客户投保：</u></p>
              <p class="level2">
              客户投保时计划出国工作、居住或旅行，核保会考虑当地政治稳定性、经济发达程度，医疗条件等因素。
              </p>
              <p class="level2">
              战争、内乱、政变、恐怖活动；国家贫穷或经济状况严重动荡；医疗条件匮乏；毒品猖獗、艾滋病流行等国家或地区不能承保。
              </p>
            </div>
          </div>
        <!-- </mt-popup> -->
    </div>
    <alert ref="alert"></alert>
    <tabBar :isHome="false" :serviceInfo="false"></tabBar>
	</div>
</template>

<!--js-->
<script>
	import { MessageBox } from 'mint-ui'
  import Headerbtns from '../../../src/components/policy/common/Header'
  import alert from '../policy/common/alert.vue'
  import picker from '../common/Picker.vue'
  import serviceList from '../../../static/dict/service_info_sunlife.json'
  import tabBar from '../common/TabBar.vue'

	export default{
		name:'serviceInfo',
    components: {Headerbtns,alert,picker,tabBar},
    props: ['value'],
		data () {
	    return {
        page_title:'展业工具',
        toggle:{
          popupVisible1:true,
          popupVisible2:false,
          popupVisible3:false,
          popupVisible4:false,
          popupVisible5:false,
          popupVisible6:false,
          popupVisible7:false,
          popupVisible8:false,
        },
        selectResult:"1"
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
        }else if(val == "2"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = true
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(val == "3"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = true
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(val == "4"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = true
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(val == "5"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = true
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(val == "6"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = true
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(val == "7"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = true
          this.toggle.popupVisible8 = false
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
	  beforeMount(){

	  },
	  mounted(){
//    utils.common.setH('content_page')
      this.selectResult = this.$route.query.val
      console.log(this.selectResult)
	  },
	  methods:{
      search(){
        if(this.selectResult == "1"){
          this.toggle.popupVisible1 = true
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(this.selectResult == "2"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = true
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(this.selectResult == "3"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = true
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(this.selectResult == "4"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = true
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(this.selectResult == "5"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = true
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(this.selectResult == "6"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = true
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = false
        }else if(this.selectResult == "7"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = true
          this.toggle.popupVisible8 = false
        }else if(this.selectResult == "8"){
          this.toggle.popupVisible1 = false
          this.toggle.popupVisible2 = false
          this.toggle.popupVisible3 = false
          this.toggle.popupVisible4 = false
          this.toggle.popupVisible5 = false
          this.toggle.popupVisible6 = false
          this.toggle.popupVisible7 = false
          this.toggle.popupVisible8 = true
        }
      }/*,
      showMsg:function(msg){
        if(msg!=undefined && msg!=""){
          this.$refs.alert.showMOdal(msg)
        }
      },*/
	  }
	}
</script>

<style lang="scss" scoped type="text/css">
.manage-main-contents{
  width: 100%;
  position: absolute;
  left: 0;right: 0;top: 48px;bottom: 50px;
  overflow-y: auto;
  overflow-x: auto;
  background: #FFF;
}
.fa-search{
    color:#FFAB00;
    font-size:25px;
}
.list{

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
  font-size: 35px;
}
.logo{
  float:right;
  color:#FDAA00;
}
.lh{line-height:20px;}
/*列表*/
ul>li>div>p:nth-child(1){

  color: #FFAC00;
  background-color:#F8F8F8;
  border:1px solid #C8C8C8;
  padding:10px;
  line-height: 20px;
}
.line-bottom p{
  padding:10px;
  margin: 0 15px;
  border-bottom:1px dashed #A9A6A2;
  line-height: 20px;
}
// .line-bottom p:last-child{
//   border-bottom:0;
// }


*{
    margin: 0px;
    padding: 0px;
}

/* 全部内容格式*/
#content{
    margin-left: 5%;
    width: 90%;
    margin-top: 50px;
}
#content div{
    margin-top: 10px;
}
/* 头标题 */
.headerBoldText{
    font-size: 20px;
    font-weight: bold;
}
/*!* 下划线标题 *!*/
/*.underLineText{*/
    /*border-bottom: 1px black solid;*/
/*}*/
/* 加粗文字 */
.boldText{
    font-weight: bold;
}
/** 二维码影像 */
.erweimaImg{
    width: 50px;
    height:50px;
    display: inline-block;
    padding-left: 5px;
}
/** 红色字体 */
.redText{
    color: red;
    font-weight: bold;
}
/**  黄色字体 */
.yellowText{
    color: #e2db04;
}


h1 {
    display: block;
    font-size: 2em;
    -webkit-margin-before: 0.67em;
    -webkit-margin-after: 0.67em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;
}
p {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
table{
  display: table;
  border-spacing: 2px;
  border-color: grey;
  font-size: 5px;

}
tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}
thead{
   display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
td, th {
    display: table-cell;
    vertical-align: inherit;
    text-align: center;
    width: 10%;
    color: black;
    border: 1px solid #000;
}
* {
    margin: 0px;
    padding: 0px;
}
.service-guide{
  position: fixed;
  width:100%;
  text-align: center;
  z-index: 1000;
  background-color:#FFF;
  line-height: 42px;
  .service-guide-left{
    float: left;
    width: 20%;
    margin-left:40px;
  }
  .service-guide-center{
    float: left;
    width: 50%;
    height: 30px;
    line-height: 30px;
    border-radius:5px;
    margin-top:6px;
    margin-right: 10px;
    border: 1px solid #C8C7C8;
  }
  .service-guide-right{
    float: left;
    i{
      font-size: 18px;
    color: #FEB101 !important;
    }
  }
}
.fa{
		color: #FDB92C;
} 
</style>
