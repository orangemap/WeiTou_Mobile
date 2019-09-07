<template>
	<div class='sel-user' style='overflow: hidden;'>
		<Headerbtns title="客户选择" class='sel-user-head'>
			<div slot="left" class="back" @click='goToBack'>
				<i class="fa fa-angle-left"></i>
			</div>
		</Headerbtns>
		<div class='sel-user-content'>
			<div class='flex sel-user-sel'>
				<input type="text" placeholder="请输入投保人姓名" v-model='searchName'/>
				<button class='sel-user-search-btn' @click='getSearchName'>查询</button>
			</div>
			<div style='overflow-y: scroll' class='loaded-div'>
				<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='加载中...' :auto-fill='false'>
					<div v-for='(item,index) in UserList' class='user-list' v-show='item.isShow == true'>
						<div class='flex flex-center' style='height:2.8rem'>
							<img :src="[item.customerSex=='0'?nanUrl:nvUrl]" style='min-width:30px!important;height:30px;width:30px;'>
							<p style='width:8rem;padding-left:2px'>投保人 : {{item.customerName}}</p>
							<p style='width:5rem;padding-left:2px;'>{{item.date}}岁</p>
							<p style='width:5rem;min-width: 70px;'>{{item.customerBirthday}}</p>
							<div class='flex flex-center' style='width:10%;justify-content: flex-end;'>
								<img src="static/img/comprehensive/bottom.png" v-if='item.active == false' style='width:1rem;height:1rem' @click='toggleShow(item)'>
								<img src="static/img/comprehensive/top.png" v-if='item.active == true' style='width:1rem;height:1rem' @click='toggleShow(item)'>
							</div>
						</div>
						<div v-for='tpl in item.insuredList' class='flex flex-center user-child-list' v-if='item.active'>
							<p>被保人 : {{tpl.insuredName}}</p>
							<p>{{tpl.age}}岁</p>
							<div class='flex flex-center' style='width:25%;padding-right:1rem'>
								<p style='width:2.5rem;'>{{tpl.insuredToAppnt | ralationFilter}}</p> <!--ralationBaoQuanFilter-->
								<img :src="detailUrl" @click='goToSettlementDetail(tpl,item.customerName)'/>
							</div>
						</div>
					</div>
					<p v-if='count>=totalnum && UserList.length>8' style='width: 100%;text-align: center;color: #666;margin:10px 0'>----------- 我是有底线的 -----------</p>
				</mt-loadmore>
				<p class='user-change-gxText'  v-if='titleState === true'>*因投保时填写投被保险人关系为单项关系，如“父亲、女儿”等，可能会影响投被保险人关系的查询结果！</p>
				<div v-if='titleState === true' style='height: 100%;width: 100%;display: flex;justify-content: center;align-items: center;'>
					<span style='color: #666;font-size: 1.2rem;font-weight: bold;margin:1rem;text-align: center;line-height: 1.5rem;color: blue'>您可在输入框输入投保人姓名全称或姓名关键字查询。</span>
				</div>
			</div>
		</div>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>

<script>
	import Headerbtns from '@/components/policy/common/Header'
    import '../policy/css/base.css'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/settlement/index.js'
	import Alert from '@/components/policy/common/alert.vue'
	export default {
		components:{Headerbtns,Alert},
		data() {
			return {
				UserList:[],
				topUrl:'static/img/comprehensive/bottom.png',
				btmUrl:'static/img/comprehensive/top.png',
				nanUrl:'static/img/settlement/nan.png',
				nvUrl:'static/img/settlement/nv.png',
				detailUrl:'static/img/settlement/detail.png',
				searchName:'',
				count:1,
				startnum:1,
				endnum:20,
				totalnum:100,
				allLoaded:false,
				titleState:true
			}
		},
		computed: {
			...mapState(['policyData','insuredNative','policyCode','customerName']),
			searchList:function(){
				var search = this.searchName
				if(search){
					console.log(this.UserList)
					return this.UserList.filter(function(product) {
						return Object.keys(product).some(function(key) {
							return String(product[key]).toLowerCase().indexOf(search) > -1
						})
					})
				}
				return this.UserList;
			}
		},store,
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth/20+'px'
			this.media.header($('.sel-user-content'))
			$('.sel-user-content').css('height',this.media.container(this.screenHeight,0)).css('margin-top',$('.sel-user-head').outerHeight(true)+'px')
			// this.getUserList("",'1','20')
			this.SetpolicyData({})
			let newheight = this.screenHeight - $('.sel-user-head').outerHeight(true) - $('.sel-user-sel').outerHeight(true)
			$('.loaded-div').css('height',newheight-5+'px')
		},
		methods: {
			...mapMutations(['SetpolicyData','SetinsuredNative','SetpolicyCode','SetcustomerName']),
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			loadBottom() {
				this.count ++
				this.startnum+=20
				this.endnum+=20
				if(this.count<this.totalnum){
					this.newGetUserList(this.searchName,this.startnum.toString(),this.endnum.toString(),'')
					setTimeout(()=>{
						this.allLoaded = true;
						this.$refs.loadmore.onBottomLoaded();
					},1500)
					setTimeout(()=> {
						this.allLoaded = false;
						this.$refs.loadmore.onBottomLoaded();
					},2500)
				}else{
					this.allLoaded = true;
					this.$refs.loadmore.onBottomLoaded();
				}
			},
			toggleShow(item) {
				this.UserList.forEach( (tpl,index) => {
					if(item.id == tpl.id && item.customerName == tpl.customerName){
						if(!tpl.active){
							this.getUserChildList(tpl.customerName,'1','20',tpl.customerNo)
							tpl.url = 'static/img/comprehensive/bottom.png'
						}else {
							item.insuredList = []
							tpl.url = 'static/img/comprehensive/top.png'
						}
						tpl.active = !tpl.active
					}
					this.$set(this.UserList,index,tpl)
				})
			},
			goToBack() {
				this.$router.push('/settlement')
			},
			getSearchName() {
				this.count = 1
				if(this.searchName!=''){
					this.titleState = false
					this.getUserList(this.searchName,'1','20','')
				}else{
					this.Aleart('请输入投保人姓名')
				}
			},
			goToSettlementDetail(item,name) {
				this.SetcustomerName(name)
				let requ = {
					data: {
						insuredName: item.insuredName,
						insuredIdNo: item.insuredIdNo,
						claimType:this.$route.params.type
					},
					modelName: "claimService",
					methodName: "isClaiming"
				}
				console.log(requ)
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(body)
					console.log(header)
					if(body.data.code == 0){
						let newObject = {
							customerName:item.insuredName,/*客户姓名*/
							customerSex:item.insuredSex,/*客户性别*/
							customerBirthDay:item.insuredBirthday,/*客户⽣⽇*/
							customerIDType:item.insuredIdType,/*证件类型*/
							customerIDNo:item.insuredIdNo,/*证件号*/
							customerNative:item.insuredNative,/*国籍*/
							customerIDStartDate:item.insuredIDStartDate,/*证件有效期起期*/
							customerIDExpDate:item.insuredIDExpDate,/*证件有效期止期*/
							customerAge:item.age,/*年龄*/
							customerOccupation:item.insuredIWorkType,/*职业*/
							relation:item.insuredToAppnt/*被保人与投保人关系*/
						}
						console.log('客户列表保存的出险人信息',newObject)
						this.SetpolicyData(newObject)
						this.SetinsuredNative(item.insuredNative)
						this.SetpolicyCode('new')
						if(this.$route.params.type == '0'){
							this.$router.push('/settlement_details/settlement_policy/new')
						}else if(this.$route.params.type == '1'){
							this.$router.push('/settlement_content/settlement_policy/start/new')
						}
					}else{
						this.Aleart(body.data.msg)
					}
				})
			},
			getUserChildList(customerName,startnum,endnum,customerNo){
				let requ = {
					data:{
						customerNo:customerNo,
						customerType:"",
						customerName:customerName,
						customerIdNo:"",
						customerBirthday:"",
						startnum:startnum,
						endnum:endnum,
						agentCode:utils.cache.get('personsal').agentCode
					},
					modelName: "claimService",
					methodName: "customerList"
				}
				let arr = []
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(body)
					console.log(header)
					if(header.responseCode == 0){
						// if(body.customerList && body.customerList.length>0 && body.customerList[0].applyContList.length>0 &&body.customerList[0].applyContList[0].insuredList>0){
							arr = body.data.customerList[0].applyContList[0].insuredList
							console.log(arr)
							arr.map(t => {
								t.age = utils.valid.getAge(t.insuredBirthday)
							})
							this.UserList.map( (item,index) => {
								item.insuredList = []
								if(item.customerNo == customerNo){
									item.insuredList = arr
								}
								this.$set(this.UserList,index,item)
							})
						// } 
					}
				})
				console.log(this.UserList)
			},
			getUserList(customerName,startnum,endnum,customerNo){
				let requ = {
					data:{
						customerNo:"",
						customerType:"",
						customerName:customerName,
						customerIdNo:"",
						customerBirthday:"",
						startnum:startnum,
						endnum:endnum,
						agentCode:utils.cache.get('personsal').agentCode
					},
					modelName: "claimService",
					methodName: "customerList"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(body)
					console.log(header.responseCode)
					if(header.responseCode == 0){
						this.UserList = body.data.customerList
						let isNum = (body.data.totleNum / 20)
						this.totalnum = isNum %1 === 0 ? isNum : parseInt(isNum)+1
						if(this.UserList && this.UserList.length>0){
							this.UserList.forEach( (item,index) => {
								item.id = index
								item.url = 'static/img/comprehensive/bottom.png'
								item.active = false
								item.date = utils.valid.getAge(item.customerBirthday)
								item.isShow = true
							})
						}
						// this.UserList.forEach( item =>{
						// 	if(item.applyContList.length>0 && item.applyContList[0].insuredList){
						// 		item.applyContList[0].insuredList.forEach( tpl => {
						// 			tpl.age = utils.valid.getAge(tpl.insuredBirthday)
						// 		})
						// 	}
						// })
					}
				})
			},
			newGetUserList(customerName,startnum,endnum){
				let requ = {
					data:{
						customerNo:"",
						customerType:"",
						customerName:customerName,
						customerIdNo:"",
						customerBirthday:"",
						startnum:startnum,
						endnum:endnum,	
						agentCode:utils.cache.get('personsal').agentCode
					},
					modelName: "claimService",
					methodName: "customerList"
				}
				utils.http.postFast('CusbusinessService',requ,(body,header) => {
					console.log(body)
					console.log(header.responseCode)
					if(header.responseCode == 0){
						let UserList = body.data.customerList
						if(UserList && UserList.length>0){
							UserList.forEach( (item,index) => {
								item.id = index
								item.url = 'static/img/comprehensive/bottom.png'
								item.active = false
								item.date = utils.valid.getAge(item.customerBirthday)
								item.isShow = true
							})
							// UserList.forEach( item =>{
							// 	if(item.applyContList.length>0 && item.applyContList[0].insuredList){
							// 		item.applyContList[0].insuredList.forEach( tpl => {
							// 			tpl.age = utils.valid.getAge(tpl.insuredBirthday)
							// 		})
							// 	}
							// })
							console.log('上啦返回',UserList)
							this.UserList = this.UserList.concat(UserList)
							console.log('页面所有',this.UserList)
							this.$refs.loadmore.onBottomLoaded();
						}
					}
				})
			}
		},
		beforeDestroy() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		}
	}
</script>

<style>
.sel-user p{
	font-size: .7rem
}
.sel-user .flex{
	display: flex;
	align-items: center;
}
.sel-user .flex-center{
	justify-content: space-between;
}
.sel-user-content::-webkit-scrollbar {
	display:none
}
.sel-user input[type='text']{
	text-align: left!important;
}
.sel-user-head .back{
	/* padding-top:3px; */
}
.sel-user-content .sel-user-sel{
	background: #F1F1F1;
	height:3rem;
	align-items: center;
	padding:0 1rem;
	justify-content: space-between;
}
.sel-user-content input{
	box-sizing: border-box;
	border:1px solid #ccc;
	border-radius: 5px;
	height:2rem;
	width:100%;
	padding-left:5px;
}
.sel-user .btn-sel{
	background: #feb101;
	color: #fff;
	border-radius: 5px;
	outline: none;
	border:none;
	height:2rem;
	width:18%;
}
.sel-user .btn-sel:active{
	opacity: 0.8
}
.sel-user .user-list{
	padding:0 1rem;
	border-bottom:5px solid #ccc;
}
.sel-user .user-child-list{
	margin-left:2rem;
	margin-bottom:2px;
	border-bottom: 1px dotted #ccc;
	height:2.2rem;
}
.sel-user .user-child-list:last-child{
	margin-bottom:2px;
}
.sel-user .user-child-list img{
	width:1.5rem;
	/*height:2rem;*/
}
.sel-user .sel-user-search-btn{
	background:#feb101;
	color: #fff;
	border:none;
	outline: none;
	width:50px;
	border-radius: 5px;
	height:2rem;
	margin-left:10px;
}
.fa{
	color: #feb101;
}
.loaded-div{
	position: relative;
}
.sel-user .user-change-gxText{
	position: absolute;
	top:10px;
	left:10px;
	font-size: .9rem;
	color: #666;
}
</style>