<template>
	<div class="active-detail">
		<img :src="dataObj.active_img" />
		<p class="title">{{dataObj.active_name}}</p>
		<p class="time"><span>时间：</span>{{dataObj.active_date}}</p>
		<p class="place single-line-text"><span>地点：</span>{{dataObj.active_place}}</p>
		<p class="num"><span>名额：</span>{{dataObj.count_num}}人</p>
		<p class="price" v-if="dataObj.is_type == 2">
			<span>费用：</span>
			<span style="margin-left: 10px;color: #353535;">亲子</span>
			<span style="color: #DC613A;" v-if="dataObj.default_price == 0">免费</span>
			<span style="color: #DC613A;" v-if="dataObj.default_price > 0">￥{{dataObj.default_price}} / 组 </span>
		</p>
		<p class="price" v-if="dataObj.is_type == 1">
			<span>费用：</span>
			<span style="color: #DC613A;" v-if="dataObj.default_price == 0">免费</span>
			<span style="color: #DC613A;" v-if="dataObj.default_price > 0">￥{{dataObj.default_price}} / 人</span>
		</p>
		<p class="intro" v-html="dataObj.info"></p>
		<div class="status-btn" @click="isShow = true" :class="{forbid_click:dataObj.active_status != 1}">
			{{btnText}}
		</div>
		<div class="zhezhao" v-if="isShow">

		</div>
		<div class="notice fixed-center" v-if="isShow">
			<div class="close">
				<img src="../../img/active/active_close.png" @click="isShow = false" />
			</div>
			<div class="notice-box">
				<p class="notice-title">报名须知</p>
				<p class="remark">{{dataObj.remark}}</p>
				<div class="continue" @click="continueTo()">
					确定并继续
				</div>
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="popup-box">
				<div class="popup-top">
					<span @click="cancel()">取消</span>
				</div>
				<div class="popup-title">
					<div style="font-size: 18px;color: #353535;">
						选择参加场次
					</div>
					<div style="font-size: 13px;color: #CC974C;text-align: center;">
						已报名{{dataObj.order_count_num}}/{{dataObj.count_num}}人
					</div>
				</div>
				<div class="time-frame">
					<ul>
						<li v-for="(item,index) in timeFrame" :class="{forbid_select:item.active_status != 1,select_act:active_time_id == item.id,select_act_one:active_time_id == item.id && item.active_status != 1}" @click="selectTime(item.id,item.time)">
							<p>
								<span>{{item.time.slice(0,10)}}</span>
								<span class="common-span">{{item.time.slice(11,13)}}</span>
							</p>
							<p>
								<span>{{item.time.slice(14,25)}}</span>
								<span v-if="item.active_status == 2" class="common-span">已满</span>
								<span v-if="item.active_status == 3" class="common-span">已结束</span>
								<span v-if="item.active_status == 4" class="common-span">未开始</span>
								<span v-if="item.active_status == 5" class="common-span">已结束</span>
							</p>
						</li>
					</ul>
				</div>
				<div class="apply-btn" @click="apply()" :class="{forbid_click:forbidStatus}">
					{{frameBtnText}}
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import { Popup, Toast } from 'mint-ui';
	export default {
		data() {
			return {
				dataObj: {},
				isShow: false,
				popupVisible: false,
				timeFrame: [],
				active_time_id: '',
				btnText: '',
				frameBtnText: '我要报名',
				forbidStatus: false,
			}
		},
		mounted() {
			const v = this;
			localStorage.active_id = v.$route.query.active_id;
			v.$api.activeDetail(v.$route.query.active_id).then(res => {
				v.dataObj = res.data;
				v.btnText = res.data.active_status_show;
				localStorage.active_name = res.data.active_name;
				localStorage.active_place = res.data.active_place;
				localStorage.default_price = res.data.default_price
			});
			v.$api.timeList(v.$route.query.active_id).then(res => {
				v.timeFrame = res.data
			})
		},
		methods: {
			apply() {
				const v = this;
				localStorage.is_type = v.dataObj.is_type;
				localStorage.adult_age_limit_min = v.dataObj.adult_age_limit_min;
				localStorage.adult_age_limit_max = v.dataObj.adult_age_limit_max;
				if(v.dataObj.is_type == 2) {
					localStorage.children_age_limit_min = v.dataObj.children_age_limit_min;
					localStorage.children_age_limit_max = v.dataObj.children_age_limit_max;
				}
				if(v.active_time_id == '') {
					alert('请选择参见场次')
				} else {
					v.$router.push('/active/addVisitor')
				}
			},
			selectTime(val, val1) {
				const v = this;
				v.$api.wxTimeMsg(v.$route.query.active_id, val).then(res => {
					if(res.status == 1) {
						v.frameBtnText = res.data.button_show;
						if(res.data.button_status == 1) {
							v.forbidStatus = false
						} else {
							v.forbidStatus = true
						}
					} else {
						Toast(res.msg);
					}
				})
				v.active_time_id = val;
				localStorage.active_time_id = val;
				localStorage.selected_time = val1;
			},
			cancel() {
				this.popupVisible = false
			},
			continueTo() {
				this.isShow = false;
				this.popupVisible = true
			}
		}
	}
</script>

<style scoped>
	.popup-box {
		width: 375px;
	}
	
	.popup-top {
		width: 375px;
		height: 45px;
		background: #F1F1F1;
		line-height: 45px;
	}
	
	.popup-top span {
		font-size: 18px;
		color: #606060;
		margin-left: 20px;
	}
	
	.popup-title {
		overflow: hidden;
		margin-left: 11px;
		height: 54px;
		line-height: 54px;
	}
	
	.popup-title>div {
		width: 170px;
		float: left;
	}
	
	.time-frame {
		overflow: hidden;
	}
	
	.time-frame li {
		width: 168px;
		height: 40px;
		border: 1px solid #B5B5B5;
		float: left;
		border-radius: 5px;
		margin-left: 11px;
		margin-bottom: 5px;
		color: #353535;
		padding: 4px 10px;
		overflow: hidden;
	}
	
	.time-frame li p {
		line-height: 16px;
		font-size: 14px;
	}
	
	.common-span {
		margin-left: 10px;
	}
	
	.time-frame .forbid_select {
		padding: 5px 10px;
		color: #777;
		background: #F0F0F0;
	}
	
	.time-frame .select_act {
		border: 0;
		background: #CC974C;
		color: #fff;
	}
	
	.time-frame .select_act_one {
		background: #B0B0B0;
	}
	
	.apply-btn {
		width: 347px;
		height: 47px;
		border-radius: 24px;
		background: #CC974C;
		margin: 11px auto;
		color: #fff;
		font-size: 18px;
		text-align: center;
		line-height: 47px;
		outline: none;
	}
	
	.active-detail>img {
		display: block;
		width: 352px;
		height: 200px;
		margin: 12px;
		border-radius: 4px;
	}
	
	.active-detail>p {
		width: 336px;
		margin: 0 auto;
	}
	
	.title {
		font-size: 18px;
		color: #353535;
	}
	
	.time,
	.place,
	.num,
	.price {
		font-size: 14px;
		height: 50px;
		line-height: 50px;
	}
	
	.time,
	.place,
	.num {
		color: #363636;
		border-bottom: 1px solid #DADADA;
	}
	
	.time span,
	.place span,
	.num span,
	.price span {
		color: #9B9B9B;
	}
	
	.intro {
		width: 338px;
		margin: 0 auto;
		font-size: 14px;
		color: #353535;
		line-height: 23px;
	}
	/deep/ .intro img{
		display: block;
		max-width: 100%;
		margin: 0 auto;
	}
	.active-detail .status-btn {
		position: fixed;
		bottom: 5px;
		left: 14px;
		width: 347px;
		height: 48px;
		border-radius: 24px;
		background: #BD8C47;
		color: #fff;
		font-size: 18px;
		line-height: 48px;
		text-align: center;
	}
	
	.active-detail .forbid_click {
		pointer-events: none;
		color: #fff;
		background: #CECECE;
	}
	
	.active-detail {
		padding-bottom: 58px;
	}
	
	.zhezhao {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		z-index: 1201;
	}
	
	.notice {
		width: 347px;
	}
	
	.notice-box {
		width: 293px;
		overflow: hidden;
		margin: 0 auto;
		border-radius: 10px;
		background: #fff;
	}
	
	.notice-box .notice-title {
		width: 293px;
		font-size: 20px;
		color: #BD8C47;
		text-align: center;
		margin: 30px 0 25px 0;
	}
	
	.notice-box .remark {
		width: 240px;
		font-size: 14px;
		line-height: 25px;
		color: #353535;
		margin: 0 auto;
	}
	
	.notice-box .continue {
		display: block;
		width: 200px;
		height: 38px;
		background: #BD8C47;
		border-radius: 19px;
		color: #fff;
		font-size: 18px;
		margin: 23px auto;
		text-align: center;
		line-height: 38px;
	}
	
	.close {
		width: 100%;
		height: 19px;
	}
	
	.close img {
		display: block;
		width: 17px;
		height: 17px;
		float: right;
	}
</style>