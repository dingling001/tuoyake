<template>
    <div class="score_box">
        <div class="score_top">
            <div class="iconfont iconfanhui" @click="backmy"></div>
            <div class="scroe"><countTo :startVal='0' :endVal='parseInt(score)' separator="" :duration='3000'></countTo></div>
<!--                <Count :startVal='0' :endVal='' :speed='3000' :decimals="0" :isReverse='false' ></Count>-->
            <div class="mys">我的积分</div>
        </div>
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
            <van-cell is-link :border='false' to="myRules">
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
    import countTo from 'vue-count-to';
    export default {
        name: "myPoints",
        data() {
            return {
                score: 0
            }
        },
        components:{
            countTo
        },
        created() {
            this._ScoreIndex()
        },
        methods: {
            // 获取我的积分
            _ScoreIndex() {
                this.$api.ScoreIndex().then(res => {
                    if (res.code == 1) {
                        this.score = res.data.score;
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
            background-image: url("../../assets/img/wdjf.png");
            height: 206px;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            z-index: 1;

            .iconfanhui {
                line-height: 44px;
                color: #fff;
                padding: 14px 15px;
                font-size: 17px;
                /*px*/
            }

            .scroe {
                font-size: 45px;
                /*px*/
                color: #fff;
                padding: 27px 0 15px 51px;
                font-weight: bold;
            }

            .mys {
                padding-left: 51px;
                color: #fff;
            }
        }

        .mlink {
            border-radius: 10px 10px 0px 0px;
            margin-top: -20px;
            position: relative;
            z-index: 2;
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