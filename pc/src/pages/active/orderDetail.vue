<template>
	<div>
		<div class="topbar-wrapper">
			<div class="topbar">
				<a href="/">首页</a>
				»
				<a href='/uactive'>个人中心</a>
				» 活动报名
			</div>
		</div>
		<div class="order-detail">
			<div class="detail-box" v-if="dataObj.order_info">
				<div class="info-title">
					订单信息
					<p>报名状态：<span style="color: #DA4453;">{{dataObj.order_info.order_status_name}}</span></p>
				</div>
				<div class="time-info">
					<span class="heng" style="width: 50px;"></span>
					<span class="heng" style="width: 5px;margin-left: 5px;"></span>
					<p class="count-down" v-if="dataObj.order_info.order_status == 2">请在<span>{{surplusminute}}</span>分钟<span>{{surplussecond}}</span>秒内完成支付</p>
					<p>参加日期：<span style="color: #55555A;">{{dataObj.active_date}}</span></p>
				</div>
				<div class="order-info">
					<p style="margin: 15px 0 16px 0;">订单编号 {{dataObj.order_info.order_sn}}</p>
					<p>下单时间 {{dataObj.order_info.add_time}}</p>
				</div>
				<div class="img-text">
					<img :src="$toThumbsimg(dataObj.active_img, 588, 240, 33,$active)" />
					<div class="text-info">
						<p class="active-name">{{dataObj.active_name}}</p>
						<p class="active-time common-p">活动时间：{{dataObj.active_date}}</p>
						<p class="active-place common-p">活动地点：{{dataObj.active_place}}</p>
						<p class="active-type common-p">活动类型：{{dataObj.active_type_name}}</p>
						<div class="three-line-text active-intro" v-html="dataObj.info"></div>
						<p class="see-detail" @click="seeActiveDetail(dataObj.active_id)">查看详情</p>
					</div>
				</div>
				<div class="visitor-info">
					<ul>
						<li v-for="(item,index) in dataObj.person" :key="index">
							<p>
								<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
								<span>{{item.toi_username}}</span>
							</p>
							<p>
								<span>证件类型</span>
								<span>{{item.card_type}}</span>
							</p>
							<p>
								<span>证件号码</span>
								<span>{{item.toi_card_num}}</span>
								<span class="see-code" :class="{forbid_open:dataObj.order_info.order_status != 3}" v-if="dataObj.is_type == 1 || (dataObj.is_type == 2 && index != 1)" @click="codeIndex = index">查看签到二维码</span>
							</p>
							<div class="qrcode-box fixed-center" v-if="dataObj.order_info.order_status == 3 && codeIndex == index">
								<p>{{item.toi_username}}</p>
								<p>{{dataObj.active_name}}</p>
								<img :src="item.qrcode_url" />
								<p class="code-text">签到二维码</p>
								<div class="close-btn" @click="codeIndex = -1">
									关闭
								</div>
							</div>
							<div class="unit-price" v-if="dataObj.default_price>0 && dataObj.order_info.order_status == 3">
								￥{{dataObj.default_price}}
							</div>
							<div class="unit-price" v-if="dataObj.default_price == 0 && dataObj.order_info.order_status == 3">
								免费
							</div>
						</li>
					</ul>
					<p style="line-height: 34px;margin-bottom: 18px;padding-left: 30px;">
						<span>联系手机</span>
						<span>{{dataObj.order_info.contact_phone}}</span>
					</p>
				</div>
				<div class="price">
					<p style="color: #E8593E;">￥<span style="font-size: 28px;">{{dataObj.order_info.order_amount}}</span></p>
					<p style="color: #353535;line-height: 35px;">总计</p>
				</div>
				<!--选择支付方式-->
				<div class="pay-way" v-if="dataObj.order_info.order_status == 2">
					<div class="pay-title">
						<span></span>
						<p>付款方式</p>
					</div>
					<div class="way-box">
						<div class="wx-pay" :class="{selected_pay:payWay == 1}" @click="payWay = 1">
							<img src="../../img/tickets/8.png"/>
						</div>
						<div class="zfb-pay" :class="{selected_pay:payWay == 4}" @click="payWay = 4">
							<img src="../../img/tickets/9.png"/>
						</div>
					</div>
				</div>
				<div class="btns" v-if="(dataObj.order_info.order_status == 2 || dataObj.order_info.order_status == 3) && dataObj.order_info.can_refund">
					<input type="button" value="退票" class="cancel-btn" @click="open2(dataObj.order_info.order_status)" v-if="dataObj.order_info.order_status == 3 && dataObj.order_info.can_refund" />
					<input type="button" value="返回" class="next-btn" v-if="dataObj.order_info.order_status == 3" @click="$router.go(-1)" />
					<input type="button" value="取消报名" class="cancel-btn" v-if="dataObj.order_info.order_status == 2 && dataObj.order_info.can_refund" @click="open2(dataObj.order_info.order_status)" />
					<input type="button" :value="payBtnText" class="next-btn" v-if="dataObj.order_info.order_status == 2" :class="{forbid_click1:isForbid}" @click="payMoney()" />
				</div>
				<div class="btns" v-if="dataObj.order_info.order_status == 2 && !dataObj.order_info.can_refund">
					<input type="button" value="返回" class="cancel-btn" @click="$router.go(-1)" />
					<input type="button" :value="payBtnText" class="next-btn" :class="{forbid_click1:isForbid}" @click="payMoney()" />
				</div>
				<div class="btns" style="width: 240px;" @click="$router.go(-1)" v-if="(dataObj.order_info.order_status != 2 && dataObj.order_info.order_status != 3) || !dataObj.order_info.can_refund">
					<input type="button" value="返回" class="next-btn" style="margin: 0;" />
				</div>
			</div>
			<div class="active-detail-tc fixed-center" v-if="showActiveDetail">
				<div class="close-tc" @click="showActiveDetail = false">

				</div>
				<div class="active-detail-box">
					<img :src="$toThumbsimg(activeDetail.active_img, 1080, 470, 33,$active)" />
					<div class="active-info">
						<p class="active-name">{{activeDetail.active_name}}</p>
						<p class="active-time"><span>时间：</span>{{activeDetail.active_date}}</p>
						<p class="active-place"><span>地点：</span>{{activeDetail.active_place}}</p>
						<p class="active-num"><span>名额：</span>{{activeDetail.count_num}}人<span style="margin-left: 50px;">已报名{{activeDetail.order_count_num}}人</span></p>
						<p class="active-price" v-if="activeDetail.default_price == 0"><span>费用：</span><span style="color: #E8593E;">免费</span></p>
						<p class="active-price" v-if="activeDetail.default_price > 0"><span>费用：</span><span style="color: #E8593E;">￥{{activeDetail.default_price}}</span>/{{activeDetail.is_type == 1?'人':'组'}}</p>
						<p v-html="activeDetail.info" class="active-info"></p>
					</div>
					<div class="active-session">
						<p><span>选择活动场次</span><span style="margin-left: 30px;">已报名{{activeDetail.order_count_num}} / {{activeDetail.count_num}}人</span></p>
						<ul>
							<li v-if="index < timeListVal" v-for="(item,index) in timeList" :key="index">
								{{item.time}}
							</li>
							<li v-if="timeList.length > 8" @click="showMore()">{{moreText}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="zhezhao" v-if="showQrcode || showActiveDetail" @click="closeTc()">

			</div>
			<div id="qrcode" class="qrcode_box" :class="{opacity_val:showQrcode}">

			</div>
		</div>
	</div>
</template>
<script>
	import QRCode from 'qrcodejs2'
	export default {
		data() {
			return {
				moreText: '更多场次',
				timeListVal: 8,
				timeList: [],
				activeDetail: {},
				showActiveDetail: false,
				dataObj: {},
				showQrcode: false,
				payBtnText: '立即支付',
				isForbid: false,
				surplusminute: '--',
				surplussecond: '--',
				codeIndex:-1,
				payWay:1,//wx:1,zfb:4
			}
		},
		mounted() {
			this.getRecordDeatil(this.$route.query.torder_id)
		},
		methods: {
			showMore() {
				const v = this;
				v.timeListVal = v.timeListVal == 8 ? v.timeList.length : 8;
				v.moreText = v.timeListVal == 8 ? '更多场次' : '收起更多'
			},
			seeActiveDetail(val) {
				const v = this;
				v.showActiveDetail = true;
				v.$api.activeDetail(val).then(res => {
					v.activeDetail = res.data;
				});
				v.$api.timeList(val).then(res => {
					v.timeList = res.data;
				})
			},
			getRecordDeatil(val) {
				const v = this;
				v.$api.recordDeatil(val).then(res => {
					v.dataObj = res.data;
					if(res.data.order_info.order_status == 2) {
						v.countDown(res.data.order_info.add_time)
					}
				})
			},
			countDown(val) {
				const v = this;
				let timestampone = new Date(val).getTime(); //下单时间转成时间戳
				let waittimestam = 30 * 60 * 1000; //30分钟转换成毫秒
				v.timer = setInterval(function() {
					let nowtimestamp = new Date().getTime(); //当前时间的时间戳
					let surplustime = waittimestam - (nowtimestamp - timestampone); //可支付剩余时间戳
					v.surplusminute = Math.floor(surplustime / 60000);
					v.surplussecond = Math.floor((surplustime % 60000) / 1000);
					if(v.surplusminute == 0 && v.surplussecond == 0) {
						window.clearInterval(v.timer);
						v.$api.cancelApplyOrder(v.$route.query.torder_id).then(res => {
							v.getRecordDeatil(v.$route.query.torder_id)
						});
						return false;
					}
				}, 500)
			},
			closeTc() {
				this.showQrcode = false;
				window.clearInterval(this.timer);
			},
			payMoney() {
				const v = this;
				v.payBtnText = '支付...';
				v.isForbid = true;
				v.timer = setInterval(function() {
					v.$api.orderStatus(v.$route.query.torder_id).then(res => {
						if(res.status == 1) {
							if(res.data.order_status == 3) {
								v.getRecordDeatil(v.$route.query.torder_id);
								window.clearInterval(v.timer);
								v.showQrcode = false;
								v.$alert('支付成功!', '支付结果', {
									confirmButtonText: '确定',
									callback: action => {

									}
								});
							}
						} else {
							v.$message.error(res.msg);
						}
					})
				}, 500);
				v.$api.payOrder(v.$route.query.torder_id,v.payWay).then(res => {
					v.isForbid = false;
					v.payBtnText = '立即支付';
					if(v.payWay == 1){
						document.getElementById("qrcode").innerHTML = '';
						if(res.status == 1) {
							v.showQrcode = true;
							let qrcode = new QRCode(document.getElementById("qrcode"), {
								width: 300,
								height: 300
							});
							qrcode.makeCode(res.data.qrcode);
						}
					}else{
						window.open(res.data.alipayinfo.url)
					}
				})
			},
			open2(val) {
				const v = this;
				let tiptext = '';
				if(val == 2) {
					tiptext = '确定取消报名该活动?'
				} else {
					tiptext = '确定退票?'
				}
				v.$confirm(tiptext, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(val == 2) {
						v.cancelApply()
					} else {
						v.refund()
					}
				})
			},
			refund() {
				const v = this;
				v.$api.refundTickets(v.$route.query.torder_id).then(res => {
					if(res.status == 1) {
						v.getRecordDeatil(v.$route.query.torder_id);
						v.$message({
							type: 'success',
							message: '退票成功!'
						});
					} else {
						v.$message.error(res.msg);
					}
				})
			},
			cancelApply() {
				const v = this;
				v.$api.cancelApplyOrder(v.$route.query.torder_id).then(res => {
					if(res.status == 1) {
						v.getRecordDeatil(v.$route.query.torder_id);
						v.$message({
							type: 'success',
							message: '取消成功!'
						});
					} else {
						v.$message.error(res.msg);
					}
				})
			}
		}
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
	
	#qrcode {
		padding: 30px;
		background: #fff;
		border-radius: 10px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		/* IE 9 */
		-webkit-transform: translate(-50%, -50%);
		/* Safari and Chrome */
		-o-transform: translate(-50%, -50%);
		/* Opera */
		-moz-transform: translate(-50%, -50%);
		/* Firefox */
		z-index: -1;
	}
	
	.qrcode_box {
		opacity: 0;
	}
	
	.opacity_val {
		opacity: 1;
		z-index: 10000!important;
	}
	
	.active-detail-tc {
		width: 1200px;
		height: 70%;
		background: #fff;
		z-index: 10000;
	}
	
	.close-tc {
		width: 54px;
		height: 54px;
		position: absolute;
		top: -58px;
		right: -128px;
		/*background: url(../../../../wx/src/img/volunteer/vol_close_icon.png) no-repeat;*/
		background-size: 54px 54px;
		cursor: pointer;
	}
	
	.active-detail-box {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}
	
	.active-detail-box img {
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
		margin-bottom: 40px;
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
		line-height: 44px;
		text-align: center;
	}
	
	.active-session .selected_time_act {
		background: url(../../img/active/selected_time.png) no-repeat bottom right;
	}
	
	.zhezhao {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		z-index: 9999;
	}
	
	.detail-box {
		width: 1200px;
		margin: 0 auto;
	}
	
	.info-title {
		font-size: 24px;
		color: #000;
		line-height: 24px;
		margin: 55px 0 15px 0;
	}
	
	.info-title p {
		width: 400px;
		float: right;
		font-size: 18px;
		color: #000;
		text-align: left;
	}
	
	.time-info {
		width: 1198px;
		height: 44px;
		padding-bottom: 24px;
		border-bottom: 5px solid #E8D7C0;
		overflow: hidden;
		margin: 0 auto;
	}
	
	.time-info p {
		width: 400px;
		font-size: 20px;
		color: #000;
		float: right;
		text-align: left;
	}
	
	.time-info .count-down {
		font-size: 16px;
		color: #353535;
		float: left;
		margin-left: 160px;
	}
	
	.time-info .count-down span {
		font-size: 24px;
		color: #F00E0E;
	}
	
	.time-info .heng {
		display: block;
		float: left;
		height: 5px;
		background: #000;
		margin-top: 15px;
	}
	
	.order-info {
		width: 1198px;
		height: 75px;
		background: #F7F2EA;
		margin: 0 auto;
		font-size: 16px;
		color: #000;
		padding-left: 24px;
		overflow: hidden;
	}
	
	.order-info p {
		line-height: 16px;
	}
	
	.img-text {
		padding: 12px 0;
		overflow: hidden;
		border-bottom: 1px solid #E5E5E5;
	}
	
	.img-text img {
		display: block;
		width: 588px;
		height: 239px;
		float: left;
		margin-right: 36px;
	}
	
	.text-info {
		width: 565px;
		float: left;
	}
	
	.active-name {
		font-size: 20px;
		color: #000;
		margin-bottom: 9px;
	}
	
	.common-p {
		color: #585858;
		font-size: 16px;
		line-height: 24px;
	}
	
	.active-intro {
		font-size: 16px;
		color: #000;
		line-height: 24px;
		margin: 15px 0 20px 0;
		max-height: 72px;
	}
	
	.see-detail {
		font-size: 16px;
		color: #B47C2D;
		cursor: pointer;
	}
	
	.visitor-info {
		font-size: 16px;
		color: #353535;
		border-bottom: 2px solid #E8D7C0;
	}
	
	.visitor-info li {
		line-height: 34px;
		padding: 30px;
		border-bottom: 1px solid #B2B2B2;
		position: relative;
	}
	.visitor-info li p{
		overflow: hidden;
	}
	.visitor-info li span{
		float: left;
		margin-right: 30px;
	}
	.visitor-info li:last-child {
		border: 0;
	}
	.visitor-info li .see-code{
		float: right;
		margin: 0;
		font-size: 16px;
		color: #C39657;
		cursor: pointer;
	}
	.visitor-info li .forbid_open{
		color:rgba(53,53,53,.5);
		pointer-events: none;
	}
	.qrcode-box {
		width: 435px;
		height: 450px;
		border-radius: 6px;
		background: #fff;
		overflow: hidden;
		box-shadow:0px 2px 11px 1px rgba(82,81,81,0.24);
	}
	
	.qrcode-box img {
		display: block;
		width: 230px;
		margin: 0 auto;
	}
	
	.qrcode-box p {
		font-size: 18px;
		color: #000;
		line-height: 30px;
		padding-left: 36px;
	}
	.close-btn{
		width: 275px;
		height: 44px;
		border-radius: 23px;
		background: #C39657;
		font-size: 18px;
		color: #fff;
		cursor: pointer;
		margin: 0 auto;
		text-align: center;
		line-height: 44px;
		margin-top: 20px;
	}
	.qrcode-box p:first-child{
		margin-top: 55px;
	}
	.qrcode-box .code-text{
		text-align: center;
		padding: 0;
		margin-top: -20px;
	}
	.unit-price {
		height: 95px;
		line-height: 95px;
		position: absolute;
		right: 30px;
		top: 0;
		font-size: 22px;
		color: #E8593E;
	}
	
	.price {
		overflow: hidden;
		margin-top: 30px;
		line-height: 28px;
		padding-right: 20px;
	}
	
	.price p {
		float: right;
		font-size: 18px;
	}
	.pay-way{
		width: 1200px;
		border-bottom: 5px solid #E8D7C0;
		padding-left: 30px;
	}
	.pay-way .pay-title{
		overflow: hidden;
		line-height: 30px;
	}
	.pay-way .pay-title span{
		display: block;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		float: left;
		background: #000;
		margin: 10px 10px 10px 0;
	}
	.pay-way .pay-title p{
		font-size: 20px;
		color: #000;
		float: left;
	}
	.way-box{
		overflow: hidden;
		margin: 23px 0 36px 0;
	}
	.wx-pay,.zfb-pay{
		width: 189px;
		height: 62px;
		float: left;
		border: 1px solid #C3CEDC;
		cursor: pointer;
	}
	.selected_pay{
		border: 0;
		background: url(../../img/tickets/07.png) no-repeat;
		background-size: 100%;
	}
	.wx-pay{
		margin-right: 36px;
	}
	.wx-pay img,.zfb-pay img{
		display: block;
	}
	.wx-pay img{
		margin: 13px auto;
	}
	.zfb-pay img{
		margin: 11px auto;
	}
	.btns {
		width: 575px;
		overflow: hidden;
		margin: 70px auto;
	}
	
	.btns input {
		font-size: 16px;
		text-align: center;
		cursor: pointer;
		float: left;
	}
	
	.btns .cancel-btn {
		width: 238px;
		height: 46px;
		border: 1px solid #B47C2D;
		border-radius: 23px;
		background: #fff;
		color: #B47C2D;
	}
	
	.btns .next-btn {
		width: 240px;
		height: 48px;
		border-radius: 24px;
		background: #B47C2D;
		color: #fff;
		margin-left: 95px;
	}
	
	.forbid_click1 {
		pointer-events: none;
	}
</style>
