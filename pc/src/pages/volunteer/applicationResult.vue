<template>
	<div style="position: relative;width: 100%;min-height: calc(100vh - 164px)">
		<div class="construction-box">
			<img src="../../img/volunteer/vol_notpass.png"/>
			<p>非常抱歉，此次志愿者录用名额已满，感谢您对国家海洋博物馆志愿者工作的支持。</p>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.construction-box{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		/* IE 9 */
		-webkit-transform: translate(-50%, -50%);
		/* Safari and Chrome */
		-o-transform: translate(-50%, -50%);
		/* Opera */
		-moz-transform: translate(-50%, -50%);
		/* Firefox */
	}
	img{
		display: block;
		width: 400px;
		margin: 0 auto;
	}
	p{
		width: 420px;
		font-size: 20px;
		margin: 30px;
		color: #313131;
		text-align: center;
		line-height: 30px;
	}
</style>