<template>
  <div class="footer">
    <p class="copyright">
      CopyRight 2016 {{$t('copyright')}}
      <a href="http://www.beian.miit.gov.cn">津ICP备19003219号</a>
      {{$t('line')}}：022-67185138
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    computed: {},
    methods: {}
  };
</script>
<style lang="scss" scoped>
  .footer {
    width: 100%;
    background: #222;
    position: relative;
    z-index: 4;
    color: #fff;
    padding-top: 40px;
  }

  .footer p {
    margin: 0;
    font-size: 14px;
    text-align: center;
  }

  .footer .copyright {
    background: #0a0a0a;
    position: absolute;
    height: 111px;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 111px;
    color: rgba(255, 255, 255, 0.6);

    a {
      color: rgba(255, 255, 255, 0.6);
    }
  }

</style>
