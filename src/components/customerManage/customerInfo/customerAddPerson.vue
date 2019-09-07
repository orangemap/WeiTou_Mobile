<template>
	<div>
		<OccupationSearch v-show="occupationValue.isopen" v-model="occupationValue"></OccupationSearch>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue" @click=""></IDCardScanning>
		<div v-show="contentIsOpen">
			<Headerbtns :title="page_title">
				<div slot="left" class="back" @click="left">
					<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
				</div>
			</Headerbtns>
			<div class="details" style="background:#F5F5F5 ;width: 100%;">
				<div style="height: 13px;"></div>
				<div style="background: #fff;width: 100%;">
					<div class="family">
						<div v-for="(item,index) in familyListList">
							<div class="cerinfo">
								<div class="flexs">
									<div>{{item.name}}</div>
									<div style="margin-left: 3%;background: #EFEFEF;border-radius: 20px;padding: 0 2%;color: #999;font-size: 12px;height: 18px;line-height: 18px;">{{item.emergencyContactRelation | ralationCustomerFilter}}</div>
								</div>
								<div class="flexs flex" style="color: #9999;">
									<div style="font-size: 0.7rem;width: 85%;margin-top:2%;">
										<span style="font-size: 12px;">证件号码</span>
										<span style="font-size: 12px;">{{item.certificateNo}}</span>
									</div>
									<!--<div style="width: 14px;height: 14px;">
										<img src="static/img/customerManage/write.png" alt="" style="width: 100%;height: 100%;"/>
									</div>-->
									<div style="width: 14px;height: 14px;" v-if="item.emergencyContactRelation != '本人'" @click="del(item,item.infoId,index)">
										<img src="static/img/customerManage/del.png" alt="" style="width: 100%;height: 100%;"/>
									</div>
								</div>
							</div>
							<div style="height: 9px;background: #F4F4F4;"></div>
						</div>
					</div>
					<div class="content">
						<div class="info flexs flex">
							<div class="info-left">关系</div>
							<div class="flexs flex nation">
								<p class="info-size">{{user.relation | ralationCustomerFilter}}</p>
								<picker v-model="user.relation" :values="user.relation" :items="dict.relationList" code="code" text="text"></picker>
							</div>
							<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
						</div>
						<div class="info">
							<div class="flexs">
								<div class="info-left">姓名</div>
								<input class="info-size" type="text" placeholder="请输入姓名" v-model="user.name" v-support-letter-chinese/>
							</div>
						</div>
						<div class="info">
							<div class="flexs">
								<div class="info-left">手机号码</div>
								<input class="info-size" type="text" placeholder="请输入手机号码" v-model="user.phone" maxlength="11" v-support-number/>
							</div>
						</div>
						<div class="info">
							<div class="flexs">
								<div class="info-left">证件类型</div>
								<div class="flexs flex type">
									<p class="info-size">{{user.idType | Notype}}</p>
									<picker v-model="user.idType" :values="user.idType" :items="dict.cardTypeList" code="code" text="text" @change="changeIdType()"></picker>
								</div>
								<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								<div style="margin-left: 2%;width: 16px;height: 12px;line-height: 15px;">
									<img src="static/img/policy/icon_camera.png" alt="" width="19" height="19" @click="cardScanning()" style=" position:relative;top:-3px;"/>
								</div>
							</div>
						</div>
						<div class="info">
							<div class="flexs">
								<div class="info-left">证件号码</div>
								<input class="info-size" type="text" placeholder="请输入证件号码" v-filterLetterNumber v-model="user.cerId"/>
							</div>
						</div>
						<div class="info">
							<div class="flexs">
								<div class="info-left">证件有效起期</div>
								<div class="flexs flex type">
									<p :class="user.startDay=='' || user.startDay==undefined ? 'grun':'black'" style="font-size: 14px;">{{user.startDay=='' || user.startDay==undefined ?"请输入证件有效起期":user.startDay}}</p>
									<date-picker v-model="user.startDay" :defaultTimeYear="defaultTime" style="position: absolute;right: 0;opacity: 0;width: 70%;"></date-picker>
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
										<p :class="user.endDay=='' || user.endDay==undefined ? 'grun':'black'" style="font-size: 14px;">{{user.endDay=='' || user.endDay==undefined ?"请选择证件有效止期":user.endDay}}</p>
										<date-picker v-model="user.endDay" :defaultTimeYear="defaultTime"  v-show="!toggle.appntIdExpDateLong" style="position: absolute;right: 0;opacity: 0;width: 44%;"></date-picker>
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
						<div class="info">
							<div class="flexs">
								<div class="info-left">性别</div>
								<input id="insure_gender_male" v-model="user.sex" name="gender" type="radio" value="1" style="width: 16px;height: 16px;border-radius: 8px;float: none;" />
					            <label for="insure_gender_male" style="margin-bottom: -2px;"></label><label class="info-size" for="insure_gender_male" style="padding-right: 30px;padding-top: -10px;margin-left: 3%;">男</label>
					         		<input id="insure_gender_female" v-model="user.sex" name="gender" type="radio" value="2" style="width: 16px;height: 16px;border-radius: 8px;float: none;" />
					         		<label for="insure_gender_female" style="margin-left: 10px;margin-bottom: -2px;"></label><label class="info-size" for="insure_gender_female" style="margin-left: 3%;">女</label>
							</div>
						</div>
						<div class="info">
							<div class="flexs">
								<div class="info-left">出生日期</div>
								<div class="flexs flex type">
									<p :class="user.birthday=='' || user.birthday==undefined ? 'grun':'black'" style="font-size: 14px;">{{user.birthday==''||user.birthday==undefined?'请选择出生日期':user.birthday}}</p>
									<date-picker v-model="user.birthday" :defaultTimeYear="defaultTime" style="position: absolute;right: 0;opacity: 0;width: 70%;"></date-picker>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								</div>
							</div>
						</div>
						<div class="info">
							<div class="flexs">
								<div class="info-left">职业</div>
								<div class="flexs flex" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 40%;" @click="occupationSearch()">
									<p style="text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 80%;">
										<span class="info-size">{{user.appOccupation}}</span>
									</p>
									<i class="fa fa-angle-right" style="color: #CDCDCD;"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="height: 28px;"></div>
				<p><Alert ref="showalert"></Alert></p>
				<div class="confirm flexs flex">
					<div @click="Next()" style="background: #fff;color:#FEB101">继续完善</div>
					<div @click="save()">保存</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import datePicker from '@/components/common/DatePicker.vue'
	import OccupationSearch from '../../common/OccupationSearch.vue'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
	import picker from '../../common/Picker.vue'
	import Alert from '@/components/policy/common/alert'
	
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
			Headerbtns,datePicker,OccupationSearch,picker,Alert,IDCardScanning
		},
		data() {
			return {
				page_title: '新增家庭成员',
				defaultTime: '30',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				occupationValue: {
					isopen: false,
					type: '',
					occItem: ''
				},
				user:{
					name:'',
					phone:'',
					idType:'',//证件类型
					cerId:'',
					birthday:'',
					sex:'1',
					occupationCode: '0001001',//职业代码
					occupationType: '1',//职业等级
					appOccupation: "党政机关、企事业单位负责人和行政管理人员",//职业描述
					startDay:'',
					endDay:'',
					relation:'',
				},
				infoId:'',
				memberLnfo:'',
				dict: {
					cardTypeList: '',
					relationList:'',
				},
				toggle: {
					appntIdExpDateLong: false,
				},
				cardScanningValue: {
					isopen: false,
					type: '',
					cusItem: {}
				},
				familyListList:'',
				infoIdMember:'',//新增家庭成员infoId
				customerSex:'',
				customerName:'',
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
			}
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
			this.information()
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
//						this.toggle.appntSexChoice = (this.cardScanningValue.cusItem.gender == '1') ? true : false
						this.user.birthday = this.cardScanningValue.cusItem.birthday
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
			'user.idType':function(val, oldval){
				if(val != oldval){
					if(val == '12'){
						if(this.user.birthday!=undefined && this.user.birthday !=""){
							this.user.startDay = this.user.birthday
							var date = this.idExpDateValid(this.user.birthday,16)
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
			'user.birthday':function(val, oldval){
				if(val != oldval){
					if(this.user.idType == '12' || this.user.idType == '20'){
						this.user.startDay = val
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
			information(){
				let requ = {
						"data":{
							 "infoId":this.infoId,
							 "agentCode": utils.cache.get('personsal').agentCode,
						},
						"methodName": "customerFamilyList",
    					"modelName": "customerManagementService"
					}
				console.log(JSON.stringify(requ))
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
			infoDataCheck:function(){
				let date = new Date()
				let newDate = date.getFullYear() + '-' + fillZero(date.getMonth() + 1) + '-' + fillZero(date.getDate())
				let AlertText = ''
				if(this.user.name == ''){
					this.Aleart('姓名为必填项。')
					return false
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
					if(this.user.name.length>=20){
						this.Aleart('姓名不能超过20个字符。')
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
				if(this.user.birthday==''||this.user.birthday==undefined){
					this.Aleart('出生日期为必填项。')
					return false
				}else{
					if(this.user.birthday > newDate){
						this.Aleart('出生日期不能大于当前日期。')
						return false
					}
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
				return true
			},
			save(){
				let isPass = true
				isPass = this.infoDataCheck()
				console.log(isPass)
				if(isPass!=false){
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
		                    "requestOrder": "1",
		                    "emergencyContactRelation": this.user.relation,//关系
		                    "infoId":this.infoId,
						},
						"methodName": "customerManagement",
                		"modelName": "customerManagementService"
					}
				console.log(JSON.stringify(requ))
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.ResponseCode=='0'){
							if(body.data.newCustomerOne.resultCode=='0'){
								this.memberLnfo=body.data.newCustomerOne.infoId
								this.go('/customer/customerList?infoId='+this.infoId+'&memberLnfo='+this.memberLnfo)
							}else{
								this.Aleart(body.data.newCustomerOne.resultMessage)
							}
							
						}
					})
				}
			},
			Next(){
				let isPass = true
				isPass = this.infoDataCheck()
				if(isPass!=false){
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
		                    "requestOrder": "1",
		                    "emergencyContactRelation": this.user.relation,//关系
		                    "infoId":this.infoId,
						},
						"methodName": "customerManagement",
                		"modelName": "customerManagementService"
					}
				console.log(JSON.stringify(requ))
					utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode=='0'){
							this.infoIdMember=body.data.newCustomerOne.infoId
							this.go('/customer/customerInfo?infoId='+this.infoId+'&infoIdMember='+this.infoIdMember)
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
					})
				}
			},
			del(item,infoId,index){
				this.infoIdMember = infoId
				this.itemIndex = index
				alert_n22.confirm('提示', '确定要删除该家庭成员！', '确定','取消', (flag) => {
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
						if(body.data.ResponseCode=='0'){
							this.familyListList.splice(this.itemIndex, 1)
							this.go('/customer/customerList?infoId='+this.infoId)
						}
					})
			},
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	.details {
		div,span,p {
			font-size: 16px;
		}
		.grun{
			color: #9F9F9F;
		}
		.black{
			color: #000;
		}
		.info-size{
			font-size: 14px;
		}
		.info{
			line-height: 1.1rem;
			border-bottom: 1px solid #EFEFEF;
			padding:4% 4% 4% 4%;
			vertical-align:top;
			.info-left{
				width: 35%;
			}
			.fa{
				width: 7px;
			}
		}
		.cerinfo{
			width: 92%;
			margin: auto;
			line-height: 1.5rem;
			padding: 4% 0 2% 0;
		}
		.mint-button::after{
			background-color: #fff;
		}
		.flexs {
		display: flex;
		align-items: center;
		}
		.flex{
			flex: 1;
			justify-content: space-between;
			/*padding-right: 3%;*/
		}
		/*.footer{
			text-align: center;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 43px;
			line-height: 50px;
			color: #fff;
			margin-bottom: 20px;
		}*/
		.confirm {
			/*width: 100%;*/
			background: #fff;
			padding-bottom: 20px;
			padding-top: 10px;
			div {
				width: 40%;
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
		input[type='radio']{display: none!important;}
		input[type='radio'] + label {
		  -webkit-appearance: none;
		  border: 1px solid #FDB92C;
		  background-color: #fff;
		  padding: 7px;
		  border-radius: 24px;
		  display: inline-block;
		  position: relative;
		  margin-right: .2rem;
		}
		input[type='radio']:checked + label:after {
		  content: '';
		  width: 8px;
		  height: 8px;
		  border-radius: 24px;
		  position: absolute;
		  top: 3px;
		  background: #FDB92C;
		  left: 3px;
		}
		input[type='radio']:checked + label {border: 1px solid #FDB92C;}
		.mint-checkbox-core{
		 border-radius: 20% !important;
		}
	}
</style>
<style type="text/css">
	.type .mbsc-control-ev{
		text-align:left !important;
	    position: absolute;
	    right: 12%;
	     min-width: 56% !important;
    	max-width: 72% !important;
	    width: 30px;
	    opacity: 0;
	}
	.nation .mbsc-control-ev{
		text-align:left !important;
	    position: absolute;
	    right: 3%;
	     min-width: 70% !important;
    	max-width: 80% !important;
	    width: 30px;
	    opacity: 0;
	}
	::-webkit-input-placeholder { color:#9F9F9F; }
</style>