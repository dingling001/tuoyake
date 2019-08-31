<template>
	<div class="my-speciality">
		<mt-cell-swipe v-for="(item,index) in experienceNum" :key="index" :right="[{content: '删除',style: { background: 'red', color: '#fff',width:'46px'},handler: () => {deltetExperience(index)}}]">
			<div class="info-box">
				<div class="del-icon" @click="deltetExperience(index)">
					<span></span>
				</div>
				<div class="item-info">
					<p style="width: auto"><span>* </span>时间</p>
					<input type="text" readonly="readonly" v-model="myInfo.start_time[index]" placeholder="起始时间" style="width: 100px;text-align: center;" @click="selDate(index,1)" />
					<p style="width: auto;">至</p>
					<input type="text" readonly="readonly" v-model="myInfo.end_time[index]" placeholder="截至时间" style="width: 100px;text-align: center;" @click="selDate(index,2)" />
				</div>
				<div class="item-info">
					<p><span>* </span>学习及工作经历</p>
					<input type="text" placeholder="请填写" v-model="myInfo.exper[index]" />
				</div>
				<div class="item-info">
					<p><span>* </span>职务名称</p>
					<input type="text" placeholder="请填写" v-model="myInfo.workjob[index]" />
				</div>

			</div>
		</mt-cell-swipe>
		<div class="add-experience" @click="addExperience()">
			<div class="item-info-top">
				<img src="../../img/volunteer/vol_add_info.png" />
				<p>添加</p>
			</div>
		</div>
		<div class="submit-btn" @click="save()">
			保存
		</div>
		<!--选择时间-->
		<mt-datetime-picker v-model="nowDate" ref="picker" type="date" :startDate="startDate" :endDate="endDate" @confirm="graduationDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
		</mt-datetime-picker>
	</div>
</template>

<script>
	import { DatetimePicker, Toast, CellSwipe, MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				nowDate: '',
				indexVal: 0,
				whichTime: 1,
				experienceNum: 0,
				myInfo: {
					start_time: [],
					end_time: [],
					exper: [],
					workjob: []
				},
				startDate: new Date('1950-01-01'),
				endDate: new Date()
			}
		},
		mounted() {
			const v = this;
			v.nowDate = v.getOneDayDate();
			v.myInfo.start_time = localStorage.vol_start_time ? JSON.parse(localStorage.vol_start_time) : [];
			v.myInfo.end_time = localStorage.vol_end_time ? JSON.parse(localStorage.vol_end_time) : [];
			v.myInfo.exper = localStorage.vol_exper ? JSON.parse(localStorage.vol_exper) : [];
			v.myInfo.workjob = localStorage.vol_workjob ? JSON.parse(localStorage.vol_workjob) : [];
			if(v.myInfo.start_time.length == 0) {
				v.experienceNum = 1;
				v.myInfo.start_time[0] = '';
				v.myInfo.end_time[0] = '';
				v.myInfo.exper[0] = '';
				v.myInfo.workjob[0] = '';
			} else {
				v.experienceNum = v.myInfo.start_time.length
			}
		},
		methods: {
			getOneDayDate() {
				var mydate = new Date();
				var y = mydate.getFullYear();
				var m = mydate.getMonth() + 1; //获取当前月份的日期 
				if(m < 10) {
					m = '0' + m
				}
				var d = mydate.getDate();
				if(d < 10) {
					d = '0' + d
				}
				return y + "-" + m + "-" + d;
			},
			addExperience() {
				const v = this;
				v.experienceNum++;
				v.myInfo.start_time[v.experienceNum - 1] = '';
				v.myInfo.end_time[v.experienceNum - 1] = '';
				v.myInfo.exper[v.experienceNum - 1] = '';
				v.myInfo.workjob[v.experienceNum - 1] = '';
			},
			delExperience(val) {
				this.experienceNum--;
				this.myInfo.start_time.splice(val, 1);
				this.myInfo.end_time.splice(val, 1);
				this.myInfo.exper.splice(val, 1);
				this.myInfo.workjob.splice(val, 1);
			},
			graduationDate(val) {
				const v = this;
				let mydate = v.$moment(val).format('YYYY-MM-DD');
				if(mydate == v.getOneDayDate()) {
					mydate = '至今'
				}
				if(v.whichTime == 1) {
					v.myInfo.start_time[v.indexVal] = mydate;
					v.$set(v.myInfo.start_time, v.indexVal, mydate)
				} else if(v.whichTime == 2) {
					v.myInfo.end_time[v.indexVal] = mydate;
					v.$set(v.myInfo.end_time, v.indexVal, mydate)
				}

			},
			selDate(val, val1) {
				const v = this;
				v.indexVal = val;
				v.whichTime = val1;
				v.$refs.picker.open();
			},
			deltetExperience(index) {
				const v = this;
				MessageBox.confirm('确定删除该条经历吗?', '提示', {
					confirmButtonClass: 'pw-wx-mint-confirm-btn'
				}).then(action => {
					v.myInfo.start_time.splice(index, 1);
					v.myInfo.end_time.splice(index, 1);
					v.myInfo.exper.splice(index, 1);
					v.myInfo.workjob.splice(index, 1);
					v.experienceNum--
				}).catch(err => {

				});
			},
			save() {
				const v = this;
				if(v.experienceNum == 0) {
					Toast('请至少填写一条学习或工作经历');
					return false;
				}
				for(let i = 0; i < v.experienceNum; i++) {
					if(v.myInfo.start_time[i] == '') {
						Toast("第" + (i + 1) + "个经历的起始时间不能为空");
						return false;
					} else if(v.myInfo.end_time[i] == '') {
						Toast("第" + (i + 1) + "个经历的截止时间不能为空");
						return false;
					} else if(v.myInfo.exper[i] == '') {
						Toast("第" + (i + 1) + "个经历的学习或工作经历不能为空");
						return false;
					} else if(v.myInfo.workjob[i] == '') {
						Toast("第" + (i + 1) + "个经历的职务名称不能为空");
						return false;
					}
				}
				localStorage.vol_start_time = JSON.stringify(v.myInfo.start_time);
				localStorage.vol_end_time = JSON.stringify(v.myInfo.end_time);
				localStorage.vol_exper = JSON.stringify(v.myInfo.exper);
				localStorage.vol_workjob = JSON.stringify(v.myInfo.workjob);
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
	/deep/ .mint-cell-swipe-button {
		font-size: 16px;
		text-align: center;
		vertical-align: middle;
		padding: 0;
		line-height: 150px;
	}
	
	/deep/ .mint-cell-wrapper {
		padding: 0;
	}
	
	/deep/ .picker-toolbar {
		height: 45px;
		background: #F1F1F1;
	}
	
	/deep/ .mint-datetime-action {
		line-height: 45px;
		text-align: left;
		padding-left: 20px;
		font-size: 18px;
	}
	
	/deep/ .mint-datetime-cancel {
		color: rgba(0, 0, 0, .6);
	}
	
	/deep/ .mint-datetime-confirm {
		color: #CC974C;
		text-align: right;
		padding-right: 20px;
	}
	
	/deep/ .mint-msgbox-confirm {
		color: #CC974C!important;
	}
	
	.my-speciality {
		background: #F2F2F2;
		min-height: 100vh;
		overflow: hidden;
	}
	
	.info-box {
		width: 375px;
		background: #fff;
		margin-bottom: 10px;
		position: relative;
	}
	
	.del-icon span {
		display: block;
		width: 10px;
		height: 2px;
		background: #fff;
		margin: 9px 5px;
	}
	
	.del-icon {
		position: absolute;
		top: 65px;
		left: 10px;
		width: 20px;
		height: 20px;
		background: #F25454;
		border-radius: 10px;
	}
	
	.item-info {
		width: 335px;
		height: 50px;
		float: right;
	}
	
	.item-info p {
		width: 130px;
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
		width: 205px;
		float: left;
		border: 0;
		height: 49px;
		outline: none;
		background: #fff;
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
	
	.add-experience {
		width: 100%;
		height: 50px;
		background: #fff;
		margin-top: 10px;
		text-align: center;
	}
	
	.item-info-top {
		overflow: hidden;
		margin-top: 15px;
		display: inline-block;
	}
	
	.item-info-top img {
		display: block;
		width: 18px;
		height: 18px;
		float: left;
		margin-right: 7px;
	}
	
	.item-info-top p {
		font-size: 18px;
		color: #BD8C47;
		float: left;
	}
</style>