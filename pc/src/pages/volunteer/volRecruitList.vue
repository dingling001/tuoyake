<template>
  <div id="vol-recruit-box">
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a>
        »
        <a href="javascript:;">志愿者活动</a>
      </div>
    </div>
    <div class="vol_recruit_list">
      <div class="filtrate-box">
        <p>选择时间段</p>
        <el-date-picker
          :editable="false"
          v-model="startTime"
          type="date"
          placeholder="起始日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <p>至</p>
        <el-date-picker
          :editable="false"
          v-model="endTime"
          type="date"
          placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <p style="margin-left: 50px;">服务类别</p>
        <select v-model="activeType" class="select_bg select_position">
          <option value>请选择类别</option>
          <option v-for="item in workList" :value="item.id">{{item.title}}</option>
        </select>
        <input type="button" value="查询" class="inquire-btn" @click="search()" />
      </div>
      <div class="result-list">
        <ul>
          <li class="no-data" v-if="activeList.length == 0">暂无数据</li>
          <li
            v-for="item in activeList"
            @click="$router.push({path:'/volunteer/volrecruitdetail',query:{active_id:item.id}})"
          >
            <img :src="$toThumbsimg(item.img, 453, 197, 33,$vol)" />
            <div class="info-box">
              <p class="active-title">{{item.title}}</p>
              <p class="active-time">活动时间：{{item.active_date}}</p>
              <p class="active-place">活动地点：{{item.active_place}}</p>
              <p class="serve-type">服务类别：{{item.recruit_job}}</p>
              <p class="serve-time">服务时长：{{item.service_time}}小时</p>
              <p
                class="active-status"
                :class="{forbid_click:item.recruit_status != 2}"
              >{{item.recruit_status_show}}</p>
            </div>
          </li>
        </ul>
      </div>
      <page
        :totalPages="totalPages"
        @presentPage="getPresentPage"
        v-if="totalPages > 1"
        style="margin-bottom: 20px;"
      ></page>
      <Pcloading v-if="isLoading"></Pcloading>
    </div>
  </div>
</template>

<script>
import page from "../../components/pcpaging.vue";
import Pcloading from "../../components/pcloading.vue";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      activeType: "",
      page: 0, //当前页
      workList: [],
      activeList: [],
      totalPages: 0, //总页数
      isLoading: true
    };
  },
  mounted() {
    this.getJobList();
    this.getVolList();
  },
  methods: {
    search() {
      this.isLoading = true;
      this.getVolList();
    },
    getPresentPage(val) {
      const v = this;
      v.isLoading = true;
      v.page = val;
      v.getVolList();
    },
    getVolList() {
      const v = this;
      v.$api.volList(v.page, v.startTime, v.endTime, v.activeType).then(res => {
        setTimeout(function() {
          v.isLoading = false;
          v.activeList = res.data.list;
          v.totalPages = Math.ceil(res.data.count / 5);
        }, 500);
      });
    },
    getJobList() {
      this.$api.jobList().then(res => {
        this.workList = res.data;
      });
    }
  },
  components: {
    page,
    Pcloading
  }
};
</script>

<style lang="scss">
#vol-recruit-box {
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
}

.vol_recruit_list {
  width: 1200px;
  margin: 0 auto;
  .filtrate-box {
    overflow: hidden;
    border-bottom: 1px solid #b47c2d;
    padding: 32px 0 26px 5px;
    select {
      width: 208px;
      height: 40px;
      float: left;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding-left: 24px;
      background: url("../../img/active/down_triangle.png") no-repeat scroll
        175px center transparent;
    }
    .inquire-btn {
      width: 110px;
      height: 40px;
      border-radius: 4px;
      float: right;
      background: #b47c2d;
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
  }
  .filtrate-box p {
    float: left;
    font-size: 16px;
    color: #000;
    line-height: 40px;
    margin: 0 15px;
  }
  .el-input__prefix {
    display: none;
  }
  .el-date-editor {
    width: 208px;
    float: left;
  }
  .result-list {
    padding-bottom: 20px;
  }
  .result-list li {
    width: 1198px;
    overflow: hidden;
    border: 1px solid #aaa;
    margin-top: 20px;
    cursor: pointer;
  }
  .result-list .no-data {
    border: 0;
    line-height: 240px;
    text-align: center;
    color: #ccc;
    font-size: 16px;
  }
  .result-list li img {
    display: block;
    float: left;
    width: 453px;
    height: 197px;
    margin: 20px;
  }
  .info-box {
    padding-left: 5px;
    font-size: 16px;
    color: #000;
  }
  .active-title {
    font-size: 20px;
    line-height: 20px;
    margin-top: 23px;
    margin-bottom: 15px;
  }
  .active-time,
  .active-place,
  .serve-time {
    color: rgba(0, 0, 0, 0.8);
    line-height: 16px;
    margin: 12px 0;
  }
  .active-status {
    height: 40px;
    padding: 0 35px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background: #b47c2d;
    float: right;
    border-radius: 20px;
    margin-right: 38px;
  }
}
</style>