<template>
    <div class="rbox">
        <div class="rlist">
            <div class="ritem" v-for="(item,index) in sglist" :key="item.id">
                <div class="rname">累计积分 {{item.score}} 分可领取：</div>
                <div class="rinfo">
                    <!--<div class="rimg"><img :src="item.image" alt=""></div>-->
                    <van-image fit="contain" width="1.6rem" height="1.6rem" :src="item.image"/>
                    <div class="rcontent">
                        <div class="rgname">{{item.goods_name}}</div>
                        <div class="rdes">
                            <span v-if="item.status>=1">已达成</span>
                            <span v-else>未达成</span>
                        </div>
                    </div>
                    <van-button type="default" :disabled="item.status!=1">
                        <span v-if="item.status==1">去领取</span>
                        <span v-else-if="item.status==2">已领取</span>
                        <span v-else>去领取</span>
                    </van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myReward",
        data() {
            return {
                sglist: []
            }
        },
        created() {
            this._ScoreGoods()
        },
        methods: {
            _ScoreGoods() {
                this.$api.ScoreGoods().then(res => {
                    if (res.code == 1) {
                        this.sglist = res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .rbox {
        min-height: 100vh;
        background-color: #F8F8F8;

        .rlist {
            margin: 13px;

            .ritem {
                background-color: #fff;
                padding: 17px;
                margin-bottom: 13px;

                .rname {
                    color: #333;
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
                        padding: 12px 0
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
        }

    }
</style>