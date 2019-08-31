<template>
    <div class="success">
        <div class="success__tips">
          <div class="success__tips--img"><img src="../../img/pw/yy_success.png" alt=""></div>
          <div class="success__tips--icon">预约成功！</div>
            <div class="success__tips--txt">
                <p>
                    您【{{date}} {{time}}】的影院预约已经提交成功，请凭订单内的取票码或取票二维码，在二层服务台处自助取票机取票观影。
                </p>
<!--                <p>-->
<!--                    感谢您使用国家海洋博物馆影院预约系统，祝您观影愉快。-->
<!--                </p>-->
            </div>
        </div>
        <ul class="success__btns">
            <li @click="goYY">继续预约</li>
            <li @click="goOrderList">查看订单</li>
        </ul>
    </div>
</template>
<script>
    import {Session} from '@/assets/js/utils.js';

    export default {
        name: 'film_success',
        props: [],
        data() {
            return {
                date: '',
                time: '',
                order_id:''
            };
        },
        created() {
            this.date = this.$route.query.date;
            this.time = this.$route.query.time;
            this.order_id=this.$route.query.order_id;
        },
        mounted() {
            // this.$once('hook:beforeDestroy', () => {

            // })
        },
        methods: {
            goYY() {
                this.$router.replace('/film/film_index');
            },
            goOrderList() {
                this.$router.replace({path:'/film/film_detail',query:{order_id:this.order_id}});
            }
        },
    };

</script>
<style lang="scss" scoped>
    .success {
        min-height: calc(100vh - 60px);
        padding: 20px 15px;
        background-color: #FFF;

        &__tips {
            width: 300px;
            margin: 50px auto 100px;
            font-size: 13px;
            line-height: 2;
          &--img {
            width: 65%;
            margin: 0 auto;

            img {
              width: 100%;
            }
          }
            &--icon {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                font-weight: bold;
                color: #353535;

                &::before {
                    content: '';
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                    background: url('../../img/pw/success.png') center center / 100% 100% no-repeat;
                }
            }

            &--txt {
                font-size: 17px;
                font-weight: 500;
                color: #353535;
                line-height: 25px;
                margin-top: 30px;

                p {
                    & + p {
                        margin-top: 20px;
                    }
                }
            }
        }

        &__btns {
            width: 100%;
            display: flex;
            justify-content: space-between;

            li {
                width: 158px;
                height: 48px;
                line-height: 48px;
                text-align: center;
                color: #353535;
                font-size: 18px;
                border-radius: 24px;

                &:active {
                    opacity: .7;
                }

                &:nth-of-type(1) {
                    border: 1px solid #000;

                }

                &:nth-of-type(2) {
                    color: #fff;
                    border: 1px solid #CC974C;
                    background-color: #CC974C;
                }
            }
        }
    }

</style>
