// #ifdef VUE3
import { createApp } from 'vue'
import App from './App.vue'
import { $http } from '@escook/request-miniprogram'

// 配置 HTTP 请求库
const app = createApp(App)

uni.$http = $http
$http.baseUrl = "https://www.uinav.com"

// 配置请求前和请求后的拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: "数据加载中"
  })
}

$http.afterRequest = function () {
  uni.hideLoading()
}

// 封装弹窗方法
uni.$showMsg = function(title="数据请求失败",duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}


// 挂载 Vue 应用
app.config.productionTip = false
app.mount('#app')
// #endif
