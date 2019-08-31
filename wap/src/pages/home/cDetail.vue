<template>
  <div class="container">
    <div class="service">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in services" :key="index">
            <img :src="item" alt />
            <div class="active" @click.stop="addT" v-if="$t('news')">
              <i
                class="iconfont"
                :class="{'iconjian1':is_travelled==1,'iconaddTodo-nav':is_travelled==0}"
              ></i>
              {{is_travelled==0?'加入行程单':'取消行程单'}}
            </div>
          </div>
        </div>
      </div>
      <div class="d3" v-if="d3!=''" @click="show3D(d3)">3D</div>
    </div>
    <div class="btns" v-if="$t('news')">
      <span @click.stop="doLike">
        <i class="iconfont iconthumbs" :class="{'actives':is_like==1}"></i>点赞
      </span>
      <span @click="doCollect">
        <i class="iconfont iconshoucang" :class="{'actives':is_collection==1}"></i>收藏
      </span>
    </div>
    <div class="title">{{title}}</div>
    <div v-html="content" class="content"></div>
    <h3 class="topTitle" v-if="lists.length>0">
      {{$t('exbt')}}
      <div class="right" @click="cpage=cpage+1">
        {{$t('hyp')}}
        <span class="hyp"></span>
      </div>
    </h3>
    <ul class="collections">
      <li v-for="(item,index) in lists" :key="index" @click="go(item.exhibit_id)">
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
      </li>
    </ul>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      id: "",
      app_token: localStorage.app_token ? localStorage.app_token : "",
      services: "",
      is_like: "",
      is_collection: "",
      content: "",
      title: "",
      is_travelled: 0,
      d3: "",
      ckip: 0,
      ctake: 4,
      cpage: 0,
      lists: [],
      pageF: true
    };
  },
  watch: {
    cpage: function(val) {
      this.ckip = val * this.ctake;
      this.getCates(this.id, this.ctake, this.ckip);
    }
  },
  methods: {
    go(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
      this.getDetail(id);
      this.getCates(id, 4, 0);
      window.scroll(0, 0);
      this.id = id;
    },
    show3D(d3) {
      window.location.href = d3;
    },
    pageD() {
      if (this.cpage >= 1) {
        this.cpage--;
      }
    },
    pageA() {
      this.cpage++;
    },
    getDetail(id) {
      this.$api.geteInfo(id).then(res => {
        this.services = res.data.exhibit_imgs;
        this.initSwiper();
        this.title = res.data.exhibit_name;
        this.content = res.data.content;
        this.is_like = res.data.is_like;
        this.d3 = res.data["3d_path"];
        this.is_travelled = res.data.is_travelled;
        this.is_collection = res.data.is_collection;
      });
    },
    initSwiper() {
      setTimeout(() => {
        let swiper = new Swiper(".swiper-container", {
          autoplay: 3000,
          direction: "horizontal",
          //手动触发后继续播放
          autoplayDisableOnInteraction: false
        });
      }, 500);
    },
    doLike() {
      if (this.app_token == "") {
        this.$router.push({
          path: "/login",
          query: {
            redirect: this.$route.fullPath // 要传的参数(当前页面地址)
          }
        });
        return false;
      }
      this.$api.doLike(this.id).then(res => {
        if (res.status == 1) {
          if (this.is_like == 0) {
            this.is_like = 1;
            return false;
          }
          if (this.is_like == 1) {
            this.is_like = 0;
            return false;
          }
        }
      });
    },
    addT() {
      if (localStorage.app_token == undefined) {
        this.$router.push({
          path: "/login",
          query: {
            redirect: this.$route.fullPath // 要传的参数(当前页面地址)
          }
        });
        return false;
      }
      if (this.is_travelled == 1) {
        this.$api.cancelTravel(this.id, 1).then(res => {
          if (res.status == 1) {
            this.is_travelled = 0;
          }
        });
      } else {
        this.$api.addTravel(this.id).then(res => {
          if (res.status == 1) {
            this.is_travelled = 1;
          }
        });
      }
    },
    doCollect() {
      if (this.app_token == "") {
        this.$router.push({
          path: "/login",
          query: {
            redirect: this.$route.fullPath // 要传的参数(当前页面地址)
          }
        });
        return false;
      }
      this.$api.doLike(this.id, 2).then(res => {
        if (res.status == 1) {
          if (this.is_collection == 0) {
            this.is_collection = 1;
            return false;
          }
          if (this.is_collection == 1) {
            this.is_collection = 0;
            return false;
          }
        }
      });
    },
    visit_exhibit(id) {
      this.$api.visit_exhibit(id).then(res => {});
    },
    getCates(id, take, skip) {
      this.$api.getCates(id, take, skip).then(res => {
        if (res.data.count <= (this.cpage + 1) * 4) {
          this.cpage = 0;
        }
        this.lists = res.data.exhibit;
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDetail(this.id);
    this.getCates(this.id, 4, 0);
    this.visit_exhibit(this.id);
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.container {
  width: 100%;
  margin: 0 auto;
  background: #f5f5f5;
}
.service {
  width: 100%;
  min-height: 375px;
  margin: 0px auto;
  position: relative;
}
.d3 {
  width: 72px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: transparent;
  border: 1px solid rgba(165, 110, 34, 1);
  border-radius: 16px;
  font-size: 14px;
  color: rgba(165, 110, 34, 1);
  text-align: center;
  position: absolute;
  top: 11.5px;
  right: 7.5px;
  z-index: 4;
}
.active {
  padding: 0.08rem 0.266667rem;
  color: #fff;
  font-size: 0.373333rem;
  border-radius: 0.533333rem;
  background: #b47c2d;
  position: absolute;
  bottom: 10px;
  right: 0.266667rem;
  z-index: 33;
}
.swiper-container {
  width: 100%;
  margin: 0 auto;
  min-height: 375px;
  overflow: hidden;
}
.swiper-slide {
  width: 100%;
  min-height: 375px;
}
.swiper-slide img {
  width: 100%;
  height: auto;
  display: block;
}
.title {
  font-size: 14px;
  color: #402e2a;
  line-height: 20px;
  text-align: left;
  margin: 15px 12px 10px;
  overflow: hidden;
}
.btns {
  padding: 15px 12px;
  text-align: right;
  float: right;
}
.btns i {
  display: inline-block;
  margin-right: 5px;
}
.btns span {
  display: inline-block;
  margin-right: 15px;
}
.btns span:last-child {
  margin-right: 0;
}
.btns i.actives {
  color: #e11b1b;
}
.social-share-cs {
  text-indent: 0;
}
.content {
  margin: 0px 12px 10px;
}
.content /deep/ p {
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 20px;
  color: #402e2a;
  text-indent: 2em;
}
.title p {
  float: right;
  font-size: 16px;
  margin-right: 15px;
}
.title p span {
  display: inline-block;
  text-align: center;
}
.title i {
  font-size: 14px;
  display: inline;
  vertical-align: middle;
}

.topTitle {
  height: 20px;
  line-height: 20px;
  color: #1f1f1f;
  font-size: 0.56rem;
  margin: 0 0 0.32rem;
  position: relative;
  margin-bottom: 12px;
  padding: 0 12px;
}
.topTitle .right {
  float: right;
  font-size: 14px;
  padding-right: 25px;
  position: relative;
}
.topTitle .hyp {
  width: 23px;
  height: 14px;
  display: inline-block;
  background: url(../.././img/huanyipi.png) no-repeat;
  background-size: contain;
  position: absolute;
  top: 50%;
  right: -3px;
  transform: translateY(-50%);
}
.collections {
  overflow: hidden;
  padding: 0 12px;
}
.collections li {
  width: 171px;
  float: left;
  margin-bottom: 9px;
  margin-right: 9px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
}
.collections li:nth-child(2n) {
  margin-right: 0;
}
.collections li img {
  width: 169px;
  height: 169px;
  border-radius: 4px 4px 0 0;
}
.collections li h3 {
  font-size: 15px;
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
.look {
  float: left;
  color: #858585;
  font-size: 16px;
  display: block;
  width: 42%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.like {
  float: left;
  color: #858585;
  font-size: 16px;
  display: block;
  width: 42%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: right;
}
</style>
