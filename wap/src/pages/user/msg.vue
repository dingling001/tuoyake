<template>
  <div class="msg">
    <ul v-if="msgs.length>0">
      <li v-for="(item,index) in msgs" :key="index">
        <h3>
          <span></span>
          {{item.created_at|time}}
        </h3>
        <div class="content">{{item.content}}</div>
      </li>
    </ul>
    <div class="no" v-else>暂无任何消息</div>
  </div>
</template>
<script>
export default {
  name: "msg",
  data() {
    return {
      msgs: []
    };
  },
  methods: {
    getMsg() {
      this.$api.getNotice().then(res => {
        this.msgs = res.data.notice;
      });
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
  mounted() {
    this.getMsg();
  }
};
</script>
<style scoped>
.navP {
  background: #f5f5f5;
}
.no {
  margin: 260px auto;
  width: 300px;
  color: #999;
  font-size: 14px;
  text-align: center;
}
ul {
  padding: 10px 0;
}
ul li {
  margin: 10px 0;
  padding: 10px 20px 0px;
  font-size: 16px;
  color: #000;
  border-bottom: 1px dashed #e1e1e1;
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
}
</style>
