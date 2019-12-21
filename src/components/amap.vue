<template>
    <div class="amap">
        <div class="comlist van-row--flex van-cell--center van-row--justify-center" v-if="!mapflag">
            <van-loading type="spinner"/>
        </div>
<!--        <iframe-->
<!--                :src="src"-->
<!--                frameborder="0">-->
<!--        </iframe>-->
    </div>
</template>

<script>
    export default {
        name: "amap",
        data() {
            return {
                id: '',
                info: {},
                pos: '',
                src: '',
                mapflag: false
            }
        },
        created() {
            this.id = this.$route.query.bar_id;
            this.pos = JSON.parse(sessionStorage.pos)[1] + ',' + JSON.parse(sessionStorage.pos)[0]
            console.log(this.pos)
            this._GetBarInfo();
        },
        methods: {
            // 获取详情
            _GetBarInfo() {
                this.$api.GetBarInfo(this.id).then(res => {
                    this.mapflag = true;
                    if (res.code == 1) {
                        this.info = res.data.info;
                       window.location.href = `//uri.amap.com/marker?position=${res.data.info.lng},${res.data.info.lat}&name=${res.data.info.name}&src=${res.data.info.address}&coordinate=gaode&callnative=1`
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .amap {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        iframe {
            width: 100%;
            height: 100%;

            /deep/ .o-header {
                display: none;
            }
        }
    }
</style>