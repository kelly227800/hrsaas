import { login } from "@/api/user";

export default {
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async getToken(context,payload) {
      // 发送请求得来的
      const res = await login(payload)
      console.log(res);
      context.commit('setToken', res);
    }
  },
};
