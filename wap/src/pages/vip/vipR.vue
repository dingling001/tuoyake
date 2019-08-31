<template>
  <div class="vip">
    <div class="form">
      <img :src="portrait" alt class="portrait">
      <div class="form-item">
        <span class="name">姓名</span>
        {{username}}
      </div>
      <div class="form-item">
        <span class="name">性别</span>
        <span v-if="sex!=''">{{sex==1?'男':"女"}}</span>
      </div>
      <div class="form-item">
        <span class="name">民族</span>
        {{nation}}
      </div>
      <div class="form-item">
        <span class="name">联系电话</span>
        {{phone}}
      </div>
      <div class="form-item">
        <span class="name">身份证号</span>
        {{id_card}}
      </div>
      <div class="form2">
        <div class="form-item">
          <span class="name">
            <i class="iconfont iconbitianxinghao"></i>学历
          </span>
          <select v-model="edu" placeholder="请选择">
            <option value>请选择</option>
            <option value="1">小学</option>
            <option value="2">初中</option>
            <option value="3">高中</option>
            <option value="4">专科</option>
            <option value="5">本科</option>
            <option value="6">硕士</option>
            <option value="7">博士及以上</option>
          </select>
        </div>
        <div class="form-item">
          <span class="name">
            <i class="iconfont iconbitianxinghao"></i>居住地区
          </span>
          <p @click="maskF=true" v-if="province==''">请选择</p>
          <p @click="maskF=true" v-if="province!=''">{{a.prov}} {{a.city}} {{a.county}}</p>
          <i class="iconfont iconfanhui1"></i>
        </div>
        <div class="form-item">
          <span class="name">
            <i class="iconfont iconbitianxinghao"></i>详细地址
          </span>
          <input type="text" v-model="address">
        </div>
      </div>
    </div>

    <div class="btns" @click="registerVip">确认修改</div>
    <div class="mask" v-if="maskF">
      <div class="mask-container">
        <div class="top">
          <span class="cancel" @click="cancel">取消</span>
          <span class="ok" @click="maskF=!maskF">确定</span>
        </div>
        <mt-picker :slots="slots" @change="onMyAddressChange"></mt-picker>
      </div>
    </div>
  </div>
</template>
<script>
import { Picker, Toast } from "mint-ui";
export default {
  name: "vipR",
  data() {
    return {
      imgSrc: "",
      a: {
        prov: "",
        city: "",
        county: ""
      },
      read: false,
      myaddress: [],
      region: [],
      citys: [],
      countys: [],
      username: "",
      sex: "",
      nation: "",
      portrait: "",
      province: "",
      id_card: "",
      address: "",
      city: "",
      county: "",
      edu: "",
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
      maskF: false
    };
  },
  component: {
    "mt-picker": Picker
  },
  watch: {
    read: function(val) {
      this.getOk();
    }
  },
  methods: {
    readInfo() {
      this.infoF = false;
    },
    registerVip() {
      if (this.edu == "") {
        Toast("请选择学历");
        return false;
      }
      if (this.province == "") {
        Toast("请选择居住地");
        return false;
      }
      if (this.address == "") {
        Toast("请填写详细地址");
        return false;
      }

      this.$api
        .registerRemeber(
          this.username,
          this.sex,
          this.portrait,
          this.nation,
          this.edu,
          this.id_card,
          this.province,
          this.city,
          this.county,
          this.address
        )
        .then(res => {
          if (res.status == 1) {
            Toast("修改成功");
            setTimeout(() => {
              this.$router.push("/center");
            }, 800);
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
      this.province = "";
      this.address = "";
      this.city = "";
      this.county = "";
      this.maskF = false;
    },
    onMyAddressChange(picker, values) {
      for (let i = 0; i < this.myaddress.length; i++) {
        if (values[0] == this.myaddress[i]) {
          this.citys = [];
          this.a.prov = this.region[i].region_name;
          this.province = this.region[i].region_id;
          this.getCitys(this.region[i].child);
          picker.setSlotValues(1, this.citys);

          for (let m = 0; m < this.citys.length; m++) {
            if (values[1] == this.citys[m]) {
              this.a.city = this.region[i].child[m].region_name;
              this.city = this.region[i].child[m].region_id;

              this.countys = [];
              this.getCounty(this.region[i].child[m].child);
              picker.setSlotValues(2, this.countys);
              for (let n = 0; n < this.countys.length; n++) {
                if (values[2] == this.countys[n]) {
                  this.a.county = this.region[i].child[m].child[n].region_name;
                  this.county = this.region[i].child[m].child[n].region_id;
                }
              }
            }
          }
        }
      }
    },
    getCitys(arr) {
      for (let m = 0; m < arr.length; m++) {
        this.citys.push(arr[m].region_name);
      }
    },
    getCounty(arr) {
      for (let n = 0; n < arr.length; n++) {
        this.countys.push(arr[n].region_name);
      }
    },
    getR() {
      this.$api.getRegion().then(res => {
        this.region = res.data;
        this.getVipI();
        for (let i = 0; i < res.data.length; i++) {
          this.myaddress.push(res.data[i].region_name);
        }
        for (let m = 0; m < this.region[0].child.length; m++) {
          this.citys.push(this.region[0].child[m].region_name);
        }

        for (let n = 0; n < this.region[0].child[0].child.length; n++) {
          this.countys.push(this.region[0].child[0].child[n].region_name);
        }
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
            values: this.citys,
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
            values: this.countys,
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
        this.sex = res.data.sex;
        this.username = res.data.real_name;
        this.id_card = res.data.id_card;
        this.nation = res.data.nation;
        this.address = res.data.address;
        this.edu = res.data.edu;
        this.portrait = res.data.portrait;
        for (let i = 0; i < this.region.length; i++) {
          if (res.data.province == this.region[i].region_id) {
            this.a.prov = this.region[i].region_name;
            this.province = res.data.province;
            var citys = this.region[i].child;
            for (let m = 0; m < citys.length; m++) {
              if (res.data.city == citys[m].region_id) {
                this.a.city = citys[m].region_name;
                this.city = citys[m].region_id;
                var countys = citys[m].child;
                for (let n = 0; n < countys.length; n++) {
                  if (res.data.town == countys[n].region_id) {
                    this.a.county = countys[n].region_name;
                    this.county = res.data.town;
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
<style  scoped>
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
  background: rgba(204, 151, 76, 1);
  border-radius: 47.5px;
  color: #fff;
  text-align: center;
  font-size: 18px;
}
.form {
  position: relative;
}
.portrait {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 85px;
  height: 116.5px;
}
.form2 {
  background: rgba(181, 181, 181, 0.18);
  padding: 10px 0;
  margin-bottom: 30px;
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