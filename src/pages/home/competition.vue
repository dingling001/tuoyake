<template>
    <div class="cbox">
        <van-sticky :offset-top="offsettop" class="sticky ">
            <div class="cselect">
                <div :class="['cselectitem',recommend==1?'cselectitemactive':'']" @click="recommendlist">
                    <span>推荐电竞馆</span>
                </div>
                <van-dropdown-menu active-color="#f2313b"
                                   :class="[label==''?'':'labelbox',selectName=='全部地区'?'':'cccc']">
                    <van-dropdown-item v-model="label" :options="labellist" @change="changelabel" overlay>
                        <!--<span>全部服务</span><span class="iconfont iconjiantouarrow486"></span>-->
                    </van-dropdown-item>
                    <van-dropdown-item :title="selectName" ref="item" :disabled="districtlist.length==1"
                                       v-model="selectName" overlay>
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
                                    <span>{{c.name}}</span>
                                </div>
                            </div>
                        </div>
                    </van-dropdown-item>
                </van-dropdown-menu>
            </div>
        </van-sticky>
        <div class="van-row--flex van-cell--center van-row--justify-center" v-if="!flag"><van-loading type="spinner"/></div>
        <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" v-if="flag&&netlist.length">
            <van-list
                    v-model="isUpLoading" :finished="finished" @load="onLoad" class="clist" :offset="offset"
                    finished-text="到底了">
                <!-- 加载的内容-->
                <div class="citem" v-for="(item,index) in netlist" :key="index" @click="godetail(item.id)">
                    <div class="cimg">
                        <!--<img  alt="">-->
                        <van-image width="24vw" height="24vw" fit="cover" :src="item.image"/>
                        <span v-if="item.recommend==1">推荐</span>
                    </div>
                    <div class="cright">
                        <div class="name single-line-text">{{item.name}}</div>
                        <div class="cname">
                            <div class="namebox">
                                <div class="startbox">
                                    <span class="iconfont iconstar-fill" v-for="s in parseInt(item.star)"></span>
                                </div>
                            </div>
                            <div class="juli">{{item.distance}}</div>
                        </div>
                        <div class="ctype"><span v-for="l in item.label_ids" class="single-line-text"
                                                 :style="{maxWidth:(1/item.label_ids.length)*100+'%'}">{{l}}</span>
                        </div>
                        <div class="caddress ">
                            <!--                            <span class="iconfont van-icon-location"></span>-->
                            <van-icon name="location-o"/>
                            <span class="single-line-text">{{item.address}}</span>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <div class="clist" v-if="flag&&netlist.length==0">
            <NoData class="nodata" :top="0" :text="'暂无匹配的商家'"></NoData>
        </div>
        <!--        <van-overlay :show="showoverlay" @click="showoverlay = false" :z-index="5"/>-->
    </div>
</template>

<script>
    export default {
        name: "competition",
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
                isDownLoading: false,
                isUpLoading: false,
                finished: false,
                offsettop: 0,
                page: 0,
                keyword: '',
                city: '北京',
                lat: 0,
                lng: 0,
                recommend: 0,
                label: '',
                district: '',
                circle: '',
                netlist: [],
                offset: 0,
                labellist: [
                    {value: '', text: '全部服务'}
                ],
                districtlist: [
                    {
                        id: '',
                        childlist: [],
                        name: "全部地区",
                        pid: '',
                        spacer: ""
                    }
                ],
                citypid: '',
                lindex: 0,
                rindex: 0,
                totop: false,
                showoverlay: false,
                flag: false,
                position: [],
                selectName: '全部地区'
            }
        },

        inject: ['app'],
        created() {
            this.offsettop = parseInt(localStorage.offsettop);
            this.city = this.wapcity;
            this.position = this.pos;
        },
        mounted() {
            this._GetBarList();
            this._GetLabelList();
            this._GetAreaPidByName();
        },
        methods: {
            // 获取服务标签
            _GetLabelList() {
                this.$api.GetLabelList().then(res => {
                    if (res.code == 1) {
                        var labellist = res.data;
                        for (let i in labellist) {
                            this.labellist.push({
                                value: labellist[i],
                                text: labellist[i]
                            })
                        }
                        this.label = this.labellist[0].value;
                        console.log(this.label)
                        // console.log(this.labellist)
                    }
                })
            },
            // 根据城市换取id
            _GetAreaPidByName() {
                this.$api.GetAreaPidByName(this.city).then(res => {
                    if (res.code == 1 && res.data) {
                        this.citypid = res.data;
                        this._GetAreaListTree();
                        this._GetBarList();
                    }

                })
            },
            // 获取列表
            _GetBarList() {
                let pageNumber = this.page + 1;
                // this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                this.$api.GetBarList(
                    pageNumber,
                    this.keyword,
                    this.city,
                    this.position[0],
                    this.position[1],
                    this.recommend,
                    this.label,
                    this.lindex == 0 ? '' : this.district,
                    this.circle,
                ).then(res => {
                    this.flag = true;
                    if (res.code == 1) {//请求成功
                        if (this.netlist.length) {//当请求前有数据时 第n次请求
                            if (this.isUpLoading) {// 上拉加载
                                this.netlist = this.netlist.concat(res.data.data) //上拉加载新数据添加到数组中
                                this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                    this.isUpLoading = false  //关闭上拉加载中
                                })
                                if (res.data.data.length < 10) {//没有更多数据
                                    this.finished = true   //上拉加载完毕
                                }
                            }
                            if (this.isDownLoading) {//关闭下拉刷新
                                this.isDownLoading = false; //关闭下拉刷新中
                                this.netlist = res.data.data; //重新给数据赋值
                                if (this.finished) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                    this.finished = false
                                }
                            }
                        } else {
                            this.netlist = res.data.data
                        }
                    }
                    // console.log(this.netlist)
                })
            },
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$com.showtoast('刷新成功');
                    this.isDownLoading = false;
                    this.page = 0;
                    this._GetBarList();
                }, 500);
            },
            // 上拉加载
            onLoad() {
                this.page++;
                this.isUpLoading = true;
                this._GetBarList();
            },
            // 获取当前城市的区
            _GetAreaListTree() {
                this.$api.GetAreaListTree(this.citypid).then(res => {
                    this.districtlist = this.districtlist.concat(res.data);
                    // console.log(this.districtlist)
                    // this.selectName = this.districtlist[0].name;
                    // console.log(this.selectName)
                })
            },
            // 切换成推荐模式
            recommendlist() {
                if (this.recommend == 1) {
                    this.recommend = 0
                } else {
                    this.recommend = 1
                }
                this.flag = false;
                this.page = 0;
                this.netlist = [];
                this._GetBarList();
            },
            // 选择城市
            selcetcity(index) {
                this.lindex = index;
                this.rindex = 0;
                console.log(index)
                if (index == 0) {
                    this.flag = false;
                    this.$refs.item.toggle();
                    this.district = '';
                    this.selectName = '全部地区';
                    this.page = 0;
                    this.circle = '';
                    this.netlist = [];
                    this._GetBarList();
                }
                // this.district = this.districtlist[index].name;
            },
            // 选择地区
            selcetarea(index, name, cname) {
                this.rindex = index;
                this.$refs.item.toggle();
                // this.district = name;
                this.selectName = name;
                this.circle = name;
                this.page = 0;
                this.flag = false;
                this.netlist = [];
                this._GetBarList();
            },
            // 切换服务标签
            changelabel() {
                console.log(this.label)
                this.page = 0;
                this.netlist = [];
                this.flag = false;
                this._GetBarList();
            },
            // 去详情
            godetail(id) {
                this.$router.push({path: '/competitiondetail', query: {id: id}})
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .cbox {
        .sticky {
            position: relative;
            z-index: 10;
            border: 0;
        }

        .cselect {
            padding: 0 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333333;
            background-color: #fff;
            font-size: 12px;
            /* px */
            /deep/ .labelbox {
                .van-dropdown-menu__item {
                    &:first-child {
                        .van-dropdown-menu__title::after {
                            color: $baseRed;
                        }

                        .van-ellipsis {
                            color: $baseRed;
                        }
                    }
                }
            }

            /deep/ .cccc {
                .van-dropdown-menu__item {
                    &:nth-child(2) {
                        .van-dropdown-menu__title::after {
                            color: $baseRed;
                        }

                        .van-ellipsis {
                            color: $baseRed;
                        }
                    }
                }
            }

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
        }

        .clist {
            transition: ease-in-out .3s;
            position: relative;
            min-height: 200px;

            .citem {
                display: flex;
                justify-content: space-between;
                padding: 0 0 0 15px;
                margin: 0 0 30px 0;
                transition: ease-in-out .3s;

                .cimg {
                    flex-shrink: 0;
                    width: 90px;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                    background-color: #f2f2f2;
                    position: relative;
                    border-radius: 8px;
                    overflow: hidden;

                    span {
                        position: absolute;
                        background: linear-gradient(90deg, #ec8215, #f0a532);
                        top: 0;
                        left: 0;
                        border-radius: 8px 0 8px 0;
                        color: #fff;
                        text-align: center;
                        line-height: 17px;
                        font-size: 11px;
                        /*    px*/
                        width: 40px;
                    }
                }

                .cright {
                    flex: 1;
                    /*height: 90px;*/
                    .name {
                        color: #333333;
                        font-weight: bold;
                        font-size: 14px;
                        /*px*/
                        max-width: 235px;
                        line-height: 18px;
                    }

                    .cname {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 15px 0 0;
                        margin: 5px 0 0 0;

                        .namebox {
                            display: flex;
                            align-items: center;

                            .startbox {
                                display: flex;
                                align-items: center;

                                .iconfont {
                                    color: $baseRed;
                                    font-size: 14px;
                                    /*px*/
                                }
                            }
                        }

                        .juli {
                            color: #666666;
                        }
                    }

                    .ctype {
                        display: flex;
                        align-items: center;
                        margin: 5px 0 0 0;
                        flex-wrap: wrap;
                        min-height: 15px;

                        span {
                            padding: 3px 5px;
                            /*background-color: ;*/
                            background: rgba(242, 49, 59, .1);
                            color: $baseRed;
                            border-radius: 8px;
                            margin: 0 5px 5px 0;
                        }
                    }

                    .caddress {
                        display: flex;
                        align-items: center;
                        color: #666666;
                        font-size: 12px;
                        /*px*/
                        padding: 5px 15px 5px 0;
                        border-bottom: 1px solid #E4E4E4;
                        /*no*/
                        .van-icon {
                            color: #999999;
                            font-weight: bold;
                            font-size: 14px;
                            /*px*/
                            margin-right: 2px;
                        }

                        .single-line-text {
                            max-width: 220px;
                        }
                    }
                }

                &:last-child {
                    margin: 0;
                }
            }

        }
    }
</style>
