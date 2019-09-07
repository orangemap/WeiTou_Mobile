<!--告知页面-->
<template>
  <div id="content">
    <Headerbtns :title="'健康告知('+toggle.page_title+')'">
      <div slot="left" @click="goBack">
        <i class="fa fa-angle-left"></i>
      </div>
      <div slot="right" class="back">
        <img
          style="margin-right: 5px;"
          src="static/img/settlement/doubt.png"
          @click="goTogadetail"
          v-if="toggle.isLBT029"
        />
        <i class="fa fa-ellipsis-v" @click="sheetVisible = !sheetVisible"></i>
      </div>
    </Headerbtns>
    <div class="main-contents">
      <NavigationBox :optionList="navigationList" :show="showNavList" @selected="selectedNav"></NavigationBox>
      <div class="main-contents-right">
				<div class="left_top" id="mainContent" style="::-webkit-scrollbar {width: 0px;}">
					<div v-for="(item,index) in allInformList" @click="changeInsInfo(index)" :class="[index == insNo?'active':'']">
						<p v-if="policy.custInfo.insurants.otherInsurant.insurant.length == 0" style="margin-top:10px;">{{item.insNo == '-1'?'被保人':'投保人'}}</p>
						<p v-if="policy.custInfo.insurants.otherInsurant.insurant.length > 0" style="margin-top:12px;">{{item.insNo|getInsNoInfo}}</p>
						<p style="margin-bottom:10px;">{{item.insName}}</p>
					</div>
				</div>
				<ul>
					<li style="display: flex;align-items: center;">
						<img style="width: 5px;margin-right: 2%;" src="../../../static/img/policy/icon_shu.png" />
						<span>{{toggle.page_title}}是否具有以下情况?</span>
					</li>
					<li v-for="(item,index) in allInformList[insNo].informList.resQuestion.resRemark" v-show="allInformList[insNo].informList!='undefined'">
						<div class="item_content">
							<div v-if="item.code == 'A00001'">
								<span>{{item.questionNo}}、{{toggle.page_title}}：</span>
								<span>身高：</span>
								<input type="text" v-model="item.height" v-supportLogNumbers maxlength="3" />
								<span style="color:#f00;">厘米</span>
								<br />
								<span style="color:transparent;">{{item.questionNo}}、{{toggle.page_title}}：</span>
								<span>体重：</span>
								<input type="text" v-model="item.weight" v-filterAmountOfMoneys />
								<span style="color:#f00;">公斤</span>
							</div>
							<div v-if="item.code != 'A00001'">{{item.questionNo}}、{{item.desc}}</div>
							<div class="item_right" v-show="!toggle.isLBT029&&item.code != 'A00001' && item.code != '100000008' || toggle.isLBT029&&item.code != 'A00001' && item.code!='A00008'">
								<mt-switch v-model="item.swh" @change="switchQuestion(item)" style="position:relative;">
									<label style="left: 9%;top:17%;">{{item.isBuild == "Y"?'是':''}}</label>
									<label style="right: 26%;top:17%;">{{item.isBuild == "N"?'否':''}}</label>
								</mt-switch>
							</div>
						</div>
						<div v-show="item.swh" class="item_contentNew">
							<p v-show="!toggle.isLBT029 && item.code == 'A00013' || toggle.isLBT029 && item.code == 'A00021'" style="padding:10px 30px;">
								<span>怀孕日期:</span>
								<date-picker v-model="allInformList[insNo].informList.resQuestion.fetationDate" style="display:inline-block;margin-left:5px;"></date-picker>
							</p>
							<p style="padding:0;">
								<textarea v-if="item.isInput" v-model="item.questionRemark" rows="5" maxlength="200" placeholder="请详细描述具体情况"></textarea>
							</p>
							<div></div>
						</div>
						<div v-for="tpls in item.policyHealthAnswer" v-if="item.policyHealthAnswer.length>0 && item.swh" class="new-answer">
							<p>{{tpls.questionno+'、'+tpls.questioncontent}}</p>
							<p>{{tpls.answer}}</p>
						</div>
					</li>
					<li>
						<input type="checkbox" v-model="allInformList[insNo].informList.resQuestion.isAgree" />
						<span style="color:#5B87DF;">被保险人已充分了解告知内容</span>
					</li>
				</ul>
			</div>
		</div>
		<img src="../../../static/img/policy/icon_nav.png" @click="showNavList=!showNavList" class="fixedImg" />
		<img src="static/img/policy/icon_up.png" class="upImg" @click="goUp" />
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		<Footerbtns :is_show="false" :disabled="true" total_premium="10000.00">
			<button class="btnFoote" slot="center" @click="nextStep" :disabled="!allIsAgree" :class="[allIsAgree?'':'opacity_half']">下一步</button>
		</Footerbtns>
	</div>
</template>

<script>
import { Actionsheet } from "mint-ui";
import { Toast } from "mint-ui";
import Headerbtns from "../policy/common/Header.vue";
import Footerbtns from "../policy/common/Footer.vue";
import NavigationBox from "../policy/common/NavigationBox.vue";
import datePicker from "../common/DatePicker.vue";
import inform_ques from "../../../static/dict/inform_ques.json";
import "../../../static/css/flex.css";
import { mapState, mapMutations } from "vuex";
import store from "../../vuex/policy/GoToQuestionnaire";
import "../policy/css/base.css";
export default {
  name: "inform_page",
  components: {
    Headerbtns,
    Footerbtns,
    NavigationBox,
    datePicker
  },
  data() {
    return {
      showNavList: false,
      navigationList: [],
      sheetVisible: false,
      actions: [
        {
          name: "刷新页面",
          method: this.winReload
        },
        {
          name: "返回首页",
          method: this.backHome
        }
      ],
      policy: {
        custInfo: {
          insurants: {
            otherInsurant: {
              insurant: []
            }
          }
        }
      },
      toggle: {
        page_title: "被保险人",
        isLBT029: false, //是否是关爱永逸
        isHaveAppInform: false, //是否有投保人告知
        ProCodeList: [] //主被保人险种code
      },
      insNo: "0",
      allInformList: [
        {
          informList: {
            resQuestion: {
              resRemark: []
            }
          }
        }
      ],
      loadF: false,
      allIsAgree: false,
      productCode: utils.cache.get("productCode"),
      resData: {}, //请求自核对象
      policyList: [] //险种列表
    };
  },
  computed: {
    ...mapState([
      "VuexDesc",
      "VuexInform",
      "VuexInformList",
      "isQuestion",
      "VuexPolicy",
      "VuexPolicyData"
    ])
  },
  store,
  beforeMount() {
    this.productDef(productDefList => {
      this.getPolicyMsg(productDefList);
    });
  },
  mounted() {
    var _header = $(".upImg");
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS && screen.height == 812 && screen.width == 375) {
      _header.css({
        bottom: "144px"
      });
    }
  },
  filters: {
    getInsNoInfo(code) {
      if (code == "-2") {
        return "投保人";
      } else if (code == "-1") {
        return "第一被保人";
      } else if (code == "0") {
        return "第二被保人";
      } else if (code == "1") {
        return "第三被保人";
      } else if (code == "2") {
        return "第四被保人";
      } else if (code == "3") {
        return "第五被保人";
      } else if (code == "4") {
        return "第六被保人";
      }
    }
  },
  watch: {
    showNavList(val, oldval) {
      if (val == true) {
        let sum = 0;
        let interval = setInterval(() => {
          sum += 1;
          $(".main-contents-right").css({
            left: sum + "%"
          });
          if (sum == 50) {
            clearInterval(interval);
          }
        }, 5);
      } else {
        let sum = 50;
        let interval = setInterval(() => {
          sum -= 1;
          $(".main-contents-right").css({
            left: sum + "%"
          });
          if (sum == 0) {
            clearInterval(interval);
          }
        }, 5);
      }
    },
    allInformList: {
      handler(val, oldval) {
        if (this.loadF) {
          //console.log('allInformList===val>>>', val)
          let isAgree = true;
          for (let item of val) {
            if (
              item.informList.resQuestion.isAgree != true &&
              item.informList.resQuestion.isAgree != "true"
            ) {
              isAgree = false;
            }
          }
          this.allIsAgree = isAgree;
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations([
      "SetVuexDesc",
      "SetVuexInform",
      "SetVuexInformList",
      "SetVuexPolicy",
      "SetVuexPolicyData"
    ]),
    selectedNav(item) {
      if (item.step < 6) {
		    this.savePolicyMsg();
	      let requ = {
	        policy: this.policy
	      };
	      utils.http.postFast("MODISTRIESAVE", requ, body => {
						if(body.policy.resultCode == '0') {
						  if (item.step == 1 || item.step == 3) {
					      this.$router.push({
					        name: item.name,
					        params: {
					          planId: this.$route.params.planId,
					          step: "1"
					        }
					      });
					    } else if (item.step == 4) {
					      this.$router.push({
					        name: item.name,
					        params: {
					          planId: this.$route.params.planId,
					          insNo: item.seqNumber,
					          step: "1"
					        }
					      });
					    } else {
					      this.$router.push({
					        name: item.name,
					        params: {
					          planId: this.$route.params.planId
					        }
					      });
					    }
					  } else {
						alert_n22.alert("提示", body.policy.resultMessage, "确定")
					}
				})
		  }
    },
    winReload: function(cond) {
      window.location.reload();
    },
    goTogadetail() {
      this.$router.push("/policy/RuleInform/" + this.$route.params.planId);
    },
    goUp() {
      console.log("goUp");
      document.getElementById("mainContent").scrollIntoView(false);
    },
    productDef(callback) {
      let requ1 = {
        productDef: {
          agentCode: utils.cache.get("personsal").agentCode,
          productCode: utils.cache.get("productCode"),
          token: new Date().getTime(),
          openId: "1"
        }
      };
      utils.http.postFast(
        "PRODUCTDEFLIST",
        requ1,
        body => {
          callback(body.productDefList);
        },
        true
      );
    },
    getPolicyMsg(productDefList) {
      let requ = {
        policy: {
          substepNo: "6",
          orderCode: this.$route.params.planId,
          stepNo:'0,1,2',
		  nothave:'1,2'
        }
      };
      utils.http.postFast(
        "MOHQPOLICYMSG",
        requ,
        body => {
          this.policy = JSON.parse(JSON.stringify(body.policy));
          this.policy.substepNo = "6";
          this.navigationList = this.policy.navigationList;
          this.navigationList.forEach(item => {
            item.path = "";
            if (item.step < "6") {
              item.path = "cheng";
            }
            if (item.step == "6") {
              item.path = "lv";
            }
          });
          for (
            let i = 0;
            i <
            this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries
              .beneficiary.length;
            i++
          ) {
            if (
              this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries
                .beneficiary[i].belongWith == ""
            ) {
              this.policy.custInfo.insurants.firstInsurant.bnfInfo.beneficiaries.beneficiary.splice(
                i--,
                1
              );
            }
          }
          for (
            let i = 0;
            i < this.policy.custInfo.insurants.otherInsurant.insurant.length;
            i++
          ) {
            if (
              this.policy.custInfo.insurants.otherInsurant.insurant[i].name ==
              ""
            ) {
              this.policy.custInfo.insurants.otherInsurant.insurant.splice(
                i--,
                1
              );
            } else {
              for (
                let j = 0;
                j <
                this.policy.custInfo.insurants.otherInsurant.insurant[i].bnfInfo
                  .beneficiaries.beneficiary.length;
                j++
              ) {
                if (
                  this.policy.custInfo.insurants.otherInsurant.insurant[i]
                    .bnfInfo.beneficiaries.beneficiary[j].belongWith == ""
                ) {
                  this.policy.custInfo.insurants.otherInsurant.insurant[
                    i
                  ].bnfInfo.beneficiaries.beneficiary.splice(j--, 1);
                }
              }
            }
          }
          console.log("policy===>>>", this.policy);
          let allProducts = [];
          for (let item of this.policy.custInfo.insurants.firstInsurant.products
            .product) {
            allProducts.push(item);
            this.toggle.ProCodeList.push({
              code: item.prodCode
            });
            if (item.prodCode == "LBT029") {
              this.toggle.isLBT029 = true;
              console.log("是关爱永逸===>>>", this.toggle.isLBT029);
            }
          }
          if (
            this.policy.custInfo.insurants.otherInsurant.insurant.length > 0
          ) {
            for (let item of this.policy.custInfo.insurants.otherInsurant
              .insurant) {
              if (item.products.product.length > 0) {
                for (let newItem of item.products.product) {
                  allProducts.push(newItem);
                }
              }
            }
          }
          //console.log('所有险种===>>>', allProducts)
          let isHaveHuomian = false;
          let isBen = false;
          let isHaveAppInform = false;
          let extraList = productDefList[0].extraList;
          console.log("extraList===>>>", extraList);
          if (
            (productDefList[0].productCode,
            productDefList[0].productDefine.hasHealthTold == "true")
          ) {
            isHaveHuomian = true;
          }
          if (this.policy.custInfo.insurants.firstInsurant.relToApp == "00") {
            isBen = true;
          } else {
            this.policy.custInfo.insurants.firstInsurant.products.product.forEach(
              item => {
                extraList.forEach(extra => {
                  if (item.prodCode == extra.productCode) {
                    if (extra.productDefine.hasHealthTold == "true") {
                      isHaveHuomian = true;
                    }
                  }
                });
              }
            );
          }
          if (
            this.policy.custInfo.insurants.otherInsurant.insurant.length > 0
          ) {
            this.policy.custInfo.insurants.otherInsurant.insurant.forEach(
              insItem => {
                if (insItem.relToApp != "00") {
                  insItem.products.product.forEach(item => {
                    extraList.forEach(extra => {
                      if (item.prodCode == extra.productCode) {
                        if (extra.productDefine.hasHealthTold == "true") {
                          isHaveHuomian = true;
                        }
                      }
                    });
                  });
                } else {
                  isBen = true;
                }
              }
            );
          }
          if (isBen && isHaveHuomian) {
            isHaveAppInform = false;
          } else if (isHaveHuomian) {
            isHaveAppInform = true;
          }
          this.toggle.isHaveAppInform = isHaveAppInform;
          console.log(
            "是否有投保人告知===>>>",
            isHaveAppInform,
            this.toggle.isHaveAppInform
          );
          let allInformList = [];
          if (this.toggle.isHaveAppInform) {
            let appntInform = {
              insNo: "-2",
              insName: this.policy.custInfo.appnt.appntName,
              insInfo: {
                birthday: this.policy.custInfo.appnt.appntBirthday,
                gender: this.policy.custInfo.appnt.appntSex
              },
              informList: this.policy.custInfo.appnt.question //.resQuestion.resRemark []
            };
            allInformList.push(appntInform);
          }
          let firstInsInform = {
            insNo: "-1",
            insName: this.policy.custInfo.insurants.firstInsurant.name,
            insInfo: {
              birthday: this.policy.custInfo.insurants.firstInsurant.birthday,
              gender: this.policy.custInfo.insurants.firstInsurant.sex
            },
            informList: this.policy.custInfo.insurants.firstInsurant.question
          };
          allInformList.push(firstInsInform);
          if (
            this.policy.custInfo.insurants.otherInsurant.insurant.length > 0
          ) {
            this.policy.custInfo.insurants.otherInsurant.insurant.forEach(
              (item, index) => {
                let otherInsInform = {
                  insNo: index,
                  insName: item.name,
                  insInfo: {
                    birthday: item.birthday,
                    gender: item.sex
                  },
                  informList: item.question
                };
                allInformList.push(otherInsInform);
              }
            );
          }
          console.log("allInformList===>>>", allInformList);
          this.allInformList = allInformList;
          let isAgree = true;
          for (let item of this.allInformList) {
            if (item.informList.resQuestion.isAgree != "true") {
              isAgree = false;
            }
            if (item.informList.resQuestion.resRemark.length == 0) {
              if (this.toggle.isLBT029) {
                console.log("关爱永逸，新告知===>>>", item);
                item.informList.resQuestion.resRemark = utils.common.filtersInformList2(
                  item.insInfo,
                  JSON.parse(
                    JSON.stringify(inform_ques.imform.informList_intelligent)
                  )
                );
              } else {
                console.log("非关爱永逸，新告知===>>>", item);
                item.informList.resQuestion.resRemark = utils.common.filtersInformList2(
                  item.insInfo,
                  JSON.parse(JSON.stringify(inform_ques.imform.informList_ZJ))
                );
              }
            } else {
              if (this.toggle.isLBT029) {
                console.log("关爱永逸，之前有告知===>>>", item);
                if (
                  item.informList.resQuestion.data != undefined &&
                  item.informList.resQuestion.data != ""
                ) {
                  if (item.informList.resQuestion.data.disclosyres.length > 0) {
                    item.informList.resQuestion.data.disclosyres.forEach(
                      item => {
                        item.questionAnswers.forEach((tpl, index) => {
                          if (
                            !tpl.questionAnswerCode &&
                            !tpl.questionAnswerValue
                          ) {
                            item.questionAnswers.splice(index, 1);
                          }
                        });
                      }
                    );
                  }
                  this.resData = item.informList.resQuestion.data;
                  this.SetVuexInform(this.resData);
                  console.log("resData===>>>", this.resData);
                }
                for (let resRemark of item.informList.resQuestion.resRemark) {
                  for (let newItem of inform_ques.imform
                    .informList_intelligent) {
                    if (resRemark.code == newItem.code) {
                      resRemark.num = newItem.num;
                    }
                  }
                  if (resRemark.isBuild == "Y") {
                    resRemark.swh = true;
                    resRemark.isInput = true;
                  } else {
                    resRemark.swh = false;
                    resRemark.isInput = false;
                  }
                  if (item.insNo == "-1") {
                    if (
                      resRemark.code == "A00001" ||
                      resRemark.questionNo == 2 ||
                      resRemark.questionNo == 3 ||
                      resRemark.questionNo == 6 ||
                      resRemark.questionNo == 8 ||
                      resRemark.questionNo == "8-a" ||
                      resRemark.questionNo == "8-b" ||
                      resRemark.questionNo == "8-c" ||
                      resRemark.questionNo == "8-d" ||
                      resRemark.questionNo == "8-e" ||
                      resRemark.questionNo == "8-f" ||
                      resRemark.questionNo == "8-h" ||
                      resRemark.questionNo == 9
                    ) {
                      resRemark.isInput = false;
                    }
                  }
                  if (
                    resRemark.policyHealthAnswer != undefined &&
                    resRemark.policyHealthAnswer.length > 0
                  ) {
                    resRemark.policyHealthAnswer.sort(function(a, b) {
                      return parseInt(a.questionno) - parseInt(b.questionno);
                    });
                  }
                  item.informList.resQuestion.resRemark.sort(function(a, b) {
                    return a.num - b.num;
                  });
                }
              } else {
                console.log("非关爱永逸，之前有告知===>>>", item);
                let resRemark = item.informList.resQuestion.resRemark;
                for (let i = 0; i < resRemark.length; i++) {
                  for (let newItem of inform_ques.imform.informList_ZJ) {
                    if (resRemark[i].code == newItem.code) {
                      resRemark[i].num = newItem.num;
                    }
                  }
                  resRemark[i].isInput = true;
                  if (resRemark[i].swh == true || resRemark[i].isBuild == "Y") {
                    resRemark[i].swh = true;
                    resRemark[i].isBuild = "Y";
                    if (
                      resRemark[i].code == "A00001" ||
                      resRemark[i].code == "100000008"
                    ) {
                      resRemark[i].swh = false;
                      resRemark[i].isInput = false;
                    }
                  } else {
                    resRemark[i].swh = false;
                    resRemark[i].isBuild = "N";
                  }
                  //this.VuexInform.disclosyres = []
                  //console.log('不是关爱永逸，清空提交自核请求报文', this.VuexInform.disclosyres)
                }
                resRemark.sort(function(a, b) {
                  return a.num - b.num;
                });
                item.informList.resQuestion.resRemark = resRemark;
                console.log(
                  "告知排序===>>>",
                  item.informList.resQuestion.resRemark
                );
              }
            }
          }
          console.log("告知列表===>>>", this.allInformList);
          if (this.toggle.isHaveAppInform) {
            this.toggle.page_title = "投保人";
          } else {
            this.toggle.page_title = "被保险人";
          }
          this.allIsAgree = isAgree;
          console.log("是否同意===>>>", this.allIsAgree);
          this.loadF = true;
        },
        true
      );
    },
    changeInsInfo(index) {
      console.log("切换被保人===>>>", index);
      this.insNo = index;
      console.log(
        "index,insNo",
        index,
        this.insNo,
        this.allInformList[this.insNo]
      );
      if (this.toggle.isHaveAppInform && index == "0") {
        this.toggle.page_title = "投保人";
      } else {
        this.toggle.page_title = "被保险人";
      }
    },
    savePolicyMsg() {
      for (let item of this.allInformList) {
        if (item.insNo == "-2") {
          this.policy.custInfo.appnt.question = item.informList;
        } else if (item.insNo == "-1") {
          this.policy.custInfo.insurants.firstInsurant.question =
            item.informList;
        } else {
          this.policy.custInfo.insurants.otherInsurant.insurant[
            item.insNo
          ].question = item.informList;
        }
      }
      if (this.resData != "") {
        this.policy.custInfo.insurants.firstInsurant.question.data = this.resData;
      }
    },
    backHome() {
      this.savePolicyMsg();
      let requ = {
        policy: this.policy
      };
      utils.http.postFast("MODISTRIESAVE", requ, body => {
        if (body.policy.resultCode == "0") {
          utils.cache.set("policy_orderId", body.policy.orderId);
          this.$router.push("/home");
        } else {
          alert_n22.alert("提示", body.policy.resultMessage, "确定");
        }
      });
    },
    goBack() {
      this.savePolicyMsg();
      let requ = {
        policy: this.policy
      };
      utils.http.postFast("MODISTRIESAVE", requ, body => {
        if (body.policy.resultCode == "0") {
          utils.cache.set("policy_orderId", body.policy.orderId);
          this.$router.push({
            name: "productsPage",
            params: {
              planId: body.policy.orderId
            }
          });
        } else {
          alert_n22.alert("提示", body.policy.resultMessage, "确定");
        }
      });
    },
    nextStep() {
      if (!this.allIsAgree) {
        alert_n22.alert("提示", "请确认是否充分了解告知内容", "确定");
      } else {
        let isPass = this.checkData();
        console.log("====isPass========", isPass);
        if (isPass.result.length > 0) {
          let msg = "";
          for (let i = 0; i < isPass.result.length; i++) {
            msg += i + 1 + "." + isPass.result[i] + "</br>";
          }
          alert_n22.alert("提示", msg, "确定");
        } else if (isPass.msg != "") {
          alert_n22.confirm("提示", isPass.msg, "确定", "", flag => {
            this.next();
          });
        } else {
          this.next();
        }
      }
    },
    next() {
      this.savePolicyMsg();
      let requ = {
        policy: this.policy
      };
      utils.http.postFast("MODISTRIESAVE", requ, body => {
        if (body.policy.resultCode == "0") {
          utils.cache.set("policy_orderId", body.policy.orderId);
          if (this.toggle.isLBT029) {
            console.log("==================", this.resData);
            if (
              this.resData != undefined &&
              this.resData.disclosyres != undefined &&
              this.resData.disclosyres.length > 0
            ) {
              this.resData.disclosyres.forEach(item => {
                if (item.impartCode == "SE6") {
                  if (
                    item.questionAnswers[0].questionnaireId == undefined ||
                    item.questionAnswers[0].questionnaireId == ""
                  ) {
                    item.questionAnswers.splice(0, 1);
                  }
                }
              });
              let requ = {
                inform: {
                  caseNo: this.resData.caseNo,
                  salesChannel: this.policy.agentInfo.branchType,
                  disclosures: this.resData.disclosyres
                }
              };
              console.log("请求自核报文的数据===>>>", requ);
              utils.http.postFast("AUTOUNDERWRITE", requ, (body, header) => {
                if (header.resultCode != 0) {
                  alert_n22.alert("提示", header.resultMsg, "确定");
                } else {
                  /*提交自核之后提示自核结果*/
                  let resTitleText = "";
                  if (body.inform.result == "ACC") {
                    resTitleText = "您的健康告知不影响承保，请继续投保。";
                  } else {
                    resTitleText = "您的健康告知需经我司人工审核，请继续投保。";
                  }
                  alert_n22.confirm("提示", resTitleText, "确定", "", flag => {
                    console.log(this.policy.orderId);
                    this.$router.push({
                      name: "salesman_report_page",
                      params: {
                        planId: this.$route.params.planId
                      }
                    });
                  });
                }
              });
            } else {
              this.$router.push({
                name: "salesman_report_page",
                params: {
                  planId: this.$route.params.planId
                }
              });
            }
          } else {
            this.$router.push({
              name: "salesman_report_page",
              params: {
                planId: this.$route.params.planId
              }
            });
          }
        } else {
          alert_n22.alert("提示", body.policy.resultMessage, "确定");
        }
      });
    },
    checkData() {
      let result = {
        result: [],
        msg: ""
      };
      for (let resList of this.allInformList) {
        for (let item of resList.informList.resQuestion.resRemark) {
          if (item.code == "A00001") {
            console.log(
              "===============",
              utils.valid.getAge(resList.insInfo.birthday)
            );
            if (item.height == "") {
              result.result.push("请输入身高");
            } else if (item.height <= 2) {
              result.result.push("请您注意身高单位为厘米");
            } else if (
              utils.valid.getAge(resList.insInfo.birthday) <= 10 &&
              item.height >= 150
            ) {
              result.msg = "请确认身高体重是否属实";
            }
            if (item.weight == "") {
              result.result.push("请输入体重");
            } else if (item.weight <= 0) {
              result.result.push("体重未填写");
            } else if (
              utils.valid.getAge(resList.insInfo.birthday) <= 10 &&
              item.weight >= 50
            ) {
              result.msg = "请确认身高体重是否属实";
            } else if (
              utils.valid.getAge(resList.insInfo.birthday) >= 18 &&
              item.weight >= 100
            ) {
              result.msg = "请确认身高体重是否属实";
            }
            item.questionRemark = item.height + "/" + item.weight;
          } else if (item.isBuild == "Y") {
            if (this.toggle.isLBT029) {
              if (
                item.questionNo != 2 &&
                item.questionNo != 3 &&
                item.questionNo != 6 &&
                item.questionNo != 8 &&
                item.questionNo != "8-a" &&
                item.questionNo != "8-b" &&
                item.questionNo != "8-c" &&
                item.questionNo != "8-d" &&
                item.questionNo != "8-e" &&
                item.questionNo != "8-f" &&
                item.questionNo != "8-h" &&
                item.questionNo != 9
              ) {
                if (item.questionRemark.replace(/(^\s*)|(\s*$)/g, "") == "") {
                  result.result.push("请完善告知内容");
                }
              }
            } else {
              if (item.questionRemark.replace(/(^\s*)|(\s*$)/g, "") == "") {
                result.result.push("请完善告知内容");
              }
            }
          }
        }
      }
      return result;
    },
    switchQuestion(itm) {
      console.log(
        "======",
        this.toggle.isLBT029,
        this.allInformList[this.insNo]
      );
      if (
        this.toggle.isLBT029 &&
        this.allInformList[this.insNo].insNo == "-1"
      ) {
        console.log("关爱永逸被保人告知", itm, itm.swh, itm.isBuild);
        if (itm.swh) {
          itm.isBuild = "Y";
          itm.isInput = true;
          if (
            itm.questionNo == 2 ||
            itm.questionNo == 3 ||
            itm.questionNo == 6 ||
            itm.questionNo == "8-a" ||
            itm.questionNo == "8-b" ||
            itm.questionNo == "8-c" ||
            itm.questionNo == "8-d" ||
            itm.questionNo == "8-e" ||
            itm.questionNo == "8-f" ||
            itm.questionNo == "8-h" ||
            itm.questionNo == 9
          ) {
            itm.isInput = false;
            this.savePolicyMsg();
            let requ = {
              policy: this.policy
            };
            utils.http.postFast("MODISTRIESAVE", requ, body => {
              if (body.policy.resultCode == "0") {
                console.log(
                  "告知===>",
                  this.allInformList[this.insNo].insNo,
                  this.allInformList[this.insNo]
                );
                console.log("险种code===>", this.toggle.ProCodeList);
                this.$router.push({
                  name: "GoToQuestionnaire",
                  params: {
                    planId: this.$route.params.planId,
                    insNo: this.allInformList[this.insNo].insNo,
                    code: itm.questionNo
                  }
                });
              } else {
                alert_n22.alert("提示", body.policy.resultMessage, "确定");
              }
            });
          }
        } else {
          itm.isBuild = "N";
          itm.questionRemark = "";
          itm.policyHealthAnswer = [];
          if (
            this.resData.disclosyres != undefined &&
            this.resData.disclosyres.length > 0
          ) {
            this.resData.disclosyres.forEach((item, index) => {
              if (item.impartContent == itm.desc) {
                this.resData.disclosyres.splice(index, 1);
              }
            });
          }
          let newInform = {
            inform: {
              caseNo: this.$route.params.planId,
              //订单id
              impartCode: itm.questionNo.toString(),
              //题目编号 Ex:8-a
              flag: "N",
              //Y保存
              Answer: []
            }
          };
          utils.http.postFast("MOSAVEQUESTION", newInform, body => {
            console.log("删除关爱永逸题干==>", body);
          });
          console.log("描述==>", itm.desc);
          console.log("删除之前的请求自核报文的数据----->>>", this.VuexInform);
          this.VuexInform.disclosyres.forEach((tpl, index) => {
            if (itm.desc == tpl.impartContent) {
              this.VuexInform.disclosyres.splice(index, 1);
            }
          });
          this.SetVuexInform(this.VuexInform);
          console.log("删除之后的请求自核报文的数据----->>>", this.VuexInform);
        }
      } else {
        console.log(
          "非关爱永逸或关爱永逸投保人告知或关爱永逸其他被保人告知",
          itm,
          itm.swh,
          itm.isBuild
        );
        if (itm.swh) {
          itm.isBuild = "Y";
          itm.isInput = true;
        } else {
          itm.isBuild = "N";
          itm.isInput = false;
          itm.questionRemark = "";
          if (
            (!this.toggle.isLBT029 && itm.code == "A00013") ||
            (this.toggle.isLBT029 && itm.code == "A00021")
          ) {
            this.allInformList[this.insNo].informList.resQuestion.fetationDate =
              "";
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped type="text/css">
div ::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.back {
  position: relative;
  img {
    position: absolute;
    width: 24px;
    right: 30px;
    top: 10px;
  }
}

.main-contents {
  bottom: 50px;
  font-size: 14px;
  .left_top {
    display: flex;
    justify-content: flex-start;
			padding: 0 22px;
			overflow-x: auto;
			font-size: 16px;

			div {
				/*width: 100%;*/
				margin: 0 2%;
				color: #333;
				border-bottom: 2px solid transparent;

				p {
					line-height: 1.2;
					font-size: 14px;
					width: 100%;
					text-align: center;
					white-space: nowrap;
					padding: 0 2%;
				}

				p+p {
					font-size: 12px;
				}
			}

			.active {
				color: #fdb92c;
				border-bottom-color: #fdb92c;
			}
		}

		ul {
			width: 100%;

			li {
				width: 100%;
				box-sizing: border-box;
				padding: 15px 20px;
				border-bottom: 1px dashed #999;

				div.item_content {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #333;
					line-height: 1.5;

					input {
						width: 15%;
						border: none;
						outline: none;
						border-bottom: 1px solid #333;
						margin-right: 5px;
						text-align: center;
					}

					div.item_right {
						position: relative;

						.mint-switch-label label {
							position: absolute;
							bottom: 9px;
							font-size: 14px;
							font-weight: bold;
							color: #fbfbfb;
						}
					}
				}

				div.item_contentNew p {
					text-align: center;
					padding: 0 10px;
					box-sizing: border-box;

					textarea {
						width: 100%;
						box-sizing: border-box;
						padding: 5px;
						margin-top: 10px;
						border: 1px solid #c4c4c4;
					}
				}

				.new-answer {
					border-bottom: 1px dotted #ccc;
					width: 80%;
					margin: 10px auto;

					p {
						margin: 10px 0;
					}

					p:last-child {
						padding-left: 10px;
					}
				}
			}

			li:first-child,
			li:last-child {
				height: 50px;
				line-height: 50px;
				padding: 0 20px;
				background: #f5f5f5;
				border-bottom: 1px solid #d9d9d9;
			}

			li:last-child {
				margin-bottom: 10px;
        text-align: left;
        padding: 0 18px;
				background: #fff;
        border-bottom: none;
        
			}
		}
	}

	.upImg {
		width: 30px;
		position: fixed;
		bottom: 110px;
		right: 5%;
	}

	.btnFoote {
		width: 100%;
		height: 50px;
		line-height: 50px;
		box-sizing: border-box;
		color: #fff;
		background: #FEB101;
		border: 0;
		font-size:16px;
	}

	.opacity_half {
		opacity: 0.5;
  }
  .main-contents{
		 -webkit-overflow-scrolling: auto !important;
  }
</style>
