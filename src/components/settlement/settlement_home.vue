<template>
  <div class="sel">
    <Headerbtns title="理赔" class="sel-head">
      <div slot="left" class="back" @click="BackHome">
        <i class="fa fa-angle-left" ></i>
      </div>
      <div slot="right" class="right" @click="goToClaims">
        <img :src="doubtImg" alt style="width:1.2rem;height:1.2rem;position: relative;top:6px;right:7px;" />
      </div>
    </Headerbtns>
    <div class="main-contents">
      <img :src="homeImg" alt style="height:14rem;width:100%" />
      <div v-for="item in HomeList" class="main-contents-list flex" @click="go(item.link)">
        <div style="width:10rem;display: flex;align-items: center;">
          <img :src="item.url" />
          <p>&nbsp;&nbsp;{{item.text}}</p>
        </div>
        <img :src="homeRtImg" />
      </div>
    </div>
  </div>
</template>

<script>
import Headerbtns from '@/components/policy/common/Header'
import '../policy/css/base.css'
export default {
  components: { Headerbtns },
  data() {
    return {
      imageSrc: [],
      doubtImg: "static/img/settlement/doubt.png",
      homeImg: "static/img/settlement/home.png",
      homeRtImg: "static/img/settlement/home_right.png",
      HomeList: [
        {
          key: "1",
          text: "自助报案",
          link: "/settlement_user/0",
          url: "static/img/settlement/home_1.png"
        },
        {
          key: "2",
          text: "自助理赔",
          link: "/settlement_notice/start/new",
          url: "static/img/settlement/home_2.png"
        },
        {
          key: "3",
          text: "报案记录查询",
          link: "/ReportRecord",
          url: "static/img/settlement/home_3.png"
        },
        {
          key: "4",
          text: "理赔记录查询",
          link: "/pReportRecord",
          url: "static/img/settlement/home_4.png"
        }
      ]
    };
  },
  mounted() {
    let htmlDOM = document.getElementsByTagName("html")[0];
    htmlDOM.style.fontSize = this.screenWidth / 20 + "px";
    this.media.header($(".main-contents"));
  },
  methods: {
    BackHome() {
      let channel = utils.cache.get("personsal").channel;
      if (channel == "02") {
        this.$router.push("/comprehensiveYinbao/comprehensiveInfo");
      } else if (channel == "06") {
        this.$router.push("/comprehensiveXuqi/comprehensiveInfo");
      } else {
        this.$router.push("/comprehensiveGexian/comprehensiveInfo");
      }
    },
    goToClaims() {
      this.$router.push("/claims/serviceGuide");
    }
  },
  beforeDestroy() {
    let htmlDOM = document.getElementsByTagName("html")[0];
    htmlDOM.style.fontSize = "";
  }
};
</script>

<style>
.sel-head .back {
 /* padding-top: 3px; */
}
.main-contents .flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-contents-list {
  padding: 5px 1rem;
}
.main-contents-list {
  height: 2rem;
  border-bottom: 2px dotted #ccc;
}
.main-contents-list > div > img:first-child {
  width: 2rem;
  height: 2rem;
}
.main-contents-list > div > p {
  font-size: 0.9rem;
}
.main-contents-list > img {
  width: 1rem;
  height: 1rem;
}
.fa {
  color: #fdb92c;
}

</style>