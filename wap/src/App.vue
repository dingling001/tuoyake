<template>
    <div class="app" v-cloak>
        <v-header v-if="showH"></v-header>
        <keep-alive>
            <router-view v-wechat-title="title" v-if="$route.meta.keepAlive" class="router-view"></router-view>
        </keep-alive>
        <router-view v-wechat-title="title" v-if="!$route.meta.keepAlive"
                     :class="['router-view',showH?'':'nonav',showF==false&&showH==false?'noall':'']">
        </router-view>
        <v-footer v-if="showF" :gindex="f_index"></v-footer>
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
                f_index: 0
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
                this.showF = val.meta.showF;
                if (val.fullPath.indexOf('/gindex') !== -1) {
                    this.f_index = 1
                } else if (val.fullPath.indexOf('/my') !== -1) {
                    this.f_index = 2;
                } else {
                    this.f_index = 0
                }
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
            height: calc(100vh - 61px);
            overflow-y: scroll;

            &.nonav {
                min-height: calc(100vh - 83px);
            }

            &.noall {
                min-height: 100vh;
            }
        }

    }
</style>

