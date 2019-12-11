<template>
  <div class="netbox">
    <div class="netitem">
      <span class="iconfont iconzanwushuju"></span>
      <div class="text">网络连接超时了</div>
      <a href="">
        <van-button type="warning" size="small">刷新</van-button>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NetError",
  }
</script>

<style scoped lang="scss">
  .netbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 99999;
    text-align: center;

    .netitem {
      position: absolute;
      width: 300px;
      height: 300px;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;

      .iconfont {
        font-size: 70px;
        color: #ddd;
      }

      .text {
        padding: 15px 0;
        font-size: 20px;
        color: #ccc;
      }
    }

  }
</style>
