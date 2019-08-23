<template>
  <div id="page">
    <div class="fenye">
      <div class="paging-box">
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            @current-change="handleCurrentChange"
            :page-size="1"
            :total="totalPages"
          ></el-pagination>
          <div class="jump-text">{{$t('pageTo')}}</div>
        </div>
        <div class="jump-page">
          <p>{{$t('page')}}</p>
          <div class="go">GO</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "totalPages" //总页数
  ],
  data() {
    return {};
  },
  methods: {
    handleCurrentChange(val) {
      window.scrollTo(0, 0);
      this.$emit("presentPage", val);
    }
  }
};
</script>

<style lang="scss">
#page {
  .fenye {
    /*width: 1200px;*/
    margin: 0 auto;
    text-align: center;
    .paging-box {
      height: 42px;
      display: inline-block;
    }
    .paging {
      position: relative;
    }
    .paging .jump-text {
      position: absolute;
      right: 60px;
      top: 0;
      line-height: 40px;
      font-size: 14px;
      color: #000;
      font-weight: bold;
      min-width: 42px;
    }
    .paging-box .paging,
    .paging-box .jump-page {
      float: left;
    }
    .jump-page p {
      float: left;
      line-height: 40px;
      font-size: 14px;
      color: #000;
      font-weight: bold;
      margin: 0 10px;
      min-width: 14px;
      height: 40px;
    }
    .paging-box .jump-page .go {
      float: left;
      width: 32px;
      height: 32px;
      line-height: 32px;
      background: rgba(180, 124, 45, 0.2);
      border-radius: 50%;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      margin: 2px 0;
    }
    .el-pagination {
      padding-right: 0;
    }
    .el-pagination.is-background .el-pager li {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(202, 202, 202, 0.75);
      border-radius: 50%;
      line-height: 32px;
      transition: all 0.2s ease-in-out 0s;
    }
    .el-pagination.is-background .el-pager li:hover {
      background: #b47c2d;
      color: #fff !important;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      width: 50px;
      background: #b47c2d;
      border-radius: 16px;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev {
      width: 32px;
      height: 32px;
      border: 2px solid #000;
      border-radius: 15px;
      background: #fff;
    }
    .el-pagination .btn-next .el-icon,
    .el-pagination .btn-prev .el-icon {
      font-size: 16px;
    }
    .el-pagination.is-background .btn-next.disabled,
    .el-pagination.is-background .btn-next:disabled,
    .el-pagination.is-background .btn-prev.disabled,
    .el-pagination.is-background .btn-prev:disabled,
    .el-pagination.is-background .el-pager li.disabled {
      border-color: #c0c4cc;
    }
    .el-pagination__editor.el-input .el-input__inner {
      height: 32px;
      width: 50px;
      background: rgba(243, 243, 243, 1);
      border: 0;
      border-radius: 16px;
      box-shadow: 0px 1px 2px 0px rgba(202, 202, 202, 0.75);
    }
    .el-pagination__jump {
      color: #fff;
      width: 80px;
    }
    .fenye .el-pagination.is-background .btn-next {
      margin-right: 10px;
    }
  }
}
</style>