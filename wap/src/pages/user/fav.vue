<template>
  <div
    class="container"
    infinite-scroll-immediate-check="addF"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    v-infinite-scroll="loadMore"
  >
    <div class="wrapper-center" v-if="num>0">
      我的收藏（
      <span>{{num}}</span>）
    </div>
    <ul class="collections" v-if="favors.length>0">
      <li v-for="(item,index) in favors" :key="index" @click="go(item.exhibit_id)">
        <img :src="$toThumbsimg(item.exhibit_img,196,196,33,$web)" alt />
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
        <i class="iconfont iconx" @click.stop="cancel(item.exhibit_id,index)"></i>
      </li>
    </ul>
    <div class="no" v-if="favors.length==0">暂无收藏</div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "center",
  data() {
    return {
      favors: [],
      add: false,
      num: 0,
      loading: false
    };
  },

  methods: {
    getFavor() {
      this.getMsg();
    },
    loadMore() {
      if (this.addF) {
        this.skip = (this.page + 1) * this.take;
        this.getMsg(this.skip);
      }
    },
    cancel(id, index) {
      this.$api.doLike(id, 2).then(res => {
        if (res.status == 1) {
          this.favors.splice(index, 1);
          this.num = this.favors.length;
          Toast("取消收藏成功");
        }
      });
    },
    getMsg(skip) {
      this.$api.getFavor(skip).then(res => {
        this.favors = res.data;
        this.num = this.favors.length;
      });
    },
    go(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
    }
  },
  mounted() {
    this.getMsg();
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
.no {
  margin: 260px auto;
  width: 300px;
  color: #999;
  font-size: 14px;
  text-align: center;
}
.wrapper-center {
  text-align: right;
  margin: 12px;
  padding: 0 12px;
  height: 33px;
  line-height: 33px;
  background: #fbf8f4;
  border-radius: 30px;
  color: #000;
  font-size: 12px;
  span {
    color: #b47c2d;
    font-size: 22px;
    display: inline-block;
    padding: 0 10px;
    vertical-align: middle;
  }
}
.collections {
  overflow: hidden;
  padding: 12px;
}
.collections li {
  width: 169px;
  float: left;
  padding-bottom: 0px;
  margin-bottom: 10px;
  margin-right: 12px;
  background: #f5f5f5;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  i.iconx {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background: rgba(0, 0, 0, 6);
  }
}
.collections li:nth-child(2n) {
  margin-right: 0;
}
.collections li img {
  width: 169px;
  height: 169px;
  border-radius: 4px 4px 0 0;
  background: #e5e5e5;
}
.collections li h3 {
  font-size: 14px;
  color: #353535;
  margin: 5px 15px;
  text-align: left;
}
h3 i.iconfire {
  color: #e11b1b;
  float: right;
  display: block;
}
.collections li p {
  padding-bottom: 10px;
  font-size: 12px;
  margin: 0 15px;
  overflow: hidden;
  color: #7b7c7d;
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