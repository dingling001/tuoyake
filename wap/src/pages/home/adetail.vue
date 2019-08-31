<template>
  <div class="container">
    <div class="title">{{title}}</div>
    <div class="des" v-cloak>
      <span>时间：{{time|getYMD}}</span>
      <span>浏览次数：{{count}}</span>
    </div>
    <div v-html="content" class="content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      title: "",
      time: "",
      count: "",
      type: ""
    };
  },
  inject: ["app"],
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
        if (res.data.cate_name != "海博公告") {
          this.app.setTitle("海博新闻详情");
        } else {
          this.app.setTitle("海博公告详情");
        }
        this.time = res.data.created_at;
        this.count = res.data.views;
      });
    },
    go() {
      this.$router.push("/intro");
    }
  },
  mounted() {
    var id = this.$route.query.id;
    this.getDetail(id);
  }
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.container {
  width: 92%;
  margin: 12px auto;
}
.title {
  font-size: 16px;
  color: #333;
  line-height: 24px;
  text-align: center;
  width: 80%;
  margin: 0 auto 10px;
}
.content /deep/ h5 {
  font-size:15px !important;
  font-weight: 600 !important;
  margin-bottom:10px !important;
}
.content /deep/ h5 img{
  display: inline-block;
  width:auto;
  vertical-align: middle;
}
.content /deep/ h5 span{
  font-size:14px !important;
  font-weight: 600 !important;
}
.des {
  color: #999;
  font-size: 12px;
  text-align: center;
  padding-bottom: 10px;
}
.des span {
  display: inline-block;
  margin: 0 15px;
}
.content {
  margin-bottom: 30px;
  margin-top: 20px;
}
.content /deep/ p {
  font-size: 14px;
  letter-spacing: 1px;
  line-height: 24px;
  color: #666;
  text-indent: 2em;
}
.content /deep/ p span{
  font-size:14px !important;
  line-height: 24px;
}
.content /deep/ h2{
  margin-bottom:10px !important;
}
.content /deep/ h2, .content /deep/ h2 span{
  font-size:14px !important;;
  font-weight: 600 !important;
}
.content /deep/ img {
  width: 100% !important;
  height: auto;
  display: block;
  margin-bottom:10px;
}
</style>