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
		<div class="confirm-order">
			<div class="info-title">确认信息</div>
			<div class="time-info">
				<span style="width: 50px;"></span>
				<span style="width: 5px;margin-left: 5px;"></span>
			</div>
			<div class="step-bar">
				<el-steps :active="3" align-center>
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
			<p class="active-name">{{activeName}}</p>
			<p class="active-place">地点：{{activePlace}}</p>
			<ul class="visitor-list" v-if="is_type == 1">
				<li v-for="(item,index) in toi_username" :key="index">
					<p>
						<span>姓<strong style="color: #fff;">姓名</strong>名</span>
						<span>{{item}}</span>
					</p>
					<p>
						<span>证件类型</span>
						<span>身份证</span>
					</p>
					<p>
						<span>证件号码</span>
						<span>{{toi_card_num[index]}}</span>
					</p>
				</li>
			</ul>
			<ul class="visitor-list" v-if="is_type == 2">
				<li v-for="(item,index) in toi_username">
					<p>
						<span>家长姓名</span>
						<span>{{item}}</span>
					</p>
					<p>
						<span>证件类型</span>
						<span>身份证</span>
					</p>
					<p>
						<span>证件号码</span>
						<span>{{toi_card_num[index]}}</span>
					</p>
				</li>
				<li v-for="(item,index) in children_username">
					<p>
						<span>儿童姓名</span>
						<span>{{item}}</span>
					</p>
					<p>
						<span>证件类型</span>
						<span>身份证</span>
					</p>
					<p>
						<span>证件号码</span>
						<span>{{children_card_num[index]}}</span>
					</p>
				</li>
			</ul>
			<p class="phone-number">
				<span>手机号码</span>
				<span>{{contact_phone}}</span>
			</p>
			<div class="btns">
				<input type="button" value="上一步" class="cancel-btn" @click="$router.replace('/active/fillinfo')" />
				<input type="button" value="确认报名" class="next-btn" @click="apply()" />
			</div>
			<div class="tip">
				{{tipText}}
			</div>
		</div>
		<Pcloading v-if="isLoading"></Pcloading>
	</div>
</template>

<script>
	import Pcloading from "../../components/pcloading.vue";
	export default {
		data() {
			return {
				is_type: '',
				tipText: '', //提示文案
				selected_time: '', //所选时段
				toi_username: [], //姓名数组
				toi_cardtype_id: [], //证件类型数组
				toi_card_num: [], //证件号码数组
				activePlace: localStorage.activePlace,
				activeName: localStorage.activeName,
				contact_phone: '',
				children_username: [], //儿童姓名数组
				children_cardtype_id: [], //儿童证件类型数组
				children_card_num: [], //儿童证件号码数组
				isLoading: false, //是否显示loading弹窗
			}
		},
		mounted() {
			const v = this;
			v.is_type = localStorage.is_type;
			v.selected_time = localStorage.selected_time;
			v.contact_phone = localStorage.contact_phone;
			v.toi_username = JSON.parse(localStorage.toi_username);
			v.toi_cardtype_id = JSON.parse(localStorage.toi_cardtype_id);
			v.toi_card_num = JSON.parse(localStorage.toi_card_num);
			v.children_username = localStorage.children_username ?
				JSON.parse(localStorage.children_username) : [];
			v.children_cardtype_id = localStorage.children_cardtype_id ?
				JSON.parse(localStorage.children_cardtype_id) : [];
			v.children_card_num = localStorage.children_card_num ?
				JSON.parse(localStorage.children_card_num) : [];
		},
		methods: {
			apply() {
				const v = this;
				v.isLoading = true;
				v.$api.applyActive(v.contact_phone).then(res => {
					v.isLoading = false;
					if(res.status == 1) {
						localStorage.removeItem('contact_phone');
						localStorage.removeItem('toi_username');
						localStorage.removeItem('toi_cardtype_id');
						localStorage.removeItem('toi_card_num');
						localStorage.removeItem('children_username');
						localStorage.removeItem('children_cardtype_id');
						localStorage.removeItem('children_card_num');
						localStorage.removeItem('is_type');
						localStorage.removeItem('default_price');
						localStorage.removeItem('activeName');
						localStorage.removeItem('activePlace');
						localStorage.removeItem('active_id');
						localStorage.removeItem('active_time_id');
						if(res.data.order_status == 3) {
							v.$router.replace('/active/applyresult')
						} else {
							v.$router.replace({
								path: '/active/orderdetail',
								query: {
									torder_id: res.data.torder_id
								}
							})
						}
					} else if(res.status == 2) {
						v.$router.replace('/active/fullresult')
					} else {
						v.tipText = res.msg;
						v.hideText();
					}
				})
			},
			hideText() {
				setTimeout(() => {
					this.tipText = ''
				}, 2000)
			},
		},
		components: {
			Pcloading
		},
	}
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
	
	.confirm-order {
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
		margin-bottom: 40px;
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
	
	/deep/ .step3 .icon {
		height: 35px;
	}
	
	/deep/ .step1 .icon {
		background: url(../../img/active/pc_avtive_step1.png) no-repeat;
	}
	
	/deep/ .step2 .icon {
		background: url(../../img/active/pc_avtive_step2.png) no-repeat;
	}
	
	/deep/ .step3 .icon {
		background: url(../../img/active/pc_avtive_act3.png) no-repeat;
	}
	
	/deep/ .step4 .icon {
		background: url(../../img/active/pc_avtive_step4.png) no-repeat;
	}
	
	.fill-info {
		width: 1200px;
		margin: 0 auto;
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
		border-bottom: 5px solid #E8D7C0;
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
	
	.active-name {
		font-size: 20px;
		color: #353535;
		line-height: 20px;
		padding-left: 20px;
	}
	
	.active-place {
		font-size: 16px;
		line-height: 16px;
		color: #000;
		padding: 20px;
	}
	
	.phone-number {
		font-size: 16px;
		line-height: 16px;
		color: #000;
		padding-top: 30px;
		padding-left: 20px;
		border-top: 1px solid #E8D7C0;
		overflow: hidden;
	}
	
	.visitor-list li {
		border-top: 1px solid #E5E5E5;
		padding: 20px;
	}
	
	.visitor-list li p {
		overflow: hidden;
		font-size: 16px;
		line-height: 40px;
		color: #000;
	}
	
	.visitor-list li p span,
	.phone-number span {
		float: left;
	}
	
	.visitor-list li p span:last-child,
	.phone-number span:last-child {
		margin-left: 30px;
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
		border: 1px solid #B47C2D;
		border-radius: 23px;
		background: #fff;
		color: #B47C2D;
	}
	
	.btns .next-btn {
		width: 240px;
		height: 48px;
		border-radius: 24px;
		background: #B47C2D;
		color: #fff;
		margin-left: 95px;
	}
</style>