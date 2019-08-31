<template>
	<div class="loading">
		<div class="loading-box">
			<img src="../../img/volunteer/wx_loading.gif" />
			<p>加载中...</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	export default {
		data() {
			return {
				username: ''
			}
		},
		mounted() {
			const v = this;
			//进入志愿者
			setTimeout(function() {
				v.$api.userInfo().then(res => {
					if(res.status == 1) {
						if(res.data.is_vol == 1) {
							v.$api.volInfo().then(res => {
								v.username = res.data.name;
								if(res.status == 1) {
									if(res.data.grade_status == 6 || res.data.grade_status == 5) {
										if(v.$route.query.vol == 'uvol') {
											v.$router.replace("/uvol");
										} else {
											v.$router.replace("/volunteer/volrecruitlist");
										}
									} else if(res.data.grade_status == 8) {
										v.$router.replace("/volunteer/volnotpass");
									} else {
										v.$router.replace({
											path: "/volunteer/volresult",
											query: {
												username: v.username
											}
										});
									}
								} else {
									Toast(res.msg);
								}
							});
						} else {
							v.$api.wxRecruitStatus().then(res => {
								if(res.status == 1) {
									if(res.data == 1) {
										v.$router.replace("/volunteer/home");
									} else {
										v.$router.replace("/volunteer/wxrecruitstop");
									}
								} else {
									Toast(res.msg);
								}
							})
						}
					} else {
						Toast(res.msg);
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
		width: 300px;
	}
	
	.loading-box p {
		text-align: center;
		color: #AD772C;
		font-size: 18px;
		margin: 10px 0;
	}
</style>