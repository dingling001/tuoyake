<template>
    <div>
        <div class="list van-row--flex van-cell--center van-row--justify-center" v-if="!user_agreement">
            <van-loading type="spinner"/>
        </div>
        <div v-html="user_agreement" class="user_agreement"></div>
    </div>
</template>

<script>
    export default {
        name: "agreement",
        data() {
            return {
                user_agreement: ''
            }
        },
        created() {
            this._CommonGetConfig()
        },
        methods: {
            _CommonGetConfig() {
                this.$api.CommonGetConfig().then(res => {
                    console.log(res)
                    this.user_agreement = res.data.user_agreement
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .user_agreement {
        padding: 0 15px;
        line-height: 20px;
    }
</style>