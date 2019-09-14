<template>
    <div class="app" v-cloak>
        <!--<Nav v-if="nav" ref="nav" v-cloak></Nav>-->
        <div :class="{'navP':nav}">
            <keep-alive>
                <transition>
                    <router-view :v-wechat-title="title" v-if="$route.meta.keepAlive"></router-view>
                </transition>
            </keep-alive>
            <transition :name="transitionName">
                <router-view :v-wechat-title="title" v-if="!$route.meta.keepAlive"></router-view>
            </transition>
        </div>
        <v-footer v-if="footer" v-cloak></v-footer>
    </div>
</template>
<script>
    import Header from "./components/header.vue";
    import Footer from "./components/footer.vue";

    export default {
        name: "App",
        data() {
            return {
                nav: false,
                plat: "",
                footer: true,
                transitionName: "slide-right",
                title: ''
            };
        },
        computed: {},
        components: {
            'v-header':Header,
            'v-footer':Footer
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
</style>
