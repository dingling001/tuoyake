
<template>
  <div>
    <!--<div class="topbar-wrapper">-->
      <!--<div class="topbar">-->
        <!--<a href="/">{{$t('navs[0].name')}}</a>-->
        <!--»-->
        <!--<a href="javaScript:;">{{$t('navs[1].name')}}</a>-->
      <!--</div>-->
    <!--</div>-->
    <div class="container">
      <div class="main-content">
        <div class="title">
          <h3 id="intro">{{$t('intro')}}</h3>
        </div>
        <div class="d3" v-if="url!=''">
          <iframe :src="url" frameborder="0" scrolling="no"></iframe>
        </div>
        <div v-html="intro" class="intro"></div>
        <div class="ex">
          <h5>{{$t('title')}}</h5>
          <div class="number">
            {{total}}
            <span class="total" v-if="$t('news')"></span>
            <span v-else class="unit">{{$t('unit')}}</span>
          </div>
          <div class="btn" @click="goElist">{{$t('watchC')}}</div>
        </div>
        <div class="title" v-if="$t('zixun')">
          <h3 id="zixun">{{$t('zixun')}}</h3>
        </div>
        <div class="menu" v-if="$t('news')">
          <div class="btn" :class="{'active':curs==1}" @click="showMedia(1)">海博资讯</div>
          <div class="btn" :class="{'active':curs==0}" @click="showMedia(0)">媒体报道</div>

          <span @click="goList">查看更多></span>
        </div>
        <div class="news" v-if="$t('news')">
          <ul>
            <li v-for="(item,index) in listS" :key="index" @click="goDetail(item.article_id)">
              <span>[{{item.created_at|time}}]</span>
              {{item.title}}
            </li>
          </ul>
        </div>
        <div class="title">
          <h3 id="about">{{$t('about')}}</h3>
        </div>
        <div class="about">
          <div class="item">
            <img src="../.././img/intro/tel.png" alt />
            <p class="p">{{$t('tele')}}</p>
            <p v-html="contact.tel"></p>
          </div>
          <div class="item">
            <img src="../.././img/intro/address.png" alt />
            <p class="p">{{$t('address')}}</p>
            <p v-html="contact.addr"></p>
          </div>
          <div class="item">
            <img src="../.././img/intro/email.png" alt />
            <p class="p">{{$t('email')}}</p>
            <p v-html="contact.email"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      intro: "",
      url: "",
      mei: "",
      curs: 1,
      contact: "",
      news: "",
      listS: [],
      total: "",
      state: ""
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
  filters: {
    time: function(data) {
      if (data == "") {
        return "";
      }
      var year = data.substring(0, 4);
      var month = data.substring(4, 7);
      var day = data.substring(8, 10);
      return year + "-" + month + "-" + day;
    }
  },
  mounted() {
    this.getIntro();
    this.getEx();
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
    getEx() {
      let l = localStorage.l || 1;
      this.$api.getEl(l, 0, 10, "", "", "", "", 1).then(res => {
        this.total = res.data.count;
      });
    },
    // 跳转展品列表页
    goElist() {
      this.$router.push("/collection");
    },
    goList() {
      this.$router.push("/introL");
    },
    goDetail(id) {
      this.$router.push({ path: "/adetail", query: { id: id } });
    },
    showMedia(index) {
      this.curs = index;
      if (index == 0) {
        return (this.listS = this.mei);
      }
      this.listS = this.news;
    },
    // 底部切换
    tab_footer(index) {
      let jump = document.querySelectorAll(".title");
      let total = jump[index].offsetTop - 180;
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
    getIntro() {
      this.$api.getIntro().then(res => {
        this.url = res.data.url;
        this.intro = res.data.intro;
        this.mei = res.data.mei;
        this.listS = res.data.news;
        this.news = res.data.news;
        this.contact = res.data.contact;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 60px;
  line-height: 60px;
  .topbar {
    width: 1200px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
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
  margin: 30px auto;
}

.title {
  width: 100%;
  margin: 0px auto 40px;
}
.title h3 {
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  padding: 0 30px;
  font-weight: 400;
  color: #000;
  font-size: 26px;
  position: relative;
  vertical-align: middle;
  &:after {
    content: "";
    width: 58px;
    height: 18px;
    position: absolute;
    top: 50%;
    left: -50px;
    margin-top: -6px;
    background: url(../.././img/home/t_l.png) no-repeat;
    background-size: cover;
  }
  &:before {
    content: "";
    width: 58px;
    height: 18px;
    position: absolute;
    top: 50%;
    right: -50px;
    margin-top: -6px;
    background: url(../.././img/home/t_r.png) no-repeat;
    background-size: cover;
  }
}
.d3 {
  height: 642px;
  width: 100%;
  overflow: hidden;
}
.d3 iframe {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.intro {
  margin: 30px 0 50px 0;
}
.intro /deep/ p span {
  font-size: 16px;
  line-height: 28px;
}
.ex {
  width: 100%;
  height: 210px;
  background: url(../.././img/intro/intro_ex.png) no-repeat;
  background-size: cover;
  color: #fff;
  margin-bottom: 70px;
}
.ex h5 {
  width: fit-content;
  text-align: center;
  font-size: 24px;
  margin: 0px auto;
  padding-top: 30px;
}
.ex .number {
  width: 260px;
  margin: 20px auto;
  text-align: center;
  font-size: 36px;
  position: relative;
  height: 40px;
  white-space: nowrap;
}
.ex .btn {
  width: 138px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgba(160, 203, 212, 1);
  border-radius: 4px;
  margin: 0 auto;
  cursor: pointer;
}
.ex span.total {
  width: 33px;
  height: 33px;
  display: inline-block;
  background: url(../.././img/intro/total.png) no-repeat;
  background-size: cover;
}
.menu {
  height: 30px;
  line-height: 30px;
  margin: 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #b37b2d;
}
.menu .btn {
  font-size: 16px;
  color: #000;
  width: 92px;
  float: left;
  text-align: center;
  cursor: pointer;
}
.menu span {
  float: right;
  cursor: pointer;
  color: #6b6b6b;
}
.menu .btn.active {
  color: #fff;
  background: #b47c2d;
}
.news {
  margin-bottom: 50px;
}
.news ul {
  padding: 0;
  margin: 0;
}
.news ul li {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px dashed #999;
  font-size: 16px;
  cursor: pointer;
}
.news ul li span {
  display: inline-block;
  margin: 0 10px;
}
.news ul li:hover {
  color: #b47c2d;
}
.unit {
  font-size: 16px;
}
.about {
  width: 100%;
  height: 315px;
  background: url(../.././img/intro/a.png) no-repeat;
  background-size: cover;
  display: flex;
  margin-bottom: 30px;
}
.about .item {
  flex: 1;
  text-align: center;
}
.item img {
  width: 80px;
  display: block;
  height: auto;
  margin: 100px auto 0;
}
.item .p {
  text-align: center;
  width: 300px;
  margin: 15px auto 5px;
  color: #323232;
  font-size: 14px;
  font-weight: 600;
}
.item /deep/ p {
  width: 300px;
  font-size: 14px;
  color: #323232;
  margin: 0 auto;
  line-height: 20px;
}
</style>
