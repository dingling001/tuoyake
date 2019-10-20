<template>
    <div class="tcbox">
        <div class="swiperbox">
            <img :src="goodinfo.image" alt="">
            <!--            <swiper :options="swiperOption" ref="mySwiper" v-if="goodinfo.album_images.length">-->
            <!--                <swiper-slide v-for="(item,index) in goodinfo.album_images" :key="index"><img :src="item" alt="">-->
            <!--                </swiper-slide>-->
            <!--                <div class="swiper-pagination" slot="pagination"></div>-->
            <!--            </swiper>-->
            <van-sticky :offset="0">
                <div class="navbox">
                    <span class="iconfont iconfanhui" @click="backlist"></span>
                    <div class="comnanme van-ellipsis">{{goodinfo.name}}</div>
                    <div class="nright"><span @click="clllection"
                                              :class="['iconfont', goodinfo.is_collection==0? 'iconstar':'iconstar-fill']"></span>
                        <span class="iconfont iconfenxiang"></span>
                    </div>
                </div>
            </van-sticky>
        </div>
        <div class="comitem">
            <div class="comnanme">{{goodinfo.name}}</div>

            <div class="comaddress">
                <div class="adressitem">
                    <div class="address">{{goodinfo.bar_name}}</div>
                    <div class="starbox">
                        <div class="iconfont iconstar-fill star" v-for="item in Number(goodinfo.star)"></div>
                        <div class="iconfont iconstar-fill" v-if="Number(goodinfo.star)<5"
                             v-for="item in 5-Number(goodinfo.star)"></div>
                    </div>
                </div>
                <!--<a class="phonecall" :href="'tel:'+comdata.info.contact_number"><span-->
                <!--class="iconfont iconphone-fill"></span></a>-->
            </div>
            <div class="hr"></div>
            <div class="hr"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "taocan",
        data() {
            return {
                goodinfo: {
                    star: 0
                },
                cid: '',
                goods_id: ''
            }
        },
        created() {
            this.cid = this.$route.query.cid;

            this.goods_id = this.$route.query.goods_id;
            this._GetGoodsInfo()
        },
        methods: {
            // 获取套餐详情
            _GetGoodsInfo() {
                this.$api.GetGoodsInfo(this.goods_id).then(res => {
                    if (res.code == 1) {
                        this.goodinfo = res.data
                    }
                })
            },
            // 返回列表
            backlist() {
                this.$router.push({path: '/competitiondetail', query: {id: this.cid}})
            },
            // 收藏
            clllection() {
                this.$api.SetCollection(4, this.goods_id).then(res => {
                    if (res.code == 1) {
                        if (res.data.is_collection == 1) {
                            this.$com.showtoast('收藏成功')
                            this.goodinfo.is_collection = 1;
                        } else {
                            this.$com.showtoast('取消收藏')
                            this.goodinfo.is_collection = 0;
                        }
                    }
                    // this._GetBarInfo()
                })

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .tcbox {
        .swiperbox {
            height: 282px;
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
                    width: 100%;
                    text-align: center;
                    left: 0;
                    top: 0;
                    height: 100%;
                    padding: 15px 10px;
                    display: none;
                }

                .iconfont {
                    width: 28px;
                    height: 28px;
                    background: rgba(0, 0, 0, .3);
                    border-radius: 50%;
                    text-align: center;
                    font-weight: bold;
                    line-height: 28px;
                    display: inline-block;
                    font-size: 14px;
                    margin-right: 10px;
                    /*px*/
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
                font-size: 18px;
                /*px*/
                color: #333;
                font-weight: bold;
                padding: 36px 18px 23px 18px;
            }


            .comaddress {
                padding: 10px 18px;
                display: flex;
                align-items: center;

                .adressitem {
                    display: flex;
                    font-size: 14px;
                    /*px*/
                    flex: 1;
                    color: #333;
                    justify-content: space-between;
                    align-items: center;


                    .address {
                        line-height: 20px;

                        .juli {
                            font-size: 12px;
                        }
                    }

                    .starbox {
                        display: flex;
                        align-items: center;
                        padding: 0 0 0 18px;

                        .iconstar-fill {
                            color: #E4E4E4;
                            font-size: 13px;
                            /*px*/
                            &.star {
                                color: $baseRed;
                            }
                        }
                    }
                }
            }

            .hr {
                height: 10px;
                background-color: #F8F8F8;
            }
        }
    }
</style>