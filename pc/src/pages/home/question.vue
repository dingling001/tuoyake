<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a>
        »
        <a href="javaScript:;">问卷调查</a>
      </div>
    </div>
    <div class="wen">
      <div class="wen-wrapper">
        <div class="img">
          <img src="../.././img/home/question.png" alt />
        </div>
        <div class="wen-title">
          <h3>
            亲爱的游客朋友：
            <br />您好，非常诚挚的邀请您为国家海洋博物馆的发展提供信息和意见，以便
            今后更好的为您服务。谢谢大家
          </h3>
        </div>
      </div>
    </div>
    <div class="question">
      <h3>{{title}}</h3>
      <ul class="question-content" v-if="svlist">
        <li v-for="(item,index) in svlist.info" :key="index">
          <h3>{{index+1}}.{{item.question}}({{item.type==1?'单选':"多选"}})</h3>
          <div class="answer-wrapper">
            <div
              class="item"
              v-for="(items,ind) in item.option_info"
              :key="ind"
              @click="chooseItem(index,items)"
            >
              <span :class="{'active':checkIschoose(items.id)}"></span>
              {{rmUnderline(items.option_info)}}
              <input
                type="text"
                v-if="items.option_type==2"
                @input="chooseInput(index,items,$event.target.value)"
              />
            </div>
          </div>
        </li>
      </ul>
      <div class="btn-wrapper">
        <div class="btn" @click="submitData">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "题目题目题目题目题目题目题目",
      startTime: "",
      endTime: "",
      count: "",
      question_id: 0,
      isLocksubmit: false,
      svlist: [],
      submitList: [
        //	   		{
        //	   			ques_type: 1,
        //	   			ques_option: [
        //	   				{
        //	   					option_id: 22,
        //	   					option_type: 2,
        //	   					ques_option_text: "你好，单选项内的文本"
        //	   				}
        //	   			]
        //	   		},
        //	   		{
        //	   			ques_type: 2,
        //	   			ques_option: [
        //	   				{
        //	   					option_id: 26,
        //	   					option_type: 1,
        //	   					ques_option_text: ""
        //	   				},
        //	   				{
        //	   					option_id: 29,
        //	   					option_type: 2,
        //	   					ques_option_text: "你好，单选项内的文本"
        //	   				}
        //	   			]
        //	   		}
      ]
    };
  },
  watch: {
    // 观察问卷题目列表
    svlist: function(val) {
      var vm = this;
      vm.submitList = [];
      for (var i in vm.svlist.info) {
        var a = vm.svlist.info[i];
        var obj = {
          ques_type: a.type,
          ques_option: [
            //		   				{
            //		   					option_id: 22,
            //		   					ques_option_text: ""
            //		   				}
          ]
        };
        vm.submitList.push(obj);
      }
    },
    // 观察已选id列表
    chooseidlist: function(val) {
      var vm = this;
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    chooseItem: function(i, b) {
      var vm = this;
      //console.log(i+"---"+b.id)
      if (vm.submitList[i].ques_type == 1) {
        // 单选
        if (
          vm.submitList[i].ques_option.length == 0 ||
          !vm.checkIschoose(b.id)
        ) {
          var obj = {
            option_id: b.id,
            option_type: b.option_type,
            ques_option_text: ""
          };
          vm.submitList[i].ques_option = [];
          vm.submitList[i].ques_option.push(obj);
        }
      } else if (vm.submitList[i].ques_type == 2) {
        // 多选
        if (vm.checkIschoose(b.id)) {
          var qi = vm.checkIschoose(b.id) - 1;
          vm.submitList[i].ques_option.splice(qi, 1);
        } else {
          var obj = {
            option_id: b.id,
            option_type: b.option_type,
            ques_option_text: ""
          };
          vm.submitList[i].ques_option.push(obj);
        }
      }
    },
    // 选择题目-输入框
    chooseInput: function(i, b, val) {
      var vm = this;
      var qi = vm.checkIschoose(b.id) - 1;
      vm.submitList[i].ques_option[qi].ques_option_text = String(val).trim();
    },
    // 去除默认输出文本附带下划线
    rmUnderline: function(str) {
      return String(str).replace(/____________/, "");
    },
    // 检查是否已选，返回index+1，当index==0也为true
    checkIschoose: function(id) {
      var vm = this;
      for (let i in vm.submitList) {
        var arr = vm.submitList[i].ques_option;
        for (let j in arr) {
          if (id == arr[j].option_id) {
            return Number(j) + 1;
            //return true
          }
        }
      }
    },
    getList() {
      this.$api.getQuestionsList().then(res => {
        if (res.status == 1) {
          this.question_id = res.data[0].question_id;
          this.title = res.data[0].title;
          this.getQuestions(this.question_id);
        }
      });
    },
    getQuestions(id) {
      this.$api.getList(id).then(res => {
        if (res.status == 1) {
          this.svlist = res.data;
          this.count = res.data.num;
        }
      });
    },
    submitData() {
      var vm = this;
      if (!vm.isLocksubmit && vm.checkForm()) {
        vm.isLocksubmit = true;
        this.$api
          .submitQuestion(vm.svlist.ques_id, vm.svlist.num, vm.submitList)
          .then(res => {
            if (res.status == 1) {
              setTimeout(function() {
                vm.$message.success("提交成功");
              }, 800);
              setTimeout(function() {
                window.location.reload();
              }, 2000);
            } else {
              vm.$message.error("提交失败");
              vm.isLocksubmit = false;
            }
          });
      } else if (vm.isLocksubmit) {
        vm.$message("请不要频繁提交");
      }
    },
    // 表单验证
    checkForm: function() {
      var vm = this;
      var count = 0;
      for (let i in vm.submitList) {
        var arr = vm.submitList[i].ques_option;
        if (arr.length > 0) {
          for (let j in arr) {
            var opt = arr[j];
            var hasnoinputtextTag = false;
            if (opt.option_type == 2) {
              if (opt.ques_option_text.trim() == "") {
                hasnoinputtextTag = true;
              }
            }
          }
          count++;
          if (hasnoinputtextTag) {
            count--;
          }
        }
      }
      if (
        count == vm.submitList.length &&
        vm.svlist.info.length == vm.submitList.length
      ) {
        return true;
      } else {
        this.$message("请完成问卷");
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.topbar-wrapper {
  background-color: #f5f5f5;
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
.wen {
  width: 100%;
  height: 260px;
  background: #e7e7e7;
  .wen-wrapper {
    width: 1200px;
    height: 260px;
    margin: 0 auto;
    display: flex;
    overflow: hidden;
    .img {
      width: 215px;
      margin-top: 28px;
      margin-right: 70px;
      img {
        width: 100%;
        display: block;
        height: auto;
      }
    }
    .wen-title {
      flex: 1;
      margin: 70px 0;
      font-size: 24px;
      font-family: "PingFangSC-Semibold";
      line-height: 48px;
    }
  }
}
.question {
  width: 100%;
  h3 {
    font-size: 24px;
    text-align: center;
    line-height: 26px;
    margin-top: 33px;
    margin-bottom: 28px;
  }
  .question-content {
    width: 1054px;
    margin: 0 auto;
    padding: 0;
    li {
      margin-bottom: 0px;
      h3 {
        font-size: 18px;
        color: #b47c2d;
        font-weight: 400;
        line-height: 40px;
        text-align: left;
        margin: 0;
      }
      .answer-wrapper {
        overflow: hidden;
        .item {
          padding-right: 130px;
          position: relative;
          cursor: pointer;
          font-size: 18px;
          color: rgba(0, 0, 0, 0.8);
          line-height: 36px;
          float: left;
          input {
            background: #fff;
            border-bottom: 1px solid #000;
            &:focus {
              outline: 0 none;
            }
          }
          span {
            width: 17px;
            height: 17px;
            display: inline-block;
            background: url(../.././img/ticket/check.png) no-repeat;
            background-size: cover;
            margin-right: 4px;
            vertical-align: middle;
            margin-top: -4px;
            &.active {
              background: url(../.././img/ticket/checked.png) no-repeat;
              background-size: cover;
            }
          }
        }
      }
    }
  }
}
.btn-wrapper {
  border-top: 5px solid #e8d7c0;
  padding: 60px 0 90px 0;
  width: 1200px;
  margin: 42px auto 0;
  .btn {
    width: 300px;
    height: 48px;
    background: rgba(180, 124, 45, 1);
    border-radius: 24px;
    margin: 0 auto;
    line-height: 48px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
}
</style>