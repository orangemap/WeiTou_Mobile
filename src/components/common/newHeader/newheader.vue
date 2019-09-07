<template>
  <div class="v-header">
    <ul class="new-header-title">
      <li class="header-btn">
        <slot name="left"></slot>
      </li>
      <li class="header-title">
        {{title}}
        <slot name="title"></slot>
      </li>
      <li class="header-btn">
        <slot name="right"></slot>
      </li>
    </ul>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "v-header",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  mounted() {
    var _header = $(".v-header");
    var _ul = $(".new-header-title");
    var _maincontents=$(".main-contents")
    var _loaded=$('.search')
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
      _header.css({
        "padding-top": "20px",
        height: "68px"
      });
      _ul.css({
        "line-height": "48px"
      });
      _maincontents.css({
        top: "68px"
      });
      if (screen.height == 812 && screen.width == 375) {
        _header.css({
          "padding-top": "44px",
          height: "92px",
          "line-height": "92px"
        });
        _ul.css({
          "line-height": "46px"
        });
        _maincontents.css({
          top: "92px"
        });
      }
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.v-header {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 333;
  box-sizing: border-box;
  ul {
    height: 48px;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      line-height: 48px;
    }
    li:nth-child(2) {
      font-weight: bold;
      font-size: 20px;
      color: #333;
    }
  }
  ul + div {
    height: 2px;
    background: #efefef;
  }
}
.header-btn {
  min-width: 34px;
}
.fa-angle-left {
  position: relative;
  left: 15px;
  top: 5px;
  font-size: 30px;
}
.right>img{
  position: relative;
  top:-10px;
}
</style>