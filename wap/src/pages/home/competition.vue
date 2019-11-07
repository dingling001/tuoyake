<template>
    <div class="cbox">
        <div id="map"></div>
        <van-sticky :offset-top="offsettop" class="sticky ">
            <div class="cselect">
                <div :class="['cselectitem',recommend==1?'cselectitemactive':'']" @click="recommendlist">
                    <span>推荐电竞馆</span>
                </div>
                <van-dropdown-menu active-color="#f2313b">
                    <van-dropdown-item v-model="label" :options="labellist" @open="showoverlay=true"
                                       @close="showoverlay=false" @change="changelabel">
                        <!--<span>全部服务</span><span class="iconfont iconjiantouarrow486"></span>-->
                    </van-dropdown-item>
                    <van-dropdown-item :title="district" ref="item" @open="showoverlay=true" @close="showoverlay=false">
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
                                     :class="{activecity:rindex==cindex}" @click="selcetarea(cindex,c.name)">{{c.name}}
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
        <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" v-if="netlist.length">
            <van-list
                    v-model="isUpLoading" :finished="finished" @load="onLoad" class="clist" :offset="offset"
                    finished-text="到底了">
                <!-- 加载的内容-->
                <div class="citem" v-for="(item,index) in netlist" :key="index" @click="godetail(item.id)">
                    <div class="cimg">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="cright">
                        <div class="cname">
                            <div class="namebox">
                                <div class="name single-line-text">{{item.name}}</div>
                                <div class="startbox">
                                    <span class="iconfont iconstar-fill" v-for="s in parseInt(item.star)"></span>
                                </div>
                            </div>
                            <span class="juli">{{item.distance}}</span>
                        </div>
                        <div class="ctype"><span v-for="l in item.label_ids">{{l}}</span></div>
                        <div class="caddress">
                            <span class="iconfont icondingweiweizhi"></span>
                            <span class="single-line-text">{{item.address}}</span>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <div class="nodata" v-else> 暂无数据</div>
        <van-overlay :show="showoverlay" @click="showoverlay = false" :z-index="5"/>
    </div>
</template>

<script>
    import Bus from '../../bin/Bus'

    export default {
        name: "competition",
        data() {
            return {
                isDownLoading: false,
                isUpLoading: false,
                finished: false,
                offsettop: 0,
                page: 0,
                keyword: '',
                city: '',
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
                showoverlay: false
            }
        },
        inject: ['app'],
        created() {
            this.offsettop = parseInt(localStorage.offsettop);
            Bus.$on("home", (val, val1) => {    //取  Bus.$on
                this.offsettop = val;
                // console.log(this.offsettop)
            });
            // 获取城市的pid
            Bus.$on("citypid", (val, val1) => {    //取  Bus.$on
                this.citypid = val;
                // console.log(this.citypid)
                // this._GetAreaListTree()
                // this._GetBarList();
            });
            Bus.$on("lat", (val, val1) => {    //取  Bus.$on
                this.lat = val;
                // console.log(this.lat, 'lat1')
            });
            Bus.$on("lng", (val, val1) => {    //取  Bus.$on
                this.lng = val;
                // console.log(this.lng, 'lng1')
                // this._GetBarList();
                // console.log(this.lng, 'lng3')
            });
            Bus.$on("city", (val, val1) => {    //取  Bus.$on
                this.city = val;
                // this._GetBarList();
            });

        },
        mounted() {
            // this._GetBarList();
            this.initMap()
            this._GetLabelList();
        },
        watch: {
            'lat'(val) {
                this.lat = val;
                // console.log(this.lat, 'lat2')
            },
            'lng'(val) {
                this.lng = val;
                // console.log(this.lng, 'lng2')
                // this._GetBarList();
            },
            'city'(val) {
                this.city = val;
                // this._GetBarList();
            },
            'citypid'(val) {
                // console.log(val)
                // this._GetAreaListTree()
            },
            $route: {
                handler(to, from) {
                    // this._GetBarList();
                },
                immediate: true
            }
        },
        methods: {
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
                // console.log(this.recommend)
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
                // window.scrollTo(0, 0)
                // this.gotop()
                this.showoverlay = true;
            },
            // 切换服务标签
            changelabel() {
                this.page = 0;
                this.netlist = [];
                this._GetBarList();
            },
            // 滚动到指定位置
            gotop() {
                let jump = document.querySelectorAll('.cselect')
                let total = jump[0].offsetTop;
                let distance = document.documentElement.scrollTop || document.body.scrollTop
                // 平滑滚动，时长500ms，每10ms一跳，共50跳
                console.log(distance)
                let step = total / 10
                if (total > distance) {
                    smoothDown()
                } else {
                    let newTotal = distance - total;
                    console.log(newTotal)
                    step = newTotal / 50;
                    smoothUp()
                }

                function smoothDown() {
                    if (distance < total) {
                        distance += step
                        document.body.scrollTop = distance
                        document.documentElement.scrollTop = distance
                        setTimeout(smoothDown, 10)
                    } else {
                        document.body.scrollTop = total
                        document.documentElement.scrollTop = total
                    }
                    console.log('smoothDown')
                }

                function smoothUp() {
                    if (distance > total) {
                        distance -= step
                        document.body.scrollTop = distance
                        document.documentElement.scrollTop = distance
                        setTimeout(smoothUp, 10)
                    } else {
                        document.body.scrollTop = total;
                        document.documentElement.scrollTop = total
                    }
                    console.log('smoothUp')
                }
            },
            // 打开全部列表
            opendistrict() {
                this._GetAreaListTree()
            },
            // 去详情
            godetail(id) {
                this.$router.push({path: '/competitiondetail', query: {id: id}})
            },
            // 初始化地图
            initMap() {
                var _ = this;
                let map = new AMap.Map('map', {
                    zoom: 0
                });
                map.plugin(['AMap.Autocomplete', 'AMap.Geolocation'], function () {
                    let getlocation = new AMap.Geolocation({
                        timeout: 6000,
                    })
                    map.addControl(getlocation)
                    getlocation.getCurrentPosition(function (status, res) {
                        if (status == 'complete' && res.status == 1) {
                            _.city = res.addressComponent.province;
                            _.lat = res.position.lat;
                            _.lng = res.position.lng;

                        } else {
                            _.city = '天津市'
                        }
                        _._GetAreaPidByName()
                    })
                })
            },
            // 根据城市换取id
            _GetAreaPidByName() {
                this.$api.GetAreaPidByName(this.city).then(res => {
                    console.log(res)
                    // console.log(`${JSON.stringify(res)}res`)
                    // Bus.$emit("citypid", res.data)
                    // Bus.$emit("city", this.city);
                    // Bus.$emit('lat', this.lat);
                    // Bus.$emit('lng', this.lng);
                    this.citypid = res.data;
                    this._GetAreaListTree();
                    this._GetBarList();
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .cbox {
        .sticky {
            position: relative;
            z-index: 10;
        }

        .cselect {
            padding: 0 39px;
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
            .citem {
                display: flex;
                justify-content: space-between;
                padding: 0 15px;
                margin: 0 0 30px 0;

                .cimg {
                    flex-shrink: 0;
                    width: 90px;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                    background-color: #f2f2f2;

                    img {
                        width: 100%;
                    }
                }

                .cright {
                    flex: 1;
                    height: 90px;
                    display: flex;
                    flex-direction: column;

                    .cname {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .namebox {
                            display: flex;
                            align-items: center;

                            .name {
                                color: #333333;
                                font-weight: bold;
                                font-size: 14px;
                                /*px*/
                                max-width: 120px;
                            }

                            .startbox {
                                display: flex;
                                align-items: center;
                                margin: 0 5px;

                                .iconfont {
                                    color: $baseRed;
                                    font-size: 14px;
                                    /*px*/
                                }
                            }
                        }
                    }

                    .ctype {
                        display: flex;
                        align-items: center;
                        margin: 15px 0;
                        flex-wrap: wrap;
                        max-width: 240px;

                        span {
                            padding: 3px 5px;
                            /*background-color: ;*/
                            background: rgba(242, 49, 59, .1);
                            color: $baseRed;
                            border-radius: 8px;
                            margin-right: 5px;
                        }
                    }

                    .caddress {
                        display: flex;
                        align-items: center;
                        color: #666666;
                        font-size: 12px;
                        /*px*/
                        padding: 0 0 15px 0;
                        border-bottom: 1px solid #E4E4E4;
                        /*no*/
                        .iconfont {
                            color: #999999;
                            font-size: 10px;
                            /*px*/
                            margin-right: 5px;
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
