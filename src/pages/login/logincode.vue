<template>
    <div class="login_box">
        <div class="login_head" @click="$router.go(-1)">
            <div class="iconfont iconfanhui"></div>
        </div>
        <div class="login_title">验证码登录</div>
        <div class="loginform">
            <van-field v-model="mobile" placeholder="手机号" @input="mobileinput" maxlength="11" readonly clickable  clearable  type="text"   @touchstart.native.stop="showkeybord = true" clearable/>
            <van-field v-model="captcha" placeholder="短信验证码" type="text" maxlength="6" center clearable>
                <van-button slot="button" type="default" class="code" size="small" @click="_SmsSend" v-if="showbtn">
                    获取验证码
                </van-button>
                <!--                <van-count-down :time="time" v-else />-->
                <span class="" slot="button" v-else>
                    <span>重新获取</span>
                <van-count-down :time="time" format="ss" ref="countDown" :auto-start="atuostart"
                                @finish="endtime"/>
                    <span>S</span>
                </span>
            </van-field>
            <div class="login_btn" @click="gonext">登录</div>
            <div class="reg_agree">登录即同意<span @click="goagree">《用户协议》</span>和<span  @click="goprvide">《隐私政策》</span></div>
            <div @click="backlogin" class="login_pass">密码登录</div>
            <van-number-keyboard
                    v-model="mobile"
                    :show="showkeybord"
                    :maxlength="11"
                    @blur="showkeybord = false"
            />
        </div>
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
                showkeybord:false
            }
        },
        created() {
            if (localStorage.user_twap) {
                this.$router.replace('/')
            }
            this.redirect = this.$route.query.redirect
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
                    this.$api.SmsSend(this.mobile, 'login').then((res) => {
                        this.showbtn = false;
                        console.log(res)
                        if (res.code == 1) {
                            this.$com.showtoast(res.msg)
                            this.captcha = res.data
                        }else{
                            this.$com.showtoast(res.msg)
                        }
                    })
                }
            },

            gonext() {
                if (!this.$com.checkPhone(this.mobile)) {
                    this.$com.showtoast('请输入正确的手机号')
                } else if (this.captcha == '') {
                    this.$com.showtoast('请输入验证码')
                } else {
                    this.$api.MobileLogin(this.mobile, this.captcha).then((res) => {
                        // console.log(res)
                        if (res.code == 1) {
                            localStorage.user_twap = res.data.userinfo.token
                            this.$com.showtoast('登录成功');
                            let redirect = decodeURIComponent(this.$route.query.redirect || "/");
                            if (this.redirect) {
                                this.$router.push(redirect);
                            } else {
                                this.$router.replace('/');
                            }
                        } else {
                            this.$com.showtoast(res.msg || '稍后再试')
                        }
                    })
                }
                // this.$router.push({path: '/regnext', query: {}})
            },
            mobileinput() {
                this.mobile = this.mobile.replace(/[^\d]/g, '');
            },
            goagree(){
                this.$router.push({path: '/agreement'})
            },
            goprvide(){
                this.$router.push({path: '/privacy'})
            },
            backlogin() {
                this.$router.go(-1)
            },
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
            margin: 50px 0 40px 0;
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
            .reg_agree{
                text-align: center;
                line-height: 40px;
                font-size: 16px;
                span{
                    color: $baseBlue;
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