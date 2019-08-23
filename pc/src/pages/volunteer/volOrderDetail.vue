<template>
	<div class="vol-order-detail">
		<div class="info-title">订单信息</div>
		<div class="time-info">
			<span style="width: 50px;"></span>
			<span style="width: 5px;margin-left: 5px;"></span>
			<div class="status-date">
				<p><span>报名状态：</span><span style="color: #DA4453;">{{dataObj.order_status_show}}</span></p>
				<p><span>参加日期：</span><span>{{dataObj.active_date}}</span></p>
			</div>
		</div>
		<div class="number-time">
			<p>报名编号 {{dataObj.order_sn}}</p>
			<p>下单时间 {{dataObj.i_add_time}}</p>
		</div>
		<div class="order-detail">
			<img :src="$toThumbsimg(dataObj.img, 453, 197, 33,$vol)" />
			<div class="info-box">
				<p class="active-title">{{dataObj.title}}</p>
				<p class="active-time">活动时间：{{dataObj.active_date}}</p>
				<p class="active-place">活动地点：{{dataObj.active_place}}</p>
				<p class="serve-type">服务类别：{{dataObj.recruit_job}} </p>
				<p class="serve-time">服务时长：{{dataObj.service_time}}小时</p>
				<p class="see-detail" @click="getVolActDetail()">查看详情</p>
			</div>
		</div>
		<div class="cancel-btn" v-if="dataObj.can_refund" @click="cancel()">
			取消报名
		</div>
		<!--活动详情-->
		<div class="zhezhao" v-if="showDetail">

		</div>
		<div class="detail-box fixed-center" v-if="showDetail">
			<div class="close-tc" @click="showDetail = false">

			</div>
			<div class="vol-recruit-detail">
				<p class="title">{{detailOjb.title}}</p>
				<div class="main-info">
					<p>招募时间 {{detailOjb.recruit_start_time}} -- {{detailOjb.recruit_end_time}}</p>
					<p>有效时间 {{detailOjb.effective_time}}</p>
					<p>活动时间 {{detailOjb.active_date}}</p>
					<p>联系人 {{detailOjb.contact_people}}</p>
					<p>活动地点 {{detailOjb.active_place}}</p>
					<p>联系电话 {{detailOjb.contact_phone}}</p>
					<p>服务时长 {{detailOjb.service_time}}</p>
					<p>招募岗位 {{detailOjb.recruit_job}}</p>
				</div>
				<div class="recruit-box">
					<p style="margin: 0 100px 0 60px;">计划招募：{{detailOjb.recruit_num}}人</p>
					<p>已招募人数：{{detailOjb.signup_num}}人</p>
				</div>
				<p class="active-intro">活动简介</p>
				<img :src="$toThumbsimg(dataObj.img, 1038, 550, 33,$vol)" class="active-img" />
				<div class="active-content" v-html="detailOjb.content"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				detailOjb: {},
				showDetail:false,
				dataObj: {}
			}
		},
		mounted() {
			this.getDetail();
		},
		methods: {
			getVolActDetail() {
				this.$api.volActDetail(this.$route.query.active_id).then(res => {
					this.detailOjb = res.data;
					this.showDetail = true
				})
			},
			getDetail() {
				this.$api.joinRecordDetail(this.$route.query.order_id).then(res => {
					this.dataObj = res.data
				})
			},
			cancel() {
				this.$confirm('您确定要取消报名次活动吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$api.cancelJoinVolPc(this.$route.query.order_id).then(res => {
						if(res.status == 1) {
							this.$message({
								type: 'success',
								message: '取消成功!'
							});
							this.getDetail()
						} else {
							this.$message({
								type: 'success',
								message: res.msg
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '操作已取消'
					});
				});
			}
		}
	}
</script>

<style scoped>
	.close-tc {
		width: 54px;
		height: 54px;
		position: absolute;
		top: -58px;
		right: -128px;
		background: url(../../../../wx/src/img/volunteer/vol_close_icon.png) no-repeat;
		background-size: 54px 54px;
		cursor: pointer;
	}
	.vol-order-detail {
		width: 1200px;
		margin: 0 auto;
		position: relative;
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
		border-bottom: 5px solid #e8d7c0;
		overflow: hidden;
		margin: 0 auto;
	}
	
	.status-date {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 18px;
		color: #000;
		line-height: 30px;
	}
	
	.time-info>span {
		display: block;
		float: left;
		height: 5px;
		background: #000;
		margin-top: 15px;
	}
	
	.number-time {
		width: 1200px;
		height: 76px;
		background: #F7F2EA;
		padding: 8px 25px;
	}
	
	.number-time p {
		font-size: 16px;
		color: #000;
		line-height: 30px;
	}
	
	.order-detail {
		width: 1198px;
		overflow: hidden;
		border: 1px solid #AAA;
		margin-top: 20px;
		cursor: pointer;
		margin-bottom: 30px;
	}
	
	.order-detail img {
		display: block;
		float: left;
		width: 453px;
		height: 197px;
		margin: 20px;
	}
	
	.info-box {
		padding-left: 5px;
		font-size: 16px;
		color: #000;
	}
	
	.active-title {
		font-size: 20px;
		line-height: 20px;
		margin-top: 23px;
		margin-bottom: 15px;
	}
	
	.active-time,
	.active-place,
	.serve-time {
		color: rgba(0, 0, 0, .8);
		line-height: 16px;
		margin: 12px 0;
	}
	
	.see-detail {
		font-size: 16px;
		color: #B47C2D;
		line-height: 36px;
		cursor: pointer;
	}
	
	.cancel-btn {
		width: 218px;
		height: 46px;
		border: 1px solid #C39657;
		border-radius: 23px;
		margin: 60px auto;
		color: #C39657;
		font-size: 16px;
		line-height: 46px;
		text-align: center;
		cursor: pointer;
	}
	/*活动详情*/
	
	.zhezhao {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 9999;
		cursor: pointer;
	}
	.detail-box{
		background: #fff;
		z-index: 10000;
		height: 80%;
	}
	.vol-recruit-detail {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
		height: 100%;
		overflow-y: auto;
	}
	
	.title {
		margin: 60px 0 40px 0;
		text-align: center;
		font-size: 20px;
		color: #000;
	}
	
	.main-info {
		width: 1038px;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.main-info p {
		width: 519px;
		float: left;
		font-size: 16px;
		line-height: 36px;
		color: rgba(0, 0, 0, .8);
	}
	
	.recruit-box {
		width: 1038px;
		height: 56px;
		background: #F7F2EA;
		border-radius: 28px;
		margin: 50px auto;
	}
	
	.recruit-box p {
		float: left;
		font-size: 16px;
		line-height: 56px;
		color: rgba(0, 0, 0, .8);
	}
	
	.active-intro {
		width: 1038px;
		font-size: 24px;
		line-height: 24px;
		margin: 0 auto;
		margin-bottom: 24px;
		color: rgba(0, 0, 0, .8);
	}
	
	.active-img {
		display: block;
		width: 1038px;
		height: 550px;
		margin: 0 auto;
		margin-bottom: 40px;
	}
	
	.active-content {
		width: 1038px;
		color: #000;
		font-size: 16px;
		line-height: 24px;
		margin: 0 auto;
		margin-bottom: 50px;
	}
	
</style>