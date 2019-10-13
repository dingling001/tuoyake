<template>
    <div class="nav">
        <span :class="'iconfont '+iconfont" @click="goback"></span>
        <span>{{title}}</span>
        <span v-if="showright" class="navright"></span>
    </div>
</template>

<script>

    export default {
        name: "vheader",
        data() {
            return {};
        },
        props: {
            'title': {
                type: String,
                default: ''
            },
            'showright': {
                type: Boolean,
                default: false
            },
            iconfont: {
                type: String,
                default: 'iconfanhui'
            }
        },
        methods: {
            goback() {
                this.$router.go(-1);
            }
        }

    };
</script>
<style scoped lang="scss">
    .nav {
        height: 56px;
        text-align: center;
        /*padding: 0 15px;*/
        line-height: 56px;
        color: #333;
        font-size: 17px;
        /*px*/
        font-weight: bold;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;

        .iconfont {
            position: absolute;
            left: 15px;
            top: 0;
            z-index: 1;
            font-weight: normal;
            color: #333333;
            font-size: 17px;
            /*px*/
        }

        .navright {
            position: absolute;
            right: 15px;
            top: 0;
            z-index: 1;
        }
    }
</style>