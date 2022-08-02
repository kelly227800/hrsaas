// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
import router from './router'
import store from './store'
// 路由(全局)前置守卫
// 会在所有路由进入之前触发
// to: 去哪里的路由信息
// from: 来自于哪个路由的信息
// next: 是否进入
const whiteList = ['/login','/404']
router.beforeEach((to, from, next) => {
    const token = store.state.user.token
    if(token) {
        // 1.登录
        // 是否进入登录页
        if(!store.state.user.userInfo.userId) {
            store.dispatch('user/getUserInfo')
        }
        if(to.path === '/login') {
            // 1.1 是 跳到首页
            next('/')
        } else {
            // 1.2 不是 直接进入
            next()
        }
    } else {
        // 2.未登录
        // 访问的是否在白名单（未登录也能访问的页面）
        const isIncludes = whiteList.includes(to.path)
        if (isIncludes) {
            // 2.1 在白名单 放行
            next()
        } else {
            // 2.2 不在白名单(不登录不能访问) 跳到登录页
            next('/login')
        }
    }
  })
