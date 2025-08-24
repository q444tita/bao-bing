import { createApp } from 'vue'
import './style.css'
// 导入我们自定义的图标配置
import '@/utils/icons'
// 导入移动端调试工具
// import mobileDebug from '@/utils/mobile-debug'

// // 调试日志：检查调试工具是否成功导入
// console.log('调试工具导入结果:', mobileDebug);

// // 将调试工具绑定到window对象，方便全局访问
// window.mobileDebug = mobileDebug;

// // 启用移动端调试
// console.log('尝试启用调试工具...');
// mobileDebug.enable();
// console.log('调试工具启用状态:', mobileDebug.isActive);

// console.log('应用开始加载...')
// 按需导入Font Awesome组件
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 按需导入Element Plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'

const app = createApp(App)
// 先注册组件
app.component('font-awesome-icon', FontAwesomeIcon);
// 再使用插件
app.use(ElementPlus, { locale: zhCn });

// 添加错误处理
// app.config.errorHandler = (err, instance, info) => {
//   console.error('应用错误:', err)
//   console.error('错误信息:', info)

//   // 显示友好的错误提示
//   if (instance) {
//     instance.$root.$emit('error', { message: '应用发生错误', detail: err.message })
//   }
// }

app.mount('#app');

// console.log('应用已挂载到#app-container元素')

// // 加载调试测试脚本
// import('./utils/debug-test-script.js').catch(err => {
//   console.error('加载调试测试脚本失败:', err);
// })


