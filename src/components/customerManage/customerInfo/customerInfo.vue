<template>
	<div>
		<div v-if="occupationValue.isopen">
			<OccupationSearch  v-model="occupationValue"></OccupationSearch>
		</div>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue" @click=""></IDCardScanning>
		<div v-show="contentIsOpen">
			<Headerbtns :title="page_title">
				<div slot="left" class="back" @click="left">
					<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
				</div>
			</Headerbtns>
			<div class="details" style="background: #F4F4F4;width: 100%;">
				<div style="height: 13px;"></div>
				<div style="background: #fff;" v-for="(item,index) in familyListList">
					<div>
						<div class="cerinfo">
							<div class="flexs">
								<div>{{item.name}}</div>
								<div style="margin-left: 3%;background: #EFEFEF;border-radius: 20px;padding: 0 2%;color: #999;font-size: 12px;height: 18px;line-height: 18px;">{{item.emergencyContactRelation | ralationCustomerFilter}}</div>
							</div>
							<div class="flexs flex" style="color: #999;margin-top:2%;">
								<div style="width: 85%;">
									<span style="font-size: 12px;">证件号码</span>
									<span style="font-size: 12px;">{{item.certificateNo}}</span>
								</div>
								<!--<div style="width: 14px;height: 14px;">
									<img src="static/img/customerManage/write.png" alt="" style="width: 100%;height: 100%;"/>
								</div>-->
								<div style="width: 14px;height: 14px;" v-if="item.emergencyContactRelation != '本人'" @click="del(item,item.infoId,index)">
									<img src="static/img/customerManage/del.png" alt="" style="width: 100%;height: 100%;" />
								</div>
							</div>
						</div>
						<div style="height: 9px;background: #F4F4F4;"></div>
					</div>
					<div v-if="infoIdMember==item.infoId">
						<div>
							<div class="info flexs flex" v-if="item.emergencyContactRelation != '本人'">
								<div class="info-left">关系</div>
								<div class="flexs flex nation">
									<p class="info-size">{{user.relation | ralationCustomerFilter}}</p>
									<picker v-model="user.relation" :values="user.relation" :items="dict.relationList" code="code" text="text"></picker>
								</div>
								<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
							</div>
							<div class="info" v-if="user.memberType!='1'">
								<div class="flexs">
									<div class="info-left">姓名</div>
									<input class="info-size" type="text" placeholder="请输入姓名" v-model="user.name" v-support-letter-chinese maxlength="15"/>
								</div>
							</div>
							<div class="info" v-if="user.memberType=='1'">
								<div class="flexs">
									<div class="info-left">姓名</div>
									<p class="info-size" style="color: #bbb;">{{user.name}}</p>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left">手机号码</div>
									<input class="info-size" type="text" placeholder="请输入手机号码" v-model="user.phone" maxlength="11"
									 v-support-number />
								</div>
							</div>
							<div class="info" v-if="user.memberType!='1'">
								<div class="flexs flex">
									<div class="info-left">证件类型</div>
									<div class="flexs flex type">
										<p class="info-size">{{user.idType | Notype}}</p>
										<picker v-model="user.idType" :values="user.idType" :items="dict.cardTypeList" code="code" text="text"
										 @change="changeIdType()"></picker>
									</div>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
									<div style="margin-left: 2%;width: 16px;height: 12px;">
										<img src="static/img/policy/icon_camera.png" alt="" width="19" height="19" @click="cardScanning()" style=" position:relative;top:-3px;"/>
									</div>
								</div>
							</div>
							<div class="info" v-if="user.memberType=='1'">
								<div class="flexs flex">
									<div class="info-left">证件类型</div>
									<div class="flexs flex type">
										<p class="info-size" style="color: #bbb;">{{user.idType | Notype}}</p>
									</div>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
									<div style="margin-left: 2%;width: 16px;height: 12px;line-height: 15px;">
										<img src="static/img/customerManage/cer.png" alt="" style="width: 100%;height: 100%;" />
									</div>
								</div>
							</div>
							<div class="info" v-if="user.memberType!='1'">
								<div class="flexs">
									<div class="info-left">证件号码</div>
									<input class="info-size" type="text" placeholder="请输入证件号码" v-filterLetterNumber v-model="user.cerId" />
								</div>
							</div>
							<div class="info" v-if="user.memberType=='1'">
								<div class="flexs">
									<div class="info-left">证件号码</div>
									<p class="info-size" style="color: #bbb">{{user.cerId}}</p>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left">证件有效起期</div>
									<div class="flexs flex type">
										<p :class="user.startDay=='' || user.startDay==undefined ? 'grun':'black'" style="font-size: 14px;">{{user.startDay=='' || user.startDay==undefined ?"请输入证件有效起期":user.startDay}}</p>
										<date-picker :defaultTimeYear="defaultTime" :default-text="'请输入证件有效起期'" v-model="user.startDay" style="position: absolute;right: 0;opacity: 0;width: 70%;"></date-picker>
									</div>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left">证件有效止期</div>
									<div class="flexs flex" v-if="user.idType!='20'&&user.idType!='12'">
										<p>
											<input type="checkbox" v-model="toggle.appntIdExpDateLong" @change="changeIdExpDateLong()" />
											<span class="info-size">长期有效</span>
										</p>
										<p class="type">
											<p :class="user.endDay=='' || user.endDay==undefined ? 'grun':'black'" style="font-size: 14px;">{{user.endDay=='' || user.endDay==undefined ?"请输入证件有效起期":user.endDay}}</p>
											<date-picker v-model="user.endDay" v-show="!toggle.appntIdExpDateLong" :defaultTimeYear="defaultTime" style="position: absolute;right: 0;opacity: 0;width: 44%;"></date-picker>
										</p>
										<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
									</div>
									<div class="flexs flex" v-if="user.idType=='20'||user.idType=='12'">
										<p>
											<input type="checkbox" v-model="toggle.appntIdExpDateLong" @change="changeIdExpDateLong()" disabled="disabled" />
											<span class="info-size">长期有效</span>
										</p>
										<p class="type">
											<p class="info-size" style="color: #bbb;">{{user.endDay}}</p>
										</p>
										<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
									</div>
								</div>
							</div>
							<div class="info" v-if="user.memberType!='1'">
								<!---->
								<div class="flexs">
									<div class="info-left">性别</div>
									<input id="insure_gender_male" name="gender" type="radio" value="1" style="width: 16px;height: 16px;border-radius: 8px;float: none;"
									 v-model="user.sex" />
									<label for="insure_gender_male" style="margin-bottom: -2px;"></label><label class="info-size" for="insure_gender_male"
									 style="padding-right: 30px;padding-top: -10px;margin-left: 3%;">男</label>
									<input id="insure_gender_female" name="gender" type="radio" value="2" style="width: 16px;height: 16px;border-radius: 8px;float: none;"
									 v-model="user.sex" />
									<label for="insure_gender_female" style="margin-left: 10px;margin-bottom: -2px;"></label><label class="info-size"
									 for="insure_gender_female" style="margin-left: 3%;">女</label>
								</div>
							</div>
							<div class="info" v-if="user.memberType=='1'">
								<div class="flexs">
									<div class="info-left">性别</div>
									<input id="insure_gender_male" name="gender" type="radio" value="1" style="width: 16px;height: 16px;border-radius: 8px;float: none;"
									 v-model="user.sex" disabled="disabled" />
									<label for="insure_gender_male" style="margin-bottom: -2px;"></label><label class="info-size" for="insure_gender_male"
									 style="padding-right: 30px;padding-top: -10px;margin-left: 3%;">男</label>
									<input id="insure_gender_female" name="gender" type="radio" value="2" style="width: 16px;height: 16px;border-radius: 8px;float: none;"
									 v-model="user.sex" disabled="disabled" />
									<label for="insure_gender_female" style="margin-left: 10px;margin-bottom: -2px;"></label><label class="info-size"
									 for="insure_gender_female" style="margin-left: 3%;">女</label>
								</div>
							</div>
							<div class="info" v-if="user.memberType!='1'">
								<div class="flexs">
									<div class="info-left">出生日期</div>
									<div class="flexs flex type">
										<p class="info-size">{{user.birthday}}</p>
										<date-picker v-model="user.birthday" style="position: absolute;right: 0;opacity: 0;width: 70%;"
										 :defaultTimeYear="defaultTime"></date-picker>
									</div>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								</div>
							</div>
							<div class="info" v-if="user.memberType=='1'">
								<div class="flexs">
									<div class="info-left">出生日期</div>
									<div class="flexs flex type">
										<p class="info-size" style="color: #bbb;">{{user.birthday}}</p>
									</div>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left">职业</div>
									<div class="flexs flex" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 40%;"
									 @click="occupationSearch()">
										<p style="text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 80%;">
											<span v-show="user.appOccupation==''" class="info-size" style="color: #9F9F9F;">请选择职业</span>
											<span v-show="user.appOccupation!=''" class="info-size">{{user.appOccupation}}</span>
										</p>
										<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
									</div>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left">国籍</div>
									<div class="flexs flex nation">
										<p class="info-size">{{user.nativePlace}}</p>
										<picker :values="user.nativePlace" v-model="user.nativePlace" :items="dict.nationalList" code="code" text="text"></picker>
									</div>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left">婚姻</div>
									<div class="flexs flex nation">
										<p :class="user.marriage=='' || user.marriage==undefined ? 'grun':'black'" style="font-size: 14px;">{{user.marriage==''||user.marriage==undefined?'请选择婚姻':user.marriage}}</p>
										<picker :values="user.marriage" v-model="user.marriage" :items="dict.marriageList" code="code" text="text"></picker>
									</div>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left">年收入</div>
									<div class="flexs flex" style="width:32%;flex:none;">
										<input class="info-size" type="number" placeholder="请输入年收入" v-model="user.annualIncome" style="width:100%;" />
									</div>
									<div>万元</div>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left">工作单位</div>
									<div class="flexs flex">
										<input class="info-size" type="text" placeholder="请输入工作单位" v-model="user.workUnit" />
									</div>
								</div>
							</div>
							<div class="info">
								<div class="flexs">
									<div class="info-left" style="width:80%;">目前是否享有城镇职工医疗保险</div>
									<div class="flexs flex nation">
										<p :class="user.medical=='' || user.medical==undefined ? 'grun':'black'" style="font-size: 14px;">{{user.medical == ''||user.medical==undefined?'请选择':user.medical}}</p>
										<picker defaultText="请选择" :values="user.medical" v-model="user.medical" :items="medicalList" code="code" text="text"></picker>
									</div>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								</div>
							</div>
							<div class="content">
								<div class="item_title">
									<p>
										个人税收居民身份声明
									</p>
									<i class="fa fa-question-circle-o" @click="showHint"></i>
									<i class="fa fa-angle-double-up" @click="toggle.showRevenue = !toggle.showRevenue" :style="{'-webkit-transform':toggle.showRevenue?'rotate(180deg)':''}"></i>
								</div>
								<div v-show="toggle.showRevenue">
									<div class="revenueItem">
										<p @change="changeRevenueItemType"><input type="radio" name="inmate" class="inmate" v-model="user.appntTaxInfo.taxIdentity"
											 value="1" />仅为中国居民</p>
										<p @change="changeRevenueItemType"><input type="radio" name="inmate" class="inmate" v-model="user.appntTaxInfo.taxIdentity"
											 value="2" />仅为非居民</p>
									</div>
									<div class="revenueItem">
										<p @change="changeRevenueItemType"><input type="radio" name="inmate" class="inmate" v-model="user.appntTaxInfo.taxIdentity"
											 value="3" />既是中国税收居民又是其他国家税收居民</p>
									</div>
									<div v-show="toggle.showRevenueDetail">
										<div class="revenueItem">
											<p>出生地:</p>
											<p>
												<picker v-model="user.appntTaxInfo.birthCountry" :values="user.appntTaxInfo.birthCountry" :items="dict.nationalList"
												 :default-text="'请输入国籍'" code="code" text="text"></picker>
											</p>
										</div>
										<div class="revenueItem">
											<p>省份:</p>
											<input type="text" v-model="user.appntTaxInfo.birthProvince" placeholder="请输入省份" />
										</div>
										<div class="revenueItem">
											<p>市区:</p>
											<input type="text" v-model="user.appntTaxInfo.birthCity" placeholder="请输入市区" />
										</div>
									</div>
									<div v-show="toggle.showRevenueDetail" v-for="(item,index) in user.appntTaxInfo.taxInformation">
										<div class="revenue_item_title">
											<p>税收信息</p>
											<i class="fa fa-close" v-show="user.appntTaxInfo.taxInformation.length > 1" @click="removeRevenue(index)"></i>
										</div>
										<div class="revenueItem">
											<p class="revenueItem-left">税收居民国(地区):</p>
											<p class="revenueItem-right">
												<picker :values="item.taxArea" v-model="item.taxArea" :items="dict.nationalList" :default-text="'税收居民国'"
												 code="code" text="text"></picker>
											</p>
										</div>
										<div class="revenueItem">
											<p class="revenueItem-left">纳税人识别号TIN:</p>
											<input type="text" v-model="item.tin" placeholder="请输入" class="revenueItem-right" />
										</div>
										<div class="revenueItem">
											<p>若无法提供纳税人识别号,请选择原因A或者B</p>
										</div>
										<div class="revenueItem">
											<p @change="changeRevenueReason(1,index)"><input type="checkbox" name="revenueReason" :id="index+'checkboxA'"
												 value="A" />A</p>
											<p @change="changeRevenueReason(2,index)"><input type="checkbox" name="revenueReason" :id="index+'checkboxB'"
												 value="B" />B</p>
											<p><input type="text" maxlength="150" v-model="item.reasonMessage" placeholder="请输入原因"></p>
										</div>
									</div>
									<div v-show="toggle.showRevenueDetail">
										<p class="revenueItem" v-show="user.appntTaxInfo.taxInformation.length < 5" @click="addRevenue">+添加纳税信息</p>
										<div class="revenueItem">
											<p>★原因A:居民国(地区)不发放纳税人识别号</p>
										</div>
										<div class="revenueItem">
											<p>★原因B:账户持有人未能取得纳税人识别号</p>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div>
									<div style="height: 45px;line-height: 45px;padding-left: 3%;font-size: 12px;color: #9F9F9F;background: #F4F4F4;">客户联系地址</div>
									<div style="">
										<div style="background: #fff;display: flex;flex-wrap: wrap;width: 100%;border-bottom: 1px solid #ccc;padding: 2% 0;line-height: 1.5rem;"
										 v-for="(items,index) in addressInfo" v-if="items.province!=''||items.city!=''||items.county!=''||items.town!=''||items.village!=''||items.address!=''||items.zipNo!=''||items.email!=''">
											<div style="width: 85%;text-align: left;margin-left: 2%;">
												<div class="info-size">{{items.province|getProvinceText}}{{items.city|getCityText}}{{items.county}}</div>
												<div class="info-size">{{items.town}}{{items.village}}{{items.address}}</div>
												<div class="info-size">{{items.zipNo}}</div>
												<div>
													<div class="info-size">{{items.email}}</div>
												</div>
											</div>
											<div style="align-items: flex-end;padding-bottom: 3%;" class="flexs">
												<div style="width: 14px;height: 14px;margin-right: 10px;" @click="addressEdit(items,items.id)">
													<img src="static/img/customerManage/write.png" alt="" style="width: 100%;height: 100%;" />
												</div>
												<div style="width: 14px;height: 14px;" @click="addressDel(items,items.id,index)">
													<img src="static/img/customerManage/del.png" alt="" style="width: 100%;height: 100%;" />
												</div>
											</div>
										</div>
									</div>
									<div style="background: #fff;line-height: 2.5rem;" @click="address()">
										<div class="flexs flex" style="justify-content: center">
											<img src="static/img/customerManage/add.png" alt="" style="width: 16px;height: 16px;margin-right: 5px;" />
											<div style="color: #FEBA00;" class="info-size">新增客户地址</div>
										</div>
									</div>
								</div>
								<div>
									<div style="height: 45px;line-height: 45px;padding-left: 3%;font-size: 12px;color: #9F9F9F;background: #F4F4F4;">银行账户信息</div>
									<div style="background: #fff;line-height: 1.8rem;">
										<div class="flexs flex" v-for="(itt,index) in bankInfo">
											<div class="info-size" style="margin-left: 2%;justify-content: flex-start;width: 30%;">{{itt.bankName =="光大银行"?"中国光大银行":itt.bankName}}</div>
											<div class="info-size" style="justify-content: flex-start;width: 60%;">{{itt.bankAccount | dataCover(4,4)}}</div>
											<div class="flexs" style="margin-right: 3%;align-items: flex-end;padding-bottom: 4%;justify-content: flex-end">
												<div style="width: 14px;height: 14px;margin-right: 10px;" @click="bankEdit(itt,itt.id)">
													<img src="static/img/customerManage/write.png" alt="" style="width: 100%;height: 100%;" />
												</div>
												<div style="width: 14px;height: 14px;" @click="bankDel(itt,itt.id)">
													<img src="static/img/customerManage/del.png" alt="" style="width: 100%;height: 100%;" />
												</div>
											</div>
										</div>
									</div>
									<div style="background: #fff;line-height: 2.5rem;" @click="bank()">
										<div class="flexs flex" style="justify-content: center">
											<img src="static/img/customerManage/add.png" alt="" style="width: 16px;height: 16px;margin-right: 5px;" />
											<div style="color: #FEBA00;" class="info-size">新增银行信息</div>
										</div>
									</div>
								</div>
								<div style="height: 20px;background: #F4F4F4;"></div>
								<div class="confirm" @click="next(item)">
									<div>
										保存
									</div>
								</div>
								<div style="height: 10px;background: #F4F4F4;"></div>
							</div>
						</div>
					</div>
				</div>

				<p>
					<Alert ref="showalert"></Alert>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import datePicker from '@/components/common/DatePicker.vue'
	import picker from '../../common/Picker.vue'
	import OccupationSearch from '../../common/OccupationSearch.vue'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
	import Alert from '@/components/policy/common/alert'
	
	import provinceList from '../../../../static/dict/province_sunlife.json'
	import cityList from '../../../../static/dict/city_sunlife.json'
	import nationalList from '../../../assets/dict/national_sunlife.json'
	import marriageList from '../../../../static/dict/marriage_sunlife.json'
	import cardTypeList from '../../../assets/dict/card_type_sunlife.json'
	import relationList from '../../../../static/dict/relation_customer_manage.json'
	const fillZero = value => {
		if(('' + value).length == 1) {
			value = '0' + value
		}
		return value
	}
	export default {
		name: 'customerInfo',
		components: {
			Headerbtns,provinceList,cityList,datePicker,picker,OccupationSearch,Alert,IDCardScanning
		},
		data() {
			return {
				page_title: '基本信息',
				defaultTime: '30',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				infoId:'',
				user:{
					memberType:'',
					name:'',
					phone:'',
					cerId:'',
					birthday:'',
					sex:'',
					relation:'',
					occupationCode: '',//职业代码
					occupationType: '',//职业等级
					appOccupation: '',//职业描述
					nativePlace:'',//国籍
					marriage:'',//婚姻
					medical:'',//是否医保
					revenue:'',//税收
					annualIncome:'',//年收入
					workUnit:'',//工作单位
					idType:'11',//证件类型
					startDay:'',
					endDay:'',
					appntTaxInfo: { //税收
								taxIdentity: "", //税收居民身份
								birthCountry: "", //出生地国家
								birthProvince: "", //出生地省
								birthCity: "", //出生地市
//								taxInfoList: {
									taxInformation: [{
										taxArea: "", //税收居民国(地区)
										tin: "", //居民国(地区)纳税人编号
										reasonCheck: "", //无法提供纳税人编号原因
										reasonMessage: "" //原因描述
									}]
//								}
							}
				},
				memberLnfo:'',
				bankInfo:'',
				addressInfo:'',
				dict: {
					nationalList: '',
				},
				dict: {
					marriageList: '',
					relationList:'',
				},
				dict: {
					cardTypeList: '',
				},
				medicalList:['有','没有'],
				revenueList:['仅为中国公民','仅为非居民','既是中国税收居民又是其他国家税收居民'],
				occupationValue: {
					isopen: false,
					type: '',
					occItem: ''
				},
				toggle: {
					showAppnt: true,
					showRevenue: true,
					showRevenueDetail: false,
					showProductInfo: true,
					appntSexChoice: true,
					appntIdExpDateLong: false,
					isPaperPrint: false,
				},
				cardScanningValue: {
					isopen: false,
					type: '',
					cusItem: {}
				},
				deleteItem:'',
				itemIndex:'',
				itemId:'',
				familyListList:'',
				infoIdMember:'',//新增家庭成员infoId
				customerSex:'',
				customerName:'',
				edit:'',
				id:'',
				code:'',
			}
		},
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height', this.media.container(this.screenHeight, 0))
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.infoId) {
					this.infoId = queryParams.infoId;
				}
				if(queryParams.infoIdMember) {
					this.infoIdMember = queryParams.infoIdMember;
				}
				if(queryParams.edit) {
					this.edit = queryParams.edit;
				}
			}
			console.log(this.infoId)
			console.log(this.infoIdMember)
			let arr = []
			nationalList.national.item.forEach(item => {
				let newObject = {
					code:item.code,
					text:item.text
				}
				arr.push(newObject)
			})
			this.dict.nationalList = arr
			console.log(marriageList)
			let marry = []
			marriageList.marriage.item.forEach(item => {
				let newObject = {
					code:item.code,
					text:item.text
				}
				marry.push(newObject)
			})
			this.dict.marriageList = marry
			let cardIdType = []
			cardTypeList.dict_cardtype.item.forEach(item => {
				let newObject = {
					code:item.code,
					text:item.text
				}
				cardIdType.push(newObject)
			})
			this.dict.cardTypeList = cardIdType
			let relation = []
			relationList.relation.item.forEach(item => {
				let newObject = {
					code:item.code,
					text:item.text
				}
				relation.push(newObject)
			})
			this.dict.relationList = relation
			this.memberInfo()
			this.infomation()
		},
		filters:{
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
		watch:{
			occupationIsOpen(val, oldval) {
				console.log(val)
				console.log(oldval)
				if(!val) {
					if(this.occupationValue.occItem != undefined) {
						this.user.appOccupation = this.occupationValue.occItem.descr
						this.user.occupationCode = this.occupationValue.occItem.code
						this.user.occupationType = this.occupationValue.occItem.level
					}
				}
			},
			//监听OCR人脸识别组件的变化
			cardScannIsOpen(val, oldval) {
				if(!val) {
					console.log(this.cardScanningValue)
					if(this.cardScanningValue.cusItem != undefined && this.cardScanningValue.cusItem.name != undefined) {
//						this.policy.custInfo.appnt.id = this.cardScanningValue.id
						this.user.name = this.cardScanningValue.cusItem.name
						this.user.idType = "11"
						this.user.cerId = this.cardScanningValue.cusItem.id_card_number
						this.user.startDay = this.cardScanningValue.cusItem.idStaDate
						this.user.endDay = this.cardScanningValue.cusItem.valid_date
						this.toggle.appntIdExpDateLong = (this.cardScanningValue.cusItem.valid_date == '2200-12-31') ? true : false
						this.user.sex = this.cardScanningValue.cusItem.gender
						console.log(222222)
						console.log(this.cardScanningValue.cusItem.gender)
						console.log('sex+',this.user.sex)
//						this.toggle.appntSexChoice = (this.cardScanningValue.cusItem.gender == '1') ? true : false
						this.user.birthday = this.cardScanningValue.cusItem.birthday
					}
				}
			},
			'user.nativePlace':function(value){
				this.dict.nationalList.forEach(item => {
					if(item.code==value){
						this.user.nativePlace=item.text
					}
				})
			},
			'user.marriage':function(value){
				this.dict.marriageList.forEach(item => {
					if(item.code==value){
						this.user.marriage=item.text
					}
				})
			},
			'user.birthday':function(val, oldval){
				let age=utils.valid.getAge(val)
				if(age<18){
					this.user.marriage=10
				}
				if(val != oldval){
					if(this.user.idType == '12'){
						this.user.startDay = val
						var date = this.idExpDateValid(this.user.birthday,16)
						console.log(date)
						this.$nextTick(()=>{
							this.user.endDay = date
						})
					}else if(this.user.idType  == '20'){
						this.user.startDay = val
						var date = this.idExpDateValid(this.user.birthday,3)
						this.$nextTick(()=>{
							this.user.endDay = date
						})
					}
				}
			},
			'user.cerId':function(val, oldval) {
				if(val!='' && oldval!=''){
					if(this.user.idType == '11'){
						let bir = val.substring(6,14)
						if(bir.length == '8'){
							this.$nextTick(()=>{
								console.log(bir)
								this.user.birthday = bir.substring(0,4)+"-"+bir.substring(4,6)+"-"+bir.substring(6,8)
							})
						}
						let sex = val.substring(16,17)
						if(sex.length == '1'){
							this.$nextTick(()=>{
								console.log(sex)
								this.user.sex = (sex % 2 == 0) ? "2" : "1"
							})
						}
					}
					if(val != oldval) {
						val = val.replace(/[x]/g, 'X')
						this.user.cerId=val
					}
				}
			},
			'user.medical':function(value){
				if(value=='有'){
					this.code='0'
				}else if(value=='没有'){
					this.code='1'
				}
			},
			'user.idType':function(val, oldval){
				if(val != oldval){
					console.log(val)
					if(val == '12'){
						if(this.user.birthday!=undefined && this.user.birthday !=""){
							this.user.startDay = this.user.birthday
							console.log(this.user.birthday)
							var date = this.idExpDateValid(this.user.birthday,16)
							console.log(date)
							this.$nextTick(()=>{
								this.user.endDay = date
							})
						}
					}else if(val == '20'){
						if(this.user.birthday!=undefined && this.user.birthday !=""){
							this.user.startDay = this.user.birthday
							var date = this.idExpDateValid(this.user.birthday,3)
							this.$nextTick(()=>{
								this.user.endDay = date
							})
						}
					}
				}
			},
			'user.startDay':function(val, oldval){
				if(val != oldval){
					if(this.user.idType  == '12'){
							var date = this.idExpDateValid(val,16)
							console.log(date)
							this.$nextTick(()=>{
								this.user.endDay = date
							})
					}else if(this.user.idType  == '20'){
							var date = this.idExpDateValid(val,3)
							this.$nextTick(()=>{
								this.user.endDay = date
							})
					}
				}
			},
		},
		computed: {
			occupationIsOpen() {
				return this.occupationValue.isopen
			},
			contentIsOpen() {
				if(this.occupationValue.isopen || this.cardScanningValue.isopen) {
					return false
				} else {
					return true
				}
			},
			cardScannIsOpen() {
				return this.cardScanningValue.isopen
				//				alert(this.cardScanningValue.isopen)
			},
		},
		methods: {
			left() {
				this.detailBack()
			},
			detailBack() {
                console.log(this.$route)
				this.go('/customer/customerList?infoId='+this.infoId)
			},
			idExpDateValid(idStaDate,year){
				let tempDate = new Date(idStaDate)
				let tempMonth = (tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
				let tempDay = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
				let isLeapYear = this.isLeapYear(tempDate.getFullYear() + Number(year))
				if(!isLeapYear && tempMonth == "02" && tempDay == "29") {
					tempDay = tempDay - 1
				}
				let tempBir = tempDate.getFullYear() + Number(year) + '-' + tempMonth + '-' + tempDay;
				return tempBir
			},
			isLeapYear(intYear) {
			    if (intYear % 100 == 0) {
			        if (intYear % 400 == 0) { return true; }
			    }
			    else {
			        if ((intYear % 4) == 0) { return true; }
			    }
			    return false;
			},
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			cardScanning() {
				this.cardScanningValue.isopen = !this.cardScanningValue.isopen
			},
			occupationSearch() {
				this.occupationValue.isopen = !this.occupationValue.isopen
			},
			changeIdType() {
				if(this.user.idType == '12' || this.user.idType == '20') {
					this.user.cerId = ''
				} else {
					this.user.cerId = ''
					this.user.startDay = ''
					this.toggle.appntIdExpDateLong = false
					this.user.endDay = ''
				}
			},
			changeIdExpDateLong() {
				if(this.toggle.appntIdExpDateLong) {
					this.user.endDay = '2200-12-31'
				}
			},
			showHint() {
				this.$refs.showalert.showMOdal("1、中国税收居民是指在中国境内有住所,或者无住所而在境内住满一年的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的,不扣减日数。临时离境,是指在一次纳税年度中一次不超过30日或者多次累计不超过90日的离境。<br/>2、非居民是指中国税收居民以外的个人。<br/>3、其他国家(地区)税收居民身份认定规则及纳税人识别号相关信息请参见国家税务总局网站http://www.chinatax.gov.cn/aeoi_index.html。")
			},
			changeRevenueItemType() {
				let val = this.user.appntTaxInfo.taxIdentity
				if(val == '1') {
					this.toggle.showRevenueDetail = false
					this.user.appntTaxInfo.taxInformation = []
				} else if(val == '2') {
					this.toggle.showRevenueDetail = true
					this.addRevenue(1)
				} else if(val == '3') {
					this.toggle.showRevenueDetail = true
					this.addRevenue(2)
				}
			},
			addRevenue(index) {
				if(index == '1' || index == '2') {
					this.user.appntTaxInfo.birthCountry = ""
					this.user.appntTaxInfo.birthProvince = ""
					this.user.appntTaxInfo.birthCity = ""
					this.user.appntTaxInfo.taxInformation = []
					this.user.appntTaxInfo.taxInformation.push({
						reasonCheck: "",
						reasonMessage: "",
						taxArea: "",
						tin: ""
					})
					if(index == '2') {
						this.user.appntTaxInfo.taxInformation.push({
							reasonCheck: "",
							reasonMessage: "",
							taxArea: "",
							tin: ""
						})
					}
				} else {
					this.user.appntTaxInfo.taxInformation.push({
						reasonCheck: "",
						reasonMessage: "",
						taxArea: "",
						tin: ""
					})
				}
				console.log(this.user.appntTaxInfo)
			},
			removeRevenue(index) {
				this.user.appntTaxInfo.taxInformation.splice(index, 1)
			},
			changeRevenueReason(tag, index) {
				if(tag == 1) {
					var isChecked = ''
					isChecked = $("#" + index + "checkboxA").is(':checked')
					if(isChecked) {
						$("#" + index + "checkboxA").prop("checked", true);
						$("#" + index + "checkboxB").prop("checked", false);
						this.user.appntTaxInfo.taxInformation[index].reasonCheck = "A"
					} else {
						$("#" + index + "checkboxA").prop("checked", false);
						this.user.appntTaxInfo.taxInformation[index].reasonCheck = ""
					}
				} else if(tag == 2) {
					var isChecked = ''
					isChecked = $("#" + index + "checkboxB").is(':checked')
					if(isChecked) {
						$("#" + index + "checkboxA").prop("checked", false);
						$("#" + index + "checkboxB").prop("checked", true);
						this.user.appntTaxInfo.taxInformation[index].reasonCheck = "B"
					} else {
						$("#" + index + "checkboxB").prop("checked", false);
						this.user.appntTaxInfo.taxInformation[index].reasonCheck = ""
					}
				}
				console.log("税收识别选项===>" + index + "---" + this.user.appntTaxInfo.taxInformation[index].reasonCheck)
			},
			memberInfo(){
				let requ = {
					"data":{
						 "infoId":this.infoId,
						 "agentCode": utils.cache.get('personsal').agentCode,
					},
					"methodName": "customerFamilyList",
					"modelName": "customerManagementService"
				}
//			console.log(JSON.stringify(requ))
				utils.http.postFast('BusinessService', requ, (body) => {
					if(body.data.ResponseCode=='0'){
						this.familyListList=body.data.familyListList
						this.familyListList.forEach((items)=>{
							if(items.emergencyContactRelation=='本人'){
								this.customerSex=items.sex
								this.customerName=items.name
							}
						})
					}
				})
			},
			infomation(){
				let requ = {
						"data":{
        					  "requestOrder":"2",
        					  "infoId":this.infoIdMember,
						},
						"methodName": "customerInformation",
    					"modelName": "customerManagementService"
					}
				console.log(JSON.stringify(requ))
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode=='0'){
                            console.log("客户管理人的基本信息",body.data)
							this.memberLnfo=body.data.memberLnfo
							this.bankInfo=this.memberLnfo.bankAccounts
							this.addressInfo=this.memberLnfo.contactAddress
							this.user.name=this.memberLnfo.name
							this.user.phone=this.memberLnfo.mobilePhone
							this.user.cerId=this.memberLnfo.certificateNo
							this.user.idType=this.memberLnfo.certificateType
							this.user.birthday=this.memberLnfo.birthday
							this.user.sex=this.memberLnfo.sex
							this.user.occupationCode=this.memberLnfo.workType
							this.user.occupationType=this.memberLnfo.level
							this.user.appOccupation=this.memberLnfo.profession
							this.user.startDay=this.memberLnfo.validStartTime
							this.user.endDay=this.memberLnfo.validEndTime
							if(this.memberLnfo.validEndTime == '2200-12-31'){
								this.toggle.appntIdExpDateLong = true
							}
							this.user.relation=this.memberLnfo.emergencyContactRelation
							this.user.marriage=this.memberLnfo.marriage
							this.user.annualIncome=this.memberLnfo.annualIncome
							this.user.workUnit=this.memberLnfo.workUnit
							this.code=this.memberLnfo.isSocialInsurance
							this.user.memberType=this.memberLnfo.memberType
							if(this.memberLnfo.nationality){
								this.user.nativePlace=this.memberLnfo.nationality
								this.dict.nationalList.forEach(item => {
									if(item.code==this.user.nativePlace){
										this.user.nativePlace=item.text
									}
								})
							}else{
								this.user.nativePlace='中国'
							}
							if(this.code == '0') {
								this.user.medical = '有'
							} else if(this.code == '1') {
								this.user.medical = '没有'
							}
							if(this.memberLnfo.personalTax){
								this.user.appntTaxInfo=this.memberLnfo.personalTax
								this.toggle.showRevenueDetail = this.memberLnfo.personalTax.taxIdentity == "1" ? false : true
								let taxInfos = this.memberLnfo.personalTax.taxInformation
								if(taxInfos != undefined && taxInfos.length > 0) {
									this.$nextTick(() => {
										for(let index = 0; index < taxInfos.length; index++) {
											if(taxInfos[index].reasonCheck == "A") {
												$("#" + index + "checkboxA").prop("checked", true);
												$("#" + index + "checkboxB").prop("checked", false);
											} else if(taxInfos[index].reasonCheck == "B") {
												$("#" + index + "checkboxA").prop("checked", false);
												$("#" + index + "checkboxB").prop("checked", true);
											}
										}
									})
								}
							}
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
					})
			},
			address(){
				this.next(1)
//				this.go('/customer/customerInfoAddress?infoIdMember='+this.infoIdMember+'&infoId='+this.infoId)
			},
			bank(){
				this.next(2)
//				this.go('/customer/customerInfoBank?infoIdMember='+this.infoIdMember+'&infoId='+this.infoId)
			},
			//编辑
			addressEdit(items,id){
				this.id=id
				this.next(3)
//				this.go('/customer/customerInfoAddress?id='+this.id+'&infoId='+this.infoId+'&infoIdMember='+this.infoIdMember)
			},
			addressDel(items,id){
				this.itemIndex = id
				alert_n22.confirm('提示', '确定要删除该地址信息！', '确定','取消', (flag) => {
					this.addressYes()
				})
			},
			addressYes(){
				let requ = {
						"data":{
							 "id":this.itemIndex,
        					 "requestOrder":"3"
						},
						"methodName": "customerInformationDeletion",
    					"modelName": "customerManagementService"
					}
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode =='0'){
							this.addressInfo.splice(this.itemIndex, 1)
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
					})
			},
			//编辑
			bankEdit(item,id){
				this.id=id
				this.next(4)
//				this.go('/customer/customerInfoBank?id='+this.id+'&infoId='+this.infoId+'&infoIdMember='+this.infoIdMember)
			},
			bankDel(item,id){
				console.log(id)
				this.itemId = id
				alert_n22.confirm('提示', '确定要删除该银行信息！', '确定','取消', (flag) => {
					this.bankYes()
				})
			},
			bankYes(){
				let requ = {
						"data":{
							 "id":this.itemId,
        					 "requestOrder":"4"
						},
						"methodName": "customerInformationDeletion",
    					"modelName": "customerManagementService"
					}
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode =='0'){
							for(let i=0;i<this.bankInfo.length;i++){
								if(this.itemId == this.bankInfo[i].id){
									this.bankInfo.splice(i, 1)
								}
							}
							let newArr = this.bankInfo
							console.log(newArr)
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
					})
			},
			del(item,infoId,index){
				this.infoIdMember = infoId
				this.itemIndex = index
				alert_n22.confirm('提示', '只删除关系不对客户本身做操作，确定要删除？', '确定','取消', (flag) => {
					this.yes()
				})
			},
			yes(){
				let requ = {
						"data":{
							 "infoId":this.infoIdMember,
						},
						"methodName": "customerInformationDeletion",
    					"modelName": "customerManagementService"
					}
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode =='0'){
							this.familyListList.splice(this.itemIndex, 1)
							this.go('/customer/customerList?infoId='+this.infoId)
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
					})
			},
			appntTaxInfoCheck(appntTaxInfo) {
				console.log(1111)
				for(var i = 0; i < appntTaxInfo.taxInformation.length; i++) {
					let oldTaxInfo = appntTaxInfo.taxInformation[i]
					console.log(oldTaxInfo)
					for(var j = i + 1; j < appntTaxInfo.taxInformation.length; j++) {
						let nextTaxInfo = appntTaxInfo.taxInformation[j]
						console.log(nextTaxInfo)
						if(oldTaxInfo.taxArea != undefined && oldTaxInfo.taxArea != "") {
							if(nextTaxInfo.taxArea != undefined && nextTaxInfo.taxArea != "") {
								if(oldTaxInfo.taxArea == nextTaxInfo.taxArea) {
									return "投保人税收居民国（地区）填写错误，请正确填写。\n"
								}
							}
						}
						if(oldTaxInfo.tin != undefined && oldTaxInfo.tin != "") {
							if(nextTaxInfo.tin != undefined && nextTaxInfo.tin != "") {
								if(oldTaxInfo.tin == nextTaxInfo.tin) {
									return "投保人居民国（地区）纳税人识别号填写错误，请确认\n"
								}
							}
						}
					}
				}
			},
			checkAppntTaxInfo: function() {
				let appntTaxInfo = this.user.appntTaxInfo
				let isHaveCHN = false
				console.log(appntTaxInfo)
				let idType = this.user.idType
				if((idType == '11' || idType == '12') && appntTaxInfo.taxIdentity != '' && appntTaxInfo.taxIdentity != '1') {
					this.Aleart('投保人税收居民身份选择有误，请核实。')
					return false
				}
				if(appntTaxInfo.taxIdentity == "2") {
					if(idType!=''){
						if(idType == "11" || idType == "12") {
							this.Aleart("投保人税收居民身份选择有误，请核实。")
							return false
						}
					}
					if((appntTaxInfo.birthCountry == undefined || appntTaxInfo.birthCountry == "") &&
						(appntTaxInfo.birthProvince == undefined || appntTaxInfo.birthProvince == "") &&
						(appntTaxInfo.birthCity == undefined || appntTaxInfo.birthCity == "")) {
						this.Aleart("投保人出生地未填写，请正确填写。")
						return false
					}
					if(appntTaxInfo.birthCountry == undefined || appntTaxInfo.birthCountry == "") {
						this.Aleart("投保人出生地未填写，请正确填写。")
						return false
					}
					if((appntTaxInfo.birthProvince == undefined || appntTaxInfo.birthProvince == "") &&
						(appntTaxInfo.birthCity == undefined || appntTaxInfo.birthCity == "")) {
						this.Aleart("投保人出生地未填写不完整，请核实。")
						return false
					}
					let msg = this.appntTaxInfoCheck(appntTaxInfo)
					if(msg != undefined && msg != "") {
						this.Aleart(msg)
						return false
					}
					for(var i = 0; i < appntTaxInfo.taxInformation.length; i++) {
						let taxInfo = appntTaxInfo.taxInformation[i]
						if(taxInfo.taxArea == undefined || taxInfo.taxArea == "") {
							this.Aleart("投保人税收居民国（地区）未填写，请正确填写。")
							return false
						}
						if(taxInfo.taxArea == "CHN") {
							this.Aleart("投保人税收居民国（地区）应为非中国 。")
							return false
						}
						if((taxInfo.tin == undefined || taxInfo.tin == "") &&
							taxInfo.reasonCheck != "A" &&
							taxInfo.reasonCheck != "B") {
							this.Aleart("投保人若无法提供纳税人识别号，请选择原因A或B。")
							return false
						}
						if(taxInfo.tin != "" && taxInfo.reasonMessage != "") {
							this.Aleart("投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认。")
							return false
						}
						if(taxInfo.tin != "" && taxInfo.reasonCheck != "") {
							this.Aleart("投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认。")
							return false
						}
						//识别号不为空
						if(taxInfo.tin != "") {
							//校验非字母+数字
							var reg = /^[0-9a-zA-Z]*$/g;
							if(!reg.test(taxInfo.tin)) {
								this.Aleart("投保人居民国（地区）纳税人识别号只能填写字母和数字，请确认。")
								return false
							}
						}
						//未取得纳税号原因不为空
						if(taxInfo.reasonCheck != "" && taxInfo.reasonCheck == "A" && (taxInfo.reasonMessage != undefined && taxInfo.reasonMessage != "")) {
							this.Aleart("原因A ，投保人可不用填写解释具体原因。")
							return false
						}
						//未取得纳税号原因不为空
						if(taxInfo.reasonCheck != "" && taxInfo.reasonCheck == "B" && (taxInfo.reasonMessage == undefined || taxInfo.reasonMessage == "")) {
							this.Aleart("原因B 账户持有人未能取得纳税人识别号，请投保人解释具体原因。")
							return false
						}
					}
				} else if(appntTaxInfo.taxIdentity == "3") {
					if(idType!=''){
						if(idType == "11" || idType == "12") {
							this.Aleart("投保人税收居民身份选择有误，请核实。")
							return false
						}
					}
					if((appntTaxInfo.birthCountry == undefined || appntTaxInfo.birthCountry == "") &&
						(appntTaxInfo.birthProvince == undefined || appntTaxInfo.birthProvince == "") &&
						(appntTaxInfo.birthCity == undefined || appntTaxInfo.birthCity == "")) {
						this.Aleart("投保人出生地未填写，请正确填写。")
						return false
					}
					if(appntTaxInfo.birthCountry == undefined || appntTaxInfo.birthCountry == "") {
						this.Aleart("投保人出生地未填写，请正确填写。")
						return false
					}
					if((appntTaxInfo.birthProvince == undefined || appntTaxInfo.birthProvince == "") &&
						(appntTaxInfo.birthCity == undefined || appntTaxInfo.birthCity == "")) {
						this.Aleart("投保人出生地未填写不完整，请核实。")
						return false
					}
					if(appntTaxInfo.taxInformation == undefined || appntTaxInfo.taxInformation == 0) {
						this.Aleart("投保人税收居民身份勾选项未填写。")
						return false
					}
					if(appntTaxInfo.taxInformation.length < 2) {
						this.Aleart("投保人税收居民国及其相关信息须至少填写两项且含中国 。")
						return false
					}
					let msg = this.appntTaxInfoCheck(appntTaxInfo)
					if(msg != undefined && msg != "") {
						this.Aleart(msg)
						return false
					}
					for(var i = 0; i < appntTaxInfo.taxInformation.length; i++) {
						let taxInfo = appntTaxInfo.taxInformation[i]
						if(taxInfo.taxArea == undefined || taxInfo.taxArea == "") {
							this.Aleart("投保人税收居民国（地区）未填写，请正确填写。")
							return false
						}
						if(taxInfo.taxArea == "CHN") {
							isHaveCHN = true
						}
						if((taxInfo.tin == undefined || taxInfo.tin == "") &&
							taxInfo.reasonCheck != "A" &&
							taxInfo.reasonCheck != "B") {
							this.Aleart("若无法提供纳税人识别号，请选择原因A或B”字段可填写。")
							return false
						}
						if(taxInfo.tin != "" && taxInfo.reasonMessage != "") {
							this.Aleart("投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认。")
							return false
						}
						if(taxInfo.tin != "" && taxInfo.reasonCheck != "") {
							this.Aleart("投保人居民国（地区）纳税人识别号和原因不可同时填写，请确认。")
							return false
						}
						//识别号不为空
						if(taxInfo.tin != "") {
							//校验非字母+数字
						}
						//未取得纳税号原因不为空
						if(taxInfo.reasonCheck != "" && taxInfo.reasonCheck == "A" && (taxInfo.reasonMessage != undefined && taxInfo.reasonMessage != "")) {
							alert(1)
							this.Aleart("原因A ，投保人可不用填写解释具体原因。")
							return false
						}
						//未取得纳税号原因不为空
						if(taxInfo.reasonCheck != "" && taxInfo.reasonCheck == "B" && (taxInfo.reasonMessage == undefined || taxInfo.reasonMessage == "")) {
							alert(2)
							this.Aleart("原因B 账户持有人未能取得纳税人识别号，请投保人解释具体原因。")
							return false
						}
					}
					if(!isHaveCHN) {
						this.Aleart("投保人税收居民国及其相关信息须至少填写两项且含中国 。")
						return false
					}
				}
				return true
			},
			infoDataCheck:function(){
				let date = new Date()
				let newDate = date.getFullYear() + '-' + fillZero(date.getMonth() + 1) + '-' + fillZero(date.getDate())
				let AlertText = ''
				if(this.user.sex == ''){
					this.Aleart('性别为必填项。')
					return false
				}else if(this.user.sex != ''){
					let msg = utils.common.customerManageRelationCheck(this.user.relation,this.user.sex)
					if(msg != undefined && msg != ''){
						this.Aleart(msg)
						return false
					}
				}
				if(this.user.name == ''){
					this.Aleart('姓名为必填项。')
				}else if(this.user.name!=''){
					let msg = utils.valid.names(this.user.name)
					if(msg != undefined && msg != ''){
						this.Aleart(msg)
						return false
					}
					let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
					if(reg.test(this.user.name)){
						this.user.name = this.user.name.replace(/\s+/g, "")
					}
					if(this.user.name.length>=15){
						this.Aleart('姓名不能超过15个字符。')
						return false
					}
				}
				if(this.user.phone == ''){
					if(this.user.birthday!=''&&utils.valid.getAge(this.user.birthday) >= 18){
						this.Aleart('手机号码为必填项。')
						return false
					}
					if(this.user.birthday==''){
						this.Aleart('手机号码为必填项。')
						return false
					}
				}else if(this.user.phone != ''){
					let msg = utils.valid.mobilePhone(this.user.phone)
					if(msg != undefined && msg != ''){
						this.Aleart(msg)
						return false
					}
				}
				if(this.user.birthday > newDate){
					this.Aleart('出生日期不能大于当前日期。')
					return false
				}
				if(this.user.startDay != '' && this.user.startDay > newDate){
					this.Aleart('证件起期不能大于当前日期。')
					return false
				}
				if(this.user.startDay != '' && this.user.endDay != ''){
					if(this.user.startDay > this.user.endDay) {
						this.Aleart('证件起期不能大于证件止期。')
						return false
					}
				}
				if(this.user.idType=='12' && this.user.startDay != '' && this.user.endDay != '' && this.user.birthday!=''){
					if(this.user.startDay != this.user.birthday){
						this.Aleart('证件类型为户口本时，证件有效起期应该与出生日期一致')
						return false
					}
				}
				if(this.user.idType=='12' &&utils.valid.getAge(this.user.birthday)>16){
						this.Aleart('年龄16周岁以上，不可以使用户口本')
						return false
				}
				if(this.user.idType=='20' && this.user.startDay != '' && this.user.endDay != '' && this.user.birthday!=''){
					if(this.user.startDay != this.user.birthday){
						this.Aleart('证件类型为出生证时，证件有效起期应该与出生日期一致')
						return false
					}
				}
//				if(this.user.idType != '' && this.user.cerId != ''){
					let msg = utils.valid.ngbc3(this.user.sex,this.user.birthday,this.user.idType,this.user.cerId)
					if(msg != undefined && msg != ''){
						this.Aleart(msg)
						return false
					}
//				}
				if(this.user.annualIncome != ''){
					let msg = utils.valid.customerSalary(this.user.annualIncome)
					if(msg != undefined && msg != ''){
						this.Aleart(msg)
						return false
					}
				}
				if(this.user.relation=='03'){
					if(this.user.sex==this.customerSex){
						AlertText='客户'+this.customerName+'性别不能与丈夫性别相同'
						this.Aleart(AlertText)
						return false
					}
				}
				if(this.user.relation=='04'){
					if(this.user.sex==this.customerSex){
						AlertText='客户'+this.customerName+'性别不能与妻子性别相同'
						this.Aleart(AlertText)
						return false
					}
				}
				msg = utils.valid.nationalityAndIdType(this.user.nativePlace,this.user.idType)
				if(msg != undefined && msg != ''){
					this.Aleart(msg)
					return false
				}
				if(this.user.idType != '' && this.user.nativePlace != ''){
					if(this.user.idType == '11' && this.user.nativePlace != 'CHN'){
						this.Aleart('证件类型为身份证时，国籍必须为中国')
						return false
					}
				}
				if(this.user.nativePlace == 'CHN' && this.user.idType =='29'){
					this.Aleart('国籍为中国时，不可以使用永久居留证证件类型，请确认。')
					return false
				}
				if(this.user.nativePlace != 'CHN' && this.user.appntTaxInfo.taxIdentity=='1'){
					this.Aleart('您的国籍为非中国，“税收居民身份”不可选择“中国税收居民”')
					return false
				}
				return true
			},
			next(index){
				this.dict.nationalList.forEach(item => {
					if(item.text==this.user.nativePlace){
						this.user.nativePlace=item.code
					}
				})
				this.dict.marriageList.forEach(item => {
					if(item.text==this.user.marriage){
						this.user.marriage=item.code
					}
				})
				let isPass = true
				isPass = this.infoDataCheck()
				console.log(isPass)
				if(isPass) {
					isPass = this.checkAppntTaxInfo()
				}
				if(isPass){
					let requ = {
						"data":{
							"agentCode": utils.cache.get('personsal').agentCode,
							"name": this.user.name,//姓名
							"mobilePhone": this.user.phone,
		                    "certificateNo": this.user.cerId,//证件号码
		                    "certificateType": this.user.idType,//证件类型
		                    "validEndTime": this.user.endDay,//证件止期
		                    "validStartTime": this.user.startDay,//证件起期
							"sex": this.user.sex,//性别
							"birthday": this.user.birthday,//出生年月日
							"workType": this.user.occupationCode,//职业代码
							"level":this.user.occupationType,
							"profession":this.user.appOccupation,
							"nationality": this.user.nativePlace,//国籍
							"marriage": this.user.marriage,//婚姻状况
							"annualIncome": this.user.annualIncome,//年收入
							"workUnit": this.user.workUnit,//工作单位
							"isSocialInsurance": this.code,//是否缴纳社保
		                    "requestOrder": "2",
		                    "emergencyContactRelation": this.user.relation,//关系
		                    "personalTax": this.user.appntTaxInfo,
		                    "systemId": this.edit==1?this.infoIdMember:'',
		                    "infoId":this.edit==1?this.infoId:this.infoIdMember,
						},
						"methodName": "customerManagement",
	            		"modelName": "customerManagementService"
					}
				console.log(JSON.stringify(requ))
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode=='0'){
							if(index==1){
								this.go('/customer/customerInfoAddress?infoIdMember='+this.infoIdMember+'&infoId='+this.infoId)
							}else if(index==2){
								this.go('/customer/customerInfoBank?infoIdMember='+this.infoIdMember+'&infoId='+this.infoId)
							}else if(index==3){
								this.go('/customer/customerInfoAddress?id='+this.id+'&infoId='+this.infoId+'&infoIdMember='+this.infoIdMember)
							}else if(index==4){
								this.go('/customer/customerInfoBank?id='+this.id+'&infoId='+this.infoId+'&infoIdMember='+this.infoIdMember)
							}else{
								this.go('/customer/customerList?infoId='+this.infoId)
							}
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
					})
				}
			},
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	.details {

		div,
		span,
		p {
			font-size: 16px;
		}

		.grun {
			color: #9F9F9F;
		}

		.black {
			color: #000;
		}

		.info-size {
			font-size: 14px;
		}

		.info {
			line-height: 1.1rem;
			border-bottom: 1px solid #EFEFEF;
			padding: 4% 4% 4% 4%;

			.fa {
				width: 7px;
			}

			input[type='radio'] {
				display: none !important;
			}

			input[type='radio']+label {
				-webkit-appearance: none;
				border: 1px solid #FDB92C;
				background-color: #fff;
				padding: 7px;
				border-radius: 24px;
				display: inline-block;
				position: relative;
				margin-right: .2rem;
			}

			input[type='radio']:checked+label:after {
				content: '';
				width: 8px;
				height: 8px;
				border-radius: 24px;
				position: absolute;
				top: 3px;
				background: #FDB92C;
				left: 3px;
			}

			input[type='radio']:checked+label {
				border: 1px solid #FDB92C;
			}

			.mint-checkbox-core {
				border-radius: 20% !important;
			}

			.info-left {
				width: 30%;
			}
		}

		.flexs {
			display: flex;
			align-items: center;
		}

		.flex {
			flex: 1;
			justify-content: space-between;
			/*margin-right: 3%;*/
		}

		.cerinfo {
			width: 92%;
			margin: auto;
			line-height: 1.5rem;
			padding: 4% 0 2% 0;
		}

		.confirm {
			/*width: 100%;*/
			background: #fff;
			padding-bottom: 20px;
			padding-top: 10px;

			div {
				width: 95%;
				margin: auto;
				color: #fff;
				background: #FEB101;
				border: 1px solid #FEB101;
				border-radius: 5px;
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}

		.content {
			width: 100%;
			font-size: 12px;

			.fa {
				color: #FFAB00;
				font-size: 18px;
				display: inline-block;
				line-height: 45px;
				margin-left: 5px;
			}

			.ocr-active {
				color: #FFAB00;
			}

			.ocr-none {
				color: #ccc;
			}

			ul>li,
			.item_title,
			.revenueItem,
			.revenue_item_title {
				display: flex;
				justify-content: space-between;
				height: 45px;
				line-height: 45px;
				overflow: hidden;
			}

			.revenueItem-left {
				flex: 0 0 133px;
			}

			.revenueItem-right {
				flex: 1;
			}

			.item_title {
				background: #f0f0f0;
				padding: 0 20px;
				color: #FEB101;
				font-weight: 500;

				.fa-angle-double-up,
				.fa-question-circle-o {
					font-size: 24px;
				}

				.fa-chevron-right {
					font-size: 14px;
				}

				span {
					color: #000;
				}
			}

			ul>li {
				background: #fff;
				padding: 0 15px;
				border-bottom: 1px dashed #A3A2A2;

				p>input {
					padding-right: 5px;
					text-align: right;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}

				div {
					label {
						font-size: 14px;
						color: #000;
						font-weight: bold;
						position: absolute;
						bottom: 4px;

						span {
							position: relative;
							top: 9px;
							color: #fff;
						}
					}
				}

				.fa-angle-down {
					font-size: 20px;
					margin-left: 5px;
					position: relative;
					top: 2px;
				}

				div.right {
					text-align: right;

					.mbsc-control-ev {
						width: 50% !important;
						text-align: right !important;
					}

					.fa-camera-retro {
						margin-left: 5px;
					}
				}

				.flex {
					display: flex;
					max-width: 60%;
					text-align: right;

					p+p {
						margin-left: 5px;
					}

					.fa-angle-down,
					.fa-microphone {
						font-size: 20px;
						margin-left: 5px;
					}
				}

				.maillist {
					background: #fff;
					border-color: -moz-use-text-color #ccc #ccc;
					border-right: 1px solid #ccc;
					border-style: none solid solid;
					border-width: 0 1px 1px;
					height: 180px;
					position: absolute;
					width: 180px;
					right: 0;
					top: 43px;
					z-index: 10;

					ul {
						width: 100%;
						height: 100%;
						overflow: auto;

						li {
							height: 25px;
							line-height: 25px;
							margin: 0;
							padding: 0;
							padding-left: 5px;
							border: none;
						}
					}
				}

				.text-hide {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}

			div.revenueItem {
				background: #fff;
				margin: 0 5px;
				padding: 0 15px;
				border-bottom: 1px dashed #A3A2A2;

				.inmate {
					position: relative;
					top: 3px;
				}
			}

			div.revenue_item_title {
				background: #f0f0f0;
				padding: 0 20px;
				font-weight: 500;
				border-bottom: 1px solid #A3A2A2;

				.fa-close {
					display: inline-block;
					font-size: 18px;
					color: #FFAB00;
					line-height: 45px;
				}
			}

			p.revenueItem {
				margin: 0 5px;
				padding: 0 15px;
				border-bottom: 1px dashed #A3A2A2;
				color: #FEB101;
				justify-content: center;
			}
		}
	}
</style>
<style type="text/css">
	.type .mbsc-control-ev {
		text-align: left !important;
		position: absolute;
		right: 12%;
		min-width: 56% !important;
		max-width: 72% !important;
		width: 30px;
		opacity: 0;
	}

	.nation .mbsc-control-ev {
		text-align: left !important;
		position: absolute;
		right: 3%;
		min-width: 70% !important;
		max-width: 80% !important;
		width: 30px;
		opacity: 0;
	}

	::-webkit-input-placeholder {
		color: #9F9F9F;
		font-size: 14px;
	}
</style>