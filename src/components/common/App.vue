<template>
  <div :class="{'platform-ios':os == 'ios', 'platform-android':os == 'android'}">
    <transition name="slide-y" mode="out-in">
      <mt-header v-show="hasHeader" style="position:absolute;top:0;width:100%;box-shadow:0 0 8px #26a2ff;"></mt-header>
    </transition>
    <transition name="slide-fade" mode="out-in">
      <keep-alive include="home">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import loading from '../common/Loading.vue'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'hasHeader',
      'hasTabs',
      'hasFooter',
      'fixFooter',
      'loading',
      'showLoading'
    ])
  },
  components:{loading}
}
</script>
<style>
.slide-fade-enter-active,.slide-y-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active,.slide-y-leave-active {
  transition: all .25s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-y-enter, .slide-y-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
.slide-y-leave-active+div>header{
  background-color:transparent;
}
</style>