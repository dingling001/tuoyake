<template>
    <div class="index">
        <div class="index_top">
            <div class="htop">
                <div class="searchinput"><span class="iconfont iconsousuo1"></span><span>{{keyword}}</span></div>
                <div class="index_address"><span class="iconfont icondingweiweizhi"></span> {{city}}</div>
            </div>
            <div class="swiperbox">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in swiperlist" :key="index"><img :src="item.image_m" alt="">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>
        <div class="cbox">
            <div class="cselect">
                <div class="cselectitem"><span>推荐电竞馆</span><span class="iconfont iconjiantouarrow486"></span></div>
                <div class="cselectitem"><span>全部服务</span><span class="iconfont iconjiantouarrow486"></span></div>
                <div class="cselectitem"><span>全部地区</span><span class="iconfont iconjiantouarrow486"></span></div>
            </div>
            <div class="clist">
                <div class="citem">
                    <div class="cimg"><img
                            src="http://qiniu.tuoyake.com/uploads/20190811/e2fc061b3b18e7847a7082c6a6526ad0.png" alt="">
                    </div>
                    <div class="cright">
                        <div class="cname">
                            <div class="namebox">
                                <div class="name single-line-text">网鱼网咖网鱼网咖网鱼网咖网鱼网咖</div>
                                <div class="startbox">
                                    <span class="iconfont iconstar-fill" v-for="item in 5"></span>
                                </div>
                            </div>
                            <span class="juli">1.1km</span>
                        </div>
                        <div class="ctype"><span>环境优雅</span></div>
                        <div class="caddress">
                            <span class="iconfont icondingweiweizhi"></span><span class="single-line-text">和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号(金融街中心店)</span>
                        </div>
                    </div>
                </div>
                <div class="citem">
                    <div class="cimg"><img
                            src="http://qiniu.tuoyake.com/uploads/20190811/e2fc061b3b18e7847a7082c6a6526ad0.png" alt="">
                    </div>
                    <div class="cright">
                        <div class="cname">
                            <div class="namebox">
                                <div class="name single-line-text">网鱼网咖网鱼网咖网鱼网咖网鱼网咖</div>
                                <div class="startbox">
                                    <span class="iconfont iconstar-fill" v-for="item in 5"></span>
                                </div>
                            </div>
                            <span class="juli">1.1km</span>
                        </div>
                        <div class="ctype"><span>环境优雅</span></div>
                        <div class="caddress">
                            <span class="iconfont icondingweiweizhi"></span><span class="single-line-text">和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号(金融街中心店)</span>
                        </div>
                    </div>
                </div>
                <div class="citem">
                    <div class="cimg"><img
                            src="http://qiniu.tuoyake.com/uploads/20190811/e2fc061b3b18e7847a7082c6a6526ad0.png" alt="">
                    </div>
                    <div class="cright">
                        <div class="cname">
                            <div class="namebox">
                                <div class="name single-line-text">网鱼网咖网鱼网咖网鱼网咖网鱼网咖</div>
                                <div class="startbox">
                                    <span class="iconfont iconstar-fill" v-for="item in 5"></span>
                                </div>
                            </div>
                            <span class="juli">1.1km</span>
                        </div>
                        <div class="ctype"><span>环境优雅</span></div>
                        <div class="caddress">
                            <span class="iconfont icondingweiweizhi"></span><span class="single-line-text">和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号和平区大沽南路43号(金融街中心店)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "gindex",
        data() {
            return {
                transitionName: 'transitionLeft',
                title: '',
                city: '天津',
                ind: 0,
                keyword: '和平路商业街',
                swiperOption: {
                    pagination: '.swiper-pagination',
                    observers: true,
                    observeParents: true,
                    spaceBetween: 10,
                    loop: true,
                    autoplay: 3000,
                },
                swiperlist: []
            }
        },
        watch: {
            '$route'(val) {
                if (val.fullPath.indexOf('/competition') !== -1) {
                    this.ind = 0
                } else if (val.fullPath.indexOf('/club') !== -1) {
                    this.ind = 1;
                } else {
                    this.ind = 2
                }
            }
        },
        created() {
            this.title = '托亚克 | ' + this.city;
            this._GetSlideList()
        },
        mounted() {
            this.ind = this.$route.meta.index || 0;
        },
        components: {
            swiper,
            swiperSlide
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
                        this.swiperlist = res.data;
                    } else {
                        this.$com.showtoast(res.msg)
                    }
                })
            },
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
    }


</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .index {
        .index_top {
            /*display: flex;*/
            /*align-items: center;*/
            /*justify-content: space-between;*/
            padding: 22px 15px;
            height: 220px;
            background: linear-gradient(90deg, #441219, #29182E);

            .htop {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 12px 0;

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

            .swiperbox {
                height: 160px;
                border-radius: 16px;

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
            background-color: #fff;
            margin-top: -40px;
            border-radius: 10px 10px 0 0;
            padding: 60px 0;

            .cselect {
                padding: 0 39px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #333333;
                font-size: 12px;
                /* px */
                .cselectitem {
                    display: flex;
                    align-items: center;
                    padding: 25px 0;

                    .iconfont {
                        color: #BBBBBB;
                        font-size: 14px;
                        /*px*/
                        margin-left: 5px;
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
                }
            }
        }
    }
</style>
