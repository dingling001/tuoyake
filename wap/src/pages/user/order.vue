<template>
  <!-- 小程序预约列表使用 -->
  <div class="order-wrapper">
    <ul class="tab">
      <li :class="{'active':cur==0}" @click="cur=0">参观预约</li>
      <li :class="{'active':cur==1}" @click="cur=1">活动预约</li>
      <li :class="{'active':cur==2}" @click="cur=2">影院预约</li>
      <li :class="{'active':cur==3}" @click="cur=3">讲解预约</li>
    </ul>
    <pworder v-if="cur==0"></pworder>
    <activeorder v-if="cur==1"></activeorder>
    <filmorder v-if="cur==5"></filmorder>
    <explainorder v-if="cur==5"></explainorder>
    <div class="no-data" v-if="cur==2 || cur == 3">
			<img src="../../img/active/wx_building.png" />
			<p>尊敬的观众朋友：</p>
			<p v-if="cur==2" style="text-indent: 36px;margin-top: 10px;">您好，感谢您对国家海洋博物馆的关心关注与大力支持，我馆电影院项目正在筹备中，暂未对外开放，开放时间我们将第一时间在公众号内发布，敬请关注。</p>
      <p v-if="cur == 3" style="text-indent: 36px;margin-top: 10px;">您好，感谢您对国家海洋博物馆的关心关注与大力支持，我馆讲解预约项目正在筹备中，暂未对外开放，开放时间我们将第一时间在公众号内发布，敬请关注。</p>
		</div>
  </div>
</template>
<script>
import pworder from '../pw/order_list';
import activeorder from '../active/orderRecord';
import filmorder from '../film/umovie';
import explainorder from '../explain/order_list';
export default {
  data() {
    return {
      cur: 0
    }
  },
  components:{
  	activeorder,
  	pworder,
  	filmorder,
  	explainorder
  }
}
</script>
<style lang="scss" scoped>
.order-wrapper{
	padding-top: 60px;
}
.tab {
  height: 60px;
  display: flex;
  background: #fff;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  padding: 0 10px;
  justify-content: space-between;
  li {
    width: 86px;
    height: 24px;
    text-align: center;
    border-radius: 12px;
    font-size: 15px;
    color: #0C0C0C;
    line-height: 24px;
    margin: 18px 0;
  }
  .active{
  	background:linear-gradient(135deg,#FFD27B,#EC863A);
  	color: #fff;
  }
}
.no-data img {
		display: block;
		width: 225px;
		margin: 0 auto;
		margin-top: 110px;
	}
	
	.no-data p {
		font-size: 16px;
		line-height: 24px;
		color:#010101;
		opacity:0.85;
		padding: 0 1rem;
	}
</style>

