<template>
  <div class="fill" v-cloak>
    <div class="info">
      <ul>
        <li>
          <div class="p1">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</div>
          <div class="p2"><input type="text" placeholder="请输入参观者姓名" v-model.trim="edit.username"></div>
        </li>
        <li>
          <div class="p1">证件类型</div>
          <div class="p2">
            <select v-model="edit.cardtype_id" @change="changeSelected">
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
      </ul>
      <div class="tips">
        <h3>提示</h3>
        <p>1.3米（含）以下，或6岁及以下儿童不需要预约</p>
      </div>
    </div>
    <div class="tickets">
      <ul>
        <li>
          <div class="p1">门票类型</div>
          <div class="p2">
            <!-- 选择门票类型 -->
            <ul class="tickets__type">
              <!-- <li class="item" :class="{'active':a.pt_id == edit.pt_id || ai == ticketsTypeIndex}" v-for="(a,ai) in tickets" :key="ai" @click="choseTicketType(ai)">{{a.pt_name}}</li> -->
              <li class="item" v-for="(a,ai) in tickets" :key="ai" @click="choseTicketType(ai)"><i class="iconfont" :class="[a.pt_id == edit.pt_id || ai == ticketsTypeIndex?'iconfuxuankuang1':'iconfuxuankuang']"></i>{{a.pt_name}}</li>
            </ul>
          </div>
        </li>
        <li class="tickets__list">
          <div class="tickets__wrap" v-if="isRequest">
            <ul v-if="tickets[ticketsTypeIndex].pt_tickets.length>0">
              <li>选择参观门票</li>
              <li v-for="(b,bi) in tickets[ticketsTypeIndex].pt_tickets" :key="bi">
                <!-- <div class="ts__name" :class="{'active': b.ticket_id==1 || hasItem(b) }" @click="choseTicket(b)">{{b.ticket_name}}</div> -->
                <div class="ts__name" @click="choseTicket(b)"><i class="iconfont" :class="[ b.ticket_id==1 || hasItem(b)?'iconfuxuankuang1':'iconfuxuankuang']"></i>{{b.ticket_name}}</div>
                <div class="ts__price" :class="{'gray':b.ticket_id==1}">￥{{b.ticket_price}}</div>
              </li>
            </ul>
          </div>
          <mt-spinner type="triple-bounce" v-if="!isRequest"></mt-spinner>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="submit" @click="AddVisitor">确认</div>
    </div>
    <transition name="fade">
      <div class="cover" v-show="showModal" @click="closeModal" @touchmove.prevent></div>
    </transition>
    <div class="modal" v-show="showModal==1" key="modal1">
      <div class="modal__body">
        <div class="title">
          <img src="../../img/pw/warn_tips.png">
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
import { Toast, Indicator, Spinner } from 'mint-ui';
import { Session, idCodeValid, ModalHelper } from '@/assets/js/utils.js';

const SPINNER_TYPE = "snake";

export default {
  name: 'fillinfo',
  data() {
    return {
      showModal: 0,
      tp_id: Session.get('wx_pw_td_tp_id'), //时段id
      isRequest: false, //是否执行请求
      // 单人
      edit: {
        username: '', //姓名
        cardtype_id: 1, //证件id（类型、默认1身份证）
        card_type: '身份证', //证件类型
        card_num: '', //证件号
        pt_id: '', //门票类型
        pt_name: '', //门票类型名称
        chose_tickets: [
          // {
          //   td_tp_id: 53,
          //   ticket_id: 1, //ticket_id 为1的是基础票
          //   ticket_name: "常设展览参观券",
          //   ticket_price: "0",
          // },
          // {
          //   td_tp_id: 95,
          //   ticket_id: 2,
          //   ticket_name: "临展A",
          //   ticket_price: "0.01",
          // }
        ]
      },
      cardTypeArr: [{
        'card_type': '身份证',
        'cardtype_id': 1
      }],
      //门票数组
      tickets: [{
          pt_id: '1',
          pt_name: '成人票',
          pt_tickets: [
            // {
            //   td_tp_id: 53,
            //   ticket_id: 1, //ticket_id 为1的是基础票
            //   ticket_name: "常设展览参观券",
            //   ticket_price: "0",
            // },
            // {
            //   td_tp_id: 95,
            //   ticket_id: 2,
            //   ticket_name: "临展A",
            //   ticket_price: "0.01",
            // }
          ]
        },
        // {
        //   pt_id: '2',
        //   pt_name: '儿童票',
        //   pt_tickets: [
        //     // {
        //     //   td_tp_id: 53,
        //     //   ticket_id: 1, //ticket_id 为1的是基础票
        //     //   ticket_name: "常设展览参观券",
        //     //   ticket_price: "0",
        //     // }
        //   ]
        // },
      ],
      ticketsTypeIndex: 0, //门票类型索引
      ticketsInfoList: Session.get('wx_pw_users_info') || [], //已选多人门票列表
      contactsList: Session.get('wx_pw_contacts_list') || [], //常用联系人列表
    }
  },
  created() {
    let v = this;
    let type = v.$route.query.type; //  1新增  2编辑

    v.tp_id && v.getTicketDetail(); //获取门票详情

    if (type == 2) {
      let index = v.$route.query.index;
      //编辑
      let userinfo = v.ticketsInfoList[index]; //获取缓存
      v.edit = userinfo;
    }
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

    // if (!Session.get('wx_pw_open_model')) {
    //   Session.set('wx_pw_open_model', 1)
    //   this.openModal();
    // }
  },
  beforeDestroy() {
    ModalHelper.beforeClose();
  },
  methods: {
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
    /**
     * @获取门票详情及证件类型
     */
    getTicketDetail() {
      let v = this;
      Indicator.open({
        text: '加载中...',
        spinnerType: SPINNER_TYPE
      });

      v.$api.PW_WX_TicketDetail(v.tp_id).then((res) => {
        Indicator.close();
        v.isRequest = true;

        if (res.status == 1) {
          v.tickets = res.data.pt_data;

          v.cardTypeArr = res.data.cardtype; //证件数组

          //option默认选中身份证
          v.edit.cardtype_id = res.data.cardtype[0].cardtype_id;

          // 门票类型默认选择第一项
          v.edit.pt_id = res.data.pt_data[v.ticketsTypeIndex].pt_id;

          //门票类型默认选择第一项(成人、儿童)
          v.edit.pt_name = res.data.pt_data[v.ticketsTypeIndex].pt_name;
          //基础票ticket_id为1 默认勾选
          v.edit.chose_tickets[0] = res.data.pt_data[v.ticketsTypeIndex].pt_tickets.find((o) => o.ticket_id == 1);

          let id = v.$route.query.id;
          if (id) {
            //快捷方式（常用联系人）
            let userinfo = v.contactsList.find(o => o.id == id); //获取缓存
            v.edit.username = userinfo.name;
            v.edit.cardtype_id = userinfo.card_type_id;
            v.edit.card_type = userinfo.card_type;
            v.edit.card_num = userinfo.card_num;
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
     * @选择门票类型切换
     */
    choseTicketType(i) {
      let v = this;
      v.ticketsTypeIndex = i;
      v.edit.chose_tickets = v.edit.chose_tickets.slice(0, 1); //可选门票置空
      v.edit.pt_id = v.tickets[i].pt_id;
      v.edit.pt_name = v.tickets[i].pt_name;
    },
    /**
     * @门票是否选中
     */
    hasItem(ticket) {
      let v = this;
      let flag = v.edit.chose_tickets.some(o => {
        return o.ticket_id == ticket.ticket_id;
      })
      return flag;
    },
    /**
     * @选择门票
     */
    choseTicket(ticket) {
      let v = this;
      if (ticket.ticket_id == 1) return;
      let pos = v.edit.chose_tickets.findIndex(o => {
        return o.ticket_id == ticket.ticket_id;
      })
      v.hasItem(ticket) ? v.edit.chose_tickets.splice(pos, 1) : v.edit.chose_tickets.push(ticket);
    },
    /**
     * @新增编辑
     */
    AddVisitor() {
      let v = this;

      if (!v.edit.username) {
        v.showToast('*请输入参观者姓名');
        return;
      }
      if (Number(v.edit.cardtype_id) == 1) {
        //身份证
        if (!idCodeValid(v.edit.card_num).pass) {
          v.showToast('*请输入正确的证件号');
          return;
        }
        //6岁及以下儿童无需预约
        let age = v.calcIDCard(v.edit.card_num);
        if (age <= 6) {
          v.openModal();
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
        let name = v.edit.username;
        let card_type_id = v.edit.cardtype_id;
        let card_type = v.edit.card_type;
        let card_num = v.edit.card_num.toUpperCase();
        let is_children = idCodeValid(v.edit.card_num).status == 4 ? 2 : 1; //1成人 2儿童
        let user_id = v.$route.query.id || ''; //编辑时传

        let type = v.$route.query.type;

        v.$api.PW_WX_AddContacts(name, card_type_id, card_type, card_num, is_children, user_id).then((res) => {
          // console.log(res);
          // if (res.status == 1) {
          // let instance = Toast(res.msg);
          // setTimeout(() => {
          // instance.close();

          if (type == 1) {
            //新增
            v.ticketsInfoList.push(v.edit);
          } else if (type == 2) {
            let index = v.$route.query.index;
            //编辑
            v.ticketsInfoList[index] = v.edit;
          }

          Session.set('wx_pw_users_info', v.ticketsInfoList); //已选多人门票信息列表
          v.$router.go(-1);
          v.$router.replace('/pw/person/info');

          // }, 500);
          // } else {
          // v.showToast(res.msg);
          // }
        }).catch(e => {
          v.showToast('请求异常');
        })
        lastTime = new Date().getTime();
      } else {
        v.showToast('请勿频繁操作');
      }
    },
    //根据身份证号计算年龄
    calcIDCard(IDCard) {
      //获取用户身份证号码
      var userCard = IDCard.toString();
      //获取出生年月日
      var yearBirth = parseInt(userCard.substring(6, 10)); //出生年份
      var monthBirth = parseInt(userCard.substring(10, 12)); //出生月份
      var dayBirth = parseInt(userCard.substring(12, 14)); //出生日
      //获取当前年月日并计算年龄
      var myDate = new Date();
      var yearNow = parseInt(myDate.getFullYear()); //当前年份
      var monthNow = parseInt(myDate.getMonth() + 1); //当前月份
      var dayNow = parseInt(myDate.getDate()); //当前日
      var age = yearNow - yearBirth; //
      //
      // 6岁
      // if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
      //   age--;
      // }

      // 6岁半算作7岁
      // if (monthNow > monthBirth || (monthNow == monthBirth && dayNow > dayBirth)) {
      //   age++;
      // }

      return age;
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
  padding-bottom: 110px;

  .iconfont {
    font-size: 18px;
    width: 18px;
    height: 18px;
    margin-top: 1px;
    margin-right: 5px;
    color: #B2B2B2;
    transition: all .2s ease-in-out 0s;

    &.iconfuxuankuang {}

    &.iconfuxuankuang1 {
      color: $baseClr;
    }
  }

  .info {
    background-color: #fff;

    >ul {
      padding: 0 15px;

      >li {
        position: relative;
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: 15px;
        /*px*/
        font-weight: 400;
        color: #353535;
        border-bottom: 1px solid #E0E0E0;
        /*no*/

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
          content: '·';
          position: absolute;
          left: 0;
          top: 50%;
          text-align: center;
          transform: translateY(-50%);
          color: $baseClr;
          font-size: 50px;
          /*px*/
        }
      }

      p {
        padding: 0 15px;
        font-size: 10px;
        /*px*/
        margin-top: 10px;
      }
    }
  }

  .tickets {
    margin-top: 10px;
    background-color: #fff;

    >ul {

      >li {
        display: flex;
        align-items: center;
        padding: 15px;
        font-size: 15px;
        /*px*/
        font-weight: 400;
        color: #353535;

        &+li {
          border-top: 4px solid #F2F2F2;
          /*no*/
        }

        .p1 {
          width: 180px;
          position: relative;
          padding: 0 15px;
          font-size: 15px;
          /*px*/
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
      }

      //门票类型
      .tickets__type {
        display: flex;

        .item {
          display: flex;
          align-items: center;
          margin-right: 15px;

          // &::before {
          //   content: '';
          //   display: inline-block;
          //   width: 18px;
          //   height: 18px;
          //   background-position: center center;
          //   background-size: 100% 100%;
          //   background-repeat: no-repeat;
          //   background-image: url('../../img/pw/checkbox.png');
          //   transition: all .2s ease-in-out 0s;
          //   
          // }

          // &.active {
          //   &::before {
          //     background-image: url('../../img/pw/checkbox_ed.png');
          //   }
          // }
        }
      }

      //门票列表
      .tickets__list {
        .tickets__wrap {
          width: 100%;

          >ul {
            width: 100%;

            >li {
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

                // &::before {
                //   content: '';
                //   display: inline-block;
                //   width: 18px;
                //   height: 18px;
                //   background-position: center center;
                //   background-size: 100% 100%;
                //   background-repeat: no-repeat;
                //   background-image: url('../../img/pw/checkbox.png');
                //   transition: all .2s ease-in-out 0s;
                //   margin-right: 15px;
                // }

                // &.active {
                //   &::before {
                //     background-image: url('../../img/pw/checkbox_ed.png');
                //   }
                // }
              }

              .ts__price {
                font-size: 14px;
                /*px*/
                font-weight: 500;
                color: $baseClr;

                &.gray {
                  color: #565656;
                }
              }
            }
          }
        }

        >span {
          width: 100%;

          /deep/ .mint-spinner-triple-bounce {
            width: 100px;
            margin: 0 auto;
            text-align: center;
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

.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  @extend .layout_fixed_x_center;
}

.modal {
  width: 295px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 25px;
  font-size: 13px;
  /*px*/
  background-color: #fff;
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.13);
  border-radius: 10px;
  z-index: 10000;

  &__body {
    color: #858585;
    text-align: center;

    .title {
      width: 145px;
      margin: 0 auto;

      img {
        width: 100%;
        height: auto;
        vertical-align: middle;
      }

      h2 {
        margin: 10px 0;
        text-align: center;
        font-size: 22px;
        /*px*/
        font-weight: bold;
        color: #333333;
      }
    }

    .cont {
      font-size: 17px;
      /*px*/
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
      /*px*/
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

</style>
