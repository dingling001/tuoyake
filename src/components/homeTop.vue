<template>
    <div>
        <div id="map"></div>
        <van-sticky>
            <div class="index_top" ref="index_top" v-if="showtop">
                <div class="htop">
                    <div class="htopleft">
                        <span @click="tabhome(0,'/competition')" :class="{'activespan':ind==0}">电竞馆<span
                                class="border_b" v-if="ind==0"></span></span>
                        <span @click="tabhome(1,'/club')" :class="{'activespan':ind==1}">俱乐部<span class="border_b "
                                                                                                  v-if="ind==1"></span>
                    </span>
                        <span @click="tabhome(2,'/school')" :class="{'activespan':ind==2}">学院<span
                                class="border_b border_b1 " v-if="ind==2"></span>
                    </span>
                    </div>
                    <div class="index_address" @click="go_city">
                        <van-icon name="location"/>
                        <span>{{city||'定位中...'}}</span>
                    </div>
                </div>
                <router-link :to="'/search?type='+ind" tag="div" class="searchbox">
                    <div class="searchinput"><span class="iconfont iconsousuo1"></span><span>{{keyword}}</span></div>
                </router-link>
            </div>
            <div v-else class="htop" ref="gindex_top">
                <router-link tag="div" to="/search?type=0" class="searchinput"><span
                        class="iconfont iconsousuo1"></span><span>{{keyword}}</span>
                </router-link>
                <div class="index_address" @click="go_city"><span class="iconfont icondingweiweizhi"></span>{{city}}</div>
            </div>
        </van-sticky>
        <div class="swiperbox" v-if="showhome">
            <van-loading type="spinner" v-if="!flag"/>
            <div class="sbg"></div>
            <swiper :options="swiperOption" ref="mySwiper" v-if="flag&&swiperlist.length">
                <swiper-slide v-for="(item,index) in swiperlist" :key="index">
                    <van-image v-if="item.image_m" width="345ox" height="160px" fit="cover" :src="item.image_m"/>
                    <!--<img :src="item.image_m" alt="">-->
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" v-if="swiperlist.length>1"></div>
            </swiper>
            <NoData class="nodata" v-if="flag&&swiperlist.length==0" :top="0" :text="'商家还没有传图'"></NoData>
        </div>
        <div class="swiperbox" v-else @click="goad">
            <van-loading type="spinner" v-if="!adimginfo.image"/>
            <div class="sbg"></div>
            <div class="adimg">
                <img :src="adimginfo.image" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import {Dialog} from 'vant'

    export default {
        name: "homeTop",
        data() {
            var _ = this;
            return {
                title: '',
                city: '',
                ind: 0,
                keyword: '电竞馆名称/地址',
                swiperOption: {
                    pagination: '.swiper-pagination',
                    observers: true,
                    observeParents: true,
                    spaceBetween: 10,
                    loop: true,
                    autoplay: 3000,
                    onClick: function (swiper) {
                        let i = swiper.realIndex;
                        let flag = _.swiperlist[i];
                        let type = parseInt(flag.type);
                        switch (type) {
                            case 0:
                                break;
                            case 1:
                                if (flag.object_id == 0) {
                                    _.$router.push({path: '/competition'});
                                } else {
                                    _.$router.push({path: '/competitiondetail/' + flag.object_id});
                                }
                                break;
                            case 2:
                                if (flag.object_id == 0) {

                                } else {
                                    _.$router.push({path: '/gamedetail', query: {match_id: flag.object_id}});
                                }
                                break;
                            case 3:
                                if (flag.object_id == 0) {
                                    _.$router.push({path: '/club'});
                                } else {
                                    _.$router.push({path: '/clubdetail', query: {club_id: flag.object_id}});
                                }
                                break;
                            case 4:
                                if (flag.object_id == 0) {
                                    _.$router.push({path: '/school'});
                                } else {
                                    _.$router.push({path: '/schooldetail', query: {college_id: flag.object_id}});
                                }
                                break;
                            default:
                                location.replace('/')
                        }
                        // "type": "类型:0=无需跳转,1=网吧详情,2=赛事详情,3=俱乐部,4=电竞学院",
                        //   "object_id": "跳转对象ID，根据type跳转对应详情界面，0为列表页",
                        // console.log(flag)
                    }
                },
                swiperlist: [],
                offsettop: 0,
                flag: false,
                adimginfo: {},
                keywords: ['电竞馆名称/地址', '俱乐部名称/地址', '学院名称/地址']
            };
        },
        provide() {
            return {
                app: this
            };
        },
        props: {
            wapcity: {
                type: String,
                default: ''
            },
            showhome: {
                type: Boolean,
                default: true
            },
            showtop: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            '$route'(val) {
                console.log(val.fullPath)
                if (val.fullPath.indexOf('/competition') !== -1) {
                    this.ind = 0;
                    this.keyword = '电竞馆名称/地址'
                } else if (val.fullPath.indexOf('/club') !== -1) {
                    this.ind = 1;
                    this.keyword = '俱乐部名称/地址'
                } else {
                    this.ind = 2;
                    this.keyword = '学院名称/地址'
                }
                if (this.showtop) {
                    this.offsettop = this.$refs.index_top.offsetHeight;
                    localStorage.offsettop = this.offsettop;
                } else {
                    localStorage.gindex_top = this.$refs.gindex_top.offsetHeight;
                }
            },
        },
        created() {
            this.title = '托亚克 | ' + this.city;
        },
        mounted() {
            var _ = this;
            this.ind = this.$route.meta.index || 0;
            this.keyword = this.keywords[this.ind];
            if (this.showtop) {
                this.offsettop = this.$refs.index_top.offsetHeight;
                localStorage.offsettop = this.offsettop;
            } else {
                localStorage.gindex_top = this.$refs.gindex_top.offsetHeight;
            }
            // console.log(sessionStorage.wapcity ,'wapcity')
            if (sessionStorage.wapcity) {
                this.city = sessionStorage.wapcity;
                _.$emit('pos', JSON.parse(sessionStorage.pos))
                _.$emit('city', _.city);
                _.$emit('cityinfo', _.city, JSON.parse(sessionStorage.pos));
                if (this.showhome) {
                    _._GetSlideList()
                } else {
                    this._GetAdv();
                }
            } else {
                this.initMap();
                // this.initmap1()
            }
        },
        components: {
            swiper,
            swiperSlide,
        },
        methods: {
            // 切换滑块
            tabhome(index, path) {
                this.ind = index;
                this.$router.push(path)
            },
            // 获取轮播图
            _GetSlideList() {
                this.$api.GetSlideList(this.city).then((res) => {
                    if (res.code == 1) {
                        this.flag = true;
                        this.swiperlist = res.data;
                    } else {
                        // this.$com.showtoast(res.msg)
                    }
                })
            },
            // 获取广告位
            _GetAdv() {
                this.$api.GetAdv(2).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.adimginfo = res.data;
                    }
                })
            },
            goad() {
                let _ = this;
                let flag = this.adimginfo;
                let type = parseInt(this.adimginfo.type);
                flag.url && window.open(flag.url)
                // console.log(type)
                // switch (type) {
                //     case 0:
                //         break;
                //     case 1:
                //         if (flag.id == 0) {
                //             _.$router.push({path: '/competition'});
                //         } else {
                //             _.$router.push({path: '/competitiondetail/' + flag.object_id});
                //         }
                //         break;
                //     case 2:
                //         if (flag.object_id == 0) {
                //
                //         } else {
                //             _.$router.push({path: '/gamedetail', query: {match_id: flag.object_id}});
                //         }
                //         break;
                //     case 3:
                //         if (flag.object_id == 0) {
                //             _.$router.push({path: '/club'});
                //         } else {
                //             _.$router.push({path: '/clubdetail', query: {club_id: flag.object_id}});
                //         }
                //         break;
                //     case 4:
                //         if (flag.object_id == 0) {
                //             _.$router.push({path: '/school'});
                //         } else {
                //             _.$router.push({path: '/schooldetail', query: {college_id: flag.object_id}});
                //         }
                //         break;
                //     default:
                //         location.replace('/')
                // }
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
                    getlocation.getCurrentPosition(function (status, res) {
                        if (status == 'complete' && res.status == 1) {
                            localStorage.loccity = res.addressComponent.city || res.addressComponent.province;
                            _.city = sessionStorage.wapcity || res.addressComponent.city || res.addressComponent.province || '北京';
                            var pos = [res.position.lat, res.position.lng];
                            sessionStorage.pos = JSON.stringify(pos);
                            sessionStorage.wapcity = res.addressComponent.city || res.addressComponent.province;
                            _.$emit('city', _.city);
                            _.$emit('pos', [res.position.lat, res.position.lng])
                            // _.keyword = res.addressComponent.street;
                            _.$emit('cityinfo', _.city, pos);
                            if (_.showhome) {
                                _._GetSlideList()
                            } else {
                                _._GetAdv();
                            }
                        } else {
                            _.$com.showtoast('获取位置失败');
                            Dialog.alert({
                                title: '',
                                message: '为了正常使用，\n 请开启GPRS定位功能'
                            }).then(() => {
                                _.city = '北京';

                                _.$emit('pos', ['39.73', '116.33'])
                                sessionStorage.pos = JSON.stringify(['39.73', '116.33']);
                                _.$emit('city', _.city);
                                _.$emit('cityinfo', _.city, ['39.73', '116.33']);
                                if (_.showhome) {
                                    _._GetSlideList()
                                } else {
                                    _._GetAdv();
                                }
                            })
                        }
                    })
                })
            },
            go_city() {
                this.$router.push({path: '/changecity'})
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../style/reset";

    /deep/ .van-sticky {
        background-image: url("../assets/img/index_bg.png");
        background-size: 100% auto;
        background-position: top center;
        background-repeat: no-repeat;
    }

    .index_top {
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
        /*padding: 22px 15px;*/
        height: 115px;
        /*background: linear-gradient(90deg, #441219, #29182E);*/
        background-image: url("../assets/img/index_bg.png");
        background-size: 100% auto;
        background-position: top center;
        background-repeat: no-repeat;

        .htop {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 22px 15px 0 15px;

            .htopleft {
                span {
                    font-size: 15px;
                    /* px */
                    margin-right: 28px;
                    position: relative;
                    color: #fff;
                    display: inline-block;
                    z-index: 2;
                    letter-spacing: 2px;
                    transition: all .3s;

                    &:last-child {
                        margin: 0;
                    }

                    .border_b {
                        position: absolute;
                        width: 35px;
                        height: 6px;
                        background: linear-gradient(90deg, $baseBlue, $baseRed);
                        border-radius: 3px;
                        left: 0;
                        bottom: -2px;
                        z-index: -1;
                        padding: 0;
                    }

                    .border_b1 {
                        width: 27px;
                    }
                }

                .activespan {
                    font-weight: bold;
                    font-size: 17px;
                    /*px*/
                }
            }

            .index_address {
                color: #fff;
                padding: 4px 8px;
                background-color: $baseRed;
                border-radius: 12px;
                display: flex;
                align-items: center;

                .iconfont {
                    margin-right: 2px;
                }
            }
        }

        .searchbox {
            padding: 25px 15px 12px 15px;

            .searchinput {
                height: 32px;
                background: rgba(255, 255, 255, .1);
                border-radius: 16px;
                padding: 10px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(255, 255, 255, .3);
                font-size: 14px;
                /*px*/
                .iconfont {
                    margin-right: 8px;
                    font-weight: normal;
                    font-size: 16px;
                }

                &:active {
                    opacity: .7;
                }
            }

        }

    }

    .htop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 22px 15px;
        width: 100%;
        background-image: url("../assets/img/index_bg.png");
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
                font-size: 16px;
                /*px*/
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
                font-size: 16px;
                /*px*/
            }

        }
    }

    .swiperbox {
        height: 160px;
        /*border-radius: 16px;*/
        position: relative;
        overflow: hidden;

        .sbg {
            background: linear-gradient(90deg, #441219, #29182E);
            height: 130px;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
        }

        .swiper-container {
            height: 100%;
            width: 345px;
            margin: 0 auto;
            position: relative;
            z-index: 3;

            .swiper-slide {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                /*background-color: #000;*/
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid $baseRed;
                /*no*/
                img {
                    width: 100%;
                    display: block;
                    font-size: 0;
                    border: 0;
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

        .adimg {
            width: 354px;
            height: 160px;
            margin: 0 auto;
            border-radius: 10px;
            position: relative;
            z-index: 3;
            display: block;
            overflow: hidden;

            img {
                width: 100%;
            }

        }
    }

    .amap-box {
        display: none;
    }
</style>