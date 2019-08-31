<template>
  <div class="footer">
    <h3>{{$t('contact')}}</h3>
    <div class="footer-main">
      <div class="item">
        <img src=".././img/footer/weixin.jpg" alt />
        <p>
          <i class="iconfont iconweixin"></i>
          {{$t('wetChat')}}
        </p>
      </div>
      <div class="item">
        <img src=".././img/footer/weibo.jpg" alt />
        <p>
          <i class="iconfont iconxiaochengxu"></i>
          {{$t('xiao')}}
        </p>
      </div>
    </div>
    <div class="copyright-wrapper">
      <p class="copyright">
        CopyRight 2016{{$t('copyright')}}
        <br />
        <a href="http://www.beian.miit.gov.cn">津ICP备19003219号</a>
        {{$t('line')}}：022-67185138
      </p>
    </div>
  </div>
</template>
<style scoped>
.footer {
  background: #333333;
  padding-top: 15px;
  height: 236px;
  overflow: hidden;
}
.footer h3 {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 15px;
  text-align: center;
}
.footer-main {
  width: 68%;
  margin: 0 auto 10px;
  display: flex;
}
.footer-main .item {
  flex: 1;
}
.item img {
  width: 95px;
  height: 95px;
  margin: 0 auto 9px;
  display: block;
}
.item p {
  text-align: center;
  font-size: 12px;
  color: #fff;
}
.item i {
  display: inline-block;
  margin-right: 2px;
}
.copyright-wrapper {
  width: 100%;
  background: #000;
  padding: 2.5px 0;
}
.copyright {
  font-size: 10px;
  color: #fff;
  margin: 10px 0;
  line-height: 20px;
  text-align: center;
}
a {
  color: #fff;
}
a:hover {
  text-decoration: underline;
  color: #fff;
}
</style>
