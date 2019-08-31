<template>
	<div style="overflow: hidden;" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
		<div class="active-type common-li" style="margin-top: 15px;">
			<ul>
				<li :class="{type_selected:typeActVal == 0}" @click="selectType(0,0)">全部</li>
				<li v-for="(item,index) in activeTypeList" :class="{type_selected:typeActVal == index+1}" @click="selectType(index+1,item.id)">{{item.title}}</li>
			</ul>
		</div>
		<div class="active-list">
			<ul>
				<li v-for="(item,index) in activeList" @click="$router.push({path:'/volunteer/voldetail',query:{active_id:item.id}})">
					<img :src="$toThumbsimg(item.img,164,98,33,$vol)" />
					<div class="img-rt">
						<p class="active-name two-line-text">{{item.title}}</p>
						<p class="active-time single-line-text">{{item.active_date}}</p>
						<p class="labels single-line-text">{{item.recruit_job}}</p>
						<div class="active-price">
							<span style="font-size: 18px;">{{item.service_time}}小时</span>
							<div :class="{no_status:item.recruit_status != 2}">{{item.recruit_status_show}}</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<mt-spinner :type="2" :size="40" v-if="showSpinner"></mt-spinner>
		<div class="loading-text" v-if="!showSpinner">
			{{loadText}}
		</div>
	</div>
</template>
<script>
	import { Indicator, InfiniteScroll, Spinner } from 'mint-ui';
	export default {
		name: "home",
		data() {
			return {
				activeTypeList: [], //活动类型列表
				typeActVal: 0, //被选中的活动类型
				activeList: [], //活动列表
				recruit_job_id: 0, //分类id 默认是0 0是全部
				page: 1, //当前页
				loading: false,
				totalPage: 0,
				loadText: '',
				showSpinner: false
			};
		},
		mounted() {
			const v = this;
			Indicator.open();
			v.getActiveType();
			v.getActiveApplyList(v.page, '');
		},
		methods: {
			selectType(val, val1) {
				const v = this;
				v.loadText = '';
				Indicator.open();
				v.page = 1;
				v.typeActVal = val;
				v.recruit_job_id = val1;
				v.getActiveApplyList(v.page, val1)
			},
			getActiveType() {
				this.$api.jobList().then(res => {
					this.activeTypeList = res.data
				})
			},
			getActiveApplyList(page, recruit_job_id) {
				const v = this;
				v.$api.volList(page, recruit_job_id).then(res => {
					Indicator.close();
					v.activeList = res.data.list;
					v.totalPage = Math.ceil(res.data.count / 8);
					if(v.totalPage > v.page) {
						v.showSpinner = true;
						v.loading = false;
					} else if(res.data.count == 0) {
						v.showSpinner = false;
						v.loadText = '暂无数据';
					} else if(v.totalPage == v.page) {
						v.showSpinner = false;
						v.loadText = '暂无更多';
					}
				})
			},
			loadMore() {
				const v = this;
				if(v.totalPage > v.page) {
					v.loadText = '';
					v.loading = true;
					v.page++;
					setTimeout(function() {
						v.$api.volList(v.page, v.recruit_job_id).then(res => {
							v.activeList = [...v.activeList, ...res.data.list];
							v.totalPage = Math.ceil(res.data.count / 8);
							v.loading = false;
						})
					}, 500);
				} else {
					v.showSpinner = false;
					v.loadText = '暂无更多';
					v.loading = true;
				}

			}
		}
	};
</script>
<style scoped>
	/deep/ .mint-spinner-triple-bounce {
		text-align: center;
		margin: 10px 0;
	}
	
	.common-li {
		overflow-x: auto;
		padding: 0 18px;
		margin-bottom: 12px;
	}
	
	.common-li ul {
		white-space: nowrap;
	}
	
	.common-li li {
		font-size: 13px;
		color: #4A4A4A;
		line-height: 19px;
		padding: 0 10px;
		display: inline-block;
		border-radius: 10px;
	}
	
	.common-li .type_selected {
		background: #B47C2D;
		color: #fff;
	}
	
	.active-list li {
		width: 352px;
		height: 128px;
		padding: 15px 0;
		margin: 0 12px;
		border-bottom: 1px solid #E5E5E5;
	}
	
	.active-list li img {
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
	
	.active-price div {
		height: 20px;
		line-height: 20px;
		color: #fff;
		font-size: 12px;
		background: #B47C2D;
		border-radius: 10px;
		padding: 0 12px;
		float: right;
		border: 0;
	}
	
	.active-price .no_status {
		background: #CCC;
		color: #fff;
	}
	
	.loading-text {
		line-height: 40px;
		text-align: center;
		color: #ccc;
	}
</style>