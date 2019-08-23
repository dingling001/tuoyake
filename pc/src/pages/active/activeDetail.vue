<template>
	<div>
		<div class="topbar-wrapper">
			<div class="topbar">
				<a href="/">{{$t('navs[0].name')}}</a>
				»
				<a href='/active/index'>{{$t('navs[6].name')}}</a>
				»
				<a href="/active/activelist?active_cate=1" v-if="active_cate == 1">最新活动</a>
				<a href="/active/activelist?active_cate=2" v-if="active_cate == 2">活动回顾</a>
				<a href="/active/index" v-if="active_cate == 3">活动推荐</a>
				» {{objDetail.active_name}}
			</div>
		</div>
		<div class="active-detail">
			<div class="info-title" v-if="detailStatus == 1">选择参加场次</div>
			<div class="time-info" v-if="detailStatus == 1">
				<span style="width: 50px;"></span>
				<span style="width: 5px;margin-left: 5px;"></span>
			</div>
			<div class="step-bar" v-if="detailStatus == 1">
				<el-steps :active="1" align-center>
					<el-step class="step1" title="选择参加场次" icon="icon"></el-step>
					<el-step class="step2" title="填写报名信息" icon="icon"></el-step>
					<el-step class="step3" title="确认信息" icon="icon"></el-step>
					<el-step class="step4" title="报名结果" icon="icon"></el-step>
				</el-steps>
			</div>
			<img :src="$toThumbsimg(objDetail.active_img, 1080, 470, 33,$active)" />
			<div class="active-info">
				<p class="active-name">{{objDetail.active_name}}</p>
				<p class="active-time"><span>时间：</span>{{objDetail.active_date}}</p>
				<p class="active-place"><span>地点：</span>{{objDetail.active_place}}</p>
				<p class="active-num"><span>名额：</span>{{objDetail.count_num}}人<span style="margin-left: 50px;" v-if="detailStatus == 1">已报名{{objDetail.order_count_num}}人</span></p>
				<p class="active-price" v-if="objDetail.default_price == 0"><span>费用：</span><span style="color: #E8593E;">免费</span></p>
				<p class="active-price" v-if="objDetail.default_price > 0"><span>费用：</span><span style="color: #E8593E;">￥{{objDetail.default_price}}</span>/{{objDetail.is_type == 1?'人':'组'}}</p>
				<p v-html="objDetail.info" class="active-info"></p>
			</div>
			<div class="active-session" v-if="detailStatus == 1">
				<p><span>选择活动场次</span><span style="margin-left: 30px;">已报名{{objDetail.order_count_num}} / {{objDetail.count_num}}人</span></p>
				<ul>
					<li v-if="index < timeListVal" v-for="(item,index) in timeList" :key="index" :class="{selected_time_act:active_time_id == item.id}" @click="selectTime(item.id,item.time)">
						{{item.time}}
					</li>
					<li v-if="timeList.length > 8" @click="showMore()">{{moreText}}</li>
				</ul>
			</div>
			<div class="apply-btn" :class="{forbid_click:applyBtnStatus}" @click="applyActive()" v-if="detailStatus == 1">
				{{applyBtnText}}
			</div>
			<div class="zhezhao" v-show="isShow">

			</div>
			<div class="apply-notice fixed-center" v-show="isShow">
				<p>报名须知</p>
				<div class="notice-info">
					{{objDetail.remark}}
				</div>
				<div class="btns">
					<input type="button" value="取消" class="cancel-btn" @click="isShow = false" />
					<input type="button" value="下一步" class="next-btn" @click="nextStep()" />
				</div>
			</div>
			<div class="tip">
				{{tipText}}
			</div>
		</div>
		<Pcloading v-if="isLoading"></Pcloading>
	</div>
</template>

<script>
	import Pcloading from "../../components/pcloading.vue";
	export default {
		data() {
			return {
				moreText: '更多场次',
				timeListVal: 8,
				objDetail: {},
				timeList: [],
				isShow: false,
				active_time_id: '', //时段id
				tipText: '', //提示文案
				applyBtnText: '',
				applyBtnStatus: false,
				active_cate: '',
				isLoading: false, //是否显示loading弹窗
				detailStatus:'',//当前活动状态
			}
		},
		mounted() {
			const v = this;
			v.active_cate = v.$route.query.active_cate;
			v.getActiveDetail(v.$route.query.active_id);
			v.getTimeList(v.$route.query.active_id);
			localStorage.active_id = v.$route.query.active_id;
		},
		methods: {
			showMore() {
				const v = this;
				v.timeListVal = v.timeListVal == 8 ? v.timeList.length : 8;
				v.moreText = v.timeListVal == 8 ? '更多场次' : '收起更多'
			},
			hideText() {
				setTimeout(() => {
					this.tipText = ''
				}, 2000)
			},
			nextStep() {
				const v = this;
				localStorage.activeName = v.objDetail.active_name;
				localStorage.activePlace = v.objDetail.active_place;
				localStorage.is_type = v.objDetail.is_type;
				localStorage.adult_age_limit_min = v.objDetail.adult_age_limit_min;
				localStorage.adult_age_limit_max = v.objDetail.adult_age_limit_max;
				if(v.objDetail.is_type == 2) {
					localStorage.children_age_limit_min = v.objDetail.children_age_limit_min;
					localStorage.children_age_limit_max = v.objDetail.children_age_limit_max;
				}
				localStorage.default_price = v.objDetail.default_price;
				v.$router.push('/active/fillinfo')
			},
			selectTime(val, val1) {
				const v = this;
				v.isLoading = true;
				setTimeout(function(){
					v.$api.timeMsg(v.$route.query.active_id, val).then(res => {
						v.isLoading = false;
						v.applyBtnText = res.data.button_show;
						if(res.data.button_status != 1) {
							v.applyBtnStatus = true
						} else {
							v.applyBtnStatus = false
						}
					})
					localStorage.active_time_id = val;
					localStorage.selected_time = val1;
					v.active_time_id = val;
				},500)
			},
			getActiveDetail(val) {
				const v = this;
				v.$api.activeDetail(val).then(res => {
					v.objDetail = res.data;
					v.applyBtnText = res.data.active_status_show;
					v.detailStatus = res.data.active_status;
					if(res.data.active_status != 1) {
						v.applyBtnStatus = true
					}
				})
			},
			getTimeList(val) {
				const v = this;
				v.$api.timeList(val).then(res => {
					v.timeList = res.data;
				})
			},
			applyActive() {
				const v = this;
				if(v.active_time_id == '') {
					v.tipText = '请选择活动场次';
					v.hideText();
					return false;
				}
				v.isShow = true
			}
		},
		components: {
			Pcloading
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.topbar-wrapper {
		background-color: #e7e7e7;
		height: 75px;
		line-height: 75px;
		.topbar {
			width: 1200px;
			margin: 0 auto;
			height: 75px;
			line-height: 75px;
			color: #000;
			font-size: 18px;
		}
		.topbar a {
			text-decoration: none;
			color: #000;
			margin: 0 4px;
		}
		.topbar a:hover {
			color: #b47c2d;
		}
	}
	
	.active-detail {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
		padding-bottom: 60px;
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
		margin-bottom: 30px;
	}
	
	.step-bar {
		width: 730px;
		position: absolute;
		right: -55px;
		top: 50px;
	}
	
	/deep/ .el-step__title {
		color: #000!important;
		font-weight: 700;
	}
	
	/deep/ .icon {
		width: 40px;
		height: 23px;
		background-position: left center;
	}
	
	/deep/ .is-finish .icon {
		height: 35px;
	}
	
	/deep/ .step1 .icon {
		background: url(../../img/active/pc_avtive_act1.png) no-repeat;
	}
	
	/deep/ .step2 .icon {
		background: url(../../img/active/pc_avtive_step2.png) no-repeat;
	}
	
	/deep/ .step3 .icon {
		background: url(../../img/active/pc_avtive_step3.png) no-repeat;
	}
	
	/deep/ .step4 .icon {
		background: url(../../img/active/pc_avtive_step4.png) no-repeat;
	}
	
	.time-info span {
		display: block;
		float: left;
		height: 5px;
		background: #000;
		margin-top: 15px;
	}
	
	.active-detail img {
		display: block;
		width: 1080px;
		height: 470px;
		margin: 40px auto;
	}
	
	.active-info {
		width: 1080px;
		margin: 0 auto;
	}
	
	.active-info p {
		font-size: 16px;
		line-height: 30px;
	}
	
	.active-info p span {
		color: #9B9B9B;
	}
	
	.active-info .active-name {
		font-size: 20px;
		color: #353535;
		margin-bottom: 15px;
		line-height: 20px;
	}
	
	.active-session {
		width: 1080px;
		margin: 0 auto;
	}
	
	.active-session p {
		width: 1040px;
		font-size: 20px;
		color: #212121;
		line-height: 20px;
		padding: 15px 0;
		border-bottom: 1px solid #B2B2B2;
		margin-top: 25px;
	}
	
	.active-session ul {
		overflow: hidden;
		width: 1089px;
	}
	
	.active-session li {
		width: 318px;
		height: 44px;
		float: left;
		border: 1px solid #B47C2D;
		border-radius: 6px;
		margin: 15px 43px 0 0;
		color: #000;
		font-size: 18px;
		cursor: pointer;
		line-height: 44px;
		text-align: center;
	}
	
	.active-session .selected_time_act {
		background: url(../../img/active/selected_time.png) no-repeat bottom right;
	}
	
	.apply-btn {
		width: 374px;
		height: 46px;
		background: #B47C2D;
		border-radius: 23px;
		margin: 60px auto;
		margin-bottom: 0;
		text-align: center;
		line-height: 46px;
		color: #fff;
		font-size: 18px;
		cursor: pointer;
	}
	
	.forbid_click {
		background: #BEBEBE;
		color: #fff;
		pointer-events: none;
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
	
	.apply-notice {
		background: #fff;
		border-radius: 6px;
		width: 900px;
		overflow: hidden;
	}
	
	.apply-notice p {
		text-align: center;
		color: #B47C2D;
		font-size: 24px;
		line-height: 24px;
		margin: 70px 0 40px 0;
	}
	
	.apply-notice .notice-info {
		width: 670px;
		margin: 0 auto;
	}
	
	.apply-notice .btns {
		width: 575px;
		overflow: hidden;
		margin: 70px auto;
	}
	
	.apply-notice .btns input {
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		float: left;
	}
	
	.apply-notice .btns .cancel-btn {
		width: 238px;
		height: 46px;
		border: 1px solid #B47C2D;
		border-radius: 23px;
		background: #fff;
		color: #B47C2D;
	}
	
	.apply-notice .btns .next-btn {
		width: 240px;
		height: 48px;
		border-radius: 24px;
		background: #B47C2D;
		color: #fff;
		margin-left: 95px;
	}
</style>