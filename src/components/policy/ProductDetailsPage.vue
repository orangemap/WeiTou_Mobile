<!-- 保单详情页面-->
<template>
	<div>
		<CustomerSearch v-show="customerValue.isopen" v-model="customerValue"></CustomerSearch>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue"></IDCardScanning>
		<Search v-show="occupationValue.isopen" v-model="occupationValue"></Search>
		<div v-show="contentIsOpen">
			<Headerbtns title="基本信息">
				<div slot="left" @click="detailBack">
					<i class="fa fa-angle-left"></i>
				</div>
				<div slot="right" @click="sheetVisible = !sheetVisible">
					<i class="fa fa-ellipsis-v"></i>
				</div>
			</Headerbtns>
			<div v-show="loadData" class="main-contents process" :class="LoginWidth>924?'isPc':''">
				<NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
				<div class="main-contents-right">
					<div class="sheet_a" :class="[showList == '2'?'sheet_b':'',showList == '3'?'sheet_c':'']">
						<p @click="select(1)">被保险人</p>
						<p @click="select(2)">投保人信息</p>
						<p @click="select(3)">险种信息</p>
					</div>
					<div v-show="showList==1">
						<ul>
							<li style="position: relative;">
								<p>与投保人关系</p>
								<label>
									<picker v-model="insurant.relationNew" :values="insurant.relationNew" :items="dict.relationBenefitList" code="code" text="text" @change="changeRelation()"></picker>
									<i class="fa fa-angle-right"></i>
								</label>
								<p style="position: absolute;right: 30%;" v-show="insurant.relationNew=='30'">({{insurant.relToAppDesc}})</p>
							</li>
							<li :class="insurant.check_name!=''?'active':''">
								<p>姓名</p>
								<div>
									<input type="text" v-model="insurant.name" v-supportLetterChinese @focus="removeTestName(insurant)" @blur="testName(insurant)" maxlength="15" placeholder="请输入姓名" :readonly="insurant.memberType == '1'" />
									<img src="../../../static/img/policy/icon_search.png" @click="customerSearch(dict.global_constant.TAG_SEARCH_CUS_INSURE)" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="insurant.memberType!='1'" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_INSURE,insurant.id,'-1')" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="insurant.memberType=='1'" />
								</div>
							</li>
							<li class="validText" v-show="insurant.check_name!=''">{{insurant.check_name}}</li>
							<li>
								<p>出生日期</p>
								<div>
									<date-picker v-if="insurant.memberType!='1'" v-model="insurant.birthday" :defaultTimeYear="defaultTime" @change="changeInsurantBirth('insurant',insurant)" style="width: 85%;"></date-picker>
									<p v-if="insurant.memberType=='1'">{{insurant.birthday}}</p>
									<i class="fa fa-angle-right"></i>
								</div>
							</li>
							<li class="sex">
								<p>性别</p>
								<SwitchBox v-if="insurant.memberType!='1'" :optionList="dict.sexList" v-model="insurant.sex"></SwitchBox>
								<SwitchBox v-if="insurant.memberType=='1'" :optionList="dict.sexList" v-model="insurant.sex" :disabled="false"></SwitchBox>
							</li>
							<li>
								<p>职业</p>
								<div>
									<p class="job" @click="chooseJob(dict.global_constant.TAG_SEARCH_CUS_INSURE)">
										<span v-if="insurant.desc==''" style="color:#ccc;">请选择</span>
										<span v-if="insurant.desc!=''" class="hideText">{{insurant.desc}}</span>
										<i class="fa fa-angle-right"></i>
									</p>
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec(dict.global_constant.TAG_SEARCH_CUS_INSURE)" />
								</div>
							</li>
						</ul>
						<!--新增被保人-->
						<ul v-if="otherInsurantList.length>0" v-for="(item,index) in otherInsurantList" class="bgul">
							<li>
								<p>与投保人关系</p>
								<div style="position: relative;">
									<label style="display: flex;justify-content: space-between;width: 80%;">
										<picker v-model="item.insurant.relationNew" :values="item.insurant.relationNew" :items="dict.relationBenefitList" code="code" text="text" @change="changeRelation(index)"></picker>
										<i class="fa fa-angle-right"></i>
									</label>
									<i class="fa fa-trash-o" aria-hidden="true" @click="delInsurant(index)"></i>
								</div>
								<p class="hideText" style="position: absolute;right: 30%;" v-if='item.insurant.relationNew == "30"'>({{item.insurant.relToAppDesc}})</p>
							</li>
							<li :class="item.insurant.check_name!=''?'active':''">
								<p>姓名</p>
								<div>
									<input type="text" v-model="item.insurant.name" v-supportLetterChinese @blur="testName(item.insurant)" maxlength="15" placeholder="请输入姓名" :readonly="item.insurant.memberType == '1'" />
									<img src="../../../static/img/policy/icon_search.png" @click="customerSearch(dict.global_constant.TAG_SEARCH_CUS_INSURE,index)" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="item.insurant.memberType!='1'" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_INSURE,item.id,index)" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="item.insurant.memberType=='1'" />
								</div>
							</li>
							<li class="validText" v-show="item.insurant.check_name!=''">{{item.insurant.check_name}}</li>
							<li>
								<p>出生日期</p>
								<div>
									<date-picker v-if="item.insurant.memberType!='1'" v-model="item.insurant.birthday" :defaultTimeYear="defaultTime" @change="changeInsurantBirth('insurant',item.insurant)" style="width: 85%;"></date-picker>
									<p v-if="item.insurant.memberType=='1'">{{item.insurant.birthday}}</p>
									<i class="fa fa-angle-right"></i>
								</div>
							</li>
							<li class="sex">
								<p>性别</p>
								<SwitchBox v-if="item.insurant.memberType!='1'" :optionList="dict.sexList" v-model="item.insurant.sex"></SwitchBox>
								<SwitchBox v-if="item.insurant.memberType=='1'" :optionList="dict.sexList" v-model="item.insurant.sex" :disabled="false"></SwitchBox>
							</li>
							<li>
								<p>职业</p>
								<div>
									<p class="job" @click="chooseJob(dict.global_constant.TAG_SEARCH_CUS_INSURE,index)">
										<span v-if="item.insurant.desc==''" style="color:#ccc;">请选择</span>
										<span v-if="item.insurant.desc!=''" class="hideText">{{item.insurant.desc}}</span>
										<i class="fa fa-angle-right"></i>
									</p>
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec(dict.global_constant.TAG_SEARCH_CUS_INSURE,index)" />
								</div>
							</li>
						</ul>
						<!--新增被保人-->
						<div class="addIns" v-if="false" @click="addInsurant">
							<img src="../../../static/img/policy/icon_add.png" style="width:26px;margin-right:2%;" />
							<span>新增被保人</span>
						</div>
					</div>
					<div v-show="showList==2">
						<ul>
							<li :class="holder.check_name!=''?'active':''">
								<p>姓名</p>
								<div>
									<input type="text" v-model="holder.name" v-supportLetterChinese @blur="testName(holder)" maxlength="15" placeholder="请输入姓名" :readonly="holder.memberType == '1'" />
									<img src="../../../static/img/policy/icon_search.png" @click="customerSearch(dict.global_constant.TAG_SEARCH_CUS_APPLICANT)" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="holder.memberType!='1'" @click="cardScanning(dict.global_constant.TAG_SEARCH_CUS_APPLICANT,holder.id)" />
									<img src="../../../static/img/policy/icon_camera.png" v-if="holder.memberType=='1'" />
								</div>
							</li>
							<li class="validText" v-show="holder.check_name!=''">{{holder.check_name}}</li>
							<li>
								<p>出生日期</p>
								<div>
									<date-picker v-if="holder.memberType!='1'" v-model="holder.birthday" :defaultTimeYear="defaultTime" @change="changeInsurantBirth('holeder')" style="width: 85%;"></date-picker>
									<p v-if="holder.memberType=='1'">{{holder.birthday}}</p>
									<i class="fa fa-angle-right"></i>
								</div>
							</li>
							<li class="sex">
								<p>性别</p>
								<SwitchBox v-if="holder.memberType!='1'" :optionList="dict.sexList" v-model="holder.sex"></SwitchBox>
								<SwitchBox v-if="holder.memberType=='1'" :optionList="dict.sexList" v-model="holder.sex" :disabled="false"></SwitchBox>
							</li>
							<li>
								<p>职业</p>
								<div>
									<p class="job" @click="chooseJob(dict.global_constant.TAG_SEARCH_CUS_APPLICANT)">
										<span v-if="holder.desc==''" style="color:#ccc;">请选择</span>
										<span v-if="holder.desc!=''" class="hideText">{{holder.desc}}</span>
										<i class="fa fa-angle-right"></i>
									</p>
									<img src="../../../static/img/policy/icon_microphone.png" @click="speechRec(dict.global_constant.TAG_SEARCH_CUS_APPLICANT)" />
								</div>
							</li>
						</ul>
					</div>
					<div v-show="showList==3" class="products">
						<ul>
							<li>
								<p>主险名称</p>
								<span class="hideText">{{productDef.productName}}</span>
							</li>
							<li v-for="(item,index) in productDef.attList">
								<p>{{item.attName}}</p>
								<SwitchBox v-if="item.attCode != 'amount' && item.attCode != 'premium' && item.attCode != 'piece'" :optionList="item.attValueList" v-model="proposalPlan.insurantProductList[0].productList[0][item.attCode]" @change="chooseMainItem"></SwitchBox>
								<p v-if="item.attCode == 'amount' || item.attCode == 'premium' || item.attCode == 'piece'" style="display: flex;justify-content: space-between;">
									<input v-if="item.attCode != 'piece'" type="text" v-model="proposalPlan.insurantProductList[0].productList[0][item.attCode]" placeholder="请输入金额" @blur="blurFocus()" v-filterAmountOfBillionMoney />
									<span v-if="item.attCode != 'piece'" style="color:#FEB101;">元</span>
									<input v-if="item.attCode == 'piece'" type="text" v-model="proposalPlan.insurantProductList[0].productList[0][item.attCode]" placeholder="请输入份数" @blur="blurFocus()" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" />
									<span v-if="item.attCode == 'piece'" style="color:#FEB101;">份</span>
								</p>
							</li>
							<!--自动续保特殊判断-->
							<li v-if="productDef.autoXubao !=''">
								<p>是否自动续保</p>
								<SwitchBox :optionList="productDef.autoXubao" v-model="proposalPlan.insurantProductList[0].productList[0].isAutoXubao" @change="chooseMainItem"></SwitchBox>
							</li>
							<!--红利领取方式特殊判断-->
							<li v-if="productDef.dividend !=''">
								<p>红利领取方式</p>
								<SwitchBox :optionList="productDef.dividend" v-model="proposalPlan.insurantProductList[0].productList[0].dividend" @change="chooseMainItem"></SwitchBox>
							</li>
							<!--生存金领取方式特殊判断-->
							<li v-if="productDef.survival !=''">
								<p>生存金领取方式</p>
								<SwitchBox :optionList="productDef.survival" v-model="proposalPlan.insurantProductList[0].productList[0].survival" @change="chooseMainItem"></SwitchBox>
							</li>
							<!--设定自动垫交特殊判断-->
							<li v-if="productDef.isCanAutoPay !=''">
								<p>是否设定可自垫</p>
								<SwitchBox :optionList="[{'code':'0','text':'否'},{'code':'1','text':'是'}]" v-model="proposalPlan.insurantProductList[0].productList[0].isCanAutoPay" @change="chooseMainItem"></SwitchBox>
							</li>
							<!--被保人是否有社保-->
							<li v-if="productDef.social !=''">
								<p>被保人是否有社保</p>
								<SwitchBox :optionList="productDef.social" v-model="proposalPlan.insurantProductList[0].productList[0].shebao" @change="chooseMainItem"></SwitchBox>
							</li>
							<!--可选责任-->
							<li v-if="productDef.zerenList !=''" style="padding: 2% 4%;">
								<p>可选责任</p>
								<SwitchMultipleBox :optionList="productDef.zerenList" v-model="proposalPlan.insurantProductList[0].productList[0].zerenList" @change="chooseMainItem"></SwitchMultipleBox>
							</li>
							<li v-if="item.attCode=='amount'" v-for="(item,index) in productDef.attList">
								<p>主险保费</p>
								<p style="display: flex;justify-content: space-between;">
									<span>{{proposalPlan.insurantProductList[0].productList[0].premiumDes}}</span>
									<span style="color:#FEB101;">元</span>
								</p>
							</li>
							<li v-if="item.attCode=='premium'" v-for="(item,index) in productDef.attList">
								<p>保险金额</p>
								<p style="display: flex;justify-content: space-between;">
									<span>{{proposalPlan.insurantProductList[0].productList[0].amount}}</span>
									<span style="color:#FEB101;">元</span>
								</p>
							</li>
						</ul>
						<!--可选计划-->
						<ul class="extras">
							<li style="display: flex;justify-content:space-between;">
								<p>可选计划</p>
								<picker v-if="productDef.extraList!=null" v-model="extraProductCode" :items="productDef.extraList" code="productCode" text="productName" @change="chooseExtra(0)" default-text="请选择附加险"></picker>
							</li>
						</ul>
						<!--可选计划列表-->
						<div v-show="extraproductDef.length>0" style="width: 100%;padding: 7% 5% 7%;box-sizing: border-box;">
							<div class="kexuanList">
								<p class="title">可选计划列表</p>
								<div class="content" v-for="(item,index) in extraproductDef">
									<div>
										<p @click="chooseExtraList(item.productCode,item.insurantNo)">{{index + 1}} . {{item.productName}}</p>
										<p v-show="otherInsurantList.length>0">第{{item.insurantNo|getInsNo}}被保人 &nbsp;&nbsp; {{item.insurantName}}</p>
										<p v-show="otherInsurantList.length==0">被保人 &nbsp;&nbsp; {{item.insurantName}}</p>
									</div>
									<i class="fa fa-trash-o" aria-hidden="true" :disabled="item.productCode == productDef.bindCode" @click="deleteExtra(item)" :class="[item.productCode == productDef.bindCode?'gray':'']"></i>
								</div>
							</div>
						</div>
						<div class="split-border" v-if="extraproductDef.length>0">
						</div>
						<!--条款-->
						<div style="font-size: 14px;color: #FDB92C;padding: 0 4%;margin-top: 3%;">
							<p class="tiaokuan-item" @click="tkStatus()">《{{productDef.productName}}产品条款》</p>
							<p class="tiaokuan-item" v-for="(item,index) in extraproductDef" @click="tkStatus(item)">《{{item.productName}}产品条款》</p>
						</div>
						<div style="height:70px;"></div>
					</div>
				</div>
			</div>
			<FooterBar v-show="showList!=3">
				<div slot="center" v-preventReClick="1000" @click.prevent="stepSave($event)">下一步</div>
			</FooterBar>
			<FooterBars v-show="showList==3" :premium="totalPremium">
				<div slot="right" v-preventReClick="1000" @click.prevent="stepSave($event)">立即投保</div>
			</FooterBars>
			<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
		</div>
		<!--附加险弹框-->
		<mt-popup v-model="toggle.extraEdit" position="center" class="additional_extraEditList">
			<Headerbtns title="已选附加险">
				<div slot="left">
					<i class="fa fa-angle-left" @click="cancelExtra"></i>
				</div>
				<div slot="right">
					<i class="fa fa-angle-left" aria-hidden="true" style="color: transparent;"></i>
				</div>
			</Headerbtns>
			<div class="eject-contents">
				<ul>
					<li v-if="extra.productCode!='HDT042' && extra.productCode!='HDT044' && extra.productCode!='HCT021' && otherInsurantList.length > 0">
						<p>选择被保人</p>
						<label v-show="extraFrom == 0">
							<picker v-model="insurantNo" :values="insurantNo" :items="insurantItem" code="code" text="text"></picker>
							<i class="fa fa-angle-right"></i>
						</label>
						<span v-show="extraFrom == 1" style="color: #333;">{{insurantText}}</span>
					</li>
					<li v-for="(item,index) in extra.attList">
						<p>{{item.attName}}</p>
						<SwitchBox v-if="item.attCode != 'amount' && item.attCode != 'premium' && item.attCode != 'piece'" :optionList="item.attValueList" v-model="extraEdit[item.attCode]" @change="chooseExtraItem(item)"></SwitchBox>
						<input type="text" v-if="item.attCode == 'amount' || item.attCode == 'premium'" v-model="extraEdit[item.attCode]" @keyup="handleKeyup($event)" />
						<input type="text" v-if="item.attCode == 'piece'" v-model="extraEdit[item.attCode]" onkeyup="value=value.replace(/[^\d]/g,'')" />
					</li>
					<li v-if="extra.productDefine !=undefined && extra.productDefine.social !=''">
						<p>被保人是否有社保</p>
						<SwitchBox :optionList="extra.productDefine.social" v-model="extraEdit.shebao"></SwitchBox>
					</li>
					<li v-if="extra.productDefine !=undefined && extra.productDefine.autoXubao !=''">
						<p>是否自动续保</p>
						<SwitchBox :optionList="extra.productDefine.autoXubao" v-model="extraEdit.autoXubao"></SwitchBox>
					</li>
					<li v-if="extra.productDefine !=undefined && extra.productDefine.zeren5 !=''" style="padding: 2% 4%;">
						<p>可选责任</p>
						<SwitchMultipleBox :optionList="extra.productDefine.zeren5" v-model="extraEdit.zerenListOld"></SwitchMultipleBox>
					</li>
				</ul>
				<!--增利宝追加保费-->
				<ul v-if="extra.productCode == 'NPU012' || extra.productCode == 'NPU015'" v-for="(item,index) in addList">
					<li>
						<p>追加保费起始年限</p>
						<input type="text" v-supportNumber v-model="item.addBegin" placeholder="起始年限" v-if="addList.length == 1" maxlength="2" />
						<div v-if="addList.length>1">
							<input type="text" v-supportNumber v-model="item.addBegin" placeholder="起始年限" maxlength="2" />
							<i class="fa fa-times" @click="removEextra(index)"></i>
						</div>
					</li>
					<li>
						<p>追加保费截止年限</p>
						<input type="text" v-supportNumber v-model="item.addEnd" placeholder="截止年限" maxlength="2" />
					</li>
					<li class="border_bottom">
						<p>追加保费</p>
						<input type="text" v-supportNumber v-model="item.addPre" placeholder="输入金额" maxlength="10" />
					</li>
				</ul>
				<ul v-if="extra.productCode == 'NPU012'|| extra.productCode == 'NPU015'">
					<li class="border_none" @click="addExtraList">添加追加保费</li>
				</ul>
				<!--增利宝部分领取-->
				<ul v-if="extra.productCode == 'NPU012'|| extra.productCode == 'NPU015'" v-for="(item,index) in drawList">
					<li class="border_top">
						<p>领取起始年限</p>
						<input type="text" v-supportNumber v-model="item.drawBegin" placeholder="起始年限" v-if="drawList.length == 1" maxlength="2" />
						<div v-if="drawList.length>1">
							<input type="text" v-supportNumber v-model="item.drawBegin" placeholder="起始年限" maxlength="2" />
							<i class="fa fa-times" @click="removdrawList(index)"></i>
						</div>
					</li>
					<li>
						<p>领取截止年限</p>
						<input type="text" v-supportNumber v-model="item.drawEnd" placeholder="截止年限" maxlength="2" />
					</li>
					<li class="border_bottom">
						<p style="line-height: 2;">当年度部分领取金额</p>
						<input type="text" v-supportNumber v-model="item.drawPre" placeholder="输入金额" maxlength="10" />
					</li>
				</ul>
				<ul v-if="extra.productCode == 'NPU012'|| extra.productCode == 'NPU015'">
					<li class="border_none" @click="adddrawList">添加部分领取</li>
				</ul>
				<div class="btn">
					<p @click="cancelExtra">关闭</p>
					<p @click="saveExtra">确定</p>
				</div>
			</div>
		</mt-popup>
		<!--条款弹框-->
		<mt-popup v-model="toggle.tkStatu" position="right" style="background: #FFF1D4;">
			<div v-for="(item,index) in tkStatuList">
				<img @click="toggle.tkStatu = !toggle.tkStatu" :src="item.fileurl" style="display: block;width: 100%;">
			</div>
		</mt-popup>
		<prompt ref="btn" @detonate="relationEdit"></prompt>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	import { Actionsheet } from 'mint-ui'
	import Headerbtns from '../policy/common/Header.vue'
	import FooterBar from '../policy/common/FooterBar.vue'
	import FooterBars from '../policy/common/FooterBars.vue'
	import SwitchBox from '../policy/common/SwitchSingleBox.vue'
	import SwitchMultipleBox from '../policy/common/SwitchMultipleBox.vue'
	import NavigationBox from '../policy/common/NavigationBox.vue'
	import picker from '../common/Picker.vue'
	import datePicker from '../common/DatePicker.vue'
	import CustomerSearch from '../common/CustomerSearch.vue'
	import IDCardScanning from '../common/IDCardScanning.vue'
	import Search from '../common/OccupationSearch.vue'
	import prompt from '../policy/common/prompt.vue'
	import global_constant from '../../assets/data/global_constant.json'
	import relationBenefitList from '../../../static/dict/relation_benefit.json'
	import '../policy/css/base.css'
	import '../policy/css/process.css'
	export default {
		name: 'policy_list',
		components: {
			Actionsheet,
			Headerbtns,
			FooterBar,
			FooterBars,
			SwitchBox,
			SwitchMultipleBox,
			NavigationBox,
			picker,
			datePicker,
			CustomerSearch,
			IDCardScanning,
			Search,
			prompt
		},
		data() {
			return {
				loadData: false,
				proposalPlans: {},
				isHaveZero: '',
				showNavList: false,
				navigationListHasData:false,
				navigationList: [],
				payInfo: {},
				base_list_st: [{
					step: '1',
					name: 'product_details_page',
					path: 'lv',
					content: '基本信息',
					seqNumber: '',
					saveFlag: '1'
				}, {
					step: '3',
					name: 'customer_details_page',
					path: '',
					content: '投保人信息',
					seqNumber: '',
					saveFlag: '1'
				}],
				base_ins: [{
					step: '4',
					name: 'custDetails',
					path: '',
					content: '被保人信息',
					seqNumber: '-1',
					saveFlag: '1'
				}],
				base_list_la: [{
					step: '5',
					name: 'productsPage',
					path: '',
					content: '险种确认',
					seqNumber: '',
					saveFlag: '1'
				}, {
					step: '6',
					name: 'inform_page',
					path: '',
					content: '健康告知',
					seqNumber: '',
					saveFlag: '1'
				}, {
					step: '7',
					name: 'salesman_report_page',
					path: '',
					content: '业务人员报告书',
					seqNumber: '',
					saveFlag: '1'
				}, {
					step: '8',
					name: 'electronics_policy_page',
					path: '',
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
				}],
				nextPageQues: '',
				showList: 1,
				defaultTime: '30',
				customerValue: {
					isopen: false,
					type: '',
					index: '',
					cusItem: {}
				},
				cardScanningValue: {
					isopen: false,
					type: '',
					id: '',
					index: '',
					cusItem: {}
				},
				occupationValue: {
					isopen: false,
					type: '',
					index: '',
					occItem: '',
					speechRecVal: ''
				},
				dict: {
					global_constant: global_constant.constant,
					relationBenefitList: relationBenefitList.relation.item,
					sexList: [{
							code: '1',
							text: '男'
						},
						{
							code: '2',
							text: '女'
						},
					],
				},
				toggle: {
					extraEdit: false,
					tkStatu: false
				},
				tkStatuList: [],
				sheetVisible: false,
				actions: [{              
					name: "返回首页",
					method: this.backHome
				}],
				LoginWidth: window.screen.width,
				planId: this.$route.params.planId,
				productCode: utils.cache.get('productCodeDetail'),
				insurantItem: [{
					'code': '-1',
					'text': '' //第{{}}被保人-name
				}],
				insurantNo: '',
				insurantText: '',
				productDef: {},
				tempProductDefList: "",
				extraproductDef: [],
				extraProductCode: '', //当前选中附加险
				extraFrom: 0, //0-新增 1-更改
				extra: {}, //产品定义当前附加险
				extraEdit: {}, //附加险选项
				extraMap: {}, //所有可选附加险-对比用?
				totalPremium: '', //首期保险费合计（小写）/左下角显示金额
				totalAmount: '',
				reasonList: '',
				addList: [{
					addBegin: 1,
					addEnd: 1,
					addPre: 10,
					code: 0,
					userDefine1: "add"
				}],
				drawList: [{
					code: 0,
					drawBegin: "",
					drawEnd: "",
					drawPre: "",
					userDefine1: "draw"
				}],
				holder: {
					name: "",
					birthday: "",
					sex: "1",
					desc: "",
					level: "",
					profession: "",
					idType: "",
					idNo: "",
					idExpDate: "",
					check_name: '',
					check_birthday: '',
					check_sex: '',
					check_desc: '',
				},
				insurant: {
					relationNew: "00",
					relToAppDesc: "本人",
					name: "",
					birthday: "",
					sex: "1",
					desc: "",
					level: "",
					profession: "",
					idType: "",
					idNo: "",
					idExpDate: "",
					seqNumber: '-1',
					check_relationNew: '',
					check_name: '',
					check_birthday: '',
					check_sex: '',
					check_desc: '',
				},
				otherInsurantList: [],
				proposalPlan: {
					insurantProductList: [{
						productList: [{
							"annuity": '',
							"survival": utils.cache.get('productCode') == "NEP001" ? "1" : "", //生存金
							"productCode": '',
							"dividend": "",
							'isAutoXubao': "",
							"productName": '',
							"payMode": "",
							"drawFreq": "", //养老金领取频率
							"isCanAutoPay": '', //自垫 0-否 1-是
							"drawAge": "",
							"payModeName": "", //缴费方式
							"payPeriod": "",
							"payPeriodName": "", //交费期间
							"policyPeriod": "",
							"policyPeriodName": "",
							"amount": utils.cache.get('productCode') ? utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.product[utils.cache.get('productCode')].amount : '',
							"premium": "",
							"premiumDes": '',
							"premPrm": "10.00",
							"premYearStart": "",
							"premYearEnd": "",
							"rank": "",
							"piece": utils.cache.get('productCode') ? utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.product[utils.cache.get('productCode')].piece : '',
							"shebao": "",
							"zeRen1": "",
							"zeRen2": "",
							"zeRen3": "",
							"zeRen4": "",
							"zeRen5": "",
							"zerenList": [],
							"zeRenPremStr": "",
							"extraList": []
						}]
					}]
				}
			}
		},
		beforeDestroy() {
			utils.cache.removeItem('attlist')
		},
		mounted() {
			if(this.$route.params.step != '') {
				this.showList = this.$route.params.step
			}
			//add spoon 读取缓存中的配置文件
			let CONFIG_proposalPlan = utils.cache.get('CONFIG_proposalPlan')
			if(CONFIG_proposalPlan == null || CONFIG_proposalPlan == '') {
				//缓存不存在请求服务器获取配置文件
				utils.n22_http.getConfig(0, (data) => {
					this.proposalPlans = data
				})
			} else {
				//正常将缓存中的数据复制到相应节点
				this.proposalPlans = CONFIG_proposalPlan
			}
			//年交保费
			if(this.productCode != undefined && this.productCode != "") {
				let premium = utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.product[this.productCode].premium
				if(premium != undefined && premium != "") {
					this.proposalPlan.insurantProductList[0].productList[0].premium = premium
				} else if(this.productCode == 'NPT012') {
					this.proposalPlan.insurantProductList[0].productList[0].premium = '2000.00'
				} else {
					this.proposalPlan.insurantProductList[0].productList[0].premium = '10000.00'
				}
			}
			if(this.planId == "new") {
				let requ = {
					"policy": {
						substepNo: "getOrderId"
					}
				}
				utils.http.postFast('MODISTRIESAVE', requ, (body) => {
					this.planId = body.policy.orderId
					utils.cache.set('orderCode', this.planId)
				})
				this.getProductDef(this.productCode)
			} else {
				let requ = {
					"policy": {
						"substepNo": "1",
						"orderCode": this.planId,
						"stepNo": '0,1,2',
						"nothave": '1,3'
					}
				}
				utils.http.postFast('MOHQPOLICYMSG', requ, (body) => {
					if(body.policy.navigationList.length > 0) {
						this.navigationList = JSON.parse(JSON.stringify(body.policy.navigationList))
						this.payInfo = JSON.parse(JSON.stringify(body.policy.payInfo))
						this.base_list_st = []
						this.base_ins = []
						this.navigationList.forEach(item => {
							item.path = ''
							if(item.step == '1') {
								item.path = 'lv'
							}
							if(item.step <= '3') {
								this.base_list_st.push(item)
							}
							if(item.step == '4') {
								this.base_ins.push(item)
							}
						})
						this.navigationListHasData = true
					}
					let proposalPlan = JSON.parse(JSON.stringify(body.policy.proposalPlan))
					this.holder = proposalPlan.holder
					this.removeShowText(this.holder)
					this.insurant = proposalPlan.insurantProductList[0].insurant
					this.removeShowText(this.insurant)
					this.otherInsurantList = proposalPlan.insurantProductList[0].otherInsurantList
					this.proposalPlan.insurantProductList[0].productList = proposalPlan.insurantProductList[0].productList
					delete this.proposalPlan.insurantProductList[0].productList[0].zeRen5
					if(this.proposalPlan.insurantProductList[0].productList[0].zerenList.length > 0) {
						let zerenList = []
						this.proposalPlan.insurantProductList[0].productList[0].zerenList.forEach(item => {
							if(item.choose == '0') {
								zerenList.push(item.code)
							}
						})
						this.proposalPlan.insurantProductList[0].productList[0].zerenList = zerenList
					}
					let extraproductDef = []
					if(this.proposalPlan.insurantProductList[0].productList[0].extraList.length > 0) {
						for(let item of this.proposalPlan.insurantProductList[0].productList[0].extraList) {
							let extraproduct = {
								productCode: item.productCode,
								productName: item.productName,
								extra: item,
								insurantNo: '-1',
								insurantName: this.insurant.name
							}
							extraproductDef.push(extraproduct)
						}
					}
					if(this.otherInsurantList.length > 0) {
						for(let i in this.otherInsurantList) {
							this.removeShowText(this.otherInsurantList[i].insurant)
							for(let item of this.otherInsurantList[i].extraList) {
								let extraproduct = {
									productCode: item.productCode,
									productName: item.productName,
									extra: item,
									insurantNo: i,
									insurantName: this.otherInsurantList[i].insurant.name
								}
								extraproductDef.push(extraproduct)
							}
						}
					}
					if(extraproductDef.length > 0) {
						for(let i = 0; i < extraproductDef.length; i++) {
							delete extraproductDef[i].extra.zeren5
							if(extraproductDef[i].extra.zerenList.length > 0) {
								extraproductDef[i].extra.zerenListOld = []
								extraproductDef[i].extra.zerenList.forEach(tpl => {
									if(tpl.choose == '0') {
										extraproductDef[i].extra.zerenListOld.push(tpl.code)
									}
								})
							}
						}
					}
					this.extraproductDef = extraproductDef
					this.getProductDef(this.proposalPlan.insurantProductList[0].productList[0].productCode)
					let insurantItem = []
					insurantItem.push({
						code: '-1',
						text: this.insurant.name
					})
					for(let i in this.otherInsurantList) {
						insurantItem.push({
							code: i,
							text: this.otherInsurantList[i].insurant.name
						})
					}
					this.insurantItem = insurantItem
					if(this.showList == 3) {
						if(this.insurant.relationNew == '00') {
							this.isHaveZero = '-1'
						}
						if(this.isHaveZero == '' && this.otherInsurantList.length > 0) {
							this.otherInsurantList.forEach((item, index) => {
								if(item.insurant.relationNew == '00') {
									this.isHaveZero = index
								}
							})
						}
						//console.log('isHaveZero', this.isHaveZero, this.isHaveZero === '')
					}
				})
			}
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
						if(this.customerValue.type == 'TAG_SEARCH_CUS_APPLICANT') {
							utils.common.customerConvertInTrial(this.holder, this.customerValue.cusItem.data.appntMsg)
							this.holder.payInfo = {}
							utils.common.payInfoConvertInPlan(this.holder.payInfo, this.customerValue.cusItem.data.payInfo)
						} else if(this.customerValue.type == 'TAG_SEARCH_CUS_INSURE') {
							if(this.customerValue.index == undefined) {
								utils.common.customerConvertInTrial(this.insurant, this.customerValue.cusItem.data.appntMsg)
								if(this.customerValue.cusItem.data.payInfo.bankAccNo != '' || this.customerValue.cusItem.data.payInfo.bankCode != '') {
									this.insurant.payInfo = {}
									utils.common.payInfoConvertInPlan(this.insurant.payInfo, this.customerValue.cusItem.data.payInfo)
								}
							} else {
								utils.common.customerConvertInTrial(this.otherInsurantList[this.customerValue.index].insurant, this.customerValue.cusItem.data.appntMsg)
								if(this.customerValue.cusItem.data.payInfo.bankAccNo != '' || this.customerValue.cusItem.data.payInfo.bankCode != '') {
									this.otherInsurantList[this.customerValue.index].insurant.payInfo = {}
									utils.common.payInfoConvertInPlan(this.otherInsurantList[this.customerValue.index].insurant.payInfo, this.customerValue.cusItem.data.payInfo)
								}
							}
						}
					} else if(this.customerValue.cusItem != undefined && this.customerValue.cusItem.customerName != undefined) {
						if(this.customerValue.type == 'TAG_SEARCH_CUS_APPLICANT') {
							this.changeCust(this.holder, this.customerValue)
						} else if(this.customerValue.type == 'TAG_SEARCH_CUS_INSURE') {
							if(this.customerValue.index == undefined) {
								this.changeCust(this.insurant, this.customerValue)
							} else {
								this.changeCust(this.otherInsurantList[this.customerValue.index].insurant, this.customerValue)
							}
						}
					}
				}
			},
			cardScannIsOpen(val, oldval) {
				if(!val) {
					if(this.cardScanningValue.cusItem != undefined && this.cardScanningValue.cusItem.name != undefined) {
						if(this.cardScanningValue.type == 'TAG_SEARCH_CUS_APPLICANT') {
							utils.common.cardScanningValueChange(1, this.holder, this.cardScanningValue)
						} else if(this.cardScanningValue.type == 'TAG_SEARCH_CUS_INSURE') {
							if(this.cardScanningValue.index == '-1') {
								utils.common.cardScanningValueChange(1, this.insurant, this.cardScanningValue)
							} else {
								utils.common.cardScanningValueChange(1, this.otherInsurantList[this.cardScanningValue.index].insurant, this.cardScanningValue)
							}
						}
					}
				}
			},
			occupationIsOpen(val, oldval) {
				if(!val) {
					if(this.occupationValue.occItem != undefined) {
						if(this.occupationValue.type == 'TAG_SEARCH_CUS_APPLICANT') {
							utils.common.occupationValueChange(1, this.holder, this.occupationValue)
						} else if(this.occupationValue.type == 'TAG_SEARCH_CUS_INSURE') {
							if(this.occupationValue.index == undefined) {
								utils.common.occupationValueChange(1, this.insurant, this.occupationValue)
							} else {
								utils.common.occupationValueChange(1, this.otherInsurantList[this.occupationValue.index].insurant, this.occupationValue)
							}
						}
					}
					this.occupationValue.speechRecVal = ''
				}
			},
			'insurant': {
				handler(val) {
					if(utils.valid.getAge(val.birthday) <= '6') {
						val.desc = "学龄前儿童"
						val.level = "1"
						val.profession = "1001007"
					} else if(val.desc == "学龄前儿童") {
						val.desc = ""
						val.level = ""
						val.profession = ""
					}
				},
				deep: true
			},
			'otherInsurantList': {
				handler(val) {
					if(val.length > 0) {
						let insList = [{
							step: '4',
							name: 'custDetails',
							path: '',
							content: '第一被保人信息',
							seqNumber: '-1',
							saveFlag: '1'
						}]
						let obj = {}
						for(let i in val) {
							obj = {
								step: '4',
								name: 'custDetails',
								path: '',
								content: this.getInsShow(i),
								seqNumber: i,
								saveFlag: '1'
							}
							val[i].insurant.seqNumber = i
							if(utils.valid.getAge(val[i].insurant.birthday) <= '6') {
								val[i].insurant.desc = "学龄前儿童"
								val[i].insurant.level = "1"
								val[i].insurant.profession = "1001007"
							} else if(val[i].insurant.desc == "学龄前儿童") {
								val[i].insurant.desc = ""
								val[i].insurant.level = ""
								val[i].insurant.profession = ""
							}
							insList.push(obj)
						}
						this.navigationList = this.base_list_st.concat(insList, this.base_list_la)
					} else {
						let insList = [{
							step: '4',
							name: 'custDetails',
							path: '',
							content: '被保人信息',
							seqNumber: '-1',
							saveFlag: '1'
						}]
						this.navigationList = this.base_list_st.concat(insList, this.base_list_la)
					}
				},
				deep: true
			},
			'proposalPlan.insurantProductList': {
				handler(val) {
					if(this.proposalPlan.insurantProductList[0].productList[0].attList != undefined) {
						for(let att of this.proposalPlan.insurantProductList[0].productList[0].attList) {
							att.attValue = this.proposalPlan.insurantProductList[0].productList[0][att.attCode]
							for(let i = 0; i < att.attValueList.length; i++) {
								if(att.attValue == att.attValueList[i].code) {
									this.proposalPlan.insurantProductList[0].productList[0][att.attCode + 'Name'] = att.attValueList[i].text
								}
							}
						}
					}
				},
				deep: true
			},
			rankMethod(val) {
				if(this.productCode == 'HMT049') {
					if(this.productDef.zerenList != undefined) {
						if(val == 'rank_1' || val == 'rank_2') {
							console.log('==========', this.productDef.zerenList)
							this.productDef.zerenList.forEach((item, index) => {
								if(item.code == '2') {
									this.productDef.zerenList.splice(index, 1)
								}
							})
						} else {
							if(this.productDef.zerenList.length == 2) {
								this.productDef.zerenList.push({
									choose: "1",
									code: "2",
									text: "特需医疗费用保险金"
								})
							}
						}
					}
				}
			},
			paymentMethod(v1) {
				if(v1 == 'single') {
					if(this.proposalPlan.insurantProductList[0].productList[0].payPeriod != 'single') {
						this.productDef.attList.forEach(item => {
							if(item.attCode == 'payPeriod') {
								item.attValueList.forEach(val => {
									if(val.code == 'single') {
										this.proposalPlan.insurantProductList[0].productList[0].payPeriod = val.code
										this.proposalPlan.insurantProductList[0].productList[0].payPeriodName = val.text
									}
								})
							}
						})
					}
				} else if(v1 == 'year') {
					if(this.proposalPlan.insurantProductList[0].productList[0].payPeriod == 'single') {
						this.productDef.attList.forEach(item => {
							if(item.attCode == 'payPeriod') {
								item.attValueList.forEach(val => {
									if(val.code.indexOf('term_') > -1 && this.proposalPlan.insurantProductList[0].productList[0].payPeriod == 'single') {
										this.proposalPlan.insurantProductList[0].productList[0].payPeriod = val.code
										this.proposalPlan.insurantProductList[0].productList[0].payPeriodName = val.text
									}
								})
							}
						})
					}
				}
				this.baofeiTest()
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
				if(this.customerValue.isopen || this.cardScanningValue.isopen || this.occupationValue.isopen) {
					return false
				} else {
					return true
				}
			},
			rankMethod() {
				return this.proposalPlan.insurantProductList[0].productList[0].rank
			},
			paymentMethod() {
				return this.proposalPlan.insurantProductList[0].productList[0].payMode
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
			filterAttNJBXF(code, productCode) {
				if(productCode == 'NPT012' && code == '年交保险费') {
					return '保险金'
				} else {
					return code
				}
			}
		},
		methods: {
			handleKeyup(e) {
				let _input = e.target
				if(!_input.value) { //此处需获取input标签
					return false;
				}
				if(_input.value == undefined) { //此处需获取input标签
					return false;
				}
				//禁止录入整数部分两位以上，但首位为0
				let value = _input.value.replace(/^([1-9]\d*(\.[\d]{0,2})?|0(\.[\d]{0,2})?)[\d.]*/g, '$1');
				//禁止录入整数部分超过6位
				value = value.replace(/^([1-9]\d{8})\d*/g, '$1');
				//替换除了数字和.以外的字符
				value = value.replace(/[^\d\.]/g, '');
				//第一个输入.  则自动变为0.
				value = value.replace(/^\./g, '');
				//保证.只出现一次，而不能出现两次以上 2..    2.2.2
				value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
				//只能输入两个小数
				value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
				if(_input.value != value) {
					let pos = this.getPosition(_input)
					_input.value = value
					this.setPosition(_input, pos - 1)
					e.target.value = _input.value
				}
			},
			getPosition(ele) {
				let cursorPos = 0
				if(document.selection) { // IE
					const selectRange = document.selection.createRange()
					selectRange.moveStart('character', -ele.value.length)
					cursorPos = selectRange.text.length
				} else if(ele.selectionStart || ele.selectionStart === '0') {
					cursorPos = ele.selectionStart
				}
				return cursorPos
			},
			setPosition(ele, pos) {
				if(ele.setSelectionRange) {
					ele.focus()
					/* 选中输入框指定位置文本
					 * selectionStart 起始位置
					 * selectionEnd 终点位置
					 * */
					ele.setSelectionRange(pos, pos)
				} else if(ele.createTextRange) { // IE
					let range = ele.createTextRange()
					range.collapse(true)
					range.moveEnd('character', pos)
					range.moveStart('character', pos)
					range.select()
				}
			},
			getInsShow(code) {
				if(code == '-1') {
					return '第一被保人信息'
				} else if(code == '0') {
					return '第二被保人信息'
				} else if(code == '1') {
					return '第三被保人信息'
				} else if(code == '2') {
					return '第四被保人信息'
				} else if(code == '3') {
					return '第五被保人信息'
				} else if(code == '4') {
					return '第六被保人信息'
				}
			},
			checkNavChangeInfo() {
				//1
				let result = this.testBaseInfo('ins', this.insurant)
				if(this.otherInsurantList.length > 0) {
					let results = []
					for(let i in this.otherInsurantList) {
						results = this.testBaseInfo('ins', this.otherInsurantList[i].insurant)
					}
					result = result.concat(results)
				}
				if(this.otherInsurantList.length > 0 && this.otherInsurantList.length < 2) {
					result.push('家庭单最少3人，最多5人，请确认!')
				}
				if(result.length > 0) {
					return result
				}
				//2
				this.isHaveZero = ''
				if(this.insurant.relationNew == '00') {
					this.changeZero(this.holder, this.insurant)
					this.isHaveZero = '-1'
				}
				if(this.isHaveZero == '' && this.otherInsurantList.length > 0) {
					this.otherInsurantList.forEach((item, index) => {
						if(item.insurant.relationNew == '00') {
							this.changeZero(this.holder, item.insurant)
							this.isHaveZero = index
						}
					})
				}
				//console.log('isHaveZero', this.isHaveZero, this.isHaveZero === '')
				if(this.isHaveZero !== '') {
					//console.log('存在本人关系==>')
					let result = this.testBaseInfo('appnt', this.holder)
					if(result.length > 0) {
						return result
					}
				}
				//3
				result = this.testBaseInfo('appnt', this.holder)
				if(result.length > 0) {
					return result
				}
				//4
				result = this.testInsurantProducts()
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
					let requ = this.changeSave()
					utils.http.postFast("MODISTRIESAVE", requ, body => {
						if(body.policy.resultCode == '0') {
							let step = utils.cache.get('step_' + this.$route.params.planId)
							if(step > 5) {
								step = 5
							}
							console.log(step)
							console.log(item.step)
							if(item.step <= step) {
								if(item.step == 1 || item.step == 3) {
									this.$router.push({
										name: item.name,
										params: {
											planId: this.$route.params.planId,
											step: '1'
										}
									})
								} else if(item.step == 2) {
									this.$router.push({
										name: item.name,
										params: {
											planId: this.$route.params.planId
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
				if(index == 2 && this.isHaveZero != '') {
					//this.showToast('存在本人关系-当前页不可点')
				} else if(index > this.showList) {
					//this.showToast('请填写当前页后点击下一步继续')
				} else {
					this.showList = index
				}
			},
			stepSave() {
				if(this.showList == 1) {
					let result = this.testBaseInfo('ins', this.insurant)
					if(this.otherInsurantList.length > 0) {
						let results = []
						for(let i in this.otherInsurantList) {
							results = this.testBaseInfo('ins', this.otherInsurantList[i].insurant)
						}
						result = result.concat(results)
					}
					if(this.otherInsurantList.length > 0 && this.otherInsurantList.length < 2) {
						result.push('家庭单最少3人，最多5人，请确认!')
					}
					if(result.length > 0) {
						this.showAlert(result)
					} else {
						this.isHaveZero = ''
						if(this.insurant.relationNew == '00') {
							this.changeZero(this.holder, this.insurant)
							this.isHaveZero = '-1'
						}
						if(this.isHaveZero == '' && this.otherInsurantList.length > 0) {
							this.otherInsurantList.forEach((item, index) => {
								if(item.insurant.relationNew == '00') {
									this.changeZero(this.holder, item.insurant)
									this.isHaveZero = index
								}
							})
						}
						//console.log('isHaveZero', this.isHaveZero, this.isHaveZero === '')
						if(this.isHaveZero !== '') {
							//console.log('存在本人关系==>')
							let result = this.testBaseInfo('appnt', this.holder)
							if(result.length > 0) {
								this.showAlert(result)
							} else {
								this.stepSaveNext()
							}
						} else {
							//console.log('不存在本人关系==>')
							this.stepSaveNext()
						}
					}
				} else if(this.showList == 2) {
					let result = this.testBaseInfo('appnt', this.holder)
					if(result.length > 0) {
						this.showAlert(result)
					} else {
						this.stepSaveNext()
					}
				} else {
					let result = this.testInsurantProducts()
					if(result.length > 0) {
						this.showAlert(result)
					} else {
						this.baofeiTest(() => {
							if(this.reasonList != '') {
								alert_n22.alertRules("提示", this.reasonList, "确定")
							} else {
								let requ = this.changeSave()
								console.log('立即投保-保单信息-> ',requ)
								let age = utils.valid.getAge(requ.policy.custInfo.appnt.appntBirthday)
								if(age >= 60 || age < 18) {
									alert_n22.alert("提示", "投保人年龄必须位于18~59周岁!", "确定")
									return
								}
								utils.http.postFast('MODISTRIESAVE', requ, (body) => {
									if(body.policy.resultCode == "0") {
										let page = ''
										this.navigationList.forEach(item => {
											if(item.step == '2') {
												page = item.name
											}
										})
										if(page != '') {
											this.$router.push({
												name: page,
												params: {
													planId: this.planId
												}
											})
										} else {
											this.$router.push({
												name: "customer_details_page",
												params: {
													planId: this.planId,
													step: '1'
												}
											})
										}
									} else {
										alert_n22.alert('提示', body.policy.resultMessage)
									}
								})
							}
						})
					}
				}
			},
			stepSaveNext() {
				let appnt = {}
				utils.common.customerConvertInPlanToPolicy("APP", appnt, this.holder)
				let firstInsurant = {}
				utils.common.customerConvertInPlanToPolicy("INS", firstInsurant, this.insurant)
				let otherInsurant = []
				if(this.otherInsurantList.length > 0) {
					let otherInsurantList = JSON.parse(JSON.stringify(this.otherInsurantList))
					for(let i = 0; i < otherInsurantList.length; i++) {
						let otherInsurant_info = {}
						utils.common.customerConvertInPlanToPolicy("INS", otherInsurant_info, otherInsurantList[i].insurant)
						otherInsurant.push(otherInsurant_info)
					}
				}
				let requ = {
					"policy": {
						"agentInfo": {
							"agentCode": utils.cache.get('personsal').agentCode,
							"branchtype": utils.cache.get('personsal').channel,
						},
						"deviceNo": "",
						"substepNo": "1",
						"orderCode": this.planId,
						"custInfo": {
							"appnt": appnt,
							"insurants": {
								"firstInsurant": firstInsurant,
								"otherInsurant": {
									"insCount": otherInsurant.length.toString(),
									"insurant": otherInsurant
								}
							}
						},
						"navigationList": this.navigationList,
						"payInfo": this.payInfo
					}
				}
				utils.http.postFast('MODISTRIESAVE', requ, (body) => {
					if(body.policy.resultCode == "0") {
						this.stepSaveNextTwo()
						this.baofeiTest()
						if(this.isHaveZero === '') {
							this.showList++
						} else {
							//this.baofeiTest()
							this.showList = 3
						}
					} else {
						alert_n22.alert('提示', body.policy.resultMessage)
					}
				})
			},
			stepSaveNextTwo() {
				let insurantItem = []
				insurantItem.push({
					code: '-1',
					text: this.insurant.name
				})
				for(let i in this.otherInsurantList) {
					insurantItem.push({
						code: i,
						text: this.otherInsurantList[i].insurant.name
					})
				}
				this.insurantItem = insurantItem
				if(this.extraproductDef.length > 0) {
					for(let i in this.extraproductDef) {
						for(let j in this.insurantItem) {
							if(this.extraproductDef[i].insurantNo == this.insurantItem[j].code) {
								this.extraproductDef[i].insurantName = this.insurantItem[j].text
							}
						}
					}
				}
				if(this.tempProductDefList.productCode == "NET004") {
					let attList = this.tempProductDefList.attList
					if(attList != undefined && attList.length > 0) {
						for(let item of attList) {
							if(item.attCode == "drawAge") {
								if(this.insurant.sex == '1') {
									let tempAttValueList = []
									tempAttValueList.push({
										className: "ProductAttributeItem",
										code: "60",
										text: "60岁领取"
									})
									tempAttValueList.push({
										className: "ProductAttributeItem",
										code: "65",
										text: "65岁领取"
									})
									item.attValueList = tempAttValueList
								} else {
									let tempAttValueList = []
									tempAttValueList.push({
										className: "ProductAttributeItem",
										code: "55",
										text: "55岁领取"
									})
									tempAttValueList.push({
										className: "ProductAttributeItem",
										code: "60",
										text: "60岁领取"
									})
									tempAttValueList.push({
										className: "ProductAttributeItem",
										code: "65",
										text: "65岁领取"
									})
									item.attValueList = tempAttValueList
								}
							}
						}
					}
					for(let i = 0; i < this.proposalPlan.insurantProductList[0].productList[0].attList.length; i++) {
						if(this.proposalPlan.insurantProductList[0].productList[0].attList[i].attCode == 'drawAge') {
							if(this.proposalPlan.insurantProductList[0].productList[0].attList[i].attValue == '55' && this.proposalPlan.insurantProductList[0].productList[0].attList[i].attValueList.length == 2) {
								this.$nextTick(() => {
									this.proposalPlan.insurantProductList[0].productList[0].attList[i].attValue = '60'
									this.proposalPlan.insurantProductList[0].productList[0].drawAge = '60'
									this.proposalPlan.insurantProductList[0].productList[0].drawAgeName = '60岁领取'
								})
							}
						}
					}
				}
			},
			testPerSex(sex, obj) {
				/*
				 * 都是男  37父子
				 * 都是女  40母女
				 * 一男一女  33配偶  38父女  39母子
				 * 单向男 07祖父 09孙子 11外祖父 13外孙
				 * 单向女08祖母 10孙女 12外祖母 14外孙女
				 * */
				let result = []
				if(sex == 1) {
					if(obj.relationNew == '40') {
						result.push('被保人' + obj.name + '关系填写有误，请检查')
					} else if(obj.relationNew == '33' || obj.relationNew == '38' || obj.relationNew == '39' || obj.relationNew == '08' || obj.relationNew == '10' || obj.relationNew == '12' || obj.relationNew == '14') {
						if(obj.sex == 1) {
							result.push('被保人' + obj.name + '关系填写有误，请检查')
						}
					} else if(obj.relationNew == '37') {
						if(obj.sex == 2) {
							result.push('被保人' + obj.name + '关系填写有误，请检查')
						}
					}
				} else if(sex == 2) {
					if(obj.relationNew == '37') {
						result.push('被保人' + obj.name + '关系填写有误，请检查')
					} else if(obj.relationNew == '33' || obj.relationNew == '38' || obj.relationNew == '39' || obj.relationNew == '07' || obj.relationNew == '09' || obj.relationNew == '11' || obj.relationNew == '13') {
						if(obj.sex == 2) {
							result.push('被保人' + obj.name + '关系填写有误，请检查')
						}
					} else if(obj.relationNew == '40') {
						if(obj.sex == 1) {
							result.push('被保人' + obj.name + '关系填写有误，请检查')
						}
					}
				}
				return result
			},
			testBaseInfo(type, obj) {
				let result = []
				let msg
				if(type == 'appnt') {
					result = result.concat(this.testPerSex(obj.sex, this.insurant))
					if(this.otherInsurantList.length > 0) {
						let results = []
						for(let i in this.otherInsurantList) {
							if(this.testPerSex(obj.sex, this.otherInsurantList[i].insurant).length > 0) {
								results.push(this.testPerSex(obj.sex, this.otherInsurantList[i].insurant))
							}
						}
						if(results.length > 0) {
							result = result.concat(results)
						}
					}
				} else if(type == 'ins') {
					if(obj.relationNew == '' || obj.relToAppDesc == '') {
						result.push('请选择与投保人关系')
					}
				}
				if(obj.name == '') {
					result.push('请输入姓名')
				} else if(obj.name.length < 2) {
					result.push('请输入正确姓名')
				}
				if(obj.birthday == '') {
					result.push('请输入出生日期')
				} else {
					if(new Date().getTime() - new Date(obj.birthday).getTime() < 0) {
						result.push('生日必须小于当前日期')
					}
					if(type == 'appnt' && utils.valid.getAge(obj.birthday) < 18) {
						result.push('投保人年龄必须大于18周岁（含）')
					}
				}
				if(obj.desc == '' || obj.level == '' || obj.profession == '') {
					if(type == 'appnt') {
						result.push('请选择投保人职业')
					} else if(type == 'ins') {
						result.push('请选择被保人职业')
					}
				}
				return result
			},
			testInsurantProducts() {
				let result = []
				if(this.otherInsurantList.length > 0) {
					let isHave = []
					for(let i in this.otherInsurantList) {
						isHave.push({
							'code': i,
							'name': this.otherInsurantList[i].insurant.name,
							'isHave': false
						})
						for(let j in this.extraproductDef) {
							for(let k in isHave) {
								if(this.extraproductDef[j].insurantNo == isHave[k].code && this.extraproductDef[j].productCode != 'HDT042' && this.extraproductDef[j].productCode != 'HDT044' && this.extraproductDef[j].productCode != 'HCT021') {
									isHave[k].isHave = true
								}
							}
						}
					}
					for(let item of isHave) {
						if(item.isHave == false) {
							result.push('被保险人' + item.name + '未选择险种，请选择')
						}
					}
				}
				let payModeName = this.proposalPlan.insurantProductList[0].productList[0].payModeName
				let payPeriodName = this.proposalPlan.insurantProductList[0].productList[0].payPeriodName
				if(payModeName !== "趸交") {
					if(payPeriodName == "趸交") {
						result.push(this.productDef.productName + "缴费方式为月交或者年交时,交费期间不可为趸交")
					}
				}
				if(payPeriodName !== "趸交") {
					if(payModeName == "趸交") {
						result.push(this.productDef.productName + "交费期间为趸交时,缴费方式不可为月交或者年交")
					}
				}
				if(this.productDef.dividend.length > 0 && this.proposalPlan.insurantProductList[0].productList[0].dividend == "") {
					result.push("请选择红利领取方式")
				}
				if(this.productDef.survival.length > 0 && this.proposalPlan.insurantProductList[0].productList[0].survival == "") {
					result.push("请选择生存金领取方式")
				}
				if(this.productDef.annuity == "true" && this.proposalPlan.insurantProductList[0].productList[0].annuity == "") {
					result.push("请选择年金金领取方式")
				}
				if(this.productDef.autoXubao.length > 0 && this.proposalPlan.insurantProductList[0].productList[0].isAutoXubao == "") {
					result.push("请选择自动续保")
				}
				if(this.productDef.social.length > 0 && this.proposalPlan.insurantProductList[0].productList[0].shebao == "") {
					result.push("请选择被保人是否有社保")
				}
				return result
			},
			changeCust(obj1, obj2) {
				//obj1.id = obj2.id
				obj1.name = obj2.cusItem.customerName
				obj1.birthday = obj2.cusItem.birthday
				obj1.sex = obj2.cusItem.sex
				obj1.desc = obj2.cusItem.workType //appOccupation
				obj1.level = obj2.cusItem.occupationType
				obj1.profession = obj2.cusItem.occupationCode
				obj1.idType = obj2.cusItem.idType
				obj1.idNo = obj2.cusItem.idNo
				obj1.idExpDate = obj2.cusItem.idEndDate
				obj1.idStaDate = obj2.cusItem.idStartDate
				obj1.cus = {}
				obj1.cus.salary = obj2.cusItem.salary
				obj1.cus.province = obj2.cusItem.province
				obj1.cus.city = obj2.cusItem.city
				obj1.cus.county = obj2.cusItem.county
				obj1.cus.street = obj2.cusItem.street
				obj1.cus.community = obj2.cusItem.community
				obj1.cus.postalAddress = obj2.cusItem.postalAddress
				obj1.cus.grpName = obj2.cusItem.grpName
				obj1.cus.email = obj2.cusItem.email
				obj1.cus.marriage = obj2.cusItem.isMarriage
				obj1.cus.mobile = obj2.cusItem.mobile
				obj1.cus.zipCode = obj2.cusItem.zipcode
			},
			changeZero(obj1, obj2) {
				obj1.name = obj2.name
				obj1.birthday = obj2.birthday
				obj1.sex = obj2.sex
				obj1.desc = obj2.desc
				obj1.level = obj2.level
				obj1.profession = obj2.profession
				obj1.more = obj2.more
				obj1.infoId = obj2.infoId
				obj1.memberType = obj2.memberType
			},
			testName(obj) {
				obj.name = obj.name.replace(/\s+/g, "")
				if(obj.name != '' && obj.name.length < 2) {
					obj.check_name = '请确认输入的姓名是否正确'
				} else {
					obj.check_name = ''
				}
			},
			removeTestName(obj) {
				obj.check_name = ''
			},
			removeShowText(obj) {
				obj.check_name = ''
				obj.check_birthday = ''
				obj.check_sex = ''
				obj.check_desc = ''
			},
			showAlert(arr) {
				let msg = ''
				for(let i = 0; i < arr.length; i++) {
					msg += i + 1 + '.' + arr[i] + '</br>'
				}
				alert_n22.alert("提示", msg, "确定")
			},
			showToast(message) {
				Toast({
					message: message,
					position: 'bottom',
					duration: 1500
				})
			},
			customerSearch(tag, index) {
				this.customerValue.isopen = !this.customerValue.isopen
				this.customerValue.type = tag
				this.customerValue.index = index
				if(this.customerValue.type == 'TAG_SEARCH_CUS_APPLICANT') {
					this.customerValue.relationship = this.insurant.relationNew
					this.customerValue.sex = this.insurant.sex
					this.customerValue.infoId = this.insurant.infoId
				} else {
					this.customerValue.relationship = ""
					this.customerValue.sex = ""
					this.customerValue.infoId = ""
				}
			},
			cardScanning(tag, id, index) {
				this.cardScanningValue.isopen = !this.cardScanningValue.isopen
				this.cardScanningValue.type = tag
				this.cardScanningValue.id = id
				this.cardScanningValue.index = index
			},
			chooseJob(type, index) {
				this.occupationValue.isopen = !this.occupationValue.isopen
				this.occupationValue.type = type
				this.occupationValue.index = index
			},
			speechRec(type, index) {
				MAPlugin.hybridCallAction('hybrid://MASpeech:401/invokeSpeech?0', (callbackSucc) => {
					this.occupationValue.isopen = !this.occupationValue.isopen
					this.occupationValue.type = type
					this.occupationValue.index = index
					this.occupationValue.speechRecVal = callbackSucc.result
				}, (callbackFail) => {});
			},
			changeRelation(index) {
				console.log('切换关系 : ', this.isHaveZero)
				if(index == undefined) {
					//					this.insurant.id = ''
					//					this.insurant.name = ''
					//					this.insurant.birthday = ''
					//					this.insurant.sex = '1'
					//					this.insurant.desc = ''
					//					this.insurant.level = ''
					//					this.insurant.profession = ''
					//					this.insurant.more = {}
					//					this.insurant.infoId = ''
					//					this.insurant.memberType = ''
					if(this.isHaveZero == '-1') {
						this.holder.name = ''
						this.holder.birthday = ''
						this.holder.sex = '1'
						this.holder.desc = ''
						this.holder.level = ''
						this.holder.profession = ''
						this.holder.more = {}
						this.holder.infoId = ''
						this.holder.memberType = ''
					}
					if(this.insurant.relationNew == '00' || this.insurant.relationNew == '33') {
						if(this.otherInsurantList.length > 0) {
							for(let i in this.otherInsurantList) {
								if(this.insurant.relationNew == '00' && this.otherInsurantList[i].insurant.relationNew == '00') {
									this.showToast('被保人不可重复选择本人')
									this.insurant.relationNew = ''
								}
								if(this.insurant.relationNew == '33' && this.otherInsurantList[i].insurant.relationNew == '33') {
									this.showToast('被保人不可重复选择配偶')
									this.insurant.relationNew = ''
								}
							}
						}
					}
					if(this.insurant.relationNew != '30') {
						for(let item of this.dict.relationBenefitList) {
							if(this.insurant.relationNew == item.code) {
								this.insurant.relToAppDesc = item.text
							}
						}
					} else {
						this.insurant.relToAppDesc = ''
						this.$refs.btn.showMOdal()
					}
					if(this.extraproductDef.length > 0) {
						for(let i in this.extraproductDef) {
							if(this.extraproductDef[i].insurantNo == '-1' && this.extraproductDef[i].productCode != this.productDef.bindCode) {
								this.extraproductDef.splice(i, 1)
							}
						}
					}
				} else {
					//this.otherInsurantList[index].insurant.id = ''
					//this.otherInsurantList[index].insurant.name = ''
					//this.otherInsurantList[index].insurant.birthday = ''
					//this.otherInsurantList[index].insurant.sex = '1'
					//this.otherInsurantList[index].insurant.desc = ''
					//this.otherInsurantList[index].insurant.level = ''
					//this.otherInsurantList[index].insurant.profession = ''
					//this.otherInsurantList[index].insurant.more = {}
					//this.otherInsurantList[index].insurant.infoId = ''
					//this.otherInsurantList[index].insurant.memberType = ''
					if(this.isHaveZero == index && this.isHaveZero != '') {
						this.holder.name = ''
						this.holder.birthday = ''
						this.holder.sex = '1'
						this.holder.desc = ''
						this.holder.level = ''
						this.holder.profession = ''
						this.holder.more = {}
						this.holder.infoId = ''
						this.holder.memberType = ''
					}
					if(this.otherInsurantList[index].insurant.relationNew == '00' || this.otherInsurantList[index].insurant.relationNew == '33') {
						if(this.otherInsurantList[index].insurant.relationNew == '00' && this.insurant.relationNew == '00') {
							this.showToast('被保人不可重复选择本人')
							this.otherInsurantList[index].insurant.relationNew = ''
						}
						if(this.otherInsurantList[index].insurant.relationNew == '33' && this.insurant.relationNew == '33') {
							this.showToast('被保人不可重复选择配偶')
							this.otherInsurantList[index].insurant.relationNew = ''
						}
						if(this.otherInsurantList.length > 0) {
							for(let i in this.otherInsurantList) {
								if(this.otherInsurantList[index].insurant.relationNew == '00' && this.otherInsurantList[i].insurant.relationNew == '00' && i != index) {
									this.showToast('被保人不可重复选择本人')
									this.otherInsurantList[index].insurant.relationNew = ''
								}
								if(this.otherInsurantList[index].insurant.relationNew == '33' && this.otherInsurantList[i].insurant.relationNew == '33' && i != index) {
									this.showToast('被保人不可重复选择配偶')
									this.otherInsurantList[index].insurant.relationNew = ''
								}
							}
						}
					}
					if(this.otherInsurantList[index].insurant.relationNew != '30') {
						for(let item of this.dict.relationBenefitList) {
							if(this.otherInsurantList[index].insurant.relationNew == item.code) {
								this.otherInsurantList[index].insurant.relToAppDesc = item.text
							}
						}
					} else {
						this.otherInsurantList[index].insurant.relToAppDesc = ''
						this.$refs.btn.showMOdal(index)
					}
					if(this.extraproductDef.length > 0) {
						for(let i in this.extraproductDef) {
							if(this.extraproductDef[i].insurantNo == index) {
								this.extraproductDef.splice(i, 1)
							}
						}
					}
				}
			},
			relationEdit(index, value) {
				value = value.replace(/(^\s*)|(\s*$)/g, "")
				if(index == undefined) {
					this.insurant.relToAppDesc = value
				} else {
					this.otherInsurantList[index].insurant.relToAppDesc = value
				}
			},
			changeInsurantBirth(type, obj) {
				if(type == 'holeder') {
					if(utils.valid.getAge(this.holder.birthday) < 18) {
						alert_n22.alert("提示", '投保人年龄必须大于18周岁（含）', "确定")
					}
				} else if(type == 'insurant') {
					if(utils.valid.getAge(obj.birthday) <= '6') {
						obj.desc = "学龄前儿童"
						obj.level = "1"
						obj.profession = "1001007"
					} else if(obj.desc == "学龄前儿童") {
						obj.desc = ""
						obj.level = ""
						obj.profession = ""
					}
				}
			},
			addInsurant() {
				let insurantNew = {
					insurant: {
						relationNew: "",
						relToAppDesc: "",
						name: "",
						birthday: "",
						sex: "1",
						desc: "",
						level: "",
						profession: "",
						idType: "",
						idNo: "",
						idExpDate: "",
						age: "",
						seqNumber: this.otherInsurantList.length,
						check_relationNew: '',
						check_name: '',
						check_birthday: '',
						check_sex: '',
						check_desc: '',
					},
					extraList: []
				}
				this.otherInsurantList.push(insurantNew)
			},
			delInsurant(index) {
				alert_n22.confirm('提示', '请确认是否删除？', '确定', '取消', (flag) => {
					if(this.extraproductDef.length > 0) {
						let newArr = []
						for(let i in this.extraproductDef) {
							if(this.extraproductDef[i].insurantNo != index) {
								newArr.push(this.extraproductDef[i])
							}
						}
						this.extraproductDef = newArr
					}
					this.otherInsurantList.splice(index, 1)
					if(this.extraproductDef.length > 0) {
						for(let i in this.extraproductDef) {
							if(this.extraproductDef[i].insurantNo > index) {
								this.extraproductDef[i].insurantNo = Number(this.extraproductDef[i].insurantNo) - 1
							}
						}
					}
				})
			},
			addExtraList() {
				let item = {
					addBegin: '',
					addEnd: '',
					addPre: '',
					code: this.addList.length,
					userDefine1: 'add'
				}
				this.addList.push(item)
			},
			removEextra(index) {
				this.addList.splice(index, 1)
			},
			adddrawList() {
				let item = {
					drawBegin: "",
					drawEnd: "",
					drawPre: "",
					code: this.drawList.length,
					userDefine1: "draw"
				}
				this.drawList.push(item)
			},
			removdrawList(index) {
				this.drawList.splice(index, 1)
			},
			chooseExtra(index) {
				this.extraFrom = index
				console.log('选中来源 0-新增 1-修改==>', this.extraFrom)
				console.log('>', this.extraEdit)
				console.log('=======================chooseExtra START==============================')
				this.extra = Object.assign({}, this.extraMap[this.extraProductCode])
				if(this.extra.productCode == 'HDT042' || this.extra.productCode == 'HDT044' || this.extra.productCode == 'HCT021') {
					//交费期间 主险交费期间-1
					let payPeriod = this.proposalPlan.insurantProductList[0].productList[0].payPeriod
					if(payPeriod.indexOf('term') != -1) {
						this.extra.attList[1].attValueList[0].text = (parseInt(payPeriod.split('_')[1], 10) - 1) + '年'
					}
					if(this.insurant.relationNew == '00') {
						alert_n22.alert("提示", "无法选择豁免险", "确定")
						this.cancelExtra()
					} else {
						this.insurantNo = '-1'
					}
				}
				if(this.extra.productCode === 'HMT039') {
					this.extra.attList[0].attName = "交费方式"
				}
				if(this.extraFrom == 0) {
					for(let item of this.extra.attList) {
						if(['amount', 'premium', 'piece'].indexOf(item.attCode) == -1) {
							this.extraEdit[item.attCode] = item.attValueList[0].code
							this.extraEdit[item.attCode + 'Name'] = item.attValueList[0].text
						}
						this.extraEdit.amount = utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.product[this.extra.productCode].amount
						this.extraEdit.piece = utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.product[this.extra.productCode].piece
						this.extraEdit.premium = utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.product[this.extra.productCode].amount
					}
					if(this.otherInsurantList.length == 0) {
						this.insurantNo = '-1'
					}
				} else {
					for(let item of this.extraproductDef) {
						if(item.productCode == this.extra.productCode && item.insurantNo == this.insurantNo) {
							this.extraEdit = Object.assign({}, item.extra)
							this.extraEdit.amount = item.extra.amount
							break
						}
					}
				}
				this.extraEdit.productName = this.extra.productName
				this.extraEdit.productCode = this.extra.productCode
				if(this.extraEdit.addList != undefined && this.extraEdit.addList.length > 0) {
					this.addList = this.extraEdit.addList
				}
				if(this.extraEdit.drawList != undefined && this.extraEdit.drawList.length > 0) {
					this.drawList = this.extraEdit.drawList
				}
				this.toggle.extraEdit = true
				console.log('this.extraMap==>', this.extraMap)
				console.log('this.extra==>', this.extra)
				console.log('this.extraEdit====`==>', this.extraEdit)
				console.log('this.extraproductDef====`==>', this.extraproductDef)
				console.log('=======================chooseExtra END==============================')
			},
			chooseExtraItem(item) {
				for(let i of item.attValueList) {
					if(this.extraEdit[item.attCode] == i.code) {
						this.extraEdit[item.attCode + 'Name'] = i.text
						break;
					}
				}
			},
			saveExtra() {
				console.log('=======================saveExtra START==============================')
				if(this.extra.productCode == 'NPU012' || this.extra.productCode == 'NPU015') {
					if(this.addList.length == 1) {
						if(Number(this.addList[0].addBegin) == 0) {
							alert_n22.alert("提示", '起始年限需大于等于1', "确定")
							return
						}
						if(Number(this.addList[0].addBegin) > Number(this.addList[0].addEnd)) {
							alert_n22.alert("提示", '终止年限需大于起始年限', "确定")
							return
						}
					} else {
						for(let i = 0; i < this.addList.length; i++) {
							this.addList[i].code = i
							if(Number(this.addList[i].addBegin) > Number(this.addList[i].addEnd)) {
								alert_n22.alert("提示", '终止年限需大于起始年限', "确定")
								return
							}
						}
						for(let i = 0; i < this.addList.length - 1; i++) {
							let prev = Number(this.addList[i].addEnd)
							let next = Number(this.addList[i + 1].addBegin)
							if(next == undefined || next == '') {
								continue
							}
							if(prev >= next) {
								alert_n22.alert("提示", '新追加追加保费的起始年限必须大于上一次的截止年限', "确定")
								return
							}
						}
					}
					/*
					if(Number(this.addList[this.addList.length - 1].addEnd) > 1) {
						let msg = "<p><span style='color:red;'>“追加保费起始年限”</span>与<span style='color:red;'>“追加保费截止年限”</span>内容仅作为建议书演示使用，并不会记录到投保信息中。如客户承保后有追加保费需求，需进行保全申请，请特别关注并与客户进行说明。</p>";
						alert_n22.alert("提示", msg, "确定")
					}*/
					if(this.drawList.length > 1) {
						for(let i = 0; i < this.drawList.length - 1; i++) {
							let prev = Number(this.drawList[i].drawEnd)
							let next = Number(this.drawList[i + 1].drawBegin)
							if(next == undefined || next == '') {
								continue
							}
							if(prev > next) {
								alert_n22.alert("提示", '新增的部分领取保费的起始年限必须大于上一次的截止年限', "确定")
								return
							}
						}
					}
					this.extraEdit.addList = this.addList
					this.extraEdit.drawList = this.drawList
				}
				if(this.insurantNo == "") {
					alert_n22.alert("提示", "请选择被保人", "确定")
					return
				} else if(this.insurantNo != '-1' && (this.extra.productCode == this.productDef.bindCode)) {
					alert_n22.alert("提示", "此被保人不能选择此绑定附加险", "确定")
					return
				}
				console.log('=====选择被保人=================', this.insurantNo)
				this.toggle.extraEdit = false
				if(this.extraFrom == 0) {
					let existExtra = false
					if(this.extraproductDef.length > 0) {
						for(let i in this.extraproductDef) {
							if((this.extraproductDef[i].productCode == this.extraEdit.productCode) && (this.extraproductDef[i].insurantNo == this.insurantNo)) {
								existExtra = true
							}
						}
					}
					if(existExtra) {
						if(this.extraEdit.productCode == 'HDT042' || this.extraEdit.productCode == 'HDT044' || this.extraEdit.productCode == 'HCT021') {
							this.insurantNo = ''
							alert_n22.alert("提示", "已选择过豁免险", "确定")
						} else {
							alert_n22.alert("提示", "此被保人已选过此附加险", "确定")
						}
					} else {
						this.extraproductDef.push({
							productCode: this.extraEdit.productCode,
							productName: this.extraEdit.productName,
							extra: Object.assign({
								checked: 'checked',
								disabled: 'disabled'
							}, this.extraEdit),
							insurantNo: this.insurantNo,
							//insurantName: (this.insurantItem[Number(this.insurantNo) + 1]).text.split('-')[1]
							insurantName: this.insurantItem[Number(this.insurantNo) + 1].text
						})
					}
				} else {
					this.extraproductDef.forEach((item, index) => {
						if(item.productCode == this.extraEdit.productCode && item.insurantNo == this.insurantNo) {
							//item.insurantNo = this.insurantNo
							//item.insurantName = this.insurantItem[Number(this.insurantNo) + 1].text
							item.extra = this.extraEdit
							item.extra.checked = 'checked'
							item.extra.disabled = 'disabled'
						}
					})
				}
				if(this.extra.productCode == 'NPU012' || this.extra.productCode == 'NPU015') {
					if(Number(this.addList[this.addList.length - 1].addEnd) > 1) {
						let msg = "<p><span style='color:red;'>“追加保费起始年限”</span>与<span style='color:red;'>“追加保费截止年限”</span>内容仅作为建议书演示使用，并不会记录到投保信息中。如客户承保后有追加保费需求，需进行保全申请，请特别关注并与客户进行说明。</p>";
						alert_n22.alert("提示", msg, "确定")
					}
				}
				this.extraProductCode = ""
				this.cancelExtra()
				this.baofeiTest(() => {
					if(this.reasonList != '') {
						alert_n22.alertRules("规则提示", this.reasonList, "确定")
					}
				})
				console.log('=======================saveExtra END==============================')
				console.log('===extraproductDef==>', this.extraproductDef)
			},
			cancelExtra() {
				this.toggle.extraEdit = false
				this.extraProductCode = ""
				this.insurantNo = ""
				this.extra = {}
				this.extraEdit = {}
				this.addList = [{
					addBegin: 1,
					addEnd: 1,
					addPre: 10,
					code: 0,
					userDefine1: "add"
				}]
				this.drawList = [{
					drawBegin: "",
					drawEnd: "",
					drawPre: "",
					code: 0,
					userDefine1: "draw"
				}]
			},
			chooseExtraList(productCode, insurantNo) {
				console.log('===>修改附加险', productCode, insurantNo)
				for(let i of this.productDef.extraList) {
					if(i.productCode == productCode) {
						this.extra = Object.assign({}, i)
						this.extraProductCode = productCode
						this.insurantNo = insurantNo
						this.insurantItem.forEach(item => {
							if(item.code == insurantNo) {
								this.insurantText = item.text
							}
						})
						this.chooseExtra(1)
						break
					}
				}
			},
			deleteExtra(item) {
				if(item.productCode == this.productDef.bindCode) {
					return
				} else {
					alert_n22.confirm('提示', '请确认是否删除？', '确定', '取消', (flag) => {
						for(let i in this.extraproductDef) {
							if(this.extraproductDef[i].productCode == item.productCode && this.extraproductDef[i].insurantNo == item.insurantNo) {
								this.extraproductDef.splice(i, 1)
								break
							}
						}
						this.baofeiTest()
					})
				}
			},
			chooseMainItem(item) {
				this.baofeiTest()
			},
			blurFocus() {
				this.baofeiTest()
			},
			tkStatus(item) {
				this.tkStatuList = []
				for(let i in this.proposalPlans.proposalPlan.item) {
					if(item != undefined) {
						if(item.productCode == this.proposalPlans.proposalPlan.item[i].productCode) {
							if(this.proposalPlans.proposalPlan.item[i].proposalType == "1") {
								this.tkStatuList.push(this.proposalPlans.proposalPlan.item[i])
							}
						}
					} else {
						if(this.productCode == this.proposalPlans.proposalPlan.item[i].productCode) {
							if(this.proposalPlans.proposalPlan.item[i].proposalType == "1") {
								this.tkStatuList.push(this.proposalPlans.proposalPlan.item[i])
							}
						}
					}
				}
				this.tkStatuList.sort((a, b) => {
					const codeA = parseInt(a.code)
					const codeB = parseInt(b.code)
					return codeA - codeB
				})
				if(this.tkStatuList.length > 0) {
					this.toggle.tkStatu = true
					console.log(this.tkStatuList)
				} else {
					this.toggle.tkStatu = false
					alert_n22.alert("提示", '当前险种没有产品条款', "确定")
				}
			},
			filterExtraList(extras) {
				let temp = []
				let extraList = extras
				if(extraList != undefined && extraList.length > 0) {
					for(let i in extraList) {
						if(extraList[i].productCode == 'HCT007' || extraList[i].productCode == 'NPU012' || extraList[i].productCode == 'HDT042' || extraList[i].productCode == 'NPU015') {
							temp.push(extraList[i])
						}
					}
				}
				return temp
			},
			getDividendText(list) {
				let arr = []
				for(let i = 0; i < list.length; i++) {
					if(list[i] == "1") {
						let item = {}
						item.code = list[i]
						item.text = "累积生息"
						arr.push(item)
					} else if(list[i] == "2") {
						let item = {}
						item.code = list[i]
						item.text = "抵交保费"
						arr.push(item)
					} else if(list[i] == "3") {
						let item = {}
						item.code = list[i]
						item.text = "现金领取"
						arr.push(item)
					} else if(list[i] == "4") {
						let item = {}
						item.code = list[i]
						item.text = "现金红利"
						arr.push(item)
					} else if(list[i] == "5") {
						let item = {}
						item.code = list[i]
						item.text = "增额交清"
						arr.push(item)
					} else if(list[i] == "6") {
						let item = {}
						item.code = list[i]
						item.text = "进入万能账户累计"
						arr.push(item)
					}
				}
				return arr
			},
			getSurvivalText(list) {
				let arr = []
				for(let i = 0; i < list.length; i++) {
					if(list[i] == "1") {
						let item = {}
						item.code = list[i]
						item.text = "累积生息"
						arr.push(item)
					}
				}
				return arr
			},
			getAutoXubaoText(list) {
				let arr = []
				for(let i = 0; i < list.length; i++) {
					if(list[i] == "-1") {
						let item = {}
						item.code = list[i]
						item.text = "是"
						arr.push(item)
					} else if(list[i] == "-2") {
						let item = {}
						item.code = list[i]
						item.text = "否"
						arr.push(item)
					}
				}
				//兼容旧值
				if(arr.length == 0) {
					for(let i = 0; i < list.length; i++) {
						if(list[i] == "Y") {
							let item = {}
							item.code = '-1'
							item.text = "是"
							arr.push(item)
						} else if(list[i] == "N") {
							let item = {}
							item.code = '-2'
							item.text = "否"
							arr.push(item)
						}
					}
				}
				return arr
			},
			detailBack() {
				if(this.showList == 1) {
					this.$router.push("/policy/list")
				} else if(this.showList == 3 && this.isHaveZero != '') {
					this.showList = 1
				} else {
					this.showList--
				}
			},
			winReload(cond) {
				if(this.$route.params.planId != 'new') {
					this.$router.push({
						name: "product_details_page",
						params: {
							planId: this.$route.params.planId,
							step: this.showList
						}
					})
					window.location.reload()
				} else {
					/*
					this.$router.push({
						name: "product_details_page",
						params: {
							planId: this.$route.params.planId,
							step: 1
						}
					})
					window.location.reload()*/
				}
			},
			backHome() {
				this.$router.push("/home");
			},
			getProductDef(productCode) {
				let requ = {
					"productDef": {
						"agentCode": utils.cache.get('personsal').agentCode || '',
						"productCode": productCode,
						"token": new Date().getTime(),
						"openId": "1",
						"channel": utils.cache.get('channel')
					}
				}
				utils.http.post('PRODUCTDEFLIST', requ).then(response => {
					if(response.data.header.responseCode == '0') {
						this.tempProductDefList = response.data.response.productDefList[0]
						utils.cache.set('attlist', this.tempProductDefList.attList)
						this.productDef = response.data.response.productDefList[0]
						console.log("=====productDef==========>", this.productDef)
						if(utils.cache.get('personsal').orgId == '000000' && utils.cache.get('personsal').channel == '02') {
							this.productDef.extraList = this.filterExtraList(this.productDef.extraList)
						}
						//红利领取方式
						this.productDef.dividend = this.getDividendText(this.productDef.productDefine.dividend.split(","))
						//生存金领取方式
						this.productDef.survival = this.getSurvivalText(this.productDef.productDefine.survival.split(","))
						//自动续保
						this.productDef.autoXubao = this.getAutoXubaoText(this.productDef.productDefine.autoXubao.split(","))
						//是否有社保选项
						this.productDef.social = this.productDef.productDefine.social
						//责任
						this.productDef.zerenList = this.productDef.productDefine.zeren5
						if(this.productCode == 'HMT049') {
							if(this.proposalPlan.insurantProductList[0].productList[0].rank == undefined || this.proposalPlan.insurantProductList[0].productList[0].rank == 'rank_1' || this.proposalPlan.insurantProductList[0].productList[0].rank == 'rank_2') {
								this.productDef.zerenList.forEach((item, index) => {
									if(item.code == '2') {
										this.productDef.zerenList.splice(index, 1)
									}
								})
							}
						}
						//自动续保默认值
						if(this.productDef.autoXubao.length == 2 && this.$route.params.planId == 'new') {
							this.proposalPlan.insurantProductList[0].productList[0].isAutoXubao = '-2'
							if(productCode == 'AAT069') { //老年意外
								this.proposalPlan.insurantProductList[0].productList[0].isAutoXubao = '-1'
							}
						}
						//是否支持自动垫交
						this.productDef.isCanAutoPay = this.productDef.productDefine.isCanAutoPay
						if(this.productDef.isCanAutoPay == "0,1" && this.$route.params.planId == 'new') {
							this.proposalPlan.insurantProductList[0].productList[0].isCanAutoPay = "0"
						}
						//========================上述内容由产品定义中额外字段决定=========================
						for(var extra of this.productDef.extraList) {
							this.extraMap[extra.productCode] = extra
						}
						let productMain = this.proposalPlan.insurantProductList[0].productList[0]
						if(this.$route.params.planId == 'new' || !this.navigationListHasData) {
							let orgIdArea = utils.cache.get('personsal').orgId.substring(0, 4)
							let typeAll = response.data.response.productDefList[0].productDefine.typeAll.slice(0, 4)
							let timeLimit = response.data.response.productDefList[0].productDefine.timeLimit
							if(orgIdArea == '8635' && (typeAll == "1020" || typeAll == "1030" || typeAll == "1040")) { //宁波
								this.nextPageQues = 'questionnaire_page_nb'
							} else if(orgIdArea == '8661' && timeLimit == '01') { //重庆
								this.nextPageQues = 'questionnaire_page'
							} else if(orgIdArea == '8631' && utils.valid.getAge(this.holder.birthday) > 60) { //上海
								this.nextPageQues = 'questionnaire_page_sh'
							}
							if(this.nextPageQues != '') {
								this.base_list_st.splice(1, 0, {
									step: '2',
									name: this.nextPageQues,
									path: '',
									content: '测评问卷',
									seqNumber: '',
									saveFlag: '1'
								})
							}
							this.navigationList = this.base_list_st.concat(this.base_ins, this.base_list_la)
							console.log('navigationList==>>>', this.navigationList)
							productMain.productCode = this.productDef.productCode
							productMain.productName = this.productDef.productName
							productMain.attList = this.productDef.attList
							for(let item of this.productDef.attList) {
								if(item.attValueList.length > 0) {
									productMain[item.attCode] = item.attValueList[0].code
									productMain[item.attCode + 'Name'] = item.attValueList[0].text
								}
							}
							//绑定附加险
							if(this.productDef.bindCode != '') {
								for(let item of this.productDef.bindExtraList) {
									let extra = {
										productCode: item.productCode,
										productName: item.productName,
										checked: 'checked',
										disabled: 'disabled'
									}
									for(let att of item.attList) {
										extra[att.attCode] = att.attValueList[0].code
										extra[att.attCode + 'Name'] = att.attValueList[0].text
									}
									let existProduct = false
									for(let item of this.extraproductDef) {
										if(item.productCode == extra.productCode) {
											existProduct = true
										}
									}
									if(!existProduct) {
										this.extraproductDef.push({
											productCode: item.productCode,
											productName: item.productName,
											extra: extra,
											insurantNo: '-1',
											insurantName: ''
										})
									}
								}
							}
						} else {
							productMain.attList = this.productDef.attList
						}
						this.loadData = true
					}
					this.proposalPlan.insurantProductList[0].productList[0].extraList = []
					if(this.otherInsurantList.length > 0) {
						for(let item of this.otherInsurantList) {
							item.extraList = []
						}
					}
					console.log("=====初始 extraproductDef==========>", this.extraproductDef)
					console.log("=====初始 proposalPlan==========>", this.proposalPlan)
					if(this.$route.params.planId != 'new') {
						this.baofeiTest()
					}
				})
			},
			changeProposalPlan() {
				let proposalPlan = {
					checkType: '1',
					holder: JSON.parse(JSON.stringify(this.holder)),
					insurantProductList: [{
						insurant: JSON.parse(JSON.stringify(this.insurant)),
						otherInsurantList: JSON.parse(JSON.stringify(this.otherInsurantList)),
						productList: JSON.parse(JSON.stringify(this.proposalPlan.insurantProductList[0].productList)),
						totalPremium: this.totalPremium,
						totalAmount: this.totalAmount
					}],
					orgAgent: {
						agentCode: utils.cache.get('personsal').agentCode,
						agentName: utils.cache.get('personsal').agentName,
						channel: utils.cache.get('personsal').channel,
						deviceNo: '572032449254344960',
						openId: 'xxxx',
						token: ''
					},
					planId: this.planId,
				}
				for(let i in this.extraproductDef) {
					if(this.extraproductDef[i].insurantNo == '-1') {
						proposalPlan.insurantProductList[0].productList[0].extraList.push(this.extraproductDef[i].extra)
					} else {
						proposalPlan.insurantProductList[0].otherInsurantList[this.extraproductDef[i].insurantNo].extraList.push(this.extraproductDef[i].extra)
					}
				}
				//主险
				for(let att of proposalPlan.insurantProductList[0].productList[0].attList) {
					att.attValue = proposalPlan.insurantProductList[0].productList[0][att.attCode]
					for(let i = 0; i < att.attValueList.length; i++) {
						if(att.attValue == att.attValueList[i].code) {
							//console.log(att.attValueList[i].text)
							proposalPlan.insurantProductList[0].productList[0][att.attCode + 'Name'] = att.attValueList[i].text
						}
					}
					if(this.tempProductDefList.productCode == "NET004") {
						if(att.attValue == '55' && att.attValueList.length == 2) {
							att.attValue = '60'
							proposalPlan.insurantProductList[0].productList[0][att.attCode + 'Name'] = '60岁领取'
						}
					}
				}
				if(this.productDef.zerenList != undefined && this.productDef.zerenList.length > 0) {
					if(proposalPlan.insurantProductList[0].productList[0].zerenList != undefined && proposalPlan.insurantProductList[0].productList[0].zerenList.length > 0) {
						proposalPlan.insurantProductList[0].productList[0].zeRen5 = proposalPlan.insurantProductList[0].productList[0].zerenList.join(',')
						let zerenList = this.productDef.zerenList
						zerenList.forEach(item => {
							item.choose = '1'
							proposalPlan.insurantProductList[0].productList[0].zerenList.forEach(tpl => {
								if(item.code == tpl) {
									item.choose = '0'
								}
							})
						})
						proposalPlan.insurantProductList[0].productList[0].zerenList = zerenList
					} else {
						let zerenList = this.productDef.zerenList
						zerenList.forEach(item => {
							item.choose = '1'
						})
						proposalPlan.insurantProductList[0].productList[0].zerenList = zerenList
					}
				}
				//console.log(this.extraMap['HMT039'].attList)
				if(proposalPlan.insurantProductList[0].productList[0].extraList.length > 0) {
					proposalPlan.insurantProductList[0].productList[0].extraList.forEach((extra, index) => {
						extra.attList = this.extraMap[extra.productCode].attList
						extra.checked = 'checked'
						extra.disabled = 'disabled'
						extra.seqNumber = index
						if(this.extraMap[extra.productCode].productDefine.zeren5 != undefined && this.extraMap[extra.productCode].productDefine.zeren5.length > 0) {
							if(extra.zerenListOld != undefined && extra.zerenListOld != '') {
								extra.zeren5 = extra.zerenListOld.join(',')
								let zerenList = this.extraMap[extra.productCode].productDefine.zeren5
								zerenList.forEach(item => {
									item.choose = '1'
									extra.zerenListOld.forEach(tpl => {
										if(item.code == tpl) {
											item.choose = '0'
										}
									})
								})
								extra.zerenList = zerenList
							} else {
								extra.zeren5 = ''
								let zerenList = this.extraMap[extra.productCode].productDefine.zeren5
								zerenList.forEach(item => {
									item.choose = '1'
								})
								extra.zerenList = zerenList
							}
						}
						if(!extra.amount) {
							extra.amount = utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.product[extra.productCode].amount
						}
						for(let att of extra.attList) {
							att.attValue = extra[att.attCode]
							for(let i = 0; i < att.attValueList.length; i++) {
								if(att.attValue == att.attValueList[i].code) {
									//console.log(att.attValueList[i].text)
									extra[att.attCode + 'Name'] = att.attValueList[i].text
								}
							}
						}
					})
				}
				if(proposalPlan.insurantProductList[0].otherInsurantList.length > 0) {
					for(let otherInsurantList of proposalPlan.insurantProductList[0].otherInsurantList) {
						otherInsurantList.extraList.forEach((extra, index) => {
							extra.attList = this.extraMap[extra.productCode].attList
							extra.checked = 'checked'
							extra.disabled = 'disabled'
							extra.seqNumber = index
							if(extra.zerenListOld != undefined && extra.zerenListOld != '') {
								extra.zeren5 = extra.zerenListOld.join(',')
								let zerenList = this.extraMap[extra.productCode].productDefine.zeren5
								zerenList.forEach(item => {
									item.choose = '1'
									extra.zerenListOld.forEach(tpl => {
										if(item.code == tpl) {
											item.choose = '0'
										}
									})
								})
								extra.zerenList = zerenList
							}
							if(!extra.amount) {
								extra.amount = utils.cache.get("CONFIG_newPtoduct_policyName_product").proposalPlan.product[extra.productCode].amount
							}
							for(let att of extra.attList) {
								att.attValue = extra[att.attCode]
								for(let i = 0; i < att.attValueList.length; i++) {
									if(att.attValue == att.attValueList[i].code) {
										//console.log(att.attValueList[i].text)
										extra[att.attCode + 'Name'] = att.attValueList[i].text
									}
								}
							}
						})
					}
				}
				return proposalPlan
			},
			baofeiTest(callback) {
				console.log('========================保费试算======================================')
				if(!this.productDef.attList) {
					return
				}
				let proposalPlan = this.changeProposalPlan()
				if(proposalPlan.holder.birthday == '') {
					return
				}
				if(proposalPlan.insurantProductList[0].insurant.birthday == '') {
					return
				}
				proposalPlan.holder.birthday += 'T00:00:00.000Z'
				proposalPlan.insurantProductList[0].insurant.birthday += 'T00:00:00.000Z'
				if(this.otherInsurantList.length > 0) {
					for(let i in proposalPlan.insurantProductList[0].otherInsurantList) {
						proposalPlan.insurantProductList[0].otherInsurantList[i].insurant.birthday += 'T00:00:00.000Z'
					}
				}
				let requ = {
					proposalPlan: proposalPlan
				}
				console.log('保费试算requ', requ)
				utils.http.post('PRODUCTPREMIUM', requ).then(response => {
					console.log('保费试算response', response)
					if(response.data.header.responseCode == '0') {
						let result = response.data.response.trialPremiumMobile
						console.log('isPass=====>', result.isPass)
						if(result.isPass == 'true') {
							console.log('保费试算通过,主险保费，主险金额', result.insurantProductList[0].plan.productList[0].premiumDes, result.insurantProductList[0].plan.productList[0].amount)
							this.totalPremium = result.totalPremium
							this.totalAmount = result.totalAmount
							this.proposalPlan.insurantProductList[0].productList[0].premiumDes = result.insurantProductList[0].plan.productList[0].premiumDes
							this.proposalPlan.insurantProductList[0].productList[0].amount = result.insurantProductList[0].plan.productList[0].amount
							this.proposalPlan.insurantProductList[0].productList[0].zeRenPremStr = result.insurantProductList[0].plan.productList[0].zeRenPremStr
							if(result.insurantProductList[0].plan.productList[0].extraList.length > 0) {
								for(let item of result.insurantProductList[0].plan.productList[0].extraList) {
									for(let extra of this.extraproductDef) {
										if(extra.insurantNo == '-1' && extra.productCode == item.productCode) {
											extra.extra.amount = item.amount
											extra.extra.premiumDes = item.premiumDes
											extra.extra.zeRenPremStr = item.zeRenPremStr
										}
									}
								}
							}
							if(result.otherInsurantProductList.length > 0) {
								for(let i in result.otherInsurantProductList) {
									for(let ins of this.extraproductDef) {
										if(ins.insurantNo == i) {
											for(let item of result.otherInsurantProductList[i].productList) {
												if(ins.productCode == item.productCode) {
													ins.extra.amount = item.amount
													ins.extra.premiumDes = item.premiumDes
													ins.extra.zeRenPremStr = item.zeRenPremStr
												}
											}
										}
									}
								}
							}
							this.reasonList = ''
						} else {
							let reasonList = ''
							if(result.insurantProductList[0].checkResult.isPass == 'false') {
								for(let item of result.insurantProductList[0].checkResult.reasonList) {
									reasonList += '<br/><span style="font-weight: bold;">' + this.insurant.name + '</span>：' + '<br/>&nbsp;&nbsp;&nbsp;&nbsp;' + item.info
								}
							}
							if(result.otherInsurantProductList.length > 0) {
								for(let i in result.otherInsurantProductList) {
									if(result.otherInsurantProductList[i].checkResult.isPass == 'false') {
										for(let j in result.otherInsurantProductList[i].checkResult.reasonList) {
											reasonList += '<br/><span style="font-weight: bold;">' + this.otherInsurantList[result.otherInsurantProductList[i].seqNumber].insurant.name + '</span>：' + '<br/>&nbsp;&nbsp;&nbsp;&nbsp;' + result.otherInsurantProductList[i].checkResult.reasonList[j].info
										}
									}
								}
							}
							this.totalPremium = "0"
							this.reasonList = reasonList
							console.log('投保规则', this.reasonList)
							if(this.reasonList != '') {
								//alert_n22.alert("规则校验", this.reasonList, "确定")
								console.log('保费试算规则校验', this.reasonList)
							}
						}
						if(callback) {
							callback()
						}
					} else {
						alert_n22.alert('提示', response.data.header.errorMessage, '确定')
					}
				})
			},
			changeSave() {
				let proposalPlan = this.changeProposalPlan()
				console.log('保存存缓存 proposalPlan', proposalPlan)
				console.log('保存转换用 this.proposalPlan', this.proposalPlan)
				if(this.productCode == 'HMT038') {
					let productName = this.proposalPlan.insurantProductList[0].productList[0].productName + this.proposalPlan.insurantProductList[0].productList[0].rankName
					proposalPlan.insurantProductList[0].productList[0].productName = productName
					console.log('安康百万', proposalPlan.insurantProductList[0].productList[0].productName)
				}
				if(this.productCode == 'AAT069') {
					let productName = this.proposalPlan.insurantProductList[0].productList[0].productName.slice(2) + this.proposalPlan.insurantProductList[0].productList[0].rankName
					proposalPlan.insurantProductList[0].productList[0].productName = productName
					console.log('老年意外', proposalPlan.insurantProductList[0].productList[0].productName)
				}
				/*================================以下为主被保人=====================================*/
				let firstIsHasInsurance = proposalPlan.insurantProductList[0].productList[0].shebao
				let mainPolicyArr = [],
					mainPolicy = {},
					extraPolicyArr = [],
					extraPolicy = {},
					policy = []
				mainPolicy = {
					"isMaster": "1", //主附险标识(1:主险,非1:附加险)
					"seqNumber": '-1',
					"rank": proposalPlan.insurantProductList[0].productList[0].rank, //保险计划
					"prodName": proposalPlan.insurantProductList[0].productList[0].productName, //产品名称
					"prodCode": proposalPlan.insurantProductList[0].productList[0].productCode, //产品code
					"payYear": proposalPlan.insurantProductList[0].productList[0].payPeriod || "", //交费期间
					"payYearName": proposalPlan.insurantProductList[0].productList[0].payPeriodName || "",
					"insureYear": proposalPlan.insurantProductList[0].productList[0].policyPeriod || "", //保险期间
					"insureYearName": proposalPlan.insurantProductList[0].productList[0].policyPeriodName || "",
					"amnt": proposalPlan.insurantProductList[0].productList[0].amount, //保额
					"prem": proposalPlan.insurantProductList[0].productList[0].premiumDes, //保费
					"bonusGetMode": proposalPlan.insurantProductList[0].productList[0].dividend, //红利领取方式
					"survival": proposalPlan.insurantProductList[0].productList[0].survival, //生存金领取方式
					"getYear": proposalPlan.insurantProductList[0].productList[0].drawAge || "", //领取年龄
					"getDutyKind": proposalPlan.insurantProductList[0].productList[0].drawFreq || "", //年金领取频率
					"getDutyKindName": proposalPlan.insurantProductList[0].productList[0].drawFreqName || "",
					"getYears": proposalPlan.insurantProductList[0].productList[0].drawMode || "", //年金领取方式
					"autoPayFlag": proposalPlan.insurantProductList[0].productList[0].isCanAutoPay, //自动垫交 默认:0
					"isAutoXubao": proposalPlan.insurantProductList[0].productList[0].isAutoXubao || "", //自动续保
					"payIntv": proposalPlan.insurantProductList[0].productList[0].payMode || "", //缴费方式
					"payIntvName": proposalPlan.insurantProductList[0].productList[0].payModeName || "",
					"sheBao": proposalPlan.insurantProductList[0].productList[0].shebao || "",
					"piece": proposalPlan.insurantProductList[0].productList[0].piece,
					"zeRen5": proposalPlan.insurantProductList[0].productList[0].zeren5,
					"zerenList": proposalPlan.insurantProductList[0].productList[0].zerenList,
					"zeRenPremStr": proposalPlan.insurantProductList[0].productList[0].zeRenPremStr,
				}
				mainPolicyArr.push(mainPolicy)
				let extraRank = ''
				for(let i in proposalPlan.insurantProductList[0].productList[0].extraList) {
					if(proposalPlan.insurantProductList[0].productList[0].extraList[i].productCode == 'HMT039') {
						extraRank = proposalPlan.insurantProductList[0].productList[0].extraList[i].rankName
					} else {
						extraRank = ''
					}
					extraPolicy = {
						"isMaster": "",
						"seqNumber": i,
						"prodName": proposalPlan.insurantProductList[0].productList[0].extraList[i].productName + "" + extraRank,
						"prodCode": proposalPlan.insurantProductList[0].productList[0].extraList[i].productCode,
						"payYear": proposalPlan.insurantProductList[0].productList[0].extraList[i].payPeriod || "",
						"payYearName": proposalPlan.insurantProductList[0].productList[0].extraList[i].payPeriodName || "",
						"insureYear": proposalPlan.insurantProductList[0].productList[0].extraList[i].policyPeriod || "",
						"insureYearName": proposalPlan.insurantProductList[0].productList[0].extraList[i].policyPeriodName || "",
						"minPlanPrem": proposalPlan.insurantProductList[0].productList[0].extraList[i].premiumDes,
						"amnt": proposalPlan.insurantProductList[0].productList[0].extraList[i].amount,
						"prem": proposalPlan.insurantProductList[0].productList[0].extraList[i].premiumDes,
						"bonusGetMode": "",
						"addList": proposalPlan.insurantProductList[0].productList[0].extraList[i].addList,
						"drawList": proposalPlan.insurantProductList[0].productList[0].extraList[i].drawList,
						"getYear": proposalPlan.insurantProductList[0].productList[0].extraList[i].drawAge || "",
						"getYearsMQ": "",
						"rank": proposalPlan.insurantProductList[0].productList[0].extraList[i].rank || "",
						"getDutyKind": proposalPlan.insurantProductList[0].productList[0].extraList[i].drawFreq || "",
						"getYears": proposalPlan.insurantProductList[0].productList[0].extraList[i].drawMode || "",
						"autoPayFlag": "",
						"piece": proposalPlan.insurantProductList[0].productList[0].extraList[i].piece || "",
						"payIntv": proposalPlan.insurantProductList[0].productList[0].extraList[i].payMode || "",
						"payIntvName": proposalPlan.insurantProductList[0].productList[0].extraList[i].payModeName || "",
						"sheBao": proposalPlan.insurantProductList[0].productList[0].extraList[i].shebao,
						"isAutoXubao": proposalPlan.insurantProductList[0].productList[0].extraList[i].autoXubao,
						"zeRen5": proposalPlan.insurantProductList[0].productList[0].extraList[i].zeren5,
						"zerenList": proposalPlan.insurantProductList[0].productList[0].extraList[i].zerenList,
						"zeRenPremStr": proposalPlan.insurantProductList[0].productList[0].extraList[i].zeRenPremStr
					}
					if(proposalPlan.insurantProductList[0].productList[0].extraList[i].shebao != undefined && proposalPlan.insurantProductList[0].productList[0].extraList[i].shebao != '') {
						firstIsHasInsurance = proposalPlan.insurantProductList[0].productList[0].extraList[i].shebao
					}
					extraPolicyArr.push(extraPolicy)
				}
				policy = mainPolicyArr.concat(extraPolicyArr)
				/*================================以下为其他被保人=====================================*/
				let otherInsurantList = proposalPlan.insurantProductList[0].otherInsurantList
				let otherInsurant = [],
					otherInsurant_info = {},
					otherInsurant_extra = {}
				if(otherInsurantList.length > 0) {
					for(let i in otherInsurantList) {
						let otherIsHasInsurance = ''
						otherInsurant_info = {
							"isHasInsurance": otherIsHasInsurance,
							"products": {
								"prodCount": 0,
								"product": []
							}
						}
						utils.common.customerConvertInPlanToPolicy("INS", otherInsurant_info, otherInsurantList[i].insurant)
						if(otherInsurantList[i].extraList.length > 0) {
							for(let j in otherInsurantList[i].extraList) {
								let extraRank
								if(otherInsurantList[i].extraList[j].productCode == 'HMT039') {
									extraRank = otherInsurantList[i].extraList[j].productName + otherInsurantList[i].extraList[j].rankName
								} else {
									extraRank = otherInsurantList[i].extraList[j].productName
								}
								otherInsurant_extra = {
									"isMaster": '',
									"seqNumber": i,
									"prodName": extraRank,
									"prodCode": otherInsurantList[i].extraList[j].productCode,
									"payYear": otherInsurantList[i].extraList[j].payPeriod || '',
									"payYearName": otherInsurantList[i].extraList[j].payPeriodName || '',
									"insureYear": otherInsurantList[i].extraList[j].policyPeriod || '',
									"insureYearName": otherInsurantList[i].extraList[j].policyPeriodName || '',
									"minPlanPrem": otherInsurantList[i].extraList[j].premiumDes,
									"amnt": otherInsurantList[i].extraList[j].amount,
									"prem": otherInsurantList[i].extraList[j].premiumDes,
									"bonusGetMode": '',
									"addList": otherInsurantList[i].extraList[j].addList,
									"drawList": otherInsurantList[i].extraList[j].drawList,
									"getYear": otherInsurantList[i].extraList[j].drawAge || '',
									"getYearsMQ": '',
									"rank": otherInsurantList[i].extraList[j].rank || '',
									"getDutyKind": otherInsurantList[i].extraList[j].drawFreq || '',
									"getYears": otherInsurantList[i].extraList[j].drawMode || '',
									"autoPayFlag": '',
									"piece": otherInsurantList[i].extraList[j].piece || '',
									"payIntv": otherInsurantList[i].extraList[j].payMode || '',
									"payIntvName": otherInsurantList[i].extraList[j].payModeName || '',
									"sheBao": otherInsurantList[i].extraList[j].shebao,
									"zeRen5": otherInsurantList[i].extraList[j].zeren5,
									"zerenList": otherInsurantList[i].extraList[j].zerenList,
									"zeRenPremStr": otherInsurantList[i].extraList[j].zeRenPremStr
								}
								if(otherInsurantList[i].extraList[j].shebao != undefined && otherInsurantList[i].extraList[j].shebao != '') {
									otherIsHasInsurance = otherInsurantList[i].extraList[j].shebao
								}
								otherInsurant_info.products.product.push(otherInsurant_extra)
								otherInsurant_info.products.prodCount++
							}
						}
						otherInsurant_info.isHasInsurance = otherIsHasInsurance
						otherInsurant.push(otherInsurant_info)
					}
				}
				console.log('=================其他被保人新=======otherInsurant', otherInsurant)
				let appnt = {}
				utils.common.customerConvertInPlanToPolicy("APP", appnt, this.holder)
				let firstInsurant = {
					"isHasInsurance": firstIsHasInsurance,
					"products": {
						"prodCount": policy.length.toString(),
						"product": policy
					}
				}
				utils.common.customerConvertInPlanToPolicy("INS", firstInsurant, this.insurant)
				let payInfo = {
					"bankAccName": "",
					"bankAccNo": this.payInfo.bankAccNo,
					"bankCode": this.payInfo.bankCode,
					"newPayMode": "",
					"payMode": "",
					"planSumPremL": "",
					"rnewFlag": "",
					"sumAmntL": this.totalAmount,
					"sumPremL": this.totalPremium
				}

				utils.common.payInfoConvertInPolicy(payInfo, this.holder.payInfo)
				if(this.insurant.relationNew == '00') {
					utils.common.payInfoConvertInPolicy(payInfo, this.insurant.payInfo)
				}
				this.otherInsurantList.forEach(item => {
					if(item.insurant.relationNew == '00') {
						utils.common.payInfoConvertInPolicy(payInfo, item.insurant.payInfo)
					}
				})
				let requ = {
					"policy": {
						"agentInfo": {
							"agentCode": utils.cache.get('personsal').agentCode,
							"branchtype": utils.cache.get('personsal').channel,
						},
						"deviceNo": "",
						"substepNo": "1",
						"orderCode": this.planId,
						"custInfo": {
							"appnt": appnt,
							"insurants": {
								"firstInsurant": firstInsurant,
								"otherInsurant": {
									"insCount": otherInsurant.length.toString(),
									"insurant": otherInsurant
								}
							},
						},
						"payInfo": payInfo,
						"navigationList": this.navigationList
					}
				}
				let mainPayYear = ""
				for(let item of requ.policy.custInfo.insurants.firstInsurant.products.product) {
					if(item.isMaster == "1") {
						if(item.getDutyKindName == "趸领") {
							item.getDutyKindName = "0"
						} else if(item.getDutyKindName == "月领") {
							item.getDutyKindName = "1"
						} else if(item.getDutyKindName == "年领") {
							item.getDutyKindName = "12"
						}
						mainPayYear = item.payYear
					}
					if(item.prodCode == "HDT042" || item.prodCode == "HDT044" || item.prodCode == "HCT021") {
						if(mainPayYear.indexOf("term_") != -1) {
							item.payYearName = (mainPayYear.replace("term_", "") - 1) + "年"
							//item.insureYearName = mainPayYear.replace("term_", "")+"年"
							item.insureYearName = "保终身"
						}
					}
				}
				for(let item of requ.policy.custInfo.insurants.otherInsurant.insurant) {
					for(let j in item.products.product) {
						if(item.products.product[j].prodCode == "HDT042" || item.products.product[j].prodCode == "HDT044" || item.products.product[j].prodCode == "HCT021") {
							item.products.product[j].payYearName = (mainPayYear.replace("term_", "") - 1) + "年"
							item.products.product[j].insureYearName = "保终身"
						}
					}
				}
				return requ
			},
		}
	}
</script>
<style lang="scss">
	.main-contents {
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
	}
	
	div ::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
	
	.extras input::-webkit-input-placeholder {
		color: #FEB101;
	}
</style>
<style lang="scss" scoped type="text/css">
	.isPc {
		margin-top: 45px;
	}
	
	.tiaokuan-item {
		height: auto;
		line-height: 1.3;
		text-align: left;
	}
	
	.main-contents {
		div.kexuanList {
			box-shadow: 0 0 10px #ccc;
			border-radius: 5px;
			.title {
				height: 45px;
				line-height: 45px;
				background: #FEB101;
				color: #fff;
				font-size: 14px;
				padding: 0 10px;
			}
			.content {
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
				div {
					width: 90%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					p {
						height: 30px;
						line-height: 30px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					p+p {
						height: 20px;
						line-height: 20px;
						padding-left: 20px;
						color: #FEB101;
					}
				}
				.fa-trash-o {
					line-height: 60px;
					font-size: 22px;
					color: #FEB101;
				}
				.gray {
					color: #bbb;
				}
			}
		}
	}
	
	.mint-popup {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	
	.additional_extraEditList {
		.eject-contents {
			width: 100%;
			background: #fff;
			position: absolute;
			top: 48px;
			li {
				width: 100%;
				min-height: 50px;
				padding: 0 10px;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1px solid #EFEFEF;
				box-sizing: border-box;
				overflow: hidden;
				color: #ccc;
				font-size: 14px;
				.fa {
					font-size: 18px;
					color: #ccc;
					line-height: 50px;
				}
				input,
				label input {
					text-align: left !important;
				}
			}
			li>p:first-child {
				color: #333;
				width: 35%;
			}
			li>p+label,
			li>p+span,
			li>div {
				width: 65%;
				display: flex;
				justify-content: space-between;
				color: #ccc;
				font-size: 14px;
			}
			li.border_top {
				border-top: 1px solid #bbb;
			}
			li.border_bottom {
				border-bottom: 3px solid #bbb;
			}
			li.border_none {
				border-bottom: none;
				color: #FDB205;
				justify-content: center;
			}
			.btn {
				width: 100%;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 5%;
				margin: 60px 0 50px;
				p {
					width: 40%;
					height: 45px;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #FEB101;
					color: #fff;
					font-size: 14px;
					border-radius: 3px;
				}
			}
		}
	}
	
	.split-border {
		height: 9px;
		background: rgba(245, 245, 245, 1);
	}
	
	.main-contents {
		-webkit-overflow-scrolling: auto !important;
	}
</style>