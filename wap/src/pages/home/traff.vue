<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/guide'}">{{$t('zhinan')}}</router-link>
      <router-link :to="{path:'/traff'}" class="active">{{$t('traff')}}</router-link>
      <!-- <router-link :to="{path:'/can'}">{{$t('can')}}</router-link> -->
      <router-link :to="{path:'/around'}" v-if="$t('news')">{{$t('around')}}</router-link>
    </div>
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" :ak="ak">
      <bm-marker
        :position="{lng: 117.8018569923, lat: 39.1123}"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
    </baidu-map>
    <div class="mains">
      <div class="openTime">
        <div class="intro" v-html="traff"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "traff",
  data() {
    return {
      traff: "",
      ak: "PhuixLOuLnCTqNWNtyyqupPIhOw7HCZl",
      zoom: 15,
      center: { lng: 117.8018569923, lat: 39.112 }
    };
  },
  methods: {
    getIntro() {
      this.$api.getVisit().then(res => {
        this.traff = res.data.traff;
      });
    },
    handler({ BMap, map }) {
      this.center.lng = 117.8018569923;
      this.center.lat = 39.1123;
      this.zoom = 15;
    }
  },
  mounted() {
    this.getIntro();
  }
};
</script>
<style lang="scss" scoped>
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
  width: 120px;
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
.map {
  height: 182px;
  width: 351px;
  margin: 12px auto;
  border-radius: 4px;
  border: 1px solid #fff;
  /*no*/
  overflow: hidden;
  /deep/ .anchorBL {
    display: none;
  }
}
.mains {
  margin: 0 12px;
}
.openTime {
  padding: 22px 15px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 12px;
}
.intro {
  /deep/ p {
    font-size: 14px;
    line-height: 20px;
    color: #000;
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
}
</style>
