<template>
	<div class="explain-detail">
		<div class="detail-box">
			<div class="active-name">
				{{dataObj.title}}
			</div>
			<p><span>活动时间：</span><span class="span-val">{{dataObj.active_date}}</span></p>
			<p><span>活动地点：</span><span class="span-val">{{dataObj.active_place}}</span></p>
			<p><span>活动岗位：</span><span class="span-val">{{dataObj.recruit_job}} </span><span style="margin-left: 35px;">服务时长：</span><span class="span-val">{{dataObj.service_time}}小时 </span></p>
			<p><span>活动状态：</span><span class="span-val">{{dataObj.order_status_show}}</span></p>
			<p><span>签到时间：</span><span class="span-val">{{dataObj.i_qd_time}}</span></p>
			<p class="last-p"><span>签退时间：</span><span class="span-val">{{dataObj.i_qt_time}}</span></p>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				dataObj:{}
			}
		},
		mounted(){
			this.getDetail()
		},
		methods:{
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
	.explain-detail{
		min-height: calc(100vh - 60px);
		background: #F2F2F2;
	}
	.detail-box{
		background: #fff;
		margin-top: 5px;
		padding: 0 20px;
	}
	.active-name{
		font-size: 22px;
		color: #353535;
		line-height: 30px;
		padding: 10px 0;
		border-bottom: 1px solid #DADADA;
	}
	.detail-box p{
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		border-bottom: 1px solid #DADADA;
		color: #9B9B9B;
	}
	.detail-box p span{
		float: left;
	}
	.detail-box .last-p{
		border: 0;
	}
	.detail-box .span-val{
		color: #363636;
	}
</style>