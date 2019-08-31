<template>
	<div>
		<div class="new-add">
			<div class="visitor-name">
				<p>姓<span style="color: #fff;">姓名</span>名</p>
				<input type="text" placeholder="请输入参观者姓名" v-model="name" />
			</div>
			<div class="id-type" @click="popupVisible = true">
				<p>证件类型</p>
				<div class="type-text">
					{{idType}}
				</div>
				<img src="../../img/active/active_rt.png" />
			</div>
			<div class="id-number">
				<p>证件号码</p>
				<input type="text" placeholder="请输入证件号码" v-model="card_num" />
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="operation-btn">
				<span style="float: right;color: #000;" @click="popupVisible = false">完成</span>
			</div>
			<div class="select-type">
				<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
			</div>
		</mt-popup>
		<div class="confirm-btn" @click="comfirmAdd()">
			{{btnText}}
		</div>
	</div>
</template>

<script>
	import checkId from "../../bin/common.js";
	import { Popup, Picker, Toast } from 'mint-ui';
	export default {
		data() {
			return {
				popupVisible: false,
				slots: [{
					defaultIndex: 0,
					flex: 1,
					values: ['身份证', '护照'],
					className: 'slot1',
					textAlign: 'center'
				}],
				idType: '身份证',
				top_id: '',
				name: '',
				is_children: '',
				card_type_id: 1,
				card_num: '',
				visitorNameList: [],
				visitorIdTypeList: [],
				visitorIdNumberList: [],
				children_username: [],
				children_cardtype_id: [],
				children_card_num: [],
				is_type: '',
				children_age_limit_min: '',
				children_age_limit_max: '',
				adult_age_limit_min: '',
				adult_age_limit_max: '',
				selectedVisitor: false,
				selectedIndex: 0,
				btnText: '',
			}
		},
		mounted() {
			const v = this;
			v.is_type = localStorage.is_type;
			v.visitorNameList = localStorage.visitorNameList ? JSON.parse(localStorage.visitorNameList) : [];
			v.visitorIdTypeList = localStorage.visitorIdTypeList ? JSON.parse(localStorage.visitorIdTypeList) : [];
			v.visitorIdNumberList = localStorage.visitorIdNumberList ? JSON.parse(localStorage.visitorIdNumberList) : [];
			v.adult_age_limit_min = localStorage.adult_age_limit_min;
			v.adult_age_limit_max = localStorage.adult_age_limit_max;
			if(v.is_type == 2) {
				v.children_age_limit_min = localStorage.children_age_limit_min;
				v.children_age_limit_max = localStorage.children_age_limit_max;
				v.children_username = localStorage.children_username ? JSON.parse(localStorage.children_username) : [];
				v.children_cardtype_id = localStorage.children_cardtype_id ? JSON.parse(localStorage.children_cardtype_id) : [];
				v.children_card_num = localStorage.children_card_num ? JSON.parse(localStorage.children_card_num) : [];
			}
			v.name = localStorage.temporaryName ? localStorage.temporaryName : '';
			v.card_num = localStorage.temporaryNum ? localStorage.temporaryNum : '';
			if(v.visitorNameList.indexOf(v.name) != -1) {
				v.selectedVisitor = true;
				v.selectedIndex = v.visitorNameList.indexOf(v.name)
			}
			if(v.$route.query.top_id) {
				v.top_id = v.$route.query.top_id;
				v.btnText = '确认更改'
			} else if(v.$route.query.addVisitor == 'yes') {
				v.btnText = '确认添加'
			} else {
				v.btnText = '确认新增'
			}
		},
		methods: {
			comfirmAdd() {
				const v = this;
				if(v.name == '') {
					Toast('姓名不能为空');
					return false;
				} else if(v.card_num == '') {
					Toast('证件号码不能为空');
					return false;
				} else if(!checkId.checkIdcard(v.card_num).status) {
					Toast('身份证号格式错误');
					return false;
				} else if((v.visitorIdNumberList.indexOf(v.card_num) != -1 || v.children_username.indexOf(v.card_num) != -1) && v.$route.query.addVisitor == 'yes') {
					Toast('证件号码重复');
					return false;
				}
				if(v.$route.query.addVisitor == 'yes') {
					if(v.is_type == 2 && (v.children_age_limit_min <= checkId.analyzeIDCard(v.card_num)) && (checkId.analyzeIDCard(v.card_num) <= v.children_age_limit_max)) {
						if(v.is_type == 2 && v.children_username.length == 1) {
							Toast('只能添加一个儿童');
							return false;
						}
						v.children_username.push(v.name);
						v.children_cardtype_id.push(1);
						v.children_card_num.push(v.card_num);
						localStorage.children_username = JSON.stringify(v.children_username);
						localStorage.children_cardtype_id = JSON.stringify(v.children_cardtype_id);
						localStorage.children_card_num = JSON.stringify(v.children_card_num);
						v.$router.go(-1);
					} else if((v.adult_age_limit_min <= checkId.analyzeIDCard(v.card_num)) && (checkId.analyzeIDCard(v.card_num) <= v.adult_age_limit_max)) {
						if(v.is_type == 2 && v.visitorNameList.length == 1) {
							Toast('只能添加一个家长');
							return false;
						}
						v.visitorNameList.push(v.name);
						v.visitorIdTypeList.push(1);
						v.visitorIdNumberList.push(v.card_num);
						localStorage.visitorNameList = JSON.stringify(v.visitorNameList);
						localStorage.visitorIdTypeList = JSON.stringify(v.visitorIdTypeList);
						localStorage.visitorIdNumberList = JSON.stringify(v.visitorIdNumberList);
						v.$router.go(-1);
					} else {
						Toast('此用户不在该活动允许的年龄范围内');
					}
					return false;
				}
				//				if(checkId.analyzeIDCard(v.card_num) < 18) {
				//					v.is_children = 2
				//				} else {
				//					v.is_children = 1
				//				}
				if(v.selectedVisitor) {
					v.visitorNameList[v.selectedIndex] = v.name;
					v.visitorIdTypeList[v.selectedIndex] = 1;
					v.visitorIdNumberList[v.selectedIndex] = v.card_num;

					localStorage.visitorNameList = JSON.stringify(v.visitorNameList);
					localStorage.visitorIdTypeList = JSON.stringify(v.visitorIdTypeList);
					localStorage.visitorIdNumberList = JSON.stringify(v.visitorIdNumberList);
				}
				localStorage.removeItem('temporaryName');
				localStorage.removeItem('temporaryNum');
				v.$api.contacts(v.top_id, v.name, v.is_children, v.card_type_id, v.card_num).then(res => {
					if(res.status == 1) {
						Toast('操作成功');
						setTimeout(function(){
							v.$router.go(-1);
						},500)
					} else {
						Toast(res.msg);
					}
				})
			},
			onValuesChange(picker, values) {
				this.idType = values[0];
				this.card_type_id = this.slots[0].values.indexOf(values[0]) + 1
			}
		}
	}
</script>

<style scoped>
	.new-add {
		width: 100%;
		background: #fff;
	}
	
	.new-add>div {
		width: 336px;
		height: 50px;
		border-bottom: 1px solid #DADADA;
		margin: 0 auto;
		padding-left: 16px;
		line-height: 50px;
		font-size: 15px;
		color: #353535;
	}
	
	.new-add>div img {
		float: right;
		width: 8px;
		height: 13px;
		margin: 19px 0;
	}
	
	.type-text {
		font-size: 15px;
		color: #353535;
		margin-left: 45px;
		float: left;
	}
	
	.new-add>div:last-child {
		border: 0;
	}
	
	.new-add>div p {
		float: left;
	}
	
	.new-add>div input {
		display: block;
		width: 250px;
		height: 49px;
		line-height: 49px;
		float: left;
		border: 0;
		outline: none;
		padding-left: 45px;
	}
	
	.select-type {
		width: 375px;
	}
	
	.operation-btn {
		width: 375px;
		height: 45px;
		background: #F1F1F1;
		padding: 0 20px;
		font-size: 18px;
		line-height: 45px;
		color: #000;
	}
	
	.confirm-btn {
		position: fixed;
		left: 14px;
		bottom: 6px;
		width: 347px;
		height: 48px;
		border-radius: 24px;
		background: #CC974C;
		text-align: center;
		line-height: 48px;
		color: #fff;
		font-size: 18px;
	}
</style>