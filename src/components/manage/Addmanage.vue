<template>
	<div id="add-manage-contents">
		<img style="display: block; width:100%;" 
		v-if="namesCode == 'LBT029'"
		src="../../assets/img/common/LBT029.jpg" />
		<img style="display: block; width:100%;" 
		v-if="namesCode == 'NPT006'"
		src="../../assets/img/common/NPT006.jpg" />
		<!-- <img style="display: block; width:100%;" 
		:src="productImgUrl" /> -->
		<div class="message-list-one">
			<div class="title">
				<i class="fa fa-user"></i>
				<span>被保险人信息</span>
			</div>
			<div class="content">
				<ul>
					<li>
						<p>姓名</p>
						<input v-model="holderName" type="text" name="policyholdername" placeholder="请输入姓名">
					</li>
					<li style="position: relative">
						<p>性别</p>
						<mt-switch v-model="holder_value" @change="turn" style="position: absolute;right: 15px;top: 4px;">
							<label style="position: absolute;right: 41px;bottom: -5px;font-size: 14px;color: #FFF;font-weight:bold;">{{holderSex == "1"?'男':''}}</label>
							<label style="position: absolute;right: 15px;bottom: -5px;font-size: 14px;font-weight:bold;">
							{{holderSex == "2"?'女':''}}</label>
						</mt-switch>
					</li>
					<li @click="setDate">
						<p>出生日期</p>
						<!-- <input class="begin" type="text" name="" 
						placeholder="请选择出生日期" 
						v-model="date1"/> -->
						<label style="width:65%;
						display:inline-block;
						text-align:right;">{{date1 | dateFilterYear}}</label>
						<i class="fa fa-calendar"></i>
					</li>
					<li @click="jobVisible = !jobVisible">
						<p>职业</p>
						<label v-html="keyWord"
							style="float: right;padding-right:20px;color:#666;
							width: 65%;height: 43px;text-align: right;
							overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
						</label>
					</li>
				</ul>
			</div>
		</div>
		<div class="message-list-two">
			<div class="title">
				<i class="fa fa-file-text"></i>
				<span>投保选择</span>
			</div>
			<div class="content">
				<ul>
					<li @click="getAllProList">
						<p style="width: auto;float: left;">主险名称</p>
						<p style="width: 75%;text-align: right;
						padding-left:0;float: right;
						overflow: hidden;white-space: nowrap;
						text-overflow:ellipsis">{{names}}</p>
					</li>
					<!-- <li>
						<p style="width: auto">附加险名称</p>
						<select class="select selectTeshu" 
						style="width: 60%;" v-if="riderList != ''">
							<option v-for="item in riderList">{{item.productName}}</option>
						</select>
						<label style="float: right;margin-right: 15px;color: #666;"
						v-if="riderList == ''">您当前没有选择附加险</label>
					</li> -->
					<li id="allSel" v-for="(item,index) in payWay">
						<p>{{item.attName}}</p>
						<select v-if="item.attCode != 'amount' && item.attCode != 'premium'"
							@change="textclick"
							class="select selectVal" id="sel">
							<option v-for="itm in item.attValueList" 
							v-model="selVal" :value="JSON.stringify(itm)">
								{{itm.text}}
							</option>
						</select>
						<input v-if="item.attCode == 'amount' || item.attCode == 'premium'"
						style="width: 62%;" 
						name="保险金额"
						placeholder="请输入金额" v-model="amount" @blur="handlerInput()"/>
						<!-- <input v-if="item.attCode != 'amount' && item.attCode == 'premium'"
						style="width: 62%;" 
						name="保费"
						placeholder="请输入保费" v-model="premium"/> -->
					</li>
					<li v-show="yearPremium">
						<p>主险保费</p>
						<p style="width: 60%;text-align: right;">{{zhuxianPremium}} 元</p>
					</li>
					<li v-show="yearAmount">
						<p>主险保额</p>
						<p style="width: 60%;text-align: right;">{{zhuxianMoney}} 元</p>
					</li>
					<li @click="baofeiTest">
						<p>年交保费</p>
						<p style="width: 60%;text-align: right;">{{totalPremium}} 元</p>
					</li>
					<!-- <li @click="baofeiTest" v-show="yearAmount">
						<p>年交保费</p>
						<p style="width: 60%;text-align: right;">{{totalPremium}} 元</p>
					</li> -->
					<li>
						<p>附加险选择</p>
						<p style="width: 60%;text-align: right;color: #666;"
						@click="fujiaPopup" v-html="chooseNoYes"></p>
					</li>
				</ul>
			</div>
		</div>
		<div class="riderList">
			<div class="title" @click="expand_1 = !expand_1">
				<i class="fa fa-bars"></i>
				<span>附加险列表</span>
				<i class="fa fa-angle-double-down" 
				style="-webkit-transition:all .2s ease-out;padding-left:5px;"
				:style="{'-webkit-transform':expand_1?'rotate(180deg)':''}"></i>
			</div>
			<div class="content" v-show="expand_1">
				<ul>
					<li v-for="(item,index) in riderList" style="display: flex;padding:10px 0;position: relative;">
						<p style="width: 10%;padding-left:10px;">{{index + 1}}、</p>
						<p style="flex：1;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">		{{item.productName}}
						</p>
						<i class="fa fa-times-circle-o"
						v-show = "item.productCode != bindCode"
						@click = "deleteRider(item)"
						:disabled = "item.productCode == bindCode"
						style="padding-right:10px;color: #27ade0;position: absolute;right: 0;"></i>
						<i class="fa fa-times-circle-o"
						v-show = "item.productCode == bindCode"
						:disabled = "item.productCode == bindCode"
						style="padding-right:10px;color: #BBB;position: absolute;right: 0;"></i>
					</li>
				</ul>
			</div>
		</div>
		<!-- 附加险种弹出框 -->
		<div>
			<mt-popup 	
				position="center"
				style="width: 80%;height: 300px;background-color: #FFF;border-radius: 20px;"
				v-model="fujiaPolicySta">
				<!-- <Headerbtns :title="'附加险种选择'" style="border-radius: 20px 20px 0 0;"></Headerbtns> -->
				<div class="teshu-header">附加险种选择</div>
				<div id="fujia-choose">
					<div v-for="item in policyChose"
					style="height: 35px;">
						<p @click="checkonText(item)" 
						class="checkonText" 
						style="float: left;width: 80%;padding-left:15px;">	
							{{item.productName}}
						</p>
						<!-- <input type="checkbox" name=""> -->
						<div class="piaochecked on_check" @click="checkon(item)">
							<input type="checkbox" class="checkbox radioclass input" style="width: 20px;height: 20px;margin-left: 10px;" />
						</div>
					</div>
				</div>
				<div class="button fujia">
					<!-- <div @click="cancelFujia">
						<mt-button id="button-cancel">取消</mt-button>	
					</div> -->
					<div @click="closeFujia">
						<mt-button id="button-sure">关闭</mt-button>	
					</div>
				</div>
			</mt-popup>
			<mt-popup v-model="valueStatus" position="bottom" style="width:100%;">
		      <mt-header title="已选附加险" style="background:#fafafa;color:#26a2ff;border-top:1px solid #ddd;">
		        <mt-button @click="saveFujia()" slot="right">
		        	<i class="fa fa-fw fa-times"></i>
		        </mt-button>
		      </mt-header>
		      <div class="fujia-content">
		        <div v-for="(item,index) in newPolicy" style="overflow: hidden;">
		        	<p>{{item.attName}}</p>
		        	<select class="selectValFujia"
		        		:disabled="itemCode == bindCode"
		        		v-if="item.attCode != 'amount' && item.attCode != 'piece' && item.attCode != 'premium'"
		        		@change="edit(item)"
		        		style="height: 30px;width: 100px;margin-top:5px;
		        		border: none;float: right;">
		        		<option 
		        		v-for="itm in item.attValueList"
		        		:value="fujiaValue">
		        			{{itm.text}}
		        		</option>
		        	</select>
		        	<input type="text" name="amount"
		        	class="amount" 
		        	v-on:input = "inputAmpunt(item)"
		        	@blur="handlerInput_2()"
		        	style="height: 30px;width: 100px; float: right;margin-top:5px;text-align:right;" 
		        	v-model="fujiaPolicyAmount"
		        	v-if="item.attCode == 'amount' || item.attCode == 'piece' || item.attCode == 'premium'">
		        	<!-- <input type="text" name="piece"
		        	placeholder="请输入份数" 
		        	style="height: 30px;margin-top:5px;text-align:right;" 
		        	v-if="item.attCode == 'piece'"> -->
		        </div>
		      </div>
	    	</mt-popup>
		</div>
		<div class="message-list-three" style="height: 169px;">
			<div class="title" @click="textclick">
				<i class="fa fa-user"></i>
				<span>投保人信息</span>
			</div>
			<div class="content">
				<ul>
					<li>
						<p>姓名</p>
						<input v-model="policyHolderName" type="text" name="holdername" placeholder="请输入姓名">
					</li>
					<li style="position: relative;">
						<p>性别</p>
						<span style="display: block;position: relative">
							<mt-switch v-model="policyHolder_value" @change="turn" style="position: absolute;right: 15px;top: 4px;">
								<label style="position: absolute;right: 41px;bottom: -5px;font-size: 14px;color: #FFF;font-weight:bold;">{{policyHolderSex == 1?'男':''}}</label>
								<label style="position: absolute;right: 15px;bottom: -5px;font-size: 14px;font-weight:bold;">
								{{policyHolderSex == 2?'女':''}}</label>
							</mt-switch>
						</span>
					</li>
					<li @click="setDate2">
						<p>出生日期</p>
						<!-- <input class="begin" type="text" name="" 
						placeholder="请选择出生日期" 
						v-model="date2"/> -->
						<label style="width:65%;
						display:inline-block;
						text-align:right;">{{date2 | dateFilterYear}}</label>
						<i class="fa fa-calendar"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="message-list-four">
			<div class="title">
				<i class="fa fa-volume-control-phone"></i>
				<span>代理人信息</span>
			</div>
			<div class="content">
				<ul>
					<li>
						<p>姓名</p>
						<input v-model="agentName" type="text" name="agentname" placeholder="请输入姓名">
					</li>
					<li>
						<p>代理人工号</p>
						<input v-model="agentCode" type="text" name="agent" placeholder="请输入代理人工号">
					</li>
					<li>
						<p>联系方式</p>
						<input v-model="agentTel" type="text" name="phone" placeholder="请输入联系方式">
					</li>
				</ul>
			</div>
		</div>
		<div class="message-list-five">
			<div class="title" @click="expand = !expand">
				<i class="fa fa-question-circle-o"></i>
				<span>投保须知</span>
				<i class="fa fa-angle-double-down" 
				style="-webkit-transition:all .2s ease-out;padding-right:5px;"
				:style="{'-webkit-transform':expand?'rotate(180deg)':''}"></i>
			</div>
			<div class="content" v-show="expand">
				<ul class="content-one" id="toubaoxuzhi">
					<li v-for="item in toubaoxuzhi" style="overflow: hidden;">
						<span>{{item}}</span>
					</li>
				</ul>
				<div class="content-two">
					<img :src="imgUrl" style="padding-top: 5px;padding-left:4%;" />
				</div>
			</div>
		</div>
		<!-- <accordion :open="true" class="message-list-five" id="message-list-five">
			<div slot="title">
		            	<div><i class="fa fa-fw fa-user"></i> 基本信息</div>
		          	</div>
		          	<div slot="content" class="pd-md">
		          		<div class="five-content">
			            <ul class="content-one">
					<li>
						<p>投保人年龄</p>
						<span>18周岁以上</span>
					</li>
					<li>
						<p>被保险人年龄</p>
						<span>出生满30天至70周岁</span>
					</li>
					<li>
						<p>保险期间</p>
						<span>保至被保险人80周岁</span>
					</li>
					<li>
						<p>交费方式</p>
						<span></span>
					</li>
				</ul>
				<ul class="content-two">
					<li>
						<p style="border-right:2px solid #FFF">交费方式</p>
						<p>被保险人年龄</p>
					</li>
					<li>
						<p>一次交清</p>
						<p>30天至70周岁</p>
					</li>
					<li>
						<p>3年交、5年交</p>
						<p>30天至65周岁</p>
					</li>
					<li>
						<p>10年交</p>
						<p>30天至60周岁</p>
					</li>
				</ul>
				</div>
		          	</div>
		</accordion> -->
		<div class="make-sure">
			<mt-button class="true-btn" @click="goManage">返回</mt-button>
			<mt-button class="true-btn" style="padding: 0;">在线投保</mt-button>
			<mt-button style="padding: 0;width: 35%;" class="true-btn" @click="ruleGoShowManage">生成计划书演示</mt-button>
		</div>
		<div class="bg-img">
			<mt-popup v-model="popupVisible" position="right">
				<img src="../../assets/img/manage/cover.jpg"/>
				<p class="send-name">
					<span 
					style="border-right: 2px solid #FFF;color: #FFF;
					padding-right: 10px;">敬呈</span>
					<span style="padding-left: 10px;color: #FFF;">{{policyHolderName}}</span>
					<span style="padding-left: 5px;color:#FFF;">{{policyHolderSex == "1"?"先生":"女士"}}</span>
				</p>
			</mt-popup>
		</div>
		<!-- 职业选择弹出框 -->
		<div>
			<mt-popup
			style="width: 100%;height: 100%;overflow-y:auto;"
			v-model="jobVisible"
			position="right">
				<mt-search
				autofocus 
				v-model="jobValue">
				</mt-search>
				<div class="job">
					<div class="jobTit" style="border-right:1px solid #BBB;width: 20%;">职业编码</div>
					<div class="jobTit" style="border-right:1px solid #BBB;width: 60%;">职业名称</div>
					<div class="jobTit" style="width: 19%">职业等级</div>
					<div class="jobContent" v-for="item in jobList" @click="chooseJob(item)">
						<div style="border-right:1px solid #BBB;width: 20%;line-height: 40px;">{{item.code}}</div>
						<div style="border-right:1px solid #BBB;width: 60%;margin-top:5px;">{{item.descr}}</div>
						<div style="width: 19%;line-height: 40px;">{{item.level}}</div>
					</div>
				</div>
				<!-- <mt-search v-model="jobValue">
					<div class="job">
						<div class="jobTit" style="border-right:1px solid #BBB;width: 20%;">职业编码</div>
						<div class="jobTit" style="border-right:1px solid #BBB;width: 60%;">职业名称</div>
						<div class="jobTit" style="width: 19%">职业等级</div>
					</div>
		          	<mt-cell v-for="item in jobList"
                    :title="item.code"
                    :value="item.descr">
                  </mt-cell>
		        	</mt-search> -->
			</mt-popup>
		</div>
		<!-- 规则校验弹出框 -->
		<div>
			<mt-popup
			style="width: 80%;height: 300px;border-radius: 15px;"
			v-model="checkVisible_rule">
				<!-- <Headerbtns :title="'产品详情'" style="border-radius: 15px 15px 0 0;">
					<i class="fa fa-times-circle-o" slot="right" @click="closeFujiaPopup"
					style="font-size:25px;color: #FFF;padding-left:10px;padding-top:11px;"></i>
				</Headerbtns> -->
				<div class="teshu-header" style="position: relative;">
					<b style="font-size:16px;font-weight: bold;">规则校验</b>
					<i class="fa fa-times-circle-o" slot="right" @click="closeFujiaPopup"
					style="font-size:25px;color: #FFF;position: absolute;right: 10px;top: 10px;"></i>
				</div>
				<div style="margin-top:5px;height: 225px;overflow-y:auto;">
					<div v-for="item in reasonList" 
					style="padding-left:15px;margin-bottom:10px;">{{item.info}}</div>
				</div>
			</mt-popup>
		</div>
	</div>
</template>

<script>
	import accordion from '../common/Accordion.vue'
	import Headerbtns from '../common/Header.vue'
	import occupation from '../../assets/data/occupation.json'
	import product from '../../assets/data/product.json'
	import { MessageBox } from 'mint-ui'
	import axios from 'axios'
	export default{
		name:'addmanage',
		props: {
		    open:{
		      type: Boolean,
		      default: false
		    },
		    open_1:{
		    	type: Boolean,
		    	default: false
		    },
		    fujia:{
		    	type: Boolean,
		    	default: false
		    }
		},
		components:{accordion,Headerbtns},
		data(){
			return{
				productImg:[
					{code:'LBT029',imgUrl:require('../../assets/img/common/guanai.jpg')},
					{code:'NPT006',imgUrl:require('../../assets/img/common/anxinfu.jpg')}
				],
				holderName:'',//被保人姓名
				policyHolderName:'',//投保人姓名
				holder_value:true,//被保人性别
				policyHolder_value:true,//投保险人性别
				holderSex:'1',
				policyHolderSex:'1',
				amount:'',//保额
				premium:'5000.0',//保费
				yearPremium:false,//年交保费
				yearAmount:false,//年交保额
				attCode_1:'',//保额或者保费
				attName:'',//显示保额或者保费
				totalPremium:'',//算出来的保费
				zhuxianMoney:'',//主险的保额
				zhuxianPremium:'',//主险的保费
				selected:'30',//被保险人默认选中30岁
				holderSelected:'18',//投保人默认选中18岁
				popupVisible:false,//右边弹出框状态控制
				namesCode:'',//主险code
				names:'',//主险名称
				text:'',//交费方式
				selVal:'',
				randomToken:parseInt(Math.random(1,10)*10000000000000000),
				popupAccordion:false,//显隐状态切换
				value:[],//附加选种所绑定的value
				valueStatus:false,
				policyChose:[],//附加选种选择
				policyChoseWay:[],//附加险种交费和其他的方式
				everyOnePolicy:[],//每一个附加险的缴费方式，交费期限...
				payWay:[],//投保选择
				chooseNoYes:'请选择附加险',
				yesChoose:false,
				noChoose:true,
				agentName:'',//代理人姓名
				agentTel:'',//代理人电话
				agentCode:'',//代理人工号
				date1:"1977-01-01T00:00:00.000Z",//被保人出生日期
				date1_1:"1977-1-1T00:00:00.000Z",
				date2:"1977-01-01T00:00:00.000Z",//投保人出生日期
				date2_2:"1977-1-1T00:00:00.000Z",
				expand: this.open,
				expand_1:this.open_1,
				popupBottom:false,
				selectBeginVal_0:'',//主险的缴费方式
				selectBeginVal_1:'',//主险的交费期限
				selectBeginVal_2:'',//主险的保险期限
				term_0:'',//对应的缴费方式
				term_1:'',//对应的交费期限
				term_2:'',//对应的保险期限
				premiumDes1:'',//主险保费
				premiumDes2:'',//附加险保费
				bindPolicy:'',
				jobVisible:false,
				jobValue:'',
				jobCode:'',
				checkVisible:false,
				checkVisible_rule:false,
				reasonList:'',//规则校验列表
				pass:null,//是否触发规则校验标识
				toubaoxuzhi:'',
				fujiaPolicyArray:null,
				newPolicy:null,
				fujiaPolicyAmount:'',
				imgUrl:null,
				fujiaPolicySta:false,
				bindCode:null,
				sendRiderList:null,
				riderList:[],
				saveObj:{},
				fujiaValue:null,
				fujiaArr:[],
				itemIndex:null,
				jobList:occupation.occupation.item,
				keyWord:'请选择您的职业',
				localGetAddManage:null,
				productImgUrl:null,
				showManageData:null,
				planId:"",
				level:""
			}
		},
		mounted(){
			let getAddManage = window.localStorage.getItem('addManage');
			let getEditList = window.localStorage.getItem('editList')
			console.log('------------------------------------------')
			console.log(JSON.parse(getAddManage))
			console.log(JSON.parse(getEditList))
			this.localGetAddManage = JSON.parse(getAddManage)
			this.localGetEditList = JSON.parse(getEditList)
			console.log(this.localGetEditList)
			console.log(typeof(this.localGetAddManage))
			console.log(typeof(this.localGetEditList))
			if(this.localGetAddManage != null){
				this.checkVisible_rule = false
				this.holderName = this.localGetAddManage.holdername
				this.policyHolderName = this.localGetAddManage.insureName
				this.holderSex = this.localGetAddManage.holderSex
					if(this.holderSex == "1"){
						this.holder_value = true
					}else{
						this.holder_value = false
					}
				this.policyHolderSex = this.localGetAddManage.insureSex
					if(this.policyHolderSex == "1"){
							this.policyHolder_value = true
						}else{
							this.policyHolder_value = false
						}
				this.date1 = this.localGetAddManage.holderBirthday
				this.date2 = this.localGetAddManage.insureBirthday
				this.keyWord = this.localGetAddManage.holderProfession
				this.names = this.localGetAddManage.productName
				this.namesCode = this.localGetAddManage.productCode
				this.riderList = this.localGetAddManage.riderList
				this.payWay = this.localGetAddManage.payWay
				this.selectBeginVal_0 = this.localGetAddManage.selectBeginVal_0
				this.selectBeginVal_1 = this.localGetAddManage.selectBeginVal_1
				this.selectBeginVal_2 = this.localGetAddManage.selectBeginVal_2
				this.term_0 = this.localGetAddManage.term_0
				this.term_1 = this.localGetAddManage.term_1
				this.term_2 = this.localGetAddManage.term_2
				this.amount = this.localGetAddManage.amount
				this.agentName = this.localGetAddManage.agentName
				this.agentCode = this.localGetAddManage.agentCode
				this.agentTel = this.localGetAddManage.agentTel
				this.getManageData()
			}else if(this.localGetEditList != null){
				let editListProduct = this.localGetEditList
				console.log(editListProduct)
				this.holderName = editListProduct.insureName
				this.policyHolderName = editListProduct.holderName
				this.holderSex = editListProduct.insureSex
				this.date1 = editListProduct.insureBirday + 'T00:00:00.000Z'
				this.date2 = editListProduct.holderBirday + 'T00:00:00.000Z'
				/*对性别得开关按钮进行处理*/
				if(this.holderSex == "1"){
					this.holder_value = true
				}else{
					this.holder_value = false
				}
				this.policyHolderSex = editListProduct.holderSex
				if(this.policyHolderSex == "1"){
					this.policyHolder_value = true
				}else{
					this.policyHolder_value = false
				}
				for(var i in editListProduct.productList){
					if(editListProduct.productList[i].ismain == "1"){
						let editMsg = editListProduct.productList[i]
						this.namesCode = editMsg.productCode
						this.names = editMsg.productName
						this.amount = editMsg.amount
						this.term_0 = editMsg.paymode
						this.term_1 = editMsg.payperiod
						this.term_2 = editMsg.policyperiod
					}
				}
				this.getManageData()
			}else{
				this.getParams()
				this.getManageData()
			}
			this.getParamsId()
		},
		methods:{
			handlerInput:function(){
				this.baofeiTest()
			},
			handlerInput_2:function(){
				this.baofeiTest()
			},
			searchJob(){
				let newArray = []
				let _this = this
				this.jobList.map(i => {
					if(i.code.indexOf(this.jobValue) != -1 || i.descr.indexOf(this.jobValue) != -1){
						newArray.push(i)
					}
				})
				this.jobList = newArray
				console.log(this.jobList)
			},
			getAllProList:function(){
				let router = this.$route.params.allProList;
				console.log(JSON.parse(router))
			},
			chooseJob:function(item){
				console.log(item)
				this.keyWord = item.descr
				this.jobCode = item.code
				this.jobVisible = false
				this.level = item.level
			},
			toggleLoading(show = true) {
	        	this.loading = show
	        },
			turn: function(){
				console.log(this.amount)
				console.log(this.holder_value);
				if (this.holder_value) {
					this.holderSex = "1"
					console.log(this.holderSex + '男')
				}else if(!this.holder_value){
					this.holderSex = "2"
					console.log(this.holderSex + '女')
				}
				console.log(this.policyHolder_value);
				if (this.policyHolder_value) {
					this.policyHolderSex = "1"
					console.log(this.policyHolderSex + '男')
				}else if(!this.policyHolder_value){
					this.policyHolderSex = "2"
					console.log(this.policyHolderSex + '女')
				}
			},
			textclick:function(){
				var self = this
				let arr = []
				$('.selectVal option:selected').each(function() {
					this.selectedVal = $(this).val()
					if(self.valueVal == undefined){
						self.valueVal = ''
					}
					self.valueVal = this.selectedVal
					let val = self.valueVal
					arr.push(JSON.parse(val))
					if(arr.length == 1){//0缴费方式 1缴费期限 2保险期限 3保险金额
						self.term_0 = arr[0].code
						self.selectBeginVal_0 = arr[0].text
						console.log('缴费方式:' + self.term_0 + '/' + self.selectBeginVal_0)
					}else if(arr.length == 2){
						self.term_1 = arr[1].code
						self.selectBeginVal_1 = arr[1].text
						console.log('交费期限:' + self.term_1 + '/' + self.selectBeginVal_1)
					}else if(arr.length == 3){
						self.term_2 = arr[2].code
						self.selectBeginVal_2 = arr[2].text
						console.log('保险期限:' + self.term_2 + '/' + self.selectBeginVal_2)
					}
				});
	  		},
	  		ruleGoShowManage:function(){
	  			console.log(this.reasonList.length)
	  			if(this.reasonList.length > 0){
	  				this.checkVisible_rule = true
	  			}else{
	  				this.goShowManage()
	  			}
	  		},
			goShowManage:function(){
				let manageMsg = {
		  				"holdername":this.holderName,
		  				"insureName":this.policyHolderName,
		  				"holderSex":this.holderSex,
		  				"insureSex":this.policyHolderSex,
		  				"holderBirthday":this.date1,
		  				"insureBirthday":this.date2,
		  				"holderProfession":this.keyWord,
		  				"productName":this.names,
		  				"productCode":this.namesCode,
		  				"riderList":this.riderList,
		  				"payWay":this.payWay,
		  				"selectBeginVal_0":this.selectBeginVal_0,
		  				"selectBeginVal_1":this.selectBeginVal_1,
		  				"selectBeginVal_2":this.selectBeginVal_0,
		  				"term_0":this.term_0,
		  				"term_1":this.term_1,
		  				"term_2":this.term_2,
		  				"amount":this.amount,
		  				"agentName":this.agentName,
		  				"agentCode":this.agentCode,
		  				"agentTel":this.agentTel
	  				}
	  			console.log('----------------------------------------')
	  			console.log(manageMsg)
	  			window.localStorage.setItem("addManage",JSON.stringify(manageMsg));
	  			window.localStorage.removeItem('editList')
	  			// this.pass = "true"
				if(this.pass == "true"){
					this.popupVisible = true;
					let timer = "";
					timer = setTimeout(()=>{
						this.$router.push({
							// path:'/manage/addmanage/showmanage/enjoymanage/123123123123',
							name:'showmanage',
							params:{
								id:this.planId,
								names:this.names,
								bindCode:this.bindCode,
								agentName:this.agentName,
								agentTel:this.agentTel,
								holderName:this.holderName,
								holderSex:this.holderSex,
								holderBirthday:this.date1,
								jobCode:this.jobCode,
								policyHolderName:this.policyHolderName,
								policyHolderSex:this.policyHolderSex,
								policyHolderBirthday:this.date2,
								amount:this.amount,
								zhuxianMoney:this.zhuxianMoney,//主险的保额
								zhuxianPremium:this.zhuxianPremium,//主险的保费
								totalPremium:this.totalPremium,
								productName:this.names,
								productCode:this.namesCode,
								selectedWay_0:this.selectBeginVal_0,
								selectedWay_1:this.selectBeginVal_1,
								selectedWay_2:this.selectBeginVal_2,
								term_0:this.term_0,
								term_1:this.term_1,
								term_2:this.term_2,
								premiumDes1:this.premiumDes1,
								premiumDes2:this.premiumDes2,
								attCode_1:this.attCode_1,
								level:this.level,
								riderList:JSON.stringify(this.riderList),
								showManageData:JSON.stringify(this.showManageData)
							}
						})
					},3000)
				}else if(this.pass == "false"){
					this.checkVisible_rule = true
				}
			},
			goManage:function(){
				if(this.localGetAddManage == null){
					this.$router.push('/manage')
				}else if(this.localGetAddManage != null){
					window.localStorage.removeItem('addManage')
					this.$router.push('/manage')
				}
				if(this.localGetEditList == null){
					this.$router.push('/manage')
				}else if(this.localGetEditList != null){
					window.localStorage.removeItem('editList')
					this.$router.push('/manage')
				}
			},
			getParams:function(){
				if(this.localGetAddManage == null){
					let routerParams = this.$route.params.policyName;
					console.log(routerParams);
					this.namesCode = routerParams;
				}
			},
			getParamsId:function(){
				this.planId = this.$route.params.planId;
				console.log(this.planId)
			},
			getManageData:function(){
				let requ = {
					"productDef": {
	                    "agentCode": "1100D12336",
	                    "productCode": this.namesCode,
	                    "token": this.randomToken,
	                    "openId": "1"
                	}
				}
				utils.http.post('PRODUCTDEFLIST',requ).then(response =>{
					console.log(response.data)
					let project = response.data.response
					this.names = project.productDefList["0"].productName
					for(var i in product.item){
						if(this.namesCode == product.item[i].code){
							this.amount = product.item[i].amount
						}
					}
					let policyArray = ''
					let fujiaPolicyArray = ''
					policyArray = project.productDefList["0"].attList
					this.payWay = policyArray
					console.log(this.payWay)
					for(var i in this.payWay){
						if(this.payWay[i].attCode == "amount"){
							this.attCode_1 = this.payWay[i].attCode
							this.attName = "保险金额"
							this.yearPremium = true
							console.log(this.attCode_1)
						}else if(this.payWay[i].attCode == "premium"){
							this.attCode_1 = this.payWay[i].attCode
							this.attName = "保费"
							this.yearAmount = true
							console.log(this.attCode_1)
						}
					}
					// this.amount = project.productDefList["0"].baseAmount
					fujiaPolicyArray = project.productDefList["0"].extraList
					console.log(fujiaPolicyArray)
					this.fujiaPolicyArray = fujiaPolicyArray
					let bindCode = project.productDefList["0"].bindCode
					console.log(bindCode)
					this.bindCode = bindCode
					for(var i in fujiaPolicyArray){
						let everys = fujiaPolicyArray[i]
						console.log(everys)
						if(everys.coreCode == bindCode){
							console.log(everys)
							console.log(everys.premiumDes)
							this.fujiaPolicyArray[i].amount = this.amount
							// this.premiumDes2 = this.fujiaPolicyArray[i].premiumDes
							this.fujiaPolicyArray[i].id = "this.fujiaPolicyArray[i]"
							this.fujiaPolicyArray[i].insurants = {
								"birthday" : this.date1,
								"isChiefInsured":'',
								"job":'',
								"name":this.holderName,
								"profession":this.jobCode,
								"sex":this.holderSex						
							}
							this.fujiaPolicyArray[i].mobileId = 'C762509FE4200001AC5D12002C501638'
							this.fujiaPolicyArray[i].payMode = everys.attList[0].attValueList[0].code
							this.fujiaPolicyArray[i].payPeriod = everys.attList[1].attValueList[0].code
							this.fujiaPolicyArray[i].policyPeriod = everys.attList[2].attValueList[0].code
							this.fujiaPolicyArray[i].premium = '0'
							this.fujiaPolicyArray[i].premiumDes = '0'
							this.fujiaPolicyArray[i].checked = 'checked'
							this.fujiaPolicyArray[i].disabled = 'disabled'
							/*this.fujiaPolicyArray[i].isBind = false
							this.fujiaPolicyArray[i].isSelect = true*/
							document.getElementsByClassName("selectValFujia").disabled = true
							if(this.localGetAddManage == null){
								this.riderList.push(everys)
								console.log(this.riderList)
							}	
							for(var j in fujiaPolicyArray[i].attList){
								console.log(fujiaPolicyArray[i].attList[j])
								for(var k in fujiaPolicyArray[i].attList[j].attValueList){
									let attValue = fujiaPolicyArray[i].attList[j].attValueList[k]
									if(fujiaPolicyArray[i].attList[j].attCode == "payMode"){
										this.fujiaPolicyArray[i].attList[j].attText = attValue.text
										this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
										this.fujiaPolicyArray[i].payModeName = attValue.text
									}else if(fujiaPolicyArray[i].attList[j].attCode == "payPeriod"){
										this.fujiaPolicyArray[i].attList[j].attText = attValue.text
										this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
										this.fujiaPolicyArray[i].payPeriodName = attValue.text
									}else if(fujiaPolicyArray[i].attList[j].attCode == "policyPeriod"){
										this.fujiaPolicyArray[i].attList[j].attText = attValue.text
										this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
										this.fujiaPolicyArray[i].policyPeriodName = attValue.text
									}
								}
							}
						}
						if(this.localGetAddManage != null){
							for(var i in this.localGetAddManage.riderList){
								console.log(this.localGetAddManage.riderList[i])
								let riderListCode = this.localGetAddManage.riderList[i].coreCode
								for(var j in this.fujiaPolicyArray){
									let fujiaPolicyArrayCode = this.fujiaPolicyArray[j].coreCode
									if(riderListCode == fujiaPolicyArrayCode){
										this.fujiaPolicyArray[j].yes_no_status = "true"
									}
								}
							}
						}
						if(this.riderList.length != 0){
							this.expand_1 = true
						}
						// let every = everys.productName
						this.policyChose.push(everys)
						let fujiaChooseWay = fujiaPolicyArray[i].attList
						this.policyChoseWay.push(fujiaChooseWay)
					}
					console.log(this.riderList)
					for(var j in this.riderList[j]){
						for(var k in this.riderList[j].attList){
							if(this.riderList[j].attList[k].code == "amount" || "premium"){
								this.riderList[j].amount = this.fujiaPolicyAmount
							}else{
								this.riderList[j].amount = ""
							}
						}
					}
					this.sendRiderList = JSON.stringify(this.riderList)
					console.log(this.sendRiderList)
					this.riderListRepeat()
					this.baofeiTest()
				}).catch(error =>{
					// alert(error.errorMessage)
				})
			},
			fujiaPopup:function(){
				this.fujiaPolicySta = true
				let yes_no_status = ""
				let zhuxian = this.bindCode
				for(var i in this.fujiaPolicyArray){
					console.log(this.fujiaPolicyArray[i])
					if(zhuxian == this.fujiaPolicyArray[i].coreCode){
						this.fujiaPolicyArray[i].yes_no_status = "true"
					}else{
						let needStatus = this.fujiaPolicyArray[i].yes_no_status
						if(!needStatus){
							this.fujiaPolicyArray[i].yes_no_status = "false"
						}
					}
				}
				for(var j in this.fujiaPolicyArray){
					console.log(this.fujiaPolicyArray[j].yes_no_status)
					if(this.fujiaPolicyArray[j].yes_no_status == "true"){
						var checkbox = document.getElementsByClassName('checkbox')[j]
						console.log(checkbox)
						checkbox.checked = true
						if(zhuxian == this.fujiaPolicyArray[j].coreCode){
							checkbox.setAttribute("disabled", "disabled")
						}
					}else{
						var checkbox = document.getElementsByClassName('checkbox')[j]
						checkbox.checked = false
						if(zhuxian != this.fujiaPolicyArray[j].coreCode){
							checkbox.removeAttribute("disabled", "disabled")
						}
					}
				}
			},
			inputAmpunt(item){
				for(var i in this.fujiaPolicyArray){
					if(this.fujiaPolicyArray[i].coreCode == this.itemIndex.coreCode){
						var val = document.getElementsByClassName("amount")[0]
						console.log(val.value)
						let fujiaPiece = val.value
						this.saveWriteNum = fujiaPiece
						this.fujiaPolicyAmount = fujiaPiece
						for(var j in this.fujiaPolicyArray[i].attList){
							if(this.fujiaPolicyArray[i].attList[j].attCode == 'amount'){
								this.fujiaPolicyArray[i].attList[j].attValue = this.fujiaPolicyAmount
							}else if(this.fujiaPolicyArray[i].attList[j].attCode == 'premium'){
								this.fujiaPolicyArray[i].attList[j].attValue = this.fujiaPolicyAmount
							}
						}
					}
				}
			},
			edit(){
				console.log(this.fujiaPolicyArray)
				console.log(this.itemIndex)
				for(var i in this.fujiaPolicyArray){
					if(this.fujiaPolicyArray[i].coreCode == this.itemIndex.coreCode){
						console.log(this.fujiaPolicyArray[i])
						for(var j in this.fujiaPolicyArray[i].attList){
							if(this.fujiaPolicyArray[i].attList[j].attCode == "payMode"){
								var obj = document.getElementsByClassName('selectValFujia')[j]
								console.log(obj)
								var objIndex = obj.selectedIndex
								console.log(objIndex)
								let attValue = 
									this.fujiaPolicyArray[i].attList[j].attValueList[objIndex]
								this.fujiaPolicyArray[i].attList[j].attText = attValue.text
								this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
								this.fujiaPolicyArray[i].payMode = attValue.code
							}else if(this.fujiaPolicyArray[i].attList[j].attCode == "payPeriod"){
								var obj = document.getElementsByClassName('selectValFujia')[j]
								console.log(obj)
								var objIndex = obj.selectedIndex
								console.log(objIndex)
								let attValue = 
									this.fujiaPolicyArray[i].attList[j].attValueList[objIndex]
								this.fujiaPolicyArray[i].attList[j].attText = attValue.text
								this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
								this.fujiaPolicyArray[i].payPeriod = attValue.code
							}
							else if(this.fujiaPolicyArray[i].attList[j].attCode == "policyPeriod"){
								var obj = document.getElementsByClassName('selectValFujia')[j]
								console.log(obj)
								var objIndex = obj.selectedIndex
								console.log(objIndex)
								let attValue = 
									this.fujiaPolicyArray[i].attList[j].attValueList[objIndex]
								this.fujiaPolicyArray[i].attList[j].attText = attValue.text
								this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
								this.fujiaPolicyArray[i].policyPeriod = attValue.code
							}
						}
					}
				}
			},
			checkonText:function(item){
				console.log(this.newPolicy)
				console.log(item)
				console.log(item.coreCode)
				this.itemCode = item.coreCode
				console.log(this.saveWriteNum)
				for(var l in this.fujiaPolicyArray){
					if(item.coreCode == this.fujiaPolicyArray[l].coreCode){
						var checkonText = document.getElementsByClassName('checkonText')[l]
						var checkbox = document.getElementsByClassName('checkbox')[l]
						this.newPolicy = this.fujiaPolicyArray[l].attList
						var val = document.getElementsByClassName("amount")[0]
						for(var i=0; i<product.item.length; i++){
							if(item.coreCode == product.item[i].code){
								this.fujiaPolicyAmount = product.item[i].amount
							}
						}
						console.log(checkonText)
						console.log(this.policyChose)
						if(checkbox.checked){
							this.valueStatus = true
						}else{
							this.valueStatus = false
						}
					}
				}	
			},
			checkon:function(item){
				this.itemCode = item.coreCode
				console.log(product)
				for(var l in this.fujiaPolicyArray){
					if(item.coreCode == this.fujiaPolicyArray[l].coreCode){
						var checkbox = document.getElementsByClassName('checkbox')[l]
						console.log(checkbox)
						if(checkbox.checked){
							this.valueStatus = true
							for(var i in product.item){
								if(item.coreCode == product.item[i].code){
									this.fujiaPolicyAmount = product.item[i].amount
								}
							}
						}else{
							this.valueStatus = false
						}
					}
				}
				console.log(item)
				this.itemIndex = item
				let needStatus = item.yes_no_status
				// this.riderList = []
				if(this.bindCode != item.coreCode){
					if(needStatus == "false"){
						item.yes_no_status = "true"
					}else{
						item.yes_no_status = "false"
					}
				}
				console.log(this.riderList)
				console.log(item.attList)
				this.newPolicy = item.attList
				// this.fujiaPolicyAmount = item.baseAmount
				this.fujiaValue = JSON.stringify(item)
				console.log(JSON.parse(this.fujiaValue))
				let jsonFujia = JSON.parse(this.fujiaValue).attList
				let jsonFujia_1 = ''
				for(var k in jsonFujia){
					if(jsonFujia[k].attCode != "amount"){
						let jsonFujia_1 = jsonFujia[k]
						console.log(jsonFujia_1)
						let fujiaText = jsonFujia_1.attValueList[0]
						console.log(fujiaText)
						jsonFujia_1.fujiaText = fujiaText
						console.log(jsonFujia_1)
						this.jsonFujia_1 = jsonFujia_1
						this.fujiaArr.push(jsonFujia_1)
						console.log(this.fujiaArr)
					}else{
						let jsonFujia_1 = jsonFujia[k]
						let fujiaBaseAmount = JSON.parse(this.fujiaValue).baseAmount
						console.log(fujiaBaseAmount)
						jsonFujia_1.fujiaBaseAmount = fujiaBaseAmount
						console.log(jsonFujia_1)
						this.jsonFujia_1 = jsonFujia_1
						this.fujiaArr.push(jsonFujia_1)
						console.log(this.fujiaArr)
					}
				}
			},
			saveFujia:function(item){
				console.log()
				this.valueStatus = !this.valueStatus
			},
			deleteRider:function(item){
				console.log(item)
				for(var i=0; i<this.riderList.length; i++){
					if(this.riderList[i].productCode == item.productCode){
						this.riderList.splice(i,1)
						for(var i in this.fujiaPolicyArray){
							if (item.productCode == this.fujiaPolicyArray[i].productCode) {
								this.fujiaPolicyArray[i].yes_no_status = "false"
							}
						}
					}
				}
				this.baofeiTest()
			},
			cancelFujia:function(){
				// console.log(this.fujiaValue)
				this.fujiaPolicySta = !this.fujiaPolicySta;
			},
			closeFujia:function(){
				this.riderList = []
				if(this.value.length > 0){
					this.chooseNoYes = '已选择附加险';
					this.yesChoose = true;
					this.noChoose = false;
				}else{
					this.chooseNoYes = '请选择附加险';
					this.yesChoose = false;
					this.noChoose = true;
				}
				this.fujiaPolicySta = !this.fujiaPolicySta;
				for(var i in this.fujiaPolicyArray){
					let itemStatus = this.fujiaPolicyArray[i].yes_no_status
					if(itemStatus == "true"){
						this.fujiaPolicyArray[i].id = "this.fujiaPolicyArray[i]"
						this.fujiaPolicyArray[i].insurants = {
							"birthday" : this.date1,
							"isChiefInsured":'',
							"job":'',
							"name":this.holderName,
							"profession":'', 
							"sex":this.holderSex					
						}
						this.fujiaPolicyArray[i].mobileId = 'C762509FE4200001AC5D12002C501638'
						this.fujiaPolicyArray[i].premium = '0'
						this.fujiaPolicyArray[i].premiumDes = '0'
						this.fujiaPolicyArray[i].checked = 'checked'
						this.fujiaPolicyArray[i].disabled = 'disabled'
						this.fujiaPolicyArray[i].isBind = false
						this.fujiaPolicyArray[i].isSelect = true
						for(var j in this.fujiaPolicyArray[i].attList){
							if(this.fujiaPolicyArray[i].attList[j].attCode == "piece"){
								this.fujiaPolicyArray[i].piece = this.fujiaPolicyAmount
							}
						}
						this.riderList.push(this.fujiaPolicyArray[i])
					}
				}
				for(var i in this.fujiaPolicyArray){
					if(this.fujiaPolicyArray[i].coreCode == this.itemIndex.coreCode){
						console.log(this.fujiaPolicyArray[i])
						for(var j in this.fujiaPolicyArray[i].attList){
							if(this.fujiaPolicyArray[i].attList[j].attCode == "payMode"){
								var obj = document.getElementsByClassName('selectValFujia')[j]
								console.log(obj)
								var objIndex = obj.selectedIndex
								console.log(objIndex)
								let attValue = 
									this.fujiaPolicyArray[i].attList[j].attValueList[objIndex]
								this.fujiaPolicyArray[i].attList[j].attText = attValue.text
								this.fujiaPolicyArray[i].payModeName = attValue.text
								this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
								this.fujiaPolicyArray[i].payMode = attValue.code
							}else if(this.fujiaPolicyArray[i].attList[j].attCode == "payPeriod"){
								var obj = document.getElementsByClassName('selectValFujia')[j]
								console.log(obj)
								var objIndex = obj.selectedIndex
								console.log(objIndex)
								let attValue = 
									this.fujiaPolicyArray[i].attList[j].attValueList[objIndex]
								this.fujiaPolicyArray[i].attList[j].attText = attValue.text
								this.fujiaPolicyArray[i].payPeriodName = attValue.text
								this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
								this.fujiaPolicyArray[i].payPeriod = attValue.code
							}else if(this.fujiaPolicyArray[i].attList[j].attCode == "policyPeriod"){
								var obj = document.getElementsByClassName('selectValFujia')[j]
								console.log(obj)
								var objIndex = obj.selectedIndex
								console.log(objIndex)
								let attValue = 
									this.fujiaPolicyArray[i].attList[j].attValueList[objIndex]
								this.fujiaPolicyArray[i].attList[j].attText = attValue.text
								this.fujiaPolicyArray[i].policyPeriodName = attValue.text
								this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
								this.fujiaPolicyArray[i].policyPeriod = attValue.code
							}else if(this.fujiaPolicyArray[i].attList[j].attCode == "rank"){
								var obj = document.getElementsByClassName('selectValFujia')[j]
								console.log(obj)
								var objIndex = obj.selectedIndex
								console.log(objIndex)
								let attValue = 
									this.fujiaPolicyArray[i].attList[j].attValueList[objIndex]
								this.fujiaPolicyArray[i].attList[j].attText = attValue.text
								this.fujiaPolicyArray[i].policyPeriodName = attValue.text
								this.fujiaPolicyArray[i].attList[j].attValue = attValue.code
								this.fujiaPolicyArray[i].policyPeriod = attValue.code
							}
						}
					}
				}
				for(var j in this.riderList){
					for(var k in this.riderList[j].attList){
						console.log(this.riderList[j].attList[k])
						if(this.riderList[j].attList[k].attCode == "amount"){
							// this.riderList[j].amount = this.fujiaPolicyAmount
							this.riderList[j].attList[k].attValue = this.fujiaPolicyAmount
						}else if(this.riderList[j].attList[k].attCode == "premium"){
							this.riderList[j].attList[k].attValue = this.fujiaPolicyAmount
						}else if(this.riderList[j].attList[k].attCode == "piece"){
							this.riderList[j].attList[k].attValue = this.fujiaPolicyAmount
						}
					}
				}
				this.sendRiderList = JSON.stringify(this.riderList)
				console.log(this.sendRiderList)
				console.log(this.riderList)
				this.baofeiTest()
			},
			closeFujiaPopup:function(){
				this.checkVisible_rule = false
			},
			riderListRepeat:function(){
				var temp = []
				for(var i in this.riderList.length){
					console.log(this.riderList[i])
					if(temp.indexOf(this.riderList[i]) == -1){
						temp.push(this.riderList[i])
						this.riderList = temp
						console.log(this.riderList)
					}
				}
			},
			baofeiTest:function(){
				var requ = {
					"proposalPlan": {
                    "holder": {
                        "birthday": this.date2,
                        "name": this.policyHolderName,
                        "profession": "",
                        "sex": this.holderSex
                    },
                    "insurantProductList": [
                        {
                            "insurant": {
                                "birthday":this.date1,
                                "isChiefInsured": "",
                                "job": "",
                                "name": this.holderName,
                                "profession": this.jobCode,
                                "leval":this.level,
                                "sex": this.policyHolderSex
                            },
                            "insuredId": "",
                            "planId": this.planId,
                            "planInsureDate": "",
                            "productList": [
                                {
                                    "additional": [
                                        {
                                            "key": "attachment_filter_coverage",
                                            "value": "coverage"
                                        },
                                        {
                                            "key": "MAIN",
                                            "value": "yes"
                                        },
                                        {
                                            "key": "attachment_benefit_table",
                                            "value": "[lerrain.project.insurance.product.attachment.table.TableDef@3fb2acb7, lerrain.project.insurance.product.attachment.table.TableDef@6b69430c, lerrain.project.insurance.product.attachment.table.TableTextDef@4bb0ffeb, lerrain.project.insurance.product.attachment.table.TableTextDef@5171c41f, lerrain.project.insurance.product.attachment.table.TableTextDef@402f8ff, lerrain.project.insurance.product.attachment.table.TableTextDef@5f292f67, lerrain.project.insurance.product.attachment.table.TableTextDef@8e74400, lerrain.project.insurance.product.attachment.table.TableTextDef@7216091]"
                                        },
                                        {
                                            "key": "THREE_DIMENSION",
                                            "value": "lqlife3"
                                        },
                                        {
                                            "key": "startAge",
                                            "value": "0"
                                        },
                                        {
                                            "key": "attachment_coverage",
                                            "value": "lerrain.project.insurance.product.attachment.coverage.Coverage@204ad33f"
                                        },
                                        {
                                            "key": "ONE_DIMENSION",
                                            "value": "rlife1"
                                        },
                                        {
                                            "key": "attachment_filter_benefit_table",
                                            "value": "table"
                                        },
                                        {
                                            "key": "AA",
                                            "value": "55"
                                        },
                                        {
                                            "key": "calculate_type",
                                            "value": "2"
                                        },
                                        {
                                            "key": "stopAge",
                                            "value": "55"
                                        },
                                        {
                                            "key": "startDay",
                                            "value": "30"
                                        },
                                        {
                                            "key": "QXFL",
                                            "value": "changqi"
                                        }
                                    ],
                                    "amount": this.amount,
                                    "attList": [
                                        {
                                            "attCode": "payMode",
                                            "attId": "C762509FE4200001AC5D12002C501638",
                                            "attName": "缴费方式",
                                            "attText": this.selectBeginVal_0,
                                            "attValue": this.term_0,
                                            "attValueList": [
                                                {
                                                    "className": "ProductAttributeItem",
                                                    "code": "year",
                                                    "text": "年交"
                                                }
                                            ],
                                            "attViewType": "1",
                                            "className": "ProductAttribute",
                                            "productId": "C762509FE4200001AC5D12002C501638",
                                            "sort": 3
                                        },
                                        {
                                            "attCode": "payPeriod",
                                            "attId": "C762509FE4200001AC5D12002C501638",
                                            "attName": "交费期限",
                                            "attText": this.selectBeginVal_1,
                                            "attValue": this.term_1,
                                            "attValueList": [
                                                {
                                                    "className": "ProductAttributeItem",
                                                    "code": "term_5",
                                                    "text": "5年期"
                                                },
                                                {
                                                    "className": "ProductAttributeItem",
                                                    "code": "term_10",
                                                    "text": "10年期"
                                                },
                                                {
                                                    "className": "ProductAttributeItem",
                                                    "code": "term_15",
                                                    "text": "15年期"
                                                },
                                                {
                                                    "className": "ProductAttributeItem",
                                                    "code": "term_20",
                                                    "text": "20年期"
                                                }
                                            ],
                                            "attViewType": "1",
                                            "className": "ProductAttribute",
                                            "productId": "C762509FE4200001AC5D12002C501638",
                                            "sort": 4
                                        },
                                        {
                                            "attCode": "policyPeriod",
                                            "attId": "C762509FE4200001AC5D12002C501638",
                                            "attName": "保险期限",
                                            "attText": this.selectBeginVal_2,
                                            "attValue": this.term_2,
                                            "attValueList": [
                                                {
                                                    "className": "ProductAttributeItem",
                                                    "code": "to_full",
                                                    "text": "保终身"
                                                }
                                            ],
                                            "attViewType": "1",
                                            "className": "ProductAttribute",
                                            "productId": "C762509FE4200001AC5D12002C501638",
                                            "sort": 2
                                        },
                                        {
                                            "attCode": this.attCode_1,
                                            "attName": this.attCode_1 == "amount"?"保险金额":"保费",
                                            "attValue": this.amount,
                                            "attValueList": [],
                                            "attViewType": "2",
                                            "className": "ProductAttribute",
                                            "sort": 1
                                        }
                                    ],
                                    "baseAmount": "100000.0",
                                    "bind": "0",
                                    "bindCode": "",
                                    "bindExtraList": [],
                                    "className": "ProposalProductDef",
                                    "coreCode": this.namesCode,
                                    "extraList": this.riderList,
                                    "hasCoverage": "1",
                                    "hasService": "false",
                                    "id": "C762509FE4200001AC5D12002C501638",
                                    "isSelect": true,
                                    "main": "true",
                                    "mobileId": "C762509FE4200001AC5D12002C501638",
                                    "mutiBenefit": "0",
                                    "payMode": this.term_0,
                                    "payPeriod": this.term_1,
                                    "planId": "",
                                    "policyPeriod":this.term_2,
                                    "premiumDes": "0",
                                    "productCode":this.namesCode,
                                    "productName":this.names,
                                    "productShortName": "",
                                    "productText": "dividend",
                                    "productType": "0",
                                    "rank": "",
                                    "sell": "false",
                                    "shebao": "",
                                    "type": "0"
                                }
                            ],
                            "proposalId": "",
                            "totalPremium": 0
                        }
                    ],
                    "orgAgent": {
                        "channel": "1",
                        "deviceNo": "572032449254344960",
                        "loginCode": "",
                        "openId": "xxxx",
                        "token": ""
                    }
                }
                }
				utils.http.post('PRODUCTPREMIUM',requ).then(response =>{
					console.log(response.data)
					let project = response.data.response
					this.showManageData = project.trialPremiumMobile.insurantProductList["0"].plan
					console.log(this.showManageData)
					this.toubaoxuzhi = project.trialPremiumMobile.strList
					console.log(this.toubaoxuzhi)
					this.imgUrl = project.trialPremiumMobile.imageURL
					this.pass = project.trialPremiumMobile.insurantProductList["0"].checkResult.pass
					// this.totalPremium = project.trialPremiumMobile.insurantProductList["0"].plan.totalPremium
					console.log(this.pass)
					console.log("...................................")
					console.log(this.payWay)
					if(this.pass == "true" || this.localGetAddManage != null){
						this.checkVisible_rule = false
						this.totalPremium = project.trialPremiumMobile.insurantProductList["0"].plan.totalPremium
						for(var i in this.payWay){
							if(this.payWay[i].attCode == "amount"){
								this.zhuxianPremium = project.trialPremiumMobile.insurantProductList["0"].plan.productList["0"].premium
							}else if(this.payWay[i].attCode == "premium"){
								this.zhuxianMoney = project.trialPremiumMobile.insurantProductList["0"].plan.productList["0"].amount
							}
						}
						this.reasonList = []
					}else if(this.pass == "false"){
						this.totalPremium = "0"
						this.checkVisible_rule = true
						this.reasonList = project.trialPremiumMobile.insurantProductList["0"].checkResult.reasonList
						console.log(this.reasonList)
					}
					this.premiumDes1 = project.trialPremiumMobile.insurantProductList["0"].plan.productList["0"].premiumDes
					console.log('主险的保费为：' + this.premiumDes1)
					let fujia_extraList = project.trialPremiumMobile.insurantProductList["0"].plan.productList["0"].extraList
					console.log(fujia_extraList)
					for(let i in fujia_extraList){
						this.premiumDes2 = fujia_extraList[i].premiumDes
						console.log('附加险的保费为：' + this.premiumDes2)

					}
					var teshu = $("#toubaoxuzhi li:nth-child(1)").css({
						lineHeight:"20px",
						height:"auto",
						padding:"5px 0"
					})
					this.riderListRepeat()
				}).catch(error =>{

				})
			},
			setDate:function(){
		  		this.$calendar.show({
		  			year:[1925,2080],
		  			date:this.date1_1,
		  			onOk:(date)=>{
		  				this.date1_1 = date
		  				let newtime = this.date1_1.split('T')[0]
		  				let splittime = newtime.split('-')[1]
		  				if (splittime < 10) {
		  					splittime = '0' + splittime
		  				}
		  				let othsplittime = newtime.split('-')[2]
		  				
		  				if (othsplittime < 10) {
		  					othsplittime = '0' + othsplittime
		  				}
		  				this.date1 = newtime.split('-')[0] + '-' + splittime + '-' +othsplittime + 'T00:00:00.000Z'
		  			},
		  			onCancel:()=>{
		  				console.log('关闭')
		  			}
		  		})
	  		},
	  		setDate2:function(){
		  		this.$calendar.show({
		  			year:[1925,2080],
		  			date:this.date2_2,
		  			onOk:(date)=>{
		  				this.date2_2 = date
		  				let newtime = this.date2_2.split('T')[0]
		  				let splittime = newtime.split('-')[1]
		  				if (splittime < 10) {
		  					splittime = '0' + splittime
		  				}
		  				let othsplittime = newtime.split('-')[2]
		  				if (othsplittime < 10) {
		  					othsplittime = '0' + othsplittime
		  				}
		  				this.date2 = newtime.split('-')[0] + '-' + splittime + '-' +othsplittime + 'T00:00:00.000Z'
		  			},
		  			onCancel:()=>{
		  				console.log('关闭')
		  			}
		  		})
	  		},
		},
		updated(){
			console.log('>>>>>>>>updated()')
			var self = this;
			let arr = []
			$('.selectVal option:selected').each(function() {
				this.selectedVal = $(this).val()
				if(self.valueVal == undefined){
					self.valueVal = ''
				}
				self.valueVal = this.selectedVal
				let val = self.valueVal
				arr.push(JSON.parse(val))
				if(arr.length == 1){//0缴费方式 1缴费期限 2保险期限 3保险金额
					self.term_0 = arr[0].code
					self.selectBeginVal_0 = arr[0].text
					console.log('缴费方式:' + self.term_0 + '/' + self.selectBeginVal_0)
				}else if(arr.length == 2){
					self.term_1 = arr[1].code
					self.selectBeginVal_1 = arr[1].text
					console.log('交费期限:' + self.term_1 + '/' + self.selectBeginVal_1)
				}else if(arr.length == 3){
					self.term_2 = arr[2].code
					self.selectBeginVal_2 = arr[2].text
					console.log('保险期限:' + self.term_2 + '/' + self.selectBeginVal_2)
				}
			});
		},
		watch:{
			'$route':'getParams',
			/*监听姓名、性别、出生日期、保险金额*/
			/*监听的对象*/
			/*watchObj:{
				holderName,policyHolderName,
				holderSex,policyHolderSex,
				date1,date2,
				amount
			}*/
			jobValue(value){
				if(value){
					this.searchJob()
				}else{
					this.jobList = occupation.occupation.item
				}
				
			},
			jobCode(newVal,oldVal){
				if(newVal != oldVal){
					this.baofeiTest()
				}
			},
			fujiaPolicyAmount(newVal,oldVal){
				// if(newVal != oldVal){
				// 	this.baofeiTest()
				// }
			},
			holderSex(newVal,oldVal){
				if(newVal != oldVal){
					this.baofeiTest()
				}
			},
			policyHolderSex(newVal,oldVal){
				if(newVal != oldVal){
					this.baofeiTest()
				}
			},
			date1(newVal,oldVal){
				console.log(newVal)
				console.log(oldVal)
				if(newVal != oldVal){
					this.baofeiTest()
				}
			},
			date2(newVal,oldVal){
				if(newVal != oldVal){
					this.baofeiTest()
				}
			},
			amount(newVal,oldVal){
				// if(newVal != oldVal){
				// 	this.baofeiTest()
				// }
			},
			selectBeginVal_0(newVal,oldVal){
				if(newVal != oldVal){
					this.baofeiTest()
				}
			},
			selectBeginVal_1(newVal,oldVal){
				if(newVal != oldVal){
					this.baofeiTest()
				}
			},
			selectBeginVal_2(newVal,oldVal){
				if(newVal != oldVal){
					this.baofeiTest()
				}
			},
			payWay:{
				handler(newVal,oldVal){
					for(let i=0; i<newVal.length; i++){
						if(oldVal[i] != newVal[i]){
							this.baofeiTest()
						}
					}
				},
				deep:true
			},
			fujiaValue(newVal,oldVal){
				console.log(newVal)
			}
			/*监听险种以及附加险种的选择*/
		}
	}
</script>

<style lang="scss" scoped type="text/css">
select{
		background:url("../../assets/img/common/jiantou.png") no-repeat scroll right center;
		background-size: 15px 20px;
	}
	.teshu-header{
		height: 48px;line-height: 48px;
		text-align: center;
		background: #0C3073;
		color: #FFF;
		border-radius: 15px 15px 0 0;
		font-weight:bold;
	}
	.fa{
		color: #FEB101;
		font-size:20px;
	}
	.job{
		position: absolute;
		top: 52px;
		height: 40px;width: 100%;
		z-index: 1;
		border-bottom: 1px solid #BBB;
		.jobTit{
			float: left;
			line-height: 40px;
			text-align:center;
		}
		.jobContent{
			float: left;
			width: 100%;height: 40px;
			border-bottom: 1px solid #BBB;
			div{
				float: left;height: 100%;
				text-align:center;
			}
		}
	}
	.title{
		height: 40px;
		border-top:1px solid #A4A3A3;
		overflow: hidden;
		padding-left: 10px;
		background: #F0F0F0;
		display: flex;
		i{
			line-height: 40px;
			color: #FEB101;
			font-size: 25px;
		}
		span{
			line-height: 40px;
			font-weight: bold;
			padding-left: 10px;
			flex:1;
		}
	}
	li{
		float: left;
		width: 100%;height: 42px;
		border-bottom: 1px dashed #A3A2A2;
		line-height: 42px;
	}
	li:last-child{border-bottom: none;}
	.select{
		min-width: 90px;height: 41px;
		border:none;
		float:right;
		margin-right: 15px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.selectTeshu{
		text-align: right;
		option{
			text-indent: right;
		}
	}
	.message-list-one,.message-list-three{
		width: 100%;float: left;
		.content{
			width: 100%;
			ul{
				width: 100%;height: 100%;
				overflow: hidden;
				li{
					p{
						float: left;
						width: 25%;
						line-height: 40px;
						text-align: left;
						padding-left: 10px;
					}
					input{
						height: 40px;width: 65%;
						text-align: right;
						border:none !important;
					}
				}
			}
		}
	}
	.message-list-two{
		float: left;width: 100%;
		.content{
			width: 100%;height: 100%;
			ul{
				width: 100%;height: 100%;
				li{
					p{
						float: left;
						width: 30%;
						text-align: left;
						padding-left: 10px;
					}
					input{
						height: 40px;width: 65%;
						text-align: right;
					}
				}
			}
		}
	}
	.message-list-four{
		float: left;
		width: 100%;height: 169px;
		.content{
			width: 100%;height: 100%;
			ul{
				width: 100%;height: 100%;
				li{
					p{
						float: left;
						width: 35%;
						text-align: left;
						padding-left: 10px;
					}
					input{
						height: 40px;width: 56%;
						text-align: right;
					}
				}
			}
		}
	}
	.message-list-five{
		float: left;width: 100%;
		.mint-cell{
			background: #F0F0F0 !important;
		}
		.five-content{
			height: 360px;
		}
		.content-one{
			li{
				display: flex;
				p{
					width: 35%;
					padding-left:10px;
				}
				span{
					flex:1;
					text-align: left;
					padding-left:10px;
				}
			}
		}
		.content-two{
			width: 90%;
			margin: auto;
			li{
				display: flex;
				justify-content:space-around;
				border:1px solid #F0F0F0;
				p{
					width: 50%;
					text-align: center;
				}
			}
			li:nth-child(1){background: #F0F0F0;margin-top: 5px;}
			li:nth-child(4){margin-bottom: 5px;}
			li p:nth-child(1){border-right:2px solid #F0F0F0;}
		}
	}
	.make-sure{
		float: left;
		width: 100%;height: 105px;
		background: #F0F0F0;
		line-height: 105px;
		display:flex;
		justify-content:space-around;
		.true-btn{
			width: 25%;height: 40px;
			background: #FEB101;
			color: #FFF;
			font:18px/40px '';
			display: inline-block;
			transform: translateY(85%);
		}
	}
	.bg-img .mint-popup-right{
		width:100%;height: 100%;
		background: #F2F2F2;
		img{
			display: block;
			width:100%;height: 100%;
		}
		.send-name{
			position: absolute;
			bottom: 100px;left: 50%;
			transform:translate(-50%);
			color: #E84E40;
			font-size: 20px;
			font-weight:bold;
		}
	}
	.button{
		width: 85%;
		position: absolute;
		bottom: 8px;
		padding: 0 20px;
		text-align: center;
		div{
			float: left;
			width: 100%;height: 100%;
		}
		.mint-button{
			padding: 0 20px;
		}
		#button-sure{
			background-color: #12294A;
			color: #E51C23;
			width: 70%;
			font-weight:bold;
		}
	}
	.fujia{
		width: 100%;
		padding: 0;
		border-top: 1px solid #BBB;
		div{
			margin-top: 5px;
		}
	}
	.pd-md{
		color: #081234;
		div{
			line-height: 42px;
			width: 100%;height: 42px;
			p{
				width: 35%;
				float: left;
			}
			input{
				text-align: right;
				width: 60%;
			}
		}
	}
	.mint-cell-wrapper{
		padding: 0 !important;
	}
	#fujia-choose{
		margin-top: 5px;
		height: 190px;
		overflow-y: auto;
	}
	.fujia-content{
		div{
			height: 40px;
			padding:0 10px;
			border-bottom: 1px solid #BBB;
			p{
				height: 40px;
				line-height: 40px;
				width: 50%;
				float: left;
			}
		}
	}
</style>