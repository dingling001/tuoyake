<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/exbL'}">{{$t('exb')}}</router-link>
      <router-link :to="{path:'/cexbL'}">{{$t('cexb')}}</router-link>
      <router-link :to="{path:'/oexbL'}">{{$t('oexb')}}</router-link>
      <router-link :to="{path:'/vexbL'}" class="active">{{$t('vexb')}}</router-link>
    </div>

    <ul class="ex" v-if="exhibitionList.length>0">
      <li v-for="(item,index) in exhibitionList" :key="index" @click="goEx(item.exhibition_id)">
        <img :src="$toThumbsimg(item.exhibition_img,355,152,33,$web)">
        <div class="slide-item">
          <h4>{{item.exhibition_name}}</h4>
          <p>展览时间：{{item.end_date|getYMD}}</p>
          <p>展览地点：{{item.exhibition_address}}</p>
        </div>
      </li>
    </ul>
    <div class="no" v-if="noF">
      <img src="../.././img/404.png" alt>
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
      this.$api.getEx().then(res => {
        this.exhibitionList = res.data.temporary_expire;
        if (this.exhibitionList.length == 0) {
          this.noF = true;
        }
      });
    },
    goEx(id) {
      this.$router.push({ path: "/eDetail", query: { id: id } });
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
}
.topbar {
  margin: 0 12px;
  height: 60px;
  line-height: 60px;
  font-size: 15px;
  text-align: center;
  display: flex;
}
.topbar a {
  text-decoration: none;
  color: #999;
  width: 120px;
  padding: 0 10px;
  flex:1;
  text-align: center;
}
.topbar a:last-child {
  margin-right: 0;
}
.topbar a.active {
  position: relative;
  color:#000;
  z-index: 1;
}
.topbar a.active:after {
  content: "";
  width: 100%;
  height: 10px;
  background: linear-gradient(
    0deg,
    rgba(234, 149, 28, 1),
    rgba(255, 255, 255, 1)
  );
  border-radius: 2px;
  z-index: -1;
  position: absolute;
  bottom: 20px;
  left: 0;
}
.ex {
  margin:0 12px 20px 12px;
}
.ex li {
  width: 100%;
  margin-bottom: 15px;
}
.ex li img {
  width: 100%;
  height: 152px;
  display: block;
  cursor: pointer;
}
.slide-item {
  padding: 10px;
  background: #fff;
  margin-top: -4px;
  box-shadow: 0px 7px 14px 2px rgba(95, 61, 13, 0.14);
  cursor: pointer;
}
.ex h4 {
  font-size: 14px;
  margin-top:5px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 5px;
}
.ex p {
  margin: 0 0 5px 0;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
}
.ex p:last-child{
  margin-bottom:0;
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
