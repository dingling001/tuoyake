<template>
    <div class="jbox">
        <div class="jnav">
            <span :class="{activespan:ind==index}" v-for="(item,index) in clist" :key="item.id">{{item.name}}</span>
        </div>
        <div class="jlist">
            <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" v-if="clublist.length">
                <van-list
                        v-model="isUpLoading" :finished="finished" @load="onLoad" class="jlist" :offset="offset"
                        :finished-text="finishedtext">
                    <div class="jitem van-row--flex" v-for="(item,index) in clublist">
                        <div class="jimg"><img src="" alt=""></div>
                        <div class="jright">
                            <div class="jname van-ellipsis">Invictus GamingInvictus GamingInvictus GamingInvictus
                                GamingInvictus GamingInvictus Gaming
                            </div>
                            <div class="jinfo"><span class="name">王经理</span><span class="tel">17622687799</span></div>
                            <div class="jaddress van-ellipsis">
                                和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>

    export default {
        name: "club",
        data() {
            return {
                clist: [],
                clublist: [],
                ind: 0,
                page: 0,
                keyword: '',
                city: '',
                category_id: '',
                isUpLoading: false,
                isDownLoading: false,
                finished: false,
                offset: 100,
                finishedtext:'到底了'
            }
        },
        created() {
            this._Category()
        },
        watch: {
            'city': {
                handler(val) {
                    this.city = val;
                    console.log(this.city)
                    this._ClubIndex();
                },
                immediate: true
            }
        },
        methods: {
            // 获取俱乐部分类
            _Category() {
                this.$api.Category().then(res => {
                    if (res.code == 1) {
                        this.clist = res.data
                    }
                })
            },
            // 获取俱乐部列表
            _ClubIndex() {
                let pageNumber = this.page + 1;
                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                this.$api.ClubIndex(
                    pageNumber,
                    this.category_id,
                    this.keyword,
                    this.city,
                ).then(res => {
                    if (res.code == 1) {//请求成功
                        if (this.clublist.length) {//当请求前有数据时 第n次请求
                            if (this.isUpLoading) {// 上拉加载
                                this.clublist = this.clublist.concat(res.data.data) //上拉加载新数据添加到数组中
                                this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                    this.isUpLoading = false  //关闭上拉加载中
                                })
                                if (res.data.data.length < 10) {//没有更多数据
                                    this.finished = true   //上拉加载完毕
                                    this.finishedtext='到底了'
                                }
                            }
                            if (this.isDownLoading) {//关闭下拉刷新
                                this.isDownLoading = false; //关闭下拉刷新中
                                this.clublist = res.data.data; //重新给数据赋值
                                if (this.finished) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                    this.finished = false
                                }
                            }
                        } else {
                            console.log(res)
                            this.clublist = res.data.data;
                            this.finishedtext='没有更多了'
                        }
                    }

                })
            },
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$com.showtoast('刷新成功');
                    this.isDownLoading = false;
                    this.page = 0;
                    this._ClubIndex();
                }, 500);
            },
            // 上拉加载
            onLoad() {
                this.page++;
                this.isUpLoading = true;
                this._ClubIndex();
            },
        }
    }
</script>

<style scoped lang="scss">
    .jbox {
        background-color: #fff;
        margin-top: -10px;
        border-radius: 10px 10px 0 0;
        padding: 60px 0;

        .jnav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px;

            span {
                font-size: 12px;
                /*px*/
                padding: 25px 0;
                color: #999;
            }

            .activespan {
                color: #333;
            }

        }

        .jlist {
            .jitem {
                margin: 0 17px 17px 17px;
                /*display: flex;*/
                padding: 0 0 15px 0;
                border-bottom: 1px solid #eee;
                /*no*/
                .jimg {
                    width: 74px;
                    height: 74px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    /*px*/
                    border: 1px solid #eee;
                    /*no*/
                    margin-right: 17px;
                    flex-shrink: 0;
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
                        max-width: 240px;
                    }

                    .jinfo {
                        font-size: 12px;
                        /*px*/
                        color: #666666;
                    }

                    .jaddress {
                        color: #666666;
                        font-size: 12px;
                        /*px*/
                        max-width: 240px;
                    }
                }
            }

        }
    }
</style>