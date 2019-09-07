<!--客户详情页面-->
<template>
	<div id="content" class="content_page">
		<CustomerSearch v-show="customerValue.isopen" v-model="customerValue"></CustomerSearch>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue"></IDCardScanning>
		<OccupationSearch v-show="occupationValue.isopen" v-model="occupationValue"></OccupationSearch>
		<SelectArea v-show="SelectAreaValue.isOpen" @selectadress="selectActions" v-model="SelectAreaValue" @cancel="cancels"></SelectArea>
		<div v-show="contentIsOpen">
			<Headerbtns title="完善投保人信息">
				<div slot="left" @click="back()">
					<i class="fa fa-angle-left"></i>
				</div>
				<div slot="right" @click="sheetVisible = !sheetVisible">
					<i class="fa fa-ellipsis-v"></i>
				</div>
			</Headerbtns>
			<div v-show="loadData" class="main-contents process">
				<NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
				<div class="main-contents-right">
					<div class="sheet_a" :class="[showList == '2'?'sheet_b':'',showList == '3'?'sheet_c':'']">
						<p @click="select(1)">身份信息</p>
						<p @click="select(2)">其他信息</p>
						<p @click="select(3)">支付信息</p>
					</div>
					<div v-show="showList==1">
						<ul>
							<li :class="checkData.name!=''?'active':''">
								<p>姓名</p>
								<div>
									<input type="text" v-model="policy.custInfo.appnt.appntName" v-supportLetterChinese @focus="removeCheckAppName" @blur="checkAppName" maxlength="15" :readonly="policy.custInfo.appnt.memberType == '1'" />
									<img src="../../../static/img/policy/icon_search.png" @click="customerSearch()" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="policy.custInfo.appnt.memberType!='1'" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_APPLICANT,policy.custInfo.appnt.id)" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="policy.custInfo.appnt.memberType=='1'" />
								</div>
							</li>
							<li class="validText" v-show="checkData.name!=''">{{checkData.name}}</li>
							<li>
								<p>证件类型</p>
								<div v-if="policy.custInfo.appnt.memberType!='1'">
									<label style="display: flex;justify-content: space-between;width: 85%;">
										<picker v-model="policy.custInfo.appnt.idType" :values="policy.custInfo.appnt.idType" :items="dict.cardTypeList" code="code" text="text" @change="changeIdType($event)"></picker>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</label>
									<img src="../../../static/img/policy/icon_camera.png" v-if="policy.custInfo.appnt.memberType!='1'" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_APPLICANT,policy.custInfo.appnt.id)" style="margin-left: 0;" />
								</div>
								<div v-if="policy.custInfo.appnt.memberType=='1'">
									<p style="width: 85%;">{{policy.custInfo.appnt.idType|Notype}}</p>
									<img src="../../../static/img/policy/icon_camera.png" v-if="policy.custInfo.appnt.memberType=='1'" style="margin-left: 0;" />
								</div>
							</li>
							<li>
								<p>证件号码</p>
								<input type="text" v-model="policy.custInfo.appnt.idNo" v-filterLetterNumber placeholder="请输入证件号码" :readonly="policy.custInfo.appnt.memberType == '1'" />
							</li>
							<li>
								<p>证件有效起期</p>
								<div>
									<date-picker v-model="policy.custInfo.appnt.idStaDate" style="width:85%;" defaultTime="2010-01-01"></date-picker>
									<i class="fa fa-angle-right" aria-hidden="true"></i>
								</div>
							</li>
							<li :class="!toggle.appntIdExpDateLong ?'base':''">
								<p>证件有效止期</p>
								<div style="display: flex;flex-direction: column;align-items: flex-start;">
									<div style="display: flex;justify-content: space-between;align-items: center;width: 100%;line-height: 50px;" v-show="!toggle.appntIdExpDateLong">
										<date-picker v-model="policy.custInfo.appnt.idExpDate" style="width: 85%;" defaultTime="2020-01-01"></date-picker>
										<i class="fa fa-angle-right" aria-hidden="true"></i>
									</div>
									<p style="display:flex;align-items: center;line-height: 2;">
										<input type="checkbox" v-model="toggle.appntIdExpDateLong" @change="changeIdExpDateLong()" />
										<span>长期有效</span>
									</p>
								</div>
							</li>
							<li class="sex">
								<p>性别</p>
								<SwitchBox v-if="policy.custInfo.appnt.memberType!='1'" :optionList="dict.sexList" v-model="policy.custInfo.appnt.appntSex"></SwitchBox>
								<SwitchBox v-if="policy.custInfo.appnt.memberType=='1'" :optionList="dict.sexList" v-model="policy.custInfo.appnt.appntSex" :disabled="false"></SwitchBox>
							</li>
							<li>
								<p>出生日期</p>
								<div>
									<date-picker v-if="policy.custInfo.appnt.memberType!='1'" v-model="policy.custInfo.appnt.appntBirthday" :defaultTime="policy.custInfo.appnt.appntBirthday" style="width: 85%;"></date-picker>
									<p v-if="policy.custInfo.appnt.memberType=='1'">{{policy.custInfo.appnt.appntBirthday}}</p>
									<i class="fa fa-angle-right"></i>
								</div>
							</li>
							<li>
								<p>国籍</p>
								<label>
								<picker :values="policy.custInfo.appnt.nativePlace" v-model="policy.custInfo.appnt.nativePlace" :items="dict.nationalList" code="code" text="text"></picker>
								<i class="fa fa-angle-right" aria-hidden="true"></i>
							</label>
							</li>
							<li>
								<p>婚姻</p>
								<label>
								<picker :values="policy.custInfo.appnt.marriage" v-model="policy.custInfo.appnt.marriage" :items="dict.marriageList" code="code" text="text"></picker>
								<i class="fa fa-angle-right" aria-hidden="true"></i>
							</label>
							</li>
						</ul>
					</div>
					<div v-show="showList==2">
						<ul>
							<li>
								<p>联系地址</p>
								<div @click="selectAdress()">
									<span v-if="policy.custInfo.appnt.province==''" style="color:#ccc;">请选择</span>
									<span v-if="policy.custInfo.appnt.province!=''" class="hideText">{{policy.custInfo.appnt.province|getProvinceText}}{{policy.custInfo.appnt.city|getCityText}}{{policy.custInfo.appnt.county}}</span>
									<i class="fa fa-angle-right"></i>
								</div>
							</li>
							<li>
								<p>镇/街道</p>
								<input type="text" maxlength="150" v-model="policy.custInfo.appnt.street" placeholder="**街道" />
							</li>
							<li>
								<p>村/社区</p>
								<input type="text" maxlength="50" v-model="policy.custInfo.appnt.community" placeholder="**小区" />
							</li>
							<li>
								<p>详细地址</p>
								<div>
									<input type="text" maxlength="200" v-model="policy.custInfo.appnt.postalAddress" placeholder="1号楼一单元101室" />
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('postalAddress')" />
								</div>
							</li>
							<li :class="checkData.zipCode!=''?'active':''">
								<p>邮政编码</p>
								<div>
									<input type="text" maxlength="6" v-model="policy.custInfo.appnt.zipCode" v-supportNumber placeholder="请输入邮政编码" @blur="checkZip" @focus="removeCheckZip" />
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('zipCode')" />
								</div>
							</li>
							<li class="validText" v-show="checkData.zipCode!=''">{{checkData.zipCode}}</li>
							<li style="position:relative;" :class="checkData.email!=''?'active':''">
								<p>电子邮箱</p>
								<input type="text" ref="appntEmail" v-model="policy.custInfo.appnt.email" v-filterEmail placeholder="用于接收电子保单" @blur="checkEmail" @focus="removeCheckEmail" />
								<div class="maillist" v-show="isShowAppntEmailSuffix">
									<ul>
										<li @click="selectEmailSuffix(item)" v-for=" item in emailSuffix">{{policy.custInfo.appnt.email + item}}</li>
									</ul>
								</div>
							</li>
							<li class="validText" v-show="checkData.email!=''">{{checkData.email}}</li>
							<li :class="checkData.mobile!=''?'active':''">
								<p>手机号码</p>
								<div>
									<input type="text" maxlength="11" v-model="policy.custInfo.appnt.mobile" v-supportNumber placeholder="请录入投保人手机号码" @blur="checkMobile" @focus="removeCheckMobile" />
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('mobile')" />
								</div>
							</li>
							<li class="validText" v-show="checkData.mobile!=''">{{checkData.mobile}}</li>
							<li>
								<p>职业</p>
								<div>
									<p class="job" @click="occupationSearch()">
										<span class="hideText">{{policy.custInfo.appnt.appOccupation}}</span>
										<i class="fa fa-angle-right"></i>
									</p>
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('occupation')" />
								</div>
							</li>
							<li>
								<p>工作单位/学校</p>
								<div>
									<input type="text" v-model="policy.custInfo.appnt.grpName" v-filterSpecialChar placeholder="请输入工作单位/学校" maxlength="15" />
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec('grpName')" />
								</div>
							</li>
							<li>
								<p>年收入</p>
								<SwitchBox :optionList="dict.salaryList" v-model="policy.custInfo.appnt.salaryCode" :desc="policy.custInfo.appnt.salary" @selected="getSalaryCode" @desc="getSalary" type="salary" style="padding: 2% 0;"></SwitchBox>
							</li>
							<li v-show="showHasInsurance">
								<p>投保时有无社会基本医疗保险</p>
								<SwitchBox :optionList="[{'code':'0','text':'有'},{'code':'1','text':'无'}]" v-model="isHasInsurance" :disabled="false"></SwitchBox>
							</li>
						</ul>
						<ul class="revenues">
							<li class="title" style="color: #999;">
								个人税收居民身份声明
								<i class="fa fa-question-circle-o" @click="showHint"></i>
							</li>
							<li style="padding: 2% 4%;">
								<SwitchBox :optionList="dict.resident" v-model="policy.custInfo.appnt.appntTaxInfo.taxIdentity" @selected="getappntTaxCode"></SwitchBox>
							</li>
						</ul>
						<ul v-show="toggle.showRevenueDetail">
							<li>
								<p>出生地</p>
								<label>
								<picker v-model="policy.custInfo.appnt.appntTaxInfo.birthCountry" :values="policy.custInfo.appnt.appntTaxInfo.birthCountry" :items="dict.nationalList" code="code" text="text"></picker>
								<i class="fa fa-angle-right" aria-hidden="true"></i>
							</label>
							</li>
							<li>
								<p>省份</p>
								<input type="text" v-model="policy.custInfo.appnt.appntTaxInfo.birthProvince" v-supportLetterChinese placeholder="请输入" maxlength="10" />
							</li>
							<li>
								<p>市区</p>
								<input type="text" v-model="policy.custInfo.appnt.appntTaxInfo.birthCity" v-supportLetterChinese placeholder="请输入" maxlength="5" />
							</li>
						</ul>
						<ul class="revenues" v-show="toggle.showRevenueDetail" v-for="(item,index) in policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo">
							<li class="title" style="color: #999;justify-content: space-between;">
								<span>税收信息</span>
								<i class="fa fa-close" v-show="policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.length > 1" @click="removeRevenue(index)"></i>
							</li>
							<li>
								<p style="display: flex;flex-direction: column;">
									<span>税收居民国</span>
									<span style="margin-left: 14%;">(地区)</span>
								</p>
								<label>
									<picker :values="item.taxArea" v-model="item.taxArea" :items="dict.nationalList" :default-text="'税收居民国'" code="code" text="text"></picker>
									<i class="fa fa-angle-right" aria-hidden="true"></i>
								</label>
							</li>
							<li>
								<p style="display: flex;flex-direction: column;">
									<span>纳税人识别号</span>
									<span style="margin-left: 25%;">TIN</span>
								</p>
								<input type="text" v-model="item.tin" v-filterLetterNumber placeholder="请输入" maxlength="30" />
							</li>
							<li style="flex-direction: column;align-items: self-start;border-bottom: none;">
								<span style="line-height: 40px;font-size: 16px;">若无法提供纳税人识别号,请选择原因A或者B</span>
								<div>
									<p @click="revenueReason(item,'A')" :class="[item.reasonCheck=='A'?'active':'']" style="width: 100%;padding: 2% 8%;">A:居民国(地区)不发放纳税人识别号</p>
									<p @click="revenueReason(item,'B')" :class="[item.reasonCheck=='B'?'active':'']" style="width: 100%;padding: 2% 8%;">B:账户持有人未能取得纳税人识别号</p>
								</div>
								<textarea v-show="item.reasonCheck!='A'" v-model="item.reasonMessage" maxlength="150" rows="4" placeholder="请输入原因" style="width: 93%;border: 1px solid #ddd;margin: 5px 0 10px 0;padding: 3%;font-size: 14px;"></textarea>
							</li>
						</ul>
						<div class="addIns" v-show="toggle.showRevenueDetail && policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.length < 5" @click="addRevenue">
							<img src="../../../static/img/policy/icon_add.png" style="width:26px;margin-right:2%;" />
							<span>添加纳税信息</span>
						</div>
					</div>
					<div v-show="showList==3">
						<ul>
							<li>
								<p>转账方式</p>
								<SwitchBox :optionList="[{'code':'1','text': '实时扣款'},{'code':'2','text':'批量代扣'}]" v-model="policy.payInfo.payType"></SwitchBox>
							</li>
							<li>
								<p>转账银行</p>
								<label @click="openShowBankInfo(policy.payInfo.payType)">
								<input type="text" placeholder="请选择" v-model="showBankName" readonly/>
								<i class="fa fa-angle-right" aria-hidden="true"></i>
							</label>
							</li>
							<li>
								<p>授权卡号</p>
								<input type="text" v-model="policy.payInfo.bankAccNo" placeholder="请输入银行卡号" maxlength="20" v-supportNumber/>
							</li>
							<li>
								<p>是否纸质保单</p>
								<SwitchBox :optionList="[{'code':'Y','text': '是'},{'code':'N','text':'否'}]" v-model="policy.isPaperPrint" defaultValue="N"></SwitchBox>
							</li>
						</ul>
					</div>
				</div>
			</div>
      	<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
			<FooterBar>
				<div slot="center" @click="stepSave">下一步</div>
			</FooterBar>
		</div>
		<mt-popup v-model="toggle.showBankInfo" position="center" class="bankLists">
			<div style="height: 100%;overflow: auto;">
				<p class="title">选择支付银行</p>
				<div>
					<div v-for="(tpl,index) in dict.bankList" class="content" @click="selectBank(tpl)">
						<p><img :src="tpl.image" /></p>
						<div>
							<span>{{tpl.text}}</span>
							<span>单笔限额{{tpl.remark}}万</span>
						</div>
						<img src="../../../static/img/policy/bank/select.png" style="width: 18%;position: relative;left: 5%;bottom: 35%;" v-if="tpl.code == toggle.selectBank.code" />
					</div>
				</div>
				<p class="save" @click="selectBankSave">确定</p>
			</div>
		</mt-popup>
		<!--批量代扣-->
		<mt-popup v-model="toggle.showBankInfotwo" position="center" class="bankLists">
			<div style="height: 100%;overflow: auto;">
				<p class="title">选择支付银行</p>
				<div>
					<div v-for="(tpl,index) in dict.bankListtwo" class="content" @click="selectBank(tpl)">
						<p><img :src="tpl.image" /></p>
						<div>
							<span>{{tpl.text}}</span>
							<span>{{tpl.remark}}</span>
						</div>
						<img src="../../../static/img/policy/bank/select.png" style="width: 18%;position: relative;left: 5%;bottom: 35%;" v-if="tpl.code == toggle.selectBank.code" />
					</div>
				</div>
				<p class="save" @click="selectBankSave">确定</p>
			</div>
		</mt-popup>
		<!--批量代扣完-->
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		<alert ref="alert"></alert>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import FooterBar from '../policy/common/FooterBar.vue'
	import SwitchBox from '../policy/common/SwitchSingleBox.vue'
	import SwitchMultipleBox from '../policy/common/SwitchMultipleBox.vue'
	import NavigationBox from '../policy/common/NavigationBox.vue'
	import CustomerSearch from '../common/CustomerSearch.vue'
	import IDCardScanning from '../common/IDCardScanning.vue'
	import OccupationSearch from '../common/OccupationSearch.vue'
	import SelectArea from '../policy/common/SelectArea.vue'
	import picker from '../common/Picker.vue'
	import datePicker from '../common/DatePicker.vue'
	import alert from '../policy/common/alert.vue'

	import global_constant from '../../assets/data/global_constant.json'
	import cardTypeList from '../../assets/dict/card_type_sunlife.json'
	import nationalList from '../../assets/dict/national_sunlife.json'
	import marriageList from '../../../static/dict/marriage_sunlife.json'
	import provinceList from '../../../static/dict/province_sunlife.json'
	import cityList from '../../../static/dict/city_sunlife.json'
	import bankList from '../../../static/dict/bank_sunlife.json'
	import bankListtwo from '../../../static/dict/bank_batch_deduction_sunlife.json'

	import '../policy/css/base.css'
	import '../policy/css/process.css'

	export default {
		name: 'policy_list',
		components: {
			Headerbtns,
			FooterBar,
			SwitchBox,
			SwitchMultipleBox,
			NavigationBox,
			CustomerSearch,
			IDCardScanning,
			OccupationSearch,
			SelectArea,
			picker,
			datePicker,
			alert
		},
		data() {
			return {
				channel: utils.cache.get('channel'),
				loadData: false,
				showHasInsurance: false,
				isHasInsurance: '',
				showNavList: false,
				navigationList: [],
				showList: 1,
				customerValue: {
					isopen: false,
					type: '',
					cusItem: {},
					searchType: '1'
				},
				cardScanningValue: {
					isopen: false,
					type: '',
					cusItem: {}
				},
				occupationValue: {
					isopen: false,
					type: '',
					occItem: '',
					speechRecVal: ''
				},
				SelectAreaValue: {
					isOpen: false,
					areaItem: ''
				},
				checkData: {
					name: '',
					zipCode: '',
					email: '',
					mobile: ''
				},
				dict: {
					global_constant: global_constant.constant,
					cardTypeList: cardTypeList.dict_cardtype.item,
					nationalList: nationalList.national.item,
					marriageList: marriageList.marriage.item,
					bankList: bankList.bank.item,
					bankListtwo: bankListtwo.bank.item,
					sexList: [{
							code: '1',
							text: '男'
						},
						{
							code: '2',
							text: '女'
						},
					],
					resident: [{
						"code": "1",
						"text": "仅为中国税收居民"
					}, {
						"code": "2",
						"text": "仅为非居民"
					}, {
						"code": "3",
						"text": "既是中国税收居民又是其他国家税收居民"
					}],
					salaryList: [{
							"code": '1',
							"val": '10',
							"text": '10万'
						},
						{
							"code": '2',
							"val": '20',
							"text": '20万'
						},
						{
							"code": '3',
							"val": '30',
							"text": '30万'
						},
						{
							"code": '4',
							"val": '40',
							"text": '40万'
						},
						{
							"code": '5',
							"val": '50',
							"text": '50万'
						},
						{
							"code": '6',
							"val": '',
							"text": '其它'
						}

					]
				},
				sheetVisible: false,
				actions: [{
						name: "刷新页面",
						method: this.winReload
					},
					{
						name: "返回首页",
						method: this.backHome
					}
				],
				toggle: {
					showRevenueDetail: false,
					appntIdExpDateLong: false,
					showBankInfo: false,
					showBankInfotwo: false,
					selectBank: {},
				},
				isShowAppntEmailSuffix: false, //邮箱
				emailSuffix: ['qq.com', '163.com', '126.com', 'sina.com', 'hotmail.com', 'gmail.com', 'sohu.com', '139.cn', '189.com'],
				showBankName: '',
				policy: {
					custInfo: {
						appnt: {
							isHasInsurance: "", //0-是 1-否
							appntTaxInfo: { //税收
								taxIdentity: "1", //税收居民身份
								birthCountry: "", //出生地国家
								birthProvince: "", //出生地省
								birthCity: "", //出生地市
								taxInfoList: {
									taxInfo: [{
										taxArea: "", //税收居民国(地区)
										tin: "", //居民国(地区)纳税人编号
										reasonCheck: "", //无法提供纳税人编号原因
										reasonMessage: "" //原因描述
									}]
								}
							}
						}
					},
					payInfo: {},
				},
			}
		},
		beforeMount() {
			let orderCode = this.$route.params.planId
			if(this.$route.params.planId !="new"){
                this.getPolicyMsg()
			}else{
				this.loadData = true
			}
		},
		mounted() {
			utils.common.setH('content_page')
			window.localStorage.removeItem('addManage')
			window.localStorage.removeItem('editList')
			let orgId = utils.cache.get('personsal').orgId.substring(0, 4)
			for(let i in this.dict.bankList) {
				if(orgId != "8611" && this.dict.bankList[i].code == '321') {
					this.dict.bankList.splice(i, 1)
				}
				if(orgId != "8661" && this.dict.bankList[i].code == '314') {
					this.dict.bankList.splice(i, 1)
				}
			}
			//代扣筛选代理人
			for(let i in this.dict.bankListtwo) {
				if(orgId != "8611" && this.dict.bankListtwo[i].code == '321') {
					this.dict.bankListtwo.splice(i, 1)
				}
				if(orgId != "8661" && this.dict.bankListtwo[i].code == '314') {
					this.dict.bankListtwo.splice(i, 1)
				}
			}
			//代扣完
			if(this.$route.params.step != '') {
				this.showList = this.$route.params.step
			}
		},
		computed: {
			customerIsOpen() {
				return this.customerValue.isopen
			},
			cardScannIsOpen() {
				return this.cardScanningValue.isopen
			},
			occupationIsOpen() {
				return this.occupationValue.isopen
			},
			contentIsOpen() {
				if(this.customerValue.isopen || this.cardScanningValue.isopen || this.occupationValue.isopen || this.SelectAreaValue.isOpen) {
					return false
				} else {
					return true
				}
			},
			appntIdNo() {
				return this.policy.custInfo.appnt.idNo
			},
			appntEmail() {
				return this.policy.custInfo.appnt.email
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
			customerIsOpen(val, oldval) {
				if(!val) {
					if(this.customerValue.cusItem != undefined && this.customerValue.cusItem.data != undefined && this.customerValue.cusItem.data.appntMsg.appntName != undefined) {
						utils.common.customerConvertInPolicy('APP', this.policy.custInfo.appnt, this.customerValue.cusItem.data.appntMsg)
						utils.common.payInfoConvertInPolicy(this.policy.payInfo, this.customerValue.cusItem.data.payInfo)
						this.toggle.appntIdExpDateLong = (this.customerValue.cusItem.data.appntMsg.idExpDate == '2200-12-31') ? true : false
						if(this.policy.payInfo.bankCode != '') {
							if(this.policy.payInfo.payType == '1') {
								this.dict.bankList.forEach(item => {
									if(item.code == this.policy.payInfo.bankCode) {
										this.showBankName = item.text
									}
								})
							} else if(this.policy.payInfo.payType == '2') {
								this.dict.bankListtwo.forEach(item => {
									if(item.code == this.policy.payInfo.bankCode) {
										this.showBankName = item.text
									}
								})
							}
						}
					} else if(this.customerValue.cusItem != undefined && this.customerValue.cusItem.customerName != undefined) {
						this.policy.custInfo.appnt.appntName = this.customerValue.cusItem.customerName
						this.policy.custInfo.appnt.idType = this.customerValue.cusItem.idType
						this.policy.custInfo.appnt.idNo = this.customerValue.cusItem.idNo
						this.policy.custInfo.appnt.idStaDate = this.customerValue.cusItem.idStartDate
						this.policy.custInfo.appnt.idExpDate = this.customerValue.cusItem.idEndDate
						this.toggle.appntIdExpDateLong = (this.customerValue.cusItem.idEndDate == '2200-12-31') ? true : false
						this.policy.custInfo.appnt.appntSex = this.customerValue.cusItem.sex
						this.policy.custInfo.appnt.appntBirthday = this.customerValue.cusItem.birthday
						this.policy.custInfo.appnt.appOccupation = this.customerValue.cusItem.workType
						this.policy.custInfo.appnt.occupationCode = this.customerValue.cusItem.occupationCode
						this.policy.custInfo.appnt.occupationType = this.customerValue.cusItem.occupationType
						this.policy.custInfo.appnt.marriage = this.customerValue.cusItem.isMarriage
						this.policy.custInfo.appnt.province = this.customerValue.cusItem.province
						this.policy.custInfo.appnt.city = this.customerValue.cusItem.city
						this.policy.custInfo.appnt.county = this.customerValue.cusItem.county
						this.policy.custInfo.appnt.street = this.customerValue.cusItem.street
						this.policy.custInfo.appnt.community = this.customerValue.cusItem.community
						this.policy.custInfo.appnt.postalAddress = this.customerValue.cusItem.postalAddress
						this.policy.custInfo.appnt.zipCode = this.customerValue.cusItem.zipcode
						this.policy.custInfo.appnt.email = this.customerValue.cusItem.email
						this.policy.custInfo.appnt.mobile = this.customerValue.cusItem.mobile
						this.policy.custInfo.appnt.grpName = this.customerValue.cusItem.grpName
					}
				}
			},
			cardScannIsOpen(val, oldval) {
				if(!val) {
					if(this.cardScanningValue.cusItem != undefined && this.cardScanningValue.cusItem.name != undefined) {
						utils.common.cardScanningValueChange(2, this.policy.custInfo.appnt, this.cardScanningValue)
						this.toggle.appntIdExpDateLong = (this.cardScanningValue.cusItem.valid_date == '2200-12-31') ? true : false
					}
				}
			},
			occupationIsOpen(val, oldval) {
				if(!val) {
					if(this.occupationValue.occItem != undefined) {
						utils.common.occupationValueChange(2, this.policy.custInfo.appnt, this.occupationValue)
					}
				}
			},
			appntIdNo(val, oldval) {
				if(this.policy.custInfo.appnt.idType == '11') {
					this.policy.custInfo.appnt.idNo = val.replace(/x/, 'X')
					if(val.length == 18) {
						if(utils.valid.checkIdCard(val)) {
							this.policy.custInfo.appnt.appntBirthday = val.slice(6, 10) + '-' + val.slice(10, 12) + '-' + val.slice(12, 14)
							let sex = val.slice(16, 17)
							if(sex % 2 == 1) {
								this.policy.custInfo.appnt.appntSex = 1
							} else if(sex % 2 == 0) {
								this.policy.custInfo.appnt.appntSex = 2
							}
						}
					}
				}
			},
			appntEmail(val, oldval) {
				if(val != oldval) {
					try {
						if(val.indexOf('@') > -1 && oldval.indexOf('@') <= -1) {
							if(val.split('@')[1] != '') {
								this.isShowAppntEmailSuffix = false
							} else {
								this.isShowAppntEmailSuffix = true
							}
						} else {
							this.isShowAppntEmailSuffix = false
						}
					} catch(err) {
						console.log("%c " + err, 'color:blue', "LOG")
					}
				}
			},
		},
		filters: {
			getProvinceText(code) {
				for(let item of provinceList.province.item) {
					if(item.code == code) {
						return item.text
					}
				}
			},
			getCityText(code) {
				for(let item of cityList.city.item) {
					if(item.code == code) {
						return item.text
					}
				}
			},
		},
		methods: {
			/*
			 * 根据传入type打开选择银行列表，
			 * type=1 打开实时付款银行列表，
			 * type=2打开批量扣款银行列表
			 */
			openShowBankInfo(type) {
				console.log(type)
				if(type == 1) {
					this.toggle.showBankInfo = true
				} else if(type == 2) {
					this.toggle.showBankInfotwo = true
				}
			},
			checkNavChangeInfo() {
				console.log('checkNavChangeInfo')
				let result = []
				//1
				result = utils.valid.checkDataBase(1, this.policy.custInfo.appnt)
				if(result.length > 0) {
					return result
				}
				//2
				if(this.policy.custInfo.appnt.salaryCode != '6') {
					this.dict.salaryList.forEach(item => {
						if(item.code == this.policy.custInfo.appnt.salaryCode) {
							this.policy.custInfo.appnt.salary = item.val
						}
					})
				}
				result = utils.valid.checkDataDetails(1, this.policy.custInfo.appnt)
				let resultTax = this.checkAppntTaxInfo()
				if(resultTax.length > 0) {
					result = result.concat(resultTax)
				}
				if(result.length > 0) {
					return result
				}
				//3
				this.policy.payInfo.bankAccName = this.policy.custInfo.appnt.appntName
				if(this.policy.payInfo.bankCode == undefined || this.policy.payInfo.bankCode == '') {
					result.push('请选择转账银行')
				}
				if(this.policy.payInfo.bankAccNo == undefined || this.policy.payInfo.bankAccNo == '') {
					result.push('请输入转账卡号')
				}
				let msg = utils.valid.BankCode(this.policy.payInfo.bankCode, this.policy.payInfo.bankAccNo)
				if(msg != undefined && msg != "") {
					result.push(msg)
				}
				if(result.length > 0) {
					return result
				}
				return result
			},
			selectedNav(item) {
				let result = this.checkNavChangeInfo()
				if(result.length > 0) {
					this.showAlert(result)
				} else {
					let requ = {
						policy: this.policy
					}
					utils.http.postFast("MODISTRIESAVE", requ, body => {
						if(body.policy.resultCode == '0') {
							let step = utils.cache.get('step_' + this.$route.params.planId)
							if(step > 5) {
								step = 5
							}
							console.log(step)
							if(item.step <= step) {
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
							} else {
								console.log(item.step)
								console.log(this.policy.substepNo)
								if(utils.cache.get('step_' + this.$route.params.planId) >= 5 && item.step >= 5) {
									alert_n22.confirm('提示', '请打开险种信息页面对信息进行确认！', '打开', '', (flag) => {
										this.$router.push({
											name: 'productsPage',
											params: {
												planId: this.$route.params.planId
											}
										})
									})
								} else {
									alert_n22.alert("提示", "请您按顺序依次填写保单信息！", "确定")
								}
							}
						} else {
							alert_n22.alert("提示", body.policy.resultMessage, "确定")
						}
					})
				}
			},
			select(index) {
				console.log('选中sheet,当前页', index, this.showList)
				if(index > this.showList) {
					//this.showToast('请填写当前页后点击下一步继续')
				} else {
					this.showList = index
				}
			},
			stepSave() {
				console.log('保存==>', this.showList)
				if(event.target.disabled) {
					this.showToast('点击太频繁了...')
					return
				}
				let result = []
				if(this.showList == 1) {
					result = utils.valid.checkDataBase(1, this.policy.custInfo.appnt)
				} else if(this.showList == 2) {
					if(this.policy.custInfo.appnt.salaryCode != '6') {
						this.dict.salaryList.forEach(item => {
							if(item.code == this.policy.custInfo.appnt.salaryCode) {
								this.policy.custInfo.appnt.salary = item.val
							}
						})
					}
					result = utils.valid.checkDataDetails(1, this.policy.custInfo.appnt)
					let resultTax = this.checkAppntTaxInfo()
					if(resultTax.length > 0) {
						result = result.concat(resultTax)
					}
				} else if(this.showList == 3) {
					this.policy.payInfo.bankAccName = this.policy.custInfo.appnt.appntName
					if(this.policy.payInfo.bankCode == undefined || this.policy.payInfo.bankCode == '') {
						result.push('请选择转账银行')
					}
					if(this.policy.payInfo.bankAccNo == undefined || this.policy.payInfo.bankAccNo == '') {
						result.push('请输入转账卡号')
					}

					let msg = utils.valid.BankCode(this.policy.payInfo.bankCode, this.policy.payInfo.bankAccNo)
					if(msg != undefined && msg != "") {
						result.push(msg)
					}
				}
				if(result.length > 0) {
					this.showAlert(result)
				} else {
					if(this.policy.custInfo.appnt.salaryCode != '6') {
						this.dict.salaryList.forEach(item => {
							if(item.code == this.policy.custInfo.appnt.salaryCode) {
								this.policy.custInfo.appnt.salary = item.val
							}
						})
					}
					let requ = {
						policy: this.policy
					}
					console.log(JSON.stringify(requ))
                   if(this.isHasInsurance!=""&&this.showHasInsurance == true){
                   	 this.policy.custInfo.appnt.isHasInsurance=this.isHasInsurance 
                   }					
					utils.http.postFast("MODISTRIESAVE", requ, body => {
						if(body.policy.resultCode == '0') {
							if(this.showList == 3) {
								this.$router.push({
									name: 'custDetails',
									params: {
										planId: this.$route.params.planId,
										insNo: '-1',
										step: '1'
									}
								})
							} else {
								this.showList++
							}
						} else {
							alert_n22.alert("提示", body.policy.resultMessage, "确定")
						}
					})
				}
			},
			getSalaryCode(value) {
				if(value == 6) {
					this.policy.custInfo.appnt.salary = ''
				}
			},
			getSalary(value) {
				this.policy.custInfo.appnt.salary = value
			},
			getappntTaxCode(value) {
				if(value == '1') {
					this.toggle.showRevenueDetail = false
					this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo = []
				} else if(value == '2') {
					this.toggle.showRevenueDetail = true
					this.addRevenue(1)
				} else if(value == '3') {
					this.toggle.showRevenueDetail = true
					this.addRevenue(2)
				}
			},
			customerSearch() {
				this.customerValue.isopen = !this.customerValue.isopen
				this.customerValue.relationship = this.policy.custInfo.insurants.firstInsurant.relToApp
				this.customerValue.sex = this.policy.custInfo.insurants.firstInsurant.sex
				this.customerValue.infoId = this.policy.custInfo.insurants.firstInsurant.infoId
			},
			cardScanning(type, id) {
				this.cardScanningValue.isopen = !this.cardScanningValue.isopen
				this.cardScanningValue.type = type
				this.cardScanningValue.id = id
			},
			occupationSearch() {
				this.occupationValue.isopen = !this.occupationValue.isopen
			},
			selectAdress() {
				this.SelectAreaValue.isOpen = true
				this.SelectAreaValue.areaItem = ''
				//console.log('选择地址前', this.SelectAreaValue)
			},
			selectActions() {
				this.SelectAreaValue.isOpen = false
				//console.log('选择地址后', this.SelectAreaValue)
				this.policy.custInfo.appnt.province = this.SelectAreaValue.areaItem.provinceCode
				this.policy.custInfo.appnt.provinceDesc = this.SelectAreaValue.areaItem.provinceDesc
				this.policy.custInfo.appnt.city = this.SelectAreaValue.areaItem.cityCode
				this.policy.custInfo.appnt.cityDesc = this.SelectAreaValue.areaItem.cityDesc
				this.policy.custInfo.appnt.county = this.SelectAreaValue.areaItem.county
			},
			cancels() {
				this.SelectAreaValue.isOpen = false
				this.SelectAreaValue.areaItem = ''
			},
			checkAppName() {
				this.policy.custInfo.appnt.appntName = this.policy.custInfo.appnt.appntName.replace(/\s+/g, "")
				if(this.policy.custInfo.appnt.appntName != '' && this.policy.custInfo.appnt.appntName.length < 2) {
					this.checkData.name = '请确认输入的姓名是否正确'
				} else {
					this.checkData.name = ''
				}
			},
			removeCheckAppName() {
				this.checkData.name = ''
			},
			checkZip() {
				if(this.policy.custInfo.appnt.zipCode != '' && this.policy.custInfo.appnt.zipCode.length < 6) {
					this.checkData.zipCode = '邮编必须为6位数字'
				}
			},
			removeCheckZip() {
				this.checkData.zipCode = ''
			},
			checkEmail() {
				/*
				if(this.policy.custInfo.appnt.email != '') {
					let reg = /^[A-Za-z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
					if(!reg.test(this.policy.custInfo.appnt.email.replace(/(^\s*)|(\s*$)/g, ""))) {
						this.checkData.email = '请确认邮箱是否正确'
					}
				}*/
			},
			removeCheckEmail() {
				this.checkData.email = ''
			},
			checkMobile() {
				if(this.policy.custInfo.appnt.mobile != '') {
					if(this.policy.custInfo.appnt.mobile.length != 11) {
						this.checkData.mobile = '手机号必须为11位数字'
					} else if(this.policy.custInfo.appnt.mobile.substring(0, 1) != 1) {
						this.checkData.mobile = '手机号开头必须以1开头'
					}
				}
			},
			removeCheckMobile() {
				this.checkData.mobile = ''
			},
			removeCheckData() {
				this.checkData.name = ''
				this.checkData.zipCode = ''
				this.checkData.email = ''
				this.checkData.mobile = ''
			},
			showAlert(arr) {
				let msg = ''
				for(let i = 0; i < arr.length; i++) {
					msg += i + 1 + '.' + arr[i] + '</br>'
				}
				console.log('msg==>>', msg)
				alert_n22.alert("提示", msg, "确定")
			},
			showToast(message) {
				Toast({
					message: message,
					position: 'bottom',
					duration: 1500
				})
			},
			changeIdType() {
                if(this.policy.custInfo.appnt.idType!="11"){
                  this.policy.custInfo.appnt.idNo = ''
				  this.policy.custInfo.appnt.idStaDate = ''
				  this.toggle.appntIdExpDateLong = false
				  this.policy.custInfo.appnt.idExpDate = ''
                }
				if(this.policy.custInfo.appnt.idType == '11' || this.policy.custInfo.appnt.idType == '12' || this.policy.custInfo.appnt.idType == '20') {
					this.policy.custInfo.appnt.nativePlace = 'CHN'
				} else {
					this.policy.custInfo.appnt.nativePlace = ''
				}
			},
			changeIdExpDateLong() {
				if(this.toggle.appntIdExpDateLong) {
					this.policy.custInfo.appnt.idExpDate = '2200-12-31'
				} else {
					this.policy.custInfo.appnt.idExpDate = ''
				}
			},
			speechRec(tag) {
				MAPlugin.hybridCallAction('hybrid://MASpeech:401/invokeSpeech?0', (callbackSucc) => {
					if(tag == 'postalAddress') {
						this.policy.custInfo.appnt.postalAddress = callbackSucc.result
					} else if(tag == 'mobile') {
						this.policy.custInfo.appnt.mobile = callbackSucc.result
					} else if(tag == 'zipCode') {
						this.checkData.zipCode = ''
						this.policy.custInfo.appnt.zipCode = callbackSucc.result.substring(0, 6)
					} else if(tag == 'grpName') {
						this.policy.custInfo.appnt.grpName = callbackSucc.result.substring(0, 15)
					} else if(tag == 'occupation') {
						this.occupationValue.isopen = !this.occupationValue.isopen
						this.occupationValue.speechRecVal = callbackSucc.result
					}
				}, (callbackFail) => {

				})
			},
			showHint() {
				let msg = "<p style='text-align:left;'>1、中国税收居民是指在中国境内有住所,或者无住所而在境内住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的,不扣减日数。临时离境,是指在一次纳税年度中一次不超过30日或者多次累计不超过90日的离境。<br/>2、非居民是指中国税收居民以外的个人。<br/>3、其他国家(地区)税收居民身份认定规则及纳税人识别号相关信息请参见国家税务总局网站http://www.chinatax.gov.cn/aeoi_index.html。</p>"
				alert_n22.alert("提示", msg, "确定")
			},
			revenueReason(item, val) {
				if(item.reasonCheck == val) {
					item.reasonCheck = ''
				} else {
					item.reasonCheck = val
				}
			},
			addRevenue(index) {
				if(index == '1' || index == '2') {
					this.policy.custInfo.appnt.appntTaxInfo.birthCountry = ""
					this.policy.custInfo.appnt.appntTaxInfo.birthProvince = ""
					this.policy.custInfo.appnt.appntTaxInfo.birthCity = ""
					this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo = []
					this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.push({
						reasonCheck: "",
						reasonMessage: "",
						taxArea: "",
						tin: ""
					})
					if(index == '2') {
						this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.push({
							reasonCheck: "",
							reasonMessage: "",
							taxArea: "",
							tin: ""
						})
					}
				} else {
					this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.push({
						reasonCheck: "",
						reasonMessage: "",
						taxArea: "",
						tin: ""
					})
				}
			},
			removeRevenue(index) {
				alert_n22.confirm('提示', '确认删除？', '确定', '取消', (flag) => {
					this.policy.custInfo.appnt.appntTaxInfo.taxInfoList.taxInfo.splice(index, 1)
				})
			},
			selectBank(item) {
				this.toggle.selectBank = item
			},
			selectBankSave() {
				if(this.toggle.selectBank.code == undefined) {
					alert_n22.alert("提示", '请选择银行', "确定")
				} else {
					this.policy.payInfo.bankCode = this.toggle.selectBank.code
					this.showBankName = this.toggle.selectBank.text
					this.toggle.showBankInfo = false
					this.toggle.showBankInfotwo = false
					this.toggle.selectBank = {}
				}
			},
			getPolicyMsg() {
				let requ = {
					"policy": {
						"substepNo": "3",
						"orderCode": this.$route.params.planId,
						"stepNo":'0,1,2,8',
						"nothave":'1,3'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requ, (body) => {
					this.policy = JSON.parse(JSON.stringify(body.policy))
					console.log(this.policy)
					if(this.policy.custInfo.appnt.isHasInsurance !== '') {
						this.isHasInsurance = this.policy.custInfo.appnt.isHasInsurance
						this.showHasInsurance = true
					}
					this.policy.substepNo = '3'
					this.navigationList = this.policy.navigationList
					this.navigationList.forEach(item => {
						item.path = ''
						if(item.step < '3') {
							item.path = 'cheng'
						}
						if(item.step == '3') {
							item.path = 'lv'
						}
					})
					//获取接口得到被保人节点中是否包含社保值确认为投保人本人后赋值到投保人信息中
					if(!this.showHasInsurance) {
						if(this.policy.custInfo.insurants.firstInsurant.relToApp == "00") {
							if(this.policy.custInfo.insurants.firstInsurant.isHasInsurance !== '') {
								this.showHasInsurance = true
								this.isHasInsurance = this.policy.custInfo.insurants.firstInsurant.isHasInsurance
							}
						} else {
							let othIns = this.policy.custInfo.insurants.otherInsurant.insurant
							for(let i = 0; i < othIns.length; i++) {
								let othins = othIns[i]
								if(othins.relToApp == "00") {
									if(othins.isHasInsurance !== '') {
										this.showHasInsurance = true
										this.isHasInsurance = othins.isHasInsurance
									}
								}
							}
						}
					}
					this.toggle.appntIdExpDateLong = this.policy.custInfo.appnt.idExpDate == "2200-12-31" ? true : false
					this.toggle.showRevenueDetail = this.policy.custInfo.appnt.appntTaxInfo.taxIdentity == "1" ? false : true
					this.policy.payInfo.bankAccName = this.policy.custInfo.appnt.appntName
					for(let i = 0; i < this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.length; i++) {
						if(this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary[i].belongWith == '') {
							this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.splice(i--, 1)
						}
					}
					for(let i = 0; i < this.policy.custInfo.insurants.otherInsurant.insurant.length; i++) {
						if(this.policy.custInfo.insurants.otherInsurant.insurant[i].name == '') {
							this.policy.custInfo.insurants.otherInsurant.insurant.splice(i--, 1)
						} else {
							for(let j = 0; j < this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.length; j++) {
								if(this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary[j].belongWith == '') {
									this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo.beneficiaries.beneficiary.splice(j--, 1)
								}
							}
						}
					}
					console.log('policy===>>>', this.policy)
					if(this.policy.payInfo.bankCode != '') {
						this.dict.bankList.forEach(item => {
							if(item.code == this.policy.payInfo.bankCode) {
								this.showBankName = item.text
							}
						})
					}
				})
				setTimeout(()=>{
					this.loadData = true
				},"1500")
			},
			addEmailEvent() {
				this.$refs.appntEmail.addEventListener('blur', () => {
					this.policy.custInfo.appnt.email = this.$refs.appntEmail.value
					console.log('监听投保人邮箱 :' + this.policy.custInfo.appnt.email)
				})
			},
			selectEmailSuffix(item) {
				this.isShowAppntEmailSuffix = false
				this.policy.custInfo.appnt.email = this.policy.custInfo.appnt.email + item
			},
			winReload: function(cond) {
				this.$router.push({
					name: "customer_details_page",
					params: {
						planId: this.$route.params.planId,
						step: this.showList
					}
				})
				window.location.reload();
			},
			backHome() {
				let requ = {
					policy: this.policy
				}
				if(this.policy.custInfo.appnt.salaryCode != '6') {
					this.dict.salaryList.forEach(item => {
						if(item.code == this.policy.custInfo.appnt.salaryCode) {
							this.policy.custInfo.appnt.salary = item.val
						}
					})
				}
				utils.http.postFast("MODISTRIESAVE", requ, body => {
					if(body.policy.resultCode == '0') {
						this.$router.push("/home")
					} else {
						alert_n22.alert("提示", body.policy.resultMessage, "确定")
					}
				})
			},
			detailBack() {
				// let requ = {
				// 	policy: this.policy
				// }
				// if(this.policy.custInfo.appnt.salaryCode != '6') {
				// 	this.dict.salaryList.forEach(item => {
				// 		if(item.code == this.policy.custInfo.appnt.salaryCode) {
				// 			this.policy.custInfo.appnt.salary = item.val
				// 		}
				// 	})
				// }
				// utils.http.postFast("MODISTRIESAVE", requ, body => {
				// 	if(body.policy.resultCode == '0') {
				// 		if(this.showList == 1) {
				// 			let page = 'product_details_page'
				// 			this.navigationList.forEach(item => {
				// 				if(item.step == 2) {
				// 					page = item.name
				// 				}
				// 			})
				// 			if(page != 'product_details_page') {
				// 				this.$router.push({
				// 					name: page,
				// 					params: {
				// 						planId: this.$route.params.planId
				// 					}
				// 				})
				// 			} else {
				// 				this.$router.push({
				// 					name: page,
				// 					params: {
				// 						planId: this.$route.params.planId,
				// 						step: '3'
				// 					}
				// 				})
				// 			}
				// 		} else {
				// 			this.showList--
				// 		}
				// 	} else {
				// 		alert_n22.alert("提示", body.policy.resultMessage, "确定")
				// 	}
				// })
			},
			checkAppntTaxInfo() {
				let result = []
				let appntTaxInfo = this.policy.custInfo.appnt.appntTaxInfo
				console.log('appntTaxInfo==>', appntTaxInfo)
				let isHaveCHN = false
				let idType = this.policy.custInfo.appnt.idType
				if((idType == '11' || idType == '12') && appntTaxInfo.taxIdentity != '1') {
					result.push('证件类型为身份证、户口本，必须为“仅为中国公民”')
				}
				if(appntTaxInfo.taxIdentity != '1') {
					if(appntTaxInfo.birthCountry == '') {
						result.push('投保人出生地未填写，请正确填写')
					} else if(appntTaxInfo.birthProvince != '' && appntTaxInfo.birthCity == '') {

					} else if(appntTaxInfo.birthProvince == '' && appntTaxInfo.birthCity != '') {

					} else if(appntTaxInfo.birthProvince == '' || appntTaxInfo.birthCity == '') {
						result.push('投保人出生地填写不完整，请核实')
					}
					for(var i = 0; i < appntTaxInfo.taxInfoList.taxInfo.length; i++) {
						let oldTaxInfo = appntTaxInfo.taxInfoList.taxInfo[i]
						for(var j = i + 1; j < appntTaxInfo.taxInfoList.taxInfo.length; j++) {
							let nextTaxInfo = appntTaxInfo.taxInfoList.taxInfo[j]
							if(oldTaxInfo.taxArea != undefined && oldTaxInfo.taxArea != "") {
								if(nextTaxInfo.taxArea != undefined && nextTaxInfo.taxArea != "") {
									if(oldTaxInfo.taxArea == nextTaxInfo.taxArea) {
										result.push('投保人税收居民国（地区）填写错误，请正确填写')
									}
								}
							}
							if(oldTaxInfo.tin != undefined && oldTaxInfo.tin != "") {
								if(nextTaxInfo.tin != undefined && nextTaxInfo.tin != "") {
									if(oldTaxInfo.tin == nextTaxInfo.tin) {
										result.push('投保人居民国（地区）纳税人识别号填写错误，请确认')
									}
								}
							}
						}
					}
					if(appntTaxInfo.taxIdentity == '3' && appntTaxInfo.taxInfoList.taxInfo.length < 2) {
						result.push('投保人税收居民国及其相关信息须至少填写两项且含中国')
					}
					appntTaxInfo.taxInfoList.taxInfo.forEach(item => {
						if(item.taxArea == '') {
							result.push('投保人税收居民国（地区）未填写，请正确填写')
						}
						if(item.taxArea == 'CHN') {
							isHaveCHN = true
						}
						if(item.tin == '') {
							if(item.reasonCheck == '') {
								result.push('投保人若无法提供纳税人识别号，请选择原因A或B')
							}
							if(item.reasonCheck == 'B' && item.reasonMessage == '') {
								result.push('原因B 账户持有人未能取得纳税人识别号，请投保人解释具体原因')
							}
						}
						if(item.tin != '' && (item.reasonCheck != '' || item.reasonMessage != '')) {
							result.push('投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认')
						}
					})
				}
				if(appntTaxInfo.taxIdentity == '2' && isHaveCHN) {
					result.push("投保人税收居民国（地区）应为非中国")
				}
				if(appntTaxInfo.taxIdentity == '3' && !isHaveCHN) {
					result.push('投保人税收居民国及其相关信息须至少填写两项且含中国')
				}
				return result
			},
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.main-contents {
		bottom: 50px;
		.sheet_a {
			height: 56px;
			display: flex;
			justify-content: space-around;
			padding: 2px 5%;
			box-sizing: border-box;
			background: url('./../../../static/img/policy/icon_a.png') no-repeat center center #f0f0f0;
			background-size: 100% 100%;
			p {
				line-height: 52px;
				font-size: 14px;
				color: #949495;
			}
			p:first-child {
				color: #FEB101;
			}
		}
		.sheet_b {
			background: url('./../../../static/img/policy/icon_b.png') no-repeat center center #f0f0f0;
			background-size: 100% 100%;
			p:nth-child(2) {
				color: #FEB101;
			}
		}
		.sheet_c {
			background: url('./../../../static/img/policy/icon_c.png') no-repeat center center #f0f0f0;
			background-size: 100% 100%;
			p {
				color: #FEB101;
			}
		}
		li.base {
			align-items: baseline;
		}
		.maillist {
			background: #fff;
			border: 1px solid #EFEFEF;
			width: 230px;
			height: 150px;
			position: absolute;
			right: 5px;
			top: 44px;
			z-index: 10;
			ul {
				width: 100%;
				height: 100%;
				background: #fff;
				overflow: auto;
				li {
					min-height: 35px;
					line-height: 35px;
					margin: 0;
					padding: 0;
					padding-left: 5px;
					border: none;
				}
			}
		}
		.revenues {
			.title {
				background: #F5F5F5;
				line-height: 45px;
			}
			div p {
				border: 1px solid #ddd;
				line-height: 2;
				padding: 1% 2%;
				border-radius: 3px;
				margin-bottom: 5%;
				font-size: 14px;
			}
			.active {
				background: #FEB101;
				color: #fff;
				border-color: transparent;
			}
		}
	}

	.bankLists {
		background: #F3F3F7;
		width: 90%;
		height:auto;
		text-align: center;
		overflow: hidden;
		.title {
			font-size: 18px;
			font-weight: bold;
			line-height: 40px;
		}
		.title+div {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.content {
				border: 1px solid #F3F3F7;
				border-radius: 5%;
				background: #fff;
				width: 46%;
				height: 54px;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin: 1% 2% 2%;
				p {
					width: 35%;
					padding: 0 2%;
					img {
						width: 30px;
						margin: 0 2%;
					}
				}
				div {
					width: 65%;
					display: flex;
					flex-direction: column;
					margin-left: 1%;
					overflow: hidden;
					span {
						font-size: 12px;
						color: #000;
						line-height: 2;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						text-align: left;
					}
					span+span {
						font-size: 10px;
						color: #E60020;
					}
				}
			}
		}
		.save {
			width: 98%;
			background: #FDB92C;
			border-radius: 3px;
			color: #fff;
			font-size: 14px;
			line-height: 40px;
			margin: 2% 1% 5%;
		}
	}
</style>
