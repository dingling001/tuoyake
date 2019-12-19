<template>
    <div class="login_box">
        <div class="login_head" @click="$router.go(-1)">
            <div class="iconfont iconfanhui"></div>
        </div>
        <div class="login_title">验证手机</div>
        <form class="loginform">
            <van-field v-model="mobile" placeholder="手机号" type="number"  @touchstart.native.stop="showkeybord = true" maxlength="11" clearable @input="accountinput"/>
            <van-field v-model="captcha" placeholder="短信验证码" type="number" maxlength="6" center clearable>
                <div slot="button" type="default" class="code" size="small" @click="_SmsSend" v-if="showbtn">获取验证码</div>
                <!--                <van-count-down :time="time" v-else />-->
                <span class="" slot="button" v-else>
                    <span>重新获取</span>
                <van-count-down :time="time" format="ss" ref="countDown" :auto-start="atuostart"
                                @finish="endtime"/>
                    <span>S</span>
                </span>
            </van-field>
            <div class="login_btn" @click="gonext">继续</div>
        </form>
        <!--<van-number-keyboard-->
                <!--v-model="mobile"-->
                <!--:show="showkeybord"-->
                <!--:maxlength="11"-->
                <!--@blur="showkeybord = false"-->
        <!--/>-->
        <!--<van-number-keyboard-->
                <!--v-model="mobile"-->
                <!--:show="showkeybordcode"-->
                <!--:maxlength="6"-->
                <!--@blur="showkeybordcode = false"-->
        <!--/>-->
    </div>
</template>

<script>
    export default {
        name: "reg",
        data() {
            return {
                mobile: '',
                captcha: '',
                show: false,
                time: 60000,
                showbtn: true,
                redirect: '',
                atuostart: true,
                showkeybord:false,
                showkeybordcode:false
            }
        },
        created() {
        },
        methods: {

            endtime() {
                this.showbtn = true;
            },
            // 获取验证码
            _SmsSend() {
                if (!this.$com.checkPhone(this.mobile)) {
                    this.$com.showtoast('请输入正确的手机号')
                } else {
                    this.$api.SmsSend(this.mobile, 'resetpwd').then((res) => {
                        this.showbtn = false;
                        if (res.code == 1) {
                            this.$com.showtoast(res.msg)
                            this.captcha = res.data
                        } else {
                            this.$com.showtoast(res.msg)
                        }
                    })
                }
            },
            // 下一步
            gonext() {
                if (!this.$com.checkPhone(this.mobile)) {
                    this.$com.showtoast('请输入正确的新手机号')
                } else if (this.captcha == '') {
                    this.$com.showtoast('请输入验证码')
                } else {
                    this.$api.SmsCheck(
                        this.mobile,
                        'resetpwd',
                        this.captcha,
                        1
                    ).then(res => {
                        if (res.code == 1) {
                            this.$router.push({path: '/resetpass', query: {mobile: this.mobile, captcha: this.captcha}})
                        } else {
                            this.$com.showtoast(res.msg)
                        }
                    })
                }
            },
            accountinput() {
                this.mobile = this.mobile.replace(/[^\d]/g, '');
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

                .van-field__button {
                    span {
                        display: flex;
                        align-items: center;
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