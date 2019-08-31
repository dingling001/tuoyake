<template>
  <div class="map-container">
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" :ak="ak">
      <div v-if="zoom>11">
        <bm-marker
          v-for="(item,index) in points"
          :key="index"
          :position="{lng: item.lng, lat: item.lat,}"
          :dragging="false"
          animation="BMAP_ANIMATION_BOUNCE"
          :icon="{url: web+'/img/map/'+(index+1)+'.png', size: {width: 51.5, height:58}}"
        >
          <bm-label
            v-if="zoom>=14"
            :content="item.name"
            :labelStyle="{color: '#EE8E41', fontSize : '12px'}"
            :offset="{width: -15, height: 60}"
          />
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>
<script>
export default {
  data() {
    return {
      web: STATIC_WEB_URL,
      ak: "PhuixLOuLnCTqNWNtyyqupPIhOw7HCZl",
      zoom: 12,
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
      console.log(this.web);
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
  /deep/ .anchorBL {
    display: none;
  }
}
</style>