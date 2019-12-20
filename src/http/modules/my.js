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
export const CollectionIndex = (type, page, lat = 0, lng = 0) =>
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
 * 积分规则说明
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
 * 报名规则说明
 */
export const SignRule = () =>
    axios(
        "/api/sign/rule", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );


/**
 * 奖品列表
 */
export const SignGoods = () =>
    axios(
        "/api/sign/goods", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );
/**
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
 * 奖品详情
 */
export const GoodsDetail = (goods_id) =>
        axios(
            "/api/sign/goodsDetail", {
                token: localStorage.user_twap,
                goods_id
            },
            "POST",
            true
        );
/**
 * 奖品详情
 */
export const SignReceivedDetail = (id) =>
    axios(
        "/api/sign/receivedDetail", {
            token: localStorage.user_twap,
            id
        },
        "POST",
        true
    );
export const ScoreReceivedDetail = (id) =>
    axios(
        "/api/score/receivedDetail", {
            token: localStorage.user_twap,
            id
        },
        "POST",
        true
    );

/**
 * 奖品积分详情
 */
export const ScoreDetail = (goods_id) =>
    axios(
        "/api/score/goodsDetail", {
            token: localStorage.user_twap,
            goods_id
        },
        "POST",
        true
    );
/**
 * 领取奖品
 */
export const SignReceive = (goods_id,address_id) =>
    axios(
        "/api/sign/receive", {
            token: localStorage.user_twap,
            goods_id,
            address_id
        },
        "POST",
        true
    );
/**
 * 领取奖品
 */
export const ScoreReceive = (goods_id,address_id) =>
    axios(
        "/api/score/receive", {
            token: localStorage.user_twap,
            goods_id,
            address_id
        },
        "POST",
        true
    );


/**
 * 我的积分领取
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
 * 我的领取
 */
export const SignMyReceived = () =>
    axios(
        "/api/sign/myReceived", {
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

// 添加地址
export const AddressSetAddress = (name, mobile, province, city, district, address, is_default, id) =>
    axios(
        "/api/address/setAddress", {
            name,
            mobile,
            province,
            city,
            district,
            address,
            is_default,
            id,
        },
        "POST",
        true
    );
// 默认地址
export const addressSingle = () =>
    axios(
        "/api/address/single", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );
// 删除地址
export const addressDel = (id) =>
    axios(
        "/api/address/del", {
            token: localStorage.user_twap,
            id
        },
        "POST",
        true
    );
//地址详情
export const AddressDetail = (id) =>
    axios(
        "/api/address/detail", {
            token: localStorage.user_twap,
            id
        },
        "POST",
        true
    );
/**
 * 报名列表
 */
export const SignIndex = () =>
    axios(
        "/api/sign/index", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );

/**
 * 我的报名
 */
// :1=进行中,2=获奖,3=未获奖"
export const GetSignList = (page = 0, status = 1) =>
    axios(
        "/api/sign/getSignList", {
            token: localStorage.user_twap,
            page,
            status
        },
        "POST",
        true
    );
/**
 获奖成就 /api/sign/achievement
 **/
export const SignAchievement = () =>
    axios(
        "/api/sign/achievement", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );
// 我的订单数量
export const OrderGetOrderNum = () =>
    axios(
        "/api/order/getOrderNum", {
            token: localStorage.user_twap,
        },
        "POST",
        true
    );
// 我的订单
// 状态:0=全部,1=未付款,2=未使用,3=已使用,4=取消/退款
export const OrderIndex = (page = 0, status = 0) =>
    axios(
        "/api/order/index", {
            token: localStorage.user_twap,
            page,
            status
        },
        "POST",
        true
    );
/**
 * 上传文件
 */
export const CommonUpload = (file) =>
    axios(
        "/api/common/upload", {
            file
        },
        "FORMDATA",
        true
    );

