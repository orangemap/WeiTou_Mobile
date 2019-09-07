<template>
	<div id="show-manag-contents" class='Proposal-demo'>
		<mt-header title="光大永明人寿保险规划书" fixed>
			<!-- <mt-button @click="go('../config/'+$route.params.planId)" slot="left" v-if="localStorage != null">
        <i class="fa fa-angle-left"></i>
      </mt-button>
      <mt-button @click="go('../share')" slot="right" v-if="localStorage != null">
        <i class="fa fa-share-square-o back"></i>
      </mt-button> -->
			<mt-button @click="back" slot="left">
				<i class="fa fa-angle-left" style="position: relative;top:8px;"></i>
			</mt-button>
			<mt-button @click="go('../share/'+$route.params.planId)" slot="right">
				<i class="fa fa-share-square-o back" style="position: relative;top:6px;"></i>
			</mt-button>
		</mt-header>
		<!--手机 65px高度  大屏55px-->
		<div style='background:#fff;height:65px;position:fixed;top:0;z-index: 10;width:100%' class="iosX">&nbsp;</div>
		<div class="twoContent" style="position: fixed;width: 100%;z-index: 2;top: 48px;">
			<div class="tabs">
				<div class="tab">
					<div class="item-list" v-for="(item,index) in tabs" v-bind:class="{'active':index == num}" @click="changeIndex(index)">{{item}}</div>
				</div>
			</div>
			<div class="two-title">
				<div>寿险顾问:{{proposalPlan.pdfMsgDTO.sxgw}}</div>
				<div>联系电话:{{proposalPlan.pdfMsgDTO.phone}}</div>
			</div>
		</div>
		<div class="content show-content" style="">
			<!-- 险种解读 -->
			<Insurce v-if="dataReady" v-show="insurceStatus" :proposalPlan="proposalPlan"></Insurce>
			<Read v-show="readStatus"></Read>
			<div class="policy-two-footer" v-if="num == 0">
				<ul>
					<li @click="tiaoKuan"><span>保险条款</span></li>
					<li @click="shuomingshu"><span>产品说明书</span></li>
				</ul>
			</div>
		</div>
		<!-- 保险条款 -->
		<mt-popup v-model="toggle.jobVisible" position="bottom" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
			<mt-header title="保险条款" fixed>
				<mt-button slot="left">
					<i @click="toggle.jobVisible = !toggle.jobVisible" class="fa fa-angle-left"></i>
				</mt-button>
			</mt-header>
			<div class="tk-titleTop">本产品由</div>
			<div class="tk-title">
				<p v-for="(item,index) in make.product" @click="tkStatus(item)">{{item.productName}}</p>
			</div>
			<div class="tk-titleBottom">组合而成</div>
		</mt-popup>
		<mt-popup v-model="toggle.tkStatu" position="right" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
			<div v-for="(item,index) in make.productContent_1">
				<img @click="toggle.tkStatu = !toggle.tkStatu" :src="item.fileurl" style="display: block;width: 100%;">
			</div>
		</mt-popup>
		<!-- 产品说明书 -->
		<mt-popup v-model="toggle.smsStatus" position="bottom" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
			<mt-header title="产品说明书" fixed>
				<mt-button slot="left">
					<i @click="toggle.smsStatus = !toggle.smsStatus" class="fa fa-angle-left"></i>
				</mt-button>
			</mt-header>
			<div class="tk-titleTop">本产品由</div>
			<div class="tk-title">
				<p v-for="(item,index) in make.hasShuomingshu" @click="shuomingshuCallback(item)">{{item.productName}}</p>
			</div>
			<div class="tk-titleBottom">组合而成</div>
		</mt-popup>
		<mt-popup v-model="toggle.otherStatus" position="right" style="width: 100%;height: 100%;overflow-y:auto;background: #FFF1D4;">
			<div v-for="(item,index) in make.productContent_2">
				<img @click="toggle.otherStatus = !toggle.otherStatus" :src="item.fileurl" style="display: block;width: 100%;">
			</div>
		</mt-popup>
		<!--如果没有产品说明书的弹框-->
		<mt-popup v-model="newModel" position="bottom" style='width:80vw!important;height:210px;top:30%;border-radius: 15px;'>
			<div class='mint-msgbox-header' style='background:#002D4E;height:30px;border-top-left-radius: 10px;border-top-right-radius: 10px;'>
				<div class='mint-msgbox-title' style='color:#fff;'>提示</div>
			</div>
			<div class='mint-msgbox-content'>
				<div style='font-size:1.2rem;color:#ccc;'>当前险种没有产品说明书</div>
			</div>
			<div class='btn-wrapper'>
				<button @click='ClosenewModel()' style='display: block;height:40px;background:#FEB101;color:#fff;width:80px;margin:10px auto;border:none;border-radius: 8px;outline: none;'>确定</button>
			</div>
		</mt-popup>
		<alert ref="showalert"></alert>
	</div>
</template>
<script>
import Headerbtns from '../common/Header.vue'
import Insurce from './pop/Insurce.vue'
import Read from './pop/Read.vue'
import { MessageBox } from 'mint-ui'
import alert from '../policy/common/alert.vue'
//import proposalPlans from '../../assets/data/proposalPlan.json'
import { Popup } from 'mint-ui'
export default {
  name: 'proposalDemo',
  components:{
    Headerbtns,
    Insurce,
    Read,
    alert
  },
  data() {
    return {
    	newModel:false,
      planId:'',
      dataReady:false,
      tabs:["险种解读","公司介绍"],
      num:0,
      proposalPlans:{},
      insurceStatus:true,
      introStatus:false,
      readStatus:false,
      names:'',//险种名称
      agentInfo:utils.cache.get('agentInfo')||{},
      holderName:'',//被保人姓名
      jobCode:'',
      policyHolderName:'',//投保人姓名
      holderSex:'',//被保人性别
      policyHolderSex:'',//投保人性别
      holderBirthday:'',//被保人生日
      policyHolderBirthday:'',//投保人生日
      amount:'',//基本保险金额
      totalPremium:'',//保费
      productName:'',//险种
      productCode:'',//险种code
      selectedWay_0:'',//交费期间
      selectedWay_1:'',//保险期间
      selectedWay_2:'',//领取年龄或者其他
      term_0:'',
      term_1:'',
      term_2:'',
      attCode_1:'',
      term:'',
      holderBir:'',
      riderList:[],
      planId:null,
      zhuxianMoney:null,
      zhuxianPremium:null,
      showManageData:null,
      itemAttr:[],
      tit:[],
      fujiaExtraList:[],
      proposalPlan:{
        pdfMsgDTO:{}
      },
      localStorage:'',
      toggle:{
        jobVisible:false,
        tkStatu:false,
        smsStatus:false,
        otherStatus:false,
      },
      make:{
        product:"",
        productContent_1:[],
        productContent_2:[],
				hasShuomingshu:[]
      }
    }
  },
  methods:{
  	back(){
  		this.$router.push({
				name: 'prodetails',
				params: {
					planId: this.$route.params.planId,
					step: '3'
				}
			})
  	},
  	ClosenewModel(){
  		this.newModel = false
  	},
    tiaoKuan(){
      this.toggle.jobVisible = true
    },
    shuomingshu(){
      console.log(this.make.hasShuomingshu)
			if(this.make.hasShuomingshu.length>0){
				this.toggle.smsStatus = true
			}else{
				console.log("无产品说明书")
				//this.newModel = true
				alert_n22.alert("提示", '当前险种没有产品说明书', "确定")
			}
    },
    tkStatus(item){
      console.log('保险条款.......................',item.productCode)
      this.make.productContent_1 = []
        for(let i in this.proposalPlans.proposalPlan.item){
          if(item.productCode == this.proposalPlans.proposalPlan.item[i].productCode){
            if(this.proposalPlans.proposalPlan.item[i].proposalType == "1"){
              this.make.productContent_1.push(this.proposalPlans.proposalPlan.item[i])
            }
          }
        }
        this.make.productContent_1.sort((a,b) => {
            const codeA = parseInt(a.code)
            const codeB = parseInt(b.code)
            return codeA -codeB
        })
        if(this.make.productContent_1.length > 0){
          this.toggle.tkStatu = true
          console.log(this.make.productContent_1)
        }else{
        	//this.newModel = true
        	alert_n22.alert("提示", '当前险种没有产品条款', "确定")
          this.toggle.tkStatu = false
          //utils.ui.modal.afterOpen()
        	//this.$refs.showalert.showMOdal('当前险种没有保险条款！')
//           MessageBox({
//             title: '提示',
//             message: '当前险种没有保险条款！'
//           }).then(()=>{
//             utils.ui.modal.beforeClose()
//           })
        }
    },
    shuomingshuCallback(item){
      this.make.productContent_2 = []
        for(let i in this.proposalPlans.proposalPlan.item){
          if(item.productCode == this.proposalPlans.proposalPlan.item[i].productCode){
            if(this.proposalPlans.proposalPlan.item[i].proposalType == "2"){
              this.make.productContent_2.push(this.proposalPlans.proposalPlan.item[i])
            }
          }
        }
        console.log(this.make.productContent_2)
        this.make.productContent_2.sort((a,b) => {
            const codeA = parseInt(a.code)
            const codeB = parseInt(b.code)
            return codeA -codeB
        })
        if(this.make.productContent_2.length > 0){
          this.toggle.otherStatus = true
          console.log(1)
        }else{
        	//this.newModel = true
        	alert_n22.alert("提示", '当前险种没有产品说明书', "确定")
          this.toggle.otherStatus = false
          //utils.ui.modal.afterOpen()
        //this.$refs.showalert.showMOdal('当前险种没有产品说明书！')
//           MessageBox({
//             title: '提示',
//             message: '当前险种没有产品说明书！'
//           }).then(()=>{
//             utils.ui.modal.beforeClose()
//           })
        }
    },
  	getDemoData(){
  		utils.http.post('PROPOSALHQMSG',{
  			"proposalPlan": {
  				"planId": this.planId,
  				"agentCode": ""
  			}
  		}).then(response=>{
        if(response.data.header.responseCode == '0'){
          this.proposalPlan = response.data.response.proposalPlan
          console.log('产品信息',this.proposalPlan)
          this.proposalPlan.planId = this.planId
          this.dataReady = true
          console.log(response)
          this.make.product = this.proposalPlan.benifitOutLineDtoList
					let hasShuomingshu=[]
					for(let i=0;i<this.proposalPlan.benifitOutLineDtoList.length;i++){
						if(this.proposalPlans!=null&&this.proposalPlans!=undefined&&this.proposalPlans!=''){
							for(let j=0;j<this.proposalPlans.proposalPlan.item.length;j++){
								if(this.proposalPlan.benifitOutLineDtoList[i].productCode==this.proposalPlans.proposalPlan.item[j].productCode){
									if(this.proposalPlans.proposalPlan.item[j].proposalType==2){
										hasShuomingshu.push(this.proposalPlan.benifitOutLineDtoList[i])
									}
								}
							}
						}
					}
					console.log(hasShuomingshu)
					let obj={}
					for(let i=0;i<hasShuomingshu.length;i++){
						if(!obj[hasShuomingshu[i].productCode]){
							this.make.hasShuomingshu.push(hasShuomingshu[i])
							obj[hasShuomingshu[i].productCode]=true
						}
					}
					console.log(this.make.hasShuomingshu)
        }else{
          this.$refs.showalert.showMOdal(response.data.header.errorMessage)
          // MessageBox({
          //   title: '温馨提示',
          //   message: response.data.header.errorMessage
          // })
        }  
  		})
  	},
    imgNone(){
      let timer;
      let ele = $('.cover');
      timer = setInterval(()=>{
        ele.addClass('cover-none');
      },3000000)
    },
    changeIndex:function(index){
      this.num = index;
      console.log(this.num);
      if(index == '0'){
        this.insurceStatus = true;
        this.readStatus = false;
      }else if(index == '1'){
        this.insurceStatus = false;
        this.readStatus = true;
      }
    },
    init(){
    	this.planId = this.$route.params.planId
	    console.log(this.planId)
	    this.getDemoData()
	    this.localStorage = utils.cache.get('personsal')
	    console.log('sasasasasa',this.productCode)
    }
  },
  mounted(){
  	var _header1 = $(".mint-header")
  	var _header2 = $(".iosX")
    var _header3 = $(".twoContent")
    var _footer = $(".content")
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isiOS) {
			_header1.css({
				"height": "68px",
				"paddingTop": "20px"
			})
			_header2.css({
				"height": "68px"
			})
			_header3.css({
				"top": "68px"
			})
			if(screen.height == 812 && screen.width == 375){
				_header1.css({
					"height": "88px",
					"paddingTop": "44px"
				})
				_header2.css({
					"height": "88px"
				})
				_header3.css({
					"top": "88px"
				})
				_footer.css({
					"top": "88px",
					"bottom": "34px"
				})
			}
		}else{
			 _header1.css({
			 	"height": "48px"
			 })
			 _header2.css({
			 	"height": "48px"
			 })
			 _header3.css({
			 	"top": "48px"
			 })
		}
	
	// add spoon 读取缓存中的配置文件
    let CONFIG_proposalPlan = utils.cache.get('CONFIG_proposalPlan')
    if(CONFIG_proposalPlan==null||CONFIG_proposalPlan==''){
    	//缓存不存在请求服务器获取配置文件
    	utils.n22_http.getConfig(1,function(data){})
			utils.n22_http.getConfig(0,(data)=>{
    		console.log(data)
    		this.proposalPlans = data
    		this.init()
    	})
    }else{
    	//正常将缓存中的数据复制到相应节点
    	this.proposalPlans = CONFIG_proposalPlan
    	this.init()
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
	.Proposal-demo,
	.mint-header,
	.show-content,
	.twoContent,
	.tk-title,
	/*保险条款*/
	.tk-titleTop,
	/*保险条款*/
	.mint-popup-bottom {
		margin: 0 auto !important;
		max-width: 768px !important;
	}

	.mint-header {
		background: #fff;
	}

	.show-content {
		position: relative;
	}

	.twoContent {
		left: auto !important;
		position: fixed !important;
		z-index: 12 !important;
	}

	.content show-content {
		font-size: 12px !important;
	}

	.mint-header.is-fixed {
		z-index: 120 !important;
	}

	.cover {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 3;

		img {
			display: inline-block;
			width: 100%;
			height: 100%;
		}
	}

	.cover-none {
		display: none;
	}

	.fa-angle-left,
	.fa-share-square-o {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 32px;
		text-align: center;
		font-size: 30px;
		color: #FDB92C;
	}

	.mint-header-title {
		padding-top: 0 !important;
		margin-top: -7px !important;
	}

	.fa-share-square-o {
		font-size: 25px;
		line-height: 40px;
	}

	.tabs {
		width: 100%;
		height: 40px;
		overflow: hidden;
		background-color: #FFF;
		// background: url("../../../static/img/common/line.jpg")no-repeat bottom center;
		background-size: 100%;

		.tab {
			width: 100%;
			font-size: 15px;
			text-align: center;
			padding: 10px 0;
			background-color: #FFF;
			display: flex;

			.item-list {
				width: 50%;
				font-size: 16px;
				font-weight: bold;
			}

			.item-list:nth-child(2) {
				border-left: 1px solid rgb(165, 165, 165);
			}
		}
	}

	.two-title {
		width: 100%;
		height: 30px;
		margin-top: 0.1%;
		background: rgba(0, 0, 0, 0.5);
		color: #FFF;
		text-align: center;
		display: flex;
		justify-content: space-around;
		line-height: 30px;
	}

	.content {
		width: 100%;
		position: absolute;
		top: 48px;
		left: 0;
		bottom: 0;
		overflow-y: auto;
		-webkit-overflow-scrolling: auto !important;
		background-color: #fff1d4;
	}

	.tab .item-list.active {
		color: #E9D495;
	}

	.policy-two-footer {
		width: 100%;
		height: 40px;
		background: #FFF1D4;

		// border-top: 1px solid #BBB;
		// // position: fixed;bottom: 0;left:0;
		ul {
			width: 100%;
			height: 100%;
			display: flex;

			/*background:#fff;*/
			li {
				width: 50%;
				padding: 10px 0;
				text-align: center;

				span {
					display: inline-block;
					width: 100%;
					height:20px;
					line-height: 20px;
					color: #FFF;
				}
			}

			li:nth-child(1) {
				background: #03345C
			}

			li:nth-child(2) {
				background: #FEB101
			}

			li:nth-child(1) span {
				border-right: 1px solid #a5a5a5;
			}
		}
	}

	.tk-titleTop {
		border-bottom: 1px solid #BBB;
		padding-bottom: 10px;
		font-size: 18px;
	}

	.tk-titleTop,
	.tk-titleBottom,
	.tk-title {
		width: 100%;
		padding-top: 40%;
		text-align: center;
	}

	.tk-titleBottom {
		padding-top: 0;
		font-size: 18px;
	}

	.tk-title {
		padding: 15px 0;

		p {
			width: 80%;
			height: 40px;
			margin: auto;
			line-height: 40px;
			background: #FEB101;
			color: #FFF;
			margin-bottom: 15px;
			border-radius: 15px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.tk-title p:last-child {
		margin-bottom: 0;
	}

	.mint-header-title {}
</style>