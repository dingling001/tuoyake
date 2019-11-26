<template>
    <!--<div class="setbox">-->
    <!--<div class="setitem ">-->
    <!--<div class="setleft">头像</div>-->
    <!--<div class="setright"><img src="" alt=""><van-icon name="arrow" /></div>-->
    <!--</div>-->
    <!--<van-cell title="头像" value="游记战士" />-->
    <van-cell-group class="setbox">

        <van-cell is-link title="头像" class="headimg">
            <!-- 使用 title 插槽来自定义标题 -->
            <div class="imgbox">
                <img :src="user_info.avatar" alt="">
            </div>
        </van-cell>
        <van-cell title="昵称" :value="user_info.nickname" @click="showname=true"/>
        <van-cell title="手机号" :value="user_info.mobile" to="changephone" is-link/>
        <van-cell title="登录密码" is-link to="changepass"/>
        <van-cell title="社交账号" is-link to="mySocial"/>
        <van-dialog
                v-model="showname"
                title="修改昵称"
                show-cancel-button
                className="nickname"
                @confirm="changename"
        >
            <input type="text" v-model="user_info.nickname">
        </van-dialog>
        <div class="mbnt" v-if="user_twap" @click="loginout">退出登录</div>

    </van-cell-group>
    <!--</div>-->

</template>

<script>
    export default {
        name: "myset",
        data() {
            return {
                user_info: {},
                showname: false,
                avatar: '',
                user_twap: ''
            }
        },
        mounted() {
            this.user_twap = localStorage.user_twap;
            this._GetUserInfo();
        },
        methods: {
            // 获取个人信息
            _GetUserInfo() {
                this.$api.GetUserInfo().then(res => {
                    // console.log(res)
                    if (res.code == 1) {
                        this.user_info = res.data;
                    }
                })
            },
            // 修改个人信息
            _Profile() {
                this.$api.Profile(this.avatar, this.user_info.nickname).then(res => {
                    if (res.code == 1) {
                        this.$com.showtoast('修改成功')
                    } else {
                        this.$com.showtoast(res.msg || '稍后在试')
                    }
                    this._GetUserInfo()
                })
            },
            // 修改昵称
            changename() {
                if (this.user_info.nickname == '') {
                    this.$com.showtoast('昵称不能为空')
                } else {
                    this._Profile()
                }
            },
            // 退出登录
            loginout() {
                localStorage.removeItem('user_twap')
                this.$router.replace('/')
            }
        }
    }
</script>

<style scoped lang="scss">
    .setbox {
        .setitem {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 30px 17px 20px 1px;
            color: #333333;
            font-size: 16px;
            border-bottom: 1px solid #E4E4E4;
        }

        /deep/ .van-cell {
            padding: 32px 17px 19px 20px;
            font-size: 16px;
            /*px*/
            &.headimg {
                align-items: center;
                padding: 20px 17px 20px 20px;

                .van-cell__value {
                    flex: unset;
                    width: 40px;
                    height: 40px;
                }
            }

            .imgbox {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                }
            }

            .van-cell__title {
                color: #333;
                font-size: 16px;
                /*px*/
            }

            &:not(:last-child):after {
                left: 20px;
            }


        }

        /deep/ .nickname {
            input {
                padding: 10px;
                outline: none;
                border: none;
                width: 100%;
            }
        }

        &:after {
            border: 0;
        }

        .mbnt {
            margin: 30px 14px;
            border: 1px solid #E4E4E4;
            line-height: 44px;
            text-align: center;
            font-size: 15px;
            /*px*/
            color: #999999;
        }
    }

</style>