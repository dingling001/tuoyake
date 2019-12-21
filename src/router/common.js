export default [
  // 404
  {
    path: "/NetError",
    name: "NetError",
    component: resolve => require(["../components/NetError"], resolve),
    meta: {
      title: "网络错误",
      showF: false,
      showH: false
    }
  },
  {
    path: "*",
    name: "网页走丢了",
    component: resolve => require(["../components/404"], resolve),
    meta: {
      title: "网页走丢了",
      showF: false,
      showH: false
    }
  }
];
