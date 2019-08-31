<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/intro'}">{{$t('g')}}</router-link>
      <router-link :to="{path:'/introL'}" v-if="$t('news')">{{$t('zixun')}}</router-link>
      <router-link :to="{path:'/about'}" class="active">{{$t('about')}}</router-link>
    </div>
    <div class="item">
      <h5>
        <i class="iconfont iconweizhi"></i>
        {{$t('address')}}
      </h5>
      <p v-html="contact.addr"></p>
    </div>
    <div class="item">
      <h5>
        <i class="iconfont iconemail-1"></i>
        {{$t('email')}}
      </h5>
      <p v-html="contact.email"></p>
    </div>
    <div class="item">
      <h5>
        <i class="iconfont iconphone"></i>
        {{$t('tel')}}
      </h5>
      <p v-html="contact.tel"></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "intro",
  data() {
    return {
      contact: ""
    };
  },
  methods: {
    getIntro() {
      this.$api.getIntro().then(res => {
        this.contact = res.data.contact;
      });
    }
  },
  mounted() {
    this.getIntro();
  }
};
</script>
<style lang="css" scoped>
.container {
  width: 100%;
  height: 59.5vh;
  background: #f5f5f5;
}
.topbar {
  height: 47px;
  line-height: 42px;
  font-size: 15px;
  text-align: center;
  background: #fff;
}
.topbar a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  width: 120px;
  padding: 5px 10px 0;
  display: inline-block;
  text-align: center;
}
.topbar a:last-child {
  margin-right: 0;
}
.topbar a.active {
  position: relative;
  color: #000;
  z-index: 1;
  font-size: 18px;
  font-weight: 600;
}
.topbar a.active:after {
  content: "";
  width: 36px;
  height: 3px;
  background: #b47c2d;
  border-radius: 2px;
  z-index: -1;
  position: absolute;
  border-radius: 1.5px;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
}
.item {
  font-size: 15px;
  padding: 15px;
  margin: 12px;
  color: #323232;
  background: #fff;
}
.item h5 {
  font-size: 15px;
  color: #323232;
  margin-bottom: 10px;
}
.item h5 i {
  color: #bb5235;
  display: inline-block;
  margin-right: 2px;
  font-size: 19px;
  vertical-align: middle;
}
.item /deep/ p {
  line-height: 20px;
}
</style>
