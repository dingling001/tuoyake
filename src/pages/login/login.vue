<template>
    <div class="login_box">
        <div class="login_head" @click="$router.go(-1)">
            <div class="iconfont iconguanbi-copy"></div>
        </div>
        <div class="login_title">登录托亚克</div>
        <form class="loginform">
            <van-field v-model.trim="account" maxlength="11"   placeholder="请输入您的账号"  @input="accountinput" readonly clickable  clearable  type="text"      @touchstart.native.stop="showkeybord = true"/>
            <van-field v-model="password" placeholder="请输入您的密码" type="password" maxlength="12" clearable autocomplete/>
            <div class="btns van-row--flex van-row--justify-space-between">
                <span @click="gocode">验证码登录</span>
                <router-link tag="span" to="/forgotpass">忘记密码?</router-link>
            </div>
            <div type="info" class="login_btn" @click="loginpass">登录</div>
            <div class="reg_agree">登录即同意<span @click="goagree">《用户协议》</span>和<span  @click="goprvide">《隐私政策》</span></div>
            <div class="tips">
                <span>还没有账号，</span>
                <router-link class="reg" to="/reg" tag="span">去注册</router-link>
                <span class="iconfont iconjiantou"></span>
            </div>
        </form>
        <van-number-keyboard
        v-model="account"
        :show="showkeybord"
        :maxlength="11"
        @blur="showkeybord = false"
        />
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                account: '',
                password: '',
                showkeybord:false
            }
        },
        created() {
            if (localStorage.user_twap) {
                this.$router.replace('/')
            }
        },
        methods: {
            // 登录
            loginpass() {
                // console.log(this.$com.checkPhone(this.account))
                if (!this.$com.checkPhone(this.account)) {
                    this.$com.showtoast('请输入正确的手机号')
                } else if (this.password == '') {
                    this.$com.showtoast('请输入密码')
                } else {
                    this.$com.showtoast('登录中...')
                    this.$api.Login(this.account, this.password).then((res) => {
                        // console.log(res)
                        if (res.code == 1) {
                            this.$com.showtoast('登录成功');
                            localStorage.user_twap = res.data.userinfo.token;
                            setTimeout(() => {
                                // this.$router.go(-1)
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                console.log(redirect)
                                this.$router.push(redirect);
                            }, 2000)
                        } else {
                            this.$com.showtoast(res.msg)
                        }
                    })
                }
            },
            accountinput() {
                this.account = this.account.replace(/^\d+\.\d$/g, '');
            },
            // 验证码登录
            gocode() {
                this.$router.push({path: '/logincode', query: {redirect: this.$route.query.redirect || '/'}})
            },
            goagree(){
                this.$router.push({path: '/agreement'})
            },
            goprvide(){
                this.$router.push({path: '/privacy'})
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
            margin:50px 0 40px 0;
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
            }


            .btns {
                span {
                    flex: 1;
                    color: #778399;
                    font-size: 14px;
                    /*px*/
                    padding: 32px 10px;

                    &:last-child {
                        text-align: right;
                    }
                }

            }

            .login_btn {
                width: 300px;
                margin: 30px auto 0 auto;
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
            .reg_agree{
                text-align: center;
                line-height: 40px;
                font-size: 16px;
                span{
                    color: $baseBlue;
                }
            }
            .tips {
                text-align: center;
                color: #454951;
                font-size: 15px;
                margin: 20px 0;
                .reg {
                    color: $baseBlue;
                }

                .iconjiantou {
                    color: $baseBlue;
                    font-size: 14px;
                    /*px*/
                }
            }
        }

    }
</style>