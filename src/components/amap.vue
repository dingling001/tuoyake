<template>
    <div class="amap">
        <iframe
                :src="src"
                frameborder="0">

        </iframe>
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
                src:''
            }
        },
        created() {
            this.id = this.$route.query.bar_id;
            this.pos = JSON.parse(sessionStorage.pos)[1]+','+JSON.parse(sessionStorage.pos)[0]
            console.log(this.pos)
            this._GetBarInfo();
        },
        methods: {
            // 获取详情
            _GetBarInfo() {
                this.$api.GetBarInfo(this.id).then(res => {
                    if (res.code == 1) {
                        this.info = res.data.info;
                        this.src = 'http://uri.amap.com/navigation?from=' + this.pos + ',startpoint&to=' + res.data.info.lng + ',' + res.data.info.lat + ',midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0'
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