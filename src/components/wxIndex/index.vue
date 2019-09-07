<template>
  <div class="content-wraaper">
    <div class="header-img">
      <img src="static/img/wxIndex/wx_index_1.png" alt />
    </div>
    <section class="content-box">
      <div class="content-module">
        <ul>
          <li @click="goLogin('toubao')">
            <div>
              <p>
                <img src="static/img/wxIndex/wx_index_3.png" alt />
              </p>
              <span>在线投保</span>
            </div>
          </li>
          <li @click="go('/proposal/prolist')">
            <div>
              <p>
                <img src="static/img/wxIndex/wx_index_6.png" alt />
              </p>
              <span>建议书</span>
            </div>
          </li>
          <li @click="goLogin('progress')">
            <div>
              <p>
                <img src="static/img/wxIndex/wx_index_4.png" alt />
              </p>
              <span>投保进度</span>
            </div>
          </li>
          <li @click="goLogin('todo')">
            <div>
              <p>
                <img src="static/img/wxIndex/wx_index_2.png" alt />
              </p>
              <span>待办事项</span>
            </div>
          </li>
          <li @click="goLogin('moreAndMore')">
            <div>
              <p>
                <img src="static/img/wxIndex/wx_index_5.png" alt />
              </p>
              <span>更多服务</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <footer class="container">
      <Button :isRemoveBind="RemoveBind" 
      @removeBindEvent="removeBind"
      @login="go('/logins/login')">
      </Button>
    </footer>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "wx-index",
  props: {},
  data() {
    return {
      RemoveBind: false,
      isLogin: false
    };
  },
  mounted() {},
  methods: {
    show(msg) {
      Toast({
        message: msg,
        duration: 1000
      });
    },
    goLogin(type) {
      if (this.isLogin) {
      } else {
        this.show("此模块需要登录后使用");
      }
    },
    removeBind() {
      alert_n22.confirm("提示", "是否解除微信绑定", "确定", "", flag => {});
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.content-wraaper {
  position: relative;
}
.header-img {
  width: 100%;
  img {
    width: 100%;
  }
}
.content-box {
  position: relative;
  z-index: 100;
  margin-top: -60px;
  padding: 0 15px;
}
.content-module {
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 12px 9px 3px rgba(130, 84, 11, 0.1);
    border-radius: 10px;
    flex-wrap: wrap;
    box-sizing: border-box;
    li {
      width: 33%;
      padding: 5% 1% 0 1%;
      box-sizing: border-box;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20% 0;
        p {
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          height: 40px;
          img {
            width: 50%;
          }
        }
        span {
          font-size: 16px;
          font-weight: 500;
          color: #333;
          margin-top: 15%;
        }
      }
    }
  }
}
.container {
  position: fixed;
  width: 90%;
  height: 50px;
  margin-left: 5%;
  line-height: 50px;
  background: #ffd166;
  bottom: 0;
  color: #fff;
  font-size: 16px;
  text-align: center;
  border-radius: 3px;
  z-index: 1000;
}
</style>