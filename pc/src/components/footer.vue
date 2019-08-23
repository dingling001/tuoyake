<template>
  <div class="footer" :class="{'footer-lang':$t('news')==''}">
    <div class="footer-main" :class="{'footer-en':$t('news')==''}">
      <ul
        class="menus"
        :class="{'en-menus':$t('news')=='','ri-menus':$t('d3')=='見る3D','han-menus':$t('d3')=='3D 보기'}"
      >
        <li v-for="(item,index) in menus" :key="index" @click="go(item.path)" class="item">
          <a>{{item.name}}</a>
          <ul v-if="item.childs&&$t('news')!=''" class="smenu">
            <li
              v-for="(it,i) in item.childs"
              :key="i"
              @click.stop="goUrl(item.path,it.id)"
            >{{it.name}}</li>
          </ul>
        </li>
      </ul>
      <div class="en-about" v-if="$t('news')==''">
        <div class="wrapper">
          <div class="item">
            <div class="img">
              <img src=".././img/footer/weixin.jpg" alt />
            </div>
            <p>
              <i class="iconfont iconweixin"></i>
              {{$t('weChat')}}
            </p>
          </div>
          <div class="item">
            <div class="img">
              <img src=".././img/footer/xiaochengxu.jpg" alt />
            </div>
            <p>
              <i class="iconfont iconxiaochengxu"></i>
              {{$t('xiao')}}
            </p>
          </div>
        </div>
      </div>
      <div class="about" v-else>
        <div class="item">
          <img src=".././img/footer/weixin.jpg" alt />
          <h3>
            <i class="iconfont iconweixin"></i>微信公众号
          </h3>
        </div>
        <div class="item">
          <img src=".././img/footer/xiaochengxu.jpg" alt />
          <h3>
            <i class="iconfont iconxiaochengxu"></i>微信小程序
          </h3>
        </div>
      </div>
    </div>
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
  computed: {
    menus: function() {
      return this.$t("navs");
    }
  },
  methods: {
    go(path) {
      this.$router.push(path);
    },
    goUrl(url, id) {
      setTimeout(() => {
        this.$router.push({ path: url, query: { state: id } });
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 320px;
  background: #333;
  position: relative;
  z-index: 4;
  color: #fff;
  padding-top: 40px;
}
.footer-lang {
  padding-top: 30px;
}
.footer-main {
  width: 1200px;
  min-height: 92px;
  display: flex;
  margin: 0 auto;
}
.footer-en {
  display: block;
  margin: 0 auto;
}
.footer p {
  margin: 0;
  font-size: 14px;
  text-align: center;
}
.footer .copyright {
  height: 74px;
  line-height: 74px;
  background: #0a0a0a;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  a {
    color: rgba(255, 255, 255, 0.6);
  }
}
.footer a {
  color: #fff;
  &:hover {
    text-decoration: underline;
  }
}
.title {
  width: 230px;
  margin-top: 10px;
}
ul.menus {
  flex: 1;
  margin: 0;
  padding: 0 20px;
  overflow: hidden;

  &.en-menus {
    width: 800px;
    margin: 0 auto;
    li {
      width: auto;
    }
  }
  &.ri-menus {
    width: 640px;
  }
  &.han-menus {
    width: 745px;
  }
}
.item a:hover {
  text-decoration: underline;
}
li {
  float: left;
  padding: 0 15px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  line-height: 20px;
  .smenu {
    text-decoration: none;
    padding: 0;
    li {
      margin: 15px 0;
      padding: 0;
      text-align: center;
      float: none;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.en-about {
  width: 580px;
  overflow: hidden;
  height: 150px;
  margin: 20px auto 0;

  h3 {
    margin-bottom: 20px;
  }
  .wrapper {
    display: flex;
    .item {
      flex: 1;
      &:first-child {
        margin-right: 40px;
      }
      .img {
        width: 126px;
        height: 126px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        color: #fff;
        font-size: 12px;
        margin-top: 5px;
        text-align: center;
        width: 126px;
      }
    }
  }
}
.about {
  width: 358px;
  height: 160px;
  position: relative;
  border-left: 1px solid rgba(255, 255, 255, 0.6);
}
.about h3 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.about .t {
  position: absolute;
  top: 56%;
  left: 0;
  transform: translateY(-50%);
}
.about .item {
  display: inline-block;
  margin-left: 50px;
}
.about i {
  font-size: 19px;
  margin-left: -3px;
  margin-right: 4px;
}
.iconweixin {
  font-size: 22px;
}

a {
  color: #fff;
  &:hover {
    text-decoration: underline;
  }
}
.item h3 {
  margin: 12px 7px 0;
  color: #c8c8c8;
  font-size: 18px;
}
.item img {
  width: 126px;
  height: auto;
  display: inline-block;
}
</style>