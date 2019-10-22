<template>
    <div class="score_box">
        <div class="score_top">
            <div class="iconbox">
                <div class="iconfont iconfanhui" @click="backmy"></div>
            </div>
            <div class="score_item">
                <div class="item">
                    <div class="scroe">{{total}}</div>
                    <div class="mys">获奖次数</div>
                </div>
                <!--<div class="item">-->
                <!--<div class="scroe">{{win}}</div>-->
                <!--<div class="mys">获奖次数</div>-->
                <!--</div>-->
            </div>

        </div>
        <div class="achieve_slider"></div>
        <div class="mlink">
            <van-cell is-link :border='false' to="myReward">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                    <span class="iconfont iconmedal-fill"></span>
                    <span class="custom-title">奖励领取</span>
                </template>
            </van-cell>
            <van-cell is-link :border='false' to="myAddress">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                    <span class="iconfont icondizhiguanli"></span>
                    <span class="custom-title">地址设置</span>
                </template>
            </van-cell>
            <van-cell is-link :border='false' to="myRules?is_sign=1">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                    <span class="iconfont icondictionary-fill"></span>
                    <span class="custom-title">规则说明</span>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myAchieve",
        data() {
            return {
                total: 0,
                win: 0
            }
        },
        created() {
            this._SignIndex()
        },
        methods: {
            // 获取我的积分
            _SignIndex() {
                this.$api.SignIndex().then(res => {
                    if (res.code == 1) {
                        this.total = res.data.total;
                        this.win = res.data.win;

                    }
                })
            },
            // 返回上一页
            backmy() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .score_box {
        .score_top {
            background-image: url("../../assets/img/hjcj.png");
            height: 206px;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            z-index: 1;

            .iconbox {
                line-height: 44px;
                color: #fff;
                padding: 14px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .iconfanhui {
                    font-weight: bold;
                }

                .iconcaret-right {
                    font-size: 12px;
                    /*px*/
                }
            }


            .score_item {
                padding: 0 0 0 40px;
                display: flex;
                color: #ECAC77;
                text-align: center;

                .item {
                    margin-right: 40px;

                    .scroe {
                        font-size: 45px;
                        /*px*/
                        padding-bottom: 15px;
                        font-weight: bold;
                    }

                    .mys {
                        font-size: 13px;
                        /*px*/
                    }
                }
            }
        }

        .achieve_slider {
            height: 86px;
            background: linear-gradient(82deg, #EE614F, #EA3542);
            border-radius:10px 10px 0px 0px;
            margin-top: -10px;
            position: relative;
            z-index: 2;
        }

        .mlink {
            border-radius: 10px 10px 0px 0px;
            margin-top: -20px;
            position: relative;
            z-index: 3;
            overflow: hidden;
            background-color: #fff;

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
                font-size: 15px;
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

                &.iconmedal-fill {
                    font-size: 18px;
                    /*px*/
                }
            }


        }
    }
</style>