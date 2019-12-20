<template>
    <div class="imgbox">
        <div class="nav">
            <span class="iconfont iconfanhui" @click="goback"></span>
            <span>相册（{{comdata.info.album_images.length}}）</span>
        </div>
        <div class="imglist" v-if="comdata.info.album_images.length">
            <van-image
                    v-for="(item ,index) in comdata.info.album_images"
                    :key="index"
                    width="45%"
                    height="165px"
                    :src="item"
                    fit="cover"
                    @click="showimgs(index)"
            />
        </div>
        <van-image-preview
                v-model="show"
                :images="[comdata.info.album_images[ind]]"
                @change="onChange"
                v-if="comdata.info.album_images.length"
        >
            <!--<template v-slot:index>-->
            <!--<div class="preview" @click="show=false" v-if="comdata.info.album_images.length"><span-->
            <!--class="iconfont iconfanhui"></span><span>相册（{{comdata.info.album_images.length}}）</span><span>{{index+1}}/{{comdata.info.album_images.length}}</span>-->
            <!--</div>-->
            <!--</template>-->
        </van-image-preview>
    </div>
</template>

<script>
    export default {
        name: "imgPre",
        data() {
            return {
                comdata: {
                    info: {
                        album_images: []
                    }
                },
                show: false,
                ind: 0,
                id: '',
                index: 0
            }
        },
        inject: ['app'],
        beforeRouteEnter(to, from, next) {
            next(vm => { //回调函数，此时this指针不可用，可采用回调函数访问。
                console.log(vm.comdata.info.album_images.length)
                vm.app.setTitle('相册' + vm.comdata.info.album_images.length)
            })
        },
        created() {
            this.id = this.$route.query.id
            this._GetBarInfo();
            console.log(this.$route)
        },

        methods: {
            // 获取详情
            _GetBarInfo() {
                this.$api.GetBarInfo(this.id).then(res => {
                    if (res.code == 1) {
                        this.comdata = res.data;
                    }
                })
            },
            onChange(index) {
                this.index = index;
            },
            goback() {
                this.$router.go(-1);
            },
            showimgs(index) {
                this.ind = index;
                this.show = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .imgbox {
        .nav {
            height: 56px;
            text-align: center;
            /*padding: 0 15px;*/
            line-height: 56px;
            color: #333;
            font-size: 17px;
            /*px*/
            font-weight: bold;
            background-color: #fff;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10;

            .iconfont {
                position: absolute;
                left: 15px;
                top: 0;
                z-index: 1;
                font-weight: normal;
                color: #333333;
                font-size: 17px;
                /*px*/
            }

            .navright {
                position: absolute;
                right: 15px;
                top: 0;
                z-index: 1;
                font-size: 13px;
                /*px*/
                color: #333333;
            }
        }

        .imglist {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 72px 16px;

            /deep/ .van-image {
                margin: 0 0 16px 0;
            }
        }
    }
</style>