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
	if(monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
		age--;
	}
	//得到年龄
	sexAndAge = age;
	//返回性别和年龄
	return sexAndAge;
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
// 验证是否是微信环境
const checkWx = () => {
  let browser = {
    versions: (function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        //移动终端浏览器版本信息
        trident: u.indexOf("Trident") > -1, //IE内核
        presto: u.indexOf("Presto") > -1, //opera内核
        webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
        iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf("iPad") > -1, //是否iPad
        webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
      };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
  if (browser.versions.mobile) {
    var ua = navigator.userAgent.toLowerCase();
    //在微信中打开
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
};
export default { checkPhone, checkIdcard, checkWx, getCookie,analyzeIDCard };
