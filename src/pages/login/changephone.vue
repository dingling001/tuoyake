<template>
    <div class="changgebox">
        <div class="hr"></div>
        <van-cell-group>
            <van-field label="原手机号" readonly :value="user_info.mobile"
            />
            <van-field label="新手机号" v-model="mobile" placeholder="新手机号" type="text" @input="accountinput" maxlength="11"
                       clearable/>
            <van-field label="验证码" v-model="captcha" placeholder="短信验证码" type="text" center clearable>
                <van-button slot="button" type="default" class="code" size="small" @click="_SmsSend" v-if="showbtn">
                    获取验证码
                </van-button>
                <!--                <van-count-down :time="time" v-else />-->
                <span class="btntext" slot="button" v-else>
                    <span>重新获取</span>
                <van-count-down :time="time" format="ss" ref="countDown" :auto-start="atuostart"
                                @finish="endtime"/>
                    <span>S</span>
                </span>
            </van-field>
        </van-cell-group>
        <div class="btn" @click="gonext">修改并保存</div>
    </div>
</template>

<script>
    export default {
        name: "changepass",
        data() {
            return {
                mobile: '',
                captcha: '',
                show: false,
                time: 60000,
                showbtn: true,
                redirect: '',
                atuostart: true,
                user_info: {}
            }
        },
        created() {
            this._GetUserInfo();
        },
        methods: {
            // 获取个人信息
            _GetUserInfo() {
                this.$api.GetUserInfo().then(res => {
                    // console.log(res)
                    if (res.code == 1) {
                        this.user_info = res.data;
                        this.user_info.mobile = this.user_info.mobile.substr(0, 3) + '****' + this.user_info.mobile.substr(7)
                    }
                })
            },
            endtime() {
                this.showbtn = true;
            },
            // 获取验证码
            _SmsSend() {
                if (this.mobile == '') {
                    this.$com.showtoast('请输入手机号')
                } else {
                    this.$api.SmsSend(this.mobile, 'changemobile').then((res) => {
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
// 修改手机号
            gonext() {
                if (this.mobile == '') {
                    this.$com.showtoast('请输入新手机号')
                } else if (this.captcha == '') {
                    this.$com.showtoast('请输入验证码')

                } else {
                    this.$api.ChangeMobile(this.mobile, this.captcha).then((res) => {
                        // console.log(res)
                        if (res.code == 1) {
                            this.$com.showtoast('修改成功');
                            this.$router.go(-1)
                        } else {
                            this.$com.showtoast(res.msg || '稍后再试')
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

    .changgebox {
        .hr {
            height: 8px;
            background-color: #f5f5f5;
        }

        /deep/ .van-cell-group {
            margin: 0 17px;

            .van-field {
                padding: 32px 0 19px 0;
            }

            .van-cell:not(:last-child):after {
                left: 0;
            }

            .van-field__label {
                color: #333333;
                font-size: 16px;
            }

            .btntext {
                font-size: 12px;
                display: flex;
                align-items: center;

                .van-count-down {
                    color: $baseBlue;
                }
            }
        }

        /deep/ .btn {
            background-color: $baseBlue;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            line-height: 44px;
            font-size: 17px;
            /*px*/
            font-weight: bold;
            margin: 50px 17px;

            &:active {
                opacity: .7;
            }
        }
    }


</style>