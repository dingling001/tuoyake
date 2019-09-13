<template>
  <div class="index">
    <div class="bannerbox">
      <div class="swiper-container banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../../img/indexs/index_banner.jpg" alt=""></div>
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
      <div class="recommentlist">
        <div class="recmmentitem">
          <div class="rec_img"><img src="../../img/indexs/g.png" alt=""></div>
          <div class="rec_name">网鱼网咖</div>
          <div class="rec_type">
            <div class="starbox">
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
            </div>
            <div class="typebox">
              <span>环境优雅</span>
              <span>有空调</span>
            </div>
          </div>
          <div class="rec_address">朝阳区七圣中街12号院爱琴海购物公园2层</div>
        </div>
        <div class="recmmentitem">
          <div class="rec_img"><img src="../../img/indexs/g.png" alt=""></div>
          <div class="rec_name">网鱼网咖</div>
          <div class="rec_type">
            <div class="starbox">
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
            </div>
            <div class="typebox">
              <span>环境优雅</span>
              <span>有空调</span>
            </div>
          </div>
          <div class="rec_address">朝阳区七圣中街12号院爱琴海购物公园2层</div>
        </div>
        <div class="recmmentitem">
          <div class="rec_img"><img src="../../img/indexs/g.png" alt=""></div>
          <div class="rec_name">网鱼网咖</div>
          <div class="rec_type">
            <div class="starbox">
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
            </div>
            <div class="typebox">
              <span>环境优雅</span>
              <span>有空调</span>
            </div>
          </div>
          <div class="rec_address">朝阳区七圣中街12号院爱琴海购物公园2层</div>
        </div>
        <div class="recmmentitem">
          <div class="rec_img"><img src="../../img/indexs/g.png" alt=""></div>
          <div class="rec_name">网鱼网咖</div>
          <div class="rec_type">
            <div class="starbox">
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
            </div>
            <div class="typebox">
              <span>环境优雅</span>
              <span>有空调</span>
            </div>
          </div>
          <div class="rec_address">朝阳区七圣中街12号院爱琴海购物公园2层</div>
        </div>
        <div class="recmmentitem">
          <div class="rec_img"><img src="../../img/indexs/g.png" alt=""></div>
          <div class="rec_name">网鱼网咖</div>
          <div class="rec_type">
            <div class="starbox">
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
            </div>
            <div class="typebox">
              <span>环境优雅</span>
              <span>有空调</span>
            </div>
          </div>
          <div class="rec_address">朝阳区七圣中街12号院爱琴海购物公园2层</div>
        </div>
        <div class="recmmentitem">
          <div class="rec_img"><img src="../../img/indexs/g.png" alt=""></div>
          <div class="rec_name">网鱼网咖</div>
          <div class="rec_type">
            <div class="starbox">
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
              <span class="iconfont iconstar-fill iconactive"></span>
            </div>
            <div class="typebox">
              <span>环境优雅</span>
              <span>有空调</span>
            </div>
          </div>
          <div class="rec_address">朝阳区七圣中街12号院爱琴海购物公园2层</div>
        </div>

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
      // window.addEventListener("scroll", this.handleScroll);
      // this.height = document.body.clientHeight;
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
    methods: {}
  };
</script>
<style lang="scss" scoped>
  @import "../../style/reset";

  .index {
    .bannerbox {
      background-image: url("../../img/index/index_bg.jpg");
      background-position: top;
      background-size: 100% auto;
      background-repeat: no-repeat;
      overflow: hidden;

      .banner {
        width: 1200px;
        margin: 40px auto 18px auto;

        .swiper-slide img {
          width: 100%;
        }
      }
    }

    .recommendbox {
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;

      .recommendtitle {
        overflow: hidden;
        width: 1200px;
        margin: 0 auto;
        padding: 24px 30px;
        border-bottom: 1px solid #EEEEEE;

        .recommentleft {
          float: left;
          font-size: 16px;

          .iconfont {
            color: $baseRed;
            background-image: -webkit-linear-gradient(bottom, $baseRed, #86AEFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

        }

        .recommentright {
          float: right;
          font-size: 12px;
          color: #777777;

          &:hover {
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

            &:hover {
              background-color: $baseRed;
            }

            .iconfont {
              color: #666666;
              font-size: 12px;
            }
          }
        }
      }

      .recommentlist {
        overflow: hidden;
        padding: 40px 48px;

        .recmmentitem {
          float: left;
          width: 240px;
          margin-bottom: 50px;
          margin-right: 48px;

          &:nth-child(4n) {
            margin-right: 0;
          }

          .rec_img {
            width: 240px;
            height: 240px;
            border-radius: 5px;
            overflow: hidden;

            img {
              width: 100%;
            }
          }

          .rec_name {
            padding: 18px 0;
            font-size: 16px;
            color: #333333;
          }

          .rec_type {
            overflow: hidden;

            .starbox {
              float: left;
              width: 96px;
              margin-right: 28px;

              .iconfont {
                color: #c3c3c3;
                margin-left: -2px;
                /*margin-right: 5px;*/
              }

              .iconactive {
                color: $baseRed;
              }
            }

            .typebox {
              float: left;

              span {
                background-color: #FEEAEB;
                color: #E03A43;
                padding: 1px 0;
                width: 56px;
                text-align: center;
                border-radius: 10px;
                display: inline-block;
                font-size: 13px;
              }
            }

          }

          .rec_address {
            color: #999999;
            font-size: 12px;
            padding-top: 18px;
          }
        }
      }
    }
  }
</style>
