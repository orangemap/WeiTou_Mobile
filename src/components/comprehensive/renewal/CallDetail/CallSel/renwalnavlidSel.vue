<template>
	<!-- 失效可复效 -->
	<div class='renwal-navlid'>
		<div class='flex'>
			<p>管理机构</p>
			<div class='flex'>
				<year-picker class="picker" :values="InvalidMechanism" v-model="InvalidMechanism" :items="mechanismList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<div class='flex'>
			<p>保单号</p>
			<input type="text" style='text-align:right' placeholder="请输入想要查询的保单号" v-model='InvalidPolicyCode' maxlength="20">
		</div>
		<div class='flex'>
			<p>销售渠道</p>
			<div class='flex'>
				<year-picker class="picker" :values="InvalidChannel" v-model="InvalidChannel" :items="channelList" code="id" text="text">
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
		<div class='flex end-picker'>
			<p>保单状态</p>
			<div class='flex'>
				<year-picker class="picker" :values="InvalidPolicystate" v-model="InvalidPolicystate" :items="PolicyActiveList" code="id" text="text">
				</year-picker>
				<p class='call-detail-img-right'></p>
			</div>
		</div>
		<p><Alert ref="showalert"></Alert></p>
		<div class='flex' style="border:none">
			<button @click='goToTables()'>查询</button>
			<button @click='OnReset'>重置</button>
		</div>
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
				PolicyActiveList:[
				{id:'1',text:'失效'},
				{id:'2',text:'有效'}
				],
				CjPolicyYearList:[
				{id:'1',text:'首年度'},
				{id:'2',text:'2年度'},
				{id:'3',text:'3年度'},
				{id:'4',text:'4年度'},
				{id:'5',text:'5年度及以上'}
				],
				InvalidMechanism:'',/*管理机构*/
				InvalidPolicyCode:'',/*保单号*/
				InvalidChannel:'',/*销售渠道*/
				InvalidPolicyTypeList:[],/*保单类型*/
				InvalidPolicystate:'',/*保单状态*/
			}
		},
		computed:{
			...mapState(['LnvalidData']),
		},store,
		mounted(){
			if(this.LnvalidData){
				let NewArr = []
				if(this.LnvalidData.conttype){
					NewArr = this.LnvalidData.conttype.split(',')
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
				this.InvalidMechanism = this.LnvalidData.managecom/*管理机构*/
				this.InvalidPolicyCode = this.LnvalidData.contno/*保单号*/
				this.InvalidChannel = this.LnvalidData.channel/*销售渠道*/
				this.InvalidPolicystate = this.LnvalidData.contstate/*保单状态*/
			}
		},
		methods:{
			...mapMutations(['SetLnvalidData']),
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
			goToTables(){
				console.log('管理机构--->>>',this.InvalidMechanism)
				console.log('保单号--->>>',this.InvalidPolicyCode)
				console.log('销售渠道--->>>',this.InvalidChannel)
				console.log('保单类型--->>>',this.InvalidPolicyTypeList)
				if(this.InvalidPolicystate == 1){
					this.InvalidPolicystate = '失效'
				}else if(this.InvalidPolicystate == 2){
					this.InvalidPolicystate = '有效'
				}
				console.log('保单状态--->>>',this.InvalidPolicystate)
				let policyCodeActive = false
				if(!this.InvalidPolicyCode){
					policyCodeActive = true
				}else if(this.InvalidPolicyCode && /^[0-9]\d*$/.test(this.InvalidPolicyCode)){
					policyCodeActive = true
				}else if(this.InvalidPolicyCode && !/^[0-9]\d*$/.test(this.InvalidPolicyCode)){
					policyCodeActive = false
				}
				if(this.InvalidMechanism && policyCodeActive == true){
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
						managecom:this.InvalidMechanism,/*机构1/2*/
						contno:this.InvalidPolicyCode,/*保单号*/
						channel:this.InvalidChannel,/*销售渠道*/
						conttype:policyType,/*保单类型*/
						contstate:this.InvalidPolicystate,
						pageNum:'1'
					}
					this.SetLnvalidData(requ)
					this.$router.push('/comprehensiveXuqi/renewalInvalidTable')
				}else{
					if(!this.InvalidMechanism){
						this.Aleart('管理机构未输入')
					}else if(policyCodeActive == false){
						this.Aleart('保单号必须为纯数字')
					}
				}
			},
			OnReset(){
				this.InvalidMechanism = ''/*管理机构*/
				this.InvalidPolicyCode = ''/*保单号*/
				this.InvalidChannel = ''/*销售渠道*/
				this.InvalidPolicyTypeList = []/*保单类型*/
				this.InvalidPolicystate = ''/*保单状态*/
			}
		}
	}			
</script>
<style>
.renwal-navlid .flex{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.renwal-navlid>div{
	height:35px;
	border-bottom:1px dashed #c2c1c1;
	padding-left:1rem;
	padding-right:1rem;
}
.renwal-navlid .mbsc-control-ev{
	width: 100px!important;
	text-align: center;
}
.renwal-navlid>div:last-child{
	margin:20px 0;
}
.renwal-navlid button {
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