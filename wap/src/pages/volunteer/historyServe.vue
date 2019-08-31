<template>
	<div class="history-serve">
		<div class="item-history">
			<p>注册时间</p>
			<input type="text" placeholder="请填写全国志愿者服务系统注册时间" v-model="history_reg" />
		</div>
		<div class="item-history">
			<p>注册月数</p>
			<input type="text" placeholder="请填写注册月数时长" v-model="history_month" />
		</div>
		<div class="item-history">
			<p>志愿者等级</p>
			<input type="text" placeholder="请填写志愿者等级" v-model="history_grade" />
		</div>
		<div class="item-history">
			<p>岗位班次</p>
			<input type="text" placeholder="请填写岗位" v-model="history_work" />
		</div>
		<div class="item-history">
			<p>年度/总服务次数</p>
			<input type="text" placeholder="请填写年度总服务次数" v-model="history_service_num" />
		</div>
		<div class="item-history">
			<p>年度/总服务时长</p>
			<input type="text" placeholder="请填写年度总服务时长" v-model="history_service_time" />
		</div>
		<div class="submit-btn" @click="save()">
			保存
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				history_reg: '', //注册时间
				history_month: '', //注册月数
				history_grade: '', //历史等级
				history_work: '', //历史岗位
				history_service_num: '', //历史服务次数
				history_service_time: '', //历史服务时间
			}
		},
		mounted() {
			const v = this;
			v.history_reg = localStorage.vol_history_reg ? localStorage.vol_history_reg : '';
			v.history_month = localStorage.vol_history_reg ? localStorage.vol_history_month : '';
			v.history_grade = localStorage.vol_history_reg ? localStorage.vol_history_grade : '';
			v.history_work = localStorage.vol_history_reg ? localStorage.vol_history_work : '';
			v.history_service_num = localStorage.vol_history_reg ? localStorage.vol_history_service_num : '';
			v.history_service_time = localStorage.vol_history_reg ? localStorage.vol_history_service_time : '';
		},
		methods: {
			save() {
				const v = this;
				localStorage.vol_history_reg = v.history_reg;
				localStorage.vol_history_month = v.history_month;
				localStorage.vol_history_grade = v.history_grade;
				localStorage.vol_history_work = v.history_work;
				localStorage.vol_history_service_num = v.history_service_num;
				localStorage.vol_history_service_time = v.history_service_time;
				let instance = Toast('保存成功');
				setTimeout(function() {
					instance.close();
					v.$router.go(-1)
				}, 500)
			}
		}
	}
</script>

<style scoped>
	.history-serve {
		min-height: 100vh;
		background: #F2F2F2;
	}
	
	.item-history {
		width: 100%;
		height: 50px;
		padding: 0 20px;
		background: #fff;
		margin-bottom: 4px;
	}
	
	.item-history p {
		width: 124px;
		float: left;
		font-size: 14px;
		color: #353535;
		line-height: 50px;
	}
	
	.item-history input {
		width: 210px;
		float: left;
		border: 0;
		height: 50px;
		outline: none;
	}
	
	.submit-btn {
		width: 355px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		border-radius: 24px;
		background: #BD8C47;
		color: #fff;
		font-size: 18px;
		margin: 10px auto;
	}
</style>