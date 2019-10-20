<template>
    <div class="vlisstbox">
        <div class="vlist">
            <div class="videoitem" v-if="vlist.length" v-for="(item,index) in vlist" :key="item.id"
                 @click="govdetail(item.id)">
                <div class="vimg">
                    <img src="" alt="">
                </div>
                <div class="vname van-ellipsis">{{item.name}}</div>
                <div class="vtime"><span class="iconfont icontime-circle"></span><span>{{item.create_time}}</span></div>
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

                    img {
                        width: 100%;
                    }
                }

                .vname {
                    font-size: 13px;
                    /*px*/
                    color: #333;
                    padding: 17px 0;

                }

                .vtime {
                    font-size: 10px;
                    /*px*/
                    color: #666666;

                    .iconfont {
                        color: #AAAAAA;
                        font-size: 14px;
                        /*px*/
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>