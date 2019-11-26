/**
 * 自动化处理文件：自动引入接口的核心文件
 */
const merge = require('webpack-merge')
const files = require.context('.', true, /\.js$/)

let configInterface;
/**
 * inject interface
 */
files.keys().forEach(key => {
  if (key === './index.js') return;
  const filesConfig = files(key)
  configInterface = merge({}, configInterface, filesConfig.default || filesConfig) // 读取出文件中的default模块
})
export default configInterface
