<template>
  <div class="footer">
    <p class="copyright">
      <a href="http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action;jsessionid=PjAlxu21ql9vTut7sJMAEHxDT1V91UUTkhUMjar8XFGpWQeZtll8!1935156451">CopyRight 2019 北京澎龙科技有限公司 京ICP备19041153号-1</a>
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
    color: #fff;
    padding-top: 40px;
    position: relative;
    height: 111px;

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
