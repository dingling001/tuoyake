<template>
  <div class="container">
    <ProgressBar progressTitle="团体注册" :progressActiveNum="1" :showProgress="false">
      <div slot="right" class="status">{{statusTxt[info.team_status-1]}}</div>
    </ProgressBar>
    <div class="content">
      <div class="reason" v-if="[3,4].includes(+info.team_status)" v-html="info.team_mark.replace(/\n/g, '<br/>')"></div>
      <!-- 团队预约提交的相关信息 -->
      <div class="submit-info">
        <div class="main">
          <div class="info-contain">
            <h3 class="title">{{info.team_type_name}}</h3>
            <ul>
              <li class="clearfix">
                <span class="left label">联系人姓名：</span>
                <span class="left contain">{{info.team_username}}</span>
              </li>
              <li class="clearfix">
                <span class="left label">团体名称：</span>
                <span class="left contain">{{info.teamname}}</span>
              </li>
              <li class="clearfix">
                <span class="left label">统一社会信用代码：</span>
                <span class="left contain">{{info.s_c_code}}</span>
              </li>
              <li class="clearfix">
                <span class="left label">资质证书：</span>
                <span class="left contain"><img :src="info.team_atta" alt></span>
              </li>
            </ul>
          </div>
        </div>
        <!-- button -->
        <el-button class="btn" v-if="[3,4].includes(+info.team_status)" @click="$router.replace('/pw/team/register')">重新填写</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ProgressBar from '../common/progressBar.vue';
export default {
  name: '',
  data() {
    return {
      apiToken: localStorage.api_token || "",
      info: "",
      statusTxt: ['待审核', '正常', '审核未通过', '禁用'], //1待审核，2正常，3拒绝，4禁用
    }
  },
  components: {
    ProgressBar
  },
  created() {
    this.$api.PW_PC_teamInfo(this.apiToken).then(res => {
      if (res.status == 1) {
        // console.log(res)
        this.info = res.data;
      } else {
        this.$message.error(res.msg);
      }
    })
  }
};

</script>
<style lang="scss" scoped>
.container {
  font-size: 16px;

  .clearfix::before,
  .clearfix::after {
    content: "";
    display: table;
  }

  .clearfix::after {
    clear: both;
  }

  .status {
    font-weight: 700;
    font-size: 24px;
    text-align: right;
    line-height: 100px;
    color: #EF0F0F;
    margin-right: 70px;
  }

  .content {
    width: 1200px;
    margin: 20px auto 0;
    padding-bottom: 80px;

    .reason {
      padding: 15px 0;
      font-size: 16px;
      line-height: 25px;
    }

    .submit-info {

      .main {
        .left {
          float: left;
        }

        .right {
          float: right;
        }

        .info-contain {
          width: 1107px;
          line-height: 1;
          color: #313131;

          .title {
            height: 49px;
            line-height: 50px;

            &::before {
              content: '';
              display: inline-block;
              width: 8px;
              height: 8px;
              background-color: #B47C2D;
              border-radius: 50%;
              margin-right: 10px;
            }
          }

          ul {
            margin-bottom: 40px;

            li {
              margin-top: 10px;
              width: 800px;
              line-height: 30px;

              &.tick {
                line-height: 30px;
              }

              .label {
                width: 150px;
                text-align: right;
                margin-right: 15px;
              }

              .contain {

                img {
                  display: block;
                  width: 306px;
                  height: 172px;
                  background-color: rgba(0, 0, 0, 0.2);
                }
              }
            }
          }
        }
      }

      .btn {
        display: block;
        margin: 150px auto 0;
        width: 300px;
        height: 48px;
        background: #b17a2c;
        border-radius: 24px;
        color: #fff;
        text-align: center;
        border: none;
        cursor: pointer;
      }
    }
  }
}

</style>
