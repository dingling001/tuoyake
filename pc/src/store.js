import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginState: false,
    hotState: false,
    refreshState: false
  },
  mutations: {
    setLoginState: state => (state.loginState = true),
    closeLoginState: state => (state.loginState = false),
    setHotState: state => (state.hotState = true),
    closeHotState: state => (state.hotState = false),
    reFresh: state => (state.refreshState = true)
  }
});
