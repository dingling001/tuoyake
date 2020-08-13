<template>
    <van-overlay :show="true" @click="InitOpenApp" :z-index="500" :custom-style="{background:'transparent'}">
    </van-overlay>
</template>

<script>
    import {initOpenApp} from "../assets/js/utils";

    export default {
        name: "initapp",
        methods: {
            InitOpenApp() {
                initOpenApp()
            },
        }
    }
</script>