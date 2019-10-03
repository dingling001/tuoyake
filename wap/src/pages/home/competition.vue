<template>
    <div class="cbox">
        <div class="cselect">
            <div class="cselectitem"><span>推荐电竞馆</span><span class="iconfont iconjiantouarrow486"></span></div>
            <div class="cselectitem"><span>全部服务</span><span class="iconfont iconjiantouarrow486"></span></div>
            <div class="cselectitem"><span>全部地区</span><span class="iconfont iconjiantouarrow486"></span></div>
        </div>
        <div class="clist">
            <div class="citem">
                <div class="cimg"><img src="" alt=""></div>
                <div class="cright">
                    <div class="cname">
                        <span class="name"></span>
                        <span class="juli"></span>
                    </div>
                    <div class="ctype"></div>
                    <span class="caddress"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "competition"
    }
</script>

<style scoped lang="scss">
    .cbox {
        background-color: #fff;
        margin-top: -10px;
        border-radius: 10px 10px 0 0;
        padding: 60px 0;

        .cselect {
            padding: 0 39px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333333;
            font-size: 12px;
            /*px*/
            .cselectitem {
                display: flex;
                align-items: center;
                padding: 25px 0;

                .iconfont {
                    color: #BBBBBB;
                    font-size: 14px;
                    /*px*/
                    margin-left: 5px;
                }
            }

        }
    }
</style>
