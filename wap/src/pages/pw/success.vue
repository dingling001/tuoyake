<template>
  <div class="success" v-cloak>
    <div class="success__tips">
      <div class="success__tips--img"><img src="../../img/pw/yy_success.png" alt=""></div>
      <div class="success__tips--icon">预约成功！</div>
      <div class="success__tips--txt">
        <p>
          您【{{detail.t_date}}&nbsp;&nbsp;{{detail.time_period}}】的参观预约已经提交成功，请参观当日凭预约时填写的证件到馆参观。
        </p>
        <p>
          感谢您使用国家海洋博物馆参观预约系统，祝您参观愉快。
        </p>
      </div>
    </div>
    <ul class="success__btns">
      <li @click="goYY">继续预约</li>
      <li @click="goOrderList">查看订单</li>
    </ul>
    <!-- <div class="success__bottom">
      如果您需要讲解服务，请进行
      <router-link to="/explain/explain_date" replace>讲解预约</router-link>
    </div> -->
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
import { Session } from '@/assets/js/utils.js';

const SPINNER_TYPE = "snake";

export default {
  name: 'success',
  props: [],
  data() {
    return {
      detail: {
        t_date: '0000年00月00日',
        time_period: '00:00-00:00'
      },
      torder_id: '',
    };
  },
  created() {
    let v = this;
    v.torder_id = v.$route.query.torder_id;
  },
  mounted() {
    let v = this;
    v.torder_id && v.getDetail();
  },
  methods: {
    /**
     * @订单详情
     */
    getDetail() {
      let v = this;
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: SPINNER_TYPE
      // });
      v.$api.PW_WX_TicketOrderDetail(v.torder_id).then((res) => {
        // Indicator.close();
        // console.log(res);
        if (res.status == 1) {
          let dateArr = res.data.t_date.split('-');
          res.data.t_date = dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日';
          v.detail = res.data;
        }
      })
    },
    goYY() {
      let v = this;
      v.$router.replace('/pw/person/index');
    },
    goOrderList() {
      let v = this;
      v.$router.replace('/pw/person/order_list');
    },
  },
};

</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';

.success {
  position: relative;
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
      /*px*/
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
        text-align: justify;
        /*IE*/
        text-justify: inter-ideograph;

        &+p {
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

      &+li {
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

  &__bottom {
    // position: absolute;
    // left: 0;
    // bottom: 20px;
    margin-top: 50px;
    width: 100%;
    text-align: center;
    line-height: 25px;
    color: rgba(53, 53, 53, 1);
    font-size: 17px;
    font-weight: 500;

    >a {
      color: $baseClr;
    }
  }
}

</style>
