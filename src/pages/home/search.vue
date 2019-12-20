<template>
    <div class="searchbox">
        <van-sticky>
            <div class="searchtop" ref="searchtop">
                <van-icon name="arrow-left" tag="span" @click="backindex"/>
                <form class="search_input">
                    <van-icon name="search"/>
                    <van-field type="serch" :placeholder="placeholder" v-model="keyword" @keyup.enter="seachAnswer"/>
                </form>
                <van-button size="mini" v-if="keyword" type="default" color="transparent" @click="seachAnswer">搜索
                </van-button>
                <van-button size="mini" v-else color="transparent" type="default" @click="backindex">取消</van-button>
            </div>
        </van-sticky>
        <div class="search_his">
            <div><span class="iconfont icontime-circle"></span>搜索历史</div>
            <div v-if="slist.length" @click="_SearchClear"><span class="iconfont iconshanchu"></span>清空</div>
        </div>
        <div class="hislist" v-if="slist.length">
            <span v-for="(item,index) in slist" :key="index" @click="keywordfn(item)">{{item}}</span>
        </div>
        <van-sticky v-if="total>0" :offset="inputH">
            <div class="total">共{{total}}条搜索记录</div>
        </van-sticky>
        <van-pull-refresh v-model="isDownLoading" @refresh="onRefresh" v-if="flag&&netlist.length&&type==0">
            <van-list
                    v-model="isUpLoading" :finished="finished" @load="onLoad" class="clist" :offset="offset"
                    finished-text="到底了">
                <!-- 加载的内容-->
                <div class="citem" v-for="(item,index) in netlist" :key="index" @click="godetail(item.id)">
                    <div class="cimg">
                        <van-image :src="item.image" alt=""/>
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
        <div class="clist" v-if="flag&&netlist.length==0&&type==0">
            <NoData class="nodata" :top="0" :text="'暂无匹配的电竞馆'"></NoData>
        </div>

        <van-pull-refresh v-model="isDownLoading1" @refresh="onRefresh1" v-if="cshow&&clublist.length&&type==1">
            <van-list
                    v-model="isUpLoading1" :finished="finished1" @load="onLoad1" class="jlist" :offset="offset1"
                    finished-text="到底了">
                <div class="jitem van-row--flex" v-for="(item,index) in clublist" :key="item.id"
                     @click="godetail1(item.id)">
                    <div class="jimg">
                        <van-image :src="item.image" alt=""/>
                    </div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.name}}</div>
                        <div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>
                        </div>
                        <div class="jaddress van-ellipsis">{{item.address}}</div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <div class="jlist" v-if="cshow&&clublist.length==0&&type==1">
            <NoData :top="140" :text="'暂无匹配的俱乐部'"></NoData>
        </div>
        <van-pull-refresh v-model="isDownLoading2" @refresh="onRefresh2" v-if="schoolshow&&clublist1.length&&type==2">
            <van-list
                    v-model="isUpLoading2" :finished="finished2" @load="onLoad2" class="jlist" :offset="offset2"
                    :finished-text="finishedtext2">
                <div class="jitem van-row--flex" v-for="(item,index) in clublist1" :key="item.id"
                     @click="godetail2(item.id)">
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
        <div class="jlist" v-if="schoolshow&&clublist.length==0&&type==2">
            <NoData class="nodata" :top="0" :text="'暂无相关学院'"></NoData>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",

        data() {
            return {
                placeholder: '电竞馆名称/地址',
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
                flag: false,
                offset: 0,
                total: 0,
                slist: [],
                type: 0,
                keywords: ['电竞馆名称/地址', '俱乐部名称/地址', '学院名称/地址'],

                cshow: false,
                clublist: [],
                ind: 0,
                page1: 0,
                category_id: '',
                isUpLoading1: false,
                isDownLoading1: false,
                finished1: false,
                offset1: 0,
                finishedtext: '到底了',

                clublist1: [],
                page2: 0,
                category_id2: '',
                isUpLoading2: false,
                isDownLoading2: false,
                finished2: false,
                offset2: 0,
                finishedtext2: '到底了',
                schoolshow: false,
                inputH: 0
            }
        },
        created() {
            this.type = this.$route.query.type || 0;
            this.placeholder = this.keywords[this.type];
            if (localStorage.user_twap) {
                this._SearchHistory()
            }
            this.$nextTick(() => {
                this.inputH = this.$refs.searchtop.offsetHeight;
                console.log(this.inputH)
            });
            this.position = JSON.parse(sessionStorage.pos);
            this.city = sessionStorage.wapcity || '北京';
        },
        methods: {
            // 搜索结果
            seachAnswer() {
                this.page = 0;
                this.isDownLoading = false;
                this.isUpLoading = false;
                this.finished = false;
                this.isDownLoading1 = false;
                this.isUpLoading1 = false;
                this.finished1 = false;
                this.isDownLoading2 = false;
                this.isUpLoading2 = false;
                this.finished2 = false;
                console.log(this.type)
                if (this.keyword) {
                    // this.slist.unshift(this.keyword);
                    if (this.type == 0) {
                        this.netlist = [];
                        this._GetBarList()
                    } else if (this.type == 1) {
                        this.clublist = [];
                        this._ClubIndex()
                    } else if (this.type == 2) {
                        this.clublist1 = [];
                        this._CollegeIndex()
                    }
                }
                if (localStorage.user_twap) {
                    this._SearchHistory()
                }
            },
            keywordfn(item) {
                this.keyword = item;
                this.seachAnswer()
            },
            // 搜索历史
            _SearchHistory() {
                this.$api.SearchHistory(this.type).then(res => {
                    if (res.code == 1) {
                        this.slist = res.data
                    }
                })
            },
            // 清除历史记录
            _SearchClear() {
                this.$api.SearchClear(this.type).then(res => {
                    if (res.code == 1) {
                        this.$com.showtoast('清除成功！')
                        this.slist = [];
                    } else {
                        this.$com.showtoast(res.msg)
                    }
                })
            },
            // 返回首页
            backindex() {
                this.$router.go(-1)
            },
            // 获取列表
            _GetBarList() {
                let pageNumber = this.page + 1;
                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                this.$api.GetBarList(
                    pageNumber,
                    this.keyword,
                    this.city,
                    this.position[0] || 0,
                    this.position[1] || 0,
                    this.recommend,
                    this.label,
                    this.lindex == 0 ? '' : this.district,
                    this.circle,
                ).then(res => {
                    this.flag = true;
                    if (res.code == 1) {//请求成功
                        this.total = res.data.total;
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
            // 去详情
            godetail(id) {
                this.$router.push({path: '/competitiondetail', query: {id: id}})
            },
            // 去详情
            godetail1(id) {
                this.$router.push({path: '/clubdetail', query: {club_id: id}})
            },
            // 获取俱乐部列表
            _ClubIndex() {
                let pageNumber = this.page + 1;
                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                this.$api.ClubIndex(
                    pageNumber,
                    this.category_id,
                    this.city,
                    this.keyword,
                ).then(res => {
                    this.cshow = true;
                    if (res.code == 1) {//请求成功
                        this.total = res.data.total;
                        if (this.clublist.length) {//当请求前有数据时 第n次请求
                            if (this.isUpLoading1) {// 上拉加载
                                this.clublist = this.clublist.concat(res.data.data) //上拉加载新数据添加到数组中
                                this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                    this.isUpLoading1 = false  //关闭上拉加载中
                                })
                                if (res.data.data.length < 10) {//没有更多数据
                                    this.finished1 = true   //上拉加载完毕
                                    this.finishedtext = '到底了'
                                }
                            }
                            if (this.isDownLoading1) {//关闭下拉刷新
                                this.isDownLoading1 = false; //关闭下拉刷新中
                                this.clublist = res.data.data; //重新给数据赋值
                                if (this.finished1) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                    this.finished1 = false
                                }
                            }
                        } else {
                            // console.log(res)
                            this.clublist = res.data.data;
                            this.finishedtext = '到底了'
                        }
                    }

                })
            },
            // 下拉刷新
            onRefresh1() {
                setTimeout(() => {
                    this.$com.showtoast('刷新成功');
                    this.isDownLoading1 = false;
                    this.clublist = [];
                    this.page = 0;
                    this._ClubIndex();
                }, 500);
            },
            // 上拉加载
            onLoad1() {
                this.page++;
                this.isUpLoading = true;
                this._ClubIndex();
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
                        this.total = res.data.total;
                        if (this.clublist1.length) {//当请求前有数据时 第n次请求
                            if (this.isUpLoading2) {// 上拉加载
                                this.clublist1 = this.clublist1.concat(res.data.data) //上拉加载新数据添加到数组中
                                this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调
                                    this.isUpLoading2 = false  //关闭上拉加载中
                                })
                                if (res.data.data.length < 10) {//没有更多数据
                                    this.finished2 = true   //上拉加载完毕
                                    this.finishedtext = '到底了'
                                }
                            }
                            if (this.isDownLoading2) {//关闭下拉刷新
                                this.isDownLoading2 = false; //关闭下拉刷新中
                                this.clublist1 = res.data.data; //重新给数据赋值
                                if (this.finished2) { //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                                    this.finished2 = false
                                }
                            }
                        } else {
                            console.log(res)
                            this.clublist1 = res.data.data;
                            this.finishedtext = '到底了'
                        }
                    }
                })
            },
            // 下拉刷新
            onRefresh2() {
                setTimeout(() => {
                    this.$com.showtoast('刷新成功');
                    this.isDownLoading = false;
                    this.page = 0;
                    this._CollegeIndex();
                }, 500);
            },
            // 上拉加载
            onLoad2() {
                this.page++;
                this.isUpLoading = true;
                this._CollegeIndex();
            },
            // 去详情
            godetail2(id) {
                this.$router.push({path: '/schooldetail', query: {college_id: id}})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .searchbox {
        .searchtop {
            color: rgba(255, 255, 255, .3);
            height: 56px;
            display: flex;
            align-items: center;
            background: linear-gradient(90deg, #441219, #29182E);
            padding: 0 15px;

            /deep/
            .van-icon-arrow-left {
                font-size: 20px;
                margin-right: 15px;
            }

            .search_input {
                flex: 1;
                display: flex;
                align-items: center;
                padding: 0 18px;
                font-size: 13px;
                /*px*/
                height: 32px;
                background-color: rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                margin-right: 10px;

                /deep/ .van-icon {
                    color: rgba(255, 255, 255, .3);
                    line-height: 56px;
                    margin-right: 8px;
                    font-size: 20px;
                }

                /deep/ .van-cell {
                    background: none;
                    padding: 0;

                    input {
                        flex: 1;
                        background: none;
                        height: 100%;
                        color: #fff;

                        &::placeholder {
                            color: rgba(255, 255, 255, .3);
                            font-size: 14px;
                            /*px*/
                        }
                    }
                }

            }
            /deep/ .van-button{
                color: rgba(255,255,255,.72)!important;
            }
        }

        .search_his {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #999999;
            font-size: 12px;
            /*px*/
            padding: 24px 16px;

            .iconfont {
                color: #999999;

                font-size: 14px;
                /*px*/
                margin-right: 5px;
            }
        }

        .hislist {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 0 10px;

            span {
                min-width: 50px;
                text-align: center;
                padding: 10px;
                background-color: #F4F4F4;
                margin: 0 12px 10px 0;
            }
        }

        .total {
            color: #999999;
            font-size: 12px;
            /*px*/
            padding: 20px;
        }

        .clist {
            transition: ease-in-out .3s;
            position: relative;
            min-height: 400px;

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

                    img {
                        width: 100%;
                    }

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

        .jlist {
            padding: 15px 0;

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

                        .name {
                            margin-right: 10px;
                        }
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