<template>
	<div class="apply-result">
		<div class="info-title">确认信息</div>
		<div class="time-info">
			<span style="width: 50px;"></span>
			<span style="width: 5px;margin-left: 5px;"></span>
		</div>
		<div class="step-bar">
			<el-steps :active="4" align-center>
				<el-step class="step1" title="选择参加场次" icon="icon"></el-step>
				<el-step class="step2" title="填写报名信息" icon="icon"></el-step>
				<el-step class="step3" title="确认信息" icon="icon"></el-step>
				<el-step class="step4" title="报名结果" icon="icon"></el-step>
			</el-steps>
		</div>
		<img src="../../img/active/active_success.png" class="success-icon" />
		<p class="status-text">报名成功</p>
		<p class="intro-text">您提交的【{{selected_time}}】社教活动已经报名成功，活动当日凭订单内的证件或二维码进馆参加。</p>
		<div class="btns">
			<input type="button" value="继续报名" class="cancel-btn" @click="$router.replace('/active/index')">
			<input type="button" value="报名记录" class="next-btn" @click="$router.replace('/uactive')">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selected_time: '',
			}
		},
		mounted() {
			this.selected_time = localStorage.selected_time
		}
	}
</script>

<style scoped>
	.apply-result {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
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
	
	/deep/ .step4 .icon {
		height: 35px;
	}
	
	/deep/ .step1 .icon {
		background: url(../../img/active/pc_avtive_step1.png) no-repeat;
	}
	
	/deep/ .step2 .icon {
		background: url(../../img/active/pc_avtive_step2.png) no-repeat;
	}
	
	/deep/ .step3 .icon {
		background: url(../../img/active/pc_avtive_step3.png) no-repeat;
	}
	
	/deep/ .step4 .icon {
		background: url(../../img/active/pc_avtive_act4.png) no-repeat;
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
	
	.time-info span {
		display: block;
		float: left;
		height: 5px;
		background: #000;
		margin-top: 15px;
	}
	
	.success-icon {
		display: block;
		margin: 60px auto;
	}
	
	.status-text {
		font-size: 24px;
		text-align: center;
	}
	
	.intro-text {
		width: 480px;
		margin: 50px auto;
		font-size: 16px;
		line-height: 40px;
		text-align: center;
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