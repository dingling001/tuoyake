<template>
    <div class="mbox">
        <div class="mhead">
            <div class="mimg"><img src="../../assets/logo.png" alt=""></div>
            <div class="namebox">
                <div class="nickname">使命召唤</div>
                <div class="mscroe"><span class="iconfont iconjifen"></span><span class="num">104</span></div>
            </div>
            <div class="iconfont iconshezhi1" @click="goset"></div>
        </div>
        <div class="mbody">
            <div class="mnav">
                <div class="mitem">
                    <div class="navimg"><img src="../../assets/img/m1.png" alt="">
                        <div class="navshadow"></div>
                    </div>
                    <div class="navtext">我的报名</div>
                </div>
                <div class="mitem">
                    <div class="navimg"><img src="../../assets/img/m2.png" alt="">
                        <div class="navshadow"></div>
                    </div>
                    <div class="navtext">我的收藏</div>
                </div>
                <div class="mitem">
                    <div class="navimg"><img src="../../assets/img/m3.png" alt="">
                        <div class="navshadow"></div>
                    </div>
                    <div class="navtext">我的订单</div>
                </div>
                <div class="mitem">
                    <div class="navimg"><img src="../../assets/img/m4.png" alt="">
                        <div class="navshadow"></div>
                    </div>
                    <div class="navtext">我的积分</div>
                </div>
            </div>
            <div class="mad"><img src="" alt=""></div>
            <div class="mlink">
                <van-cell is-link :border='false'>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <span class="iconfont iconyouhuiquan"></span>
                        <span class="custom-title">我的优惠券</span>
                    </template>
                </van-cell>
                <van-cell is-link :border='false'>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <span class="iconfont iconfeedback-center"></span>
                        <span class="custom-title">意见反馈</span>
                    </template>
                </van-cell>
                <van-cell is-link :border='false'>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <span class="iconfont iconshu"></span>
                        <span class="custom-title">版本信息</span>
                    </template>
                </van-cell>
                <van-cell is-link :border='false'>
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
        methods:{
            // 去设置页面
            goset(){
                this.$router.push('/login')
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
            }

            .namebox {
                flex: 1;

                .nickname {
                    font-size: 18px;
                    /*px*/
                    font-weight: bold;
                    margin-bottom: 11px;
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

            }

            .iconshezhi1 {
                font-size: 24px;
                /*px*/
            }
        }

        .mbody {
            margin: -10px 0 0 0;
            background-color: #fff;
            border-radius: 15px 15px 0px 0px;

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
                            width: 39px;
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
                margin: 15px 0;

                img {
                    width: 100%;
                }
            }

            .mlink {
                /deep/ .van-cell__title {
                    display: flex;
                    align-items: center;
                    color: #333;
                    font-weight: bold;
                    font-size: 15px;
                    /*px*/
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
        }
    }

</style>