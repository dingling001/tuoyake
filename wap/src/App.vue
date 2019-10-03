<template>
    <div class="app" v-cloak>
        <v-header v-if="showH"></v-header>
        <keep-alive>
            <router-view v-wechat-title="title" v-if="$route.meta.keepAlive" class="router-view"></router-view>
        </keep-alive>
        <router-view v-wechat-title="title" v-if="!$route.meta.keepAlive" :class="['router-view',showH?'':'nonav']"></router-view>
        <v-footer v-if="showF"></v-footer>
    </div>
</template>
<script>
    import Header from "./components/header.vue";
    import Footer from "./components/foot.vue";

    export default {
        name: "App",
        data() {
            return {
                showH: false,
                showF: true,
                plat: "",
                title: '跳转中…',
            };
        },
        created() {
        },


        components: {
            'v-header': Header,
            'v-footer': Footer
        },
        watch: {
            '$route'(val) {
                this.title = '托亚克 | ' + val.meta.title;
                // console.log(this.title)
            }
        },
        provide() {
            return {
                app: this
            };
        },

        methods: {}
    };
</script>
<style lang="scss" scoped>
    .app {
        .router-view {
            min-height: calc(100vh - 139px);
            overflow-y: scroll;
            &.nonav{
                min-height: calc(100vh - 83px);
            }
        }

    }
</style>

