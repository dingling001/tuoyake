<template>
	<div class="vol-sign">
		<div class="sign-data">
			<img src="../../img/volunteer/sign_banner_img.png" />
			<div v-if="!failStatus && !successStatus">
				<p class="active-title">{{dataObj.title}}</p>
				<p class="active-time">{{dataObj.active_date}}</p>
			</div>
			<div v-if="failStatus || successStatus">
				<div class="sign-result" style="height: 34px;line-height: 34px;">
					<img src="../../img/volunteer/sign_success_icon.png" v-if="successStatus" />
					<img src="../../img/volunteer/sign_fail_icon.png" v-if="failStatus" />
					<span v-if="successStatus || failStatus">{{signText}}</span>
				</div>
				<p class="sign-tip">{{tipText}}</p>
				<p class="sign-tip">{{signoutText}}</p>
			</div>
		</div>
		<div class="sign-btn" @click="sign()" v-if="!failStatus && !successStatus">签到</div>
		<div class="sign-btn" v-if="failStatus || successStatus" @click="fanhui">返回</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dataObj: {},
				signObj: {},
				failStatus: false,
				successStatus: false,
				signText: '',
				tipText: '',
				signoutText: ''
			}
		},
		mounted() {
			this.getSignData()
		},
		methods: {
			getSignData() {
				const v = this;
				v.$api.activeSignData(v.$route.query.active_id).then(res => {
					if(res.status == 1){
						v.dataObj = res.data
					}else if(res.status == 0) {
						v.signText = '请求失败';
						v.failStatus = true;
						v.tipText = res.msg
					}
				})
			},
			sign() {
				const v = this;
				v.$api.activeSign(v.$route.query.active_id).then(res => {
					v.signObj = res.data;
					if(res.status == 1) {
						v.successStatus = true;
						if(res.data.i_qt_time == '') {
							v.signText = '签到成功';
							v.tipText = '签到时间：' + res.data.i_qd_time
						} else {
							v.signText = '签退成功';
							v.tipText = '签到时间：' + res.data.i_qd_time;
							v.signoutText = '签退时间：' + res.data.i_qt_time
						}
					} else if(res.status == 0) {
						v.signText = '签到失败';
						v.failStatus = true;
						v.tipText = res.msg
					}
				})
			},
			fanhui() {
				WeixinJSBridge.call('closeWindow');
			}
		}
	}
</script>

<style scoped>
	.vol-sign {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #F2F2F2;
	}
	
	.sign-data {
		width: 100%;
		overflow: hidden;
		background: #fff;
		padding-bottom: 30px;
	}
	
	.sign-data>img {
		display: block;
		width: 350px;
		margin: 10px auto;
	}
	
	.active-title,
	.active-time {
		font-size: 17px;
		color: #000;
		font-weight: bold;
		width: 350px;
		margin: 0 auto;
	}
	
	.active-title {
		line-height: 18px;
		margin-top: 25px;
	}
	
	.active-time,
	.sign-tip {
		font-size: 14px;
		font-weight: 100;
		line-height: 14px;
		margin-top: 18px;
	}
	
	.sign-result {
		width: 130px;
		margin: 0 auto;
		margin-top: 24px;
		margin-bottom: 30px;
		font-size: 22px;
		color: #353535;
		font-weight: bold;
		overflow: hidden;
	}
	
	.sign-result span {
		float: right;
	}
	
	.sign-result img {
		display: block;
		width: 38px;
		float: left;
	}
	
	.sign-tip {
		text-align: center;
	}
	
	.sign-btn {
		display: block;
		width: 158px;
		height: 48px;
		border-radius: 24px;
		background: #EE8E41;
		margin: 50px auto;
		color: #fff;
		font-size: 18px;
		border: 0;
		outline: none;
		text-align: center;
		line-height: 48px;
	}
</style>