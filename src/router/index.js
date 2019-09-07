import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import home from './home'
import wxIndex from './wx_Index'
import proposal from './proposal'
import backlog from './backlog'
import policy_list from './policy'
import test from './test'
import logins from './logins'
import down from './down'
import service from './service'
import productManual from './productManual'
import personal from './personal'
import comprehensive from './comprehensive'
import comprehensiveGexian from './comprehensiveGexian'
import comprehensiveXuqi from './comprehensiveXuqi'
import used from './used'
import claims from './claims'
import preservation from './preservation'
import settlement from './settlement'
import customerScore from './customerScore'
import repeatedViste from './repeatedViste'
import policyTrack from './policyTrack'
import ambassador from './ambassador'
import customerManage from './customerManage'
import comprehensiveFinance from './comprehensiveFinance'
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/wxIndex'
    },
    ...wxIndex,
    ...logins,
    ...home,
    ...backlog,
    ...proposal,
    ...policy_list,
    ...test,
    ...down,
    ...service,
    ...productManual,
    ...personal,
    ...comprehensive,
    ...comprehensiveGexian,
    ...comprehensiveXuqi,
    ...used,
    ...claims,
    ...preservation,
  ...settlement,
    ...customerScore,
    ...repeatedViste,
    ...policyTrack,
    ...ambassador,
  ...customerManage,
  ...comprehensiveFinance
  ]
})
router.beforeEach((to, from, next) => {
	if(to.params.planId!=undefined){
		let step = utils.cache.get('step_'+to.params.planId)
		if(step!=undefined&&step!=''){
			if(to.meta.step > step){
				utils.cache.set('step_'+to.params.planId,to.meta.step)
			}
		}else{
			utils.cache.set('step_'+to.params.planId,to.meta.step)
		}
	}
    if (to.name == 'login' && from.name == null) {
        console.log('进入登录页面')
        console.log(window.localStorage.getItem('HAVENEWMSG'))
        console.log(window.localStorage.getItem('personsal'))
        if (window.localStorage.getItem('HAVENEWMSG') != undefined && window.localStorage.getItem('personsal') != undefined) {
            next('/personal/personalMessage/personalMessageKH')
            window.localStorage.removeItem('HAVENEWMSG')
        }
    }
    store.commit('TOGGLE_HEADER', to.meta.hasHeader != false)
    store.commit('TOGGLE_FOOTER', to.meta.hasFooter != false)
    store.commit('TOGGLE_TABS', to.meta.hasTabs == true)
    if (to.meta.login != false && !store.state.common.user) {
        store.commit('TOGGLE_TOAST', {
            toast: true,
            toastMsg: '请先登录！'
        })
        next('/page/login')
    } else {
        next()
    }
})

export default router
