<template>
    <div class="combox">
        <div class="comimg"><img src="" alt="">album_images</div>
        <div class="comitem">
            <div class="comnanme">{{comdata.info.name}}</div>
            <div class="starbox">
                <div class="iconfont "></div>
            </div>
            <div class="comaddress">
                <div><span class="iconfont "></span></div>
                <div class=""><span class="iconfont"></span></div>
            </div>
            <div class="comlist">
                <div class="jitem van-row--flex" v-for="(item,index) in comdata.goods" :key="item.bar_id"
                     @click="godetail(item.bar_id)">
                    <div class="jimg"><img :src="item.image" alt=""></div>
                    <div class="jright">
                        <div class="jname van-ellipsis">{{item.bar_name}}</div>
                        <!--<div class="jinfo"><span class="name">{{item.contact}}</span><span class="tel">{{item.contact_number}}</span>-->
                        <!--</div>-->
                        <div class="jaddress van-ellipsis">{{comdata.info.address}}</div>
                        <div class="price">{{item.price}}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "competitiondetail",
        data() {
            return {
                id: '',
                comdata: {
                    goods: [],
                    info: {}
                }
            }
        },
        created() {
            if (this.$route.query.id) {
                this.id = this.$route.query.id;
                this._GetBarInfo();
            } else {
                this.$router.replace('/')
            }
        },
        methods: {
            _GetBarInfo() {
                this.$api.GetBarInfo(this.id).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .combox {
        .comimg {
            height: 282px;
        }

        .comitem {
            .comlist {
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
        }

    }

</style>