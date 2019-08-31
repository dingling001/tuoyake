<template>
  <div class="fill" v-cloak>
    <ul class="info">
      <router-link tag="li" to="/pw" class="info__item" replace>
        <span class="p1">参观时间</span>
        <span class="p2">{{visit.date}}&nbsp;&nbsp;{{visit.time}}</span>
        <span class="right__icon"></span>
      </router-link>
      <li>
        <span class="p1">手机号码</span>
        <span class="p2 disabled">{{userPhone}}</span>
      </li>
      <!-- <li>
        <span class="p1">车牌号码</span>
        <span class="p2"><input type="text" placeholder="请输入您的车牌号码（选填）" v-model="carNum"></span>
      </li> -->
    </ul>
    <div class="user__list" v-if="infoList.length>0">
      <ul>
        <li class="item" v-for="(a,ai) in infoList" :key="ai">
          <div class="title">
            <div class="left">
              <div class="name">{{a.username}}</div>
              <div class="num">{{a.card_type}} {{a.card_num}}</div>
            </div>
            <div class="right">
              <img class="btn__edit" src="../../img/pw/edit.png" @click="listEdit(ai)">
              <img class="btn__del" src="../../img/pw/del.png" @click="delItem(ai)">
            </div>
          </div>
          <ul class="tickets">
            <li v-for="(b,bi) in a.chose_tickets" :key="bi">
              <div class="ts__name">{{b.ticket_name}}</div>
              <div class="ts__price">￥{{b.ticket_price}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="add">
      <div class="add__btn" @click="addNewVisitor"><i class="iconfont iconjia"></i><span>添加参观者</span>（最多5人）</div>
      <div class="contacts_btn" @click="openUserListModal"><i class="iconfont iconuser2 c_icon"></i></div>
    </div>
    <transition name="fade">
      <div class="cover" v-show="showAddModal" @click="modalClose" @touchmove.prevent></div>
    </transition>
    <transition name="slid_up">
      <div class="user__modal" v-show="showAddModal">
        <div class="head">
          <span class="cancel" @click="modalClose">取消</span>
          <!-- <span class="confirm" @click="addNewVisitor($event,checkIndex)">确定</span> -->
        </div>
        <div class="user__modal__add">
          <div class="user__modal__add--btn" @click="addContact"><i class="iconfont iconjia"></i>新增常用联系人</div>
        </div>
        <ul class="list" v-if="isRequest">
          <li class="list__item" v-for="(b,bi) in contactsList" :key="bi" :data-type="activeSwiper == bi ? 1 : 0">
            <div class="box" @touchstart.capture="touchStart" :data-index="bi" @touchend.capture="touchEnd" @click="addNewVisitor($event,bi)">
              <div class="cont">
                <span class="iconfont iconbianji" @click.stop="contactEdit(b.id)"></span>
                <div class="desc">
                  <p class="name">{{b.name}}</p>
                  <p class="type">{{b.card_num}}</p>
                  <!-- <p class="type">{{b.is_children==1?'成人':'儿童'}} {{b.card_num}}</p> -->
                </div>
              </div>
              <!-- <div class="checkbox" :class="{'active':bi==checkIndex}" @click.stop="checkIndex=bi"></div> -->
              <div class="arrow_r"></div>
            </div>
            <div class="delete" @click="deleteItem($event,b.id)" :data-index="bi">删除</div>
          </li>
        </ul>
        <mt-spinner type="triple-bounce" v-show="!isRequest"></mt-spinner>
      </div>
    </transition>
    <div class="bottom">
      <div class="submit" @click="confirm">确认预约</div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast, Spinner } from 'mint-ui';
import { Session, ModalHelper } from '@/assets/js/utils.js';

const SPINNER_TYPE = "snake";

export default {
  name: 'fillinfo',
  data() {
    return {
      visit: {
        date: Session.get('wx_pw_now_date'),
        time: Session.get('wx_pw_time_period'),
      },
      isRequest: false,
      showAddModal: false,
      curIndex: 0,
      ischecked: false,
      startX: 0,
      endX: 0,
      activeSwiper: -1, //当前活动的滑块（1删除按钮显示状态）
      infoList: Array.from(new Set(Session.get('wx_pw_users_info') || [])),
      userPhone: '',
      carNum: '',
      contactsList: [], //常用联系人列表
      checkIndex: 0, //勾选参观者(单选)
    }
  },
  created() {
    let v = this;
    // v.getAllData();
  },
  beforeDestroy() {
    let v = this;
    v.showAddModal = false;
    ModalHelper.beforeClose();
  },
  watch: {
    $route: { // 属性
      handler: 'getAllData',
      immediate: true // 默认立即触发一次
    },
    showAddModal(value) {
      value ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
    }
  },
  methods: {
    //滑动开始
    touchStart(e) {
      let v = this;
      v.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      let v = this;
      v.endX = e.changedTouches[0].clientX;
      //左滑
      if (v.startX - v.endX > 30) {
        v.activeSwiper = e.currentTarget.dataset.index;
      }
      //恢复
      if (v.startX - v.endX < -30) {
        v.activeSwiper = -1;
      }
      v.startX = 0;
      v.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      return this.activeSwiper > -1;
    },
    /**
     * @并发请求
     */
    async getAllData() {
      let v = this;
      Indicator.open({
        text: "加载中...",
        spinnerType: SPINNER_TYPE
      });
      try {
        await v.getPwUserInfo();
        await v.getContactsList();
        Indicator.close();
      } catch (e) {
        Indicator.close();
      }
    },
    /**
     * @获取用户手机号
     */
    getPwUserInfo() {
      let v = this;
      return new Promise((resolve, reject) => {
        v.$api.PW_WX_UserInfo().then(res => {
          if (res.status == 1) {
            v.userPhone = res.data.phone;
            resolve();
          } else {
            v.showToast(res.msg);
          }
        })
      });
    },
    /**
     * @获取联系人列表
     */
    getContactsList() {
      let v = this;
      return new Promise((resolve, reject) => {
        v.$api.PW_WX_ContactsList().then((res) => {
          v.isRequest = true;
          // console.log(res)
          if (res.status == 1) {
            v.contactsList = res.data;
            if (v.contactsList.length > 0) {
              Session.set('wx_pw_contacts_list', v.contactsList)
            }
            resolve();
          } else {
            v.showToast(res.msg);
          }
        });
      });
    },
    //删除
    deleteItem(e, id) {
      let v = this;
      let index = e.currentTarget.dataset.index;
      if (v.checkSlide()) {
        v.$api.PW_WX_ContactsDelete(id).then(res => {
          // console.log(res)
          if (res.status == 1) {
            v.activeSwiper = -1;
            v.contactsList.splice(index, 1);
            v.showToast(res.msg);
            Session.set('wx_pw_contacts_list', v.contactsList);
            if (v.contactsList == 0) {
              Session.remove('wx_pw_contacts_list');
            }
          } else {
            v.showToast(res.msg);
          }
        })
      }
    },
    /**
     * @添加参观者
     */
    addNewVisitor(e, checkIndex) {
      let v = this;
      let index = null;
      let queryObj = null;
      if (v.infoList.length == 5) {
        Toast('最多能预定5张门票');
        return false;
      } else {
        if (checkIndex == undefined) {
          //一般新增
          queryObj = { type: 1 };
        } else {

          //通过常用联系人新增
          let id = v.contactsList[checkIndex].id;

          //当前勾选常用联系人是否在参观者列表中
          let flag = v.infoList.some(item => {
            return item.card_num == v.contactsList[checkIndex].card_num;
          })
          if (id && flag) {
            //若存在，则通过list中的index找到对应的信息，进行联系人编辑
            index = v.infoList.findIndex(item => {
              return item.card_num == v.contactsList[checkIndex].card_num;
            })
            queryObj = { type: 2, index, id };
          } else if (id) {
            //若不存在，则新增参观者的同时携带id，以防用户编辑常用联系人
            queryObj = { type: 1, id };
          }
        }

        v.$router.push({
          path: '/pw/person/fillinfo',
          query: queryObj
        })
        ModalHelper.beforeClose();
      }
    },
    /**
     * 编辑参观者
     */
    listEdit(index) {
      let v = this;
      let id = null;
      let currentItem = v.contactsList.find(item => {
        return item.card_num == v.infoList[index].card_num;
      })

      //若常用列表误删，则新增
      let editIndex = v.contactsList.findIndex(item => {
        return item.card_num == v.infoList[index].card_num;
      })

      if (currentItem && editIndex != -1) {
        id = currentItem.id;
      }
      //type==2  编辑
      let queryObj = id ? { type: 2, index, id } : { type: 2, index };
      v.$router.push({
        path: '/pw/person/fillinfo',
        query: queryObj
      })
    },
    /**
     * 添加常用联系人
     */
    addContact() {
      let v = this;
      v.$api.PW_WX_ContactsCount().then(res => {
        // console.log(res)
        if (res.status == 1) {
          v.$router.push({
            path: '/pw/person/contact',
            query: {
              type: 1, //新增
            }
          })
          ModalHelper.beforeClose();
        } else {
          v.showToast(res.msg);
        }
      })
    },
    /**
     * @联系人列表编辑
     */
    contactEdit(id) {
      let v = this;
      v.$router.push({
        path: '/pw/person/contact',
        query: {
          type: 2, //编辑
          id
        }
      })
      ModalHelper.beforeClose();
    },
    //编辑或去选票
    skip(targetType, index) {
      let v = this;
      let id, type = 2;
      let in_infolist = 1; //是否存在infolist中  1否   2是
      if (v.checkSlide()) {
        v.activeSwiper = -1;
      } else {
        //
        if (targetType == 'edit') {
          //from  参观者信息列表(编辑时一定存在常用联系人中)
          //参观者是否在常用联系人列表中，若在则可编辑
          //若存在，则可编辑
          let currentItem = v.contactsList.find(item => {
            return item.card_num == v.infoList[index].card_num;
          })

          //若常用列表误删，则新增
          let editIndex = v.contactsList.findIndex(item => {
            return item.card_num == v.infoList[index].card_num;
          })

          if (currentItem && editIndex != -1) {
            id = currentItem.id;
          }

          in_infolist = 2;
        }

        //不管存在与否，常用联系人都可编辑
        if (targetType == 'contact') {
          //from   常用联系人列表
          //
          id = v.contactsList[index].id;
          //查找  常用联系人在预约参观者列表中是否存在
          let flag = v.infoList.some(item => {
            return item.card_num == v.contactsList[index].card_num;
          })
          if (flag) {
            //若存在，则通过list中的index找到对应的信息
            index = v.infoList.findIndex(item => {
              return item.card_num == v.contactsList[index].card_num;
            })
            in_infolist = 2;
          } else {
            in_infolist = 1;
          }
        }
        let queryObj = id ? { type, index, id, in_infolist } : { type, index, in_infolist };
        v.$router.push({
          path: '/pw/person/fillinfo',
          query: queryObj
        })
      }
      ModalHelper.beforeClose();
    },
    modalOpen() {
      let v = this;
      v.showAddModal = true;
    },
    modalClose() {
      let v = this;
      v.showAddModal = false;
    },
    /**
     * @弹出底部常用联系人列表
     */
    openUserListModal() {
      let v = this;
      v.modalOpen();
    },
    /**
     * @单项删除
     */
    delItem(i) {
      let v = this;
      v.infoList.splice(i, 1);
      Session.set('wx_pw_users_info', v.infoList);
      if (v.infoList.length == 0) {
        Session.remove('wx_pw_users_info');
      }
    },
    /**
     * @数据整合
     */
    confirm() {
      let v = this;
      if (v.infoList.length == 0) {
        v.showToast('你还没有添加任何参观者，请至少添加一位参观者。');
        return;
      }

      // if (!v.userPhone) {
      //   v.showToast('*请输入手机号');
      //   return;
      // } else if (!/^1\d{10}$/.test(v.userPhone)) {
      //   v.showToast('*请输入正确手机号');
      //   return;
      // }
      let car_no = v.carNum;
      let submitList = v.infoList.slice(0);

      //--------------------------------------------
      let toi_username = submitList.map(o => {
        return o.username;
      });
      let toi_cardtype_id = submitList.map(o => {
        return o.cardtype_id;
      });
      let toi_card_num = submitList.map(o => {
        return o.card_num;
      });
      let pt_id = submitList.map(o => {
        return o.pt_id;
      });
      // -----------------------------------------------------------------------------------
      let td_tp_id = submitList[0].chose_tickets.find(o => o.ticket_id == 1).td_tp_id; //基础票id

      let td_tp_ids = submitList.map(o => { //可选门票id
        return o.chose_tickets.slice(1).map(item => {
          return item.td_tp_id;
        }).join(',');
      });
      // let submitData = {
      //   toi_username: toi_username, //姓名 ['xxx','xxx']
      //   toi_cardtype_id: toi_cardtype_id, //证件id [1,2]
      //   toi_card_num: toi_card_num, //证件号码  ['12333333','1222222']
      //   pt_id: pt_id, //门票类型id  [1,2]
      //   td_tp_id: td_tp_id, //基础门票id，ticket_id等于1即为基础门票
      //   td_tp_ids: td_tp_ids, //可选门票id['1,2,3','4,5,6']
      //   car_no: car_no,
      // }
      // console.log(submitData)
      // return;
      v.submitReally(toi_username, toi_cardtype_id, toi_card_num, pt_id, td_tp_id, td_tp_ids, car_no);
    },
    /**
     * @提交预约
     */
    submitReally(toi_username, toi_cardtype_id, toi_card_num, pt_id, td_tp_id, td_tp_ids, car_no) {
      let v = this;
      v.$api.PW_WX_TicketOrder(toi_username, toi_cardtype_id, toi_card_num, pt_id, td_tp_id, td_tp_ids, car_no).then(res => {
        // console.log(res)
        if (res.status == 1) {
          let torder_id = res.data.torder_id;
          v.clearCache();
          //res.data.order_status  订单状态，2待付款，3已完成（即免费票）
          if (res.data.order_status == 3) {
            //有且仅有免费票时直接跳转预约成功
            v.$router.replace({ path: '/pw/person/success', query: { 'torder_id': torder_id } });
          } else {
            //去支付
            v.$router.replace({ path: '/pw/person/order_pay', query: { 'torder_id': torder_id } });
          }
        } else {
          v.showToast(res.msg);
        }
      })
    },
    clearCache(cb) {
      let types = ['wx_pw_dateIndex', 'wx_pw_now_date', 'wx_pw_td_tp_id', 'wx_pw_timePeriodIndex', 'wx_pw_time_period', 'wx_pw_tp_list', 'wx_pw_users_info']
      for (let x in types) {
        Session.remove(types[x]);
      }
      "function" === typeof cb && cb();
    },
    showToast(msg) {
      Toast({
        message: msg,
        position: 'center',
        duration: 2000
      });
    },
  },
}

</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';

.fill {
  min-height: calc(100vh - 60px);
  padding-bottom: 120px;
  background-color: #E7E7E7;

  .iconfont {
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: $baseClr;
    vertical-align: middle;

    &.iconjia {
      margin-right: 5px;
    }

    &.iconuser2 {}
  }

  ul.info {
    background-color: #fff;
    padding: 0 15px;

    >li {
      display: flex;
      align-items: center;
      position: relative;
      padding: 15px 0;
      font-size: 15px;
      /*px*/
      font-weight: 400;
      color: #353535;

      &+li {
        border-top: 1px solid #E4E4E4;
        /*no*/
      }

      .p1 {
        position: relative;
        padding-right: 15px;

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
        flex: 1;

        &.disabled {
          color: #ccc;
        }

        input {
          height: 100%;
          width: 100%;
          outline: none;
          border: 0;
          font-size: 14px;
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
    }
  }

  .user__list {
    background-color: #fff;
    // padding: 0 30px;
    padding: 0 15px;
    margin-top: 10px;

    ul {
      li.item {
        padding: 15px 0;

        &+li {
          border-top: 1px solid #F1F1F1;
          /*no*/
        }

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left {
            .name {
              font-size: 17px;
              /*px*/
              line-height: 25px;
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

              &.btn__edit {
                margin-right: 10px;
              }
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

  // 添加参观者
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
      /*px*/
      font-weight: 400;
      color: #B0B0B0;
      transition: all .2s ease-in-out 0s;

      span {
        font-size: 18px;
        /*px*/
        color: $baseClr;
      }

      &:active {
        opacity: .7;
      }

      // &::before {
      //   content: '';
      //   display: inline-block;
      //   width: 18px;
      //   height: 18px;
      //   background: url('../../img/pw/add.png') center center / 100% 100% no-repeat;
      //   margin-right: 5px;
      // }

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
      box-shadow: -2px 0 0px #F2F2F2;

      // .c_icon {
      //   display: block;
      //   width: 18px;
      //   height: 18px;
      //   background: url('../../img/pw/person.png') center center / 100% 100% no-repeat;
      // }

      &:active {
        opacity: .7;
      }
    }
  }

  .user__modal {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 204;
    background-color: #F1F1F1;
    @extend .layout_fixed_x_center;

    .head {
      padding: 13px 20px;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      /*px*/
      font-weight: 400;

      .cancel {
        color: #626262;
      }

      .confirm {
        color: #CC974C;
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
        /*px*/
        color: $baseClr;

        &:active {
          opacity: .7;
        }

        // &::before {
        //   content: '';
        //   display: inline-block;
        //   width: 18px;
        //   height: 18px;
        //   background: url('../../img/pw/add.png') center center / 100% 100% no-repeat;
        //   margin-right: 5px;
        // }
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
              /*px*/
              margin-right: 15px;
              color: #999999;
            }

            .desc {
              .name {
                line-height: 25px;
                font-size: 17px;
                /*px*/
                font-weight: 500;
                color: #282828;
              }

              .type {
                font-size: 14px;
                /*px*/
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
          /*px*/
          color: #fff;
          text-align: center;
          line-height: 55px;
          position: absolute;
          top: 0;
          right: -76px;
        }
      }
    }

    >span {
      width: 100%;

      /deep/ .mint-spinner-triple-bounce {
        width: 100px;
        margin: 20px auto;
        text-align: center;
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
    background-color: #E7E7E7;
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

.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 203;
  @extend .layout_fixed_x_center;
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
