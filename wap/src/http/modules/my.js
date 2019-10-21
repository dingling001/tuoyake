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
export const GetCouponList = (type = 1, page = 0) =>
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
/**
 * 修改个人信息
 */
export const Profile = (avatar, nickname) =>
    axios(
        "/api/user/profile", {
            token: localStorage.user_twap,
            avatar,
            nickname
        },
        "POST",
        true
    )
/**
 * 收藏列表
 */
export const CollectionIndex = (type, page,lat=0,lng=0) =>
    axios(
        "/api/collection/index", {
            token: localStorage.user_twap,
            type,
            page,
            lat,
            lng
        },
        "POST",
        true
    );
/**
 * 我的积分
 */
export const ScoreIndex = () =>
    axios(
        "/api/score/index", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );
/**
 * 我的积分
 */
export const ScoreRule = () =>
    axios(
        "/api/score/rule", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );
/**
 * 奖品列表
 */
export const ScoreGoods = () =>
    axios(
        "/api/score/goods", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );

/**
 * 我的领取
 */
export const ScoreMyReceived = () =>
    axios(
        "/api/score/myReceived", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );
/**
 * 地址列表
 */
export const AddressIndex = () =>
    axios(
        "/api/address/index", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );


