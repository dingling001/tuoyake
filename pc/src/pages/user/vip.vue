<template>
  <div class="user-r">
    <div class="vip">
      <div class="btn">
        <i class="iconfont iconbianji" @click="goReview">修改资料</i>
      </div>
    </div>
    <h3 class="user-title">我的会员权益</h3>
    <ul v-if="showR">
      <li>
        <h3>
          <span>
            <i class="iconfont iconshualian"></i>
          </span>
          免身份证入馆
        </h3>
      </li>
      <li>
        <h3>
          <span>
            <i class="iconfont icondianji"></i>
          </span>
          一键预约常设展览功能
        </h3>
        <div class="btns" @click="goPw">去预约</div>
      </li>
    </ul>
    <div class="vip-form" v-else>
      <img :src="vip.portrait" alt class="img">
      <div class="input-box">
        <p>
          <span>姓名</span>
        </p>
        <span class="items">{{vip.real_name}}</span>
      </div>
      <div class="input-box">
        <p>
          <span>性别</span>
        </p>
        <span class="items">{{vip.sex==1?'男':"女"}}</span>
      </div>
      <div class="input-box">
        <p>
          <span>民族</span>
        </p>
        <span class="items">{{vip.nation}}</span>
      </div>
      <div class="input-box">
        <p>
          <span>手机号码</span>
        </p>
        <span class="items">{{phone}}</span>
      </div>
      <div class="input-box">
        <p>
          <span>身份证号</span>
        </p>
        <span class="items">{{vip.id_card}}</span>
      </div>
      <div class="input-box">
        <p>
          <span>学历</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <select v-model="vip.edu">
          <option value>请选择</option>
          <option v-for="(item,index) in edus" :key="index" :value="item.value">{{item.label}}</option>
        </select>
      </div>

      <div class="input-box address">
        <p>
          <span>居住地址</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <select v-model="vip.province" @change="setCity">
          <option value>请选择</option>
          <option
            v-for="(item,index) in provices"
            :value="item.region_id"
            :key="index"
          >{{item.region_name}}</option>
        </select>
        <select v-model="vip.city" @change="setCounty">
          <option value>请选择</option>
          <option
            v-for="(item,index) in citys"
            :value="item.region_id"
            :key="index"
          >{{item.region_name}}</option>
        </select>
        <select v-model="vip.town">
          <option value>请选择</option>
          <option
            v-for="(item,index) in county"
            :value="item.region_id"
            :key="index"
          >{{item.region_name}}</option>
        </select>
      </div>
      <div class="input-box">
        <p>
          <span>家庭地址</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <textarea
          style="width: 644px;height:122px"
          type="text"
          placeholder="请填写地址"
          v-model="vip.address"
        ></textarea>
      </div>
      <div class="wrapper">
        <div class="cancel" @click="showR=!showR">取消</div>
        <div class="ok" @click="registerVip">确定修改</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "center",
  data() {
    return {
      phone: "",
      showR: true,
      vip: {
        real_name: "",
        sex: "",
        nation: "",
        edu: "",
        id_card: "",
        province: "",
        city: "",
        town: "",
        address: "",
        portrait: ""
      },
      provices: [],
      citys: [],
      county: [],
      edus: [
        {
          value: 1,
          label: "小学"
        },
        {
          value: 2,
          label: "初中"
        },
        {
          value: 3,
          label: "高中"
        },
        {
          value: 4,
          label: "专科"
        },
        {
          value: 5,
          label: "本科"
        },
        {
          value: 6,
          label: "硕士"
        },
        {
          value: 7,
          label: "博士及以上"
        }
      ]
    };
  },
  methods: {
    goReview() {
      this.showR = false;
      this.getUser();
      this.getVipI();
    },
    getUser() {
      this.$api.getUser().then(res => {
        this.phone = res.data.phone;
      });
    },
    goPw() {
      this.$router.push({ path: "/pw/person/index", query: { state: 1 } });
    },
    registerVip() {
      if (this.vip.edu == "") {
        this.$message.error("请选择学历");
        return false;
      }
      if (this.vip.province == "") {
        this.$message.error("请选择居住地");
        return false;
      }
      if (this.vip.city == "") {
        this.$message.error("请选择市");
        return false;
      }
      if (this.vip.town == "") {
        this.$message.error("请选择县或区");
        return false;
      }
      if (this.vip.address == "") {
        this.$message.error("请填写详细地址");
        return false;
      }
      if (this.vip.portrait == "") {
        this.$message.error("请上传会员头像");
        return false;
      }
      if (this.read == false) {
        this.$message.error("请勾选会员条款");
        return false;
      }
      this.$api
        .registerRemeber(
          this.vip.real_name,
          this.vip.sex,
          this.vip.portrait,
          this.vip.nation,
          this.vip.edu,
          this.vip.id_card,
          this.vip.province,
          this.vip.city,
          this.vip.town,
          this.vip.address
        )
        .then(res => {
          if (res.status == 1) {
            this.$message.success("修改成功");
            this.showR = true;
            window.scroll(0, 0);
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    setCity() {
      for (let i = 0; i < this.provices.length; i++) {
        if (this.provices[i].region_id == this.vip.province) {
          this.citys = this.provices[i].child;
          this.vip.city = "";
        }
      }
    },
    setCounty() {
      for (let i = 0; i < this.citys.length; i++) {
        if (this.citys[i].region_id == this.vip.city) {
          this.county = this.citys[i].child;
          this.vip.town = "";
        }
      }
    },
    getR() {
      this.$api.getRegion().then(res => {
        this.provices = res.data;
      });
    },
    getVipI() {
      this.$api.getVipI().then(res => {
        this.vip = res.data;
        this.vip.province = res.data.province;
        for (let i = 0; i < this.provices.length; i++) {
          if (this.provices[i].region_id == this.vip.province) {
            this.citys = this.provices[i].child;
            this.vip.city = res.data.city;
            for (let m = 0; m < this.citys.length; m++) {
              if (this.citys[m].region_id == this.vip.city) {
                this.county = this.citys[m].child;
                this.vip.town = res.data.town;
              }
            }
          }
        }
        this.vip.edu = res.data.edu;
      });
    }
  },
  mounted() {
    this.getR();
  }
};
</script>
<style lang="scss" scoped>
.user-r {
  flex: 1;
}
.vip {
  width: 100%;
  height: 200px;
  background: url(../.././img/vip/vips.png) no-repeat;
  background-size: cover;
  position: relative;
}
.vip .btn {
  width: 122px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  right: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  background: rgba(180, 124, 45, 1);
  border-radius: 20px;
}
.user-title {
  font-size: 18px;
  color: #000;
  padding-bottom: 10px;
  padding-left: 30px;
  margin-top: 30px;
  border-bottom: 1px solid #e5e5e5;
}

ul {
  padding: 0px;
}
ul li {
  height: 95px;
  line-height: 95px;
  font-size: 18px;
  color: #000;
  border-bottom: 1px solid #e5e5e5;
  position: relative;
}
ul li h3 {
  color: #000000;
  font-size: 20px;
  margin: 0 0 20px 0;
  font-weight: 400;
  position: relative;
  padding-left: 80px;
}
.btns {
  width: 122px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #b47c2d;
  border: 1px solid rgba(180, 124, 45, 1);
  border-radius: 20px;
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -20px;
  cursor: pointer;
}
ul li h3 span {
  width: 47px;
  height: 47px;
  line-height: 47px;
  text-align: center;
  background: linear-gradient(
    139deg,
    rgba(115, 133, 137, 1),
    rgba(189, 209, 214, 1)
  );
  border-radius: 50%;
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(-50%, -50%);
  z-index: 5;
}
ul li h3 span i {
  font-size: 26px;
  color: #fff;
}
.vip-form {
  position: relative;
  .img {
    position: absolute;
    top: 40px;
    right: 160px;
    width: 170px;
    height: 235px;
  }
}
.input-box {
  overflow: hidden;
  margin: 20px 0;
}
.input-box input,
.input-box textarea,
.input-box select {
  width: 265px;
  height: 56px;
  border: 1px solid #eee;
  box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
  border-radius: 1px;
  padding-left: 12px;
  float: left;
}
.input-box textarea {
  resize: none;
  padding: 10px;
}
.input-box textarea:focus {
  outline: 0 none;
}
.address select {
  width: 200px;
  margin-right: 20px;
}
.input-box .required_act {
  border-color: red;
}
.input-box p {
  display: block;
  width: 120px;
  height: 56px;
  line-height: 56px;
  float: left;
  text-align: right;
  padding-right: 17px;
  font-size: 16px;
  color: #313131;
}
.input-box p span {
  float: right;
}
.input-box span.items {
  display: block;
  height: 56px;
  line-height: 56px;
}
.input-box p img {
  float: right;
  margin: 25px 10px 0 0;
}
.input-box .info-wrapper {
  width: auto;
  padding-left: 30px;
  span {
    display: inline-block;
    float: none;
    margin: 0 10px 0 0;
  }
}
.info {
  text-decoration: underline;
  color: #b47c2d;
  cursor: pointer;
}
.wrapper {
  padding-top: 30px;
  overflow: hidden;
  width: 60%;
  margin: 0 auto 40px;
  .cancel {
    width: 206px;
    height: 47px;
    line-height: 47px;
    color: #000000;
    text-align: center;
    float: left;
    font-size: 16px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 1);
    border-radius: 24px;
    cursor: pointer;
  }
  .ok {
    width: 206px;
    height: 47px;
    background: rgba(180, 124, 45, 0.8);
    line-height: 47px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    float: right;
    border-radius: 24px;
    cursor: pointer;
  }
}
</style>