<template>
    <span>{{m>=10?m:'0'+m}}:{{s>=10?s:'0'+s}}</span>
</template>
<script>
    export default {
        data() {
            return {
                m: '',
                s: ''
            }
        },
        created() {
            this.m = this.minutes;
            this.s = this.seconds;
        },
        mounted() {
            this.add()
        },
        props: {
            minutes: {
                type: Number,
                default: 14
            },
            seconds: {
                type: Number,
                default: 0
            },
        },
        methods: {
            num: function (n) {
                return n < 10 ? '0' + n : '' + n
            },
            add: function () {
                var _this = this
                var time = window.setInterval(function () {
                    if (_this.s === 0 && _this.m !== 0) {
                        _this.s = 59
                        _this.m -= 1
                    } else if (_this.m === 0 && _this.s === 0) {
                        _this.s = 0
                        window.clearInterval(time)
                    } else {
                        _this.s -= 1
                    }
                }, 1000)
            }
        },
        watch: {
            s: {
                handler(newVal) {
                    this.num(newVal)
                }
            },
            m: {
                handler(newVal) {
                    this.num(newVal)
                }
            }
        },
        computed: {
            second: function () {
                return this.num(this.s)
            },
            minute: function () {
                return this.num(this.m)
            }
        }
    }
</script>
<style scoped>
</style>
