<template>
	<div class="app-result">
		<div class="status-text">
			报名成功
		</div>
		<p class="notice">特别说明：如遇大型活动或特展，需对参观办法进行临时调整时，国家海洋博物馆将提前通过国家海洋博物馆官方网站、微信公众号向社会进行公示。</p>
		<div class="btns">
			<div class="cancel-btn "@click="$router.push('/active/activeList')">继续报名</div>
			<div class="next-btn" @click="$router.push('/active/orderrecord')">报名记录</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			localStorage.removeItem('visitorNameList');
			localStorage.removeItem('visitorIdTypeList');
			localStorage.removeItem('visitorIdNumberList');
			localStorage.removeItem('children_username');
			localStorage.removeItem('children_cardtype_id');
			localStorage.removeItem('children_card_num');
		}
	}
</script>

<style scoped>
	.status-text{
		width: 140px;
		height: 38px;
		font-size: 22px;
		color: #353535;
		margin: 50px auto;
		line-height: 38px;
		padding-left: 43px;
		background: url(../../img/pw/success.png) no-repeat left center;
		background-size: 38px 38px;
	}
	.notice{
		font-size: 17px;
		color: #353535;
		line-height: 25px;
		width: 315px;
		margin: 0 auto;
		margin-bottom: 115px;
	}
	
	.btns {
		width: 338px;
		overflow: hidden;
		margin: 70px auto;
	}
	
	.btns>div {
		font-size: 18px;
		text-align: center;
		cursor: pointer;
		float: left;
		border: 0;
		text-align: center;
		height: 48px;
		line-height: 48px;
		width: 158px;
	}
	
	.btns .cancel-btn {
		width: 155px;
		border: 1px solid #b47c2d;
		border-radius: 23px;
		background: #fff;
		color: #b47c2d;
	}
	
	.btns .next-btn {
		width: 158px;
		border-radius: 24px;
		background: #b47c2d;
		color: #fff;
		margin-left: 23px;
	}
</style>