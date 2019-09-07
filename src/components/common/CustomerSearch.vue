<!-- 客户查询 修改查询条件分页查询,每页20条-->
<template>
	<div>
		<div>
			<Headerbtns :title="page_title">
			    <div @click="cancel" slot="left">
					 <i class="fa fa-angle-left"></i>
				</div>
				<div slot="right" @click="searchCus()" >
                   <img src="static/img/common/search.png"  height="16" width="16" style="margin-right:15px;position: relative;top:3px;" />
				</div>
			</Headerbtns>
			<div class="main-contents" v-infinite-scroll="loadMore" infinite-scroll-disabled infinite-scroll-distance="pageLength">
				<div class="search">
					<div class="input flex flexs" style="position: relative;" @click="getSearch()">
						<input   type="text" placeholder="请输入姓名/手机号/证件号码" />
						<div style="position: absolute;right:0px;top:18px;width: 15%;" class="flex flexs">
							<div class="imgs">
								<img src="static/img/customerManage/serach.png" alt />
							</div>
						</div>
					</div>
				</div>
				<div>
					<div style="width: 100%;" class="userInfo" v-for="(itm,index) in customerInfo.customerInfoList" :key="index"
					 @click="selectedItem(itm)">
						<ul class="user_info" v-if="customerType == '1'">
							<li style="width: 15%;margin-right:2%;">
								<img class="avator_img" style="border-radius:50%" v-if="itm.fileurl != undefined" :src="itm.fileurl" />
								<img class="avator_img" v-if="itm.fileurl == undefined && itm.sex == 1" src="static/img/common/touxiang_nan.png" />
								<img class="avator_img" v-if="itm.fileurl == undefined && itm.sex == 2" src="static/img/common/touxiang_nv.png" />
								<img class="avator_img" v-if="itm.fileurl == undefined && (itm.sex==undefined || itm.sex=='')" src="static/img/settlement/sex.png" >
							</li>
							<li style="width: 15%;text-align: left;">
								<span style="font-size:14px;font-weight:400;color:rgba(0,0,0,1);">{{itm.name}}</span>
								<span style="font-size:14px;font-weight:400;color:color:rgb(127, 127, 127);">{{itm.certificateType|Notype}}</span>
							</li>
							<li style="width:60%;margin-left:10%;">
								<span>{{itm.retirementAge=='null'?'':itm.retirementAge}}岁&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itm.phone}}</span>
								<span>{{itm.certificateNo}}</span>
							</li>
						</ul>
						<ul class="user_info" v-if="customerType == '2'">
							<li style="width: 15%;">
								<img class="avator_img" v-if="itm.sex == 1" src="../../../static/img/common/touxiang_nan.png" />
								<img class="avator_img" v-if="itm.sex == 2" src="../../../static/img/common/touxiang_nv.png" />
							</li>
							<li style="width: 15%;">
								<span style="font-size:14px;font-weight:400;color:rgba(0,0,0,1);">{{itm.customerName}}</span>
								<span style="font-size:14px;font-weight:400;color:rgb(127, 127, 127);">{{itm.code|Notype}}</span>
							</li>
							<li style="width:60%;margin-left:10%;">
								<span>{{itm.birthday|ageFilter}}岁&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itm.phoneNumber}}</span>
								<span>{{itm.idNo}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<alert ref="alert"></alert>
		</div>
		<div v-show="!aa">
			<div class="seach-content" @click="vvv()"></div>
			<div class="seach-wrapper">
				<Headerbtns :title="page_title">
					<div slot="left" class="back" @click="cancle">
						<i class="fa fa-angle-left" style="color:#FDB92C;"></i>
					</div>
				</Headerbtns>
				<div class="detail" style="background:#fff;font-size: 0.85rem;">
					<div>
						<div style="width: 100%;">
							<div style="width: 95%;margin: auto;">
								<div class="flexs flex" style="border-bottom: 1px solid #EDEDED;line-height: 1.1rem;padding: 4% 0 4% 0;">
									<div class="info-left">
										<img src="static/img/backlog/seach.png" alt width="16" height="16" class="info-left-img" />
										<span class="seach-icon">搜索条件</span>
									</div>
								</div>
								<div class="flexs flex" style="border-bottom: 1px solid #EDEDED;line-height: 1.1rem;padding: 4% 0 4% 0;">
									<div class="info-left">客户姓名</div>
									<input ref="customerName" type="text" placeholder="请输入您要查询的客户姓名" style="text-align: end;" v-model="search_parameter.customerName" />
								</div>
								<div class="flexs flex" style="border-bottom: 1px solid #EDEDED;line-height: 1.1rem;padding: 4% 0 4% 0;">
									<div class="info-left">手机号码</div>
									<input type="text" placeholder="请输入您要查询的手机号码" style="text-align: end;" v-model="search_parameter.phoneNumber" />
								</div>
								<div class="flexs flex" style="border-bottom: 1px solid #EDEDED;line-height: 1.1rem;padding: 4% 0 4% 0;">
									<div class="info-left">证件号码</div>
									<input type="text" placeholder="请输入您要查询的证件号码" style="text-align: end;" v-model="search_parameter.idNo" />
								</div>
							</div>
						</div>
						<div class="btn-wrapper">
							<div class="add-btn" @click="cancle()" style="background: #fff;color:#A8A8A8">取消</div>
							<div class="add-btn" @click="search(1)">查询</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!--js-->
<script>
import { MessageBox } from "mint-ui";
import { InfiniteScroll } from "mint-ui";
import Headerbtns from "../../../src/components/policy/common/Header";
import alert from "../../../src/components/policy/common/alert.vue";
import global_constant from "../../../src/assets/data/global_constant.json";
import "../policy/css/base.css";

export default {
  name: "customer_search",
  components: {
    Headerbtns,
    alert
  },
  props: ["value"],
  data() {
    return {
      aa: true,
      customerType: "1",
      page_title: "本地客户查询", //1.本地客户查询 2.核心客户查询
      search_tag: "",
      search_parameter: {
        customerName: "",
        phoneNumber: "",
        idNo: ""
      },
      customerInfo: {
        customerInfoList: []
      },
      global_constant: global_constant,
      pageNo: 1, //起始页面
      pageLength: 20, //每页显示条数
      currentCusListLength: 0 //最新查到客户条数
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val.isopen) {
          this.customerType = "1";
          this.page_title = "本地客户查询";
          this.search_tag = this.$route.params.tags;
          this.search_parameter.customerName = ''
          this.search_parameter.phoneNumber = ''
          this.search_parameter.idNo = ''
          this.search(1);
        }
      },
      deep: true
    }
  },
  methods: {
    cancle() {
      let result = {
        customerName: "",
        phoneNumber: "",
        idNo: ""
      };
      this.search_parameter = result;
      this.aa = true;
    },
    getSearch() {
    	this.search_parameter.customerName = ''
			this.search_parameter.phoneNumber = ''
			this.search_parameter.idNo = ''
      this.aa = false;
    },
    vvv() {
      this.aa = true;
    },
    loadMore() {
      if (this.currentCusListLength == this.pageLength) {
        ++this.pageNo;
        this.search();
        return;
      } else {
        console.log("列表加载完毕");
      }
    },
    searchCus() {
      if (this.customerType == "1") {
        this.customerType = "2";
        this.page_title = "核心客户查询";
        this.pageNo = 1;
        this.search(1);
      } else {
        this.customerType = "1";
        this.page_title = "本地客户查询";
        this.pageNo = 1;
        this.search(1);
      }
    },
    showMsg: function(msg) {
      if (msg != undefined && msg != "") {
        this.$refs.alert.showMOdal(msg);
      }
    },
    selectedItem: function(item) {
      if (this.customerType == "1") {
        console.log(item.infoId);
        this.getCustomerDetail(item.infoId, cusItem => {
          console.log(item);
          cusItem.data.appntMsg.infoId = item.infoId;
          cusItem.data.appntMsg.memberType = item.memberType;
          this.customerType = "1";
          this.page_title = "本地客户查询";
          this.value.isopen = !this.value.isopen;
          this.value.cusItem = cusItem;
          this.customerInfo = {
            customerInfoList: []
          };
          console.log("选中本地客户===>", this.value);
        });
      } else {
        console.log('核心item',item)
        let requ = {
		    "data": {
		        "agentCode": utils.cache.get("personsal").agentCode,
		        "customerNo": item.customerNo,
		        "clientName": item.customerName
		    },
		    "methodName": "getCustomerDetial",
		    "modelName": "saveStarShinePlanService"
		}
        utils.http.postFast("CustomerDetial", requ, body => {
        	if(body.data.ResponseCode == '0'){
        	 	this.value.isopen = !this.value.isopen;
		        this.value.cusItem = body.data.cus;
		        this.customerInfo = {
		          customerInfoList: []
		        };
		        console.log("选中核心客户===>", this.value);	
        	}
        })
      }
    },
    cancel: function() {
      this.customerType = "1";
      this.page_title = "本地客户查询";
      this.value.isopen = !this.value.isopen;
      this.value.cusItem = undefined;
      this.value.infoId = undefined;
      this.value.sex = undefined;
      this.value.relationship = undefined;
      this.customerInfo = {
        customerInfoList: []
      };
      console.log("取消选中客户===>", this.value);
    },
    getCustomerDetail(infoId, result) {
      let requ = {
        data: {
          infoId: infoId
        },
        methodName: "CustomerInformation",
        modelName: "customerManagementListQueryService"
      };
      console.log(JSON.stringify(requ));
      utils.http.postFast("BusinessService", requ, body => {
        console.log(JSON.stringify(body));
        if (body.data.newCustomerOne.resultCode == "0") {
          result(body);
        } else {
          this.showMsg(body.data.newCustomerOne.resultMessage);
        }
      });
    },
    search: function(page) {
        this.aa =true
      if (this.customerType == "1") {
        if (page != undefined) {
          this.pageNo = page;
          this.customerInfo.customerInfoList = [];
        }
        let requ = {
          //					"cus": {
          //						"agentCode": utils.cache.get('personsal').agentCode,
          //						"clientName": this.search_parameter.customerName,
          //						"phoneNumber": this.search_parameter.phoneNumber,
          //						"clientType": "",
          //						"endIndex": "2147483648",
          //						"startIndex": "1",
          //						"customerType": this.customerType, //1本地 2核心
          //						"certificateNo": this.search_parameter.idNo,
          //						"pageNo": this.pageNo
          //					}
          data: {
            agentCode: utils.cache.get("personsal").agentCode,
            certificateNo: this.search_parameter.idNo,
            name: this.search_parameter.customerName,
            pageNo: this.pageNo,
            phone: this.search_parameter.phoneNumber,
            relationship: this.value.relationship,
            sex: this.value.sex,
            infoId: this.value.infoId
          },
          methodName: "InsuranceProcessCustomerInquiry",
          modelName: "customerManagementListQueryService"
        };
        console.log(JSON.stringify(requ));
        utils.http.postFast("BusinessService", requ, body => {
          if (body.data.customerQueryList != "") {
            console.log(this.customerInfo);
            this.currentCusListLength = body.data.customerQueryList.length;
            console.log(this.currentCusListLength);
            for (let item of body.data.customerQueryList) {
              this.customerInfo.customerInfoList.push(item);
            }
            //						this.customerInfo = body.customerInfo
            console.log(this.customerInfo);
            //						if(this.customerInfo.customerInfoList.length == '0') {
            //							this.showMsg("未查询到数据")
            //						}
          }
          //					else {
          //						this.showMsg(body.customerInfo.resultMessage)
          //					}
        });
      } else {
        if (page != undefined) {
          this.pageNo = page;
          this.customerInfo.customerInfoList = [];
        }
        let requ = {
          cus: {
            agentCode: utils.cache.get("personsal").agentCode,
            clientName: this.search_parameter.customerName,
            phoneNumber: this.search_parameter.phoneNumber,
            clientType: "",
            endIndex: "2147483648",
            startIndex: "1",
            customerType: this.customerType, //1本地 2核心
            certificateNo: this.search_parameter.idNo,
            pageNo: this.pageNo
          }
        };
        utils.http.postFast("MOHQCUSTOMER", requ, body => {
          if (body.customerInfo.resultCode == 0) {
            console.log(this.customerInfo);
            this.currentCusListLength =
              body.customerInfo.customerInfoList.length;
            console.log(this.currentCusListLength);
            for (let item of body.customerInfo.customerInfoList) {
              this.customerInfo.customerInfoList.push(item);
            }
            //						this.customerInfo = body.customerInfo
            console.log(this.customerInfo);
            if (this.customerInfo.customerInfoList.length == "0") {
              this.showMsg("未查询到数据");
            }
          } else {
            this.showMsg(body.customerInfo.resultMessage);
          }
        });
      }
    }
  },
   mounted() {
    let htmlDOM = document.getElementsByTagName("html")[0];
    htmlDOM.style.fontSize = this.screenWidth / 20 + "px";
    this.media.header($(".detail"))
    
  },
  updated() {
    console.log("发生变化了.......");
    let htmlDOM = document.getElementsByTagName("html")[0];
    htmlDOM.style.fontSize = this.screenWidth / 20 + "px";
    this.media.header($(".detail"))
  }
};
</script>

<style lang="scss" scoped type="text/css">
.main-contents {
  bottom: 0 !important;
}

.userInput {
  width: 100%;
  height: 105px;
  background: #e8e7e4;
  line-height: 52px;
}

.userInput_box {
  width: 95%;
  height: 52px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  text-align: center;
}

.user_input {
  width: 25%;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 7px 5px 0px 5px;
  line-height: 36px;
  background: #fff;
}

.phone_input {
  width: 40%;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 7px 5px 0px 5px;
  line-height: 36px;
  background: #fff;
}

.uName {
  width: 85%;
}

.phoneNum {
  width: 85%;
}

.query_btn {
  width: 22%;
  height: 38px;
  color: #fff;
  background: #feb101;
  border-radius: 5px;
  margin: 7px 5px 0px 5px;
  line-height: 38px;
}

.userInput_box + input {
  width: 65%;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px 0 5px 4%;
  line-height: 36px;
  padding-left: 10px;
  background: #fff;
}

.userInfo {
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #efefef;
  text-align: center;
  line-height: 65px;
}

.user_info {
  display: flex;
  margin-left: 15px;
  height: 65px;
  box-sizing: border-box;
  justify-content: space-between;
}

.avator_img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}

li {
  color: #746e69;
  font-size: 14px;
}
.user_info > li:nth-child(2) {
  color: #746e69;
  font-size: 12px;
  font-weight: bold;
  height: 65px;
  span {
    display: block;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.user_info > li:nth-child(3) {
  font-size: 12px;
  font-weight: bold;
  height: 65px;
  text-align: left;
  span {
    color: rgb(127, 127, 127);
    display: block;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.user_info > li:nth-child(4) {
  color: #746e69;
  font-size: 12px;
  font-weight: bold;
  height: 65px;
  span {
    display: block;
    height: 30px;
    text-align: left;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.search {
  background: #f8f8f8;
  width: 100%;
  margin: auto;
  position: relative;
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
    padding: 10px 0;
    input {
      width: 100%;
      padding-left: 12%;
      line-height: 33px;
      height: 33px;
      border-radius: 33px;
      margin: 0 3%;
      text-align: left;
      background-color: white !important;
    }
  }
}
input::-webkit-input-placeholder {
  font-size: 16px;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
}
.seach-wrapper {
  width: 100%;
  position: absolute;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 22222;
}
.seach-content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 22222;
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
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
input::-webkit-input-placeholder {
  font-size: 14px;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
}
.seach-icon {
  font-size: 16px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.fa-angle-left {
  font-size: 30px;
}
.btn-wrapper {
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-btn {
  width: 50%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background-color: #feb101;
  font-size: 16px;
  /*border-radius: 5px;*/
  color: #ffffff;
  /*margin-bottom: 15px;*/
}
.detail{
    input{
        height: 100%;
        width: 70%;
    }
}
</style>