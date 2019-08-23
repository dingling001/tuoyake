<template>
  <div class="f_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">{{$t('navs[0].name') }}</router-link>
        » {{$t('movie') }}
      </div>
    </div>
    <div class="f_info">
      <div class="f_left">
        <!--<div class="about">about</div>-->
        <div class="f_intro_title">{{film_info.cinema_name}} {{$t('brief')}}</div>
        <div class="f_intro_titles">{{film_info.address}}</div>
        <div class="f_intro" v-html="film_info.content"></div>
      </div>
      <div class="f_right">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in film_info.img">
              <img :src="item" alt />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="f_list" v-loading="tabshow">
      <div class="f_top">
        <span class="span_active">{{$t('hot')}}({{movie_num}})</span>
      </div>
      <div class="film_list" v-if="movie_list.length>0">
        <div class="film_item" v-for="(item,index) in movie_list">
          <div class="film_img">
            <img :src="$toThumbsimg(item.img,299,481,33,$moive)" alt :title="item.movie_name" />
          </div>
          <div class="film_info">
            <div class="film_name_box">
              <div class="film_name">{{item.movie_name}}</div>
              <!--<span class="join">加入行程单</span>-->
            </div>
            <div class="film_detail">
              <p>
                <span class="span" v-if="item.type==1">3D</span>
                <span class="span" v-else-if="item.type==2">2D</span>
                <span class="span" v-else-if="item.type==3">{{$t('movieType')}}</span>
              </p>
              <p>{{$t('movieT')}}：{{item.long_time}}{{$t('movieUnit')}}</p>
              <p>{{$t('movieA')}}：{{item.address}}</p>
              <div class="film_content" v-html="item.content"></div>
              <div class="film_btn" @click="choose_date(index)">{{$t('btns')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="film_list" v-else>
        <div class="nodata">{{$t("noMore")}}</div>
      </div>
      <pagination
        :totalPages="re_total"
        @presentPage="getPresentPage"
        v-if="re_total > 1"
        style="width: 960px;margin: 20px auto;"
      ></pagination>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import pagination from "@/components/pcpaging";

export default {
  name: "film_index",
  data() {
    return {
      tab: 0,
      film_info: [],
      movie_list: [],
      movie_listing: [],
      take: 3,
      re_total: 0,
      j_retotal: 0,
      movie_num: 0,
      j_movie_num: 0,
      page: 0,
      un_look_num: null,
      tabshow: true,
      l: 1
    };
  },
  inject: ["app"],
  created() {
    this.l = localStorage.l;
    this.get_CinemaInfo();
    this.get_MovieList(0);
  },
  methods: {
    // 热映分页
    getPresentPage(val) {
      this.page = val - 1;
      this.get_MovieList(this.page);
    },
    // 选座购票
    choose_date(index) {
      this.$router.push({
        path: "/film/film_lang_detail",
        query: { index: index }
      });
    },
    // 获取首页信息
    get_CinemaInfo() {
      this.$api.LanguageCinemaInfo(localStorage.l).then(res => {
        this.film_info = res.data;
      });
    },
    // 获取热映
    get_MovieList(skip) {
      this.$api
        .LanguageMovieList(localStorage.l, skip * this.take, this.take)
        .then(res => {
          this.tabshow = false;
          this.movie_list = res.data.movie_list;
          this.movie_num = res.data.movie_num;
          this.re_total = Math.ceil(res.data.movie_num / this.take);
        });
    }
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: 2000,
      autoplayDisableOnInteraction: false,
      // 如果需要分页器
      pagination: ".swiper-pagination",
      paginationElement: "span",
      paginationClickable: true,
      observer: true,
      observeParents: true,
      cursor: true
    });
  },
  components: {
    pagination
  }
};
</script>

<style scoped lang="scss">
.f_box {
  .nav_hr {
    background-color: #e7e7e7;
    height: 75px;
    line-height: 75px;

    .nav_text {
      width: 1200px;
      margin: 0 auto;
      font-size: 18px;

      span {
        cursor: pointer;

        &:hover {
          color: #da9b42;
        }
      }
    }
  }

  .f_info {
    width: 1200px;
    margin: 0 auto;
    padding: 80px 0 70px 0;
    overflow: hidden;

    .f_left {
      width: 480px;
      float: left;

      .about {
        font-size: 60px;
        /*px*/
        font-weight: bold;
        color: rgba(0, 0, 0, 0.2);
        padding: 0 0 35px 20px;
      }

      .f_intro_title {
        font-size: 24px;
        color: #000;
        font-weight: bold;
      }

      .f_intro_titles {
        font-size: 16px;
        font-weight: bold;
        padding: 13px 0;
      }

      .f_intro {
        font-size: 16px;
        color: #000;
        text-indent: 2em;
        line-height: 25px;
        text-align: justify;
      }
    }

    .f_right {
      float: right;
      width: 689px;
      height: 412px;
      overflow: hidden;

      .swiper-container {
        height: 100%;

        /deep/ .swiper-pagination-bullet-active {
          background: #fff;
        }
      }

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }

  .f_list {
    width: 1200px;
    margin: 0 auto;

    .f_top {
      border-bottom: 1px solid #b47c2d;

      span {
        display: inline-block;
        margin-right: 50px;
        height: 100%;
        line-height: 1;
        padding: 6px 0;
        font-size: 18px;
        cursor: pointer;
      }

      .span_active {
        border-bottom: 3px solid #b47c2d;
        font-size: 20px;
        font-weight: bold;
        transform: initial;
      }
    }

    .my_trip {
      padding: 21px 41px;
      background-color: #f5f5f5;
      border-radius: 30px;
      color: #b47c2d;
      font-size: 18px;
      text-align: right;
      margin: 15px 0;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        background-color: rgba(180, 124, 45, 0.9);
        color: #fff;
      }
    }

    .film_list {
      margin: 0 0 50px 0;

      .nodata {
        font-size: 18px;
        color: #ccc;
        text-align: center;
        padding: 50px 0;
      }

      .film_item {
        padding: 50px 0 30px 0;
        border-bottom: 1px solid #b47c2d;
        overflow: hidden;

        .film_img {
          float: left;
          width: 300px;
          height: 418px;
          text-align: center;
          line-height: 418px;
          background-color: #f5f5f5;
          overflow: hidden;

          img {
            width: 100%;
            display: inline-block;
            vertical-align: middle;
          }
        }

        .film_info {
          float: right;
          width: 840px;

          .film_name_box {
            overflow: hidden;
            padding: 28px 0 0 0;

            .film_name {
              font-size: 24px;
              line-height: 30px;
              color: #000;
              float: left;
              /*&:hover {*/
              /*color: #EE8E41;*/
              /*cursor: pointer;*/
              /*}*/
            }

            .film_join {
              float: right;
              font-size: 18px;
              color: #b47c2d;
              cursor: pointer;
              border: 1px dashed #b47c2d;
              border-radius: 16px;
              padding: 0 0 5px 0;
              width: 159px;
              text-align: center;
              display: inline-block;

              .plus {
                font-size: 25px;
                font-weight: bold;
              }

              .join {
                font-size: 18px;
              }
            }
          }

          .film_detail {
            font-size: 18px;

            p {
              padding: 0 0 15px 0;

              .span {
                border: 1px solid #cc974c;
                padding: 5px 15px;
                color: #cc974c;
                font-size: 16px;
                display: inline-block;
                border-radius: 8px;
              }
            }

            .film_content {
              height: 86px;
              line-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }

          .film_btn {
            float: right;
            min-width: 148px;
            padding: 12px;
            background: #b47c2d;
            border-radius: 24px;
            color: #fff;
            font-size: 20px;
            margin-top: 50px;
            text-align: center;
            cursor: pointer;

            &:active {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
}
</style>
