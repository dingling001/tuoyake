<template>
  <div class="travel">
    <div class="top">
      <h3>
        参观总行程({{exhibiton_count+un_look_num}})
        <span
          class="right"
          :class="{'mr':showFs}"
        >约{{((exhibiton_count*5+un_look_num*20)/60).toFixed(2)}}h</span>
        <div class="change" v-if="showFs" @click="siteF=true">
          <img src="../.././img/nav/icon.png" alt />
          {{site}}
          <i class="iconfont" :class="{'iconzhankai':!showF,'iconshouqi':showF}"></i>
          <div class="site-wrapper" v-if="siteF" v-clickoutside="handleClose">
            <div
              class="items"
              v-for="(item, index) in siteArr"
              :key="index"
              @click="goSite(item.url,item.name)"
            >{{item.name}}</div>
          </div>
        </div>
      </h3>
    </div>
    <div>
      <div class="item ticket" @click="goPw">
        <div class="item-content">
          <i class="iconfont iconticket"></i>
          <i class="iconfont iconfanhui1" :class="{'down':cur==-4}"></i>
          <h3>{{list.length==0?'暂未购票':"参观门票"}}</h3>
          <p>{{list.length==0?'您可以点击此处进行票务预约':"请参观当日凭预约时填写的证件，检票入馆"}}</p>
        </div>
      </div>
      <ul class="ticket-wrapper" v-if="cur==-4&&list.length>0">
        <li v-for="(item,index) in list" :key="index">
          <h3>
            {{item.t_date_show}}
            <span class="status">未参观</span>
          </h3>
          <p>{{item.ticket_name}}</p>
        </li>
      </ul>
    </div>
    <div>
      <div class="item movie" @click="showM">
        <div class="item-content">
          <i class="iconfont icondianying"></i>
          <i class="iconfont iconfanhui1" :class="{'down':cur==-2}"></i>
          <h3>{{order_data.length>0?"电影票":"暂未购票"}}</h3>
          <p>{{order_data.length>0?"请参观当日凭预约时填写的证件，检票入馆观影":"您可以点击此处进行影片预约"}}</p>
        </div>
      </div>
      <ul class="ticket-wrapper" v-if="cur==-2&&order_data.length>0">
        <li v-for="(item,index) in order_data" :key="index" @click="goMovieDetail(item.order_id)">
          <h3>
            <span class="date">{{item.movie_date | subtstr}}</span>
            <span class="week">{{item.week}}</span>
            <span class="time">{{item.start_time}}-{{item.end_time}}</span>
            <span class="status">未观影</span>
          </h3>
          <p>{{item.movie_name}}</p>
          <div class="seat-wrapper">
            <div class="seat-item" v-for="(i,ins) in item.seat_arr" :key="ins">{{i.seat_name}}</div>
          </div>
        </li>
      </ul>
      <ul class="ticket-wrapper movie-wrapper" v-if="cur==-2&&order_data.length==0">
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

    <div class="item-wrapper" v-for="(item,index) in travels" :key="index">
      <div class="item" :class="'item'+item.exhibition_id" @click="showE(index)">
        <div class="item-content">
          <i class="iconfont iconzhanting"></i>
          <i class="iconfont iconfanhui1" :class="{'down':cur==index}"></i>
          <h1>{{item.exhibition_name}}({{item.exhibit_list.length}})</h1>
        </div>
      </div>
      <ul class="container" v-if="cur==index">
        <li class="list-item" v-for="(i,ind) in item.exhibit_list" :key="ind" data-type="0">
          <div
            class="list-box"
            @touchstart.capture="touchStart"
            @touchend.capture="touchEnd"
            @click="skip"
          >
            <div class="list-img" @click.stop="goDetail(i.exhibit_id)">
              <img :src="$toThumbsimg(i.exhibit_img,375,375,33,$web)" alt />
            </div>
            <h3 class="title">{{i.exhibit_name}}</h3>
            <p class="btn">{{i.is_visited==0?'未参观':"已参观"}}</p>
          </div>
          <div class="delete" @click="deleteItem(i.exhibit_id,item,$event)" :data-index="index">删除</div>
        </li>
      </ul>
    </div>
    <div class="footer" v-if="showFs">
      <div class="watch" v-if="exhibiton_count>0" @click="goTravel">查看行程单</div>
      <div class="wrapper">
        <div
          class="item"
          v-for="(item,index) in outsideNav"
          :key="index"
          @click="goItem(index,item.url)"
        >
          <img :src="curs==index?url+item.iconIng:url+item.icon" alt />
          <h3 :class="{'active':curs==index}">{{item.name}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import clickoutside from "../../bin/close";
import { Toast } from "mint-ui";
export default {
  name: "travel",
  directives: { clickoutside },
  data() {
    return {
      site: "馆内",
      type: "",
      siteF: false,
      showF: false,
      showFs: false,
      travels: [],
      my_trip: [],
      order_data: [],
      curs: 1,
      list: [],
      url: STATIC_WEB_URL,
      ata: [],
      un_look_num: 0, //影院行程单总数，
      exhibiton_count: 0, // 行程单展品总数
      count: 0,
      cur: -1,
      time: 54,
      startX: 0, //触摸位置
      endX: 0, //结束位置
      outsideNav: [
        {
          id: 0,
          name: "导览",
          url: "/pages/inside/index/index",
          icon: "/wxmini/icon_06.png",
          iconIng: "/wxmini/icon_06_ing.png"
        },
        {
          id: 1,
          name: "行程单",
          url: "/pages/inside/xingcheng/index",
          icon: "/wxmini/icon_07.png",
          iconIng: "/wxmini/icon_07_ing.png"
        },
        {
          id: 2,
          name: "我的",
          url: "/pages/user/index",
          icon: "/wxmini/icon_05.png",
          iconIng: "/wxmini/icon_05_ing.png"
        }
      ],
      api_token: "",
      siteArr: [
        {
          name: "馆外",
          url: "/pages/outside/index/index"
        },
        {
          id: 1,
          name: "周边",
          url: "/pages/around/index/index"
        },
        {
          id: 2,
          name: "馆内",
          url: "/pages/inside/interest/index"
        }
      ]
    };
  },
  filters: {
    subtstr: function(value) {
      return value.substring(5);
    }
  },
  methods: {
    handleClose() {
      this.siteF = false;
    },
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
    goSite(url, name) {
      this.site = name;
      this.siteF = false;
      if (PLAT == "wxmini") {
        wx.miniProgram.reLaunch({
          url: url
        });
        return false;
      }
    },
    goTravel() {
      if (PLAT == "wxmini") {
        wx.miniProgram.navigateTo({
          url: "/pages/inside/xingchengdan/index"
        });
        return false;
      }
    },
    goMovie() {
      this.$router.push("/yingyuan");
      //this.$router.push("/film/film_index");
    },
    goMovieDetail(id) {
      this.$router.push({ path: "film/film_detail", query: { order_id: id } });
    },
    showE(index) {
      if (index == this.cur) {
        this.cur = -1;
      } else {
        this.cur = index;
      }
    },
    goItem(index, url) {
      this.curs = index;
      if (PLAT == "wxmini") {
        wx.miniProgram.reLaunch({
          url: url
        });
        return false;
      }
    },
    getParams(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      var q = window.location.pathname.substr(1).match(reg_rewrite);
      if (r != null) {
        return unescape(r[2]);
      } else if (q != null) {
        return unescape(q[2]);
      } else {
        return null;
      }
    },
    showM() {
      if (this.my_trip.length == 0 && this.order_data.length == 0) {
        //this.$router.push("/yingyuan");
        this.$router.push("/film/film_index");
        return false;
      }
      if (this.cur == -2) {
        return (this.cur = -3);
      }
      this.cur = -2;
    },
    getTravel() {
      this.$api.getC().then(res => {
        if (res.status == 1) {
          this.travels = res.data;
          this.travels.map((item, index) => {
            this.exhibiton_count += item.exhibit_count;
          });
          console.log(this.exhibiton_count);
        }
      });
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
    skip() {
      if (this.checkSlide()) {
        this.restSlide();
      }
    },
    getPw() {
      this.$api.getPw().then(res => {
        if (res.status == 1) {
          this.list = res.data;
        }
      });
    },
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".list-item");
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    //复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll(".list-item");
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    //删除
    deleteItem(id, item, e) {
      // 当前索引
      let index = e.currentTarget.dataset.index;
      // 复位
      this.restSlide();
      // 删除
      let that = this;
      this.$api.cancelTravel(id).then(res => {
        if (res.status == 1) {
          item.exhibit_list.splice(index, 1);
          if (item.exhibit_list.length == 0) {
            that.travels.splice(index, 1);
            that.cur = -1;
          }
          Toast({
            message: "删除成功!",
            duration: 300,
            position: "center"
          });
        }
      });
    },
    //展品详情页
    goDetail(id) {
      if (PLAT == "wxmini") {
        wx.miniProgram.navigateTo({
          url: "/pages/inside/exhibit/dtl?exhibit_id=" + id
        });
        return false;
      }
      this.$router.push({ path: "cDetail", query: { id: id } });
    }
  },
  mounted() {
    //获取订票信息
    this.getPw();
    this.getTravel();
    this.getMovie();
    this.api_token = this.getParams("api_token");
    this.type = this.getParams("type");
    if (this.api_token != null) {
      if (this.type == "user") {
        this.showFs = false;
      } else {
        this.showFs = true;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.travel {
  background: #fff;
  padding-bottom: 60px;
}
.mr {
  margin-right: 100px;
}

.top {
  width: 100%;
  height: 88.5px;
  padding-top: 45px;
  background: url(../.././img/user/travel.png) no-repeat;
  background-size: cover;
}
.top h3 {
  font-size: 17px;
  color: #fff;
  padding: 0 15px;
  font-weight: 400;
  position: relative;
  .change {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0px 3px 7px 0px rgba(181, 153, 137, 0.3);
    border-radius: 17px;
    width: 80px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #fff;
    color: #696868;
    font-size: 15px;
    white-space: nowrap;
    vertical-align: middle;
    text-align: center;
    display: flex;
    justify-content: space-between;
    .site-wrapper {
      position: absolute;
      top: 45px;
      padding: 10px;
      background: #fff;
      border-radius: 5px;
      .items {
        color: #696868;
        padding: 3px 15px 0;
        font-size: 14px;
        border-bottom: 0.25px solid #696868;
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          border-bottom: 0 none;
          padding-bottom: 0;
        }
      }
      &:after {
        content: "";
        border-bottom: 6px solid #fff;
        border-right: 6px transparent solid;
        border-left: 6px solid transparent;
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    img {
      width: 17px;
      height: 24px;
      display: block;
      display: block;
      margin-left: 4px;
      margin-right: 4px;
      margin-top: 6px;
    }
    .iconfont {
      padding: 0;
      font-size: 20px;
      margin-left: -8px;
    }
  }
}
.top h3 span.right {
  float: right;
}
.item {
  min-height: 80px;
  width: 100%;
  padding: 20px 15px;
}
.item1 {
  background: linear-gradient(-45deg, #68519a, #9672ae);
}

.item2 {
  background: linear-gradient(-45deg, #43c1b7, #71e2cb);
}
.item3 {
  background: linear-gradient(-45deg, #436ace, #718be2);
}
.item4 {
  background: linear-gradient(-45deg, #e79d5b, #eeca8b);
}
.item5 {
  background: linear-gradient(-45deg, #c2728a, #f1949e);
}
.item6 {
  background: linear-gradient(-45deg, #948abc, #c3abd0);
}
.item7 {
  background: linear-gradient(-45deg, #82c15d, #b1e271);
}

.ticket {
  background: linear-gradient(-45deg, #e7665b, #ee928b);
}
.movie {
  background: linear-gradient(-45deg, #6290bf, #90b0d2);
}
.ticket-wrapper {
  background: #e6e6e6;
  padding: 12px 15px 0;
  overflow: hidden;
  h3 {
    color: #000;
    font-size: 15px;
    line-height: 18px;
    span {
      display: inline-block;
      margin-right: 15px;
      &.status {
        color: #b47c2d;
        float: right;
        margin-right: 0;
      }
    }
  }
  p {
    margin: 10px 0;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.8);
    &.times {
      color: rgba(56, 56, 56, 0.6);
      font-size: 13px;
    }
  }
  .money {
    position: absolute;
    top: 50%;
    right: 100px;
    transform: translateY(-50%);
    font-size: 17px;
    color: #939393;
    span {
      color: #e8593e;
      display: inline-block;
      margin-right: 2px;
    }
  }
  .btns {
    width: 59px;
    height: 28px;
    background: rgba(218, 155, 66, 0);
    border: 1px solid rgba(204, 151, 76, 1);
    border-radius: 14px;
    line-height: 28px;
    text-align: center;
    color: #cc974c;
    font-size: 14px;
    position: absolute;
    right: 12px;
    top: 50%;
    margin-top: -14px;
  }
  li {
    margin-bottom: 15px;
  }
  .seat-wrapper {
    overflow: hidden;

    .seat-item {
      width: 66.5px;
      height: 26.5px;
      line-height: 26.5px;
      text-align: center;
      float: left;
      margin-right: 3px;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.8);
      background: url(../.././img/immerse_seat.png) no-repeat;
      background-size: cover;
      &:nth-child(5) {
        margin-right: 0;
      }
    }
  }
}
.movie-wrapper {
  padding-top: 0;
  li {
    position: relative;
    border-bottom: 1px solid #cfcfcf;
    margin-bottom: 0;
    padding-top: 11.5px;
  }
}
.item-content h3 {
  color: #fff;
  font-size: 15px;
  line-height: 16px;
  margin-bottom: 5px;
  font-weight: 600;
}
.item-content i {
  vertical-align: middle;
  margin-top: 5px;
}
.item-content p {
  color: #fff;
  font-size: 12px;
  line-height: 13px;
}
.iconticket,
.icondianying,
.iconzhanting {
  float: left;
  font-size: 30px;
  color: #fff;
  margin-right: 10px;
  display: inline-block;
}
h1 {
  font-size: 24px;
  color: #fff;
  font-weight: 400;
  margin-top: 5px;
}
.iconfanhui1 {
  float: right;
  font-size: 24px;
  color: #fff;
}
.iconfanhui1.down {
  transform: rotate(90deg);
}
.container {
  width: 100%;
  overflow: hidden;
}
.list-item {
  position: relative;
  height: 110px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.list-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}
.list-item[data-type="1"] {
  transform: translate3d(-2rem, 0, 0);
}
.list-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.list-img img {
  width: 100%;
  height: auto;
  display: block;
}
.title {
  position: absolute;
  bottom: 30px;
  left: 25px;
  z-index: 3;
  font-size: 24px;
  color: #fff;
}
.btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  line-height: 14px;
  font-size: 14px;
  padding: 14px 34px;
  background: rgba(0, 0, 0, 0.75);
  z-index: 50;
}
.list-item:after {
  content: " ";
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 1;
}
.list-box {
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}
.list-item .list-content {
  padding: 0.1rem 0 0.1rem 0.2rem;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0.1rem;
  color: #666;
}
.list-item .delete {
  width: 2rem;
  height: 110px;
  background: #ff4949;
  font-size: 15px;
  color: #fff;
  text-align: center;
  line-height: 110px;
  position: absolute;
  top: 0;
  right: -2rem;
  z-index: 1;
}
.footer {
  background: #fff;
  .watch {
    position: absolute;
    top: -60px;
    background: #fff;
    font-size: 17px;
    color: #000;
    font-weight: 500;
    width: 160px;
    height: 44px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 44px;
    box-shadow: 0 1px 4px 1px #ccc;
  }
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid #f4f4f4;
  .wrapper {
    display: flex;
  }
  /*px*/
  .item {
    text-align: center;
    height: 100%;
    overflow: hidden;
    &:nth-child(2) {
      width: 788px;
    }
    img {
      width: 40px;
      display: block;
      margin: -22.5px auto 5px;
    }
    h3 {
      font-size: 10px;
      color: #464646;
      margin-top: -10px;
    }
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .travel {
    padding-bottom: 70px;
  }
  .footer {
    padding-bottom: 10px;
    height: 70px;
  }
}
</style>