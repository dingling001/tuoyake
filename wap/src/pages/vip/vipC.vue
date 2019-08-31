<template>
  <div class="vip">
    <div class="vipC" v-if="vipF">
      <img src="../.././img/vipC.png">
      <p>请带好相关资料，去线下认证～</p>
    </div>
    <div class="vipF" v-if="vipFail">
      <img src="../.././img/vipF.png" alt>
      <h3>审核失败</h3>
      <div class="reason" v-html="reason"></div>
      <div class="btns" @click="goReview">修改资料</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vipC",
  data() {
    return {
      vipF: false,
      vipFail: false,
      reason: ""
    };
  },
  methods: {
    getVip() {
      this.$api.getVip().then(res => {
        if (res.data.is_check == 1) {
          this.vipF = true;
        }
        if (res.data.is_check == 3) {
          this.getReason();
        }
      });
    },
    goReview() {
      this.$router.push({ path: "/vipW", query: { status: 1 } });
    },
    getReason() {
      this.$api.getReason().then(res => {
        if (res.data.reason != "") {
          this.vipFail = true;
          this.reason = res.data.reason;
        }
      });
    }
  },
  created() {
    this.getVip();
  }
};
</script>
<style  scoped>
.vip {
  text-align: center;
  padding: 30px 0 60px 0;
}
.vipC,
.vipF {
  width: 100%;
  height: 100%;
}
.vipC img,
.vipF img {
  width: 132px;
  height: auto;
  display: block;
  margin: 140px auto 20px;
}
h3 {
  text-align: center;
  font-size: 15px;
  color: #313131;
  margin-bottom: 10px;
}
.reason {
  padding: 0 40px 40px;
  text-align: center;
}
p {
  font-size: 14px;
  color: #9a9999;
}
.reason /deep/ p {
  text-indent: 2em;
  line-height: 20px;
}
.btns {
  width: 80%;
  margin: 0 auto;
  height: 47.5px;
  line-height: 47.5px;
  background: rgba(204, 151, 76, 1);
  border-radius: 47.5px;
  color: #fff;
  font-size: 18px;
}
</style>