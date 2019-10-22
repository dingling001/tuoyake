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
            if(this.$route.query.is_sign==1){
                this._SignRule();
            }else{
                this._ScoreRule();
            }
        },
        methods: {
            // 积分规则说明
            _ScoreRule() {
                this.$api.ScoreRule().then(res => {
                    if (res.code == 1) {
                        this.content = res.data.content;

                    }
                })
            },
            _SignRule() {
                this.$api.SignRule().then(res => {
                    if (res.code == 1) {
                        this.content = res.data.content;

                    }
                })
            },

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