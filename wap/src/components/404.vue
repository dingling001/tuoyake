<template>
  <div class="loading">
    <div class="loading-box">
      <!--<img src=".././img/404.png" />-->
      <p>抱歉，您访问的页面丢失。</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "lost",
  data() {
    return {};
  }
};
</script>
<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 9999;
}

.loading-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  /* IE 9 */
  -webkit-transform: translate(-50%, -50%);
  /* Safari and Chrome */
  -o-transform: translate(-50%, -50%);
  /* Opera */
  -moz-transform: translate(-50%, -50%);
  /* Firefox */
}

.loading-box img {
  display: block;
  width: 251px;
  margin: 0 auto 40px;
}

.loading-box p {
  text-align: center;
  color: #c79d62;
  font-size: 18px;
  margin: 10px 0;
}
</style>
