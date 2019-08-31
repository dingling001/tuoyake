<template>
  <div class="vip">
    <div class="vip-wrapper">
      <h1>个人会员</h1>
      <p>您将享受如下特权</p>
      <img src="../.././img/vip_date.png" alt>
      <p>享受一键预约常设展览功能</p>
      <img src="../.././img/vip_person.png" alt>
      <p>享受免检票刷脸入馆</p>
    </div>
    <div class="btn-wrapper">
      <div class="btns" @click="go">免费申请</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vip",
  methods: {
    go() {
      this.$router.push("/vipW");
    }
  }
};
</script>
<style  scoped>
.vip {
  text-align: center;
  padding: 30px 0 60px 0;
}
.vip-wrapper {
  padding: 30px 0;
  box-shadow: 0px 6px 16px 0px rgba(213, 130, 32, 0.24);
  border-radius: 10px;
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
.btn-wrapper {
  position: fixed;
  z-index: 1000;
  bottom: 20px;
  left: 0;
  width: 100%;
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