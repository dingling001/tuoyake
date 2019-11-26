<template>
    <div class="login_box">
        <div class="login_head" @click="$router.go(-1)">
            <div class="iconfont iconfanhui"></div>
        </div>
        <div class="login_title">验证手机</div>
        <form class="loginform">
            <van-field v-model="account" placeholder="手机号" type="number" clearable/>
            <van-field v-model="password" placeholder="短信验证码" type="text" center clearable>
                <van-button slot="button" type="default" class="code" size="small">获取验证码</van-button>
            </van-field>
            <div class="login_btn" @click="gonext">继续</div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "reg",
        data() {
            return {
                account: '',
                password: '',
            }
        },
        created() {
        },
        methods: {
            // 下一步
            gonext() {
                this.$router.push({path: '/resetpass', query: {}})
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

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

        .loginform {
            width: 300px;
            margin: 0 auto;

            /deep/ .van-cell {
                padding: .266667rem 0;

                &:after {
                    left: 0;
                    border-color: #E4E4E4;
                }

                input {
                    font-size: 16px;
                    /*px*/
                    &::placeholder {
                        color: #AAAAAA;
                        font-size: 16px;
                        /*px*/
                    }
                }

                .code {
                    color: #778399;
                    font-size: 14px;
                    /*px*/
                    border: none;
                    background: none;

                    &:active {
                        opacity: 1;
                        background: none;
                    }

                    &:before {
                        background: none;
                    }
                }
            }

            .login_btn {
                width: 300px;
                margin: 51px auto 0 auto;
                text-align: center;
                background-color: $baseBlue;
                color: #fff;
                font-size: 17px;
                /*px*/
                font-weight: bold;
                border-radius: 5px;
                padding: 14px 0;

                &:active {
                    opacity: .9;
                }
            }

            .login_pass {
                text-align: center;
                font-size: 15px;
                /*px*/
                color: #666666;
                padding: 29px 0;
            }
        }

    }
</style>