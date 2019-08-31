<template>
	<div class="my-speciality">
		<div class="info-box">
			<div class="item-info">
				<p><span>* </span>专长爱好</p>
				<input type="text" placeholder="请填写您的专长爱好" v-model="specialty" />
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
				specialty: ''
			}
		},
		mounted() {
			this.specialty = localStorage.vol_specialty ? localStorage.vol_specialty : '';
		},
		methods: {
			save() {
				const v = this;
				if(v.specialty == '') {
					Toast('请填写您的专长爱好');
				} else {
					localStorage.vol_specialty_save = 1;
					localStorage.vol_specialty = v.specialty;
					let instance = Toast('保存成功');
					setTimeout(function() {
						instance.close();
						v.$router.go(-1)
					}, 500)
				}
			}
		}
	}
</script>

<style scoped>
	.my-speciality {
		min-height: 100vh;
		background: #F2F2F2;
	}
	
	.info-box {
		width: 375px;
		background: #fff;
	}
	
	.item-info {
		width: 335px;
		height: 50px;
		margin: 0 auto;
	}
	
	.item-info p {
		width: 110px;
		height: 50px;
		line-height: 50px;
		float: left;
		font-size: 14px;
		color: #353535;
	}
	
	.item-info p span {
		color: #E32A2A;
	}
	
	.item-info input {
		width: 225px;
		float: left;
		border: 0;
		height: 49px;
		outline: none;
		background: #fff;
	}
	
	.submit-btn {
		position: absolute;
		left: 10px;
		bottom: 10px;
		width: 355px;
		height: 48px;
		border-radius: 24px;
		background: #BD8C47;
		color: #fff;
		font-size: 18px;
		line-height: 48px;
		text-align: center;
	}
</style>