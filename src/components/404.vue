<template>
    <div class="loading">
        <div class="loading-box">
            <!--<img src=".././img/404.png" />-->
            <div class="iconfont iconzanwushuju"></div>
            <p>抱歉，您访问的页面丢失。</p>
            <router-link to="/" replace tag="p">
                <van-button type="warning"  size="small">返回首页</van-button>
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: "lost",
        data() {
            return {};
        }
    };
</script>
<style scoped lang="scss">
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 9999;
        text-align: center;
    }

    .loading-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        /* IE 9 */
        -webkit-transform: translate(-50%, -50%);
        /* Safari and Chrome */
        -o-transform: translate(-50%, -50%);
        /* Opera */
        -moz-transform: translate(-50%, -50%);
        /* Firefox */
        .iconfont {
            color: #c79d62;
            font-size: 50px;
            /*px*/
        }
    }

    .loading-box img {
        display: block;
        width: 251px;
        margin: 0 auto 40px;
    }

    .loading-box p {
        text-align: center;
        color: #c79d62;
        opacity: .6;
        font-size: 14px;
        margin: 15px 0;
    }
</style>
