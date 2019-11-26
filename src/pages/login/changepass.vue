<template>
    <div class="changgebox">
        <div class="hr"></div>
        <van-cell-group>
            <van-field
                    v-model="password"
                    type="password"
                    label="登录密码"
                    placeholder="请输入登录密码"
            />
            <van-field
                    v-model="password"
                    type="password"
                    label="确认密码"
                    placeholder="请再次输入密码"
            />
        </van-cell-group>
        <div class="btn">修改并保存</div>
    </div>
</template>

<script>
    export default {
        name: "changephone"
        ,
        data() {
            return {
                password: '',
            }
        }
    }
</script>

<style scoped lang="scss">
    .changgebox {
        .hr {
            height: 8px;
            background-color: #f5f5f5;
        }

        /deep/ .van-cell-group {
            margin: 0 17px;

            .van-field {
                padding: 32px 0 19px 0;
            }

            .van-cell:not(:last-child):after {
                left: 0;
            }

            .van-field__label {
                color: #333333;
                font-size: 16px;
            }
        }

        /deep/ .btn {
            background-color: #2C6BEA;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            line-height: 44px;
            font-size: 17px;
            /*px*/
            font-weight: bold;
            margin: 50px 17px;
        }
    }


</style>
