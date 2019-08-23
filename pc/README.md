##hy_pc
国家海洋博物馆网站功能：个人中心、票务系统、影院预约系统、讲解系统、活动系统、会员系统

##安装依赖

npm install

##多语言
npm install vue-i18n
学习地址：https://www.cnblogs.com/rogerwu/p/7744476.html

##开发环境
npm run dev

##线上环境
npm run build

##项目结构说明
hy_pc
components ---------------公共组件
http --------------------axios 请求数据接口
pages ------------------ 页面模板
active -------------- 活动预约系统
explain ------------- 讲解系统
home ---------------- 网站门户
user --------------- 用户模块
pw ----------------- 票务预约
vip ----------------- 会员系统
volunteer ----------- 志愿者系统
intro --------------- 走进海博
router------------------ 路由模块
app.vue ---------------- vue 视图入口
main.js ---------------- 框架入口文件
