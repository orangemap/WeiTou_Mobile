import utils from '../../utils'

const typeArrays = [
  'LOGIN',
  'LOGOUT',
  'TOGGLE_TOAST',
  'TOGGLE_HEADER',
  'TOGGLE_FOOTER',
  'TOGGLE_TABS',
  'TOGGLE_LOADING',
  'TOGGLE_MESSAGEBOX',
  'SHOWLOADING',
  'HIDELOADING',
  'SHOWTIMEOUT'
]

const types = {}

for (let type of typeArrays) {
  types[type] = type
}

const state = {
  ui: {
    hasHeader: false,
    hasFooter: true,
    fixFooter: true,
    hasTabs: false,
    loading: false,
  },
  toast: false,
  toastMsg:'',
	messageBox:false,
	messageBoxMsg:'',
	messageBoxImg:'',
	messageBoxTitle:'',
  showLoading:false,
  showTimeout:false,
	user: utils.cache.get('user'),
	userSetting: utils.cache.get('userSetting')
}

const getters = {
  hasHeader() {
    return state.ui.hasHeader
  },
  hasFooter() {
    return state.ui.hasFooter
  },
  fixFooter() {
    return state.ui.fixFooter
  },
  hasTabs() {
    return state.ui.hasTabs
  },
  showLoading() {
    return state.showLoading
  },
  showTimeout(){
    return state.showTimeout
  },
  MessageBox (){
    return state.messageBox
  }
}

const actions = {
  add({
    commit,
    state
  }, product) {
    commit(types.ADD_PRODUCT, product)
  },
  toggleTab({
    commit,
    state
  }, show) {
    alert('toggleTab')
    commit(types.TOGGLE_TAB, show)
  },
  showloader:({ commit }) => {  
    commit( types.SHOWLOADING )  
  },  
  hideloader:({ commit }) => {  
    commit( types.HIDELOADING )  
  }, 
  timeoutloader:({commit}) => {
    commit( types.SHOWTIMEOUT )  
  }
}

const mutations = {
  [types.SHOWLOADING](state) {
    state.showLoading = true
    // utils.ui.modal.afterOpen()
  },
  [types.HIDELOADING](state) {
    state.showLoading = false
    // utils.ui.modal.beforeClose()
  },
  [types.SHOWTIMEOUT](state) {
    state.showLoading = true
  },
  [types.LOGIN](state, data) {
    utils.cache.set('user', data.user)
    utils.cache.set('userSetting', data.userSetting)
    state.user = data.user
    state.userSetting = data.userSetting
  },
  [types.LOGOUT](state) {
    utils.cache.clear()
    state.user = null
    state.userSetting = null
  },
  [types.TOGGLE_HEADER](state, flag) {
    state.ui.hasHeader = flag
  },
  [types.TOGGLE_FOOTER](state, flag) {
    state.ui.hasFooter = flag
  },
  [types.TOGGLE_TABS](state, flag) {
    state.ui.hasTabs = flag
  },
  [types.TOGGLE_MESSAGEBOX](state, params) {
    state.messageBox = params.messageBox
  	state.messageBoxMsg = params.messageBoxMsg
  	state.messageBoxImg = params.messageBoxImg
  	state.messageBoxTitle = params.messageBoxTitle
  },
  [types.TOGGLE_TOAST](state, params) {
    state.toast = params.toast
    state.toastMsg = params.toastMsg
    state.toastImg = params.toastImg || ''
    if (state.toast) {
      setTimeout(() => {
        state.toast = false
      }, 3000)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}