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
            token: localStorage.getItem('user_twap'),
        },
        "POST",
        true
    );
/**
 * 获取平台信息
 */
export const Platform = () =>
    axios(
        "/api/user/platform", {},
        "POST",
        true
    );
/**
 * 意见反馈
 */
export const SetFeedback = (content, images) =>
    axios(
        "/api/user/setFeedback", {
            content,
            images,
            token: localStorage.user_twap
        },
        "POST",
        true
    );

/**
 * 获取我的优惠券
 */
export const GetCouponList = (type=1,page=0) =>
    axios(
        "/api/coupon/getCouponList", {
            type,
            page,
            token: localStorage.user_twap
        },
        "POST",
        true
    );
/**
 * 获取我的优惠券详情
 */
export const GetCouponInfo = (id) =>
    axios(
        "/api/coupon/getCouponInfo", {
            id,
            token: localStorage.user_twap
        },
        "POST",
        true
    );
