<template>
  <div class="preson">
    <p class="circle"></p>
    <span class="preson_title">{{ fromTitle }}</span>
    <div class="preson-right">
      <span >参观日期</span>
      <span v-text="bookDate">12月6日</span>
      <!-- <span v-text="bookWeek">周四</span> -->
      <span v-text="bookTime">9:00-11:00</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fromTitle: {
      type: String,
      default: '预约人信息',
    },
    bookDate: {
      type: String,
      default: '12月6日 周四'
    },
    bookTime: {
      type: String,
      default: '9:00-11:00'
    }
  }
};
</script>

<style lang="scss" scoped>
.preson {
  width: 100%;
  height: 62px;
  line-height: 62px;
  border-radius: 31px;
  background: rgba(220, 97, 58, 1);
  position: relative;
  .circle {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    margin: 28px 18px 24px 37px;
  }
  .preson_title {
    color: #fff;
    padding-left: 65px;
  }
  .preson-right {
    position: absolute;
    right: 0;
    bottom: 3%;
    padding-right: 40px;
    font-size: 18px;
    color: #fff;
    span {
      padding-right: 5px;
    }
  }
}
</style>
