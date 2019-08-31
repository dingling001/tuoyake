<template>
  <div id="mescroll_wrap">
    <div :ref="ids" class="mescroll" id="mescroll">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";

export default {
  name: "intro",
  data() {
    return {
      mescroll: null
    };
  },
  props: {
    page: {
      type: Object,
      default: {}
    },
    ids: {
      type: String,
      default: "mescroll"
    }
  },
  mounted() {
    this.mescroll = new MeScroll(this.$refs[this.ids], {
      up: {
        hardwareClass: "mescroll-hardware",
        auto: true, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        page: {
          num: this.page.num, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: this.page.limit // 每页数据的数量
        },
        htmlNodata: '<p class="upwrap-nodata"> 没有更多了~ </p>',
        noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        isBounce: false, //建议在页面关闭前调用mescroll.setBounce(true), 可避免对其他页面的影响
        lazyLoad: {
          use: true //启动懒加载
        },
        toTop: {
          // 配置回到顶部按钮
          warpId: "mescroll_wrap",
          offset: 500,
          duration: 500,
          src: require("./totop.png")
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
          warpId: "mescroll", //父布局的id; 如果此项有值,将不使用clearEmptyId的值;
          // icon: "../res/img/mescroll-empty.png", //图标,默认null
          tip: "暂无相关数据~" //提示
        }
      }
    });
    this.$forceUpdate();
  },
  methods: {
    upCallback(page) {
      this.$emit("pullUpToLoadMore", page);
    },
    endSuccess(length) {
      this.mescroll.endSuccess(length);
    },
    endErr() {
      this.mescroll.endErr();
    },
    onBeforeRouteEnter(vm) {
      if (vm.mescroll) {
        // 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null)
          vm.mescroll.setBounce(vm.mescroll.lastBounce);
        // 滚动到之前列表的位置(注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop);
          setTimeout(() => {
            // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
          }, 16);
        }
      }
    },
    onBeforeRouteLeave() {
      // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
      if (this.mescroll) {
        this.mescroll.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true); // 允许bounce
        this.mescroll.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0;
  height: auto;

  /deep/ .upwrap-nodata {
    font-size: 15px;
    color: #9a9a9a;
  }
}

/deep/ .mescroll-totop {
  width: 50px;
  height: 50px;
  right: 15px;
}
</style>
