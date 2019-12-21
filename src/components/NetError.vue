<template>
    <div class="netbox">
        <div class="netitem">
            <!--<span class="iconfont iconzanwushuju"></span>-->
            <img src="../assets/img/nonet.png" alt="">
            <div class="text">网络连接超时了...</div>
            <van-button type="warning" size="small" @click="refresh">刷新</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NetError",
        created(){
            this.$com.showtoast('网络小短腿跑不动了')
        },
        methods: {
            refresh() {
                localStorage.removeItem('showneterror');
                localStorage.setItem('count',0);
                // localStorage.removeItem('url');
                window.location.reload();
            }
        }
    }
</script>

<style scoped lang="scss">
    .netbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 99999;
        text-align: center;

        .netitem {
            position: absolute;
            width: 300px;
            height: 300px;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;

            .iconfont {
                font-size: 70px;
                color: #ddd;
            }

            .text {
                padding: 15px 0;
                font-size: 13px;
                /*px*/
                color: #ccc;
            }

            img {
                width: 60%;
            }
        }

    }
</style>
