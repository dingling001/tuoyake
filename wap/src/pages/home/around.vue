<template>
  <div class="container">
    <div class="topbar">
      <router-link :to="{path:'/guide'}">{{$t('zhinan')}}</router-link>
      <router-link :to="{path:'/traff'}">{{$t('traff')}}</router-link>
      <!-- <router-link :to="{path:'/can'}">{{$t('can')}}</router-link> -->
      <router-link :to="{path:'/around'}" class="active">{{$t('around')}}</router-link>
    </div>
    <div class="map-container">
      <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" :ak="ak">
        <div v-if="zoom>11">
          <bm-marker
            v-for="(item,index) in points"
            :key="index"
            :position="{lng: item.lng, lat: item.lat,}"
            :dragging="false"
            :icon="{url: web+'/img/map/'+(index+1)+'.png', size: {width: 51.5, height:58}}"
          >
            <bm-label
              v-if="zoom>=15"
              :content="item.name"
              :labelStyle="{color: '#EE8E41', fontSize : '12px'}"
              :offset="{width: 0, height: 60}"
            />
          </bm-marker>
        </div>
      </baidu-map>
    </div>
  </div>
</template>
<script>
export default {
  name: "intro",
  data() {
    return {
      center: { lng: 117.8018569923, lat: 39.112 },
      web: STATIC_WEB_URL,
      ak: "PhuixLOuLnCTqNWNtyyqupPIhOw7HCZl",
      zoom: 18,
      points: [
        {
          lat: 39.1299970114,
          lng: 117.7470798972,
          name: "国家动漫园"
        },
        {
          lat: 39.1900722389,
          lng: 117.8712518072,
          name: "滨海鲤鱼门"
        },
        {
          lat: 39.1634962861,
          lng: 117.816648941,
          name: "天津泰达航母主题公园"
        },
        {
          lat: 39.1600365665,
          lng: 117.7456303052,
          name: "方特欢乐世界"
        },
        {
          lat: 39.1114332688,
          lng: 117.758996545,
          name: "津沽记忆博物馆"
        },
        {
          lat: 39.110538046,
          lng: 117.7605766355,
          name: "东方艺术馆"
        },
        {
          lat: 39.1018071279,
          lng: 117.8469380875,
          name: "东堤公园"
        },
        {
          name: "生态公园",
          lat: 39.10397683,
          lng: 117.7504506572
        },
        {
          name: "欢乐水魔方",
          lat: 39.106454046,
          lng: 117.7540546355
        },
        {
          name: "国家海洋博物馆",
          lat: 39.1123,
          lng: 117.8018569923
        },
        {
          name: "滨海妈祖文化园",
          lat: 39.1130220566,
          lng: 117.8524476452
        },
        {
          lat: 39.1463380948,
          lng: 117.7462936274,
          name: "亿利生态公园"
        },
        {
          name: "鼓浪水镇月沙滩",
          lat: 39.1839739535,
          lng: 117.8759930496
        },
        {
          name: "遗鸥公园",
          lat: 39.1427792495,
          lng: 117.7949950552
        },
        {
          name: "惠风溪公园",
          lat: 39.136980026,
          lng: 117.7647760544
        },
        {
          name: "永定洲公园",
          lat: 39.10632683,
          lng: 117.7445306572
        }
      ],
      center: { lng: 117.8018569923, lat: 39.112 }
    };
  },
  methods: {
    handler({ BMap, map }) {
      var _this = this;
      map.addEventListener("zoomend", function(e) {
        _this.zoom = map.getZoom();
      });
      this.center.lng = 117.8018569923;
      this.center.lat = 39.1123;
      this.zoom = 12;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  margin-bottom: 30px;
  min-height: 70vh;
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
.intro {
  margin: 20px 0;
  font-size: 14px;
}
.intro /deep/ p {
  font-size: 14px;
  color: #000;
}
.map-container {
  width: 100%;
  height: 100vh;
}
.map {
  height: 100%;
  width: 100%;
  /deep/ .BMap_Marker img {
    width: 100%;
    height: 100%;
    display: block;
  }
  /deep/ .BMapLabel {
    left: 25.75px !important;
    transform: translateX(-50%) !important;
    border: 0 none !important;
    background: #fff;
    padding: 4px 10px !important;
    border-radius: 15px;
  }
  /deep/ .anchorBL {
    display: none;
  }
}
</style>
