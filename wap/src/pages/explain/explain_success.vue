<template>
  <div class="success">
    <div class="success__tips">
      <div class="success__tips--img"><img src="../../img/pw/yy_success.png" alt=""></div>
      <div class="success__tips--icon">预约成功！</div>
      <div class="success__tips--txt">
        <p>
          您的订单号为 {{explain_post.order_sn}}
        </p>
        <p>
          请留意您预约的手机号码，我们会将您的预约信息发送到您的手机号上，您可于参观当日凭预约编码在讲解台领取讲解服务祝您参观愉快。
        </p>
      </div>
    </div>
    <ul class="success__btns">
      <router-link tag="li" to="/explain">继续预约</router-link>
      <li @click="go_detail">查看订单</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'success',
    props: [],
    data() {
      return {
        gorder_id: '',
        explain_post: {}
      };
    },
    created() {
      this.gorder_id = this.$route.query.gorder_id;
      this.get_GuideOrderDetail()
    },
    mounted() {

    },
    computed: {},
    methods: {
      // 获取订单详情
      get_GuideOrderDetail() {
        let v = this;
        this.$api.GuideOrderDetail(this.gorder_id).then(res => {
          if (res.status == 1) {
            this.explain_post = res.data;
          }
        })
      },
      go_detail() {
        this.$router.replace({path: '/explain/explain_detail', query: {gorder_id: this.gorder_id}})
      }
    },
  };

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .success {
    min-height: calc(100vh - 60px);
    padding: 20px 15px;
    background-color: #FFF;

    &__tips {
      width: 300px;
      margin: 50px auto;
      font-size: 13px;
      /*px*/
      line-height: 2;

      &--img {
        width: 70%;
        margin: 0 auto;

        img {
          width: 100%;
        }
      }

      &--icon {
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        font-size: 18px;
        /*px*/
        font-weight: bold;
        color: #353535;
        text-align: center;

        /*&::before {*/
        /*  content: '';*/
        /*  display: inline-block;*/
        /*  width: 50px;*/
        /*  height: 50px;*/
        /*  margin-right: 10px;*/
        /*  //background: url('../../img/pw/success.png') center center / 100% 100% no-repeat;*/
        /*}*/
      }

      &--txt {
        font-size: 17px;
        font-weight: 500;
        color: #353535;
        line-height: 25px;
        margin-top: 10px;

        p {
          text-align: justify;
          /*IE*/
          text-justify: inter-ideograph;

          & + p {
            margin-top: 20px;
          }
        }
      }
    }

    &__btns {
      width: 100%;
      display: flex;
      justify-content: center;

      li {
        width: 158px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #353535;
        font-size: 18px;
        border-radius: 24px;

        & + li {
          margin-left: 30px;
        }

        &:active {
          opacity: .7;
        }

        &:nth-of-type(1) {
          border: 1px solid #000;

        }

        &:nth-of-type(2) {
          color: #fff;
          border: 1px solid $baseClr;
          /*no*/
          background-color: $baseClr;
        }
      }
    }
  }
</style>
