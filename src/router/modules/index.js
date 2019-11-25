/**
 * 自动化处理文件：自动引入路由的核心文件
 */
const files = require.context('.', true, /\.js$/)

let configRouters = []
/**
 * inject routers
 */
files.keys().forEach(key => {
  if (key === './index.js') return
  configRouters = configRouters.concat(files(key).default) // 读取出文件中的default模块
})
export default configRouters 