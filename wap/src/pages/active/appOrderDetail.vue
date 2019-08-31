<template>
	<div class="app-order-detail">
		<div class="count-down" v-if="dataObj.order_info && dataObj.order_info.order_status == 2">
			请在<span style="color: #E8593E;">{{surplusminute}}</span>分钟<span style="color: #E8593E;">{{surplussecond}}</span>秒内完成支付
		</div>
		<div class="active-list">
			<ul>
				<li @click="$router.push({path:'/active/activedetail',query:{active_id:dataObj.active_id}})">
					<img :src="$toThumbsimg(dataObj.active_img,164,98,33,$active)" />
					<div class="img-rt">
						<p class="active-name two-line-text">{{dataObj.active_name}}</p>
						<p class="active-time">{{dataObj.active_start_date}}至{{dataObj.active_end_date}}</p>
						<p class="labels">{{dataObj.active_type_name}}</p>
						<p class="active-price" v-if="dataObj.default_price > 0 && dataObj.is_type == 1">
							￥<span style="font-size: 18px;">{{dataObj.default_price}}/人</span>
						</p>
						<p class="active-price" v-if="dataObj.default_price > 0 && dataObj.is_type == 2">
							￥<span style="font-size: 18px;">{{dataObj.default_price}}/组</span>
						</p>
						<p class="active-price" v-if="dataObj.default_price == 0">
							免费
						</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="order-status">
			<p style="color: #353535;float: left;" v-if="dataObj.order_info">报名编号：{{dataObj.order_info.order_sn}}</p>
			<p style="color: #E8593E;float: right;" v-if="dataObj.order_info">{{dataObj.order_info.order_status_name}}</p>
		</div>
		<div class="order-info">
			<p>活动时间：{{dataObj.active_date}}</p>
			<p v-if="dataObj.order_info">下单时间：{{dataObj.order_info.add_time}}</p>
			<p v-if="dataObj.order_info">订单金额：<span style="color: #E8593E;">￥{{dataObj.order_info.order_amount}}</span></p>
			<p>活动地点：{{dataObj.active_place}}</p>
			<p v-if="dataObj.order_info">手机号码：{{dataObj.order_info.contact_phone}}</p>
		</div>
		<div class="visitor-list">
			<ul>
				<li v-for="(item,index) in dataObj.person">
					<div class="li-btm">
						<p style="color: #353535;font-size: 17px;">{{item.toi_username}}<span v-if="dataObj.is_type == 1" style="float: right;font-size: 15px;color:rgba(0,0,0,.6);font-weight: bold;">￥{{dataObj.default_price}}/人</span></p>
						<p style="color: #353535;font-size: 14px;line-height: 14px;margin: 14px 0;">身份证{{item.toi_card_num}}<span v-if="codeIndex != index" @click="codeIndex = index" :class="{forbid_click:dataObj.order_info.order_status != 3 || item.is_children == 1}" style="float: right;font-size: 14px;color: #C39657;">查看签到二维码</span><span v-if="codeIndex == index" @click="codeIndex = -1" style="float: right;font-size: 14px;color: #C39657;">收起</span></p>
					</div>
					<div class="li-center" :class="{li_center_open:codeIndex == index}" v-if="dataObj.order_info.order_status == 3 && item.is_children == 0">
						<img :src="item.qrcode_url" />
						<p>签到二维码</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="cancel-btn" @click="wxcancelOrder()" v-if="dataObj.order_info && dataObj.order_info.can_refund && dataObj.order_info.order_status == 3">
			退票
		</div>
		<div class="pay-way" v-if="dataObj.order_info && dataObj.order_info.order_status == 2">
			<p>支付方式</p>
			<div class="pay-box">
				<div class="wx-pay pay-tool" :class="{selected:chosePayType == 1}" @click="chosePayType = 1">
					<img src="../../img/pw/wx_pay.png" />
					<p>微信支付</p>
				</div>
				<div class="ali-pay pay-tool" :class="{selected:chosePayType == 2}" v-if="env=='t'" @click="chosePayType = 2">
					<img src="../../img/pw/ali_pay.png" />
					<p>支付宝支付</p>
				</div>
			</div>
			<div class="pay-money">
				<p style="font-size: 16px;color: #000;">付款</p>
				<p style="color: #E8593E;font-size: 18px;margin-left: 7px;"><span style="font-size: 12px;">¥</span>{{dataObj.order_info.order_amount}}</p>
				<div class="pay" @click="payMoney()">支付</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast, MessageBox, Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				env: PLAT,
				dataObj: {},
				surplusminute: '--',
				surplussecond: '--',
				codeIndex: -1,
				chosePayType: 1
			}
		},
		mounted() {
			this.getOrderDetail();
		},
		methods: {
			payMoney() {
				Indicator.open();
				const v = this;
				let paymentType = v.chosePayType == 1 ? (PLAT == 'wx' ? 1 : PLAT == 'wxmini' ? 2 : 1) : 4; //支付类型，1：微信（默认），2：微信小程序，4：支付宝
				v.$api.payOrder(v.$route.query.torder_id, paymentType).then(res => {
					Indicator.close();
					if(res.status == 1) {
						var payinfo = v.chosePayType == 1 ? res.data.wxpayinfo : res.data.alipayinfo;
						var ua = navigator.userAgent.toLowerCase();
						if(ua.match(/MicroMessenger/i) == "micromessenger") {
							wx.miniProgram.getEnv(function(res) {
								if(res.miniprogram) { //小程序环境
									v.timerone = setInterval(function() {
										if(payinfo.paySign != undefined) {
											clearInterval(v.timerone);
											var path = '/pages/pay/index?appId=' + payinfo.appId + '&timeStamp=' + payinfo.timeStamp + '&nonceStr=' + payinfo.nonceStr + '&package=' + encodeURIComponent(payinfo.package) + '&signType=' + payinfo.signType + '&paySign=' + encodeURIComponent(payinfo.paySign);
											wx.miniProgram.navigateTo({
												url: path
											})
										}
									}, 50)
								} else { //微信内置浏览器环境
									WeixinJSBridge.invoke('getBrandWCPayRequest', payinfo, function(res) {
										if(res.err_msg == "get_brand_wcpay_request:ok") {
											Toast('支付成功');
											v.$router.push('/active/appresult')
											//支付成功
										} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
											//支付取消
											Toast('支付取消');
										} else if(res.err_msg == "get_brand_wcpay_request:fail") {
											//支付失败
											Toast('支付失败');
										}
									});
								}
							})
						} else { //微信外环境
							location.href = v.chosePayType == 1 ? payinfo.mweb_url : payinfo.url;
							v.checkStatus()
						}
					} else {
						Toast(res.msg);
					}
				})
			},
			checkStatus() {
				const v = this;
				MessageBox({
					title: '支付确认',
					message: '1、如果您已完成支付，请点击「支付完成」<br>2、如果您未支付成功，请点击「重新支付」再次进行支付',
					closeOnClickModal: false,
					showCancelButton: true,
					confirmButtonClass: 'pw-wx-mint-confirm-btn',
					cancelButtonText: '重新支付',
					confirmButtonText: '支付完成', // 确认按钮的文本
				}).then(action => {
					if(action == 'confirm') {
						Indicator.open();
						v.$api.getOrderStatus(v.$route.query.torder_id).then(res => {
							Indicator.close();
							if(res.status == 1) {
								if(res.data.order_status == 3){
									Toast('支付成功');
									v.getOrderDetail();
								}else{
									Toast('您未支付成功');
								}
							} else {
								Toast(res.msg);
							}
						})
					} else if(action == 'cancel') {
						Indicator.open();
						v.$api.getOrderStatus(v.$route.query.torder_id).then(res => {
							Indicator.close();
							if(res.status == 1) {
								if(res.data.order_status == 3){
									Toast('您已支付成功，请不要重复支付');
									v.getOrderDetail();
								}
							} else {
								Toast(res.msg);
							}
						})
					}
				});
			},
			wxcancelOrder() {
				const v = this;
				MessageBox.confirm('确定退票?', '提示', {
					confirmButtonClass: 'pw-wx-mint-confirm-btn'
				}).then(action => {
					Indicator.open();
					v.$api.refundTickets(v.$route.query.torder_id).then(res => {
						Indicator.close();
						if(res.status == 1) {
							Toast('退票成功');
							v.getOrderDetail()
						} else {
							Toast(res.msg);
						}
					})
				});
			},
			getOrderDetail() {
				const v = this;
				Indicator.open();
				v.$api.recordDeatil(v.$route.query.torder_id).then(res => {
					Indicator.close();
					v.dataObj = res.data;
					if(res.data.order_info.order_status == 2) {
						v.countDown(res.data.order_info.add_time)
					}
				})
			},
			countDown(val) {
				const v = this;
				let timestampone = new Date(val.replace(/-/g, "/")).getTime(); //下单时间转成时间戳
				let waittimestam = 30 * 60 * 1000; //30分钟转换成毫秒
				v.timer = setInterval(function() {
					let nowtimestamp = new Date().getTime(); //当前时间的时间戳
					let surplustime = waittimestam - (nowtimestamp - timestampone); //可支付剩余时间戳
					v.surplusminute = Math.floor(surplustime / 60000);
					v.surplussecond = Math.floor((surplustime % 60000) / 1000);
					if(v.surplusminute == 0 && v.surplussecond == 0) {
						window.clearInterval(v.timer);
						v.$api.cancelOrder(v.$route.query.torder_id).then(res => {
							v.getOrderDetail()
						});
						return false;
					}

				}, 500)
			}
		}
	}
</script>

<style scoped>
	/*支付开始*/
	
	.pay-way>p {
		font-size: 15px;
		color: #353535;
		line-height: 45px;
		padding-left: 15px;
	}
	
	.pay-box {
		width: 100%;
		background: #fff;
		margin-bottom: 10px;
	}
	
	.pay-tool {
		width: 345px;
		height: 55px;
		margin: 0 auto;
		border-bottom: 1px solid #F1F1F1;
		background: url(../../img/pw/s2.png) no-repeat right center;
		background-size: 18px;
	}
	
	.selected {
		background: url(../../img/pw/s1.png) no-repeat right center;
		background-size: 18px;
	}
	
	.pay-tool img {
		float: left;
		width: 24px;
		height: 25px;
		margin-top: 15px;
	}
	
	.pay-tool p {
		font-size: 14px;
		color: #000;
		line-height: 55px;
		float: left;
		margin-left: 15px;
	}
	
	.pay-money {
		width: 100%;
		height: 48px;
		background: #fff;
		padding-left: 17px;
	}
	
	.pay-money p {
		float: left;
		line-height: 48px;
	}
	
	.pay-money .pay {
		float: right;
		width: 127px;
		height: 48px;
		color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 48px;
		background: #CC974C;
	}
	/*支付结束*/
	
	.app-order-detail {
		min-height: calc(100vh - 60px);
		background: #F2F2F2;
	}
	
	.count-down {
		width: 100%;
		height: 22px;
		background: #EAE0D1;
		text-align: center;
		line-height: 22px;
		color: #353535;
		font-size: 13px;
	}
	
	.active-list {
		background: #fff;
	}
	
	.active-list li {
		width: 352px;
		height: 128px;
		padding: 15px 0;
		margin: 0 12px;
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
	
	.order-status {
		width: 100%;
		padding: 0 20px;
		background: #fff;
		margin: 4px 0;
		font-size: 14px;
		height: 50px;
		line-height: 50px;
	}
	
	.order-info {
		width: 100%;
		background: #fff;
		padding: 5px 20px;
		color: #353535;
		font-size: 14px;
	}
	
	.order-info p {
		line-height: 28px;
	}
	
	.visitor-list {
		background: #fff;
	}
	
	.visitor-list li {
		width: 345px;
		margin: 0 auto;
		margin-top: 10px;
		border-bottom: 1px solid #E5E5E5;
	}
	
	.visitor-list li:last-child {
		border: 0;
	}
	
	.visitor-list li .li-center {
		background: #fff;
		overflow: hidden;
		margin-bottom: 4px;
		height: 0;
		transition: height .5s;
		-webkit-transition: height .5s;
		/* Safari */
	}
	
	.visitor-list li .li_center_open {
		height: 201px;
	}
	
	.visitor-list li .li-center img {
		display: block;
		width: 147px;
		height: 147px;
		margin: 0 auto;
		margin-top: 15px;
	}
	
	.visitor-list li .li-center p {
		color: #a5a5a5;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		margin-bottom: 20px;
	}
	
	.visitor-list li .li-btm {
		background: #fff;
		overflow: hidden;
		padding: 10px 15px;
	}
	
	.cancel-btn {
		margin: 20px auto;
		font-size: 18px;
		text-align: center;
		outline: none;
		width: 156px;
		height: 48px;
		border-radius: 24px;
		border: 1px solid #b47c2d;
		background: #fff;
		color: #b47c2d;
		line-height: 46px;
	}
	
	.forbid_click {
		pointer-events: none;
		color: rgba(0, 0, 0, .5)!important;
	}
</style>