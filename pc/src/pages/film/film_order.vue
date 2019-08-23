<template>
    <div class="film_order_box">
        <div class="nav_hr">
            <div class="nav_text">
                <router-link tag="span" to="/">首页 »</router-link>
                <router-link tag="span" to="/center">个人中心 »</router-link>
                电影票
            </div>
        </div>
        <div class="date_step">
            <div class="date_title">
                <div class="date_left">订单信息
                    <span class="line"></span>
                    <span class="dot"></span>
                </div>
                <div class="tips" v-if="order_info.status==1">温馨提示：请在<span class="time">14</span>分钟内完成付款，如超时系统将自动释放已选座位！
                </div>
                <div class="tips" v-else-if="order_info.status==2"><span>待观影</span></div>
                <div class="tips" v-else-if="order_info.status==3"><span>已取消</span></div>
                <div class="tips" v-else-if="order_info.status==4"><span>已放映</span></div>
                <div class="tips" v-else-if="order_info.status==5">已过期</div>
            </div>
        </div>
        <div class="film_info_box">
            <div class="film_head">
                <div class="order_detail">
                    <p>订单编号 <span>{{order_info.order_no}}</span></p>
                    <p>联系手机 <span>{{order_info.phone}}</span></p>
                    <p>下单时间 <span>{{order_info.created_at}}</span></p>
                    <p v-if="order_info.pay_time">付款时间 <span>{{order_info.pay_time}}</span></p>
                </div>
                <div class="film_name">{{order_info.movie_name}}</div>
                <div class="film_item">影片时长：{{order_info.long_time}}分钟</div>
                <div class="film_item">放映地址：{{order_info.address}}</div>
                <div class="film_item">日期及场次：{{order_info.movie_time}} 周{{week_list[week]}}
                    {{order_info.movie_start_time}}
                </div>
                <div class="film_ticket">
                    <div class="film_item left">影片类型：</div>
                    <div class="film_item right">
                        <div class="ticket_item" v-for="item in order_info.ticket_class" v-if="item">{{item.class_name}}
                            <span v-if="item.des">({{item.des}})</span> x{{item.buy_num}}
                        </div>
                    </div>
                </div>
                <div class="film_item" v-if="order_info.movie_type!=3">座位号：<span v-for="item in order_info.seat_arr">{{item}}</span></div>
              <div class="film_item" v-else>体验位：<span v-for="item in order_info.seat_arr">{{item}}</span></div>

              <div class="film_item">总计：￥{{order_info.amount}}</div>
            </div>
            <div class="film_info" style="border: 0" v-if="order_info.status==1">
                <div class="order_pay">
                    <div class="order_title"><span></span>付款方式</div>
                    <div class="order_pay_box">
                        <div :class="['order_item', 'wechat', wechat_status?'checked_order':'']" @click="wepay">
                        <span class="icon_box" v-if="wechat_status">
                            <span class="iconfont iconxuanzhong-copys"></span>
                        </span>
                        </div>
                        <!--<div :class="['order_item', 'alipay', alipay_status?'checked_order':'']" @click="alipay">-->
                        <!--<span class="icon_box" v-if="alipay_status"><span-->
                        <!--class="iconfont iconxuanzhong-copys"></span></span>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <div class="qrcode_box" v-if="order_info.status==4||order_info.status==2">
                <div class="qr_title">取票二维码</div>
                <div :class="{qr_disable:order_info.status!=2}">
                    <div class="qr_item">
                        <div class="qr_img">
                            <qrcode :value="order_qrcode" :options="{ size: 181 }"></qrcode>
                        </div>
                        <div class="qr_num">{{order_info.seat_num}}张电影票</div>
                    </div>
                    <div class="qr_code">取票码：{{order_qrcode}}</div>
                </div>
                <div class="qr_status" v-if="order_info.status==4"><img src="../../img/film/played.png" alt=""></div>
            </div>
            <div class="total_box" v-if="order_info.status==1">总计<span>￥{{order_info.amount}}</span></div>
            <div :class="['order_btn', order_info.status==1||order_info.status==2?'order_cancel':'']">
<!--                <div :class="['btn',order_info.status==3||order_info.status==4?'maginauto':'' ]"-->
<!--                     @click="$router.back(-1)">返回-->
<!--                </div>-->
                <div class="btn" v-if="order_info.status==1" @click="cancel_fn">取消</div>
                <div class="btn pay_btn" v-if="order_info.status==1" @click="pay_fn">支付</div>
                <div class="btn maginauto" v-if="order_info.status==2" @click="cancel_fn">退票</div>
            </div>
        </div>
        <div class="mold" v-if="pay_mold" @click="pay_mold=false">
            <div class="wechat_item">
                <div class="title_box">
                    <div class="icon_wepay" v-if="wechat_status"><span class="iconfont iconweixin1"></span> 微信支付</div>
                    <div class="icon_wepay" v-if="alipay_status"><span class="iconfont iconzhifubao"></span> 支付宝支付</div>
                    <div class="iconfont iconx" @click.stop="pay_mold=false"></div>
                </div>
                <div class="code_box">
                    <qrcode :value="qrcode" :options="{ size: 160 }"></qrcode>
                </div>
                <div class="pay_text" v-if="wechat_status"> 微信扫描</div>
                <div class="pay_text" v-if="alipay_status"> 支付宝扫描</div>
                <div class="pay_text">二维码完成支付</div>
                <div class="pay_money"><span class="price">￥</span><span class="price_num">{{order_info.amount}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import countDown from '../../components/countDown.vue'

    export default {
        name: "film_order",
        data() {
            return {
                minutes: 14,
                seconds: 0,
                status: 0,
                order_id: '',
                order_info: {},
                week_list: ["日", "一", "二", "三", "四", "五", "六",],
                week: 0,
                pay_mold: false,
                wechat_status: false,
                alipay_status: false,
                qrcode: '',
                order_qrcode: '',
            }
        },
        created() {
            this.order_id = this.$route.query.order_id;
            this.get_FilmOrderInfo()
        },
        methods: {
            // 获取详情
            get_FilmOrderInfo() {
                this.$api.FilmOrderInfo(localStorage.getItem('api_token'), this.order_id).then(res => {
                    //console.log(res)
                    this.order_qrcode = res.data.order_no;
                    this.order_info = res.data;
                    this.week = new Date(res.data.movie_time).getDay();
                    this.order_info.seat_arr = this.order_info.seat_arr.join(' 、 ')
                })
            },
            // 选择微信支付
            wepay() {
                this.wechat_status = !this.wechat_status;
                this.alipay_status = false
            },
            // 选择支付宝支付
            alipay() {
                this.alipay_status = !this.alipay_status;
                this.wechat_status = false
            },
            // 取消订单
            cancel_fn() {
                this.$confirm("取消订单,是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$api
                            .FilmCancelOrder(localStorage.getItem("api_token"), this.order_id)
                            .then(res => {
                                if (res.status == 1) {
                                    this.$message({
                                        type: "success",
                                        message: "取消成功!"
                                    });
                                    this.get_FilmOrderInfo();
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: "error"
                                    });
                                }
                            });
                    })
                    .catch(() => {
                    });

            },
            // 去付款
            pay_fn() {
                if (!this.alipay_status && !this.wechat_status) {
                    this.$message({
                        message: '请选择支付方式',
                        type: 'warning'
                    });
                } else if (this.wechat_status && !this.alipay_status) {
                    this.pay_mold = true;
                    this.$api.FilmPayOrder(localStorage.getItem('api_token'), 1, this.order_id).then(res => {
                        if (res.status == 1) {
                            this.qrcode = res.data.qrcode;
                            this.ordertime = setInterval(() => {
                                this.get_FilmOrderStatus()
                            }, 1000)
                          this.$once('hook:beforeDestroy', function () {
                            clearInterval(this.ordertime)
                          })
                        }
                    });
                } else if (!this.wechat_status && this.alipay_status) {
                    this.pay_mold = true;
                    //console.log('支付宝支付')
                }
            },
            // 获取订单状态
            get_FilmOrderStatus() {
                this.$api.FilmOrderStatus(localStorage.getItem('api_token'), this.order_id).then(res => {
                    if (res.status == 1) {
                        this.order_status = res.data.order_status;
                        if (res.data.order_status == 2) {
                            this.$message({
                                message: '支付成功！',
                                type: 'success'
                            });
                            setTimeout(() => {
                                clearInterval(this.ordertime)
                                this.$router.push({
                                    path: '/film/film_success',
                                    query: {order_sn: this.order_info.order_sn}
                                })
                            }, 1500)
                        } else if (res.data.order_status == 1) {
                            //console.log('1')
                        }
                        else {
                            this.$message({
                                message: '订单异常！',
                                type: 'error'
                            });
                            clearInterval(this.ordertime)
                            setTimeout(() => {
                                this.$router.push({path: '/film/film_index', query: {order_sn: this.order_sn}})
                            }, 1500)
                        }
                    }
                })
            },
        },
        components: {
            countDown
        }
    }
</script>

<style scoped lang="scss">
    .film_order_box {
        .nav_hr {
            background-color: #E7E7E7;
            height: 75px;
            line-height: 75px;

            .nav_text {
                width: 1200px;
                margin: 0 auto;
                font-size: 18px;

                span {
                    cursor: pointer;

                    &:hover {
                        color: #DA9B42;
                    }
                }
            }
        }
        .date_step {
            width: 1200px;
            margin: 20px auto 0 auto;
            padding: 30px 0 0 0;
            border-bottom: 5px solid rgba(180, 124, 45, .3);
            .date_title {
                overflow: hidden;
                margin: 0 0 20px 0;
                .date_left {
                    float: left;
                    font-size: 24px;
                    color: #000;
                    padding: 0 0 27px 0;
                    position: relative;
                    .line {
                        position: absolute;
                        bottom: 0;
                        width: 60px;
                        height: 5px;
                        left: 0;
                        background-color: #000;
                        border-radius: 2px;
                        z-index: 1;
                        display: block;
                    }
                    .dot {
                        display: block;
                        width: 7px;
                        height: 5px;
                        border-radius: 3px;
                        background-color: #000;
                        left: 70px;
                        bottom: 0;
                        z-index: 1;
                        position: absolute;
                    }
                }
                .tips {
                    float: right;
                    padding: 30px 0 0 0;
                    font-size: 16px;

                    span {
                        color: #DA4453;
                        font-size: 18px;
                        padding: 0 30px 0 0;
                    }
                    .time {
                        color: #FF3600;
                        font-size: 24px;
                        padding: 0;
                    }
                }
            }
        }
        .film_info_box {
            width: 1200px;
            margin: 0 auto;
            .film_head {
                background: rgba(180, 124, 45, .1);
                padding: 18px 0 30px 35px;
                .order_detail {
                    font-size: 16px;
                    p {
                        display: inline-block;
                        width: 49%;
                        padding: 0 0 20px 0;
                        span {
                            margin-left: 20px;
                        }
                    }
                }
                .film_name {
                    font-size: 24px;
                    font-weight: bold;
                }
                .film_item {
                    padding: 17px 0 0 0;
                    color: #040404;
                    font-size: 18px;
                }
                .film_ticket {
                    overflow: hidden;
                    .left {
                        float: left;
                    }
                    .right {
                        float: left;
                    }
                    .ticket_item {
                        padding: 0 0 15px 0;
                        &:last-child {
                            padding: 0;
                        }
                    }
                }
            }
            .film_info {
                padding: 30px 0;
                border-bottom: 1px solid rgba(0, 0, 0, .1);
                .film_name {
                    font-size: 24px;
                    padding-bottom: 23px;
                }
                .film_address {
                    font-size: 18px;
                    padding-bottom: 16px;
                    span {
                        color: #55555A;
                        padding: 0 23px;
                        border-right: 1px solid;
                        &:first-child {
                            padding: 0 23px 0 0;
                        }
                        &:last-child {
                            border: 0;
                        }
                    }
                    i {
                        font-style: normal;
                        margin-left: 20px;
                    }
                }
                .order_pay {
                    padding-bottom: 30px;
                    border-bottom: 5px solid rgba(180, 124, 45, .3);
                    .order_title {
                        font-size: 20px;
                        line-height: 1;
                        span {
                            height: 10px;
                            width: 10px;
                            border-radius: 50%;
                            background-color: #000;
                            margin-right: 10px;
                            display: inline-block;
                        }
                    }
                    .order_pay_box {
                        overflow: hidden;
                        margin: 28px 0 0 0;
                        .order_item {
                            background-position: center;
                            width: 189px;
                            height: 63px;
                            background-repeat: no-repeat;
                            float: left;
                            position: relative;
                            border: 1px solid rgba(136, 157, 186, .5);
                            margin-right: 36px;
                            cursor: pointer;
                            .icon_box {
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                z-index: 2;
                                height: 26px;
                                width: 25px;
                                text-align: center;
                                line-height: 30px;
                                .iconxuanzhong-copys {
                                    color: #DA4453;
                                    font-size: 25px;
                                }
                            }
                        }
                        .wechat {
                            background-image: url("../../img/film/order_wechat.png");
                        }
                        .alipay {
                            background-image: url("../../img/film/order_alipay.png");
                        }
                        .checked_order {
                            border-color: #DA4453;
                        }
                    }
                }
            }
            .qrcode_box {
                padding-bottom: 57px;
                border-bottom: 1px solid rgba(180, 124, 45, .3);
                position: relative;
                .qr_title {
                    font-weight: bold;
                    padding: 31px;
                    font-size: 24px;
                }
                .qr_item {
                    width: 180px;
                    margin: 30px auto;
                    .qr_img {
                        height: 180px;
                        position: relative;
                        img {
                            width: 100%;
                        }
                    }
                    .qr_num {
                        text-align: center;
                        padding: 20px 0 0 0;
                        color: #55555A;
                        font-size: 18px;
                    }
                }
                .qr_code {
                    width: 440px;
                    margin: 0 auto;
                    text-align: center;
                    border: 1px solid;
                    padding: 18px 0;
                    color: #353535;
                    font-size: 18px;
                    border-radius: 26px;
                }
                .qr_disable {
                    opacity: .3;
                }
                .qr_status {
                    position: absolute;
                    width: 180px;
                    top: 41%;
                    left: 156px;
                    right: 0;
                    margin: 0 auto;
                    img {
                        display: block;
                        margin: 0 auto;
                    }
                }
            }
            .total_box {
                padding: 30px 0;
                font-size: 24px;
                color: #353535;
                text-align: right;
                span {
                    color: #E8593E;
                    margin-left: 43px;
                }
            }
            .order_btn {
                overflow: hidden;
                width: 900px;
                margin: 50px auto 90px auto;
                .btn {
                    width: 220px;
                    /*float: left;*/
                    display: inline-block;
                    margin: 0 180px 0 0;
                    border-radius: 24px;
                    text-align: center;
                    height: 48px;
                    line-height: 48px;
                    color: #C39657;
                    font-size: 16px;
                    /*margin-right: 110px;*/
                    border: 1px solid #C39657;
                    cursor: pointer;
                    &:last-child {
                        margin: 0 auto;
                    }
                }
                .maginauto {
                    margin: 0 auto !important;
                    display: block;
                }

                .pay_btn {
                    background-color: #C39657;
                    color: #fff;
                    margin: 0;
                }
            }
            .order_cancel {
                width: 628px;
            }
        }
        .mold {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
            z-index: 10000;
            .wechat_item {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 600px;
                height: 480px;
                background-color: #fff;
                padding: 43px 56px;
                .title_box {
                    overflow: hidden;
                    .icon_wepay {
                        float: left;
                        font-size: 18px;
                        .iconweixin1 {
                            color: #00C800;
                            font-size: 20px;
                        }
                        .iconzhifubao {
                            color: #08A3EA;
                            font-size: 24px;
                        }
                    }
                    .iconx {
                        float: right;
                        color: #CFCFCF;
                        font-size: 20px;
                        cursor: pointer;
                    }
                }
                .code_box {
                    width: 160px;
                    height: 160px;
                    margin: 25px auto;
                    img {
                        width: 100%;
                    }
                }
                .pay_text {
                    text-align: center;
                    font-size: 14px;
                    padding-bottom: 10px;
                }
                .pay_money {
                    width: 375px;
                    padding: 32px 0;
                    margin: 0 auto;
                    text-align: center;
                    border-bottom: 1px rgba(0, 0, 0, .1) solid;
                    .price {
                        font-size: 24px;
                        color: #DA0B0B;
                        font-weight: bold;
                    }
                    .price_num {
                        color: #DA0B0B;
                        font-size: 36px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
