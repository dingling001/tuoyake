<template>
    <div class="changgebox">
        <div class="hr"></div>
        <form action="">
            <van-cell-group>
                <van-field
                        v-model="password"
                        type="password"
                        label="登录密码"
                        autocomplete
                        maxlength="12"
                        placeholder="请输入登录密码"
                />
                <van-field
                        v-model="repassword"
                        type="password"
                        label="确认密码"
                        maxlength="12"
                        autocomplete
                        placeholder="请再次输入密码"
                />
            </van-cell-group>
            <div class="btn" @click="gonext">修改并保存</div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "changepass"
        ,
        data() {
            return {
                password: '',
                repassword: ''
            }
        },
        methods: {
            // 修改密码
            gonext() {
                if (this.password == '') {
                    this.$com.showtoast('请输入密码')
                } else if (this.password.length > 12 || this.password.length < 6) {
                    this.$com.showtoast('密码长度为6 - 12个字符')
                } else if (this.repassword == '') {
                    this.$com.showtoast('请输入重复密码')
                } else if (this.repassword.length > 12 || this.repassword.length < 6) {
                    this.$com.showtoast('密码长度为6 - 12个字符')
                } else if (this.password !== this.repassword) {
                    this.$com.showtoast('密码与重复密码不一致')
                } else {
                    this.$api.UserResetPassword(this.password, this.repassword).then((res) => {
                        // console.log(res)
                        if (res.code == 1) {
                            this.$com.showtoast('修改成功');
                            // this.$router.go(-1)
                            localStorage.removeItem('user_twap');
                            this.$router.replace('/login');
                        } else {
                            this.$com.showtoast(res.msg || '稍后再试')
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped lang="scss">
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
        }

        /deep/ .btn {
            background-color: #2C6BEA;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            line-height: 44px;
            font-size: 17px;
            /*px*/
            font-weight: bold;
            margin: 50px 17px;
        }
    }


</style>
