<template>
    <div class="fbox">
        <div class="ftitle">问题描述</div>
        <van-field
                v-model="message"
                type="textarea"
                placeholder="请描述具体问题..."
                rows="5"
                autosize
        />
        <div class="ftips"><span>上传凭证</span><span class="more">（ 图片最多添加3张 ）</span></div>
        <van-uploader
                v-model="fileList"
                multiple
                :max-count="3"
                :before-read="beforeRead"
                :before-delete="beforeDelete"
        />
        <div class="fbtn" @click="feedback_fn">提交</div>
    </div>
</template>

<script>
    export default {
        name: "myFeedback",
        data() {
            return {
                message: '',
                fileList: [],
                imgs: []
            }
        },
        methods: {
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
                        this.$com.showtoast('上传成功！', 'success');
                        this.fileList.push({url: res.data.url});
                        this.imgs.push(res.data.url);
                    }
                })
            },
            // 意见反馈
            feedback_fn() {
                if (this.message == '') {
                    this.$com.showtoast('请输入内容')
                } else {
                    this.$api.SetFeedback(this.message, this.imgs.toString()).then(res => {
                        if (res.code == 1) {
                            this.$com.showtoast('提交成功');
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 1500)
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .fbox {
        padding: 0 20px;

        .ftitle {
            color: #333333;
            font-size: 17px;
            padding: 28px 0 10px 0;
        }

        .ftips {
            color: #333333;
            padding: 28px 0;
            font-size: 17px;
            /*px*/
            .more {
                color: #AAAAAA;
                font-size: 13px;
                /*px*/
            }
        }

        .fbtn {
            margin: 50px 18px;
            border-radius: 5px;
            line-height: 44px;
            text-align: center;
            font-weight: bold;
            font-size: 17px;
            /*px*/
            color: #fff;
            background-color: $baseBlue;

            &:active {
                opacity: .7;
            }
        }
    }
</style>