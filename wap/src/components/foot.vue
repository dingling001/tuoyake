<template>
    <div class="footer">
        <div :class="['footer_item',findex==0?'footer_itemactive':'']" @click="tab(0,'/competition')">
            <span class="iconfont iconshouyex"></span><span>首页</span>
        </div>
        <div :class="['footer_item',findex==1?'footer_itemactive':'']" @click="tab(1,'/gindex')">
            <span class="iconfont icondiannao"></span><span>电竞馆</span>
        </div>
        <div :class="['footer_item',findex==2?'footer_itemactive':'']" @click="tab(2,'/my')">
            <span class="iconfont iconwode"></span><span>我的</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'foot',
        data() {
            return {
                findex: 0
            }
        },
        props: {
            'gindex': {
                default: 0
            }
        },
        created() {
            this.findex = this.gindex;
        },
        watch: {
            '$route'(val) {
                // console.log(val)
                if (val.fullPath.indexOf('/gindex') !== -1) {
                    this.findex = 1
                } else if (val.fullPath.indexOf('/my') !== -1) {
                    this.findex = 2;
                } else {
                    this.findex = 0
                }
            }
        },
        mounted() {
        },
        methods: {
            // 切换滑块
            tab(index, path) {
                this.findex = index;
                this.$router.push(path)
            }
        },

    }
</script>
<style scoped lang="scss">
    @import "../style/reset";

    .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1000;
        padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 -1px 10px rgba(0, 0, 0, .08);
        background-color: #fff;

        .footer_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #909090;
            font-weight: bold;
            flex: 1;
            font-size: 9px;
            /*px*/
            .iconfont {
                color: rgba(154, 155, 168, .3);
                font-size: 19px;
                /*px*/
                margin-bottom: 6px;
            }
        }

        .footer_itemactive {
            color: #333;

            .iconfont {
                color: $baseRed;

            }
        }
    }
</style>
