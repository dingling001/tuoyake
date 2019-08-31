<template>
  <div class="fill">
    <ul class="info">
      <li>
        <span class="p1">参观时间</span>
        <span class="p2">{{visit.date}}   {{visit.time}}</span>
      </li>
      <li class="language_p2">
        <span class="p1 need">手机号码</span>
        <span class="p2">{{explain_post.contact_phone}}</span>
      </li>
      <li class="language_p2">
        <span class="p1 need">参观人数</span>
        <span class="p2">{{explain_post.people_num}}人</span>
      </li>
      <li class="language_p2">
        <span class="p1 need">选择语种</span>
        <div class="p2">
          {{explain_post.language_text}}
        </div>
      </li>
      <li class="language_p2">
        <span class="p1 need">讲解员</span>
        <div class="p2 guide">
          {{explain_post.guide_num}}位
        </div>
      </li>
    </ul>
    <div class="user__list" v-if="Object.keys(infoList).length>0">
      <ul>
        <li class="item">
          <div class="title">
            <div class="left">
              <div class="name">{{infoList.name}}</div>
              <div class="num">{{infoList.card_type}} {{infoList.card_num}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="notice">讲解员须知：每位讲解员收费{{guide_info.guide_cost}}元/人，每位讲解员最多可带20人团队，请合理选择讲解员数量</div>
    <div class="bottom">
      <div class="submit" @click="confirm">确认</div>
    </div>
  </div>
</template>
<script>
  import {Toast, Indicator} from 'mint-ui';
  import {Session} from '@/assets/js/utils.js';

  export default {
    name: 'explain_info',
    data() {
      return {
        visit: {
          date: Session.get('wx_explain_now_date'),
          time: Session.get('wx_explain_time_period'),
        },
        infoList: [],
        guide_cost: '',
        guide_info: {},
        explain_post: {}
      }
    },
    created() {
      this.getGuideDetail()
      if (Session.get('infoList')) {
        this.infoList = Session.get('infoList')
      }
      if (localStorage.explain_post) {
        this.explain_post = JSON.parse(localStorage.explain_post);
      } else {
        this.$router.back(-1)
      }
    },
    methods: {
      // 获取基本信息
      getGuideDetail() {
        let v = this;
        v.$api.GuideDetail().then((res) => {
          this.guide_info = res.data;
        })
      },
      // 预约
      confirm() {
        Indicator.open({
          text: "预约中...",
          spinnerType: 'snake'
        });
        this.$api.PostGuideOrder(
          this.explain_post.gd_tp_id,
          this.explain_post.go_username,
          this.explain_post.go_cardtype_id,
          this.explain_post.go_card_num,
          this.explain_post.contact_phone,
          this.explain_post.people_num,
          this.explain_post.language_id,
          this.explain_post.guide_num,
        ).then(res => {
          if (res.status == 1) {
            this.$router.replace({path: '/explain/explain_pay', query: {gorder_id: res.data.gorder_id}})
            localStorage.removeItem('explain_post');
            Session.remove('wx_explain_gd_tp_id');
            Session.remove('wx_explain_now_date');
            Session.remove('wx_explain_dateIndex');
            Session.remove('wx_explain_time_period');
            Session.remove('wx_explain_tp_id');
            Session.remove('infoList');
            Session.remove('wx_explain_tp_list');
            Session.remove('wx_explain_timePeriodIndex');
          } else {
            Toast(res.msg)
            setTimeout(() => {
              this.$router.replace({path: '/explain'})
            }, 2000)
          }
          Indicator.close()
        })

      },
      // 弹层
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
    }
  }

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';

  .fill {
    min-height: 100vh;
    background-color: #F2F2F2;

    ul.info {
      padding: 0 15px;
      background-color: #fff;

      > li {
        padding: 15px 0;
        font-size: 15px;
        /*px*/
        font-weight: 400;
        color: #353535;

        & + li {
          border-top: 1px solid #E4E4E4;
          /*no*/
        }

        .p1 {
          position: relative;
          padding: 0 15px;

          &.need {
            &::before {
              position: absolute;
              left: 5px;
              top: 50%;
              text-align: center;
              transform: translateY(-50%);
              content: '*';
              padding-top: 5px;
              color: #E32A2A;
              font-size: 15px;
              /*px*/
            }
          }
        }

        .p2 {
          div {
            flex: 1;
          }

          input {
            height: 100%;
            outline: none;
            border: 0;
            font-size: 14px;
            /*px*/
            font-weight: 400;
            padding: 0 0 0 30px;

            &::placeholder {
              color: #B0B0B0;
              text-align: left;
            }
          }
        }
      }

      .language_p2 {
        display: flex;
        align-items: center;

        .p2 {
          display: flex;
          align-items: center;
          flex: 1;
          padding-left: 50px;

          .iconfont {
            color: #353535;
            font-size: 18px;
            /*px*/
            font-weight: bold;
          }
        }

        .guide {
          padding-left: 75px;
        }
      }
    }

    .user__list {
      background-color: #fff;
      padding: 0 30px;
      margin-top: 10px;

      .check__all {
        display: flex;
        align-items: center;
        color: #545454;
        font-size: 12px;
        /*px*/
        padding-top: 15px;

        &::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 18px;
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../../img/pw/checkbox.png');
          transition: all .2s ease-in-out 0s;
          margin-right: 15px;
        }

        &.active {
          &::before {
            background-image: url('../../img/pw/checkbox_ed.png');
          }
        }
      }

      ul {
        li.item {
          padding: 15px 0;

          & + li {
            border-top: 1px solid #F1F1F1;
            /*no*/
          }

          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
              line-height: 25px;

              .name {
                font-size: 17px;
                /*px*/
                font-weight: 500;
                color: #282828;
              }

              .num {
                font-size: 14px;
                /*px*/
                font-weight: 400;
                color: #545454;
              }
            }

            .right {
              img {
                width: 17px;
                height: 19px;
                vertical-align: top;
              }
            }
          }

          ul.tickets {
            margin-top: 15px;

            li {
              padding: 5px 0;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .ts__name {
                display: flex;
                align-items: center;
                font-size: 14px;
                /*px*/
                font-weight: 400;
                color: #545454;

                &::before {
                  content: '';
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  background-position: center center;
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                  background-image: url('../../img/pw/checkbox.png');
                  transition: all .2s ease-in-out 0s;
                  margin-right: 15px;
                }

                &.active {
                  &::before {
                    background-image: url('../../img/pw/checkbox_ed.png');
                  }
                }
              }

              .ts__price {
                font-size: 14px;
                /*px*/
                font-weight: 500;
                color: #565656;

                .red {
                  color: #E8593E;
                }
              }
            }
          }
        }
      }
    }

    .add {
      position: relative;
      padding: 15px 0;
      display: flex;
      justify-content: center;
      background-color: #fff;
      margin-top: 10px;

      &__btn {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #B0B0B0;
        transition: all .2s ease-in-out 0s;

        span {
          font-size: 18px;
          color: $baseClr;
        }

        &:active {
          opacity: .7;
        }

        &::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 18px;
          background: url('../../img/pw/add.png') center center / 100% 100% no-repeat;
          margin-right: 5px;
        }
      }

      //常用联系人
      .contacts_btn {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: -5px 0 10px #F2F2F2;

        .c_icon {
          display: block;
          width: 18px;
          height: 18px;
          background: url('../../img/pw/person.png') center center / 100% 100% no-repeat;
        }

        &:active {
          opacity: .7;
        }
      }
    }

    .notice {
      color: $baseClr;
      font-size: 11px;
      /*px*/
      padding: 12px 21px;
      line-height: 18px;
      text-align: justify;
    }

    /deep/ .mint-popup {
      width: 100%;

      .slot_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        border-bottom: 5px solid #f5f5f5;
        /*no*/
        span {
          color: $baseClr;
          font-size: 15px;
          /*px*/
          padding: 10px 0;

          &:first-child {
            color: #ccc;
          }
        }
      }
    }

    .user__modal {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 204;
      background-color: #F1F1F1;

      .head {
        padding: 13px 20px;
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 400;

        .cancel {
          color: #626262;
        }

        .confirm {
          color: $baseClr;
        }
      }

      &__add {
        padding: 15px 0;
        display: flex;
        justify-content: center;
        background-color: #fff;

        &--btn {
          display: flex;
          align-items: center;
          font-weight: 400;
          transition: all .2s ease-in-out 0s;

          font-size: 18px;
          color: $baseClr;

          &:active {
            opacity: .7;
          }

          &::before {
            content: '';
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url('../../img/pw/add.png') center center / 100% 100% no-repeat;
            margin-right: 5px;
          }
        }
      }

      ul.list {
        max-height: 300px;
        width: 100%;
        margin-top: 10px;
        overflow-y: scroll;
        position: relative;
        overflow-x: hidden;
        background-color: #fff;

        li {
          position: relative;
          height: 60px;
          -webkit-transition: all 0.2s;
          transition: all 0.2s;
          padding-left: 10px;

          &[data-type="0"] {
            transform: translate3d(0, 0, 0);
          }

          &[data-type="1"] {
            transform: translate3d(-76px, 0, 0);
          }

          &::after {
            content: " ";
            position: absolute;
            left: 10px;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #ccc;
            /*no*/
            color: #ccc;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            z-index: 2;
          }

          &:active {
            opacity: .7;
          }

          .box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            padding-right: 20px;

            .cont {
              display: flex;
              align-items: center;

              .iconfont {
                font-size: 20px;
                margin-right: 15px;
                color: #999999;
              }

              .desc {
                .name {
                  line-height: 25px;
                  font-size: 17px;
                  font-weight: 500;
                  color: #282828;
                }

                .type {
                  font-size: 14px;
                  font-weight: 500;
                  color: #545454;
                }
              }
            }

            .checkbox {
              width: 18px;
              height: 18px;
              background-position: center center;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-image: url('../../img/pw/checkbox.png');
              transition: all .2s ease-in-out 0s;

              &.active {
                background-image: url('../../img/pw/checkbox_ed.png');
              }
            }

            .arrow_r {
              width: 15px;
              height: 15px;
              background: url('../../img/pw/arrow_r.png') center center / 100% 100% no-repeat;
            }
          }

          .delete {
            width: 76px;
            height: 100%;
            background: #ff4949;
            font-size: 17px;
            color: #fff;
            text-align: center;
            line-height: 55px;
            position: absolute;
            top: 0;
            right: -76px;
          }
        }

        &:last-child::after {
          border: 0;
        }
      }
    }

    .bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 20px;
      /*background-color: #E7E7E7;*/

      .submit {
        width: 347px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: $baseClr;
        border-radius: 24px;
        font-size: 18px;
        /*px*/
        font-weight: 400;
        color: #FFFFFF;

        &:active {
          opacity: .7;
        }
      }
    }
  }

  .cover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 203;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .slid_up-enter-active,
  .slid_up-leave-active {
    transition: all 0.3s;
  }

  .slid_up-enter,
  .slid_up-leave-active {
    transform: translate3d(0, 100%, 0);
  }
</style>
