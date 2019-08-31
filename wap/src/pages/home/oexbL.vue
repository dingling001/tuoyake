<template>
  <div class="container">
    <div class="topbar">
      <!-- <router-link :to="{path:'/exbL'}" v-if="$t('news')">{{$t('exb')}}</router-link> -->
      <router-link :to="{path:'/cexbL'}">{{$t('cexb')}}</router-link>
      <router-link :to="{path:'/oexbL'}" class="active">{{$t('oexb')}}</router-link>
      <!-- <router-link :to="{path:'/vexbL'}" v-if="$t('news')">{{$t('vexb')}}</router-link> -->
    </div>
    <ul class="ex" v-if="exhibitionList.length>0">
      <li v-for="(item,index) in exhibitionList" :key="index" @click="goEx(item.full_url)">
        <img :src="item.exhibition_img" />
        <div class="slide-item">
          <h4>{{item.exhibition_name}}</h4>
        </div>
      </li>
    </ul>
    <div class="no" v-if="noF">
      <img src="../.././img/404.png" alt />
      <p>即将上线，敬请期待！</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "traff",
  data() {
    return {
      exhibitionList: [],
      noF: false
    };
  },
  filters: {
    getYMD: function(date) {
      var year = date.substring(0, 4);
      var month = date.substring(4, 7);
      var day = date.substring(8, 10);
      return year + "年" + month + "月" + day + "日";
    }
  },
  methods: {
    getEx() {
      this.$api.getOnline().then(res => {
        this.exhibitionList = res.data;
        if (this.exhibitionList.length == 0) {
          this.noF = true;
        }
      });
    },
    goEx(full_url) {
      if (full_url) {
        window.location.href = full_url;
      }
    }
  },
  mounted() {
    this.getEx();
  }
};
</script>
<style lang="css" scoped>
.container {
  width: 100%;
  height: 100%;
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
  padding: 5px 10px 0;
  display: inline-block;
  text-align: center;
  width: 100px;
  margin-right: 15px;
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
.ex {
  margin: 12px;
}
.ex li {
  width: 100%;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /*no*/
  padding-bottom: 4px;
}
.ex li img {
  width: 100%;
  height: 170px;
  display: block;
  cursor: pointer;
  border-radius: 4px;
}
.ex h4 {
  font-size: 15px;
  /* px */
  margin-top: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 8px;
}
.ex p {
  font-size: 12px;
  /* px */
  line-height: 18px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 12px;
}
.ex p:last-child {
  margin-bottom: 0;
}
.no {
  margin: 150px auto;
  text-align: center;
}
.no img {
  width: 200px;
  display: block;
  margin: 30px auto;
}
.no p {
  font-size: 14px;
  color: #999;
}
</style>
