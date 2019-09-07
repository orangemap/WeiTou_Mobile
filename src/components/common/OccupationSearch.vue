<!--
	职业查询页面
-->
<template>
  <div>
    <div class="occ-search">
      <Headerbtns title="职业查询">
        <div slot="left" class="back" @click="cancel">
          <i class="fa fa-angle-left" style="color:#FDB92C;"></i>
        </div>
      </Headerbtns>
      <div class="details">
        <div class="search">
          <div class="input flex flexs" style="position: relative;">
            <input type="text" placeholder="请输入您的职业" v-model="searchParameter" style=" background-color: white !important;" />
            <div style="position: absolute;right:0px;top:15px;width: 15%;" class="flex flexs">
              <p
                class="fa fa-microphone"
                aria-hidden="true"
                style="color:#feb101;font-size:1.2rem;"
                @click="speechRec(100)"
                v-if="_props.audioActive==true"
              ></p>
              <div class="imgs" @click="search()">
                <img src="static/img/customerManage/serach.png" alt />
              </div>
            </div>
          </div>
        </div>
        <div style="overflow-y: scroll;width: 100%;" class="loaded-div">
          <div style="width: 100%;">
            <ul class="list">
              <li>
                <div
                  v-show="!toggle.isSearch"
                  v-for="(itm,index) in dict.occupationList.occupation.itemOne"
                  :key="index"
                >
                  <p @click="itm.isopen = !itm.isopen">
                    {{itm.descr}}
                    <img
                      class="logo"
                      height="8"
                      width="14"
                      src="static/img/common/fa-chevron-down.png"
                      style="-webkit-transition:all .2s ease-out;"
                      :style="{'-webkit-transform':itm.isopen?'rotate(180deg)':''}"
                    />
                  </p>
                  <div class="line-bottoms" v-show="itm.descr=='常用职业'&&itm.isopen">
                    <div v-for="(itmtwo,index) in itm.itemTwo" :key="index">
                      <!-- <p style="margin: 0 10px;"></p> -->
                      <p
                        v-for="(itmThree,index) in itmtwo.itemThree"
                        @click="selectedItem(itmThree)"
                        :key="index"
                      >{{itmThree.level}}类 &nbsp;&nbsp;&nbsp; {{itmThree.descr}}</p>
                    </div>
                  </div>
                  <div class="line-bottom" v-show="itm.descr!='常用职业'&&itm.isopen">
                    <div v-for="(itmtwo,index) in itm.itemTwo" :key="index">
                      <!-- <p style="margin: 0 10px;"></p> -->
                      <p
                        v-for="(itmThree,index) in itmtwo.itemThree"
                        @click="selectedItem(itmThree)"
                        :key="index"
                      >{{itmThree.level}}类 &nbsp;&nbsp;&nbsp; {{itmThree.descr}}</p>
                    </div>
                  </div>
                  <div class="split-border"></div>
                </div>
                <div class="line-bottom" v-show="toggle.isSearch">
                  <p style="height:0px;padding:0px"></p>
                  <p
                    class="line-bottom-item"
                    v-for="(itm,index) in temp.occupationList.occupation.item"
                    :key="index"
                    @click="selectedItem(itm)"
                  >{{itm.descr}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>

<!--js-->
<script>
import { MessageBox } from "mint-ui";
import Headerbtns from "../../../src/components/policy/common/Header";
import occupationList from "../../../static/dict/occupation_sunlife.json";
import alert from "../policy/common/alert.vue";
import "../policy/css/base.css";

export default {
  name: "occupation_search",
  components: {
    Headerbtns,
    alert
  },
  props: ["value", "audioActive"],
  data() {
    return {
      aa: true,
      dict: {
        occupationList: occupationList
      },
      temp: {
        occupationList: {
          occupation: {
            item: []
          }
        }
      },
      toggle: {
        isSearch: false //是否为查询
      },
      searchParameter: ""
    };
  },
  beforeMount() {},
  mounted() {
    let htmlDOM = document.getElementsByTagName("html")[0];
    htmlDOM.style.fontSize = this.screenWidth / 20 + "px";
    this.media.header($(".details"));
    $(".details").css("height", this.media.container(this.screenHeight, 0));
    let listHeight =
      this.screenHeight -
      $(".header-title").outerHeight(true) -
      $(".search").outerHeight(true);
    $(".loaded-div").css("height", listHeight + "px");
  },
  updated() {
    console.log("发生变化了.......");
    let htmlDOM = document.getElementsByTagName("html")[0];
    htmlDOM.style.fontSize = this.screenWidth / 20 + "px";
    this.media.header($(".details"));
    $(".details").css("height", this.media.container(this.screenHeight, 0));
    let listHeight =
      this.screenHeight -
      $(".header-title").outerHeight(true) -
      $(".search").outerHeight(true);
    $(".loaded-div").css("height", listHeight + "px");
  },
  methods: {
    speechRec(index, count) {
      /*语音识别录入*/
      MAPlugin.hybridCallAction(
        "hybrid://MASpeech:401/invokeSpeech?0",
        callbackSucc => {
          if (index == 100) {
            this.searchParameter = callbackSucc.result;
          }
        },
        callbackFail => {}
      );
    },
    showMsg: function(msg) {
      if (msg != undefined && msg != "") {
        this.$refs.alert.showMOdal(msg);
      }
    },
    search: function() {
      //对传入的查询条件进行字符串过滤
      this.searchParameter = this.searchParameter.replace(/\s+/g, "");
      if (this.searchParameter != undefined && this.searchParameter != "") {
        //每次有查询条件时查询初始化次数组
        this.temp.occupationList.occupation.item = [];
        //大类
        var i;
        let itemOneList = this.dict.occupationList.occupation.itemOne;
        for (i = 0; i < itemOneList.length; i++) {
          //中类
          let itemTwoList = itemOneList[i].itemTwo;
          if (itemTwoList != null && itemTwoList.length > 0) {
            for (var j = 0; j < itemTwoList.length; j++) {
              //小类
              let itemThree = itemTwoList[j].itemThree;
              if (itemThree != null && itemThree.length > 0) {
                for (var k = 0; k < itemThree.length; k++) {
                  //字符包含输入字符时插入数组
                  if (itemThree[k].descr.indexOf(this.searchParameter) > -1) {
                    this.toggle.isSearch = true;
                    this.temp.occupationList.occupation.item.push(itemThree[k]);
                    console.log(this.temp.occupationList.occupation.item);
                  }
                }
              }
            }
          }
        }
        //检查数组是否存在内容不存在说明查询为空,予以提示
        let tempList = this.temp.occupationList.occupation.item;
        if (tempList == undefined || tempList.length == 0) {
          this.showMsg("未查询到相关职业");
        }
      } else {
        this.toggle.isSearch = false;
        this.temp.occupationList.occupation.item = [];
      }
      console.log(this.temp.occupationList.occupation.item);

      //去掉重复选取的数据
      for (
        var i = 0;
        i < this.temp.occupationList.occupation.item.length;
        i++
      ) {
        for (
          var j = i + 1;
          j < this.temp.occupationList.occupation.item.length;

        ) {
          if (
            this.temp.occupationList.occupation.item[i].code ==
            this.temp.occupationList.occupation.item[j].code
          ) {
            //通过id属性进行匹配；
            this.temp.occupationList.occupation.item.splice(j, 1); //去除重复的对象；
          } else {
            j++;
          }
        }
      }
      console.log(this.temp.occupationList.occupation.item);
    },
    //选中职业事件
    selectedItem(item) {
      let number = window.localStorage.getItem("customerType");
      this.value.isopen = !this.value.isopen;
      this.value.occItem = item;
      this.value.speechRecVal = "";
      this.$emit("selected", item, number);
      this.searchParameter = "";
    },
    //取消选中事件
    cancel: function() {
      this.value.isopen = !this.value.isopen;
      this.value.occItem = undefined;
      this.value.speechRecVal = "";
      console.log("取消选择职业===>", this.value);
    }
  },
  watch: {
    searchParameter(old) {
      this.search();
    },
    value: {
      handler(val) {
        if (val.speechRecVal != "") {
          this.searchParameter = val.speechRecVal;
        } else {
          this.searchParameter = "";
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped type="text/css">
.main-contents {
  bottom: 0 !important;
}

.logo {
  float: right;
  vertical-align: middle;
  margin-top: 6px;
  color: #fdaa00;
}

.lh {
  line-height: 20px;
}
/*列表*/

ul > li > div > p:nth-child(1) {
  color: #ffac00;
  padding: 10px 17px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  border-bottom: 1px solid #efefef;
}
.line-bottoms > div {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.line-bottoms p {
  margin: 5px 10px;
  padding: 0 10px;
  line-height: 30px;
  height: 30px;
  background: rgba(248, 248, 248, 1);
  border: 1px solid rgba(218, 218, 218, 1);
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.line-bottom p {
  padding: 10px 17px;
  border-bottom: 1px solid #efefef;
  line-height: 20px;
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
    padding: 8px 0;
    input {
      width: 100%;
      padding-left: 6%;
      line-height: 33px;
      height: 33px;
      border-radius: 33px;
      margin: 0 10px;
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
.split-border {
  height: 9px;
  background: rgba(245, 245, 245, 1);
}
.line-bottom-item {
  background: rgba(248, 248, 248, 1);
  border: 2px solid rgba(218, 218, 218, 1);
  border-radius: 6px;
}
</style>
