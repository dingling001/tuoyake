<template>
    <div>
        <div class="list van-row--flex van-cell--center van-row--justify-center" v-if="!privacy_protocol">
            <van-loading type="spinner"/>
        </div>
        <div v-html="privacy_protocol" class="user_agreement"></div>
    </div>
</template>

<script>
    export default {
        name: "privacy",
        data() {
            return {
                privacy_protocol: ''
            }
        },
        created() {
            this._CommonGetConfig()
        },
        methods: {
            _CommonGetConfig() {
                this.$api.CommonGetConfig().then(res => {
                    this.privacy_protocol = res.data.privacy_protocol
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