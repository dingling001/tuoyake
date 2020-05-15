import axios from "axios"; // 注意先安装哦
import qs from "qs"; // 序列化请求数据，视服务端的要求
import config from "./config.js"; // 导入入默认配置
import {Toast} from "vant";

if(process.env.NODE_ENV === 'development') {
    // 开发环境
    config.baseURL = "";
} else if(process.env.NODE_ENV === 'production') {
    // 生产环境
    config.baseURL = "";   //这里是线上api请求地址
}
let cancel;
const CancelToken = axios.CancelToken;
//配置全局取消数组
window.__axiosPromiseArr = [];
const instance = axios.create(config);
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
instance.interceptors.response.use(
    function (response) {
        // console.log(response)
        if (!response) {
            return false
        } else {
            //     console.log(response)
            return response.data;
        }
    }, function axiosRetryInterceptor(err) {
        // console.log(JSON.stringify(err.response.data.code))
        var errcode = err.code || err.response.data.code;
        console.log(errcode)
        switch (errcode) {
            case 401:
                localStorage.removeItem("user_twap");
                // 暂时缓存地址，授权成功后回跳这个地址
                localStorage.url = window.location.href;
                window.location.href = window.location.origin + "#/login";
                return Promise.reject(err.response.data);
            case 'ECONNABORTED':
                localStorage.setItem('showneterror', true);
                if (localStorage.count == 0) {
                    window.location.reload();
                    localStorage.setItem('count', 1);
                }
                break;
            case 404:
                Toast({
                    message: '网络错误',
                    position: "center",
                    duration: 3000
                });
                return Promise.reject(err);
            default:
                Toast({
                    message: '网络错误',
                    position: "center",
                    duration: 3000
                });
                break;
        }
        var config = err.config;
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
                // console.log(config.__retryCount)
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
                // console.log(res);
                localStorage.removeItem('showneterror');
                resolve(res);
                return false;
            })
            .catch(function (err) {
                console.log(err)
                if (err == 'ECONNABORTED') {

                }
            });
    });
};
