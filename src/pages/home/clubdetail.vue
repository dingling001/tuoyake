<template>
    <!--<div class="clubbox" :style="{backgroundImage: 'url(' + club_detail.image + ')'}">-->
    <div class="clubbox">
        <div class="title" @click="backlist"><span class="iconfont iconfanhui"></span></div>
        <div class="clubimg"><img :src="club_detail.image" alt=""></div>
        <div class="clubitem">
            <div class="clubname">{{club_detail.name}}</div>
            <div class="clubboss"><span>{{club_detail.contact}}</span><span>{{club_detail.contact_number}}</span></div>
            <div class="clubboss nopadding">{{club_detail.address}}</div>
            <div class="clubcontent" v-html="club_detail.content"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "clubdetail",
        data() {
            return {
                club_id: '',
                club_detail: {},
                offsettop: 0,
                is_app: 0
            }
        },
        created() {
            if (this.$route.query.club_id) {
                this.club_id = this.$route.query.club_id;
                this._ClubDetail()
            } else {
                this.$router.replace('/')
            }
            this.is_app = this.$route.query.is_app;
        },
        methods: {
            // 获取俱乐部详情
            _ClubDetail() {
                this.$api.ClubDetail(this.club_id).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.club_detail = res.data;
                    }
                })
            },
            // 返回列表
            backlist() {
                if (this.is_app == 1) {
                    this.$router.push('/club')
                } else {
                    this.$router.go(-1);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .clubbox {
        background-position: top center;
        background-size: 373px;
        background-repeat: no-repeat;
        background-attachment: fixed;

        .title {
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            height: 56px;
            text-align: center;
            line-height: 56px;

            .iconfont {
                position: absolute;
                left: 15px;
                top: 0;
                z-index: 1;
                font-weight: bold;
                color: #fff;
                font-size: 17px;
                /*px*/

            }
        }

        .clubimg {
            /*display: flex;*/
            /*align-content: center;*/
            /*justify-content: center;*/
            font-size: 0;

            img {
                width: 100%;
                height: auto !important;
                display: block;
            }
        }

        .clubitem {
            border-radius: 10px 10px 0px 0px;
            padding: 34px 18px;
            margin: -20px 0 0 0;
            background-color: #fff;
            position: relative;
            z-index: 1;

            .clubname {
                color: #333;
                font-weight: bold;
                line-height: 20px;
                font-size: 20px;
                /*px*/
            }

            .clubboss {
                color: #999999;
                font-size: 12px;
                /*px*/
                padding: 20px 0 10px 0;

                span {
                    margin-right: 10px;
                }

                &.nopadding {
                    padding: 0;
                }
            }

            .clubcontent {
                padding: 29px 0;
                color: #333333;
                font-size: 15px;
                /*px*/
                line-height: 20px;
                text-align: justify;

                /deep/ img {
                    width: 100%;
                    height: auto !important;
                }
            }
        }

    }

</style>