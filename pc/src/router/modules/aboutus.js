const About = [
  {
    path: '/about',
    meta: {
      cur: 5,
      title: "关于我们",
      building:true,
    },
    component: () => import('../../pages/aboutus/about'),
  }
];
export default [
  ...About
]
