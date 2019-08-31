<template>
	<div class="vol-result">
		<div class="result-box fixed-center">
			<img src="../../img/volunteer/vol_checking.png" />
			<p style="text-indent: 30px;">
				{{$route.query.username}}，您已成功提交志愿者申请， 请耐心等待审核结果。
			</p>
			<p style="margin-top: 20px;text-align: center;">咨询电话：022-67185131</p>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.vol-result {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #fff;
	}
	
	.result-box {
		overflow: hidden;
	}
	
	.result-box img {
		display: block;
		width: 250px;
		margin: 0 auto;
	}
	
	.result-box p {
		width: 230px;
		font-size: 15px;
		color: #313131;
		line-height: 28px;
		margin: 0 auto;
		margin-top: 40px;
	}
</style>