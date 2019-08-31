<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="author" content="www.hymuseum.org.cn">
    
    <meta name="keywords" content="国家海洋博物馆,国家海洋博物馆官网,国家海洋博物馆预约,国家海洋博物馆门票,中国海洋博物馆,天津国家海洋博物馆,天津海洋博物馆,国家海洋馆,海洋馆,海博,天津海洋馆,海博官网">
    <meta name="description" content="国家海洋博物馆以“海洋与人类”为主题，具有中国海洋文化特色，以收藏、研究、展示、教育为主要功能，是一座融展示与教育、收藏与研究、文化与休闲、科学与艺术于一体的现代化、综合性海洋类博物馆。">
    <title></title>
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1112493_5ivdnyusfkr.css" />
    <script type="text/javascript">var BASEURL = "{{env('STATIC_API_URL',url('/'))}}"</script>
    <script type="text/javascript">var STATIC_WEB_URL = "{{env('STATIC_WEB_URL',url('/'))}}"</script>
    <script type="text/javascript">var STATIC_ACTIVE_URL = "{{env('STATIC_ACTIVE_URL',url('/'))}}"</script>
    <script type="text/javascript">var STATIC_VOLUNTEER_URL = "{{env('STATIC_VOLUNTEER_URL',url('/'))}}"</script>
    <script type="text/javascript">var STATIC_PW_URL = "{{env('STATIC_PW_URL',url('/'))}}"</script>
    <script type="text/javascript">var STATIC_CINEMA_URL = "{{env('STATIC_CINEMA_URL',url('/'))}}"</script>
    <script type="text/javascript">var STATIC_GUIDE_URL = "{{env('STATIC_GUIDE_URL',url('/'))}}"</script>
    <script type="text/javascript" src="{{cdn('js/jweixin-1.3.2.js')}}"></script>
    <script>
        var PLAT= "t";
        var browser = {
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
                //微信环境
                PLAT= 'wx';
                wx.miniProgram.getEnv(function(res) {
                    if (res.miniprogram) {
                        // 小程序环境下逻辑
                        PLAT= 'wxmini'
                    }
                })
            }
        }
        var _hmt = _hmt || [];
        (function() {
          var domain = window.location.host;
          var hm = document.createElement("script");
           hm.src = "https://hm.baidu.com/hm.js?b9eb91462bfbdd7ecca2b18811b745cd";
          if(domain==='hbweb.smartechnology.com.cn'){
            hm.src= "https://hm.baidu.com/hm.js?b9eb91462bfbdd7ecca2b18811b745cd";;
          }
          if( domain==='www.hymuseum.org.cn'){
             hm.src = "https://hm.baidu.com/hm.js?fd9e94b16942cec3637b9a5abdd4d6b0"
          }
          if(domain==='zhbweb.smartechnology.com.cn'){
               hm.src = "https://hm.baidu.com/hm.js?ec8084514d1ab1f2c335e201723a8020"
          }
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>
<body ontouchstart>

<div id="app">
    <app></app>
</div>
</body>
</html>
