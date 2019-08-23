<template>
  <div>
    <div class="top">
      <div class="topbar">
        <a href="/">首页</a> » 个人中心
      </div>
    </div>
    <div class="content clearfix">
      <!-- 头部页面效果 -->
      <div class="header">
        <div class="img"></div>
      </div>
      <!-- 左边的导航栏 -->
      <div class="left">
        <u-nav></u-nav>
      </div>
      <!-- 右边的信息内容 -->
      <div class="right">
        <div class="menu">
          <header>
            <nav class="clearfix">
              <router-link class="left" to="/team/info">团体基本信息</router-link>
              <router-link class="right" to="/team/record">团体预约记录</router-link>
            </nav>
          </header>
          <main>
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uNav from "../../../../components/uNav";
export default {
  name: "center_team_index",
  data() {
    return {};
  },
  components: {
    uNav
  }
};
</script>
<style lang="scss" scoped>
.clearfix::after,
.clearfix::before {
  content: "";
  display: table;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.left {
  float: left;
}

.right {
  float: right;
}

.top {
  background: #e7e7e7;

  .topbar {
    height: 60px;
    line-height: 60px;
    color: #000;
    font-size: 18px;
    width: 1200px;
    margin: 0 auto;

    a {
      color: #000;

      &:hover {
        color: #b47c2d;
        text-decoration: underline;
      }
    }
  }
}

.content {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;

  .header {
    border-bottom: 1px solid #b47c2d;
    padding-bottom: 20px;
    margin-bottom: 20px;

    .img {
      width: 100%;
      height: 172px;
      background: url("../../../../img/u_t.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .menu {
    margin: 0 auto;
    width: 960px;

    header {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid rgba(180, 124, 45, 0.6);

      nav {
        margin: 0 auto;
        width: 455px;

        a {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          transition: all 0.1s ease-in-out 0s;

          &.router-link-active {
            height: 59px;
            color: #d49451;
            border-bottom: 2px solid #d49451;
          }
        }
      }
    }
  }
}
</style>
