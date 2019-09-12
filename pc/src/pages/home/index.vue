<template>
  <div class="index">
    <div class="bannerbox">
      <div class="swiper-container banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../../img/index/index_banner.jpg" alt=""></div>
          <div class="swiper-slide">1111</div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="recommendbox">
      <div class="recommendtitle">
        <div class="recommentleft"><span class="iconfont icontuijian"></span><span>推荐网吧</span></div>
        <div class="recommentright"><span>查看更多</span><span class="iconbox"><span
          class="iconfont iconjiantou"></span></span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Swiper from "swiper";

  export default {
    name: "home",
    data() {
      return {
        cur: 0
      };
    },

    mounted() {
      window.addEventListener("scroll", this.handleScroll);
      this.height = document.body.clientHeight;
      var swiper = new Swiper('.banner', {
        spaceBetween: 30,
        effect: 'fade',
        fade: {
          crossFade: false,
        },
        pagination: '.swiper-pagination',
        observer: true,
        observeParents: true,
        autoplay: 3000,
        loop: true,
        paginationClickable: true
      });

    },
    inject: ["app"],
    methods: {
      handleScroll() {
        this.top =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        this.top = this.top + this.height + 50;
        if (document.getElementById("news") != null) {
          var top1 = document.getElementById("news").offsetTop;
          if (top1 <= this.top) {
            document.getElementById("news").className = "animated fadeInUp";
          }
        }

        if (document.getElementById("info") != null) {
          var top2 = document.getElementById("info").offsetTop;
          if (top2 <= this.top) {
            document.getElementById("info").className = "info animated fadeInUp";
          }
        }

        if (document.getElementById("vip") != null) {
          var top3 = document.getElementById("vip").offsetTop;
          if (top3 <= this.top) {
            document.getElementById("vip").className = "vip animated fadeInUp";
          }
        }

        if (document.getElementById("ex2") != null) {
          var top4 = document.getElementById("ex2").offsetTop;
          if (top4 <= this.top) {
            document.getElementById("ex2").className =
              "ex cexb animated fadeInUp";
          }
        }

        if (document.getElementById("active") != null) {
          var top5 = document.getElementById("active").offsetTop;
          if (top5 <= this.top) {
            document.getElementById("ex2").className =
              "ex actives animated fadeInUp";
          }
        }
        if (document.getElementById("ex3") != null) {
          var top6 = document.getElementById("ex3").offsetTop;
          if (top6 <= this.top) {
            document.getElementById("ex3").className = "ex animated fadeInUp";
          }
        }
        if (document.getElementById("last") != null) {
          var top7 = document.getElementById("last").offsetTop;
          if (top7 <= this.top) {
            document.getElementById("last").className = "last animated fadeInUp";
          }
        }
        if (document.getElementById("questions") != null) {
          var top7 = document.getElementById("questions").offsetTop;
          if (top7 <= this.top) {
            document.getElementById("questions").className =
              "question-wrapper animated fadeInUp";
          }
        }
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../style/reset";
  .index {
    background-image: url("../../img/index/index_bg.jpg");
    background-position: top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    min-height: 500px;

    .bannerbox {
      width: 1200px;
      margin: 40px auto 18px auto;

      .banner .swiper-slide img {
        width: 100%;
      }
    }

    .recommendbox {
      .recommendtitle {
        overflow: hidden;
        width: 1200px;
        margin: 0 auto;

        .recommentleft {
          float: left;
          font-size: 16px;

          .iconfont {
            color: $baseRed;
          }

        }

        .recommentright {
          float: right;
          font-size: 12px;
          color: #777777;
&:hover{
  color: $baseRed;
}
          .iconbox {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #E4E4E4;
            margin-left: 8px;
            text-align: center;
            line-height: 20px;
            cursor: pointer;

            &:hover .iconfont {
              color: #fff;
            }
            &:hover{
              background-color:$baseRed;
            }

            .iconfont {
              color: #666666;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
