<template>
    <div class="pbox">
        <div class="plogo"><img :src="platinfo.logo" alt=""></div>
        <van-cell-group class="setbox">
            <a :href="'tel:'+platinfo.join_hotline">
                <van-cell title="加盟热线" :value="platinfo.join_hotline"/>
            </a>
            <a :href="'tel:'+platinfo.customer_service">
                <van-cell title="平台客服" :value="platinfo.customer_service"/>
            </a>
            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+platinfo.qq_number +'&version=1&src_type=web&web_src=oicqzone.com'" target="_blank">
                <van-cell title="平台QQ" :value="platinfo.qq_number"/>
            </a>
            <a :href="platinfo.website" target="_blank">
                <van-cell title="平台网址" :value="platinfo.website"/>
            </a>
            <div class="codebox">
                <div class="citem">
                    <img :src="platinfo.weibo_qrcode" alt="">
                    <div>平台公众号</div>
                </div>
                <div class="citem">
                    <img :src="platinfo.weibo_qrcode" alt="">
                    <div>平台微博</div>
                </div>
            </div>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "myPlatform",
        data() {
            return {
                platinfo: {}
            }
        },
        created() {
            this._Platform();
        },
        methods: {
            _Platform() {
                this.$api.Platform().then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.platinfo = res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .pbox {
        .plogo {
            padding: 40px 0;
            text-align: center;
            width: 83px;
            margin: 0 auto;

            img {
                width: 100%;
            }
        }

        .setbox {
            /deep/ .van-cell {
                padding: 20px 20px 19px 23px;
                font-size: 16px;
                /*px*/
                .van-cell__title {
                    color: #333;
                    font-size: 16px;
                    /*px*/
                }

                &:not(:last-child):after {
                    left: 20px;
                }

            }

            &:after {
                border: 0;
            }
        }

        .codebox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 39px 55px ;

            .citem {
                width: 96px;
                color: #666;
                text-align: center;
                font-size: 13px;
                /*px*/
                img {
                    width: 100%;
                    margin-bottom: 10px;
                }

            }
        }
    }
</style>