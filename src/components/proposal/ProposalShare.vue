<template>
  <div id="enjoy-contents">
    <mt-header title="光大永明人寿" fixed style="background-color: #FFF!important;"></mt-header>
    
    <div class="enjoy-content">
      <div>
        <p class="setting">
          <span>封面设置</span>
        </p>
        <div class="slide-wraper">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in banners">
                <img :src="item.src">
              </div>
            </div>
          </div>
          <div class="button-prev" id="btn1">
            <i @click="chooseImg" class="fa fa-angle-left" style="height:auto;line-height:1;"></i>
          </div>
              <div class="button-next" id="btn2">
                <i class="fa fa-angle-right"></i>
              </div>
        </div>
      </div>
      <div style="background-color: rgb(241,242,244);">
        <p class="setting">
          <span>结束语设置</span>
          <!-- <select name="setting" @change="selectChange($event)">
            <option v-for="opt in options"
            v-bind:value="opt.id">{{opt.text}}</option>
          </select> -->
          <picker v-model="optionsValue" :items="options" code="id" text="text" 
          ></picker>
        </p>
        <div class="setting-content">
          <div class="tag-one" v-if="optionsValue == 0">
            <p class="textWay">
              保险是家庭责任的分期付款，你可以说不需要保险，但是，你不可以代替你的妻子，儿女说他们不需要。虽然，你死去以后，可以一走了之什麽都不要，但是，妻子儿女活着却万事艰难，什麽都需要。
            </p>
            <span>引自《生命的呐喊》</span>
          </div>
          <div class="tag-two" v-if="optionsValue == 1">
            <p class="textWay">
              保险的意义无需多做赘述，其重要性不言而喻，早已融入了现代人类社会的边边角角。
            </p>
            <span>——毛泽东</span>
          </div>
          <div class="tag-three" v-if="optionsValue == 2">
            <p class="textWay">
              别人都说我很富有，拥有很多的财富。其实真正属于我个人的财富是给自己和亲人买了充足的人寿保险。
            </p>
            <span>——李嘉诚</span>
          </div>
          <div class="tag-three" v-if="optionsValue == 3">
            <p class="textWay">
              保险的意义，只是今日做明日的准备，生时做死时的准备，父母做儿女的准备，儿女幼小时做儿女长大时准备，如此而已。今天预备明天，这是真稳健；生时预备死时，这是真旷达；父母预备儿女，这是真慈爱；不能做到这三步，不能算做现代人！
            </p>
            <span>——胡适</span>
          </div>
          <div class="tag-three" v-if="optionsValue == 4">
            <p class="textWay">
              保险，意味着对家庭的责任。
            </p>
            <span>——王石</span>
          </div>
          <div class="tag-three" v-if="optionsValue == 5">
            <p class="textWay">
              保有适当的保险，是一种道德责任是大部分国民应负有的义务。
            </p>
            <span>——罗斯福</span>
          </div>
          <div class="tag-three" v-if="optionsValue == 6">
            <p class="textWay">
              到目前为止，我没有发现有哪一种方法比购买人寿保险更能有效地解决企业的医疗财务问题。
            </p>
            <span>——比尔盖茨</span>
          </div>
          <div class="tag-three" v-if="optionsValue == 7">
            <p class="textWay">
              基本医疗保障只能是低水平的“保”而不是“包”，“保”即有一个基本的保障，超出部分主要应通过商业保障解决。现在该是转变陈旧观念的时候了，应明确健康与人生风险投资人人有责，不能再完全依靠社会，社会的进步要求我们积极参加商业保险。
            </p>
            <span>——朱镕基</span>
          </div>
          <div class="tag-three" v-if="optionsValue == 8">
            <p class="textWay">
              我对资本主义向来没有好感,但保险制度却是资本主义唯一可取的地方。
            </p>
            <span>——赫鲁晓夫</span>
          </div>
        </div>
      </div>
      <div class="choose">
        <div class="one">
          <div class="choose-one">
            <span>封面设置：</span>
            <mt-switch v-model="value1" @change="chooseImg">
            </mt-switch>
          </div>
          <div class="choose-two">
            <span>公司介绍：</span>
            <mt-switch v-model="value2" @change="chooseImg"></mt-switch>
          </div>
        </div>
        <div class="two">
          <div class="choose-three">
            <span>致谢信：</span>
            <mt-switch v-model="value3" @change="chooseImg"></mt-switch>
          </div>
          <div class="choose-four">
            <span>结束语：</span>
            <mt-switch v-model="value4" @change="chooseImg"></mt-switch>
          </div>
        </div>
      </div>
      <!-- PDF弹出框 -->
      <div class="pdf-send">
        <mt-popup v-model="pdfShow" position="center"
        style="width: 80%;height: 265px;background: #FFF;border-radius:20px;">
          <!-- <mt-header title="PDF发送" fixed 
          style="border-radius: 20px 20px 0 0;
          background-color: #12294A;
          font-size: 16px;">
              </mt-header> -->
              <div class="send-header">PDF发送</div>
              <div id="send-text">
                <span>邮箱地址：</span>
                <input v-model="email"
                type="text" 
                name="email" 
                placeholder="请输入邮箱"/>
              </div>
              <div class="down" >
              	<button v-show="isiOS" @click="down">点击下载PDF</button>
                <a v-show="!isiOS" id="filePath" target="_blank">点击下载PDF</a>
              </div>
              <div class="buttonMore">
                <div @click="pdfShow = !pdfShow">
                  <mt-button id="button-cancel">取消</mt-button>  
                </div>
                <div @click="sendDataStatus">
                  <mt-button id="button-sure">确认</mt-button>      
                </div>
              </div>
        </mt-popup>
      </div>
      <div class="enjoy-btn">
          <ul>
            <li @click="pdfShowStatus">
              <mt-button size="normal" class="btn_1">发送PDF</mt-button>
            </li>
            <li @click="makeMsgData">
              <mt-button size="normal">生成PDF</mt-button>
            </li>
            <li @click="enjoyStatus">
              <mt-button size="normal" class="btn_1">分享</mt-button>
            </li>
            <li @click="go('../demo/'+$route.params.planId)">
              <mt-button size="normal">返回</mt-button>
            </li>
          </ul>
        </div>
	     <alert ref="showalert" style="position:absolute;z-index:9999999999999"></alert> 
      </div>
    </div>
</template>

<script>
  import Headerbtns from '../common/Header.vue'
  import picker from '../common/Picker.vue'
  import Swiper from '../../../static/js/swiper-3.4.2.min.js'
  import { MessageBox } from 'mint-ui'
  import alert from '../policy/common/alert.vue'
  //import newProduct from '../../assets/data/newProduct.json'
  require('../../../static/css/swiper-3.4.2.min.css')
  export default{
    name:'enjoy',
    components:{Headerbtns,picker,alert},
    data(){
      return{
        newProduct:{},
				isiOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				value1:false,
        value1Status:'0',
        value2:false,
        value2Status:'0',
        value3:false,
        value3Status:'0',
        value4:false,
        value4Status:'0',
        myName:'120.jpg',
        banners:[{
          imgName:'130.jpg',
          src:require('../../../static/img/enjoy/130.jpg')
        },{
          imgName:'140.jpg',
          src:require('../../../static/img/enjoy/140.jpg')
        },{
          imgName:'150.jpg',
          src:require('../../../static/img/enjoy/150.jpg')
        },{
          imgName:'160.jpg',
          src:require('../../../static/img/enjoy/160.jpg')
        },{
          imgName:'170.jpg',
          src:require('../../../static/img/enjoy/170.jpg')
        },{
          imgName:'180.jpg',
          src:require('../../../static/img/enjoy/180.jpg')
        }],
        options:[
          {id:0,text:'生命的呐喊'},
          {id:1,text:'毛泽东谈保险'},
          {id:2,text:'李嘉诚谈保险'},
          {id:3,text:'胡适说保险'},
          {id:4,text:'王石说保险'},
          {id:5,text:'罗斯福看保险'},
          {id:6,text:'比尔盖茨谈保险'},
          {id:7,text:'朱镕基说保险'},
          {id:8,text:'赫鲁晓夫谈保险'}
        ],
        swiperInd:'',
        optionsValue:'0',
        pdfShow:false,
        holderName:'',
        policyHoliderName:'',
        holderSex:'',
        jobCode:'',
        policyHolderSex:'',
        holderBirthday:'',
        policyHolderBirthday:'',
        productName:'',
        amount:'',
        pdfId:'',
        premiumDes1:'',
        premiumDes2:'',
        email:'',
        selectedWay_0:'',
        selectedWay_1:'',
        selectedWay_2:'',
        term_0:'',
        term_1:'',
        term_2:'',
        riderList:'',
        riderList_1:'',
        term:'',
        planId:null,
        totalPremium:null,
        zhuxianMoney:null,
        zhuxianPremium:null,
        sendExtraList:'',
        writeRiderList:'',
        productCode:"",
        level:'',
        filePath:'',
        sendBtnStatus:'1',
        shareProductName:'',
        shareMsg:{
          agentCode:'',
          agentName:'',
          agentMobile:''
        }
      }
    },
    mounted(){
			var _header = $("#enjoy-contents .mint-header");
    var _body = $("#enjoy-contents .enjoy-content");
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      _header.css({
        height: "68px",
        paddingTop: "20px"
      });
         _body.css({
          top: "68px"
        });
      if (screen.height == 812 && screen.width == 375) {
        _header.css({
          height: "88px",
          paddingTop: "44px"
        });
        _body.css({
          top: "88px"
        });
      }
    } else {
      _header.css({
        height: "48px"
      });
       _body.css({
          top: "44px"
        });
    }

    	
      this.getDemoData()
      console.log('挂载好了')
      console.log("所选封面图片为：" + this.myName)
      let _this = this
      var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            effect: 'slide',
            onSlideChangeEnd(swiper){
            _this.swiperInd = swiper.activeIndex
            const array = [
              '120.jpg',
              '130.jpg',
              '140.jpg',
              '150.jpg',
              '160.jpg',
              '170.jpg',
              '180.jpg'
            ]
            _this.myName = array[_this.swiperInd]
          }
      })
      $('#btn1').click(function(){
        swiper.slidePrev();
        return this.swiperInd
      })
      $('#btn2').click(function(){
        swiper.slideNext();
      })
    },
    watch:{
      pdfShow:function(value){
        if(value == true){
          utils.ui.modal.afterOpen()
        }else{
          utils.ui.modal.beforeClose()
        }
      }
    },
    methods:{
      getDemoData() {
      	let requ = {
  				"proposalPlan": {
            "planId": this.$route.params.planId,
            "agentCode": ""
          }
  			} 
	  		utils.http.postFast('PROPOSALHQMSG', requ, (body) => {
					let proposalPlan = body.proposalPlan
					if(proposalPlan.resultCode == '0'){
						let productList = proposalPlan.pdfMsgDTO.productList
	          console.log(productList)
	          for(let i=0;i<productList.length;i++){
	            if(productList[i].ismain == "1"){
	                this.productCode = productList[i].productCode 
	            }
	          }
	          this.shareMsg.agentCode = proposalPlan.pdfMsgDTO.zyzh
	          this.shareMsg.agentName = proposalPlan.pdfMsgDTO.sxgw
	          this.shareMsg.agentMobile = proposalPlan.pdfMsgDTO.phone
					}else{
						this.$refs.showalert.showMOdal(proposalPlan.resultMessage)
					}
				},true)
      },
      selectChange:function(event){
        this.optionsValue = event.target.value;
        console.log(this.optionsValue);
        var language = Number(this.optionsValue)
        console.log(language + 1)
        this.optionsValue = language + 1
        console.log(this.optionsValue.toString())
      },
      chooseImg:function(){
        if(this.value1 == false){
          this.value1Status = 0
          console.log("不需要封面：" + this.value1Status)
        }else{
          this.value1Status = 1
          console.log("需要封面：" + this.value1Status)
        }
        if(this.value2 == false){
          this.value2Status = 0
          console.log("不需要公司介绍：" + this.value2Status)
        }else{
          this.value2Status = 1
          console.log("需要公司介绍：" + this.value2Status)
        }
        if(this.value3 == false){
          this.value3Status = 0
          console.log("不需要致谢信：" + this.value3Status)
        }else{
          this.value3Status = 1
          console.log("需要致谢信：" + this.value3Status)
        }
        if(this.value4 == false){
          this.value4Status = 0
          console.log("不需要结束语：" + this.value4Status)
        }else{
          this.value4Status = 1
          console.log("需要结束语：" + this.value4Status)
        }
        console.log(this.value4Status.toString())
      },
      makeMsgData:function(){
        let requ = {
          "proposalPlan": {
            "planId": this.$route.params.planId,
            "agentCode": this.shareMsg.agentCode,
            "proposalPrintItem": {
              "corver": this.value1Status.toString(),
              "coverUrl": this.value1Status == 1?this.myName:"",
              "isNetWork": "2",
              "netWorkCode": "1200000487",
              "netWorkName": null,
              "sxgw": this.shareMsg.agentName,
              "zyzh": this.shareMsg.agentCode,
              "phone": this.shareMsg.agentMobile,
              "email": "",
              "zxx": this.value3Status.toString(),
              "gsjs": this.value2Status.toString(),
              "jsy": this.value4Status.toString(),
              "language": this.value4Status == 1?(parseInt(this.optionsValue) + 1).toString():"",
              "benefitTable": "1",
              "benefitAnalysis": "1",
              "ensureDes": "1",
              "printYears": 1,
              "ensureDetail": "1",
              "riskDesc": "1",
              "importantContent": "1"
            }
          }
        }
	      utils.http.post('PROPOSALPDFBUILDNEW',requ).then(response => {
	        console.log(response)
	        this.shareProductName = response.data.response.proposalPlan.productName
	        let projectHead = response.data.header
	        console.log(projectHead)
	        this.filePath = response.data.response.proposalPlan.filePath
	        console.log(this.filePath)
	        if(this.shareProductName==""||this.filePath==""||projectHead.errorMessage!=""){
	          this.$refs.showalert.showMOdal('当前险种没有建议书！');
	          return;
	        }
	        $("#filePath").attr("href",this.filePath)
	        let project = response.data.response
	        if(project.proposalPlan.resultCode == "0"){
	          let pdfId = project.proposalPlan.planId
	          this.pdfId = pdfId
	          this.$refs.showalert.showMOdal('生成PDF成功！')
	          $('.btn_1').css("backgroundColor","#FEB101")
	          /*发送按钮是否可以点击:1为不可发送、2为可以发送*/
	          this.sendBtnStatus = "2"
	        }else{
	          $('.btn_1').css("backgroundColor","#d9d9d9")
	          this.$refs.showalert.showMOdal(project.proposalPlan.resultMessage)
	        }
	      })
      },
			down(){
  			var urlObj = {
					"url": this.filePath
				}
				var urlStr = JSON.stringify(urlObj)
				var hybrid = 'hybrid://MAApkInfo:401/invokeApkInfo?' + urlStr
				//IOS升级
				try{
					MAPlugin.hybridCallAction(hybrid, function(callbackSucc) {
						alert(JSON.stringify(callbackSucc))
					}, function(callbackFail) {
						alert(callbackFail)
					});
				} catch (err) {
		    	window.open(this.filePath)
		    } 	
      },
      sendDataStatus:function(){
        if(this.sendBtnStatus == "2"){
          this.sendData()
        }else if(this.sendBtnStatus == "1"){
          // utils.ui.modal.afterOpen()
	  this.$refs.showalert.showMOdal('当前还未生成PDF！')
          //MessageBox({
            //title: '提示',
            //message: '当前还未生成PDF！'
          //}).then(()=>{
            //utils.ui.modal.beforeClose()
          //})
        }
      },
      pdfShowStatus:function(){
        if(this.sendBtnStatus == "2"){
          this.pdfShow = true
        }else{
          // utils.ui.modal.afterOpen()
	  this.$refs.showalert.showMOdal('当前还未生成PDF！')
        }
      },
      enjoyStatus:function(){
        if(this.sendBtnStatus == "2"){
          this.enjoy()
        }else if(this.sendBtnStatus == "1"){
          // utils.ui.modal.afterOpen()
	  this.$refs.showalert.showMOdal('当前还未生成PDF！')
        }
      },
      sendData:function(){
      	if(this.email == undefined || this.email == ""){
      		this.$refs.showalert.showMOdal('请填写电子邮箱!')
      		return
      	}
        let requ = {
          "proposal": {
                    "zyzh": this.shareMsg.agentCode,
                    "netWorkCode": "1200000487",
                    "pdfid": this.$route.params.planId,
                    "email": this.email
                }
        }
        utils.http.post('PROPOSALSEND',requ).then(response => {
          this.pdfShow = false
          console.log(response.data)
          let project = response.data.response
          let projectHead = response.data.header
          if(projectHead.responseCode == 0){
            // utils.ui.modal.afterOpen()
	         this.$refs.showalert.showMOdal('发送PDF成功！')
          }else{
            // utils.ui.modal.afterOpen()
	        this.$refs.showalert.showMOdal(projectHead.errorMessage)
          }
        })
      },
      enjoy:function(){
        this.planId = this.$route.params.planId
        console.log(this.planId)
        console.log('分享的',this.planId)
        console.log('分享的',this.shareProductName)
        let url = window.globalConfig.rootUrl.split('/')[2];
        let protocol = window.globalConfig.rootUrl.split(':')[0]
        console.log(url)
        Wechat.share({
            message: {
                title: "保险规划书",
                description:this.shareProductName,
                thumb: "www/static/img/common/0.png",
                mediaTagName:'链接',
                media: {
                    type: Wechat.Type.WEBPAGE,
                    webpageUrl: protocol + "://"+url+"/com.ifp.ipartner/proposalShare/index.html#/proposal/demo/"+this.planId
                }
            },
          scene: Wechat.Scene.SESSION    // share to Timeline
        }, function () {
            // utils.ui.modal.afterOpen()
	this.$refs.showalert.showMOdal('分享成功')
        }, function (reason) {
            // utils.ui.modal.afterOpen()
	    this.$refs.showalert.showMOdal('分享失败')
           
        });
      },
      goManage:function(){
        window.localStorage.removeItem('addManage')
        this.$router.push({
          path:'/proposal/config/new',
          name:'manage',
          params:{}
        })
      }
    }
  }
</script>
<style type="text/css" lang="scss">
.mint-header,
.setting,
.enjoy-content {
  max-width: 768px !important;
  margin: 0 auto;
}
.setting {
  input {
    width: 140px;
    height: 30px;
    display: inline-block;
    float: right;
    margin-top: 12px;
    margin-right: 10px;
    border: 1px solid #e7a545;
    border-radius: 5px;
    text-align: center;
  }
  .mbsc-control-ev {
    width: 140px !important;
  }
}
body #enjoy-contents .mint-switch-core::before {
  background-color: #d9d9d9;
  border-color: #d9d9d9;
}
body #enjoy-contents .mint-switch-input:checked + .mint-switch-core {
  border-color: #feb101;
  background-color: #feb101;
}
</style>

<style type="text/css" lang="scss" scoped>

.setting {
  height: 55px;
  line-height: 55px;
  padding-left: 15px;
  color: #002d4e;
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  margin-bottom: 10px;
  span {
    background: url(../../../static/img/manage/line.jpg) no-repeat left center;
    padding-left: 10px;
  }
}
.textWay {
  text-align: justify;
}
.swiper-slide {
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
#enjoy-contents {
  .enjoy-content {
    position: absolute;
    top: 50px;
    left: 50%;
    width: 100%;
    overflow-y: auto;
    transform: translate(-50%);
    background: #f1f2f4;
    .enjoy-head-img {
      width: 100%;
      height: 35px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .slide-wraper {
      width: 80%;
      margin: auto;
      background: #fff;
      border-radius: 10px;
      padding: 0 5%;
      position: relative;
      margin-bottom: 10px;
      .swiper-container {
        width: 220px;
        height: 200px;
        margin: auto;
        img {
          display: block;
          width: 100%;
        }
      }
      .button-prev {
        position: absolute;
        left: 0px;
        top: 90px;
        width: 30px;
        height: 30px;
        font-size: 25px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        border-radius: 20px;
        background-image: none;
        border: 2px solid #ed9f3a;
        .fa-angle-left {
          font-size: 30px;
          transform: translateY(-50%);
          color: #ed9f3a;
        }
      }
      .button-next {
        position: absolute;
        right: 0px;
        top: 90px;
        width: 30px;
        height: 30px;
        background-image: none;
        border-radius: 20px;
        font-size: 25px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        border: 2px solid #ed9f3a;
        .fa-angle-right {
          font-size: 30px;
          transform: translateY(-50%);
          color: #ed9f3a;
        }
      }
    }
    .setting-content {
      width: 80%;
      min-height: 200px;
      margin: auto;
      background-color: #b4b8b9;
      border-radius: 10px;
      padding: 0 5%;
      margin-bottom: 10px;
      .tag-one,
      .tag-two,
      .tag-three {
        width: 93%;
        height: 165px;
        background-color: #fff;
        float: left;
        border-radius: 8px;
        padding: 10px;
        text-indent: 25px;
        line-height: 20px;
        position: relative;
        color: #002d4e;
        margin-top: 7px;
        span {
          position: absolute;
          right: 5px;
          bottom: 5px;
          font-size: 14px;
          color: #002d4e;
        }
      }
    }
    .choose {
      width: 100%;
      background-color: #fff;
      .one,
      .two {
        float: left;
        width: 100%;
        display: flex;
        .choose-one,
        .choose-two {
          margin-top: 20px;
        }
        .choose-two {
          span {
            padding-left: 15px;
          }
        }
        .choose-four {
          span {
            padding-left: 15px;
          }
        }
        div {
          width: 50%;
          float: left;
          margin-bottom: 20px;
          span {
            float: left;
            line-height: 32px;
            width: 80px;
            padding-left: 25px;
          }
        }
      }
    }
  }
}
.buttonMore {
  width: 85%;
  position: absolute;
  bottom: 8px;
  padding: 5px 20px 0px 20px;
  border-top: 1px dashed #bbb;
  text-align: center;
  div {
    float: left;
    width: 50%;
  }
  .mint-button {
    padding: 0 20px;
  }
  #button-sure {
    background-color: #feb101;
    color: #fff;
  }
  #button-cancel {
    background-color: #feb101;
    color: #fff;
  }
}
#send-text {
  height: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  span {
    display: inline-block;
    height: 100%;
    width: 35%;
    line-height: 50px;
    padding-left: 20px;
  }
  input {
    display: inline-block;
    height: 60%;
    width: 55%;
    border: 1px solid #bbb;
    margin-top: 9px;
    margin-right: 20px;
    border-radius: 10px;
    padding-left: 10px;
  }
}
.send-header {
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: #0d3074;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  border-radius: 20px 20px 0 0;
  border-bottom: 3px solid #feb101;
}
.down {
  text-align: center;
  height: 40px;
  a,
  button {
    display: inline-block;
    width: 90%;
    height: 100%;
    line-height: 40px;
    color: #000;
    border: 1px solid #ff5526;
    border-radius: 10px;
    background: #ff5526;
    color: #fff;
  }
}
.enjoy-btn {
  width: 100%;
  // position: absolute;
  // bottom: 0;left:0;
  background-color: #fff;
  ul {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    li {
      button {
        background-color: #feb101;
        color: #fff;
        border-radius: 10px;
      }
    }
    .btn_1 {
      background-color: #d9d9d9;
    }
  }
}
</style>