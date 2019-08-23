<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a> »
        <a href="javaScript:;" @click="go">{{$t('navs[7].name')}}</a>
        »
        <a href="javaScript:;">{{$t('bai')}}</a>
      </div>
    </div>

    <div class="container">
      <div class="title">{{title}}</div>
      <div class="des" v-cloak>
        <span>时间：{{time|getYMD}}</span>
        <span>浏览次数：{{count}}</span>
        <span @click.self="showShare" class="share-wrapper">
          <i class="iconfont iconsharearrow"></i>
          分享
          <div class="share" v-if="shareF">
            <div class="item" @click="copyUrl">
              <span class="link"></span>复制链接
            </div>
            <div class="item" @click="shareWeibo">
              <span class="weibo"></span>
              新浪微博
            </div>
            <div class="item">
              <span class="weixin"></span>微信扫一扫
            </div>
            <qrcode class="qrcode" :value="link" :options="{ size:120 }"></qrcode>
          </div>
        </span>
      </div>
      <div v-html="content" class="content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      content: "",
      title: "",
      shareF: false,
      time: "",
      count: "",
      type: "",
      link: ""
    };
  },
  filters: {
    getYMD: function(date) {
      var year = date.substring(0, 4);
      var month = date.substring(5, 6);
      if (month != "0") {
        month = date.substring(5, 7);
      } else {
        month = date.substring(6, 7);
      }
      var day = date.substring(8, 9);
      if (day != "0") {
        day = date.substring(8, 10);
      } else {
        day = date.substring(9, 10);
      }
      return year + "." + month + "." + day;
    }
  },
  methods: {
    getDetail(id) {
      this.$api.getDetail(id).then(res => {
        this.content = res.data.content;
        this.title = res.data.title;
        this.time = res.data.created_at;
        this.count = res.data.views;
        this.type = res.data.cate_name;
      });
    },
    shareWeibo() {
      var url =
        "http://service.weibo.com/share/share.php?appkey=&title=" +
        this.title +
        "&url=" +
        window.origin +
        "/baiD?id=" +
        this.id +
        "&searchPic=false&style=simple";
      window.open(url, "_blank");
    },
    showShare() {
      this.link = window.origin + "/baiD?id=" + this.id;
      this.shareF = !this.shareF;
    },
    copyUrl() {
      var oInput = document.createElement("input");
      oInput.value = window.location.href;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message.success("复制成功");
    },
    go() {
      this.$router.push("/class");
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.id = id;

    this.getDetail(id);
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
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
  margin: 0 auto;
}
.title {
  font-size: 25px;
  color: #313131;
  width: 500px;
  line-height: 30px;
  text-align: center;
  margin: 30px auto 55px;
}
.share-wrapper {
  position: relative;
  cursor: pointer;

  .share {
    position: absolute;
    top: 30px;
    right: -85px;
    width: 170px;
    height: 308px;
    padding-top: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 7px 3px rgba(0, 0, 0, 0.35);
    border-radius: 4px;
  }
  .share:after {
    content: "";
    width: 8px;
    height: 8px;
    background: #fff;
    box-shadow: -2px 3px 7px 3px rgba(0, 0, 0, 0.35);
    transform: rotate(45deg);
    position: absolute;
    top: -4px;
    left: 50%;
    z-index: -1;
    margin-left: -4px;
  }
  .item {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    padding-left: 60px;
    position: relative;
    text-align: left;
    cursor: pointer;
  }
  .item span {
    width: 26px;
    height: 26px;
    background: url(../.././img/share/link.png) no-repeat;
    background-size: cover;
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -13px;
    &.weibo {
      background: url(../.././img/share/weibo.png) no-repeat;
      background-size: cover;
    }
    &.weixin {
      background: url(../.././img/share/weixin.png) no-repeat;
      background-size: cover;
    }
  }
  .qrcode {
    width: 120px;
    height: 120px;
    margin: 12px auto;
  }
}
.des {
  color: #999999;
  font-size: 14px;
  width: 724px;
  margin: 0 auto 30px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  span.share-wrapper {
    float: right;
    display: block;
  }
}
.des span {
  display: inline-block;
  margin: 0 15px;
}
.content {
  margin-bottom: 30px;
  margin-top: 20px;
  min-height: 260px;
}
.content /deep/ p {
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 30px;
  color: #666;
  text-indent: 2em;
}
.content /deep/ span {
  letter-spacing: 1px;
  line-height: 30px;
  color: #666;
}
// .content /deep/ img {
//   width: 100%;
//   height: auto;
//   display: block;
//   background: #e5e5e5;
// }
</style>