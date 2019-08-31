<template>
	<div class="vol-center" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
		<div class="vol-info">
			<div class="rules" @click="showRules = true">规章章程</div>
			<div class="rules-content fixed-center" v-if="showRules">
				<div class="close-icon" @click="closeTc()">

				</div>
				<div class="rules-box">
					<p>国家海洋博物馆志愿者管理试行办法</p>
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
			</div>
			<div class="zhezhao" v-if="showRules || showStrategy"></div>
			<div style="min-height: 35.44px;">
				<img :src="rankImg[myinfo.star_status]" class="star-num">
			</div>
			<p class="title">志愿者</p>
			<div class="strategy" @click="showStrategy = true">
				升级攻略
			</div>
			<div class="rules-content fixed-center" style="height: auto;" v-if="showStrategy">
				<div class="close-icon" @click="closeTc()">

				</div>
				<div class="rules-box">
					<p>1）参加志愿服务时间累计达到100小时的，认定为“海博一星志愿者”</p>
					<p>2）参加志愿服务时间累计达到300小时的，认定为“海博二星志愿者”</p>
					<p>3）参加志愿服务时间累计达到600小时的，认定为“海博三星志愿者”</p>
					<p>4）参加志愿服务时间累计达到1000小时的，认定为“海博四星志愿者”</p>
					<p>5）参加志愿服务时间累计达到1500小时的，认定为“海博五星志愿者”</p>
				</div>
			</div>
			<div style="min-height: 14px;">
				<p class="rate-text" v-if="myinfo.star_status < 5">志愿服务{{myinfo.count_service_time}}小时，差{{rankDistance}}小时到{{myinfo.star_status + 1}}星志愿者</p>
				<p class="rate-text" v-if="myinfo.star_status > 4">志愿服务{{myinfo.count_service_time}}小时，您已满级！</p>
			</div>
			<div class="vip_rank_list">
				<div class="star_default star_default0"></div>
				<div class="star_default" :class="{star_act1:myinfo.star_status > 0,star_default1:myinfo.star_status < 1}"></div>
				<div class="star_default" :class="{star_act2:myinfo.star_status > 1,star_default2:myinfo.star_status < 2}"></div>
				<div class="star_default" :class="{star_act3:myinfo.star_status > 2,star_default3:myinfo.star_status < 3}"></div>
				<div class="star_default" :class="{star_act4:myinfo.star_status > 3,star_default4:myinfo.star_status < 4}"></div>
				<div class="star_default" :class="{star_act5:myinfo.star_status > 4,star_default5:myinfo.star_status < 5}"></div>
			</div>
			<div class="progress-bar">
				<div class="dot-box">
					<div class="dot dot_act"></div>
					<div class="dot" :class="{dot_act:myinfo.star_status > 0}"></div>
					<div class="dot" :class="{dot_act:myinfo.star_status > 1}"></div>
					<div class="dot" :class="{dot_act:myinfo.star_status > 2}"></div>
					<div class="dot" :class="{dot_act:myinfo.star_status > 3}"></div>
					<div class="dot" style="margin: 0;" :class="{dot_act:myinfo.star_status > 4}"></div>
				</div>
				<div class="progress-lines">
					<div class="line-val" :style="{width:lineWidth+'px'}"></div>
				</div>
			</div>
			<div class="star-text">
				<ul>
					<li>
						<p style="line-height: 0.96rem;">志愿者</p>
					</li>
					<li>
						<p>一星</p>
						<p>志愿者</p>
					</li>
					<li>
						<p>二星</p>
						<p>志愿者</p>
					</li>
					<li>
						<p>三星</p>
						<p>志愿者</p>
					</li>
					<li>
						<p>四星</p>
						<p>志愿者</p>
					</li>
					<li style="margin: 0;">
						<p>五星</p>
						<p>志愿者</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="tabs-box">
			<div class="tabs">
				<div :class="{tab_act:tabVal == 0}" @click="getOrderList()">参加记录</div>
				<div :class="{tab_act:tabVal == 1}" @click="getExplainList()">讲解记录</div>
			</div>
		</div>
		<div class="no-data" v-if="orderList.length == 0 && requested && tabVal == 0">
			<img src="../../img/active/wx_no_data_icon.png" />
			<p style="margin-top: 30px;">您还没有进行过报名</p>
			<p style="font-size: 15px;color: #B47C2D;" @click="$router.push('/volunteer/volrecruitlist')">快去报名吧～</p>
		</div>
		<div class="order-record" v-if="tabVal == 0">
			<ul>
				<li v-for="(item,index) in orderList" :key="index">
					<img src="../../img/volunteer/canceled_icon.png" class="status-img" v-if="item.toi_status == 5">
					<img src="../../img/volunteer/wait_join_icon.png" class="status-img" v-if="item.toi_status == 1">
					<img :src="$toThumbsimg(item.img,164,98,33,$vol)" class="vol-img">
					<div class="img-rt">
						<p class="active-name two-line-text">{{item.title}}</p>
						<p class="active-time">{{item.active_date}}</p>
						<p class="labels single-line-text">{{item.recruit_job}}</p>
						<p class="active-price">
							<span style="font-size: 18px;">{{item.service_time}}小时</span>
						</p>
					</div>
					<div class="btn-box">
						<div @click="$router.push({path:'/volunteer/volorderdetail',query:{order_id:item.order_id}})">查看详情</div>
						<div @click="cancelOrder(item.order_id)" v-if="item.can_refund">取消报名</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="no-data" v-if="orderList.length == 0 && requested && tabVal == 1">
			<div class="loading-text">暂无数据</div>
		</div>
		<div class="order-record" v-if="tabVal == 1">
			<ul>
				<li v-for="(item,index) in orderList" :key="index">
					<img src="../../img/volunteer/canceled_icon.png" class="status-img" v-if="item.toi_status == 5">
					<img src="../../img/volunteer/wait_join_icon.png" class="status-img" v-if="item.toi_status == 1">
					<img :src="$toThumbsimg(item.img,164,98,33,$vol)" class="vol-img">
					<div class="img-rt">
						<p class="active-name two-line-text">{{item.title}}</p>
						<p class="active-time">{{item.active_date}}</p>
						<p class="active-place">{{item.active_place}}</p>
						<p class="labels single-line-text">{{item.recruit_job}}</p>
					</div>
					<div class="btn-box">
						<div @click="$router.push({path:'/volunteer/explaindetail',query:{order_id:item.order_id}})">查看详情</div>
					</div>
				</li>
			</ul>
		</div>
		<mt-spinner :type="2" :size="40" v-if="showSpinner && orderList.length > 0"></mt-spinner>
		<div class="loading-text" v-if="!showSpinner && orderList.length > 0">{{loadText}}</div>
	</div>
</template>

<script>
	import { Toast, Indicator, InfiniteScroll, MessageBox } from "mint-ui";
	export default {
		data() {
			return {
				showRules: false,
				showStrategy: false,
				orderList: [],
				myinfo: {},
				rankImg: [
					require("../../img/volunteer/star0.png"),
					require("../../img/volunteer/star1.png"),
					require("../../img/volunteer/star2.png"),
					require("../../img/volunteer/star3.png"),
					require("../../img/volunteer/star4.png"),
					require("../../img/volunteer/star5.png")
				],
				rankDistance: 0,
				lineWidth: 0,
				loading: false,
				showSpinner: false,
				loadText: "",
				page: 1, //当前页
				totalPage: 0,
				requested: false,
				tabVal:0,//0标识参加记录，1标识讲解记录
			};
		},
		mounted() {
			const v = this;
			v.$api.userInfo().then(res => {
				if(res.status == 1) {
					if(res.data.is_vol == 1) {
						v.$api.volInfo().then(res => {
							if(res.status == 1) {
								if(res.data.grade_status == 6 || res.data.grade_status == 5) {
									v.myinfo = res.data;
//															v.myinfo.star_status = 4;
//															v.myinfo.count_service_time = 1300;
									if(v.myinfo.star_status == 0) {
										v.rankDistance = 100 - v.myinfo.count_service_time;
										v.lineWidth = 6 + 53 * (v.myinfo.count_service_time / 100);
									} else if(v.myinfo.star_status == 1) {
										v.rankDistance = 300 - v.myinfo.count_service_time;
										v.lineWidth = 65 + 53 * ((v.myinfo.count_service_time - 100) / 200);
									} else if(v.myinfo.star_status == 2) {
										v.rankDistance = 600 - v.myinfo.count_service_time;
										v.lineWidth =
											124 + 53 * ((v.myinfo.count_service_time - 300) / 300);
									} else if(v.myinfo.star_status == 3) {
										v.rankDistance = 1000 - v.myinfo.count_service_time;
										v.lineWidth =
											183 + 53 * ((v.myinfo.count_service_time - 600) / 400);
									} else if(v.myinfo.star_status == 4) {
										v.rankDistance = 1500 - v.myinfo.count_service_time;
										v.lineWidth =
											242 + 53 * ((v.myinfo.count_service_time - 1000) / 500);
									} else if(v.myinfo.star_status == 5) {
										v.rankDistance = 1500 - v.myinfo.count_service_time;
										v.lineWidth = 295;
									}
									v.getOrderList();
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
						v.$api.wxRecruitStatus().then(res => {
							if(res.data == 2) {
								v.$router.replace("/volunteer/wxrecruitstop");
							} else {
								v.$router.replace("/volunteer/home");
							}
						});
					}
				} else {
					Toast(res.msg);
				}
			});
		},
		methods: {
			getExplainList(){
				const v = this;
				v.page = 1;
				v.tabVal = 1;
				Indicator.open();
				v.$api.volExplainRecord(1).then(res => {
					Indicator.close();
					v.requested = true;
					v.orderList = res.data.list;
					v.totalPage = Math.ceil(res.data.count / 5);
					if(v.totalPage > 1) {
						v.showSpinner = true;
						v.loading = false;
					} else if(res.data.count == 0) {
						v.showSpinner = false;
						v.loadText = "暂无数据";
					} else if(v.totalPage == 1) {
						v.showSpinner = false;
						v.loadText = "暂无更多";
					}
				});
			},
			closeTc() {
				this.showRules = false;
				this.showStrategy = false;
			},
			getOrderList() {
				const v = this;
				v.page = 1;
				v.tabVal = 0;
				Indicator.open();
				v.$api.volRecord(1, "", "", "").then(res => {
					Indicator.close();
					v.requested = true;
					v.orderList = res.data.list;
					v.totalPage = Math.ceil(res.data.count / 5);
					if(v.totalPage > 1) {
						v.showSpinner = true;
						v.loading = false;
					} else if(res.data.count == 0) {
						v.showSpinner = false;
						v.loadText = "暂无数据";
					} else if(v.totalPage == 1) {
						v.showSpinner = false;
						v.loadText = "暂无更多";
					}
				});
			},
			loadMore() {
				const v = this;
				if(v.totalPage > v.page) {
					v.loadText = "";
					v.loading = true;
					v.page++;
					setTimeout(function() {
						if(v.tabVal == 0){
							v.$api.volRecord(v.page, "", "", "").then(res => {
								v.orderList = [...v.orderList, ...res.data.list];
								v.totalPage = Math.ceil(res.data.count / 5);
								v.loading = false;
							});
						}else{
							v.$api.volExplainRecord(v.page).then(res => {
								v.orderList = [...v.orderList, ...res.data.list];
								v.totalPage = Math.ceil(res.data.count / 5);
								v.loading = false;
							});
						}
					}, 500);
				} else {
					v.showSpinner = false;
					v.loadText = "暂无更多";
					v.loading = true;
				}
			},
			cancelOrder(val) {
				const v = this;
				MessageBox.confirm("确定要取消报名此活动吗?", '提示', {
					confirmButtonClass: 'pw-wx-mint-confirm-btn'
				}).then(action => {
					Indicator.open("处理中...");
					v.$api.volCancel(val).then(res => {
						Indicator.close();
						if(res.status == 1) {
							Toast("取消成功");
							v.page = 1;
							v.getOrderList(v.page);
						} else {
							Toast(res.msg);
						}
					});
				});
			}
		}
	};
</script>

<style scoped>
	/deep/ .mint-spinner-triple-bounce {
		text-align: center;
		margin: 10px 0;
	}
	
	.vol-info {
		width: 375px;
		height: 210px;
		background: #384355;
		padding-top: 10px;
		position: relative;
	}
	
	.tabs-box {
		height: 58px;
		background: #fff;
		border-bottom: 3px solid #EBEBEB;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 1;
	}
	.tabs{
		width: 250px;
		height: 36px;
		border-radius: 4px;
		overflow: hidden;
		background: #EBEBEB;
		line-height: 1;
		display: flex;
		justify-content: center;
	}
	.tabs div{
		width: 125px;
		height: 36px;
		display: flex;
		align-items: center;
		font-size: 16px;
		justify-content: center;
		line-height: 1;
	}
	.tabs .tab_act{
		background: #EE8E41;
		color: #fff;
	}
	.no-data{
		overflow: hidden;
		min-height: 550px;
	}
	.no-data img {
		display: block;
		width: 160px;
		margin: 0 auto;
		margin-top: 110px;
	}
	
	.no-data p {
		font-size: 14px;
		line-height: 24px;
		color: #4A4A4A;
		text-align: center;
	}
	
	.rules {
		position: absolute;
		width: 66px;
		height: 22px;
		border: 1px solid #ecb940;
		color: #ecb940;
		text-align: center;
		line-height: 22px;
		top: 26px;
		right: 12px;
		border-radius: 10px;
	}
	
	.close-icon {
		position: absolute;
		width: 16px;
		height: 16px;
		background: url(../../img/volunteer/vol_close_icon.png) no-repeat;
		background-size: 16px 16px;
		top: -30px;
		right: -10px;
	}
	
	.zhezhao {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.5;
		z-index: 999;
	}
	
	.rules-content {
		width: 320px;
		height: 60%;
		background: #fff;
		border-radius: 10px;
		padding: 30px 25px;
	}
	
	.rules-box {
		height: 100%;
		overflow-y: scroll;
	}
	
	.rules-content p {
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
	
	.star-num {
		display: block;
		width: 95px;
		margin: 10px auto;
	}
	
	.vol-info .title {
		font-size: 16px;
		color: #fff;
		line-height: 16px;
		text-align: center;
	}
	
	.strategy {
		height: 14px;
		line-height: 14px;
		position: absolute;
		top: 68px;
		left: 220px;
		font-size: 11px;
		color: #ECB940;
		background: url(../../img/volunteer/vol_query_icon.png) no-repeat right center;
		background-size: 12px 11px;
		padding-right: 15px;
	}
	
	.vol-info .rate-text {
		font-size: 14px;
		color: #b7bbc0;
		line-height: 14px;
		text-align: center;
		margin: 13px 0 22px 0;
	}
	
	.order-record li {
		position: relative;
		width: 352px;
		overflow: hidden;
		padding-top: 15px;
		margin: 0 12px;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.order-record li .vol-img {
		display: block;
		width: 164px;
		height: 98px;
		border-radius: 4px;
		float: left;
	}
	
	.status-img {
		display: block;
		width: 15px;
		position: absolute;
		top: 15px;
		left: 10px;
	}
	
	.img-rt {
		width: 180px;
		float: left;
		margin-left: 8px;
	}
	
	.active-name {
		font-size: 16px;
		color: #000;
		line-height: 20px;
		height: 40px;
	}
	
	.active-time {
		color: #B5B5B5;
		font-size: 12px;
		line-height: 18px;
	}
	.active-place{
		color: #B5B5B5;
		font-size: 12px;
		line-height: 18px;
		margin-bottom: 3px;
	}
	.labels {
		color: #fff;
		font-size: 10px;
		padding: 0 3px;
		line-height: 14px;
		background: #D3D2D2;
		display: inline-block;
		border-radius: 2px;
		margin-bottom: 3px;
	}
	
	.active-price {
		color: #BDBDBD;
		font-size: 14px;
	}
	
	.btn-box {
		width: 100%;
		float: left;
		height: 23px;
		margin: 10px 0;
	}
	
	.btn-box>div {
		width: 75px;
		height: 20px;
		border: 1px solid #6b6b6b;
		line-height: 20px;
		float: right;
		background: #fff;
		border-radius: 10px;
		margin-left: 15px;
		color: #353535;
		font-size: 14px;
		outline: none;
		text-align: center;
	}
	
	.vip_rank_list {
		overflow: hidden;
		margin-left: 17px;
		margin-bottom: 10px;
	}
	
	.star_default {
		width: 35px;
		height: 13px;
		float: left;
		margin-right: 24px;
	}
	
	.star_default0 {
		background: url(../../img/volunteer/vol_star_act0.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_default1 {
		background: url(../../img/volunteer/vol_starone.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_act1 {
		background: url(../../img/volunteer/vol_star_act1.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_default2 {
		background: url(../../img/volunteer/vol_startwo.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_act2 {
		background: url(../../img/volunteer/vol_star_act2.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_default3 {
		background: url(../../img/volunteer/vol_starthree.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_act3 {
		background: url(../../img/volunteer/vol_star_act3.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_default4 {
		background: url(../../img/volunteer/vol_starfour.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_act4 {
		background: url(../../img/volunteer/vol_star_act4.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_default5 {
		background: url(../../img/volunteer/vol_starfive.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.star_act5 {
		background: url(../../img/volunteer/vol_star_act5.png) no-repeat left center;
		background-size: 100% 100%;
	}
	
	.progress-bar {
		width: 301px;
		height: 6px;
		margin-left: 33px;
		overflow: hidden;
		margin-bottom: 8px;
		position: relative;
	}
	
	.dot-box {
		position: absolute;
		width: 301px;
		height: 6px;
		top: 0;
		left: 0;
		z-index: 899;
	}
	
	.progress-lines {
		position: absolute;
		width: 301px;
		height: 2px;
		overflow: hidden;
		border-radius: 1px;
		background: #616d7d;
		top: 2px;
		left: 0;
	}
	
	.line-val {
		width: 100px;
		height: 2px;
		background: #ecb940;
	}
	
	.progress-bar .dot {
		width: 6px;
		height: 6px;
		float: left;
		margin-right: 53px;
		background: #616d7d;
		border-radius: 3px;
	}
	
	.progress-bar .dot_act {
		background: #ecb940;
	}
	
	.star-text {
		margin-left: 15px;
	}
	
	.star-text li {
		width: 40px;
		float: left;
		font-size: 13px;
		/*line-height: 18px;*/
		color: #fff;
		height: 36px;
		margin-right: 20px;
	}
	
	.star-text li p {
		text-align: center;
		line-height: 18px;
	}
	
	.loading-text {
		line-height: 40px;
		text-align: center;
		color: #ccc;
	}
</style>