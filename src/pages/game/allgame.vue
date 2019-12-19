<template>
    <div class="mlink">
        <van-tabs type="card" color="#2C6BEA" title-active-color="#fff" title-inactive-color="#6285CC" sticky
                  :offset-top="44" v-model="nav_active" @click="changgeNav">
            <van-tab title="精选赛事"></van-tab>
            <van-tab title="进行赛事"></van-tab>
            <van-tab title="过往赛事"></van-tab>
            <div class="comlist" v-if="show&&singList.length">
                <div class="jitem van-row--flex" v-for="(item,index) in singList" :key="item.id"
                     @click="gossdetail(item.id)">
                    <div class="jimg"><img :src="item.image" alt="">
                        <!--<span v-if="item.recommend==1">精选</span>-->
                    </div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.league_name}}</div>
                        <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
                        <!--</div>-->
                        <div class="jaddress van-ellipsis"><span class="iconfont icontime-circle"></span>
                            {{item.start_time}} ~ {{item.end_time}}
                        </div>
                        <div class="synopsis van-ellipsis">{{item.bar_name}}</div>
                    </div>
                </div>
            </div>
            <div class="comlist" v-if="show&&singList.length==0">
                <NoData :text="'暂无相关赛事'" :top="30"></NoData>
            </div>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "allgame",
        data() {
            return {
                total: 0,
                win: 0,
                isDownLoading: false,
                isUpLoading: false,
                finished: false,
                offset: 0,
                page: 0,
                status: 1,
                singList: [],
                nav_active: 0,
                show: false,
                bar_id: ''
            }
        },
        created() {
            this.bar_id = this.$route.query.bar_id;
            this._SignIndex();
            this._GetSignList()
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
            changgeNav() {
                this.status = this.nav_active + 1;
                this.page = 0;
                this.show = false;
                this.singList = [];
                this._GetSignList()
            },
            // 获取报名列表
            _GetSignList() {
                this.$api.GetMatchList(this.bar_id, this.status).then(res => {
                    this.show = true;
                    if (res.code == 1) {//请求成功
                        this.singList = res.data.data
                    }
                })
            },
            // 去赛事详情
            gossdetail(id) {
                this.$router.push({path: '/gamedetail', query: {match_id: id, cid: this.id}})
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";
    .mlink {
        border-radius: 10px 10px 0px 0px;
        margin-top: -20px;
        position: relative;
        z-index: 2;
        overflow: hidden;
        background-color: #fff;

        /deep/ .van-tabs {
            margin: 30px 0;

            .van-tabs__nav {
                border-radius: 5px;
            }
        }

        .comlist {
            padding: 20px 0;
            min-height: 300px;
            position: relative;

            /deep/ .nodatabox {
                img {
                    width: 60%;
                    height: auto;
                }
            }

            .taocan {
                padding: 15px 18px;
                font-weight: bold;
                font-size: 16px;
                /*px*/
                color: #333;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .spanbox {
                    display: flex;
                    align-items: center;
                }

                .span {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    text-align: center;
                    line-height: 18px;
                    background-color: $baseRed;
                    color: #fff;
                    font-size: 12px;
                    /*px*/
                    margin-right: 5px;
                }

                .all {
                    font-size: 13px;
                    /*px*/
                    color: #999;

                    .iconfont {
                        color: #CCCCCC;
                        font-size: 12px;
                        /* px*/
                    }
                }
            }

            .jitem {
                margin: 0 17px 17px 17px;
                /*display: flex;*/
                padding: 0 0 15px 0;
                border-bottom: 1px solid #eee;
                /*no*/
                position: relative;

                .jimg {
                    width: 62px;
                    height: 62px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /*border: 1px solid #eee;*/
                    /*no*/
                    margin-right: 17px;
                    flex-shrink: 0;
                    overflow: hidden;
                    position: relative;

                    img {
                        width: 100%;
                    }

                }

                .jright {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .jname {
                        font-size: 14px;
                        /* px */
                        font-weight: bold;
                    }

                    .jinfo {
                        font-size: 12px;
                        /*px*/
                        color: #666666;

                        .name {
                            margin-right: 10px;
                        }
                    }

                    .jaddress {
                        color: #666666;
                        font-size: 12px;
                        /*px*/

                        .icontime-circle {
                            font-size: 12px;
                            /*px*/
                            color: #666666;
                        }
                    }

                    .price {
                        color: $baseRed;
                        font-weight: bold;
                        font-size: 15px;
                        /*px*/
                    }

                    .synopsis {
                        max-width: 200px;
                        font-size: 12px;
                        /*px*/
                        color: #666666;
                    }
                }

                .jbtn {
                    width: 50px;
                    background: linear-gradient(0deg, rgba(255, 135, 126, 1), rgba(242, 49, 59, 1));
                    border-radius: 16px;
                    position: absolute;
                    right: 16px;
                    bottom: 36px;
                    line-height: 32px;
                    text-align: center;
                    color: #F8F8F8;
                    font-size: 13px;
                    /*px*/
                    &.s_jbtn {
                        background: $baseBlue;
                    }
                }
            }
        }
    }
</style>