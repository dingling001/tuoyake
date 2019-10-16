<template>
    <!--id-->
    <div class="combox"></div>
</template>

<script>
    export default {
        name: "competitiondetail",
        data() {
            return {
                id: ''
            }
        },
        created() {
            if (this.$route.query.id) {
                this.id = this.$route.query.id;
                this._GetBarInfo();
            } else {
                this.$router.replace('/')
            }
        },
        methods: {
            _GetBarInfo() {
                this.$api.GetBarInfo(this.id).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .combox {

    }

</style>