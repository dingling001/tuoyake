<template>
	<div class="contact-way">
		<div class="info-box">
			<div class="item-info">
				<p><span>* </span>联系电话</p>
				<input type="text" placeholder="请填写手机号码" v-model="phone" />
			</div>
			<div class="item-info" style="border: 0;">
				<p><span>* </span>邮箱</p>
				<input type="text" placeholder="请填写常用邮箱" v-model="email" />
			</div>
		</div>
		<div class="submit-btn" @click="save()">
			保存
		</div>
	</div>
</template>

<script>
	import checkId from "../../bin/common.js";
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				phone: '',
				email: ''
			}
		},
		mounted() {
			this.phone = localStorage.vol_phone ? localStorage.vol_phone : '';
			this.email = localStorage.vol_email ? localStorage.vol_email : '';
		},
		methods: {
			save() {
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(this.phone == '') {
					Toast('请填写手机号码');
				} else if(!checkId.checkPhone(this.phone)) {
					Toast('手机号码格式错误');
				} else if(this.email == '') {
					Toast('请填写常用邮箱');
				} else if(!reg.test(this.email)) {
					Toast('邮箱格式错误');
				} else {
					const v = this;
					localStorage.vol_contact_way = 1;
					localStorage.vol_phone = v.phone;
					localStorage.vol_email = v.email;
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
	.contact-way {
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
		border-bottom: 1px solid #F5F5F5;
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
		line-height: 48px;
		text-align: center;
		border-radius: 24px;
		background: #BD8C47;
		color: #fff;
		font-size: 18px;
	}
</style>