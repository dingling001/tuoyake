const School = [
  {
    path: '/school',
    meta: {
      cur: 3,
      title: "电竞学院",
      building:true,
    },

    component: () => import('../../pages/school/school'),
  }
]
export default [
  ...School
]
