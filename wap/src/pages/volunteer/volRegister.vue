<template>
	<div class="vol-register" :class="{fixed_top:scrollTopVal > -1}">
		<p class="common-title">基本信息*</p>
		<div class="item-info" @click="$router.push('/volunteer/volbaseinfo')" v-if="!vol_base_info">
			<div class="item-info-top">
				<img src="../../img/volunteer/vol_add_info.png">
				<p>个人基本信息</p>
			</div>
			<div class="item-info-btm">让我们更多的了解您</div>
		</div>
		<div class="base-info" v-if="vol_base_info">
			<div class="redact" @click="$router.push('/volunteer/volbaseinfo')">编辑</div>
			<p>
				姓
				<span style="color: #fff;">姓名</span> 名：{{myInfo.name}}
			</p>
			<p>
				性
				<span style="color: #fff;">性别</span> 别：{{myInfo.sex == 1?'男':'女'}}
			</p>
			<p>身份证号：{{myInfo.cardid}}</p>
			<p>
				民
				<span style="color: #fff;">民族</span> 族：{{myInfo.nation}}
			</p>
			<p>出生年月：{{myInfo.birthday}}</p>
			<p>政治面貌：{{myInfo.politician}}</p>
			<p>
				籍
				<span style="color: #fff;">籍贯</span> 贯：{{myInfo.native}}
			</p>
			<p>
				学
				<span style="color: #fff;">学历</span> 历：{{myInfo.education}}
			</p>
			<p>
				身
				<span style="color: #fff;">身高</span> 高：{{myInfo.height}}
			</p>
			<p>
				婚
				<span style="color: #fff;">婚否</span> 否：{{myInfo.is_marry == 1?'已婚':'未婚'}}
			</p>
			<p>毕业时间：{{myInfo.graduation_date}}</p>
			<p>毕业院校（系）专业：{{myInfo.professional}}</p>
			<p>工作单位：{{myInfo.workunit}}</p>
			<p>家庭住址：{{myInfo.address}}</p>
			<p>
				邮
				<span style="color: #fff;">邮编</span> 编：{{myInfo.zip_code}}
			</p>
		</div>
		<p class="common-title">联系方式*</p>
		<div class="item-info" @click="$router.push('/volunteer/contactway')" v-if="!vol_contact_way">
			<div class="item-info-top">
				<img src="../../img/volunteer/vol_add_info.png">
				<p>添加联系方式</p>
			</div>
			<div class="item-info-btm">能够让我们联系到您</div>
		</div>
		<div class="base-info" v-if="vol_contact_way">
			<div class="redact" @click="$router.push('/volunteer/contactway')">编辑</div>
			<p>联系电话：{{myInfo.phone}}</p>
			<p>常用邮箱：{{myInfo.email}}</p>
		</div>
		<p class="common-title">专长技能*</p>
		<div class="item-info" @click="$router.push('/volunteer/speciality')" v-if="!vol_specialty_save">
			<div class="item-info-top">
				<img src="../../img/volunteer/vol_add_info.png">
				<p>我的专长技能</p>
			</div>
			<div class="item-info-btm">专长爱好，英语等级？您所擅长的</div>
		</div>
		<div class="base-info" v-if="vol_specialty_save">
			<div class="redact" @click="$router.push('/volunteer/speciality')">编辑</div>
			<p>专长爱好：{{myInfo.specialty}}</p>
		</div>
		<div class="img-box">
			<p class="common-title">个人照片*</p>
			<div class="item-info" @click="clearFile()" v-if="srcUrl == ''">
				<div class="item-info-top">
					<img src="../../img/volunteer/vol_add_info.png">
					<p>添加个人照片</p>
				</div>
				<div class="item-info-btm">请上传一寸免冠照片，展示最真实的您</div>
			</div>
			<div class="base-info" style="padding: 10px;" @click="clearFile()" v-show="srcUrl != ''">
				<input type="file" accept="image/*" @change="upImg($event)" ref="avatarInput2" style="display: none;">
				<div class="redact">编辑</div>
				<img :src="srcUrl" style="width: 76px;display: block;margin: auto;" id="headimg">
				<p style="text-align: center;font-size: 14px;color: #B4B2B2;">点击更换</p>
			</div>
		</div>
		<p class="common-title">学习及工作经历*</p>
		<div class="item-info" @click="$router.push('/volunteer/experience')" v-if="myInfo.start_time.length == 0">
			<div class="item-info-top">
				<img src="../../img/volunteer/vol_add_info.png">
				<p>学习及工作经历</p>
			</div>
			<div class="item-info-btm">添加您的学习和工作经历</div>
		</div>
		<div class="base-info" v-if="myInfo.start_time.length > 0">
			<div class="redact" @click="$router.push('/volunteer/experience')">编辑</div>
			<ul>
				<li v-for="(item,index) in myInfo.start_time">
					<p>时间：{{myInfo.start_time[index]}}至{{myInfo.end_time[index]}}</p>
					<p>学习及工作经历：{{myInfo.exper[index]}}</p>
					<p>职务名称：{{myInfo.workjob[index]}}</p>
				</li>
			</ul>
		</div>
		<p class="common-title">服务时间*</p>
		<div class="item-info" @click="$router.push('/volunteer/servedatetype')" v-if="myInfo.worktime.length == 0">
			<div class="item-info-top">
				<img src="../../img/volunteer/vol_add_info.png">
				<p>意向服务时间</p>
			</div>
			<div class="item-info-btm">选择您的意向服务时间</div>
		</div>
		<div class="base-info" v-if="myInfo.worktime.length > 0">
			<div class="redact" @click="$router.push('/volunteer/servedatetype')">编辑</div>
			<p>{{vol_worktime_type_text}}</p>
			<table border="0" style="width: 304px;">
				<tr v-if="myInfo.worktime.indexOf(1) !=-1 || myInfo.worktime.indexOf(2) !=-1">
					<td>周一</td>
					<td v-if="myInfo.worktime.indexOf(1) !=-1">上午</td>
					<td v-if="myInfo.worktime.indexOf(2) !=-1">下午</td>
				</tr>
				<tr v-if="myInfo.worktime.indexOf(3) !=-1 || myInfo.worktime.indexOf(4) !=-1">
					<td>周二</td>
					<td v-if="myInfo.worktime.indexOf(3) !=-1">上午</td>
					<td v-if="myInfo.worktime.indexOf(4) !=-1">下午</td>
				</tr>
				<tr v-if="myInfo.worktime.indexOf(5) !=-1 || myInfo.worktime.indexOf(6) !=-1">
					<td>周三</td>
					<td v-if="myInfo.worktime.indexOf(5) !=-1">上午</td>
					<td v-if="myInfo.worktime.indexOf(6) !=-1">下午</td>
				</tr>
				<tr v-if="myInfo.worktime.indexOf(7) !=-1 || myInfo.worktime.indexOf(8) !=-1">
					<td>周四</td>
					<td v-if="myInfo.worktime.indexOf(7) !=-1">上午</td>
					<td v-if="myInfo.worktime.indexOf(8) !=-1">下午</td>
				</tr>
				<tr v-if="myInfo.worktime.indexOf(9) !=-1 || myInfo.worktime.indexOf(10) !=-1">
					<td>周五</td>
					<td v-if="myInfo.worktime.indexOf(9) !=-1">上午</td>
					<td v-if="myInfo.worktime.indexOf(10) !=-1">下午</td>
				</tr>
				<tr v-if="myInfo.worktime.indexOf(11) !=-1 || myInfo.worktime.indexOf(12) !=-1">
					<td>周六</td>
					<td v-if="myInfo.worktime.indexOf(11) !=-1">上午</td>
					<td v-if="myInfo.worktime.indexOf(12) !=-1">下午</td>
				</tr>
				<tr v-if="myInfo.worktime.indexOf(13) !=-1 || myInfo.worktime.indexOf(14) !=-1">
					<td>周日</td>
					<td v-if="myInfo.worktime.indexOf(13) !=-1">上午</td>
					<td v-if="myInfo.worktime.indexOf(14) !=-1">下午</td>
				</tr>
			</table>
		</div>
		<p class="common-title">服务岗位*</p>
		<div class="item-info" @click="$router.push('/volunteer/servejob')" v-if="vol_work_text.length == 0">
			<div class="item-info-top">
				<img src="../../img/volunteer/vol_add_info.png">
				<p>意向服务岗位</p>
			</div>
			<div class="item-info-btm">选择您意向从事的志愿者服务岗位</div>
		</div>
		<div class="base-info" v-if="vol_work_text.length > 0">
			<div class="redact" @click="$router.push('/volunteer/servejob')">编辑</div>
			<p v-for="item in vol_work_text">{{item}}</p>
		</div>
		<p class="common-title">
			历史服务信息
			<span style="color: #848483;">（选填）</span>
		</p>
		<div class="item-info" v-if="myInfo.history_reg == '' && myInfo.history_month == '' && myInfo.history_grade == '' && myInfo.history_work == '' && myInfo.history_service_num == '' && myInfo.history_service_time == ''" @click="$router.push('/volunteer/historyserve')">
			<div class="item-info-top">
				<img src="../../img/volunteer/vol_add_info.png">
				<p>历史服务信息（选填）</p>
			</div>
			<div class="item-info-btm">添加您的历史服务信息</div>
		</div>
		<div class="base-info" v-if="!(myInfo.history_reg == '' && myInfo.history_month == '' && myInfo.history_grade == '' && myInfo.history_work == '' && myInfo.history_service_num == '' && myInfo.history_service_time == '')">
			<div class="redact" @click="$router.push('/volunteer/historyserve')">编辑</div>
			<p>注册时间：{{myInfo.history_reg}}</p>
			<p>岗位：{{myInfo.history_month}}</p>
			<p>注册月数：{{myInfo.history_grade}}</p>
			<p>年度/总服务数：{{myInfo.history_work}}</p>
			<p>志愿者等级：{{myInfo.history_service_num}}</p>
			<p>年度/总服务时长：{{myInfo.history_service_time}}</p>
		</div>
		<div class="notice-box" style="background: none;padding: 0;">
			<p>咨询电话：022-67185131</p>
		</div>
		<div class="notice-box" :class="{notice_act:agreeNotice}" @click="agree()">
			<p>
				我已阅读并同意
				<span style="color: #EE8E41;text-decoration: underline;" @click.stop="showNotice(1)">《国家海洋博物馆志愿者管理办法》</span>
			</p>
			<p style="color: #EE8E41;text-decoration: underline;" @click.stop="showNotice(2)">《关于国家海洋博物馆志愿者招募的说明》</p>
		</div>
		<div class="submit-btn" @click="submitForm()" :class="{forbid_click:!agreeNotice}">提交</div>
		<div class="zhezhao" v-if="agreeOne || agreeTwo"></div>
		<div class="notice-tc fixed-center" v-if="agreeOne">
			<div class="close-icon" @click="confirmNotice()"></div>
			<div class="content-box">
				<p style="font-weight: bold;font-size: 13px;text-align: center;">国家海洋博物馆志愿者管理试行办法</p>
				<p class="centered">第一章 总则</p>
				<p>一、国家海洋博物馆</p>
				<p class="retract">国家海洋博物馆负责制定国家海洋博物馆志愿者章程和章程细则。国家海洋博物馆有管理志愿者组织的责任和义务。</p>
				<p>二、国家海洋博物馆宣教部</p>
				<p class="retract">国家海洋博物馆宣教部代表国家海洋博物馆管理国家海洋博物馆志愿者，制定、修改志愿者章程和志愿者章程细则，负责志愿者招聘、培训、管理等各项事务。国家海洋博物馆宣教部任命工作人员代表国家海洋博物馆负责具体工作。</p>
				<p class="centered">第二章 国家海洋博物馆志愿者条件</p>
				<p>一、国家海洋博物馆志愿者基本条件</p>
				<p>一、年龄在18周岁以上，具有独立民事行为能力，身心健康;具有大专、或相当于大专以上的文化程度，身心健康，乐观向上，善于交流，诚实守信，具有团队精神。</p>
				<p>二、具有奉献精神，热心社会公益事业，愿意利用自己的业余时间无偿为公众提供服务;</p>
				<p>三、每年至少服务60小时；</p>
				<p>四、热爱博物馆事业，具有博物馆藏品和海洋历史文化的基础知识，能够使用普通话或其它规范语言;</p>
				<p>五、具有充裕的自由支配时间，能够按时至博物馆从事志愿者工作。</p>
				<p>六、遵守国家海洋博物馆及国家海洋博物馆志愿者的各项规章制度，服从国家海洋博物馆的任务分配和安排。</p>
				<p class="centered">第三章 招募流程</p>
				<p>一、填写报名表</p>
				<p>二、面试</p>
				<p>三、实习志愿者：基础培训与实习（背讲解词一个月），共二个月</p>
				<p>四、正式志愿者：二个月实习期满并考核通过，授予正式志愿工作证</p>
				<p class="centered">第四章 培训流程</p>
				<p>一、国家海洋博物馆整体情况介绍</p>
				<p>二、国家海洋博物馆志愿者相关管理制度介绍</p>
				<p>三、讲解技巧和礼仪培训</p>
				<p>四、国家海洋博物馆展览展项内容培训</p>
				<p>五、志愿者工作心得分享：由馆内资深志愿者和新进者分享他在博物馆做志愿者的心得和经验</p>
				<p>六、志愿者授证仪式。</p>
				<p class="centered">第五章 考核奖励办法</p>
				<p>一、志愿者必须按照国家海洋博物馆提供讲解词的内容进行讲解，不得擅自增减。</p>
				<p>二、首次参加志愿者考核者须经过知识问题及展厅实地讲解两项，合格者方可成国家海洋博物馆正式志愿者，并颁发国家海洋博物馆志愿者手册，每次来馆必须携带。</p>
				<p>三、每年年终将对志愿者进行考核评定，评定内容主要分为：服务时间、讲解场次、督导巡视组评定及观众意见等方面，综合成绩最高者将获得当年优秀志愿者称号，并国家海洋博物馆颁发优秀志愿者证书。</p>
				<p>四、优秀志愿者的照片、姓名、所讲展厅将张贴于国家海洋博物馆优秀志愿者公布栏上予以表彰，时间为一年。</p>
				<p>五、设金奖、银奖二个等级的奖项，金奖为服务时间长、讲解优秀等表现杰出的志愿者，银奖为表现良好，尽职完成工作的志愿者。(获奖人数根据当年具体情况确定)</p>
				<p>六、设立全勤奖，奖励全年出勤且完成最低服务时数的志愿者。</p>
				<p class="centered">第六章 国家海洋博物馆志愿者的权利：</p>
				<p>一、免费参观国家海洋博物馆的基本陈列和临时展览；</p>
				<p>二、受邀参加国家海洋博物馆举办的讲座、特展及其他活动；</p>
				<p>三、协助国家海洋博物馆志愿者的组织管理，就志愿者服务工作提出意见和建议；</p>
				<p>四、志愿者免费参观本馆大型特展。当年度获得优秀志愿者称号和金、银奖者可有两名家属名额享受参加专场招待活动。</p>
				<p>五、服务满一年以上的志愿者可向本馆提出开取志愿者证明或社会实践证明申请；</p>
				<p>六、受邀参加国家海洋博物馆每年度5月19日志愿者日的相关活动。</p>
				<p>七、志愿者年满70岁，在国家海洋博物馆工作满5年且表现优秀者获得“国家海洋博物馆荣誉志愿者”称号，国家海洋博物馆将颁发荣誉证书作为褒奖。国家海洋博物馆不再正式安排“国家海洋博物馆荣誉志愿者”参加志愿者日常工作，“国家海洋博物馆荣誉志愿者”可自主决定是否参加志愿者相关的各项活动。</p>
				<p>八、在国家海洋博物馆工作满5年，并且继续从事国家海洋博物馆志愿者工作的志愿者获得“国家海洋博物馆资深志愿者”称号，国家海洋博物馆将颁发荣誉证书作为嘉奖。</p>
				<p>九、每年开展国家海洋博物馆先进志愿者学习考察活动。</p>
				<p class="centered">第七章 附则</p>
				<p>一、本章程于二○一九年三月一日起生效。</p>
				<p>二、本章程修改权归国家海洋博物馆。</p>
			</div>
			<div class="confirm-btn" @click="confirmNotice()">确定并继续</div>
		</div>
		<div class="notice-tc fixed-center" v-if="agreeTwo">
			<div class="close-icon" @click="confirmNotice()"></div>
			<div class="content-box">
				<p style="font-weight: bold;font-size: 13px;text-align: center;">关于国家海洋博物馆志愿者招募的说明</p>
				<p class="retract">为充分发挥博物馆的社会教育功能，更好地为社会大众提供服务，同时为喜爱文博、热爱公益的朋友搭建实现社会价值和个人价值的平台。国家海洋博物馆现面向社会招募志愿者80名。</p>
				<p>一、招募者条件</p>
				<p class="retract">1.年龄在18-70岁之间，身心健康，热心公益，意愿利用个人时间，无偿为公众服务，能够自觉遵守本馆的各项规章制度。</p>
				<p class="retract">2.每年至少到馆义务服务100小时以上。</p>
				<p class="retract">3.能够在节假日来馆服务者优先考虑。</p>
				<p class="retract">4.热爱文博事业，具有良好的文化素养，海洋、历史、教育、艺术、语言、文博或社会学等相关专业从业人员、学生或有社会志愿经验者优先考虑。</p>
				<p class="retract">5.报名讲解岗位的志愿者，需具备良好的语言表达能力和沟通能力。</p>
				<p class="retract">6.报名活动勤务岗位的志愿者，具备活动策划、平面设计、文案写作等工作经验者优先考虑。</p>
				<p class="retract">7.报名文案编写岗位的志愿者，具备文稿撰写、平面设计等工作经验者优先考虑。</p>
				<p>二、志愿者服务内容</p>
				<p class="retract">服务时间：周二—周五，节假日</p>
				<p>岗位一：讲解岗</p>
				<p class="retract">展厅一：远古海洋</p>
				<p class="retract">招募人数：10人</p>
				<p class="retract">内容简介：从地球的形成引出海洋是怎样形成的思考，通过对海洋的认知，认识到生命最早起源于海洋，以及生物重返海洋的经历，引申出对生命形成的探索，最后说明地球海洋的变化一刻也不会停止，现代海洋世界等待观众去探索和发现。</p>
				<p class="retract">展厅二：今日海洋</p>
				<p class="retract">招募人数：10人</p>
				<p class="retract">内容简介：展示了本底海洋结构、从潮上带、潮间带、潮下带；由极地到热带；由透光层到无光层三条线路介绍了与海洋息息相关的生物结构。以及海洋环境与可持续发展，并展现了在十四、十五世纪，随着大航海时代的兴起，资本主义文明开始在欧洲产生并逐渐向全球扩展，世界从分散走向整体。</p>
				<p class="retract">展厅三：海洋天文</p>
				<p class="retract">招募人数：10人</p>
				<p class="retract">内容简介：海洋天文展厅以海洋为主线，向观众展示人类在探索海洋过程中的天文学发现与发明，更突出传达了如同人类千百年中从陆地走向广阔大海，今天正在走向更深邃广袤的星际空间，这是人类不懈探索的伟大征程。</p>
				<p class="retract">展厅四：中华海洋文明</p>
				<p class="retract">招募人数：10人</p>
				<p class="retract">内容简介：本系列展厅讲述了中华先民们与海共存，在认识海洋、开发海洋的过程中，承载的中华民族的宝贵的文化精神和传统，及其为人类海洋文明发展做出的不可磨灭的贡献。在近代史不屈抗争的同时，国人也积极吸纳西方海洋文明，发展海洋经济，维护海洋权益，探索海洋发展的近代化之路，以及当代我国作为21世纪的海洋大国，着眼于中国特色社会主义事业发展全局，坚持走依海复国、以海强国、人海和谐、合作共赢的发展道路，扎实推进海洋强国建设的历程。在展示中西方不同的海洋技术及海洋装备中，我国自海上丝绸之路贸易到如今的“一带一路”建设中取得的一系列成就。</p>
				<p>岗位二：活动勤务岗</p>
				<p class="retract">服务类别：活动策划</p>
				<p class="retract">招募人数：10人</p>
				<p class="retract">内容简介：</p>
				<p class="retract">1.协助开展博物馆各项教育活动</p>
				<p class="retract">2.志愿者团队活动策划与执行</p>
				<p>岗位三：文案编写岗</p>
				<p class="retract">服务类别：新闻媒体</p>
				<p class="retract">招募人数：10人</p>
				<p class="retract">内容简介：</p>
				<p class="retract">1.新闻采编：文稿撰写、平台管理</p>
				<p class="retract">2.现场拍照、视频剪辑，志愿者团队宣传</p>
				<p>岗位四：秩序维护岗</p>
				<p class="retract">招募人数：20人</p>
				<p class="retract">内容简介：</p>
				<p class="retract">1.负责维护观众进出展厅秩序</p>
				<p class="retract">2.负责维护观众停车场停车秩序</p>
				<p class="retract">3.负责维护观众出入影院秩序</p>
				<p>三、招募流程</p>
				<p>1.5月9日-5月16日 招募</p>
				<p>2.5月17日-5月20日 初试</p>
				<p>3.5月21日-5月28日 面试</p>
				<p>4.5月29日-6月底 培训</p>
				<p style="height: 18px;"></p>
				<p>咨询电话：022-67185131</p>
			</div>
			<div class="confirm-btn" @click="confirmNotice()">确定并继续</div>
		</div>
	</div>
</template>

<script>
	import { Actionsheet, Toast, Indicator } from "mint-ui";
	import axios from "axios";
	export default {
		data() {
			return {
				scrollTopVal: -1,
				agreeOne: false,
				agreeTwo: false,
				agreeNotice: false,
				vol_base_info: false, //是否保存了基本信息
				vol_contact_way: false, //是否保存了联系方式
				vol_specialty_save: false, //是否保存了特长爱好
				myInfo: {
					p: "wx",
					api_token: "",
					name: "", //姓名
					cardid: "", //证件号码
					birthday: "", //出生年月
					native: "", //籍贯
					height: "", //身高
					professional: "", //毕业院校系专业
					workunit: "", //工作单位
					address: "", //住址
					zip_code: "", //邮编
					sex: "", //性别 1男 2女
					is_marry: "", //1已婚 2未婚
					nation: "", //民族
					politician: "", //政治面貌
					education: "", //学历
					graduation_date: "", //毕业时间
					phone: "", //联系电话
					email: "", //常用邮箱
					specialty: "", //专长爱好
					img: "", //用户头像
					start_time: [], //起始时间
					end_time: [], //截止时间
					exper: [], //经历
					workjob: [], //职务岗位
					worktime_type: "", //服务类别
					worktime: [], //服务时间段
					vol_work: [], //服务岗位
					history_reg: "", //注册时间
					history_month: "", //注册月数
					history_grade: "", //历史等级
					history_work: "", //历史岗位
					history_service_num: "", //历史服务次数
					history_service_time: "" //历史服务时间
				},
				srcUrl: "", //头像URL
				vol_worktime_type_text: "", //服务时间类型文案
				vol_work_text: [] //服务岗位文案
			};
		},
		mounted() {
			const v = this;
			Indicator.open();
			v.$api.userInfo().then(res => {
				if(res.status == 1) {
					if(res.data.is_vol == 1) {
						v.$api.volInfo().then(res => {
							Indicator.close();
							if(res.status == 1) {
								if(res.data.grade_status == 6) {
									v.$router.replace("/volunteer/volrecruitlist");
								} else if(res.data.grade_status == 8) {
									v.$router.replace("/volunteer/volnotpass");
								} else {
									v.$router.replace("/volunteer/volresult");
								}
							} else {
								Toast(res.msg);
							}
						});
					} else {
						Indicator.close();
						v.$api.wxRecruitStatus().then(res => {
							if(res.data == 2) {
								v.$router.replace("/volunteer/wxrecruitstop");
							}
						});
						v.myInfo.api_token = localStorage.app_token;
						v.myInfo.name = localStorage.vol_name ? localStorage.vol_name : "";
						v.myInfo.cardid = localStorage.vol_cardid ?
							localStorage.vol_cardid :
							"";
						v.myInfo.birthday = localStorage.vol_birthday ?
							localStorage.vol_birthday :
							"";
						v.myInfo.native = localStorage.vol_native ?
							localStorage.vol_native :
							"";
						v.myInfo.height = localStorage.vol_height ?
							localStorage.vol_height :
							"";
						v.myInfo.professional = localStorage.vol_professional ?
							localStorage.vol_professional :
							"";
						v.myInfo.workunit = localStorage.vol_workunit ?
							localStorage.vol_workunit :
							"";
						v.myInfo.address = localStorage.vol_address ?
							localStorage.vol_address :
							"";
						v.myInfo.zip_code = localStorage.vol_zip_code ?
							localStorage.vol_zip_code :
							"";
						v.myInfo.sex = localStorage.vol_sex ? localStorage.vol_sex : "";
						if(v.myInfo.sex == 1) {
							v.sexText = "男";
						} else if(v.myInfo.sex == 2) {
							v.sexText = "女";
						}
						v.myInfo.is_marry = localStorage.vol_is_marry ?
							localStorage.vol_is_marry :
							"";
						if(v.myInfo.is_marry == 1) {
							v.marryText = "已婚";
						} else if(v.myInfo.is_marry == 2) {
							v.marryText = "未婚";
						}
						v.myInfo.nation = localStorage.vol_nation ?
							localStorage.vol_nation :
							"";
						v.nationText = v.myInfo.nation;
						v.myInfo.politician = localStorage.vol_politician ?
							localStorage.vol_politician :
							"";
						v.politicianText = v.myInfo.politician;
						v.myInfo.education = localStorage.vol_education ?
							localStorage.vol_education :
							"";
						v.educationText = v.myInfo.education;
						v.myInfo.graduation_date = localStorage.vol_graduation_date ?
							localStorage.vol_graduation_date :
							"";
						v.graduationDateText = v.myInfo.graduation_date;

						v.myInfo.phone = localStorage.vol_phone ? localStorage.vol_phone : "";
						v.myInfo.email = localStorage.vol_email ? localStorage.vol_email : "";

						v.myInfo.specialty = localStorage.vol_specialty ?
							localStorage.vol_specialty :
							"";

						v.myInfo.start_time = localStorage.vol_start_time ?
							JSON.parse(localStorage.vol_start_time) : [];
						v.myInfo.end_time = localStorage.vol_end_time ?
							JSON.parse(localStorage.vol_end_time) : [];
						v.myInfo.exper = localStorage.vol_exper ?
							JSON.parse(localStorage.vol_exper) : [];
						v.myInfo.workjob = localStorage.vol_workjob ?
							JSON.parse(localStorage.vol_workjob) : [];

						v.myInfo.worktime_type = localStorage.vol_worktime_type ?
							localStorage.vol_worktime_type :
							1;
						v.vol_worktime_type_text = localStorage.vol_worktime_type_text ?
							localStorage.vol_worktime_type_text :
							"";
						v.myInfo.worktime = localStorage.vol_worktime ?
							JSON.parse(localStorage.vol_worktime) : [];

						v.myInfo.vol_work = localStorage.vol_vol_work ?
							JSON.parse(localStorage.vol_vol_work) : [];
						v.vol_work_text = localStorage.vol_work_text ?
							JSON.parse(localStorage.vol_work_text) : [];
						v.myInfo.img = localStorage.vol_img ? localStorage.vol_img : "";
						v.srcUrl = localStorage.vol_img ?
							STATIC_VOLUNTEER_URL + localStorage.vol_img :
							"";
						v.myInfo.history_reg = localStorage.vol_history_reg ?
							localStorage.vol_history_reg :
							"";
						v.myInfo.history_month = localStorage.vol_history_reg ?
							localStorage.vol_history_month :
							"";
						v.myInfo.history_grade = localStorage.vol_history_reg ?
							localStorage.vol_history_grade :
							"";
						v.myInfo.history_work = localStorage.vol_history_reg ?
							localStorage.vol_history_work :
							"";
						v.myInfo.history_service_num = localStorage.vol_history_reg ?
							localStorage.vol_history_service_num :
							"";
						v.myInfo.history_service_time = localStorage.vol_history_reg ?
							localStorage.vol_history_service_time :
							"";

						v.vol_base_info = localStorage.vol_base_info;
						v.vol_contact_way = localStorage.vol_contact_way;
						v.vol_specialty_save = localStorage.vol_specialty_save;
					}
				} else {
					Indicator.close();
					Toast(res.msg);
				}
			});
		},
		methods: {
			showNotice(val) {
				this.scrollTopVal =
					document.body.scrollTop || document.documentElement.scrollTop;
				if(val == 1) {
					this.agreeOne = true;
				} else {
					this.agreeTwo = true;
				}
			},
			confirmNotice() {
				this.scrollTopVal = -1;
				this.agreeOne = false;
				this.agreeTwo = false;
			},
			agree() {
				this.agreeNotice = !this.agreeNotice;
			},
			upImg(e) {
				const v = this;
				if(e.target.files[0].size > 5000000) {
					Toast("上传图片大小应小于5M");
					return false;
				}
				let formData = new FormData();
				formData.append("p", "wx");
				formData.append("api_token", localStorage.app_token);
				formData.append("img", e.target.files[0]);
				Indicator.open("图片上传中...");
				axios
					.post(STATIC_VOLUNTEER_URL + "/api/vol_avatar", formData)
					.then(res => {
						if(res.data.status == 1) {
							localStorage.vol_img = res.data.data;
							v.myInfo.img = res.data.data;
							v.srcUrl = STATIC_VOLUNTEER_URL + res.data.data;
							document.getElementById('headimg').onload = function() {
								Indicator.close();
							};
						} else {
							Indicator.close();
							Toast(res.data.msg);
						}
					});
			},
			clearFile() {
				var file = document.getElementById("file");
				this.$refs.avatarInput2.click();
			},
			clearStorage() {
				localStorage.removeItem("vol_name");
				localStorage.removeItem("vol_cardid");
				localStorage.removeItem("vol_birthday");
				localStorage.removeItem("vol_native");
				localStorage.removeItem("vol_height");
				localStorage.removeItem("vol_professional");
				localStorage.removeItem("vol_workunit");
				localStorage.removeItem("vol_address");
				localStorage.removeItem("vol_zip_code");
				localStorage.removeItem("vol_sex");
				localStorage.removeItem("vol_is_marry");
				localStorage.removeItem("vol_nation");
				localStorage.removeItem("vol_politician");
				localStorage.removeItem("vol_education");
				localStorage.removeItem("vol_graduation_date");
				localStorage.removeItem("vol_base_info");

				localStorage.removeItem("vol_contact_way");
				localStorage.removeItem("vol_phone");
				localStorage.removeItem("vol_email");

				localStorage.removeItem("vol_specialty_save");
				localStorage.removeItem("vol_specialty");

				localStorage.removeItem("vol_start_time");
				localStorage.removeItem("vol_end_time");
				localStorage.removeItem("vol_exper");
				localStorage.removeItem("vol_workjob");

				localStorage.removeItem("vol_worktime_type");
				localStorage.removeItem("vol_worktime_type_text");

				localStorage.removeItem("vol_worktime");

				localStorage.removeItem("vol_vol_work");
				localStorage.removeItem("vol_work_text");
				localStorage.removeItem("vol_img");

				localStorage.removeItem("vol_history_reg");
				localStorage.removeItem("vol_history_month");
				localStorage.removeItem("vol_history_grade");
				localStorage.removeItem("vol_history_work");
				localStorage.removeItem("vol_history_service_num");
				localStorage.removeItem("vol_history_service_time");
			},
			submitForm() {
				const v = this;
				Indicator.open("提交中...");
				v.$api.userInfo().then(res => {
					Indicator.close();
					if(res.data.is_vol == 1) {
						Toast("您已经注册过志愿者，请不要重复操作");
						v.clearStorage();
					} else {
						if(!v.vol_base_info) {
							Toast("请填写您的基本信息");
						} else if(!v.vol_contact_way) {
							Toast("请填写您的联系方式");
						} else if(!v.vol_specialty_save) {
							Toast("请填写您的专长爱好");
						} else if(v.srcUrl == "") {
							Toast("请上传您的头像");
						} else if(v.myInfo.start_time.length == 0) {
							Toast("请填写您的学习及工作经历");
						} else if(v.myInfo.worktime.length == 0) {
							Toast("请选择您的意向服务时间");
						} else if(v.vol_work_text.length == 0) {
							Toast("请选择您的意向服务岗位");
						} else {
							let formData = new FormData();
							formData.append("p", "wx");
							formData.append("api_token", localStorage.app_token);
							formData.append("name", v.myInfo.name);
							formData.append("birthday", v.myInfo.birthday);
							formData.append("sex", v.myInfo.sex);
							formData.append("cardid", v.myInfo.cardid);
							formData.append("native", v.myInfo.native);
							formData.append("education", v.myInfo.education);
							formData.append("nation", v.myInfo.nation);
							formData.append("politician", v.myInfo.politician);
							formData.append("height", v.myInfo.height);
							formData.append("professional", v.myInfo.professional);
							formData.append("graduation_date", v.myInfo.graduation_date);
							formData.append("workunit", v.myInfo.workunit);
							formData.append("phone", v.myInfo.phone);
							formData.append("email", v.myInfo.email);
							formData.append("zip_code", v.myInfo.zip_code);
							formData.append("specialty", v.myInfo.specialty);
							formData.append("address", v.myInfo.address);
							formData.append("img", v.myInfo.img);
							formData.append("is_marry", v.myInfo.is_marry);
							formData.append("worktime_type", v.myInfo.worktime_type);

							for(let i = 0; i < v.myInfo.worktime.length; i++) {
								formData.append("worktime[]", v.myInfo.worktime[i]);
							}
							for(let i = 0; i < v.myInfo.vol_work.length; i++) {
								formData.append("vol_work[]", v.myInfo.vol_work[i]);
							}
							for(let i = 0; i < v.myInfo.start_time.length; i++) {
								formData.append("start_time[]", v.myInfo.start_time[i]);
							}
							for(let i = 0; i < v.myInfo.end_time.length; i++) {
								formData.append("end_time[]", v.myInfo.end_time[i]);
							}
							for(let i = 0; i < v.myInfo.exper.length; i++) {
								formData.append("exper[]", v.myInfo.exper[i]);
							}
							for(let i = 0; i < v.myInfo.workjob.length; i++) {
								formData.append("workjob[]", v.myInfo.workjob[i]);
							}
							formData.append("history_reg", v.myInfo.history_reg);
							formData.append("history_month", v.myInfo.history_month);
							formData.append("history_grade", v.myInfo.history_grade);
							formData.append("history_work", v.myInfo.history_work);
							formData.append(
								"history_service_num",
								v.myInfo.history_service_num
							);
							formData.append(
								"history_service_time",
								v.myInfo.history_service_time
							);
							Indicator.open("提交中...");
							axios
								.post(STATIC_VOLUNTEER_URL + "/api/vol_reg", formData)
								.then(res => {
									Indicator.close();
									if(res.data.status == 1) {
										v.$router.replace({
											path: "/volunteer/volresult",
											query: {
												username: v.myInfo.name
											}
										});
										v.clearStorage();
									} else {
										Toast(res.data.msg);
									}
								});
						}
					}
				});
			}
		}
	};
</script>

<style scoped>
	.vol-register {
		overflow: hidden;
		background: #f2f2f2;
	}
	
	.fixed_top {
		overflow: hidden;
	}
	
	.zhezhao {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.5;
	}
	
	.base-info {
		width: 350px;
		border: 1px solid #a8a6a6;
		border-radius: 4px;
		margin: 0 auto;
		background: #fff;
		padding: 22px;
		position: relative;
	}
	
	.base-info .redact {
		position: absolute;
		width: 38px;
		height: 16px;
		border: 1px solid #ee8e41;
		border-radius: 7px;
		font-size: 13px;
		color: #ee8e41;
		line-height: 16px;
		text-align: center;
		top: 22px;
		right: 22px;
	}
	
	.base-info p,
	.base-info table {
		font-size: 15px;
		color: #1b130a;
		line-height: 22px;
	}
	
	.base-info table {
		margin-top: 10px;
	}
	
	.base-info table tr {
		float: left;
		width: 152px;
	}
	
	.base-info table tr td {
		width: 50px;
	}
	
	.common-title {
		width: 350px;
		height: 40px;
		margin: 0 auto;
		font-size: 15px;
		color: #1b130a;
		line-height: 50px;
	}
	
	.item-info {
		width: 350px;
		height: 76px;
		border: 1px solid #bd8c47;
		background: #efeae3;
		border-radius: 4px;
		margin: 0 auto;
		text-align: center;
	}
	
	.item-info-top {
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
		color: #bd8c47;
		float: left;
	}
	
	.item-info-btm {
		font-size: 14px;
		color: #b4b2b2;
		line-height: 40px;
		text-align: center;
	}
	
	.notice-box {
		width: 350px;
		margin: 0 auto;
		font-size: 14px;
		line-height: 16px;
		padding-left: 23px;
		margin-top: 15px;
		background: url(../../img/volunteer/wx_vol_checkbox.png) no-repeat top left;
		background-size: 16px 16px;
	}
	
	.notice_act {
		background: url(../../img/volunteer/wx_vol_checkedbox.png) no-repeat top left;
		background-size: 16px 16px;
	}
	
	.notice-tc {
		width: 290px;
		height: 60%;
		background: #fff;
		border-radius: 10px;
		padding: 30px 25px;
		padding-bottom: 88px;
	}
	
	.close-icon {
		position: absolute;
		width: 16px;
		height: 16px;
		background: url(../../img/volunteer/vol_close_icon.png) no-repeat;
		background-size: 16px 16px;
		top: -20px;
		right: -22px;
	}
	
	.content-box {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		font-size: 12px;
		line-height: 18px;
		color: #000;
	}
	
	.content-box p {
		font-size: 12px;
		line-height: 18px;
		color: #000;
	}
	
	.centered {
		text-align: center;
	}
	
	.retract {
		text-indent: 24px;
	}
	
	.confirm-btn {
		width: 200px;
		height: 38px;
		border-radius: 19px;
		color: #fff;
		background: #ee8e41;
		font-size: 18px;
		text-align: center;
		line-height: 38px;
		margin: 25px auto;
	}
	
	.notice-box p:last-child {
		margin: 10px 0;
	}
	
	.submit-btn {
		width: 350px;
		height: 48px;
		line-height: 48px;
		border-radius: 24px;
		margin: 20px auto;
		background: #bd8c47;
		color: #fff;
		font-size: 18px;
		border: 0;
		outline: none;
		text-align: center;
	}
	
	.forbid_click {
		pointer-events: none;
		background: #cecece;
	}
</style>