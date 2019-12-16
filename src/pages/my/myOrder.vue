<template>
    <div class="colbox">
        <van-tabs v-model="active" title-inactive-color="#666" title-active-color="#333" sticky :offset-top="110"
                  color="#2C6BEA"
                  line-width="30px" @click="changetype">
            <van-tab title="全部"></van-tab>
            <van-tab title="未付款"></van-tab>
            <van-tab title="未使用"></van-tab>
            <van-tab title="已使用"></van-tab>
            <van-tab title="取消/退款"></van-tab>
            <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" v-if="ordershow&&list.length"
                              :offset="offset">
                <van-list
                        v-model="isUpLoading" :finished="finished" @load="onLoad" class="clist"
                        finished-text="到底了">
                    <!-- 加载的内容-->
                    <div class="citem" v-for="(item,index) in list" :key="index" @click="godetail(item.id)">
                        <div class="barnamebox"><span class="braname">{{item.bar_name}}</span><span class="status">{{item.status_text}}</span>
                        </div>
                        <div class="barinfo">
                            <div class="cimg">
                                <img :src="item.image" alt="">
                            </div>
                            <div class="cinfo">
                                <div>{{item.goods_name}}</div>
                                <div>下单时间：{{item.create_time}}</div>
                                <div class="order_num">X{{item.number}}</div>
                            </div>
                        </div>
                        <div class="cright">
                            <div>总金额：<span>￥39.8</span></div>
                            <div class="btns">
                                <!--                                <van-button type="danger" v-if="item.status==1">去付款</van-button>-->
                                <!--                                <van-button type="default" plain v-if="item.status==2">取消</van-button>-->
                                <!--                                <van-button type="info" v-if="item.status==3">再来一单</van-button>-->
                                <van-button type="default" plain>详情</van-button>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
            <div class="clist" v-if="ordershow&&list.length==0">
                <NoData :img="img1" :text="''"></NoData>
            </div>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "myOrder",
        data() {
            return {
                offset: 0,
                type: 0,
                active: 0,
                list: [],
                isDownLoading: false,
                isUpLoading: false,
                finished: false,
                page: 0,
                img1: require('../../assets/img/noorder.png'),
                ordershow: false
            }
        },
        // 0=全部,1=未付款,2=未使用,3=已使用,4=取消/退款
        created() {
            this._CollectionIndex();
        },
        methods: {
            // 获取列表
            _CollectionIndex() {
                let pageNumber = this.page + 1;
                this.$api.OrderIndex(
                    pageNumber,
                    this.type,
                ).then(res => {
                    this.ordershow = true;
                    if (res.code == 1) {//请求成功
                        if (this.list.length) {//当请求前有数据时 第n次请求
                            if (this.isUpLoading) {// 上拉加载
                                this.list = this.list.concat(res.data.data) //上拉加载新数据添加到数组中
                                this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                    this.isUpLoading = false  //关闭上拉加载中
                                })
                                if (res.data.data.length < 10) {//没有更多数据
                                    this.finished = true   //上拉加载完毕
                                }
                            }
                            if (this.isDownLoading) {//关闭下拉刷新
                                this.isDownLoading = false; //关闭下拉刷新中
                                this.list = res.data.data; //重新给数据赋值
                                if (this.finished) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                    this.finished = false
                                }
                            }
                        } else {
                            this.list = res.data.data
                        }
                    }
                    // console.log(this.list)
                });
                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
            },
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    console.log(this.type)
                    this.$com.showtoast('刷新成功');
                    this.isDownLoading = false;
                    this.page = 0;
                    this._CollectionIndex();
                }, 500);
            },
            // 上拉加载
            onLoad() {
                this.page++;
                this.isUpLoading = true;
                this._CollectionIndex();
            },

            // 改变类型
            changetype() {
                this.page = 0;
                this.type = this.active;
                this.ordershow = false;
                this.list = [];
                this._CollectionIndex()
            },
            // 去网吧详情
            godetail(id) {
                this.$router.push({path: '/download'})
                // query: {id: id}
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .colbox {
        background-color: #f8f8f8;

        /deep/ .van-tabs {
            .van-pull-refresh {
                min-height: 100vh;
            }
        }

        .clist {
            min-height: 300px;
            width: 350px;
            margin: 20px auto;
            position: relative;

            /deep/ .nodatabox {
                background: none;

                img {
                    width: 80%;
                    height: auto;
                }
            }

            .citem {
                background-color: #fff;
                margin-bottom: 12px;

                .barnamebox {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 0;
                    margin: 0 20px;
                    border-bottom: 1px solid #E4E4E4;

                    .braname {
                        color: #333;
                        font-size: 13px;
                        /*px*/
                        font-weight: bold;
                    }

                    .status {
                        font-size: 12px;
                        /*px*/
                    }
                }

                .barinfo {
                    display: flex;
                    padding: 15px 0;
                    margin: 0 20px;
                    border-bottom: 1px solid #E4E4E4;

                    .cimg {
                        flex-shrink: 0;
                        width: 62px;
                        height: 62px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 20px;
                        background-color: #f2f2f2;

                        img {
                            width: 100%;
                        }
                    }

                    .cinfo {
                        font-size: 12px;
                        /*px*/
                        color: #333;
                        line-height: 22px;

                        .order_num {
                            color: #999;
                        }
                    }
                }

                .cright {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 20px;

                    .btns {
                        display: flex;
                        align-items: center;

                        /deep/ .van-button {
                            margin-right: 15px;
                            width: 70px;
                            text-align: center;
                            padding: 0;
                            line-height: 28px;
                            height: 28px;
                            font-size: 13px;
                            /*px*/
                            color: #999;
                        }
                    }
                }
            }

        }
    }
</style>