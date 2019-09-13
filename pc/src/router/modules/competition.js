const Competition = [
  {
    path: '/competition',
    meta: {
      cur: 1,
      title: "电竞馆",
      building:true,
    },
    component: () => import('../../pages/competition/competition'),
  }
]
export default [
  ...Competition
]
