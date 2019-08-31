<template>
	<div class="vol-base-info">
		<div class="item-info">
			<p>
				<span>*</span>姓名
			</p>
			<input type="text" placeholder="请填写姓名" v-model="myInfo.name">
		</div>
		<div class="item-info" @click="sheetSex = true">
			<p>
				<span>*</span>性别
			</p>
			<div class="item-text">{{sexText}}</div>
			<img src="../../img/active/active_rt.png">
		</div>
		<div class="item-info">
			<p>
				<span>*</span>身份证号
			</p>
			<input type="text" placeholder="请填写身份证号码" v-model="myInfo.cardid" @blur="verify">
		</div>
		<div class="item-info" @click="getNationList()">
			<p>
				<span>*</span>民族
			</p>
			<div class="item-text">{{nationText}}</div>
			<img src="../../img/active/active_rt.png">
		</div>
		<div class="item-info" @click="openPicker(1)">
			<p>
				<span>*</span>出生年月
			</p>
			<input type="text" readonly="readonly" placeholder="请选择" v-model="myInfo.birthday">
		</div>
		<div class="item-info" @click="getPoliticianList()">
			<p>
				<span>*</span>政治面貌
			</p>
			<div class="item-text">{{politicianText}}</div>
			<img src="../../img/active/active_rt.png">
		</div>
		<div class="item-info">
			<p>
				<span>*</span>籍贯
			</p>
			<input type="text" placeholder="请填写籍贯信息" v-model="myInfo.native">
		</div>
		<div class="item-info" @click="getEducationList()">
			<p>
				<span>*</span>学历
			</p>
			<div class="item-text">{{educationText}}</div>
			<img src="../../img/active/active_rt.png">
		</div>
		<div class="item-info">
			<p>
				<span>*</span>身高
			</p>
			<input type="text" placeholder="请填写身高（cm）" v-model="myInfo.height">
		</div>
		<div class="item-info" style="margin-bottom: 10px;" @click="sheetMarry = true">
			<p>
				<span>*</span>婚否
			</p>
			<div class="item-text">{{marryText}}</div>
			<img src="../../img/active/active_rt.png">
		</div>
		<div class="item-info" @click="openPicker(2)">
			<p>
				<span>*</span>毕业时间
			</p>
			<div class="item-text">{{graduationDateText}}</div>
			<img src="../../img/active/active_rt.png">
		</div>
		<div class="item-info item-special">
			<p>
				<span>*</span>毕业院校（系）专业
			</p>
			<input type="text" placeholder="请填写毕业院校（系）专业" v-model="myInfo.professional">
		</div>
		<div class="item-info item-special">
			<p>
				<span>*</span>工作单位
			</p>
			<input type="text" placeholder="请填写工作单位地址" v-model="myInfo.workunit">
		</div>
		<div class="item-info item-special">
			<p>
				<span>*</span>家庭住址
			</p>
			<input type="text" placeholder="请填写详细家庭住址" v-model="myInfo.address">
		</div>
		<div class="item-info">
			<p>
				<span>*</span>邮编
			</p>
			<input type="text" placeholder="请填写邮政编码" v-model="myInfo.zip_code">
		</div>
		<div class="submit-btn" @click="save()">保存</div>
		<mt-actionsheet :actions="sexList" v-model="sheetSex" cancelText></mt-actionsheet>
		<mt-actionsheet :actions="marryList" v-model="sheetMarry" cancelText></mt-actionsheet>
		<mt-popup v-model="pickerNation" position="bottom" v-if="pickerNation">
			<div class="operation-btn">
				<span style="float: right;color: #CC974C;" @click="selNation">确定</span>
				<span style="float: left;" @click="pickerNation = false">取消</span>
			</div>
			<div class="select-type">
				<mt-spinner :type="0" v-if="nationList[0].values.length == 0"></mt-spinner>
				<mt-picker :slots="nationList" v-if="nationList[0].values.length > 0" @change="nationChange"></mt-picker>
			</div>
		</mt-popup>
		<mt-popup v-model="pickerPolitician" position="bottom" v-if="pickerPolitician">
			<div class="operation-btn">
				<span style="float: right;color: #CC974C;" @click="selPolitician">确定</span>
				<span style="float: left;" @click="pickerPolitician = false">取消</span>
			</div>
			<div class="select-type">
				<mt-spinner :type="0" v-if="politicianList[0].values.length == 0"></mt-spinner>
				<mt-picker :slots="politicianList" @change="politicianChange" v-if="politicianList[0].values.length > 0"></mt-picker>
			</div>
		</mt-popup>
		<!--学历-->
		<mt-popup v-model="pickerEducation" position="bottom" v-if="pickerEducation">
			<div class="operation-btn">
				<span style="float: right;color: #CC974C;" @click="selEducation">确定</span>
				<span style="float: left;" @click="pickerEducation = false">取消</span>
			</div>
			<div class="select-type">
				<mt-spinner :type="0" v-if="educationList[0].values.length == 0"></mt-spinner>
				<mt-picker :slots="educationList" v-if="educationList[0].values.length > 0" @change="educationChange"></mt-picker>
			</div>
		</mt-popup>
		<!--毕业时间-->
		<mt-datetime-picker v-model="nowDate" ref="picker" type="date" @confirm="graduationDate" :startDate="startDate" :endDate="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
	</div>
</template>

<script>
	import checkId from "../../bin/common.js";
	import { Actionsheet, Picker, DatetimePicker, Toast, Spinner } from "mint-ui";
	export default {
		data() {
			const v = this;
			return {
				nowDate: "",
				pickerVal: "", //1为出生年月，2为毕业时间
				sexText: "请选择", //性别文案
				marryText: "请选择", //婚否文案
				nationText: "请选择", //民族文案
				politicianText: "请选择", //政治面貌文案
				educationText: "请选择", //学历
				graduationDateText: "请选择", //毕业时间
				birthdayText: "请选择", //出生年月文案
				myInfo: {
					name: "", //姓名
					cardid: "", //证件号码
					birthday: "", //出生年月
					native: "", //籍贯
					height: "", //身高
					professional: "", //毕业院校系专业
					workunit: "", //工作单位
					address: "", //住址
					zip_code: "", //邮编
					sex: "", //性别 1男 2女
					is_marry: "", //1已婚 2未婚
					nation: "", //民族
					politician: "", //政治面貌
					education: "", //学历
					graduation_date: "" //毕业时间
				},
				sheetSex: false,
				sheetMarry: false,
				sexList: [{
						name: "男",
						method: function(val) {
							v.sexText = val.name;
							v.myInfo.sex = 1;
						}
					},
					{
						name: "女",
						method: function(val) {
							v.sexText = val.name;
							v.myInfo.sex = 2;
						}
					}
				],
				marryList: [{
						name: "已婚",
						method: function(val) {
							v.marryText = val.name;
							v.myInfo.is_marry = 1;
						}
					},
					{
						name: "未婚",
						method: function(val) {
							v.marryText = val.name;
							v.myInfo.is_marry = 2;
						}
					}
				],
				pickerNation: false,
				nationList: [{
					defaultIndex: 0,
					flex: 1,
					values: [],
					className: "slot1",
					textAlign: "center"
				}],
				pickerPolitician: false,
				politicianList: [{
					defaultIndex: 0,
					flex: 1,
					values: [],
					className: "slot1",
					textAlign: "center"
				}],
				pickerEducation: false,
				educationList: [{
					defaultIndex: 0,
					flex: 1,
					values: [],
					className: "slot1",
					textAlign: "center"
				}],
				nationChangeText: "", //民族选择临时文案存储
				politicianChangeText: "", //政治面貌临时文案存储
				educationChangeText: "", //学历临时文案存储
				startDate: new Date("1950-01-01"),
				endDate: new Date()
			};
		},
		mounted() {
			const v = this;
			v.nowDate = v.getOneDayDate();
			v.myInfo.name = localStorage.vol_name ? localStorage.vol_name : "";
			v.myInfo.cardid = localStorage.vol_cardid ? localStorage.vol_cardid : "";
			v.myInfo.birthday = localStorage.vol_birthday ?
				localStorage.vol_birthday :
				"";
			v.birthdayText = localStorage.vol_birthday ?
				localStorage.vol_birthday :
				"请选择";
			v.myInfo.native = localStorage.vol_native ? localStorage.vol_native : "";
			v.myInfo.height = localStorage.vol_height ? localStorage.vol_height : "";
			v.myInfo.professional = localStorage.vol_professional ?
				localStorage.vol_professional :
				"";
			v.myInfo.workunit = localStorage.vol_workunit ?
				localStorage.vol_workunit :
				"";
			v.myInfo.address = localStorage.vol_address ? localStorage.vol_address : "";
			v.myInfo.zip_code = localStorage.vol_zip_code ?
				localStorage.vol_zip_code :
				"";
			v.myInfo.sex = localStorage.vol_sex ? localStorage.vol_sex : "";
			if(v.myInfo.sex == 1) {
				v.sexText = "男";
			} else if(v.myInfo.sex == 2) {
				v.sexText = "女";
			}
			v.myInfo.is_marry = localStorage.vol_is_marry ?
				localStorage.vol_is_marry :
				"";
			if(v.myInfo.is_marry == 1) {
				v.marryText = "已婚";
			} else if(v.myInfo.is_marry == 2) {
				v.marryText = "未婚";
			}
			v.myInfo.nation = localStorage.vol_nation ? localStorage.vol_nation : "";
			v.nationText = localStorage.vol_nation ? localStorage.vol_nation : "请选择";
			v.myInfo.politician = localStorage.vol_politician ?
				localStorage.vol_politician :
				"";
			v.politicianText = localStorage.vol_politician ?
				localStorage.vol_politician :
				"请选择";
			v.myInfo.education = localStorage.vol_education ?
				localStorage.vol_education :
				"";
			v.educationText = localStorage.vol_education ?
				localStorage.vol_education :
				"请选择";
			v.myInfo.graduation_date = localStorage.vol_graduation_date ?
				localStorage.vol_graduation_date :
				"";
			v.graduationDateText = localStorage.vol_graduation_date ?
				localStorage.vol_graduation_date :
				"请选择";
		},
		methods: {
			getOneDayDate() {
				var mydate = new Date();
				var y = mydate.getFullYear();
				var m = mydate.getMonth() + 1; //获取当前月份的日期
				if(m < 10) {
					m = "0" + m;
				}
				var d = mydate.getDate();
				if(d < 10) {
					d = "0" + d;
				}
				return y + "-" + m + "-" + d;
			},
			verify() {
				if(this.myInfo.cardid.replace(/\ +/g, "").replace(/[\r\n]/g, "") == "") {
					Toast("身份证号不能为空");
				} else if(!checkId.checkIdcard(this.myInfo.cardid).status) {
					Toast("身份证号格式错误");
				} else if(checkId.analyzeIDCard(this.myInfo.cardid) < 18) {
					Toast("您的年龄不符合注册要求");
				}
			},
			nationChange(picker, values) {
				this.nationChangeText = values[0];
			},
			selNation() {
				this.pickerNation = false;
				if(this.nationChangeText != undefined) {
					this.myInfo.nation = this.nationChangeText;
					this.nationText = this.nationChangeText;
				}
			},
			politicianChange(picker, values) {
				this.politicianChangeText = values[0];
			},
			selPolitician() {
				this.pickerPolitician = false;
				if(this.politicianChangeText != undefined) {
					this.myInfo.politician = this.politicianChangeText;
					this.politicianText = this.politicianChangeText;
				}
			},
			educationChange(picker, values) {
				this.educationChangeText = values[0];
			},
			selEducation() {
				this.pickerEducation = false;
				if(this.educationChangeText != undefined) {
					this.myInfo.education = this.educationChangeText;
					this.educationText = this.educationChangeText;
				}
			},
			getNationList() {
				this.pickerNation = true;
				this.$api.wxNationList().then(res => {
					this.nationList[0].values = res.data;
				});
			},
			getPoliticianList() {
				this.pickerPolitician = true;
				this.$api.wxPoliticsStatus().then(res => {
					this.politicianList[0].values = res.data;
				});
			},
			getEducationList() {
				const v = this;
				v.pickerEducation = true;
				v.$api.wxEducationList().then(res => {
					v.educationList[0].values = res.data;
				});
			},
			openPicker(val) {
				const v = this;
				if(val == 2) {
					v.endDate = new Date('2030-12-31')
				} else {
					v.endDate = new Date()
				}
				v.pickerVal = val;
				v.$refs.picker.open();
			},
			graduationDate(val) {
				const v = this;
				v.nowDate = v.getOneDayDate();
				let mydate = v.$moment(val).format("YYYY-MM-DD");
				if(v.pickerVal == 1) {
					v.birthdayText = mydate;
					v.myInfo.birthday = mydate;
				} else if(v.pickerVal == 2) {
					v.myInfo.graduation_date = mydate;
					v.graduationDateText = mydate;
				}
			},
			save() {
				const v = this;
				if(v.myInfo.name == "") {
					Toast("请填写您的姓名");
				} else if(v.myInfo.sex == "") {
					Toast("请选择性别");
				} else if(
					v.myInfo.cardid.replace(/\ +/g, "").replace(/[\r\n]/g, "") == ""
				) {
					Toast("请填写您的身份证号");
				} else if(!checkId.checkIdcard(v.myInfo.cardid).status) {
					Toast("身份证号格式错误");
				} else if(checkId.analyzeIDCard(v.myInfo.cardid) < 18) {
					Toast("您的年龄不符合注册要求");
				} else if(v.myInfo.nation == "") {
					Toast("请选择民族");
				} else if(v.myInfo.birthday == "") {
					Toast("请选择出生年月");
				} else if(v.myInfo.politician == "") {
					Toast("请选择政治面貌");
				} else if(v.myInfo.native == "") {
					Toast("请填写籍贯");
				} else if(v.myInfo.education == "") {
					Toast("请选择学历");
				} else if(v.myInfo.height == "") {
					Toast("请填写您的身高");
				} else if(v.myInfo.is_marry == "") {
					Toast("请选择婚否");
				} else if(v.myInfo.graduation_date == "") {
					Toast("请选择毕业时间");
				} else if(v.myInfo.professional == "") {
					Toast("请填写您的毕业院校系专业");
				} else if(v.myInfo.workunit == "") {
					Toast("请填写您的工作单位");
				} else if(v.myInfo.address == "") {
					Toast("您填写住址");
				} else if(v.myInfo.zip_code == "") {
					Toast("请填写邮编");
				} else {
					localStorage.vol_name = v.myInfo.name;
					localStorage.vol_cardid = v.myInfo.cardid;
					localStorage.vol_birthday = v.myInfo.birthday;
					localStorage.vol_native = v.myInfo.native;
					localStorage.vol_height = v.myInfo.height;
					localStorage.vol_professional = v.myInfo.professional;
					localStorage.vol_workunit = v.myInfo.workunit;
					localStorage.vol_address = v.myInfo.address;
					localStorage.vol_zip_code = v.myInfo.zip_code;
					localStorage.vol_sex = v.myInfo.sex;
					localStorage.vol_is_marry = v.myInfo.is_marry;
					localStorage.vol_nation = v.myInfo.nation;
					localStorage.vol_politician = v.myInfo.politician;
					localStorage.vol_education = v.myInfo.education;
					localStorage.vol_graduation_date = v.myInfo.graduation_date;
					localStorage.vol_base_info = 1;
					let instance = Toast("保存成功");
					setTimeout(function() {
						instance.close();
						v.$router.go(-1)
					}, 500);
				}
			}
		}
	};
</script>

<style scoped>
	/deep/ .mint-spinner-snake {
		margin: 100px auto;
	}
	
	/deep/ .picker-toolbar {
		height: 45px;
		background: #f1f1f1;
	}
	
	/deep/ .mint-datetime-action {
		line-height: 45px;
		text-align: left;
		padding-left: 20px;
		font-size: 18px;
	}
	
	/deep/ .mint-datetime-cancel {
		color: rgba(0, 0, 0, 0.6);
	}
	
	/deep/ .mint-datetime-confirm {
		color: #cc974c;
		text-align: right;
		padding-right: 20px;
	}
	
	::-webkit-input-placeholder {
		/* WebKit, Blink, Edge */
		color: #b0b0b0;
	}
	
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #b0b0b0;
	}
	
	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #b0b0b0;
	}
	
	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #b0b0b0;
	}
	
	.vol-base-info {
		background: #f2f2f2;
		overflow: hidden;
	}
	
	.item-info {
		width: 375px;
		height: 51px;
		margin: 0 auto;
		padding: 0 20px;
		border-bottom: 1px solid #f5f5f5;
		background: #fff;
	}
	
	.item-info p {
		width: 110px;
		height: 50px;
		line-height: 50px;
		float: left;
		font-size: 14px;
		color: #353535;
	}
	
	.item-info p span {
		color: #e32a2a;
	}
	
	.item-info input {
		width: 225px;
		float: left;
		border: 0;
		height: 49px;
		outline: none;
		background: #fff;
	}
	
	.item-special {
		height: 81px;
	}
	
	.item-special p,
	.item-special input {
		float: none;
		height: 40px;
		line-height: 40px;
		width: auto;
	}
	
	.item-special input {
		width: 335px;
		padding-left: 10px;
	}
	
	.item-info .item-text {
		font-size: 14px;
		color: #b0b0b0;
		line-height: 50px;
		float: left;
	}
	
	.item-info img {
		float: right;
		display: block;
		width: 8px;
		margin-top: 17px;
	}
	
	.submit-btn {
		width: 350px;
		height: 48px;
		border-radius: 24px;
		margin: 20px auto;
		background: #bd8c47;
		color: #fff;
		font-size: 18px;
		line-height: 48px;
		text-align: center;
	}
	
	.select-type {
		width: 375px;
	}
	
	.operation-btn {
		width: 375px;
		height: 45px;
		background: #f1f1f1;
		padding: 0 20px;
		font-size: 18px;
		line-height: 45px;
		color: rgba(0, 0, 0, 0.6);
	}
</style>