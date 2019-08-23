export default [
  {
    path: "/intro",
    name: "intro",
    meta: {
      cur: 1
    },
    component: resolve => require(["../../pages/intro/index"], resolve)
  },
  {
    path: "/introL",
    name: "introL",
    meta: {
      cur: 1
    },
    component: resolve => require(["../../pages/intro/list"], resolve)
  }
];
