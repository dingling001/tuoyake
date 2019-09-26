<template>
    <div class="index">
        <div v-wechat-title="title"></div>
        <div class="index_top">
            <div class="htop">
                <div class="htopleft">
                    <router-link to="/home/competition" tag="span" :class="{'activespan':index==0}">
                        电竞馆
                        <span class="border_b" v-if="index==0"></span>
                    </router-link>
                    <router-link to="/home/club" tag="span" :class="{'activespan':index==1}">俱乐部
                        <span class="border_b" v-if="index==1"></span>
                    </router-link>
                    <router-link to="/home/school" tag="span" :class="{'activespan':index==2}">学院
                        <span class="border_b" v-if="index==2"></span>
                    </router-link>
                </div>
                <div class="index_address"><span class="iconfont icondingweiweizhi"></span> {{city}}</div>
            </div>
        </div>
        <router-view class="transitionBody"></router-view>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                transitionName: 'transitionLeft',
                title: '',
                city: '天津',
                index: 0
            }
        },
        created() {
            this.title = '托亚克 | ' + this.city;

        },
        mounted() {
            this.index = this.$route.meta.index || 0;
        },
        watch: {
            '$route'(to, from) {
                const arr = ['home', '/home/competition', '/home/club', '/home/school']
                const compare = arr.indexOf(to.path) > arr.indexOf(from.path)
                // console.log(to)
                this.index = to.meta.index;
                this.title = to.meta.title + ' | ' + this.city;
                this.transitionName = compare ? 'transitionLeft' : 'transitionRight'
            }
        }
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

                        &:last-child {
                            margin: 0;
                        }

                        .border_b {
                            position: absolute;
                            width: 30px;
                            height: 4px;
                            background: linear-gradient(90deg, $baseBlue, $baseRed);
                            border-radius: 3px;
                            left: 0;
                            bottom: -6px;
                            z-index: 1;
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
                    border-radius:12px;
                    display: flex;
                    align-items: center;
                    .iconfont{
                        margin-right: 2px;
                    }
                }
            }
        }
    }

    .transitionBody {
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .transitionLeft-enter,
    .transitionRight-leave-active {
        /*-webkit-transform: translate(100%, 0);*/
        transform: translate(100%, 0);
        /*当左滑进入右滑进入过渡动画*/
        opacity: 0;
        -webkit-transform: translate(50px, 0);
    }

    .transitionLeft-leave-active,
    .transitionRight-enter {
        /* -webkit-transform: translate(-100%, 0);
         transform: translate(-100%, 0);*/
        opacity: 0;
        -webkit-transform: translate(-50px, 0);
        transform: translate(-50px, 0)
    }
</style>
