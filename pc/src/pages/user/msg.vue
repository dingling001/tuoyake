<template>
  <div class="user-r">
    <!-- 右侧部分 -->
    <div>
      <h3 class="user-title">我的消息</h3>
      <ul v-if="msgs.length>0">
        <li v-for="(item,index) in msgs" :key="index">
          <h3>
            <span></span>
            {{item.created_at|time}}
          </h3>
          <div class="content">{{item.content}}</div>
        </li>
      </ul>
      <div class="no" v-else>
        <p>暂无任何消息</p>
      </div>
    </div>
    <page :totalPages="totalPage" @presentPage="getPage" v-if="totalPage>1"></page>
  </div>
</template>
<script>
import page from "../../components/pcpaging.vue";
export default {
  name: "center",
  data() {
    return {
      msgs: [],
      totalPage: 0,
      skip: "",
      take: 10
    };
  },
  components: {
    page
  },
  methods: {
    getMsg() {
      this.$api.getNotice().then(res => {
        this.msgs = res.data.notice;
      });
    },
    getPage(val) {
      this.skip = val * this.take;
      this.getMsg(this.skip);
    }
  },

  filters: {
    time: function(data) {
      var date = data;
      var das = new Date();
      var dMonth = das.getMonth() + 1;
      var dY = das.getFullYear();
      var dD = das.getDay();
      var year = date.substring(0, 4);
      var month = date.substring(5, 7);
      var day = date.substring(8, 10);
      var hours = date.substring(11, 13);
      var min = date.substring(14, 16);

      if (dY == year && month == dMonth) {
        return month + "/" + day + "  " + hours + ":" + min;
      }
      if (dY == year && month == dMonth && day == dD) {
        return "今天    " + hours + ":" + min;
      }
      return year + "/" + month + "/" + day + "  " + hours + ":" + min;
    }
  },
  created() {
    this.getMsg();
  }
};
</script>
<style lang="scss" scoped>
.user-r {
  flex: 1;
  padding-left: 30px;
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
ul {
  padding: 30px;
}
ul li {
  margin: 10px 0;
  padding: 10px 0 0px;
  font-size: 16px;
  color: #000;
}
ul li h3 {
  color: #000000;
  font-size: 20px;
  margin: 0 0 20px 0;
  font-weight: 400;
  position: relative;
  padding-left: 16px;
}
ul li h3 span {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  background: #b47c2d;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
}
.content {
  padding-left: 0px;
  width: 98%;
  margin: 0 auto;
  margin-left: 2%;
  padding-bottom: 10px;
  border-bottom: 1px dashed #000;
}
</style>