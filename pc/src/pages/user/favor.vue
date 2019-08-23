<template>
  <!-- 右侧部分 -->
  <div class="user-r">
    <h3 class="user-title">我的收藏{{total}}</h3>
    <div class="favor-wrapper" v-if="favors.length>0">
      <ul class="collections">
        <li v-for="(item,index) in favors" :key="index" @click="goDetail(item.exhibit_id)">
          <img :src="$toThumbsimg(item.exhibit_img,233,233,33,$web)" alt />
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
      <page :totalPages="totalPage" @presentPage="changePage" v-if="totalPage>1"></page>
    </div>

    <div class="no" v-else>暂无收藏</div>
  </div>
</template>
<script>
import page from "../.././components/pcpaging";
export default {
  name: "center",
  data() {
    return {
      favors: [],
      total: "",
      skip: 0,
      take: 12,
      totalPage: ""
    };
  },
  methods: {
    getFavor() {
      this.$api.getFavor().then(res => {
        this.favors = res.data.exhibit;
        this.totalPage = Math.floor(res.data.counts / this.take) + 1;
      });
    },
    // 跳转详情页
    goDetail(id) {
      this.$router.push({ path: "/cDetail", query: { id: id } });
    },
    changePage(val) {
      this.skip = (val - 1) * this.take;
      this.getFavor(this.skip, this.take);
    },
    cancel(id, index) {
      this.$api.doLike(id, 2).then(res => {
        if (res.status == 1) {
          this.favors.splice(index, 1);
        }
      });
    }
  },
  mounted() {
    this.getFavor();
  }
};
</script>
<style lang="scss" scoped>
.user-r {
  flex: 1;
  padding-left: 14px;
}
.user-title {
  font-size: 18px;
  color: #b47c2d;
  padding-bottom: 10px;
  padding-left: 30px;
  margin-top: 10px;
  border-bottom: 2px solid #b47c2d;
}
.no {
  margin: 260px auto;
  width: 300px;
  color: #999;
  font-size: 14px;
  text-align: center;
}
.collections {
  overflow: hidden;
  margin-top: 13px;
}
.collections li {
  width: 233px;
  float: left;
  padding-bottom: 5px;
  margin-bottom: 10px;
  margin-right: 8px;
  position: relative;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  i.iconx {
    color: #fff;
    position: absolute;
    top: 10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    right: 10px;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
  .join {
    width: 32px;
    height: 32px;
    background: rgba(165, 110, 34, 1);
    border-radius: 20px;
    line-height: 32px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
    top: 10px;
    left: 10px;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    span {
      display: none;
    }
    &:hover {
      width: 117px;
    }
    &:hover span {
      display: inline-block;
    }
  }
  .d3 {
    width: 32px;
    height: 32px;
    line-height: 32px;
    white-space: nowrap;
    padding-left: 10px;
    text-align: center;
    background: rgba(165, 110, 34, 1);
    border-radius: 20px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 10px;
    transition: all 300ms ease-in-out;
    span {
      display: none;
    }
    &:hover {
      width: 117px;
    }
    &:hover span {
      display: inline-block;
    }
  }
}
.collections li:nth-child(4n) {
  margin-right: 0;
}
.collections li img {
  width: 233px;
  height: 233px;
  background: #e5e5e5;
  border-radius: 4px 4px 0px 0px;
}
.collections li h3 {
  font-size: 16px;
  color: #353535;
  margin: 16px 20px 10px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.collections li p {
  padding-bottom: 10px;
  font-size: 16px;
  margin: 0 20px;
  overflow: hidden;
  color: #7b7c7d;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.look {
  float: left;
  color: #858585;
  font-size: 16px;
  display: block;
  width: 40%;
}
.like {
  float: left;
  color: #858585;
  font-size: 16px;
  display: block;
  width: 40%;
  text-align: right;
}
</style>