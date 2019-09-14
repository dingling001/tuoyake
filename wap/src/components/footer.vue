<template>
    <div class="footer">
        <div class="footer_item footer_itemactive"><span class="iconfont iconshouyex"></span><span>首页</span></div>
        <div class="footer_item"><span class="iconfont icondiannao"></span><span>电竞馆</span></div>
        <div class="footer_item"><span class="iconfont iconwode"></span><span>我的</span></div>
    </div>
</template>
<style scoped lang="scss">
    @import "../style/reset";

    .footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1;
        padding: 12px 50px 34px 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 -1px 10px rgba(0, 0, 0, .08);

        .footer_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #909090;
            font-weight: bold;
            font-size: 9px;
            /*px*/
            .iconfont {
                color: rgba(154, 155, 168, .3);
                font-size: 19px;
                /*px*/
                margin-bottom: 6px;
            }
        }

        .footer_itemactive {
            color: #333;

            .iconfont {
                color: $baseRed;

            }
        }
    }
</style>