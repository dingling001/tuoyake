import axios from "axios"; // 注意先安装哦
import qs from "qs"; // 序列化请求数据，视服务端的要求
import config from "./config.js"; // 导入入默认配置
import {Toast} from "vant";

// if(process.env.NODE_ENV === 'development') {
//     // 开发环境
//     // config.baseURL = "http://admin.tuoyake.com";
// } else if(process.env.NODE_ENV === 'production') {
//     // 生产环境
//     config.baseURL = "http://admin.tuoyake.com";   //这里是线上api请求地址
// }
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
// instance.interceptors.response.use(
//     function (response) {
//         console.log(response)
//         if (!response) return
//         if (response.data.status == 401) {
//             Toast({
//                 message: "登录已过期，请重新登录！",
//                 position: "center",
//                 duration: 3000
//             });
//             localStorage.removeItem("user_twap");
//             // 暂时缓存地址，授权成功后回跳这个地址
//             // localStorage.url = window.location.href;
//             // window.location.href = window.location.origin + "#/login";
//         } else {
//             //     console.log(response)
//             return response.data;
//         }
//     },
//     function (err) {
//         console.log(err,'~~~~~erro')
//         // if (!err) {
//         //     localStorage.showneterror = true;
//         //     // window.location.reload();
//         //     return
//         // }
//         console.log(typeof err)
//         if (JSON.stringify(err).indexOf('timeout') > -1) {
//             console.log('网络超时了')
//             localStorage.showneterror = true;
//             localStorage.removeItem('user_twap');
//             // window.location.reload();
//             return
//         }
//         if (!err.status) {
//             console.log('网络错误');
//             localStorage.showneterror = true;
//             window.location.reload();
//             return
//         }
//         switch (err.response.status) {
//             case 400:
//                 err.message = "请求错误";
//                 break;
//             case 401:
//                 err.message = "请登录";
//                 break;
//             case 403:
//                 err.message = "拒绝访问";
//                 break;
//             case 404:
//                 err.message = `请求地址出错: ${err.response.config.url}`;
//                 break;
//             case 408:
//                 err.message = "请求超时";
//                 break;
//             case 500:
//                 err.message = "服务器内部错误";
//                 break;
//             case 501:
//                 err.message = "服务未实现";
//                 break;
//             case 502:
//                 err.message = "网关错误";
//                 break;
//             case 503:
//                 Toast({
//                     message: "太热情了，请稍后再来吧！",
//                     position: "center",
//                     duration: 3000
//                 });
//                 err.message = "服务不可用";
//                 break;
//             case 504:
//                 err.message = "网关超时";
//                 break;
//             case 505:
//                 err.message = "HTTP版本不受支持";
//                 break;
//             default:
//                 err.message = '网络错误'
//         }
//
//         err.code = err.response.status;
//         return Promise.reject(err);
//     }
// );
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
instance.interceptors.response.use(
    function (response) {
        console.log(response)
        if (!response) return
        if (response.data.status == 401) {
            Toast({
                message: "登录已过期，请重新登录！",
                position: "center",
                duration: 3000
            });
            localStorage.removeItem("user_twap");
            // 暂时缓存地址，授权成功后回跳这个地址
            // localStorage.url = window.location.href;
            // window.location.href = window.location.origin + "#/login";
        } else {
            //     console.log(response)
            return response.data;
        }
    }, function axiosRetryInterceptor(err) {
        var config = err.config;
        console.log(config)
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) return Promise.reject(err);
        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0;
        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
            // Reject with the error
            return Promise.reject(err);
        }
        // Increase the retry count
        config.__retryCount += 1;
        // Create new promise to handle exponential backoff
        var backoff = new Promise(function (resolve) {
            setTimeout(function () {
                console.log(config.__retryCount)
                resolve();
            }, config.retryDelay || 1);
        });
        // Return the promise in which recalls axios to retry the request
        return backoff.then(function () {
            return instance(config);
        });
    });

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
                    'Accept': 'application/json',
                    'token': localStorage.user_twap
                }
            });
        } else if (type === 'FORMDATA') {
            const formData = new FormData();

            Object.entries(data).forEach((item) => {
                formData.append(item[0], item[1]);
            });

            options = Object.assign(options, {
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': localStorage.user_twap,
                    Accept: 'application/json'
                },
            });
        }
        instance(options)
            .then(function (res) {
                console.log(res);
                localStorage.removeItem('showneterror');
                resolve(res);
                return false;
            })
            .catch(function (err) {
                console.log(err, '++++++err')
                if (JSON.stringify(err).indexOf('timeout') > -1) {
                    Toast({
                        message: '网络小短腿跑不动了',
                        position: "center",
                        duration: 3000
                    });
                    localStorage.setItem('showneterror', true);
                   setTimeout(function () {
                       window.location.reload();
                   },1000);
                    return
                }
                Toast({
                    message: err.message,
                    position: "center",
                    duration: 3000
                });
                if (err.code === 401) {
                    localStorage.removeItem("user_twap");
                    // 暂时缓存地址，授权成功后回跳这个地址
                    localStorage.url = window.location.href;
                    window.location.href = window.location.origin + "#/login";
                }
                // console.log(err.code);
            });
    });
};
