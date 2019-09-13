<template>
  <div>
    <div class="thead">
      <div class="taddress">
        <span class="iconfont iconchakantiezidingwei"></span>
        <span class="city">{{city}}</span>
        <span class="change" @click="changCity">[切换城市]</span>
        <span class="login">
          <span class="loginbox" v-if="!tyktoken">
            <span class="reg">立即登录</span>
            <span>注册</span>
          </span>
            <span class="loginbox" v-else>
            <span class="reg">Viki</span>
            <span>退出</span>
          </span>
        </span>
        <span class="business">商家中心</span>
      </div>
    </div>
    <div class="tnav">
      <div class="tnavtop">
        <div class="tlogo">
          <img src="../img/timg/index_logo.png" alt="">
        </div>
        <div class="tinput">
          <el-input
            placeholder="搜索网吧或相关赛事"
            v-model="tkeyword">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <el-button type="danger"><i class="iconfont iconshouji"></i> 下载APP</el-button>
      </div>
      <div class="tnavbottom">
        <div :class="cur==index?'tnavitem tnavitemactive':'tnavitem'" :key="index"
             v-for="(item,index) in navs" @click="gonav(index,item.path)">{{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cur: 0,
        city: '北京',
        top: 0,
        tyktoken: null,
        tkeyword: '',
        navs: [
          {
            name: '首页',
            path: '/'
          },
          {
            name: '电竞馆',
            path: '/competition'
          },
          {
            name: '电竞学院',
            path: '/school'
          },
          {
            name: '电竞俱乐部',
            path: '/club'
          },
          {
            name: '关于我们',
            path: '/about'
          },
        ]
      };
    },
    computed: {},
    methods: {
      // 切换城市
      changCity() {
        console.log('切换城市')
      },
      // 跳转
      gonav(index, path) {
        this.cur = index;
        this.$router.push({path: path})
      },
      handleScroll() {
        this.top =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      }
    },
    beforeRouteEnter(to, form, next) {
      console.log(this)
      if (to.meta.cur) {
        next.cur = to.cur;
      }
      next()
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
      document.title = '托亚克 | ' + this.city;
    }
  };
</script>


<style scoped lang="scss">
  @import "../style/reset";

  .thead {
    background-color: #f4f4f4;
    .taddress {
      width: 1200px;
      margin: 0 auto;
      padding: 13px 0;
      font-size: 12px;
      color: #777;
      overflow: hidden;
      position: relative;

      .change {
        cursor: pointer;

        &:hover {
          color: $baseRed;
        }
      }

      .iconfont {
        color: #999999;
      }

      .city {
        padding: 0 6px;
      }

      .login {
        margin-left: 30px;

        .loginbox {
          span {
            cursor: pointer;

            &:hover {
              color: $baseRed;
            }
          }

          .reg {
            color: $baseRed;
            padding: 0 5px;
          }
        }

      }

      .business {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        line-height: 40px;
        cursor: pointer;

        &:hover {
          color: $baseRed;
        }
      }
    }
  }

  .tnav {
    background-color: #fff;

    &top {
      width: 1200px;
      margin: 0 auto;
      padding: 30px 0;
      overflow: hidden;

      .tlogo {
        width: 203px;
        /*height: 20px;*/
        font-size: 0;
        /*padding: 0 10px 0 0;*/
        /*border-right: 1px solid #eee;*/
        margin-right: 37px;
        float: left;

        img {
          width: 100%;
        }
      }

      .tinput {
        width: 655px;
        float: left;

        /deep/ .el-input {
          width: 555px;
          float: left;
          border-radius: 0;

          input {
            border-radius: 0;
          }
        }

        /deep/ .el-button.el-button--primary {
          float: left;
          text-align: center;
          width: 100px;
          border-radius: 0;
          background-color: $baseBlue;
          border: 0;
          padding: 13px 0;
        }
      }

      /deep/ .el-button.el-button--danger {
        float: right;
        text-align: center;
        width: 173px;
        border-radius: 0;
        background-color: $baseRed;
        border: 0;
        padding: 13px 0;
      }

    }

    &bottom {
      overflow: hidden;
      width: 1200px;
      margin: 0 auto;

      .tnavitem {
        margin-right: 56px;
        font-size: 16px;
        color: #333333;
        float: left;
        cursor: pointer;
        padding: 11px 0;
        border-bottom: 2px solid #fff;

        &:hover {
          color: $baseBlue;
          border-color: $baseBlue;
          font-weight: bold;
        }
      }

      .tnavitemactive {
        color: $baseBlue;
        border-color: $baseBlue;
        font-weight: bold;
      }
    }
  }
</style>
