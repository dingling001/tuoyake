<template>
    <div class="app" v-cloak>
        <top v-if="showH" :title="headtext" :iconfont="iconfont" :rlink="rlink" :showright="showright"
             :right_text="right_text" :is_app="is_app"></top>
        <keep-alive>
            <router-view v-wechat-title="title" v-if="$route.meta.keepAlive" class="router-view"
                         :class="['router-view',showH?'nonav':'',showF==false&&showH==false?'noall':'']"
            ></router-view>
        </keep-alive>
        <router-view v-wechat-title="title" v-if="!$route.meta.keepAlive"
                     :class="['router-view',showH?'nonav':'',showF==false&&showH==false?'noall':'']">
        </router-view>
        <bottom v-if="showF" :gindex="f_index"></bottom>
        <NetError v-if="showneterror"></NetError>
        <backTop></backTop>
    </div>
</template>
<script>
    import VHeader from "./components/vheader.vue";
    import VFooter from "./components/foot.vue";
    import NetError from './components/NetError'
    import backTop from './components/backTop'

    export default {
        name: "App",
        data() {
            return {
                showH: false,
                showF: true,
                plat: "",
                title: '跳转中…',
                f_index: 0,
                iconfont: 'iconfanhui',
                rlink: '',
                showright: false,
                right_text: '',
                showneterror: localStorage.showneterror || false,
                is_app: 0
            };
        },
        created() {
            var _ = this;
            window.addEventListener('offline', function () {
                _.showneterror = true
            });
            window.addEventListener('online', function () {
                _.showneterror = false
            })
            localStorage.removeItem('loccity');
            localStorage.removeItem('count');
        },
        components: {
            'top': VHeader,
            'bottom': VFooter,
            NetError,
            backTop
        },
        watch: {
            '$route': {
                handler(val) {
                    this.title = '托亚克 | ' + val.meta.title;
                    this.showF = val.meta.showF;
                    this.showH = val.meta.showH;
                    this.headtext = val.meta.title;
                    this.iconfont = val.meta.iconfont || 'iconfanhui';
                    this.showright = val.meta.showright || false;
                    this.right_text = val.meta.right_text;
                    this.is_app = this.$route.query.is_app ? this.$route.query.is_app : 0;
                    console.log(this.is_app)
                    this.rlink = val.meta.rlink;
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

        methods: {
            setTitle(title) {
                this.headtext = title
            }
        }
    };
</script>
<style lang="scss" scoped>
    .router-view {
        /*min-height: calc(100vh - 61px);*/
        /*overflow-y: scroll;*/
        padding-bottom: 61px;
        min-height: 100vh;

        &.nonav {
            /*min-height: 100vh;*/
            padding-top: 56px;
        }

        &.noall {
            /*min-height: 100vh;*/
        }
    }
</style>

