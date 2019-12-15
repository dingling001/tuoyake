<template>
    <div class="index">
        <!--<el-amap class="amap-box" vid="map" :plugin="plugin"></el-amap>-->
        <homeTop @city="getcity" @pos="getpos" :showhome="true" :showtop="true"></homeTop>
        <router-view class="router-view" :wapcity="city" :pos="position" v-if="city&&position.length"></router-view>
    </div>
</template>

<script>

    import homeTop from '../../components/homeTop'

    export default {
        name: "home",
        data() {
            return {
                city: '',
                position: []
            }
        },
        created() {
        },
        methods: {
            getcity(val) {
                console.log(val, 'val')
                this.city = val
            },
            getpos(val) {
                console.log(val)
                this.position = val;
            }
        },
        components: {
            homeTop
        }
    }


</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .index {
        background-image: url("../../assets/img/index_bg.png");
        background-size: 100% auto;
        background-position: top center;
        background-repeat: no-repeat;

        .router-view {
            margin-top: -60px;
            position: relative;
            /*z-index: 2;*/
            background-color: #fff;
            border-radius: 10px 10px 0 0;
            padding: 60px 0 0 0;
        }
    }
</style>
