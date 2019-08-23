// 验证手机号
const checkPhone = phone => {
  return /^1\d{10}$/gi.test(phone);
};
// 验证身份证号
const checkIdcard = idCard => {
  if (idCard.slice(17, 18) == "x") {
    idCard = idCard.replace("x", "X");
    this.userId = idCard;
  }
  idCard = idCard.toString();
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
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
  var pass = true;

  if (
    !idCard ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
      idCard
    )
  ) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[idCard.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (idCard.length == 18) {
      idCard = idCard.split("");
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = idCard[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != idCard[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  var obj = {
    status: pass,
    msg: tip
  };
  if (!pass) {
    return obj;
  }
  return obj;
};
//根据身份证号计算年龄
const analyzeIDCard = IDCard => {
  var sexAndAge = 0;
  //获取用户身份证号码
  var userCard = IDCard.toString();
  //获取出生年月日
  var yearBirth = userCard.substring(6, 10);
  var monthBirth = userCard.substring(10, 12);
  var dayBirth = userCard.substring(12, 14);
  //获取当前年月日并计算年龄
  var myDate = new Date();
  var monthNow = myDate.getMonth() + 1;
  var dayNow = myDate.getDay();
  var age = myDate.getFullYear() - yearBirth;
  if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
    age--;
  }
  //得到年龄
  sexAndAge = age;
  //返回年龄
  return sexAndAge;
};
/**************************************时间格式化处理************************************/
const dateFtt = (fmt, date) => {
  //author: meizz
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
const getCookie = c_name => {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return document.cookie.substring(c_start, c_end);
    }
  }
  return "";
};
/**
 * 删除cookie
 * @param name cookie的名称
 */
const delCookie = function(name) {
  var domain =
    window.location.host == "www.hymuseum.org.cn"
      ? STATIC_WEB_URL.substr(11, STATIC_WEB_URL.length)
      : STATIC_WEB_URL.substr(13, STATIC_WEB_URL.length);
  document.cookie = "" + name + "=" + escape("") + ";domain=" + domain;
};
export default {
  checkPhone,
  checkIdcard,
  dateFtt,
  delCookie,
  analyzeIDCard,
  getCookie
};
