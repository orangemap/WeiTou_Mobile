<template>
	<!-- 一年期短险 -->
	<div class='renwal-short'>
		<div class='flex'>
			<p>管理机构</p>
			<div class='flex'>
				<year-picker class="picker" :values="ShortMechanism" v-model="ShortMechanism" :items="mechanismList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单号</p>
			<input type="text" style='text-align:right' placeholder="请输入想要查询的保单号" v-model='ShortPolicyCode' maxlength="20" />
		</div>
		<div class='flex'>
			<p>销售渠道</p>
			<div class='flex'>
				<year-picker class="picker" :values="ShortChannel" v-model="ShortChannel" :items="channelList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单类型</p>
			<div class='flex policy-type' style='width:72%'>
				<label v-for='item in CjPolicyTypeList' :for='"b"+item.id'>
					<input type="checkbox"  class='checkbox-1' :value='item.id' :id='"b"+item.id' v-model='item.checked'/> 
					<span>{{item.text}}</span>
				</label>
			</div>
		</div>
		<div class='flex'>
			<p>交至日期所在月</p>
			<div class='flex ShortEndPicker'>
				<div>
					<mt-datetime-picker  ref='ShortEndPicker'  v-model="ShortMonth"  @confirm='SetShortEndDate' type="date"  year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
					:endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					<div @click='ShowPicker()' class='flex call-details-date'>
						<p :class='[ShortEndMonth == "请选择" ? "show-date EEE" : "show-date"]'>{{ShortEndMonth}}</p>
						<p class='call-detail-img-data'></p>
					</div>
				</div>
			</div>
		</div>
		<p>
			<Alert ref="showalert"></Alert>
		</p>
		<div class='flex' style='border:none'>
			<button @click='goToTables(2)'>查询</button>
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
				frequencyList: [
				{ id: '1', text: '月交' },
				{ id: '2', text: '年交' },
				{ id: '3', text: '趸交' }
				],
				PayList: [
				{ id: '1', text: '是' },
				{ id: '2', text: '否' }
				],
				startDate:new Date('2000/01/01'),
				endDate:new Date('2100/12/31'),
				ShortMechanism:'',/*管理机构*/
				ShortPolicyCode:'',/*保单号*/
				ShortChannel:'',/*销售渠道*/
				ShortPay:'',/*是否缴费*/
				ShortMonth:new Date(),
				ShortEndMonth:'请选择',/*交至日期所在月*/
			}
		},
		computed:{
			...mapState(['ShortData']),
		},store,
		mounted(){
			console.log(this.ShortData)
			if(this.ShortData){
				let NewArr = []
				if(this.ShortData.conttype){
					NewArr = this.ShortData.conttype.split(',')
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
				this.ShortMechanism = this.ShortData.managecom/*管理机构*/
				this.ShortPolicyCode = this.ShortData.contno/*保单号*/
				this.ShortChannel = this.ShortData.channel/*销售渠道*/
				this.ShortEndMonth = this.ShortData.paytoDate || '请选择'/*交至日期所在月*/
				console.log(this.CjPolicyTypeList)
			}
		},
		methods:{
			...mapMutations(['SetShortData']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
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
				return Date.getFullYear()+'/'+month
			},
			SetShortEndDate(){
				this.ShortEndMonth = this.InitDate(this.ShortMonth)
				console.log(this.ShortEndMonth)
			},
			ShowPicker(){
				this.$refs.ShortEndPicker.open()
				$('.picker-items>div:nth-child(3)').css('display','none')
			},
			goToTables(){
				if(!this.ShortMechanism || this.ShortPolicyCode && !/^[0-9]\d*$/.test(this.ShortPolicyCode)){
					if(!this.ShortMechanism){
						this.Aleart('管理机构未输入')
					}else if(!/^[0-9]\d*$/.test(this.ShortPolicyCode)){
						this.Aleart('保单号必须为纯数字')
					}
				}else{
					let month = ''
					if(this.ShortEndMonth == '请选择'){
						month = ''
					}else {
						month = this.ShortEndMonth
					}
					console.log(this.CjPolicyTypeList)
					let policyType = ''
					this.CjPolicyTypeList.forEach(item => {
						if(item.checked){
							policyType += item.text+','
						}
					})
					policyType = policyType.substr(0,policyType.length-1)
					let requ = {
						agentCode:this.agentCode,
						managecom:this.ShortMechanism,/*管理机构*/
						contno:this.ShortPolicyCode,/*保单号*/
						channel:this.ShortChannel,/*销售渠道*/
						conttype:policyType,/*保单类型*/
						payintv:this.ShortPay,/*是否缴费*/
						paytoDate:month,/*交至日期所在月*/
						pageNum:'1'
					}
					this.SetShortData(requ)
					console.log(requ)
					this.$router.push('/comprehensiveXuqi/renewalShortTable')
				}    
			},
			InitReset(){
				this.ShortMechanism = ''
				this.ShortPolicyCode = ''
				this.ShortChannel = ''
				this.ShortPolicyActiveList = []
				this.ShortPay = ''
				this.ShortEndMonth = '请选择'
			}
		}
	}
</script>

<style>
.renwal-short .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.renwal-short>div{
	height:35px;
	border-bottom:1px dashed #c2c1c1;
	padding-left:1rem;
	padding-right:1rem;
}
.renwal-short .mbsc-control-ev{
	width: 100px;
	text-align: center;
}
.renwal-short>div:last-child{
	margin:20px 0;
}
.renwal-short button {
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