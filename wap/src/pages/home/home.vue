<template>
    <div class="index">
        <div class="index_top">
            <div class="htop">
                <div class="htopleft">
                    <span @click="tabhome(0,'/home/competition')" :class="{'activespan':ind==0}">
                        电竞馆
                        <span class="border_b" v-if="ind==0"></span>
                    </span>
                    <span @click="tabhome(1,'/home/club')" :class="{'activespan':ind==1}">俱乐部
                        <span class="border_b" v-if="ind==1"></span>
                    </span>
                    <span @click="tabhome(2,'/home/school')" :class="{'activespan':ind==2}">学院
                        <span class="border_b border_b1" v-if="ind==2"></span>
                    </span>
                </div>
                <div class="index_address"><span class="iconfont icondingweiweizhi"></span> {{city}}</div>
            </div>
            <div class="searchinput"><span class="iconfont iconsousuo1"></span><span>{{keyword}}</span></div>
            <div class="swiperbox">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in swiperlist" :key="index"><img :src="item.image_m" alt="">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>
        <!--<router-view class="router-view"></router-view>-->
        <router-view class="router-view"></router-view>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "home",
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
            height: 230px;
            background: linear-gradient(90deg, #441219, #29182E);

            .htop {
                display: flex;
                align-items: center;
                justify-content: space-between;

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

            .searchinput {
                height: 32px;
                background: rgba(255, 255, 255, .1);
                border-radius: 16px;
                margin: 20px auto;
                padding: 10px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(255, 255, 255, .3);
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
    }
</style>
