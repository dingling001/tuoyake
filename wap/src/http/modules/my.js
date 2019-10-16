import axios from "../api";

/**
 * 获取广告位
 */
export const GetAdv = (type = 1) =>
    axios(
        "/api/index/getAdv", {
            type,
        },
        "POST",
        true
    );
/**
 * 获取个人信息
 */
export const GetUserInfo = () =>
    axios(
        "/api/user/getUserInfo", {
            token:localStorage.getItem('user_twap'),
        },
        "POST",
        true
    );
/**
 * 获取平台信息
 */
export const Platform = () =>
    axios(
        "/api/user/platform", {
        },
        "POST",
        true
    );


