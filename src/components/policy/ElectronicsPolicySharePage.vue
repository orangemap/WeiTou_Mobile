<!--电子保单页面-->
<template>
	<div class='ele-policy'>
		<NewCA v-show="caValue.isCAOpen" v-model="caValue" :value="caValue"></NewCA>
		<NewCAS v-show="caValue.isCASOpen" v-model="caValue" :value="caValue"></NewCAS>
		<div v-show="contentIsOpen">
			<Headerbtns :title="'电子投保单'"></Headerbtns>
			<div class="main-contents">
				<!--投保人身份信息-->
				<div class="part">
					<div class="title" @click="toggle.showAppntInfo = !toggle.showAppntInfo">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>投保人身份信息：</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showAppntInfo?'rotate(180deg)':''}"></i>
					</div>
					<div class="detail" v-show="toggle.showAppntInfo">
						<p>
							<span>姓名：{{newPolicy.custInfo.appnt.appntName}}</span>
							<span>国籍：{{newPolicy.custInfo.appnt.nativePlace|getNativePlace}}</span>
						</p>
						<p>
							<span>婚姻：{{newPolicy.custInfo.appnt.marriage|getMarriage}}</span>
							<span>性别：{{newPolicy.custInfo.appnt.appntSex == '1'?'男':'女'}}</span>
						</p>
						<p>
							<span>证件类型：{{newPolicy.custInfo.appnt.idType|getIdType}}</span>
							<span>出生日期：{{newPolicy.custInfo.appnt.appntBirthday}}</span>
						</p>
						<p>证件号码：{{newPolicy.custInfo.appnt.idNo}}</p>
						<p>证件有效期：{{newPolicy.custInfo.appnt.idExpDate}}</p>
						<p>年收入：{{newPolicy.custInfo.appnt.salary}} 万元</p>
						<p>联系地址：{{newPolicy.custInfo.appnt.province|getProvince}}{{newPolicy.custInfo.appnt.city|getCity}}{{newPolicy.custInfo.appnt.county}}{{newPolicy.custInfo.appnt.street}}{{newPolicy.custInfo.appnt.community}}{{newPolicy.custInfo.appnt.postalAddress}}</p>
						<p>
							<span>邮政编码：{{newPolicy.custInfo.appnt.zipCode}}</span>
							<span>联系电话:{{newPolicy.custInfo.appnt.mobile}}</span>
						</p>
						<p>电子邮箱：{{newPolicy.custInfo.appnt.email}}</p>
						<p>职业类别：{{newPolicy.custInfo.appnt.occupationType}}类</p>
						<p>职业名称：{{newPolicy.custInfo.appnt.appOccupation}}</p>
						<p>工作单位：{{newPolicy.custInfo.appnt.grpName}}</p>
						<P>投保人税收居民身份：{{newPolicy.custInfo.appnt.appntTaxInfo.taxIdentity|getTaxIdentity}}</P>
						<p v-if="newPolicy.custInfo.appnt.appntTaxInfo.taxIdentity!='1'">
							出生地：国家&nbsp;{{newPolicy.custInfo.appnt.appntTaxInfo.birthCountry|getNativePlace}} &nbsp;省&nbsp;{{newPolicy.custInfo.appnt.appntTaxInfo.birthProvince}}&nbsp;市&nbsp;{{newPolicy.custInfo.appnt.appntTaxInfo.birthCity}}
						</p>
						<div v-for="item in newPolicy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo">
							<p>税收居民国(地区)：{{item.taxArea|getNativePlace}}</p>
							<p>居民国(地区)纳税人识别号TIN：{{item.tin}}</p>
							<p>若无法提供纳税人识别号,请选择原因A或B：{{item.reasonCheck}}</p>
							<p>原因：{{item.reasonMessage}}</p>
						</div>
					</div>
				</div>
				<!--第一被保人身份信息-->
				<div class="part">
					<div class="title" @click="toggle.showFirstInsInfo = !toggle.showFirstInsInfo">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>{{newPolicy.custInfo.insurants.otherInsurant.insurant.length==0?'被保人身份信息：':'第一被保人身份信息：'}}</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showFirstInsInfo?'rotate(180deg)':''}"></i>
					</div>
					<div class="detail" v-show="toggle.showFirstInsInfo">
						<p>与投保人关系：{{newPolicy.custInfo.insurants.firstInsurant.relToApp | getRelToApp}}</p>
						<p>
							<span>姓名：{{newPolicy.custInfo.insurants.firstInsurant.name}}</span>
							<span>国籍：{{newPolicy.custInfo.insurants.firstInsurant.nativePlace |getNativePlace}}</span>
						</p>
						<p>
							<span>婚姻：{{newPolicy.custInfo.insurants.firstInsurant.marriage |getMarriage}}</span>
							<span>性别：{{newPolicy.custInfo.insurants.firstInsurant.sex == '1'?'男':'女'}}</span>
						</p>
						<p>
							<span>证件类型：{{newPolicy.custInfo.insurants.firstInsurant.idType|getIdType}}</span>
							<span>出生日期：{{newPolicy.custInfo.insurants.firstInsurant.birthday}}</span>
						</p>
						<p>证件号码：{{newPolicy.custInfo.insurants.firstInsurant.idNo}}</p>
						<p>证件有效期：{{newPolicy.custInfo.insurants.firstInsurant.idExpDate}}</p>
						<p>年收入：{{newPolicy.custInfo.insurants.firstInsurant.salary}} 万元</p>
						<p>联系地址：{{newPolicy.custInfo.insurants.firstInsurant.province |getProvince}}{{newPolicy.custInfo.insurants.firstInsurant.city |getCity}}{{newPolicy.custInfo.insurants.firstInsurant.county}}{{newPolicy.custInfo.insurants.firstInsurant.street}}{{newPolicy.custInfo.insurants.firstInsurant.community}}{{newPolicy.custInfo.insurants.firstInsurant.postalAddress}}</p>
						<p>
							<span>邮政编码：{{newPolicy.custInfo.insurants.firstInsurant.zipCode}}</span>
							<span>联系电话:{{newPolicy.custInfo.insurants.firstInsurant.mobile}}</span>
						</p>
						<p>职业类别：{{newPolicy.custInfo.insurants.firstInsurant.occupationType}}类</p>
						<p>职业名称：{{newPolicy.custInfo.insurants.firstInsurant.insOccupation}}</p>
						<p>工作单位：{{newPolicy.custInfo.insurants.firstInsurant.grpName}}</p>
					</div>
				</div>
				<!--第一被保人身故受益人-->
				<div class="part">
					<div class="title" @click="toggle.showFirstInsBfcyInfo = !toggle.showFirstInsBfcyInfo">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>身故受益人：{{newPolicy.custInfo.insurants.firstInsurant.bnfInfo.bnfType == '0'?'法定':'指定'}}</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showFirstInsBfcyInfo?'rotate(180deg)':''}"></i>
					</div>
					<div class="detail" v-show="toggle.showFirstInsBfcyInfo && item.belongWith!=''" v-for="(item,index) in newPolicy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary">
						<p>{{item.belongWith == '0'?'豁免险被保险人 '+ newPolicy.custInfo.appnt.appntName + ' 的受益人' : '被保险人 '+ newPolicy.custInfo.insurants.firstInsurant.name + ' 的受益人'}}</p>
						<p>与被保人关系：{{item.relToIns|getRelToApp}}</p>
						<p>
							<span>姓名：{{item.bfcyName}}</span>
							<span>性别：{{item.bfcySex == '1'?'男':'女'}}</span>
						</p>
						<p>
							<span>证件类型：{{item.bfcyIdType|getIdType}}</span>
							<span>出生日期：{{item.bfcyBirthday}}</span>
						</p>
						<p>证件号码：{{item.bfcyIdCode}}</p>
						<p>证件有效期：{{item.bfcyIdExpDate}}</p>
						<p>
							<span>受益顺序：{{item.bfcyLevel}}</span>
							<span>受益比例：{{item.bfcyRatio}}%</span>
						</p>
					</div>
				</div>
				<!--其他被保人-->
				<div v-for="(item,index) in newPolicy.custInfo.insurants.otherInsurant.insurant">
					<div class="part">
						<div class="title" @click="isShow('ins',index)">
							<div>
								<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
								<p>第{{index|getInsNo}}被保人身份信息：</p>
							</div>
							<i class="fa fa-angle-up" aria-hidden="true" :id="'showIns-'+index"></i>
						</div>
						<div class="detail" v-show="item.showInsInfo">
							<p>与投保人关系：{{item.relToApp | getRelToApp}}</p>
							<p>
								<span>姓名：{{item.name}}</span>
								<span>国籍：{{item.nativePlace |getNativePlace}}</span>
							</p>
							<p>
								<span>婚姻：{{item.marriage |getMarriage}}</span>
								<span>性别：{{item.sex == '1'?'男':'女'}}</span>
							</p>
							<p>
								<span>证件类型：{{item.idType|getIdType}}</span>
								<span>出生日期：{{item.birthday}}</span>
							</p>
							<p>证件号码：{{item.idNo}}</p>
							<p>证件有效期：{{item.idExpDate}}</p>
							<p>年收入：{{item.salary}} 万元</p>
							<p>联系地址：{{item.province |getProvince}}{{item.city |getCity}}{{item.county}}{{item.street}}{{item.community}}{{item.postalAddress}}</p>
							<p>
								<span>邮政编码：{{item.zipCode}}</span>
								<span>联系电话:{{item.mobile}}</span>
							</p>
							<p>职业类别：{{item.occupationType}}类</p>
							<p>职业名称：{{item.insOccupation}}</p>
							<p>工作单位：{{item.grpName}}</p>
						</div>
						<!--其他被保人受益人-->
						<div class="part">
							<div class="title" @click="isShow('bnf',index)">
								<div>
									<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
									<p>身故受益人：{{item.bnfInfo.bnfType == '0'?'法定':'指定'}}</p>
								</div>
								<i class="fa fa-angle-up" aria-hidden="true" :id="'showBnf-'+index"></i>
							</div>
							<div class="detail" v-show="item.showBnfInfo && bnfItem.belongWith!=''" v-for="bnfItem in item.bnfInfo.beneficiaries.beneficiary">
								<p>{{bnfItem.belongWith == '0'?'豁免险被保险人 '+ newPolicy.custInfo.appnt.appntName + ' 的受益人' : '被保险人 '+ item.name + ' 的受益人'}}</p>
								<p>与被保人关系：{{bnfItem.relToIns|getRelToApp}}</p>
								<p>
									<span>姓名：{{bnfItem.bfcyName}}</span>
									<span>性别：{{bnfItem.bfcySex == '1'?'男':'女'}}</span>
								</p>
								<p>
									<span>证件类型：{{bnfItem.bfcyIdType|getIdType}}</span>
									<span>出生日期：{{bnfItem.bfcyBirthday}}</span>
								</p>
								<p>证件号码：{{bnfItem.bfcyIdCode}}</p>
								<p>证件有效期：{{bnfItem.bfcyIdExpDate}}</p>
								<p>
									<span>受益顺序：{{bnfItem.bfcyLevel}}</span>
									<span>受益比例：{{bnfItem.bfcyRatio}}%</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<!--险种信息-->
				<div class="part">
					<div class="title" @click="toggle.showProducts = !toggle.showProducts">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>险种信息</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showProducts?'rotate(180deg)':''}"></i>
					</div>
					<div v-show="toggle.showProducts">
						<div class="detail" v-for="(item,index) in allProducts" style="padding:0;position:relative;">
							<p v-show="item.isMaster != '1' && newPolicy.custInfo.insurants.otherInsurant.insurant.length == 0" style="line-height: 3;border-bottom: 1px solid #EFEFEF;">被保人： {{item.insName}}</p>
							<p v-show="item.isMaster != '1' && newPolicy.custInfo.insurants.otherInsurant.insurant.length > 0" style="line-height: 3;border-bottom: 1px solid #EFEFEF;">第{{item.insNo|getInsNo}}被保人： {{item.insName}}</p>
							<p style="padding-top: 3%;">险种名称：{{item.prodName}}</p>
							<p>
								<span>保险期间：{{item.insureYearName}}</span>
								<span>交费期间：{{item.payYearName}}</span>
							</p>
							<p>
								<span>交费频率：{{item.payIntvName}}</span>
								<span>保费(元)：{{item.prem}}</span>
							</p>
							<p>
								<span v-if="item.sheBao!=''">是否有社保：{{item.sheBao|getHasInsText}}</span>
								<span v-if="item.piece!=''&&item.piece!='0'">份数(份)：{{item.piece}}</span>
							</p>
							<div>
								<p style="padding-bottom: 3%;">基本保险金额(元)：{{item.amnt|getAmnt}}</p>
							</div>
							<img v-if="item.isMaster == '1'" style="position: absolute;top: 0px;right: 0px;width: 15%;" :src="icon_zhu" />
							<img v-if="item.isMaster != '1'" style="position: absolute;top: 0px;right: 0px;width: 15%;" :src="icon_fu" />
						</div>
						<div class="detail">
							<p style="font-size: 14px;color: #000;">首期保费合计：{{newPolicy.payInfo.sumPremL}}</p>
						</div>
					</div>
				</div>
				<!--其他信息-->
				<div class="part">
					<div class="title" @click="toggle.showOtherInfo = !toggle.showOtherInfo">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>其他信息</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showOtherInfo?'rotate(180deg)':''}"></i>
					</div>
					<div class="detail" v-for="(item,index) in allProducts" v-show="toggle.showOtherInfo && item.isMaster == '1'">
						<p>
							<span>自动续保：{{item.isAutoXubao == '-1'?'是':(item.isAutoXubao == '-2'?'否':'')}}</span>
							<span>生存金领取方式：{{item.getYears == 'single'?'一次性领取':''}}</span>
						</p>
						<p>
							<span>逾期未付：{{item.autoPayFlag == '0'?'合同中止':'自动垫交'}}</span>
							<span>分红领取方式：{{item.bonusGetMode|getDividendText}}</span>
						</p>
					</div>
				</div>
				<!--银行自动转账授权-->
				<div class="part">
					<div class="title" @click="toggle.showBankInfo = !toggle.showBankInfo">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>银行自动转账授权</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showBankInfo?'rotate(180deg)':''}"></i>
					</div>
					<div class="detail" v-show="toggle.showBankInfo">
						<p>
							<span>账户姓名:{{newPolicy.payInfo.bankAccName}}</span>
							<span>开户银行:{{newPolicy.payInfo.bankCode | getBankName}}</span>
						</p>
						<p>银行账号:{{newPolicy.payInfo.bankAccNo}}</p>
						<p style="color:#5B87DF;margin: 2% 0;">1.上述银行账号的账户所有人为投保人本人,账户信息真实可靠。账户所有人授权光大永明人寿保险有限公司(以下简称"本公司")和开户银行从该账户中以转账方式自动扣划投保人所应交纳的各期保险费，并同意本公司将应支付给投保人的各项款项划入该账户。</p>
						<p style="color:#5B87DF;">2.如因该账户信息错误,账户注销,账户余额不足或其他非本公司原因导致的转账扣费和支付不成功,由此所致投保人交费失败或本公司付费失败的任何责任由投保人本人承担。</p>
					</div>
				</div>
				<!--被保险人保险单健康告知-->
				<div class="part">
					<div class="title" @click="toggle.showResRemarkList = !toggle.showResRemarkList">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>投/被保人保险单健康告知</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showResRemarkList?'rotate(180deg)':''}"></i>
					</div>
					<div v-show="toggle.showResRemarkList" v-for="(item,index) in resRemarkList" style="padding: 0 3% 0 5%;">
						<div style="display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #EFEFEF;font-size: 14px;padding: 1%;">
							<div style="width:95%;line-height: 2;display: flex;justify-content: flex-start;" v-if="item.code == 'A00001'">
								<span>{{item.questionNo}}、</span>
								<div>
									<p v-for="tpl in resResult">
										<span v-show="tpl.insNo == '-2'">投保人:身高 </span>
										<span v-show="tpl.insNo != '-2' && newPolicy.custInfo.insurants.otherInsurant.insurant.length==0">被保险人:身高 </span>
										<span v-show="tpl.insNo != '-2' && newPolicy.custInfo.insurants.otherInsurant.insurant.length>0">第{{tpl.insNo|getInsNo}}被保险人:身高 </span>
										<u>{{tpl.height}}</u> 厘米， 体重：
										<u>{{tpl.weight}}</u> 公斤
										<br />
									</p>
								</div>
							</div>
							<p style="width:75%;line-height: 2;" v-if="item.code != 'A00001'">{{item.questionNo}}、{{item.desc}}</p>
							<div style="width:20%;" v-show="!toggle.isGuanAi&&item.code != 'A00001' && item.code != '100000008' || toggle.isGuanAi&&item.code != 'A00001' && item.code!='A00008'">
								<mt-switch disabled>
									<label style="position: absolute;left: 45%;top: 25%;color: #fff;">否</label>
								</mt-switch>
							</div>
						</div>
					</div>
				</div>
				<!--询问事项结果栏-->
				<div class="part">
					<div class="title" @click="toggle.showRes = !toggle.showRes">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>询问事项结果栏</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showRes?'rotate(180deg)':''}"></i>
					</div>
					<div v-show="toggle.showRes" v-for="(item,index) in resResult" style="padding: 1% 3% 1% 5%;">
						<div style="display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #EFEFEF;font-size: 14px;padding: 1%;">
							<p style="width:75%;line-height: 2;">
								{{index+1}}
								<span v-show="item.insNo=='-2'">投保人健康告知中是否有一项或多项为 是 选项</span>
								<span v-show="item.insNo!='-2' && newPolicy.custInfo.insurants.otherInsurant.insurant.length==0">被保人 {{item.insName}} 健康告知中是否有一项或多项为 是 选项</span>
								<span v-show="item.insNo!='-2' && newPolicy.custInfo.insurants.otherInsurant.insurant.length>0">第{{item.insNo|getInsNo}}被保人 {{item.insName}} 健康告知中是否有一项或多项为 是 选项</span>
							</p>
							<div style="width:20%;">
								<mt-switch v-model="item.swh" disabled>
									<label style="position: absolute;left: 8%;top: 25%;color: #fff;">{{item.swh ?'是':''}}</label>
									<label style="position: absolute;left: 45%;top: 25%;color: #fff;">{{!item.swh ?'否':''}}</label>
								</mt-switch>
							</div>
						</div>
						<pre v-show="item.swh" style="width: 94%;height:auto;padding: 2%;border:1px solid #C7C5C5;text-overflow: ellipsis;white-space: pre-line;line-height: 1.3;font-size:13px;font-family: '微软雅黑';">{{item.showRes}}</pre>
						<!--<textarea v-show="item.swh" v-model="item.showRes" rows="4" readonly style="width: 94%;padding: 2%;border:1px solid #C7C5C5;"></textarea>-->
					</div>
				</div>
				<!--业务人员/代理人机构信息-->
				<div class="part">
					<div class="title" @click="toggle.showAgentInfo = !toggle.showAgentInfo">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>业务人员/代理人机构信息</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showAgentInfo?'rotate(180deg)':''}"></i>
					</div>
					<div class="detail" v-show="toggle.showAgentInfo">
						<p>代理机构名称: <b v-if="!isShowManage" style="color:#3E3A39;">{{newPolicy.agentInfo.manageName}}</b></p>
						<p>代理机构名称: <span v-if="!isShowManage">{{newPolicy.agentInfo.manageCode}}</span></p>
						<p>
							<span>业务员姓名:{{newPolicy.agentInfo.name}}</span>
							<span>代码:{{newPolicy.agentInfo.agentCode}}</span>
						</p>
					</div>
				</div>
				<!--业务人员报告书-->
				<div class="part">
					<div class="title" @click="toggle.showReport = !toggle.showReport">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>业务人员报告书</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showReport?'rotate(180deg)':''}"></i>
					</div>
					<div class="detail" v-show="toggle.showReport">
						<p style="line-height: 3;border-bottom: 1px solid #EFEFEF;margin-bottom: 2%;">第一部分</p>
						<p>1.本投保是经由下列途径完成:{{newPolicy.report.approachText}}</p>
						<p>2.投保人的投保目的:(如未选择,默认为"保障"):{{newPolicy.report.purposeText}}</p>
						<p>3.投保人的经济状况:</p>
						<p>年收入:(人民币){{newPolicy.report.annualIncome}}万元</p>
						<p>来源:{{newPolicy.report.sourceOfIncome}}</p>
						<p>总资产约:{{newPolicy.report.totalAssets}}万元</p>
						<p style="line-height: 3;border-bottom: 1px solid #EFEFEF;margin-bottom: 2%;">第二部分</p>
						<p>投保人的投保行为是否受"除投保人、被保险人、受益人以外的人员或机构(即第三方)"的要求或是由其提供资金而发生的: {{newPolicy.report.thirdPtIdentityText}}</p>
						<p>1.若"是",请填写以下有关第三方的信息:</p>
						<p>姓名/机构名称:{{newPolicy.report.thirdPtName}}</p>
						<p>联系方式:{{newPolicy.report.thirdPtContact}}</p>
						<p>与投保人关系:{{newPolicy.report.thirdPtRelToApp}}</p>
						<p>地址:{{newPolicy.report.thirdPtAddr}}</p>
						<p>2.若"无法识别,但有理由怀疑存在第三方"请注明怀疑原因</p>
						<p>怀疑原因:{{newPolicy.report.thirdPtRemark}}</p>
					</div>
				</div>
				<!--保险业务人员声明-->
				<div class="part">
					<div class="title" @click="toggle.showSM = !toggle.showSM">
						<div>
							<img style="width: 5px;" src="../../../static/img/policy/icon_shu.png" />
							<p>保险业务人员声明</p>
						</div>
						<i class="fa fa-angle-up" aria-hidden="true" :style="{'-webkit-transform':toggle.showSM?'rotate(180deg)':''}"></i>
					</div>
					<div class="detail" v-show="toggle.showSM">
						<p style="font-weight: bold;">本人确已面晤投保人、被保险人，对其所投保险种的条款、费率，尤其是产品说明书、投资账户收取的各项费用（投资连结保险、分红保险、万能型保险适用）、责任免除事项、合同解除权等规定及临时保险单的各项内容均已据实向投保人说明，并见证由投保人、被保险人或被保险人的法定监护人亲自在投保书上签名。除投保书中所填写内容外，投保人及被保险人没有向本人口头或以其他方式告知任何其他事项。如有不实见证或讲解，本人愿负法律责任。</p>
						<p style="font-size: 14px;color:#666;margin: 2% 0;">直属代理人/经纪代理人签名:</p>
						<p v-show="toggle.isChaoLu" style='justify-content: center;font-size: 14px;color: #666;margin-bottom: 3%;'>风险提示语抄录</p>
						<p v-show="toggle.isChaoLu" @click="opensCA(30)" style="justify-content: center;">
							<img v-show="signImgsList.cecintent==''" :src="wrting" style="width: 60%;margin-bottom: 5%;" />
							<img v-show="signImgsList.cecintent!=''" :src="signImgsList.cecintent" style="width: 100%;" />
						</p>
						<div class="flex">
							<div>
								<p>业务人员签字</p>
								<p><img :src="signImgsList.agent" /></p>
							</div>
							<div v-show="isApp == 24">
								<p>投保人{{newPolicy.custInfo.appnt.appntName}}签字</p>
								<p>
									<a :href="href.sign24">
										<img v-show="signImgsList.appnt==''" :src="wrting" />
										<img v-show="signImgsList.appnt!=''" :src="signImgsList.appnt" />
									</a>
								</p>
							</div>
							<div v-show="isApp == 25">
								<p>被保险人{{newPolicy.custInfo.insurants.firstInsurant.name}}签字</p>
								<p>
									<a :href="href.sign25">
										<img v-show="signImgsList.firstInsurant==''" :src="wrting" />
										<img v-show="signImgsList.firstInsurant!=''" :src="signImgsList.firstInsurant" />
									</a>
								</p>
							</div>
							<div v-show="isApp!='24'&&isApp!='25'">
								<p v-if="newPolicy.custInfo.insurants.otherInsurant.insurant.length>0 && newPolicy.custInfo.insurants.otherInsurant.insurant[isApp]!=undefined">被保险人{{newPolicy.custInfo.insurants.otherInsurant.insurant[isApp].name}}签字</p>
								<p>
									<a :href="href.sign26">
										<img v-show="signImgsList.otherInsurant==''" :src="wrting" />
										<img v-show="signImgsList.otherInsurant!=''" :src="signImgsList.otherInsurant" />
									</a>
								</p>
							</div>
						</div>
						<p>
							<input type="checkbox" v-model="readStatus" style="margin-right: 5px;" /> 投保人已阅读并确认
							<b :class="isReadInstructions?'isReadT':''" v-if="haveInstructionsCode.length > 0" @click='shuomingshuCallback'>《产品说明书》</b>
							<b :class="tmp.isRead?'isReadT':''" v-for="tmp of definesLists" @click="jumpToTeShuDanZheng(tmp.fileName)">{{"《"+tmp.name+"》"}}</b>
						</p>
					</div>
				</div>
				<alert ref="alert"></alert>
			
			</div>
            	<Footerbtns :is_show=false :disabled="true" total_premium="00.00">
					<button class="btnFoote" slot="center" @click="push">
					下一步
				</button>
			</Footerbtns>
		</div>
	</div>
</template>

<!--js-->
<script>
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
	import NewCA from '../common/NewCA'
	import NewCAS from '../common/NewCAS'
	import Home from '../common/ca_sign.vue'
	import alert from '../policy/common/alert.vue'
	import prompt from '../policy/common/promptSms.vue'
	import cardTypeList from '../../assets/dict/card_type_sunlife.json'
	import nationalList from '../../assets/dict/national_sunlife.json'
	import marriageList from '../../../static/dict/marriage_sunlife.json'
	import residentList from '../../../static/dict/resident_sunlife.json'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import relationList from '../../../static/dict/relation_benefit.json'
	import cityList from '../../../static/dict/city_sunlife.json'
	import provinceList from '../../../static/dict/province_sunlife.json'
	import benefitList from '../../../static/dict/relation_benefit.json'
	import dividendList from '../../../static/dict/dividend_sunlife.json'
	import inform_ques from '../../../static/dict/inform_ques.json'
	export default {
		name: 'electronics_policy_share_page',
		components: {
			Headerbtns,
			Footerbtns,
			NewCA,
			NewCAS,
			Home,
			alert
		},
		data() {
			return {
				isApp: Number(this.$route.params.index),
				newPolicy: {
					agentInfo: {},
					custInfo: {
						appnt: {
							appntTaxInfo: {
								taxInfoList: {
									taxInfo: []
								}
							}
						},
						insurants: {
							firstInsurant: {
								bnfInfo: {
									bnfType: '',
									beneficiaries: {
										bnfCount: '',
										beneficiary: []
									}
								}
							},
							otherInsurant: {
								insCount: '',
								insurant: []
							}
						},
					},
					payInfo: {},
					report: {},
				},
				toggle: {
					showAppntInfo: true,
					showFirstInsInfo: true,
					showFirstInsBfcyInfo: true, //按bfcyLevelNum排序
					showProducts: true, //险种信息
					showOtherInfo: true, //其他信息
					showBankInfo: true, //银行信息
					showResRemarkList: true, //告知题目
					showRes: true, //告知结果
					showAgentInfo: true, //业务人员信息
					showReport: true, ////业务人员报告书
					showSM: true, //保险业务人员声明
					isGuanAi: false,
					mainProdCode: '',
					mainProdItem: '',
					isChaoLu: false, //分红险
				},
				allProducts: [], //所有险种
				resRemarkList: [], //告知题目
				resResult: [], //告知结果
				isShowManage: false,
				hesitationPeriod: '', //犹豫期
				defineList: { //特殊单证
					'specialBookCode': '', //类型(条款/说明书/..)
					'productCode': '', //产品号
					'minPremium': '', //最小保费
					'timeLimit': '', //长短期险
					'typeProduct': [], //险种类型(分红/传统/..)
					'typeArea': '', //代理人地区
					'showChannel': '', //渠道
					'firstIsNotB': '', //银保B
					'buyMyself': '', //自保件
					'minShowAge': '', //投保人最小年龄
					'insureMinShowAge': '', //被保人最小年龄
					'counterMustShow': '', //银保时的柜员必须显示
				},
				typeProducts: [], //仅作为传给下个页面使用
				readStatus: false, //阅读按钮状态
				isReadInstructions: false, //是否已阅读说明书
				haveInstructionsCode: [], //需要显示产品说明书的产品code
				definesLists: [], //特殊单证数组
				saveName: [], //特殊单证传服务端
				globalDocumentInfo: "",
				offsetHeight: 0,
				caValue: {
					isCAOpen: false,
					isCASOpen: false,
					image: "",
					context_id: '',
					applyCode: '',
					orderId: this.$route.params.planId
				},
				wrting: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAACkCAYAAADxNTBqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0REQzVEMEQ5QURGMTFFOUE3REJGNDU4OTE0RDMyNEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0REQzVEMEU5QURGMTFFOUE3REJGNDU4OTE0RDMyNEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRERDNUQwQjlBREYxMUU5QTdEQkY0NTg5MTREMzI0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRERDNUQwQzlBREYxMUU5QTdEQkY0NTg5MTREMzI0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjkXSxkAABiXSURBVHja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',
				icon_zhu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABWCAYAAAA9pePPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODk2MjlDNjk5QURBMTFFOUE3REJGNDU4OTE0RDMyNEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODk2MjlDNkE5QURBMTFFOUE3REJGNDU4OTE0RDMyNEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4OTYyOUM2NzlBREExMUU5QTdEQkY0NTg5MTREMzI0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4OTYyOUM2ODlBREExMUU5QTdEQkY0NTg5MTREMzI0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgBs8bAAAATwSURBVHja7J19iFRVGMbfubhUS4EUG1l/CGGEVH9EGITgfxVFW0Zf2MdmRPalUfRJQZlkRdRSUVYUfWyFRn9oWSQbrGIUFqzVlqBm2a62ZZubZVra6PQ8nTPsuGx6Z9a9953peeAZLnfufHB+c99zzns+plB61yab2UL4JLgAl0zKUnvgXvgd+BlrLfXxZAFgqOPgDngaPE5llZt+hC8DnI/KYKhm+En4SvgwlVGucM5IKk7shK+H58ODKp/cNAG+KRl2shTB3AxvVhnlpunJfzyxCG6D16iMctHxyX6eXP5vRWTWpXLKXIXkABesiXfOayqrTFVKUlz0AzwbfhDepTLLRknK6/6A57K1AG9VsfkBU9bL8OXwxoYvmfHnmE162uz0T8Jx1pVMRQezGp0KP8uOUMOCOa3T7Ngzw3H/h2bdZ2X56cWkxhd+Dl8Bv92wYNbeMXR89FSzJt+hrFIbY0f0sYYEs6PHbPDrcDyu2azltroBQw3E1trshoSzefHQ8YRs65mDkUlmju0FeFPs74x3XdgT55k1T0x3bdPh+4azyVV053b2mvXen3nlP+J7wVPgN+AT3IKZ+pXZkSeP/ecwDH58SuaV/4i9VfgzmPc80zh71RvJN5QN17fwJbFRwLGdQ9zVG4Or018/qW3oeENHdaEsh35MqggN3w3fBR9Rtz/d1oqR9qUF9/2YNPobfgieA29RcMq2uZxGbMrMZJdNxe0LDLUsZgpWqMh9gaFWx8bA6yp2X2Aoju1wwscj8G4Vfz6tsgOJYzvzc8sUtI7hvMZVV5sNdIzmHYpJjj+KBfA1cJ/uj/xD2XAtgWfwNyYUfkJZpU6MYe0idTDzD2WVWmdh6KBd94qPUFapn2Dmye8UFl9gqB3wU7He2S4wvsQc21vw+fA3AuNLrHFXRDhdAuNPa2NYe8XCyqv/jeph9djP8CwL6RzOKTq05nfixL2mltq/SUtblUF5wGzbB3Xdj0krpnHmwUfV9OqsxvvLqn3cv5jU2R1eTuOsUyjzp6Vwf+yMTqvqldvXZ/tNR/F59RbKKnVM7PNc2oA3TN2FsuGZgqsinIYb20nq/PsTyK3wffA2gfGnxy0kQb8XGH96E77WwmxQgXGmrghnicD4Exe13Ag/LzA+W2ycmvuAwPgTx3MejaHtd4Hx15x+1cLqg/UC40tcp9NpYaLHSoHx2SjgnbNQYPyJYzsz4SfgosD4q3c44MbZOL8IjD9xm8nr4O8Exp+YIbgY/lRg/Inbr1wAv2eOtjYWmKAtsTn9kjkZ2xGYfRsFnI3zMPyrwPgT98a53XIe2xGYkcUJhlyS2C0w/tQZO6PLBMafmMZhdrpDYPyJc9huiY2CksD40m8WpubekFWLTWDSi3tOv2hhh48NAuNLDGWcvs80ziqB8acv4enwYoHxJ6ZxuGCG+08XBcaXuLU+9/29xw7yhA+BGb24mLc9dkb7BcZfo4D1zXmxUyowzsSxnbMt/CnSXoHxlyk418Ik910C40t/xRZbe62ZAoEZW91rYQ51n8D4E4erORunR2D8iWM7XC+6UmD8qSfCWSQw/sS6hrt78H8P9giML7GVxg3z5uyvxSYw+Yj9m+diaOsTGH9638Is0G6B8abW0hd4vNDCAJzAOIOzKYa1BfFMQWD8wOFfJZfX7ewWGF9w/rSwbmfGPwIMAOsrGVRyDrF0AAAAAElFTkSuQmCC',
				icon_fu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABWCAYAAAA9pePPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEIwRUIyRDI5QUREMTFFOUE3REJGNDU4OTE0RDMyNEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEIwRUIyRDM5QUREMTFFOUE3REJGNDU4OTE0RDMyNEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4OTYyOUM2QjlBREExMUU5QTdEQkY0NTg5MTREMzI0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4OTYyOUM2QzlBREExMUU5QTdEQkY0NTg5MTREMzI0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvXYIx4AAAbtSURBVHja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',
				signImgsList: {
					agent: '', //代理人
					appnt: '', //投保人
					cecintent: '', //38个字
					firstInsurant: '', //主被保人
					otherInsurant: '', //其他被保人
					cqspecial_signt: '', //重庆单证
				},
				href: {
					sign24: "http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ==",
					sign25: "http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ==",
					sign26: "http://192.168.43.96:8080/com.ifp.ipartner/faceid/5byg5a6P5YWDLTEzMDIyMzE5OTAwMjAxNDAxNQ=="
				},
			}
		},
		beforeMount: function() {
			console.log("特殊单证阅读状态", this.$route.params.sendInfo)
			//读取缓存中的单证信息
			let documentInfo = utils.cache.get("documentInfo")
			//将特殊单证返回标识进行记录
			if(this.$route.params.sendInfo != undefined) {
				//缓存中存在
				if(documentInfo != null && documentInfo != undefined && documentInfo.length > 0) {
					for(var i = 0; i < documentInfo.length; i++) {
						//优先清空
						if(documentInfo[i].name == this.$route.params.sendInfo.name) {
							documentInfo.splice(i, 1)
						}
					}
					//清空后添加
					documentInfo.push(this.$route.params.sendInfo)
					utils.cache.set("documentInfo", JSON.stringify(documentInfo))
				} else {
					//缓存中不存在直接赋值
					documentInfo = []
					documentInfo.push(this.$route.params.sendInfo)
					utils.cache.set("documentInfo", JSON.stringify(documentInfo))
				}
			}
			this.globalDocumentInfo = documentInfo
			this.getPolicyMsg()
		},
		computed: {
			contentIsOpen() {
				if(this.caValue.isCAOpen || this.caValue.isCASOpen) {
					return false
				} else {
					return true
				}
			},
		},
		watch: {
			contentIsOpen(val) {
				if(val) {
					this.getImg()
				}
			},
			readStatus(val) {
				if(!val) {
					utils.cache.removeItem("readStatus")
				}
			}
		},
		filters: {
			getInsNo(code) {
				if(code == '-1') {
					return '一'
				} else if(code == '0') {
					return '二'
				} else if(code == '1') {
					return '三'
				} else if(code == '2') {
					return '四'
				} else if(code == '3') {
					return '五'
				} else if(code == '4') {
					return '六'
				}
			},
			getRelToApp(code) {
				for(let newItem of benefitList.relation.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
			getIdType(code) {
				for(let newItem of cardTypeList.dict_cardtype.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
			getNativePlace(code) {
				for(let newItem of nationalList.national.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
			getMarriage(code) {
				for(let newItem of marriageList.marriage.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
			getProvince(code) {
				for(let newItem of provinceList.province.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
			getCity(code) {
				for(let newItem of cityList.city.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
			getTaxIdentity(code) {
				for(let newItem of residentList.resident.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
			getAmnt(code) {
				if(code == "0" || code == "0.0" || code == "0.00") {
					return ''
				}
				return code
			},
			getDividendText(code) {
				for(let newItem of dividendList.dividend.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
			getHasInsText(code) {
				if(code != undefined) {
					if(code == "0") {
						return "是"
					} else if(code == "1") {
						return "否"
					} else {
						return ""
					}
				} else {
					return ""
				}
			},
			getBankName(code) {
				for(let newItem of bankList.bank.item) {
					if(newItem.code == code) {
						return newItem.text
					}
				}
			},
		},
		methods: {
			getPolicyMsg() {
				let requ = {
					"policy": {
						"substepNo": "",
						"orderCode": this.$route.params.planId,
						"stepNo":'0,1,2,3,7,8',
						"nothave":'2'
					}
				}
				utils.http.post('MOHQPOLICYMSG', requ, true).then(response => {
					this.newPolicy = response.data.response.policy
					this.caValue.applyCode = this.newPolicy.applyCode
					for(let i = 0; i < this.newPolicy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.length; i++) {
						if(this.newPolicy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary[i].belongWith == '') {
							this.newPolicy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.splice(i--, 1)
						}
					}
					for(let i = 0; i < this.newPolicy.custInfo.insurants.otherInsurant.insurant.length; i++) {
						if(this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].name == '') {
							this.newPolicy.custInfo.insurants.otherInsurant.insurant.splice(i--, 1)
						} else {
							this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].showInsInfo = true
							this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].showBnfInfo = true
							for(let j = 0; j < this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.length; j++) {
								this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary[j].showBnfInfo = true
								if(this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary[j].belongWith == '') {
									this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.splice(j--, 1)
								}
							}
						}
					}
					console.log('newPolicy=====>', this.newPolicy)
					if('01/03/04/06/11/02/13'.indexOf(this.newPolicy.agentInfo.branchType) > -1) {
						this.isShowManage = true
					} else {
						this.isShowManage = false
					}
					let allProducts = []
					this.newPolicy.custInfo.insurants.firstInsurant.products.product.sort((a, b) => {
						return parseInt(a.seqNumber) - parseInt(b.seqNumber)
					})
					for(let item of this.newPolicy.custInfo.insurants.firstInsurant.products.product) {
						item.insNo = '-1'
						item.insName = this.newPolicy.custInfo.insurants.firstInsurant.name
						allProducts.push(item)
						if(item.prodCode == 'LBT029') {
							this.toggle.isGuanAi = true
						}
						if(item.isMaster == '1') {
							this.toggle.mainProdCode = item.prodCode
							this.toggle.mainProdItem = item
						}
					}
					for(let i in this.newPolicy.custInfo.insurants.otherInsurant.insurant) {
						for(let item of this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].products.product) {
							item.insNo = i
							item.insName = this.newPolicy.custInfo.insurants.otherInsurant.insurant[i].name
							allProducts.push(item)
						}
					}
					this.allProducts = allProducts
					console.log('已选险种信息=====>', this.allProducts)
					if(this.toggle.isGuanAi) {
						this.resRemarkList = inform_ques.imform.informList_intelligent
					} else {
						this.resRemarkList = inform_ques.imform.informList_ZJ
					}
					//console.log('告知=====>', this.resRemarkList)
					let resResult = []
					if(this.newPolicy.custInfo.appnt.question.resQuestion.resRemark.length != 0) {
						let resInfo = {
							insNo: '-2',
							insName: this.newPolicy.custInfo.appnt.appntName,
							height: '',
							weight: '',
							swh: false,
							showRes: '',
							fetationDate: this.newPolicy.custInfo.appnt.question.resQuestion.fetationDate,
							resList: this.newPolicy.custInfo.appnt.question.resQuestion.resRemark
						}
						resResult.push(resInfo)
					}
					if(this.newPolicy.custInfo.insurants.firstInsurant.question.resQuestion.resRemark.length != 0) {
						let resInfo = {
							insNo: '-1',
							insName: this.newPolicy.custInfo.insurants.firstInsurant.name,
							height: '',
							weight: '',
							swh: false,
							showRes: '',
							fetationDate: this.newPolicy.custInfo.insurants.firstInsurant.question.resQuestion.fetationDate,
							resList: this.newPolicy.custInfo.insurants.firstInsurant.question.resQuestion.resRemark
						}
						resResult.push(resInfo)
					}
					if(this.newPolicy.custInfo.insurants.otherInsurant.insurant.length > 0) {
						this.newPolicy.custInfo.insurants.otherInsurant.insurant.forEach((item, index) => {
							if(item.question.resQuestion.resRemark.length != 0) {
								let resInfo = {
									insNo: index,
									insName: item.name,
									height: '',
									weight: '',
									swh: false,
									showRes: '',
									fetationDate: item.question.resQuestion.fetationDate,
									resList: item.question.resQuestion.resRemark
								}
								resResult.push(resInfo)
							}
						})
					}
					for(let item of resResult) {
						for(let newItem of item.resList) {
							if(newItem.isBuild == 'Y' && newItem.code != 'A00001') {
								item.swh = true
								if(this.toggle.isGuanAi && item.insNo == '-1' && (newItem.questionNo == 2 || newItem.questionNo == 3 || newItem.questionNo == 6 || newItem.questionNo == 8 || newItem.questionNo == '8-a' || newItem.questionNo == '8-b' || newItem.questionNo == '8-c' || newItem.questionNo == '8-d' || newItem.questionNo == '8-e' || newItem.questionNo == '8-f' || newItem.questionNo == '8-h' || newItem.questionNo == 9)) {
									newItem.policyHealthAnswer.sort((a, b) => {
										return parseInt(a.questionno) - parseInt(b.questionno)
									})
									let showRes = "编号：" + newItem.questionNo + "："
									newItem.policyHealthAnswer.forEach(ques => {
										showRes += "\n" + "题号：" + ques.questionno + "，题目：" + ques.questioncontent + "答案：" + ques.answer + '；'
									})
									showRes += "\n"
									//console.log('=======智能核保问题', showRes)
									item.showRes += showRes
								} else if(item.fetationDate != '') {
									item.showRes += "编号： " + newItem.questionNo + "，怀孕日期：" + item.fetationDate + ' ' + "，原因：" + newItem.questionRemark + '；' + "\n"
								} else {
									item.showRes += "编号： " + newItem.questionNo + "，原因：" + newItem.questionRemark + '；' + "\n"
								}
							}
							if(newItem.code == 'A00001') {
								item.height = newItem.height
								item.weight = newItem.weight
							}
						}
					}
					this.resResult = resResult
					//console.log('告知结果=====>', this.resResult)
					//console.log('业务人员报告书=====>', this.newPolicy.report)
					let approach = this.newPolicy.report.approach.split(',')
					this.newPolicy.report.approachText = ''
					for(let item of approach) {
						if(item == '0') {
							this.newPolicy.report.approachText += '家属 '
						}
						if(item == '1') {
							this.newPolicy.report.approachText += '亲戚 '
						}
						if(item == '2') {
							this.newPolicy.report.approachText += '朋友介绍 '
						}
						if(item == '3') {
							this.newPolicy.report.approachText += '直接销售 '
						}
						if(item == '4') {
							this.newPolicy.report.approachText += '主动投保 '
						}
						if(item == '5') {
							this.newPolicy.report.approachText += '加保 '
						}
						if(item == '6') {
							this.newPolicy.report.approachText += this.newPolicy.report.approachDes
						}
					}
					//console.log('途径',approach,this.newPolicy.report.approachText)
					let purpose = this.newPolicy.report.purpose.split(',')
					this.newPolicy.report.purposeText = ''
					for(let item of purpose) {
						if(item == '0') {
							this.newPolicy.report.purposeText += '保障 '
						}
						if(item == '1') {
							this.newPolicy.report.purposeText += '储蓄 '
						}
						if(item == '2') {
							this.newPolicy.report.purposeText += '教育金 '
						}
						if(item == '3') {
							this.newPolicy.report.purposeText += '投资 '
						}
						if(item == '4') {
							this.newPolicy.report.purposeText += this.newPolicy.report.purposeDes
						}
					}
					//console.log('目的',purpose,this.newPolicy.report.purposeText)
					if(this.newPolicy.report.thirdPtIdentity == '1') {
						this.newPolicy.report.thirdPtIdentityText = '是'
					} else if(this.newPolicy.report.thirdPtIdentity == '0') {
						this.newPolicy.report.thirdPtIdentityText = '否'
					} else if(this.newPolicy.report.thirdPtIdentity == '2') {
						this.newPolicy.report.thirdPtIdentityText = '无法识别'
					}
					if(this.newPolicy.agentInfo.imageData.length > 0) {
						for(let imgs of this.newPolicy.agentInfo.imageData) {
							if(imgs.imageName == '23') {
								console.log('初次获取代理人签字=====>', imgs.reaPath)
								this.signImgsList.agent = imgs.reaPath
							}
						}
					}
					if(this.newPolicy.custInfo.appnt.imageData.length > 0) {
						for(let imgs of this.newPolicy.custInfo.appnt.imageData) {
							if(imgs.imageName == '24') {
								console.log('初次获取投保人签字=====>', imgs.reaPath)
								this.signImgsList.appnt = imgs.reaPath
							}
							if(imgs.imageName == '30') {
								console.log('初次获取38个字签字=====>', imgs.reaPath)
								this.signImgsList.cecintent = imgs.reaPath
							}
							if(imgs.imageName == '31') {
								console.log('初次获取重庆单证签字=====>', imgs.reaPath)
								this.signImgsList.cqspecial_signt = imgs.reaPath
							}
						}
					}
					if(this.newPolicy.custInfo.insurants.firstInsurant.imageData.length > 0) {
						for(let imgs of this.newPolicy.custInfo.insurants.firstInsurant.imageData) {
							if(imgs.imageName == '25') {
								console.log('初次获取被保人签字=====>', imgs.reaPath)
								this.signImgsList.firstInsurant = imgs.reaPath
							}
						}
					}
					if(this.isApp != '24' && this.isApp != '25') {
						if(this.newPolicy.custInfo.insurants.otherInsurant.insurant[this.isApp].imageData.length > 0) {
							this.newPolicy.custInfo.insurants.otherInsurant.insurant[this.isApp].imageData.forEach(item => {
								if(item.imageName == '25-' + this.isApp) {
									console.log('初次获取其他被保人签字=====>', this.isApp, item.reaPath)
									this.signImgsList.otherInsurant = item.reaPath
								}
							})
						}
					}
					//初始化投保人签字链接
					this.href.sign24 = utils.faceH5Tools.assemble(
						this.newPolicy.custInfo.appnt.appntName,
						this.newPolicy.custInfo.appnt.idNo,
						this.$route.params.planId,
						this.$route.params.applyCode,
						this.newPolicy.custInfo.appnt.idType,
						'1',
						24)
					//初始化被保人签字链接
					if(utils.valid.getAge(this.newPolicy.custInfo.insurants.firstInsurant.birthday) < 18) {
						//第一被保人年龄小于18岁,需投保人签字,进行投保人签字链接初始化
						this.href.sign25 = utils.faceH5Tools.assemble(
							this.newPolicy.custInfo.appnt.appntName,
							this.newPolicy.custInfo.appnt.idNo,
							this.$route.params.planId,
							this.$route.params.applyCode,
							this.newPolicy.custInfo.appnt.idType,
							'1',
							25)
					} else {
						//初始化投保人签字链接
						this.href.sign25 = utils.faceH5Tools.assemble(
							this.newPolicy.custInfo.insurants.firstInsurant.name,
							this.newPolicy.custInfo.insurants.firstInsurant.idNo,
							this.$route.params.planId,
							this.$route.params.applyCode,
							this.newPolicy.custInfo.insurants.firstInsurant.idType,
							'1',
							25)
					}
					if(this.isApp != '24' && this.isApp != '25') {
						let sign26Str = utils.faceH5Tools.assemble(
							this.newPolicy.custInfo.insurants.otherInsurant.insurant[this.isApp].name,
							this.newPolicy.custInfo.insurants.otherInsurant.insurant[this.isApp].idNo,
							this.$route.params.planId,
							this.$route.params.applyCode,
							this.newPolicy.custInfo.insurants.otherInsurant.insurant[this.isApp].idType,
							'1',
							this.isApp)
						if(utils.valid.getAge(this.newPolicy.custInfo.insurants.otherInsurant.insurant[this.isApp].birthday < 18)) {
							this.href.sign26 = utils.faceH5Tools.assemble(
								this.newPolicy.custInfo.appnt.appntName,
								this.newPolicy.custInfo.appnt.idNo,
								this.$route.params.planId,
								this.$route.params.applyCode,
								this.newPolicy.custInfo.appnt.idType,
								'1',
								this.isApp)
						} else {
							this.href.sign26 = sign26Str
						}
						console.log(sign26Str)
					}
					if(this.$route.params.result != -1) {
						//成功打开签字框
						if(this.$route.params.result == 0) {
							if(this.$route.params.index != -1) {
								if(this.$route.params.index == '24' || this.$route.params.index == '25') {
									this.openCA(this.$route.params.index)
								} else {
									this.openCA('25-' + this.$route.params.index)
								}
							}
						} else { //失败进行提示
							var resultmsg = this.$route.params.resultmsg
							if(resultmsg != -1) {
								this.toast(resultmsg)
							}
						}
					}
					let requ1 = {
						"productDef": {
							"agentCode": this.newPolicy.agentInfo.agentCode,
							"productCode": this.toggle.mainProdCode,
							"token": new Date().getTime(),
							"openId": "1"
						}
					}
					utils.http.postFast('PRODUCTDEFLIST', requ1, (body) => { 
						//console.log('产品信息=====>', body.productDefList)
						let typeAll = body.productDefList[0].productDefine.typeAll.slice(0, 4)
						if(typeAll == "1020" || typeAll == "1030" || typeAll == "1040") {
							this.toggle.isChaoLu = true
							if(typeAll == "1020") { //分红寿险
								this.defineList.typeProduct = '01'
								this.typeProducts.push('1020')
							} else if(typeAll == "1030") { //投资连接保险
								this.defineList.typeProduct = '02'
								this.typeProducts.push('1030')
							} else if(typeAll == "1040") { //万能保险
								this.defineList.typeProduct = '03'
								this.typeProducts.push('1040')
							}
						} else {
							this.defineList.typeProduct = '04'
							this.typeProducts.push('')
						}
						let haveInstructionsCode = []
						if(body.productDefList[0].productDefine.specialBooks.indexOf('2') > -1) {
							haveInstructionsCode.push(body.productDefList[0].productCode)
						}
						body.productDefList[0].extraList.forEach((extra, index) => {
							this.allProducts.forEach((item, i) => {
								if(extra.productCode == item.prodCode) {
									if(extra.productDefine.specialBooks.indexOf('2') > -1) {
										haveInstructionsCode.push(extra.productCode)
									}
									let typeAll = extra.productDefine.typeAll.slice(0, 4)
									if(typeAll == "1020" || typeAll == "1030" || typeAll == "1040") {
										this.toggle.isChaoLu = true
										if(typeAll == "1020" && this.typeProducts.indexOf("1020") == -1) {
											this.typeProducts.push("1020")
										} else if(typeAll == "1030" && this.typeProducts.indexOf("1030") == -1) {
											this.typeProducts.push("1030")
										} else if(typeAll == "1040" && this.typeProducts.indexOf("1040") == -1) {
											this.typeProducts.push("1040")
										}
									}
								}
							})
						})
						this.haveInstructionsCode = haveInstructionsCode
						//console.log('显示说明书=====>', this.haveInstructionsCode)
						//console.log('抄录=====>', this.toggle.isChaoLu)
						this.hesitationPeriod = body.productDefList[0].productDefine.hesitationPeriod
						this.defineList.specialBookCode = body.productDefList[0].productDefine.specialBooks
						this.defineList.productCode = body.productDefList[0].productDefine.code
						this.defineList.minPremium = body.productDefList[0].productDefine.minPremium
						this.defineList.timeLimit = body.productDefList[0].productDefine.timeLimit
						//console.log('特殊单证=====>', this.defineList)
						this.getTeshuDanZheng()
						let documentInfo = this.globalDocumentInfo
						console.log('documentInfo=====>', documentInfo)
						for(let j = 0; j < this.definesLists.length; j++) {
							console.log('definesLists=====>', this.definesLists)
							this.definesLists[j].isRead = false
							if(documentInfo != undefined && documentInfo != "") {
								for(let i = 0; i < documentInfo.length; i++) {
									if(documentInfo[i].name == this.definesLists[j].saveName) {
										if(documentInfo[i].isRed == "0") {
											this.definesLists[j].isRead = true
										} else {
											this.definesLists[j].isRead = false
										}
										if(documentInfo[i].isRed == "0" || documentInfo[i].isRed != "0") {
											this.boxScroll()
										}
									}
								}
							}
						}
					}, true)
					//阅读说明书状态
					let isReadInstructions = utils.cache.get('isReadInstructions')
					if(isReadInstructions != undefined) {
						if(isReadInstructions == "1") {
							this.isReadInstructions = isReadInstructions
						}
						this.boxScroll()
					}
					//阅读状态读缓存
					//zhangxin 切记<取值><运算><比较>等操作数据时,需要对数据进行非空/期望值等进行判断
					let tempReadStatus = utils.cache.get("readStatus")
					if(tempReadStatus == undefined) {
						this.readStatus = false
					} else {
						this.readStatus = tempReadStatus
					}
				}).catch(error => {
					console.log(error)
				})
			},
			getImg() {
				let requ = {
					"policy": {
						"substepNo": "",
						"orderCode": this.$route.params.planId,
						"stepNo":'0,1,2,3,7,8',
						"nothave":'2'
					}
				}
				utils.http.post('MOHQPOLICYMSG', requ, true).then(response => {
					let imgData = response.data.response.policy
					console.log('获取签字=====>', imgData)
					if(imgData.agentInfo.imageData.length > 0) {
						for(let imgs of imgData.agentInfo.imageData) {
							if(imgs.imageName == '23') {
								console.log('获取代理人签字=====>', imgs.reaPath)
								this.signImgsList.agent = imgs.reaPath
							}
						}
					}
					if(imgData.custInfo.appnt.imageData.length > 0) {
						for(let imgs of imgData.custInfo.appnt.imageData) {
							if(imgs.imageName == '24') {
								console.log('获取投保人签字=====>', imgs.reaPath)
								this.signImgsList.appnt = imgs.reaPath
							}
							if(imgs.imageName == '30') {
								console.log('获取38个字签字=====>', imgs.reaPath)
								this.signImgsList.cecintent = imgs.reaPath
							}
						}
					}
					if(imgData.custInfo.insurants.firstInsurant.imageData.length > 0) {
						for(let imgs of imgData.custInfo.insurants.firstInsurant.imageData) {
							if(imgs.imageName == '25') {
								console.log('获取被保人签字=====>', imgs.reaPath)
								this.signImgsList.firstInsurant = imgs.reaPath
							}
						}
					}
					if(this.isApp != '24' && this.isApp != '25') {
						if(imgData.custInfo.insurants.otherInsurant.insurant[this.isApp].imageData.length > 0) {
							imgData.custInfo.insurants.otherInsurant.insurant[this.isApp].imageData.forEach(item => {
								if(item.imageName == '25-' + this.isApp) {
									console.log('获取其他被保人签字=====>', this.isApp, item.reaPath)
									this.signImgsList.otherInsurant = item.reaPath
								}
							})
						}
					}
				})
			},
			//说明书过滤
			shuomingshuCallback() {
				this.$router.push({
					name: "commonproductspec",
					params: {
						planId: this.$route.params.planId,
						applyCode: this.newPolicy.applyCode,
						index: this.$route.params.index,
						result: this.$route.params.result,
						resultmsg: this.$route.params.resultmsg,
						signImgs: JSON.stringify(this.signImgsList.appnt),
						signImgsAgent: JSON.stringify(this.signImgsList.agent),
						applicant: this.newPolicy.custInfo.appnt.appntName,
						policyResult: this.newPolicy,
						hesitationPeriod: this.hesitationPeriod,
						agentQuafno: this.newPolicy.agentInfo.quafNo, //代理人展业证号
						typeProduct: this.defineList.typeProduct,
						share: true,
						productCode: this.toggle.mainProdCode,
						channel: this.defineList.showChannel,
						agentCode: this.newPolicy.agentInfo.agentCode,
						agentName: this.newPolicy.agentInfo.name,
						haveInstructionsCode: this.haveInstructionsCode
					}
				})
			},
			//跳转到特殊单证页面
			jumpToTeShuDanZheng(name) {
				console.log(this.allProducts)
				let mainCode = "",
					extraCode = [];
				for(var i = 0; i < this.allProducts.length; i++) {
					if(this.allProducts[i].isMaster == 1) {
						mainCode = this.allProducts[i].prodCode
					} else {
						extraCode.push(this.allProducts[i].prodCode)
					}
				}
				let docNum = ""
				if(name.indexOf('responsibilityConfirm_') > -1) {
					docNum = name.split('_')[1]
					name = 'commonResponsibilityConfirm'
				}
				this.newPolicy.allProducts = this.allProducts
				console.log(extraCode)
				this.$router.push({
					name: name,
					params: {
						newPolicy: this.newPolicy,
						planId: this.$route.params.planId,
						applyCode: this.newPolicy.applyCode,
						index: this.$route.params.index,
						result: this.$route.params.result,
						resultmsg: this.$route.params.resultmsg,
						signImgs: JSON.stringify(this.signImgsList.appnt),
						signImgsAgent: JSON.stringify(this.signImgsList.agent),
						signImgsCqspecial: JSON.stringify(this.signImgsList.cqspecial_signt),
						applicant: this.newPolicy.custInfo.appnt.appntName,
						policyResult: this.newPolicy,
						hesitationPeriod: this.hesitationPeriod,
						agentQuafno: this.newPolicy.agentInfo.quafNo, //代理人展业证号
						typeProduct: this.defineList.typeProduct,
						typeProducts: this.typeProducts,
						share: true,
						productCode: mainCode,
						channel: this.defineList.showChannel,
						agentCode: this.newPolicy.agentInfo.agentCode,
						agentName: this.newPolicy.agentInfo.name,
						docNum: docNum
					}
				})
			},
			getDocList(result) {
				// add spoon 读取缓存中的配置文件
				let list_defineList = ''
				let CONFIG_newPtoduct_policyName_product = utils.cache.get("CONFIG_newPtoduct_policyName_product")
				if(CONFIG_newPtoduct_policyName_product == null || CONFIG_newPtoduct_policyName_product == '') {
					//缓存不存在请求服务器获取配置文件
					utils.n22_http.getConfig(0, function(data) {})
					utils.n22_http.getConfig(1, (data) => {
						list_defineList = data.proposalPlan.listDefine
						result(data.proposalPlan.listDefine)
					})
				} else {
					//正常将缓存中的数据复制到相应节点
					result(utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.listDefine)
				}
			},
			getTeshuDanZheng() {
				let typeArea = this.newPolicy.agentInfo.manageCom.slice(0, 4)
				if(typeArea == '8612') { //天津
					this.defineList.typeArea = '01'
				} else if(typeArea == '8611') { //北京
					this.defineList.typeArea = '02'
				} else if(typeArea == '8631') { //上海
					this.defineList.typeArea = '03'
				} else if(typeArea == '8661') { //重庆
					this.defineList.typeArea = '04'
				} else if(typeArea == '8651') { //广东
					this.defineList.typeArea = '05'
				} else if(typeArea == '8635') { //宁波
					this.defineList.typeArea = '06'
				} else if(typeArea == '8622') { //大连
					this.defineList.typeArea = '07'
				} else if(typeArea == '8648') { //深圳
					this.defineList.typeArea = '08'
				} else if(typeArea == '8634') { //苏州
					this.defineList.typeArea = '09'
				}
				this.defineList.showChannel = this.newPolicy.agentInfo.branchType
				if(this.newPolicy.agentInfo.agentCode.slice(0, 1) != 'B' && (this.defineList.showChannel != '02' || this.defineList.showChannel != '13')) {
					this.defineList.firstIsNotB = true
				} else {
					this.defineList.firstIsNotB = false
				}
				if(this.newPolicy.custInfo.appnt.idNo == this.newPolicy.agentInfo.idNo) {
					this.defineList.buyMyself = '01'
				} else {
					this.defineList.buyMyself = '02'
				}
				console.log('特殊单证=====>', this.defineList)
				this.getDocList((data) => {
					let list = data.list_define.lists.list
					let defines = []
					for(let i = 0; i < list.length; i++) {
						if((this.defineList.typeArea != '' && list[i].typeArea.indexOf(this.defineList.typeArea) > -1 || list[i].typeArea == '00') && (list[i].typeProduct.indexOf(this.defineList.typeProduct) > -1 || list[i].typeProduct == '00')) {
							defines.push(list[i])
							console.log("add 1", list[i])
						}
						if(utils.valid.getAge(this.newPolicy.custInfo.appnt.appntBirthday) < list[i].minShowAge || utils.valid.getAge(this.newPolicy.custInfo.insurants.firstInsurant.birthday) < list[i].insureMinShowAge) {
							if(list[i].counterMustShow && this.defineList.counterMustShow) {

							} else if(this.isInArray(defines, list[i])) {
								defines.splice(this.whereInArray(defines, list[i]))
							}
						}
						if((list[i].limit == '01' && this.defineList.timeLimit == '01') || list[i].limit == '00') {

						} else if(this.isInArray(defines, list[i])) {
							defines.splice(this.whereInArray(defines, list[i]))
							console.log("%c 主险长期险不符", 'color:green', list[i])
						}
						if(list[i].firstIsNotB && !this.defineList.firstIsNotB) {
							if(this.isInArray(defines, list[i])) {
								defines.splice(this.whereInArray(defines, list[i]))
								console.log("%c 银保B开头不符", 'color:green', list[i])
								continue
							}
						}
						if(list[i].showChannel != '00') {
							if(list[i].showChannel == '03') { //银保的
								if(this.defineList.showChannel != "13" && this.defineList.showChannel != "02") {
									if(this.isInArray(defines, list[i])) {
										defines.splice(this.whereInArray(defines, list[i]))
										console.log("%c 渠道不符", 'color:green', list[i])
										continue
									}
								}
							}
						}
						if(list[i].productCode) {
							let isContainProduct = false
							for(let j = 0; j < this.allProducts.length; j++) {
								if(list[i].productCode.indexOf(this.allProducts[j].prodCode) > -1) {
									isContainProduct = true
									break
								}
							}
							if(!isContainProduct || list[i].minPremium < this.allProducts[0].minPlanPrem) {
								if(this.isInArray(defines, list[i])) {
									defines.splice(this.whereInArray(defines, list[i]))
									console.log("%c 产品号和最小保费不符", 'color:green', list[i])
									continue
								}
							}
						}
						if(list[i].buyMyself != '00' && this.defineList.timeLimit == '01') {
							if(this.defineList.buyMyself == '02' && list[i].buyMyself == '01') {
								if(this.isInArray(defines, list[i])) {
									defines.splice(this.whereInArray(defines, list[i]))
									console.log("%c 自保件不符1", 'color:green', list[i])
									continue
								}
							} else if(this.defineList.buyMyself == '01' && list[i].buyMyself == '02') {
								if(this.isInArray(defines, list[i])) {
									defines.splice(this.whereInArray(defines, list[i]))
									console.log("%c 自保件不符2", 'color:green', list[i])
									continue
								}
							}
						} else if(list[i].buyMyself != '00' && this.defineList.timeLimit != '01') {
							if(this.isInArray(defines, list[i])) {
								defines.splice(this.whereInArray(defines, list[i]))
								console.log("%c 自保件不符3", 'color:green', list[i])
								continue
							}
						}
					}
					this.definesLists = defines
					for(var i = 0; i < this.definesLists.length; i++) {
						this.saveName.push(this.definesLists[i].saveName)
					}
					console.log('definesLists,saveName=====>', this.definesLists, this.saveName)
				})
			},
			toast(msg) {
				Toast({
					message: msg,
					duration: 2500
				})
			},
			//CA签字
			openCA(signNum) {
				this.caValue.isCAOpen = !this.caValue.isCAOpen
				this.caValue.image = ""
				this.caValue.context_id = signNum
			},
			opensCA(signNums) {
				this.caValue.isCASOpen = !this.caValue.isCASOpen
				this.caValue.image = ""
				this.caValue.context_id = signNums
			},
			//跳转至影像上传页面
			push() {
				this.$refs.alert.showMOdal("签字完成后，请点击确定，并告知代理人。")
				if(this.readStatus == true) {
					//阅读状态存缓存
					utils.cache.set('readStatus', this.readStatus)
				}
			},
			isInArray(arr, value) {
				for(var i = 0; i < arr.length; i++) {
					if(value === arr[i]) {
						return true;
					}
				}
				return false;
			},
			whereInArray(arr, value) {
				for(var i = 0; i < arr.length; i++) {
					if(value === arr[i]) {
						return i;
					}
				}
			},
			//跳转页面返回后停留在底部位置
			boxScroll() {
				setTimeout(() => {
					window.scrollTo(0, 100000000000)
				}, 80)
			},
			isShow(type, index) {
				if(type == 'ins') {
					let item = this.newPolicy.custInfo.insurants.otherInsurant.insurant[index]
					item.showInsInfo = !item.showInsInfo
					this.$set(this.newPolicy.custInfo.insurants.otherInsurant.insurant, index, item)
					if(item.showInsInfo) {
						$('#showIns-' + index).css('transform', 'rotate(180deg)')
					} else {
						$('#showIns-' + index).css('transform', 'rotate(360deg)')
					}
				} else if(type == 'bnf') {
					let item = this.newPolicy.custInfo.insurants.otherInsurant.insurant[index]
					item.showBnfInfo = !item.showBnfInfo
					this.$set(this.newPolicy.custInfo.insurants.otherInsurant.insurant, index, item)
					if(item.showBnfInfo) {
						$('#showBnf-' + index).css('transform', 'rotate(180deg)')
					} else {
						$('#showBnf-' + index).css('transform', 'rotate(360deg)')
					}
				}
			},
		}
	}
</script>

<style scoped type="text/css" lang=scss>
	.ele-policy {
		width: 100%;
	}
	
	.main-contents {
		width: 100%;
		background: #fff;
		position: absolute;
		top: 48px;
		bottom: 50px;
		overflow-y: auto;
		overflow-x: hidden;
		box-sizing: border-box;
		.fa {
			color: #ccc;
		}
		.fa-angle-up {
			font-size: 20px;
		}
		.part {
			margin-bottom: 10px;
			.title {
				height: 40px;
				background: #F5F5F5;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 5%;
				div {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					p {
						color: #333;
						font-size: 14px;
						margin-left: 8px;
						margin-right: 8px;
					}
				}
			}
			.detail {
				width: 87%;
				margin: 7% 5% 7%;
				padding: 3% 0%;
				box-shadow: 0 0 10px #ccc;
				border-radius: 3px;
				color: #3E3A39;
				p {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					line-height: 2;
					padding: 0% 3%;
					color: #3E3A39;
					span {
						width: 48%;
					}
					b {
						color: #FFA600;
					}
					.isReadT {
						color: #0C3752;
					}
				}
				.flex {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					align-items: center;
					padding: 0 5%;
					div {
						width: 45%;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin: 2% 0 5%;
						p {
							font-size: 14px;
							color: #666;
							margin-bottom: 5%;
							padding: 0;
						}
						p+p {
							width: 110px;
							height: 70px;
							img {
								width: 100%;
							}
						}
					}
				}
			}
		}
	}
	
	.btnFoote {
		border: 0;
		color: #fff;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #FEB101;
	}
</style>