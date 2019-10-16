<template>
    <div class="app" v-cloak>
        <top v-if="showH" :title="headtext"></top>
        <keep-alive>
            <router-view v-wechat-title="title" v-if="$route.meta.keepAlive" class="router-view"></router-view>
        </keep-alive>
        <router-view v-wechat-title="title" v-if="!$route.meta.keepAlive"
                     :class="['router-view',showH?'nonav':'',showF==false&&showH==false?'noall':'']">
        </router-view>
        <bottom v-if="showF" :gindex="f_index"></bottom>
    </div>
</template>
<script>
    import VHeader from "./components/vheader.vue";
    import VFooter from "./components/foot.vue";

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
            'top': VHeader,
            'bottom': VFooter
        },
        watch: {
            '$route': {
                handler(val) {
                    this.title = '托亚克 | ' + val.meta.title;
                    this.showF = val.meta.showF;
                    this.showH = val.meta.showH;
                    this.headtext = val.meta.title;
                    if (val.fullPath.indexOf('/gindex') !== -1) {
                        this.f_index = 1
                    } else if (val.fullPath.indexOf('/my') !== -1) {
                        this.f_index = 2;
                    } else {
                        this.f_index = 0
                    }
                },
                immediate: true
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
                height: 100vh;
                padding-top: 56px;
            }

            &.noall {
                height: 100vh;
            }
        }

    }
</style>

