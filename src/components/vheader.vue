<template>
    <div class="nav">
        <span :class="'iconfont '+iconfont" @click="goback" v-if="is_app==0"></span>
        <router-link to="/index" class="iconfont iconshouyex" v-else></router-link>
        <span>{{title}}</span>
        <router-link v-if="showright" class="navright" tag="span" :to="rlink">{{right_text}}</router-link>
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
            'iconfont': {
                type: String,
                default: 'iconfanhui'
            },
            'right_text': {
                type: String,
                default: ''
            },
            'rlink': {
                type: String,
                default: '/'
            },
            'is_app': {
                default: '0'
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
            font-size: 13px;
            /*px*/
            color: #333333;
        }
    }
</style>