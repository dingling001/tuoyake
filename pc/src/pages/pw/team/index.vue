<template>
  <!-- 这个页面用放置团队的相关页面渲染 -->
  <div class="date">
    <!-- 步进条 -->
    <ProgressBar></ProgressBar>
    <div class="date__box" v-loading="calendarLoading" element-loading-text="拼命加载中">
      <div class="date__cont">
        <CalendarTeam :calendarInfo="result.data
" v-if="result.data && result.data.yy_date.length>0"></CalendarTeam>
        <!-- 不能预约时的状态显示 -->
        <div v-if="!result.data" class="stop__run">
          <div class="img" :class="{'weihu': result.status == 9001, 'zanting': result.status == 9002}"></div>
          <div class="tips" v-html="result.msg.replace(/\n/g,'<br>')"></div>
        </div>
      </div>
    </div>
    <div class="date__btns" v-if="result.data && result.data.yy_date.length>0">
      <el-button type="primary" class="btn__team" @click="teamApply">团队预约</el-button>
    </div>
    <div class="date__notice">
      <div class="date__notice__cont" v-html="notice.replace(/\n/g,'<br>')"></div>
    </div>
  </div>
</template>
<script>
import CalendarTeam from "../common/calendar_team.vue";
import ProgressBar from '../common/progressBar.vue';
import { Session } from '@/bin/cache.js';


export default {
  name: "team",
  data() {
    return {
      api_token: localStorage.api_token || "",
      calendarLoading: true,
      result: {
        data: {
          yy_date: []
        }
      },
      notice: "",
    }
  },
  components: {
    ProgressBar,
    CalendarTeam,
  },
  created() {
    this.getTeamCalendar();
    this.getTeamNotice();
  },
  methods: {
    /**
     * @获取团体日历
     */
    getTeamCalendar() {
      this.$api.Calendar_team(this.api_token).then(res => {
        this.calendarLoading = false;
        if ([1, 9001, 9002].includes(+res.status)) {
          // console.log(res)
          // 9001: 不在可预约时间 pm 11:00 - am 7:30 
          // 9002: 暂停预约
          this.result = res;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.calendarLoading = false;
      })
    },
    /**
     * @团体预约须知
     */
    getTeamNotice() {
      this.$api.PW_PC_teamTextTip().then(res => {
        if (res.status == 1) {
          // console.log(res)
          this.notice = res.data.text_tip_team;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {})
    },
    /**
     * @团体预约
     */
    teamApply() {
      if (!Session.get("hbpw_team__td_txt")) {
        this.$message({
          message: "请选择参观日期！",
          type: "warning"
        });
        return;
      }
      if (!Session.get("hbpw_team__td_tp_txt")) {
        this.$message({
          message: "请选择参观时段！",
          type: "warning"
        });
        return;
      }
      this.$router.push('/pw/team/fillinfo')
    },
  }
}

</script>
<style lang="scss" scoped>
.date {

  &__box {
    width: 1200px;
    min-height: 300px;
    margin: 20px auto 0;

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

    .date__cont {
      width: 822px;
      min-height: 302px;
      margin: 0 auto;

      .stop__run {
        margin-top: 100px;

        .img {
          margin: 0 auto 30px;
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;

          &.weihu {
            width: 295px;
            height: 170px;
            background-image: url('../../../img/ticket/no-correct-time.png');
          }

          &.zanting {
            width: 259px;
            height: 200px;
            background-image: url('../../../img/ticket/ss.png');
          }
        }

        .tips {
          font-size: 20px;
          font-weight: 500;
          color: #353535;
          line-height: 36px;
          text-align: center;
        }
      }
    }
  }

  &__btns {
    width: 239px;
    margin: 100px auto 0;

    .btn__team {
      display: inline-block;
      width: 239px;
      height: 48px;
      text-align: center;
      font-size: 16px;
      border-radius: 24px;
      border: 0;
      outline: none;
      color: #fff;
      background-color: #B47C2D;

      &:active {
        opacity: 0.7;
      }

    }
  }

  &__notice {
    width: 1200px;
    margin: 50px auto 0;
    padding: 30px 0;
    line-height: 30px;
    font-size: 16px;
    border-top: 5px solid rgba(180, 124, 45, 0.3);
  }
}

</style>
