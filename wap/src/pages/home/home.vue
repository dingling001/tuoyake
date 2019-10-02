<template>
    <div class="index">
        <div v-wechat-title="title"></div>
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
            <div class="searchinput"><span class="iconfont iconsousuo1"></span><span></span></div>
        </div>
        <!--<router-view class="router-view"></router-view>-->
        <keep-alive>
            <router-view class="router-view"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import Club from './club'

    export default {
        name: "home",
        data() {
            return {
                transitionName: 'transitionLeft',
                title: '',
                city: '天津',
                ind: 0,
                keyword: ''
            }
        },
        components: {
            Club
        },
        created() {
            this.title = '托亚克 | ' + this.city;

        },
        methods: {
            // 切换滑块
            tabhome(index, path) {
                this.ind = index;
                this.$router.push(path)
            }
        },
        mounted() {
            this.ind = this.$route.meta.index || 0;
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
            background-color: #222;
            height: 256px;

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
                width: 94.4%;
                height: 32px;
                background: rgba(255, 255, 255, .008);
                border-radius: 16px;
                margin: 0 auto;
            }
        }
    }
</style>
