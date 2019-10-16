<template>

</template>

<script>
    export default {
        name: "myPlatform",
        data() {
            return {
                platinfo: {}
            }
        },
        created() {
            this._Platform();
        },
        methods: {
            _Platform() {
                this.$api.Platform().then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.platinfo = res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>