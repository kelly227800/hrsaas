import { login, getUserInfoApi, getUserDetailsApi } from "@/api/user";

export default {
  namespaced: true,
  state: {
    token: "",
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getToken(context,payload) {
      // 发送请求得来的
      const data = await login(payload)
      console.log(data);
      context.commit('setToken', data);
    },
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      console.log(userBaseInfo)
      const userInfo = await getUserDetailsApi(userBaseInfo.userId)
      context.commit('setUserInfo', {...userBaseInfo, ...userInfo })
    },
  },
};
