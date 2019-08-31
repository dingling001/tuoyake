<template>
  <div class="fill" v-cloak>
    <ul class="info">
      <li>
        <div class="p1">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</div>
        <div class="p2"><input type="text" placeholder="请输入参观者姓名" v-model.trim="edit.name"></div>
      </li>
      <li>
        <div class="p1">证件类型</div>
        <div class="p2">
          <select v-model="edit.card_type_id" @change="changeSelected">
            <option v-for="(a,i) in cardTypeArr" :value="a.cardtype_id" :key="i">
              {{a.card_type}}
            </option>
          </select>
        </div>
        <div class="right__icon"></div>
      </li>
      <li>
        <div class="p1">证件号码</div>
        <div class="p2"><input type="text" placeholder="请输入证件号码" v-model.trim="edit.card_num" @blur="edit.card_num && (edit.card_num = $event.target.value.toUpperCase())"></div>
      </li>
      <!-- <li v-if="!showTickets">
        <div class="checkbox" :class="{'active':isAddContact}" @click="isAddContact=!isAddContact">是否添加到常用联系人</div>
      </li> -->
    </ul>
    <div class="bottom">
      <div class="submit" @click="AddVisitor">确认</div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import { Session, idCodeValid } from '@/assets/js/utils.js';

const SPINNER_TYPE = "snake";

export default {
  name: 'fillinfo',
  data() {
    return {
      tp_id: Session.get('wx_pw_td_tp_id'), //时段id
      // 单人
      edit: {
        id: '',
        name: '', //姓名
        card_type_id: 1, //证件id（类型、默认1身份证）
        card_type: '身份证', //证件类型
        card_num: '', //证件号
        is_children: ''
      },
      cardTypeArr: [{
        'card_type': '身份证',
        'cardtype_id': 1
      }],
      ticketsInfoList: Session.get('wx_pw_users_info') || [], //已选多人门票列表
      contactsList: Session.get('wx_pw_contacts_list') || [], //常用联系人列表
    }
  },
  created() {
    let v = this;
    v.tp_id && v.getTicketDetail(); //获取门票详情(证件类型)
  },
  mounted() {
    /**
     * @解决ios上微信浏览器中失去焦点后页面事件失效问题 
     */
    [].forEach.call(document.querySelectorAll("input,select"), function(el) {
      // Add event listener
      el.addEventListener("blur", function(event) {
        event.preventDefault();
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      }, false);
    });
  },
  methods: {
    /**
     * @获取门票详情及证件类型
     */
    getTicketDetail() {
      let v = this;
      let type = v.$route.query.type; //1、新增，2、编辑
      Indicator.open({
        text: '加载中...',
        spinnerType: SPINNER_TYPE
      });

      v.$api.PW_WX_TicketDetail(v.tp_id).then((res) => {
        Indicator.close();

        if (res.status == 1) {
          // console.log(res)
          v.cardTypeArr = res.data.cardtype; //证件信息

          if (type == 1) {
            // option默认选中身份证
            v.edit.card_type_id = res.data.cardtype[0].cardtype_id;
          } else if (type == 2) {
            let id = v.$route.query.id;
            //编辑
            let userinfo = v.contactsList.find(o => o.id == id); //获取缓存
            v.edit = userinfo;
          }
        } else {
          v.showToast(res.msg);
        }
      })
    },
    /**
     * @选择证件类型
     */
    changeSelected(othis) {
      let v = this;
      let othis_id = othis.target.value;
      v.cardTypeArr.forEach((o) => {
        if (o.cardtype_id == othis_id) {
          v.edit.card_type = o.card_type;
        }
      });
    },
    /**
     * @新增编辑
     */
    AddVisitor(callback) {
      let v = this;
      if (!v.edit.name) {
        v.showToast('*请输入参观者姓名');
        return;
      }
      if (Number(v.edit.card_type_id) == 1) {
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
        let type = v.$route.query.type;

        let name = v.edit.name;
        let card_type_id = v.edit.card_type_id;
        let card_type = v.edit.card_type;
        let card_num = v.edit.card_num.toUpperCase();
        let is_children = idCodeValid(v.edit.card_num).status == 4 ? 2 : 1; //1成人 2儿童
        let user_id = v.edit.id; //编辑时传

        v.$api.PW_WX_AddContacts(name, card_type_id, card_type, card_num, is_children, user_id).then((res) => {
          // console.log(res);
          if (res.status == 1) {
            let instance = Toast(res.msg);
            setTimeout(() => {
              instance.close();
              if (type == 2) {
                //编辑时
                if (v.ticketsInfoList.length > 0) {
                  //若存在，则通过list中的index找到对应的信息
                  let index = v.ticketsInfoList.findIndex(item => {
                    return item.card_num == card_num;
                  })
                  // 若常用联系人纯在新增列表中(包含)
                  if (index != -1) {
                    //同步更新新增列表
                    v.ticketsInfoList[index].username = name;
                    v.ticketsInfoList[index].cardtype_id = card_type_id;
                    v.ticketsInfoList[index].card_type = card_type;
                    v.ticketsInfoList[index].card_num = card_num;
                    Session.set('wx_pw_users_info', v.ticketsInfoList);
                  }
                }
              }
              v.$router.go(-1);
              v.$router.replace('/pw/person/info');
            }, 500);
          } else {
            v.showToast(res.msg);
          }
        })
        lastTime = new Date().getTime();
      } else {
        v.showToast('请勿频繁操作');
      }
    },
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
  min-height: calc(100vh - 60px);
  background-color: #F2F2F2;

  ul.info {
    padding: 0 15px;
    background-color: #fff;

    >li {
      position: relative;
      display: flex;
      align-items: center;
      padding: 15px 0;
      font-size: 15px;
      /*px*/
      font-weight: 400;
      color: #353535;

      &+li {
        border-top: 1px solid #E0E0E0;
        /*no*/
      }

      .p1 {
        width: 180px;
        position: relative;
        padding: 0 15px;
        font-size: 15px;
        /*px*/

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
        width: 100%;

        input {
          outline: none;
          font-size: 15px;
          /*px*/
          font-weight: 400;

          &::placeholder {
            color: #B0B0B0
          }
        }
      }

      .right__icon {
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -8px;
        width: 16px;
        height: 16px;
        background: url('../../img/pw/arrow_r.png') center center / 100% 100% no-repeat;
      }

      .checkbox {
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-size: 10px;
        /*px*/

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

      ul {
        width: 100%;

        li {
          padding: 8px 15px;
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

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #F2F2F2;
    @extend .layout_fixed_x_center;

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

select {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

input,
select {
  border: 0;
  /*no*/
  font-size: 15px;
  /*px*/
  color: #333;
  width: 100%;
  height: 30px;
  background: #fff;

  &:disabled {
    border: 0
  }
}
</style>
