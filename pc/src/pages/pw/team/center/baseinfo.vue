<template>
  <div class="container" v-loading="loading" element-loading-text="拼命加载中">
    <div class="header">
      <div class="name">{{info.team_type_name}}</div>
      <div class="status">
        <div class="label">审核状态:</div>
        <div class="current-status">{{statusTxt[info.team_status-1]}}</div>
      </div>
    </div>
    <div class="main">
      <ul>
        <li class="clearfix">
          <div class="left">联系人姓名：</div>
          <div class="right">{{info.team_username}}</div>
        </li>
        <li class="clearfix">
          <div class="left">团体名称：</div>
          <div class="right">{{info.teamname}}</div>
        </li>
        <li class="clearfix">
          <div class="left">团体类型：</div>
          <div class="right">{{info.team_type_name}}</div>
        </li>
        <li class="clearfix">
          <div class="left">统一社会信用代码：</div>
          <div class="right">{{info.s_c_code}}</div>
        </li>
        <li class="clearfix">
          <div class="left">资质证书：</div>
          <div class="right img-container">
            <img :src="info.team_atta" alt>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      apiToken: localStorage.api_token || "",
      loading: true,
      info: "",
      statusTxt: ['待审核', '正常', '审核未通过', '禁用']
    }
  },
  created() {
    this.$api.PW_PC_teamInfo(this.apiToken).then(res => {
      this.loading = false;
      if (res.status == 1) {
        // console.log(res)
        this.info = res.data;
      } else {
        this.$message.error(res.msg);
      }
    }).catch(err => {
      this.loading = false;
    })
  }
};

</script>
<style lang="scss" scoped>
.container {
  margin-top: 30px;

  .header {
    height: 62px;
    line-height: 62px;

    .name {
      position: relative;
      float: left;
      padding: 0 30px;
      background-color: #f4f4f4;
      border-radius: 30px;
      font-size: 18px;
      color: #000;

      &::before {
        display: inline-block;
        content: "";
        width: 10px;
        height: 10px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #b47c2d;
      }
    }

    .status {
      float: right;
      font-size: 18px;

      .label {
        float: left;
      }

      .current-status {
        float: left;
        padding-left: 1em;
        color: #b47c2d;
      }
    }
  }

  .main {
    ul {
      margin-top: 20px;

      li {
        width: 608px;
        font-size: 18px;
        line-height: 48px;

        .left {
          float: left;
          width: 200px;
          text-align: right;
        }

        .right {
          float: left;
          margin-left: 40px;

          &.img-container {
            width: 306px;
            height: 172px;
            margin-top: 15px;
          }
        }
      }
    }

    img {
      display: block;
      width: 306px;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  .clearfix::after,
  .clearfix::before {
    content: "";
    display: table;
  }

  .clearfix::after {
    content: "";
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }
}

/deep/ .el-loading-mask {
  z-index: 200;

  .el-loading-spinner {
    svg {
      .path {
        stroke: #aaa;
      }
    }

    .el-loading-text {
      color: #aaa;
    }
  }
}

</style>
