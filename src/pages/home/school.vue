<template>
    <div class="sbox">
        <van-sticky :offset-top="offsettop" class=" swiperbox sticky" ref="sticky">
            <!--            <div class="all" :class="{activespan:ind==-1}" @click="activeList(-1,'')"><span>全部地区</span><span-->
            <!--                    class="iconfont iconjiantouarrow486"></span></div>-->
            <van-dropdown-menu active-color="#f2313b">
                <van-dropdown-item :title="district" ref="item" @open="showoverlay=true" @close="showoverlay=false">
                    <div class="citybox">
                        <div class="citems dleft">
                            <div v-for="(item ,index) in districtlist" :key="index"
                                 :class="{activecity:index==lindex}"
                                 @click="selcetcity(index)">{{item.name}}
                            </div>
                        </div>
                        <div class="citems dright">
                            <div v-for="(c ,cindex) in districtlist[lindex].childlist" :key="cindex"
                                 :class="{activecity:rindex==cindex}" @click="selcetarea(cindex,c.name)">
                                {{c.name}}
                            </div>
                        </div>
                    </div>
                </van-dropdown-item>
            </van-dropdown-menu>
            <swiper :options="swiperOption" ref="mySwiper" class="swiper_r" v-if="navlist.length">
                <swiper-slide v-for="(item,index) in navlist" :key="item.id" @click.native="activeList(index,item.id)">
                    <span :class="{activespan:ind==index}">{{item.name}}</span>
                </swiper-slide>
            </swiper>
        </van-sticky>
        <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" v-if="schoolshow&&clublist.length">
            <van-list
                    v-model="isUpLoading" :finished="finished" @load="onLoad" class="jlist" :offset="offset"
                    :finished-text="finishedtext">
                <div class="jitem van-row--flex" v-for="(item,index) in clublist" :key="item.id"
                     @click="godetail(item.category_id)">
                    <div class="jimg"><img :src="item.image" alt=""></div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.name}}</div>
                        <div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>
                        </div>
                        <div class="jaddress van-ellipsis">{{item.address}}</div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <div class="jlist" v-if="schoolshow&&clublist.length==0">
            <NoData class="nodata" :top="0" :text="'暂无相关学院'"></NoData>
        </div>
        <van-overlay :show="showoverlay" @click="showoverlay = false" :z-index="5"/>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "school",
        props: {
            wapcity: {
                type: String,
                default: '北京'
            },
            pos: {
                type: Array,
                default: ['39.73', '116.33']
            }
        },
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
                navlist: [
                    {
                        name: '全部',
                        id: ''
                    }
                ],
                ind: -1,
                clist: [],
                clublist: [],
                page: 0,
                keyword: '',
                city: '',
                category_id: '',
                isUpLoading: false,
                isDownLoading: false,
                finished: false,
                offset: -200,
                finishedtext: '到底了',
                citypid: '',
                district: '',
                circle: '',
                districtlist: [
                    {
                        id: '',
                        childlist: [],
                        name: "全部地区",
                        pid: '',
                        spacer: ""
                    }
                ],
                lindex: 0,
                rindex: -1,
                schoolshow: false,
                showoverlay: false,
                offsettop: parseInt(localStorage.offsettop)
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        created() {
            this.city = this.wapcity;

            this.get_CollegeCategory()
            this._CollegeIndex();
            this._GetAreaPidByName();

        },

        methods: {
            // 获取学院分类
            get_CollegeCategory() {
                this.$api.CollegeCategory().then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.navlist.concat(res.data);
                    }
                })
            },
            // 获取学院列表
            _CollegeIndex() {
                let pageNumber = this.page + 1;
                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                this.$api.CollegeIndex(
                    pageNumber,
                    this.category_id,
                    this.city,
                    this.district,
                    this.circle,
                    this.keyword,
                ).then(res => {
                    this.schoolshow = true;
                    if (res.code == 1) {//请求成功
                        if (this.clublist.length) {//当请求前有数据时 第n次请求
                            if (this.isUpLoading) {// 上拉加载
                                this.clublist = this.clublist.concat(res.data.data) //上拉加载新数据添加到数组中
                                this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                    this.isUpLoading = false  //关闭上拉加载中
                                })
                                if (res.data.data.length < 10) {//没有更多数据
                                    this.finished = true   //上拉加载完毕
                                    this.finishedtext = '到底了'
                                }
                            }
                            if (this.isDownLoading) {//关闭下拉刷新
                                this.isDownLoading = false; //关闭下拉刷新中
                                this.clublist = res.data.data; //重新给数据赋值
                                if (this.finished) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                    this.finished = false
                                }
                            }
                        } else {
                            console.log(res)
                            this.clublist = res.data.data;
                            this.finishedtext = '到底了'
                        }
                    }
                })
            },
            // 根据城市换取id
            _GetAreaPidByName() {
                this.$api.GetAreaPidByName(this.city).then(res => {
                    this.citypid = res.data;
                    this._GetAreaListTree();
                    this._CollegeIndex();
                })
            },
            // 获取当前城市的区
            _GetAreaListTree() {
                this.$api.GetAreaListTree(this.citypid).then(res => {
                    this.districtlist = this.districtlist.concat(res.data);
                    // console.log(this.districtlist)
                    this.district = this.districtlist[0].name;
                })
            },
            // 选择城市
            selcetcity(index) {
                this.lindex = index;
                console.log(index)
                if (index == 0) {
                    this.$refs.item.toggle();
                    this.district = '';
                    this.page = 0;
                    this.circle = '';
                    this.clublist = [];
                    this._CollegeIndex();
                }
                this.district = this.districtlist[index].name;
            },
            // 选择地区
            selcetarea(index, name, cname) {
                this.rindex = index;
                this.$refs.item.toggle();
                // this.district = name;
                this.circle = name;
                this.page = 0;
                this.clublist = [];
                this._CollegeIndex();
            },
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$com.showtoast('刷新成功');
                    this.isDownLoading = false;
                    this.page = 0;
                    this._CollegeIndex();
                }, 500);
            },
            // 上拉加载
            onLoad() {
                this.page++;
                this.isUpLoading = true;
                this._CollegeIndex();
            },
            // 点击分类获取列表
            activeList(index, id) {
                this.page = 0;
                this.ind = index;
                this.schoolshow = false;
                this.category_id = id;
                this._CollegeIndex();
            },
            // 去详情
            godetail(id) {
                this.$router.push({path: '/schooldetail', query: {college_id: id}})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .sbox {
        background-color: #fff;
        margin-top: -10px;
        border-radius: 10px 10px 0 0;
        padding: 60px 0;

        .swiperbox {
            display: flex;
            align-items: center;
            padding: 0 39px;
            justify-content: space-between;
            color: #333333;
            background-color: #fff;
            font-size: 12px;
            /* px */
            .cselectitem {
                display: flex;
                align-items: center;
                padding: 25px 0;
                flex: 1;
                justify-content: center;

                .iconfont {
                    color: #BBBBBB;
                    font-size: 14px;
                    /*px*/
                    margin-left: 5px;
                }

                &.cselectitemactive {
                    color: $baseRed;
                    font-weight: bold;
                }
            }

            /deep/ .van-cell {
                font-size: 12px;
                /*px*/
            }

            /deep/ .van-dropdown-menu {
                flex: 2;

                .van-ellipsis {
                    font-size: 12px;
                    /*px*/
                }


                &:after {
                    border: 0;
                }

                .citybox {
                    /*align-items: center;*/
                    /*justify-content: space-between;*/
                    position: relative;
                    max-height: 300px;
                    min-height: 220px;
                    overflow: hidden;

                    .citems {
                        position: absolute;
                        flex: 1;
                        text-align: center;
                        width: 50%;
                        height: 100%;
                        overflow: scroll;

                        div {
                            padding: 10px 0;
                            font-size: 12px;
                            /*px*/
                            color: #666;

                            &.activecity {
                                color: $baseRed;
                                font-weight: bold;
                            }
                        }

                        &.dleft {
                            left: 0;
                        }

                        &.dright {
                            right: 0;

                        }
                    }
                }
            }

            .all {
                flex-shrink: 0;
                padding: 25px 0;

                span {
                    color: #999;
                    font-size: 12px;
                    /*px*/
                }

                .iconfont {
                    color: #BBBBBB;
                    font-size: 14px;
                    /*px*/
                }

                &.activespan {

                    span {
                        color: #333;
                        font-weight: bold;
                    }

                    .iconfont {
                        color: #333;
                    }
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
                        font-weight: bold;
                    }
                }

            }

            &.sticky {
                /deep/ .van-sticky {
                    display: flex;
                    align-items: center;
                    background-color: #fff;
                }
            }
        }

        .jlist {
            padding: 20px 0;
            min-height: 300px;
            position: relative;

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