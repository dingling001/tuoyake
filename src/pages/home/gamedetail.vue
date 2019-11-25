<template>
    <div class="gdbox">
        <div class="swiperbox">
            <img :src="matchinfo.image" alt="">
            <!--            <swiper :options="swiperOption" ref="mySwiper" v-if="matchinfo.album_images.length">-->
            <!--                <swiper-slide v-for="(item,index) in matchinfo.album_images" :key="index"><img :src="item" alt="">-->
            <!--                </swiper-slide>-->
            <!--                <div class="swiper-pagination" slot="pagination"></div>-->
            <!--            </swiper>-->
            <van-sticky :offset="0">
                <div class="navbox">
                    <span class="iconfont iconfanhui" @click="backlist"></span>
                    <div class="comnanme van-ellipsis">{{matchinfo.name}}</div>
                    <div class="nright"><span @click="clllection"
                                              :class="['iconfont', matchinfo.is_collection==1? 'iconstar-fill':'iconstar']"></span>
                        <span class="iconfont iconfenxiang"></span>
                    </div>
                </div>
            </van-sticky>
        </div>
        <div class="comitem">
            <div class="comnanme">{{matchinfo.name}}</div>
            <div class="comaddress">
                <span class="iconfont icontime-circle"></span>
                <span>{{matchinfo.start_time}}</span>
            </div>
            <div class="machdes" v-html="matchinfo.content"></div>
            <div class="hr"></div>
            <div class="comlist" v-if="matchinfo.video.length">
                <div class="taocan">
                    <div class="spanbox"><span>赛事视频</span></div>
                    <div class="all" v-if="matchinfo.video.length>1" @click="allvideo">全部 <span
                            class="iconfont iconjiantou"></span></div>
                </div>
                <div class="jitem van-row--flex" v-for="(item,index) in matchinfo.video" :key="item.id"
                     @click="govdetail(item.id)">
                    <div class="jimg">
                        <img :src="item.poster" alt="">
                        <!--<video :src="item.file" preload="auto" controls></video>-->
                        <span>{{s_to_hs(item.duration)}}</span>
                    </div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.name}}</div>
                        <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
                        <!--</div>-->
                        <div class="jaddress van-ellipsis"><span class="iconfont icontime-circle"></span>
                            {{item.create_time}}
                        </div>
                        <div class="synopsis van-ellipsis">{{item.synopsis}}</div>
                    </div>
                </div>
            </div>
            <div class="game_btn" @click="goapp">立即报名</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "gamedetail",
        data() {
            return {
                matchinfo: {
                    video: []
                },
                match_id: '',
                is_share: 0
            }
        },
        created() {
            if (this.$route.query.match_id) {
                this.cid = this.$route.query.cid;
                this.match_id = this.$route.query.match_id;
                this._GetMatchInfo()
            } else {
                this.$router.replace('/')
            }
            this.is_share = this.$route.query.is_share;
        },
        methods: {
            // 获取套餐详情
            _GetMatchInfo() {
                this.$api.GetMatchInfo(this.match_id).then(res => {
                    if (res.code == 1) {
                        this.matchinfo = res.data;
                    } else {
                        this.$com.showtoast(res.msg)
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 1000)
                    }
                })
            },
            // 收藏
            clllection() {
                this.$api.SetCollection(3, this.match_id).then(res => {
                    if (res.code == 1) {
                        if (res.data.is_collection == 1) {
                            this.$com.showtoast('收藏成功')
                            this.matchinfo.is_collection = 1;
                        } else {
                            this.$com.showtoast('取消收藏')
                            this.matchinfo.is_collection = 0;
                        }
                    }
                    // this._GetBarInfo()
                })

            },
            backlist() {
                if (this.is_share == 1) {
                    this.$router.push({path: '/competitiondetail', query: {id: this.cid}})
                } else {
                    this.$router.go(-1);
                }
            },
            // 视频详情
            govdetail(id) {
                this.$router.push({path: '/videodetail', query: {video_id: id}})
            },
            // 全部视频
            allvideo() {
                this.$router.push({path: '/videolist', query: {match_id: this.match_id}})
            },
            // 下载app
            goapp() {
                this.$router.push({path: '/download'})
            },
            /**
             * 将秒转换为 分:秒
             * s int 秒数
             */
            s_to_hs(s) {
                //计算分钟
                //算法：将秒数除以60，然后下舍入，既得到分钟数
                var h;
                h = Math.floor(s / 60);
                //计算秒
                //算法：取得秒%60的余数，既得到秒数
                s = s % 60;
                //将变量转换为字符串
                h += '';
                s += '';
                //如果只有一位数，前面增加一个0
                h = (h.length == 1) ? '0' + h : h;
                s = (s.length == 1) ? '0' + s : s;
                return h + ':' + s;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .gdbox {
        .swiperbox {
            height: 213px;
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
                padding: 34px 18px 16px 18px;
            }


            .comaddress {
                padding: 0 18px;
                display: flex;
                align-items: center;
                color: #666666;
                font-size: 12px;
                /*px*/
                .iconfont {
                    color: #AAAAAA;
                    font-size: 14px;
                    /*px*/
                    margin-right: 5px;
                }

            }

            .machdes {
                padding: 30px 18px;
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
                        overflow: hidden;
                        position: relative;

                        img {
                            height: 100%;
                        }

                        span {
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            border-radius: 3px;
                            background-color: rgba(0, 0, 0, .7);
                            color: #fff;
                            font-size: 9px;
                            /*px*/
                            text-align: center;
                            line-height: 16px;
                            padding: 1px 3px;
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
                }
            }

            .hr {
                height: 10px;
                background-color: #F8F8F8;
            }

        }

        .game_btn {
            width: 340px;
            margin: 30px auto;
            text-align: center;
            color: #fff;
            line-height: 44px;
            background: rgba(44, 107, 234, 1);
            border-radius: 22px;
            font-size: 17px;
            /*px*/
        }
    }
</style>