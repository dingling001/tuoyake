import axios from "axios"; // 注意先安装哦
import qs from "qs"; // 序列化请求数据，视服务端的要求
import config from "./config.js"; // 导入入默认配置
import {Toast} from "vant";

let cancel,
    promiseArr = {};
const CancelToken = axios.CancelToken;
//配置全局取消数组
window.__axiosPromiseArr = [];

const instance = axios.create(config);
// 去掉请求控制拦截
// instance.interceptors.request.use(
//   function(config) {
//     if (promiseArr[config.url]) {
//       promiseArr[config.url]("操作取消");
//       promiseArr[config.url] = cancel;
//     } else {
//       promiseArr[config.url] = cancel;
//     }
//     return config;
//   },
//   function(error) {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
    function (response) {
        if (response.data.status == 405) {
            Toast({
                message: "登录已过期，请重新登录！",
                position: "center",
                duration: 3000
            });
            localStorage.removeItem("app_token");
            // 暂时缓存地址，授权成功后回跳这个地址
            localStorage.url = window.location.href;
            window.location.href = window.location.origin + "/login";
        } else {
        //     console.log(response)
            return response.data;
        }
    },
    function (err) {
        // switch (err.response.status) {
        //     case 400:
        //         err.message = "请求错误";
        //         break;
        //     case 401:
        //         err.message = "未授权，请登录";
        //         break;
        //     case 403:
        //         err.message = "拒绝访问";
        //         break;
        //     case 404:
        //         err.message = `请求地址出错: ${err.response.config.url}`;
        //         break;
        //     case 408:
        //         err.message = "请求超时";
        //         break;
        //     case 500:
        //         err.message = "服务器内部错误";
        //         break;
        //     case 501:
        //         err.message = "服务未实现";
        //         break;
        //     case 502:
        //         err.message = "网关错误";
        //         break;
        //     case 503:
        //         Toast({
        //             message: "太热情了，请稍后再来吧！",
        //             position: "center",
        //             duration: 3000
        //         });
        //         err.message = "服务不可用";
        //         break;
        //     case 504:
        //         err.message = "网关超时";
        //         break;
        //     case 505:
        //         err.message = "HTTP版本不受支持";
        //         break;
        //     default:
        // }
        return Promise.reject(err);
    }
);

export default function (url = "", data = {}, type = "GET", isRepeat = true) {
    let options = {
        url,
        cancelToken: new CancelToken(c => {
            if (!isRepeat) {
                cancel = c;
                window.__axiosPromiseArr.push({cancel}); //放入一个全局数组，以便之后在router中统一取消
            }
        })
    };
    type = type.toUpperCase();
    return new Promise(function (resolve, reject) {
        if (type === "GET") {
            options = Object.assign(options, {
                method: "get",
                params: data
            });
        } else if (type === "POST") {
            options = Object.assign(options, {
                method: "post",
                data: qs.stringify(data),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                    'Accept': 'application/json'
                }
            });
        }
        instance(options)
            .then(function (res) {
                // console.log(res);
                resolve(res);
                return false;
            })
            .catch(function (err) {
                console.log(err)
                Toast({
                    message: "请刷新一下试试",
                    position: "center",
                    duration: 3000
                });
                console.log("网络异常");
            });
    });
};
