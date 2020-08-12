<template>
    <div class="combox">
        <div class="swiperbox">
            <!--<img :src="comdata.info.album_images[0]" alt="">-->
            <van-image
                    v-if="comdata.info.album_images[0]"
                    height="238px"
                    fit="cover"
                    :src="comdata.info.album_images[0]"
            />

            <!--            <swiper :options="swiperOption" ref="mySwiper" v-if="comdata.info.album_images.length">-->
            <!--                <swiper-slide v-for="(item,index) in comdata.info.album_images" :key="index"><img :src="item" alt="">-->
            <!--                </swiper-slide>-->
            <!--                <div class="swiper-pagination" slot="pagination"></div>-->
            <!--            </swiper>-->
            <van-sticky :offset="0">
                <div class="navbox">
                    <span class="iconfont iconfanhui" @click="backlist" v-if="is_app==0"></span>
                    <router-link to="/" class="iconfont iconshouyex" v-else></router-link>
                    <div class="comnanme van-ellipsis">{{comdata.info.name}}</div>
                    <div class="nright"><i @click="clllection"
                                           :class="['iconfont', comdata.info.is_collection==0? 'iconstar':'iconstar-fill']"></i>
                        <span class="iconfont iconfenxiang" @click="togshare=true" v-if="showshare"></span>
                    </div>
                </div>
            </van-sticky>
            <div class="album" @click="goimg" v-if="comdata.info.album_images.length>0">
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
                <div class="adressitem" @click="gomap(comdata.info)">
                    <van-icon name="location-o" color="#aaa" size="16px"/>
                    <div class="address">{{comdata.info.address}}
                        <div class="juli">距您 {{comdata.info.distance}}</div>
                    </div>
                </div>
                <a class="phonecall" :href="'tel:'+comdata.info.contact_number">
                    <!--                    <span class="iconfont iconphone-fill"></span>-->
                    <van-icon name="phone" :color="basecolor" size="26px"/>
                </a>
            </div>
            <div class="hr"></div>
            <div class="comlist van-row--flex van-cell--center van-row--justify-center" v-if="!flaggoods">
                <van-loading type="spinner"/>
            </div>
            <div class="comlist" v-if="comdata.goods.length">
                <div class="taocan">
                    <div class="spanbox"><span class="span">惠</span> <span>套餐</span></div>
                </div>
                <div class="jitem van-row--flex" v-for="(item,index) in comdata.goods" :key="item.id"
                     @click="gotaocandetail(item.id)">
                    <div class="jimg">
                        <!--                        <img :src="item.image" alt="">-->
                        <van-image height="16.533vw" width="16.533vw" fit="cover" :src="item.image"/>
                    </div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.name}}</div>
                        <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
                        <!--</div>-->
                        <!--<div class="jaddress van-ellipsis" v-html="item.content"></div>-->
                        <div class="price">￥{{item.price}}</div>
                    </div>
                    <div class="jbtn">抢购</div>
                </div>
            </div>
            <div class="hr"></div>
            <div class="comlist van-row--flex van-cell--center van-row--justify-center" v-if="!flaggoods">
                <van-loading type="spinner"/>
            </div>
            <div class="comlist" v-if="comdata.match.length">
                <div class="taocan">
                    <div class="spanbox"><span class="span">商</span><span>商家介绍</span></div>
                    <!--<div class="all" @click="goallgame">-->
                    <!--全部 <span  class="iconfont iconjiantou"></span>-->
                    <!--</div>-->
                </div>
                <div class="jitem van-row--flex" v-for="(item,index) in comdata.match" :key="item.id"
                     @click="gossdetail(item.id)">
                    <div class="jimg">
                        <!--                        <img :src="item.image" alt="">-->
                        <van-image height="16.533vw" width="16.533vw" fit="cover" :src="item.image"/>
                        <span v-if="item.recommend==1">精选</span>
                    </div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.league_name}}</div>
                        <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
                        <!--</div>-->
                        <!--<div class="jaddress van-ellipsis"><span class="iconfont icontime-circle"></span>{{item.start_time}}-->
                        <!--~ {{item.end_time}}-->
                        <!--</div>-->
                        <div class="jaddress van-ellipsis" v-html="item.synopsis"></div>
                    </div>
                    <!--<div class="jbtn s_jbtn">报名</div>-->
                </div>
            </div>

        </div>
        <van-overlay :show="togshare" @click="togshare = false" :z-index="500">
            <div class="text">点击右上角分享到朋友圈</div>
        </van-overlay>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import {$baseRed,initOpenApp} from '../../../src/assets/js/utils'

    export default {
        name: "competitiondetail",
        data() {
            return {
                id: '',
                comdata: {
                    goods: [],
                    info: {
                        album_images: [],
                        star: 0,
                        is_collection: 0
                    },
                    match: []
                },
                swiperOption: {
                    pagination: '.swiper-pagination',
                    observers: true,
                    observeParents: true,
                    spaceBetween: 10,
                    loop: true,
                    autoplay: 3000,
                },
                show: false,
                index: 0,
                is_app: 0,
                showshare: false,
                togshare: false,
                flaggoods: false,
                basecolor: $baseRed
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
            this.is_app = this.$route.query.is_app ? this.$route.query.is_app : 0;
            var ua = navigator.userAgent.toLowerCase();
            this.showshare = ua.match(/MicroMessenger/i) == "micromessenger"
            // if (this.is_app == 1) {
            //     initOpenApp();
            // }
            initOpenApp();
        },
        methods: {
            // 获取详情
            _GetBarInfo() {
                this.$api.GetBarInfo(this.id).then(res => {
                    this.flaggoods = true;
                    if (res.code == 1) {
                        this.comdata = res.data;
                    }
                })
            },
            goimg() {
                this.$router.push({path: '/imgPre', query: {id: this.id}})
            },
            // 去套餐详情
            gotaocandetail(id) {
                this.$router.push({path: '/taocan', query: {goods_id: id, cid: this.id}})
            },
            gossdetail(id) {
                this.$router.push({path: '/gamedetail', query: {match_id: id, cid: this.id}})
            },
            goallgame() {
                this.$router.push({path: '/allgame', query: {bar_id: this.id}})
            },
            // 回到列表
            backlist() {
                this.$router.go(-1)
            },
            // 改变预览下标
            onChange(index) {
                this.index = index;
            },
            // 收藏
            clllection() {
                this.$api.SetCollection(1, this.comdata.info.id).then(res => {
                    if (res.code == 1) {
                        if (res.data.is_collection == 1) {
                            this.$com.showtoast('收藏成功')
                            this.comdata.info.is_collection = 1;
                        } else {
                            this.$com.showtoast('取消收藏')
                            this.comdata.info.is_collection = 0;
                        }
                    }
                    // this._GetBarInfo()
                })
            },
            gomap(info) {
                window.location.href = `//uri.amap.com/marker?position=${this.comdata.info.lng},${this.comdata.info.lat}&name=${this.comdata.info.name}&src=${this.comdata.info.address}&coordinate=gaode&callnative=1`
                // this.$router.push({path: '/amap', query: {bar_id: this.id}})
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

                .comnanme {
                    font-size: 18px;
                    /*px*/
                    position: absolute;
                    width: 50%;
                    text-align: center;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    top: 0;
                    line-height: 58px;
                    /*padding: 15px 10px;*/
                    display: none;
                }

                .iconfont {
                    width: 28px;
                    height: 28px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, .3);
                    border-radius: 50%;
                    text-align: center;
                    font-weight: bold;
                    line-height: 28px;
                    font-size: 14px;
                    margin-right: 10px;
                    /*px*/
                    &.iconshouyex {
                        color: #fff;
                    }

                    &.iconstar-fill {
                        color: $baseRed;
                        font-size: 20px;
                        /*px*/
                    }

                    &.iconstar {
                        font-size: 20px;
                        /*px*/
                    }
                }

                .nright {
                    display: flex;
                    align-items: center;
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

            /deep/ .van-sticky--fixed {
                .navbox {
                    background-color: rgba(255, 255, 255, .9);
                    color: #fff;

                    .comnanme {
                        color: #333;
                        display: block;
                    }
                }
            }

            /deep/ .van-image-preview {
                .van-image-preview__index {
                    width: 100%;

                    .preview {
                        display: flex;
                        align-items: center;
                        padding: 10px 15px;
                        justify-content: space-between;
                    }
                }
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
                font-size: 20px;
                /*px*/
                color: #333;
                font-weight: bold;
                padding: 36px 18px 10px 18px;
            }

            .starbox {
                display: flex;
                align-items: center;
                padding: 0 0 0 18px;

                .iconstar-fill {
                    color: #E4E4E4;
                    font-size: 22px;
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
                    align-items: baseline;

                    .iconfont {
                        color: #aaaaaa;
                        font-size: 16px;
                        /*px*/
                    }

                    .address {
                        line-height: 20px;
                        margin-left: 8px;

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

                    .van-icon-phone {
                        transform: rotate(270deg);
                    }
                }
            }

            .hr {
                height: 10px;
                background-color: #F8F8F8;
            }

            .comlist {
                min-height: 50px;

                .taocan {
                    padding: 15px 18px 0 15px;
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
                    margin: 0 17px 0 17px;
                    /*display: flex;*/
                    padding: 15px 0;
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
                        border-radius: 5px 5px 0 0;
                        margin-right: 17px;
                        flex-shrink: 0;
                        overflow: hidden;
                        position: relative;

                        span {
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            width: 31px;
                            border-radius: 5px 0px 0px 0px;
                            background-color: #F7A421;
                            color: #fff;
                            font-size: 10px;
                            text-align: center;
                            line-height: 16px;
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
                            line-height: 20px;
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
                            line-height: 25px;

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
                        background: linear-gradient(0deg, $baseRed, $baseRed);
                        border-radius: 16px;
                        position: absolute;
                        right: 16px;
                        bottom: 36px;
                        line-height: 32px;
                        text-align: center;
                        color: #F8F8F8;
                        font-size: 13px;
                        /*px*/
                        font-weight: bold;

                        &.s_jbtn {
                            background: $baseBlue;
                        }
                    }
                }
            }
        }

        /deep/ .van-overlay {
            text-align: right;

            .text {
                font-size: 20px;
                color: #fff;
                font-weight: bold;
                padding: 30px 20px;
            }
        }
    }

</style>