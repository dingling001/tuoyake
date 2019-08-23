<template>
  <div>
    <div class="topbar-wrapper">
      <div class="topbar">
        <a href="/">首页</a>
        »
        <a href="/person">个人中心</a>
      </div>
    </div>
    <div class="vol-apply">
      <p class="title">加入志愿者(个人)</p>
      <div class="lines">
        <span style="width: 50px;"></span>
        <span style="width: 5px;margin-left: 5px;"></span>
      </div>
      <div class="common-title">
        <span class="dot"></span>
        <span class="small-title">基本信息</span>
      </div>
      <div class="input-box">
        <p>
          <span>姓名</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          type="text"
          placeholder="请填写姓名"
          v-model="submitData.name"
          :class="{required_act:submitData.name  == '' && flag}"
        >
        <p>
          <span>性别</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <select v-model="submitData.sex" class="select_bg select_position" :class="{required_act:submitData.sex  == '' && flag}">
          <option value>请选择</option>
          <option value="1">男</option>
          <option value="2">女</option>
        </select>
        <!--<input type="text" placeholder="请填写性别" v-model="submitData.sex"/>-->
      </div>
      <div class="input-box">
        <p>
          <span>民族</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <select
          v-model="submitData.nation"
          :class="{required_act:submitData.nation  == '' && flag}"
          class="select_bg select_position"
        >
          <option value>请选择</option>
          <option v-for="item in nationList" :value="item">{{item}}</option>
        </select>
        <!--<input type="text" placeholder="请填写姓名" v-model="submitData.nation"/>-->
        <p>
          <span>出生年月</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <el-date-picker
        	:editable="false"
          v-model="submitData.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择"
          style="width: 265px;"
          :class="{required_act:submitData.birthday  == '' && flag}"
        ></el-date-picker>
      </div>
      <div class="input-box">
        <p>
          <span>政治面貌</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <select
          v-model="submitData.politician"
          :class="{required_act:submitData.politician  == '' && flag}"
          class="select_bg select_position"
        >
          <option value>请选择</option>
          <option v-for="item in politicianList" :value="item">{{item}}</option>
        </select>
        <!--<input type="text" placeholder="请填写姓名" v-model="submitData.politician"/>-->
        <p>
          <span>籍贯</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          type="text"
          placeholder="请填写籍贯信息"
          v-model="submitData.native"
          :class="{required_act:submitData.native  == '' && flag}"
        >
      </div>
      <div class="input-box">
        <p>
          <span>学历</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <select
          v-model="submitData.education"
          :class="{required_act:submitData.education  == '' && flag}"
          class="select_bg select_position"
        >
          <option value>请选择</option>
          <option v-for="item in educationList" :value="item">{{item}}</option>
        </select>
        <!--<input type="text" placeholder="请填写姓名" v-model="submitData.education"/>-->
        <p>
          <span>身高</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          type="text"
          placeholder="请填写身高（cm）"
          v-model="submitData.height"
          :class="{required_act:submitData.height  == '' && flag}"
        >
      </div>
      <div class="input-box">
        <p>
          <span>毕业时间</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <el-date-picker
        	:editable="false"
          v-model="submitData.graduation_date"
          type="date"
          placeholder="请选择"
          value-format="yyyy-MM-dd"
          style="width: 265px;"
          :class="{required_act:submitData.graduation_date  == '' && flag}"
        ></el-date-picker>
        <p>
          <span>联系电话</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          type="text"
          placeholder="请填写电话号码"
          v-model="submitData.phone"
          :class="{required_act:submitData.phone  == '' && flag}"
        >
      </div>
      <div class="input-box">
        <p style="width: 180px;margin-left: 20px;">
          <span>毕业院校（系）专业</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          style="width: 571px;"
          type="text"
          placeholder="请填写毕业院校（系）专业"
          v-model="submitData.professional"
          :class="{required_act:submitData.professional  == '' && flag}"
        >
      </div>
      <div class="input-box">
        <p style="width: 180px;margin-left: 20px;">
          <span>工作单位</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          style="width: 571px;"
          type="text"
          placeholder="请填写工作地址"
          v-model="submitData.workunit"
          :class="{required_act:submitData.workunit  == '' && flag}"
        >
        <p>
          <span>邮箱</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          style="width: 300px;"
          type="text"
          placeholder="请填写常用邮箱"
          v-model="submitData.email"
          :class="{required_act:submitData.email  == '' && flag}"
        >
      </div>
      <div class="input-box">
        <p style="width: 180px;margin-left: 20px;">
          <span>家庭住址</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          style="width: 571px;"
          type="text"
          placeholder="请填写详细家庭住址"
          v-model="submitData.address"
          :class="{required_act:submitData.address  == '' && flag}"
        >
        <p>
          <span>邮编</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          style="width: 300px;"
          type="text"
          placeholder="请填写邮编"
          v-model="submitData.zip_code"
          :class="{required_act:submitData.zip_code  == '' && flag}"
        >
      </div>
      <div class="input-box">
        <p style="width: 180px;margin-left: 20px;">
          <span>身份证号</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <input
          style="width: 571px;"
          type="text"
          placeholder="请填写18位身份证号码"
          v-model="submitData.cardid"
          @blur="verify"
          :class="{required_act:submitData.cardid  == '' && flag}"
        >
        <p>
          <span>婚否</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <select
          v-model="submitData.is_marry"
          style="width: 300px;"
          :class="{required_act:submitData.is_marry  == '' && flag}"
          class="select_bg marry_select"
        >
          <option value>请选择</option>
          <option value="1">已婚</option>
          <option value="2">未婚</option>
        </select>
        <!--<input style="width: 300px;" type="text" placeholder="请填写性别" v-model="submitData.is_marry"/>-->
      </div>
      <div class="input-box">
        <p style="width: 180px;margin-left: 20px;">
          <span>特长</span>
          <img src="../../img/volunteer/vol_required_icon.png">
        </p>
        <textarea
          v-model="submitData.specialty"
          placeholder="请填写特长"
          :class="{required_act:submitData.specialty  == '' && flag}"
          style="width: 995px;height: 150px;outline: none;padding: 15px 12px;resize: none;"
        ></textarea>
      </div>
      <div class="common-title">
        <span class="dot"></span>
        <span class="small-title">学习及工作经历</span>
      </div>
      <div class="big-title">
        <img src="../../img/volunteer/vol_required_icon.png">学习及工作经历
      </div>
      <div class="experience-title">
        <p style="width: 370px;">时间</p>
        <p style="width: 540px;margin: 0 25px;">学习及工作经历</p>
        <p style="width: 205px;">职务职称</p>
      </div>
      <div class="work-experience">
      	<input type="text" :value="formatDate(submitData.start_time[0])" placeholder="选择日期" :class="{required_act:flag && submitData.start_time.length == 0 && submitData.end_time.length == 0 && submitData.exper.length == 0 && submitData.workjob.length == 0}"/>
        <el-date-picker
        	class="el-date-editor-common"
        	:picker-options="pickerOptions2"
        	:editable="false"
          v-model="submitData.start_time[0]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :class="{required_act:flag && submitData.start_time.length == 0 && submitData.end_time.length == 0 && submitData.exper.length == 0 && submitData.workjob.length == 0}"
        ></el-date-picker>
        <span>至</span>
        <input type="text" :value="formatDate(submitData.end_time[0])" placeholder="选择日期" :class="{required_act:flag && submitData.start_time.length == 0 && submitData.end_time.length == 0 && submitData.exper.length == 0 && submitData.workjob.length == 0}"/>
        <el-date-picker
        	:picker-options="pickerOptions1"
        	:editable="false"
          v-model="submitData.end_time[0]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          class="el-date-editor-common el-date-editor-right"
          :class="{required_act:flag && submitData.start_time.length == 0 && submitData.end_time.length == 0 && submitData.exper.length == 0 && submitData.workjob.length == 0}"
        ></el-date-picker>
        <input
          type="text"
          style="width: 540px;margin: 0 25px;"
          v-model="submitData.exper[0]"
          placeholder="学习及工作经历"
          :class="{required_act:flag && submitData.start_time.length == 0 && submitData.end_time.length == 0 && submitData.exper.length == 0 && submitData.workjob.length == 0}"
        >
        <input type="text" style="width: 205px;" v-model="submitData.workjob[0]" placeholder="职务职称" :class="{required_act:flag && submitData.start_time.length == 0 && submitData.end_time.length == 0 && submitData.exper.length == 0 && submitData.workjob.length == 0}">
      </div>
      <div class="work-experience">
      	<input type="text" :value="formatDate(submitData.start_time[1])" placeholder="选择日期"/>
        <el-date-picker
        	class="el-date-editor-common"
        	:picker-options="pickerOptions2"
        	:editable="false"
          v-model="submitData.start_time[1]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <span>至</span>
        <input type="text" :value="formatDate(submitData.end_time[1])" placeholder="选择日期"/>
        <el-date-picker
        	:picker-options="pickerOptions1"
        	class="el-date-editor-common el-date-editor-right"
        	:editable="false"
          v-model="submitData.end_time[1]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <input
          type="text"
          style="width: 540px;margin: 0 25px;"
          v-model="submitData.exper[1]"
          placeholder="学习及工作经历"
        >
        <input type="text" style="width: 205px;" v-model="submitData.workjob[1]" placeholder="职务职称">
      </div>
      <div class="work-experience">
      	<input type="text" :value="formatDate(submitData.start_time[2])" placeholder="选择日期"/>
        <el-date-picker
        	class="el-date-editor-common"
        	:picker-options="pickerOptions2"
        	:editable="false"
          v-model="submitData.start_time[2]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <span>至</span>
        <input type="text" :value="formatDate(submitData.end_time[2])" placeholder="选择日期"/>
        <el-date-picker
        	:picker-options="pickerOptions1"
        	class="el-date-editor-common el-date-editor-right"
        	:editable="false"
          v-model="submitData.end_time[2]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <input
          type="text"
          style="width: 540px;margin: 0 25px;"
          v-model="submitData.exper[2]"
          placeholder="学习及工作经历"
        >
        <input type="text" style="width: 205px;" v-model="submitData.workjob[2]" placeholder="职务职称">
      </div>
      <div class="work-experience">
      	<input type="text" :value="formatDate(submitData.start_time[3])" placeholder="选择日期"/>
        <el-date-picker
        	class="el-date-editor-common"
        	:picker-options="pickerOptions2"
        	:editable="false"
          v-model="submitData.start_time[3]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <span>至</span>
        <input type="text" :value="formatDate(submitData.end_time[3])" placeholder="选择日期"/>
        <el-date-picker
        	:picker-options="pickerOptions1"
        	class="el-date-editor-common el-date-editor-right"
        	:editable="false"
          v-model="submitData.end_time[3]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <input
          type="text"
          style="width: 540px;margin: 0 25px;"
          v-model="submitData.exper[3]"
          placeholder="学习及工作经历"
        >
        <input
          type="text"
          style="width: 205px;"
          v-model="submitData.workjob[3] "
          placeholder="职务职称"
        >
      </div>
      <div class="common-title">
        <span class="dot"></span>
        <span class="small-title">意向服务</span>
      </div>
      <div class="big-title">
        <img src="../../img/volunteer/vol_required_icon.png">意向服务时间
      </div>
      <div class="select-frame" :class="{required_act:submitData.worktime.length  == 0 && flag}">
        <div class="serve-date">
          <p @click="workTimeType(1)" :class="{serve_date_act:submitData.worktime_type == 1}">通用时间</p>
          <p
            @click="workTimeType(2)"
            :class="{serve_date_act:submitData.worktime_type == 2}"
            style="border-left: 1px solid #000;border-right: 1px solid #000;"
          >寒假时间</p>
          <p @click="workTimeType(3)" :class="{serve_date_act:submitData.worktime_type == 3}">暑假时间</p>
        </div>
        <div class="serve-frame">
          <ul>
            <li
              v-for="item in serveFrameList"
              :class="{serve_frame_act:submitData.worktime.indexOf(item.val) != -1}"
              @click="selectServeFrame(item.val)"
            >{{item.text}}</li>
          </ul>
        </div>
      </div>
      <div class="big-title">
        <img src="../../img/volunteer/vol_required_icon.png">意向服务岗位
      </div>
      <div class="job-list" :class="{required_act:submitData.vol_work.length  == 0 && flag}">
        <ul>
          <li
            v-for="(item,index) in workList"
            @click="selectJob(item.id)"
            :class="{job_act:submitData.vol_work.indexOf(item.id) != -1}"
          >{{item.title}}</li>
        </ul>
      </div>
      <div class="common-title">
        <span class="dot"></span>
        <span class="small-title">历史服务信息（选填）</span>
      </div>
      <div class="history-info">
        <span style="width: 123px;">注册时间</span>
        <input type="text" v-model="submitData.history_reg" placeholder="请填写注册时间">
        <span>注册月数</span>
        <input
          type="text"
          style="width: 233px;"
          v-model="submitData.history_month"
          placeholder="请填写注册月数时长"
        >
        <span>志愿者等级</span>
        <input
          type="text"
          style="width: 238px;"
          v-model="submitData.history_grade"
          placeholder="请填写志愿者等级"
        >
      </div>
      <div class="history-info">
        <span style="width: 123px;">岗位班次</span>
        <input type="text" v-model="submitData.history_work" placeholder="请填写岗位">
        <span>年度/总服务次数</span>
        <input
          type="text"
          style="width: 233px;"
          v-model="submitData.history_service_num"
          placeholder="请填写年度总服务次数"
        >
        <span>年度/总服务时长</span>
        <input
          type="text"
          style="width: 238px;"
          v-model="submitData.history_service_time"
          placeholder="请填写年度总服务时长"
        >
      </div>
      <div class="lines"></div>
      <div class="agreement-box">
        <div
          class="promise"
          :class="{promise_act:promiseone}"
          @click="promiseone = !promiseone"
        >诚信承诺：本人保证以上填写的内容真是有效</div>
        <div
          class="promise"
          style="margin-left: 40px;"
          :class="{promise_act:promisetwo}"
          @click="agreeNotice()"
        >中国海洋博物馆志愿者管理试行办法</div>
      </div>
      <div class="tip">{{tipText}}</div>
      <div
        class="apply-btn"
        @click="apply()"
        :class="{forbid_act:(promisetwo && promiseone) && !forbidStatus}"
      >{{btnText}}</div>
      <div class="upload-box">
        <div class="img-box" :class="{img_box_act:hasImg,required_act:submitData.img  == '' && flag}">
          <img ref="srcUrl" src>
        </div>
        <p>上传一寸免冠照片</p>
        <input
          type="file"
          name="file"
          id="file"
          :value="headImgUrl"
          accept="image/jpeg, image/jpg, image/png"
          style="display: none;"
          @change="uploadImg($event)"
          ref="avatarInput2"
        >
        <input type="button" value="上传图片" @click="clearFile()">
      </div>
    </div>
    <div class="zhezhao" v-if="openNotice && promisetwo"></div>
    <div class="notice-box fixed-center" v-if="openNotice && promisetwo">
      <img
        src="../../img/volunteer/vol_colse_icon.png"
        class="close-icon"
        @click="openNotice = false"
      >
      <div class="notice-content">
        <p>国家海洋博物馆志愿者管理试行办法</p>
        <p class="centered">第一章 总则</p>
        <p>一、国家海洋博物馆</p>
        <p class="retract">国家海洋博物馆负责制定国家海洋博物馆志愿者章程和章程细则。国家海洋博物馆有管理志愿者组织的责任和义务。</p>
        <p>二、国家海洋博物馆宣教部</p>
        <p
          class="retract"
        >国家海洋博物馆宣教部代表国家海洋博物馆管理国家海洋博物馆志愿者，制定、修改志愿者章程和志愿者章程细则，负责志愿者招聘、培训、管理等各项事务。国家海洋博物馆宣教部任命工作人员代表国家海洋博物馆负责具体工作。</p>
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
  </div>
</template>
<script>
	import checkId from "../../bin/common.js";
	import axios from "axios";
	export default {
		data() {
			return {
				pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '至今',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },{
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },{
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
				forbidStatus:false,
				btnText:'申请成为志愿者',
				openNotice: false,
				promiseone: false,
				promisetwo: false,
				flag: false,
				tipText: '',
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
				submitData: {
					p: 'w',
					api_token: localStorage.api_token,
					name: '', //姓名
					birthday: '', //生日
					sex: '', //性别
					cardid: '', //证件号码
					native: '', //籍贯
					education: '', //学历
					nation: '', //民族
					politician: '', //政治面貌
					height: '', //身高
					professional: '', //毕业院校
					graduation_date: '', //毕业时间
					workunit: '', //工作单位
					phone: '', //电话
					email: '', //邮箱
					zip_code: '', //邮编
					specialty: '', //特长
					address: '', //地址
					img: '', //头像
					is_marry: '', //1已婚 2未婚
					worktime_type: 1, //服务时间类别 1通用 2寒假 3数据
					worktime: [], //1代表周一上午 2代表周一下午 3代表周二上午 4代表周二下午 以此类推
					vol_work: [], //服务岗位
					start_time: [], //工作开始时间 一一对应
					end_time: [], //工作结束时间 一一对应
					exper: [], //工作经历 一一对应
					workjob: [], //职务 一一对应
					history_reg: '', //历史注册时间
					history_month: '', //历史注册月数
					history_grade: '', //历史等级
					history_work: '', //历史岗位
					history_service_num: '', //历史服务次数
					history_service_time: '', //历史服务时间
				},
				headImgUrl: '',
				workList: [], //岗位列表
				politicianList: [], //政治面貌选择列表
				educationList: [], //学历选择列表
				nationList: [], //民族选择列表
				hasImg:true
			}
		},
		mounted() {
			const v = this;
			v.$api.recruitStatus().then(res=>{
  			if(res.data == 2){
  				v.$router.replace("/volunteer/pcrecruitstop");
  			}
  		});
			v.getJobList();
			v.getPoliticsStatus();
			v.getEducationList();
			v.getNationList();
		},
		methods: {
			formatDate (val) {
      	const v = this;
        if(val == v.getOneDayDate()){
        	return '至今'
        }else{
        	return val
        }
      },
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
			verify() {
				const v = this;
				if((v.submitData.cardid.replace(/\ +/g, "")).replace(/[\r\n]/g, "") == '') {
					v.tipText = '身份证号不能为空';
					v.hideText();
				} else if(!checkId.checkIdcard(v.submitData.cardid).status) {
					v.tipText = '身份证号格式错误';
					v.hideText();
				} else if(checkId.analyzeIDCard(v.submitData.cardid) < 18) {
					v.tipText = '您的年龄不符合注册要求';
					v.hideText();
				}
			},
			agreeNotice() {
				this.promisetwo = !this.promisetwo;
				this.openNotice = true;
			},
			hideText() {
				setTimeout(() => {
					this.tipText = "";
				}, 2000);
			},
			getJobList() {
				this.$api.jobList().then(res => {
					if(res.status == 1) {
						this.workList = res.data
					}
				})
			},
			getPoliticsStatus() {
				this.$api.politicsStatus().then(res => {
					if(res.status == 1) {
						this.politicianList = res.data
					}
				})
			},
			getEducationList() {
				this.$api.educationList().then(res => {
					if(res.status == 1) {
						this.educationList = res.data
					}
				})
			},
			getNationList() {
				this.$api.nationList().then(res => {
					if(res.status == 1) {
						this.nationList = res.data
					}
				})
			},
			workTimeType(val) { //选择服务时间类别
				this.submitData.worktime_type = val
			},
			selectServeFrame(val) { //选择服务时间段
				const v = this;
				if(v.submitData.worktime.indexOf(val) != -1) {
					v.submitData.worktime.splice(v.submitData.worktime.indexOf(val), 1)
				} else {
					v.submitData.worktime.push(val)
				}
			},
			selectJob(val) {
				const v = this;
				if(v.submitData.vol_work.indexOf(val) != -1) {
					v.submitData.vol_work.splice(v.submitData.vol_work.indexOf(val), 1)
				} else {
					v.submitData.vol_work.push(val)
				}
			},
			apply() {
				const v = this;
				v.forbidStatus = true;
				v.btnText = '提交申请中...';
				v.$api.pcuserInfo().then(res => {
					if(res.data.is_vol == 1) {
						v.tipText = '您已经注册过志愿者，请不要重复操作';
						v.hideText();
						v.btnText = '您已注册过';
					} else {
						v.forbidStatus = false;
						v.btnText = '申请成为志愿者';
						v.flag = true;
						let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
						if(v.submitData.vol_work.length == 0 || v.submitData.worktime.length == 0 || v.submitData.name == '' || v.submitData.sex == '' || v.submitData.nation == '' || v.submitData.birthday == '' || v.submitData.politician == '' || v.submitData.native == '' || v.submitData.education == '' || v.submitData.height == '' || v.submitData.graduation_date == '' || v.submitData.phone == '' || v.submitData.professional == '' || v.submitData.workunit == '' || v.submitData.address == '' || v.submitData.cardid == '' || v.submitData.specialty == '' || v.submitData.email == '' || v.submitData.zip_code == '' || v.submitData.is_marry == '') {
							v.tipText = '请完成必填信息';
							v.hideText();
							return false;
						} else if(!checkId.checkPhone(v.submitData.phone)) {
							v.tipText = '手机号码格式错误';
							v.hideText();
							return false;
						} else if(!reg.test(v.submitData.email)) {
							v.tipText = '邮箱格式错误';
							v.hideText();
							return false;
						} else if(!checkId.checkIdcard(v.submitData.cardid).status) {
							v.tipText = '身份证号格式错误';
							v.hideText();
							return false;
						} else if(checkId.analyzeIDCard(v.submitData.cardid) < 18) {
							v.tipText = '您的年龄不符合注册要求';
							v.hideText();
							return false;
						} else if(v.submitData.img == '') {
							v.tipText = '请上传您的个人照片';
							v.hideText();
							return false;
						}
						if(v.submitData.start_time.length == 0 && v.submitData.end_time.length == 0 && v.submitData.exper.length == 0 && v.submitData.workjob.length == 0) {
							v.tipText = '请至少输入一条学习或工作经历';
							v.hideText();
							return false;
						}
						for(let i = 0; i < 4; i++) {
							if((v.submitData.start_time[i] || v.submitData.end_time[i] || v.submitData.exper[i] || v.submitData.workjob[i]) && (!v.submitData.start_time[i] || !v.submitData.end_time[i] || !v.submitData.exper[i] || !v.submitData.workjob[i])) {
								v.tipText = '请完善第' + (i + 1) + '条工作或学习经历';
								v.hideText();
								return false;
							}
						}
						let formData = new FormData();
						formData.append("p", "w");
						formData.append("api_token", localStorage.api_token);
						formData.append("name", v.submitData.name);
						formData.append("birthday", v.submitData.birthday);
						formData.append("sex", v.submitData.sex);
						formData.append("cardid", v.submitData.cardid);
						formData.append("native", v.submitData.native);
						formData.append("education", v.submitData.education);
						formData.append("nation", v.submitData.nation);
						formData.append("politician", v.submitData.politician);
						formData.append("height", v.submitData.height);
						formData.append("professional", v.submitData.professional);
						formData.append("graduation_date", v.submitData.graduation_date);
						formData.append("workunit", v.submitData.workunit);
						formData.append("phone", v.submitData.phone);
						formData.append("email", v.submitData.email);
						formData.append("zip_code", v.submitData.zip_code);
						formData.append("specialty", v.submitData.specialty);
						formData.append("address", v.submitData.address);
						formData.append("img", v.submitData.img);
						formData.append("is_marry", v.submitData.is_marry);
						formData.append("worktime_type", v.submitData.worktime_type);
						for(let i = 0; i < v.submitData.worktime.length; i++) {
							formData.append('worktime[]', v.submitData.worktime[i]);
						}
						for(let i = 0; i < v.submitData.vol_work.length; i++) {
							formData.append('vol_work[]', v.submitData.vol_work[i]);
						}
						for(let i = 0; i < v.submitData.start_time.length; i++) {
							formData.append('start_time[]', v.submitData.start_time[i]);
						}
						for(let i = 0; i < v.submitData.end_time.length; i++) {
							if(v.getOneDayDate() == v.submitData.end_time[i]){
								formData.append('end_time[]', '至今');
							}else{
								formData.append('end_time[]', v.submitData.end_time[i]);
							}
						}
						for(let i = 0; i < v.submitData.exper.length; i++) {
							formData.append('exper[]', v.submitData.exper[i]);
						}
						for(let i = 0; i < v.submitData.workjob.length; i++) {
							formData.append('workjob[]', v.submitData.workjob[i]);
						}
						formData.append("history_reg", v.submitData.history_reg);
						formData.append("history_month", v.submitData.history_month);
						formData.append("history_grade", v.submitData.history_grade);
						formData.append("history_work", v.submitData.history_work);
						formData.append("history_service_num", v.submitData.history_service_num);
						formData.append("history_service_time", v.submitData.history_service_time);
						v.forbidStatus = true;
						v.btnText = '提交申请中...';
						axios.post(STATIC_VOLUNTEER_URL + "/api/vol_reg", formData).then(res => {
							if(res.data.status == 1) {
								v.tipText = '提交成功';
								v.hideText();
								v.btnText = '已提交';
								setTimeout(function(){
									v.$router.replace('/uvol')
								},500)
							} else {
								v.forbidStatus = false;
								v.btnText = '重新申请';
								v.tipText = res.data.msg;
								v.hideText();
							}
						});
					}
				})
			},
			uploadImg(e) {
				const v = this;
				let formData = new FormData();
				formData.append("p", "w");
				formData.append("api_token", localStorage.api_token);
				formData.append("img", e.target.files[0]);
				axios.post(STATIC_VOLUNTEER_URL + "/api/vol_avatar", formData).then(res => {
					if(res.data && res.data.status == 1){
						v.submitData.img = res.data.data;
						v.$refs.srcUrl.src = STATIC_VOLUNTEER_URL + res.data.data;
						v.hasImg = false
					}else{
						v.tipText = res.data.msg;
						v.hideText();
						return false;
					}
				});
			},
			clearFile() {
				var file = document.getElementById("file");
				file.value = "";
				this.$refs.avatarInput2.click()
			}
		}
	};
</script>
<style lang="scss" scoped>
/deep/ .el-input--prefix .el-input__inner{
	padding-left: 20px;
}
.select_position{
	background: url("../../img/active/down_triangle.png") no-repeat scroll 225px center transparent;
}
.marry_select{
	background: url("../../img/active/down_triangle.png") no-repeat scroll 260px center transparent;
}
.topbar-wrapper {
  background-color: #e7e7e7;
  height: 60px;
  line-height: 60px;
  .topbar {
    width: 1200px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    color: #000;
    font-size: 18px;
  }
  .topbar a {
    text-decoration: none;
    color: #000;
    margin: 0 4px;
  }
  .topbar a:hover {
    color: #b47c2d;
  }
}
.zhezhao {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  z-index: 1201;
}

.notice-box {
  width: 1200px;
  height: 700px;
  background: #fff;
}

.notice-content {
  width: 1096px;
  height: 530px;
  margin: 85px 52px;
  padding: 0 36px;
  font-size: 18px;
  line-height: 30px;
  color: #000;
  overflow-y: auto;
}
.centered {
  text-align: center;
  margin: 20px 0;
}
.retract {
  text-indent: 36px;
}

.close-icon {
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
}

.vol-apply {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #afafaf;
    font-size: 14px;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #afafaf;
    font-size: 14px;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #afafaf;
    font-size: 14px;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #afafaf;
    font-size: 14px;
  }
  .vol-apply {
    width: 1200px;
    margin: 0 auto;
  }
  .title {
    font-size: 24px;
    color: #000;
    line-height: 24px;
    margin: 30px 0;
  }
  .lines {
    width: 1198px;
    padding-bottom: 24px;
    border-bottom: 5px solid #e8d7c0;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .lines span {
    display: block;
    float: left;
    height: 5px;
    background: #000;
    margin-top: 15px;
  }
  .common-title {
    width: 320px;
    height: 62px;
    background: #f4f4f4;
    border-radius: 31px;
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
  .input-box {
    overflow: hidden;
    margin: 20px 0;
  }
  .input-box input,
  .input-box textarea,
  .input-box select {
    width: 265px;
    height: 56px;
    border: 1px solid #eee;
    box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
    border-radius: 1px;
    padding-left: 20px;
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
  .input-box p img {
    float: right;
    margin: 25px 10px 0 0;
  }
  .big-title {
    font-size: 16px;
    color: #313131;
    line-height: 40px;
    height: 48px;
    padding-left: 37px;
  }
  .big-title img {
    float: left;
    margin-top: 16px;
    margin-right: 10px;
  }
  .experience-title {
    overflow: hidden;
    height: 56px;
    line-height: 56px;
    margin-left: 35px;
  }
  .experience-title p {
    text-align: center;
    font-size: 16px;
    color: #313131;
    float: left;
  }
  .work-experience {
    overflow: hidden;
    margin-bottom: 20px;
    margin-left: 35px;
    position: relative;
  }
  .work-experience span {
    display: block;
    height: 56px;
    width: 60px;
    float: left;
    font-size: 16px;
    color: #313131;
    line-height: 56px;
    text-align: center;
  }
  .work-experience input {
    width: 155px;
    height: 56px;
    border: 1px solid #eee;
    box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
    border-radius: 1px;
    padding-left: 25px;
    float: left;
  }
  /deep/ .el-date-editor {
    height: 56px;
    width: 155px;
    float: left;
    box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
    border-radius: 1px;
  }
  /deep/ .el-date-editor-common{
  	position: absolute;
  	top: 0;
  	left: 0;
  	opacity: 0;
  }
  /deep/ .el-date-editor-right{
  	left: 215px;
  }
  /deep/ .el-input__prefix,
  /deep/ .el-input__suffix {
    display: none;
  }
  /deep/ .el-input__inner {
    height: 56px;
    border: 1px solid #eee;
    border-radius: 0;
  }
  .select-frame {
    width: 1164px;
    border: 1px solid #eee;
    overflow: hidden;
    box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
    font-size: 16px;
    color: #313131;
    margin-left: 35px;
  }
  .serve-date {
    width: 1164px;
    height: 58px;
    border-bottom: 1px solid #eee;
    margin: 0 auto;
  }
  .serve-date p {
    width: 386px;
    float: left;
    text-align: center;
    margin-top: 16px;
    cursor: pointer;
  }
  .serve-date .serve_date_act {
    color: #b47c2d;
  }
  .serve-frame li {
    width: 125px;
    height: 50px;
    line-height: 50px;
    float: left;
    text-align: center;
    margin-left: 40px;
    background: url(../../img/volunteer/vol_check_box.png) no-repeat left center;
    cursor: pointer;
  }
  .serve-frame .serve_frame_act {
    background: url(../../img/volunteer/vol_check_act.png) no-repeat left center;
  }
  .job-list {
    width: 1164px;
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
    border-radius: 1px;
    overflow: hidden;
    margin: 0 0 40px 35px;
    padding: 10px 0;
  }
  .job-list li {
    width: 178px;
    margin-left: 112px;
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
  .history-info {
    overflow: hidden;
    margin: 25px 0;
  }
  .history-info span {
    display: block;
    width: 148px;
    height: 56px;
    line-height: 56px;
    float: left;
    padding-right: 16px;
    text-align: right;
  }
  .history-info input {
    float: left;
    width: 306px;
    height: 56px;
    border: 1px solid #eee;
    box-shadow: 0px 0px 16px 0px rgba(231, 231, 231, 0.75);
    border-radius: 1px;
    padding-left: 20px;
  }
  .agreement-box {
    overflow: hidden;
  }
  .promise {
    height: 30px;
    font-size: 16px;
    color: #313131;
    background: url(../../img/volunteer/vol_check_box.png) no-repeat left center;
    padding-left: 24px;
    line-height: 30px;
    float: left;
    cursor: pointer;
  }
  .promise_act {
    background: url(../../img/volunteer/vol_check_act.png) no-repeat left center;
  }
  .apply-btn {
    width: 300px;
    height: 48px;
    border-radius: 24px;
    background: #c8c8c8;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    margin: 100px auto;
    pointer-events: none;
  }
  .forbid_act {
    pointer-events: auto;
    background: #b47c2d;
  }
  .upload-box {
    position: absolute;
    top: 235px;
    right: 90px;
  }
  .upload-box .img-box {
    width: 189px;
    background: #e5e5e5;
    border: 1px solid #fff;
    img {
      display: block;
      width: 189px;
    }
  }
  .img_box_act {
    height: 270px;
  }
  .upload-box p {
    width: 189px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    color: #adadad;
  }
  .upload-box input {
    width: 189px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    border-radius: 5px;
    background: #b47c2d;
    font-size: 16px;
    cursor: pointer;
  }
  .required_act {
    border-color: red !important;
  }
  /deep/ .required_act .el-input__inner {
    border-color: red !important;
  }
}
</style>