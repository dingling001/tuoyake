<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a>
        »
        <a href="/center">个人中心</a>
      </div>
    </div>

    <div class="container">
      <div class="top"></div>
      <div class="user-main">
        <div class="usernav">
          <div class="avatar">
            <div class="img">
              <img :src="avatar" alt />
            </div>

            <p>{{phone}}</p>
          </div>
          <ul v-if="users.length>0">
            <li
              v-for="(item,index) in users"
              :key="index"
              :class="[{'active':cur==index}]"
              @click="go(item.path,index)"
            >
              <p v-if="index==4&&is_team!=1">{{member_status==2?'我的会员':item.name}}</p>
              <p v-if="index==4&&is_team==1">{{member_status==2?'我的会员':item.name}}</p>
              <p v-if="index==3&&is_team==0">{{is_vol==1?'我的志愿者':item.name}}</p>
              <p v-if="index==3&&is_team==1">{{is_vol==1?'我的志愿者':item.name}}</p>
              <p v-if="is_team!=1&&index!=3&&index!=4">{{item.name}}</p>
              <p v-if="is_team==1&&index!=3&&index!=4">{{item.name}}</p>
              <span></span>
              <span class="num" v-if="index==5&&if_unread>0">{{if_unread}}</span>
            </li>
          </ul>
        </div>
        <!-- 右侧部分 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import uNav from "../.././components/uNav";
export default {
  name: "center",
  data() {
    return {
      travels: [],
      my_trip: [],
      list: [],
      cur: -1,
      order_data: [],
      un_look_num: 0, //影院行程单总数，
      exhibiton_count: 0, // 行程单展品总数
      cur: 0,
      num: "",
      if_unread: "",
      is_team: 0,
      avatar: "",
      phone: "",
      users: [],
      navs: [
        {
          name: "我的行程单",
          path: "/center"
        },
        {
          name: "个人票务",
          path: "/person"
        },
        // {
        //   name: "电影票",
        //   path: "/umovie"
        // },
        {
          name: "活动报名",
          path: "/uactive"
        },
        // {
        //   name: "讲解预约",
        //   path: "/ureport"
        // },
        // {
        //   name: "成为会员",
        //   path: "/uvip"
        // },
        {
          name: "加入志愿者",
          path: "/uv"
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
      menus: [
        {
          name: "我的行程单",
          path: "/center"
        },
        {
          name: "个人票务",
          path: "/person"
        },
        // {
        //   name: "团体票务",
        //   path: "/team/info"
        // },
        // {
        //   name: "电影票",
        //   path: "/umovie"
        // },
        {
          name: "活动报名",
          path: "/uactive"
        },
        // {
        //   name: "讲解预约",
        //   path: "/ureport"
        // },
        // {
        //   name: "成为会员",
        //   path: "/uvip"
        // },
        {
          name: "加入志愿者",
          path: "/uv"
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
      member_status: "",
      curPath: ""
    };
  },
  components: {
    uNav
  },
  watch: {
    $route(to, form) {
      this.curPath = to.path;
      this.getUser();
    }
  },
  created() {
    this.getMsg();
  },
  mounted() {
    // 锁定右侧按钮的选定状态；
    if (this.$route.path == "/vipC" || this.$route.path == "/vip") {
      this.cur = this.is_item == 1 ? 4 : 3;
      return false;
    }
    if (this.$route.path == "/uvol") {
      this.cur = this.is_item == 1 ? 3 : 2;
    }
    if (this.$route.path == "/uv") {
      this.cur = this.is_item == 1 ? 3 : 2;
    }
    if (this.$route.path == "/team/record") {
      this.cur = 1;
    }
    if (this.curPath != this.$route.path) {
      setTimeout(() => {
        this.getUser();
      }, 300);
    }
  },
  methods: {
    go(path, index) {
      if (index == 3) {
        if (this.is_vol == 1) {
          this.$router.push("/uvol");
          this.cur = index;
          return false;
        }
        this.$router.push(path);
        return false;
      }
      if (index == 9) {
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
      if (path != "/ureport") {
        this.$router.push(path);
        this.cur = index;
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
          this.is_team = res.data.is_team;
          if (this.is_team == 0) {
            this.users = this.navs;
            for (let i = 0; i < this.users.length; i++) {
              if (this.$route.path == this.users[i].path) {
                this.cur = i;
              }
            }
          } else {
            this.users = this.menus;
            for (let i = 0; i < this.users.length; i++) {
              if (this.$route.path == this.users[i].path) {
                this.cur = i;
              }
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 60px;
  line-height: 60px;
  .topbar {
    width: 1200px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    color: #000;
    font-size: 18px;
  }
  .topbar a {
    text-decoration: none;
    color: #000;
    margin: 0 4px;
  }
  .topbar a:hover {
    color: #b47c2d;
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
}

.top {
  width: 100%;
  height: 172px;
  background: url(../.././img/u_t.png) no-repeat;
  background-size: cover;
}
.user-main {
  margin-top: 30px;
  border-top: 1px solid #b47c2d;
  padding: 20px 0;
  display: flex;
}
.usernav {
  width: 218px;
  margin-right: 10px;
  background: rgba(219, 219, 219, 0.2);
  border: 1px solid rgba(170, 170, 170, 0.2);
}
.usernav {
  width: 218px;
  margin-right: 10px;
  min-height: 510px;
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
  height: 40px;
  line-height: 40px;
  margin: 10px 0;
  text-align: left;
  text-align: center;
  color: #000;
  font-size: 18px;
  position: relative;
}
.usernav li:hover,
.usernav li.active {
  color: #b47c2d;

  position: relative;
  &::after {
    content: "";
    width: 2px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 0;
    background: #b47c2d;
  }
}
.usernav li p {
  display: inline-block;
  width: 100%;
}
.usernav li span {
  width: 8px;
  height: 10px;
  display: inline-block;
  margin-left: 5px;
  line-height: 40px;
  background: transparent;
  position: absolute;
  top: 50%;
  right: 27px;
  transform: translateY(-50%);
}
.usernav li:hover {
  &::after {
    content: "";
    width: 2px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 0;
    background: #b47c2d;
  }
}
.usernav li:hover span,
.usernav li.active span {
  background: url(../.././img/unav/right.png) no-repeat;
  background-size: cover;
}
.item0:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item0.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item0:hover:after,
.item0.active:after {
  background: url(../.././img/unav/item0_c.png) no-repeat;
  background-size: cover;
}
.item1:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item1.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item1:hover:after,
.item1.active:after {
  background: url(../.././img/unav/item1_c.png) no-repeat;
  background-size: cover;
}
.item2:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item2.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item2:hover:after,
.item2.active:after {
  background: url(../.././img/unav/item2_c.png) no-repeat;
  background-size: cover;
}
.item3:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item3.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item3:hover:after,
.item3.active:after {
  background: url(../.././img/unav/item3_c.png) no-repeat;
  background-size: cover;
}
.item4:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item4.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item4:hover:after,
.item4.active:after {
  background: url(../.././img/unav/item4_c.png) no-repeat;
  background-size: cover;
}
.item5:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item5.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item5:hover:after,
.item5.active:after {
  background: url(../.././img/unav/item5_c.png) no-repeat;
  background-size: cover;
}
.item6:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item6.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item6:hover:after,
.item6.active:after {
  background: url(../.././img/unav/item6_c.png) no-repeat;
  background-size: cover;
}
.item7:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item7.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item7:hover:after,
.item7.active:after {
  background: url(../.././img/unav/item7_c.png) no-repeat;
  background-size: cover;
}
.item8:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item8.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item8:hover:after,
.item8.active:after {
  background: url(../.././img/unav/item8_c.png) no-repeat;
  background-size: cover;
}
.item9:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item9.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item9:hover:after,
.item9.active:after {
  background: url(../.././img/unav/item9_c.png) no-repeat;
  background-size: cover;
}
.item10:after {
  content: "";
  width: 30px;
  height: 30px;
  background: url(../.././img/unav/item10.png) no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 46px;
  margin-top: -15px;
  cursor: pointer;
}
.item10:hover:after,
.item10.active:after {
  background: url(../.././img/unav/item10_c.png) no-repeat;
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
.user-r {
  flex: 1;
  padding-left: 11px;
  h3.travel-title {
    height: 60px;
    line-height: 60px;
    background: #fbf8f4;
    border-bottom: 2px solid #b47c2d;
    font-size: 18px;
    color: #b47c2d;
    padding: 0 30px;
    font-weight: 400;
    overflow: hidden;
    .num {
      display: inline-block;
      margin: 0 3px;
    }
    span.time {
      float: right;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
.ticket {
  padding-top: 20px;
}
.item {
  position: relative;
  padding: 0 30px 0 60px;
  font-size: 20px;
  .item-slide {
    border-bottom: 1px solid #f2f2f2;
    overflow: hidden;
    height: 70px;
    line-height: 70px;
    span {
      float: right;
      cursor: pointer;
      color: #b47c2d;
    }
  }
  i {
    float: right;
    &.iconfanhui1.down {
      transform: rotate(90deg);
    }
  }
  &:after {
    content: "";
    width: 11px;
    height: 11px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(181, 181, 181, 1);
    border-radius: 50%;
    position: absolute;
    top: 35px;
    left: 30px;
    margin-top: -5.5px;
  }
  &:before {
    content: "";
    width: 8px;
    height: 100%;
    border-left: 4px dotted #f2f2f2;
    position: absolute;
    top: 35px;
    left: 33px;
  }
  &:last-child:before {
    display: none;
  }
  .ticket-item {
    li {
      border-bottom: 1px solid #f2f2f2;
      position: relative;
    }
    h3 {
      font-size: 18px;
      color: #000;
      margin: 20px 0 15px;
    }
    p {
      font-size: 18px;
      margin-bottom: 20px;
      color: rgba(0, 0, 0, 0.8);
      &.times {
        color: #9b9b9b;
      }
      &.movie-title {
        margin-bottom: 10px;
      }
    }
    .seat-wrapper {
      overflow: hidden;
      margin-bottom: 20px;
      .seat-item {
        width: 66.5px;
        height: 26.5px;
        line-height: 26.5px;
        text-align: center;
        float: left;
        margin-right: 3px;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.8);
        background: url(../.././img/film/immerse_seat.png) no-repeat;
        background-size: cover;
        &:nth-child(5) {
          margin-right: 0;
        }
      }
    }
    .money {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 50%;
      font-size: 18px;
      color: #939393;
      span {
        color: #e8593e;
      }
    }
    .btns {
      width: 84px;
      height: 40px;
      background: rgba(218, 155, 66, 0);
      border: 1px solid rgba(204, 151, 76, 1);
      border-radius: 20px;
      line-height: 40px;
      text-align: center;
      color: #cc974c;
      font-size: 18px;
      cursor: pointer;
      position: absolute;
      right: 12px;
      top: 50%;
      margin-top: -20px;
    }
  }
  .item-container {
    overflow: hidden;
    li {
      margin: 20px 20px 0 0;
      cursor: pointer;
      width: 124px;
      float: left;
      img {
        width: 124px;
        height: 124px;
        border-radius: 4px;
      }
      .list-img {
        position: relative;
        i {
          font-size: 12px;
          position: absolute;
          top: 6px;
          right: 6px;
          z-index: 2;
          border-radius: 50%;
          padding: 5px;
          background: #000;
          color: #fff;
          text-align: center;
          cursor: pointer;
          transition: all 300ms;
          &:hover {
            transform: rotate(360deg);
          }
        }
      }
      .title {
        color: #353535;
        font-size: 16px;
        padding-left: 10px;
        position: relative;
        margin-top: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;

        &:after {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          margin-top: -2px;
          background: #b5b5b5;
          left: 0;
        }
      }
    }
  }
}
</style>