const ls = window.localStorage;
const ss = window.sessionStorage;

export const Cookie = {
    get(key) {
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].trim().split('=');
            if (arr2[0] == key) {
                return arr2[1]
            }
        }
        return null
    },
    set(key, value, day) {
        let setting = arguments[0]
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (let i in setting) {
                let oDate = new Date()
                oDate.setDate(oDate.getDate() + day)
                document.cookie = i + '=' + setting[i] + ';expires=' + oDate
            }
        } else {
            let oDate = new Date()
            oDate.setDate(oDate.getDate() + day)
            document.cookie = key + '=' + value + ';expires=' + oDate
        }
    },
    remove(key) {
        let setting = arguments[0]
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
            setting.forEach(key => {
                this.set(key, 1, -1)
            })
        } else {
            this.set(key, 1, -1)
        }

    }
};


export const Local = {
    get(key) {
        if (key) return JSON.parse(ls.getItem(key))
        return null
    },
    set(key, val) {
        const setting = arguments[0]
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (const i in setting) {
                ls.setItem(i, JSON.stringify(setting[i]))
            }
        } else {
            ls.setItem(key, JSON.stringify(val))
        }
    },
    remove(key) {
        ls.removeItem(key)
    },
    clear() {
        ls.clear()
    }
};


export const Session = {
    get(key) {
        if (key) return JSON.parse(ss.getItem(key))
        return null
    },
    set(key, val) {
        const setting = arguments[0]
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
            for (const i in setting) {
                ss.setItem(i, JSON.stringify(setting[i]))
            }
        } else {
            ss.setItem(key, JSON.stringify(val))
        }
    },
    remove(key) {
        ss.removeItem(key)
    },
    clear() {
        ss.clear()
    }
}


// 获取当前日期八位数字格式 如："20171211"
function dateString() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (date.toString().length == 1) {
        date = "0" + date;
    }
    return year.toString() + month.toString() + date.toString();
}

/**
 * @param    {[type]}   code [description]
 * @return                   [description]
 * {
    pass: pass,//1身份证号格式错误、2地址编码错误、3校验位错误、4未成年
    status: status,
    msg: tip
   }
 */
export const idCodeValid = (code) => {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var status = 0;
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        status = 1;
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        status = 2;
        pass = false;
    } else {
        if (dateString() - code.substring(6, 14) < 180000) {
            pass = true;
            status = 4;
            tip = "未成年人";
        }
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (code[17] == 'x') code[17] = code[17].toUpperCase();
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                status = 3;
                pass = false;
            }
        }
    }
    var obj = {
        pass: pass,
        status: status,
        msg: tip
    };
    if (!pass) {
        return obj;
    }
    return obj;
}

/**
 * 初始化类型判断方法
 * 在exp对象上新增isNull, isUndefined, isObject, isArray, isString, isNumber, isBoolean, isFunction, isRegExp
 * 可以通过Exp.isUndefined ...这些进行数据格式判断
 */
let exp = {};
let type = (o) => {
    let s = Object.prototype.toString.call(o)
    return s.match(/\[object (.*?)\]/)[1].toLowerCase()
};

['Null',
    'Undefined',
    'Object',
    'Array',
    'String',
    'Number',
    'Boolean',
    'Function',
    'RegExp'
].forEach(function (t) {
    exp['is' + t] = function (o) {
        return type(o) === t.toLowerCase()
    }
});

export const Exp = exp;

/**
 * 解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
 */
export const ModalHelper = (() => {
    var scrollTop;
    return {
        afterOpen: function () {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function () {
            // scrollTop lost after set position:fixed, restore it back.
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.top = '';
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})()
import {Dialog} from 'vant'
import Clipboard from 'clipboard';

export const $baseRed = '#FE5722';
export const initOpenApp = () => {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var ua = navigator.userAgent.toLowerCase();
    var iswx = ua.match(/MicroMessenger/i) == "micromessenger";
    // var Clipboard=
    if (iswx) {
        Dialog.alert({
            title: '打开托亚克APP',
            message: '请在默认浏览器中打开,直接打开托亚克app',
            theme: 'round-button',
        }).then(() => {
            // //这个是安卓操作系统
            if (isAndroid) {
                //安卓app的scheme协议
                // window.location.href ="scheme://com.yt.tyk";
                let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
                if (typeof hidden == "undefined" || hidden == false) {
                    //应用宝下载地址
                    window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.yt.tyk";
                }
                return
            }
            //这个是ios操作系统
            if (isIOS) {
                //ios的scheme协议
                let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
                if (typeof hidden == "undefined" || hidden == false) {
                    //App store下载地址
                    window.location.href = "https://apps.apple.com/cn/app/%E6%89%98%E4%BA%9A%E5%85%8B/id1486551960";
                }
            }
        })
    } else {
        window.location.href = "com.yt.tyk://";
    }
};