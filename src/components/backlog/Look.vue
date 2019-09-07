<template>
	<div>
		<Headerbtns :title="'保单详情'">
			<router-link to="/" replace slot="left" class="back">
				<i class="fa fa-angle-left"></i>
			</router-link>
		</Headerbtns>
		<ul class="margin-top mar-btm">
			<li v-for="item in result">
				<div class="mar" @click="expand = !expand">
					<p  @click="toggleContent"><i class="fa fa-user" aria-hidden="true"></i>  被保人信息<i class="fa fa-angle-double-up rt-ft" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow" @click="expand = !expand">
						<p>姓名：{{item.appntInfo.appntName}}</p>
						<p>性别：{{}}</p>
						<p>出生日期：{{item.appntInfo.appntBirthday}}</p>
						<p>证件类型：{{}}</p>
						<p>证件号码：{{item.appntInfo.appntIDNo}}</p>
						<p>职业代码：{{}}</p>
						<p>手机号码：{{item.appntInfo.appntMobile}}</p>
					</div>
					
				</div>
				<div class="mar"  @click="expand1 = !expand1">
					<p @click="toggleContent1"><i class="fa fa-user" aria-hidden="true"></i>  投保人信息<i class="fa fa-angle-double-up rt-ft" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand1?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow1" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow1" @click="expand = !expand">
						<p>姓名：{{item.appntInfo.appntName}}</p>
						<p>性别：{{}}</p>
						<p>出生日期：{{item.appntInfo.appntBirthday}}</p>
						<p>证件类型：{{}}</p>
						<p>证件号码：{{item.appntInfo.appntIDNo}}</p>
						<p>职业代码：{{}}</p>
						<p>手机号码：{{item.appntInfo.appntMobile}}</p>
					</div>
				</div>
				<div class="mar"  @click="expand2 = !expand2">
					<p @click="toggleContent2"><i class="fa fa-list-alt" aria-hidden="true"></i>  险种信息<i class="fa fa-angle-double-up rt-ft" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand2?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow2" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow2" @click="expand = !expand">
						<p>险种名称：{{item.polInfo[0].riskName}}</p>
						<p>交费期间：{{item.polInfo[0].cValiDate}}</p>
						<p>保险期间：{{item.polInfo[0].endDat}}</p>
						<p>交费频次：{{item.polInfo[0].payYears}}</p>
						<p>基本保险金额(元/份)：{{item.polInfo[0].amnt}}</p>
					</div>
				</div>
				<div class="mar">
					<p><i class="fa fa-user" aria-hidden="true"></i>  身故受益人:{{}}</p>
				</div>
				<div class="mar"  @click="expand3 = !expand3">
					<p  @click="toggleContent3"><i class="fa fa-user" aria-hidden="true"></i>  被保人信息<i class="fa fa-angle-double-up rt-ft" style="-webkit-transition:all .2s ease-out;" :style="{'-webkit-transform':expand3?'rotate(180deg)':''}"></i></p>
					<div v-show="!contentShow3" style="height: 5px;background: #FEB101;"></div>
					<div v-show="contentShow3" @click="expand = !expand">
						<p>缴费方式{{}}</p>
						<p>付款银行：{{}}</p>
						<p>户名：{{}}</p>
						<p>账号：{{}}</p>
					</div>
				</div>
			</li>
		</ul>
	
	</div>
</template>

<script>
	import Headerbtns from '../common/Header.vue'
	export default {
	  name: 'look',
	  components: {Headerbtns},
	  props:{
			open:{
				type:Boolean,
				default:false
			}
	  	},
	  data(){
	  	return {
	  		result:{},
	  		contentShow:true,
	  		contentShow1:true,
	  		contentShow2:true,
	  		contentShow3:true,
	  		expand: this.open,
	  		expand1: this.open,
	  		expand2: this.open,
	  		expand3: this.open
	  	}
	  },
	  methods:{
	  	toggleContent:function(){
			this.contentShow = !this.contentShow;
		},
	  	toggleContent1:function(){
			this.contentShow1 = !this.contentShow1;
		},
	  	toggleContent2:function(){
			this.contentShow2 = !this.contentShow2;
		},
	  	toggleContent3:function(){
			this.contentShow3 = !this.contentShow3;
		}
	  },
	  mounted(){
	  	let res={
                "order": {
                    "agentCode": "1100D12336",
                    "applyCode": "M120167539361488",
                    "policyCode": "13436844244"
                }
            }
         utils.http.post('MOPOLICYDETAIL',res).then(response => {
         	this.result = {
                "order": {
                    "contNo": "120004680288",
                    "contState": "3",
                    "payMode": "3",
                    "payToDate": "",
                    "prem": "",
                    "bankAccName": "陈媛媛",
                    "bankName": "",
                    "bankAccNo": "6228480020344514615",
                    "letterPostFlag": "",
                    "agentName": "",
                    "agentComName": "",
                    "agentMobile": "",
                    "bonusGetMode": "",
                    "bonusSum": "",
                    "insuAccBala": "",
                    "liveGetMode": "",
                    "insuMoneySum": "",
                    "payPremMoney": "",
                    "payPremStrDate": "",
                    "payPremRepayMoney": "",
                    "loanMoney": "",
                    "loanStarDate": "",
                    "loanEndDate": "",
                    "loanRepayMoney": "",
                    "electronicUrl": "http://jdtst.sunlife-everbright.com:8010/com.ifp.ipartner/elecDown?ContNo=140001380688",
                    "effectiveDate": "2017-05-12",
                    "appntInfo": {
                        "appntCustNo": "",
                        "appntName": "陈媛媛",
                        "appntIDType": "11",
                        "appntIDNo": "120103198109032128",
                        "appntIDExpDate": "",
                        "appntSex": "1",
                        "appntBirthday": "1981-09-03",
                        "appntAge": "",
                        "appntMobile": "15522767890",
                        "appntHomePhone": "",
                        "appntEmail": "",
                        "province": "",
                        "city": "",
                        "county": "",
                        "appntPostalAddress": "天津市河西天津市河西区宾水道欧亚花园6-1102"
                    },
                    "insuInfo": [
                        {
                            "insuCustNo": "",
                            "relationToAppnt": "",
                            "insuName": "陈媛媛",
                            "insuIDType": "11",
                            "insuIDNo": "120103198109032128",
                            "insuIDExpDate": "",
                            "insuStature": "",
                            "insuAvoirdupois": ""
                        }
                    ],
                    "bnfInfo": [
                        {
                            "bnfNam": "陈思嘉",
                            "bnfLevel": "1",
                            "bnfRatio": "1.0",
                            "bnfIDType": "12",
                            "bnfIDNo": "120103201109030047"
                        }
                    ],
                    "polInfo": [
                        {
                            "riskName": "光大永明关爱永逸两全保险",
                            "amnt": "120000",
                            "prem": "2136",
                            "payIntv": "",
                            "payYears": "",
                            "endDat": "保终身",
                            "insuName": "陈媛媛",
                            "cValiDate": "20年",
                            "riskCode": "LBT027"
                        },
                        {
                            "riskName": "光大永明附加关爱永逸重大疾病保险",
                            "amnt": "120000",
                            "prem": "2700",
                            "payIntv": "",
                            "payYears": "",
                            "endDat": "保终身",
                            "insuName": "陈媛媛",
                            "cValiDate": "20年",
                            "riskCode": "HCT006"
                        }
                    ]
                }
            }
            console.log(this.result);
         })
	  }
	}
</script>

<style lang='scss' scoped type="text/css" >
	@import 'src/assets/css/page';
	
	.padd{padding:2%;}
	li>div>p{
		font-size: 16px;font-weight: bold;
		padding:10px;
	}
	li>div>div{
		padding:3px 25px;
		line-height: 20px;
	}
	
	.mar{
		margin: 10px 10px;
	}
</style>