export default [

  // 首页
  {
    path: "/",
    name: "index",
    component: resolve => require(["../pages/home"], resolve),
    meta: {
      title: "首页",
      cur: 0
    }
  },
  // 404
  {
    path: "*",
    name: "404",
    component: resolve => require(["../components/404"], resolve),
    meta: {
      title: "404",
      menus: false
    }
  },
];
