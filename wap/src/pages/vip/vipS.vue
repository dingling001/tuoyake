<template>
  <div class="vip">
    <div class="vip-wrapper">
      <div class="top">
        <img :src="avatar" alt>
        <div class="user">
          <h3>{{nickname}}</h3>
          <p>个人会员</p>
          <p>注册时间：{{time}}</p>
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <span>
            <i class="iconfont iconshualian"></i>
          </span>
          <p>免检票刷脸入馆</p>
        </div>
        <div class="item">
          <span>
            <i class="iconfont icondianji"></i>
          </span>
          <p>一键预约常设展览</p>
        </div>
        <div class="item">
          <span>
            <i class="iconfont iconicon-test"></i>
          </span>
          <p>敬请期待</p>
        </div>
      </div>
      <span class="review" @click="goR">修改资料</span>
    </div>
    <div class="container">
      <div class="content" v-html="info"></div>
    </div>

    <div class="btn-wrapper">
      <div class="btns" @click="go">一键预约常设展览</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vip",
  data() {
    return {
      avatar: "",
      nickname: "",
      time: "",
      info: ""
    };
  },
  methods: {
    go() {
      this.$router.push({ path: "/pw/person/index", query: { state: 1 } });
    },
    getUser() {
      this.$api.getUser().then(res => {
        this.avatar = res.data.avatar;
        this.nickname = res.data.nickname;
      });
    },
    getEquity() {
      this.$api.getEquity().then(res => {
        this.info = res.data.content;
      });
    },
    getMInfo() {
      this.$api.getMInfo().then(res => {
        this.time = res.data.time;
      });
    },
    goR() {
      this.$router.push("/vipR");
    }
  },
  mounted() {
    this.getUser();
    this.getEquity();
    this.getMInfo();
  }
};
</script>
<style  scoped>
.vip {
  padding: 10px 0 100px 0px;
}
.vip-wrapper {
  height: 172px;
  width: 90%;
  margin: 10px auto;
  background: url(../.././img/user/v.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.top {
  display: flex;
}
.top img {
  width: 46px;
  height: 46px;
  display: block;
  border-radius: 50%;
  margin: 20px 10px 20px 20px;
}
.user {
  padding: 20px 30px 0 0;
  color: #fff;
}
.user h3 {
  font-size: 24px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}
.user p {
  font-size: 12px;
  line-height: 20px;
  color: #fff;
}
.review {
  position: absolute;
  top: 30px;
  right: 0;
  width: 80px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  background: rgba(255, 199, 120, 1);
  border-radius: 10px 0px 0px 10px;
  font-size: 12px;
  color: #8f561d;
}
.bottom {
  display: flex;
}
.item {
  flex: 1;
  text-align: center;
  margin: 10px 0;
}
.item span {
  display: block;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 210, 123, 1),
    rgba(236, 134, 58, 1)
  );
  box-shadow: 0px 2px 4px 0px rgba(242, 187, 92, 0.47);
  line-height: 40px;
  color: #fff;
}
.item p {
  text-align: center;
  margin: 5px 0;
  font-size: 12px;
  white-space: nowrap;
  color: #545454;
}
h1 {
  font-size: 30px;
  margin-top: 35.5px;
  color: #ee8e41;
  margin-bottom: 10px;
}
img {
  margin: 40px auto 20px;
  width: 60px;
  display: block;
  height: auto;
}
p {
  font-size: 14px;
  color: #9a9999;
}
.container {
  background: #4a4a4a;
}
.content {
  padding: 8px 28px;
  background: #fff;
  color: #000;
}
.btn-wrapper {
  position: fixed;
  z-index: 100;
  bottom: 0px;
  left: 0;
  width: 100%;
  padding: 20px 0 30px;
  background: #fff;
}
.btns {
  width: 80%;
  margin: 0 auto;
  height: 47.5px;
  line-height: 47.5px;
  background: #ee8e41;
  text-align: center;
  border-radius: 47.5px;
  color: #fff;
  font-size: 18px;
}
</style>