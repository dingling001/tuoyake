<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a>
        »
        <a href="/volunteer/volrecruitlist">志愿者活动</a>
        »
        <a href="javascript:;">活动详情</a>
			</div>
		</div>
		<div class="vol-recruit-detail">
			<p class="title">{{dataOjb.title}}</p>
			<div class="main-info">
				<p>招募时间 {{dataOjb.recruit_start_time}} -- {{dataOjb.recruit_end_time}}</p>
				<p>有效时间 {{dataOjb.effective_time}}</p>
				<p>活动时间 {{dataOjb.active_date}}</p>
				<p>联系人 {{dataOjb.contact_people}}</p>
				<p>活动地点 {{dataOjb.active_place}}</p>
				<p>联系电话 {{dataOjb.contact_phone}}</p>
				<p>服务时长 {{dataOjb.service_time}}小时</p>
				<p>招募岗位 {{dataOjb.recruit_job}}</p>
			</div>
			<div class="recruit-box">
				<p style="margin: 0 100px 0 60px;">计划招募：{{dataOjb.recruit_num}}人</p>
				<p>已招募人数：{{dataOjb.signup_num}}人</p>
				<input type="button" :value="dataOjb.recruit_status_show" v-if="dataOjb.recruit_status != 2" class="forbid_click" />
				<input type="button" value="我要报名" v-if="dataOjb.recruit_status == 2" @click="apply()" />
			</div>
			<p class="active-intro">活动简介</p>
			<img :src="$toThumbsimg(dataOjb.img, 1100, 550, 33,$vol)" class="active-img" />
			<div class="active-content" v-html="dataOjb.content"></div>
			<div class="result-tip" v-if="successVal">
				<img src="../../img/volunteer/vol-success-icon.png" />
				<p>报名成功</p>
			</div>
			<div class="result-tip" v-if="failVal">
				<img src="../../img/volunteer/vol_notpass.png" />
				<p>{{failText}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      dataOjb: {},
      successVal: false,
      failVal: false,
      failText: ""
    };
  },
  mounted() {
    this.getVolActDetail();
  },
  methods: {
    getVolActDetail() {
      this.$api.volActDetail(this.$route.query.active_id).then(res => {
        this.dataOjb = res.data;
      });
    },
    apply() {
      const v = this;
      v.$api.volApplyActive(v.$route.query.active_id).then(res => {
        if (res.status == 1) {
          v.getVolActDetail();
          v.successVal = true;
        } else {
          v.failVal = true;
          v.failText = res.msg;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
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
.vol-recruit-detail {
  width: 1100px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.title {
  margin: 60px 0 40px 0;
  text-align: center;
  font-size: 20px;
  color: #000;
}

.main-info {
  width: 1100px;
  overflow: hidden;
}

.main-info p {
  width: 550px;
  float: left;
  font-size: 16px;
  line-height: 36px;
  color: rgba(0, 0, 0, 0.8);
}

.recruit-box {
  width: 1100px;
  height: 56px;
  background: #f7f2ea;
  border-radius: 28px;
  margin: 50px 0;
}

.recruit-box p {
  float: left;
  font-size: 16px;
  line-height: 56px;
  color: rgba(0, 0, 0, 0.8);
}

.recruit-box input {
  float: right;
  height: 56px;
  color: #fff;
  border: 0;
  background: #b47c2d;
  cursor: pointer;
  border-radius: 28px;
  font-size: 16px;
  padding: 0 64px;
}

.active-intro {
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.8);
}

.active-img {
  display: block;
  width: 1100px;
  height: 550px;
  margin-bottom: 40px;
}

.active-content {
  width: 1100px;
  color: #000;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 50px;
}

.result-tip {
  width: 560px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 455px;
  left: 270px;
  box-shadow:0px 4px 12px 1px rgba(180,124,45,0.31);
}

.result-tip img {
  display: block;
  width: 340px;
  margin: 50px 110px 0 110px;
}

.result-tip p {
  font-size: 24px;
  color: #000;
  line-height: 90px;
  text-align: center;
}
</style>