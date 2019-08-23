<template>
	<div class="loading">
		<div class="loading-box">
			<img src="../../img/volunteer/pc_loading.gif" />
			<p>加载中...</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {
			const v = this;
			setTimeout(function() {
				v.$api.getUser().then(res => {
					if(res.data.is_vol == 1) {
						v.$api.pcVolInfo().then(res => {
							if(res.data.grade_status == 6) {
								v.$router.replace("/volunteer/volrecruitlist");
							} else if(res.data.grade_status == 8) {
								v.$router.replace("/volunteer/applicationresult");
							} else {
								v.$router.replace("/volunteer/volrecruitlist");
							}
						});
					} else {
						v.$api.recruitStatus().then(res => {
							if(res.data == 1) {
								v.$router.replace("/volunteer/home");
							} else {
								v.$router.replace("/volunteer/pcrecruitstop");
							}
						})
					}
				});
			}, 500)
		}
	}
</script>

<style scoped>
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 9999;
	}
	
	.loading-box {
		position: fixed;
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
	
	.loading-box img {
		display: block;
		width: 400px;
	}
	
	.loading-box p {
		text-align: center;
		color: #AD772C;
		font-size: 24px;
		margin: 15px 0;
	}
</style>