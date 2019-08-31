<template>
	<div class="order-record" style="overflow: hidden;" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
		<div class="no-data" v-if="orderList.length == 0 && requested">
			<img src="../../img/active/wx_no_data_icon.png" />
			<p>您还没有进行过预约</p>
			<p style="font-size: 15px;color: #B47C2D;" @click="$router.push('/active/activeList')">快去预约吧～</p>
		</div>
		<ul v-if="orderList.length > 0">
			<li v-for="(item,index) in orderList" :key="index">
				<div class="status-icon">
					<img src="../../img/active/act_wait_pay.png" v-if="item.order_status == 2" />
					<img src="../../img/active/act_wait_join.png" v-if="item.order_status == 3" />
					<img src="../../img/active/act_had_cancel.png" v-if="item.order_status != 2 && item.order_status != 3 && item.order_status != 10" />
					<img src="../../img/active/act_had_finish.png" v-if="item.order_status == 10" />
				</div>
				<img :src="$toThumbsimg(item.active_img,164,98,33,$active)" />
				<div class="img-rt">
					<p class="active-name two-line-text">{{item.active_name}}</p>
					<p class="active-time">{{item.add_time}}</p>
					<p class="labels">{{item.cate_name}}</p>
					<p class="active-price" v-if="item.default_price > 0 && item.is_type == 1">
						￥<span style="font-size: 18px;">{{item.default_price}}/人</span>
					</p>
					<p class="active-price" v-if="item.default_price > 0 && item.is_type == 2">
						￥<span style="font-size: 18px;">{{item.default_price}}/组</span>
					</p>
					<p class="active-price" v-if="item.default_price == 0">
						免费
					</p>
				</div>
				<div class="btn-box">
					<div style="color: #CC974C;border-color: #CC974C;" @click="$router.push({path:'/active/apporderdetail',query:{torder_id:item.torder_id}})" v-if="item.order_status == 2">支付</div>
					<div @click="$router.push({path:'/active/apporderdetail',query:{torder_id:item.torder_id}})">查看详情</div>
					<div v-if="item.can_refund && (item.order_status == 2 || item.order_status == 3)" @click="wxcancelOrder(item.torder_id,item.order_status)">{{item.order_status == 2?'取消报名':'退票'}}</div>
				</div>
			</li>
		</ul>
		<mt-spinner :type="2" :size="40" v-if="showSpinner && orderList.length > 0"></mt-spinner>
		<div class="loading-text" v-if="!showSpinner && orderList.length > 0">
			{{loadText}}
		</div>
	</div>
</template>

<script>
	import { Toast, MessageBox, InfiniteScroll, Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				orderList: [],
				page: 1, //当前页
				loading: false,
				totalPage: 0, //订单记录总页数
				loadText: '',
				showSpinner: false,
				requested: false,
			}
		},
		mounted() {
			this.getOrderList()
		},
		methods: {
			getOrderList() {
				const v = this;
				Indicator.open();
				v.$api.orderRecord(0, v.page).then(res => {
					Indicator.close();
					if(res.status == 1) {
						v.requested = true;
						v.orderList = res.data.list;
						v.totalPage = Math.ceil(res.data.count / 5);
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
					} else {
						Toast(res.msg);
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
						v.$api.orderRecord(0, v.page).then(res => {
							v.orderList = [...v.orderList, ...res.data.list];
							v.totalPage = Math.ceil(res.data.count / 5);
							v.loading = false;
						})
					}, 500);
				} else {
					v.showSpinner = false;
					v.loadText = '暂无更多';
					v.loading = true;
				}

			},
			wxcancelOrder(val, val1) {
				const v = this;
				if(val1 == 2) {
					MessageBox.confirm('确定取消报名?', '提示', {
						confirmButtonClass: 'pw-wx-mint-confirm-btn'
					}).then(action => {
						v.$api.cancelOrder(val).then(res => {
							if(res.status == 1) {
								Toast('取消成功');
								v.getOrderList()
							} else {
								Toast(res.msg);
							}
						})
					});
				} else if(val1 == 3) {
					MessageBox.confirm('确定退票?', '提示', {
						confirmButtonClass: 'pw-wx-mint-confirm-btn'
					}).then(action => {
						v.$api.refundTickets(val).then(res => {
							if(res.status == 1) {
								Toast('退票成功');
								v.getOrderList()
							} else {
								Toast(res.msg);
							}
						})
					});
				}
			}
		}
	}
</script>

<style scoped>
	/deep/ .mint-spinner-triple-bounce {
		text-align: center;
		margin: 10px 0;
	}
	
	/deep/ .mint-msgbox-confirm {
		color: #CC974C!important;
	}
	
	.loading-text {
		line-height: 40px;
		text-align: center;
		color: #ccc;
	}
	
	.order-record {
		width: 375px;
		margin: 0 auto;
	}
	
	.no-data img {
		display: block;
		width: 225px;
		margin: 0 auto;
		margin-top: 110px;
	}
	
	.no-data p {
		font-size: 14px;
		line-height: 24px;
		color: #4A4A4A;
		text-align: center;
	}
	
	.order-record li {
		width: 352px;
		overflow: hidden;
		padding-top: 15px;
		margin: 0 12px;
		border-bottom: 1px solid #E5E5E5;
		position: relative;
	}
	
	.status-icon {
		position: absolute;
		top: 15px;
		left: 10px;
	}
	
	.status-icon img {
		display: block;
		width: 15px;
	}
	
	.order-record li>img {
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
	
	.btn-box {
		width: 100%;
		float: left;
		height: 23px;
		margin: 10px 0;
	}
	
	.btn-box>div {
		width: 75px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		border: 1px solid #6B6B6B;
		float: right;
		background: #fff;
		border-radius: 10px;
		margin-left: 15px;
		color: #353535;
		font-size: 14px;
	}
</style>