<template>
    <div class="mbox">
        <div class="mhead" v-if="user_twap">
            <div class="mimg" @click="goset">
<!--                <div class="van-row&#45;&#45;flex van-cell&#45;&#45;center van-row&#45;&#45;justify-center" v-if="!user_info.avatar"><van-loading type="spinner"/></div>-->
                <van-image :src="user_info.avatar" alt="" width="61px"
                           height="61px" fit="cover" v-if="user_info.avatar"/>
            </div>
            <div class="namebox">
                <div class="nickname">
                    <span class="name">{{user_info.nickname}}</span>
                    <div class="iconfont iconshezhi1" @click="goset"></div>
                </div>
                <div class="mscroe" @click="goPoints"><span class="iconfont iconjifen"></span><span class="num">{{user_info.score}}</span>
                </div>
            </div>
        </div>
        <div class="mhead" v-else>
            <div class="mimg nologin" @click="gologin">登录/注册</div>
            <div class="namebox">
                <div class="nickname">
                    <span></span>
                    <div class="iconfont iconshezhi1" @click="goset"></div>
                </div>
            </div>
        </div>
        <div class="mbody">
            <van-tabbar route :fixed="false" :border="false">
                <van-tabbar-item to="/myApplication">
                    <span>我的报名</span>
                    <img slot="icon" src="../../assets/img/m1.jpg" alt>
                </van-tabbar-item>
                <van-tabbar-item to="/myCollect">
                    <span>我的收藏</span>
                    <img slot="icon" src="../../assets/img/m2.jpg" alt>
                </van-tabbar-item>
                <van-tabbar-item to="/myOrder" :info="onum>0?onum:''">
                    <span>我的订单</span>
                    <img slot="icon" src="../../assets/img/m3.jpg" alt>
                </van-tabbar-item>
                <van-tabbar-item to="/myPoints">
                    <span>我的积分</span>
                    <img slot="icon" src="../../assets/img/m4.jpg" alt>
                </van-tabbar-item>
            </van-tabbar>
            <!--            <div class="mnav">-->
            <!--                <router-link class="mitem" to="/myApplication" tag="div">-->
            <!--                    <div class="navimg"><img src="../../assets/img/m1.jpg" alt="">-->
            <!--                        <div class="navshadow"></div>-->
            <!--                    </div>-->
            <!--                    <div class="navtext">我的报名</div>-->
            <!--                </router-link>-->
            <!--                <router-link class="mitem" to="/myCollect" tag="div">-->
            <!--                    <div class="navimg"><img src="../../assets/img/m2.jpg" alt="">-->
            <!--                        <div class="navshadow"></div>-->
            <!--                    </div>-->
            <!--                    <div class="navtext">我的收藏</div>-->
            <!--                </router-link>-->
            <!--                <router-link class="mitem" to="/myOrder" tag="div">-->
            <!--                    <div class="navimg"><img src="../../assets/img/m3.jpg" alt="">-->
            <!--                        <div class="navshadow"></div>-->
            <!--                    </div>-->
            <!--                    <div class="navtext">我的订单</div>-->
            <!--                </router-link>-->
            <!--                <router-link class="mitem" to="/myPoints" tag="div">-->
            <!--                    <div class="navimg"><img src="../../assets/img/m4.jpg" alt="">-->
            <!--                        <div class="navshadow"></div>-->
            <!--                    </div>-->
            <!--                    <div class="navtext">我的积分</div>-->
            <!--                </router-link>-->
            <!--            </div>-->
            <div class="mad" @click="openad" v-if="adinfo.image"><img :src="adinfo.image" alt=""></div>
            <div class="mlink">
                <!--<van-cell is-link :border='false' to="myCoupon">-->
                <!--&lt;!&ndash; 使用 title 插槽来自定义标题 &ndash;&gt;-->
                <!--<template slot="title">-->
                <!--<span class="iconfont iconyouhuiquan"></span>-->
                <!--<span class="custom-title">我的优惠券</span>-->
                <!--<van-tag type="danger" v-if="cnum>0">{{cnum}}</van-tag>-->
                <!--</template>-->
                <!--</van-cell>-->
                <van-cell is-link :border='false' to="myFeedback">
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <span class="iconfont iconfeedback-center"></span>
                        <span class="custom-title">意见反馈</span>
                    </template>
                </van-cell>
                <!--<van-cell is-link :border='false' to="myVersion">-->
                <!--&lt;!&ndash; 使用 title 插槽来自定义标题 &ndash;&gt;-->
                <!--<template slot="title">-->
                <!--<span class="iconfont iconshu"></span>-->
                <!--<span class="custom-title">版本信息</span>-->
                <!--</template>-->
                <!--</van-cell>-->
                <van-cell is-link :border='false' to="myPlatform">
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <span class="iconfont iconguanyuwomen"></span>
                        <span class="custom-title">关于我们</span>
                    </template>
                </van-cell>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my",
        data() {
            return {
                adinfo: {},
                user_twap: '',
                user_info: {},
                active: -1,
                icon: {
                    active: 'https://img.yzcdn.cn/vant/user-active.png',
                    inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
                },
                onum: 0,
                cnum: 0
            }
        },
        created() {
            this._GetAdv();
            if (localStorage.user_twap) {
                this.user_twap = localStorage.user_twap;
                this._GetUserInfo()
                this._OrderGetOrderNum();
                this._GetCouponList()
            }
        },
        methods: {
            // 去设置页面
            goset() {
                this.$router.push({path: '/myset'})
            },
            goPoints() {
                this.$router.push({path: '/myPoints'})
            },
            // 获取个人信息
            _GetUserInfo() {
                this.$api.GetUserInfo().then(res => {
                    // console.log(res)
                    if (res.code == 1) {
                        this.user_info = res.data;
                    }
                })
            },
            _OrderGetOrderNum() {
                this.$api.OrderGetOrderNum().then(res => {
                    // console.log(res)
                    if (res.code == 1) {
                        this.onum = res.data;

                    }
                })
            },
            _GetCouponList() {
                this.$api.GetCouponList(1, 0).then(res => {
                    if (res.code == 1) {
                        this.cnum = res.data.total;
                    }
                })
            },
            // 获取广告位
            _GetAdv() {
                this.$api.GetAdv(1).then(res => {
                    // console.log(res)
                    if (res.code == 1 && res.data) {
                        this.adinfo = res.data;
                    }
                })
            },
            // 登录
            gologin() {
                this.$router.push({path: '/login'})
            },
            openad() {
                window.open(this.adinfo.url)
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .mbox {
        .mhead {
            height: 163px;
            background: linear-gradient(90deg, #441219, #29182E);
            padding: 44px 17px 0 20px;
            color: #fff;
            display: flex;
            justify-content: space-between;

            .mimg {
                width: 62px;
                height: 62px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                border-radius: 50%;
                margin-right: 15px;
                flex-shrink: 0;
                border: 1px solid $baseRed;
                /*no*/
                img {
                    width: 100%;
                }

                &.nologin {
                    font-size: 13px;
                    /*px*/
                }
            }

            .namebox {
                flex: 1;

                .nickname {
                    font-size: 18px;
                    /*px*/
                    font-weight: bold;
                    margin-bottom: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    transition: all .3s;

                    .name {
                        flex: 1;
                    }
                }

                .mscroe {
                    background: linear-gradient(120deg, #F45630, #F2313B);
                    border-radius: 8px;
                    padding: 2px 5px;
                    display: inline-flex;
                    align-items: center;
                    font-size: 12px;
                    /*px*/
                    .iconjifen {
                        font-size: 12px;
                        /*px*/
                        margin-right: 2px;
                    }
                }

                /deep/ .van-sticky--fixed {
                    .nickname {
                        padding: 11px 17px;
                        font-size: 14px;
                        /*px*/
                        text-align: center;
                        background-color: #fff;
                        color: #333;
                    }
                }
            }

            .iconshezhi1 {
                font-size: 24px;
                /*px*/
            }
        }

        .mbody {
            margin: -15px 0 0 0;
            background-color: #fff;
            border-radius: 15px;
            padding: 0 0 20px 0;
            position: relative;
            z-index: 10;

            .mnav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 35px;

                .mitem {
                    padding: 30px 0 15px 0;
                    text-align: center;

                    .navimg {
                        height: 56px;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: space-between;

                        img {
                            /*width: 100%;*/
                            /*width: 39px;*/
                            height: 100%;
                        }

                        /*.navshadow {*/
                        /*width: 21px;*/
                        /*height: 10px;*/
                        /*background: rgba(0, 0, 0, .2);*/
                        /*opacity: .3;*/
                        /*border-radius: 50%;*/
                        /*}*/
                    }

                }
            }

            .mad {
                height: 100px;
                padding: 0 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                /*margin: 15px 0;*/
                img {
                    width: 100%;
                }
            }

            .mlink {
                padding: 25px 0;

                /deep/ .van-cell__title {
                    display: flex;
                    align-items: center;

                    .custom-title {
                        color: #333;
                        font-weight: bold;
                        font-size: 15px;
                        /*px*/
                        margin-right: 10px;
                    }

                    .van-tag {
                        border-radius: 50%;
                        flex-shrink: 0;
                    }
                }

                .iconfont {
                    width: 16px;
                    font-size: 13px;
                    /*px*/
                    color: #BBBCCB;
                    background-image: -webkit-linear-gradient(right, #BBBCCB, #EAEAEA);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-right: 10px;

                    &.iconyouhuiquan {
                        font-size: 10px;
                        /*px*/
                    }

                    &.iconshu {
                        font-size: 16px;
                        /*px*/
                    }
                }


            }

            /deep/ .van-tabbar {
                height: auto;
                /*padding: 0 35px;*/
                border-radius: 15px;

                .van-tabbar-item {
                    width: auto;
                    padding: 30px 0 15px 0;

                    .van-tabbar-item__icon {
                        height: 56px;

                        img {
                            height: 100%;
                        }
                    }

                    .van-tabbar-item__text {
                        color: #666666;
                        font-size: 12px;
                        /*    px*/
                    }

                    .van-info {
                        right: 10px;
                    }
                }
            }
        }
    }

</style>