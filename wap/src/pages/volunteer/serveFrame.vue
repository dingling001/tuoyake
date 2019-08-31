<template>
	<div class="serve-frame">
		<p class="title">意向服务时间</p>
		<div class="item-frame">
			<p>周一</p>
			<div class="frame-box">
				<div class="frame-lt" :class="{frame_act:worktime.indexOf(1) != -1}" @click="selFrame(1)">上午</div>
				<div class="frame-rt" :class="{frame_act:worktime.indexOf(2) != -1}" @click="selFrame(2)">下午</div>
			</div>
		</div>
		<div class="item-frame">
			<p>周二</p>
			<div class="frame-box">
				<div class="frame-lt" :class="{frame_act:worktime.indexOf(3) != -1}" @click="selFrame(3)">上午</div>
				<div class="frame-rt" :class="{frame_act:worktime.indexOf(4) != -1}" @click="selFrame(4)">下午</div>
			</div>
		</div>
		<div class="item-frame">
			<p>周三</p>
			<div class="frame-box">
				<div class="frame-lt" :class="{frame_act:worktime.indexOf(5) != -1}" @click="selFrame(5)">上午</div>
				<div class="frame-rt" :class="{frame_act:worktime.indexOf(6) != -1}" @click="selFrame(6)">下午</div>
			</div>
		</div>
		<div class="item-frame">
			<p>周四</p>
			<div class="frame-box">
				<div class="frame-lt" :class="{frame_act:worktime.indexOf(7) != -1}" @click="selFrame(7)">上午</div>
				<div class="frame-rt" :class="{frame_act:worktime.indexOf(8) != -1}" @click="selFrame(8)">下午</div>
			</div>
		</div>
		<div class="item-frame">
			<p>周五</p>
			<div class="frame-box">
				<div class="frame-lt" :class="{frame_act:worktime.indexOf(9) != -1}" @click="selFrame(9)">上午</div>
				<div class="frame-rt" :class="{frame_act:worktime.indexOf(10) != -1}" @click="selFrame(10)">下午</div>
			</div>
		</div>
		<div class="item-frame">
			<p>周六</p>
			<div class="frame-box">
				<div class="frame-lt" :class="{frame_act:worktime.indexOf(11) != -1}" @click="selFrame(11)">上午</div>
				<div class="frame-rt" :class="{frame_act:worktime.indexOf(12) != -1}" @click="selFrame(12)">下午</div>
			</div>
		</div>
		<div class="item-frame">
			<p>周日</p>
			<div class="frame-box">
				<div class="frame-lt" :class="{frame_act:worktime.indexOf(13) != -1}" @click="selFrame(13)">上午</div>
				<div class="frame-rt" :class="{frame_act:worktime.indexOf(14) != -1}" @click="selFrame(14)">下午</div>
			</div>
		</div>
		<div class="submit-btn" @click="save()">
			保存
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				worktime: []
			}
		},
		mounted() {
			this.worktime = localStorage.vol_worktime ? JSON.parse(localStorage.vol_worktime) : []
		},
		methods: {
			selFrame(val) {
				const v = this;
				if(v.worktime.indexOf(val) != -1) {
					v.worktime.splice(v.worktime.indexOf(val), 1)
				} else {
					v.worktime.push(val)
				}
			},
			save() {
				const v = this;
				if(v.worktime.length == 0) {
					Toast('请至少选择一个意向服务时间');
					return false;
				}
				localStorage.vol_worktime = JSON.stringify(v.worktime);
				let instance = Toast('保存成功');
				setTimeout(function() {
					instance.close();
					v.$router.go(-1)
				}, 500)
			}
		}
	}
</script>

<style scoped>
	.serve-frame {
		overflow: hidden;
		background: #F2F2F2;
	}
	
	.serve-frame p {
		width: 100%;
		height: 50px;
		margin-bottom: 4px;
		background: #fff;
		padding: 0 20px;
		line-height: 50px;
		font-size: 17px;
		color: #353535;
		font-weight: bold;
	}
	
	.item-frame {
		width: 100%;
		background: #fff;
		margin-bottom: 4px;
		overflow: hidden;
	}
	
	.item-frame p {
		border-bottom: 1px solid #F3F3F3;
	}
	
	.frame-lt,
	.frame-rt {
		float: left;
		height: 42px;
		margin: 4px 0;
		line-height: 42px;
		background: url(../../img/volunteer/wx_vol_checkbox.png) no-repeat center right;
		background-size: 18px 18px;
	}
	
	.frame_act {
		background: url(../../img/volunteer/wx_vol_checkedbox.png) no-repeat center right;
		background-size: 18px 18px;
	}
	
	.frame-lt {
		width: 97px;
	}
	
	.frame-rt {
		width: 124px;
		float: right;
		margin-right: 64px;
		border-left: 1px solid #F3F3F3;
		padding-left: 50px;
	}
	
	.frame-lt {
		padding-left: 20px;
	}
	
	.submit-btn {
		width: 355px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		border-radius: 24px;
		background: #BD8C47;
		color: #fff;
		font-size: 18px;
		margin: 10px auto;
	}
</style>