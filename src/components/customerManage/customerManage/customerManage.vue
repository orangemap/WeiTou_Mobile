<template>
	<div>
		<div class="content">
			<Headerbtns :title="page_title" v-show="aa">
				<div slot="left"  @click="left">
					<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
				</div>
				<div slot="right" class="right" @click="add()">
					<img src="static/img/customerManage/add.png" alt="" style="position: relative;top:-12px;"/>
				</div>
			</Headerbtns>
			<div class="search">
					<div class="input flex flexs" style="position: relative;">
						<input type="text" placeholder="请输入姓名/手机号" v-model="name" style="color: #000;" />
						<div style="position: absolute;right: 0 ;top: 21px;width: 15%;" class="flex flexs">
							<div class="imgs" @click="getSearchName()">
								<img src="static/img/customerManage/serach.png" alt="" />
							</div>
							<div style="height: 13px;border: 1px solid #B7B7B7;"></div>
							<div class="img" @click="getSearch()">
								<i class="fa fa-bars" style="font-size: large;color: #C8C8C8;"></i>
							</div>
						</div>
					</div>
					
			</div>
			<div class="main-contents" style=''>
				<div style='overflow-y: scroll;width: 100%;padding-top:60px;' class='loaded-div'>
					<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='加载中...' :auto-fill='false'>
						<div style="width: 100%;">
							<div class="list" v-for="(items,index) in customer" data-type="0">
								<!--<div style="width: 95%;margin: auto;">-->
								<div>
									<v-swipeout v-if="items.memberType == '0'"
								  	:autoClose="true"
								  	:style="{ backgroundColor: '#ddd'}"
								  	:right="[{
								      		text: 'delete',
								      		onPress: deleteBtn,
								      		data:items,
								      		index:index,
								      		src:'static/img/customerManage/deltel.png',
								      		style: { backgroundColor: '#F5F5F5' }
								    	}]"
								  	:onOpen="openCb"
								  	:onClose="closeCb">
								    <div class="flexs" style="height: 3.5rem;line-height: 3.5rem;" @click="goToDetail(items.infoId)">
								    	<img v-if="items.fileurl != undefined" :src="items.fileurl" style='margin-left:6%;width:40px;height:40px;border-radius: 50%;'/>
										<img v-if="items.fileurl == undefined && items.sex==1" :src="nanUrl" style='margin-left:6%;width:40px;height:40px'>
										<img v-if="items.fileurl == undefined && items.sex==2" :src="nvUrl" style='margin-left:6%;width:40px;height:40px'>
										<img v-if="items.fileurl == undefined && (items.sex==undefined || items.sex=='')" :src="othUrl" style='margin-left:6%;width:40px;height:40px'>
										<div class="info">
											<div style="color: #000;font-size: 14px;">{{items.name}}</div>
											<div class="flexs" style="color: #666;">
												<div style="width: 40px;white-space:nowrap;font-size: 12px;">{{items.retirementAge}}岁&nbsp;&nbsp;</div>
												<div style="height: 8px;border: 1px solid #999;"></div>
												<div style="font-size: 12px;margin-left: 5px;">&nbsp;&nbsp;{{items.mobilePhone}}</div>
											</div>
										</div>
										<div style="position: absolute;top: 14%;right: 4%;width: 28px;height: 28px;" v-if="items.memberType == '0'">
											<img src="static/img/customerManage/zhun.png" alt="" style="width: 100%;height: 100%;"/>
										</div>
									</div>
								</v-swipeout>
								<div v-if="items.memberType != '0'" @click="goToDetail(items.infoId)" class="flexs" style="height: 3.5rem;line-height: 3.5rem;">
										<img v-if="items.fileurl != undefined" :src="items.fileurl" style='margin-left:6%;width:40px;height:40px;border-radius: 50%;'/>
										<img v-if="items.fileurl == undefined && items.sex==1" :src="nanUrl" style='margin-left:6%;width:40px;height:40px'>
										<img v-if="items.fileurl == undefined && items.sex==2" :src="nvUrl" style='margin-left:6%;width:40px;height:40px'>
										<img v-if="items.fileurl == undefined && (items.sex==undefined || items.sex=='')" :src="othUrl" style='margin-left:6%;width:40px;height:40px'>
										<div class="info" @click="goToDetail(items.infoId)">
											<div style="color: #000;font-size: 14px;">{{items.name}}</div>
											<div class="flexs" style="color: #666;">
												<div style="width: 45px;white-space:nowrap;font-size: 12px;">{{items.retirementAge}}岁&nbsp;&nbsp;</div>
												<div style="height: 8px;border: 1px solid #999;"></div>
												<div style="width: 45px;font-size: 12px;">&nbsp;&nbsp;{{items.mobilePhone}}</div>
											</div>
										</div>
										<!--<div style="position: absolute;top: 18%;right: 2%;width: 40px;height: 35px;" v-if="items.memberType == '0'">
											<img src="static/img/customerManage/zhun.png" alt="" style="width: 100%;height: 100%;"/>
										</div>-->
									</div>
								</div>
							</div>
						</div>
						<p v-if='count>=totalnum && customer.length>8' style='width: 100%;text-align: center;color: #666;margin:10px 0'>----------- 到底了，无更多记录 -----------</p>
					</mt-loadmore>
					<div v-if='titleState === true' style='height: 100%;width: 100%;display: flex;justify-content: center;margin-top: 36px;'>
						<span style='font-size: 0.8rem;margin:1rem;text-align: center;line-height: 1.5rem;'>您还未维护客户信息，请点击【新增客户】来维护客户信息，或者点击【通讯录导入】来导入客户信息</span>
					</div>
				</div>
			</div>
		</div>
		<div v-show="!aa">
			<div style="width:100%; height:100%;position:fixed; top :0px;background-color:rgba(0,0,0,0.1);text-align:center;z-index:22222;" @click="vvv()">
			</div>
			<div style="width:100%; position:absolute; top :0px;background-color:rgba(0,0,0,0.3);text-align:center;z-index:22222">
				<Headerbtns title="查询条件">
					<div slot="left" class="back" @click="left">
						<i class="fa fa-angle-left" style="color: #FDB92C!important;"></i>
					</div>
				</Headerbtns>
				<div class="detail" style="background:#fff;font-size: 0.85rem;">
					<div>
						<div style="width: 100%;border-top: 1px solid #EDEDED;">
							<div style="width: 95%;margin: auto;">
								<div class="flexs flex" style="border-bottom: 1px solid #EDEDED;line-height: 1.1rem;padding: 4% 0 4% 3%;">
									<div class="info-left">姓名</div>
									<input class="info-size" type="text" placeholder="请输入客户姓名" style="text-align: end;" v-model="name" />
								</div>
								<div class="flexs flex" style="border-bottom: 1px solid #EDEDED;line-height: 1.1rem;padding: 4% 0 4% 3%;">
									<div class="info-left" style="width: 67%;">性别</div>
									<input id="insure_gender_male" name="gender" type="radio" value="1" style="width: 16px;height: 16px;border-radius: 8px;float: none;margin-left: 2px;" v-model="sex" />
									<label for="insure_gender_male" style="margin-bottom: -2px;"></label><label class="info-size" for="insure_gender_male" style="padding-right: 10px;padding-top: -10px;">男</label>
									<input id="insure_gender_female" name="gender" type="radio" value="2" style="width: 16px;height: 16px;border-radius: 8px;float: none;margin-left: 2px;" v-model="sex" />
									<label for="insure_gender_female" style="margin-left: 10px;margin-bottom: -2px;"></label><label class="info-size" for="insure_gender_female" style="">女</label>
								</div>
								<div class="flexs flex" style="border-bottom: 1px solid #EDEDED;line-height: 1.1rem;padding: 4% 0 4% 3%;">
									<div class="info-left">年龄</div>
									<age class="info-size" @getChildAge="getChildAge" ref='closeAge'></age>
								</div>
								<div class="flexs flex" style="border-bottom: 1px solid #EDEDED;line-height: 1.1rem;padding: 4% 0 4% 3%;">
									<div class="info-left" style="width: 57%;">类别</div>
									<input id="insure_gender" name="member" type="radio" value="0" style="width: 16px;height: 16px;border-radius: 8px;float: none;margin-left: 2px;" v-model="memberType" />
									<label for="insure_gender" style="margin-bottom: -2px;"></label><label class="info-size" for="insure_gender" style="padding-right: 10px;padding-top: -10px;">准客户</label>
									<input id="insure_genders" name="member" type="radio" value="1" style="width: 16px;height: 16px;border-radius: 8px;float: none;margin-left: 2px;" v-model="memberType" />
									<label for="insure_genders" style="margin-left: 10px;margin-bottom: -2px;"></label><label class="info-size" for="insure_genders" style="">客户</label>
								</div>
							</div>
						</div>
						<div class="btn-wrapper">
							<div class="add-btn" @click="cancle()" style="background: #fff;color:#A8A8A8">重置</div>
							<div class="add-btn" @click="search()">查询</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-show="bb">
			<div style="width:100%; height:100%;position:fixed; top :0px;background-color:rgba(0,0,0,0.1);text-align:center;z-index:22222;" @click="www()">
			</div>
			<div style="position:absolute; top :10%;right:2%;text-align:left;z-index:22222;background: #FDB92C;color: #fff;width: 37%;border: 1px solid #FEBA00;border-radius: 4px;">
				<div>
					<div class="flexs flex" style="border-bottom: 0.5px solid #fff;line-height: 1.2rem;margin-right: 0;padding: 8%;justify-content:flex-start!important" @click="goToAdd()">
						<div style="width: 18px;height: 18px;">
							<img src="static/img/customerManage/addPerson.png" alt="" style='width:100%;height:100%' />
						</div>
						<div style="height:1.2rem;margin-left: 9px;font-size: 16px;">新增客户</div>
					</div>
					<div class="flexs flex" style="line-height: 1.2rem;margin-right: 0;padding: 8%;justify-content: flex-start!important" @click="goToPhone()">
						<div style="width:14px;height: 16px;">
							<img src="static/img/customerManage/addIn.png" alt="" style='width:100%;height:100%' />
						</div>
						<div style="height:1.2rem;margin-left: 12px;font-size: 16px;">通讯录导入</div>
					</div>
				</div>
			</div>
		</div>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>
<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import age from '../../common/age.vue'
	import Alert from '@/components/policy/common/alert'
	import VSwipeout from '../../common/swipeout/swipeout.vue'
	import '../../policy/css/base.css'
	export default {
		name: 'customerManage',
		components: {
			Headerbtns,
			age,Alert,
			VSwipeout
		},
		data() {
			return {
				page_title: '客户管理',
				page_titles: '查询条件',
				nanUrl: 'static/img/settlement/nan.png',
				nvUrl: 'static/img/settlement/nv.png',
				othUrl: 'static/img/settlement/sex.png',
				startX: 0,
				endX: 0,
				aa: true,
				bb: false,
				count: 0,
				name: '',
				pageNum: 1,
				pageSize: 10,
				memberType: '',
				retirementAge: '',
				retirementAges: '',
				sex: '',
				totalnum: 100,
				allLoaded: false,
				titleState: false,
				customer: '',
				itemList: '',
				itemIndex: '',
				infoId:'',
			}
		},
		mounted() {
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			let _loaded=$('.search')
			var u = navigator.userAgent;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if (isiOS) {
			   _loaded.css({
			    top: "68px"
			  });
			  if (screen.height == 812 && screen.width == 375) {
			    _loaded.css({
			     top:"92px"
			  });
			  }
			}else{
			     _loaded.css({
			    top: "48px"
			  });
			}
			this.media.header($('.detail'))
			let listHeight = this.screenHeight-$('.new-header-title').outerHeight(true)+$('.search').outerHeight(true)	
			$('.loaded-div').css('height',listHeight+'px')
			this.manageLists('', '1', '10', '', '', '',"")
		},
		methods: {
		    deleteBtn (event,index,items) {
		    	console.log(index)
		    	console.log(items)
		      	this.itemList = items
				this.itemIndex = index
				alert_n22.confirm('提示', '确定要删除该客户？', '确定', '取消', (flag) => {
					this.Yes()
				})
		    },
		    openCb () {
		      console.log('open')
		    },
		    closeCb () {
		      console.log('close')
		    },
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/home')
			},
			Aleart(message) {
				this.$refs.showalert.showMOdal(message)
			},
			goToDetail(id){
				if(!this.loading){
					this.infoId=id
					this.customer.map(v=> {
						if(v.infoId == id && !v.active){
							console.log(v.active)
							this.go('/customer/detail?infoId='+this.infoId+'&prosess=1')
						}
					})
				}else{
					console.log('正在滑动...')
				}
				
			},
			getChildAge(e) {
				let age = e
				this.retirementAge = age[0]
				this.retirementAges = age[1]
			},
			loadBottom() {
				console.log(2222222)
				console.log(this.totalnum)
				this.loading=true
				this.count++
					console.log(this.count)
				this.pageNum += 1
				if(this.count < this.totalnum) {
					this.newGetUserList(this.name, this.pageNum.toString(), '10', this.memberType, this.retirementAge, this.retirementAges, this.sex)
					setTimeout(() => {
						this.allLoaded = true;
						this.$refs.loadmore.onBottomLoaded();
					}, 1500)
					setTimeout(() => {
						this.allLoaded = false;
						this.$refs.loadmore.onBottomLoaded();
					}, 2500)
				} else {
					this.allLoaded = true;
					this.$refs.loadmore.onBottomLoaded();
				}
				setTimeout(() => {
					this.loading=false
				}, 2000)
			},
			getSearchName() {
				this.count = 1
				this.manageList(this.name, '1', '10', '', '', '', '')
			},
			//页面初始进入的查询
			manageLists(name, pageNum, pageSize, memberType, retirementAge, retirementAges, sex) {
				let requ = {
					"data": {
						"agentcode": utils.cache.get('personsal').agentCode, //CQ00208
						"memberType": memberType, //准客户
						"phoneName": name,
						"pageNum": pageNum, //2
						"pageSize": pageSize, //5
						"retirementAge": String(retirementAges), //40
						"retirementAges": String(retirementAge), //30
						"sex": sex, //1
					},
					"methodName": "customerListQuery",
					"modelName": "customerManagementListQueryService"
				}
				console.log(JSON.stringify(requ))
				utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode=='0'){
							this.customer = body.data.memberLnfoList
							let isNum = (body.data.totalnum / 10)
							this.totalnum = isNum % 1 === 0 ? isNum : parseInt(isNum) + 1
							if(this.customer && this.customer.length>0){
								this.customer.forEach( (item,index) => {
									item.active = false
									item.skip=false
									if(item.memberType=='0'){
										item.skip=true
									}
									if(item.fileurl!=undefined){
										item.fileurl = item.fileurl
									}
								})
							}
							console.log(this.totalnum)
						}else{
							this.customer=[]
							this.titleState=true
						}
				})
			},
			//有条件的查询方法
			manageList(name, pageNum, pageSize, memberType, retirementAge, retirementAges, sex) {
				let requ = {
					"data": {
						"agentcode": utils.cache.get('personsal').agentCode, //CQ00208
						"memberType": memberType, //准客户
						"phoneName": name,
						"pageNum": pageNum, //2
						"pageSize": pageSize, //5
						"retirementAge": String(retirementAges), //40
						"retirementAges": String(retirementAge), //30
						"sex": sex, //1
					},
					"methodName": "customerListQuery",
					"modelName": "customerManagementListQueryService"
				}
				console.log(JSON.stringify(requ))
				utils.http.postFast('BusinessService', requ, (body) => {
						if(body.data.newCustomerOne.resultCode=='0'){
							this.customer = body.data.memberLnfoList
							let isNum = (body.data.totalnum / 10)
							this.totalnum = isNum % 1 === 0 ? isNum : parseInt(isNum) + 1
							if(this.customer && this.customer.length>0){
								this.customer.forEach( (item,index) => {
									item.active = false
									item.skip=false
									if(item.memberType=='0'){
										item.skip=true
									}
									if(item.fileurl!=undefined){
										item.fileurl = item.fileurl
									}
								})
							}
							console.log(this.totalnum)
						}else{
							this.customer=[]
							this.Aleart('没有符合条件的数据')
						}
				})
			},
			newGetUserList(name, pageNum, pageSize, memberType, retirementAge, retirementAges, sex) {
				let requ = {
					"data": {
						"agentcode": utils.cache.get('personsal').agentCode, //CQ00208
						"memberType": memberType, //准客户
						"phoneName": name,
						"pageNum": pageNum, //2
						"pageSize": pageSize, //5
						"retirementAge": retirementAge, //40
						"retirementAges": retirementAges, //30
						"sex": sex, //1
					},
					"methodName": "customerListQuery",
					"modelName": "customerManagementListQueryService"
				}
				console.log(JSON.stringify(requ))
				utils.http.postFast('BusinessService', requ, (body) => {
					if(body.data.newCustomerOne.resultCode=='0'){
						let customer = body.data.memberLnfoList
						if(customer &&customer.length>0){
							customer.forEach( (item,index) => {
								if(item.fileurl!=undefined){
									item.fileurl = item.fileurl
								}
							})
						}
						//							console.log('上啦返回',customer)
						this.customer = this.customer.concat(customer)
						console.log('页面所有', this.customer)
						this.$refs.loadmore.onBottomLoaded();
					}
				})
			},
			getSearch() {
				this.aa = false
				//				this.search()
			},
			search() {
				this.aa = true
				this.manageList(this.name, '1', '10', this.memberType, this.retirementAge, this.retirementAges, this.sex)
			},
			cancle(){
				console.log(111)
				console.log(this.retirementAge)
				this.name=''
				this.sex=''
				this.memberType=''
				this.retirementAge=''
				this.retirementAges=''
				this.$refs.closeAge.dataRange=[0,0]
			},
			add() {
				this.bb = true
			},
			www(){
				this.bb = false
			},
			vvv(){
				this.aa = true
			},
			goToAdd(){
				this.go('/customer/customerAdd')
			},
			goToPhone(){
				this.go('/customer/customerPhone')
			},
			//跳转
			skip() {
				if(this.checkSlide()) {
					this.restSlide(2);
				} else {
					//					alert('You click the slide!')
				}
			},
			//滑动开始
			touchStart(e,items) {
				console.log(e,items)
				// 记录初始位置
//				console.log(this.customer)
				console.log(11111)
//				if(items.skip){
					this.startX = e.touches[0].clientX;
//				}
			},
			//滑动结束
			touchEnd(e,items) {
				// 当前滑动的父级元素
				let parentElement = e.currentTarget.parentElement;
				// 记录结束位置
				this.endX = e.changedTouches[0].clientX;
				// 左滑
				console.log(items)
				if(parentElement.dataset.type == 0 && (this.startX - this.endX) > 60 && items.skip) {
					this.restSlide(1);
					parentElement.dataset.type = 1;
					this.customer.map((v,i)=> {
						if(v.infoId == items.infoId){
							v.active = !v.active
						}
						this.$set(this.customer,i,v)
					})
//					console.log(this.customer)
				}
				// 右滑
				if(parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
					this.restSlide(2);
					parentElement.dataset.type = 0;
				}
				this.startX = 0;
				this.endX = 0;
			},
			//判断当前是否有滑块处于滑动状态
			checkSlide() {
				let listItems = document.querySelectorAll('.list');
				for(let i = 0; i < listItems.length; i++) {
					if(listItems[i].dataset.type == 1) {
						return true;
					}
				}
				return false;
			},
			//复位滑动状态
			restSlide(id) {
				let listItems = document.querySelectorAll('.list');
				// 复位
				for(let i = 0; i < listItems.length; i++) {
					listItems[i].dataset.type = 0;
				}
				if(id==2){
					this.customer.map((v,i)=> {
						v.active = false
						this.$set(this.customer,i,v)
					})
					console.log(this.customer)
				}
			},
			//删除
			deleteItem(index, items) {
				this.itemList = items
				this.itemIndex = index
				alert_n22.confirm('提示', '确定要删除该客户？', '确定', '取消', (flag) => {
					this.Yes()
				})
				// 当前索引
				//				let index = e.currentTarget.dataset.index;
				// 复位
				this.restSlide();
				// 删除
				//				
			},
			Yes() {
				let requ = {
					"data": {
						//				            "agentcode": utils.cache.get('personsal').agentCode,
						"infoId": this.itemList.infoId,
						//             				"memberType": this.itemList.memberType
					},
					"methodName": "deleteByIdProspectiveCustomers",
					"modelName": "customerManagementListQueryService"
				}
				console.log(JSON.stringify(requ))
				utils.http.postFast('BusinessService', requ, (body) => {
					if(body.data.newCustomerOne.resultCode == 0) {
//						if(body.data.newCustomerOne.resultCode=='0'){
							this.customer.splice(this.itemIndex, 1);
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}else{
							this.Aleart(body.data.newCustomerOne.resultMessage)
						}
//					}
				})
			},
		},
	}
</script>
<style lang="scss" type="text/css" scoped>
	.content {
		.right {
			width: 16px;
			height: 16px;
			img {
				width: 100%;
				height: 100%;
				
			}
		}
	}
	.detail{
		.info-size{
			font-size: 14px;
		}
		div{
			font-size: 16px;
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

	.search {
		background: #F8F8F8;
		width: 100%;
	    margin: auto;
	    position: absolute;
		width: 100%;
		z-index: 2;
			.img {
				/*position: absolute;*/
				height: 18px;
				width: 18px;
				/*right: 5%;*/
				/*top: 18px;*/
				img {
					width: 100%;
					height: 100%;
				}
			}
			.imgs {
				/*position: absolute;*/
				width: 18px;
				height: 18px;
				/*right: 17%;*/
				/*top: 18px;*/
				img {
					width: 100%;
					height: 100%;
				}
			}
			.input {
				text-align: center;
				/*line-height: 56px;
				height: 56px;*/
				padding: 15px 0;
				input {
					width: 100%;
					padding-left: 5%;
					line-height: 33px;
					height: 33px;
					border-radius: 33px;
					margin-left: 3%;
				    background-color: white !important;
					/*text-align: center;*/
				}
			}
		}
	.main-contents{
		div,
		span,
		p {
			font-size: 16px;
		}
		.search {
			.img {
				/*position: absolute;*/
				height: 18px;
				width: 18px;
				/*right: 5%;*/
				/*top: 18px;*/
				img {
					width: 100%;
					height: 100%;
				}
			}
			.imgs {
				/*position: absolute;*/
				width: 18px;
				height: 18px;
				/*right: 17%;*/
				/*top: 18px;*/
				img {
					width: 100%;
					height: 100%;
				}
			}
			.input {
				text-align: center;
				/*line-height: 56px;
				height: 56px;*/
				padding: 15px 0;
				input {
					width: 100%;
					padding-left: 5%;
					line-height: 33px;
					height: 33px;
					border-radius: 33px;
					margin-left: 3%;
				    background-color: white !important;
					/*text-align: center;*/
				}
			}
		}
		.list {
			position: relative;
			height: 3.5rem;
			line-height: 3.5rem;
			-webkit-transition: all 0.2s;
			transition: all 0.2s;
			border-bottom: 1px solid #EFEFEF;
			.flexs {
				display: flex;
				align-items: center;
			}
			.flex-center {
				justify-content: space-between;
			}
			.info {
				margin-left: 5%;
				div {
					line-height: 1.2rem;
				}
			}
		}
		.triangle_border_right {
			width: 0;
			height: 0;
			border-top: 30px solid #FEBA00;
			border-left: 30px solid transparent;
			position: absolute;
			top: 24%;
			right: 4%;
		}
	}
	.list[data-type="0"] {
			transform: translate3d(0, 0, 0);
		}
		.list[data-type="1"] {
			transform: translate3d(-4rem, 0, 0);
		}
		.list:after {
			position: absolute;
			left: 2rem;
			bottom: 0;
			right: 0;
			height: 1px;
			color: #ccc;
			-webkit-transform-origin: 0 100%;
			transform-origin: 0 100%;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			z-index: 2;
		}
		.delete {
			width: 4rem;
			height: 3.5rem;
			background: #F5F5F5;
			font-size: 17px;
			color: #fff;
			text-align: center;
			line-height: 5rem;
			position: absolute;
			top: 0;
			right: -4rem;
			border-bottom: 1px solid #ccc;
			img {
				width: 2rem;
				height: 2rem;
			}
		}
		.user-list {
			padding: 0.2rem;
			background: #fff;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			justify-content: flex-end;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			font-size: 0;
		}
		.flexs {
			display: flex;
			align-items: center;
		}
		.flex {
			flex: 1;
			justify-content: space-between;
			margin-right: 3%;
		}
		
		.info-left {
			width: 40%;
			text-align: left;
		}
		.btn-wrapper {
		height: 40px;
		line-height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.add-btn {
		width: 50%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #FEB101;
		/*border-radius: 5px;*/
		color: #ffffff;
		/*margin-bottom: 15px;*/
	}
	::-webkit-input-placeholder { color:#9F9F9F;font-size: 14px; }
	.main-contents {
		-webkit-overflow-scrolling: auto !important;
	}
</style>