<template>
	<div>
		<div class="topbar-wrapper">
			<div class="topbar">
				<a href="/">首页</a>
				»
				<a href='/uactive'>个人中心</a>
				» 活动报名
			</div>
		</div>
		<div class="fill-info">
			<div class="info-title">填写报名信息</div>
			<div class="time-info">
				<span style="width: 50px;"></span>
				<span style="width: 5px;margin-left: 5px;"></span>
			</div>
			<div class="step-bar">
				<el-steps :active="2" align-center>
					<el-step class="step1" title="选择参加场次" icon="icon"></el-step>
					<el-step class="step2" title="填写报名信息" icon="icon"></el-step>
					<el-step class="step3" title="确认信息" icon="icon"></el-step>
					<el-step class="step4" title="报名结果" icon="icon"></el-step>
				</el-steps>
			</div>
			<div class="join-frame">
				<div class="dot"></div>
				<p style="float: left;">报名人信息</p>
				<p style="float: right;font-size: 20px;margin-right: 40px;">报名场次 {{selected_time}}</p>
			</div>
			<div class="parent-child visitor-list" v-if="is_type == 2">
				<ul>
					<li>
						<div class="visitor-name info-item">
							<p>家长姓名</p>
							<input type="text" v-model="toi_username[0]" placeholder="请输入姓名">
						</div>
						<div class="id-type info-item">
							<p>证件类型</p>
							<select v-model="toi_cardtype_id[0]" @change="getIdType(0)" class="select_bg">
								<option value="1">身份证</option>
							</select>
						</div>
						<div class="id-number info-item">
							<p>证件号码</p>
							<input type="text" v-model="toi_card_num[0]" placeholder="请输入证件号码">
						</div>
						<div class="visitor-name info-item">
							<p>儿童姓名</p>
							<input type="text" v-model="children_username[0]" placeholder="请输入姓名">
						</div>
						<div class="id-type info-item">
							<p>证件类型</p>
							<select v-model="children_cardtype_id[0]" @change="getIdType(0)" class="select_bg">
								<option value="1">身份证</option>
							</select>
						</div>
						<div class="id-number info-item">
							<p>证件号码</p>
							<input type="text" v-model="children_card_num[0]" placeholder="请输入证件号码">
						</div>
					</li>
				</ul>
			</div>
			<div class="visitor-list" v-if="is_type == 1">
				<ul>
					<li v-for="(item,index) in visitorNum">
						<div class="visitor-name info-item">
							<p>
								姓<span style="color: #fff;">姓名</span>名
							</p>
							<input type="text" v-model="toi_username[index]" placeholder="请输入姓名">
						</div>
						<div class="id-type info-item">
							<p>证件类型</p>
							<select v-model="toi_cardtype_id[index]" @change="getIdType(index)" class="select_bg">
								<option value="1">身份证</option>
							</select>
						</div>
						<div class="id-number info-item">
							<p>证件号码</p>
							<input type="text" v-model="toi_card_num[index]" placeholder="请输入证件号码">
						</div>
						<div class="del-box">
							<input type="button" value="删除" @click="delVisitor(index)">
						</div>
					</li>
				</ul>
			</div>
			<div class="add-box" v-if="is_type == 1">
				<div class="add-visitor" @click="addVisit()">+ 添加参与者</div>
				<div class="add-explain">已添加{{visitorNum}}人，还可添加{{5-visitorNum}}人</div>
			</div>
			<div class="user-verify">
				<div class="info-item">
					<p>手机号码</p>
					<input type="text" v-model="phoneNumber" placeholder="请输入手机号" style="width: 405px;">
				</div>
				<div class="info-item" style="width: 610px;position: relative;" v-if="api_token == ''">
					<p style="padding-left: 17px;">图形验证码</p>
					<input type="text" v-model="imgCode" placeholder="请输入图形验证码" style="width: 405px;">
					<img :src="imgurl" style="position: absolute;top: 4px;right: 85px;">
					<p style="background: #fff;padding: 0;margin-left: 25px;color: #A3A3A3;font-size: 14px;cursor: pointer;" @click="getImgCode()">换一张</p>
				</div>
				<div class="info-item" style="height: 50px;" v-if="api_token == ''">
					<p style="padding-left: 17px;margin-top: 2px;">短信验证码</p>
					<input type="text" v-model="smscode" placeholder="请输入短信验证码" style="width: 261px;margin-top: 2px;">
					<div class="sms-code" @click="getSms()" :class="{forbid_click:forbidClick}">{{smsText}}</div>
				</div>
			</div>
			<div class="total-price" v-if="is_type == 1">
				<span style="color: #353535;font-size: 18px;">总计</span> <span style="color: #E8593E;font-size: 18px;">￥</span><span style="color: #E8593E;font-size: 28px;">{{visitorNum * default_price}}</span>
			</div>
			<div class="total-price" v-if="is_type == 2">
				<span style="color: #353535;font-size: 18px;">总计</span> <span style="color: #E8593E;font-size: 18px;">￥</span><span style="color: #E8593E;font-size: 28px;">{{default_price}}</span>
			</div>
			<div class="btns">
				<input type="button" value="上一步" class="cancel-btn" @click="$router.go(-1)">
				<input type="button" value="下一步" class="next-btn" @click="nextStep()">
			</div>
			<div class="tip">{{tipText}}</div>
		</div>
	</div>
</template>

<script>
	import checkId from "../../bin/common.js";
	import crypto from "crypto";
	export default {
		data() {
			return {
				active_id: '',
				default_price: '',
				is_type: '',
				api_token: "", //用户token
				device_uuid: "", //设备唯一码，MD5加密
				imgurl: "", //图片验证码url
				phoneNumber: "", //用户手机号码
				imgCode: "", //图片验证码
				selected_time: "", //所选时段
				smscode: "", //短信验证码
				tipText: "", //提示文案
				toi_username: [], //姓名数组
				toi_cardtype_id: [], //证件类型数组
				toi_card_num: [], //证件号码数组

				children_username: [], //儿童姓名数组
				children_cardtype_id: [], //儿童证件类型数组
				children_card_num: [], //儿童证件号码数组

				visitorNum: 0, //参观者数量
				num: 60, //短信倒计时
				smsText: "获取验证码", //验证码按钮文案
				forbidClick: false, //短信验证码按钮是否禁点
				adult_age_limit_min: '', //最小成人年龄
				adult_age_limit_max: '', //最大承认年龄
				children_age_limit_min: '', //最小儿童年龄
				children_age_limit_max: '', //最大儿童年龄
			};
		},
		mounted() {
			const v = this;
			v.active_id = localStorage.active_id;
			v.default_price = localStorage.default_price;
			v.is_type = localStorage.is_type;
			v.adult_age_limit_min = localStorage.adult_age_limit_min;
			v.adult_age_limit_max = localStorage.adult_age_limit_max;
			v.visitorNum = localStorage.toi_username ?
				JSON.parse(localStorage.toi_username).length :
				0;
			v.toi_username = localStorage.toi_username ?
				JSON.parse(localStorage.toi_username) : [];
			v.toi_cardtype_id = localStorage.toi_cardtype_id ?
				JSON.parse(localStorage.toi_cardtype_id) : [];
			v.toi_card_num = localStorage.toi_card_num ?
				JSON.parse(localStorage.toi_card_num) : [];

			v.children_username = localStorage.children_username ?
				JSON.parse(localStorage.children_username) : [];
			v.children_cardtype_id = localStorage.children_cardtype_id ?
				JSON.parse(localStorage.children_cardtype_id) : [];
			v.children_card_num = localStorage.children_card_num ?
				JSON.parse(localStorage.children_card_num) : [];

			v.api_token = localStorage.api_token ? localStorage.api_token : "";
			v.phoneNumber = localStorage.contact_phone ? localStorage.contact_phone : '';
			if(v.phoneNumber == '' && v.api_token != '') {
				v.$api.getPhone().then(res => {
					if(res.status == 1) {
						v.phoneNumber = res.data
					}
				})
			}
			if(v.visitorNum == 0 && v.is_type == 1) {
				v.visitorNum = 1;
				v.toi_username[0] = "";
				v.toi_cardtype_id[0] = 1;
				v.toi_card_num[0] = "";
			} else if(v.visitorNum == 0 && v.is_type == 2) {
				v.visitorNum = 1;
				v.toi_username[0] = "";
				v.toi_cardtype_id[0] = 1;
				v.toi_card_num[0] = "";
				v.children_username[0] = '';
				v.children_cardtype_id[0] = 1;
				v.children_card_num[0] = '';
			}
			if(v.is_type == 2) {
				v.children_age_limit_min = localStorage.children_age_limit_min;
				v.children_age_limit_max = localStorage.children_age_limit_max;
			}
			v.selected_time = localStorage.selected_time;
			v.generateUUID();
		},
		methods: {
			getIdType(val) {
				//当证件类型改变时执行
			},
			delVisitor(val) {
				//删除参观者
				const v = this;
				v.visitorNum--;
				v.toi_username.splice(val, 1);
				v.toi_cardtype_id.splice(val, 1);
				v.toi_card_num.splice(val, 1);
				localStorage.toi_username = JSON.stringify(v.toi_username);
				localStorage.toi_cardtype_id = JSON.stringify(v.toi_cardtype_id);
				localStorage.toi_card_num = JSON.stringify(v.toi_card_num);
			},
			addVisit() {
				//添加参观者
				const v = this;
				if(v.visitorNum == 5) {
					v.tipText = "最多能添加5个参观者";
					v.hideText();
					return false;
				}
				v.toi_username[v.visitorNum] = "";
				v.toi_cardtype_id[v.visitorNum] = 1;
				v.toi_card_num[v.visitorNum] = "";
				v.visitorNum++;
			},
			hideText() {
				setTimeout(() => {
					this.tipText = "";
				}, 2000);
			},
			// 生成uuid
			generateUUID() {
				let v = this;
				let md5 = crypto.createHash("md5");
				var d = new Date().getTime();
				var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
					/[xy]/g,
					function(c) {
						var r = (d + Math.random() * 16) % 16 | 0;
						d = Math.floor(d / 16);
						return(c == "x" ? r : (r & 0x3) | 0x8).toString(16);
					}
				);
				md5.update(uuid);
				localStorage.device_uuid = md5.digest("hex");
				v.device_uuid = localStorage.device_uuid;
				v.getImgCode();
			},
			getImgCode() {
				let v = this;
				v.code = "";
				v.imgurl =
					STATIC_PW_URL +
					"/api/cpt/show?p=w&width=110&height=38&device_uuid=" +
					localStorage.device_uuid +
					"&random=" +
					Math.random();
			},
			nextStep() {
				const v = this;
				if(v.visitorNum == 0) {
					v.tipText = "请添加参观者";
					v.hideText();
					return false;
				} else {
					if(v.is_type == 1) {
						for(let i = 0; i < v.visitorNum; i++) {
							if(v.toi_username[i] == "") {
								v.tipText = "第" + (i + 1) + "个参观者姓名不能为空";
								v.hideText();
								return false;
							} else if(v.toi_card_num[i] == "") {
								v.tipText = "第" + (i + 1) + "个参观者证件号码不能为空";
								v.hideText();
								return false;
							} else if(!checkId.checkIdcard(v.toi_card_num[i]).status) {
								v.tipText = "第" + (i + 1) + "个参观者证件号码格式错误";
								v.hideText();
								return false;
							} else if((v.adult_age_limit_min > checkId.analyzeIDCard(v.toi_card_num[i])) || (v.adult_age_limit_max < checkId.analyzeIDCard(v.toi_card_num[i]))) {
								v.tipText = "第" + (i + 1) + "个参观者年龄不符";
								v.hideText();
								return false;
							}
						}
					} else if(v.is_type == 2) {
						if(v.toi_username[0] == "") {
							v.tipText = "家长姓名不能为空";
							v.hideText();
							return false;
						} else if(v.toi_card_num[0] == "") {
							v.tipText = "家长证件号码不能为空";
							v.hideText();
							return false;
						} else if(!checkId.checkIdcard(v.toi_card_num[0]).status) {
							v.tipText = "家长证件号码格式错误";
							v.hideText();
							return false;
						} else if((v.adult_age_limit_min > checkId.analyzeIDCard(v.toi_card_num[0])) || (v.adult_age_limit_max < checkId.analyzeIDCard(v.toi_card_num[0]))) {
							v.tipText = "家长年龄不符";
							v.hideText();
							return false;
						} else if(v.children_username[0] == "") {
							v.tipText = "儿童姓名不能为空";
							v.hideText();
							return false;
						} else if(v.children_card_num[0] == "") {
							v.tipText = "儿童证件号码不能为空";
							v.hideText();
							return false;
						} else if(!checkId.checkIdcard(v.children_card_num[0]).status) {
							v.tipText = "儿童证件号码格式错误";
							v.hideText();
							return false;
						} else if((v.children_age_limit_min > checkId.analyzeIDCard(v.children_card_num[0])) || (v.children_age_limit_max < checkId.analyzeIDCard(v.children_card_num[0]))) {
							v.tipText = "儿童年龄不符";
							v.hideText();
							return false;
						}
					}

					if(v.phoneNumber.replace(/\ +/g, "").replace(/[\r\n]/g, "") == "") {
						v.tipText = "手机号码不能为空";
						v.hideText();
						return false;
					} else if(!/^1\d{10}$/gi.test(v.phoneNumber)) {
						v.tipText = "手机号码格式错误";
						v.hideText();
						return false;
					}
					localStorage.contact_phone = v.phoneNumber;
					localStorage.toi_username = JSON.stringify(v.toi_username);
					localStorage.toi_cardtype_id = JSON.stringify(v.toi_cardtype_id);
					localStorage.toi_card_num = JSON.stringify(v.toi_card_num);

					localStorage.children_username = JSON.stringify(v.children_username);
					localStorage.children_cardtype_id = JSON.stringify(v.children_cardtype_id);
					localStorage.children_card_num = JSON.stringify(v.children_card_num);
				}
				let temp = []; //一个新的临时数组
				for(var i = 0; i < v.toi_card_num.length; i++) {
					if(temp.indexOf(v.toi_card_num[i]) == -1) {
						temp.push(v.toi_card_num[i]);
					}
				}
				if(v.toi_card_num.length != temp.length){
					v.tipText = "证件号码不能重复";
					v.hideText();
					return false;
				}
				if(v.api_token == "") {
					if(v.phoneNumber.replace(/\ +/g, "").replace(/[\r\n]/g, "") == "") {
						v.tipText = "手机号码不能为空";
						v.hideText();
					} else if(!/^1\d{10}$/gi.test(v.phoneNumber)) {
						v.tipText = "手机号码格式错误";
						v.hideText();
					} else if(v.imgCode.replace(/\ +/g, "").replace(/[\r\n]/g, "") == "") {
						v.tipText = "图片验证码不能为空";
						v.hideText();
					} else if(v.smscode == '') {
						v.tipText = "短信验证码不能为空";
						v.hideText();
					} else {
						v.$api.getToken(v.phoneNumber, v.smscode).then(res => {
							if(res.status == 1) {
								localStorage.api_token = res.data.api_token;
								localStorage.nickname = res.data.nickname;
								localStorage.phone = res.data.phone;
								window.location.replace('/active/confirmorder')
							} else {
								v.tipText = res.msg;
								v.hideText();
							}
						})
					}
				} else {
					v.$router.replace("/active/confirmorder");
				}
			},
			getSms() {
				const v = this;
				if(v.phoneNumber.replace(/\ +/g, "").replace(/[\r\n]/g, "") == "") {
					v.tipText = "手机号码不能为空";
					v.hideText();
				} else if(!/^1\d{10}$/gi.test(v.phoneNumber)) {
					v.tipText = "手机号码格式错误";
					v.hideText();
				} else if(v.imgCode.replace(/\ +/g, "").replace(/[\r\n]/g, "") == "") {
					v.tipText = "图片验证码不能为空";
					v.hideText();
				} else {
					v.$api.checkSms(v.imgCode).then(res => {
						console.log(res);
						if(res.status == 1) {
							v.$api.sendSms(v.phoneNumber, v.imgCode).then(res => {
								if(res.status == 1) {
									v.forbidClick = true;
									v.timer = setInterval(function() {
										if(v.num == 0) {
											v.smsText = "获取验证码";
											v.num = 60;
											clearInterval(v.timer);
											v.forbidClick = false;
											return;
										}
										v.smsText = "倒计时(" + v.num + "s)";
										v.num--;
									}, 1000);
								}
							});
						} else {
							v.tipText = res.msg;
							v.hideText();
						}
					});
				}
			}
		}
	};
</script>

<style scoped="scoped" lang="scss">
	.topbar-wrapper {
		background-color: #e7e7e7;
		height: 75px;
		line-height: 75px;
		.topbar {
			width: 1200px;
			margin: 0 auto;
			height: 75px;
			line-height: 75px;
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
	
	.fill-info {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
	}
	
	.join-frame {
		width: 1200px;
		height: 62px;
		background: #DC613A;
		border-radius: 31px;
	}
	
	.join-frame p {
		color: #fff;
		font-size: 18px;
		line-height: 62px;
	}
	
	.join-frame .dot {
		width: 10px;
		height: 10px;
		background: #fff;
		border-radius: 5px;
		float: left;
		margin: 26px 18px 26px 37px;
	}
	
	.step-bar {
		width: 730px;
		position: absolute;
		right: -55px;
		top: 50px;
	}
	
	/deep/ .el-step__title {
		color: #000!important;
		font-weight: 700;
	}
	
	/deep/ .el-step__head {
		border-color: #A0A0A0!important;
	}
	
	/deep/ .icon {
		width: 40px;
		height: 23px;
		background-position: left center;
	}
	
	/deep/ .step2 .icon {
		height: 35px;
	}
	
	/deep/ .step1 .icon {
		background: url(../../img/active/pc_avtive_step1.png) no-repeat;
	}
	
	/deep/ .step2 .icon {
		background: url(../../img/active/pc_avtive_act2.png) no-repeat;
	}
	
	/deep/ .step3 .icon {
		background: url(../../img/active/pc_avtive_step3.png) no-repeat;
	}
	
	/deep/ .step4 .icon {
		background: url(../../img/active/pc_avtive_step4.png) no-repeat;
	}
	
	.info-title {
		font-size: 24px;
		color: #000;
		line-height: 24px;
		margin: 55px 0 15px 0;
	}
	
	.time-info {
		width: 1198px;
		height: 44px;
		padding-bottom: 24px;
		border-bottom: 5px solid #e8d7c0;
		overflow: hidden;
		margin: 0 auto;
		margin-bottom: 30px;
	}
	
	.time-info p {
		font-size: 20px;
		color: #000;
		float: right;
	}
	
	.time-info span {
		display: block;
		float: left;
		height: 5px;
		background: #000;
		margin-top: 15px;
	}
	
	.user-verify {
		border-bottom: 1px solid #e8d7c0;
		margin-top: 30px;
	}
	
	.visitor-list li {
		border-bottom: 1px solid #e5e5e5;
		padding: 40px 0 20px 0;
		position: relative;
	}
	
	.visitor-list .del-box {
		height: 147px;
		border-left: 1px solid #b47c2d;
		position: absolute;
		top: 50px;
		right: 0;
	}
	
	.visitor-list .del-box input {
		width: 70px;
		height: 36px;
		border: 1px solid #868284;
		border-radius: 17px;
		background: #fff;
		margin: 55px 35px;
		color: #585858;
		cursor: pointer;
	}
	
	.visitor-list .info-item,
	.user-verify .info-item {
		height: 46px;
		overflow: hidden;
		margin: 0 0 20px 20px;
		overflow: hidden;
	}
	
	.visitor-list .info-item p,
	.user-verify .info-item p {
		float: left;
		font-size: 16px;
		color: #282828;
		line-height: 46px;
		background: url(../../img/active/xing_icon.png) no-repeat left center;
		padding-left: 33px;
	}
	
	.visitor-list .info-item input,
	.visitor-list .info-item select,
	.user-verify .info-item input {
		height: 44px;
		border: 1px solid #b5b5b5;
		padding-left: 15px;
		float: left;
		margin-left: 30px;
		font-size: 16px;
	}
	
	.visitor-list .info-item input {
		width: 405px;
		color: #8c8c8c;
	}
	
	.visitor-list .info-item select {
		width: 220px;
		color: #000;
	}
	
	.add-box {
		overflow: hidden;
	}
	
	.add-visitor {
		width: 160px;
		height: 44px;
		border: 1px solid #b47c2d;
		color: #b47c2d;
		font-size: 16px;
		text-align: center;
		line-height: 44px;
		border-radius: 22px;
		cursor: pointer;
		margin: 30px 0 0 20px;
		float: left;
	}
	
	.add-explain {
		float: left;
		font-size: 16px;
		color: #858585;
		line-height: 100px;
		height: 75px;
		margin-left: 25px;
	}
	
	.sms-code {
		width: 132px;
		height: 50px;
		background: #b47c2d;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		color: #fff;
		cursor: pointer;
		float: left;
		margin-left: 13px;
	}
	
	.total-price {
		text-align: right;
		margin-top: 20px;
	}
	
	.btns {
		width: 575px;
		overflow: hidden;
		margin: 70px auto;
	}
	
	.btns input {
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		float: left;
	}
	
	.btns .cancel-btn {
		width: 238px;
		height: 46px;
		border: 1px solid #b47c2d;
		border-radius: 23px;
		background: #fff;
		color: #b47c2d;
	}
	
	.btns .next-btn {
		width: 240px;
		height: 48px;
		border-radius: 24px;
		background: #b47c2d;
		color: #fff;
		margin-left: 95px;
	}
</style>