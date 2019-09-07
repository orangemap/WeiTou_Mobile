<template>
	<div class='senwal-still'>
		<div class='flex'>
			<p>管理机构</p>
			<div class='flex'>
				<year-picker class="picker" :values="StillValidSmechanism" v-model="StillValidSmechanism" :items="mechanismList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单号</p>
			<input type="text" style='text-align:right' placeholder="请输入想要查询的保单号" v-model='StillValidPolicyCode' maxlength="20" />
		</div>
		<div class='flex'>
			<p>销售渠道</p>
			<div class='flex'>
				<year-picker class="picker" :values="StillValidChannel" v-model="StillValidChannel" :items="channelList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单类型</p>
			<div class='flex policy-type' style='width:72%'>
				<label v-for='item in CjPolicyTypeList' :for='"d"+item.id'>
					<input type="checkbox"  class='checkbox-1' :value='item.id' :id='"d"+item.id' v-model='item.checked'/> 
					<span>{{item.text}}</span>
				</label>
			</div>
		</div>
		<div class='flex'>
			<p>生效日起期</p>
			<div class='flex SStartPicker'>
				<div>
					<mt-datetime-picker  ref='SStartPicker'  v-model="SStartDate"  @confirm='SetSStartDate' type="date"  year-format="{value} 年" month-format="{value} 月"  date-format="{value} 日" 
					:endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					<div @click='ShowPicker(10)' class='flex call-details-date'>
						<p :class='[SStart == "请选择" ? "show-date EEE" : "show-date"]'>{{SStart}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>生效日止期</p>
			<div class='flex SEndPicker'>
				<div>
					<mt-datetime-picker  ref='SEndPicker'  v-model="SEndDate"  @confirm='SetEndDate' type="date"  year-format="{value} 年" month-format="{value} 月"  date-format="{value} 日" 
					:endDate="SZendDate" :startDate="SZstartDate"></mt-datetime-picker>
					<div @click='ShowPicker(11)' class='flex call-details-date'>
						<p :class='[SEnd == "请选择" ? "show-date EEE" : "show-date"]'>{{SEnd}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>应收日起期</p>
			<div class='flex YStartPicker'>
				<div>
					<mt-datetime-picker  ref='YStartPicker'  v-model="YStartDate"  @confirm='SetYStartDate' type="date"  year-format="{value} 年" month-format="{value} 月"  date-format="{value} 日" 
					:endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					<div @click='ShowPicker(12)' class='flex call-details-date'>
						<p :class='[YStart == "请选择" ? "show-date EEE" : "show-date"]'>{{YStart}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>应收日止期</p>
			<div class='flex YEndPicker'>
				<div>
					<mt-datetime-picker  ref='YEndPicker'  v-model="YEndDate"  @confirm='SetYEndDate' type="date"  year-format="{value} 年" month-format="{value} 月"  date-format="{value} 日" 
					:endDate="YSendDate" :startDate="YSstartDate"></mt-datetime-picker>
					<div @click='ShowPicker(13)' class='flex call-details-date'>
						<p :class='[YEnd == "请选择" ? "show-date EEE" : "show-date"]'>{{YEnd}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<div class='flex'>
			<p>缴费频率</p>
			<div class='flex'>
				<div class='flex'>
					<year-picker class="picker" :values="StillValidFrequency" v-model="StillValidFrequency" :items="frequencyList" code="id" text="text">
					</year-picker>
					<p class='call-detail-img-right'></p>
				</div>
			</div>
		</div>
		<p><Alert ref="showalert"></Alert></p>
		<div class='flex' style='border:none'>
			<button @click='goToTables()'>查询</button>
			<button @click='ValidReset'>重置</button>
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
				howMOdal:false,
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
				StillValidSmechanism:'',/*管理机构*/
				StillValidPolicyCode:'',/*保单号*/
				StillValidChannel:'',/*销售渠道*/
				StillValidFrequency:'',/*缴费频率*/
				startDate:new Date('2000/01/01'),
				endDate:new Date(),
				SStart:'请选择',/*生效日起期*/
				SStartDate:new Date(),
				SEnd:'请选择',/*生效日止期*/
				SEndDate:new Date(),
				SZendDate:new Date(),
				SZstartDate:new Date('2010/01/01'),
				YStart:'请选择',/*应收日起期*/
				YStartDate:new Date(),
				YEnd:'请选择',/*应收日止期*/
				YEndDate:new Date(),
				YSstartDate:new Date('2000/01/01'),
				YSendDate:new Date()
			}
		},
		computed:{
			...mapState(['StillValidData']),
		},store,
		mounted(){
			console.log(this.StillValidData)
			if(this.StillValidData){
				let NewArr = []
				if(this.StillValidData.conttype){
					NewArr = this.StillValidData.conttype.split(',')
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
				this.StillValidSmechanism = this.StillValidData.managecom/*管理机构*/
				this.StillValidPolicyCode = this.StillValidData.contno/*保单号*/
				this.StillValidChannel = this.StillValidData.channel/*销售渠道*/
				this.StillValidFrequency = this.StillValidData.payintv/*缴费频率*/
				this.SStart = this.StillValidData.startcvalidate || '请选择'/*生效日起期*/
				this.SEnd = this.StillValidData.endcvalidate || '请选择'/*生效日止期*/
				this.YStart = this.StillValidData.startshouldpaydate || '请选择'/*应收日起期*/
				this.YEnd = this.StillValidData.endshouldpaydate || '请选择'/*应收日止期*/
			}
		},
		methods:{
			...mapMutations(['SetStillValidData']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			ShowPicker(type){
				if(type == 10){
					this.$refs.SStartPicker.open()
				}else if(type == 11){
					if(this.SStart == '' || this.SStart == '请选择'){
						this.Aleart('请先选择生效日起期')
					}else{
						this.$refs.SEndPicker.open()
					}
				}else if(type == 12){
					this.$refs.YStartPicker.open()
				}else if(type == 13){
					if(this.YStart == '' || this.YStart == '请选择'){
						this.Aleart('请先选择应收日起期')
					}else{
						this.$refs.YEndPicker.open()
					}
				}
			},
			filterArr(arr,list){
				let NewString = ''
				if(arr&&arr.length>0){
					arr.forEach( item => {
						list.forEach(tpl =>{
							if(item == tpl.id){
								NewString += (tpl.text+',')
							}
						})
					})
					return NewString.substring(NewString.length-1,0)
				}else{
					return ''
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
			SetSStartDate(){
				this.SStart = this.InitDate(this.SStartDate)
				this.SZstartDate = new Date(this.SStart)/*止期起始时间应为起期选择时间*/
				this.SEnd = '请选择'
				if(this.nextMonth(this.SStart)>this.InitDate(new Date())){/*如果应选择的3个月>new Date*/
					/*止期结束时间为new Date*/
					this.SZendDate = new Date(this.InitDate(new Date()))
				}else{
					/*止期结束时间为 正常开始时间的3个月后*/
					console.log('应选择的止期时间小于new Date')
					this.SZendDate = new Date(this.nextMonth(this.SStart))
				}
			},
			SetEndDate(){
				this.SEnd = this.InitDate(this.SEndDate)
			},
			SetYStartDate(){
				this.YStart = this.InitDate(this.YStartDate)
				this.YSstartDate = new Date(this.YStart)/*应收日止期起始时间应为起期选择的时间*/
				this.YEnd = '请选择'
				console.log('选择的应收日起期时间为---->>>',this.YStart)
				console.log('应收日止期时间应该为---->>>',this.nextMonth(this.YStart))
				if(this.nextMonth(this.YStart)>this.InitDate(new Date())){
					this.YSendDate = new Date()
				}else{
					this.YSendDate = new Date(this.nextMonth(this.YStart))
				}
			},
			SetYEndDate(){
				this.YEnd = this.InitDate(this.YEndDate)
			},
			goToTables(){
				console.log('管理机构----->>>',this.StillValidSmechanism)
				console.log('保单号----->>>',this.StillValidPolicyCode)
				console.log('销售渠道----->>>',this.StillValidChannel)
				console.log('保单类型----->>>',this.CjPolicyTypeList,)
				console.log('缴费频率----->>>',this.StillValidFrequency)
				let SStart = ''
				if(this.SStart == '请选择'){
					SStart = ''
				}else{
					SStart = this.SStart
				}
				let SEnd = ''
				if(this.SEnd == '请选择'){
					SEnd = ''
				}else{
					SEnd = this.SEnd
				}
				let YStart = ''
				if(this.YStart == '请选择'){
					YStart = ''
				}else{
					YStart = this.YStart
				}
				let YEnd = ''
				if(this.YEnd == '请选择'){
					YEnd = ''
				}else{
					YEnd = this.YEnd
				}
				
				let CodeActive = false/*校验保单号*/
				let dateActiveS = ''/*校验保单号为空时，生效日期规则*/
				let dataActiveY = ''/*校验保单号为空时，应收日期规则*/
				//保单号不输入时，必须填写2选1个时间
				if(this.StillValidSmechanism && (this.StillValidPolicyCode && /^[0-9]\d*$/.test(this.StillValidPolicyCode))){
					console.log('111')
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
						managecom:this.StillValidSmechanism,/*管理机构*/
						contno:this.StillValidPolicyCode,/*保单号*/
						channel:this.StillValidChannel,/*销售渠道*/
						conttype:policyType,/*保单类型*/
						payintv:this.StillValidFrequency,/*缴费频率*/
						startcvalidate:SStart,/*生效日起期*/
						endcvalidate:SEnd,/*生效日止期*/
						startshouldpaydate:YStart,/*应收日起期*/
						endshouldpaydate:YEnd,/*应收日止期*/
						pageNum:'1'
					}
					console.log(requ)
					this.SetStillValidData(requ)
					this.$router.push('/comprehensiveXuqi/renewalStillValidTable')
				}else{
					console.log(this.StillValidPolicyCode)
					if(!this.StillValidSmechanism){
					}else if(this.StillValidPolicyCode && !/^[0-9]\d*$/.test(this.StillValidPolicyCode)){
						this.Aleart('保单号只能为纯数字')
					}else if(this.StillValidPolicyCode == '' || this.StillValidPolicyCode == undefined){
						if((SStart == '' && SEnd != '') || (SStart != '' && SEnd == '')){
							dateActiveS = '生效日期请填写完整'
						}else if(SStart == '' && SEnd == ''){
							dateActiveS = '生效日期都未填写'
						}else if(SStart != '' && SEnd != ''){
							dateActiveS = '生效日填写完整'
						}
						if((YStart == '' && YEnd != '') || (YStart != '' && YEnd == '')){
							dataActiveY = '应收日期请填写完整'
						}else if(YStart == '' && YEnd == ''){
							dataActiveY = '应收日期都未填写'
						}else if(YStart != '' && YEnd != ''){
							dataActiveY = '应收日期填写完整'
						}
						if(dateActiveS == '生效日填写完整' && dataActiveY == '应收日期都未填写' || dataActiveY == '应收日期填写完整' && dateActiveS =='生效日期都未填写' || dateActiveS == '生效日填写完整' && dataActiveY == '应收日期填写完整'){
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
								managecom:this.StillValidSmechanism,/*管理机构*/
								contno:this.StillValidPolicyCode,/*保单号*/
								channel:this.StillValidChannel,/*销售渠道*/
								conttype:policyType,/*保单类型*/
								payintv:this.StillValidFrequency,/*缴费频率*/
								startcvalidate:SStart,/*生效日起期*/
								endcvalidate:SEnd,/*生效日止期*/
								startshouldpaydate:YStart,/*应收日起期*/
								endshouldpaydate:YEnd,/*应收日止期*/
								pageNum:'1'
							}
							console.log(requ)
							this.SetStillValidData(requ)
							this.$router.push('/comprehensiveXuqi/renewalStillValidTable')
						}else{
							console.log('shibai')
							if(dateActiveS == '生效日期请填写完整'){
								this.Aleart('生效日期请填写完整')
							}else if(dataActiveY == '应收日期请填写完整'){
								this.Aleart('应收日期请填写完整')
							}else if(dateActiveS == '生效日期都未填写' && dataActiveY == '应收日期都未填写'){
								this.Aleart('保单号为空时，必须填写生效日起期止期或应收日起期止期')
							}
						}
					}

				}
			},
			ValidReset(){
				this.StillValidSmechanism = ''
				this.StillValidPolicyCode = ''
				this.StillValidChannel = ''
				this.CjPolicyTypeList = []
				this.StillValidFrequency = ''
				this.SStart = '请选择'
				this.SEnd = '请选择'
				this.YStart = '请选择'
				this.YEnd = '请选择'
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
		}
	}
</script>
<style>
	.senwal-still .flex{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.senwal-still>div{
		height:35px;
		border-bottom:1px dashed #c2c1c1;
		padding-left:1rem;
		padding-right:1rem;
	}
	.senwal-still .mbsc-control-ev{
		width: 100px;
		text-align: center;
	}
	.senwal-still>div:last-child{
		margin:20px 0;
	}
	.senwal-still button {
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