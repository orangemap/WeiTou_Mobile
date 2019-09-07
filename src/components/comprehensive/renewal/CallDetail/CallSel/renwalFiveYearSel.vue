<template>
	<div class='renwal-fiveyear'>
		<div class='flex'>
			<p>管理机构</p>
			<div class='flex'>
				<year-picker class="picker" :values="FiveYearSmechanism" v-model="FiveYearSmechanism" :items="mechanismList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单号</p>
			<input type="text" style='text-align:right' placeholder="请输入想要查询的保单号" v-model='FiveYearPolicyCode' maxlength="20" />
		</div>
		<div class='flex'>
			<p>销售渠道</p>
			<div class='flex'>
				<year-picker class="picker" :values="FiveYearChannel" v-model="FiveYearChannel" :items="channelList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单类型</p>
			<div class='flex policy-type' style='width:72%'>
				<label v-for='item in CjPolicyTypeList' :for='"c"+item.id'>
					<input type="checkbox"  class='checkbox-1' :value='item.id' :id='"c"+item.id' v-model='item.checked'/> 
					<span>{{item.text}}</span>
				</label>
			</div>
		</div>
		<div class='flex'>
			<p>五年保证续保险种生效日期起期</p>
			<div class='flex FiveSStartPicker'>
				<div>
					<mt-datetime-picker  ref='FiveSStartPicker'  v-model="FiveSStartDate"  @confirm='SetFiveSStartDate' type="date"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
					:endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					<div @click='ShowPicker(6)' class='flex call-details-date'>
						<p :class='[FiveSStart == "请选择" ? "show-date EEE" : "show-date"]'>{{FiveSStart}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>五年保证续保险种生效日期止期</p>
			<div class='flex FiveSEndPicker'>
				<div>
					<mt-datetime-picker  ref='FiveSEndPicker'  v-model="FiveSEndDate"  @confirm='SetFiveSEndDate' type="date"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
					:endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					<div @click='ShowPicker(7)' class='flex call-details-date'>
						<p :class='[FiveSEnd == "请选择" ? "show-date EEE" : "show-date"]'>{{FiveSEnd}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>五年保证续保险种交至日期起期</p>
			<div class='flex FiveEStartPicker'>
				<div>
					<mt-datetime-picker  ref='FiveEStartPicker'  v-model="FiveEStartDate"  @confirm='SetFiveEStartDate' type="date"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
					:endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					<div @click='ShowPicker(8)' class='flex call-details-date'>
						<p :class='[FiveEStart == "请选择" ? "show-date EEE" : "show-date"]'>{{FiveEStart}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>五年保证续保险种交至日期止期</p>
			<div class='flex FiveEEndPicker'>
				<div>
					<mt-datetime-picker  ref='FiveEEndPicker'  v-model="FiveEEndDate"  @confirm='SetFiveEEndDate' type="date"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
					:endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					<div @click='ShowPicker(9)' class='flex call-details-date'>
						<p :class='[FiveEEnd == "请选择" ? "show-date EEE" : "show-date"]'>{{FiveEEnd}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>缴费频率</p>
			<div class='flex'>
				<year-picker class="picker" :values="FivFrequency" v-model="FivFrequency" :items="frequencyList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<p>
			<Alert ref="showalert"></Alert>
		</p>
		<div class='flex' style='border:none'>
			<button @click='goToTables()'>查询</button>
			<button @click='InitReset()'>重置</button>
		</div>
	</div>
</template>

<script>
	import Headerbtns from '@/components/policy/common/Header'
	import yearPicker from '@/components/common/Picker.vue'
	import Alert from '@/components/policy/common/alert'
	import DatePicker from '@/components/common/newDatePicker'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/comprehensive/comprehensive'
	export default {
		components: {
			yearPicker,DatePicker,Alert
		},
		data() {
			return {
				showMOdal:false,
				agentCode:utils.cache.get('personsal').agentCode,
				mechanismList: [
				{ id: '1', text: '分公司' },
				{ id: '2', text: '中支公司' }
				],
				channelList: [
				{ id: '01', text: '个险' },
				{ id: '02', text: '银保渠道' },
				{ id: '03', text: '旧综合金融' },
				{ id: '04', text: '新综合金融' },
				{ id: '05', text: '经代通渠道' },
				{ id: '06', text: '续期渠道' }
				],
				CjPolicyTypeList:[
				{id:'1',text:'专职单',checked:false},
				{id:'2',text:'在职单',checked:false},
				{id:'3',text:'收展新单',checked:false}
				],
				frequencyList: ['月交','趸交','季度交','半年交','年交'],
				PayList: [
				{ id: '1', text: '是' },
				{ id: '2', text: '否' }
				],
				startDate:new Date('2000/01/01'),
				endDate:new Date('2100/12/31'),
				FiveYearSmechanism:'',/*管理机构*/
				FiveYearPolicyCode:'',/*保单号*/
				FiveYearChannel:'',/*渠道*/
				FiveYearPay:'',/*是否缴费*/
				FiveSStartDate:new Date(),
				FiveSStart:'请选择',/*五年保证续保险种生效日期起期*/
				FiveSEndDate:new Date(),
				FiveSEnd:'请选择',/*五年保证续保险种生效日期止期*/
				FiveEStartDate:new Date(),
				FiveEStart:'请选择',/*五年保证续保险种交至日期起期*/
				FiveEEndDate:new Date(),
				FiveEEnd:'请选择',/*五年保证续保险种交至日期止期*/
				FivFrequency:'',/*缴费频率*/
			}
		},
		computed:{
			...mapState(['FiveYearData']),
		},store,
		mounted(){
			
			console.log(this.FiveYearData)
			if(this.FiveYearData){
				// this.CjPolicyTypeList 保单类型
				let NewArr = []
				if(this.FiveYearData.conttype){
					NewArr = this.FiveYearData.conttype.split(',')
				}
				console.log(NewArr)
				this.CjPolicyTypeList.map(v=>{
					v.checked = false
					NewArr.map(c=>{
						if(v.text == c){
							console.log(v)
							v.checked = true
						}
					})
				})
				this.FiveYearSmechanism = this.FiveYearData.managecom/*管理机构*/
				this.FiveYearPolicyCode = this.FiveYearData.contno/*保单号*/
				this.FiveYearChannel = this.FiveYearData.channel/*渠道*/
				this.FiveSStart = this.FiveYearData.startfiveriskcvalidate || '请选择'/*五年保证续保险种生效日期起期*/
				this.FiveSEnd = this.FiveYearData.endfiveriskcvalidate || '请选择'/*五年保证续保险种生效日期止期*/
				this.FiveEStart = this.FiveYearData.startfiveriskpaytodate || '请选择'/*五年保证续保险种交至日期起期*/
				this.FiveEEnd = this.FiveYearData.endfiveriskpaytodate || '请选择'/*五年保证续保险种交至日期止期*/
				this.FivFrequency = this.FiveYearData.payintv/*缴费频率*/
			}
		},
		methods:{
			...mapMutations(['SetFiveYearData']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			InitDate(Date){
				let month = Date.getMonth()
				if((month+1)<=9){
					month = '0'+(month+1)
				}else{
					month = month+1
				}
				let date = Date.getDate()
				if(date<=9){
					date = '0'+date
				}
				return Date.getFullYear()+'/'+month+'/'+date
			},
			ShowPicker(type){
				if(type == 6){
					this.$refs.FiveSStartPicker.open()
				}else if(type == 7){
					this.$refs.FiveSEndPicker.open()
				}else if(type == 8){
					this.$refs.FiveEStartPicker.open()
				}else if(type == 9){
					this.$refs.FiveEEndPicker.open()
				}
			},
			goToTables(){
				console.log('管理机构----->>>',this.FiveYearSmechanism)
				console.log('保单号----->>>',this.FiveYearPolicyCode)
				console.log('渠道----->>>',this.FiveYearChannel)
				console.log('保单类型list----->>>',this.CjPolicyTypeList)
				console.log('五年保证续保险种生效日期起期----->>>',this.FiveSStart)
				let FiveSStart = ''
				if(this.FiveSStart == '请选择' || this.FiveSStart == ''){
					FiveSStart = ''
				}else{
					FiveSStart = this.FiveSStart
				}
				console.log('五年保证续保险种生效日期止期----->>>',this.FiveSEnd)
				let FiveSEnd = ''
				if(this.FiveSEnd == '请选择' || this.FiveSEnd == ''){
					FiveSEnd = ''
				}else{
					FiveSEnd = this.FiveSEnd
				}
				console.log('五年保证续保险种交至日期起期----->>>',this.FiveEStart)
				let FiveEStart = ''
				if(this.FiveEStart == '请选择' || this.FiveEStart == ''){
					FiveEStart = ''
				}else{
					FiveEStart = this.FiveEStart
				}
				console.log('五年保证续保险种交至日期止期----->>>',this.FiveEEnd)
				let FiveEEnd = ''
				if(this.FiveEEnd == '请选择' || this.FiveEEnd == ''){
					FiveEEnd = ''
				}else{
					FiveEEnd = this.FiveEEnd
				}
				console.log('缴费频率----->>>',this.FivFrequency)
				let codeAtive = false
				if(!this.FiveYearPolicyCode){
					codeAtive = true
				}else if(this.FiveYearPolicyCode && !/^[0-9]\d*$/.test(this.FiveYearPolicyCode)){
					codeAtive = false
				}else if(this.FiveYearPolicyCode && /^[0-9]\d*$/.test(this.FiveYearPolicyCode)){
					codeAtive = true
				}
				/*验证五年保证续保险种生效日止期不能大于起期*/
				console.log('五年保证续保险种生效日期起期----->>>',FiveSStart)
				console.log('五年保证续保险种生效日期止期----->>>',FiveSEnd)
				let SxDate = false
				if(FiveSStart == ''&& FiveSEnd == ''){
					SxDate = true
				}else if(FiveSStart == '' && FiveSEnd != '' || FiveSStart != '' && FiveSEnd == ''){
					SxDate = false
					this.Aleart('五年保证续保险种生效日期请填写完整')
				}else if(FiveSStart != '' && FiveSEnd != ''){
					if(FiveSEnd>=FiveSStart){
						SxDate = true
					}else{
						SxDate = false
						this.Aleart('五年保证续保险种生效日期止期应晚于起期')
					}
				}
				console.log('五年保证续保险种交至日期起期----->>>',FiveEStart)
				console.log('五年保证续保险种交至日期止期----->>>',FiveEEnd)
				let JzDate = false
				if(FiveEStart == ''&& FiveEEnd == ''){
					JzDate = true
				}else if(FiveEStart == '' && FiveEEnd != '' || FiveEStart != '' && FiveEEnd == ''){
					JzDate = false
					this.Aleart('五年保证续保险种交至日期请填写完整')
				}else if(FiveEStart != '' && FiveEEnd != ''){
					console.log(FiveEEnd>=FiveEStart)
					if(FiveEEnd>=FiveEStart){
						JzDate = true
					}else{
						JzDate = false
						this.Aleart('五年保证续保险种交至日期止期应晚于起期')
					}
				}
				console.log('校验1.管理机构----->>>',this.FiveYearSmechanism)
				console.log('校验2.保单号------->>>',codeAtive)
				console.log('校验3.生效日状态----->>>',SxDate)
				console.log('校验4.交至日状态----->>>',JzDate)
				if(this.FiveYearSmechanism && codeAtive == true && SxDate == true && JzDate == true){
					/*修改保单类型的数据格式*/
					let policyType = ''
					for(let i=0;i<this.CjPolicyTypeList.length;i++){
						if(this.CjPolicyTypeList[i].checked){
							policyType+= this.CjPolicyTypeList[i].text+','
						}
					}
					policyType = policyType.substr(0,policyType.length-1)
					let requ = {
						agentCode:this.agentCode,
						managecom:this.FiveYearSmechanism,
						contno:this.FiveYearPolicyCode,
						channel:this.FiveYearChannel,
						conttype:policyType,
						payintv:this.FivFrequency,
						startfiveriskcvalidate:FiveSStart,
						endfiveriskcvalidate:FiveSEnd,
						startfiveriskpaytodate:FiveEStart,
						endfiveriskpaytodate:FiveEEnd,
						pageNum:'1'
					}
					this.SetFiveYearData(requ)
					this.$router.push('/comprehensiveXuqi/renewalFiveYearTable')
				}else{
					if(!this.FiveYearSmechanism){
						this.Aleart('管理机构未输入')
					}else if(codeAtive == false){
						this.Aleart('保单号只能为纯数字')
					}
				}
			},
			InitReset(){
				this.FiveYearSmechanism = ''/*管理机构*/
				this.FiveYearPolicyCode = ''/*保单号*/
				this.FiveYearChannel = ''/*渠道*/
				this.FiveYearPay = ''/*是否缴费*/
				this.FiveSStart = '请选择'/*五年保证续保险种生效日期起期*/
				this.FiveSEnd = '请选择'/*五年保证续保险种生效日期止期*/
				this.FiveEStart = '请选择'/*五年保证续保险种交至日期起期*/
				this.FiveEEnd = '请选择'/*五年保证续保险种交至日期止期*/
				this.FivFrequency = ''/*缴费频率*/
			},
			SetFiveSStartDate(){
				this.FiveSStart = this.InitDate(this.FiveSStartDate)
			},
			SetFiveSEndDate(){
				this.FiveSEnd = this.InitDate(this.FiveSEndDate)
			},
			SetFiveEStartDate(){
				this.FiveEStart = this.InitDate(this.FiveEStartDate)
			},
			SetFiveEEndDate(){
				this.FiveEEnd = this.InitDate(this.FiveEEndDate)
			}
		}
	}	
</script>
<style>
.renwal-fiveyear .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.renwal-fiveyear>div{
	height:35px;
	border-bottom:1px dashed #c2c1c1;
	padding-left:1rem;
	padding-right:1rem;
}
.renwal-fiveyear .mbsc-control-ev{
	width: 100px;
	text-align: center;
}
.renwal-fiveyear>div:last-child{
	margin:20px 0;
}
.renwal-fiveyear button {
	width: 100px;
	height: 35px;
	background: #FEB101;
	color: #FFF;
	text-align: center;
	outline: none;
	line-height: 35px;
	border: none;
	border-radius: 5px;
}
</style>