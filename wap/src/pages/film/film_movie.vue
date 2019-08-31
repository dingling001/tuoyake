<template>
  <div class="movie">
    <div class="swiper-container banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in index_swiper" :key="index">
          <img :src="item" alt>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="movie_name">{{m_info.cinema_name}}</div>
    <div :class="['movie_content',showmore?'movie_content_auto':'']">
      {{m_info.content}}
      <div class="movie_mold" v-if="!showmore"></div>
    </div>
    <div class="look_more" @click="showmore=!showmore">
      <span v-if="showmore">收起介绍</span>
      <span v-else>查看全部介绍</span>
      <span :class="['iconfont', showmore?'iconyou-copy-copy':' iconyou-copy']"></span>
    </div>
    <div class="line"></div>
    <div class="movelist" v-if="movie_list.length>0">
      <div class="movie_item" v-for="item in movie_list">
        <div class="img">
          <img :src="item.img" alt="">
        </div>
        <div class="m_right">
          <div class="title_box">
            <span class="title_name">{{item.movie_name}}</span>
            <span class="m_trip" v-if="item.is_trip==0" @click="join_trip(item.movie_id)">
                            <span class="iconfont iconaddTodo-nav"></span>加入行程单
                        </span>
            <router-link class="m_trip" v-else tag="span" to="/travel">
              查看行程单
            </router-link>
          </div>
          <span class="is_type"><span v-if="item.movie_type==1">3D</span>
                        <span v-else-if="item.movie_type==2">2D</span>
                        <span v-else-if="item.movie_type==3">沉浸式</span>
                    </span>
          <div class="long_time">片长：{{item.long_time}}分钟</div>
          <div class="movie_intro">{{item.content}}</div>
          <div class="movie_btn"><span class="movie_price">成人 <span><span
            class="price">￥</span>{{item.price}}</span></span><span
            class="btn" @click="go_buy(item.movie_id,item.td_id,item.movie_name)">购票</span></div>
        </div>
      </div>
    </div>
    <div class="nodata" v-else>当前日期暂无影片</div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import {Indicator} from 'mint-ui';

  export default {
    name: "film_movie",
    data() {
      return {
        date: '',
        m_info: {},
        index_swiper: [],
        showmore: false,
        movie_list: [],
        isActive: false,
        liConHeight: '',
        cinema_id: '',
        cinema_name: '',
        isocdein: 0
      }
    },
    inject: ['app'],
    created() {
      this.date = this.$route.query.date;
      this.cinema_id = this.$route.query.cinema_id;
      this.isocdein = this.$route.query.isocdein || '';
      this.get_CinemaDateMovie()
      this.get_CinemaInfo()
      // localStorage.setItem('app_token', '879a0d63220e6f043907e53235fde423')
    },
    methods: {
      // 获取简介
      get_CinemaInfo() {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        this.$api.CinemaInfo(this.cinema_id).then(res => {
          if (res.status == 1) {
            this.index_swiper = res.data.img;
            this.m_info = res.data;
            var mySwiper = new Swiper('.swiper-container', {
              slidesPerView: 'auto', //重要 可以去swiper搜索
              centeredSlides: true,   //重要
              paginationClickable: true,
              effect: 'left',
              // loop: true,
              coverflowEffect: {
                rotate: 20,
                stretch: 10,
                depth: 60,
                modifier: 2,
              },
              pagination: '.swiper-pagination',
              lazy: {
                loadPrevNext: true,
              },
              observer: true,
              observeParents: true
            })
          } else {
            // this.$router.replace('/film/film_index')
          }
          Indicator.close();
        })
      },
      // 获取列表
      get_CinemaDateMovie() {
        var isocdein = this.isocdein == 1 ? 'uncheck' : '';
        this.$api.CinemaDateMovie(this.date, this.cinema_id, isocdein).then(res => {
          if (res.status == 1) {
            this.movie_list = res.data;
          } else {
            this.$router.replace('/film/film_index')
          }
        })
      },
      // 加入行程单
      join_trip(id) {
        this.$api.AddTrip(localStorage.getItem('app_token'), id).then(res => {
          this.get_CinemaDateMovie()
        })
      },
      // 购票
      go_buy(movie_id, td_id, movie_name) {
        this.$router.push({
          path: '/film/film_item',
          query: {movie_id: movie_id, td_id: td_id, movie_name: movie_name, cinema_id: this.cinema_id}
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '@/style/mixin.scss';

  .movie {
    .banner {
      height: 220px;

      /deep/ .swiper-pagination-bullets, /deep/ .swiper-pagination-custom, /deep/ .swiper-pagination-fraction {
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
            width: 100%;
            border-radius: 10px;
          }
        }

        .swiper-slide-active {
          transform: scale(1);
        }
      }


      /deep/ .swiper-pagination .swiper-pagination-bullet {
        width: 12px;
        height: 4px;
        background: $baseClr;
        transition: 0.3s ease-in-out;
        border-radius: 3px;
      }

      /deep/ .swiper-pagination .swiper-pagination-bullet-active {
        height: 4px;
        width: 20px;
        background: $baseClr;
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
      transition: height .3s;
      position: relative;

      .movie_mold {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .2), #fff);
      }
    }

    .movie_content_auto {
      height: auto;
    }

    .look_more {
      text-align: center;
      color: $baseClr;
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
      background-color: #ECECEC;
    }

    .movelist {
      margin: 0 12px;
      padding: 0 0 50px 0;

      .movie_item {
        padding: 12px 0;
        border-bottom: 1px solid rgba(191, 191, 191, .18);
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
              height: 26px;
              line-height: 26px;
              font-size: 16px;
              /*px*/
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: justify;
              white-space: nowrap;
            }

            .m_trip {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 5px 8px;
              border-radius: 11px;
              /*no*/
              color: $baseClr;
              font-size: 12px;
              /*px*/
              border: 1px solid $baseClr;
              /*no*/
              flex-shrink: 0
            }
          }

          .is_type {
            text-align: center;
            color: $baseClr;
            line-height: 15px;
            border-radius: 4px;
            /*no*/
            border: 1px solid $baseClr;
            /*no*/
            font-size: 10px;
            /*px*/
            padding: 0 8px;
            margin: 5px 0;
            display: inline-block;

            span {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2px 0;
            }
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
              color: rgba(53, 53, 53, .5);
              font-size: 11px;
              /*px*/
              span {
                color: $baseClr;
                font-size: 17px;
                font-weight: bold;

                .price {
                  font-size: 14px;
                  font-weight: normal;
                }
              }
            }

            .btn {
              width: 64px;
              height: 30px;
              line-height: 30px;
              background-color: $baseClr;
              color: #fff;
              text-align: center;
              border-radius: 4px;
              /*no*/
              font-size: 14px;
              /*px*/
              &:active {
                opacity: .7;
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
