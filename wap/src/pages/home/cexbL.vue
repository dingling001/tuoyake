<template>
  <div class="container">
    <div class="topbar">
      <!-- <router-link :to="{path:'/exbL'}" v-if="$t('news')">{{$t('exb')}}</router-link> -->
      <router-link :to="{path:'/cexbL'}" class="active">{{$t('cexb')}}</router-link>
      <router-link :to="{path:'/oexbL'}">{{$t('oexb')}}</router-link>
      <!-- <router-link :to="{path:'/vexbL'}" v-if="$t('news')">{{$t('vexb')}}</router-link> -->
    </div>
    <ul class="ex">
      <li v-for="(item,index) in exhibitionList" :key="index" @click="goEx(item.exhibition_id)">
        <img :src="$toThumbsimg(item.exhibition_img,355,152,33,$web)" />
        <div class="slide-item">
          <h4>{{item.exhibition_name}}</h4>
          <p>{{$t('eaddress')}}：{{item.exhibition_address}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "traff",
  data() {
    return {
      exhibitionList: []
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
        this.exhibitionList = res.data.theme;
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
.banner {
  width: 100%;
  height: 150px;
}
.ex {
  margin: 12px;
}
.ex li {
  width: 100%;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /*no*/
  padding-bottom: 12px;
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
</style>
