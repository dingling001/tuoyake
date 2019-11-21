<template>
    <div class="nodatabox" :style="{top:top+'px'}">
        <img :src="img" alt="">
        <span class="text">暂无数据</span>
    </div>
</template>

<script>
    export default {
        name: "NoData",
        props: {
            'img': {
                type: String,
                default: require('../assets/img/nodata.png')
            },
            'top': {
                type: Number || String,
                default: 0
            }
        }
    }
</script>

<style scoped lang="scss">
    .nodatabox {
        position: absolute;
        z-index: 9;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
            /*width: 297px;*/
            /*height: auto;*/
            width: 144px;
            height: 111px
        }
        .text{
            line-height: 30px;
            font-size: 14px;
            /*px*/
            color: #666;
        }
    }
</style>