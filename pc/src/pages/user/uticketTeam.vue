<template>
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
</template>
<script>
export default {
  name: 'center_team_index',
  data() {
    return {};
  },
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

</style>
