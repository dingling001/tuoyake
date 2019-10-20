<template>
    <div class="vbox">
        <div class="swiperbox">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions"
                          id="foo"
                          v-if="playerOptions.sources[0].src"
            ></video-player>
            <van-sticky :offset="0">
                <div class="navbox">
                    <span class="iconfont iconfanhui" @click="backlist"></span>
                    <div class="comnanme van-ellipsis">{{videoinfo.name}}</div>
                </div>
            </van-sticky>
        </div>
        <div class="comitem">
            <div class="comnanme">{{videoinfo.name}}</div>
            <div class="comaddress">
                <span class="iconfont icontime-circle"></span>
                <span>{{videoinfo.create_time}}</span>
            </div>
            <div class="hr"></div>
            <div class="machdes" v-html="videoinfo.synopsis"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "videodetail",
        data() {
            return {
                video_id: '',
                videoinfo: {},
                playerOptions: {
                    //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: true, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "video/mp4",
                        src: "" //你的m3u8地址（必填）
                    }],
                    poster: "", //你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: true,
                        fullscreenToggle: true //全屏按钮
                    }
                }
            }
        },
        created() {
            if (this.$route.query.video_id) {
                this.video_id = this.$route.query.video_id;
                this._GetVideoInfo()
            } else {
                this.$router.replace('/')
            }
        },
        methods: {
            _GetVideoInfo() {
                this.$api.GetVideoInfo(this.video_id).then(res => {
                    if (res.code == 1) {
                        this.videoinfo = res.data;
                        this.playerOptions.sources[0].src = res.data.file;
                    }
                })
            },
            backlist() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .vbox {
        .swiperbox {
            height: 211px;
            /*border-radius: 16px;*/
            position: relative;
            overflow: hidden;

            /deep/ .vjs-modal-dialog-content {
                display: none;
            }

            /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button {
                font-size: 15px;
                /*px*/
            }

            /deep/ .video-js:hover .vjs-big-play-button, .vjs-custom-skin > .video-js .vjs-big-play-button:focus, .vjs-custom-skin > .video-js .vjs-big-play-button:active {
                background-color: $baseBlue;
            }

            /deep/ .vjs-error .vjs-error-display:before {
                content: '资源暂不可播';
                padding: 30px 0;
                font-size: 14px;
                /*px*/
            }

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
            position: relative;
            background-color: #fff;

            .comnanme {
                font-size: 18px;
                /*px*/
                color: #333;
                font-weight: bold;
                padding: 34px 18px 16px 18px;
            }


            .comaddress {
                padding: 18px;
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

            .hr {
                height: 10px;
                background-color: #F8F8F8;
            }
        }
    }
</style>