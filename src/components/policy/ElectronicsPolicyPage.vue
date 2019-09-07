<!--电子保单页面-->
<template>
	<div>
		<NewCA v-show="caValue.isCAOpen" v-model="caValue" :value="caValue"></NewCA>
		<NewCAS v-show="caValue.isCASOpen" v-model="caValue" :value="caValue"></NewCAS>
		<div v-show="contentIsOpen">
			<Headerbtns :title="'电子投保单'">
				<div slot="left" @click="backSales"><i class="fa fa-angle-left"></i></div>
				<div slot="right" @click="sheetVisible = !sheetVisible"><i class="fa fa-ellipsis-v"></i></div>
			</Headerbtns>
			<div class="main-contents">
				<NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
				<div class="main-contents-right">
					<div class="wrapper" :class="showShare.isShow ?'elHidden':'elScroll'">
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
											<label style="position: absolute;left:32px;top: 25%;color: #fff;">否</label>
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
								<!--<textarea v-show="item.swh" v-model="item.showRes" rows="4" readonly style="width: 94%;height:auto;padding: 2%;border:1px solid #C7C5C5;"></textarea>-->
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
									<div @click="openCADialog(23,$event)">
										<p>业务人员签字</p>
										<p>
											<img v-show="signImgsList.agent==''" :src="wrting" />
											<img v-show="signImgsList.agent!=''" :src="signImgsList.agent" />
										</p>
									</div>
									<div @click="openCADialog(24,$event)">
										<p>投保人{{newPolicy.custInfo.appnt.appntName}}签字</p>
										<p>
											<img v-show="signImgsList.appnt==''" :src="wrting" />
											<img v-show="signImgsList.appnt!=''" :src="signImgsList.appnt" />
										</p>
									</div>
									<div @click="openCADialog(25,$event)" v-show="newPolicy.custInfo.insurants.firstInsurant.relToApp!='00'">
										<p v-show="newPolicy.custInfo.insurants.otherInsurant.insurant.length==0">被保险人{{newPolicy.custInfo.insurants.firstInsurant.name}}签字
											<br />(法定监护人)</p>
										<p v-show="newPolicy.custInfo.insurants.otherInsurant.insurant.length>0">第一被保险人{{newPolicy.custInfo.insurants.firstInsurant.name}}
											<br />签字(法定监护人)</p>
										<p>
											<img v-show="signImgsList.firstInsurant==''" :src="wrting" />
											<img v-show="signImgsList.firstInsurant!=''" :src="signImgsList.firstInsurant" />
										</p>
									</div>
									<div v-for="(item,index) in newPolicy.custInfo.insurants.otherInsurant.insurant" v-show="item.relToApp!='00'" @click="openCADialog(index,$event)">
										<p>第{{index|getInsNo}}被保险人{{item.name}}
											<br />签字(法定监护人)</p>
										<p>
											<img v-show="signImgsList.otherInsurant[index].src==''" :src="wrting" />
											<img v-show="signImgsList.otherInsurant[index].src!=''" :src="signImgsList.otherInsurant[index].src" />
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
						<div v-show="showShare.isShow" class="shares" @click="hideShare">
							<div class="content">
								<h3>选择分享签名</h3>
								<div class="flex">
									<p :class="[showShare.type == 'appnt'?'active':'']" @click.stop="shareApp('appnt')">投保人{{newPolicy.custInfo.appnt.appntName}}</p>
									<p :class="[showShare.type == 'insurant' && showShare.index == '-1'?'active':'']" @click.stop="shareApp('insurant','-1')" v-show="newPolicy.custInfo.insurants.firstInsurant.relToApp!='00'">第一被保人{{newPolicy.custInfo.insurants.firstInsurant.name}}</p>
									<p :class="[showShare.type == 'insurant' && showShare.index == index?'active':'']" v-for="(item,index) in newPolicy.custInfo.insurants.otherInsurant.insurant" @click.stop="shareApp('insurant',index)" v-show="item.relToApp!='00'">第{{index|getInsNo}}被保人{{item.name}}</p>
								</div>
								<p class="foot" :class="showShare.isShare?'footAct':''" @click.stop="shareApp(1)">确 定</p>
							</div>
						</div>

					</div>
				</div>
			</div>
			<FooterBar>
				<div slot="center" @click="push">下一步</div>
			</FooterBar>
		</div>
		<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		<alert ref="alert"></alert>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import FooterBar from '../policy/common/FooterBar.vue'
	import NavigationBox from '../policy/common/NavigationBox.vue'
	import NewCA from '../common/NewCA'
	import NewCAS from '../common/NewCAS'
	import alert from '../policy/common/alert.vue'
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
	import '../policy/css/base.css'

	export default {
		name: 'electronics_policy_page',
		components: {
			Headerbtns,
			FooterBar,
			NavigationBox,
			NewCA,
			NewCAS,
			alert
		},
		data() {
			return {
				showNavList: false,
				navigationList: [],
				screenWidth: window.screen.width,
				screenHeight: window.screen.height,
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
				sheetVisible: false,
				showShare: {
					isShow: false,
					type: '',
					index: '',
					isShare: false,
				},
				actions: [{
						name: "微信分享(签字/抄录)",
						method: this.showShares
					},
					{
						name: "刷新页面",
						method: this.winReload
					},
					{
						name: "提取签字",
						method: this.winReload
					},
					{
						name: "返回首页",
						method: this.backHome
					}
				],
				wrting: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAACkCAYAAADxNTBqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0REQzVEMEQ5QURGMTFFOUE3REJGNDU4OTE0RDMyNEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0REQzVEMEU5QURGMTFFOUE3REJGNDU4OTE0RDMyNEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRERDNUQwQjlBREYxMUU5QTdEQkY0NTg5MTREMzI0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRERDNUQwQzlBREYxMUU5QTdEQkY0NTg5MTREMzI0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjkXSxkAABiXSURBVHja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',
				icon_zhu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABWCAYAAAA9pePPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODk2MjlDNjk5QURBMTFFOUE3REJGNDU4OTE0RDMyNEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODk2MjlDNkE5QURBMTFFOUE3REJGNDU4OTE0RDMyNEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4OTYyOUM2NzlBREExMUU5QTdEQkY0NTg5MTREMzI0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4OTYyOUM2ODlBREExMUU5QTdEQkY0NTg5MTREMzI0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgBs8bAAAATwSURBVHja7J19iFRVGMbfubhUS4EUG1l/CGGEVH9EGITgfxVFW0Zf2MdmRPalUfRJQZlkRdRSUVYUfWyFRn9oWSQbrGIUFqzVlqBm2a62ZZubZVra6PQ8nTPsuGx6Z9a9953peeAZLnfufHB+c99zzns+plB61yab2UL4JLgAl0zKUnvgXvgd+BlrLfXxZAFgqOPgDngaPE5llZt+hC8DnI/KYKhm+En4SvgwlVGucM5IKk7shK+H58ODKp/cNAG+KRl2shTB3AxvVhnlpunJfzyxCG6D16iMctHxyX6eXP5vRWTWpXLKXIXkABesiXfOayqrTFVKUlz0AzwbfhDepTLLRknK6/6A57K1AG9VsfkBU9bL8OXwxoYvmfHnmE162uz0T8Jx1pVMRQezGp0KP8uOUMOCOa3T7Ngzw3H/h2bdZ2X56cWkxhd+Dl8Bv92wYNbeMXR89FSzJt+hrFIbY0f0sYYEs6PHbPDrcDyu2azltroBQw3E1trshoSzefHQ8YRs65mDkUlmju0FeFPs74x3XdgT55k1T0x3bdPh+4azyVV053b2mvXen3nlP+J7wVPgN+AT3IKZ+pXZkSeP/ecwDH58SuaV/4i9VfgzmPc80zh71RvJN5QN17fwJbFRwLGdQ9zVG4Or018/qW3oeENHdaEsh35MqggN3w3fBR9Rtz/d1oqR9qUF9/2YNPobfgieA29RcMq2uZxGbMrMZJdNxe0LDLUsZgpWqMh9gaFWx8bA6yp2X2Aoju1wwscj8G4Vfz6tsgOJYzvzc8sUtI7hvMZVV5sNdIzmHYpJjj+KBfA1cJ/uj/xD2XAtgWfwNyYUfkJZpU6MYe0idTDzD2WVWmdh6KBd94qPUFapn2Dmye8UFl9gqB3wU7He2S4wvsQc21vw+fA3AuNLrHFXRDhdAuNPa2NYe8XCyqv/jeph9djP8CwL6RzOKTq05nfixL2mltq/SUtblUF5wGzbB3Xdj0krpnHmwUfV9OqsxvvLqn3cv5jU2R1eTuOsUyjzp6Vwf+yMTqvqldvXZ/tNR/F59RbKKnVM7PNc2oA3TN2FsuGZgqsinIYb20nq/PsTyK3wffA2gfGnxy0kQb8XGH96E77WwmxQgXGmrghnicD4Exe13Ag/LzA+W2ycmvuAwPgTx3MejaHtd4Hx15x+1cLqg/UC40tcp9NpYaLHSoHx2SjgnbNQYPyJYzsz4SfgosD4q3c44MbZOL8IjD9xm8nr4O8Exp+YIbgY/lRg/Inbr1wAv2eOtjYWmKAtsTn9kjkZ2xGYfRsFnI3zMPyrwPgT98a53XIe2xGYkcUJhlyS2C0w/tQZO6PLBMafmMZhdrpDYPyJc9huiY2CksD40m8WpubekFWLTWDSi3tOv2hhh48NAuNLDGWcvs80ziqB8acv4enwYoHxJ6ZxuGCG+08XBcaXuLU+9/29xw7yhA+BGb24mLc9dkb7BcZfo4D1zXmxUyowzsSxnbMt/CnSXoHxlyk418Ik910C40t/xRZbe62ZAoEZW91rYQ51n8D4E4erORunR2D8iWM7XC+6UmD8qSfCWSQw/sS6hrt78H8P9giML7GVxg3z5uyvxSYw+Yj9m+diaOsTGH9638Is0G6B8abW0hd4vNDCAJzAOIOzKYa1BfFMQWD8wOFfJZfX7ewWGF9w/rSwbmfGPwIMAOsrGVRyDrF0AAAAAElFTkSuQmCC',
				icon_fu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABWCAYAAAA9pePPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEIwRUIyRDI5QUREMTFFOUE3REJGNDU4OTE0RDMyNEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEIwRUIyRDM5QUREMTFFOUE3REJGNDU4OTE0RDMyNEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4OTYyOUM2QjlBREExMUU5QTdEQkY0NTg5MTREMzI0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4OTYyOUM2QzlBREExMUU5QTdEQkY0NTg5MTREMzI0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvXYIx4AAAbtSURBVHja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',
				signImgsList: {
					agent: '', //代理人
					appnt: '', //投保人
					cecintent: '', //38个字
					firstInsurant: '', //主被保人
					otherInsurant: [], //其他被保人
					cqspecial_signt: '', //重庆单证
				}
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
			showNavList(val, oldval) {
				if(val == true) {
					let sum = 0
					let interval = setInterval(() => {
						sum += 1
						$(".main-contents-right").css({
							"left": sum + '%'
						})
						if(sum == 50) {
							clearInterval(interval)
						}
					}, 5)
				} else {
					let sum = 50
					let interval = setInterval(() => {
						sum -= 1
						$(".main-contents-right").css({
							"left": sum + '%'
						})
						if(sum == 0) {
							clearInterval(interval)
						}
					}, 5)
				}
			},
			contentIsOpen(val) {
				if(val) {
					this.getImg()
				}
			},
			readStatus(val) {
				if(!val) {
					utils.cache.removeItem("readStatus")
				}
			},
			'showShare.isShow': {
				handler(val, oldval) {
					if(val == true) {
						$('.wrapper').css('height', $('.main-contents').height())
					}
				},
				deep: true
			},
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
			selectedNav(item) {
				if(item.step < 8) {
					if(item.step == 1 || item.step == 3) {
						this.$router.push({
							name: item.name,
							params: {
								planId: this.$route.params.planId,
								step: '1'
							}
						})
					} else if(item.step == 4) {
						this.$router.push({
							name: item.name,
							params: {
								planId: this.$route.params.planId,
								insNo: item.seqNumber,
								step: '1'
							}
						})
					} else {
						this.$router.push({
							name: item.name,
							params: {
								planId: this.$route.params.planId
							}
						})
					}
				}
			},
			getPolicyMsg() {
				let requ = {
					"policy": {
						"substepNo": "",
						"orderCode": this.$route.params.planId,
						"stepNo": '0,1,2,3,7,8',
						"nothave": '2'
					}
				}
				utils.http.post('MOHQPOLICYMSG', requ, true).then(response => {
					this.newPolicy = response.data.response.policy
					this.caValue.applyCode = this.newPolicy.applyCode
					//if(this.newPolicy.navigationList.length == 0) {
					this.navigationList = this.newPolicy.navigationList
					this.navigationList.forEach(item => {
						item.path = ''
						if(item.step < '8') {
							item.path = 'cheng'
						}
						if(item.step == '8') {
							item.path = 'lv'
						}
					})
					/*	
					} else {
						this.navigationList = [{
								step: '1',
								name: 'product_details_page',
								path: 'cheng',
								content: '基本信息',
								seqNumber: '',
								saveFlag: '1'
							},
							{
								step: '3',
								name: 'customer_details_page',
								path: 'cheng',
								content: '投保人信息',
								seqNumber: '',
								saveFlag: '1'
							},
							{
								step: '4',
								name: 'custDetails',
								path: 'cheng',
								content: '被保人信息',
								seqNumber: '-1',
								saveFlag: '1'
							},
							{
								step: '5',
								name: 'productsPage',
								path: 'cheng',
								content: '险种确认',
								seqNumber: '',
								saveFlag: '1'
							}, {
								step: '6',
								name: 'inform_page',
								path: 'cheng',
								content: '健康告知',
								seqNumber: '',
								saveFlag: '1'
							}, {
								step: '7',
								name: 'salesman_report_page',
								path: 'cheng',
								content: '业务人员报告书',
								seqNumber: '',
								saveFlag: '1'
							}, {
								step: '8',
								name: 'electronics_policy_page',
								path: 'lv',
								content: '电子投保书',
								seqNumber: '',
								saveFlag: '1'
							}, {
								step: '9',
								name: 'videoUpload',
								path: '',
								content: '资料上传',
								seqNumber: '',
								saveFlag: '1'
							}
						]
					}*/
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
						this.signImgsList.otherInsurant.push({
							src: ''
						})
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
					if(this.newPolicy.custInfo.insurants.otherInsurant.insurant.length > 0) {
						this.newPolicy.custInfo.insurants.otherInsurant.insurant.forEach((item, index) => {
							if(item.imageData.length > 0) {
								for(let newItem of item.imageData) {
									if(newItem.imageName == '25-' + index) {
										console.log('初次获取其他被保人签字=====>', index, newItem.reaPath)
										this.signImgsList.otherInsurant[index].src = newItem.reaPath
									}
								}
							}
						})
					}
					console.log('===signImgsList 初次>', this.signImgsList)
					let requ1 = {
						"productDef": {
							"agentCode": utils.cache.get('personsal').agentCode,
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
						"stepNo": '0,1,2,3,7,8',
						"nothave": '2'
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
					if(imgData.custInfo.insurants.otherInsurant.insurant.length > 0) {
						imgData.custInfo.insurants.otherInsurant.insurant.forEach((item, index) => {
							if(item.imageData.length > 0) {
								for(let newItem of item.imageData) {
									if(newItem.imageName == '25-' + index) {
										console.log('获取其他被保人签字=====>', index, newItem.reaPath)
										this.signImgsList.otherInsurant[index].src = newItem.reaPath
									}
								}
							}
						})
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
						signImgs: JSON.stringify(this.signImgsList.appnt),
						signImgsAgent: JSON.stringify(this.signImgsList.agent),
						applicant: this.newPolicy.custInfo.appnt.appntName,
						policyResult: this.newPolicy,
						hesitationPeriod: this.hesitationPeriod,
						agentQuafno: this.newPolicy.agentInfo.quafNo, //代理人展业证号
						typeProduct: this.defineList.typeProduct,
						productCode: this.toggle.mainProdCode,
						channel: this.defineList.showChannel,
						agentCode: this.newPolicy.agentInfo.agentCode,
						agentName: this.newPolicy.agentInfo.name,
						haveInstructionsCode: this.haveInstructionsCode
					}
				})
			},
			left() {
				this.backSales()
			},
			right() {
				this.push()
			},
			backHome() {
				this.$router.push("/home")
			},
			//添加单证信息
			addInfo() {
				let document = {
					dzType: "",
					dzInfo: [],
					docTypeInfo: {}
				}
				let documentInfo = utils.cache.get("documentInfo")
				if(documentInfo != undefined && documentInfo.length > 0) {
					for(let i = 0; i < documentInfo.length; i++) {
						const element = documentInfo[i];
						if(element.isRed == "0") {
							//重庆分公司
							// if(this.defineList.typeArea =="04"){
							// 	document.dzType="2050301"
							// }
							document.dzType += element.name + ","
							document.dzInfo.push({
								"name": element.name,
								"isRed": element.isRed,
								"content": element.content
							})
							if(element.content != "") {
								//zhangxin,通过判断单证页面回传的name跟配置文件中的saveName进行比对赋值
								if(element.name == "2050101") { //0个人寿险销售说明书
									document.docTypeInfo.TB2_2050101 = element.content
								} else if(element.name == "2050801") { //1年长客户购买保险特别提示
									document.docTypeInfo.TB2_2050801 = element.content
								} else if(element.name == "2050701") { //2年长客户投保意愿和经济承受能力测评卷
									document.docTypeInfo.TB2_2050801 = element.content
								} else if(element.name == "2050301") { //3重庆需求问卷
									document.docTypeInfo.TB2_2050801 = element.content
								} else if(element.name == "2011401_04") { //4录音录像客户问答内容确认书（非新型产品）
									document.docTypeInfo.TB2_2011401_01 = element.content
								} else if(element.name == "2011401_01") { //5录音录像客户问答内容确认书（分红型产品）
									document.docTypeInfo.TB2_2011401_01 = element.content
								} else if(element.name == "2011401_02") { //6录音录像客户问答内容确认书（投资连结型产品）
									document.docTypeInfo.TB2_2011401_01 = element.content
								} else if(element.name == "2011401_03") { //7问答内容确认书（万能型产品）
									document.docTypeInfo.TB2_2011401_01 = element.content
								} else if(element.name == "2050601") { //8投保特别提示
									document.docTypeInfo.TB2_2050601 = element.content
								} else if(element.name == "2050501") { //9宁波测评问卷
									document.docTypeInfo.TB2_2050501 = element.content
								} else if(element.name == "2050901_05") { //10自保件投保声明确认书（分红险）
									document.docTypeInfo.TB2_2050901_05 = element.content
								} else if(element.name == "2050901_06") { //11自保件投保声明确认书（投连险）
									document.docTypeInfo.TB2_2050901_06 = element.content
								} else if(element.name == "2050901_07") { //12自保件投保声明确认书（万能险）
									document.docTypeInfo.TB2_2050901_07 = element.content
								} else if(element.name == "2050901_08") { //13自保件投保声明确认书（传统险）
									document.docTypeInfo.TB2_2050901_08 = element.content
								} else if(element.name == "2011201") { //14银行转账授权书
									document.docTypeInfo.TB2_2011201 = element.content
								} else if(element.name == "3011601_03") { //15金生富贵产品认购书
									document.docTypeInfo.TB2_3011601_03 = element.content
								} else if(element.name == "3011601_02") { //16富贵双全产品认购书
									document.docTypeInfo.TB2_3011601_02 = element.content
								} else if(element.name == "fgsqbxtbgz") { //17富贵双全投保告知
									document.docTypeInfo.TB2_fgsqbxtbgz = element.content
								} else if(element.name == "2050201") { //18关于费用补偿型医疗保险产品提示
									document.docTypeInfo.TB2_2050201 = element.content
								} else if(element.name == "2050401") { //19人身保险产品风险提示书
									document.docTypeInfo.TB2_2050401 = element.content
								} else if(element.name == "2011801") { //20光大永明金保安康保险产品计划 2017 免除保险人责任确认书
									document.docTypeInfo.TB2_2011801 = element.content
								} else if(element.name == "2012101") { //21光大永明安鑫福年金保险免除保险人责任确认书
									document.docTypeInfo.TB2_2012101 = element.content
								} else if(element.name == "2012201") { //22光大永明康爱无忧更新型疾病保险免除保险人责任确认书
									document.docTypeInfo.TB2_2012201 = element.content
								} else if(element.name == "2012501") { //23光大永明附加安驾宝交通意外伤害保险免除保险人责任确认书
									document.docTypeInfo.TB2_2012501 = element.content
								} else if(element.name == "2012901") { //24光大永明附加定期寿险免除保险人责任确认书
									document.docTypeInfo.TB2_2012901 = element.content
								} else if(element.name == "2013001") { //25光大永明附加少儿重大疾病保险免除保险人责任确认书
									document.docTypeInfo.TB2_2013001 = element.content
								} else if(element.name == "2013101") { //26光大永明附加投保人豁免保险费重大疾病保险免除保险人责任确认书
									document.docTypeInfo.TB2_2013101 = element.content
								} else if(element.name == "2013201") { //27光大永明附加无忧女性疾病保险免除保险人责任确认书
									document.docTypeInfo.TB2_2013201 = element.content
								} else if(element.name == "2013301") { //28光大永明富贵人生年金保险(分红型)免除保险人责任确认书
									document.docTypeInfo.TB2_2013301 = element.content
								} else if(element.name == "2013401") { //29光大永明至爱家传终身寿险免除保险人责任确认书
									document.docTypeInfo.TB2_2013401 = element.content
								} else if(element.name == "2013502") { //30光大永明关爱永逸两全保险(2018 版)免除保险人责任确认书
									document.docTypeInfo.TB2_2013502 = element.content
								} else if(element.name == "2013601") { //31光大永明增利宝年金保险(万能型)免除保险人责任确认书
									document.docTypeInfo.TB2_2013601 = element.content
								} else if(element.name == "2013701") { //32光大永明附加至爱家传重大疾病保险免除保险人责任确认书
									document.docTypeInfo.TB2_2013701 = element.content
								} else if(element.name == "2014001") { //33光大永明吉瑞宝重疾保险产品计划免除保险人责任确认书
									document.docTypeInfo.TB2_2014001 = element.content
								} else if(element.name == "2012801") { //34光大永明中老年健康保险产品计划免除保险人责任确认书
									document.docTypeInfo.TB2_2012801 = element.content
								} else if(element.name == "2050201") { //35关于费用补偿型医疗保险产品提示
									document.docTypeInfo.TB2_2050201 = element.content
								} else if(element.name == "2013801") { //36光大永明附加关爱永逸重大疾病保险（ 2018 版）
									document.docTypeInfo.TB2_2013801 = element.content
								} else if(element.name == "2014001") { //37吉瑞宝重疾保险产品计划责任免除声明书免除保险人责任确认书
									document.docTypeInfo.TB2_2014001 = element.content
								} else if(element.name == "2014806") { //38光大永明安心成长少儿重大疾病保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014806 = element.content
								} else if(element.name == "2014807") { //39光大永明附加安心成长少儿两全保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014807 = element.content
								} else if(element.name == "2014816") { //40光大永明意外住院津贴（2018版）医疗保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014816 = element.content
								} else if(element.name == "2014817") { //41光大永明意外费用补偿（2018版）医疗保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014817 = element.content
								} else if(element.name == "2012401") { //42光大永明金保安盈年金保险(分红型)免除保险人责任确认书
									document.docTypeInfo.TB2_2012401 = element.content
								} else if(element.name == "2014820") { //43光大永明意外伤害保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014820 = element.content
								} else if(element.name == "2014819") { //44光大永明永宁康顺（2018版）老年意外伤害保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014819 = element.content
								} else if(element.name == "2014802") { //45光大永明福运金生终身年金保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014802 = element.content
								} else if(element.name == "2014803") { //46光大永明安鑫禧年金保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014803 = element.content
								} else if(element.name == "2012301") { //47光大永明至爱相传终身寿险(分红型，2017 版)免除保险人责任确认书
									document.docTypeInfo.TB2_2012301 = element.content
								} else if(element.name == "2014808") { //48光大永明光大乐活养老年金保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014808 = element.content
								} else if(element.name == "2014818") { //49光大永明安康百万医疗保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014818 = element.content
								} else if(element.name == "2014801") { //50光大永明 鑫玺人生年金保险（分红型）免除保险人责任 确认书
									document.docTypeInfo.TB2_2014801 = element.content
								} else if(element.name == "2014822") { //51光大永明光明财富定期寿险A款免除保险人责任确认书
									document.docTypeInfo.TB2_2014822 = element.content
								} else if(element.name == "2014825") { //52光大永明无忧住院津贴医疗保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014825 = element.content
								} else if(element.name == "2014826") { //53光大永明无忧住院医疗保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014826 = element.content
								} else if(element.name == "2014827") { //54光大永明附加住院医疗保险A款免除保险人责任确认书
									document.docTypeInfo.TB2_2014827 = element.content
								} else if(element.name == "2014401") { //55光大永明童佳保重大疾病保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014401 = element.content
								} else if(element.name == "2014501") { //56光大永明附加童佳保两全保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014501 = element.content
								} else if(element.name == "2014601") { //57光大永明附加童佳保投保人豁免保险费重大疾病保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014601 = element.content
								} else if(element.name == "2014828") { //52光大永明无忧住院津贴医疗保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014828 = element.content
								} else if(element.name == "2014829") { //59光大永明附加安驾宝交通长期意外伤害保险免除保险人责任确认书
									document.docTypeInfo.TB2_2014829 = element.content
								}
							}
						}
					}
				}
				console.log("获取已查看单证信息")
				console.log(document)
				document.dzType.substring(0, document.dzType.length - 1)
				return document
			},
			//跳转到特殊单证页面
			jumpToTeShuDanZheng(name) {
				console.log('=================', this.allProducts)
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
				//=================================
				console.log('newPolicy===========>', this.newPolicy)
				console.log('planId===========>', this.$route.params.planId)
				console.log('applyCode===========>', this.newPolicy.applyCode)
				console.log('signImgs===========>', this.signImgsList.appnt)
				console.log('signImgsAgent===========>', this.signImgsList.agent)
				console.log('signImgsCqspecial===========>', this.signImgsList.cqspecial_signt)
				console.log('applicant===========>', this.newPolicy.custInfo.appnt.appntName)
				console.log('policyResult===========>', this.newPolicy)
				console.log('hesitationPeriod===========>', this.hesitationPeriod)
				console.log('agentQuafno===========>', this.newPolicy.agentInfo.quafNo)
				console.log('typeProduct===========>', this.defineList.typeProduct)
				console.log('typeProducts===========>', this.typeProducts)
				console.log('productCode===========>', this.defineList.showChannel)
				console.log('productExtraCode===========>', extraCode)
				console.log('channel===========>', this.newPolicy.agentInfo.agentCode)
				console.log('agentCode===========>', this.newPolicy.agentInfo.agentCode)
				console.log('agentName===========>', this.newPolicy.agentInfo.name)
				console.log('docNum===========>', docNum)
				this.$router.push({
					name: name,
					params: {
						newPolicy: this.newPolicy,
						planId: this.$route.params.planId,
						applyCode: this.newPolicy.applyCode,
						signImgs: JSON.stringify(this.signImgsList.appnt),
						signImgsAgent: JSON.stringify(this.signImgsList.agent),
						signImgsCqspecial: JSON.stringify(this.signImgsList.cqspecial_signt),
						applicant: this.newPolicy.custInfo.appnt.appntName,
						policyResult: this.newPolicy,
						hesitationPeriod: this.hesitationPeriod,
						agentQuafno: this.newPolicy.agentInfo.quafNo, //代理人展业证号
						typeProduct: this.defineList.typeProduct,
						typeProducts: this.typeProducts,
						productCode: mainCode,
						productExtraCode: extraCode,
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
				let typeArea = utils.cache.get("personsal").orgId.slice(0, 4)
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
				this.defineList.showChannel = utils.cache.get("personsal").channel
				if(utils.cache.get("agentCode").slice(0, 1) != 'B' && (this.defineList.showChannel != '02' || this.defineList.showChannel != '13')) {
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
			winReload: function(cond) {
				window.location.reload();
			},
			showShares() {
				if(this.signImgsList.agent == '') {
					alert_n22.alert('提示', '请完成业务员签字!', '确定')
				} else {
					if(this.newPolicy.custInfo.insurants.otherInsurant.insurant.length == 0 && this.newPolicy.custInfo.insurants.firstInsurant.relToApp == '00') {
						this.showShare.type = 'appnt'
						this.shareApp(1)
					} else {
						this.showShare.isShow = true
					}
				}
			},
			hideShare() {
				this.showShare.isShow = false
				this.showShare.type = ''
				this.showShare.index = ''
				this.showShare.isShare = false
			},
			shareApp(type, index) {
				console.log('==>111', type, index, this.showShare)
				let host = window.globalConfig.rootUrl.split('/')[2]
				let protocol = window.globalConfig.rootUrl.split(':')[0]
				let applyCode = this.newPolicy.applyCode
				let shareLink
				if(type == 1) {
					this.showShare.isShow = false
					if(this.showShare.type == 'appnt') {
						shareLink = protocol + "://" + host + "/com.ifp.ipartner/proposalShare/index.html#/policy/electronics_share/" + this.$route.params.planId + "/" + applyCode + "/24/-1/-1"
					} else if(this.showShare.type == 'insurant') {
						if(this.showShare.index == '-1') {
							shareLink = protocol + "://" + host + "/com.ifp.ipartner/proposalShare/index.html#/policy/electronics_share/" + this.$route.params.planId + "/" + applyCode + "/25/-1/-1"
						} else {
							shareLink = protocol + "://" + host + "/com.ifp.ipartner/proposalShare/index.html#/policy/electronics_share/" + this.$route.params.planId + "/" + applyCode + "/" + this.showShare.index + "/-1/-1"
						}
					}
					console.log("分享地址 ===>" + shareLink)
					this.showShare.type = ''
					this.showShare.index = ''
					this.showShare.isShare = false
					Wechat.share({
						message: {
							title: "电子投保单",
							description: "电子投保单",
							thumb: "www/static/img/common/0.png",
							mediaTagName: '链接',
							media: {
								type: Wechat.Type.WEBPAGE,
								webpageUrl: shareLink
							}
						},
						scene: Wechat.Scene.SESSION // share to Timeline
					}, function() {
						utils.ui.modal.afterOpen()
						this.$refs.alert.showMOdal('分享成功')
						utils.ui.modal.beforeClose()
					}, function(reason) {
						utils.ui.modal.afterOpen()
						this.$refs.alert.showMOdal(reason)
						utils.ui.modal.beforeClose()
					})
				} else {
					this.showShare.type = type
					this.showShare.index = index
					this.showShare.isShare = true
					this.showShare.isShow = true
				}
			},
			//投保书页面点击返回按钮时提示签字信息被清空
			backSales() {
				if(this.navigationList.length == 0) {
					MessageBox.confirm('光速保2.0升级，需要对本保单数据基本信息重新确认并且清空签字，请确认是否返回。').then(action => {
						this.$router.push({
							name: "product_details_page",
							params: {
								planId: this.$route.params.planId,
								step: '1'
							}
						})
					});
				} else if(this.signImgsList.cecintent != "" || this.signImgsList.agent != "" || this.signImgsList.appnt != "" || this.signImgsList.firstInsurant != "" || this.signImgsList.cqspecial_signt != "") {
					console.log('存在签字,提示确定返回要清空')
					MessageBox.confirm('返回上一步签字信息会被清空，是否确定要返回？').then(action => {
						this.$router.push({
							name: 'salesman_report_page',
							params: {
								planId: this.$route.params.planId
							}
						})
					});
				} else {
					console.log('不存在签字,可直接返回')
					this.$router.push({
						name: 'salesman_report_page',
						params: {
							planId: this.$route.params.planId
						}
					})
				}
			},
			//点击签字调用人脸识别
			openCADialog(signNum, event) {
				this.offsetHeight = event.currentTarget.offsetTop
				let cust = undefined
				if(signNum == "23") {
					cust = {
						name: this.newPolicy.agentInfo.name,
						idNum: this.newPolicy.agentInfo.idNo,
						idType: "11"
					}
					this.openCA(23)
					return
				} else if(signNum == "24") {
					cust = {
						name: this.newPolicy.custInfo.appnt.appntName,
						idNum: this.newPolicy.custInfo.appnt.idNo,
						idType: this.newPolicy.custInfo.appnt.idType
					}
				} else if(signNum == "25") {
					let age = utils.valid.getAge(this.newPolicy.custInfo.insurants.firstInsurant.birthday)
					if(age < 18) {
						cust = {
							name: this.newPolicy.custInfo.appnt.appntName,
							idNum: this.newPolicy.custInfo.appnt.idNo,
							idType: this.newPolicy.custInfo.appnt.idType
						}
					} else {
						cust = {
							name: this.newPolicy.custInfo.insurants.firstInsurant.name,
							idNum: this.newPolicy.custInfo.insurants.firstInsurant.idNo,
							idType: this.newPolicy.custInfo.insurants.firstInsurant.idType
						}
					}
				} else {
					let age = utils.valid.getAge(this.newPolicy.custInfo.insurants.otherInsurant.insurant[signNum].birthday)
					if(age < 18) {
						cust = {
							name: this.newPolicy.custInfo.appnt.appntName,
							idNum: this.newPolicy.custInfo.appnt.idNo,
							idType: this.newPolicy.custInfo.appnt.idType
						}
						signNum = 25 + '-' + signNum
					} else {
						cust = {
							name: this.newPolicy.custInfo.insurants.otherInsurant.insurant[signNum].name,
							idNum: this.newPolicy.custInfo.insurants.otherInsurant.insurant[signNum].idNo,
							idType: this.newPolicy.custInfo.insurants.otherInsurant.insurant[signNum].idType
						}
						signNum = 25 + '-' + signNum
					}
				}
				console.log("进行识别信息=====>" + signNum, cust)
				MAPlugin.hybridCallAction('hybrid://MAFaceIdentify:401/invokeFaceIdentify?', (callbackSucc) => {
					this.ficeDistinguish(signNum, callbackSucc, cust)
				}, (callbackFail) => {
					alert(callbackFail);
				});
			},
			//CA签字
			openCA(signNum) {
				this.caValue.isCAOpen = !this.caValue.isCAOpen
				$('html,body').animate({
					scrollTop: this.offsetHeight + 'px'
				})
				this.caValue.image = ""
				this.caValue.context_id = signNum
			},
			opensCA(signNum) {
				this.caValue.isCASOpen = !this.caValue.isCASOpen
				$('html,body').animate({
					scrollTop: this.offsetHeight + 'px'
				})
				this.caValue.image = ""
				this.caValue.context_id = signNum
			},
			getPolicyImg(success, fail) {
				let requ = {
					"policy": {
						"substepNo": "",
						"orderCode": this.$route.params.planId,
						"stepNo": '0,1,2,3,7,8',
						"nothave": '2'
					}
				}
				utils.http.post('MOHQPOLICYMSG', requ).then(response => {
					let data = response.data.response
					let projectHead = response.data.header
					console.log("%c 数据>>>>>>>", 'color:green', data)
					if(projectHead.responseCode != 0) {
						let stringIndex = response.data.header.errorMessage.indexOf("at com")
						let errorMessage = response.data.header.errorMessage.slice(0, stringIndex)
						if(stringIndex > -1) {
							MessageBox({
								title: '提示',
								message: errorMessage
							});
						} else {
							MessageBox({
								title: '提示',
								message: projectHead.errorMessage
							});
						}
					} else if(projectHead.responseCode == 0) {
						success(data, projectHead)
						console.log('再次获取签字=====>', data.policy)
						if(data.policy.agentInfo.imageData.length > 0) {
							for(let imgs of data.policy.agentInfo.imageData) {
								if(imgs.imageName == '23') {
									console.log('代理人签字=====>', imgs.reaPath)
									this.signImgsList.agent = imgs.reaPath
								}
							}
						}
						if(data.policy.custInfo.appnt.imageData.length > 0) {
							for(let imgs of data.policy.custInfo.appnt.imageData) {
								if(imgs.imageName == '24') {
									console.log('投保人签字=====>', imgs.reaPath)
									this.signImgsList.appnt = imgs.reaPath
								}
								if(imgs.imageName == '30') {
									console.log('38个字签字=====>', imgs.reaPath)
									this.signImgsList.cecintent = imgs.reaPath
								}
								if(imgs.imageName == '31') {
									console.log('重庆单证签字=====>', imgs.reaPath)
									this.signImgsList.cqspecial_signt = imgs.reaPath
								}
							}
						}
						if(data.policy.custInfo.insurants.firstInsurant.imageData.length > 0) {
							for(let imgs of data.policy.custInfo.insurants.firstInsurant.imageData) {
								if(imgs.imageName == '25') {
									console.log('被保人签字=====>', imgs.reaPath)
									this.signImgsList.firstInsurant = imgs.reaPath
								}
							}
						}
						if(data.policy.custInfo.insurants.otherInsurant.insurant.length > 0) {
							data.policy.custInfo.insurants.otherInsurant.insurant.forEach((item, index) => {
								if(item.imageData.length > 0) {
									for(let newItem of item.imageData) {
										if(newItem.imageName == '25-' + index) {
											console.log('其他被保人签字=====>', index, newItem.reaPath)
											this.signImgsList.otherInsurant[index].src = newItem.reaPath
										}
									}
								}
							})
						}
					}
				}).catch(error => {
					fail()
					console.log(error);
				})
			},
			//进行人脸识别接口调用方法
			ficeDistinguish: function(signNum, image, cust) {
				let requ = {
					"policy": {
						"agentCode": "",
						"name": cust.name,
						"cardId": cust.idNum,
						"idType": cust.idType,
						"functionCode": "POLICY",
						"imageByte": image,
						"applyCode": this.newPolicy.applyCode,
						"policyCode": ""
					}
				}
				// console.log(JSON.stringify(requ))
				utils.http.postFast('FACEIDKSHL', requ, (body) => {
					if(body.policy.resultCode == '0') {
						// 识别成功后可以进行后续注册操作
						console.log(body.policy.resultMsg);
						this.openCA(signNum);
					} else {
						this.$refs.alert.showMOdal(body.policy.resultMsg)
					}
				})
			},
			//跳转至影像上传页面
			push() {
				this.getPolicyImg(() => {
					alert_n22.confirm('提示', '<p>请确认电子投保单<font color="#FDB92C">最下方橙色字体</font>单证中的<font color="red">签字信息是否完整！</font></p>', '确定', '取消', (flag) => {
						if(this.haveInstructionsCode.length > 0 && !this.isReadInstructions) {
							alert_n22.alert('提示', '请完成所有阅读!', '确定')
							return
						}
						let documentInfo = this.addInfo()
						console.log("已存阅读单证")
						console.log(documentInfo.dzInfo)
						console.log("需阅读单证")
						console.log(this.definesLists)
						if(documentInfo.dzInfo.length != this.definesLists.length) {
							alert_n22.alert('提示', '请完成所有阅读!', '确定')
							return
						}
						for(var i = 0; i < documentInfo.dzInfo.length; i++) {
							for(var j = 0; j < this.definesLists.length; j++) {
								if(documentInfo.dzInfo[i].name == this.definesLists[j].saveName) {
									if(documentInfo.dzInfo[i].isRed == "1") {
										alert_n22.alert('提示', '请完成所有阅读!', '确定')
										return
									}
								}
							}
						}
						let isPass = this.checkAll()
						if(isPass) {
							console.log('传值=planId====>', this.$route.params.planId)
							console.log('传值=saveName====>', this.saveName)
							console.log('传值=document====>', documentInfo)
							this.$router.push({
								name: "videoUpload",
								params: {
									planId: this.$route.params.planId,
									saveName: this.saveName, //特殊单证保存文件代码
									document: documentInfo,
								}
							})
						}
						if(this.readStatus == true) {
							//阅读状态存缓存
							utils.cache.set('readStatus', this.readStatus)
						}
					})
				})
			},
			checkAll() {
				if(this.toggle.isChaoLu && this.signImgsList.cecintent == "") {
					alert_n22.alert('提示', '请完成风险提示语抄录!', '确定')
					return false
				}
				if(this.signImgsList.agent == "") {
					alert_n22.alert('提示', '请完成业务员签字!', '确定')
					return false
				}
				if(this.signImgsList.appnt == "") {
					alert_n22.alert('提示', '请完成投保人签字!', '确定')
					return false
				}
				if(this.newPolicy.custInfo.insurants.firstInsurant.relToApp != '00' && this.signImgsList.firstInsurant == "") {
					alert_n22.alert('提示', '请完成被保人签字!', '确定')
					return false
				}
				if(this.newPolicy.custInfo.insurants.otherInsurant.insurant.length > 0) {
					this.newPolicy.custInfo.insurants.otherInsurant.insurant.forEach((otherIns, index) => {
						if(otherIns.relToApp != '00' && this.signImgsList.otherInsurant[index].src == '') {
							alert_n22.alert('提示', '请完成被保人' + otherIns.name + '签字!', '确定')
							return false
						}
					})
				}
				if(this.readStatus === false) {
					alert_n22.alert('提示', '请勾选确认按钮!', '确定')
					return false
				}
				return true
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
	.main-contents {
		bottom: 50px;
		div.elHidden {
			overflow-y: hidden !important;
		}
		div.elScroll {
			overflow-y: auto;
		}
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
		.shares {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.1);
			position: fixed;
			top: 0;
			z-index: 10000;
			.content {
				width: 85%;
				background: #fff;
				line-height: 35px;
				box-sizing: border-box;
				margin: 80% auto;
				border: 1px solid #ddd;
				border-radius: 5px;
				padding: 0;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				h3 {
					background: url('./../../../static/img/policy/bg.png') no-repeat top left #fff;
					background-size: 100% 100%;
					text-align: center;
					margin-bottom: 15px;
					padding: 10px 0;
				}
				.flex {
					display: flex;
					justify-content: space-around;
					width: 100%;
					flex-wrap: wrap;
					p {
						width: 43%;
						color: #999;
						border: 1px solid #cbcbcb;
						border-radius: 15px;
						text-align: center;
						background: #fff;
						margin-bottom: 15px;
					}
					p.active {
						background: #FEB101;
						color: #fff;
					}
				}
				.foot {
					text-align: center;
					background: #F0F0F0;
					color: #999;
					padding: 5px 0;
					border-bottom-left-radius: 5px;
					border-bottom-right-radius: 5px;
				}
				.footAct {
					background: #FEB101;
					color: #fff;
				}
			}
		}
	}
	/* .main-contents {
		-webkit-overflow-scrolling: auto !important;
	} */
</style>