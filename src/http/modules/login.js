import axios from "../api";

/**
 * 发送验证码 /api/sms/send
 */
// 事件名称login=登录，register=注册，changemobile=修改手机号，changepwd=修改密码，resetpwd=重置密码
export const SmsSend = (mobile, event) =>
    axios(
        "/api/sms/send", {
            mobile,
            event
        },
        "GET",
        true
    );

/**
 * 验证码登录 /api/common/mobilelogin
 */
export const MobileLogin = (mobile, captcha) =>
    axios(
        "/api/common/mobilelogin", {
            mobile,
            captcha
        },
        "POST",
        true
    );

/**
 * 密码登录 /api/common/mobilelogin
 */
export const Login = (account, password) =>
    axios(
        "/api/common/login", {
            account,
            password
        },
        "POST",
        true
    );
