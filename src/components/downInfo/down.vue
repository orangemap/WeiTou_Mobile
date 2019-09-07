<template>
  <div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'down',
  data() {
    return {
      transitionName: 'slide-left',
    }
  }
}
</script>
