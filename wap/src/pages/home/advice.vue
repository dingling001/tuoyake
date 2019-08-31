<template>
  <div>
    <div class="advice">
      <div class="content" ref="wrapper">
        <mt-loadmore :top-method="loadTop" ref="loadmore" :autoFill="isAutoFill">
          <div class="info">
            <h3>Hi，我是智能小助手</h3>
            <p>尊敬的游客，您反馈的意见我都会记录下来哦~</p>
            <p class="last">客服小姐姐会认真查看并在三个工作日内回复您的问题请您耐心等待。您也可以拨打下面的客服热线来进行反馈~</p>
            <div class="btn">
              <a href="tel:022-67185138" tel="022-67185138">
                <span></span>022-67185138
              </a>
            </div>
          </div>
          <!-- 意见部分 -->
          <ul>
            <li
              v-for="(item,index) in lists"
              :key="index"
              class="mui-table-view-cell mui-media mui-col-xs-6"
            >
              <div class="answer-wrapper">
                <div class="answer">{{item.feedback_content}}</div>
              </div>

              <div class="des">
                <p>您反馈的问题我们已经记录下来了哦~</p>
                <p class="last">客服小姐姐会认真查看并在三个工作日内回复您的问题请您耐心等待。</p>
              </div>
              <div class="answer-wrapper" v-if="item.reply_uid>0">
                <div class="reply">{{item.reply_content}}</div>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
      <div class="bottom">
        <div class="pen"></div>
        <input
          type="text"
          placeholder="点此留下您的意见与建议（200字以内）"
          v-model="content"
          maxlength="200"
          @keyup.enter="sendMsg"
        />
        <div class="arrow" @click="sendMsg"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists: [],
      content: "",
      allLoaded: false,
      //是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
      courrentPage: 0,
      page: 1,
      take: 10,
      skip: 0
    };
  },
  methods: {
    getList() {
      this.skip = (this.page - 1) * this.take;
      this.$api.getFeedback(this.skip, this.take).then(res => {
        if (res.status == 1) {
          this.lists = res.data.reverse();
          if (this.lists.length < this.take) {
            this.allLoaded = false;
          }
          this.$refs.loadmore.onTopLoaded();
        }
      });
    },
    sendMsg() {
      if (this.content != "") {
        this.$api.saveFeeback(this.content).then(res => {
          if (res.status == 1) {
            this.content = "";
            this.getList();
          }
        });
      }
    },
    loadTop() {
      if (this.lists.length < this.take) {
        this.$refs.loadmore.onTopLoaded();
      } else {
        this.page = this.page + 1;
        this.getList();
      }
    },
    loadBottom: function() {}
  },
  mounted() {
    this.getList();
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>
<style lang="scss" scoped>
.advice {
  width: 100%;
  height: 100vh;
  background: #faf3de;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 9px;
    /*px*/
    .info {
      background: #fff;
      border-radius: 14px;
      padding: 22px 28px 17px;
      h3 {
        font-size: 19px;
        color: #000;
        margin-bottom: 20px;
      }
      p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
        line-height: 23px;
        &.last {
          text-indent: 2em;
        }
      }
      .btn {
        margin: 17px auto 0;
        width: 207px;
        height: 38px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(241, 145, 73, 1);
        border-radius: 4px;
        line-height: 38px;
        font-size: 17px;
        color: #000;
        text-align: center;
        span {
          width: 21px;
          height: 19px;
          background: url(../.././img/nav/tel.png) no-repeat;
          background-size: cover;
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
    ul {
      .answer-wrapper {
        overflow: hidden;
        margin: 10px 0;
      }
      .answer {
        background: rgba(18, 150, 219, 1);
        border-radius: 13px 18px 5px 13px;
        padding: 10px 14px 9px;
        color: #fff;
        width: 317px;
        float: right;
        line-height: 23px;
      }
      .des {
        width: 358px;
        background: rgba(255, 255, 255, 1);
        border-radius: 14px;
        padding: 16px 38px 18px 27px;
        line-height: 23px;
        p {
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          &.last {
            text-indent: 2em;
          }
        }
      }
      .reply {
        background: rgba(241, 145, 73, 1);
        border-radius: 18px 13px 13px 5px;
        padding: 11px 10px 11px 13px;
        color: #fff;
        font-size: 14px;
        line-height: 23px;
        float: left;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 50px;
    display: flex;
    background: #fff;
    line-height: 50px;
    .pen {
      width: 22px;
      /*px*/
      height: 17px;
      /*px*/
      background: url(../.././img/nav/pen.png) no-repeat;
      background-size: cover;
      display: inline-block;
      margin-top: 14px;
      /*px*/
      margin-left: 12px;
      /*px*/
    }
    .arrow {
      width: 22px;
      /*px*/
      height: 17px;
      /*px*/
      background: url(../.././img/nav/a.png) no-repeat;
      background-size: cover;
      display: inline-block;
      margin-top: 14px;
      /*px*/
      margin-right: 12px;
      /*px*/
    }
    input {
      flex: 1;
      outline: 0 none;
      background: #fff;
      color: rgba(0, 0, 0, 0.5);
      border: 0 none;
      margin: 0 10px;
    }
  }
}
</style>
