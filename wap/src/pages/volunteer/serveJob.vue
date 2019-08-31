<template>
	<div class="serve-job">
		<p class="title">意向服务岗位<span style="font-size: 12px;color: #7B7A7A;">（可多选）</span></p>
		<ul>
			<li v-for="item in workList" class="item-work" @click="selJob(item.id,item.title)">
				<div :class="{work_act:vol_work.indexOf(item.id) != -1}">
					{{item.title}}
				</div>
			</li>
		</ul>
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
				workList: [],
				vol_work: [],
				vol_work_text: []
			}
		},
		mounted() {
			this.$api.wxJobList().then(res => {
				this.workList = res.data
			});
			this.vol_work = localStorage.vol_vol_work ? JSON.parse(localStorage.vol_vol_work) : [];
			this.vol_work_text = localStorage.vol_work_text ? JSON.parse(localStorage.vol_work_text) : [];
		},
		methods: {
			selJob(val, val1) {
				if(this.vol_work.indexOf(val) != -1) {
					this.vol_work.splice(this.vol_work.indexOf(val), 1);
					this.vol_work_text.splice(this.vol_work.indexOf(val), 1);
				} else {
					this.vol_work.push(val);
					this.vol_work_text.push(val1)
				}
			},
			save() {
				const v = this;
				if(v.vol_work.length == 0) {
					Toast('请至少选择一个意向服务岗位');
					return false;
				}
				localStorage.vol_vol_work = JSON.stringify(v.vol_work);
				localStorage.vol_work_text = JSON.stringify(v.vol_work_text);
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
	.serve-job {
		min-height: 100vh;
		background: #F2F2F2;
	}
	
	.serve-job p {
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
	
	.item-work {
		width: 100%;
		margin-bottom: 4px;
		line-height: 50px;
		font-size: 14px;
		color: #2A2A2A;
		background: #fff;
	}
	
	.item-work>div {
		width: 335px;
		height: 50px;
		background: url(../../img/volunteer/wx_vol_checkbox.png) no-repeat center right;
		background-size: 18px 18px;
		margin: 0 auto;
	}
	
	.item-work .work_act {
		background: url(../../img/volunteer/wx_vol_checkedbox.png) no-repeat center right;
		background-size: 18px 18px;
	}
	
	.submit-btn {
		position: fixed;
		left: 10px;
		bottom: 10px;
		width: 355px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		border-radius: 24px;
		background: #BD8C47;
		color: #fff;
		font-size: 18px;
	}
</style>