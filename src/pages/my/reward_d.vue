<template>
    <div class="rbox">
        <div class="rbox">
            <div class="aitem">
                <div class="left">
                    <div class="address">{{item.address}}</div>
                    <div class="namebx"><span>{{item.name}}</span> <span>{{item.mobile}}</span></div>
                    <span class="default_a" v-if="addinfo.is_default==1">默认</span>
                </div>
            </div>
            <div class="ritem">
                <div class="rname">奖品信息</div>
                <div class="rinfo">
                    <!--<div class="rimg"><img :src="item.image" alt=""></div>-->
                    <van-image width="60px" height="60px" fit="cover" :src="item.image"/>
                    <div class="rcontent">
                        <div class="rgname">{{item.goods_name}}</div>
                        <div class="rdes">X1</div>
                    </div>
                </div>
            </div>
            <div class="aitem">
                <div class="left">
                    <div class="address">领取时间</div>
                    <div>{{item.create_time}}</div>
                </div>
            </div>
            <div class="btn" @click="que_fadeback">问题反馈</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reward_d_app",
        data() {
            return {
                addinfo: {},
                item: {},
                showadd: false,
                noorder: require('../../assets/img/nodata.png')
            }
        },
        created() {
            this.goods_id = this.$route.query.goods_id;
            this._ScoreMyReceived()
        },

        methods: {
            _ScoreMyReceived() {
                this.$api.ScoreReceivedDetail(this.goods_id).then(res => {
                    if (res.code == 1) {
                        this.item = res.data;
                    }
                })
            },
            que_fadeback() {
                this.$router.push({path: '/myFeedback'})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .rbox {
        min-height: 100vh;
        background-color: #F8F8F8;

        .aitem {
            display: flex;
            justify-content: space-between;
            color: #333;
            padding: 20px 17px;
            background-color: #fff;
            margin: 15px 0 0 0;

            &.noadd {
                display: flex;
                align-items: center;
                justify-content: center;
                color: $baseBlue;
                font-size: 15px;
                /*px*/
                .iconplus-circle {
                    color: $baseBlue;
                    font-weight: bold;
                    margin-right: 5px;
                    font-size: 16px;
                    /*px*/

                }
            }

            .left {
                flex: 1;
                margin-right: 40px;
                position: relative;
                font-size: 13px;
                /*px*/
                .address {
                    font-size: 15px;
                    /*px*/
                    font-weight: bold;
                    padding-bottom: 15px;
                    text-align: justify;
                    line-height: 18px;
                }

                .namebx {
                    span {
                        margin-right: 20px;
                    }
                }

                .default_a {
                    position: absolute;
                    right: -35px;
                    top: 0;
                    font-size: 12px;
                    padding: 3px 5px;
                    border-radius: 5px;
                    color: #fff;
                    background-color: $baseBlue;
                }
            }

            .iconfont {
                flex-shrink: 0;
                font-size: 16px;
                /*px*/
                color: #C5CCD8;
            }

        }

        .ritem {
            background-color: #fff;
            padding: 17px;
            margin: 13px 0;

            .rname {
                color: #333;
                font-weight: bold;
                font-size: 14px;
                /*px*/
                padding: 0 0 16px 0;
            }

            .rinfo {
                display: flex;
                justify-content: space-between;

                .rcontent {
                    flex: 1;
                    margin: 0 13px;
                    font-size: 14px;
                    /*px*/
                    color: #333;
                }

                .rgname {

                }

                .rdes {
                    color: #666666;
                    font-size: 14px;
                    /*px*/
                    padding: 12px 0 5px 0;
                }

                /deep/ .van-button {
                    background-color: $baseBlue;
                    border-color: $baseBlue;
                    width: 55px;
                    height: 28px;
                    line-height: 28px;
                    color: #fff;

                    &.van-button--disabled {
                        background-color: #DDDDDD;
                        border-color: #DDDDDD;
                        opacity: 1;
                    }
                }
            }
        }

        .btn {
            width: 342px;
            margin: 40px auto;
            height: 44px;
            font-size: 17px;
            /*px*/
            line-height: 44px;
            color: #fff;
            text-align: center;
            background: $baseBlue;
            border-radius: 5px;
        }

    }
</style>