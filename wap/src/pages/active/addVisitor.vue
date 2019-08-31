<template>
	<div class="add-visitor">
		<div class="base-info">
			<p class="name" style="font-size: 18px;">{{active_name}}</p>
			<p class="time">{{selected_time}}</p>
			<p class="place single-line-text">{{active_place}}</p>
			<p class="phone">
				<span style="float: left;"><span style="color: #E32A2A;">* </span>联系电话</span>
				<input type="number" placeholder="请输入联系人手机号码" v-model="contact_phone" />
			</p>
		</div>
		<div class="visitor-selected">
			<ul>
				<li v-for="(item,index) in visitorNameList">
					<div style="float: left;">
						<p style="font-size: 16px;line-height: 16px;margin: 10px 0 8px 0;color: #282828;">{{item}}</p>
						<p style="color: #545454;font-size: 14px;">身份证{{visitorIdNumberList[index]}}</p>
					</div>
					<img src="../../img/active/active_del.png" @click="delVisitor(item,1)" />
				</li>
				<li v-for="(item,index) in children_username">
					<div style="float: left;">
						<p style="font-size: 16px;line-height: 16px;margin: 10px 0 8px 0;color: #282828;">{{item}}</p>
						<p style="color: #545454;font-size: 14px;">身份证{{children_card_num[index]}}</p>
					</div>
					<img src="../../img/active/active_del.png" @click="delVisitor(item,2)" />
				</li>
			</ul>
		</div>
		<div class="add-btn-box" v-if="visitorNameList.length + children_username.length < maxNum">
			<div class="add-btn" @click="$router.push({path:'/active/newadd',query:{addVisitor:'yes'}})">
				<img src="../../img/active/active_add.png" />
				<span>添加参与者</span>
				<span style="color: #B0B0B0;font-size: 14px;" v-if="is_type == 1">（最多五人）</span>
				<span style="color: #B0B0B0;font-size: 14px;" v-if="is_type == 2">（必填两人）</span>
			</div>
			<div class="open-voluntor" @click="getContactsList()">
				<img src="../../img/pw/person.png" />
			</div>
		</div>
		<div class="unit-price" v-if="visitorNameList.length > 0">
			总计￥<span style="font-size: 24px;" v-if="is_type == 1">{{default_price*(visitorNameList.length)}}</span>
			<span style="font-size: 24px;" v-if="is_type == 2">{{default_price}}</span>
		</div>
		<div class="unit-price" v-if="visitorNameList.length == 0">
			费用￥<span style="font-size: 24px;">{{default_price}}</span>/{{is_type == 2?'组':'人'}}
		</div>
		<div class="next-step" @click="nextStep()">
			下一步
		</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="visitor-box">
				<div class="operation-btn">
					<span style="float: left;" @click="cancel()">取消</span>
					<span style="float: right;color: #CC974C;" @click="confirm()">确定</span>
				</div>
				<div class="add-btn" @click="addLinkman()">
					<img src="../../img/active/active_add.png" />
					<span>新增</span>
				</div>
				<mt-spinner :type="2" v-if="!contactRequestStatus"></mt-spinner>
				<div class="visitor-list">
					<p style="line-height: 40px;text-align: center;color: #ccc;background: #F1F1F1;" v-if="contactRequestStatus && visitorList.length == 0">暂无数据,快去新增吧~</p>
					<ul>
						<li v-for="(item,index) in visitorList">
							<mt-cell-swipe :right="[{content: '删除',style: { background: 'red', color: '#fff',width:'76px'},handler: () => {deltetVisitor(item.id)}}]">
								<div style="width: 450px;height: 56px;">
									<div class="main-box">
										<img src="../../img/active/active_redact.png" @click="redact(item.name,1,item.card_num,item.id)" />
										<div class="visitor-info">
											<p style="font-size: 17px;color: #282828;">{{item.name}}</p>
											<p style="font-size: 14px;color: #545454;">{{item.card_num}}</p>
										</div>
										<div class="select_kuang" :class="{select_act:visitorNameList.indexOf(item.name) != -1 || children_username.indexOf(item.name) != -1}" @click="addVisitors(item.name,1,item.card_num)">

										</div>
									</div>
								</div>
							</mt-cell-swipe>
						</li>
					</ul>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import checkId from "../../bin/common.js";
	import { Popup, Toast, Spinner, CellSwipe, MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				popupVisible: false,
				visitorList: [],
				selected_time: '', //活动时间
				active_name: '', //活动名称
				active_place: '', //活动地点
				visitorNameList: [], //参观者名字数组
				visitorIdTypeList: [], //参观者证件类型数组
				visitorIdNumberList: [], //参观者证件号码数组
				
				children_username:[],
				children_cardtype_id:[],
				children_card_num:[],
				
				contact_phone: '',
				default_price: 0,
				contactRequestStatus:false,
				is_type:'',//1为普通活动2为亲子活动
				maxNum:0,//可添加的参与者最多人数
				children_age_limit_min:'',
				children_age_limit_max:'',
				adult_age_limit_min:'',
				adult_age_limit_max:''
			}
		},
		mounted() {
			const v = this;
			v.is_type = localStorage.is_type;
			v.adult_age_limit_min = localStorage.adult_age_limit_min;
			v.adult_age_limit_max = localStorage.adult_age_limit_max;
			v.maxNum = v.is_type == 1?5:2;
			v.default_price = localStorage.default_price;
			
			v.visitorNameList = localStorage.visitorNameList ? JSON.parse(localStorage.visitorNameList) : [];
			v.visitorIdTypeList = localStorage.visitorIdTypeList ? JSON.parse(localStorage.visitorIdTypeList) : [];
			v.visitorIdNumberList = localStorage.visitorIdNumberList ? JSON.parse(localStorage.visitorIdNumberList) : [];
			if(v.is_type == 2){
				v.children_age_limit_min = localStorage.children_age_limit_min;
				v.children_age_limit_max = localStorage.children_age_limit_max;
				v.children_username = localStorage.children_username ? JSON.parse(localStorage.children_username) : [];
				v.children_cardtype_id = localStorage.children_cardtype_id ? JSON.parse(localStorage.children_cardtype_id) : [];
				v.children_card_num = localStorage.children_card_num ? JSON.parse(localStorage.children_card_num) : [];
			}
			
			v.selected_time = localStorage.selected_time;
			v.active_name = localStorage.active_name;
			v.active_place = localStorage.active_place;
			if(localStorage.contact_phone){
				v.contact_phone = localStorage.contact_phone
			}else{
				v.$api.getPhone().then(res=>{
					v.contact_phone = res.data
				});
			}
		},
		methods: {
			addLinkman(){
				const v = this;
				v.$api.judgeNum().then(res=>{
					if(res.status == 1){
						v.$router.push('/active/newadd')
					}else{
						Toast(res.msg);
					}
				})
			},
			deltetVisitor(val) {
				const v = this;
				MessageBox.confirm('确定删除该常用客户吗?','提示',{
					confirmButtonClass: 'pw-wx-mint-confirm-btn'
				}).then(action => {
					v.$api.delVisitor(val).then(res => {
						if(res.status == 1) {
							Toast('删除成功');
							v.getContactsList()
						} else {
							Toast(res.msg);
						}
					})
				}).catch(err => {
					if(err == 'cancel') { //取消的回调
						v.popupVisible = false;
					}
				});
			},
			getContactsList() {
				const v = this;
				v.visitorList = [];
				v.popupVisible = true;
				v.contactRequestStatus = false;
				setTimeout(function() {
					v.$api.contactsList().then(res => {
						v.contactRequestStatus = true;
						if(res.status == 1) {
							v.visitorList = res.data
						} else {
							Toast(res.msg);
						}
					})
				}, 500)
			},
			addVisitors(name, idType, iDNumber) {
				const v = this;
				if(v.visitorNameList.indexOf(name) == -1 && v.children_username.indexOf(name) == -1) {
					if(v.visitorNameList.length + v.children_username.length == v.maxNum) {
						if(v.is_type == 1){
							Toast('最多添加五人');
						}else{
							Toast('最多添加两人');
						}
					}else if(v.is_type == 2 && (v.children_age_limit_min <= checkId.analyzeIDCard(iDNumber)) && (checkId.analyzeIDCard(iDNumber) <= v.children_age_limit_max)){
						if(v.is_type == 2 && v.children_username.length == 1){
							Toast('只能添加一个儿童');
							return false;
						}
						v.children_username.push(name);
						v.children_cardtype_id.push(1);
						v.children_card_num.push(iDNumber)
					}else if((v.adult_age_limit_min <= checkId.analyzeIDCard(iDNumber)) && (checkId.analyzeIDCard(iDNumber) <= v.adult_age_limit_max)){
						if(v.is_type == 2 && v.visitorNameList.length == 1){
							Toast('只能添加一个家长');
							return false;
						}
						v.visitorNameList.push(name);
						v.visitorIdTypeList.push(1);
						v.visitorIdNumberList.push(iDNumber)
					}else {
						Toast('此用户不在该活动允许的年龄范围内');
					}
				} else if(v.visitorNameList.indexOf(name) != -1){
					v.visitorNameList.splice(v.visitorNameList.indexOf(name), 1);
					v.visitorIdTypeList.splice(v.visitorNameList.indexOf(name), 1);
					v.visitorIdNumberList.splice(v.visitorNameList.indexOf(name), 1);
				}else if(v.children_username.indexOf(name) != -1){
					v.children_username.splice(v.children_username.indexOf(name), 1);
					v.children_cardtype_id.splice(v.children_username.indexOf(name), 1);
					v.children_card_num.splice(v.children_username.indexOf(name), 1);
				}
			},
			cancel() {
				const v = this;
				v.popupVisible = false;
				v.visitorNameList = localStorage.visitorNameList ? JSON.parse(localStorage.visitorNameList) : [];
				v.visitorIdTypeList = localStorage.visitorIdTypeList ? JSON.parse(localStorage.visitorIdTypeList) : [];
				v.visitorIdNumberList = localStorage.visitorIdNumberList ? JSON.parse(localStorage.visitorIdNumberList) : [];
				if(v.is_type == 2){
					v.children_username = localStorage.children_username ? JSON.parse(localStorage.children_username) : [];
					v.children_cardtype_id = localStorage.children_cardtype_id ? JSON.parse(localStorage.children_cardtype_id) : [];
					v.children_card_num = localStorage.children_card_num ? JSON.parse(localStorage.children_card_num) : [];
				}
			},
			confirm() {
				const v = this;
				v.popupVisible = false;
				localStorage.visitorNameList = JSON.stringify(v.visitorNameList);
				localStorage.visitorIdTypeList = JSON.stringify(v.visitorIdTypeList);
				localStorage.visitorIdNumberList = JSON.stringify(v.visitorIdNumberList);
				if(v.is_type == 2){
					localStorage.children_username = JSON.stringify(v.children_username);
					localStorage.children_cardtype_id = JSON.stringify(v.children_cardtype_id);
					localStorage.children_card_num = JSON.stringify(v.children_card_num);
				}
			},
			delVisitor(name,val) {
				const v = this;
				if(val == 1){
					v.visitorNameList.splice(v.visitorNameList.indexOf(name), 1);
					v.visitorIdTypeList.splice(v.visitorNameList.indexOf(name), 1);
					v.visitorIdNumberList.splice(v.visitorNameList.indexOf(name), 1);
	
					localStorage.visitorNameList = JSON.stringify(v.visitorNameList);
					localStorage.visitorIdTypeList = JSON.stringify(v.visitorIdTypeList);
					localStorage.visitorIdNumberList = JSON.stringify(v.visitorIdNumberList);
				}else{
					v.children_username.splice(v.children_username.indexOf(name), 1);
					v.children_cardtype_id.splice(v.children_username.indexOf(name), 1);
					v.children_card_num.splice(v.children_username.indexOf(name), 1);
	
					localStorage.children_username = JSON.stringify(v.children_username);
					localStorage.children_cardtype_id = JSON.stringify(v.children_cardtype_id);
					localStorage.children_card_num = JSON.stringify(v.children_card_num);
				}
			},
			redact(val, val1, val2, val3) {
				localStorage.temporaryName = val;
				localStorage.temporaryNum = val2;
				this.$router.push({
					path: '/active/newadd',
					query: {
						top_id: val3
					}
				})
			},
			nextStep() {
				const v = this;
				if(v.visitorNameList.length == 0 && v.is_type == 1) {
					Toast('你还没有添加任何参观者,请至少添加一位参观者。');
				} else if(v.visitorNameList.length != 1 && v.is_type == 2){
					Toast('请添加一名家长');
				}else if(v.children_username.length != 1 && v.is_type == 2){
					Toast('请添加一名儿童');
				}else if(v.contact_phone.replace(/\ +/g, "").replace(/[\r\n]/g, "") == "") {
					Toast('手机号码不能为空');
				} else if(!/^1\d{10}$/gi.test(v.contact_phone)) {
					Toast('手机号码格式错误');
				} else {
					localStorage.contact_phone = v.contact_phone;
					v.$router.push('/active/confirminfo')
				}
			}
		}
	}
</script>

<style scoped>
	/deep/ .mint-spinner-triple-bounce {
		margin: 0 auto;
		text-align: center;
		margin-bottom: 10px;
	}
	
	/deep/ .mint-cell-swipe-button {
		text-align: center;
		font-size: 18px;
		height: 55px;
		line-height: 55px;
	}
	
	input::-webkit-input-placeholder {
		color: #B0B0B0;
	}
	
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #B0B0B0;
	}
	
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #B0B0B0;
	}
	
	input:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #B0B0B0;
	}
	
	.add-visitor {
		padding-bottom: 60px;
		background: #F2F2F2;
	}
	
	.base-info {
		background: #fff;
	}
	
	.base-info p {
		width: 336px;
		height: 50px;
		border-bottom: 1px solid #DADADA;
		margin: 0 auto;
		line-height: 50px;
		color: #353535;
		font-size: 14px;
	}
	/*.base-info .place{
		padding: 5px 0;
		line-height: 20px;
		min-height: 50px;
	}*/
	
	.base-info .phone {
		border: 0;
	}
	
	.phone input {
		border: 0;
		outline: none;
		height: 50px;
		float: left;
		margin-left: 13px;
		width: 250px;
	}
	
	.visitor-selected {
		width: 100%;
		margin-top: 10px;
		background: #fff;
	}
	
	.visitor-selected li {
		width: 336px;
		height: 60px;
		margin: 0 auto;
		border-bottom: 1px solid #F2F2F2;
		padding-left: 15px;
		overflow: hidden;
	}
	
	.visitor-selected li:last-child {
		border: 0;
	}
	
	.visitor-selected li img {
		float: right;
		width: 17px;
		height: 19px;
		margin: 20px 0;
	}
	
	.add-btn-box {
		width: 375px;
		height: 48px;
		margin: 10px 0;
	}
	
	.open-voluntor {
		width: 48px;
		height: 48px;
		float: right;
		background: #fff;
	}
	
	.open-voluntor img {
		display: block;
		width: 20px;
		height: 20px;
		margin: 14px;
	}
	
	.add-btn-box .add-btn {
		width: 326px;
		height: 48px;
		float: left;
		margin: 0;
		background: #fff;
	}
	
	.add-btn {
		width: 375px;
		height: 48px;
		margin: 10px 0;
		background: #fff;
	}
	
	.add-btn img {
		width: 19px;
		height: 19px;
		float: left;
		margin: 15px 9px 15px 160px;
	}
	
	.add-btn-box .add-btn img {
		margin: 15px 9px 15px 70px;
	}
	
	.add-btn span {
		font-size: 18px;
		color: #CC974C;
		float: left;
		line-height: 50px;
	}
	
	.unit-price {
		width: 375px;
		height: 50px;
		background: #fff;
		padding-right: 21px;
		text-align: right;
		line-height: 50px;
		color: #EA6B55;
		font-size: 14px;
	}
	
	.visitor-box {
		width: 375px;
		min-height: 50px;
		background: #F1F1F1;
		overflow: hidden;
	}
	
	.operation-btn {
		width: 375px;
		height: 45px;
		background: #F1F1F1;
		padding: 0 20px;
		font-size: 18px;
		line-height: 45px;
		color: #000;
	}
	
	.visitor-list {
		width: 100%;
		background: #fff;
		max-height: 336px;
		overflow-y: scroll;
	}
	
	.visitor-list li {
		height: 56px;
		white-space: nowrap;
		transition: all .3s;
		-webkit-transition: all .3s;
	}
	
	.visitor-list li .main-box {
		width: 336px;
		height: 55px;
		margin: 0 20px;
		border-bottom: 1px solid #DADADA;
		float: left;
	}
	.visitor-list li:last-child .main-box{
		border: 0;
	}
	.visitor-list li img {
		width: 18px;
		height: 20px;
		float: left;
		margin: 18px 0;
		margin-right: 23px;
	}
	
	.visitor-list li:last-child {
		border: 0;
	}
	
	.visitor-info {
		float: left;
	}
	
	.visitor-info p {
		line-height: 20px;
	}
	
	.visitor-info p:first-child {
		margin-top: 8px;
	}
	
	.select_kuang {
		width: 18px;
		height: 18px;
		background: url(../../img/active/active_moreselect.png) no-repeat;
		background-size: 100% 100%;
		float: right;
		margin: 19px 0;
	}
	
	.select_act {
		background: url(../../img/active/select_kuang_act.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.next-step {
		position: fixed;
		width: 347px;
		height: 48px;
		border-radius: 24px;
		background: #CC974C;
		bottom: 6px;
		left: 14px;
		color: #fff;
		font-size: 18px;
		text-align: center;
		line-height: 48px;
	}
</style>