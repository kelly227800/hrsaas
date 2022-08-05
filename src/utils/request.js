// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // 创建了一个新的axios实例
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // 超时时间
// })
// // axios的请求拦截器
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )
// // 响应拦截器
// service.interceptors.response.use(
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
// export default service

import axios from "axios";
import store from "@/store";
import router from "@/router";
import { Message } from "element-ui";
import { getTokenTime } from "./auth";
function isTimeOUt() {
  // 如果token存在 注入token
  const currentTime = Date.now();
  const tokenTime = getTokenTime();
  const timeout = 2 * 60 * 1000;
  console.log(currentTime - tokenTime > timeout);
  return currentTime - tokenTime > timeout;
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
}); // 创建一个axios的实例
service.interceptors.request.use(
  // 当前的请求的配置
  async (config) => {
    // console.log('jin');
    // 在这个位置需要统一的去注入token
    if (store.state.user.token) {
      // 如果token存在 注入token
      if (isTimeOUt()) {
        // console.log("jin");
        // 判断token是否过期 过期跳到登录页
        await store.dispatch("user/logout");
        router.push("/login");
        return Promise.reject(new Error("登录过期"));
      } else {
        // token没有过期再携带
        // console.log("token没过期");
        config.headers["Authorization"] = `Bearer ${store.state.user.token}`;
      }
    }
    return config; // 必须返回配置
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (res) => {
    const { success, data, message } = res.data;
    if (success) {
      return data;
    }
    Message.error(message);
    return Promise.reject(new Error(message));
  },
  async function (error) {
    if (error?.response?.status === 401) {
      Message.error("登录过期");
      await store.dispatch("user/logout");
      router.push("/login");
    } else {
      Message.error(error.message);
    }
    return Promise.reject(error);
    // 对响应错误做点什么
  }
); // 响应拦截器

export default service; // 导出axios实例
