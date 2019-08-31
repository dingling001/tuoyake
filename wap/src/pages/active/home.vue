<template>
	<div style="overflow: hidden;" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
		<div class="active-type common-li">
			<div class="all-box">
				<div :class="{type_selected:typeActVal == 0}" @click="selectType(0,0)" class="all">全部</div>
			</div>
			<ul>
				<li v-for="(item,index) in activeTypeList" :class="{type_selected:typeActVal == index+1}" @click="selectType(index+1,item.cate_id)">{{item.cate_name}}</li>
			</ul>
		</div>
		<div class="price-type common-li">
			<div class="all-box">
				<div class="all" :class="{type_selected:cost == 0}" @click="selectPrice(0)">全部</div>
			</div>
			<ul>
				<li :class="{type_selected:cost == 1}" @click="selectPrice(1)">免费</li>
				<li :class="{type_selected:cost == 2}" @click="selectPrice(2)">收费</li>
			</ul>
		</div>
		<div class="active-list">
			<ul>
				<li v-for="(item,index) in activeList" @click="$router.push({path:'/active/activedetail',query:{active_id:item.active_id}})">
					<img :src="item.active_img" />
					<div class="img-rt">
						<p class="active-name two-line-text">{{item.active_name}}</p>
						<p class="active-time single-line-text">{{item.active_date}}</p>
						<p class="labels single-line-text">{{item.cate_name}} {{item.is_type == 2?'亲子活动':''}}</p>
						<div class="active-price">
							<span style="font-size: 18px;" v-if="item.default_price == 0">免费</span>
							<span style="font-size: 18px;" v-if="item.default_price > 0">￥{{item.default_price}}/{{item.is_type == 1?'人':'组'}}</span>
							<div :class="{forbid_click:item.active_status != 1}">{{item.active_status_show}}</div>
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
				cost: 0, //0全部 1是免费 2是收费
				cate_id: 0, //分类id 默认是0 0是全部
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
			v.getActiveApplyList(v.cate_id, v.cost, v.page)
		},
		methods: {
			selectPrice(val) {
				Indicator.open();
				this.page = 1;
				this.cost = val;
				this.getActiveApplyList(this.cate_id, this.cost, this.page)
			},
			selectType(val, val1) {
				Indicator.open();
				this.page = 1;
				this.typeActVal = val;
				this.cate_id = val1;
				this.getActiveApplyList(this.cate_id, this.cost, this.page)
			},
			getActiveType() {
				this.$api.activeType().then(res => {
					this.activeTypeList = res.data
				})
			},
			getActiveApplyList(cate_id, cost, page) {
				const v = this;
				v.$api.activeApplyList(cate_id, cost, page).then(res => {
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
						v.$api.activeApplyList(v.cate_id, v.cost, v.page).then(res => {
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
	
	.active-type {
		height: 40px;
	}
	
	.price-type {
		height: 20px;
		margin-bottom: 10px;
	}
	
	.common-li .all-box {
		float: left;
		width: 75px;
		text-align: center;
	}
	
	.active-type .all-box {
		height: 40px;
		line-height: 40px;
	}
	
	.price-type .all-box {
		height: 20px;
	}
	
	.common-li ul {
		width: calc(100% - 75px);
		white-space: nowrap;
		float: left;
		overflow-x: scroll;
		overflow-y: hidden;
		font-size: 0;
	}
	.active-type ul li{
		margin: 10px 0;
	}
	.common-li li,
	.all {
		height: 20px;
		font-size: 13px;
		color: #4A4A4A;
		line-height: 20px;
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
		margin: 0 auto;
		border-bottom: 1px solid #E5E5E5;
	}
	
	.active-list li:first-child {
		border-top: 1px solid #E5E5E5;
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
	
	.active-price>div {
		height: 20px;
		line-height: 20px;
		color: #fff;
		font-size: 12px;
		background: #B47C2D;
		border-radius: 10px;
		padding: 0 12px;
		float: right;
	}
	
	.active-price .forbid_click {
		background: #CECECE;
	}
	
	.loading-text {
		line-height: 40px;
		text-align: center;
		color: #ccc;
	}
</style>