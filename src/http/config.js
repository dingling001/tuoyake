/**
 * 默认配置
 */
export default {
  // 基础url前缀
  baseURL: "",
  // 请求头信息
  // headers: {
  //   // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //
  // },
  headers: {
    'Content-Type': "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
  },

  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  // 返回数据类型
  responseType: "json",

};
