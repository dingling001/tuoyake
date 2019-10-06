<template>
    <div class="login_box">
        <div class="login_head">
            <div class="iconfont iconguanbi-copy"></div>
        </div>
        <div class="login_title">登录托亚克</div>
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped lang="scss">
    .login_box {
        .login_head {
            height: 56px;
            line-height: 56px;
            padding: 0 20px;

            .iconfont {
                font-size: 18px;
                /*px*/
                color: #333333;
                font-weight: bold;
            }
        }

        .login_title {
            font-size: 24px;
            /*px*/
            color: #333;
            padding: 0 40px;
            font-weight: bold;
            margin: 100px 0 65px 0;
        }
    }
</style>