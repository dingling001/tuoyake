<template>
    <div class="index">
        <!--<el-amap class="amap-box" vid="map" :plugin="plugin"></el-amap>-->
        <div id="map"></div>
        <van-sticky>
            <div class="index_top" ref="index_top">
                <div class="htop">
                    <div class="htopleft">
                    <span @click="tabhome(0,'/competition')" :class="{'activespan':ind==0}">
                        电竞馆
                        <span class="border_b" v-if="ind==0"></span>
                    </span>
                        <span @click="tabhome(1,'/club')" :class="{'activespan':ind==1}">俱乐部
                        <span class="border_b " v-if="ind==1"></span>
                    </span>
                        <span @click="tabhome(2,'/school')" :class="{'activespan':ind==2}">学院
                        <span class="border_b border_b1 " v-if="ind==2"></span>
                    </span>
                    </div>
                    <div class="index_address" @click="go_city"><span class="iconfont icondingweiweizhi"></span><span>{{city}}</span>
                    </div>
                </div>
                <router-link :to="{name:'search', params: {keyword:keyword}}" tag="div" class="searchbox">
                    <div class="searchinput"><span class="iconfont iconsousuo1"></span><span>{{keyword}}</span></div>
                </router-link>
            </div>
        </van-sticky>
        <div class="swiperbox">
            <div class="sbg"></div>
            <swiper :options="swiperOption" ref="mySwiper" v-if="swiperlist.length">
                <swiper-slide v-for="(item,index) in swiperlist" :key="index"><img :src="item.image_m" alt="">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <router-view class="router-view" :lat="lat" :lng="lng" :city="city"></router-view>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import Bus from '../../bin/Bus'

    export default {
        name: "home",
        data() {
            return {
                transitionName: 'transitionLeft',
                title: '',
                city: localStorage.wapcity || '北京',
                ind: 0,
                keyword: '电竞馆名称/地址',
                swiperOption: {
                    pagination: '.swiper-pagination',
                    observers: true,
                    observeParents: true,
                    spaceBetween: 10,
                    loop: true,
                    autoplay: 3000,
                },
                swiperlist: [],
                offsettop: 0,
                lat: 0,
                lng: 0
            };
        },
        provide: {
            app: this
        },
        watch: {
            '$route'(val) {
                console.log(val.fullPath)
                if (val.fullPath.indexOf('/competition') !== -1) {
                    this.ind = 0
                } else if (val.fullPath.indexOf('/club') !== -1) {
                    this.ind = 1;
                } else {
                    this.ind = 2
                }
                this.offsettop = this.$refs.index_top.offsetHeight;
                // console.log(this.offsettop)
                Bus.$emit("home", this.offsettop);
                this._GetAreaPidByName()
            },
            city: {
                handler(val) {
                    var _ = this;
                    _._GetSlideList();
                },
                immediate: true
            }
        },
        created() {
            this.title = '托亚克 | ' + this.city;

        },
        mounted() {
            this.ind = this.$route.meta.index || 0;
            this.offsettop = this.$refs.index_top.offsetHeight;
            localStorage.offsettop = this.offsettop;
            Bus.$emit("home", this.offsettop);
            this.initMap()
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
                this.$api.GetSlideList(localStorage.wapcity ).then((res) => {
                    if (res.code == 1) {
                        this.swiperlist = res.data;
                    } else {
                        this.$com.showtoast(res.msg)
                    }
                })
            },
            // 根据城市获取id
            _GetAreaPidByName() {
                this.$api.GetAreaPidByName(localStorage.wapcity ).then(res => {
                    // console.log(`${(res)}res`)
                    Bus.$emit("citypid", res.data)
                    Bus.$emit("city",localStorage.wapcity );
                    Bus.$emit('lat', this.lat);
                    Bus.$emit('lng', this.lng);
                })
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
                            // console.log(res)
                            localStorage.loccity = res.addressComponent.province;
                            _.city = localStorage.wapcity || res.addressComponent.province;
                            _.keyword = res.addressComponent.street;
                            _.lat = res.position.lat;
                            _.lng = res.position.lng;
                            _._GetAreaPidByName();
                        } else {
                            // Bus.$emit("citypid", 2)
                            // Bus.$emit("city", '北京');
                            // Bus.$emit('lat', 0);
                            // Bus.$emit('lng', 0);
                        }
                        _._GetSlideList();
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
    @import "../../style/reset";

    .index {
        background-image: url("../../assets/img/index_bg.png");
        background-size: 100% auto;
        background-position: top center;
        background-repeat: no-repeat;

        /deep/ .van-sticky {
            background-image: url("../../assets/img/index_bg.png");
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
            background-image: url("../../assets/img/index_bg.png");
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
                        /*px*/
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
                    }
                }

            }

        }

        .swiperbox {
            height: 160px;
            border-radius: 16px;
            position: relative;

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
                    background-color: #000;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 1px solid $baseRed;

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

        .router-view {
            margin-top: -60px;
            position: relative;
            /*z-index: 2;*/
            background-color: #fff;
            border-radius: 10px 10px 0 0;
            padding: 60px 0 0 0;
        }

        .amap-box {
            display: none;
        }
    }
</style>
