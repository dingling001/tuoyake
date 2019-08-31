<template>
	<div class="app-order-detail">
		<div class="detail-box" @click="$router.push({path:'/volunteer/voldetail',query:{active_id:dataObj.id}})">
			<img :src="$toThumbsimg(dataObj.img,164,98,33,$vol)" class="vol-img" />
			<div class="img-rt">
				<p class="active-name two-line-text">{{dataObj.title}}</p>
				<p class="active-time">{{dataObj.active_date}}</p>
				<p class="labels single-line-text">{{dataObj.recruit_job}}</p>
				<p class="active-price">
					<span style="font-size: 18px;">{{dataObj.service_time}}小时</span>
				</p>
			</div>
		</div>
		<div class="serial-number">
			<p style="float: left;">报名编号：{{dataObj.order_sn}}</p>
			<p style="float: right;color: #E8593E;">{{dataObj.order_status_show}}</p>
		</div>
		<div class="other-info">
			<p>活动时间：{{dataObj.active_date}}</p>
			<p>下单时间：{{dataObj.i_add_time}}</p>
			<p>活动地点：{{dataObj.active_place}}</p>
		</div>
		<div class="cancel-join" v-if="dataObj.can_refund" @click="cancelJoin()">
			取消报名
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
			this.getDetail()
		},
		methods: {
			cancelJoin() {
				const v = this;
				MessageBox.confirm('确定要取消报名此活动吗?', '提示', {
					confirmButtonClass: 'pw-wx-mint-confirm-btn'
				}).then(action => {
					Indicator.open('处理中...');
					v.$api.volCancel(v.$route.query.order_id).then(res => {
						Indicator.close();
						if(res.status == 1) {
							Toast('取消成功');
							v.getDetail()
						} else {
							Toast(res.msg);
						}
					})
				})
			},
			getDetail() {
				Indicator.open('加载中...');
				const v = this;
				v.$api.volDetail(v.$route.query.order_id).then(res => {
					Indicator.close();
					v.dataObj = res.data
				})
			}
		}
	}
</script>

<style scoped>
	.app-order-detail {
		min-height: calc(100vh - 60px);
		background: #F2F2F2;
	}
	
	.detail-box {
		width: 375px;
		padding: 0 20px;
		overflow: hidden;
		padding: 15px 11px;
		background: #fff;
		margin-bottom: 10px;
	}
	
	.detail-box .vol-img {
		display: block;
		width: 164px;
		height: 98px;
		border-radius: 4px;
		float: left;
	}
	
	.img-rt {
		width: 180px;
		float: left;
		margin-left: 8px;
	}
	
	.active-name {
		font-size: 14px;
		color: #000;
		line-height: 20px;
		height: 40px;
	}
	
	.active-time {
		color: #000;
		font-size: 12px;
		line-height: 18px;
	}
	
	.labels {
		color: #B47C2D;
		font-size: 12px;
		line-height: 24px;
	}
	
	.active-price {
		color: #E8593E;
		font-size: 15px;
	}
	
	.serial-number {
		width: 100%;
		padding: 0 20px;
		height: 50px;
		line-height: 50px;
		background: #fff;
		font-size: 14px;
		color: #353535;
		margin-bottom: 4px;
	}
	
	.other-info {
		width: 100%;
		padding: 10px 20px;
		font-size: 14px;
		color: #353535;
		background: #fff;
		line-height: 28px;
	}
	
	.cancel-join {
		width: 150px;
		height: 48px;
		line-height: 48px;
		border: 1px solid #000;
		border-radius: 23px;
		font-size: 18px;
		color: #353535;
		background: #F2F2F2;
		margin: 30px auto;
		text-align: center;
	}
</style>