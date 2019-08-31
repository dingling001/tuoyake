<template>
	<div class="vol-result">
		<div class="result-box fixed-center">
			<img src="../../img/volunteer/vol_notpass.png" />
			<p>
				非常抱歉，此次志愿者录用名额已满，感谢您对国家海洋博物馆志愿者工作的支持。
			</p>
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
		width: 200px;
		font-size: 15px;
		color: #ad772c;
		line-height: 28px;
		text-align: center;
		margin: 20px auto;
	}
</style>