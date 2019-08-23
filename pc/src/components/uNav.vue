<template>
  <div class="usernav">
    <div class="avatar">
      <div class="img">
        <img :src="avatar" alt>
      </div>

      <p>{{phone}}</p>
    </div>
    <ul>
      <li
        v-for="(item,index) in users"
        :key="index"
        :class="['item'+(index>0?index+1:index),{'active':cur==index}]"
        @click="go(item.path,index)"
      >
        <p v-if="index==4">{{member_status==2?'我的会员':item.name}}</p>
        <p v-if="index==5">{{is_vol==1?'我的志愿者':item.name}}</p>
        <p v-if="index!=4&&index!=5">{{item.name}}</p>
        <span></span>
        <span class="num" v-if="index==8&&if_unread>0">{{if_unread}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cur: 0,
      num: "",
      if_unread: "",
      avatar: "",
      phone: "",
      users: [
        {
          name: "个人票务",
          path: "/person"
        },
        // {
        //   name: "团体票务",
        //   path: "/team/info"
        // },
        {
          name: "电影票",
          path: "/umovie"
        },
        {
          name: "活动报名",
          path: "/uactive"
        },
        {
          name: "讲解预约",
          path: "/ureport"
        },
        {
          name: "成为会员",
          path: "/uvip"
        },
        {
          name: "加入志愿者",
          path: "/volunteer/home"
        },
        {
          name: "我的行程单",
          path: "/center"
        },
        {
          name: "我的收藏",
          path: "/favor"
        },
        {
          name: "我的消息",
          path: "/msg"
        },
        {
          name: "账号设置",
          path: "/setting"
        }
      ],
      nickname: localStorage.nickname ? localStorage.nickname : "",
      is_vol: "",
      member_status: ""
    };
  },
  mounted(){
  	alert('000')
  },
  methods: {
    go(path, index) {
      if (index == 5) {
        if (this.is_vol == 1) {
          this.$router.push("/uvol");
          this.cur = index;
          return false;
        }
        this.$router.push(path);
        return false;
      }
      if (index == 4) {
        return false;
        this.cur = index;
        if (this.member_status == 1 || this.member_status == 3) {
          this.$router.push("/vipC");
          return false;
        }
        if (this.member_status == 2) {
          this.$router.push("/vip");
          return false;
        }
      }
      if (path != "/uactive" && path != "/ureport" && path != "/umovie") {
        this.$router.push(path);
      }
    },
    // 获取用户未读消息
    getMsg() {
      this.$api.getMsg().then(res => {
        if (res.status == 1) {
          this.num = res.data.num;
          this.if_unread = res.data.if_unread;
        }
      });
    },
    getUser() {
      this.$api.getUser().then(res => {
        if (res.status == 1) {
          this.avatar = res.data.avatar;
          this.phone = res.data.phone;
          this.is_vol = res.data.is_vol;
          this.member_status = res.data.member_status;
        }
      });
    }
  },
  created() {
    this.getMsg();
    setTimeout(() => {
      this.getUser();
    }, 300);
  },
  mounted() {
    if (this.$route.path == "/vipC" || this.$route.path == "/vip") {
      this.cur = 3;
      return false;
    }
    if (this.$route.path == "/uvol") {
      this.cur = 4;
      return false;
    }
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].path == this.$route.path) {
        this.cur = i;
      }
    }
  },
  mounted() {
    // 锁定右侧按钮的选定状态；
    if (this.$route.path == "/vipC" || this.$route.path == "/vip") {
      this.cur = 4;
      return false;
    }
    if (this.$route.path == "/uvol") {
      this.cur = 5;
    }
    for (let i = 0; i < this.users.length; i++) {
      if (this.$route.path == this.users[i].path) {
        this.cur = i;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.usernav {
  width: 218px;
  margin-right: 10px;
  background: rgba(219, 219, 219, 0.2);
  border: 1px solid rgba(170, 170, 170, 0.2);
}
.avatar {
  padding: 40px 0 0;
  text-align: center;
  min-height: 185px;
  border-bottom: 1px solid #dbdbdb;
}
.avatar .img {
  width: 94px;
  height: 94px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.avatar p {
  width: 80%;
  font-size: 20px;
  color: #000;
  margin: 10px auto 20px;
}
.usernav ul {
  padding: 0;
  margin: 10px 0;
  list-style: none;
}
.usernav li {
  cursor: pointer;
  border-left: 2px solid transparent;
  height: 40px;
  line-height: 40px;
  margin: 10px 0;
  text-align: left;
  padding-left: 90px;
  color: #000;
  font-size: 16px;
  position: relative;
}
.usernav li:hover,
.usernav li.active {
  color: #b47c2d;
  border-color: #b47c2d;
  position: relative;
}
.usernav li p {
  display: inline-block;
  width: 80px;
}
.usernav li span {
  width: 8px;
  height: 10px;
  display: inline-block;
  margin-left: 5px;
  line-height: 40px;
  background: transparent;
}
.usernav li:hover span,
.usernav li.active span {
  background: url(../img/unav/right.png) no-repeat;
  background-size: cover;
}
.item0:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item0.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item0:hover:after,
.item0.active:after {
  background: url(../img/unav/item0_c.png) no-repeat;
  background-size: cover;
}
.item1:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item1.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item1:hover:after,
.item1.active:after {
  background: url(../img/unav/item1_c.png) no-repeat;
  background-size: cover;
}
.item2:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item2.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item2:hover:after,
.item2.active:after {
  background: url(../img/unav/item2_c.png) no-repeat;
  background-size: cover;
}
.item3:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item3.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item3:hover:after,
.item3.active:after {
  background: url(../img/unav/item3_c.png) no-repeat;
  background-size: cover;
}
.item4:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item4.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item4:hover:after,
.item4.active:after {
  background: url(../img/unav/item4_c.png) no-repeat;
  background-size: cover;
}
.item5:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item5.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item5:hover:after,
.item5.active:after {
  background: url(../img/unav/item5_c.png) no-repeat;
  background-size: cover;
}
.item6:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item6.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item6:hover:after,
.item6.active:after {
  background: url(../img/unav/item6_c.png) no-repeat;
  background-size: cover;
}
.item7:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item7.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item7:hover:after,
.item7.active:after {
  background: url(../img/unav/item7_c.png) no-repeat;
  background-size: cover;
}
.item8:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item8.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item8:hover:after,
.item8.active:after {
  background: url(../img/unav/item8_c.png) no-repeat;
  background-size: cover;
}
.item9:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item9.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item9:hover:after,
.item9.active:after {
  background: url(../img/unav/item9_c.png) no-repeat;
  background-size: cover;
}
.item10:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../img/unav/item10.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item10:hover:after,
.item10.active:after {
  background: url(../img/unav/item10_c.png) no-repeat;
  background-size: cover;
}
.usernav li span.num {
  background: #f34040;
  position: absolute;
  top: 5px;
  right: 51px;
  font-size: 12px;
  color: #fff;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  text-align: center;
  line-height: 14px;
}
</style>