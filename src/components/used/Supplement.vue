<!--电子保单页面-->
<template>
	<div>
		<CADialog v-show="false" @click=""></CADialog>
		<CommentDialog v-show="caValue.isCACommentOpen && !caValue.isCAOpen" v-model="caValue"></CommentDialog>
		<div v-show="contentIsOpen">
			<Headerbtns :title="'电子投保单风险提示语抄录'"></Headerbtns>
			<div class="manage-main-contents">
				<!--投保人信息 start-->
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">投保人身份信息:</div>
								<p class="line-h">
									<i @click="showContent(1)" id="btn_1" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isAppIdInform">
							<div style="padding:0 5%;" class="inform-content">
								<div style="width:50%">
									<p class="user">姓名:&nbsp;{{policy.custInfo.appnt.appntName}}</p>
									<p class="user">婚姻:&nbsp;{{policy.custInfo.appnt.marriage|getMarriageText}}</p>
									<p class="user">证件类型:&nbsp;{{policy.custInfo.appnt.idType|getIdTypeText}}</p>
								</div>
								<div style="width:50%">
									<p class="user">国籍:&nbsp;{{policy.custInfo.appnt.nativePlace|getNationalText}}</p>
									<p class="user">性别:&nbsp;{{policy.custInfo.appnt.appntSex|getSexText}}</p>
									<p class="user">出生日期:&nbsp;{{policy.custInfo.appnt.appntBirthday}}</p>
								</div>
							</div>
							<div style="padding:0 5%;">
								<p>证件号码:{{policy.custInfo.appnt.idNo}}</p>
								<p class="user">证件有效期:&nbsp;{{policy.custInfo.appnt.idExpDate}}</p>
								<p class="user">年收入:&nbsp;{{policy.custInfo.appnt.salary}}万元</p>
							</div>
						</div>
					</div>
				</div>
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-envelope" aria-hidden="true"></i>
								</p>
								<div class="title">投保人联系方式:</div>
								<p class="line-h">
									<i @click="showContent(2)" id="btn_2" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isAppContactInform">
							<div class="line">
								<p>联系地址:&nbsp;{{policy.custInfo.appnt.province|getProvinceText}} {{policy.custInfo.appnt.city|getCityText}} {{policy.custInfo.appnt.county}} {{policy.custInfo.appnt.street}} {{policy.custInfo.appnt.community}} {{policy.custInfo.appnt.postalAddress}}
								</p>
							</div>
							<div class="line">
								<p class="user">邮政编码:&nbsp;{{policy.custInfo.appnt.zipCode}}</p>
								<p class="user">联系电话:&nbsp;{{policy.custInfo.appnt.mobile}}</p>
								<p class="user"></p>
							</div>
							<div class="line">
								<p>电子邮箱:&nbsp;{{policy.custInfo.appnt.email}}</p>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-address-card" aria-hidden="true"></i>
								</p>
								<div class="title">投保人职业信息:</div>
								<p class="line-h">
									<i @click="showContent(3)" id="btn_3" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isAppOccuInform">
							<div class="line">
								<p>职业类别:&nbsp;{{policy.custInfo.appnt.occupationType}}类</p>
							</div>
							<div class="line">
								<p>职业名称:&nbsp;{{policy.custInfo.appnt.appOccupation}}</p>
							</div>
							<div class="line">
								<p>工作单位:&nbsp;{{policy.custInfo.appnt.grpName}}</p>
							</div>
							<div class="line">
								<p>投保人税收居民身份:&nbsp;{{appntTaxInfo.taxIdentity|getResidentText}}</p>
							</div>
							<div class="line" v-if="appntTaxInfo.taxIdentity != 1">
								<p>出生地:&nbsp;国家&nbsp;{{appntTaxInfo.birthCountry|getNationalText}}&nbsp;省&nbsp;{{appntTaxInfo.birthProvince}}&nbsp;市&nbsp;{{appntTaxInfo.birthCity}}</p>
							</div>
							<div v-for="tmp of appntTaxInfo.taxInfoList.taxInfo" class="info">
								<div class="line">
									<p>税收居民国(地区):&nbsp;{{tmp.taxArea|getNationalText}}</p>
								</div>
								<div class="line">
									<p>居民国(地区)纳税人识别号TIN:&nbsp;{{tmp.tin}}</p>
								</div>
								<div class="line">
									<p>若无法提供纳税人识别号,请选择原因A或B:&nbsp;{{tmp.reasonCheck}}</p>
								</div>
								<div class="line">
									<p>原因:&nbsp;{{tmp.reasonMessage}}</p>
								</div>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<!--投保人信息 end-->
				<!--被保人信息 start-->
				<div class="border-radius">
					<div class="appnt">
						<div class="recognizee">
							<div class="recognizeeData">
								<p class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">被保人信息:</div>
								<p class="line-h">
									<i @click="showContent(4)" id="btn_4" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isInsIdInform" class="recognizeeUser" v-for="tmp of recognizeeList">
							<div style="padding:0 5%;" class="inform-content" v-if="relToApp != '00'&&relToApp != '本人'">
								<div style="width:50%">
									<p class="user">姓名:&nbsp;{{tmp.name}}</p>
									<p class="user">婚姻:&nbsp;{{tmp.marriage}}</p>
									<p class="user">证件类型:&nbsp;{{tmp.idType|getCardText}}</p>
								</div>
								<div style="width:50%">
									<p class="user">国籍:&nbsp;{{tmp.nativePlace}}</p>
									<p class="user">性别:&nbsp;{{tmp.sex == "1"? "男":""}}{{tmp.sex == "2"? "女":""}}</p>
									<p class="user">出生日期:&nbsp;{{tmp.birthday}}</p>
								</div>
							</div>
							<div style="width:100%;padding:0 5%;">
								<p class="user" v-if="relToApp != '00'&&relToApp != '本人'">证件有效期:&nbsp;{{tmp.idExpDate}}</p>
								<p class="user" v-if="relToApp != '00'&&relToApp != '本人'">证件号码:&nbsp;{{tmp.idNo}}</p>
								<p class="user">与投保人关系:&nbsp;{{tmp.relToApp}}</p>
								<p class="user" v-if="relToApp != '00'&&relToApp != '本人'">年收入:&nbsp;{{tmp.salary}}万元</p>
							</div>
						</div>
					</div>
				</div>
				<div class="border-radius" v-if="relToApp != '00'&&relToApp != '本人'">
					<div class="appnt">
						<div class="recognizee">
							<div class="recognizeeData">
								<p class="line-h">
									<i class="fa fa-envelope" aria-hidden="true"></i>
								</p>
								<div class="title">被保险人联系方式:</div>
								<p class="line-h">
									<i @click="showContent(5)" id="btn_5" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isInsContactInform" class="recognizeeUser" v-for="tmp of recognizeeList">
							<div class="line">
								<p>联系地址:&nbsp;{{tmp.province|getProvinceText}}{{tmp.city|getCityText}}{{tmp.county}}{{tmp.street}}{{tmp.community}}{{tmp.postalAddress}}</p>
							</div>
							<div class="line">
								<p class="user">邮政编码:&nbsp;{{tmp.zipCode}}</p>
								<p class="user">联系电话:&nbsp;{{tmp.mobile}}</p>
								<p class="user"></p>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<div class="border-radius" v-if="relToApp != '00'&&relToApp != '本人'">
					<div class="appnt">
						<div class="recognizee">
							<div class="recognizeeData">
								<p class="line-h">
									<i class="fa fa-address-card" aria-hidden="true"></i>
								</p>
								<div class="title">被保险人职业信息:</div>
								<p class="line-h">
									<i @click="showContent(6)" id="btn_6" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isInsOccuInform" class="recognizeeUser" v-for="tmp of recognizeeList">
							<div class="info">
								<p>职业类别:&nbsp;{{tmp.occupationType}}类</p>
							</div>
							<div class="info">
								<p>职业名称:&nbsp;{{tmp.insOccupation}}</p>
							</div>
							<div class="info">
								<p>工作单位:&nbsp;{{tmp.grpName}}</p>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<!--被保人信息 end-->
				<!-- 产品信息 start -->
				<div v-for="tmp of riskList">
					<div class="border-radius">
						<div class="appnt">
							<div class="recognizee">
								<div class="recognizeeData">
									<p class="tip" style="width:30px;text-align:center">{{tmp.isMaster == 1 ? "主":"附"}}</p>
									<div class="title">&nbsp;&nbsp;{{tmp.isMaster == 1 ? "主险" : "附加险"}}</div>
									<p class="line-h" v-if="tmp.isMaster == 1">
										<i @click="showContent(8)" id="btn_8" class="fa fa-angle-double-down" aria-hidden="true"></i>
									</p>
									<p class="line-h" v-if="tmp.isMaster != 1">
										<i @click="showContent(9)" id="btn_9" class="fa fa-angle-double-down" aria-hidden="true"></i>
									</p>
								</div>
							</div>
							<div v-show="tmp.isMaster == 1 && toggle.isProductInform" class="recognizeeUser">
								<div class="line">
									<p>险种名称:&nbsp;{{tmp.prodName}}</p>
								</div>
								<div class="line">
									<p class="user">保险期间:&nbsp;{{tmp.insureYearName}}</p>
									<p class="user">交费期间:&nbsp;{{tmp.payYearName}}</p>
									<p class="user"></p>
								</div>
								<div class="line">
									<p>交费频率:&nbsp;{{tmp.payIntvName}}</p>
								</div>
								<div class="line">
									<p>基本保险金额(元/份):&nbsp;{{tmp.amnt|getAmnt}}</p>
								</div>
								<div class="line">
									<p>保费(元):&nbsp;{{tmp.prem}}</p>
								</div>
								<div class="line">
								</div>
							</div>
							<div v-show="tmp.isMaster != 1 && toggle.isProduct2Inform" class="recognizeeUser">
								<div class="line">
									<p>险种名称:&nbsp;{{tmp.prodName}}</p>
								</div>
								<div class="line">
									<p class="user">保险期间:&nbsp;{{tmp.insureYearName}}</p>
									<p class="user">交费期间:&nbsp;{{tmp.payYearName}}</p>
									<p class="user"></p>
								</div>
								<div class="line">
									<p>交费频率:&nbsp;{{tmp.payIntvName}}</p>
								</div>
								<div class="line">
									<p>基本保险金额(元/份):&nbsp;{{tmp.amnt|getAmnt}}</p>
								</div>
								<div class="line">
									<p>保费(元):&nbsp;{{tmp.prem}}</p>
								</div>
								<div class="line">
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 产品信息 end -->
				<!-- 首期合计 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">首期保费合计:&nbsp;{{sumPremL}}元</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 首期合计 end -->
				<!-- 银行自动转账授权 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="bankCard">
							<div class="bankCardData">
								<p class="line-h">
									<i class="fa fa-credit-card" aria-hidden="true"></i>
								</p>
								<div class="title">&nbsp;银行自动转账授权:</div>
								<p class="line-h">
									<i @click="showContent(11)" id="btn_11" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="toggle.isAppBankInform" class="bankCardInfo">
							<div class="infoName">
								<p>账户姓名:&nbsp;{{bankInfo.bankAccName}}</p>
								<p>开户银行:&nbsp;{{bankInfo.bankCode}}</p>
							</div>
							<div class="info">
								<p>银行账号:&nbsp;{{bankInfo.bankAccNo}}</p>
							</div>
							<div class="infoText">
								<p>1.上述银行账号的账户所有人为投保人本人,账户信息真实可靠。账户所有人授权光大永明人寿保险有限公司(以下简称"本公司")和开户银行从该账户中以转账方式自动扣划投保人所应交纳的各期保险费，并同意本公司将应支付给投保人的各项款项划入该账户。</p>
							</div>
							<div class="infoText">
								<p>2.如因该账户信息错误,账户注销,账户余额不足或其他非本公司原因导致的转账扣费和支付不成功,由此所致投保人交费失败或本公司付费失败的任何责任由投保人本人承担。</p>
							</div>
							<div class="info">
							</div>
						</div>
					</div>
				</div>
				<!-- 银行自动转账授权 end -->
				<!-- 业务员信息 start -->
				<div class="border-radius">
					<div class="appnt">
						<div class="applicant">
							<div class="applicantData">
								<p class="line-h">
									<i class="fa fa-user" aria-hidden="true"></i>
								</p>
								<div class="title">&nbsp;业务人员/代理人机构信息</div>
								<p class="line-h">
									<i @click="showContent(14)" id="btn_14" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div class="applicantUser" v-show="toggle.isSaleInform">
							<div class="line">
								<p>代理机构名称:&nbsp; <span v-if="!jgNoShow">{{agent.managename}}</span></p>
							</div>
							<div class="line">
								<p>代理机构代码:&nbsp; <span v-if="!jgNoShow">{{agent.managecode}}</span></p>
							</div>
							<div class="line">
								<p class="user">业务员姓名:&nbsp;{{agent.name}}</p>
								<p class="user">业务员代码:&nbsp;{{agent.agentcode}}</p>
								<p class="user"></p>
							</div>
							<div class="line">
							</div>
						</div>
					</div>
				</div>
				<!-- 业务员信息 end -->
				<!-- 保险业务人员声明 -->
				<div style="margin-bottom:20%;" class="border-radius">
					<div class="appnt">
						<div class="insureAccount">
							<div class="insureAccountData">
								<p>
									<i class="fa fa-list" aria-hidden="true"></i>
								</p>
								<div class="title">保险业务人员声明:</div>
								<p>
									<i @click="showData(11)" id="btn11" class="fa fa-angle-double-down" aria-hidden="true"></i>
								</p>
							</div>
						</div>
						<div v-show="dataShow.dataShow11" v-model="dataShow.dataShow11" class="insureAccountInfo">
							<div class="info">
								<p>本人确已面晤投保人、被保险人，对其所投保险种的条款、费率，尤其是产品说明书、投资账户收取的各项费用（投资连结保险、分红保险、万能型保险适用）、责任免除事项、合同解除权等规定及临时保险单的各项内容均已据实向投保人说明，并见证由投保人、被保险人或被保险人的法定监护人亲自在投保书上签名。除投保书中所填写内容外，投保人及被保险人没有向本人口头或以其他方式告知任何其他事项。如有不是见证或讲解，本人愿负法律责任。</p>
							</div>
							<div class="infoSign1">
								<p>直属代理人/经纪代理人签名:</p>
							</div>
							<div class="infoSign2">
								<p>业务人员签字</p>
							</div>
							<div class="infoSign3" style="height:80px">
								<a style="display:block;height: 70px;width:30%;background: #E1DCD4;">
									<img style="width:100%;height:100%;" id="xss_23" :src="wrting">
								</a>
							</div>
							<div class="info" v-show="isProdCode">
								<p>风险提示语抄录</p>
							</div>
							<div class="infoSign1Area" v-show="isProdCode">
								<p class="signImg" @click="opensCA(30)">
									<img style="width:100%;height:100%;" id="xss_30" :src="
									wrting">
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<alert ref="alert"></alert>
			<Footerbtns :is_show=false :disabled="true" total_premium="10000.00">
				<button class="btnFoote" slot="center" @click="push">
					确定
				</button>
			</Footerbtns>
		</div>
	</div>
</template>

<!--js-->
<script>
	import { MessageBox } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import Footerbtns from '../policy/common/Footer.vue'
	import CADialog from '../common/CADialog.vue'
	import CommentDialog from '../common/CommentDialog.vue'
	import alert from '../policy/common/alert.vue'
	import Home from '../common/ca_sign.vue'
	import cardTypeList from '../../assets/dict/card_type_sunlife.json'
	import nationalList from '../../assets/dict/national_sunlife.json'
	import marriageList from '../../../static/dict/marriage_sunlife.json'
	import residentList from '../../../static/dict/resident_sunlife.json'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import relationList from '../../../static/dict/relation_benefit.json'
	import benefitList from '../../../static/dict/relation_benefit.json'
	import cityList from '../../../static/dict/city_sunlife.json'
	import provinceList from '../../../static/dict/province_sunlife.json'
	import dividendList from '../../../static/dict/dividend_sunlife.json'

	export default {
		name: 'supplement',
		components: {
			Headerbtns,
			Footerbtns,
			Home,
			CommentDialog,
			alert,
			CADialog
		},
		data() {
			return {
				tempApplyCode: '',
				tempOrderId: '',
				jgNoShow: false,
				globalDocumentInfo: '',
				isReadInstructions: false, //是否已阅读说明书
				haveInstructionsCode: [], //需要显示产品说明书的产品code
				resRemark2: "",
				resRemark1: "",
				fetationData: "", //健康告知中13项怀孕日期
				readStatus: false, //阅读按钮状态
				sumPremL: "", //首期保险费合计
				appntTaxInfo: {
					taxInfoList: {
						taxInfo: []
					}
				},
				toggle: {
					isAppIdInform: true,
					isAppContactInform: true,
					isAppOccuInform: true,
					isInsIdInform: true,
					isInsContactInform: true,
					isInsOccuInform: true,
					isBfcyIdInform: true,
					isProductInform: true,
					isProduct2Inform: true,
					isAppBankInform: true,
					isSaleReport: true,
					isAppInform: true,
					isInsInform: true,
					isSaleInform: true,
					isOtherInform: true,
				},
				isApp: 1111111111,
				current_total_premium: '10000.00',
				wrting: 'data:image/jpeg;base64,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',
				//签字信息
				signImgs: {
					"agent_signt": "", //代理人签字
					"cecintent_signt": "",
				},
				//健康告知
				dict: {
					informList: [],
				},
				policy: {
					agent: {},
					custInfo: {
						appnt: {}
					},

				},
				temp: {
					insured: {}
				},
				name: "",
				dataShow: {
					dataShow1: true,
					dataShow2: true,
					dataShow3: true,
					dataShow4: true,
					dataShow5: true,
					dataShow6: true,
					dataShow7: false,
					dataShow8: false,
					dataShow9: true,
					dataShow10: true,
					dataShow11: true
				},
				riskShow: false,
				caValue: {
					isCAOpen: false,
					isCACommentOpen: false,
					image: "",
					context_id: '',
					applyCode: this.tempApplyCode,
					orderId: this.tempOrderId
				},
				//投保人信息
				applicant: {
					name: '',
					gender: '',
					birth: '',
					country: '',
					idType: '',
					idTime: '',
					idNumber: '',
					marriage: '',
					mobileTel: '',
					phone: '',
					homePhoneCode: '',
					email: '',
					area: '',
					province: '',
					city: '',
					county: '',
					emsCode: '',
					workArea: '',
					workTel: '',
					companyPhoneCode: '',
					profession: '',
					professionType: '',
					professionNum: '',
					yearIncome: '',
					taxIdentity: '',
					taxArea: '',
					tin: '',
					reasonCheck: '',
					reasonMessage: ''
				},
				//被保人信息
				relToApp: '', //与被保险人关系
				recognizeeList: [{
					name: '',
					relation: '',
					sex: '',
					birthday: '',
					nativePlace: '',
					idType: '',
					idExpDate: '',
					idNo: '',
					marriage: '',
					mobile: '',
					homePhone: '',
					postalAddress: '',
					zipCode: '',
					companyAddress: '',
					companyPhone: '',
					insOccupation: '',
					occupationType: '',
					occupationCode: '',
					salary: ''
				}],
				//身故受益人
				deathFav: "",
				deathFavoreeList: [{
					name: '',
					sex: '',
					birthday: '',
					nativePlace: '',
					idType: '',
					idExpDate: '',
					idNo: '',
					marriage: '',
					mobile: '',
					homePhone: '',
					postalAddress: '',
					zipCode: '',
					companyAddress: '',
					companyPhone: '',
					insOccupation: '',
					occupationType: '',
					occupationCode: '',
					salary: ''
				}],
				//险种信息
				riskList: [{
					prodName: '',
					insureYear: '',
					payYear: '',
					amnt: '',
					prem: '',
					firstPrem: '',
					payIntv: '',
					isAutoXubao: '',
					liveGetMode: '',
					autoPayFlag: '',

					minPlanPrem: '',
					planSumPremL: '',
					invAccTimeOption: '',
					insuAccNo: '',
					investRate: ''
				}, ],
				//银行自动转账授权
				bankInfo: {
					//投保人银行信息
					bankAccName: '',
					bankAccNo: '',
					bankCode: ''
					//被保人银行信息没返回
				},
				/*代理人信息*/
				agent: {
					name: '',
					agentCode: '',
					agentCom: '',
					agentComCode: ''
				},
				/*业务员姓名*/
				counterman: {
					bank: '', //银行代理
					countermanName: '', //代理机构名称
					countermanNameCode: '', //柜员姓名和代码
					countermanCode: '', //代理机构代码
					name: '', //业务员姓名
					code: '', //业务员代码
					idNumber: ''
				},
				resRemark: '', //告知书
				policyInfo: {
					approach: "", //途径
					approach_1: false,
					approach_2: false,
					approach_3: false,
					approach_4: false,
					approach_5: false,
					approach_6: false,
					approach_7: false,
					approachDes: "", //其他途径
					purpose: "", //目的
					purpose_1: false,
					purpose_2: false,
					purpose_3: false,
					purpose_4: false,
					purpose_5: false,
					purposeDes: "", //其他目的
					annualIncome: "", //年收入
					conduit: "", //银保综金区别
					sourceOfIncome: "", //来源
					thirdPtAddr: "", //联系地址
					thirdPtContact: "", //联系方式
					thirdPtIdentity: "", //第二部分是,否,无法识别
					thirdPtIdentity_1: false,
					thirdPtIdentity_2: false,
					thirdPtIdentity_3: false,
					thirdPtName: "", //机构名称
					thirdPtRelToApp: "", //其他关系
					thirdPtRemark: "", //怀疑原因
					totalAssets: "" //总资产
				},
				saveName: [], //特殊单证传服务端
				definesLists: [], //特殊单证数组
				listDefine: "", //特殊单证
				defineList: { //特殊单证
					"specialBookCode": "",
					"typeArea": "",
					"typeProduct": "",
					"minShowAge": "",
					"insureMinShowAge": "",
					"showChannel": "",
					"firstIsNotB": "",
					"counterMustShow": "", //银保时的柜员必须显示
					"productCode": "",
					"minPremium": "",
					"timeLimit": "",
					"buyMyself": ""
				},
				prodCode: "", //产品code
				isProdCode: "",
				policyResult: "",
				isGa: false
			}
		},
		//CA签字
		beforeMount: function() {
			//初始化CA签字
			initAnySign('999999');
			//添加签字对象
			var res7 = addCommentObj(30, '李四', '1207241994');
			if(!res7) {
				this.showMsg("addCommentObj error");
			}
			//CA签字提交配置
			commitConfig()
		},
		computed: {
			caInfo() {
				console.log("检测变化==>", this.caValue)
				return this.caValue.image
			},
			caShow() {
				return this.caValue.isCAOpen
			},
			contentIsOpen() {
				console.log(this.caValue.isCAOpen)
				console.log(this.caValue.isCACommentOpen)
				if(this.caValue.isCAOpen || this.caValue.isCACommentOpen) {
					return false
				} else {
					return true
				}
			},
		},
		watch: {
			caInfo(val, oldval) {
				console.log(val)
				if(val != undefined){
					this.imageUpload(val.context_id, val.value)
				}
			},
			caShow(val, oldval) {
				if(!val) {
					this.getMsg();
				}
			},
			readStatus: function() {
				if(this.readStatus == false) {
					utils.cache.removeItem("readStatus")
				}
			}
		},
		mounted() {
			let policyCode = window.prompt("请认真写您需要补录签字的保单号!","")
			if(policyCode == "" || policyCode==null){
				window.alert("请认真写您需要补录签字的保单号!")
				window.location.reload()
			}
			
			this.tempApplyCode = policyCode
			this.tempOrderId = policyCode
			
			//请求保单数据并赋值
			let requ = {
				"policy": {
					"substepNo": "",
					"orderCode": this.tempOrderId,
				}
			}
			utils.http.post('MOHQPOLICYMSG', requ).then(response => {
				if(response.data.header.responseCode != '0'){
					let stringIndex=response.data.header.errorMessage.indexOf("at com")
			        let errorMessage=response.data.header.errorMessage.slice(0,stringIndex)
			        if(stringIndex>-1){
			          this.showMsg(errorMessage);
			        }else{
			          this.showMsg(projectHead.errorMessage);
			        }
					return
				}
				let result = response.data.response
				this.policy = result.policy
				if('01/03/04/11/02/13'.indexOf(this.policy.agentInfo.branchtype) > -1) {
					this.jgNoShow = true
				} else {
					this.jgNoShow = false
				}
				this.policyResult = result.policy
				this.appntTaxInfo = result.policy.custInfo.appnt.appntTaxInfo
				console.log("检查税收居民身份问题", this.appntTaxInfo)
				this.counterman.name = result.policy.agentInfo.name
				this.counterman.idNumber = result.policy.agentInfo.idno
				this.relToApp = result.policy.custInfo.insurants.insurant[0].relToApp
				this.tempPolicy = result.policy
				this.applyCode = result.policy.applyCode
				// 3.险种信息
				let productInfoPolicy = []
				let extra = []
				let policy = []
				let isGuanAi = false
				productInfoPolicy = response.data.response.policy.productInfo.products.product
				for(let i in productInfoPolicy) {
					if(productInfoPolicy[i].prodCode == 'LBT029') {
						isGuanAi = true /*是关爱永逸*/
						this.isGa = true
					} else {
						this.isGa = false
					}
					if(productInfoPolicy[i].isMaster == "1" && productInfoPolicy[i].isMaster != "") {
						policy.push(productInfoPolicy[i])
					} else {
						extra.push(productInfoPolicy[i])
					}
				}
				this.riskList = policy.concat(extra)
				this.sumPremL = response.data.response.policy.productInfo.sumPremL
				//4.银行自动转账授权
				//投保人银行信息
				let productInfo = response.data.response.policy.productInfo;
				this.bankInfo.bankAccName = productInfo.bankAccName;
				this.bankInfo.bankAccNo = productInfo.bankAccNo;
				this.bankInfo.bankCode = this.getBankList(productInfo.bankCode);
				/*5.业务员信息*/
				let _policyInfo = response.data.response.policy.policyInfo
				console.log('.....................业务员信息', _policyInfo)
				let arr = _policyInfo.approach.split(",")
				for(let i = 0; i < arr.length; i++) {
					if(arr[i] == 0) {
						this.policyInfo.approach_1 = true
					}
					if(arr[i] == 1) {
						this.policyInfo.approach_2 = true
					}
					if(arr[i] == 2) {
						this.policyInfo.approach_3 = true
					}
					if(arr[i] == 3) {
						this.policyInfo.approach_4 = true
					}
					if(arr[i] == 4) {
						this.policyInfo.approach_5 = true
					}
					if(arr[i] == 5) {
						this.policyInfo.approach_6 = true
					}
					if(arr[i] == 6) {
						this.policyInfo.approach_7 = true
						this.policyInfo.approachDes = _policyInfo.approachDes
					}
				}
				let arr2 = _policyInfo.purpose.split(",")
				for(let i = 0; i < arr2.length; i++) {
					if(arr2[i] == 0) {
						this.policyInfo.purpose_1 = true
					}
					if(arr2[i] == 1) {
						this.policyInfo.purpose_2 = true
					}
					if(arr2[i] == 2) {
						this.policyInfo.purpose_3 = true
					}
					if(arr2[i] == 3) {
						this.policyInfo.purpose_4 = true
					}
					if(arr2[i] == 4) {
						this.policyInfo.purpose_5 = true
						this.policyInfo.purposeDes = _policyInfo.purposeDes
					}
				}
				this.policyInfo.annualIncome = _policyInfo.annualIncome
				this.policyInfo.sourceOfIncome = _policyInfo.sourceOfIncome
				this.policyInfo.totalAssets = _policyInfo.totalAssets
				if(_policyInfo.thirdPtIdentity == "1") {
					this.policyInfo.thirdPtIdentity_1 = true
				}
				if(_policyInfo.thirdPtIdentity == "0") {
					this.policyInfo.thirdPtIdentity_2 = true
				}
				if(_policyInfo.thirdPtIdentity == "2") {
					this.policyInfo.thirdPtIdentity_3 = true
				}
				this.policyInfo.thirdPtName = _policyInfo.thirdPtName
				this.policyInfo.thirdPtContact = _policyInfo.thirdPtContact
				this.policyInfo.thirdPtRelToApp = _policyInfo.thirdPtRelToApp
				this.policyInfo.thirdPtAddr = _policyInfo.thirdPtAddr
				this.policyInfo.thirdPtRemark = _policyInfo.thirdPtRemark
				//1-1.投保人基本信息
				let applicant = response.data.response.policy.custInfo.appnt;
				//投保人姓名
				this.applicant.name = applicant.appntName;
				//投保人性别
				this.applicant.gender = applicant.appntSex;
				if(this.applicant.gender == "1") {
					this.applicant.gender = "男";
				} else if(this.applicant.gender == "2") {
					this.applicant.gender = "女";
				}
				//投保人出生日期
				this.applicant.birth = applicant.appntBirthday;
				//投保人国籍
				this.applicant.country = this.getNationalItem(applicant.nativePlace);
				//投保人证件类型
				this.applicant.idType = this.getCardItem(applicant.idType);
				//投保人证件有效期
				this.applicant.idTime = applicant.idExpDate;
				//投保人证件号码
				this.applicant.idNumber = applicant.idNo
				//投保人婚姻状况
				this.applicant.marriage = this.getMarriage(applicant.marriage)
				//投保人移动电话
				this.applicant.mobileTel = applicant.mobile
				//投保人家庭电话区号
				this.applicant.homePhoneCode = applicant.homePhoneCode
				//投保人家庭号码
				this.applicant.phone = applicant.homePhone
				//家庭区号
				this.applicant.phoneCode = applicant.homePhoneCode
				//投保人电子邮箱
				this.applicant.email = applicant.email
				//投保人所在省
				this.applicant.province = this.getProvince(applicant.province)
				//投保人所在市区
				this.applicant.city = this.getCity(applicant.city)
				//所在县
				this.applicant.county = applicant.county
				//所在镇
				this.applicant.street = applicant.street
				//所在
				this.applicant.community = applicant.community
				//投保人邮政编码
				this.applicant.emsCode = applicant.zipCode
				//投保人工作地址
				this.applicant.workArea = applicant.grpName
				//投保人单位电话区号
				this.applicant.companyPhoneCode = applicant.companyPhoneCode
				//投保人单位电话
				this.applicant.workTel = applicant.companyPhone
				this.applicant.workTelCode = applicant.companyPhoneCode
				//投保人职业companyPhoneCode
				this.applicant.profession = applicant.appOccupation
				//投保人职业类别
				this.applicant.professionType = applicant.occupationType
				//投保人职业编号
				this.applicant.professionNum = applicant.occupationCode
				//投保人年收入
				this.applicant.yearIncome = applicant.salary
				// 2.被保人基本信息
				this.recognizeeList = response.data.response.policy.custInfo.insurants.insurant
				this.recognizeeList.map((item, index) => {
					this.name = item.name
					item.relToApp = this.getRelation(item, item.relToApp)
					//被保人国籍
					item.nativePlace = this.getNationalItem(item.nativePlace)
					//被保人婚姻状况
					item.marriage = this.getMarriage(item.marriage)
				})

				// 被保人银行信息(没有返回被保人的银行信息)
				// 3.身故受益人基本信息
				this.deathFavoreeList = response.data.response.policy.custInfo.bnfInfo.beneficiaries.beneficiary;
				let fav = response.data.response.policy.custInfo.bnfInfo.bnfType
				if(fav == 0) {
					this.deathFav = "法定"
					this.dataShow.dataShow3 = false;
				} else {
					this.deathFav = "指定"
					this.dataShow.dataShow3 = true;
				}
				var compare = function(obj1, obj2) {
					var val1 = obj1.bfcyLevelNum;
					var val2 = obj2.bfcyLevelNum;
					return val1 - val2
				}
				this.deathFavoreeList.sort(compare)
				this.deathFavoreeList.map((item, index) => {
					item.bfcyIdType = this.getCardItem(item.bfcyIdType)
				})
				this.deathFavoreeList.map((item) => {
					item.relToIns = this.getBenefit(item, item.relToIns)
				})
				//告知
				let productsArr = response.data.response.policy.productInfo.products.product
				for(var i = 0; i < productsArr.length; i++) {
					if(productsArr[i].isMaster == '1') {
						this.page_title = productsArr[i].prodName
					}
				}
				this.policy.question = policy.question
				var compare = function(obj1, obj2) {
					var val1 = obj1.questionNo;
					var val2 = obj2.questionNo;
					if(val1 < val2) {
						return -1;
					} else if(val1 > val2) {
						return 1;
					} else {
						return 0;
					}
				}
				let than = this
				let idCards = response.data.response.policy.custInfo.idCards
				if(idCards != undefined && idCards.length > 0) {
					for(var i = 0; i < idCards.length; i++) {
						(function(i) {
							if(idCards[i].imageName == "23") {
								//业务人员
								var image = document.getElementById('xss_23')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								image.onload = function() {
									var data = than.getBase64Image(image)
									than.signImgs.agent_signt = data
								}
							}else if(idCards[i].imageName == "30") {
								var image = document.getElementById('xss_30')
								image.setAttribute('crossOrigin', 'anonymous');
								image.src = ""
								image.src = idCards[i].reaPath
								image.onload = function() {
									var data = than.getBase64Image(image)
									than.signImgs.cecintent_signt = data
								}
							}
						})(i)
					}
				}
				//代理人展业证号
				this.agent = response.data.response.policy.agentInfo
				this.agent.agentQuafno = response.data.response.policy.agentInfo.quafno
				console.log("代理人展业证号", this.agent.agentQuafno)
				//根据产品不同显示风险提示语
				if(productInfoPolicy != undefined && productInfoPolicy.length > 0) {        
					for(var i = 0; i < productInfoPolicy.length; i++) {            
						if(productInfoPolicy[i].isMaster == 1) {                
							this.prodCode = productInfoPolicy[i].prodCode            
						}        
					}    
				}
				console.log("产品code", this.prodCode)
				this.productDef(this.prodCode, (productDefList) => {
					console.log("信息获取成功")
					console.log(productDefList)
					this.haveInstructionsCode = utils.common.getHaveInstructionsCode(productDefList, this.policyResult)
					for(var i = 0; i < productDefList.length; i++) {
						let typeAll = productDefList[i].productDefine.typeAll.slice(0, 4)
						console.log(typeAll)
						if(typeAll == "1020" || typeAll == "1030" || typeAll == "1040") {
							this.isProdCode = true
						} else {
							this.isProdCode = false
						}
						let extraList = productDefList[i].extraList
						let product = this.policyResult.productInfo.products.product
						if(!this.isProdCode && extraList != undefined && extraList.length > 0 && product != undefined && product.length > 0) {
							for(let j = 0; j < extraList.length; j++) {
								let extraInfo = extraList[j]
								for(let k = 0; k < product.length; k++) {
									let productInfo = product[k]
									if(extraInfo.productCode == productInfo.prodCode) {
										let typeAll = extraInfo.productDefine.typeAll.slice(0, 4)
										if(typeAll == "1020" || typeAll == "1030" || typeAll == "1040") {
											this.isProdCode = true
											break
										}
									}
								}
							}
						}
						//犹豫期
						this.hesitationPeriod = productDefList[i].productDefine.hesitationPeriod
					}
				})
			}).catch(error => {
				this.showMsg(error)
			})
		},
		filters: {
			getRelationBef(code, item) {
				if(code != undefined && code != "") {
					if(code == "30") {
						return item.relToInsDesc
					}
					if(relationList != undefined && relationList != "") {
						for(var i = 0; i < relationList.relation.item.length; i++) {
							if(relationList.relation.item[i].code == code) {
								return relationList.relation.item[i].text
							}
						}
						return "其他"
					}
				}
			},
			getCardText(code) {
				if(code != undefined && code != "") {
					if(cardTypeList != undefined && cardTypeList != "") {
						for(var i = 0; i < cardTypeList.dict_cardtype.item.length; i++) {
							if(cardTypeList.dict_cardtype.item[i].code == code) {
								return cardTypeList.dict_cardtype.item[i].text
							}
						}
					}
				}
			},
			getDividendText(code) {
				for(let i = 0; i < dividendList.dividend.item.length; i++) {
					if(code == dividendList.dividend.item[i].code) {
						return dividendList.dividend.item[i].text
					}
				}
			},
			getSexText(code) {
				if(code == 1) {
					return "男"
				} else if(code == 2) {
					return "女"
				}
			},
			getNationalText(code) {
				for(let i = 0; i < nationalList.national.item.length; i++) {
					if(code == nationalList.national.item[i].code) {
						return nationalList.national.item[i].text
					}
				}
			},
			getMarriageText(code) {
				for(let i = 0; i < marriageList.marriage.item.length; i++) {
					if(code == marriageList.marriage.item[i].code) {
						return marriageList.marriage.item[i].text
					}
				}
			},
			getIdTypeText(code) {
				for(let i = 0; i < cardTypeList.dict_cardtype.item.length; i++) {
					if(code == cardTypeList.dict_cardtype.item[i].code) {
						return cardTypeList.dict_cardtype.item[i].text
					}
				}
			},
			getResidentText(code) {
				if(code != undefined && code != "") {
					if(residentList != undefined && residentList != "") {
						for(var i = 0; i < residentList.resident.item.length; i++) {
							if(residentList.resident.item[i].code == code) {
								return residentList.resident.item[i].text
							}
						}
					}
				}
			},
			getProvinceText(code) {
				for(let i = 0; i < provinceList.province.item.length; i++) {
					if(code == provinceList.province.item[i].code) {
						return provinceList.province.item[i].text
					}
				}
			},
			getCityText(code) {
				for(let i = 0; i < cityList.city.item.length; i++) {
					if(code == cityList.city.item[i].code) {
						return cityList.city.item[i].text
					}
				}
			},
			//过滤豁免期间为指定数据显示 201803151854
			getExempt(code, policy) {
				if(code == "豁免期间") {
					for(var i = 0; i < policy.length; i++) {
						if(policy[i].isMaster == "1") {
							if(policy[i].payYear.indexOf("term_") != -1) {
								return(policy[i].payYear.replace("term_", "") - 1) + "年期"
							}
						}
					}
				} else {
					return code
				}
			},
			getAmnt(code) {
				if(code == "0" || code == "0.0" || code == "0.00") {
					return ''
				}
				return code
			},
		},
		methods: {
			getMsg() {
				let requ = {
					"policy": {
						"substepNo": "",
						"orderCode": this.tempOrderId,
					}
				}
				utils.http.post('MOHQPOLICYMSG', requ).then(response => {
					let than = this
					let idCards = response.data.response.policy.custInfo.idCards
					if(idCards != undefined && idCards.length > 0) {
						for(var i = 0; i < idCards.length; i++) {
							(function(i) {
								if(idCards[i].imageName == "23") {
									//业务人员
									var image = document.getElementById('xss_23')
									image.setAttribute('crossOrigin', 'anonymous');
									image.src = ""
									image.src = idCards[i].reaPath
									image.onload = function() {
										var data = than.getBase64Image(image)
										than.signImgs.agent_signt = data
									}
								}else if(idCards[i].imageName == "30") {
									var image = document.getElementById('xss_30')
									image.setAttribute('crossOrigin', 'anonymous');
									image.src = ""
									image.src = idCards[i].reaPath
									image.onload = function() {
										var data = than.getBase64Image(image)
										than.signImgs.cecintent_signt = data
									}
								}
							})(i)
						}
					}
				})
			},
			ageFilter(value) {
				const birthday = new Date(value)
				const now = new Date()
				let age = now.getFullYear() - birthday.getFullYear() - 1
				if(now.getMonth() - birthday.getMonth() > 0) {
					age++
				} else if((now.getMonth() - birthday.getMonth()) == 0 && (now.getDate() - birthday.getDate()) == 0) {
					age++
				}
				return age
			},
			showContent(index) {
				if(index == 1) {
					this.toggle.isAppIdInform = !this.toggle.isAppIdInform
					if(this.toggle.isAppIdInform == false) {
						$('#btn_1').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isAppIdInform == true) {
						$('#btn_1').css('transform', 'rotate(360deg)');
					}
				} else if(index == 2) {
					this.toggle.isAppContactInform = !this.toggle.isAppContactInform
					if(this.toggle.isAppContactInform == false) {
						$('#btn_2').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isAppContactInform == true) {
						$('#btn_2').css('transform', 'rotate(360deg)');
					}
				} else if(index == 3) {
					this.toggle.isAppOccuInform = !this.toggle.isAppOccuInform
					if(this.toggle.isAppOccuInform == false) {
						$('#btn_3').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isAppOccuInform == true) {
						$('#btn_3').css('transform', 'rotate(360deg)');
					}
				} else if(index == 4) {
					this.toggle.isInsIdInform = !this.toggle.isInsIdInform
					if(this.toggle.isInsIdInform == false) {
						$('#btn_4').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isInsIdInform == true) {
						$('#btn_4').css('transform', 'rotate(360deg)');
					}
				} else if(index == 5) {
					this.toggle.isInsContactInform = !this.toggle.isInsContactInform
					if(this.toggle.isInsContactInform == false) {
						$('#btn_5').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isInsContactInform == true) {
						$('#btn_5').css('transform', 'rotate(360deg)');
					}
				} else if(index == 6) {
					this.toggle.isInsOccuInform = !this.toggle.isInsOccuInform
					if(this.toggle.isInsOccuInform == false) {
						$('#btn_6').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isInsOccuInform == true) {
						$('#btn_6').css('transform', 'rotate(360deg)');
					}
				} else if(index == 7) {
					this.toggle.isBfcyIdInform = !this.toggle.isBfcyIdInform
					if(this.toggle.isBfcyIdInform == false) {
						$('#btn_7').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isBfcyIdInform == true) {
						$('#btn_7').css('transform', 'rotate(360deg)');
					}
				} else if(index == 8) {
					this.toggle.isProductInform = !this.toggle.isProductInform
					if(this.toggle.isProductInform == false) {
						$('#btn_8').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isProductInform == true) {
						$('#btn_8').css('transform', 'rotate(360deg)');
					}
				} else if(index == 9) {
					this.toggle.isProduct2Inform = !this.toggle.isProduct2Inform
					if(this.toggle.isProduct2Inform == false) {
						$('#btn_9').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isProduct2Inform == true) {
						$('#btn_9').css('transform', 'rotate(360deg)');
					}
				} else if(index == 10) {
					this.toggle.isOtherInform = !this.toggle.isOtherInform
					if(this.toggle.isOtherInform == false) {
						$('#btn_10').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isOtherInform == true) {
						$('#btn_10').css('transform', 'rotate(360deg)');
					}
				} else if(index == 11) {
					this.toggle.isAppBankInform = !this.toggle.isAppBankInform
					if(this.toggle.isAppBankInform == false) {
						$('#btn_11').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isAppBankInform == true) {
						$('#btn_11').css('transform', 'rotate(360deg)');
					}
				} else if(index == 12) {
					this.toggle.isAppInform = !this.toggle.isAppInform
					if(this.toggle.isAppInform == false) {
						$('#btn_12').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isAppInform == true) {
						$('#btn_12').css('transform', 'rotate(360deg)');
					}
				} else if(index == 13) {
					this.toggle.isInsInform = !this.toggle.isInsInform
					if(this.toggle.isInsInform == false) {
						$('#btn_13').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isInsInform == true) {
						$('#btn_13').css('transform', 'rotate(360deg)');
					}
				} else if(index == 14) {
					this.toggle.isSaleInform = !this.toggle.isSaleInform
					if(this.toggle.isSaleInform == false) {
						$('#btn_14').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isSaleInform == true) {
						$('#btn_14').css('transform', 'rotate(360deg)');
					}
				} else if(index == 15) {
					this.toggle.isSaleReport = !this.toggle.isSaleReport
					if(this.toggle.isSaleReport == false) {
						$('#btn_15').css('transform', 'rotate(180deg)');
					} else if(this.toggle.isSaleReport == true) {
						$('#btn_15').css('transform', 'rotate(360deg)');
					}
				}
			},
			getBase64Image: function(img) {
				var canvas = document.createElement("canvas");
				canvas.width = img.naturalWidth
				canvas.height = img.naturalHeight
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
				var dataURL = canvas.toDataURL("image/png");
				return dataURL
			},
			//健康告知开关
			switchQuestion: function(itm) {
				if(itm.isBuild == "Y") {
					itm.questionRemark = ""
					itm.isBuild = "N"
				} else if(itm.isBuild == "N") {
					itm.isBuild = "Y"
				}
			},
			//CA签字
			openCA(signNum) {
				this.caValue.isCAOpen = !this.caValue.isCAOpen
				this.caValue.image = ""
				this.caValue.context_id = signNum
			},
			opensCA(signNums) {
				this.caValue.isCACommentOpen = !this.caValue.isCACommentOpen
				this.caValue.image = ""
				showCommentDialog(30)
			},
			imageUpload: function(context_id, image) {
				if(image != undefined && image != "") {
					let requ = {
						"upload": {
							"agentCode": "", 
							"applyCode": this.tempApplyCode,
							"orderId": this.tempOrderId,
							"policyCode": "",
							"deviceNo": "",
							"imageList": [{
								"imageType": context_id,
								"imageName": "签字照片",
								"imageByte": image.substring(22, image.length)
							}]
						}
					}
					if(requ.upload.imageList[0].imageByte != undefined && requ.upload.imageList[0].imageByte != "") {
						utils.http.postFast('MOUPLOAD', requ, (body) => {
							if(body.resultMessage == "上传影像成功！") {
								if(context_id == "30") {
									document.getElementById('xss_30').src = ""
									document.getElementById('xss_30').src = image
									this.signImgs.cecintent_signt = image
									this.showMsg("风险提示语补录成功,请通知保险代理人!")
								}
							}
						})
					}
				}
			},
			//信息显示隐藏
			showData(index) {
				if(index == "1") {
					this.dataShow.dataShow1 = !this.dataShow.dataShow1;
					if(this.dataShow.dataShow1 == false) {
						$('#btn1').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow1 == true) {
						$('#btn1').css('transform', 'rotate(360deg)');
					}
				} else if(index == "2") {
					this.dataShow.dataShow2 = !this.dataShow.dataShow2;
					if(this.dataShow.dataShow2 == false) {
						$('#btn2').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow2 == true) {
						$('#btn2').css('transform', 'rotate(360deg)');
					}
				} else if(index == "3") {
					this.dataShow.dataShow3 = !this.dataShow.dataShow3;
					if(this.dataShow.dataShow3 == false) {
						$('#btn3').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow3 == true) {
						$('#btn3').css('transform', 'rotate(360deg)');
					}
				} else if(index == "4") {
					this.dataShow.dataShow4 = !this.dataShow.dataShow4;
					if(this.dataShow.dataShow4 == false) {
						$('#btn4').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow4 == true) {
						$('#btn4').css('transform', 'rotate(360deg)');
					}
				} else if(index == "5") {
					this.dataShow.dataShow5 = !this.dataShow.dataShow5;
					if(this.dataShow.dataShow5 == false) {
						$('#btn5').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow5 == true) {
						$('#btn5').css('transform', 'rotate(360deg)');
					}
				} else if(index == "6") {
					this.dataShow.dataShow6 = !this.dataShow.dataShow6;
					if(this.dataShow.dataShow6 == false) {
						$('#btn6').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow6 == true) {
						$('#btn6').css('transform', 'rotate(360deg)');
					}
				} else if(index == "7") {
					this.dataShow.dataShow7 = !this.dataShow.dataShow7;
					if(this.dataShow.dataShow7 == false) {
						$('#btn7').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow7 == true) {
						$('#btn7').css('transform', 'rotate(360deg)');
					}
				} else if(index == "8") {
					this.dataShow.dataShow8 = !this.dataShow.dataShow8;
					if(this.dataShow.dataShow8 == false) {
						$('#btn8').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow8 == true) {
						$('#btn8').css('transform', 'rotate(360deg)');
					}
				} else if(index == "9") {
					this.dataShow.dataShow9 = !this.dataShow.dataShow9;
					if(this.dataShow.dataShow9 == false) {
						$('#btn9').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow9 == true) {
						$('#btn9').css('transform', 'rotate(360deg)');
					}
				} else if(index == "10") {
					this.dataShow.dataShow10 = !this.dataShow.dataShow10;
					if(this.dataShow.dataShow10 == false) {
						$('#btn10').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow10 == true) {
						$('#btn10').css('transform', 'rotate(360deg)');
					}
				} else if(index == "11") {
					this.dataShow.dataShow11 = !this.dataShow.dataShow11;
					if(this.dataShow.dataShow11 == false) {
						$('#btn11').css('transform', 'rotate(180deg)');
					} else if(this.dataShow.dataShow11 == true) {
						$('#btn11').css('transform', 'rotate(360deg)');
					}
				}
			},
			//获取国籍
			getNationalItem(code) {
				if(code != undefined && code != "") {
					if(nationalList != undefined && nationalList != "") {
						for(var i = 0; i < nationalList.national.item.length; i++) {
							if(nationalList.national.item[i].code == code) {
								return nationalList.national.item[i].text
							}
						}
					}
				}
			},
			//获取联系地址省份
			getProvinceItem(code) {
				if(code != undefined && code != "") {
					if(provinceList != undefined && provinceList != "") {
						for(var i = 0; i < provinceList.province.item.length; i++) {
							if(provinceList.province.item[i].code == code) {
								return provinceList.province.item[i].text
							}
						}
					}
				}
			},
			//获取联系地址市
			getCityItem(code) {
				if(code != undefined && code != "") {
					if(cityList != undefined && cityList != "") {
						for(var i = 0; i < cityList.city.item.length; i++) {
							if(cityList.city.item[i].code == code) {
								return cityList.city.item[i].text
							}
						}
					}
				}
			},
			//获取证件类型
			getCardItem(code) {
				if(code != undefined && code != "") {
					if(cardTypeList != undefined && cardTypeList != "") {
						for(var i = 0; i < cardTypeList.dict_cardtype.item.length; i++) {
							if(cardTypeList.dict_cardtype.item[i].code == code) {
								return cardTypeList.dict_cardtype.item[i].text
							}
						}
					}
				}
			},
			//获取受益人与被保险人的关系
			getBenefit(item, code) {
				if(code != undefined && code != "") {
					if(code == "30") {
						return item.relToInsDesc
					}
					if(benefitList != undefined && benefitList != "") {
						for(var i = 0; i < benefitList.relation.item.length; i++) {
							if(benefitList.relation.item[i].code == code) {
								return benefitList.relation.item[i].text
							}
						}
					}
				}
			},
			//投被保人关系
			getRelation(item, code) {
				if(code != undefined && code != "") {
					if(code == "30") {
						return item.relToAppDesc
					}
					if(relationList != undefined && relationList != "") {
						for(var i = 0; i < relationList.relation.item.length; i++) {
							if(relationList.relation.item[i].code == code) {
								return relationList.relation.item[i].text
							}
						}
						return "其他"
					}
				}
			},
			//获取婚姻状况
			getMarriage(code) {
				if(code != undefined && code != "") {
					if(marriageList != undefined && marriageList != "") {
						for(var i = 0; i < marriageList.marriage.item.length; i++) {
							if(marriageList.marriage.item[i].code == code) {
								return marriageList.marriage.item[i].text
							}
						}
					}
				}
			},
			//获取税收居民身份
			getResidentList(code) {
				if(code != undefined && code != "") {
					if(residentList != undefined && residentList != "") {
						for(var i = 0; i < residentList.resident.item.length; i++) {
							if(residentList.resident.item[i].code == code) {
								return residentList.resident.item[i].text
							}
						}
					}
				}
			},
			//获取开户银行
			getBankList(code) {
				if(code != undefined && code != "") {
					if(bankList != undefined && bankList != "") {
						for(var i = 0; i < bankList.bank.item.length; i++) {
							if(bankList.bank.item[i].code == code) {
								return bankList.bank.item[i].text
							}
						}
					}
				}
			},
			//获取省份
			getProvince(code) {
				if(code != undefined && code != "") {
					if(provinceList != undefined && provinceList != "") {
						for(var i = 0; i < provinceList.province.item.length; i++) {
							if(provinceList.province.item[i].code == code) {
								return provinceList.province.item[i].text
							}
						}
					}
				}
			},
			//提示框
			showMsg(msg) {   
				if(msg != undefined && msg != "") {         
					this.$refs.alert.showMOdal(msg)
				}
			},
			//获取市区
			getCity(code) {
				if(code != undefined && code != "") {
					if(cityList != undefined && cityList != "") {
						for(var i = 0; i < cityList.city.item.length; i++) {
							if(cityList.city.item[i].code == code) {
								return cityList.city.item[i].text
							}
						}
					}
				}
			},
			//跳转至影像上传页面
			push() {
				if(this.checkAll()){
					this.showMsg("风险提示语补录成功,请通知保险代理人!")
				}
			},
			//请求产品定义接口
		    productDef(productCode, callback) {        
				let requ1 = {            
					"productDef": {                
						"agentCode": '',
		                "productCode": productCode,
		                "token": new Date().getTime(),
		                "openId": "1"            
					}        
				}        
				utils.http.postFast('PRODUCTDEFLIST', requ1, (body) => {            
					let productDefList = body.productDefList             
					callback(productDefList)        
				})    
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
			//校验签字信息
			checkAll(){
				let result = ""
				result += this.checkCecintent()
				if(result != ''){
					this.$refs.alert.showMOdal(result)
					return false
				}
				return true
			},
			//判断风险提示语抄录是否完成
			checkCecintent(){
				if(this.signImgs.cecintent_signt == "" && this.isProdCode==true){
					return '请完成风险提示语抄录!'
				}
				return ''
			},
		}
	}
</script>

<style scoped type="text/css" lang="scss">
	.tip {
		height: 25px;
		border-radius: 50%;
		background: #FEB101;
		color: #fff;
		display: inline-block;
		text-align: center;
		line-height: 25px;
		font-weight: bold;
		margin: 5px 0,
	}
	
	.appnt {
		width: 98%;
		margin-left: 2%;
		opacity: 999;
		background: #fff;
		border-radius: 13px;
	}
	
	.border-radius {
		width: 95%;
		background: #FEB101;
		border-radius: 13px;
		margin: 8px auto;
	}
	
	.line-h {
		line-height: 35px;
	}
	
	.other {
		display: inline-block;
		border-bottom: 1px solid #000;
		text-align: center;
		width: 100px;
	}
	
	.input_text {
		text-align: center;
	}
	
	.back {
		display: block;
		height: 100%;
		width: 100%;
		position: relative;
		img {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -10px;
			margin-left: -20px;
		}
	}
	
	.fa {
		color: #FDB92C;
	}
	
	.fa-angle-left {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	
	.manage-main-contents {
		width: 100%;
		position: absolute;
		top: 50px;
		overflow-y: auto;
		overflow-x: hidden;
		background: #F5F5F5;
		font-size: 12px;
	}
	
	.applicant,
	.recognizee,
	.deathFavoree,
	.insurance,
	.bankCard,
	.health,
	.notice,
	.statement,
	.account,
	.accountReport,
	.insureAccount {
		width: 95%;
		height: 35px;
		margin: 0 10px;
		border-bottom: 1px dashed #B2B2B2;
	}
	
	.applicantData,
	.recognizeeData,
	.deathFavoreeData,
	.insuranceData,
	.bankCardData,
	.healthData,
	.noticeData,
	.statementData,
	.accountData,
	.accountReportData,
	.insureAccountData {
		width: 90%;
		height: 35px;
		margin: 0px auto;
		display: flex;
		flex: wrap;
		line-height: 35px;
	}
	
	.applicantData>p,
	.recognizeeData>p,
	.deathFavoreeData>p,
	.insuranceData>p,
	.bankCardData>p,
	.healthData>p,
	.noticeData>p,
	.statementData>p,
	.accountData>p,
	.accountReportData>p,
	.insureAccountData>p {
		width: 10%;
	}
	
	.applicantData>p>i,
	.recognizeeData>p>i,
	.deathFavoreeData>p>i,
	.insuranceData>p>i,
	.bankCardData>p>i,
	.healthData>p>i,
	.noticeData>p>i,
	.statementData>p>i,
	.accountData>p>i,
	.accountReportData>p>i,
	.insureAccountData>p>i {
		color: #FEB101;
		font-size: 25px;
		vertical-align: middle;
	}
	
	.applicantData>div,
	.insuranceData>div,
	.bankCardData>div,
	.healthData>div,
	.noticeData>div,
	.accountData>div,
	.accountReportData>div,
	.insureAccountData>div {
		width: 90%;
		font-weight: bold;
	}
	
	.applicantUser>.line,
	.recognizeeUser>.line,
	.deathFavoreeUser>.line {
		width: 90%;
		margin: 0px auto;
		display: flex;
		flex: wrap;
		justify-content: space-between;
	}
	
	.applicantUser>.info,
	.applicantUser>.infoCountry,
	.applicantUser>.infoWork,
	.insuranceInfo>.info,
	.insuranceInfo>.infoTime,
	.insuranceInfo>.infoText,
	.insuranceInfo>.infoScale,
	.bankCardInfo>.info,
	.bankCardInfo>.infoName,
	.bankCardInfo>.infoText,
	.noticeInfo>.info,
	.noticeInfo>.infoText,
	.statementData>.info,
	.statementInfo>.infoText,
	.statementInfo>.infoSign1,
	.statementInfo>.infoSign2,
	.statementInfo>.info,
	.accountInfo>.info,
	.accountReportInfo>.info,
	.insureAccountInfo>.info,
	.insureAccountInfo>.infoSign1,
	.insureAccountInfo>.infoSign2,
	.insureAccountInfo>.infoSign3,
	.insureAccountInfo>.infoBox,
	.healthInfo>.info,
	.statementInfo>.infoSign1Area,
	.insureAccountInfo>.infoSign1Area,
	.recognizeeUser>.info,
	.recognizeeUser>.infoCountry,
	.recognizeeUser>.infoWork,
	.deathFavoreeUser>.info,
	.deathFavoreeUser>.infoCountry,
	.deathFavoreeUser>.infoWork {
		width: 90%;
		margin: 5px auto;
	}
	
	.applicantUser>.infoCountry,
	.applicantUser>.infoWork,
	.insuranceInfo>.infoTime,
	.bankCardInfo>.infoName,
	.statementInfo>.infoSign1,
	.statementInfo>.infoSign2,
	.insureAccountInfo>.infoSign1,
	.insureAccountInfo>.infoSign2,
	.insureAccountInfo>.infoSign3,
	.insureAccountInfo>.infoBox,
	.recognizeeUser>.infoCountry,
	.recognizeeUser>.infoWork {
		display: flex;
		flex: wrap;
		justify-content: space-between;
	}
	
	.applicantUser>.infoCountry>p:nth-child(1),
	.insuranceInfo>.infoTime>p:nth-child(1),
	.bankCardInfo>.infoName>p:nth-child(1),
	.recognizeeUser>.infoCountry>p:nth-child(1),
	.recognizeeUser>.infoWork>p:nth-child(1) {
		width: 40%;
	}
	
	.applicantUser>.infoCountry>p:nth-child(2),
	.insuranceInfo>.infoTime>p:nth-child(2),
	.bankCardInfo>.infoName>p:nth-child(2),
	.recognizeeUser>.infoCountry>p:nth-child(2),
	.recognizeeUser>.infoWork>p:nth-child(2) {
		width: 60%;
	}
	
	.applicantUser>.infoWork>p:nth-child(1),
	.statementInfo>.infoSign1>p:nth-child(1),
	.statementInfo>.infoSign2>p:nth-child(2) {
		width: 50%;
	}
	
	.applicantUser>.infoWork>p:nth-child(2),
	.statementInfo>.infoSign1>p:nth-child(2),
	.statementInfo>.infoSign2>p:nth-child(1) {
		width: 65%;
	}
	
	.statementInfo>.infoSign1Area>p,
	.insureAccountInfo>.infoSign1Area>p {
		width: 100%;
		height: 100px;
		background: #DDDBD7;
	}
	
	.recognizeeData>div,
	.deathFavoreeData>div {
		width: 90%;
		font-weight: bold;
	}
	
	.insuranceInfo>.infoText {
		border-bottom: 1px dashed #C5C2BC;
	}
	
	.insuranceInfo>.infoText>p,
	.bankCardInfo>.infoText>p {
		margin-bottom: 10px;
		color: #FFAB00;
	}
	
	.insuranceInfo>.infoScale {
		margin-top: 15px;
	}
	
	.bankCardInfo>div:nth-child(5),
	.accountInfo>div:nth-child(5) {
		border-bottom: 1px dashed #C5C2BC;
	}
	
	.noticeInfo>.info>p {
		color: #FEB101;
	}
	
	.statementData>div {
		width: 90%;
		overflow: hidden;
		font-weight: bold;
	}
	
	.accountInfo>div:nth-child(5)>p {
		margin-bottom: 10px;
	}
	
	.accountReportInfo>.info:nth-child(1)>p,
	.insureAccountInfo>.info:nth-child(1)>p {
		font-weight: bold;
	}
	
	.accountReportInfo>.info:nth-child(8)>p {
		font-weight: bold;
		margin-top: 25px;
	}
	
	.insureAccountInfo>.infoSign1>p:nth-child(1) {
		width: 75%;
	}
	
	.insureAccountInfo>.infoSign1>p:nth-child(2) {
		width: 25%;
	}
	
	.insureAccountInfo>.infoSign2>p:nth-child(1),
	.insureAccountInfo>.infoSign2>p:nth-child(2),
	.insureAccountInfo>.infoSign2>p:nth-child(3),
	.insureAccountInfo>.infoSign3>p:nth-child(1),
	.insureAccountInfo>.infoSign3>p:nth-child(2),
	.insureAccountInfo>.infoSign3>p:nth-child(3) {
		text-align: center;
		width: 25%;
	}
	
	.insureAccountInfo>.infoBox>p:nth-child(1) {
		width: 10%;
	}
	
	.insureAccountInfo>.infoBox>p:nth-child(2) {
		width: 90%;
		margin-bottom: 60px;
	}
	
	.insureAccountInfo>.infoBox>p:nth-child(2)>span:nth-child(2) {
		color: #FEB101;
	}
	
	.insuranceInfo>.info:nth-child(19)>p {
		margin-bottom: 30px;
	}
	
	.insureAccountInfo>.infoSign3>p {
		height: 70px;
		background: #E1DCD4;
	}
	
	.insureAccountInfo>div:nth-child(3) {
	}
	
	.insureAccountInfo>div:nth-child(4)>p {
		width: 100%;
		height: 165px;
		background: #E1DCD4;
	}
	
	.signImg {
		text-align: center;
	}
	
	.signImg>img {
		width: 100%;
		height: 100%;
	}
	
	.inform-content {
		display: flex;
		flex: wrap;
		justify-content: space-between;
	}
	
	.inform_1 {
		width: 100%;
		padding: 15px 10px;
		border-bottom: 1px dashed #999;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.textarea {
		width: 100%;
		text-align: center;
		margin-top: 10px;
	}
	
	.inform_1>p:nth-child(1) {
		width: 45px;
		height: 45px;
		// background: #FEB101;
		border-radius: 25px;
		text-align: center;
		line-height: 45px;
		color: #000;
	}
	
	.inform_1 p:nth-child(2) {
		flex: 1;
		padding-left: 15px;
		font-size: 14px;
		line-height: 15px;
	}
	
	.inform_1 p:nth-child(3) {
		float: right;
		width: 70px;
	}
	
	.self {
		width: 75%;
	}
	
	.self>input {
		width: 15%;
		padding: 0 5px;
		border-bottom: 1px solid #FEB101;
	}
	
	p {
		line-height: 30px;
	}
	
	.btnFoote {
		border: 0;
		color: #fff;
		width: 100%;
		background: #FEB101;
		height: 50px;
	}
	
	.new-answer {
		width: 100%;
		margin: 0 auto;
		border-bottom: 1px dotted #ccc;
	}
	
	.new-answer>p {
		width: 100%!important;
		text-align: left!important;
		box-sizing: border-box;
	}
</style>