<template>
  <div class="f_box">
    <div class="nav_hr">
      <div class="nav_text">
        <router-link tag="span" to="/">{{$t('navs[0].name') }}</router-link>
        » {{$t('movie') }}
      </div>
    </div>
    <div class="f_info">
      <div class="f_right">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in film_info.img">
              <img :src="item" alt>
            </div>
          </div>
          <!--          <div class="swiper-pagination"></div>-->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="cinema_box">
          <span v-for="(item,index) in cinemalist" @click="changeCinema(index,item.cinema_id)"
                :class="{'c_active':ind==index}">{{item.cinema_name}}
          <span class="iconfont iconshouqi" v-if="ind==index"></span>
          </span>
          <!--          <span>星空剧场</span>-->
        </div>
      </div>
      <div class="f_left">
        <!--<div class="about">about</div>-->
        <div class="f_intro_title">{{film_info.cinema_name}}简介</div>
        <div class="f_intro_titles">{{film_info.address}}</div>
        <div class="f_intro" v-html="film_info.content"></div>
      </div>
    </div>
    <div class="f_list" v-loading="tabshow">
      <div class="f_top">
        <span :class="[tab==0?'span_active':'']" @click="tab_fun(0)">正在热映（{{movie_num}}）</span>
        <span :class="[tab==1?'span_active':'']" @click="tab_fun(1)">即将上映（{{j_movie_num}}）</span>
      </div>
      <div
        class="my_trip"
        @click="go_mycenter"
        v-if="tab==0"
      >查看我的行程单({{trip_num?trip_num:0}})～
      </div>
      <div v-if="tab==0">
        <div class="film_list" v-if="movie_list.length>0">
          <div class="film_item" v-for="(item,index) in movie_list">
            <div class="film_img">
              <img :src="$toThumbsimg(item.img,299,481,33,$moive)" alt :title="item.movie_name">
              <div class="cinema_name">{{item.cinema_name}}</div>
            </div>
            <div class="film_info">
              <div class="film_name_box">
                <div class="film_name">{{item.movie_name}}</div>
                <div class="film_join" @click="del_DelTrip(index)" v-if="item.is_trip==1">
                  <span class="film_cancel">取消加入</span>
                </div>
                <div class="film_join" @click="put_AddTrip(index)" v-else>
                  <span class="iconfont iconaddTodo-nav"></span>
                  <span class="join">加入行程单</span>
                </div>
                <!--<span class="join">加入行程单</span>-->
              </div>
              <div class="film_detail">
                <p >
                  <span class="span" v-if="item.type==1">3D</span>
                  <span class="span" v-else-if="item.type==2">2D</span>
                  <span class="span" v-else-if="item.type==3&&item.cinema_id==1">沉浸式体验</span>
                  <span class="span" v-else-if="item.type==3&&item.cinema_id==2">球幕</span>

                </p>
                <p>影片时长：{{item.long_time}}分钟</p>
                <p>放映地址：{{item.address}} {{item.cinema_name}}</p>
                <p>
                  票
                  <span style="color: #fff;user-select: none">票价</span>
                  价：￥{{item.price}}/张
                </p>
                <div class="film_content" v-html="item.content">
                  <!--<div class="text">-->
                  <!--</div>-->
                </div>
                <div class="film_btn" @click="choose_date(item.movie_id,item.cinema_id,item.type)">购票</div>
              </div>
            </div>
          </div>
        </div>
        <div class="film_list" v-else>
          <div class="nodata">暂无数据</div>
        </div>
      </div>
      <div v-else>
        <div class="film_list" v-if="movie_listing.length>0">
          <div class="film_item" v-for="(item,index) in movie_listing">
            <div class="film_img">
              <img :src="$toThumbsimg(item.img,299,481,33,$moive)" alt :title="item.movie_name">
              <div class="cinema_name" v-if="item.cinema_name">{{item.cinema_name}}</div>
            </div>
            <div class="film_info">
              <div class="film_name_box">
                <div class="film_name">{{item.movie_name}}</div>
                <!--<span class="join">加入行程单</span>-->
              </div>
              <div class="film_detail">
                <p v-if="item.cinema_id==1">
                  <span class="span" v-if="item.type==1">3D</span>
                  <span class="span" v-else-if="item.type==2">2D</span>
                  <span class="span" v-else-if="item.type==3">沉浸式体验</span>
                </p>
                <p>影片时长：{{item.long_time}}分钟</p>
                <p>放映地址：{{item.address}}</p>
                <p>
                  票
                  <span style="color: #fff;user-select: none">票价</span>
                  价：￥{{item.price}}/张
                </p>
                <div class="film_content" v-html="item.content">
                  <!--<div class="text">-->
                  <!--</div>-->
                </div>
                <div class="film_btn" @click="choose_date(item.movie_id,item.cinema_id,item.type)">查看详情</div>
              </div>
            </div>
          </div>
        </div>
        <div class="film_list" v-else>
          <div class="nodata">暂无数据</div>
        </div>
      </div>
      <pagination
        :totalPages="re_total"
        @presentPage="getPresentPage"
        v-if="re_total > 1&&tab==0"
        style="width: 960px;margin: 20px auto;"
      ></pagination>
      <pagination
        v-else
        :totalPages="j_retotal"
        @presentPage="getPresentPage_j"
        v-if="j_retotal > 1"
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
        trip_num: 0,
        tabshow: true,
        cinema_id: '1',
        cinemalist: [],
        ind: 0
      };
    },
    inject: ["app"],
    created() {
      if (localStorage.getItem("api_token")) {
        this.get_FilmMyTrip();
      }
      this.ge_CinemaList();
      this.get_MovieList(0);
      this.get_JjsyMovieList(0);
      this.get_CinemaInfo();
      localStorage.removeItem('film_post')
    },
    methods: {
      // 获取影院列表
      ge_CinemaList() {
        this.$api.CinemaList().then(res => {
          this.cinemalist = res.data;
        });
      },
      changeCinema(index, id) {
        this.ind = index;
        this.cinema_id = id;
        this.get_CinemaInfo()
      },
      // 获取首页信息
      get_CinemaInfo() {
        this.$api.CinemaInfo(this.cinema_id).then(res => {
          this.film_info = res.data;
        });
      },
      // 获取热映
      get_MovieList(skip) {
        this.$api
          .MovieList(
            localStorage.getItem("api_token"),
            skip * this.take,
            this.take
          )
          .then(res => {
            this.tabshow = false;
            this.movie_list = res.data.movie_list;
            this.movie_num = res.data.movie_num;
            this.re_total = Math.ceil(res.data.movie_num / this.take);
            this.trip_num = res.data.trip_num;
          });
      },
      // 获取即将上映
      get_JjsyMovieList(skip) {
        this.$api.JjsyMovieList(skip * this.take, this.take).then(res => {
          this.j_movie_num = res.data.movie_num;
          this.movie_listing = res.data.movie_list;
          this.j_retotal = Math.ceil(res.data.movie_num / this.take);
        });
      },
      // 去我的行程单
      go_mycenter() {
        if (localStorage.getItem("api_token")) {
          this.$router.push("/center");
        } else {
          this.app.openLogin();
        }
      },
      // 热映分页
      getPresentPage(val) {
        this.page = val - 1;
        this.get_MovieList(this.page);
      },
      // 即将上映分页
      getPresentPage_j(val) {
        this.get_JjsyMovieList(val - 1);
      },
      // 切换热映
      tab_fun(index) {
        this.tab = index;
        if (index == 0) {
          this.get_MovieList(0);
        } else {
          this.get_JjsyMovieList(0);
        }
      },
      // 选座购票
      choose_date(movie_id, cinema_id,type) {
        if (localStorage.getItem("api_token")) {
          this.$router.push({
            path: "/film/film_date",
            query: {movie_id: movie_id, tab: this.tab, cinema_id: cinema_id,type:type}
          });
        } else {
          this.app.openLogin();
        }
      },

      // 添加行程
      put_AddTrip(index) {
        let movie_id = this.movie_list[index].movie_id;
        // if (this.movie_list[index].is_trip == 1) {
        //   this.movie_list[index].is_trip = 0;
        // } else {
        //   this.movie_list[index].is_trip = 1;
        // }
        if (localStorage.getItem("api_token")) {
          this.$api
            .AddTrip(localStorage.getItem("api_token"), movie_id)
            .then(res => {
              if (res.status == 1) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.get_MovieList(this.page);
                this.get_FilmMyTrip()
              }
            });
        } else {
          this.app.openLogin();
        }

      },
      // 取消行程
      del_DelTrip(index) {
        let movie_id = this.movie_list[index].movie_id;
        // if (this.movie_list[index].is_trip == 1) {
        //   this.movie_list[index].is_trip = 0;
        //   this.$message({
        //     message: "取消成功",
        //     type: "error"
        //   });
        // } else {
        //   this.movie_list[index].is_trip = 1;
        //   this.$message({
        //     message: "添加成功",
        //     type: "success"
        //   });
        // }
        this.$api
          .DelTrip(localStorage.getItem("api_token"), movie_id)
          .then(res => {
            if (res.status == 405) {
              this.app.openLogin();
              return
            }
            if (res.status == 1) {
              this.movie_list[index].is_trip = 0;
              this.$message({
                message: "取消成功",
                type: "warning"
              });
              this.get_MovieList(this.page);
            }
            //console.log(res.status);
          });

      },
      // 我的行程单
      get_FilmMyTrip() {
        this.$api.FilmMyTrip(localStorage.getItem("api_token")).then(res => {
          //console.log(res)
          this.un_look_num = res.data.un_look_num;
        });
      }
    },
    mounted() {
      new Swiper(".swiper-container", {
        loop: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        // 如果需要分页器
        // pagination: ".swiper-pagination",
        paginationElement: "span",
        paginationClickable: true,
        observer: true,
        observeParents: true,
        cursor: true,
        speed: 1500,
        on: {
          onSlideChangeEnd: function (swiper) {
            console.log(swiper)
            // alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
          }
        }
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
      margin: 0 auto 50px auto;
      padding: 20px 0 0 0;
      overflow: hidden;

      .f_left {
        /*width: 480px;*/
        /*float: left;*/
        padding: 40px 50px;
        background-color: #F7F7F7;

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
          text-align: center;
        }

        .f_intro_titles {
          font-size: 16px;
          font-weight: bold;
          padding: 20px 0;
          text-align: center;
        }

        .f_intro {
          font-size: 16px;
          color: #000;
          text-indent: 2em;
          line-height: 25px;
          text-align: justify;
          min-height: 212px;
        }
      }

      .f_right {
        /*float: right;*/
        /*width: 689px;*/
        height: 530px;
        overflow: hidden;
        width: 100%;
        position: relative;

        .cinema_box {
          position: absolute;
          height: 52px;
          width: 100%;
          bottom: 0;
          left: 0;
          z-index: 2;
          background-color: rgba(0, 0, 0, .6);
          color: #fff;
          text-align: center;
          line-height: 52px;

          span {
            margin-right: 80px;
            font-size: 18px;
            position: relative;
            cursor: pointer;

            .iconshouqi {
              color: #fff;
              position: absolute;
              left: 0;
              right: 0;
              margin: 0 auto;
              bottom: -37px;
              font-size: 20px;
              transition: .3s all;
            }
          }

          .c_active {
            /*color: #b47c2d;*/

            .iconshouqi {
              /*color: #b47c2d;*/
            }
          }
        }

        .swiper-container {
          height: 100%;
          width: 100%;
          /*/deep/ .swiper-pagination-bullet-active {*/
          /*  background: #fff;*/
          /*  transition: all .3s;*/
          /*}*/

          /*/deep/ .swiper-pagination-bullet {*/
          /*  width: 20px;*/
          /*  border-radius: 3px;*/
          /*}*/
          /deep/ .swiper-slide {
            font-size: 0;
            line-height: 100%;
          }

          /deep/ .swiper-button-prev {
            width: 42px;
            height: 42px;
            background-size: cover;
            background-image: url("../../../src/img/film/f_left.png");
          }

          /deep/ .swiper-button-next {
            width: 42px;
            height: 42px;
            background-size: cover;
            background-image: url("../../../src/img/film/f_right.png");
          }
        }

        img {
          width: 100%;
          /*height: 100%;*/
          /*cursor: pointer;*/
          vertical-align: middle;
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
          padding: 50px 30px 30px 30px;
          border-bottom: 1px solid #b47c2d;
          overflow: hidden;
          margin: 0;

          .film_img {
            float: left;
            width: 300px;
            height: 418px;
            text-align: center;
            line-height: 418px;
            background-color: #f5f5f5;
            /*overflow: hidden;*/
            position: relative;

            .cinema_name {
              position: absolute;
              left: -10px;
              top: 20px;
              z-index: 2;
              font-size: 12px;
              color: #fff;
              /*height: 30px;*/
              padding: 5px 13px;
              line-height: normal;
              background-color: #F12E2E;
              border-radius: 3px;
            }

            img {
              height: 100%;
              display: inline-block;
              vertical-align: middle;
            }
          }

          .film_info {
            float: right;
            width: 810px;

            .film_name_box {
              overflow: hidden;
              padding: 28px  0 0 0;

              .film_name {
                font-size: 24px;
                color: #000;
                float: left;
                height: 32px;
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
                /*padding: 0 0 5px 0;*/
                height: 32px;
                line-height: 32px;
                width: 159px;
                text-align: center;
                display: inline-block;

                .iconaddTodo-nav {
                  font-size: 20px;
                  font-weight: bold;
                  /*transition: ease-in-out .3s;*/
                }

                .join {
                  font-size: 18px;
                  /*transition: ease-in-out .3s;*/
                }

                .film_cancel {
                  /*padding: 7px 0 0 0;*/
                  display: inline-block;
                  /*transition: ease-in-out .3s;*/
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
              width: 148px;
              padding: 12px 0;
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
