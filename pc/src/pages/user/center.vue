<template>
  <!-- 右侧部分 -->
  <div class="user-r">
    <h3 class="travel-title">
      我的行程单(
      <span class="num">{{un_look_num+exhibiton_count}}</span>
      )～
      <span class="time">约{{((exhibiton_count*5+un_look_num*20)/60).toFixed(2)}}h</span>
    </h3>
    <!-- 票务部分 -->
    <div class="ticket item" @click="goPw">
      <div class="item-slide">
        {{list.length>0?'参观门票请参观当日凭预约时填写的证件，检票入馆':"暂无购票，您可以点击此处进行票务预约"}}
        <i
          class="iconfont iconfanhui1"
          :class="{'down':cur==-4}"
          v-if="list.length>0"
        ></i>
        <span v-if="list.length==0">去预约</span>
      </div>
      <ul class="ticket-item" v-if="cur==-4&&list.length>0">
        <li v-for="(item,index) in list" :key="index">
          <h3>{{item.t_date_show}}</h3>
          <p>{{item.ticket_name}}</p>
        </li>
      </ul>
    </div>
    <!-- 影院部分 -->
    <div class="item" @click="showM">
      <div class="item-slide">
        {{order_data.length>0?'参观门票请参观当日凭预约时填写的证件，检票入馆':"一个电影行程，点击此处进行影片预约"}}
        <i
          class="iconfont iconfanhui1"
          :class="{'down':cur==-2}"
          v-if="un_look_num>0"
        ></i>
        <span v-if="un_look_num==0">去购票</span>
      </div>
      <ul class="ticket-item" v-if="cur==-2">
        <li v-for="(item,index) in order_data" :key="index" @click="goMovieDetail(item.order_id)">
          <h3>
            <span class="date">{{item.movie_date}}</span>
            <span class="week">{{item.week}}</span>
            <span class="time">{{item.start_time}}-{{item.end_time}}</span>
          </h3>
          <p class="movie-title">{{item.movie_name}}</p>
          <div class="seat-wrapper">
            <div class="seat-item" v-for="(i,ins) in item.seat_arr" :key="ins">{{i.seat_name}}</div>
          </div>
        </li>
      </ul>
      <ul class="ticket-item" v-if="cur==-2">
        <li v-for="(item,index) in my_trip" :key="index" @click="goMovie">
          <h3>{{item.movie_name}}</h3>
          <p class="times">片长：{{item.long_time}}分钟</p>
          <div class="money">
            <span>￥{{item.price}}</span>起
          </div>
          <div class="btns">购票</div>
        </li>
      </ul>
    </div>
    <!-- 展品部分 -->
    <div class="item" v-for="(item,index) in travels" :key="index">
      <div class="item-slide" @click="showE(index)">
        {{item.exhibition_name}}{{item.exhibit_list.length}}件展品行程
        <i
          class="iconfont iconfanhui1"
          :class="{'down':cur==index}"
        ></i>
      </div>
      <ul class="item-container" v-if="cur==index">
        <li
          class="list-item"
          v-for="(i,ind) in item.exhibit_list"
          :key="ind"
          @click="goDetail(i.exhibit_id)"
        >
          <div class="list-box">
            <div class="list-img">
              <i class="iconfont iconx" @click.stop="deleteItem(i.exhibit_id,item,ind,index)"></i>
              <img :src="$toThumbsimg(i.exhibit_img,124,124,33,$web)" alt>
            </div>
            <h3 class="title">{{i.exhibit_name}}</h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "center",
  data() {
    return {
      travels: [],
      my_trip: [],
      list: [],
      cur: -1,
      order_data: [],
      un_look_num: 0, //影院行程单总数，
      exhibiton_count: 0 // 行程单展品总数
    };
  },
  mounted() {
    this.getTravel();
    this.getMovie();
    this.getPw();
  },
  methods: {
    getTravel() {
      this.$api.getC().then(res => {
        if (res.status == 1) {
          this.travels = res.data;
          this.travels.map((item, index) => {
            this.exhibiton_count += item.exhibit_count;
          });
        }
      });
    },
    goMovieDetail(id) {
      this.$router.push({ path: "/film/film_order", query: { order_id: id } });
    },
    showE(index) {
      if (index == this.cur) {
        this.cur = -1;
      } else {
        this.cur = index;
      }
    },
    //电影票切换实现
    showM() {
      if (this.un_look_num == 0) {
        this.$router.push("/film/film_index");
        return false;
      }
      if (this.cur == -2) {
        return (this.cur = -3);
      }
      this.cur = -2;
    },
    //前往票务预约
    goPw() {
      if (this.list.length == 0) {
        this.$router.push("/pw/person/index");
      } else {
        if (this.cur == -4) {
          return (this.cur = -1);
        }
        this.cur = -4;
      }
    },
    // 跳转展品的详情页
    goDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
    },
    goMovie() {
      this.$router.push("/film/film_index");
    },
    getMovie() {
      this.$api.getMovie().then(res => {
        if (res.status == 1) {
          this.my_trip = res.data.my_trip;
          this.un_look_num = res.data.un_look_num;
          this.order_data = res.data.order_data;
        }
      });
    },
    getPw() {
      this.$api.getPw().then(res => {
        if (res.status == 1) {
          this.list = res.data;
        }
      });
    },
    deleteItem(id, item, index, i) {
      // 删除
      this.$api.cancelTravel(id).then(res => {
        if (res.status == 1) {
          item.exhibit_list.splice(index, 1);
          if (item.exhibit_list.length == 0) {
            this.travels.splice(i, 1);
            this.cur = -1;
          }
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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
.container {
  width: 1200px;
  margin: 0 auto;
}

.top {
  width: 100%;
  height: 172px;
  background: url(../.././img/u_t.png) no-repeat;
  background-size: cover;
}
.user-main {
  margin-top: 30px;
  border-top: 1px solid #b47c2d;
  padding: 20px 0;
  display: flex;
}
.usernav {
  width: 218px;
  margin-right: 10px;
  background: rgba(219, 219, 219, 0.2);
  border: 1px solid rgba(170, 170, 170, 0.2);
}
.user-r {
  flex: 1;
  padding-left: 14px;
  h3.travel-title {
    height: 60px;
    line-height: 60px;
    background: #fbf8f4;
    border-bottom: 2px solid #b47c2d;
    font-size: 18px;
    color: #b47c2d;
    padding: 0 30px;
    font-weight: 400;
    overflow: hidden;
    .num {
      display: inline-block;
      margin: 0 3px;
    }
    span.time {
      float: right;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
.ticket {
  padding-top: 20px;
}
.item {
  position: relative;
  padding: 0 30px 0 60px;
  font-size: 20px;
  .item-slide {
    border-bottom: 1px solid #f2f2f2;
    overflow: hidden;
    height: 70px;
    line-height: 70px;
    span {
      float: right;
      cursor: pointer;
      color: #b47c2d;
    }
  }
  i {
    float: right;
    &.iconfanhui1.down {
      transform: rotate(90deg);
    }
  }
  &:after {
    content: "";
    width: 11px;
    height: 11px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(181, 181, 181, 1);
    border-radius: 50%;
    position: absolute;
    top: 35px;
    left: 30px;
    margin-top: -5.5px;
  }
  &:before {
    content: "";
    width: 8px;
    height: 100%;
    border-left: 4px dotted #f2f2f2;
    position: absolute;
    top: 35px;
    left: 33px;
  }
  &:last-child:before {
    display: none;
  }
  .ticket-item {
    li {
      border-bottom: 1px solid #f2f2f2;
      position: relative;
    }
    h3 {
      font-size: 18px;
      color: #000;
      margin: 20px 0 15px;
    }
    p {
      font-size: 18px;
      margin-bottom: 20px;
      color: rgba(0, 0, 0, 0.8);
      &.times {
        color: #9b9b9b;
      }
      &.movie-title {
        margin-bottom: 10px;
      }
    }
    .seat-wrapper {
      overflow: hidden;
      margin-bottom: 20px;
      .seat-item {
        width: 66.5px;
        height: 26.5px;
        line-height: 26.5px;
        text-align: center;
        float: left;
        margin-right: 3px;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.8);
        background: url(../.././img/film/immerse_seat.png) no-repeat;
        background-size: cover;
        &:nth-child(5) {
          margin-right: 0;
        }
      }
    }
    .money {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 50%;
      font-size: 18px;
      color: #939393;
      span {
        color: #e8593e;
      }
    }
    .btns {
      width: 84px;
      height: 40px;
      background: rgba(218, 155, 66, 0);
      border: 1px solid rgba(204, 151, 76, 1);
      border-radius: 20px;
      line-height: 40px;
      text-align: center;
      color: #cc974c;
      font-size: 18px;
      cursor: pointer;
      position: absolute;
      right: 12px;
      top: 50%;
      margin-top: -20px;
    }
  }
  .item-container {
    overflow: hidden;
    li {
      margin: 20px 20px 0 0;
      cursor: pointer;
      width: 124px;
      float: left;
      img {
        width: 124px;
        height: 124px;
        border-radius: 4px;
      }
      .list-img {
        position: relative;
        i {
          font-size: 12px;
          position: absolute;
          top: 6px;
          right: 6px;
          z-index: 2;
          border-radius: 50%;
          padding: 5px;
          background: #000;
          color: #fff;
          text-align: center;
          cursor: pointer;
          transition: all 300ms;
          &:hover {
            transform: rotate(360deg);
          }
        }
      }
      .title {
        color: #353535;
        font-size: 16px;
        padding-left: 10px;
        position: relative;
        margin-top: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;

        &:after {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          margin-top: -2px;
          background: #b5b5b5;
          left: 0;
        }
      }
    }
  }
}
</style>