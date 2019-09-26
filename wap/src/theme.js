/**
 * @更改主题色
 */

//通过import引入

/**
 * 通过root定义变量
 * step:
 *  1、reset.scss中定义初始变量
 *  1、以下是需要替换的变量色值
 */
const setColorByRoot = () => {
  let property = {
    '--theme_color': '#F2313B',
    '--calendar_bgcolor': '#2F61D2',
  }

  for (let [key, value] of Object.entries(property)) {
    document.getElementsByTagName('body')[0].style.setProperty(key, value);
  }
}

var ua = navigator.userAgent.toLowerCase();
//在微信中打开
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  wx.miniProgram.getEnv(function (res) {
    if (res.miniprogram) {
      // 小程序环境下逻辑
      setColorByRoot();
    }
  });
}

