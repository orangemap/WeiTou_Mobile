<!-- 客户选择界面 -->
<template>
  <div class="sel-user">
    <Headerbtns title="客户积分">
      <div slot="left" class="back" @click="goBack">
        <i class="fa fa-angle-left"></i>
      </div>
    </Headerbtns>
    <div
      class="details"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled
      infinite-scroll-distance="pageLength"
    >
      <div class="flex sel-user-sel">
        <input type="text" placeholder="请输入姓名" v-model="searchVal" />
        <button class="btn-sel" @click="toNewUserList()">查询</button>
      </div>
      <div v-for="(item,index) in customerInfo.customerInfoList" :key="index" class="user-list">
        <div class="flex flex-center" style="height:2.8rem">
          <img :src="[item.customerSex=='0'?nanUrl:nvUrl]" style="width:2rem;height:2rem" />
          <p>{{item.customerName}}</p>
          <p>{{item.age + '岁'}}</p>
          <div class="flex flex-center" style="width:45%">
            <p>{{item.customerBirthday}}</p>
            <img
              src="static/img/settlement/detail.png"
              style="width:1.2rem;height:1.2rem"
              @click="toggleShow(item)"
            />
          </div>
        </div>
      </div>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>

<script>
import Headerbtns from '@/components/policy/common/Header'
import alert from "../../../src/components/policy/common/alert.vue";
import "../policy/css/base.css";
export default {
  components: { Headerbtns, alert },
  data() {
    return {
      searchVal: "",
      customerInfo: {
        customerInfoList: []
      },
      customerInfo2: {
        customerInfoList: []
      },
      nanUrl: "static/img/settlement/nan.png",
      nvUrl: "static/img/settlement/nv.png",
      pageNo: 1, //起始页面
      pageLength: 20, //每页显示条数
      currentCusListLength: 0 //最新查到客户条数
    };
  },
  methods: {
    goBack() {
      let channel = utils.cache.get("personsal").channel;
      if (channel == "02") {
        this.$router.push("/comprehensiveYinbao/comprehensiveInfo");
      } else if (channel == "06") {
        this.$router.push("/comprehensiveXuqi/comprehensiveInfo");
      } else {
        this.$router.push("/comprehensiveGexian/comprehensiveInfo");
      }
    },
    loadMore() {
      if (this.searchVal == undefined || this.searchVal == "") {
        if (this.currentCusListLength == this.pageLength) {
          ++this.pageNo;
          this.search("", 200);
          return;
        } else {
          console.log("列表加载完毕");
        }
      }
    },
    toggleShow(item) {
      console.log("当前选择客户为:", item);
      if (
        item.customerName != "" &&
        item.sex != "" &&
        item.birthday != "" &&
        item.idNo != "" &&
        item.idType != ""
      ) {
        this.$router.push({
          name: "integral_query",
          params: {
            customer: JSON.stringify(item)
          }
        });
      } else {
        this.showMsg("当前所选择客户的五要素不全,无法查询客户积分!");
      }
    },
    toNewUserList() {
      this.search(this.searchVal, 10000);
    },
    search(name, index) {
      let requ = {
        cus: {
          agentCode: utils.cache.get("personsal").agentCode,
          clientName: "",
          phoneNumber: "",
          clientType: "",
          endIndex: "2147483648",
          startIndex: "1",
          customerType: "1", //1本地 2核心
          certificateNo: "",
          pageNo: this.pageNo
        }
      };
      if (this.pageNo == 1) {
        requ = {
          data: {
            agentCode: utils.cache.get("personsal").agentCode,
            customerBirthday: "",
            customerIdNo: "",
            customerName: name,
            customerNo: "",
            customerType: "",
            startnum: "1",
            endnum: "10000"
          },
          methodName: "customerList",
          modelName: "claimService"
        };
      } else {
        requ = {
          data: {
            agentCode: utils.cache.get("personsal").agentCode,
            customerBirthday: "",
            customerIdNo: "",
            customerName: name,
            customerNo: "",
            customerType: "",
            startnum: "1",
            endnum: "10000"
          },
          methodName: "customerList",
          modelName: "claimService"
        };
      }
      utils.http.postFast("CusbusinessService", requ, body => {
        console.log(body);
        if (body.data.ResponseCode == 0) {
          for (let i = 0; i < body.data.customerList.length; i++) {
            body.data.customerList[i].age = utils.valid.getAge(
              body.data.customerList[i].customerBirthday
            );
          }
          this.customerInfo.customerInfoList = body.data.customerList;
          this.customerInfo2.customerInfoList = body.data.customerList;
        } else {
          this.showMsg("查询失败");
        }
        //				if(body.customerInfo.resultCode == 0) {
        //					console.log(this.customerInfo)
        //					console.log(name)
        //					if(name!=''){
        //						this.pageNo = 1
        //						this.currentCusListLength = body.customerInfo.customerInfoList.length
        //						console.log(this.currentCusListLength)
        //						for(let i=0;i<body.customerInfo.customerInfoList.length;i++){
        //							body.customerInfo.customerInfoList[i].age = utils.valid.getAge(body.customerInfo.customerInfoList[i].birthday)
        //						}
        //						this.customerInfo.customerInfoList = body.customerInfo.customerInfoList
        //						if(this.customerInfo.customerInfoList.length == '0') {
        //							this.showMsg("未查询到数据")
        //						}
        //					}else{
        //						console.log(index)
        //						if(index !=undefined && index == 100){
        //							this.customerInfo.customerInfoList = []
        //						}
        //						this.currentCusListLength = body.customerInfo.customerInfoList.length
        //						console.log(this.currentCusListLength)
        //						for(let i=0;i<body.customerInfo.customerInfoList.length;i++){
        //							body.customerInfo.customerInfoList[i].age = utils.valid.getAge(body.customerInfo.customerInfoList[i].birthday)
        //							this.customerInfo.customerInfoList.push(body.customerInfo.customerInfoList[i])
        //						}
        //						if(this.customerInfo.customerInfoList.length == '0') {
        //							this.showMsg("未查询到数据")
        //						}
        //					}
        //				} else {
        //					this.showMsg(body.customerInfo.resultMessage)
        //				}
      });
    },
    showMsg: function(msg) {
      if (msg != undefined && msg != "") {
        this.$refs.alert.showMOdal(msg);
      }
    }
  },
  mounted() {
    let htmlDOM = document.getElementsByTagName("html")[0];
    htmlDOM.style.fontSize = this.screenWidth / 20 + "px";
    this.media.header($(".details"));
    //		this.toNewUserList()
  },
  beforeDestroy() {
    let htmlDOM = document.getElementsByTagName("html")[0];
    htmlDOM.style.fontSize = "";
  },
  watch: {
    //	    'searchVal'(newVal,oldVal){
    //	    	if(newVal!=oldVal){
    //	    		console.log(newVal)
    //	    		let newCustomerInfoList = []
    //	    		for(let i=0;i<this.customerInfo.customerInfoList.length;i++){
    //	    			if(this.customerInfo.customerInfoList[i].customerName.indexOf(newVal)>-1){
    //	    				newCustomerInfoList.push(this.customerInfo.customerInfoList[i])
    //	    			}
    //	    		}
    //	    		if(newCustomerInfoList.length>0){
    //	    			this.customerInfo.customerInfoList = newCustomerInfoList
    //	    		}
    //	    	}
    //	    	if(newVal == ''){
    //  			this.customerInfo.customerInfoList = this.customerInfo2.customerInfoList
    //	    	}
    //	    },
  }
};
</script>

<style lang="scss" scoped type="text/css">
.sel-user p {
  font-size: 0.8rem;
}
.sel-user .flex {
  display: flex;
  align-items: center;
}
.sel-user .flex-center {
  justify-content: space-between;
}
.sel-user-head .back {
  padding-top: 3px;
}
.details .sel-user-sel {
  background: #f1f1f1;
  height: 3rem;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
}
.details input {
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 2rem;
  width: 100%;
  padding-left: 5px;
}
.sel-user .btn-sel {
  background: #feb101;
  color: #fff;
  border-radius: 5px;
  outline: none;
  border: none;
  height: 2rem;
  width: 18%;
  margin-left: 2px;
}
.sel-user .btn-sel:active {
  opacity: 0.8;
}
.sel-user .user-list {
  padding: 0 1rem;
  border-bottom: 5px solid #ccc;
}
input {
  background-color: white !important;
}
.fa {
  color: #fdb92c;
}
</style>
