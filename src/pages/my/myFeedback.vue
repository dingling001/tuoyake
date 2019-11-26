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
                fileList: []
            }
        },
        methods: {
            // 意见反馈
            feedback_fn() {
                if (this.message == '') {
                    this.$com.showtoast('请输入内容')
                } else {
                    console.log(this.fileList)
                    var fileList = [];
                    for (var i in this.fileList) {
                        fileList.push(this.fileList[i].content)
                    }
                    this.$api.SetFeedback(this.message, fileList.toString()).then(res => {
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