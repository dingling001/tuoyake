<template>
	<div class="apply-result">
		<div class="info-title">报名结果</div>
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
		<img src="../../img/volunteer/vol_notpass.png" class="success-icon"/>
		<p class="status-text">该活动已报满</p>
		<p class="intro-text">请选择其他活动进行报名</p>
		<div class="btns" @click="$router.replace('/active/activelist')">返回选择其他活动</div>
	</div>
</template>

<script>
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
	/deep/ .el-step__title{
		color: #000;
		font-weight: 700;
	}
	/deep/ .el-step__head{
		border-color: #A0A0A0;
	}
	/deep/ .icon{
		width: 40px;
		height: 23px;
		background-position: left center;
	}
	/deep/ .step4 .icon{
		height: 35px;
	}
	/deep/ .step1 .icon{
		background: url(../../img/active/pc_avtive_step1.png) no-repeat;
	}
	/deep/ .step2 .icon{
		background: url(../../img/active/pc_avtive_step2.png) no-repeat;
	}
	/deep/ .step3 .icon{
		background: url(../../img/active/pc_avtive_step3.png) no-repeat;
	}
	/deep/ .step4 .icon{
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
	
	.success-icon{
		display: block;
		width: 400px;
		margin: 50px auto 32px auto;
		
	}
	.status-text{
		font-size: 24px;
		text-align: center;
		line-height: 56px;
	}
	.intro-text{
		width: 480px;
		margin: 0 auto 25px auto;
		font-size: 16px;
		line-height: 52px;
		text-align: center;
	}
	.btns {
		width: 306px;
		height: 48px;
		margin: 0 auto;
		background: #C39657;
		border-radius: 24px;
		font-size: 16px;
		color: #fff;
		cursor: pointer;
		line-height: 48px;
		text-align: center;
		margin-bottom: 90px;
	}
</style>