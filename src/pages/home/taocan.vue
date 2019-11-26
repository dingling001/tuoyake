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
            <div class="taocaninfo">
                <div class="tancantitle">套餐内容</div>
                <div class="taocannum">
                    <div class="taocandes">{{goodinfo.content}}</div>
                    <div class="numbox">
                        <span :class="['iconfont iconminus-circle' ,num<=0? 'disicon':'']" @click="nminus"></span>
                        <input type="number" v-model="num">
                        <span class="iconfont iconplus-circle" @click="plus"></span>
                    </div>
                </div>
                <div class="price"><span>单价</span>{{goodinfo.price}}元</div>
            </div>
            <div class="hr"></div>
            <div class="taocaninfo" v-if="goodinfo.rules.length">
                <div class="tancantitle">使用规则</div>
                <ul class="rules">
                    <li v-for="(item,index) in goodinfo.rules" :key="index">
                        <span class="ruletitle">{{item.name}}</span><span>{{item.value}}</span>
                    </li>
                </ul>
            </div>
            <div class="taocan_btn" @click="goapp">￥{{goodinfo.price*num}} 立即抢购</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "taocan",
        data() {
            return {
                goodinfo: {
                    star: 0,
                    rules: [],
                    is_collection:0
                },
                cid: '',
                goods_id: '',
                num: 0,
                is_share: 0
            }
        },
        created() {
            if (this.$route.query.goods_id) {
                this.cid = this.$route.query.cid;
                this.goods_id = this.$route.query.goods_id;
                this._GetGoodsInfo()
            } else {
                this.$router.replace('/')
            }
            this.is_share = this.$route.query.is_share;
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
                if (this.is_share == 1) {
                    this.$router.push({path: '/competitiondetail', query: {id: this.cid}})
                } else {
                    this.$router.go(-1);
                }
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

            },
            // 加法
            plus() {
                this.num += 1;
            },
            // 减法
            nminus() {
                if (this.num > 0) {
                    this.num -= 1;
                }
            },
            goapp() {
                this.$router.push('/download')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .tcbox {
        .swiperbox {
            height: 282px;
            /*border-radius: 16px;*/
            position: relative;
            overflow: hidden;

            img {
                width: 100%;
            }

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
            margin: -40px 0 0 0;
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
                        font-size: 13px;
                        /*px*/
                        color: #666666;
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

            .taocaninfo {
                padding: 18px;

                .tancantitle {
                    font-size: 13px;
                    /*px*/
                    color: #999999;
                }

                .taocannum {
                    display: flex;
                    /*align-items: center;*/
                    align-items: baseline;
                    justify-content: space-between;

                    .taocandes {
                        padding: 10px 0;
                        line-height: 20px;
                        color: #333333;
                        font-size: 13px;
                        /*px*/
                    }

                    .numbox {
                        display: flex;
                        align-items: center;
                        margin-left: 20px;

                        .iconfont {
                            font-size: 18px;
                            /*px*/
                            color: #666666;

                            &.disicon {
                                color: #CCCCCC;
                            }
                        }

                        input {
                            width: 30px;
                            text-align: center;
                            font-size: 14px;
                            outline: none;
                            border: none;
                        }
                    }
                }

                .price {
                    font-size: 13px;
                    /*px*/
                    color: $baseRed;

                    span {
                        color: #666666;
                        margin-right: 10px;
                    }
                }

                ul.rules {
                    padding: 10px 0;

                    li {
                        color: #333;
                        line-height: 20px;
                        font-size: 13px;
                        /*px*/
                        .ruletitle {
                            min-width: 50px;
                            max-width: 100px;
                            /*width: 50px;*/
                            text-align: justify;
                            margin-right: 25px;
                            font-weight: bold;
                            display: inline-block;
                        }
                    }
                }
            }

            .hr {
                height: 10px;
                background-color: #F8F8F8;
            }

            .taocan_btn {
                width: 334px;
                text-align: center;
                line-height: 44px;
                color: #fff;
                background-color: $baseRed;
                border-radius: 22px;
                margin: 50px auto;
                font-size: 17px;
                /*px*/
            }
        }
    }
</style>