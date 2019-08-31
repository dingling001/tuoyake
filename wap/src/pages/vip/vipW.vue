<template>
  <div class="vip">
    <h4>个人会员申请</h4>
    <div class="form">
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>姓名
        </span>
        <input type="text" v-model="vip.username" placeholder="请输入姓名" @blur="getOk">
      </div>
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>性别
        </span>
        <p @click="popupVisible=!popupVisible">{{vip.sex==''?'请选择性别':vip.sex==1?'男':"女"}}</p>
        <i class="iconfont iconfanhui1" @click="popupVisible=!popupVisible"></i>
      </div>
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>身份证号
        </span>
        <input
          type="text"
          v-model="vip.id_card"
          maxlength="18"
          placeholder="请输入身份证号码"
          @blur="getOk"
        >
      </div>
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>民族
        </span>
        <input type="text" v-model="vip.nation" placeholder="请输入民族" @blur="getOk">
      </div>
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>学历
        </span>
        <p @click="eduF=!eduF">{{vip.edu==''?'请选择':eduName}}</p>
        <i class="iconfont iconfanhui1" @click="eduF=!eduF"></i>
      </div>
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>居住地区
        </span>
        <p @click="maskF=true" v-if="vip.province==''">请选择</p>
        <p @click="maskF=true" v-if="vip.province!=''">{{a.prov}} {{a.city}} {{a.county}}</p>
        <i class="iconfont iconfanhui1"></i>
      </div>
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>详细地址
        </span>
        <input type="text" v-model="vip.address" @blur="getOk">
      </div>
      <div class="form-item photos">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>上传照片
        </span>
        <div class="title">
          <div class="item">
            <p>我的照片</p>
            <div class="img" @click="chooseImg">
              <i class="iconfont iconaddTodo-nav" @click.stop="chooseImg" v-if="imgSrc==''"></i>
              <img :src="imgSrc" width="100%" height="100%" alt class="img">
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                ref="file"
                @change="previewFile2($event)"
              >
            </div>
            <p class="p">请上传一寸免冠照片</p>
          </div>
          <div class="item">
            <p>照片示范</p>
            <img src="../.././img/vip.png" alt>
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>联系电话
        </span>
        <input type="text" readonly v-model="phone">
      </div>
      <div class="form-item">
        <span class="name">
          <i class="iconfont iconbitianxinghao"></i>入会须知
        </span>
        <p class="info" @click="openI">《国家海洋博物馆普通会员管理办法》</p>
      </div>
    </div>
    <p class="infos">
      <i v-if="!read" class="iconfont iconcheck_box" @click.stop="read=!read"></i>
      <i v-if="read" class="iconfont iconcheckbox" @click.stop="read=!read"></i> 我已阅读并同意以上条款与意见
    </p>
    <div class="btns" :class="{'active':okF&&read}" @click="registerVip">{{status==1?'确定修改':'确认注册'}}</div>
    <!-- 选择省市区 -->
    <mt-popup
      v-model="maskF"
      position="bottom"
      popup-transition="popup-fade"
      closeOnClickModal="true"
    >
      <mt-picker
        :slots="slots"
        @change="onMyAddressChange"
        valueKey="region_name"
        style="width:375px"
        showToolbar
        ref="pickCom"
      >
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="cancel">取消</div>
          <div class="usi-btn-sure" @click="maskF = !maskF">确定</div>
        </div>
      </mt-picker>
    </mt-popup>

    <!-- 性别选择框 -->
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade"
      closeOnClickModal="true"
    >
      <mt-picker :slots="sexs" @change="SexChange" valueKey="name" style="width:375px" showToolbar>
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>

          <div class="usi-btn-sure" @click="popupVisible = !popupVisible">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <!-- 学历选择框 -->
    <mt-popup
      v-model="eduF"
      position="bottom"
      popup-transition="popup-fade"
      closeOnClickModal="true"
    >
      <mt-picker :slots="euds" @change="eduChange" valueKey="name" style="width:375px" showToolbar>
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="eduF = !eduF">取消</div>

          <div class="usi-btn-sure" @click="eduF = !eduF">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <div class="mask" v-if="infoF">
      <div class="content">
        <i class="iconfont iconx" @click="infoF=false"></i>
        <h3>国家海洋博物馆网络会员管理办法</h3>
        <div class="content-main" v-html="infos"></div>
        <div class="btn" @click="readInfo">确定并继续</div>
      </div>
    </div>
  </div>
</template>
<script>
import checkId from "../../bin/common.js";
import axios from "axios";
import { Picker, Toast, Popup } from "mint-ui";
export default {
  name: "home",
  data() {
    return {
      infoF: false,
      popupVisible: false,
      eduF: false,
      okF: false,
      imgSrc: "",
      a: {
        prov: "",
        city: "",
        county: ""
      },
      eduName: "",
      read: false,
      myaddress: [],
      sexs: [
        {
          flex: 1,
          values: [
            { name: "请选择性别", value: 0 },
            { name: "男", value: 1 },
            { name: "女", value: 2 }
          ],
          className: "slot1",
          textAlign: "center"
        }
      ],
      euds: [
        {
          flex: 1,
          values: [
            { name: "请选择", value: "" },
            { name: "小学", value: 1 },
            { name: "初中", value: 2 },
            {
              name: "高中",
              value: 3
            },
            {
              name: "专科",
              value: 4
            },
            {
              name: "本科",
              value: 5
            },
            {
              name: "硕士",
              value: 6
            },
            {
              name: "博士及以上",
              value: 7
            }
          ],
          className: "slot1",
          textAlign: "center"
        }
      ],
      region: [],
      city: [],
      county: [],
      vip: {
        username: "",
        sex: "",
        nation: "",
        portrait: "",
        province: "",
        id_card: "",
        address: "",
        city: "",
        county: "",
        edu: ""
      },
      selectF: false,
      status: "",
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "left"
        }
      ],
      phone: "",
      infos: "",
      maskF: false,
      values: []
    };
  },
  component: {
    "mt-picker": Picker,
    Popup
  },
  watch: {
    read: function(val) {
      this.getOk();
    },
    vip: {
      handler(val, oldVal) {
        console.log(33);
        this.getOk();
      },
      deep: true
    }
  },
  methods: {
    SexChange(picker, values) {
      if (values[0].value !== 0) {
        this.vip.sex = values[0].value;
      }
    },
    eduChange(picker, values) {
      if (values[0].value !== 0) {
        this.vip.edu = values[0].value;
        this.eduName = values[0].name;
      }
    },
    readInfo() {
      this.infoF = false;
      this.read = true;
    },
    chooseImg() {
      this.$refs.file.click();
    },
    getOk() {
      if (
        this.vip.username != "" &&
        this.vip.id_card != "" &&
        this.vip.sex != "" &&
        this.vip.province != "" &&
        this.vip.city != "" &&
        this.vip.county != "" &&
        this.vip.edu != "" &&
        this.vip.portrait != "" &&
        this.vip.nation != "" &&
        this.vip.address != "" &&
        checkId.checkIdcard(this.vip.id_card).status
      ) {
        this.okF = true;
      } else {
        this.okF = false;
      }
    },
    previewFile2(e) {
      let v = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].size > 5000000) {
        Toast("上传图片大小应小于5M");
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = e => {
        v.imgSrc = e.target.result;
      };
      let formData = new FormData();
      formData.append("p", "w");
      formData.append("api_token", localStorage.app_token);
      formData.append("img", files[0]);
      axios.post(STATIC_WEB_URL + "/api/member/upload", formData).then(res => {
        if (res.data.status == 1) {
          v.vip.portrait = res.data.data;
          v.getOk();
        } else {
          Toast(res.msg);
          v.imgSrc = "";
          v.vip.portrait = "";
          Toast("请重新上传图片");
        }
      });
    },
    registerVip() {
      if (this.vip.username == "") {
        Toast("请填写姓名");
        return false;
      }
      if (this.vip.sex == "") {
        Toast("请选择性别");
        return false;
      }
      if (this.vip.id_card == "") {
        Toast("请填写身份证号码");
        return false;
      }
      if (!checkId.checkIdcard(this.vip.id_card).status) {
        Toast("请填写正确的身份证号");
        return false;
      }
      if (this.vip.nation == "") {
        Toast("请填写民族");
        return false;
      }
      if (this.vip.edu == "") {
        Toast("请选择学历");
        return false;
      }
      if (this.vip.province == "") {
        Toast("请选择居住地");
        return false;
      }
      if (this.vip.address == "") {
        Toast("请填写详细地址");
        return false;
      }
      if (this.imgSrc == "") {
        Toast("请上传会员头像");
        return false;
      }
      if (this.vip.portrait == "") {
        Toast("请等待上传会员头像完成再提交");
        return false;
      }
      if (this.read == false) {
        Toast("请勾选会员条款");
        return false;
      }
      this.$api
        .registerRemeber(
          this.vip.username,
          this.vip.sex,
          this.vip.portrait,
          this.vip.nation,
          this.vip.edu,
          this.vip.id_card,
          this.vip.province,
          this.vip.city,
          this.vip.county,
          this.vip.address
        )
        .then(res => {
          if (res.status == 1) {
            this.$router.push("/vipC");
          } else {
            Toast(res.msg);
          }
        });
    },
    cancel() {
      this.a = {
        prov: "",
        city: "",
        county: ""
      };
      this.vip.province = "";
      this.vip.address = "";
      this.vip.city = "";
      this.vip.county = "";
      this.maskF = false;
    },
    sureMap() {
      this.popupVisible = false;
      // 获取变换后的城市数据
      var valueArr = this.$refs.pickCom.getValues();
      this.oldSlots = valueArr.concat();
      this.oldCityList = this.$refs.pickCom.getSlotValues(2);
      this.oldQuList = this.$refs.pickCom.getSlotValues(4);
    },
    cancelI() {
      this.read = false;
    },
    onMyAddressChange(picker, values) {
      if (values[0]) {
        this.city = values[0].child;
        picker.setSlotValues(1, this.city);
        picker.setSlotValues(2, this.city[0].child);
        this.a.prov = values[0].region_name;
        this.a.city = values[1].region_name;
        this.a.county = values[2].region_name;
        this.vip.province = values[0].region_id;
        this.vip.city = values[1].region_id;
        this.vip.county = values[2].region_id;
        this.values = values;
      }
    },
    getCity(arr) {
      for (let m = 0; m < arr.length; m++) {
        this.city.push(arr[m].region_name);
      }
    },
    getCounty(arr) {
      for (let n = 0; n < arr.length; n++) {
        this.county.push(arr[n].region_name);
      }
    },
    getR() {
      this.$api.getRegion().then(res => {
        this.region = res.data;
        this.status = this.$route.query.status;
        if (this.status == 1) {
          this.getVipI();
        }

        this.myaddress = res.data;

        this.city = this.region[0].child;

        this.county = this.city[0].child;
        this.slots = [
          {
            flex: 1,
            values: this.myaddress,
            className: "slot1",
            textAlign: "center"
          },
          {
            divider: true,
            content: "",
            className: "slot2"
          },
          {
            flex: 1,
            values: this.city,
            className: "slot3",
            textAlign: "center"
          },
          {
            divider: true,
            content: "",
            className: "slot4"
          },
          {
            flex: 1,
            values: this.county,
            className: "slot5",
            textAlign: "center"
          }
        ];
      });
    },
    openI() {
      this.$api.getVipInfo().then(res => {
        this.infos = res.data.content;
        this.infoF = true;
      });
    },
    getInfo() {
      this.$api.getUser().then(res => {
        this.phone = res.data.phone;
      });
    },
    getVipI() {
      this.$api.getVipI().then(res => {
        this.vip.sex = res.data.sex;
        this.vip.username = res.data.real_name;
        this.vip.id_card = res.data.id_card;
        this.vip.nation = res.data.nation;
        this.vip.address = res.data.address;
        this.vip.edu = res.data.edu;
        this.vip.portrait = res.data.portrait;
        this.imgSrc = res.data.portrait;
        for (let i = 0; i < this.region.length; i++) {
          if (res.data.province == this.region[i].region_id) {
            this.a.prov = this.region[i].region_name;
            this.vip.province = res.data.province;
            var citys = this.region[i].child;
            for (let m = 0; m < citys.length; m++) {
              if (res.data.city == citys[m].region_id) {
                this.a.city = citys[m].region_name;
                this.vip.city = citys[m].region_id;
                var countys = citys[m].child;
                for (let n = 0; n < countys.length; n++) {
                  if (res.data.town == countys[n].region_id) {
                    this.a.county = countys[n].region_name;
                    this.vip.county = res.data.town;
                  }
                }
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    this.getR();
    this.getInfo();
  }
};
</script>
<style  scoped lang="scss">
.vip {
  padding-bottom: 20px;
}
.vip-wrapper {
  padding: 30px 0;
  box-shadow: 0px 6px 16px 0px rgba(213, 130, 32, 0.24);
  border-radius: 10px;
}
h4 {
  font-size: 17px;
  color: #353535;
  margin: 18px 20px;
}

.btns {
  width: 80%;
  margin: 0 auto;
  height: 47.5px;
  line-height: 47.5px;
  background: #cecece;
  border-radius: 47.5px;
  color: #fff;
  text-align: center;
  font-size: 18px;
}
.btns.active {
  background: rgba(204, 151, 76, 1);
}
.form {
  background: rgba(181, 181, 181, 0.18);
}
.form-item {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  background: #fff;
}
.form-item .name {
  width: 100px;
  display: inline-block;
  font-size: 14px;
  color: #000;
  text-align: left;
  white-space: nowrap;
}
input[type="file"] {
  opacity: 0;
}
.name i {
  color: #e32a2a;
  display: inline-block;
  font-size: 12px;
  margin-right: 4px;
}
.form-item input,
.form-item select,
.form-item p {
  flex: 1;
  border: 0 none;
  outline: 0 none;
}
.iconfanhui1 {
  float: right;
}
.form-item input :focus,
.form-item select:focus {
  outline: 0 none;
}
.photos {
  margin-top: 10px;
  height: auto;
  display: block;
}
.title {
  overflow: hidden;
}
.photos .item {
  float: left;
  margin-right: 10px;
}
.photos .item:last-child {
  margin-right: 0;
}
.img {
  width: 85px;
  height: 116.5px;
  background: #dadada;
  position: relative;
}
.item i {
  position: absolute;
  height: 60px;
  width: 60px;
  display: block;
  line-height: 60px;
  top: 50%;
  left: 50%;
  margin-top: -30px;
  margin-left: -30px;
  font-size: 60px;
  color: #fff;
  z-index: 3;
}
.item .p {
  text-align: center;
  font-size: 12px;
}
.item img {
  width: 197px;
  height: auto;
  display: block;
}
.item .img {
  width: 85px;
  height: 116.5px;
}
.picker-toolbar-title {
  overflow: hidden;
  height: 100%;
  line-height: 100%;
  padding: 0 12px;
  /* px */
  .usi-btn-cancel {
    float: left;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
  .usi-btn-sure {
    float: right;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    color: #cc974c;
  }
}
.mask {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
}
.mask-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
}
.mask .top {
  height: 60px;
  line-height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 14px;
  background: #fff;
  z-index: 1000;
}
.info {
  white-space: nowrap;
  color: #cc974c;
  text-decoration: underline;
}
.infos {
  margin: 20px;
  text-align: center;
}
.cancel {
  float: left;
  display: block;
  margin-left: 30px;
}
.ok {
  float: right;
  display: block;
  margin-right: 30px;
  color: #cc974c;
}
.content {
  width: 84%;
  height: 457px;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -228.5px;
  margin-left: -42%;
  background: #fff;
  font-size: 12px;
  color: #000;
}
.content-main {
  height: 340px;
  margin: 10px auto;
  overflow: auto;
}
.content h3 {
  text-align: center;
}
.content-main /deep/ p {
  font-size: 12px;
  color: #000;
  line-height: 20px;
}
.btn {
  width: 200px;
  height: 37.5px;
  margin: 0 auto;
  line-height: 37.5px;
  background: rgba(189, 140, 71, 1);
  border-radius: 18.5px;
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.iconx {
  position: absolute;
  top: -20px;
  right: -20px;
  font-size: 20px;
  color: #fff;
}
</style>
