<template>
  <div class="movie" v-if="Object.keys(m_info).length>0">
    <div class="swiper-container banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in index_swiper" :key="index">
          <img :src="$toThumbsimg(item,330,131,33,$moive)" alt />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="movie_name">{{m_info.cinema_name}}</div>
    <div :class="['movie_content',showmore?'movie_content_auto':'']" v-if="m_info.content">
      {{m_info.content}}
      <div class="movie_mold" v-if="!showmore"></div>
    </div>
    <div class="look_more" @click="showmore=!showmore" v-if="m_info.content">
      <span v-if="showmore">{{$t('hideAll')}}</span>
      <span v-else>{{$t('all')}}</span>
      <span :class="['iconfont', showmore?'iconyou-copy-copy':' iconyou-copy']"></span>
    </div>
    <div class="line"></div>
    <div class="movelist" v-if="movie_list.length>0">
      <div class="movie_item" v-for="(item,index) in movie_list">
        <div class="img">
          <img :src="$toThumbsimg(item.img,94,132,33,$moive)" alt />
        </div>
        <div class="m_right">
          <div class="title_box">
            <span class="title_name">{{item.movie_name}}</span>
          </div>
          <span class="is_type">
            <span v-if="item.type==1">3D</span>
            <span v-else-if="item.type==2">2D</span>
            <span v-else-if="item.type==3">{{$t("movieType")}}</span>
          </span>
          <div class="long_time">{{$t('movieT')}}：{{item.long_time}}{{$t('movieUnit')}}</div>
          <div class="long_time">{{$t('movieA')}}：{{item.address}}</div>
          <div class="movie_intro">{{item.content}}</div>
          <div class="movie_btn">
            <!--            <span class="movie_price">Adult <span>￥{{item.price}}</span></span>-->
            <span class="btn" @click="go_intro(index)">{{$t('btns')}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="nodata" v-else>{{$t('noMore')}}</div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { Indicator, Toast } from "mint-ui";

export default {
  name: "film_movie",
  data() {
    return {
      m_info: {},
      index_swiper: [],
      showmore: false,
      movie_list: []
    };
  },
  created() {
    this.get_CinemaDateMovie();
    this.get_CinemaInfo();
  },
  methods: {
    // intro
    get_CinemaInfo() {
      Indicator.open({
        text: "loading...",
        spinnerType: "fading-circle"
      });
      this.$api.LanguageCinemaInfo(localStorage.l).then(res => {
        if (res.status == 1) {
          this.m_info = res.data;
          this.index_swiper = res.data.img;
          this.m_info = res.data;
          setTimeout(() => {
            var mySwiper = new Swiper(".swiper-container", {
              slidesPerView: "auto", //重要 可以去swiper搜索
              centeredSlides: true, //重要
              paginationClickable: true,
              effect: "left",
              // loop: true,
              coverflowEffect: {
                rotate: 20,
                stretch: 10,
                depth: 60,
                modifier: 2
              },
              pagination: ".swiper-pagination",
              lazy: {
                loadPrevNext: true
              },
              observer: true,
              observeParents: true
            });
          }, 500);
        } else {
          localStorage.l = 1;
          this.$i18n.locale = "zh";
          Toast("正在切换至中文……");
          setTimeout(() => {
            this.$router.replace("/film/film_index");
          }, 3000);
        }
        Indicator.close();
      });
    },
    // list
    get_CinemaDateMovie() {
      this.$api.LanguageMovieList(localStorage.l).then(res => {
        if (res.status == 1) {
          this.movie_list = res.data.movie_list;
        } else {
          localStorage.l = 1;
          localStorage.locale = "zh";
          this.$i18n.locale = "zh";
          Toast("正在切换至中文……");
          setTimeout(() => {
            this.$router.replace("/film/film_index");
          }, 3000);
        }
      });
    },
    // detail
    go_intro(index) {
      this.$router.push({
        path: "/film/film_lang_detail",
        query: { index: index }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.movie {
  .banner {
    height: 220px;

    /deep/ .swiper-pagination-bullets,
    /deep/ .swiper-pagination-custom,
    /deep/ .swiper-pagination-fraction {
      bottom: 0;
    }

    /deep/ .swiper-wrapper {
      height: 200px;
      .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 320px !important;
        transform: scale(0.9);
        transition: all 0.3s;
        border-radius: 10px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }

      .swiper-slide-active {
        transform: scale(1);
      }
    }

    /deep/ .swiper-pagination .swiper-pagination-bullet {
      width: 12px;
      height: 4px;
      background: #cc974c;
      transition: 0.3s ease-in-out;
      border-radius: 3px;
    }

    /deep/ .swiper-pagination .swiper-pagination-bullet-active {
      height: 4px;
      width: 20px;
      background: #cc974c;
      border-radius: 3px;
    }
  }

  .movie_name {
    padding: 16px;
    color: #353535;
    font-weight: bold;
    font-size: 22px;
    /*px*/
  }

  .movie_content {
    height: 76px;
    padding: 0 16px;
    color: #353535;
    text-align: justify;
    line-height: 21px;
    text-indent: 2em;
    font-size: 16px;
    /*px*/
    overflow: hidden;
    transition: height 0.3s;
    position: relative;

    .movie_mold {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.2),
        #fff
      );
    }
  }

  .movie_content_auto {
    height: auto;
  }

  .look_more {
    text-align: center;
    color: #ee8e41;
    font-size: 14px;
    /*px*/
    padding: 10px 0 15px 0;

    .iconfont {
      font-size: 18px;
      /*px*/
    }
  }

  .line {
    height: 10px;
    background-color: #ececec;
  }

  .movelist {
    margin: 0 12px;
    padding: 0 0 50px 0;

    .movie_item {
      padding: 12px 0;
      border-bottom: 1px solid rgba(191, 191, 191, 0.18);
      /*no*/
      display: flex;
      align-items: center;

      .img {
        width: 94px;
        height: 132px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
        margin-right: 10px;
        flex-shrink: 0;

        img {
          width: 100%;
        }
      }

      .m_right {
        flex: 1;

        .title_box {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title_name {
            color: #030303;
            font-size: 16px;
            /*px*/
          }

          .m_trip {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 8px;
            border-radius: 11px;
            /*no*/
            color: #cc974c;
            font-size: 12px;
            /*px*/
            border: 1px solid #cc974c;
            /*no*/
          }
        }

        .is_type {
          text-align: center;
          color: #cc974c;
          line-height: 15px;
          border-radius: 4px;
          /*no*/
          border: 1px solid #cc974c;
          /*no*/
          font-size: 10px;
          /*px*/
          padding: 0 8px;
          display: inline-block;
          margin: 5px 0;
        }

        .long_time {
          font-size: 13px;
          /*px*/
          color: #383838;
          padding: 5px 0 0 0;
        }

        .movie_intro {
          color: #353535;
          font-size: 12px;
          line-height: 18px;
          padding: 5px 0 0 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          min-height: 30px;
        }

        .movie_btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 8px 0 0 0;

          .movie_price {
            color: #555454;
            font-size: 14px;
            /*px*/
            span {
              color: #e8593e;
            }
          }

          .btn {
            /*width: 64px;*/
            padding: 10px;
            background-color: #cc974c;
            color: #fff;
            text-align: center;
            border-radius: 4px;
            /*no*/
            font-size: 14px;
            /*px*/
            &:active {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }

  .nodata {
    padding: 30px 0;
    text-align: center;
    color: #bbb;
    font-size: 14px;
    /*px*/
  }
}
</style>
