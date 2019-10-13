<template>
    <div class="changgebox">
        <div class="hr"></div>
        <van-cell-group>
            <van-field
                    type="text"
                    label="原手机号"
                    readonly
                    value="13821452840"
            />
            <van-field
                    v-model="password"
                    type="password"
                    label="新手机号"
                    placeholder="请输入新手机号"
            />
            <van-field
                    v-model="password"
                    type="password"
                    label="验证码"
                    placeholder="请输入短信验证码"
            >
                <van-button slot="button" type="default" class="code" size="small" @click="_SmsSend" v-if="showbtn">
                    获取验证码
                </van-button>
                <!--<van-count-down :time="time" v-else />-->
                <van-count-down :time="time" format="ss" ref="countDown" auto-start="fasle" @finish="endtime"/>
            </van-field>
        </van-cell-group>
        <div class="btn">修改并保存</div>
    </div>
</template>

<script>
    export default {
        name: "changepass"
        ,
        data() {
            return {
                password: '',
                time: 60000,
                showbtn: true
            }
        },
        methods:{
            endtime(){
console.log('11')
            },
            _SmsSend(){

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