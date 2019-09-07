<template>
	<!-- 1.催缴明细 -->
	<div class='renwal-call-sel'>
		<div class='flex'>
			<p>管理机构</p>
			<div class='flex'>
				<year-picker class="picker" :values="mechanism" v-model="mechanism" :items="mechanismList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单号</p>
			<input type="text" style='text-align:right' placeholder="请输入想要查询的保单号" v-model='CjdetailCode' maxlength="20" />
		</div>
		<div class='flex'>
			<p>销售渠道</p>
			<div class='flex'>
				<year-picker class="picker" :values="MyChannel" v-model="MyChannel" :items="channelList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单类型</p>
			<div class='flex policy-type' style='width:72%'>
				<label v-for='item in CjPolicyTypeList' :for='item.text'>
					<input type="checkbox"  class='checkbox-1' :value='item.text' :id='item.text' v-model='item.checked'/> 
					<span>{{item.text}}</span>
				</label>
			</div>
		</div>
		<div class='flex'>
			<p>应缴日起期</p>
			<div class='flex StartPicker'>
				<div>
					<mt-datetime-picker  ref='YingJiaoStartPicker'  v-model="YingJiaoStartDate"  @confirm='SetYingJiaoStartDate' type="date"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					<div @click='ShowPicker(1)' class='flex call-details-date'>
						<p :class='[YingJiaoStart == "请选择" ? "show-date EEE" : "show-date"]'>{{YingJiaoStart}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>应缴日止期</p>
			<div class='flex EndPicker'>
				<div>
					<mt-datetime-picker  ref='YingJiaoEndDate'  v-model="YingJiaoEndDate"  @confirm='SetYingJiaoEndDate' type="date"  year-format="{value} 年" month-format="{value} 月"  date-format="{value} 日" 
					:endDate="NewEndDate" :startDate="NewStartDate"></mt-datetime-picker>
					<div @click='ShowPicker(2)' class='flex call-details-date'>
						<p :class='[YingJiaoEnd == "请选择" ? "show-date EEE" : "show-date"]'>{{YingJiaoEnd}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>交费日起期</p>
			<div class='flex JiaoFeiStartPicker'>
				<div>
					<mt-datetime-picker  ref='JiaoFeiStartPicker'  v-model="JiaoFeiStartDate"  @confirm='SetJiaoFeiStartDate' type="date"  year-format="{value} 年" month-format="{value} 月"  date-format="{value} 日" 
					:endDate="PayEndDate" :startDate="PayStartDate"></mt-datetime-picker>
					<div @click='ShowPicker(3)' class='flex call-details-date'>
						<p :class='[JiaoFeiStart == "请选择" ? "show-date EEE" : "show-date"]'>{{JiaoFeiStart}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>交费日止期</p>
			<div class='flex JiaoFeiEndPicker'>
				<div>
					<mt-datetime-picker  ref='JiaoFeiEndPicker'  v-model="JiaoFeiEndDate"  @confirm='SetJiaoFeiEndDate' type="date"  year-format="{value} 年" month-format="{value} 月"  date-format="{value} 日" 
					:endDate="PayEndDate" :startDate="PayStartDate"></mt-datetime-picker>
					<div @click='ShowPicker(4)' class='flex call-details-date'>
						<p :class='[JiaoFeiEnd == "请选择" ? "show-date EEE" : "show-date"]'>{{JiaoFeiEnd}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>缴费频率</p>
			<div class='flex'>
				<year-picker class="picker" :values="frequency" v-model="frequency" :items="frequencyList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<p><Alert ref="showalert"></Alert></p>
		<div class='flex' style='border:none'>
			<button @click='goToTables(1)'>查询</button>
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
				// CjPolicyTypeList:['专职单','在职单','收展新单'],
				CjPolicyTypeList:[
					{checked:false,text:'专职单'},
					{checked:false,text:'在职单'},
					{checked:false,text:'收展新单'}
				],
				frequencyList: ['月缴','趸缴','季度缴','半年缴','年缴'],
				startDate:new Date('2000/01/01'),
				endDate:new Date(),
				mechanism:'',/*管理机构*/
				CjdetailCode:'',/*保单号*/
				frequency: '',/*催缴明细缴费频率*/
				MyChannel:'',/*渠道*/
				YingJiaoStartDate:new Date(),
				YingJiaoStart:'请选择',/*催缴明细-应缴起期*/
				YingJiaoEndDate:new Date(),
				YingJiaoEnd:'请选择',/*催缴明细-应缴止期*/
				JiaoFeiStartDate:new Date(),
				JiaoFeiStart:'请选择',/*催缴明细-交费起期*/
				JiaoFeiEndDate:new Date(),
				JiaoFeiEnd:'请选择',/*催缴明细-交费止期*/
				CjPolicys:[],/*催缴明细-保单类型选中list*/
				PayStartDate:new Date('2000/01/01'),/*交费日起期*/
				PayEndDate:new Date(),/*交费日止期*/
				policyAvtive:false,/*判断保单号*/
				NewStartDate:new Date('2000/01/01'),/*应缴日止期起始时间*/
				NewEndDate:new Date()/*应缴日止期结束时间*/
			}
		},
		computed:{
			...mapState(['CallData']),
		},store,
		mounted(){
			if(this.CallData){
				let NewArr = []
				if(this.CallData.conttype){
					NewArr = this.CallData.conttype.split(',')
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
				console.log(this.CjPolicyTypeList)
				this.mechanism = this.CallData.managecom/*机构*/
				this.CjdetailCode = this.CallData.contno/*保单号*/
				this.MyChannel = this.CallData.channel/*销售渠道*/
				this.YingJiaoStart = this.CallData.startPaytodate || '请选择'/*应缴日起期*/
				this.YingJiaoEnd = this.CallData.endPaytodate || '请选择'/*应缴日止期*/
				this.JiaoFeiStart = this.CallData.startTmakedate || '请选择'/*交费日起期*/
				this.JiaoFeiEnd = this.CallData.endTmakedate || '请选择'/*交费日止期*/
				this.frequency = this.CallData.payintv/*缴费频率*/
			}
		},
		methods:{
			...mapMutations(['SetCallData']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			SetYingJiaoStartDate(){
				this.YingJiaoStart = this.InitDate(this.YingJiaoStartDate)
				console.log(this.YingJiaoStart)
				this.YingJiaoEnd = '请选择'
			},
			SetYingJiaoEndDate(){
				this.YingJiaoEnd = this.InitDate(this.YingJiaoEndDate)
			},
			SetJiaoFeiStartDate(){
				this.JiaoFeiStart = this.InitDate(this.JiaoFeiStartDate)
			},
			SetJiaoFeiEndDate(){
				this.JiaoFeiEnd = this.InitDate(this.JiaoFeiEndDate)
			},
			ShowPicker(type){
				if(type == 1){
					this.$refs.YingJiaoStartPicker.open()
				}else if(type == 2){
					if(this.YingJiaoStart == '' || this.YingJiaoStart == '请选择'){
						this.Aleart('请先选择应缴日起期')
					}else{
						// this.NewEndDate
						let eDate = this.nextMonth(this.YingJiaoStart)
						console.log('应该设定的应缴日止期结束时间为---->>>',eDate)
						console.log('应该设定的应缴日止期起始时间为---->>>',this.YingJiaoStart)
						console.log(eDate>this.InitDate(new Date()))
						if(eDate>this.InitDate(new Date())){
							//如果应该设定的时间>new Date 结束日期止期应为 new Date
							//结束日期起期应为 new Date
							console.log(1)
							this.NewStartDate = new Date(this.YingJiaoStart)
							this.NewEndDate = new Date()
						}else{
							console.log(2)
							//否则结束日期为应设定时间 && 止期开始时间为起期结束时间
							this.NewStartDate = new Date(this.YingJiaoStart)
							this.NewEndDate = new Date(eDate)
						}
						// console.log(eDate>this.InitDate(new Date()))
						this.$refs.YingJiaoEndDate.open()
					}
				}else if(type == 3){
					this.$refs.JiaoFeiStartPicker.open()
				}else if(type == 4){
					this.$refs.JiaoFeiEndPicker.open()
				}
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
			InitReset(){
				this.mechanism = ''
				this.CjdetailCode = ''
				this.MyChannel = ''
				this.CjPolicyTypeList.map(v=>{
					v.checked = false
				})
				this.CjPolicyActiveYearList = []
				this.frequency = ''
				this.JiaoFeiStart = '请选择'
				this.JiaoFeiEnd = '请选择'
				this.YingJiaoStart = '请选择'
				this.YingJiaoEnd = '请选择'
				this.CjIsPay = ''
			},
			goToTables(){
				console.log('交费日起期',this.JiaoFeiStart)
				console.log('交费日止期',this.JiaoFeiEnd)
				let YingJiaoStart = ''
				if(this.YingJiaoStart == '请选择'){
					YingJiaoStart = ''
				}else {
					YingJiaoStart = this.YingJiaoStart
				}
				let YingJiaoEnd = ''
				if(this.YingJiaoEnd == '请选择'){
					YingJiaoEnd = ''
				}else {
					YingJiaoEnd = this.YingJiaoEnd
				}
				let JiaoFeiStart = ''
				if(this.JiaoFeiStart == '请选择'){
					JiaoFeiStart = ''
				}else {
					JiaoFeiStart = this.JiaoFeiStart
				}
				let JiaoFeiEnd = ''
				if(this.JiaoFeiEnd == '请选择'){
					JiaoFeiEnd = ''
				}else{
					JiaoFeiEnd = this.JiaoFeiEnd
				}
				if(!this.CjdetailCode){/*保单号未填写，校验应缴日期起期与止期为必填项*/
					if(this.YingJiaoStart!='' && this.YingJiaoStart != '请选择' && this.YingJiaoEnd !='' && this.YingJiaoEnd!= '请选择'){
						/*保单号未填写，应缴日起期止期正常*/
						this.policyAvtive = true
					}else{
						/*保单号未填写，应缴日起期止期异常*/
						this.policyAvtive = false
					}
				}else{/*保单号填写完毕*/
					this.policyAvtive = true
				}
				let monthsEnd = false/*校验交费日止期不能早于起期*/
				if(this.JiaoFeiStart!= '' && this.JiaoFeiStart!= '请选择' && this.JiaoFeiEnd!= '' && this.JiaoFeiEnd!= '请选择'){
					if(this.JiaoFeiEnd>=this.JiaoFeiStart){
						monthsEnd = true
					}else{
						monthsEnd = false
					}
				}else{
					monthsEnd = true
				}
				let isPaymonth = false/*校验交费日起期止期如果有一个填写，则另一个必须填写*/
				if(this.JiaoFeiStart == '请选择' && this.JiaoFeiEnd != '请选择' || this.JiaoFeiStart != '请选择' && this.JiaoFeiEnd == '请选择'){
					isPaymonth = false
				}else{
					isPaymonth = true
				}
				if(!this.mechanism || monthsEnd == false || this.policyAvtive == false || isPaymonth == false){
					if(!this.mechanism){
						this.Aleart('请选择管理机构')
					}else if(this.policyAvtive == false){
						this.Aleart('保单号未填写,应缴日期起期与应缴日止期为必填项,且时间在三个月内')
					}else if(monthsEnd == false){
						this.Aleart('交费日止期应晚于交费日起期')
					}else if(isPaymonth == false){
						this.Aleart('交费日如需填写,起期和止期请填写完整')
					}
				}else{
					if(this.CjdetailCode && (!/^[0-9]\d*$/.test(this.CjdetailCode))){
						this.Aleart('保单号必须为纯数字')
					}else{
						/*所有数据全部填选正常*/
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
							managecom:this.mechanism,/*机构1/2*/
							contno:this.CjdetailCode,/*保单号*/
							channel:this.MyChannel,/*销售渠道*/
							conttype:policyType,/*保单类型*/
							payintv:this.frequency,/*缴费频率*/
							startTmakedate:JiaoFeiStart,/*交费日起期*/
							endTmakedate:JiaoFeiEnd,/*交费日止期*/
							startPaytodate:YingJiaoStart,/*应缴日起期*/
							endPaytodate:YingJiaoEnd,/*应缴日止期*/
							pageNum:'1'
						}
						this.SetCallData(requ)
						this.$router.push('/comprehensiveXuqi/renewalCallDetailTable')
					}
				}
			},
			nextMonth(stopdate){
				let newDate = new Date(stopdate);
				newDate.setMonth((newDate.getMonth()-1)+4);
				let newMonth = ''
				if((newDate.getMonth()+1)<10){
					newMonth = '0'+(newDate.getMonth()+1)
				}else{
					newMonth = (newDate.getMonth()+1)
				}
				return newDate.getFullYear()+'/'+newMonth+'/'+newDate.getDate()
			}
	},
}
</script>

<style>
.renwal-call-sel .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.renwal-call-sel>div{
	height:35px;
	border-bottom:1px dashed #c2c1c1;
	padding-left:1rem;
	padding-right:1rem;
}
.renwal-call-sel .mbsc-control-ev{
	width: 100px;
	text-align: center;
}
.renwal-call-sel>div:last-child{
	margin:20px 0;
}
.renwal-call-sel button {
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