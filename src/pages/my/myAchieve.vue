<template>
    <div class="score_box">
        <div class="score_top">
            <div class="iconbox">
                <div class="iconfont iconfanhui" @click="backmy"></div>
            </div>
            <div class="score_item">
                <div class="item">
                    <div class="scroe">{{user_times}}</div>
                    <div class="mys">获奖次数</div>
                </div>
                <!--<div class="item">-->
                <!--<div class="scroe">{{win}}</div>-->
                <!--<div class="mys">获奖次数</div>-->
                <!--</div>-->
            </div>

        </div>
        <div class="achieve_slider">
            <div class="process_trank">
                <div class="process" :style="{width: procss_w+'%'}"><span class="circle"><span
                        class="dot"></span></span></div>
                <div class="process_name">
                    <span v-for="(item,index) in achievement_times" :key="index">{{item}}次</span>
                </div>
            </div>
        </div>
        <div class="mlink">
            <van-cell is-link :border='false' to="myReward_app">
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
                user_times: 0,
                achievement_times: [],
                procss_w: 0
            }
        },
        created() {
            this._SignAchievement();
        },
        methods: {
            // 返回上一页
            backmy() {
                this.$router.go(-1)
            },
            _SignAchievement() {
                this.$api.SignAchievement().then(res => {
                    // console.log(res)
                    this.user_times = res.data.user_times;
                    this.achievement_times = res.data.achievement_times;
                    this.procss_w = this.user_times / res.data.achievement_times[res.data.achievement_times.length - 1]
                })
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
                padding: 0 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .iconfanhui {
                    font-weight: bold;
                    font-size: 16px;
                    /*px*/
                }
            }


            .score_item {
                padding: 35px 0 0 40px;
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
            border-radius: 10px 10px 0px 0px;
            margin-top: -10px;
            position: relative;
            z-index: 2;
            overflow: hidden;

            .process_trank {
                width: 325px;
                height: 8px;
                background-color: #C21717;
                margin: 30px auto;
                border-radius: 4px;
                position: relative;

                .process {
                    position: absolute;
                    border-radius: 4px;
                    left: 0;
                    top: 0;
                    width: 0;
                    height: 100%;
                    transition: ease-in-out 1s;
                    background-size: cover;
                    background-image: url("../../assets/img/jindu.png");
                    background-repeat: no-repeat;

                    .circle {
                        position: absolute;
                        width: 18px;
                        height: 18px;
                        left: -9px;
                        top: -5px;
                        background: rgba(228, 255, 0, 0);
                        border: 1px solid #E4FF00;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .dot {
                            background: #E4FF00;
                            width: 10px;
                            height: 10px;
                            display: block;
                            border-radius: 50%;
                        }
                    }
                }

                .process_name {
                    position: absolute;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    top: 16px;

                    span {
                        color: #fff;
                        font-size: 10px;
                        /*px*/
                    }
                }
            }
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