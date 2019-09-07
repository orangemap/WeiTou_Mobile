<template>
	<div class='sel-detail-user-1'>
		<div v-show='!cardScanningValue.isopen'>
			<div class='sel-user-top flex'>
				<p class='feb101'>出险人信息</p>
				<img src="static/img/comprehensive/bottom.png" alt="" v-show='userShow' @click='userShow = false'>
				<img src="static/img/comprehensive/top.png" alt="" v-show='!userShow' @click='userShow = true'>
			</div>
			<!-- 出险人信息 -->
			<div class='sel-cx-user' v-show='userShow'>
				<div class='flex'>
					<p>姓名</p>
					<!-- <input type="text" placeholder='请输入姓名' v-model='User.name'> -->
					<p>{{User.name}}</p>
				</div>
				<div class='flex'>
					<p>证件类型</p>
					<!-- <div style='flex:1;margin-right:1.8rem' class='flex-end'>
						<label class='flex-end'>
							<picker v-model="User.certifica" code="code" :items="UserCertificatesList" :values='User.certifica'></picker>&nbsp;&nbsp;
							<i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
						</label>
						<i class="fa fa-camera-retro" style='font-size:1.2rem' @click="cardScanning(User.certifica)" :class="[User.certifica==11?'ocr-active':'ocr-none']"></i>
					</div> -->
					<p>{{User.certifica | cardBaoQuanFilter}}</p> <!--cardBaoQuanFilter-->
				</div>
				<div class='flex'>
					<p>证件号码</p>
					<!-- <input type="text" placeholder='请输入证件号码' v-model='User.code'> -->
					<p>{{User.code}}</p>
				</div>
				<div class='flex'>
					<p>证件有效期</p>
					<p>
						<input type="checkbox" v-model='User.isLongTerm'>
						<span>是否长期</span>
					</p>
					<date-picker v-model="User.data"  style="display:inline-block;text-align:right;float: right;" v-show='!User.isLongTerm'></date-picker>
				</div>
				<div class='flex' style='position: relative;'>
					<p>性别</p>
					<!-- <mt-switch v-model="User.sex" style="position: absolute;right: -5px;top: 0px;">
						<label style="position: absolute;right: 41px;bottom: 7px;font-size: 14px;color: #FBFBFB;font-weight:bold;z-index: 1000">{{User.sex==true?'女':''}}
						</label>
						<label style="position: absolute;right: 15px;bottom: 7px;font-size: 14px;font-weight:bold;color: #FBFBFB;z-index: 1000">{{User.sex==false?'男':''}}
						</label>
					</mt-switch> -->
					<p>{{User.sex==true?'女':'男'}}</p>
				</div>
				<div class='flex'>
					<p>国籍</p>
					<!-- <div style='flex:1;margin-right:1.8rem' class='flex-end'>
						<label class='flex-end'>
							<picker v-model="User.nation" code="code" :items="nationalList" :values='User.nation'></picker>&nbsp;&nbsp;
							<i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
						</label>
					</div> -->
					<p>{{User.nation |nativeText}}</p>
				</div>
			</div>
			<!-- 联系人信息 -->
			<div class='sel-cx-user' v-for='item in ContactsList'>
				<div class='sel-user-top flex'>
					<p class='feb101'>新增联系人</p>
					<p>
						<img :src="item.url" alt="" @click='SetContacts(item.key)'/>
						&nbsp;
						<img :src="item.activeUrl" alt="" @click='Showactive(item.key)'/>
					</p>
				</div>
				<div class='flex' v-show='item.show == true'>
					<p style='min-width:80px;'>与出险人关系</p>
					<label style='width:72%' class='flex-end' @click='Setgx(item.key)'>
						<picker v-model="item.relation" code="code" :items="ralationList" :values='item.relation | ralationFilter' title='请输入关系' @cancel='cancelChange' @change='changeRalation(item)'></picker>
						<span v-show='item.relation == "30" || item.relation == "31"' style='min-width:75px;'>（{{item.othermsg}}）</span>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<i class="mint-toast-icon mintui mintui-back" style='transform: rotate(270deg);color:#A4A4A4;'></i>
					</label>
					<div v-show='item.inputPicker==true' class='module-div'>
						<div>
							<p>请输入关系</p>
							<p>
								<input type="text" v-model='gxText'>
							</p>
							<button @click='changeGxText(item)'>确定</button>
						</div>
					</div>
				</div>
				<div class='flex' v-show='item.show'>
					<p>姓名</p>
					<input type="text" placeholder=" 请输入联系人姓名" v-model='item.linkname' :disabled='item.relation=="00"'/>
				</div>
				<div class='flex' style='position: relative;' v-show='item.show'>
					<p>性别</p>
					<mt-switch v-model="item.linksex" style="position: absolute;right: -5px;top: 0px;">
						<label style="position: absolute;right: 41px;bottom: 7px;font-size: 14px;color: #FBFBFB;font-weight:bold;">{{item.linksex||item.linksex==true?'女':'男'}}
						</label>
						<label style="position: absolute;right: 15px;bottom: 7px;font-size: 14px;font-weight:bold;color: #FBFBFB;">{{!item.linksex||item.linksex==false?'男':'女'}}
						</label>
					</mt-switch>
				</div>
				<div class='flex' v-show='item.show'>
					<p>手机号</p>
					<input type="text" placeholder=" 请输入联系人手机号" v-model='item.linktel' maxlength="11" />
				</div>
			</div>

			<div class='sel-user-top flex'>
				<p class='feb101'>报案人信息</p>
				<img src="static/img/comprehensive/bottom.png" alt="" v-show='ReportedShow' @click='ReportedShow = false'>
				<img src="static/img/comprehensive/top.png" alt="" v-show='!ReportedShow' @click='ReportedShow = true'>
			</div>
			<!-- 报案人信息 -->
			<div class='sel-cx-user' v-show='ReportedShow'>
				<div class='flex'>
					<p>姓名</p>
					<p>{{Reported.rptorname}}</p>
				</div>
				<div class='flex' style='position:relative;'>
					<p>性别</p>
					<p>{{Reported.rptorsex?'女':'男'}}</p>
				</div>
				<div class='flex'>
					<p>手机号</p>
					<p>{{Reported.rptormobile}}</p>
				</div>
			</div>
			<p><Alert ref="showalert"></Alert></p>
			<div class='sel-div-last'>
				<button @click='Next'>下一步</button>
			</div>
		</div>
		<IDCardScanning v-show="cardScanningValue.isopen" v-model="cardScanningValue" @click=""></IDCardScanning>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement'
	import datePicker from '@/components/common/DatePicker.vue'
	import picker from '@/components/common/Picker.vue'
	import Alert from '@/components/policy/common/alert'
	import IDCardScanning from '@/components/common/IDCardScanning.vue'
	import nationalList from '@/assets/dict/national_sunlife.json'
	export default {
		components:{datePicker,picker,Alert,IDCardScanning},
		data() {
			return {
				UserCertificatesList:[
				{code:'11',text:'身份证'},
				{code:'12',text:'户口本'},
				{code:'17',text:'中国护照'},
				{code:'24',text:'外国护照'},
				{code:'23',text:'台胞证'},
				{code:'26',text:'港澳通行证'},
				{code:'20',text:'出生证'},
				{code:'29',text:'外国人永久居留身份证'}
				],
				ralationList:[
				{code:'00',text:'本人'},
				{code:'33',text:'配偶'},
				{code:'37',text:'父子'},
				{code:'38',text:'父女'},
				{code:'39',text:'母子'},
				{code:'40',text:'母女'},
				{code:'30',text:'其他'}
				],
				/*出险人数据*/
				User:{
					name:'',/*出险人姓名*/
					certifica:'1',/*出险人证件类型*/
					code:'',/*出险人证件号码*/
					Birthday:'',/*出险人生日*/
					data:'请选择',/*出险人证件有效期*/
					sex:false,/*出险人性别*/
					isLongTerm:false,/*出险人证件是否长期有效*/
				},
				/*联系人数据*/
				ContactsList:[
				{
					key:0,
					url:'static/img/settlement/add.png',
					activeUrl:'static/img/comprehensive/top.png',
					relation:'',/*关系*/
					linkname:'',/*姓名*/
					linksex:false,/*性别*/
					linktel:'',/*手机号*/
					show:false,
					othermsg:'',/*关系text*/
					inputPicker:false,/*关系框是否弹出*/
				}
				],
				/*报案人数据*/
				Reported:{
					rptorname:utils.cache.get('personsal').agentName,/*姓名*/
					rptorsex:utils.cache.get('personsal').appntSex=='0'?false:true,/*性别*/
					rptormobile:utils.cache.get('personsal').mobile,/*手机号*/
					rptormangcom:utils.cache.get('personsal').orgId.slice(0,4),/*所属机构*/
					rptoridtype:utils.cache.get('personsal').cerdType/*证件类型*/
				},
				userShow:true,
				ReportedShow:true,
				cardScanningValue:{
					isopen:false,
					cusltem:{}
				},
				inputPicker:false,/*关系框*/
				gxText:'',
				policyTypes:'',/*分步获取出险类型,下一页面需要*/
				nationalList:nationalList.national.item
			}
		},
		computed:{
			...mapState(['VuxPolicyType','policyCode','policyData'])
		},store,
		mounted() {
			this.SetPolicyState('2')
			console.log(this.VuxPolicyType)
			this.SetpolicyCode(this.$route.params.claimId)
			this.getInitData()
			console.log(utils.cache.get('personsal').cerdNum.substring(6,14))
			let Newdate = utils.cache.get('personsal').cerdNum.substring(6,14)
			let byaer = Newdate.substring(0,4)
			let bmonth = Newdate.substring(4,6)
			let bday = Newdate.substring(6,8)
			console.log(byaer)
			console.log(bmonth)
			console.log(bday)
			this.Reported.rptorbirthday = byaer+'-'+bmonth+'-'+bday
			console.log('报案人数据----->>>>',this.Reported)
			console.log('联系人数据----->>>>',this.ContactsList)
		},
		methods:{
			...mapMutations(['SetPolicyState','SetpolicyCode','SetpolicyData']),
			cancelChange() {
				console.log('1')
			},
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			changeRalation(e){
				e.linkname = ''/*姓名*/
				e.linktel = ''
			},
			cardScanning(id) {/*ocr识别*/
				if(id == '11'){
					this.cardScanningValue.isopen = true
				}
			},
			changeGxText(item) {
				console.log(this.ContactsList)
				if(this.gxText!=''){
					item.othermsg = this.gxText
					item.inputPicker = false
					item.relation = '31'
					this.$set(this.ContactsList,item.key,item)
					this.gxText = ''
					console.log(this.ContactsList)
				}else{
					this.Aleart('请输入关系')
				}
			},
			Showactive(id) {/*显示隐藏联系人*/
				this.ContactsList.forEach( (item,index) => {
					if(item.key == id){
						item.show = !item.show
						if(item.show == true){
							item.activeUrl = 'static/img/comprehensive/bottom.png' 
						}else{
							item.activeUrl = 'static/img/comprehensive/top.png' 
						}
						console.log(item)
					}
					this.$set(this.ContactsList,index,item)
				})
			},
			SetContacts(id){/*Add Deleta联系人*/
				console.log(id)
				if(id == 0){
					let newNum = this.ContactsList.length
					let newObject = {
						key:newNum,
						url:'static/img/settlement/delete.png',
						activeUrl:'static/img/comprehensive/bottom.png',
						relation:'',/*关系*/
						linkname:'',/*姓名*/
						linksex:false,/*性别*/
						linktel:'',/*手机号*/
						show:true,
						othermsg:''/*关系text*/
					}
					if(this.ContactsList.length<3){
						this.ContactsList.push(newObject)
					}
				}else if(id > 0){
					this.ContactsList.forEach( (item,index) =>{
						if(item.key == id){
							this.ContactsList.splice(index,1)
						}
					})
				}
			},
			getInitData() {
				let requ = {
					"data": {
						claimId:this.$route.params.claimId,
						claimType:"0",
						step:"2"
					},
					modelName: "claimService",
					methodName: "getClaimInfo"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log('分步获取----->>>',body)
					console.log(header)
					let insured = body.data.claim.insured
					if(body.data.code == 0){
						/*出险人信息*/
						this.User.name = insured.insuredname/*出险人姓名*/
						this.User.certifica = insured.insuredidtype/*出险人证件类型*/
						this.User.code = insured.insuredidno/*出险人证件号码*/
						this.User.sex = insured.insuredsex == '1'?true:false/*出险人性别*/
						this.User.data = insured.insuredidexpdate/*出险人证件有效期*/
						this.User.isLongTerm = insured.insuredislong=="1"?true:false/*出险人证件是否长期有效*/
						this.User.Birthday = insured.insuredbirthday/*出险人生日*/
						this.User.nation = insured.insurednation/*国籍*/
						this.User.profess = insured.insuredprofess
						console.log('出险人信息----->>>',this.User)
						/*联系人信息*/
						if(body.data.claim.linkMans){
							this.ContactsList = []
							body.data.claim.linkMans.forEach((tpl,index) => {
								let newObject = {
									key:index,
									show:true,
									url:tpl.orders==0?'static/img/settlement/add.png':'static/img/settlement/delete.png',
									activeUrl:'static/img/comprehensive/bottom.png',
									inputPicker:false,
									linkname:tpl.linkname,
									linksex:tpl.linksex == '0'?false:true,
									linktel:tpl.linktel,
									othermsg:tpl.othermsg,
									relation:tpl.relation
								}
								this.ContactsList.push(newObject)
							})
						}
						this.ContactsList.sort(function(a,b){
							return a.key - b.key
						})
						console.log('分步获取--->>>联系人',this.ContactsList)
						console.log('分步获取--->>>出险类型',body.data.claim.accidentInfo.accidentMode)
						let arr = body.data.claim.accidentInfo.accidentMode
						console.log(arr)
						arr.forEach( item =>{
							if(item.isselected == '1'){
								this.policyTypes+=item.reasoncode+','
							}
						})
						this.policyTypes = this.policyTypes.substr(0, this.policyTypes.length-1)
						console.log(this.policyTypes)
					}
				})
			},
			Next() {
				let AlertText = ''
				/*校验出险人数据*/
				console.log(this.User)
				if(this.User.name == ''){
					AlertText = '出险人姓名不能为空。'
				}else if(this.User.name!=''){
					let msg = utils.valid.names(this.User.name)
					if(msg != undefined && msg != ''){
						AlertText = "出险人"+msg
					}
					let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
					if(reg.test(this.User.name)){
						this.User.name = this.User.name.replace(/\s+/g, "")
					}
					if(this.User.name.length>=20){
						AlertText = '出险人名字不能超过20个字符。'
					}
				}else if(this.User.code.length>20){
					AlertText = '出险人证件号码不能大于20位字符。'
				}
				if(this.User.code == '' || !this.User.code || this.User.code == undefined){
					AlertText = '出险人证件号码不能为空。'
				}
				if(this.User.code){
					let sex  = this.User.sex==false?'1':'2'
					let msg = utils.valid.ngbc(this.User.nation, sex, this.User.Birthday, this.User.certifica, this.User.code)
					if(msg != undefined && msg != ''){
						console.log(msg)
						AlertText =  "出险人"+msg
					}
				}
				if(!this.User.isLongTerm && (this.User.data == undefined ||this.User.data == '' || this.User.data == '请选择')){
					AlertText = '出险人证件有效期不能为空。'
				}
				let endDataYear = new Date().getFullYear();
				let endDataMonth = new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1
				let endDataDay = new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate()
				let endData = endDataYear+'-'+endDataMonth+'-'+endDataDay
				if(!this.User.isLongTerm && new Date(this.User.data).getTime() < new Date(endData).getTime()){
					AlertText = '出险人证件有效期不能早于当前日期。'
				}
				/*校验联系人数据*/
				else if(this.ContactsList.length>0){
					console.log(this.ContactsList)
					let num = 0
					let relationNum = 0
					this.ContactsList.forEach( item =>{
						if(item.relation!=''){/*关系*/
							if(item.linkname == ''){
								AlertText = '联系人姓名不能为空。'
							}else {
								let patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
								if(patrn.exec(item.linkname)){ 
									if(item.linkname.indexOf(" ")==-1){
										// alert('不存在')
									}else{
										// alert('存在')
									}
								}
							}
							if(item.linktel == ''){
								AlertText = '联系人电话不能为空。'
							}
						}else if(item.linkname != ''){/*姓名*/
							if(item.relation == ''){
								AlertText = '联系人关系不能为空。'
							}
							if(item.linktel == ''){
								AlertText = '联系人电话不能为空。'
							}
						}else if(item.linktel){/*电话*/
							if(item.linkname == ''){
								AlertText = '联系人姓名不能为空。'
							}
							if(item.linktel == ''){
								AlertText = '联系人电话不能为空。'
							}
						}
						if(item.relation != '' && item.linkname != '' && item.linktel != ''){
							console.log('联系人数据填完，校验开始')
							/*校验姓名*/
							let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
							if(reg.test(item.linkname)){
								item.linkname = item.linkname.replace(/\s+/g, "")
							}
							let msg1 = utils.valid.names(item.linkname)
							if(msg1 != undefined && msg1 != ''){
								AlertText = "联系人"+msg1
							}
							console.log(item.linkname.length)
							if(item.linkname.length>=20){
								AlertText = '联系人名字不能超过20个字符。'
							}
							/*校验电话号码*/
							let arr = ['00000000','11111111','22222222','33333333','44444444','55555555','66666666','77777777','88888888','99999999']
							for(let i=1;i<4;i++){
								for(let j=0;j<arr.length;j++){
									if(item.linktel.substr(i,8) == arr[j]){
										console.log('连续八位数字校验')
										AlertText = '联系人手机号码不可以连续8位以上相同。'
									}
								}
							}
							if(item.linktel.length!= 11){
								AlertText = '联系人手机号码长度有误，请核对。'
							}
							let bodyNum = item.linktel.substr(0,2)
							if(bodyNum != '13' && bodyNum != '14' && bodyNum != '15' && bodyNum != '17' && bodyNum != '18'){
								AlertText = '联系人手机号码格式有误，请核对。'
							}
							/*校验关系*/ 
						}else  if(item.relation == '' && item.linkname == '' && item.linktel == ''){
							num +=1
						}
						if(item.relation == '00'){
							relationNum++
						}
					})
					console.log(relationNum)
					if(relationNum>1){
						AlertText = '联系人关系有误，请核对。'
					}
					if(num == this.ContactsList.length){
						console.log('报案人所有数据都没填写')
					}

					if(this.User.code.length == 15 && this.User.certifica == '11'){
						AlertText = '请您先协助客户进行证件号码变更。'
					}
					if(this.User.certifica == '' || this.User.certifica == '28'){
						AlertText = '请您先协助客户进行证件类型或证件号码变更'
					}
					if(AlertText != ''){
						this.Aleart(AlertText)
					}else{
						console.log('数据校验正常')
					}
				}
				/*校验报案人信息*/
				this.ContactsList.forEach( item => {
					if(item.linktel == this.Reported.rptormobile){
						AlertText = '报案人与联系人手机号不能一致。'

					}
				})
				console.log(this.Reported,this.ContactsList)
				// return false
				if(AlertText != ''){
					this.Aleart(AlertText)
				}else{
					this.ContactsList.forEach( item => {
						if(item.linksex == true){
							item.linksex = '1'
						}else if(item.linksex == false){
							item.linksex = '0'
						}
					})
					let linkMans = []
					console.log(this.ContactsList)
					this.ContactsList.forEach( item => {
						if(item.relation == '30'){
							item.relation = '31'
						}
					})
					this.ContactsList.forEach( item => {
						let newObject = {
							orders:item.key.toString(),
							relation:item.relation == '31'?'30':item.relation,/*关系*/
							linkname:item.linkname,/*姓名*/
							linksex:item.linksex,/*性别*/
							linktel:item.linktel,/*手机号*/
							othermsg:item.othermsg,/*关系text*/
						}
						linkMans.push(newObject)
					})

					console.log('分步保存--->>>出险人',this.User)
					linkMans.forEach((item,index) => {
						if(item.linktel == '' && item.linkname == ''){
							linkMans.splice(index,1)
						}
					})
					if(linkMans.length<=0){
						linkMans = ''
					}
					console.log('分步保存--->>>联系人',linkMans)
					console.log('分步保存--->>>出险人证件是否',this.isLongTerm)
					let requ = {
						data: {
							insured: {/*出险人信息*/
								insuredaddress: "",
								insuredbirthday: this.User.Birthday,/*出险人生日*/
								insuredidno: this.User.code,/*出险人证件号码*/
								insuredidtype: this.User.certifica,/*出险人证件类型*/
								insuredidexpdate: this.User.isLongTerm?'2200-12-31':this.User.data,/*出险人证件有效期*/
								insuredislong: this.User.isLongTerm?"1":"0",/*出险人证件是否长期*/
								insuredname: this.User.name,/*出险人姓名*/
								insurednation: this.User.nation,
								insuredmobile: "",
								insuredprofess: this.User.profess,
								insuredsex: this.User.sex == true?'1':'0',/*出险人性别*/
								insuredrelation:"",
								rptorbirthday: this.Reported.rptorbirthday,
								rptoremail: "",
								rptoridno: utils.cache.get('personsal').cerdNum,
								rptoridtype: "11",/*证件类型*/
								rptormangcom: this.Reported.rptormangcom,/*报案人所属机构*/
								rptormobile: this.Reported.rptormobile,/*报案人手机号*/
								rptorname: this.Reported.rptorname,/*报案人姓名*/
								rptorsex: this.Reported.rptorsex?'1':'0'/*报案人性别 0男 1女*/
							},
							linkMans: linkMans,
							claimType:"0",/*报案0,理赔1*/
							agentCode:utils.cache.get('personsal').agentCode,
							claimId:this.$route.params.claimId,
							claimStep:"2"
						},
						modelName: "claimService",
						methodName: "saveCliamInformation"
					}
					console.log('分步保存----->>>',requ)
					let user = {
						customerName:this.User.name,/*出险人姓名*/
						customerSex:this.User.sex,/*出险人性别*/
						customerBirthDay:this.User.data,/*出险人生日*/
						customerIDType:this.User.certifica,/*出险人证件类型*/
						customerIDNo:this.User.code,/*出险人证件号*/
						customerNative:this.User.nation,/*出险人国籍*/
					}
					/*保存出险人信息,影像上传页面需要展示出险人信息*/
					this.SetpolicyData(user)
					utils.http.postFast('CusbusinessService',requ,(body,header) => {
						console.log(body)
						console.log(header)
						if(body.data.code == 0){
							this.SetPolicyState('3')
							this.SetpolicyCode(this.$route.params.claimId)
							this.$router.push('/settlement_details/settlement_upload/'+this.policyTypes)
						}else{
							this.Aleart(data.body.msg)
						}
					})
				}
			}
		},
		watch:{
			ContactsList:{
				handler(val,old){
					console.log(val)
					console.log(old)					
					old.map( (v,i)=> {
						if(v.relation == '00'){
							v.linkname = this.User.name/*姓名*/
							v.linksex = this.User.sex/*性别*/
						}
						console.log(v.relation)
						if(v.relation == '30'){
							v.inputPicker = true
						}
					})
				},
				deep:true
			},
			User:{
				handler(val,old){
					console.log(old)
					this.ContactsList.map( v=> {
						if(v.relation == '00'){
							v.linkname = old.name/*姓名*/
							v.linksex = old.sex/*性别*/
						}
					})
				},
				deep:true
			},
			cardScanningValue:{
				handler(old,val){
					if(this.cardScanningValue.isopen == false){
						this.User.name = this.cardScanningValue.cusItem.name/*出险人姓名*/
						this.User.certifica = '11'/*出险人证件类型*/
						this.User.code = this.cardScanningValue.cusItem.id_card_number/*出险人证件号码*/
						this.User.data = this.cardScanningValue.cusItem.valid_date/*出险人证件有效期*/
						this.User.sex = this.cardScanningValue.cusItem.gender=='1'?false:true/*出险人性别*/
					}
				},
				deep:true
			}
		}
	}
</script>

<style>
.sel-detail-user-1 .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.sel-detail-user-1 .flex-end{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-right: 0!important;
}
.sel-detail-user-1 .fa-calendar{
	font-size:1.2rem;
}
.sel-detail-user-1 input[type='text']{
	text-align: right!important;
	min-height:1.8rem;
}
.sel-user-top{
	width:100%!important;
	padding:0 .7rem;
	height:2.2rem;
	background:#F8F8F8;
	box-sizing: border-box;
	border-bottom:2px solid #DDDDDD!important;
}
.feb101{
	color:#feb101;
}
.sel-user-top>img,
.sel-user-top>p>img{
	height:1rem;
	width:1rem;
}
.sel-cx-user{
	margin:0 auto;
}
.sel-cx-user>.flex{
	width: 85%;
	margin:0 auto;
}
.sel-cx-user>div{
	border-bottom:2px dotted #CECECE;
	min-height: 2.2rem;
	padding:0 10px;
}
.sel-detail-user-1>div>.sel-div-last{
	margin-top:1rem;
	display: flex;
	justify-content: center;
	border:none;
}
.sel-detail-user-1>div>.sel-div-last>button{
	background: #feb101;
	color:#fff;
	outline: none;
	border:none;
	height:2rem;
	width:8rem;
	margin-bottom:1rem;
	border-radius: 5px;
}
.sel-detail-user-1>div>div:last-child>button:active{
	opacity: .8;
}
.mint-msgbox-content{
	display: flex;
}
.mint-msgbox .mint-msgbox-message{
	width:100px;
}
.mint-msgbox-input{
	flex:1;
}
.mint-msgbox-input input{
	max-width:150px;
}
.mint-msgbox-message{
	width:80%!important;
}
.ocr-active {
	color: #FFAB00!important;
}
.ocr-none {
	color: #ccc!important;
}
.module-div{
	position:fixed;
	background:rgba(0,0,0,0.3);
	width:20rem;
	height:100%;
	top:0;
	left:0;
	z-index:1000
}
.module-div>div{
	background:#fff;
	width:80%;
	height:8rem;
	top:11rem;
	position:absolute;
	left:10%;
	border-radius: 10px;
}
.module-div>div>p:nth-child(1){
	background: #042C74;
	color:#fff;
	height:2.2rem;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	text-align:center;
	line-height: 2.2rem;
	font-size:.8rem;
}
.module-div>div>p:nth-child(2){
	display: flex;
	width:80%;
	margin:.5rem auto;
	align-items: center;
}
.module-div>div>p:nth-child(2)>span{
	width:40%;
}
.module-div>div>p:nth-child(2)>input{
	width:100%;
	border:1px solid #ccc;
	border-radius: 5px;
	height:1.2rem;
	text-align:left!important;
	padding-left:5px;
}
.module-div>div>button{
	display: block;
	background: #042C74;
	color:#fff;
	width:4rem;
	height:2rem;
	border:none;
	border-radius: 5px;
	margin: 1rem auto;
}
.sel-detail-user-1 input[type='text']:disabled{
	background: #fff!important;
	color: rgba(0,0,0,1)!important;
	opacity: 1!important;
}
.set-user-container p,
.set-user-container label,
.set-user-container input,
.set-user-container div{
	font-size:.8rem!important;
}
.fa{
	color: #feb101;
}
</style>