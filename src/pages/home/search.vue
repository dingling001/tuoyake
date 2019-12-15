<template>
    <div class="searchbox">
        <van-sticky>
            <div class="searchtop">
                <div class="search_input">
                    <van-icon name="search"/>
                    <input type="text" :placeholder="placeholder" v-model="keyword">
                </div>
                <van-button size="mini" v-if="keyword" color="linear-gradient(90deg,#2F61D2,#D0313E)" plain hairline
                            @click="seachAnswer">搜索
                </van-button>
                <van-button size="mini" v-else color="transparent" type="default" @click="backindex">取消</van-button>
            </div>
        </van-sticky>
        <div class="search_his">
            <div><span class="iconfont icontime-circle"></span>搜索历史</div>
            <div v-if="slist.length" @click="_SearchClear"><span class="iconfont iconshanchu"></span>清空</div>
        </div>
        <div class="hislist" v-if="slist.length">
            <span></span>
        </div>
        <div v-if="netlist.length" class="total">共{{total}}条搜索记录</div>
        <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" v-if="flag&&netlist.length">
            <van-list
                    v-model="isUpLoading" :finished="finished" @load="onLoad" class="clist" :offset="offset"
                    finished-text="到底了">
                <!-- 加载的内容-->
                <div class="citem" v-for="(item,index) in netlist" :key="index" @click="godetail(item.id)">
                    <div class="cimg">
                        <img :src="item.image" alt="">
                        <span v-if="item.recommend==1">推荐</span>
                    </div>
                    <div class="cright">
                        <div class="name single-line-text">{{item.name}}</div>
                        <div class="cname">
                            <div class="namebox">
                                <div class="startbox">
                                    <span class="iconfont iconstar-fill" v-for="s in parseInt(item.star)"></span>
                                </div>
                            </div>
                            <div class="juli">{{item.distance}}</div>
                        </div>
                        <div class="ctype"><span v-for="l in item.label_ids" class="single-line-text"
                                                 :style="{maxWidth:(1/item.label_ids.length)*100+'%'}">{{l}}</span>
                        </div>
                        <div class="caddress ">
                            <!--                            <span class="iconfont van-icon-location"></span>-->
                            <van-icon name="location-o"/>
                            <span class="single-line-text">{{item.address}}</span>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <div class="clist" v-if="flag&&netlist.length==0">
            <NoData class="nodata" :top="0" :text="'暂无匹配的商家'"></NoData>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",

        data() {
            return {
                placeholder: '电竞馆名称/地址',
                isDownLoading: false,
                isUpLoading: false,
                finished: false,
                offsettop: 0,
                page: 0,
                keyword: '',
                city: '北京',
                lat: 0,
                lng: 0,
                recommend: 0,
                label: '',
                district: '',
                circle: '',
                netlist: [],
                flag: false,
                offset: 0,
                total: 0,
                slist: []
            }
        },
        created() {
            if (localStorage.user_twap) {
                this._SearchHistory()
            }
            this.position = JSON.parse(sessionStorage.pos);
            this.city = sessionStorage.wapcity || '北京';
        },
        methods: {
            seachAnswer() {
                this.netlist = []
                this.page = 0;
                if (this.keyword) {
                    this._GetBarList()
                }
            },
            _SearchHistory() {
                this.$api.SearchHistory().then(res => {
                    if (res.code == 1) {
                        this.slist = res.data.list

                    }
                })
            },
            _SearchClear() {
                this.$api.SearchClear().then(res => {
                    if (res.code == 1) {
                        this.$com.showtoast('清除成功！')
                        this.slist = [];
                    } else {
                        this.$com.showtoast(res.msg)

                    }
                })
            },
            backindex() {
                this.$router.go(-1)
            },
            // 获取列表
            _GetBarList() {
                let pageNumber = this.page + 1;
                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                this.$api.GetBarList(
                    pageNumber,
                    this.keyword,
                    this.city,
                    this.position[0],
                    this.position[1],
                    this.recommend,
                    this.label,
                    this.lindex == 0 ? '' : this.district,
                    this.circle,
                ).then(res => {
                    this.flag = true;
                    if (res.code == 1) {//请求成功
                        this.total = res.data.total;
                        if (this.netlist.length) {//当请求前有数据时 第n次请求
                            if (this.isUpLoading) {// 上拉加载
                                this.netlist = this.netlist.concat(res.data.data) //上拉加载新数据添加到数组中
                                this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                    this.isUpLoading = false  //关闭上拉加载中
                                })
                                if (res.data.data.length < 10) {//没有更多数据
                                    this.finished = true   //上拉加载完毕
                                }
                            }
                            if (this.isDownLoading) {//关闭下拉刷新
                                this.isDownLoading = false; //关闭下拉刷新中
                                this.netlist = res.data.data; //重新给数据赋值
                                if (this.finished) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                    this.finished = false
                                }
                            }
                        } else {
                            this.netlist = res.data.data
                        }
                    }
                    // console.log(this.netlist)
                })
            },
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$com.showtoast('刷新成功');
                    this.isDownLoading = false;
                    this.page = 0;
                    this._GetBarList();
                }, 500);
            },
            // 上拉加载
            onLoad() {
                this.page++;
                this.isUpLoading = true;
                this._GetBarList();
            },
            // 去详情
            godetail(id) {
                this.$router.push({path: '/competitiondetail', query: {id: id}})
            },
        }

    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .searchbox {
        .searchtop {
            color: rgba(255, 255, 255, .3);
            height: 56px;
            display: flex;
            align-items: center;
            background: linear-gradient(90deg, #441219, #29182E);
            padding: 0 15px;

            .search_input {
                flex: 1;
                display: flex;
                align-items: center;
                padding: 0 18px;
                font-size: 13px;
                /*px*/
                /deep/ .van-icon {
                    color: rgba(255, 255, 255, .3);
                    line-height: 56px;
                    margin-right: 8px;
                    font-size: 20px;
                    /*    px*/
                }

                input {
                    flex: 1;
                    background: none;
                    height: 56px;

                    &::placeholder {
                        color: rgba(255, 255, 255, .3);
                        font-size: 14px;
                        /*px*/
                    }
                }
            }
        }

        .search_his {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #999999;
            font-size: 12px;
            /*px*/
            padding: 24px 16px;

            .iconfont {
                color: #999999;

                font-size: 14px;
                /*px*/
                margin-right: 5px;
            }
        }

        .hislist {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            span {
                min-width: 30px;
                text-align: center;
                padding: 10px;
                background-color: #F4F4F4;
                margin: 0 12px 10px 0;
            }
        }

        .total {
            color: #999999;
            font-size: 12px;
            /*px*/
            padding: 20px;
        }

        .clist {
            transition: ease-in-out .3s;
            position: relative;
            min-height: 200px;

            .citem {
                display: flex;
                justify-content: space-between;
                padding: 0 0 0 15px;
                margin: 0 0 30px 0;
                transition: ease-in-out .3s;

                .cimg {
                    flex-shrink: 0;
                    width: 90px;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                    background-color: #f2f2f2;
                    position: relative;
                    border-radius: 8px;
                    overflow: hidden;

                    img {
                        width: 100%;
                    }

                    span {
                        position: absolute;
                        background: linear-gradient(90deg, #ec8215, #f0a532);
                        top: 0;
                        left: 0;
                        border-radius: 8px 0 8px 0;
                        color: #fff;
                        text-align: center;
                        line-height: 17px;
                        font-size: 11px;
                        /*    px*/
                        width: 40px;
                    }
                }

                .cright {
                    flex: 1;
                    /*height: 90px;*/
                    .name {
                        color: #333333;
                        font-weight: bold;
                        font-size: 14px;
                        /*px*/
                        max-width: 235px;
                        line-height: 18px;
                    }

                    .cname {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 15px 0 0;
                        margin: 5px 0 0 0;

                        .namebox {
                            display: flex;
                            align-items: center;

                            .startbox {
                                display: flex;
                                align-items: center;

                                .iconfont {
                                    color: $baseRed;
                                    font-size: 14px;
                                    /*px*/
                                }
                            }
                        }

                        .juli {
                            color: #666666;
                        }
                    }

                    .ctype {
                        display: flex;
                        align-items: center;
                        margin: 5px 0 0 0;
                        flex-wrap: wrap;
                        min-height: 15px;

                        span {
                            padding: 3px 5px;
                            /*background-color: ;*/
                            background: rgba(242, 49, 59, .1);
                            color: $baseRed;
                            border-radius: 8px;
                            margin: 0 5px 5px 0;
                        }
                    }

                    .caddress {
                        display: flex;
                        align-items: center;
                        color: #666666;
                        font-size: 12px;
                        /*px*/
                        padding: 5px 15px 5px 0;
                        border-bottom: 1px solid #E4E4E4;
                        /*no*/
                        .van-icon {
                            color: #999999;
                            font-weight: bold;
                            font-size: 14px;
                            /*px*/
                            margin-right: 2px;
                        }

                        .single-line-text {
                            max-width: 220px;
                        }
                    }
                }

                &:last-child {
                    margin: 0;
                }
            }

        }
    }

</style>