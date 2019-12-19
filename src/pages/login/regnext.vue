<template>
    <div class="login_box">
        <div class="login_head" @click="$router.go(-1)">
            <div class="iconfont iconfanhui"></div>
        </div>
        <div class="login_title">设置密码</div>
        <form class="loginform">
            <van-field label="登录密码" v-model="password" placeholder="登录密码" maxlength="12" type="password" clearable/>
            <van-field label='确认密码' v-model="repassword" placeholder="确认密码" maxlength="12" type="password" clearable>
            </van-field>
            <div class="login_btn" @click="gologin">前往登录</div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "reg",
        data() {
            return {
                account: '',
                captcha: '',
                password: '',
                repassword: '',
            }
        },
        created() {
            this.account = this.$route.query.account;
            this.captcha = this.$route.query.captcha;
        },
        methods: {
            gologin() {
                if (this.password == '') {
                    this.$com.showtoast('请输入密码')
                } else if (this.password.length < 6 || this.password.length > 12) {
                    this.$com.showtoast('密码长度介于6～12位之间')
                } else if (this.repassword == '') {
                    this.$com.showtoast('请输入重复密码')
                } else if (this.password != this.repassword) {
                    this.$com.showtoast('两次密码不一致')
                } else {
                    this.$api.Register(this.account, this.captcha, this.password, this.repassword).then((res) => {
                        // console.log(res)
                        if (res.code == 1) {
                            this.$com.showtoast('注册成功');
                            this.$router.replace({path: '/login'})
                        } else {
                            this.$com.showtoast(res.msg || '稍后再试')
                        }
                    })

                }
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
                font-size: 15px;

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
                margin: 51px auto;
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
        }

    }
</style>