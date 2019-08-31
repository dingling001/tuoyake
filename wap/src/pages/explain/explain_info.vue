<template>
  <div class="fill">
    <ul class="info">
      <li>
        <span class="p1">参观时间</span>
        <span class="p2" v-if=" visit.date&& visit.time">{{visit.date}}  {{visit.time}}</span>
        <span class="time_pick" v-else>
        <router-link tag="span" class="p2" to="/explain" replace>选择日期</router-link>
        <span class="iconfont iconyou"></span>
          </span>
      </li>
      <li>
        <span class="p1 need">手机号码</span>
        <span class="p2"><input type="number" placeholder="请输入手机号码" v-model="contact_phone"></span>
      </li>
      <li>
        <span class="p1 need">参观人数</span>
        <span class="p2"><input type="number" placeholder="请输入参观人数" v-model="people_num"
                                @input="people_fn"></span>
      </li>
      <li @click="language_show=true" class="language_p2">
        <span class="p1 need">选择语种</span>
        <div class="p2">
          <div>{{language_text}}</div>
          <span class="iconfont iconyou"></span>
        </div>
      </li>
      <li @click="guide_num_show=true" class="language_p2">
        <span class="p1 need">讲解员</span>
        <div class="p2 guide">
          <div>{{guide_value}}位</div>
          <span class="iconfont iconyou"></span></div>
      </li>
      <li class="language_p2">
        <div class="p1 need">讲解展厅</div>
      </li>
      <li class="exhibition_box">
        <ul>
          <li @click="selectAll" :class="{'lidisable':alldisabled}"><span class="left"><span
            :class="['iconfont',checkall?'iconcheckbox':'iconweixuanzhong']"></span>通讲</span>
            <span>￥{{parseFloat(guide_cost_person_cn).toFixed(2)}}</span></li>
          <li v-for="(i,index) in exhibion_cost_data" @click="selectEX(index,i.select)"
              :class="{'lidisable':i.disable}">
            <span class="left"><span
              :class="['iconfont',i.select?'iconcheckbox ':'iconweixuanzhong' ]"></span>{{i.exhition_name}}</span>
            <span v-if="language_id==1">￥ {{parseFloat(i.guide_cost.person_cn_exhition).toFixed(2)}}</span>
            <span v-else-if="language_id==2">￥ {{parseFloat(i.guide_cost.person_en_exhition).toFixed(2)}}</span>
          </li>
        </ul>
        <div class="totalbox ">费用：{{parseFloat(totalcost).toFixed(2)}}</div>
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
            <div class="right">
              <!--<img class="btn__edit" src="../../img/pw/edit.png" @click="listEdit(ai)">-->
              <img class="btn__del" src="../../img/pw/del.png" @click="delItem()">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="add" v-if="show_add">
      <div class="add__btn " @click="addContact"><span><i
        class="iconfont iconjia "></i> 添加联系人</span></div>
      <div class="contacts_btn" @click="openUserListModal"><span class="iconfont iconuser2 "></span></div>
    </div>
    <div class="notice" v-html="guide_info.text_guide">
      <!--      讲解员须知：每位讲解员收费{{guide_info.guide_cost}}元/人，每位讲解员最多可带{{guide_person_allownum}}人团队，请合理选择讲解员数量-->
    </div>
    <transition name="fade">
      <div class="cover" v-show="showAddModal" @click="showAddModal=!showAddModal" @touchmove.prevent></div>
    </transition>
    <transition name="slid_up">
      <div class="user__modal" v-show="showAddModal">
        <div class="head">
          <span class="cancel" @click="modalClose">取消</span>
          <!-- <span class="confirm" @click="addNewVisitor($event,checkIndex)">确定</span> -->
        </div>
        <div class="user__modal__add">
          <div class="user__modal__add--btn " @click="addContact"><i
            class="iconfont iconjia "></i> 新增常用联系人
          </div>
        </div>
        <ul class="list">
          <li class="list__item" v-for="(b,bi) in contactsList" :key="bi"
              :data-type="activeSwiper == bi ? 1 : 0">
            <div class="box" @touchstart.capture="touchStart" :data-index="bi" @touchmove.capture="touchmove"
                 @touchend.capture="touchEnd"
                 @click="addNewVisitor($event,bi)">
              <div class="cont">
                <span class="iconfont iconbianji" @click.stop="contactEdit(b.id,bi)"></span>
                <div class="desc">
                  <p class="name">{{b.name}}</p>
                  <p class="type">{{b.card_type}} {{b.card_num}}</p>
                </div>
              </div>
              <div class="arrow_r"></div>
            </div>
            <div class="delete" @click="deleteItem($event,b.id)" :data-index="bi">删除</div>
          </li>
        </ul>
      </div>
    </transition>
    <div class="bottom">
      <div class="submit" @click="confirm">确认</div>
    </div>
    <mt-popup
      v-model="language_show"
      position="bottom">
      <mt-picker :slots="language" @change="onValuesChange" ref="language" :visibleItemCount='3' showToolbar
                 value-key="language_name">
        <Slot>
          <div class="slot_top"><span @click="language_show=false">取消</span><span
            @click="language_show=false">确定</span></div>
        </Slot>
      </mt-picker>
    </mt-popup>
    <mt-popup
      v-model="guide_num_show"
      position="bottom">
      <mt-picker :slots="guide_num" @change="onguideChange" ref="guide_num" :visibleItemCount='3' showToolbar>
        <Slot>
          <div class="slot_top"><span @click="guide_num_show=false">取消</span><span
            @click="guide_num_show=false">确定</span></div>
        </Slot>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import {Toast, Indicator} from 'mint-ui';
  import {Session, ModalHelper} from '@/assets/js/utils.js';
  import U from '@/bin/common'

  export default {
    name: 'explain_info',
    data() {
      return {
        visit: {
          date: Session.get('wx_explain_now_date') || '',
          time: Session.get('wx_explain_time_period') || '',
        },
        gd_tp_id: Session.get('wx_explain_gd_tp_id') || '', //时段id
        showAddModal: false,
        curIndex: 0,
        ischecked: false,
        startX: 0,
        endX: 0,
        activeSwiper: -1, //当前活动的滑块（1删除按钮显示状态）
        infoList: Session.get('infoList') || {},
        chooseids: [],
        contact_phone: Session.get('contact_phone') || '',
        people_num: Session.get('people_num') || '',
        contactsList: [], //常用联系人列表
        checkList: [], //勾选参观者列表
        choosedList: [], //确认选择列表
        language: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        language_show: false,
        language_init: false,
        language_text: '',
        language_id: '',
        guide_num_show: false,
        guide_init: false,
        guide_num: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: 0,
            value: ""
          }
        ],
        guide_value: 0,
        guide_info: {},
        show_add: true,
        guide_person_allownum: 0,
        guide_cost_person_cn: 0,
        exhibion_cost_data: [],
        totalcost: 0,
        checkall: false,
        alldisabled: false
      }
    },
    created() {
      // Toast('Upload Complete');
      this.getGuideDetail();
      this.getContactsList();
      if (Session.get('infoList')) {
        this.show_add = false;
      }
    },
    beforeRouteLeave(to, from, next) {
      Session.set('contact_phone', this.contact_phone);
      Session.set('people_num', this.people_num);
      next()
    },
    components: {},
    methods: {
      // 获取基本信息
      getGuideDetail() {
        Indicator.open({
          text: "加载中...",
          spinnerType: 'snake'
        });
        let v = this;
        v.$api.GuideDetail().then((res) => {
          Indicator.close();
          // console.log(res)
          this.guide_info = res.data;
          this.guide_person_allownum = res.data.guide_person_allownum;
          this.guide_cost_person_cn = parseFloat(res.data.guide_cost_person_cn).toFixed(2);
          this.language[0].values = res.data.language;
          let guid_num = [];
          for (let i = 0; i < res.data.guide_num_max; i++) {
            guid_num.push(i + 1)
          }
          this.guide_num[0].values = guid_num;
          for (var j in  res.data.exhibion_cost_data) {
            this.$set(res.data.exhibion_cost_data[j], 'select', false);
            this.$set(res.data.exhibion_cost_data[j], 'disable', false)
          }
          this.exhibion_cost_data = Session.get('list') || res.data.exhibion_cost_data;
          this.alldisabled = this.exhibion_cost_data.some(res => res.select);
          if (Session.get('checkall')) {
            this.checkall = Session.get('checkall');
            if (this.checkall) {
              for (var f in  this.exhibion_cost_data) {
                this.$set(this.exhibion_cost_data[f], 'disable', true);
              }
            }
          }
          this.totalPrice();
        })

      },
      //获取联系人列表
      getContactsList() {
        let v = this;
        v.$api.PW_WX_ContactsList().then((res) => {
          if (res.status == 1) {
            v.contactsList = res.data;
            Session.set('wx_explain_contacts_list', v.contactsList);
          }
          // console.log(v.contactsList)
        })
      },
      // 选择全部展厅
      selectAll() {
        if (this.alldisabled) return;
        if (this.checkall) {
          this.checkall = false;
          if (this.language_id == 1) {
            for (var i in  this.exhibion_cost_data) {
              this.$set(this.exhibion_cost_data[i], 'select', false);
              this.$set(this.exhibion_cost_data[i], 'disable', false);
            }
          } else {
            this.showToast('小语种请到现场预约')
          }
        } else {
          this.checkall = true;
          if (this.language_id == 1) {
            for (var i in  this.exhibion_cost_data) {
              this.$set(this.exhibion_cost_data[i], 'select', false)
              this.$set(this.exhibion_cost_data[i], 'disable', true);
            }
          } else {
            this.showToast('小语种请到现场预约')
          }
        }
        Session.set('checkall', this.checkall);
        this.totalPrice();
      },
      // 选择单个展厅
      selectEX(index, select) {
        if (this.exhibion_cost_data[index].disable) return;
        this.checkall = false;
        this.alldisabled = true;
        if (select) {
          this.$set(this.exhibion_cost_data[index], 'select', false)
        } else {
          this.$set(this.exhibion_cost_data[index], 'select', true)
        }
        Session.set('list', this.exhibion_cost_data);
        var checkall = this.exhibion_cost_data.every((item) => item.select == false);
        this.alldisabled = !checkall;

        this.totalPrice();
      },
      // 计算总价
      totalPrice() {
        this.totalcost = 0;
        for (var i in this.exhibion_cost_data) {
          if (this.language_id == 1) {
            if (this.checkall) {
              this.totalcost = this.guide_info.guide_cost_person_cn * this.guide_value;
            } else {
              if (this.exhibion_cost_data[i].select) {
                this.totalcost += this.exhibion_cost_data[i].guide_cost.person_cn_exhition * this.guide_value;
              }
            }
          } else if (this.language_id == 2) {
            if (this.checkall) {
              this.totalcost = this.guide_info.guide_cost_person_en * this.guide_value;
            } else {
              if (this.exhibion_cost_data[i].select) {
                this.totalcost += this.exhibion_cost_data[i].guide_cost.person_en_exhition * this.guide_value;
              }
            }
          }
        }
      },
      modalOpen() {
        let v = this;
        v.showAddModal = true;
      },
      modalClose() {
        let v = this;
        v.showAddModal = false;
      },
      // 监听输入人数
      people_fn() {
        let guide_value = Number(this.guide_value);
        for (let i = 1; i < this.guide_num[0].values.length + 1; i++) {
          if (i == guide_value) {
            if (this.people_num > i * this.guide_person_allownum) {
              this.showToast('每位讲解员最多携带' + this.guide_person_allownum + '人');
              this.people_num = i * this.guide_person_allownum;
            }
          }
        }
      },
      // 删除添加的联系人
      delItem() {
        this.infoList = {}
        this.show_add = true;
        Session.remove('infoList');
      },
      //联系人列表编辑
      contactEdit(id, index) {
        let v = this;
        v.$router.push({
          path: '/explain/explain_contact',
          query: {
            type: 2, //编辑
            id,
            index
          }
        })
        ModalHelper.beforeClose();
      },
      // 新增联系人
      addContact() {
        let v = this;
        v.$router.push({
          path: '/explain/explain_fillinfo',
          query: {
            type: 1, //新增
          }
        })
        ModalHelper.beforeClose();
      },
      // 选择语言
      onValuesChange(picker, values) {
        if (this.language_init) {
          this.language_text = values[0].language_name;
          this.language_id = values[0].language_id;
          if (this.language_id == 2) {
            this.guide_cost_person_cn = this.guide_info.guide_cost_person_en
            for (var i in this.exhibion_cost_data) {
              this.exhibion_cost_data[i].disable = true;
              this.$set(this.exhibion_cost_data[i], 'select', false);
            }
          } else if (this.language_id == 1) {
            this.guide_cost_person_cn = this.guide_info.guide_cost_person_cn
            for (var i in this.exhibion_cost_data) {
              this.exhibion_cost_data[i].disable = false;
            }
          }
          this.checkall = Session.get('checkall') || false;
          if (this.checkall) {
            for (var f in  this.exhibion_cost_data) {
              this.$set(this.exhibion_cost_data[f], 'disable', true);
            }
          }
          this.totalPrice()
        } else {
          this.language_init = true;
        }
      },
      // 选择讲解员
      onguideChange(picker, values) {
        if (this.guide_init) {
          this.guide_value = values[0];
          let people_num = Number(this.people_num);
          for (let i = 1; i < this.guide_num[0].values.length + 1; i++) {
            if (this.guide_value == i) {
              if (people_num > i * this.guide_person_allownum) {
                this.showToast('每位讲解员最多携带' + this.guide_person_allownum + '人');
                this.people_num = i * this.guide_person_allownum;
              }
            }
          }
          this.totalPrice();
        } else {
          this.guide_init = true;
        }
      },
      //滑动开始
      touchStart(e) {
        this.startX = e.touches[0].clientX;
      },
      touchmove(e) {
        e.stopPropagation();
      },
      //滑动结束
      touchEnd(e) {
        this.endX = e.changedTouches[0].clientX;
        if (this.startX - this.endX > 30) {
          this.activeSwiper = e.currentTarget.dataset.index;
        }
        if (this.startX - this.endX < -30) {
          this.activeSwiper = -1;
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide() {
        return this.activeSwiper > -1;
      },
      //删除
      deleteItem(e, id) {
        let index = e.currentTarget.dataset.index;

        // this.contactsList.splice(index, 1);
        let v = this;
        if (v.checkSlide()) {
          v.$api.PW_WX_ContactsDelete(id).then(res => {
            console.log(res)
            if (res.status == 1) {
              v.activeSwiper = -1;
              v.contactsList.splice(index, 1);
              v.showToast(res.msg);
              Session.set('wx_explain_contacts_list', v.contactsList);
              if (v.contactsList == 0) {
                Session.remove('wx_explain_contacts_list');
              }
            } else {
              v.showToast(res.msg);
            }
          })
        }
      },
      openUserListModal() {
        let v = this;
        if (this.contactsList.length < 1) {
          Toast('暂无常用联系人')
        } else {
          v.getContactsList();
          v.showAddModal = true;
        }
      },
      // 选择联系人
      addNewVisitor(e, index) {
        this.infoList = this.contactsList[index];
        Session.set('infoList', this.infoList);
        this.modalClose();
        this.show_add = false;
      },
      // 预约
      confirm() {
        if (!U.checkPhone(this.contact_phone)) {
          this.showToast('请输入正确的手机号')
        } else if (this.people_num == 0) {
          this.showToast('请填写参观人数')
        } else if (this.totalcost == 0) {
          this.showToast('请选择讲解展厅')
        } else if (Object.keys(this.infoList).length == 0) {
          this.showToast('请添加联系人')
        } else {
          var exhibition_ids = [];
          if (!this.checkall) {
            for (var i in this.exhibion_cost_data) {
              if (this.exhibion_cost_data[i].select) {
                exhibition_ids.push(this.exhibion_cost_data[i].exhition_id);
              }
            }
          }
          let explain_post = {
            exhibition_ids: this.checkall ? 0 : exhibition_ids.toString(),
            gd_tp_id: this.gd_tp_id,
            go_username: this.infoList.name,
            go_cardtype_id: this.infoList.card_type_id,
            go_card_num: this.infoList.card_num,
            contact_phone: this.contact_phone,
            people_num: this.people_num,
            language_id: this.language_id,
            language_text: this.language_text,
            guide_num: this.guide_value
          };
          this.confirm_fn(explain_post)
          // localStorage.setItem('explain_post', JSON.stringify(post));
          // this.$router.push({path: '/explain/explain_confirm'})
        }
      },
      // 预约
      confirm_fn(explain_post) {
        Indicator.open({
          text: "预约中...",
          spinnerType: 'snake'
        });
        this.$api.PostGuideOrder(
          explain_post.exhibition_ids,
          explain_post.gd_tp_id,
          explain_post.go_username,
          explain_post.go_cardtype_id,
          explain_post.go_card_num,
          explain_post.contact_phone,
          explain_post.people_num,
          explain_post.language_id,
          explain_post.guide_num,
        ).then(res => {
          if (res.status == 1) {
            Session.remove('wx_explain_gd_tp_id');
            Session.remove('wx_explain_now_date');
            Session.remove('wx_explain_dateIndex');
            Session.remove('wx_explain_time_period');
            Session.remove('wx_explain_tp_id');
            Session.remove('infoList');
            Session.remove('wx_explain_tp_list');
            Session.remove('wx_explain_timePeriodIndex');
            Session.remove('people_num');
            Session.remove('contact_phone');
            Session.remove('checkall');
            Session.remove('list');
            this.$router.replace({path: '/explain/explain_pay', query: {gorder_id: res.data.gorder_id}})
          } else {
            Toast(res.msg);
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
  $h: 60px;
  .fill {
    min-height: calc(100vh - #{$h});
    background-color: #F2F2F2;
    padding: 0 0 50px 0;

    .iconfont {
      display: inline-block;
      /*width: 18px;*/
      /*height: 18px;*/
      font-size: 20px;
      /*px*/
      color: $baseClr;

      &.iconjia {
        margin-right: 5px;
      }

      &.iconuser2 {
      }
    }

    ul.info {
      padding: 0 15px;
      background-color: #fff;

      > li {
        padding: 15px 0;
        font-size: 15px;
        /*px*/
        font-weight: 400;
        color: #353535;
        display: flex;

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

        .time_pick {
          display: inline-flex;
          flex: 1;
          justify-content: space-between;
          padding: 0 0 0 30px;
          font-size: 14px;
          /*px*/
          color: red;
          font-weight: bold;
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

      .exhibition_box {
        border: 0;
        padding: 0;
        display: block;
        min-height: 200px;

        ul {
          margin: 0 35px;

          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            /*px*/
            color: #353535;
            padding: 14px 0 0 0;

            &.lidisable {
              color: #b2b2b2;
            }

            .left {
              display: flex;
              align-items: center;

              .iconfont {
                font-size: 18px;
                /*  px*/
                margin-right: 10px;
                transition: .3s ease-in-out;
              }

              .iconcheckbox {
                color: $baseClr;
              }

            }

            &:first-child {
              padding: 0 0 14px 0;
              border-bottom: 1px solid rgba(181, 181, 181, .5);
              /*  no*/
            }

            &:last-child {
              padding: 14px 0;
              border-bottom: 1px solid rgba(181, 181, 181, .5);
              /*  no*/
            }
          }
        }

        .totalbox {
          text-align: right;
          padding: 14px 40px;
          font-size: 12px;
          /*  px*/
          color: #E1544D;
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

        /*&::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 18px;
          background: url('../../img/pw/add.png') center center / 100% 100% no-repeat;
          margin-right: 5px;
        }*/
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
          //background: url('../../img/pw/person.png') center center / 100% 100% no-repeat
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

          // &::before {
          // content: '';
          //  display: inline-block;
          //width: 18px;
          //height: 18px;
          //background: url('../../img/pw/add.png') center center / 100% 100% no-repeat;
          //margin-right: 5px;
          /*}*/
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
      /*position: fixed;*/
      /*bottom: 0;*/
      /*left: 0;*/
      /*width: 100%;*/
      margin-top: calc(10% - #{10px});
      display: flex;
      justify-content: center;
      /*padding: 20px;*/
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
