<template>
    <div class="nodatabox">
        <img :src="img" alt="">
    </div>
</template>

<script>
    export default {
        name: "NoData",
        props: {
            'img': {
                type: String,
                default: ''
            },
        }
    }
</script>

<style scoped lang="scss">
    .nodatabox {
        position: fixed;
        z-index: 9;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            /*width: 297px;*/
            /*height: auto;*/
            width: 288px;
            height: 221px
        }
    }
</style>