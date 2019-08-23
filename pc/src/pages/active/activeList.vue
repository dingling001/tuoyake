<template>
	<div>
		<div class="topbar-wrapper">
			<div class="topbar">
				<a href="/">{{$t('navs[0].name')}}</a>
				»
				<a href='/active/index'>{{$t('navs[6].name')}}</a>
				» {{active_cate == 1?'最新活动':'活动回顾'}}
			</div>
		</div>
		<div class="active-list-box">
			<div class="active-type">
				<ul>
					<li :class="{type_selected:cate_id == 0}" @click="selectType(0)">全部</li>
					<li v-for="(item,index) in typeList" :class="{type_selected:cate_id == item.cate_id}" @click="selectType(item.cate_id)">
						{{item.cate_name}}
					</li>
				</ul>
			</div>
			<div class="price-type">
				<ul>
					<li :class="{type_selected:cost == 0}" @click="selectPriceType(0)">全部</li>
					<li :class="{type_selected:cost == 2}" @click="selectPriceType(2)">收费</li>
					<li :class="{type_selected:cost == 1}" @click="selectPriceType(1)">免费</li>
				</ul>
			</div>
			<div class="line">

			</div>
			<div class="active-list">
				<ul>
					<li v-show="activeList.length == 0 && !isLoading" class="no-data">暂无数据</li>
					<li v-for="(item,index) in activeList" @click="$router.push({path:'/active/activedetail',query:{active_id:item.active_id,active_cate:active_cate}})">
						<img :src="$toThumbsimg(item.active_img, 588, 240, 33,$active)" />
						<div class="active-info">
							<p>{{item.active_name}}</p>
							<p>活动时间：{{item.active_date}}</p>
							<p>活动地点：{{item.active_place}}</p>
							<p>活动类型：{{item.cate_name}}</p>
							<p class="three-line-text">{{item.content}}</p>
							<div class="price-btn">
								<span v-if="item.default_price == 0">免费</span>
								<span v-if="item.default_price > 0">¥{{item.default_price}}</span>
								<input type="button" :value="item.active_status_show" :class="{forbid_click:item.active_status != 1}" />
							</div>
						</div>
					</li>
				</ul>
			</div>
			<Pcloading v-if="isLoading"></Pcloading>
			<page :totalPages='totalPages' @presentPage='getPresentPage' v-if="totalPages > 1" style="margin-bottom: 20px;"></page>
		</div>
	</div>
</template>

<script>
	import page from "../../components/pcpaging.vue";
	import Pcloading from "../../components/pcloading.vue";
	export default {
		data() {
			return {
				typeList: [], //活动类型列表
				activeList: [], //活动列表
				cost: 0, //0全部 1是免费 2是收费
				cate_id: 0, //分类id 默认是0 0是全部
				page: 0, //当前页
				isLoading: true, //是否显示loading弹窗
				totalPages: 0, //总页数
				active_cate: '',
			}
		},
		mounted() {
			const v = this;
			v.active_cate = v.$route.query.active_cate;
			v.isLoading = true;
			v.getActiveType();
			v.getActiveList(v.cate_id, v.cost, v.page)
		},
		methods: {
			getPresentPage(val) {
				const v = this;
				v.isLoading = true;
				v.getActiveList(v.cate_id, v.cost, val);
				v.page = val
			},
			selectPriceType(val) {
				const v = this;
				v.totalPages = 0;
				v.page = 0;
				v.isLoading = true;
				v.cost = val;
				v.getActiveList(v.cate_id, v.cost, v.page)
			},
			selectType(val) {
				const v = this;
				v.totalPages = 0;
				v.page = 0;
				v.isLoading = true;
				v.cate_id = val;
				v.getActiveList(v.cate_id, v.cost, v.page)
			},
			getActiveType() {
				const v = this;
				v.$api.activeType().then(res => {
					v.typeList = res.data
				})
			},
			getActiveList(cate_id, cost, page) {
				const v = this;
				setTimeout(function() {
					v.$api.activeApplyList(cate_id, cost, page, v.$route.query.active_cate).then(res => {
						v.isLoading = false;
						v.activeList = res.data.list;
						v.totalPages = Math.ceil(res.data.count / 8);
					})
				}, 500)
			}
		},
		components: {
			page,
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
	
	.active-list-box {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	
	.active-type {
		overflow: hidden;
		margin-top: 27px;
	}
	
	.price-type {
		overflow: hidden;
		margin-bottom: 14px;
	}
	/*活动类型-是否收费*/
	
	.active-type li,
	.price-type li {
		float: left;
		font-size: 18px;
		color: #000;
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
		margin-right: 20px;
		border-radius: 4px;
		cursor: pointer;
	}
	
	.active-type li {
		margin-bottom: 16px;
	}
	
	.active-type .type_selected,
	.price-type .type_selected {
		background: #B47C2D;
		color: #fff;
	}
	/*横线*/
	
	.line {
		width: 1200px;
		height: 5px;
		background: rgba(180, 124, 45, .3);
	}
	/*活动列表*/
	
	.active-list {
		margin-bottom: 25px;
		min-height: 280px;
	}
	
	.active-list li {
		width: 1200px;
		height: 280px;
		padding: 20px 0;
		border-bottom: 1px solid rgba(0, 0, 0, .1);
		cursor: pointer;
	}
	
	.active-list .no-data {
		border: 0;
		line-height: 240px;
		text-align: center;
		color: #ccc;
		font-size: 16px;
		pointer-events: none;
	}
	
	.active-list li img {
		display: block;
		float: left;
		width: 588px;
		height: 240px;
	}
	
	.active-list li .active-info {
		color: #000;
		font-size: 16px;
		float: left;
	}
	
	.active-list li .active-info p {
		line-height: 24px;
		margin: 0;
		margin-left: 35px;
		width: 565px;
	}
	
	.active-list li .active-info p:first-child {
		font-size: 20px;
		margin-bottom: 10px;
	}
	
	.active-list li .price-btn {
		width: 565px;
		height: 40px;
		line-height: 40px;
		margin-left: 35px;
		margin-top: 15px;
	}
	
	.active-list li .price-btn span {
		color: #CF0A0A;
		font-size: 18px;
		float: left;
	}
	
	.active-list li .price-btn input {
		display: block;
		width: 133px;
		height: 40px;
		text-align: center;
		color: #fff;
		font-size: 16px;
		border-radius: 20px;
		background: #B47C2D;
		border: 0;
		float: right;
		outline: none;
		cursor: pointer;
		line-height: 40px;
	}
	
	.active-list li .price-btn .forbid_click {
		background: #BEBEBE;
		color: #fff;
	}
</style>