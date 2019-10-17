<template>
    <div class="combox">
        <div class="swiperbox">
            <img :src="comdata.info.album_images[0]" alt="">
            <!--            <swiper :options="swiperOption" ref="mySwiper" v-if="comdata.info.album_images.length">-->
            <!--                <swiper-slide v-for="(item,index) in comdata.info.album_images" :key="index"><img :src="item" alt="">-->
            <!--                </swiper-slide>-->
            <!--                <div class="swiper-pagination" slot="pagination"></div>-->
            <!--            </swiper>-->
            <van-sticky :offset="0">
                <div class="navbox"><span class="iconfont iconfanhui"></span>
                    <div><span class="iconfont  iconstar"></span> <span class="iconfont iconfenxiang"></span></div>
                </div>
            </van-sticky>
            <div class="album" v-if="comdata.info.album_images.length>0">
                <span class="iconfont iconimage"></span>
                <span>{{comdata.info.album_images.length}}</span>
            </div>
        </div>
        <div class="comitem">
            <div class="comnanme">{{comdata.info.name}}</div>
            <div class="starbox">
                <div class="iconfont iconstar-fill star" v-for="item in Number(comdata.info.star)"></div>
                <div class="iconfont iconstar-fill" v-if="Number(comdata.info.star)<5"
                     v-for="item in 5-Number(comdata.info.star)"></div>
            </div>
            <div class="comaddress">
                <div class="adressitem">
                    <span class="iconfont icondingweiweizhi"></span>
                    <div class="address">{{comdata.info.address}}
                        <div class="juli">距您{{comdata.info.distance}}</div>
                    </div>
                </div>
                <a class="phonecall" :href="'tel:'+comdata.info.contact_number"><span
                        class="iconfont iconphone-fill"></span></a>
            </div>
            <div class="hr"></div>
            <div class="comlist">
                <div class="taocan">
                    <div class="spanbox"><span class="span">惠</span> <span>套餐</span></div>
                </div>
                <div class="jitem van-row--flex" v-for="(item,index) in comdata.goods" :key="item.id"
                     @click="godetail(item.id)">
                    <div class="jimg"><img :src="item.image" alt=""></div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.bar_name}}</div>
                        <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
                        <!--</div>-->
                        <div class="jaddress van-ellipsis">{{comdata.info.address}}</div>
                        <div class="price">￥{{item.price}}</div>
                    </div>
                    <div class="jbtn">抢购</div>
                </div>
            </div>
            <div class="hr"></div>
            <div class="comlist">
                <div class="taocan">
                    <div class="spanbox"><span class="span">赛</span><span>赛事</span></div>
                    <div class="all">全部 <span class="iconfont iconjiantou"></span></div>
                </div>
                <div class="jitem van-row--flex" v-for="(item,index) in comdata.match" :key="item.id"
                     @click="godetail(item.id)">
                    <div class="jimg"><img :src="item.image" alt=""></div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.bar_name}}</div>
                        <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
                        <!--</div>-->
                        <div class="jaddress van-ellipsis"><span class="iconfont icontime-circle"></span>
                            {{item.start_time}}
                        </div>
                        <div class="synopsis van-ellipsis">{{item.synopsis}}</div>
                    </div>
                    <div class="jbtn s_jbtn">报名</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "competitiondetail",
        data() {
            return {
                id: '',
                comdata: {
                    goods: [],
                    info: {
                        album_images: []
                    }
                },
                swiperOption: {
                    pagination: '.swiper-pagination',
                    observers: true,
                    observeParents: true,
                    spaceBetween: 10,
                    loop: true,
                    autoplay: 3000,
                },
            }
        },
        components: {
            swiper,
            swiperSlide,
        },
        created() {
            if (this.$route.query.id) {
                this.id = this.$route.query.id;
                this._GetBarInfo();
            } else {
                this.$router.replace('/')
            }
        },
        methods: {
            _GetBarInfo() {
                this.$api.GetBarInfo(this.id).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.comdata = res.data;
                    }
                })
            },
            godetail() {

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .combox {
        .swiperbox {
            height: 238px;
            border-radius: 16px;
            position: relative;

            .navbox {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #fff;
                padding: 15px 10px;

                .iconfont {
                    width: 28px;
                    height: 28px;
                    background: rgba(0, 0, 0, .3);
                    border-radius: 50%;
                    text-align: center;
                    font-weight: bold;
                    line-height: 28px;
                    display: inline-block;

                    &.iconstar-fill {
                        color: $baseRed;
                    }

                    &.iconfont {
                        font-size: 20px;
                    }
                }


            }

            .album {
                position: absolute;
                width: 58px;
                height: 24px;
                background: rgba(0, 0, 0, .3);
                border-radius: 12px;
                right: 30px;
                bottom: 40px;
                z-index: 1;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                /*px*/
                .iconfont {
                    font-size: 20px;
                    margin-right: 5px;
                }
            }

            img {
                width: 100%;
            }

            .swiper-container {
                height: 100%;
                width: 345px;
                margin: 0 auto;
                position: relative;
                z-index: 3;

                .swiper-slide {
                    /*display: flex;*/
                    /*align-items: center;*/
                    /*justify-content: center;*/
                    background-color: #f5f5f5;
                    color: #fff;
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

        .comitem {
            margin: -30px 0 0 0;
            position: relative;
            z-index: 1;
            background-color: #fff;
            border-radius: 10px;

            .comnanme {
                font-size: 18px;
                /*px*/
                color: #333;
                font-weight: bold;
                padding: 36px 18px 23px 18px;
            }

            .starbox {
                display: flex;
                align-items: center;
                padding: 0 0 0 18px;

                .iconstar-fill {
                    color: #E4E4E4;
                    font-size: 20px;
                    /*px*/
                    &.star {
                        color: $baseRed;
                    }
                }
            }

            .comaddress {
                padding: 10px 0 10px 18px;
                display: flex;
                align-items: center;

                .adressitem {
                    display: flex;
                    font-size: 14px;
                    /*px*/
                    flex: 1;
                    color: #333;

                    .iconfont {
                        color: #aaaaaa;
                    }

                    .address {
                        line-height: 20px;

                        .juli {
                            font-size: 12px;
                        }
                    }
                }

                .phonecall {
                    flex-shrink: 0;
                    width: 56px;
                    text-align: center;
                    margin-left: 30px;
                    border-left: 1px solid #E4E4E4;
                    padding: 8px 0;
                    display: block;

                    .iconfont {
                        color: $baseRed;
                        font-weight: bold;
                        font-size: 20px;
                        /*px*/
                    }
                }
            }

            .hr {
                height: 10px;
                background-color: #F8F8F8;
            }

            .comlist {
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
                            max-width: 200px;
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
                            max-width: 192px;

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