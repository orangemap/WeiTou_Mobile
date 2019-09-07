<template>
	<div>
		<Headerbtns :title="page_title" class="title">
			<div slot="left" class="back" @click="detailBack">
				<i class="fa fa-angle-left"></i>
			</div>
			<div slot="right">
				<span @click="infoList" class="server">保单服务</span>
			</div>
		</Headerbtns>
		<div class="details">
			<div class="content">
				<div v-for="item in dataList" style="width: 100%;">
					<div style="height: 43px;line-height: 43px;background: #F5F5F5;border-bottom: 1px solid #A2A2A2;">
						<span style="width: 10%;display: inline-block;text-align: center;">
							<img :src="item.icon1" alt="" style="width: 0.8rem;vertical-align: middle;"/>
						</span>
						<span style="width: 70%;display: inline-block;">
							{{item.name}}
						</span>
						<span style="width: 13%;display: inline-block;text-align: right;margin-right: 10px;">
							<img :src="item.icon2" alt="" style="width: 0.8rem;height: 0.8rem;vertical-align: middle;" @click="dataShow(item)"/>
						</span>
					</div>
					<div v-show="!item.show" v-if="item.id=='0'" style="background: #fff;padding: 2%;border-bottom: 1px solid #A2A2A2;">
						<div>
							<ul>
								<li class="dash itt flexs flex-center">
									<span>{{holderList.appntName}}</span>
									<span>{{holderList.appntSex == "0"?"男":"女"}}</span>
									<span>{{holderList.appntBirthday}}</span>
								</li>
								<li class="itt">
									<span>客户号：{{holderList.appntCustNo}}</span>
								<li class="itt">
									<span>证件类型：{{idTypeText(holderList.appntIDType)}}</span>
								</li>
								<li class="itt">
									<span>证件号码：{{holderList.appntIDNo}}</span>
								</li>
								<li class="itt">
									<span>证件有效起期：{{holderList.iDStartDate}}</span>
								</li>
								<li class="itt">
									<span>证件有效止期：{{holderList.appntIDExpDate}}</span>
								</li>
								<!--<li class="itt">
									<span>年龄：{{holderList.appntAge}}岁</span>
								</li>-->
								<li class="itt">
									<span>手机号码：{{holderList.appntMobile}}</span>
								</li>
								<li class="itt">
									<span>家庭电话：{{holderList.appntHomePhone}}</span>
								</li>
								<li class="itt">
									<span>邮箱：{{holderList.appntEmail}}</span>
								</li>
								<li class="itt">
									<span style="word-wrap:break-word; word-break:normal;">详细地址：{{holderList.holderProvince}}{{holderList.holderCity}}{{holderList.county}}{{holderList.street}}{{holderList.community}}{{holderList.appntPostalAddress}}</span>
								</li>
								<li class="itt">
									<span>邮编：{{holderList.zipCode}}</span>
								</li>
								<li class="itt">
									<span>续期扣款账户名：{{contInfo.bankAccName}}</span>
								</li>
								<li class="itt">
									<span>续期扣款账户银行：{{contInfo.bankName}}</span>
								</li>
								<li class="itt">
									<span>续期扣款账户账号：{{contInfo.bankAccNo|dataCover(6,4)}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div v-show="!item.show" v-if="item.id=='1'" style="background: #fff;padding: 2%;border-bottom: 1px solid #A2A2A2;">
						<div>
							<ul v-for="items in insurentList">
								<li class="dash itt flexs flex-center">
									<span>{{items.insuName}}</span>
									<span>{{items.insuSex == "0"?"男":"女"}}</span>
									<span>{{items.insuBirthday}}</span>
								</li>
								<li class="itt">
									<span>与投保人关系：{{items.relationToAppnt|ralationBaoQuanFilter}}</span>
								</li>
								<li class="itt">
									<span>客户号：{{items.insuCustNo}}</span>
								</li>
								<li class="itt">
									<span>证件类型：{{idTypeText(items.insuIDType)}}</span>
								</li>
								<li class="itt">
									<span>证件号码：{{items.insuIDNo}}</span>
								</li>
								<li class="itt">
									<span>证件有效起期：{{items.iDStartDate}}</span>
								</li>
								<li class="itt">
									<span>证件有效止期：{{items.insuIDExpDate}}</span>
								</li>
								<li class="itt">
									<span>身高：{{items.insuStature}}CM</span>
								</li>
								<li class="itt">
									<span>体重：{{items.insuAvoirdupois}}KG</span>
								</li>
								<li class="itt">
									<span>手机号码：{{items.insuMobile}}</span>
								</li>
								<li class="itt">
									<span>家庭电话：{{items.insuHomePhone}}</span>
								</li>
								<li class="itt">
									<span>邮箱：{{items.insuEmail}}</span>
								</li>
								<!--<li class="itt">
									<span style="word-wrap:break-word; word-break:normal;">详细地址：{{items.insurentProvince}}{{items.insurentCity}}{{items.insuCommunity}}{{items.insuStreet}}{{items.insuPostalAddress}}</span>
								</li>-->
								<!--<li class="itt">
									<span>邮编：{{items.insuZipCode}}</span>
								</li>-->
							</ul>
						</div>
					</div>
					<div v-show="!item.show" v-if="item.id=='2'" style="background: #fff;padding: 2%;border-bottom: 1px solid #A2A2A2;">
						<div>
							<ul v-for="itt in bnfList" class="dash">
								<li class="itt">
									<span>受益人姓名：{{itt.bnfName}}</span>
								</li>
								<li class="itt">
									<span>性别：{{itt.bnfSex == "0"?"男":"女"}}</span>
								</li>
								<li class="itt">
									<span>受益顺序：{{itt.bnfLevel}}</span>
								</li>
								<li class="itt">
									<span>受益比例：{{itt.bnfRatio|ToPercent}}</span>
								</li>
								<li class="itt">
									<span>证件类型：{{idTypeText(itt.bnfIDType)}}</span>
								</li>
								<li class="itt">
									<span>证件号码：{{itt.bnfIDNo}}</span>
								</li>
								<li class="itt">
									<span>证件有效起期：{{itt.iDStartDate}}</span>
								</li>
								<li class="itt">
									<span>证件有效止期：{{itt.iDExpDate}}</span>
								</li>
								<li class="itt" v-for="items in insurentList">
									<span>被保人客户号：{{items.insuCustNo}}</span>
								</li>
								<li class="itt" v-for="items in insurentList">
									<span>被保人姓名：{{items.insuName}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div v-show="!item.show" v-if="item.id=='3'" style="background: #fff;padding: 2%;border-bottom: 1px solid #A2A2A2;">
						<div>
							<ul>
								<li class="itt">
									<span>保单号：{{contInfo.contNo}}</span>
								</li>
							</ul>	
							<ul v-for="items in polInfoList" v-if="items.mainPolFlag == 'Y'">
								<li class="itt">
									<span>产品名称：{{items.riskName}}</span>
								</li>
								<li class="itt">
									<span>被保人姓名：{{items.insuName}}</span>
								</li>
								<li class="itt">
									<span>保额：{{items.amnt}}元</span>
								</li>
								<li class="itt">
									<span>保障生效日期：{{items.cValiDate}}</span>
								</li>
								<li class="itt">
									<span>保障满期日：{{items.endDate}}</span>
								</li>
								<li class="itt">
									<span>交费年期：{{items.payYears}}年</span>
								</li>
								<li class="itt">
									<span>交费频率：{{items.payIntv | intv}}</span>
								</li>
								<li class="itt">
									<span>保费：{{items.prem}}元</span>
								</li>
								<li class="itt">
									<span>险种状态：{{items.polState | polStaue}}</span>
								</li>
								<li class="itt">
									<span>交费对应日：{{contInfo.payToDate}}</span>
								</li>
								<!--<li class="itt">
									<span>交费频率：{{}}</span>
								</li>-->
							</ul>
							<ul v-for="items in polInfoList" v-if="items.mainPolFlag == 'N'">
								<li class="itt">
									<span>产品名称：{{items.riskName}}</span>
								</li>
								<li class="itt">
									<span>被保人姓名：{{items.insuName}}</span>
								</li>
								<li class="itt">
									<span>保额：{{items.amnt}}元</span>
								</li>
								<li class="itt">
									<span>保障生效日期：{{items.cValiDate}}</span>
								</li>
								<li class="itt">
									<span>保障满期日：{{items.endDate}}</span>
								</li>
								<li class="itt">
									<span>交费年期：{{items.payYears}}年</span>
								</li>
								<li class="itt">
									<span>交费频率：{{items.payIntv | intv}}</span>
								</li>
								<li class="itt">
									<span>保费：{{items.prem}}元</span>
								</li>
								<li class="itt">
									<span>险种状态：{{items.polState | polStaue}}</span>
								</li>
								<!--<li class="itt">
									<span>交费频率：{{}}</span>
								</li>-->
							</ul>
						</div>
					</div>
					<div v-show="!item.show" v-if="item.id=='4'" style="background: #fff;padding: 2%;border-bottom: 1px solid #A2A2A2;">
						<div>
							<ul >
								<li class="itt">
									<span>当前贷款利率：{{contInfo.loanRate}}</span>
								</li>
								<!--<li class="itt">
									<span>当前贷款利率适用起期：{{contInfo.loanRateStartDate}}</span>
								</li>
								<li class="itt">
									<span>当前贷款利率适用止期：{{contInfo.loanRateEndDate}}</span>
								</li>-->
								<li class="itt">
									<span>垫交金额：{{contInfo.payPremMoney}}</span>
								</li>
								<!--<li class="itt">
									<span>垫交金额始期：{{contInfo.payPremStrDate}}</span>
								</li>
								<li class="itt">
									<span>垫交金额止期：{{contInfo.payPremEndDate}}</span>
								</li>-->
								<li class="itt">
									<span>垫交应还金额：{{contInfo.payPremRepayMoney}}</span>
								</li>
								<li class="itt">
									<span>贷款金额：{{contInfo.loanMoney}}</span>
								</li>
								<li class="itt">
									<span>贷款金额始期：{{contInfo.loanStarDate}}</span>
								</li>
								<li class="itt">
									<span>贷款金额止期：{{contInfo.loanEndDate}}</span>
								</li>
								<li class="itt">
									<span>贷款应还金额：{{contInfo.loanRepayMoney}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div v-show="!item.show" v-if="item.id=='5'" style="background: #fff;padding: 2%;border-bottom: 1px solid #A2A2A2;">
						<div>
							<ul >
								<li class="itt">
									<span>红利领取方式：{{contInfo.bonusGetMode | modeStaue}}</span>
								</li>
								<li class="itt">
									<span>可领取红利金额：{{contInfo.bonusSum}}</span>
								</li>
								<li class="itt">
									<span>当前账户价值：{{contInfo.insuAccBala}}</span>
								</li>
								<li class="itt">
									<span>万能账户价值：{{contInfo.insuAccWN}}</span>
								</li>
								<li class="itt">
									<span>投连账户价值：{{contInfo.insuAccTL}}</span>
								</li>
								<!--<li class="itt">
									<span>生存金领取方式：{{contInfo.liveGetMode | liveStaue}}</span>
								</li>-->
								<li class="itt">
									<span>当前可领取保险金本息和：{{contInfo.insuMoneySum}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div v-show="!item.show" v-if="item.id=='6'" style="background: #fff;padding: 2%;border-bottom: 1px solid #A2A2A2;">
						<div>
							<table cellspacing="0" cellpadding="0" width="100%" style="text-align: center;line-height: 1.1rem;" class="boder">
								<tr>
									<th>交费年度</th>
									<th>交费类型</th>
									<th>现交至日期</th>
									<th>交费期数</th>
									<th>保单交费合计</th>
									<th>交费频率</th>
								</tr>
								<tr v-for="items in reFeeInfoList">
									<td>{{items.payYear}}年</td>
									<td>{{items.payType}}</td>
									<td>{{items.payDate}}</td>
									<td>{{items.payCount}}</td>
									<td>{{items.payPrem}}元</td>
									<td>{{items.payIntv | Baoquanintv}}</td>
								</tr>
							</table>
						</div>
					</div>
					<div v-show="!item.show" v-if="item.id=='7'" style="background: #fff;padding: 2%;border-bottom: 1px solid #A2A2A2;">
						<div>
							<ul v-for="items in reFees">
								<!--<li class="itt">
									<span>创建日期：{{items.creatDate}}</span>
								</li>-->
								<li class="itt">
									<span>开户银行：{{items.bankName}}</span>
								</li>
								<li class="itt">
									<span>账号姓名：{{items.accName}}</span>
								</li>
								<li class="itt">
									<span>银行卡号：{{items.accNo}}</span>
								</li>
								<li class="itt">
									<span>代扣金额：{{items.duePayMoney}}</span>
								</li>
								<li class="itt">
									<span>报盘日期：{{items.transDate}}</span>
								</li>
								<li class="itt">
									<span>上载日期：{{items.confDate}}</span>
								</li>
								<li class="itt">
									<span>银行处理结果：{{items.bankBackResult}}</span>
								</li>
								<li class="itt">
									<span>代扣状态：{{items.transResult | daikouStaue}}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

			</div>
			<mt-popup v-model="toggle.email">
			<div>
				<div class="mint-msgbox-wrapper" style="position: absolute; z-index: 9999;">
					<div class="mint-msgbox" style="">
						<div class="mint-msgbox-header">
							<div class="mint-msgbox-title">保单服务
								<div class="title-boder"></div>
							</div>
						</div>
						<div style="display: flex;flex-wrap: wrap;width: 100%;margin: 3% 0;">
							<div v-for="item in serverList" v-show="item.show" style="width: 41%;margin: auto;border: 1px solid #FEB101;border-radius: 5px;color: #FEB101;text-align: center;margin: 2% 0 3% 5%;height:36px;line-height:36px;" @click="goTo(item)">
								{{item.name}}
							</div>
						</div>
						<div style="border: 1px dashed #959595;margin: 10px 0;">
							
						</div>
						<div class="btn-wrapper">
							<div class="add-btn" @click="handleClick">关闭</div>
						</div>
					</div>
				</div>
				<div class="v-modal" style="z-index: 2000;"></div>
			</div>
		</mt-popup>
		<mt-popup v-model="toggle.over">
			<div>
				<div class="mint-msgbox-wrapper" style="position: absolute;">
					<div class="mint-msgbox" style="">
						<div class="mint-msgbox-header">
							<div class="mint-msgbox-title">温馨提示
								<div class="title-boder"></div>
							</div>
						</div>
						<div style="display: flex;flex-wrap: wrap;width: 100%;" v-for="item in name">
							<div style="width: 90%;margin: 15px auto;line-height: 1rem;">
								客户{{item.name}}的证件有效期已过期或为空，请更新或补充后再办理此业务！
							</div>
						</div>
						<div style="border: 1px dashed #959595;margin: 10px 0;">
							
						</div>
						<div class="btn-wrapper">
							<div class="add-btn" @click="sure()">确定</div>
						</div>
					</div>
				</div>
				<div class="v-modal" style=""></div>
			</div>
		</mt-popup>
		</div>
		<p><Alert ref="showalert"></Alert></p>
	</div>
</template>

<script>
	import Headerbtns from '@/components/common/newHeader/newheader.vue'
	import { MessageBox } from 'mint-ui'
	import card from '../../../static/img/preservation/card.png'
	import person from '../../../static/img/preservation/person.png'
	import policy from '../../../static/img/preservation/policy.png'
	import open from '../../../static/img/preservation/open.png'
	import fold from '../../../static/img/preservation/fold.png'
	import Alert from '@/components/policy/common/alert'
	import {mapState,mapMutations} from 'vuex'
	import store from '@/vuex/preservation/index.js'
	import cityList from '../../../static/dict/city_sunlife.json'
	import provinceList from '../../../static/dict/province_sunlife.json'
	const fillZero = value => {
		if(('' + value).length == 1) {
			value = '0' + value
		}
		return value
	}
	export default {
		name: 'preservationPolicySearch',
		components: {
			Headerbtns,
			Alert
		},
		data() {
			return {
				page_title: '保单详情',
				show: false,
				toggle: {
					email: false,
					over:false,
					none:false,
				},
				holderList:'',//投保人
				insurentList:'',//被保人
				polInfoList:'',//保障信息
				contInfo:'',
				bnfList:'',
				EdorList:'',
				holderDate:'',
				insurentDate:'',
				holderName:'',
				holderSex:'',
				holderIDexp:'',
				insurentName:'',
				insurentSex:'',
				insurentIDexp:'',
				idTypeList:[
					{code:'11',text:'身份证'},
					{code:'12',text:'户口本'},
					{code:'17',text:'中国护照'},
					{code:'24',text:'外国护照'},
					{code:'23',text:'台胞证'},
					{code:'26',text:'港澳通行证'},
					{code:'20',text:'出生证'},
					{code:'29',text:'外国人永久居留身份证'}
				],
				serverList:[
					{id:'IP',name:'保险费追加',serverName:'追加保费',show:false},
					{id:'PC',name:'保单交费',serverName:'交费信息变更',show:false},
					{id:'CM',name:'证件有效期变更',serverName:'客户资料变更(客户层)',show:false},
					{id:'LR',name:'保单补发',serverName:'保单补发',show:false},
					{id:'WT',name:'退保/犹豫期退保',serverName:'犹豫期退保',show:false},
					{id:'AR',name:'账户价值提取',serverName:'账户价值部分领取',show:false},
					{id:'TI',name:'账户转换',serverName:'账户转换',show:false},
					{id:'CP',name:'续期计划保险费变更',serverName:'续期计划保险费变更',show:false},
					{id:'CS',name:'签名变更',serverName:'签名变更',show:false},
					{id:'AM',name:'客户联系方式变更',serverName:'客户联系方式变更',show:false},
					{id:'DB',name:'红利领取',serverName:'红利领取',show:false},
					{id:'BC',name:'受益人变更',serverName:'受益人变更',show:false},
					{id:'GC',name:'保险金给付转账授权',serverName:'保险金给付转账授权',show:false},
					{id:'AE',name:'投保人变更',serverName:'投保人变更',show:false},
					// {id:'CT',name:'退保',serverName:'退保',show:false},
					{id:'FM',name:'交费期间变更',serverName:'交费期间变更',show:false},
					{id:'EN',name:'续保方式变更',serverName:'续保方式变更',show:false},
					{id:'LN',name:'保单贷款',serverName:'保单贷款',show:false},
					{id:'NS',name:'新增保障',serverName:'新增保障',show:false},
					{id:'PR',name:'保单迁移',serverName:'保单迁移',show:false},
					{id:'PT',name:'减保',serverName:'减保',show:false},
					{id:'RE',name:'保单复效',serverName:'保单复效',show:false},
					{id:'TR',name:'垫交期交费',serverName:'垫交期交费',show:false},
					{id:'PU',name:'减额缴清',serverName:'减额缴清',show:false},
					{id:'RF',name:'保单还款',serverName:'保单还款',show:false},
					{id:'XT',name:'协议退保',serverName:'协议退保',show:false},
					{id:'RB',name:'保全回退',serverName:'保全回退',show:false},
					{id:'AP',name:'保险费逾期未付选择权变更',serverName:'保险费逾期未付选择权变更',show:false},
					{id:'LG',name:'保险金领取',serverName:'保险金领取',show:false},
					{id:'BM',name:'红利领取方式变更',serverName:'红利领取方式变更',show:false},
					{id:'PM',name:'交费频率变更',serverName:'交费频率变更',show:false},
					{id:'PL',name:'保单挂失与挂失解除',serverName:'保单挂失与挂失解除',show:false},
					{id:'PA',name:'账户选择权变更',serverName:'账户选择权变更',show:false},
					{id:'HI',name:'补充告知',serverName:'补充告知',show:false},
					{id:'IC',name:'客户资料变更(保单层)',serverName:'客户资料变更(保单层)',show:false},
					{id:'BJ',name:'保单冻结与冻结解除',serverName:'保单冻结与冻结解除',show:false},
					{id:'GA',name:'年金领取方式及年金领取频率变更',serverName:'年金领取方式及年金领取频率变更',show:false},
					{id:'MC',name:'满期后续保',serverName:'满期后续保',show:false},
					{id:'PF',name:'投连万能保额调整',serverName:'投连万能保额调整',show:false},
					{id:'RT',name:'退还保险费',serverName:'退还保险费',show:false},
					{id:'AB',name:'自动账户平衡',serverName:'自动账户平衡',show:false},
					{id:'PB',name:'交纳续期保险费',serverName:'交纳续期保险费',show:false},
					{id:'BS',name:'保单银行质押贷款止付',serverName:'保单银行质押贷款止付',show:false},
					{id:'BO',name:'保单银行质押贷款解付',serverName:'保单银行质押贷款解付',show:false},
					{id:'BG',name:'银行质押保单行使质权',serverName:'银行质押保单行使质权',show:false},
					{id:'AG',name:'增额交清保险金现金价值提取',serverName:'增额交清保险金现金价值提取',show:false},
					{id:'AT',name:'投诉通融退保退费',serverName:'投诉通融退保退费',show:false},
					{id:'CD',name:'出单前撤件（历史）',serverName:'出单前撤件（历史）',show:false},
					{id:'AC',name:'年金转换权',serverName:'年金转换权',show:false},
					{id:'HB',name:'年金受益人变更',serverName:'年金受益人变更',show:false},
				],
				policyList:[],
				dataList: [
				{name: '投保人信息',icon1: person,icon2: 'static/img/preservation/fold.png',show: true,id: 0},
				{name: '被保人信息',icon1: person,icon2: 'static/img/preservation/fold.png',show: true,id: 1},
				{name: '受益人信息',icon1: person,icon2: 'static/img/preservation/fold.png',show: true,id: 2},
				{name: '保单信息',icon1: policy,icon2: 'static/img/preservation/fold.png',show: true,id: 3},
				{name: '垫交/贷款',icon1: card,icon2: 'static/img/preservation/fold.png',show: true,id: 4},
				{name: '红利/账户价值/保险金',icon1: card,icon2: 'static/img/preservation/fold.png',show: true,id: 5},
				{name: '交费信息',icon1: policy,icon2: 'static/img/preservation/fold.png',show: true,id: 6},
				{name: '续期代扣记录',icon1: policy,icon2: 'static/img/preservation/fold.png',show: true,id: 7},
				],
				show: this.fold,
				customerIDNo:'',
				currentdate:'',
				insurentDates:'',
				bnfDate:'',
				bnfDates:'',
				name:[],
				OverDate:[],
				detail:'',
				reFeeInfoList:'',//续期信息
				reFees:'',//续期代扣
			}
		},
		computed:{
			...mapState(['policyData','policyPremium']),
		},store,
		mounted() {
			console.log(this.policyData)
			//当前页面适配
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = this.screenWidth / 20 + 'px'
			this.media.header($('.details'))
			$('.details').css('height',this.media.container(this.screenHeight,0)).css('overflow','scroll')
			let queryParams = this.$route.query;
			if(queryParams) {
				if(queryParams.ContNo) {
					this.policyData.contNo = queryParams.ContNo;
				}
			}
			console.log(this.policyData.contNo)
			this.SetPremiumData({
				postalType:'',//批单寄送方式
				pEmail:'',//邮箱
				rNPrem:'',//交费金额
				bankCode:'',//交费银行编码
				bankAccName:'',//交费银行名称
				name:'',//户名
				bankCard:'',//卡号
				idFront:'',//证件正面id
				idBack:'',//证件反面id
				frontImg:'',//正面base64
				backImg:'',//反面base64
				insuAccBala:'',
				address:'',//地址
				zipCode:'',//邮编
				phone:'',//联系电话
				edorReasonCode:'',//退保原因编码
				edorReason:'',//退保原因
				mainRask:'',//主险名称
			})
			//保单详情
			this.policy()
		},
		beforeDestroy() {
			//清空
			let htmlDOM = document.getElementsByTagName('html')[0]
			htmlDOM.style.fontSize = ''
		},
		methods: {
			showModals(message) {
		        this.$refs.showalert.showMOdal(message)
		      },
			...mapMutations(['SetpolicyData','SetPremiumData']),
			idTypeText(id) {
				let text = ''
				this.idTypeList.forEach( item =>{
					if(id == item.code){
						text = item.text
					}
				})
				return text;
			},
			//保单详情
			policy(){
				let requ = {
					 data: {
	                    "ContNo":this.policyData.contNo,
//						"ContNo":"110000426888",
   						"PrtNo":this.policyData.prtNo
	                },
	                modelName: "conservationService",
	                methodName: "policyDetail"
	              }
				utils.http.postFast('CusbusinessService', requ,(body) => {
						if(body.data.code == 0){
							this.detail=body.data.detail
							this.holderList=body.data.detail.AppntInfo
							this.insurentList=body.data.detail.insuInfoList
							this.polInfoList=body.data.detail.polInfoList
							this.contInfo=body.data.detail.ContInfo
							this.bnfList=body.data.detail.bnfInfoList
							try{
								this.bnfList.sort(function(a,b){
									return a.bnfLevel - b.bnfLevel
								})
							}catch (err) {
								console.log(err)
						    }
							//银行名称
							this.policyPremium.bankAccName=this.contInfo.bankName
							this.policyPremium.bankCode=this.contInfo.bankCode
							this.policyPremium.name=this.contInfo.bankAccName
							//银行卡号
							this.policyPremium.bankCard=this.contInfo.bankAccNo
							this.SetPremiumData(this.policyPremium)
							if(this.holderList.province!=''){
								this.holderList.holderProvince=this.getProvince(this.holderList.province)
							}else{
								this.holderList.holderProvince=''
							}
							if(this.holderList.city!=''){
								this.holderList.holderCity=this.getCity(this.holderList.city)
							}else{
								this.holderList.holderCity=''
							}
							
							this.holderDate=this.holderList.appntIDExpDate
							if(this.holderList.appntIDExpDate=='2200-12-31'){
								this.holderList.appntIDExpDate='长期有效'
							}
							this.policyData.holder=this.holderList
							this.policyData.ContInfo=this.contInfo
							this.SetpolicyData(this.policyData)
//							受益人
//							console.log(this.bnfList.length)
							if(this.bnfList.length>0){
								for(let j=0;j<this.bnfList.length;j++){
									this.bnfDate=this.bnfList[j].iDExpDate
									if(this.bnfList[j].iDExpDate=='2200-12-31'){
										this.bnfList[j].iDExpDate='长期有效'
									}
									this.policyData.bnfList[j]=this.bnfList[j]
									this.policyData.bnfList[j].id=j
									this.currentdate=new Date()
									for(let j=0;j<this.policyData.bnfList.length;j++){
										this.bnfDates=new Date(Date.parse(this.policyData.bnfList[j].iDExpDate.replace(/-/g,'/')))
										if(this.bnfDates<this.currentdate){
											this.policyData.bnfList[j].aa=true
										}else{
											this.policyData.bnfList[j].aa=false
										}
									}
									this.policyData.bnfList.sort(function(a,b){
										return a.bnfLevel - b.bnfLevel
									})
								}
								this.SetpolicyData(this.policyData)
								console.log(this.policyData)
							}
//							被保人
							if(this.insurentList.length>0){
								for(let i=0;i<this.insurentList.length;i++){
									this.insurentDate=this.insurentList[i].insuIDExpDate
//									if(this.policyData.insurent[i].insuIDExpDate=='2200-12-31'){
//										this.policyData.insurent[i].insuIDExpDate='有效'
//										this.insurentList[i].insuIDExpDate='有效'
//									}
									if(this.insurentList[i].insuIDExpDate=='2200-12-31'){
										this.insurentList[i].insuIDExpDate='长期有效'
									}
									this.insurentList[i].insurentProvince=this.getProvince(this.insurentList[i].insuProvince)
									this.insurentList[i].insurentCity=this.getCity(this.insurentList[i].insuCity)
									this.policyData.insurent[i]=this.insurentList[i]
									this.policyData.insurent[i].id=i
									this.currentdate=new Date()
									for(let i=0;i<this.policyData.insurent.length;i++){
										this.insurentDates=new Date(Date.parse(this.policyData.insurent[i].insuIDExpDate.replace(/-/g,'/')))
										if(this.insurentDates<this.currentdate){
											this.policyData.insurent[i].aa=true
										}else{
											console.log('insuent')
											this.policyData.insurent[i].aa=false
										}
									}
									
								}
								this.SetpolicyData(this.policyData)
								console.log(this.policyData)
							}
						}else{
							this.showModals(body.data.msg)
						}
				})
			},
			//获取省份
			getProvince(code){
				if(code != undefined && code != ""){
			    if (provinceList != undefined && provinceList !="") {
			     for (var i = 0; i < provinceList.province.item.length; i++) {
			          if(provinceList.province.item[i].code == code){
			            return provinceList.province.item[i].text
			          }
			      }
			      return ""
			    }
			  }
			},
			//获取市区
			getCity(code){
				if(code != undefined && code != ""){
			    if (cityList != undefined && cityList !="") {
			     for (var i = 0; i < cityList.city.item.length; i++) {
			          if(cityList.city.item[i].code == code){
			            return cityList.city.item[i].text
			          }
			     }
			     if(code == '110000'){//北京
			     	return '北京市'
			     }else if(code == '120000'){//天津
			     	return '天津市'
			     }else if(code == '310000'){//上海
			     	return '上海市'
			     }else if(code == '500000'){//重庆
			     	return '重庆市'
			     }
			     if(code != null){
			     	return ""
			     }
			    }
			  }
			},
			handleClick() {
				this.toggle.email = false
			},
			ok(){
				this.toggle.none=false
			},
			sure(){
				this.SetpolicyData(this.policyData)
				this.go('/preservation/preservationPolicyOverChange')
			},
			isOver(){
				let date=new Date()
				let cc=[]
				let newDate=date.getFullYear()+'-'+fillZero(date.getMonth()+1)+'-'+fillZero(date.getDate())
				for(let i=0;i<this.policyData.insurent.length;i++){
					cc.push({date:this.policyData.insurent[i].insuIDExpDate,name:this.policyData.insurent[i].insuName})
				}
				for(let i=0;i<this.policyData.bnfList.length;i++){
					cc.push({date:this.policyData.bnfList[i].iDExpDate,name:this.policyData.bnfList[i].bnfName})
				}
				cc.push({date:this.policyData.holder.appntIDExpDate,name:this.policyData.holder.appntName})
				for(let i=0;i<cc.length;i++){
					if(cc[i].date<newDate){
						this.OverDate.push(cc[i])
					}
					console.log(this.OverDate)
				}
			},
			goTo(item){
				if(item.id=='PC'){
//					this.policyData.server=item.name
//					this.SetpolicyData(this.policyData)
					this.isOver()
					if(this.OverDate.length>0){
						let arr=[]
						for(let i=0;i<this.OverDate.length;i++){
							arr.push({name:this.OverDate[i].name})
							this.toggle.email=false
							this.toggle.over=true
						}
						console.log(arr)
						this.name=this.media.repeat(arr,'name')
						console.log(this.name)
					}else{
						this.go('/preservation/preservationPolicyPremium?serverId='+item.id)
					}
				}else if(item.id=='IP'){
//					this.policyData.server=item.name
//					this.SetpolicyData(this.policyData)
					this.isOver()
					if(this.OverDate.length>0){
						let arr=[]
						for(let i=0;i<this.OverDate.length;i++){
							arr.push({name:this.OverDate[i].name})
							this.toggle.email=false
							this.toggle.over=true
						}
						this.name=this.media.repeat(arr,'name')
					}else{
						this.go('/preservation/preservationPremiumAddition?serverId='+item.id)
					}
				}else if(item.id=='WT'){
//					this.policyData.server=item.name
//					this.SetpolicyData(this.policyData)
					this.isOver()
					if(this.OverDate.length>0){
						let arr=[]
						for(let i=0;i<this.OverDate.length;i++){
							arr.push({name:this.OverDate[i].name})
							this.toggle.email=false
							this.toggle.over=true
						}
						this.name=this.media.repeat(arr,'name')
					}else{
						this.go('/preservation/preservationSurrender?serverId='+item.id)
					}
				}else if(item.id=='CT'){
//					this.policyData.server=item.name
//					this.SetpolicyData(this.policyData)
					this.isOver()
					if(this.OverDate.length>0){
						let arr=[]
						for(let i=0;i<this.OverDate.length;i++){
							arr.push({name:this.OverDate[i].name})
							this.toggle.email=false
							this.toggle.over=true
						}
						this.name=this.media.repeat(arr,'name')
					}else{
						this.go('/preservation/preservationSurrender?serverId='+item.id)
					}
				}else if(item.id=='AR'){
//					this.policyData.server=item.name
//					this.SetpolicyData(this.policyData)
					this.isOver()
					if(this.OverDate.length>0){
						let arr=[]
						for(let i=0;i<this.OverDate.length;i++){
							arr.push({name:this.OverDate[i].name})
							this.toggle.email=false
							this.toggle.over=true
						}
						this.name=this.media.repeat(arr,'name')
					}else{
						this.go('/preservation/preservationAccount?serverId='+item.id)
					}
				}else if(item.id=='LR'){
//					this.policyData.server=item.name
//					this.SetpolicyData(this.policyData)
					this.isOver()
					if(this.OverDate.length>0){
						let arr=[]
						for(let i=0;i<this.OverDate.length;i++){
							arr.push({name:this.OverDate[i].name})
							this.toggle.email=false
							this.toggle.over=true
						}
						this.name=this.media.repeat(arr,'name')
					}else{
						if(this.contInfo.contState == 1){
							this.go('/preservation/preservationPolicyReissue?serverId='+item.id)
						}else{
							this.toggle.email = false
							this.showModals("保单已失效或终止。");
						}
					}
				}else if(item.id=='CM'){
//					this.policyData.server=item.name
//					this.SetpolicyData(this.policyData)
//					console.log(this.policyData)
					this.go('/preservation/preservationPolicyOverChange')
				}
			},
			left() {
				this.detailBack()
			},
			detailBack() {
				this.go('/preservation/preservationPolicySearch')
			},
			infoList() {
				if(this.detail!=''){
					if(this.policyData.holder.appntIDType!='11'){
						this.showModals("证件类型非身份证，请至分公司客服柜面办理保全业务。");
					}else{
						this.toggle.email = true
						//保单服务
						let requ = {
							 data: {
			                    "ContNo":this.policyData.contNo
			                },
			                modelName: "conservationService",
			                methodName: "conservationItem"
			              }
						utils.http.postFast('CusbusinessService', requ, (body) => {
							if(!body.data.EdorList){
								this.toggle.email=false
								this.showModals("未查到可操作的保全项");
							}else{
								this.EdorList=body.data.EdorList
								this.serverList.map(v=>{
									this.EdorList.map(c=>{
										if(v.id == c){
											v.show=true
											this.policyList.push(v)
										}
									})
									
								})
								}
						})
					}
				}
			},
			xuqi(){
				let requ = {
						"data":{
							"contNo":this.policyData.contNo,
							"creatDateStart":'',
							"creatDateEnd":'',
						},
						"modelName": "conservationRenewalService",
				     	"methodName": "conservationRenewal"
					}
					utils.http.postFast('CusbusinessService', requ, (body) => {
						if(body.data.code == '1') {
							this.showModals(body.data.msg)
						} else {
							if(!body.data.reFees.reFeeInfoList){
								this.showModals("没有续期信息数据");
							}else{
								this.reFeeInfoList=body.data.reFees.reFeeInfoList
							}
							if(!body.data.reFees.reFees){
								this.showModals("没有续期代扣记录数据");
							}else{
								this.reFees=body.data.reFees.reFees
							}
						}
					})
			},
			dataShow(item) {
				console.log(item)
				this.$set(item, 'show', !item.show)
				if(item.show == false) {
					item.icon2 = 'static/img/preservation/open.png'
					if(item.id=='6'||item.id=='7'){
						this.xuqi()
					}
				} else if(item.show == true) {
					item.icon2 = 'static/img/preservation/fold.png'
				}
			},

		},
	}
</script>

<style lang="scss" scoped type="text/css">
	.fa {
		color: #FEB101;
	}
	.fa-angle-left {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 48px;
		text-align: center;
		font-size: 30px;
	}
	.details .boder{
		border: 1px solid #000;
		vertical-align: middle;
		tr{
			border: 1px solid #000;
			vertical-align: middle;
			th{
				border: 1px solid #000;
				vertical-align: middle;
			}
			td{
				border: 1px solid #000;
				vertical-align: middle;
			}
		}
	}
	.details p,span,div{
		font-size: 0.8rem;
	}
	
	.details .dash {
		border-bottom: 1px dashed #BBB;
	}
	
	.details .itt {
		line-height: 1.5rem;
	}
	/*.flex{
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}*/
	
	.mint-msgbox {
		width: 90vw!important;
		overflow-y:scroll ;
	}
	.mint-msgbox::-webkit-scrollbar {
	display:none
}
	.mint-msgbox-content {
		word-wrap: break-word;
		overflow-y: auto;
		word-break: normal;
	}
	
	.title-boder {
		height: 3px;
		background: #FEB101;
		position: absolute;
		bottom: 5px;
		width: 100%;
	}
	
	.btn-wrapper {
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.add-btn {
		width: 75px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #FEB101;
		border-radius: 5px;
		color: #ffffff;
		margin-bottom: 15px;
	}
	
	.mint-msgbox .mint-msgbox-header {
		height: 60px!important;
		line-height: 60px;
	}
	
	.mint-msgbox-content {
		border: none!important;
	}
	
	.mint-msgbox .mint-msgbox-header .mint-msgbox-title {
		line-height: 60px;
		position: relative;
	}
	
	.mint-msgbox-message {
		color: #000000!important;
		padding-left: 5px;
		padding-right: 5px;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	
	.mint-msgbox-message {
		max-height: 240px;
	}
	.details .flexs{
		display: flex;
		align-items: center;
	}
	.details .flex-center{
		justify-content: space-between;
	}
	.details::-webkit-scrollbar {
	display:none
}
.server{
	position: absolute;
	width: 80px;
    right: -3px;
    line-height: 0rem;
    font-size: 0.75rem;
    color: #FEB101;
    font-weight: bold;
}
</style>