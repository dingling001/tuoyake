export default [
  // 404
  {
    path: "*",
    name: "404",
    component: resolve => require(["../components/404"], resolve),
    meta: {
      title: "404",
      footer: false,
      nav: false
    }
  },
  // 首页
  {
    path: "/",
    name: "index",
    component: resolve => require(["../pages/home/home"], resolve),
    meta: {
      title: "首页",
    }
  }
];
