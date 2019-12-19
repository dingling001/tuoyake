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
/**
 * 　修改手机号 /api/user/changemobile
 */
export const ChangeMobile = (mobile, captcha) =>
    axios(
        "/api/user/changemobile", {
            mobile,
            captcha
        },
        "POST",
        true
    );
/**
 * 　修改手机号 /api/user/changemobile
 */
export const UserResetPassword = (password, repassword) =>
    axios(
        "/api/user/resetPassword", {
            password,
            repassword,
            token:localStorage.user_twap
        },
        "POST",
        true
    );
// 注册
export const Register = (mobile, captcha, password, repassword) =>
    axios(
        "/api/common/register", {
            mobile,
            captcha,
            password,
            repassword
        },
        "POST",
        true
    );
// 忘记密码 /api/user/resetpwd
export const UserResetPwd = (mobile, newpassword, repassword, captcha) =>
    axios(
        "/api/user/resetpwd", {
            mobile,
            newpassword,
            repassword,
            captcha
        },
        "POST",
        true
    );
// 检测验证码 /api/user/check
export const SmsCheck = (mobile, event, captcha, type=1) =>
    axios(
        "/api/sms/check", {
            mobile,
            event,
            captcha,
            type
        },
        "POST",
        true
    );
