<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">{{$t('navs[0].name')}}</a>
        »
        <a href="javascript:;">{{$t('navs[6].name')}}</a>
      </div>
    </div>
    <div class="carousel_box">
      <div class="carousel">
        <el-carousel :interval="5000" arrow="never" height="670px">
          <el-carousel-item v-for="(item,index) in recommendlist" :key="index">
            <img
              :src="$toThumbsimg(item.active_img, 1920, 670, 33,$active)"
              class="lunbo_img"
              @click="$router.push({path:'/active/activedetail',query:{active_id:item.active_id,active_cate:3}})"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="new-active">
      <div class="new-active-title titles">最新活动</div>
      <div class="new-active-list">
        <ul>
          <li
            v-for="(item,index) in newActiveList"
            :key="index"
            @click="$router.push({path:'/active/activedetail',query:{active_id:item.active_id,active_cate:1}})"
          >
            <img :src="$toThumbsimg(item.active_img, 1200, 580, 33,$active)" />
            <div class="new-active-info">
              <p>{{item.active_name}}</p>
              <p>活动时间：{{item.active_date}}</p>
              <p>活动地点：{{item.active_place}}</p>
              <p>活动类型：{{item.cate_name}}</p>
              <p v-if="item.default_price == 0">活动价格：免费</p>
              <p
                v-if="item.default_price != 0"
              >活动价格：{{item.default_price}}元/{{item.is_type == 1?'人':'组'}}</p>
              <p class="three-line-text">{{item.content}}</p>
              <input type="button" value="活动报名" />
            </div>
            <div class="gradual">
              <p>{{item.active_name}}</p>
              <p>活动时间：{{item.active_date}}</p>
            </div>
          </li>
        </ul>
        <div
          class="see-more"
          @click="$router.push({path:'/active/activelist',query:{active_cate:1}})"
        >
          查看更多
          <i class="iconfont iconiconfontjiantou"></i>
        </div>
      </div>
    </div>
    <div style="background: #F2F2F2;">
      <div class="old-active-list">
        <div class="old-active-title titles">活动回顾</div>
        <ul>
          <li
            v-for="(item,index) in backActiveList"
            @click="$router.push({path:'/active/activedetail',query:{active_id:item.active_id,active_cate:2}})"
          >
            <img :src="$toThumbsimg(item.active_img, 592, 286, 33,$active)" />
            <div class="gradual">
              <p>{{item.active_name}}</p>
              <p>活动时间：{{item.active_date}}</p>
            </div>
          </li>
        </ul>
        <div
          class="see-more"
          @click="$router.push({path:'/active/activelist',query:{active_cate:2}})"
        >
          查看更多
          <i class="iconfont iconiconfontjiantou"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendlist: [], //活动推荐列表-轮播数据
      newActiveList: [], //最新活动列表
      backActiveList: [] //活动回顾列表
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        var state = val.query.state;
        var that = this;
        switch (state) {
          case "about":
            that.tab_footer(2);
            break;
          case "intro":
            that.tab_footer(0);
            break;
          case "zixun":
            that.tab_footer(1);
            break;
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted() {
    this.getActiveList();
    setTimeout(() => {
      var state = this.$route.query.state;
      var that = this;
      switch (state) {
        case "about":
          that.tab_footer(2);
          break;
        case "intro":
          that.tab_footer(0);
          break;
        case "zixun":
          that.tab_footer(1);
          break;
      }
    }, 500);
  },
  methods: {
    // 底部切换
    tab_footer(index) {
      let jump = document.querySelectorAll(".titles");
      let total = jump[index].offsetTop - 100;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 100;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }

      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }

      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
    },
    getActiveList() {
      const v = this;
      v.$api.activeList().then(res => {
        v.recommendlist = res.data.recommend;
        v.newActiveList = res.data.new;
        v.backActiveList = res.data.back;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 75px;
  line-height: 75px;
  .topbar {
    width: 1200px;
    margin: 0 auto;
    height: 75px;
    line-height: 75px;
    color: #000;
    font-size: 18px;
  }
  .topbar a {
    text-decoration: none;
    color: #000;
    margin: 0 4px;
  }
  .topbar a:hover {
    color: #b47c2d;
  }
}
/*轮播*/

.carousel_box {
  width: 100%;
}

.carousel {
  width: 100%;
  height: 670px;
  margin: 0 auto;
}

/deep/ .el-carousel__button {
  width: 28px;
  height: 6px;
  border-radius: 3px;
  background: rgba(192, 25, 32, 0.2);
}

/deep/ .is-active .el-carousel__button {
  background: #c01920;
}

/deep/ .el-carousel__indicator {
  padding: 24px 10px;
}

/deep/ .el-carousel__arrow {
  width: 37px;
  height: 108px;
  i {
    opacity: 0;
  }
}

/deep/ .el-carousel__arrow:hover {
  background-color: rgba(0, 0, 0, 0);
}

/deep/ .el-carousel__arrow--right {
  background: url(../../img/active/arrow_right.png) no-repeat;
}

/deep/ .el-carousel__arrow--left {
  background: url(../../img/active/arrow_left.png) no-repeat;
}

/deep/ .el-carousel__item img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  /* IE 9 */
  -webkit-transform: translate(-50%, -50%);
  /* Safari and Chrome */
  -o-transform: translate(-50%, -50%);
  /* Opera */
  -moz-transform: translate(-50%, -50%);
  /* Firefox */
  cursor: pointer;
}
/*最新活动-活动回顾*/

.new-active-title,
.old-active-title {
  width: 200px;
  text-align: center;
  font-size: 26px;
  color: #000;
  line-height: 26px;
  padding: 0px 0 30px 0;
  margin: 70px auto 35px;
  position: relative;
  &:after {
    content: "";
    width: 58px;
    height: 18px;
    position: absolute;
    top: 20%;
    left: -50px;
    margin-top: -6;
    background: url(../.././img/home/t_l.png) no-repeat;
    background-size: cover;
  }
  &:before {
    content: "";
    width: 58px;
    height: 18px;
    position: absolute;
    top: 20%;
    right: -50px;
    margin-top: -6;
    background: url(../.././img/home/t_r.png) no-repeat;
    background-size: cover;
  }
}

.new-active-list .see-more,
.old-active-list .see-more {
  width: 132px;
  height: 40px;
  background: #d3a55c;
  border-radius: 20px;
  font-size: 18px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  margin: 50px auto;
}
/*最新活动*/

.new-active {
  width: 1200px;
  margin: 0 auto;
}

.new-active-list li {
  width: 1200px;
  height: 580px;
  margin-bottom: 30px;
  cursor: pointer;
  position: relative;
}

.new-active-list li .new-active-info {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(180, 124, 45, 0.9);
  top: 0;
  left: 0;
  color: #fff;
  font-size: 20px;
  overflow: hidden;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  /* Safari */
  z-index: 999;
  opacity: 0;
}

.new-active-list li .gradual,
.old-active-list li .gradual {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 998;
  background: -webkit-linear-gradient(rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.8));
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.8));
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.8));
  /* Firefox 3.6 - 15 */
  background: linear-gradient(rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.8));
  /* 标准的语法 */
}

.new-active-list li .gradual p:first-child {
  margin-top: 500px;
  font-size: 20px;
  color: #fff;
  margin-left: 55px;
  margin-bottom: 10px;
}

.new-active-list li .gradual p:last-child {
  font-size: 16px;
  color: #fff;
  margin-left: 55px;
}

.old-active-list li .gradual p:first-child {
  margin-top: 220px;
  font-size: 20px;
  color: #fff;
  margin-left: 35px;
  margin-bottom: 10px;
}

.old-active-list li .gradual p:last-child {
  font-size: 16px;
  color: #fff;
  margin-left: 35px;
}

.new-active-list li:hover .new-active-info {
  opacity: 1;
}

.new-active-info p:first-child {
  font-size: 30px;
  margin: 60px 0 30px 0;
}

.new-active-info p {
  margin-left: 90px !important;
  line-height: 35px;
  margin-right: 80px;
}

.new-active-info input {
  position: absolute;
  left: 485px;
  bottom: 40px;
  display: block;
  width: 230px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  border: 0;
  background: #eeb260;
  color: #fff;
  font-size: 18px;
  box-shadow: 0px 3px 4px 0px rgba(95, 61, 13, 1);
}

.new-active-list li img {
  display: block;
  width: 1200px;
  height: 580px;
}
/*活动回顾*/

.old-active-list {
  width: 1216px;
  margin: 0 auto;
  overflow: hidden;
}

.old-active-list ul {
  overflow: hidden;
}

.old-active-list li {
  overflow: hidden;
  width: 592px;
  height: 286px;
  margin: 7px 8px;
  float: left;
  cursor: pointer;
  position: relative;
}

.old-active-list li img {
  display: block;
  width: 592px;
  height: 286px;
  transition: all ease-in-out 500ms;
}

.old-active-list li:hover img {
  transform: scale(1.1);
  transition: all ease-in-out 500ms;
}
</style>