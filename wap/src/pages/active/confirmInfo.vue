<template>
	<div class="confirm-info">
		<div class="p-box">
			<p class="name">{{active_name}}</p>
			<p class="time">{{selected_time}}</p>
			<p class="place single-line-text">{{active_place}}</p>
			<p class="phone"><span>联系电话</span><span style="margin-left: 15px;">{{contact_phone}}</span></p>
		</div>
		<div class="li-box">
			<div class="title">
				订单详情
			</div>
			<ul>
				<li v-for="(item,index) in visitorNameList">
					<p style="font-size: 16px;line-height: 16px;margin: 15px 0 8px 0;color: #282828;">{{item}}</p>
					<p style="color: #545454;font-size: 14px;">身份证{{visitorIdNumberList[index]}}</p>
					<p class="p-price" v-if="is_type == 1"><span style="font-size: 14px;">￥</span>{{default_price}}</p>
				</li>
				<li v-for="(item,index) in children_username">
					<p style="font-size: 16px;line-height: 16px;margin: 15px 0 8px 0;color: #282828;">{{item}}</p>
					<p style="color: #545454;font-size: 14px;">身份证{{children_card_num[index]}}</p>
					<p class="p-price" v-if="is_type == 1"><span style="font-size: 14px;">￥</span>{{default_price}}</p>
				</li>
			</ul>
			<div class="total-price">
				<span style="font-size: 14px;color: #EA6B55;">总计</span><span style="font-size: 14px;color: #E8593E;">￥</span><span style="font-size: 24px;color: #E8593E;">{{default_price*visitorNameList.length}}</span>
			</div>
		</div>
		<div class="confirm-btn" @click="confirmApply()">
			确认报名
		</div>
	</div>
</template>

<script>
	import { Toast, Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				active_name: '',
				selected_time: '',
				active_place: '',
				contact_phone: '',
				visitorNameList: [],
				visitorIdTypeList: [],
				visitorIdNumberList: [],
				default_price: 0,
				children_username:[],
				children_cardtype_id:[],
				children_card_num:[],
				is_type:'',
			}
		},
		mounted() {
			const v = this;
			v.is_type = localStorage.is_type;
			v.default_price = localStorage.default_price;
			v.active_name = localStorage.active_name;
			v.selected_time = localStorage.selected_time;
			v.active_place = localStorage.active_place;
			v.contact_phone = localStorage.contact_phone;
			v.visitorNameList = localStorage.visitorNameList ? JSON.parse(localStorage.visitorNameList) : [];
			v.visitorIdTypeList = localStorage.visitorIdTypeList ? JSON.parse(localStorage.visitorIdTypeList) : [];
			v.visitorIdNumberList = localStorage.visitorIdNumberList ? JSON.parse(localStorage.visitorIdNumberList) : [];
			if(v.is_type == 2){
				v.children_username = localStorage.children_username ? JSON.parse(localStorage.children_username) : [];
				v.children_cardtype_id = localStorage.children_cardtype_id ? JSON.parse(localStorage.children_cardtype_id) : [];
				v.children_card_num = localStorage.children_card_num ? JSON.parse(localStorage.children_card_num) : [];
			}else{
				localStorage.children_username = JSON.stringify([]);
				localStorage.children_cardtype_id = JSON.stringify([]);
				localStorage.children_card_num = JSON.stringify([]);
			}
		},
		methods: {
			confirmApply() {
				const v = this;
				Indicator.open({
					text: '处理中...',
					spinnerType: 'fading-circle'
				});
				v.$api.applyActive().then(res => {
					Indicator.close();
					if(res.status == 1) {
						if(res.data.order_status == 3) {
							v.$router.replace('/active/appresult')
						} else {
							v.$router.replace({
								path: '/active/apporderdetail',
								query: {
									torder_id: res.data.torder_id
								}
							})
						}
					} else if(res.status == 2){
						Toast(res.msg);
					}else {
						Toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.confirm-info {
		padding-bottom: 60px;
		background: #F5F5F5;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}
	
	.p-box {
		background: #fff;
		margin-bottom: 10px;
	}
	
	.p-box>p {
		width: 336px;
		height: 50px;
		margin: 0 auto;
		border-bottom: 1px solid #DADADA;
		padding-left: 15px;
		line-height: 50px;
		color: #353535;
		font-size: 14px;
	}
	.p-box .phone{
		background: url(../../img/active/xing-icon.png) no-repeat left center;
	}
	.p-box .name{
		font-size: 18px;
	}
	.p-box>p:last-child {
		border: 0;
	}
	/*.p-box .place{
		padding: 5px 0;
		padding-left: 15px;
		line-height: 20px;
		height: auto;
	}*/
	
	.name {
		font-size: 18px;
	}
	
	.title {
		background: #fff;
		width: 336px;
		font-size: 15px;
		color: #353535;
		line-height: 15px;
		padding: 10px 15px;
		margin: 0 auto;
	}
	
	.li-box {
		background: #fff;
	}
	
	.li-box li {
		width: 336px;
		height: 70px;
		margin: 0 auto;
		padding-left: 15px;
		overflow: hidden;
		border-bottom: 1px solid #DADADA;
		position: relative;
	}
	.p-price{
		text-align: right;
		font-size: 17px;
		color: #E8593E;
		position: absolute;
		top: 27px;
		right: 0;
	}
	.total-price {
		width: 336px;
		margin: 0 auto;
		background: #fff;
		text-align: right;
		line-height: 75px;
	}
	
	.confirm-btn {
		width: 158px;
		height: 48px;
		border-radius: 24px;
		position: fixed;
		left: 108px;
		bottom: 6px;
		color: #fff;
		font-size: 18px;
		text-align: center;
		line-height: 48px;
		background: #CC974C;
	}
</style>