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
                <van-uploader
                        v-model="fileList"
                        :max-count="1"
                        :before-read="beforeRead"
                >
                    <van-image
                            round
                            fit="cover"
                            width="40px"
                            height="40px"
                            :src="user_info.avatar"
                    />
                </van-uploader>
            </div>
        </van-cell>
        <van-cell title="昵称" :value="user_info.nickname" @click="showname=true"/>
        <van-cell title="手机号" :value="user_info.mobile" to="changephone" is-link/>
        <van-cell title="登录密码" is-link to="changepass"/>
        <!--        <van-cell title="社交账号" is-link to="mySocial"/>-->
        <van-dialog
                v-model="showname"
                title="修改昵称"
                show-cancel-button
                className="nickname"
                @confirm="changename"
                image-fit="contain"
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
                user_twap: '',
                fileList: [],
                imgs: []
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
                        this.user_info.mobile = this.user_info.mobile.substr(0, 3) + '****' + this.user_info.mobile.substr(7)
                    }
                })
            },
            beforeRead(file) {
                const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
                let isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$com.showtoast('请上传 png、jpg格式!')
                    return;
                }
                if (!isLt2M) {
                    this.$com.showtoast('上传文件大小不能超过 2MB!')
                    return;
                }
                this._CommonUpload(file)
            },
            beforeDelete(file, fileList) {
                this.imgs.splice(fileList.index, 1);
                this.fileList.splice(fileList.index, 1)
            },
            _CommonUpload(file) {
                this.$api.CommonUpload(file).then(res => {
                    if (res.code == 401) {
                        this.$router.push('/login')
                        return;
                    }
                    if (res.code == 1) {
                        this.$com.showtoast('修改成功！', 'success');
                        this.fileList.push({url: res.data.url});
                        this.imgs.push(res.data.url);
                        this._Profile()
                    }
                })
            },
            // 修改个人信息
            _Profile() {
                this.$api.Profile(this.imgs[0] || this.user_info.avatar, this.user_info.nickname).then(res => {
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

                /deep/
                .van-uploader {
                    .van-uploader__input-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            width: 100%;
                        }
                    }

                    .van-uploader__preview {
                        margin: 0;

                        .van-image {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;

                            &__img {
                                width: 100%;
                            }
                        }
                    }

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
                /*width: 100%;*/
                margin:0 10px;
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