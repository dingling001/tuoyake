<template>
    <div class="vlisstbox">
        <div class="vlist">
            <div class="videoitem" v-if="vlist.length" v-for="(item,index) in vlist" :key="item.id"
                 @click="govdetail(item.id)">
                <div class="vimg">
                    <!--                    <img :src="item.poster" alt="">-->
                    <van-image
                            height="100%"
                            fit="cover"
                            :src="item.poster"
                    />
                    <span>{{s_to_hs(item.duration)}}</span>
                </div>
                <div class="vname van-ellipsis">{{item.name}}</div>
                <div class="vtime">
                    <div class="vitem">
                        <span class="iconfont icontime-circle"></span><span>{{item.create_time}}</span>
                    </div>
                    <div class="vitem">
                        <span>{{item.view_num}}人观看</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "videolist",
        data() {
            return {
                vlist: [],
                math_id: ''
            }
        },
        created() {
            if (this.$route.query.match_id) {
                this.match_id = this.$route.query.match_id;
                this._GetVideoList()
            } else {
                this.$router.replace('/')
            }
        },
        methods: {
            // 获取列表
            _GetVideoList() {
                this.$api.GetVideoList(this.match_id).then(res => {
                    if (res.code == 1) {
                        this.vlist = res.data;
                    }
                })
            },
            // 视频详情
            govdetail(id) {
                this.$router.push({path: '/videodetail', query: {video_id: id}})
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
    .vlisstbox {
        .vlist {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 10px 17px;

            .videoitem {
                width: 162px;
                margin-bottom: 22px;

                &:nth-child(2n-1) {
                    margin-right: 10px;
                }

                .vimg {
                    width: 100%;
                    height: 91px;
                    display: flex;
                    align-content: center;
                    justify-content: center;
                    overflow: hidden;
                    background-color: #000;
                    position: relative;

                    img {
                        width: 100%;
                    }

                    span {
                        position: absolute;
                        right: 5px;
                        bottom: 5px;
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

                .vname {
                    font-size: 13px;
                    /*px*/
                    color: #333;
                    padding: 17px 0 10px 0;
                }

                .vtime {
                    font-size: 10px;
                    /*px*/
                    color: #666666;
                    /*display: flex;*/
                    /*align-items: center;*/
                    /*justify-content: space-between;*/
                    .vitem {
                        display: flex;
                        align-items: center;
                        margin: 0 5px 5px 0;

                        .iconfont {
                            color: #AAAAAA;
                            font-size: 12px;
                            /*px*/
                            margin: 0 5px 0 0;
                        }
                    }
                }
            }
        }
    }
</style>