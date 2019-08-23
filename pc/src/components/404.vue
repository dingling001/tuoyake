<template>
  <div class="lost">
    <img src=".././img/404.png" alt />
    <p>抱歉，您访问的页面丢失。</p>
    <a href="/" class="btn">返回首页</a>
  </div>
</template>
<script>
export default {
  name: "lost",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
<style scoped>
.lost {
  text-align: center;
  margin: 0 auto;
  width: 600px;
}
.lost img {
  width: 504px;
  height: auto;
  display: block;
  margin: 0px auto;
  padding-top: 120px;
}
.lost p {
  font-size: 20px;
  margin: 40px 0;
  color: #000;
}
.btn {
  width: 239px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  background: #e6dac9;
  border-radius: 30px;
  color: #000;
  text-align: center;
  display: block;
  text-decoration: none;
  font-weight: 500;
  font-size: 24px;
}
</style>
