<template>
    <div class="app" v-cloak>
        <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
            <keep-alive>
                <router-view :v-wechat-title="title" v-if="$route.meta.keepAlive" class="router-view"></router-view>
            </keep-alive>
        </transition>
        <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
            <router-view :v-wechat-title="title" v-if="!$route.meta.keepAlive" class="router-view"></router-view>
        </transition>
        <v-footer v-if="footer" v-cloak></v-footer>
    </div>
</template>
<script>
    import Header from "./components/header.vue";
    import Footer from "./components/foot.vue";
    import {mapState} from 'vuex'

    export default {
        name: "App",
        data() {
            return {
                nav: false,
                plat: "",
                footer: true,
                title: ''
            };
        },
        created() {
        },

        computed: {
            ...mapState({
                direction: state => state.mutations.direction,
            })
        },
        components: {
            'v-header': Header,
            'v-footer': Footer
        },
        watch: {},
        provide() {
            return {
                app: this
            };
        },

        methods: {}
    };
</script>
<style lang="scss" scoped>
    [v-cloak] {
        display: none;
    }

    .navP {
        flex: 1;
        padding-bottom: 60px;
        display: flex;
        flex-direction: column;
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 250ms;
        height: 100%;
        top: 0;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
        -webkit-perspective: 1000,
    }

    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>

