window.globalConfig = {
  rootUrl: "http://mitst.sunlife-everbright.com:8010/com.ifp.ipartner/interfaceChannel?sign=",
  // rootUrl:"http://mit.sunlife-everbright.com:8010/com.ifp.ipartner/interfaceChannel?sign=",
  wxUrl:'http://rh.keypowerplus.com/', //微信安全域名
  isDebug: true, //是否开启接口debug模式
  plat: 'web', //WEB、NATIVE
  os: (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))?'ios':'android', //操作系统 ios:苹果操作系统 android:安卓系统
  timeout: 1000 * 180,//默认是3000毫秒
  version: '11.1',
  loginType: 'extraExtCheck', //登录方式--国泰项目传extraExtCheck
  from: 'PAD', //header--from
  transfer: 'MOAPPINTERFACE2017#@!%88',//状元
  comId: 'MOO2O20171225'//状元
}

//引入更改的mint-ui控件样式
import '../static/css/mint-ui.scss'
import Vue from 'vue'
import App from './components/common/App'
import router from './router'
import FastClick from 'fastclick'
import store from './vuex/store'
import 'mint-ui/lib/style.css'
import utils from './utils'
window.utils = utils
import {mapGetters,mapMutations} from 'vuex'
import Media from './utils/media.js'
Vue.prototype.media = Media


// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import Calendar from 'vue2-datepick'
import './filters/globalFilters.js'
import './directive/globalDirective.js'
import '../static/lib/security/DES3.js'
import '../static/lib/security/md5-min.js'
import '../static/lib/security/base64.js'
import '../static/lib/finger/alloy_finger.js'
import '../static/lib/finger/alloy_finger.vue.js'
/*自写的组件，可能全局会用到*/
import Loading from './components/common/Loading.vue'
import {
  Actionsheet,
  Button,
  Cell,
  CellSwipe,
  Checklist,
  Field,
  Header,
  IndexList,
  IndexSection,
  Loadmore,
  Popup,
  Progress,
  Picker,
  Radio,
  Search,
  Spinner,
  Swipe,
  SwipeItem,
  Switch,
  Tabbar,
  TabContainer,
  TabContainerItem,
  TabItem,
  MessageBox,
  DatetimePicker,
  Range,
  Navbar,
  Lazyload,
  InfiniteScroll
} from 'mint-ui'
import VueClipboard from 'vue-clipboard2'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueClipboard)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(CellSwipe.name, CellSwipe)
Vue.component(Checklist.name, Checklist)
Vue.component(Field.name, Field)
Vue.component(Header.name, Header)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Popup.name, Popup)
Vue.component(Progress.name, Progress)
Vue.component(Radio.name, Radio)
Vue.component(Search.name, Search)
Vue.component(Spinner.name, Spinner)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Switch.name, Switch)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(TabItem.name, TabItem)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Range.name, Range)
Vue.component(Loading.name, Loading)
Vue.component(Navbar.name, Navbar)
Vue.component(Picker.name, Picker)
// Vue.use(Lazyload,{
//   loading:require('../static/img/common/default.png')
// });
Vue.use(Lazyload)
Vue.use(InfiniteScroll)


Vue.config.productionTip = false


Vue.mixin({
  data() {
    return {
      os: globalConfig.os,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    back() {
      router.back()
    },
    replacePage(){
    	router.replace({
	      path: '/used/empty',
	      query: { redirect: router.currentRoute.fullPath },
			})
    },
    product(code){
//    for(var i in product.item){
//      if(product.item[i].code == code){
//        return product.item[i]
//      }
//    }
    },
    ...mapMutations({
      toggleHeader: 'TOGGLE_HEADER',
      toggleFooter: 'TOGGLE_FOOTER',
      toggleLoading: 'TOGGLE_LOADING'
    })
  }
})
//解决移动端点击事件300毫秒延迟的问题
FastClick.attach(document.body)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

/*window.document.addEventListener('deviceready', function () {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
  })
}, false)*/
Vue.use(Calendar);
document.addEventListener('deviceready', function () {
  if(window.StatusBar){
    window.StatusBar.styleDefault()
  }
  if(window.MobileAccessibility){
    window.MobileAccessibility.usePreferredTextZoom(false)
  }
})
Vue.directive('preventReClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
})