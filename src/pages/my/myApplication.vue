<template>
    <div class="score_box">
        <div class="score_top">
            <van-sticky :offset-top="0">
                <div class="iconbox">
                    <div class="iconfont iconfanhui" @click="backmy"></div>
                    <div class="name">我的报名</div>
                    <div @click="gomychieve">获奖成就 <span class="iconfont iconcaret-right"></span></div>
                </div>
            </van-sticky>
            <div class="score_item">
                <div class="item">
                    <div class="scroe">{{total}}</div>
                    <div class="mys">获奖次数</div>
                </div>
                <div class="item">
                    <div class="scroe">{{win}}</div>
                    <div class="mys">获奖次数</div>
                </div>
            </div>

        </div>
        <div class="mlink">
            <van-tabs type="card" color="#2C6BEA" title-active-color="#fff" title-inactive-color="#6285CC" sticky
                      :offset-top="44" v-model="nav_active" @click="changgeNav">
                <van-tab title="正在进行"></van-tab>
                <van-tab title="获奖赛事"></van-tab>
                <van-tab title="已结束"></van-tab>
                <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" v-if="show&&singList.length">
                    <van-list
                            v-model="isUpLoading" :finished="finished" @load="onLoad" class="comlist" :offset="offset"
                            finished-text="到底了">
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
                    </van-list>
                </van-pull-refresh>
                <div class="comlist" v-if="show&&singList.length==0">
                    <NoData :img="img" :text="''" :top="100"></NoData>
                </div>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import img from '../../assets/img/noapplication.png'

    export default {
        name: "myApplication",
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
                img: img
            }
        },
        created() {
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
                this.show=false;
                this.singList = [];
                this._GetSignList()
            },
            // 返回上一页
            backmy() {
                this.$router.go(-1)
            },
            gomychieve() {
                this.$router.push('/myAchieve')
            },
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$com.showtoast('刷新成功');
                    this.isDownLoading = false;
                    this.page = 0;
                    this._GetSignList();
                }, 500);
            },
            // 上拉加载
            onLoad() {
                this.page++;
                this.isUpLoading = true;
                this._GetSignList();
            },
            // 获取报名列表
            _GetSignList() {
                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                let pageNumber = this.page + 1;
                this.$api.GetSignList(pageNumber, this.status).then(res => {
                    this.show = true;
                    if (res.code == 1) {//请求成功
                        if (this.singList.length) {//当请求前有数据时 第n次请求
                            if (this.isUpLoading) {// 上拉加载
                                this.singList = this.singList.concat(res.data.data) //上拉加载新数据添加到数组中
                                this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                    this.isUpLoading = false  //关闭上拉加载中
                                })
                                if (res.data.data.length < 10) {//没有更多数据
                                    this.finished = true   //上拉加载完毕
                                }
                            }
                            if (this.isDownLoading) {//关闭下拉刷新
                                this.isDownLoading = false; //关闭下拉刷新中
                                this.singList = res.data.data; //重新给数据赋值
                                if (this.finished) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                    this.finished = false
                                }
                            }
                        } else {
                            this.singList = res.data.data
                        }
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

    .score_box {
        .score_top {
            background-image: url("../../assets/img/wdbm.png");
            height: 206px;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;

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

                .iconcaret-right {
                    font-size: 12px;
                    /*px*/
                }

                .name {
                    font-size: 17px;
                    /*px*/
                    padding-left: 35px;
                    display: none;
                }
            }

            /deep/ .van-sticky--fixed {
                z-index: 5;

                .name {
                    display: block
                }

                .iconbox {
                    background-color: #fff;
                    color: #333;
                }
            }

            .score_item {
                padding: 0 0 0 40px;
                display: flex;
                color: #fff;
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
                        font-size: 17px;
                        /*px*/
                    }
                }
            }
        }

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
                        width: 80%;
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
    }
</style>