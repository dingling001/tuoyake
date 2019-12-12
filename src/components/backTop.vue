<template>
    <transition name="fade">
        <img v-if="btnFlag" class="go-top" src="../assets/img/totop.png" @click="backTop">
    </transition>
</template>

<script>
    export default {
        name: "backTop",
        data() {
            return {
                btnFlag: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.scrollToTop);
        },
        destroyed() {
            window.removeEventListener('scroll', this.scrollToTop)
        },
        methods: {
            // 点击图片回到顶部方法，加计时器是为了过渡顺滑
            backTop() {
                const that = this
                let timer = setInterval(() => {
                    let ispeed = Math.floor(-that.scrollTop / 5)
                    document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                    if (that.scrollTop === 0) {
                        clearInterval(timer)
                    }
                }, 16)
            },

            // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
            scrollToTop() {
                const that = this
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                that.scrollTop = scrollTop
                if (that.scrollTop > 60) {
                    that.btnFlag = true
                } else {
                    that.btnFlag = false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .go-top {
        z-index: 9990;
        position: fixed;
        bottom: 80px;
        border-radius: 50%;
        opacity: 1;
        width: 40px;
        height: 40px;
        right: 25px;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .fade-leave, .fade-enter-to {
        opacity: 1
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s
    }
</style>