<template>
    <div class="sbox">
        <div class="swiperbox">
            <div class="all"><span class="">全部地区</span><span class="iconfont iconjiantouarrow486"></span></div>
            <swiper :options="swiperOption" ref="mySwiper" class="swiper_r">
                <swiper-slide>
                    <span class="activespan">魔兽争霸</span>
                </swiper-slide>
                <swiper-slide>
                    <span class="">魔兽争霸</span>
                </swiper-slide>
            </swiper>
        </div>
        <div class="jlist">
            <div class="jitem van-row--flex">
                <div class="jimg"><img src="" alt=""></div>
                <div class="jright">
                    <div class="jname van-ellipsis">Invictus GamingInvictus GamingInvictus GamingInvictus
                        GamingInvictus GamingInvictus Gaming
                    </div>
                    <div class="jinfo"><span class="name">王经理</span><span class="tel">17622687799</span></div>
                    <div class="jaddress van-ellipsis">和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115</div>
                </div>
            </div>
            <div class="jitem van-row--flex">
                <div class="jimg"><img src="" alt=""></div>
                <div class="jright">
                    <div class="jname van-ellipsis">Invictus GamingInvictus GamingInvictus GamingInvictus
                        GamingInvictus GamingInvictus Gaming
                    </div>
                    <div class="jinfo"><span class="name">王经理</span><span class="tel">17622687799</span></div>
                    <div class="jaddress van-ellipsis">和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "school",
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    slidesPerView: 'auto',
                    // slidesPerView : 3,
                    spaceBetween: 24,
                    freeMode: true,
                    observers: true,
                    observeParents: true,
                },
                navlist: [],

            }
        },
        components: {
            swiper,
            swiperSlide
        },
    }
</script>

<style scoped lang="scss">
    .sbox {
        background-color: #fff;
        margin-top: -10px;
        border-radius: 10px 10px 0 0;
        padding: 60px 0;

        .swiperbox {
            display: flex;
            align-items: center;
            padding: 0 0 0 20px;

            .all {
                flex-shrink: 0;

                span {
                    color: #333;
                    font-size: 12px;
                    /*px*/
                }
                .iconfont{
                    color: #BBBBBB;
                    font-size: 14px;
                    /*px*/
                }
            }

            .swiper_r {
                flex: 1;
                padding-left: 24px;
                /*/deep/ .swiper-wrapper {*/
                /*display: flex;*/
                /*align-items: center;*/
                /*}*/

                /deep/ .swiper-slide {
                    /*max-width: 20%;*/
                    width: auto;
                    padding: 25px 0;

                    span {
                        color: #999999;
                        font-size: 12px;
                        /*px*/
                    }

                    .activespan {
                        color: #333;
                    }
                }

            }
        }
        .jlist {
            .jitem {
                margin: 0 17px 17px 17px;
                /*display: flex;*/
                padding: 0 0 15px 0;
                border-bottom: 1px solid #eee;
                /*no*/
                .jimg {
                    width: 74px;
                    height: 74px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    /*px*/
                    border: 1px solid #eee;
                    /*no*/
                    margin-right: 17px;
                    flex-shrink: 0;
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
                        max-width: 240px;
                    }

                    .jinfo {
                        font-size: 12px;
                        /*px*/
                        color: #666666;
                    }

                    .jaddress {
                        color: #666666;
                        font-size: 12px;
                        /*px*/
                        max-width: 240px;
                    }
                }
            }

        }
    }
</style>