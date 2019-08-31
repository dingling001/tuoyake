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
    <div class="look_more" @click="showmore=!showmore" v-if="m_info.content.length>=60">
      <span v-if="showmore">收起介绍</span>
      <span v-else>查看全部介绍</span>
      <span :class="['iconfont', showmore?'iconyou-copy-copy':' iconyou-copy']"></span>
    </div>
    <div class="line"></div>
    <div class="movelist" v-if="movie_list.length>0">
      <div class="movie_item" v-for="(item ,index) in movie_list" @click="openModal(index)">
        <div class="top">
          <span class="one">{{item.start_time}}</span>
          <div class="top_name">{{item.movie_name}}</div>
          <span class="top_price"><span>￥</span>{{item.price}}</span>
        </div>
        <div class="top">
          <span class="one longtime">片长:{{item.long_time}}分钟</span>
          <div class="longtime surplus_num">剩余:{{item.surplus_num<0?0:item.surplus_num}}张</div>
          <span :class="['buybtn',item.surplus_num<=0||!item.is_select?'buybtn_disable':'',]"
                @click.stop="buyfn(item.film_date_layout_id,item.is_select,item.surplus_num)">
            <span v-if="item.surplus_num>0&&item.is_select">购票</span>
            <span v-else-if="item.surplus_num<=0">无票</span>
            <span v-else-if="!item.is_select">停售</span>
            </span>
        </div>
      </div>
    </div>
    <div class="nodata" v-else>当前日期暂无影片</div>
    <div class="endpage" v-if="movie_list.length>=3">到底啦~</div>
    <transition name="fade">
      <div class="cover" v-show="showModal" @click="closeModal" @touchmove.prevent></div>
    </transition>
    <div class="modal" v-show="showModal==1" key="modal1">
      <div class="icon_box" @click="confirm">
        <div class="iconfont iconx"></div>
      </div>
      <div class="modal__body" v-if="movie_list.length">
        <div class="title">
          <img :src="movie_list[ind].img">
        </div>
        <div class="modal_movie_name">{{movie_list[ind].movie_name}}</div>
        <div class="cont">{{movie_list[ind].content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import {Indicator, Toast} from 'mint-ui';
  import {ModalHelper} from '@/assets/js/utils.js';

  export default {
    name: "film_movie",
    data() {
      return {
        date: '',
        m_info: {
          content: ''
        },
        index_swiper: [],
        showmore: false,
        movie_list: [],
        isActive: false,
        liConHeight: '',
        cinema_id: '',
        showModal: 0,
        ind: 0,
        isocdein: ''
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
            this.$router.replace('/film/film_index')
          }
          Indicator.close();
        })
      },
      // 获取列表
      get_CinemaDateMovie() {
        var isocdein = this.isocdein == 1 ? 'uncheck' : '';
        console.log(typeof isocdein)
        this.$api.QmDateMovie(localStorage.getItem('app_token'), this.date, this.cinema_id, isocdein).then(res => {
          if (res.status == 1) {
            this.movie_list = res.data;
            for (let i in this.movie_list) {
              this.movie_list[i].is_select = true;
              var et = this.movie_list[i].end_buy_time
              var stdt = new Date();
              var etdt = new Date(et.replace(/\-/g, "/"));
              if (stdt > etdt) {
                this.movie_list[i].is_select = false;
              }
            }
          } else {
            this.$router.replace('/film/film_index')
          }
        })
      },
      // 购票
      go_buy(movie_id, td_id, movie_name) {

      },
      // 关闭
      closeModal() {
        let v = this;
        v.showModal = 0;
        ModalHelper.beforeClose();
      },
      // 确认关闭
      confirm() {
        let v = this;
        v.closeModal();
      },
      // 打开
      openModal(index) {
        let v = this;
        v.ind = index;
        v.showModal = 1;
        ModalHelper.afterOpen();
      },
      // 弹出信息
      showToast(msg) {
        Toast({
          message: msg,
          position: 'center',
          duration: 2000
        });
      },
      // 去详情页
      buyfn(film_date_layout_id, is_select, surplus_num) {
        if (!is_select) {
          this.showToast('该场次已停止售票');
        } else if (surplus_num <= 0) {
          this.showToast('该场次已售空');
        } else {
          var isocdein = this.isocdein == 1 ? 'uncheck' : '';
          this.$api.SeatInfo(film_date_layout_id,isocdein).then(res => {
            console.log(res)
            if (res.status == 1) {
              if (res.data.allow_order_num <= 0) {
                this.showToast('已超出今天可预约数量')
              } else {
                this.$router.push({
                  path: '/film/film_qnum',
                  query: {film_date_layout_id: film_date_layout_id, cinema_id: this.cinema_id,isocdein:isocdein}
                })
              }
            } else {
              this.showToast(res.msg || '刷新试一下');
            }
          })
        }
      }
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
        background: #B5B5B5;
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
      transform: rotateY(0);
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
        transition: ease-in-out .3s;
      }
    }

    .line {
      height: 10px;
      background-color: #ECECEC;
    }

    .movelist {
      margin: 0 12px;
      /*padding: 0 0 50px 0;*/

      .movie_item {
        padding: 12px 0 0 0;
        border-bottom: 1px solid rgba(191, 191, 191, .18);
        /*no*/
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 19px;
          font-size: 19px;
          /*  px*/
          .top_name {
            color: rgba(0, 0, 0, .85);
            font-weight: normal;
            height: 26px;
            line-height: 26px;
            flex: 1;
            font-size: 17px;
            /*  px*/
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: justify;
            margin: 0 20px;
            white-space: nowrap;
          }

          .top_price {
            color: $baseClr;
            font-size: 18px;
            /*  px*/
            font-weight: bold;

            span {
              font-size: 14px;
              /*  px*/
              font-weight: normal;
            }
          }

          .longtime {
            font-size: 13px;
            /*  px*/
            color: rgba(0, 0, 0, .6);
          }

          .surplus_num {
            flex: 1;
            margin: 0 20px;

          }

          .one {
            width: 90px;
            flex-shrink: 0;
            font-weight: bold;
          }

          .buybtn {
            padding: 7px 15px;
            text-align: center;
            color: #fff;
            background-color: $baseClr;
            font-weight: normal;
            font-size: 18px;
            /*  px*/
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .buybtn_disable {
            background-color: rgba(0, 0, 0, .35)
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

    .endpage {
      background-color: rgba(0, 0, 0, 0.08);
      font-size: 13px;
      color: rgba(0, 0, 0, .5);
      text-align: center;
      height: 81px;
      line-height: 81px;
    }

    .cover {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.45);
      z-index: 9999;
      @extend .layout_fixed_x_center;
    }

    .modal {
      width: 295px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 15px;
      font-size: 13px;
      /*px*/
      background-color: #fff;
      box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.13);
      border-radius: 10px;
      z-index: 10000;

      .icon_box {
        position: absolute;
        right: -13px;
        top: -13px;
        width: 30px;
        height: 30px;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 1);
        /*no*/
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .iconfont {
          color: #fff;
          font-size: 12px;
          /*  px*/
        }
      }

      &__body {
        color: #858585;
        max-height: 400px;
        overflow: scroll;

        .title {
          border-radius: 10px;
          overflow: hidden;
          width: 100%;

          img {
            width: 100%;
            height: auto;
            vertical-align: middle;
            border-radius: 10px;
            /*no*/
          }
        }

        .modal_movie_name {
          text-align: center;
          padding: 10px 0 0 0;
          font-weight: bold;
          font-size: 16px;
          color: #333;
        }

        .cont {
          font-size: 14px;
          /*px*/
          font-weight: 300;
          color: rgba(0, 0, 0, .85);
          line-height: 21px;
          margin: 20px 0;
          text-indent: 2em;
        }
      }

      &__foot {
        display: flex;
        justify-content: center;

        span {
          width: 200px;
          font-size: 18px;
          /*px*/
          line-height: 40px;
          font-weight: bold;
          color: #fff;
          text-align: center;
          display: block;
          background: $baseClr;
          border-radius: 19px;

          &:active {
            opacity: .7;
          }
        }
      }
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.3s;
    }

    .fade-enter,
    .fade-leave-active {
      opacity: 0;
    }
  }
</style>
