<template>
	<div class="user-r">
		<div class="top-rank" v-if="myinfo.grade_status == 6 || myinfo.grade_status == 5">
			<div class="vip-rank">
				<img :src="rankImg[myinfo.star_status]" />
				<p>志愿者</p>
			</div>
			<p class="rate-text" v-if="myinfo.star_status < 5">志愿服务{{myinfo.count_service_time}}小时，差{{rankDistance}}小时到{{myinfo.star_status + 1}}星志愿者</p>
			<p class="rate-text" v-if="myinfo.star_status > 4">志愿服务{{myinfo.count_service_time}}小时，您已满级！</p>
			<div class="vip_rank_list">
				<div class="star_default star_default0">

				</div>
				<div class="star_default" :class="{star_act1:myinfo.star_status > 0,star_default1:myinfo.star_status < 1}">

				</div>
				<div class="star_default" :class="{star_act2:myinfo.star_status > 1,star_default2:myinfo.star_status < 2}">

				</div>
				<div class="star_default" :class="{star_act3:myinfo.star_status > 2,star_default3:myinfo.star_status < 3}">

				</div>
				<div class="star_default" :class="{star_act4:myinfo.star_status > 3,star_default4:myinfo.star_status < 4}">

				</div>
				<div class="star_default" :class="{star_act5:myinfo.star_status > 4,star_default5:myinfo.star_status < 5}">

				</div>
			</div>
			<div class="progress-bar">
				<div class="dot-box">
					<div class="dot dot_act">

					</div>
					<div class="dot" :class="{dot_act:myinfo.star_status > 0}">

					</div>
					<div class="dot" :class="{dot_act:myinfo.star_status > 1}">

					</div>
					<div class="dot" :class="{dot_act:myinfo.star_status > 2}">

					</div>
					<div class="dot" :class="{dot_act:myinfo.star_status > 3}">

					</div>
					<div class="dot" style="margin: 0;" :class="{dot_act:myinfo.star_status > 4}">

					</div>
				</div>
				<div class="progress-lines">
					<div class="line-val" :style="{width:lineWidth+'px'}">

					</div>
				</div>
			</div>
			<div class="star-text">
				<ul>
					<li>
						<p>志愿者</p>
					</li>
					<li>
						<p>一星志愿者</p>
					</li>
					<li>
						<p>二星志愿者</p>
					</li>
					<li>
						<p>三星志愿者</p>
					</li>
					<li>
						<p>四星志愿者</p>
					</li>
					<li style="margin: 0;">
						<p>五星志愿者</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="tab-box" :class="{tab_box_three:myinfo.grade_status != 6 && myinfo.grade_status != 5}">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="个人信息" name="first">
					<div class="step-bar" v-if="myinfo.grade_status != 6 && myinfo.grade_status != 5">
						<p class="check-status">审核状态：<span>{{checkText}}</span></p>
						<el-steps :active="2" align-center v-if="myinfo.grade_status != 7 && myinfo.grade_status != 8">
							<el-step class="step1" :class="{step_act1:myinfo.grade_status == 1}" title="报名" icon="icon"></el-step>
							<el-step class="step2" :class="{step_act2:myinfo.grade_status == 2}" title="面试" icon="icon"></el-step>
							<el-step class="step3" :class="{step_act3:myinfo.grade_status == 3}" title="培训" icon="icon"></el-step>
							<el-step class="step4" :class="{step_act4:myinfo.grade_status == 4}" title="考核" icon="icon"></el-step>
							<el-step class="step5" :class="{step_act5:myinfo.grade_status == 5}" title="见习" icon="icon"></el-step>
							<el-step class="step6" title="转正" icon="icon"></el-step>
						</el-steps>
					</div>
					<div style="position: relative;">
						<div class="common-title">
							<span class="dot"></span>
							<span class="small-title">基本信息</span>
						</div>
						<div class="amend" @click="isChangeInfo = true" v-if="myinfo.grade_status != 8">
							<img src="../../img/volunteer/vol_change_info.png" style="margin-right: 10px;" /><span>修改</span>
						</div>
					</div>
					<div class="amend-tc fixed-center" v-if="isChangeInfo">
						<div class="close-tc" @click="cancelChange()">

						</div>
						<div class="common-title" style="margin: 102px 0 20px 82px;">
							<span class="dot"></span>
							<span class="small-title">意向服务</span>
						</div>
						<div style="font-size: 16px;color: #313131;line-height: 40px;height: 48px;padding-left: 37px;margin-left: 82px;">
							意向服务时间
						</div>
						<div class="select-frame">
							<div class="serve-date">
								<p @click="workTimeType(1)" :class="{serve_date_act:worktime_type == 1}">通用时间</p>
								<p @click="workTimeType(2)" :class="{serve_date_act:worktime_type == 2}" style="border-left: 1px solid #000;border-right: 1px solid #000;">寒假时间</p>
								<p @click="workTimeType(3)" :class="{serve_date_act:worktime_type == 3}">暑假时间</p>
							</div>
							<div class="serve-frame">
								<ul>
									<li v-for="(item,index) in serveFrameList" :class="{serve_frame_act:worktime.indexOf(item.val) != -1,no_margin:index == 6 || index == 13}" @click="selectServeFrame(item.val)">{{item.text}}</li>
								</ul>
							</div>
						</div>
						<div style="font-size: 16px;color: #313131;line-height: 40px;height: 48px;padding-left: 37px;margin-left: 82px;">
							意向服务岗位
						</div>
						<div class="job-list">
							<ul>
								<li v-for="(item,index) in workList" @click="selectJob(item.id)" :class="{job_act:vol_work.indexOf(item.id) != -1}">{{item.title}}</li>
							</ul>
						</div>
						<div class="input-box">
							<p><span>联系电话</span></p>
							<input type="text" placeholder="请填写电话号码" v-model="userPhone" />
						</div>
						<div class="amend-btn">
							<input type="button" value="取消修改" style="margin-right: 68px;" @click="cancelChange()" />
							<input type="button" value="确认修改" style="background: #B47C2D;" @click="changeInfo()" />
						</div>
					</div>
					<div class="zhezhao" v-if="isChangeInfo">

					</div>
					<table class="user-info" border="1">
						<tr>
							<td class="td-title">姓名</td>
							<td>{{myinfo.name}}</td>
							<td class="td-title">性别</td>
							<td>{{myinfo.sex == 1?"男":"女"}}</td>
							<td rowspan="5" style="width: 210px;"><img :src="myinfo.img" style="max-width: 184px;max-height: 240px;display: block;margin: 18px 13px;" /></td>
						</tr>
						<tr>
							<td class="td-title">民族</td>
							<td>{{myinfo.nation}}</td>
							<td class="td-title">出生年月</td>
							<td>{{myinfo.birthday}}</td>
						</tr>
						<tr>
							<td class="td-title">政治面貌</td>
							<td>{{myinfo.politician}}</td>
							<td class="td-title">籍贯</td>
							<td>{{myinfo.native}}</td>
						</tr>
						<tr>
							<td class="td-title">学历</td>
							<td>{{myinfo.education}}</td>
							<td class="td-title">身高</td>
							<td>{{myinfo.height}}</td>
						</tr>
						<tr>
							<td class="td-title">毕业时间</td>
							<td>{{myinfo.graduation_date}}</td>
							<td class="td-title">邮编</td>
							<td>{{myinfo.zip_code}}</td>
						</tr>
						<tr>
							<td class="td-title">联系手机</td>
							<td>{{myinfo.phone}}</td>
							<td class="td-title">邮箱</td>
							<td colspan="2">{{myinfo.email}}</td>
						</tr>
						<tr>
							<td class="td-title">身份证号</td>
							<td>{{myinfo.cardid}}</td>
							<td class="td-title">婚否</td>
							<td colspan="2">{{myinfo.is_marry == 1?"已婚":"未婚"}}</td>
						</tr>
						<tr>
							<td class="td-title">毕业院校（系）专业</td>
							<td colspan="4">{{myinfo.professional}}</td>
						</tr>
						<tr>
							<td class="td-title">工作单位</td>
							<td colspan="4">{{myinfo.workunit}}</td>
						</tr>
						<tr>
							<td class="td-title">特长</td>
							<td colspan="4">{{myinfo.specialty}}</td>
						</tr>
						<tr>
							<td class="td-title">家庭住址</td>
							<td colspan="4">{{myinfo.address}}</td>
						</tr>
					</table>
					<div class="common-title">
						<span class="dot"></span>
						<span class="small-title">学习及工作经历</span>
					</div>
					<table class="user-info" border="1" v-if="myinfo.vol_exper_info">
						<tr>
							<td class="td-title">时间</td>
							<td class="td-title">学习及工作经历</td>
							<td class="td-title">职务职称</td>
						</tr>
						<tr v-for="(item,index) in myinfo.vol_exper_info.start_time">
							<td>{{item}} 至 {{myinfo.vol_exper_info.end_time[index]}}</td>
							<td>{{myinfo.vol_exper_info.exper[index]}}</td>
							<td>{{myinfo.vol_exper_info.workjob[index]}}</td>
						</tr>
					</table>
					<div class="common-title">
						<span class="dot"></span>
						<span class="small-title">意向服务</span>
					</div>
					<table class="user-info" border="1">
						<tr>
							<td class="td-title"> 意向服务时间（{{myinfo.worktime_type_show}}）</td>
							<td>{{myinfo.worktime_show}}</td>
						</tr>
						<tr>
							<td class="td-title">意向岗位</td>
							<td>{{myinfo.vol_work_show}}</td>
						</tr>
					</table>
					<div class="common-title">
						<span class="dot"></span>
						<span class="small-title">历史服务信息（选填）</span>
					</div>
					<table class="user-info" border="1">
						<tr>
							<td class="td-title">注册时间</td>
							<td class="td-title">岗位</td>
							<td class="td-title">注册月数</td>
							<td class="td-title">年度/总服务次数</td>
							<td class="td-title">志愿者等级</td>
							<td class="td-title">年度/总服务时长</td>
						</tr>
						<tr>
							<td>{{myinfo.history_reg}}</td>
							<td>{{myinfo.history_work}}</td>
							<td>{{myinfo.history_month}}</td>
							<td>{{myinfo.history_service_num}}</td>
							<td>{{myinfo.history_grade}}</td>
							<td>{{myinfo.history_service_time}}</td>
						</tr>
					</table>
					<div style="width: 960px;height: 5px;background: #E8D7C0;margin-bottom: 60px;">

					</div>
				</el-tab-pane>
				<el-tab-pane label="参加记录" name="second">
					<div class="no-data" v-if="recordList.length == 0 && requested">
						<img src="../../img/active/pc_no_data_icon.png" />
						<p style="margin-top: 30px;">您还没有进行过报名</p>
						<p style="color: #B47C2D;cursor: pointer;" @click="$router.push('/volunteer/volrecruitlist')">快去报名吧～</p>
					</div>
					<table class="join-record" v-if="recordList.length > 0">
						<tr>
							<th>序号</th>
							<th>活动名称</th>
							<th>活动时间</th>
							<th>活动地址</th>
							<th>岗位</th>
							<th>服务时长/h</th>
							<th>活动状态</th>
							<th>操作</th>
						</tr>
						<tr v-for="(item,index) in recordList">
							<td>{{index+1}}</td>
							<td>{{item.title}}</td>
							<td>{{item.active_date}}</td>
							<td>{{item.active_place}}</td>
							<td>{{item.recruit_job}}</td>
							<td>{{item.service_time}}</td>
							<td>{{item.order_status_show}}</td>
							<td>
								<input type="button" value="取消报名" class="cancel-join" v-if="item.can_refund" @click="cancelJoin(item.order_id)" />
								<input type="button" value="查看详情" class="see-detail" @click="$router.push({path:'/volunteer/volorderdetail',query:{order_id:item.order_id,active_id:item.id}})" />
							</td>
						</tr>
					</table>
				</el-tab-pane>
				<el-tab-pane label="讲解记录" name="third" >
					<div class="status-nav">
						<p @click="getExplainRecord(0)" :class="{explain_act:explainStatus == 0}">全部</p>
						<p @click="getExplainRecord(1)" :class="{explain_act:explainStatus == 1}">待参加</p>
						<p @click="getExplainRecord(2)" :class="{explain_act:explainStatus == 2}">已参加</p>
					</div>
					<p style="color: #909399;text-align: center;line-height: 60px;" v-if="explainRecord.length == 0">暂无数据</p>
					<table class="join-record" v-if="explainRecord.length > 0">
						<tr>
							<th>序号</th>
							<th>活动名称</th>
							<th>活动时间</th>
							<th>活动地址</th>
							<th>岗位</th>
							<th>服务时长/h</th>
							<th>活动状态</th>
							<th>签到时间</th>
							<th>签退时间</th>
						</tr>
						<tr v-for="(item,index) in explainRecord">
							<td>{{index+1}}</td>
							<td>{{item.title}}</td>
							<td>{{item.active_date}}</td>
							<td>{{item.active_place}}</td>
							<td>{{item.recruit_job}}</td>
							<td>{{item.service_time}}</td>
							<td>{{item.order_status_show}}</td>
							<td>{{item.i_qd_time}}</td>
							<td>{{item.i_qt_time}}</td>
						</tr>
					</table>
				</el-tab-pane>
				<el-tab-pane label="我的培训/考核" name="fourth">
					<p style="color: #909399;text-align: center;line-height: 60px;" v-if="assessList.length == 0">暂无数据</p>
					<table class="my-assess" v-if="assessList.length > 0">
						<tr>
							<th>时间</th>
							<th>名称</th>
							<th>类型</th>
							<th>结果</th>
						</tr>
						<tr v-for="(item,index) in assessList">
							<td>{{item.join_time}}</td>
							<td>{{item.title}}</td>
							<td>{{item.is_type}}</td>
							<td>{{item.status}}</td>
						</tr>
					</table>
				</el-tab-pane>
				<el-tab-pane label="志愿服务证明申请" name="fifth" v-if="myinfo.grade_status == 5 || myinfo.grade_status == 6">
					<div class="add-assess">
						<input type="button" value="新增申请" @click="addAssess()" />
					</div>
					<p style="color: #909399;text-align: center;line-height: 60px;" v-if="testifyList.length == 0">暂无数据</p>
					<table class="my-assess" v-if="testifyList.length > 0">
						<tr>
							<th>序号</th>
							<th>申请起止时间</th>
							<th>创建时间</th>
							<th>审核状态</th>
							<th>操作</th>
						</tr>
						<tr v-for="(item,index) in testifyList">
							<td>{{index+1}}</td>
							<td>{{item.start_date}}至{{item.end_date}}</td>
							<td>{{item.created_at}}</td>
							<td>{{item.status_show}}</td>
							<td><input type="button" value="下载" class="down-load" :class="{forbid_load:item.status != 2}" @click="loadTestify(item.aid)" /></td>
						</tr>
					</table>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="zhezhao" v-if="toAssess">

		</div>
		<div class="assess-tc fixed-center" v-if="toAssess">
			<p class="title">申请证明</p>
			<div class="select-date">
				<p>申请证明时间：</p>
				<el-date-picker v-model="startEndTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div class="tc-btns">
				<input type="button" value="取消" class="cancel-btn" @click="cancelAssess()" />
				<input type="button" value="提交" class="submit-btn" @click="submitAssess()" />
			</div>
		</div>
		<div class="tip" style="z-index: 2002;">
			{{tipText}}
		</div>
		<img src="../../img/volunteer/vol_credential.jpg" id="lamp" style="display: none;" />
		<canvas id="myCanvas" width="1200" height="864" style="display: none;">
			Your browser does not support the HTML5 canvas tag.
		</canvas>
		<page :totalPages='totalPages' @presentPage='getPresentPage' v-if="totalPages > 1" style="margin-top: 20px;"></page>
	</div>
</template>
<script>
	import page from "../../components/pcpaging.vue";
	export default {
		data() {
			return {
				isChangeInfo: false,
				serveFrameList: [{
						text: '周一上午',
						val: 1
					},
					{
						text: '周二上午',
						val: 3
					},
					{
						text: '周三上午',
						val: 5
					},
					{
						text: '周四上午',
						val: 7
					},
					{
						text: '周五上午',
						val: 9
					},
					{
						text: '周六上午',
						val: 11
					},
					{
						text: '周日上午',
						val: 13
					},
					{
						text: '周一下午',
						val: 2
					},
					{
						text: '周二下午',
						val: 4
					},
					{
						text: '周三下午',
						val: 6
					},
					{
						text: '周四下午',
						val: 8
					},
					{
						text: '周五下午',
						val: 10
					},
					{
						text: '周六下午',
						val: 12
					},
					{
						text: '周日下午',
						val: 14
					}
				],
				workList: [], //岗位列表
				worktime_type: 1, //服务时间类别 1通用 2寒假 3数据
				worktime: [], //1代表周一上午 2代表周一下午 3代表周二上午 4代表周二下午 以此类推
				vol_work: [], //服务岗位
				userPhone: '', //联系电话
				tipText: '',
				activeName: 'first',
				myinfo: {},
				rankImg: [
					require('../../img/volunteer/vol_vip_rank0.png'),
					require('../../img/volunteer/vol_vip_rank1.png'),
					require('../../img/volunteer/vol_vip_rank2.png'),
					require('../../img/volunteer/vol_vip_rank3.png'),
					require('../../img/volunteer/vol_vip_rank4.png'),
					require('../../img/volunteer/vol_vip_rank5.png'),
				],
				rankDistance: '',
				lineWidth: '',
				recordList: [],
				assessList: [],
				testifyList: [],
				totalPages: 0, //总页数
				page: 1, //当前页
				tabIndex: 1,
				toAssess: false,
				startEndTime: [], //证明申请起止时间
				requested: false,
				checkText:'',
				explainStatus:0,//订单状态 0为全部 1待参加，2已参加
				explainRecord:[],//讲解记录
			}
		},
		mounted() {
			this.getUserVolInfo();
			this.getJobList()
		},
		methods: {
			getJobList() {
				this.$api.jobList().then(res => {
					if(res.status == 1) {
						this.workList = res.data
					}
				})
			},
			cancelAssess() {
				this.toAssess = false;
				this.startEndTime = [];
			},
			submitAssess() {
				const v = this;
				console.log(v.startEndTime);
				if((v.startEndTime && v.startEndTime.length < 2) || v.startEndTime == null) {
					v.tipText = '！请选择起止日期';
					v.hideText();
					return false;
				}
				v.$api.assessTestify(v.myinfo.id, v.startEndTime[0], v.startEndTime[1]).then(res => {
					if(res.status == 1) {
						v.tipText = '申请成功！';
						v.toAssess = false;
						v.startEndTime = [];
						v.hideText();
						v.getTestifyApply()
						return false;
					} else {
						v.tipText = res.msg;
						v.hideText();
						return false;
					}
				})
			},
			addAssess() {
				this.toAssess = true;
			},
			loadTestify(aid) {
				this.$api.testifyLoad(this.myinfo.id, aid).then(res => {
					if(res.status == 1) {
						var c = document.getElementById("myCanvas");
						var ctx = c.getContext("2d");
						ctx.clearRect(0, 0, c.width, c.height);
						var img = document.getElementById("lamp")
						var pat = ctx.createPattern(img, "no-repeat");
						ctx.rect(0, 0, 1200, 864);
						ctx.fillStyle = pat;
						ctx.fill();
						ctx.fillStyle = '#000';
						ctx.font = "20px Arial";
						ctx.textAlign = 'left';
						ctx.fillText(res.data.name, 354, 305);
						ctx.fillText(res.data.cardid, 658, 305);
						ctx.fillText(res.data.date_time, 756, 359);
						ctx.fillText(res.data.vol_num, 297, 360);
						ctx.fillText(res.data.start_date, 522, 413);
						ctx.fillText(res.data.end_date, 720, 413);
						ctx.textAlign = 'center';
						ctx.fillText(res.data.service_time, 362, 470);
						ctx.fillText(res.data.service_num, 663, 470);
						ctx.fillText(res.data.star_status, 927, 470);
						var oA = document.createElement("a");
						oA.download = '海博志愿者服务记录证明.png'; // 设置下载的文件名，默认是'下载'
						oA.href = c.toDataURL('image/png');
						document.body.appendChild(oA);
						oA.click();
						oA.remove();
					}
				})
			},
			hideText() {
				setTimeout(() => {
					this.tipText = "";
				}, 2000);
			},
			getTestifyApply() {
				this.$api.testifyApply(this.myinfo.id, this.page).then(res => {
					this.testifyList = res.data.list;
					this.totalPages = Math.ceil(res.data.count / 5);
				})
			},
			getAssessRecord() {
				this.$api.assessRecord(this.page).then(res => {
					this.assessList = res.data.list;
					this.totalPages = Math.ceil(res.data.count / 5);
				})
			},
			handleClick(tab, event) {
				this.totalPages = 0;
				this.page = 1;
				this.tabIndex = tab.index;
				if(tab.index == 1) {
					this.getRecord()
				} else if(tab.index == 2) {
					this.getExplainRecord(0)
				} else if(tab.index == 3) {
					this.getAssessRecord()
				}else if(tab.index == 4){
					this.getTestifyApply()
				}
			},
			getPresentPage(val) {
				const v = this;
				v.page = val
				if(v.tabIndex == 1) {
					this.getRecord()
				} else if(v.tabIndex == 2) {
					this.getExplainRecord(0)
				} else if(v.tabIndex == 3) {
					this.getAssessRecord()
				}else if(v.tabIndex == 4){
					this.getTestifyApply()
				}
			},
			workTimeType(val) { //选择服务时间类别
				this.worktime_type = val
			},
			selectServeFrame(val) { //选择服务时间段
				const v = this;
				if(v.worktime.indexOf(val) != -1) {
					v.worktime.splice(v.worktime.indexOf(val), 1)
				} else {
					v.worktime.push(val)
				}
			},
			selectJob(val) {
				const v = this;
				if(v.vol_work.indexOf(val) != -1) {
					v.vol_work.splice(v.vol_work.indexOf(val), 1)
				} else {
					v.vol_work.push(val)
				}
			},
			changeInfo() {
				const v = this;
				v.$api.changeServeTime(v.myinfo.id, v.worktime_type, v.worktime).then(res => {
					if(res.status == 1) {
						v.$api.changeServeType(v.myinfo.id, v.vol_work).then(res => {
							if(res.status == 1) {
								v.$api.changePhone(v.myinfo.id, v.userPhone).then(res => {
									if(res.status == 1) {
										v.isChangeInfo = false;
										v.getUserVolInfo();
										v.$message({
											message: '信息修改成功',
											type: 'success'
										});
									} else {
										v.$message.error(res.msg);
									}
								});
							} else {
								v.$message.error(res.msg);
							}
						});
					} else {
						v.$message.error(res.msg);
					}
				});
			},
			cancelChange() {
				this.isChangeInfo = false;
				this.getUserVolInfo()
			},
			getUserVolInfo() {
				const v = this;
				v.$api.pcVolInfo().then(res => {
					if(res.status == 1) {
						v.myinfo = res.data;
						if(v.myinfo.grade_status == 8){
							v.$router.replace("/volunteer/applicationresult");
							v.checkText = '审核未通过'
						}else if(v.myinfo.grade_status == 7){
							v.checkText = '重审中'
						}else{
							v.checkText = '审核中'
						}
						v.worktime = [];
						v.vol_work = [];
						v.worktime_type = parseInt(v.myinfo.worktime_type);
						v.userPhone = v.myinfo.phone;
						for(let i = 0; i < v.myinfo.worktime.length; i++) {
							v.worktime.push(parseInt(v.myinfo.worktime[i]))
						}
						for(let i = 0; i < v.myinfo.vol_work.length; i++) {
							v.vol_work.push(parseInt(v.myinfo.vol_work[i]))
						}
						//						v.myinfo.star_status = 0;
						//						v.myinfo.count_service_time = 90;
						if(v.myinfo.star_status == 0) {
							v.rankDistance = 100 - v.myinfo.count_service_time;
							v.lineWidth = 16 + 134 * (v.myinfo.count_service_time / 100)
						} else if(v.myinfo.star_status == 1) {
							v.rankDistance = 300 - v.myinfo.count_service_time;
							v.lineWidth = 166 + 134 * ((v.myinfo.count_service_time - 100) / 200)
						} else if(v.myinfo.star_status == 2) {
							v.rankDistance = 600 - v.myinfo.count_service_time;
							v.lineWidth = 316 + 134 * ((v.myinfo.count_service_time - 300) / 300)
						} else if(v.myinfo.star_status == 3) {
							v.rankDistance = 1000 - v.myinfo.count_service_time;
							v.lineWidth = 466 + 134 * ((v.myinfo.count_service_time - 600) / 400)
						} else if(v.myinfo.star_status == 4) {
							v.rankDistance = 1500 - v.myinfo.count_service_time;
							v.lineWidth = 616 + 134 * ((v.myinfo.count_service_time - 1000) / 500)
						} else if(v.myinfo.star_status == 5) {
							v.rankDistance = 1500 - v.myinfo.count_service_time;
							v.lineWidth = 766
						}
					}
				})
			},
			getRecord() {
				this.$api.pcVolRecord(this.page, '', '', '').then(res => {
					this.requested = true;
					this.recordList = res.data.list;
					this.totalPages = Math.ceil(res.data.count / 5);
				})
			},
			getExplainRecord(val){
				const v = this;
				v.explainStatus = val;
				v.$api.pcExplainRecord(v.page,val).then(res=>{
					v.explainRecord = res.data.list;
					v.totalPages = Math.ceil(res.data.count / 5);
				})
			},
			cancelJoin(order_id) {
				this.$confirm('您确定要取消报名次活动吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$api.cancelJoinVolPc(order_id).then(res => {
						if(res.status == 1) {
							this.$message({
								type: 'success',
								message: '取消成功!'
							});
							this.getRecord()
						} else {
							this.$message({
								type: 'success',
								message: res.msg
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '操作已取消'
					});
				});
			}
		},
		components: {
			page
		}
	};
</script>
<style lang="scss">
	.user-r {
		.no-data{
			overflow: hidden;
			min-height: 800px;
		}
		.no-data img {
			display: block;
			margin: 0 auto;
			margin-top: 190px;
		}
		.no-data p {
			font-size: 20px;
			line-height: 36px;
			color: #959595;
			text-align: center;
		}
		.step-bar {
			width: 960px;
			height: 120px;
			overflow: hidden;
		}
		.check-status {
			font-size: 22px;
			color: #000;
			float: left;
			line-height: 120px;
		}
		.check-status span {
			color: #B47C2D;
		}
		/deep/ .el-steps {
			width: 573px;
			margin-top: 30px;
			float: right;
		}
		/deep/ .el-step__title {
			color: #000;
			font-weight: 700;
		}
		/deep/ .el-step__head {
			border-color: #A0A0A0;
		}
		/deep/ .icon {
			width: 40px;
			height: 23px;
			background-position: left center;
		}
		.step_act1 .icon,
		.step_act2 .icon,
		.step_act3 .icon,
		.step_act4 .icon,
		.step_act5 .icon {
			height: 35px;
		}
		/deep/ .step1 .icon {
			background: url(../../img/active/pc_avtive_step1.png) no-repeat;
		}
		/deep/ .step_act1 .icon {
			background: url(../../img/active/pc_avtive_act1.png) no-repeat;
		}
		/deep/ .step2 .icon {
			background: url(../../img/active/pc_avtive_step2.png) no-repeat;
		}
		/deep/ .step_act2 .icon {
			background: url(../../img/active/pc_avtive_act2.png) no-repeat;
		}
		/deep/ .step3 .icon {
			background: url(../../img/active/pc_avtive_step3.png) no-repeat;
		}
		/deep/ .step_act3 .icon {
			background: url(../../img/active/pc_avtive_act3.png) no-repeat;
		}
		/deep/ .step4 .icon {
			background: url(../../img/active/pc_avtive_step4.png) no-repeat;
		}
		/deep/ .step_act4 .icon {
			background: url(../../img/active/pc_avtive_act4.png) no-repeat;
		}
		/deep/ .step5 .icon {
			background: url(../../img/active/pc_avtive_step5.png) no-repeat;
		}
		/deep/ .step_act5 .icon {
			background: url(../../img/active/pc_avtive_act5.png) no-repeat;
		}
		/deep/ .step6 .icon {
			background: url(../../img/active/pc_avtive_step4.png) no-repeat;
		}
		/*fan*/
		.top-rank {
			width: 960px;
			height: 250px;
			background: #384355;
			overflow: hidden;
		}
		.vip-rank {
			font-size: 32px;
			line-height: 36px;
			color: #fff;
			width: 200px;
			margin: 0 auto;
			margin-top: 30px;
			overflow: hidden;
		}
		.vip-rank img {
			float: left;
			margin-top: 2px;
		}
		.vip-rank p {
			float: left;
			margin-left: 10px;
		}
		.rate-text {
			font-size: 16px;
			color: rgba(255, 255, 255, 0.6);
			text-align: center;
			line-height: 16px;
			margin: 17px 0 32px 0;
		}
		.vip_rank_list {
			overflow: hidden;
			margin-left: 66px;
			margin-bottom: 7px;
		}
		.star_default {
			width: 69px;
			height: 26px;
			float: left;
			margin-right: 80px;
		}
		.star_default0 {
			background: url(../../img/volunteer/vol_star_act0.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_default1 {
			background: url(../../img/volunteer/pc_vol_starone.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_act1 {
			background: url(../../img/volunteer/vol_star_act1.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_default2 {
			background: url(../../img/volunteer/pc_vol_startwo.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_act2 {
			background: url(../../img/volunteer/vol_star_act2.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_default3 {
			background: url(../../img/volunteer/pc_vol_starthree.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_act3 {
			background: url(../../img/volunteer/vol_star_act3.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_default4 {
			background: url(../../img/volunteer/pc_vol_starfour.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_act4 {
			background: url(../../img/volunteer/vol_star_act4.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_default5 {
			background: url(../../img/volunteer/pc_vol_starfive.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.star_act5 {
			background: url(../../img/volunteer/vol_star_act5.png) no-repeat left center;
			background-size: 100% 100%;
		}
		.progress-bar {
			width: 780px;
			height: 16px;
			margin-left: 90px;
			overflow: hidden;
			margin-bottom: 8px;
			position: relative;
		}
		.dot-box {
			position: absolute;
			width: 780px;
			height: 16px;
			top: 0;
			left: 0;
			z-index: 999;
		}
		.progress-lines {
			position: absolute;
			width: 766px;
			height: 2px;
			overflow: hidden;
			border-radius: 1px;
			background: #616d7d;
			top: 7px;
			left: 0;
		}
		.line-val {
			width: 100px;
			height: 2px;
			background: #ecb940;
		}
		.progress-bar .dot {
			width: 16px;
			height: 16px;
			float: left;
			margin-right: 134px;
			background: #616d7d;
			border-radius: 8px;
		}
		.progress-bar .dot:last-child {
			margin: 0;
		}
		.progress-bar .dot_act {
			background: #ecb940;
		}
		.star-text {
			margin-left: 50px;
		}
		.star-text li {
			width: 90px;
			float: left;
			font-size: 13px;
			/*line-height: 18px;*/
			color: #fff;
			height: 36px;
			margin-right: 60px;
		}
		.star-text li p {
			text-align: center;
			line-height: 18px;
		}
		.tab-box {
			margin-top: 25px;
		}
		.common-title {
			width: 320px;
			height: 62px;
			background: #f4f4f4;
			border-radius: 31px;
			margin-bottom: 20px;
		}
		.common-title .dot {
			display: block;
			width: 10px;
			height: 10px;
			border-radius: 5px;
			float: left;
			background: #b47c2d;
			margin: 26px 23px 26px 37px;
		}
		.common-title .small-title {
			font-size: 18px;
			color: #000;
			line-height: 62px;
			float: left;
		}
		.status-nav{
			width:960px;
			height:50px;
			background:#EBECEE;
			margin:10px auto;
			color: #8B8B8B;
			font-size: 16px;
		}
		.status-nav p{
			width: 200px;
			height: 20px;
			line-height: 20px;
			text-align: center;
			border-right: 1px solid #aaa;
			margin: 15px 0;
			float: left;
			cursor: pointer;
		}
		.status-nav p:last-child{
			border: 0;
		}
		.status-nav .explain_act{
			color: #B47C2D;
		}
		.el-tabs__item {
			width: auto;
			text-align: center;
			font-size: 22px;
			height: 52px;
			line-height: 52px;
		}
		#tab-first,#tab-second,#tab-third{
			width: 160px;
		}
		#tab-fourth,#tab-fifth{
			width: 240px;
		}
		.tab_box_three #tab-first,.tab_box_three #tab-second,.tab_box_three #tab-third,.tab_box_three #tab-fourth{
			width: 240px;
		}
		.el-tabs__active-bar {
			background: #d49451;
		}
		.el-tabs__item:hover {
			color: #c39657;
		}
		.el-tabs__item.is-active {
			color: #c39657;
		}
		/deep/ .el-tabs__content{
			min-height: 610px;
		}
		.add-assess {
			width: 960px;
			height: 60px;
			background: #ebecee;
		}
		.add-assess input {
			display: block;
			width: 115px;
			height: 40px;
			font-size: 16px;
			color: #fff;
			cursor: pointer;
			border-radius: 20px;
			float: right;
			margin: 10px 25px;
			background: #b47c2d;
		}
		.amend {
			position: absolute;
			width: 150px;
			height: 48px;
			top: 0;
			right: 0;
			border-radius: 24px;
			background: #b47c2d;
			font-size: 20px;
			color: #fff;
			text-align: center;
			line-height: 48px;
			cursor: pointer;
		}
		.zhezhao {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 1999;
		}
		.amend-tc {
			position: fixed;
			width: 1200px;
			background: #fff;
			z-index: 2000;
			overflow: hidden;
		}
		.close-tc {
			width: 24px;
			height: 24px;
			background: url(../../img/volunteer/vol_colse_icon.png) no-repeat;
			position: absolute;
			top: 40px;
			right: 40px;
			cursor: pointer;
		}
		.select-frame {
			overflow: hidden;
			font-size: 16px;
			color: #313131;
		}
		.serve-date {
			width: 1038px;
			height: 58px;
			border: 1px solid #eee;
			margin: 0 auto;
			margin-bottom: 20px;
		}
		.serve-date p {
			width: 345px;
			float: left;
			text-align: center;
			margin-top: 16px;
			cursor: pointer;
			line-height: 24px;
		}
		.serve-date .serve_date_act {
			color: #b47c2d;
		}
		.serve-frame {
			overflow: hidden;
			width: 1038px;
			margin: 0 auto;
		}
		.serve-frame li {
			width: 90px;
			height: 50px;
			line-height: 50px;
			float: left;
			text-align: right;
			margin-right: 68px;
			background: url(../../img/volunteer/vol_check_box.png) no-repeat left center;
			cursor: pointer;
		}
		.serve-frame .no_margin {
			margin: 0;
		}
		.serve-frame .serve_frame_act {
			background: url(../../img/volunteer/vol_check_act.png) no-repeat left center;
		}
		.job-list {
			width: 1040px;
			margin: 0 auto;
			border: 1px solid rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
			border-radius: 1px;
			overflow: hidden;
			margin-bottom: 40px;
			padding: 10px 0;
		}
		.job-list li {
			width: 178px;
			margin-left: 50px;
			height: 50px;
			line-height: 50px;
			padding-left: 28px;
			float: left;
			background: url(../../img/volunteer/vol_check_box.png) no-repeat left center;
			cursor: pointer;
		}
		.job-list .job_act {
			background: url(../../img/volunteer/vol_check_act.png) no-repeat left center;
		}
		.input-box {
			overflow: hidden;
			margin: 20px 45px;
		}
		.input-box input {
			width: 265px;
			height: 56px;
			border: 1px solid #eee;
			box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
			border-radius: 1px;
			padding-left: 12px;
			float: left;
		}
		.input-box .required_act {
			border-color: red;
		}
		.input-box p {
			display: block;
			width: 120px;
			height: 56px;
			line-height: 56px;
			float: left;
			text-align: right;
			padding-right: 17px;
			font-size: 16px;
			color: #313131;
		}
		.input-box p span {
			float: right;
		}
		.amend-btn {
			width: 482px;
			overflow: hidden;
			margin: 60px auto;
		}
		.amend-btn input {
			width: 207px;
			height: 48px;
			border-radius: 24px;
			font-size: 16px;
			color: #fff;
			display: block;
			float: left;
			cursor: pointer;
		}
		.user-info {
			width: 960px;
			border: 1px solid #fbe8cf;
			margin-bottom: 20px;
		}
		.user-info td {
			height: 56px;
			font-size: 18px;
			color: #000;
			text-align: center;
		}
		.td-title{
			background: #FBF8F4;
		}
		.join-record,
		.my-assess {
			width: 960px;
		}
		.join-record th,
		.my-assess th {
			font-size: 16px;
			color: #000;
			height: 64px;
			border-bottom: 1px solid #e5e5e5;
		}
		.join-record td,
		.my-assess td {
			text-align: center;
			font-size: 16px;
			line-height: 30px;
			color: #000;
			padding: 40px 0;
			border-bottom: 1px solid #e5e5e5;
		}
		.assess-tc {
			width: 900px;
			height: 460px;
			background: #fff;
			z-index: 2000;
		}
		.tc-btns {
			overflow: hidden;
			width: 575px;
			margin: 100px auto;
		}
		.tc-btns input {
			float: left;
			width: 240px;
			height: 48px;
			font-size: 16px;
			border-radius: 24px;
			cursor: pointer;
		}
		.tc-btns .cancel-btn {
			margin-right: 95px;
			color: #b47c2d;
			border: 1px solid #b47c2d;
			background: #fff;
		}
		.tc-btns .submit-btn {
			background: #b47c2d;
			color: #fff;
		}
		.assess-tc .title {
			font-size: 24px;
			color: #b47c2d;
			line-height: 24px;
			margin: 70px 0;
			text-align: center;
		}
		.select-date {
			width: 490px;
			height: 40px;
			overflow: hidden;
			margin: 0 auto;
		}
		.select-date p {
			float: left;
			font-size: 20px;
			color: #282828;
			line-height: 40px;
		}
		.el-input__inner {
			float: left;
		}
		.zhezhao {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 1999;
			cursor: pointer;
		}
		.el-date-editor .el-range-separator {
			width: 10%;
		}
		.join-record input {
			display: block;
			cursor: pointer;
			width: 96px;
			height: 26px;
			background: #ddb285;
			color: #fff;
			font-size: 14px;
			border-radius: 13px;
			margin: 10px auto;
		}
		.join-record .cancel-join {}
		.join-record .see-detail {
			background: #fff;
			color: #ddb285;
			border: 1px solid #ddb285;
		}
		.down-load {
			width: 75px;
			height: 26px;
			font-size: 14px;
			color: #ddb285;
			border: 1px solid #ddb285;
			border-radius: 12px;
			cursor: pointer;
			background: #fff;
		}
		.forbid_load{
			pointer-events: none;
			background: #EBECEE;
			color: #fff;
			border: 0;
		}
	}
</style>