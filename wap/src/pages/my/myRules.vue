<template>
    <div class="rulebox">{{content}}</div>
</template>

<script>
    export default {
        name: "myRules",
        data() {
            return {
                content: ''
            }
        },
        created() {
            this._ScoreRule()
        },
        methods: {
            _ScoreRule() {
                this.$api.ScoreRule().then(res => {
                    if (res.code == 1) {
                        this.content = res.data.content;

                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .rulebox {
        padding: 25px 16px;
        line-height: 20px;
        font-size: 14px;
        /*px*/
    }
</style>