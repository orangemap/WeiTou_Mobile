<template>
  <div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'comprehensive',
  data() {
    return {
      transitionName: 'slide-left',
    }
  }
}
</script>
