<template>
	<div class="vol-detail">
		<img :src="$toThumbsimg(dataObj.img,375,211,33,$vol)" class="active-img" />
		<div class="main-box">
			<div class="title-status">
				<span :class="{no_status:dataObj.recruit_status != 2}">{{dataObj.recruit_status_show}}</span>
				<p>{{dataObj.title}}</p>
			</div>
			<p><span class="common-color">招募时间：</span>{{dataObj.recruit_start_time}}—{{dataObj.recruit_end_time}}</p>
			<p><span class="common-color">活动时间：</span>{{dataObj.active_date}}</p>
			<p><span class="common-color">活动地点：</span>{{dataObj.active_place}}</p>
			<p><span class="common-color">招募岗位：</span><span>{{dataObj.recruit_job}}</span><span class="common-color" style="margin-left: 20px;">服务时长：</span><span>{{dataObj.service_time}}小时</span></p>
			<p><span class="common-color">联系人：</span><span>{{dataObj.contact_people}}</span><span class="common-color" style="margin-left: 20px;">联系电话：</span><span>{{dataObj.contact_phone}}</span></p>
			<p style="border: 0;"><span class="common-color">计划招募：</span><span>{{dataObj.recruit_num}}</span><span class="common-color" style="margin-left: 20px;">已招募人数：</span><span>{{dataObj.signup_num}}</span></p>
		</div>
		<div class="detail-content" v-html="dataObj.content">
		</div>
		<div class="btn" @click="apply()" :class="{forbid_click:dataObj.recruit_status != 2}">
			{{dataObj.recruit_status == 2 ? "我要报名" : dataObj.recruit_status_show}}
		</div>
	</div>
</template>

<script>
	import { Toast, Indicator, MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				dataObj: {}
			}
		},
		mounted() {
			this.getVolDetail()
		},
		methods: {
			getVolDetail() {
				Indicator.open();
				this.$api.volActDetail(this.$route.query.active_id).then(res => {
					Indicator.close();
					if(res.status == 1) {
						this.dataObj = res.data
					}
				})
			},
			apply() {
				const v = this;
				Indicator.open('报名中...');
				v.$api.userInfo().then(res => {
					if(res.data.is_vol == 2) {
						Indicator.close();
						MessageBox.confirm('您还没有注册过志愿者，是否去注册?', '提示', {
							confirmButtonClass: 'pw-wx-mint-confirm-btn'
						}).then(action => {
							v.$router.push('/volunteer/home')
						});
					} else {
						v.$api.volActive(v.$route.query.active_id).then(res => {
							Indicator.close();
							if(res.status == 1) {
								Toast('报名成功');
							} else {
								Toast(res.msg);
							}
						})
					}
				});
			}
		}
	}
</script>

<style scoped>
	.vol-detail {
		background: #F2F2F2;
	}
	
	.main-box {
		overflow: hidden;
		width: 100%;
		background: #fff;
	}
	
	.active-img {
		width: 375px;
		height: 211px;
		display: block;
	}
	
	.title-status {
		width: 375px;
		padding: 20px 20px 0 90px;
		position: relative;
	}
	
	.title-status span {
		position: absolute;
		top: 19px;
		left: 20px;
		display: inline-block;
		background: #CC974C;
		border-radius: 25px;
		color: #fff;
		padding: 5px 12px;
		font-size: 12px;
	}
	
	.title-status .no_status {
		background: #CCC;
		color: #fff;
	}
	
	.title-status p {
		font-size: 20px;
		color: #353535;
		font-weight: bold;
		line-height: 26px;
	}
	
	.main-box>p {
		width: 336px;
		height: 50px;
		border-bottom: 1px solid #DADADA;
		margin: 0 auto;
		line-height: 50px;
		font-size: 14px;
		color: #363636;
	}
	
	.vol-detail .common-color {
		color: #9B9B9B;
	}
	
	.detail-content {
		width: 100%;
		padding: 18px;
		font-size: 14px;
		color: #353535;
		line-height: 20px;
		margin-top: 10px;
		background: #fff;
		margin-bottom: 60px;
	}
	
	.btn {
		width: 347px;
		height: 48px;
		background: #CC974C;
		border-radius: 24px;
		color: #fff;
		font-size: 18px;
		line-height: 48px;
		text-align: center;
		position: fixed;
		left: 14px;
		bottom: 6px;
	}
	
	.forbid_click {
		background: #ccc;
		color: #fff;
		pointer-events: none;
	}
</style>