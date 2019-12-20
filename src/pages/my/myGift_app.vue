<template>
    <div class="rbox">
        <div class="rlist" v-if="myshow&&mylist.length">
            <div class="ritem" v-for="(item,index) in mylist" :key="item.id" @click="goreward_d_app(item.id)">
                <div class="rname">领取时间：{{item.create_time}}</div>
                <div class="rinfo">
                    <!--<div class="rimg"><img :src="item.image" alt=""></div>-->
                    <van-image fit="contain" width="1.6rem" height="1.6rem" :src="item.image"/>
                    <div class="rcontent">
                        <div class="rgname">{{item.goods_name}}</div>
                        <div class="rdes">X1</div>
                        <div class="">{{item.content}}</div>
                    </div>
                    <div class="iconfont iconjiantou"></div>
                </div>
            </div>
        </div>
        <NoData  v-if="myshow&&mylist.length==0" :text="'暂无领取数据'"></NoData>
    </div>
</template>

<script>
    export default {
        name: "myGift",
        data() {
            return {
                mylist: [],
                myshow:false
            }
        },
        created() {
            this._ScoreMyReceived()
        },

        methods: {
            _ScoreMyReceived() {
                this.$api.SignMyReceived().then(res => {
                    this.myshow=true;
                    if (res.code == 1) {
                        this.mylist = res.data;
                    }
                })
            },
            goreward_d_app(id){
                this.$router.push({
                    path: '/reward_d_app',
                    query: {goods_id: id}
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