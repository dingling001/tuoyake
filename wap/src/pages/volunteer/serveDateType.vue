<template>
	<div class="date-type">
		<p class="title">意向服务时间</p>
		<p class="item-date" @click="selDate(1,'通用时间')" :class="{date_act:worktime_type == 1}">通用时间</p>
		<p class="item-date" @click="selDate(2,'寒假时间')" :class="{date_act:worktime_type == 2}">寒假时间</p>
		<p class="item-date" @click="selDate(3,'暑假时间（7月20日-8月28日）')" :class="{date_act:worktime_type == 3}">暑假时间</p>
		<div class="submit-btn" @click="nextStep()">
			下一步
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				worktime_type: 1,
				worktime_type_text: ''
			}
		},
		mounted() {
			this.worktime_type = localStorage.vol_worktime_type ? localStorage.vol_worktime_type : 1;
			this.worktime_type_text = localStorage.vol_worktime_type_text ? localStorage.vol_worktime_type_text : '';
		},
		methods: {
			nextStep() {
				localStorage.vol_worktime_type = this.worktime_type;
				localStorage.vol_worktime_type_text = this.worktime_type_text;
				this.$router.replace('/volunteer/serveframe')
			},
			selDate(val, val1) {
				this.worktime_type = val;
				this.worktime_type_text = val1
			}
		}
	}
</script>

<style scoped>
	.date-type {
		background: #F2F2F2;
		min-height: 100vh;
	}
	
	.date-type p {
		width: 100%;
		height: 50px;
		margin-bottom: 4px;
		background: #fff;
		padding: 0 20px;
		line-height: 50px;
		font-size: 14px;
		color: #2A2A2A;
	}
	
	.date-type .title {
		font-size: 17px;
		color: #353535;
		font-weight: bold;
	}
	
	.submit-btn {
		position: fixed;
		left: 10px;
		bottom: 10px;
		width: 355px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		border-radius: 24px;
		background: #BD8C47;
		color: #fff;
		font-size: 18px;
	}
	
	.date-type .date_act {
		background: #BD8C47;
		color: #fff;
	}
</style>