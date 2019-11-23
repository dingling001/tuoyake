<template>
    <div class="searchbox">
        <div class="searchtop">
            <div class="search_input">
                <van-icon name="search"/>
                <input type="text" :placeholder="placeholder" v-model="keyword">
            </div>
            <span>取消</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",

        data() {
            return {
                keyword: '',
                placeholder: ''
            }
        },
        created() {
            this.placeholder = this.$route.params.keyword
        }
    }
</script>

<style scoped lang="scss">
    .searchbox {
        .searchtop {
            color: rgba(255, 255, 255, .3);
            height: 56px;
            display: flex;
            align-items: center;
            background: linear-gradient(90deg, #441219, #29182E);
            padding: 0 15px;

            .search_input {
                flex: 1;
                display: flex;
                align-items: center;
                padding: 0 18px;
                font-size: 13px;
                /*px*/
                /deep/ .van-icon {
                    color: rgba(255, 255, 255, .3);
                    line-height: 56px;
                    margin-right: 8px;
                    font-size: 20px;
                    /*    px*/
                }

                input {
                    flex: 1;
                    background: none;
                    height: 56px;
                }
            }
        }
    }

</style>