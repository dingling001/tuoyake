<template>
  <div class="user">
    <div class="user-top">
      <div class="img">
        <img :src="avatar" v-if="avatar" class="img" />
      </div>

      <p>{{phone}}</p>
    </div>
    <div class="msg-wrapper">
      <div class="item" @click="goTra">
        <span :class="{'active':status==1}">{{count}}</span>
        <h4>行程单</h4>
      </div>
      <div class="item" @click="goFav">
        <span v-if="fav>=0" :class="{'active':fav>favs}">{{fav}}</span>
        <h4>我的收藏</h4>
      </div>
      <div class="item" @click="goMsg">
        <span :class="{'active':if_unread>0}">{{msg}}</span>
        <h4>消息</h4>
      </div>
    </div>
    <div class="member" v-if="member_status!=2" @click="goRemeber">
      <h4>会员中心</h4>
      <p>加入即可享受更多会员权益</p>
    </div>
    <div class="mem" v-if="member_status==2" @click="goVip">
      <h4>个人会员</h4>
      <p>您可以享受个人会员的全部权益</p>
    </div>
    <ul class="menus">
      <li v-for="(item,index) in menus" :key="index" @click="go(item)">
        {{item.name}}
        <i class="iconfont iconfanhui1"></i>
      </li>
    </ul>
    <div class="btn-wrapper">
      <div class="btn" @click="layout">退出登录</div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "center",
  data() {
    return {
      avatar: "",
      phone: "",
      count: 0,
      if_unread: 0,
      fav: 0,
      favs: localStorage.favs || 0,
      cs: localStorage.collections,
      msg: 0,
      member_status: 0,
      status: 0,
      menus: [
        { name: "志愿者", path: "/uvol" },
        { name: "个人票务", path: "/pw/person/order_list" },

        // { name: "电影票", path: "/yingyuan" },
        { name: "电影票", path: "/umovie" },

        { name: "活动报名", path: "/active/orderrecord" },
        { name: "讲解预约", path: "/jiangjie" }
      ]
    };
  },
  methods: {
    getUser() {
      this.$api.getUser().then(res => {
        if (res.status == 1) {
          this.avatar = res.data.avatar;
          this.phone = res.data.phone;
          this.member_status = res.data.member_status;
        } else {
          localStorage.clear();
          this.$router.replace("/");
        }
      });
    },
    go(item) {
      const v = this;
      if (item.name == "志愿者") {
        this.$router.push({
          path: "/volunteer/wxvolloading",
          query: { vol: "uvol" }
        });
      } else {
        if (item.path == "/pw/person/order_list") {
          v.$router.push(item.path);
        }
        v.$router.push(item.path);
      }
    },
    layout() {
      let api_token = localStorage.app_token;
      localStorage.clear();
      Toast("退出成功");
      setTimeout(() => {
        this.$router.replace("/");
      }, 500);
      this.$api.layout(api_token).then(res => {});
      return false;
    },
    goTra() {
      this.$router.push("/travel");
    },
    goFav() {
      this.$router.push("/fav");
    },
    goMsg() {
      this.$router.push("/msg");
    },
    goVip() {
      this.$router.push("/huiyuan");
      //this.$router.push("/vipS");
    },
    goRemeber() {
      // if (this.member_status == 0) {
      //   this.$router.push("/vip");
      //   return false;
      // }
      // if (this.member_status == 1 || this.member_status == 3) {
      //   this.$router.push("/vipC");
      // }
      this.$router.push("/huiyuan");
    },
    getMsg() {
      this.$api.getMsg().then(res => {
        if (res.status == 1) {
          this.msg = res.data.num;
          this.if_unread = res.data.if_unread;
        }
      });
    },
    getCollection() {
      this.$api.getStatus().then(res => {
        if (res.status == 1) {
          this.count = res.data.exhibit_count;
          this.status = res.data.status;
        }
      });
    },
    getFavor() {
      this.$api.getFavor().then(res => {
        this.fav = res.data.length;
        this.favs = res.data.length;
        localStorage.fav = res.data.length;
      });
    }
  },
  mounted() {
    this.getUser();
    this.getMsg();
    this.getFavor();
    this.getCollection();
  }
};
</script>
<style scoped>
.user {
  width: 100%;
}
.user-top {
  width: 80%;
  margin: 20px auto;
  min-height: 94px;
}
.user-top .img {
  width: 60px;
  height: 60px;
  margin: 10px auto;
  border-radius: 50%;
  background: #f5f5f5;
  display: block;
}
.user span {
  min-height: 30px;
}
.user-top p {
  text-align: center;
  font-size: 24px;
  color: #000;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.msg-wrapper {
  width: 80%;
  margin: 10px auto 20px;
  display: flex;
}
.msg-wrapper .item {
  flex: 1;
  text-align: center;
  font-size: 30px;
  color: #000;
}
.item h4 {
  font-size: 14px;
  margin-top: 10px;
  color: #9b9b9b;
}
.item span.active {
  position: relative;
}
span.active:after {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  right: -3px;
  background: #f54e4e;
}
.member {
  margin: 0 20px;
  height: 100px;
  padding: 10px 50px 0;
  background: url(../.././img/user/remeber.png) no-repeat;
  background-size: contain;
  color: #fff;
  position: relative;
}
.mem {
  margin: 0 20px;
  height: 100px;
  padding: 10px 30px 0;
  background: url(../.././img/user/v.png) no-repeat;
  background-size: contain;
  color: #fff;
  position: relative;
}
.mem h4 {
  font-size: 24px;
  margin: 10px 0;
}
.member:after {
  content: "加入";
  width: 43px;
  height: 36.5px;
  background: rgba(255, 199, 120, 1);
  border-radius: 0px 0px 21.5px 21.5px;
  color: #a8660a;
  font-size: 14px;
  position: absolute;
  top: 0;
  right: 30px;
  text-align: center;
  line-height: 36.5px;
}
.member h4 {
  font-size: 22px;
  margin-top: 10px;
}
.member p {
  font-size: 12px;
  margin-top: 10px;
}
.menus {
  margin: 25px 20px 0;
}

.menus li {
  width: 100%;
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #dcdcdc;
  font-size: 16px;
  color: #000;
}
.menus li:last-child {
  border-bottom: 0 none;
}
.menus a {
  display: block;
  height: 56px;
  line-height: 56px;
}
.menus i {
  float: right;
}
.btn-wrapper {
  padding: 10px 0;
  background: #f2f2f2;
}
.btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #000;
  background: #fff;
}
</style>
