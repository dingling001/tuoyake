<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a> »
        <a href="javaScript:;">意见反馈</a>
      </div>
    </div>
    <div class="main">
      <div class="form-inline">
        <textarea v-model="content" placeholder="请输入您的宝贵意见"></textarea>
      </div>
      <div class="form-inline">
        <input type="text" v-model="phone" maxlength="11" placeholder="请填写您的联系方式（选填）：" />
      </div>
      <div class="btn" @click="saveFeed">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      phone: "",
      api_token: localStorage.api_token || "",
      language: localStorage.l || 1
    };
  },
  methods: {
    saveFeed() {
      if (this.content == "") {
        this.$message("请填写您的宝贵意见");
        return false;
      }
      this.$api.saveFeed(this.content, this.phone).then(res => {
        if (res.status == 1) {
          this.$message({ type: "success", message: "提交成功" });
          setTimeout(() => {
            this.phone = "";
            this.content = "";
          }, 1500);
        }
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
.main {
  width: 1200px;
  margin: 39px auto 60px;
  .form-inline {
    margin: 20px 0;
    textarea {
      width: 100%;
      height: 446px;
      border: 1px solid #bfbfbf;
      padding: 20px;
      line-height: 30px;
      resize: none;
      &:focus {
        border-color: #b47c2d;
        outline: 0 none;
      }
    }
    input {
      border: 1px solid #bfbfbf;
      outline: 0 none;
      height: 62px;
      line-height: 60px;
      padding: 0 10px;
      width: 1200px;
      &:focus {
        border-color: #b47c2d;
        outline: 0 none;
      }
    }
  }
  .btn {
    width: 300px;
    height: 48px;
    background: rgba(180, 124, 45, 1);
    border-radius: 24px;
    line-height: 48px;
    color: #fff;
    text-align: center;
    margin: 40px auto 0;
  }
}
</style>

