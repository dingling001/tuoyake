<template>
  <div
    class="container"
    infinite-scroll-disabled="loading"
    v-infinite-scroll="loadMore"
    infinite-scroll-immediate-check="true"
  >
    <div class="main">
      <div class="search-input">
        <i class="iconfont iconsearch"></i>
        <input
          type="text"
          v-model="keyword"
          @keyup.enter="goE"
          :placeholder="$t('pla')"
          @blur="goE"
        />
      </div>
      <div class="search-top">
        <div class="search-content">
          <span @click.stop="hallF=!hallF">
            {{exhibition_name}}
            <i
              class="iconfont"
              :class="{'iconyou':!hallF,'iconyou-copy-copy':hallF}"
            ></i>
          </span>
          <span @click="cateF=!cateF">
            {{cate_name}}
            <i class="iconfont" :class="{'iconyou':!cateF,'iconyou-copy-copy':cateF}"></i>
          </span>
        </div>
      </div>
      <div class="travel-wrapper" :class="{'fixed':top>=117}">
        <h3 class="travel" v-if="app_token!=''" @click="goCenter">
          查看我的行程单
          <span ref="count">{{count}}</span>
        </h3>
      </div>
      <div class="main-content">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball_show" ref="ball">
            <img :src="img" alt class="ball-img" />
          </div>
        </transition>
        <ul class="collections">
          <li v-for="(item,index) in lists" :key="index" @click="goDetail(item.exhibit_id)">
            <img :src="item.exhibit_list_img" alt />
            <h3>{{item.exhibit_name}}</h3>
            <p>{{item.exhibition_name}}</p>
            <p>
              <span class="look">
                <i class="iconfont iconeyes"></i>
                {{item.look_num}}
              </span>
              <span class="like">
                <i class="iconfont iconthumbs"></i>
                {{item.like_num}}
              </span>
            </p>
            <div
              class="btns"
              v-if="item.is_traveled==1"
              @click.stop="addT(item.exhibit_id,item,$event)"
            >
              <i class="iconfont iconjian"></i>
            </div>
            <div
              class="btns btnss"
              v-if="item.is_traveled==0&&$t('news')"
              @click.stop="addT(item.exhibit_id,item,$event)"
            >
              <i class="iconfont icontubiao"></i>
            </div>
          </li>
        </ul>
      </div>
      <mt-popup
        v-model="hallF"
        popup-transition="popup-fade"
        position="bottom"
        closeOnClickModal="true"
      >
        <mt-picker
          :slots="slots"
          @change="changeHall"
          valueKey="exhibition_name"
          style="width:375px"
          showToolbar
          ref="pickCom"
        >
          <div class="picker-toolbar-title">
            <div class="usi-btn-cancel" @click="hallF = !hallF">取消</div>

            <div class="usi-btn-sure" @click="hallF = !hallF">确定</div>
          </div>
        </mt-picker>
      </mt-popup>
      <mt-popup
        v-model="cateF"
        popup-transition="popup-fade"
        position="bottom"
        closeOnClickModal="true"
      >
        <mt-picker
          :slots="slots2"
          @change="changeCate"
          valueKey="cate_name"
          style="width:375px"
          showToolbar
          ref="pickCom"
        >
          <div class="picker-toolbar-title">
            <div class="usi-btn-cancel" @click="cateF = !cateF">取消</div>

            <div class="usi-btn-sure" @click="cateF = !cateF">确定</div>
          </div>
        </mt-picker>
      </mt-popup>
    </div>
    <div class="loading" v-if="loading">{{loading?$t('noMore'):$t('loading')}}</div>
  </div>
</template>
<script>
import { Picker, InfiniteScroll, Popup, Toast } from "mint-ui";
import Swiper from "swiper";
export default {
  name: "home",
  data() {
    return {
      top: 0,
      ball_show: false,
      dropBalls: [],
      userVip: 0,
      app_token: localStorage.app_token ? localStorage.app_token : "",
      count: 0,
      banners: [],
      keyword: "",
      cateF: false,
      hallF: false,
      language: localStorage.l ? localStorage.l : 1,
      list: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots2: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      lists: [],
      exhibition_id: "",
      cate_id: "",
      cate: [],
      skip: 0,
      page: 0,
      take: 8,
      loading: false,
      iSmore: true,
      travels: "",
      exhibition_name: "全部展厅",
      cate_name: "全部分类",
      balls: "",
      img: ""
    };
  },
  filters: {
    time: function(data) {
      var date = new Date(data);
      var month = date.getMonth() + 1;
      var day = date.getDay();
      return month + "-" + day;
    },
    getYMD: function(date) {
      var year = date.substring(0, 4);
      var month = date.substring(4, 7);
      var day = date.substring(8, 10);
      return year + "年" + month + "月" + day + "日";
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.getList();
    this.getCate();
    if (localStorage.app_token) {
      this.getCount();
    }
    this.getExList(
      this.skip,
      this.take,
      this.exhibition_id,
      this.cate_id,
      this.keyword
    );
  },
  watch: {
    exhibition_id: function(val) {
      this.lists = [];
      this.skip = 0;
      this.loading = false;
      this.iSmore = true;
      this.page = 0;
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    },
    cate_id: function(val) {
      this.lists = [];
      this.skip = 0;
      this.loading = false;
      this.page = 0;
      this.iSmore = true;
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    }
  },
  methods: {
    handleScroll() {
      this.top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(this.top);
    },
    goCenter() {
      this.$router.push("/travel");
      window.scroll(0, 0);
    },
    getCount() {
      this.$api.getC().then(res => {
        this.travels = res.data;
        this.travels.map((item, index) => {
          this.count += item.exhibit_count;
        });
      });
    },
    loadMore() {
      this.loading = true;
      this.page = this.page + 1;
      this.skip = this.page * this.take;
      this.goEs();
    },
    goEs() {
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    },
    goE() {
      this.lists = [];
      this.skip = 0;
      this.page = 0;
      this.getExList(
        this.skip,
        this.take,
        this.exhibition_id,
        this.cate_id,
        this.keyword
      );
    },
    goDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
    },
    addT(id, item, event) {
      this.img = item.exhibit_list_img;
      if (this.app_token == "") {
        this.$router.push({ path: "/login", query: { type: 1 } });
        return false;
      }
      if (item.is_traveled == 1) {
        this.$api.cancelTravel(id).then(res => {
          if (res.status == 1) {
            item.is_traveled = 0;
            Toast({ message: "行程单已取消", duration: 1000 });
            if (this.count > 1) {
              this.count = this.count - 1;
              return false;
            }
            this.count = 0;
          }
        });
      } else {
        this.$api.addTravel(id).then(res => {
          if (res.status == 1) {
            item.is_traveled = 1;
            this.ball_show = !this.ball_show;
            this.count = this.count + 1;
            Toast({ message: "行程单已添加", duration: 1000 });
            this.balls = event.target.getBoundingClientRect();
          }
        });
      }
    },
    // 跳转详情页
    goDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
    },
    // 获取所有展厅接口
    getList() {
      this.$api.getExAll().then(res => {
        var arr = res.data;
        arr.unshift({ exhibition_id: "", exhibition_name: "全部展厅" });
        this.slots[0].values = arr;
      });
    },
    changeHall(picker, values) {
      if (values[0]) {
        this.exhibition_id = values[0].exhibition_id;
        this.exhibition_name = values[0].exhibition_name;
      }
    },
    changeCate(picker, values) {
      if (values[0]) {
        this.cate_id = values[0].cate_id;
        this.cate_name = values[0].cate_name;
      }
    },
    // 获取分类接口
    getCate() {
      this.$api.getCate().then(res => {
        this.cate = res.data;
        this.cate.unshift({ cate_name: "全部分类", cate_id: "" });
        this.slots2[0].values = this.cate;
      });
    },
    // 获取展品列表
    getExList(skip, take, exhibition_id, cate_id, keyword) {
      this.$api
        .getEl(
          localStorage.l,
          skip,
          take,
          exhibition_id,
          "",
          cate_id,
          keyword,
          "",
          1
        )
        .then(res => {
          if (res.data.counts < this.page * this.take) {
            this.iSmore = false;
            this.loading = true;
          } else {
            this.iSmore = true;
            this.loading = false;
          }
          if (this.lists.length == 0) {
            this.lists = res.data.exhibit;
          } else {
            this.lists = [...this.lists, ...res.data.exhibit];
          }
        });
    },
    beforeEnter(el) {
      var left = this.balls.left;
      var top = this.balls.top;
      el.style.transform = `translate(${left}px, ${top}px)`;
    },
    enter(el, done) {
      const ball = this.balls;
      const shopicon = this.$refs.count.getBoundingClientRect();
      let top = shopicon.left;
      let bottom = ball.top - (ball.top - shopicon.top);
      el.style.transform = `translate( ${top}px,${bottom}px )`;
      el.style.transition = "all 1s cubic-bezier(0,.73,.37,1)";
      done();
    },
    afterEnter(el) {
      this.ball_show = !this.ball_show;
    }
  }
};
</script>
<style lang="scss" scoped>
div.container {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.main {
  width: 375px;
  padding-top: 12px;
}
.search-top {
  display: flex;
  height: 50px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
  .search-content {
    width: 300px;
    margin: 20px auto 0;
    font-size: 15px;
    span {
      display: inline-block;
      margin-right: 80px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
select {
  height: 40px;
  line-height: 38px;
  border: 0 none;
  font-size: 14px;
  text-indent: 10px;
  flex: 1;
  background: #ffffff;
  text-align: center;
  display: block;
  &:nth-child(1) {
    margin-right: 10px;
  }
}
option {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border: none;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  /*将背景改为红色*/
  background: #fff;
}
select:focus {
  border-color: #b47c2d;
}
.search-input {
  margin: 0 10px;
}

.search-input {
  position: relative;
  border-radius: 4px;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  background: #e7e7e7;
  padding-left: 30px;
  color: rgba(0, 0, 0, 0.2);
  input {
    height: 30px;
    line-height: 30px;
    margin-top: 7px;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    display: inline-block;
    width: 100%;
    color: rgba(0, 0, 0, 0.2);
    &:focus {
      border-color: transparent;
      outline: 0 none;
    }
  }

  i {
    position: absolute;
    font-size: 18px;
    transform: translateY(-50%);
    top: 50%;
    left: 10px;
  }
  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: rgba(0, 0, 0, 0.2);
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: rgba(0, 0, 0, 0.2);
  }
  &:-ms-input-placeholder {
    /* IE 10+ */
    color: rgba(0, 0, 0, 0.2);
  }
  &:-moz-placeholder {
    /* Firefox 18- */
    color: rgba(0, 0, 0, 0.2);
  }
}

.main-content {
  padding: 0 10px;
}
h3.travel {
  background: rgba(180, 124, 45, 0.1);
  height: 40px;
  line-height: 40px;
  border-radius: 3px;
  text-align: right;
  font-size: 15px;
  color: #000000;
  display: block;
  margin: 12px;
  span {
    display: inline-block;
    width: 36px;
    height: 18px;
    line-height: 18px;
    color: #fff;
    text-align: center;
    font-size: 13px;
    /*px*/
    background: rgba(180, 124, 45, 1);
    border-radius: 9px;
    margin-right: 12px;
  }
}
.collections {
  overflow: hidden;
}
.loading {
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #919191;
  font-size: 15px;
  background: #fff;
}
.collections li {
  width: 171px;
  margin: 0 auto;
  float: left;
  text-align: left;
  margin-bottom: 9px;
  position: relative;
  background: #fff;
  border-radius: 4px;
}
.collections li:nth-child(odd) {
  margin-right: 9px;
}
.collections li .btns {
  color: #b47c2d;
  font-size: 22px;
  width: 22px;
  height: 22px;
  position: absolute;
  bottom: 30px;
  right: 20px;
  i {
    font-size: 22px;
    &.iconjian {
      color: #ccc;
    }
    &.icontubiao {
      font-size: 32px;
    }
  }
}
.collections li .btnss {
  right: 26px;
  bottom: 32px;
}
.collections li img {
  width: 169px;
  height: 169px;
  display: block;
  margin: 0 auto;
  background: #f5f5f5;
  border-radius: 4px 4px 0px 0px;
}
.collections li h3 {
  font-size: 15px;
  /*px*/
  line-height: 16px;
  color: #353535;
  margin: 8px 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  overflow: hidden;
}
.collections li p {
  padding-bottom: 10px;
  font-size: 14px;
  /*px*/
  line-height: 15px;
  /*px*/
  margin: 0 15px;
  overflow: hidden;
  color: #7b7c7d;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 84%;
}
.look {
  float: left;
  color: #858585;
  font-size: 14px;
  display: block;
  width: 42%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.like {
  float: left;
  color: #858585;
  font-size: 14px;
  display: block;
  width: 42%;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.picker-toolbar-title {
  overflow: hidden;
  height: 100%;
  line-height: 100%;
  padding: 0 12px;
  /* px */
  .usi-btn-cancel {
    float: left;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
  .usi-btn-sure {
    float: right;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    color: #cc974c;
  }
}

.ball {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
  /*no*/
  transition: all 0.4s linear;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1005;
  .ball-img {
    width: 100%;
    height: auto;
    display: block;
  }
}
.fixed {
  position: fixed;
  top: 60px;
  width: 375px;
  z-index: 999;
  background: #ffffff;
}
</style>
