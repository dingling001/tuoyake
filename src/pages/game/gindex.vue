<template>
    <div class="index">
        <!--<div class="index_top">-->
        <!--<van-sticky :offset-top="0">-->
        <!--<div class="htop">-->
        <!--<div class="searchinput"><span class="iconfont iconsousuo1"></span><span>{{street}}</span></div>-->
        <!--<div class="index_address"><span class="iconfont icondingweiweizhi"></span> {{city}}</div>-->
        <!--</div>-->
        <!--</van-sticky>-->
        <!--<div class="swiperbox">-->
        <!--&lt;!&ndash;<swiper :options="swiperOption" ref="mySwiper">&ndash;&gt;-->
        <!--&lt;!&ndash;<swiper-slide v-for="(item,index) in swiperlist" :key="index"><img :src="item.image_m" alt="">&ndash;&gt;-->
        <!--&lt;!&ndash;</swiper-slide>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="swiper-pagination" slot="pagination"></div>&ndash;&gt;-->
        <!--&lt;!&ndash;</swiper>&ndash;&gt;-->
        <!--<img :src="adimg" alt="">-->
        <!--</div>-->
        <!--</div>-->
        <homeTop @cityinfo="getcityinfo" :showhome="false" :showtop="false" ref="htop"></homeTop>
        <div class="cbox">
            <van-sticky :offset-top="offsettop">
                <div class="cselect">
                    <div :class="['cselectitem',recommend==1?'cselectitemactive':'']" @click="recommendlist">
                        <span>推荐电竞馆</span>
                    </div>
                    <van-dropdown-menu active-color="#f2313b">
                        <van-dropdown-item v-model="label" :options="labellist" @open="openlabel" @change="changelabel">
                            <!--<span>全部服务</span><span class="iconfont iconjiantouarrow486"></span>-->
                        </van-dropdown-item>
                        <van-dropdown-item :title="district" ref="item" @open="opendistrict">
                            <div class="citybox">
                                <div class="citems dleft">
                                    <div v-for="(item ,index) in districtlist" :key="index"
                                         :class="{activecity:index==lindex}"
                                         @click="selcetcity(index)">
                                        {{item.name}}
                                    </div>
                                </div>
                                <div class="citems dright">
                                    <div v-for="(c ,cindex) in districtlist[lindex].childlist" :key="cindex"
                                         :class="{activecity:rindex==cindex}" @click="selcetarea(cindex,c.name)">
                                        {{c.name}}
                                    </div>
                                </div>
                            </div>

                            <!--<span>全部地区</span><span class="iconfont iconjiantouarrow486"></span>-->
                        </van-dropdown-item>
                        <!--<div :class="['cselectitem',recommend==1?'cselectitemactive':'']" @click="recommendlist">-->
                        <!--<span>推荐电竞馆</span>-->
                        <!--</div>-->
                    </van-dropdown-menu>
                </div>
            </van-sticky>
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
    </div>
</template>

<script>
    import homeTop from '../../components/homeTop'

    export default {
        name: "competition",
        data() {
            return {
                isDownLoading: false,
                isUpLoading: false,
                finished: false,
                offsettop: parseInt(localStorage.gindex_top) || 0,
                page: 0,
                keyword: '',
                city: localStorage.wapcity || '北京',
                lat: 0,
                lng: 0,
                recommend: 0,
                label: '',
                district: '',
                circle: '',
                netlist: [],
                offset: 0,
                labellist: [
                    {value: '', text: '全部服务'}
                ],
                districtlist: [
                    {
                        id: '',
                        childlist: [],
                        name: " 全部地区",
                        pid: '',
                        spacer: ""
                    }
                ],
                citypid: '',
                lindex: 0,
                rindex: 0,
                totop: false,
                flag: false,

            }
        },
        components: {
            homeTop
        },
        watch: {
            $route(val) {
                console.log(val)
            }
        },
        inject: ['app'],
        created() {

        },

        mounted() {
            // this._GetBarList();
            // this.getcityinfo();

            this._GetLabelList();
        },
        methods: {
            // 获取当前城市
            getcityinfo(val, val1) {
                console.log(val1, 'gindex')
                this.city = val;
                this.lat = val1[0];
                this.lng = val1[1];
                this._GetBarList();
                this._GetAreaPidByName()
            },

            // 根据城市获取id
            _GetAreaPidByName() {
                this.$api.GetAreaPidByName(this.city).then(res => {
                    // console.log(`${JSON.stringify(res)}res`)
                    this.citypid = res.data;
                    this._GetAreaListTree()
                })
            },
            // 获取列表
            _GetBarList() {
                let pageNumber = this.page + 1;

                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                this.$api.GetBarList(
                    pageNumber,
                    this.keyword,
                    this.city,
                    this.lat,
                    this.lng,
                    this.recommend,
                    this.label,
                    this.lindex == 0 ? '' : this.district,
                    this.circle,
                ).then(res => {
                    this.flag = true;
                    if (res.code == 1) {//请求成功
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
            // 获取服务标签
            _GetLabelList() {
                this.$api.GetLabelList().then(res => {
                    if (res.code == 1) {
                        var labellist = res.data;
                        for (let i in labellist) {
                            this.labellist.push({
                                value: labellist[i],
                                text: labellist[i]
                            })
                        }
                        ;
                        this.label = this.labellist[0].value;
                        // console.log(this.labellist)
                    }
                })
            },
            // 切换成推荐模式
            recommendlist() {
                this.page = 0;
                if (this.recommend == 1) {
                    this.recommend = 0
                } else {
                    this.recommend = 1
                }
                this.flag = false;
                this.netlist = [];

                this._GetBarList();
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
            // 获取当前城市的区
            _GetAreaListTree() {
                this.$api.GetAreaListTree(this.citypid).then(res => {
                    this.districtlist = this.districtlist.concat(res.data);
                    // console.log(this.districtlist)
                    this.district = this.districtlist[0].name;
                })
            },
            // 选择城市
            selcetcity(index) {
                this.lindex = index;
                if (index == 0) {
                    this.$refs.item.toggle();
                    this.district = this.districtlist[index].name;
                    this.page = 0;
                    this.netlist = [];
                    this._GetBarList();
                }
            },
            // 选择地区
            selcetarea(index, name) {
                this.rindex = index;
                this.$refs.item.toggle();
                this.district = name;
                this.page = 0;
                this.netlist = [];
                this._GetBarList();
            },
            // 打开全部服务
            openlabel() {
                // console.log(this.offsettop);
                // window.scrollTo = 100
                window.scrollTo(0, 0)
                // this.gotop()
            },
            // 切换服务标签
            changelabel() {
                this.page = 0;
                this.netlist = [];
                this._GetBarList();
            },
            // 打开全部列表
            opendistrict() {
                this._GetAreaListTree()
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

    .index {
        .index_top {
            /*display: flex;*/
            /*align-items: center;*/
            /*justify-content: space-between;*/
            height: 220px;
            /*background: linear-gradient(90deg, #441219, #29182E);*/
            background-image: url("../../assets/img/index_bg.png");
            background-size: 100% auto;
            background-position: top center;
            background-repeat: no-repeat;

            .htop {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 22px 15px;
                width: 100%;
                background-image: url("../../assets/img/index_bg.png");
                background-size: 100% auto;
                background-position: top center;
                background-repeat: no-repeat;

                .index_address {
                    color: #fff;
                    padding: 5px 8px;
                    background-color: $baseRed;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;

                    .iconfont {
                        margin-right: 2px;
                    }
                }

                .searchinput {
                    height: 32px;
                    background: rgba(255, 255, 255, .1);
                    border-radius: 16px;
                    line-height: 32px;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, .3);
                    margin-right: 14px;
                    font-size: 14px;
                    /*px*/
                    .iconfont {
                        margin-right: 8px;
                    }

                }
            }

            .swiperbox {
                height: 160px;
                border-radius: 16px;
                width: 354px;
                margin: 0 auto;
                overflow: hidden;
                z-index: 3;
                position: relative;

                img {
                    width: 100%;
                }

                .swiper-container {
                    height: 100%;

                    .swiper-slide {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fff;
                        background-color: #000;
                        border-radius: 10px;
                        overflow: hidden;

                        img {
                            width: 100%;
                        }
                    }

                    /deep/ .swiper-pagination {
                        .swiper-pagination-bullet {
                            height: 5px; /* no*/
                            width: 5px; /* no*/
                            border-radius: 5px; /* no*/
                            background: rgba(255, 255, 255, 0.3);
                            opacity: 1;
                        }

                        .swiper-pagination-bullet-active {
                            width: 15px;
                            background: rgba(255, 255, 255, 0.7);
                            transition: all .3s;
                        }
                    }
                }
            }
        }

        .cbox {
            margin-top: -50px;
            position: relative;
            z-index: 2;
            background-color: #fff;
            border-radius: 10px 10px 0 0;
            padding: 60px 0 0 0;

            .cselect {
                /*padding: 0 39px;*/
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #333333;
                background-color: #fff;
                font-size: 12px;
                /* px */
                /*border-bottom: 1px solid #f5f5f5;*/
                .cselectitem {
                    display: flex;
                    align-items: center;
                    padding: 25px 0;
                    flex: 1;
                    justify-content: center;

                    .iconfont {
                        color: #BBBBBB;
                        font-size: 14px;
                        /*px*/
                        margin-left: 5px;
                    }

                    &.cselectitemactive {
                        color: $baseRed;
                        font-weight: bold;
                    }
                }

                /deep/ .van-cell {
                    font-size: 12px;
                    /*px*/
                }

                /deep/ .van-dropdown-menu {
                    flex: 2;

                    .van-ellipsis {
                        font-size: 12px;
                        /*px*/
                    }


                    &:after {
                        border: 0;
                    }

                    .citybox {
                        /*align-items: center;*/
                        /*justify-content: space-between;*/
                        position: relative;
                        max-height: 300px;
                        min-height: 220px;
                        overflow: hidden;

                        .citems {
                            position: absolute;
                            flex: 1;
                            text-align: center;
                            width: 50%;
                            height: 100%;
                            overflow: scroll;

                            div {
                                padding: 10px 0;
                                font-size: 12px;
                                /*px*/
                                color: #666;

                                &.activecity {
                                    color: $baseRed;
                                    font-weight: bold;
                                }
                            }

                            &.dleft {
                                left: 0;
                            }

                            &.dright {
                                right: 0;

                            }
                        }
                    }
                }
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
    }
</style>
