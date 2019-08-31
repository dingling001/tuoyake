<template>
  <div class="fill">
    <div class="info">
      <ul>
        <li>
          <span class="p1">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
          <span class="p2"><input type="text" placeholder="请输入参观者姓名" v-model.trim="edit.name"></span>
        </li>
        <li @click="id_show=true" class="language_p2">
          <span class="p1">证件类型</span>
          <div class="p2">
            <div>{{edit.card_type}}</div>
            <span class="iconfont iconyou"></span>
          </div>
        </li>
        <li>
          <span class="p1">证件号码</span>
          <span class="p2"><input type="text" placeholder="请输入证件号码" v-model.trim="edit.card_num"
                                  @blur="edit.cardtype_id==1&&edit.card_num && (edit.card_num = $event.target.value.toUpperCase())"></span>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="submit" @click="AddVisitor">确认</div>
    </div>
    <mt-popup
      v-model="id_show"
      position="bottom">
      <mt-picker :slots="cardtype_list" @change="onValuesChange" :visibleItemCount='3' showToolbar
                 value-key="card_type" value="card_value">
        <Slot>
          <div class="slot_top"><span @click="id_show=false">取消</span><span
            @click="id_show=false">确定</span></div>
        </Slot>
      </mt-picker>
    </mt-popup>
    <transition name="fade">
      <div class="cover" v-show="showModal" @click="closeModal" @touchmove.prevent></div>
    </transition>
    <div class="modal" v-show="showModal==1" key="modal1">
      <div class="modal__body">
        <div class="title">
          <img src="../../img/pw/clock.png">
          <h2>温馨提示</h2>
        </div>
        <div class="cont">6岁及以下儿童无需预约，家长可携带直接进馆</div>
      </div>
      <div class="modal__foot">
        <span @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {idCodeValid, ModalHelper, Session} from '@/assets/js/utils.js';

  export default {
    name: 'fillinfo',
    data() {
      return {
        showModal: 0,
        edit: {
          name: '', //姓名
          cardtype_id: 1, //证件id（类型、默认1身份证）
          card_type: '', //证件类型
          card_num: '', //
        },
        id_show: false,
        id_init: false,
        cardtype_list: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 1
          }
        ],
        card_value: '',
        contactsList: Session.get('wx_explain_contacts_list') || [], //常用联系人列表
        index: 0,
      }
    },
    created() {
      let v = this;
      let type = v.$route.query.type; //  1新增  2编辑
      if (type == 2) {
        this.index = v.$route.query.index;
        v.edit = v.contactsList[this.index]
        this.$nextTick(() => {
          this.cardtype_list[0].defaultIndex = Number(this.index);
        })
      }
      this.getGuideDetail()
    },
    mounted() {
      /**
       * @解决ios上微信浏览器中失去焦点后页面事件失效问题
       */
      [].forEach.call(document.querySelectorAll("input,select"), function (el) {
        // Add event listener
        el.addEventListener("blur", function (event) {
          event.preventDefault();
          setTimeout(() => {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
          }, 100);
        }, false);
      });
    },
    beforeDestroy() {
      ModalHelper.beforeClose();
    },
    methods: {
      // 获取列表
      getContactsList() {
        let v = this;
        v.$api.PW_WX_ContactsList().then((res) => {
          if (res.status == 1) {
            v.contactsList = res.data;
            Session.set('wx_explain_contacts_list', v.contactsList);
          }
        })
      },
      // 选择证件
      onValuesChange(picker, values) {
        if (this.id_init) {
          this.edit.card_type = values[0].card_type;
          this.edit.cardtype_id = values[0].cardtype_id;

        } else {
          this.id_init = true;
        }
      },
      // 获取身份信息
      getGuideDetail() {
        let v = this;
        v.$api.GuideDetail().then((res) => {
          this.cardtype_list[0].values = res.data.cardtype;
        })
      },
      // 编辑
      AddVisitor() {
        let v = this;
        if (!v.edit.name) {
          v.showToast('*请输入姓名');
          return;
        }
        if (Number(v.edit.cardtype_id) == 1) {
          //身份证
          if (!idCodeValid(v.edit.card_num).pass) {
            v.showToast('*请输入正确的证件号');
            return;
          }
        } else {
          //其他证件
          if (v.edit.card_num.length < 5) {
            v.showToast('*请输入正确的证件号');
            return;
          }
        }
        let lastTime = 0;
        let nowTime = new Date().getTime();
        if (nowTime - lastTime > 500) {
          let name = v.edit.name;
          let card_type_id = v.edit.cardtype_id;
          let card_type = v.edit.card_type;
          let card_num = v.edit.card_num;
          let is_children = idCodeValid(v.edit.card_num).status == 4 ? 2 : 1; //1成人 2儿童
          let user_id = v.$route.query.id || ''; //编辑时传

          let type = v.$route.query.type;

          let age = v.calcIDCard(v.edit.card_num);
          if (age <= 6) {
            v.openModal();
            return;
          }
          v.$api.PW_WX_AddContacts(name, card_type_id, card_type, card_num, is_children, user_id).then((res) => {
            console.log(res)
            if (res.status == 1) {
              v.showToast('修改成功！')
              setTimeout(() => {
                v.$router.replace('/explain/explain_info');
              }, 2000)
            } else {
              v.showToast(res.msg)
            }

          }).catch(e => {
            console.log(e)
            v.showToast('请求异常');
          });
          lastTime = new Date().getTime();
        } else {
          v.showToast('请勿频繁操作');
        }
      },
      //根据身份证号计算年龄
      calcIDCard(IDCard) {
        var sexAndAge = 0;
        //获取用户身份证号码
        var userCard = IDCard.toString();
        //获取出生年月日
        var yearBirth = userCard.substring(6, 10);
        var monthBirth = userCard.substring(10, 12);
        var dayBirth = userCard.substring(12, 14);
        //获取当前年月日并计算年龄
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDay();
        var age = myDate.getFullYear() - yearBirth;
        if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
          age--;
        }
        //得到年龄
        sexAndAge = age;
        //返回性别和年龄
        return sexAndAge;
      },
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
      /**
       * 打开
       */
      openModal() {
        let v = this;
        v.showModal = 1;
        ModalHelper.afterOpen();
      },
      /**
       * 关闭
       */
      closeModal() {
        let v = this;
        v.showModal = 0;
        ModalHelper.beforeClose();
      },
      /**
       * 确认
       */
      confirm() {
        let v = this;
        v.closeModal();
      },
    }
  }

</script>
<style lang="scss" scoped>
  @import '@/style/mixin.scss';
  .fill {
    min-height: calc(100vh - 60px);
    background-color: #F2F2F2;
    padding-bottom: 110px;

    .info {
      background-color: #fff;

      > ul {
        padding: 0 15px;

        > li {
          display: flex;
          align-items: center;
          padding: 15px 0;
          font-size: 15px;
          font-weight: 400;
          color: #353535;
          border-bottom: 1px solid #E0E0E0;

          &:last-child {
            border: 0;
          }

          .p1 {
            width: 180px;
            position: relative;
            padding: 0 15px;
            font-size: 15px;

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
              }
            }
          }

          .p2 {
            width: 100%;

            input {
              outline: none;
              font-size: 15px;
              font-weight: 400;

              &::placeholder {
                color: #B0B0B0
              }
            }
          }

          .checkbox {
            display: flex;
            align-items: center;
            padding: 0 15px;
            font-size: 10px;

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
              margin-right: 10px;
            }

            &.active {
              &::before {
                background-image: url('../../img/pw/checkbox_ed.png');
              }
            }
          }
        }

        .language_p2 {
          flex: 1;

          .p2 {
            display: flex;
            align-items: center;

            div {
              flex: 1;
            }

            .iconfont {
              font-size: 18px;
              /*px*/
            }
          }
        }

      }

      .tips {
        padding: 15px;
        color: $baseClr;
        position: relative;

        h3 {
          font-weight: 500;
          width: 180px;
          position: relative;
          padding: 0 15px;
          font-size: 15px;
          /*px*/
          &::before {
            position: absolute;
            left: 0;
            top: 50%;
            text-align: center;
            transform: translateY(-50%);
            content: '·';
            color: $baseClr;
            font-size: 50px;
          }
        }

        p {
          padding: 0 15px;
          font-size: 10px;
          margin-top: 10px;
        }
      }
    }

    .tickets {
      margin-top: 10px;
      background-color: #fff;

      > ul {

        > li {
          display: flex;
          align-items: center;
          padding: 15px;
          font-size: 15px;
          font-weight: 400;
          color: #353535;

          & + li {
            border-top: 4px solid #F2F2F2;
          }

          .p1 {
            width: 180px;
            position: relative;
            padding: 0 15px;
            font-size: 15px;
          }

          .p2 {
            width: 100%;

            input {
              outline: none;
              font-size: 15px;
              font-weight: 400;

              &::placeholder {
                color: #B0B0B0
              }
            }
          }
        }

        //门票类型
        .tickets__type {
          display: flex;

          .item {
            display: flex;
            align-items: center;
            margin-right: 15px;

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
              margin-right: 5px;
            }

            &.active {
              &::before {
                background-image: url('../../img/pw/checkbox_ed.png');
              }
            }
          }
        }

        //门票列表
        .tickets__list {

          > ul {
            width: 100%;

            > li {
              padding: 8px 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .ts__name {
                display: flex;
                align-items: center;
                font-size: 14px;
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
                font-weight: 500;
                color: $baseClr;

                &.gray {
                  color: #565656;
                }
              }
            }
          }
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
      background-color: #F2F2F2;

      .submit {
        width: 347px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: $baseClr;
        border-radius: 24px;
        font-size: 18px;
        font-weight: 400;
        color: #FFFFFF;

        &:active {
          opacity: .7;
        }
      }
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
          color:$baseClr;
          font-size: 15px;
          /*px*/
          padding: 10px 0;

          &:first-child {
            color: #ccc;
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
      z-index: 9999;
    }

    .modal {
      width: 293px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 25px;
      font-size: 13px;
      background-color: #fff;
      box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.13);
      border-radius: 10px;
      z-index: 10000;

      &__body {
        color: #858585;
        text-align: center;

        .title {
          width: 107px;
          margin: 0 auto;

          img {
            width: 107px;
            height: 84px;
            vertical-align: middle;
          }

          h2 {
            margin: 10px 0;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            color: #333333;
          }
        }

        .cont {
          font-size: 17px;
          font-weight: 300;
          color: #333333;
          line-height: 18px;
          margin: 20px 0;
        }
      }

      &__foot {
        display: flex;
        justify-content: center;

        span {
          width: 200px;
          font-size: 18px;
          line-height: 40px;
          font-weight: bold;
          color: #fff;
          text-align: center;
          display: block;
          background: $baseClr;
          border-radius: 19px;

          &:active {
            opacity: .7;
          }
        }
      }
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
  }

  input {
    border: 0;
    font-size: 15px;
    color: #333;
    width: 100%;
    height: 30px;
    background: #fff;

    &:disabled {
      border: 0
    }
  }


</style>
