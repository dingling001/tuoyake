<template>
    <div class="login_box">
        <div class="login_head" @click="$router.go(-1)">
            <div class="iconfont iconfanhui"></div>
        </div>
        <div class="login_title">账号注册</div>
        <form class="loginform">
            <van-field v-model="account"
                       placeholder="请输入手机号"
                       error-message="手机号格式错误" maxlength="11" type="number" clearable
                       @input="accountinput"/>
            <van-field v-model="captcha" placeholder="短信验证码" type="number"  :error-message="codeerrormsg" maxlength="6" center clearable>
                <div slot="button" type="default" class="code" size="small" @click="_SmsSend" v-if="showbtn">
                    获取验证码
                </div>
                <!--                <van-count-down :time="time" v-else />-->
                <span class="" slot="button" v-else><span>重新获取</span>
                <van-count-down :time="time" format="ss" ref="countDown" :auto-start="atuostart"
                                @finish="endtime"/> <span>S</span></span>
            </van-field>

            <div class="login_btn" @click="gonext">下一步</div>
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
                show: false,
                time: 60000,
                showbtn: true,
                redirect: '',
                atuostart: true,
                codeerrormsg:''
            }
        },
        created() {
        },
        methods: {
            // 获取验证码
            _SmsSend(){
                this.codeerrormsg='';
                if (!this.$com.checkPhone(this.account)) {
                    this.$com.showtoast('请输入正确的手机号')
                }else{
                    this.$api.SmsSend(this.account, 'register').then((res) => {
                        this.showbtn = false;
                        if (res.code == 1) {
                            this.$com.showtoast(res.msg)
                            this.captcha = res.data
                        } else {
                            this.codeerrormsg=res.msg
                            this.$com.showtoast(res.msg)
                        }
                    })
                }
            },
            endtime() {
                this.showbtn = true;
            },
            gonext() {
                if (!this.$com.checkPhone(this.account)) {
                    this.$com.showtoast('请输入正确的手机号')
                } else if (this.captcha == '') {
                    this.$com.showtoast('请输入验证码')
                } else {
                    this.$router.push({path: '/regnext', query: {account: this.account, captcha: this.captcha}})
                }
                // this.$router.push({path: '/regnext', query: {}})
            },
            accountinput() {
                this.account = this.account.replace(/[^\d]/g, '');
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
                padding: 15px 0;
                height: 50px;

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

                .van-field__button {
                    span {
                        display: flex;
                        align-items: center;
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