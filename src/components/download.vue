<template>
    <div class="download">
        <div class="logobox"><img src="../assets/img/logo.png" alt=""></div>
        <div class="download_tips">请下载官方APP进行下单支付</div>
        <a class="download_item" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.yt.tyk"><span class="iconfont iconiconfontanzhuo"></span><span>Android下载</span></a>
        <a class="download_item" href="https://apps.apple.com/cn/app/%E6%89%98%E4%BA%9A%E5%85%8B/id1486551960"><span class="iconfont iconpingguo"></span><span>iPhone下载</span></a>
    </div>
</template>

<script>
    export default {
        name: "download"
    }
</script>

<style scoped lang="scss">
    .download {
        .logobox {
            padding: 45px 0 21px;
            width: 83px;
            margin: 0 auto;

            img {
                width: 100%;
            }
        }

        .download_tips {
            font-size: 12px;
            /*px*/
            color: #333;
            text-align: center;
            padding: 0 0 53px 0;
        }

        .download_item {
            display: flex;
            align-items: baseline;
            justify-content: center;
            width: 280px;
            margin: 0 auto 25px auto;
            border: 1px solid #CCCCCC;
            border-radius: 5px;
            font-size: 16px;
            /*px*/
            color: #333;
            /*height: 48px;*/
            line-height: 48px;

            .iconiconfontanzhuo {
                font-size: 20px;
                /*px*/
                margin-right: 10px;
            }
        }
    }
</style>