import {LaunchApp, detector, ua, isAndroid, isIos, supportLink, inWeixin, inWeibo} from 'web-launch-app';

const inApp = /tuoyake(.*)/.test(ua);
const appVersion = inApp ? /tuoyake\/(\d+(\.\d+)*)/.exec(ua)[1] : '';
// 微信iOS7.0.5支持ulink（20190716）
const wxSupportLink = isIos && inWeixin && detector.browser.fullVersion > '7.0.4';
const lanchIns = new LaunchApp({
    inApp: inApp,
    appVersion: appVersion,
    pkgName: 'com.yt.tyk',
    deeplink: {
        scheme: {
            android: {
                protocol: 'com.yt.tyk',
                index: {
                    path: '/',
                },
                frs: {
                    protocol: 'com.yt.tyk',
                    path: '',
                    param: {from: 'h5'},
                    paramMap: {
                        from: 'h5'
                    }
                }
            },
            ios: {
                protocol: 'com.yt.tyk',
                index: {
                    path: '/',
                },
                frs: {
                    path: '/'
                }
            }
        },
        link: {
            index: {url: 'https://mobile.tuoyake.com/#/download'},
            frs: {url: 'https://mobile.tuoyake.com/#/download'}
        },
    },
    pkgs: {
        android: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.yt.tyk',
        ios: 'https://apps.apple.com/cn/app/%E6%89%98%E4%BA%9A%E5%85%8B/id1486551960',
        yyb: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.yt.tyk'
    },
    useUniversalLink: supportLink(),
    useAppLink: supportLink(),
    autodemotion: true,
    useYingyongbao: inWeixin && isAndroid,
    useGuideMethod: inWeibo && isAndroid,
    timeout: 2500,
    landPage: 'https://mobile.tuoyake.com/#/download'
});

/**
 * 唤起app到指定页面
 * @param options
 * @param callback
 */
export function launch(options, callback) {
    // pkgs处理
    options.pkgs = options.pkgs || {};
    if (options.param && options.param.pkg) {
        options.pkgs.android = options.pkgs.android || `https://a.app.qq.com/o/simple.jsp?pkgname=com.yt.tyk`;
    }
    if (options.param && options.param.ckey) {
        options.pkgs.ios = options.pkgs.ios || `https://apps.apple.com/cn/app/%E6%89%98%E4%BA%9A%E5%85%8B/id1486551960&ckey=${ckey}`;
    }
    // 针对scheme方案处理剪贴板口令
    if (options.clipboardTxt === undefined) {
        let paramStr = options.param ? stringtifyParams(options.param) : '';
        if (options.scheme) {
            options.clipboardTxt = '#' + options.scheme + (paramStr ? ((options.scheme.indexOf('?') > 0 ? '&' : '?') + paramStr) : '') + '#';
        } else if (options.page) {
            // schemeConfig为实例化时参数中scheme配置
            options.clipboardTxt = '#' + schemeConfig['protocol'] + '://' + schemeConfig[options.page].path + (paramStr ? '?' + paramStr : '') + '#';
        }
    }
    // TODO 处理唤起&新增统计归因、qq浏览器写入剪贴板延迟等通用性功能...
    lanchIns.open(options, callback);
}

/**
 * 唤起app到指定页面(尝试唤起场景，使用link方案，适用于不阻断用户继续去h5页体验场景)
 * @param options
 * @param callback
 */
export function tryLaunch(options = {}, callback) {
    options.launchType = {
        ios: 'com.yt.tyk',
        android: 'com.yt.tyk'
    };
    options.autodemotion = false;
    launch(options);
}

/**
 * 唤起app到指定页面(强制唤起场景，使用scheme方案)
 */
export function forceLaunch(options = {}, callback) {
    options.launchType = {
        ios: 'com.yt.tyk',
        android: 'com.yt.tyk'
    };
    launch(options);
}

/**
 * 唤起app到指定页面(常见场景方案，ios走link,android优先走link不支持走scheme,android微信中走应用宝)
 * @param options
 * @param callback
 */
export function hotLaunch(options, callback) {
    options.useGuideMethod = isAndroid && inWeibo;
    options.launchType = {
        ios: 'scheme',
        android: inWeixin ? 'store' : (supportLink ? 'link' : 'scheme')
    };
    options.useYingyongbao = isAndroid && inWeixin;
    options.autodemotion = true;
    launch(options, callback);
}

/**
 * 端内H5页面调用端能力
 */
export function invoke(options) {
    options.launchType = {
        ios: 'scheme',
        android: 'scheme'
    };
    options.timeout = -1;
    lanchIns.open(options);
}

/**
 * 下载安装包
 * @param opt
 */
export function download(opt) {
    lanchIns.download(opt);
}