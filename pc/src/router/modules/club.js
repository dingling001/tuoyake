const Club = [
  {
    path: '/club',
    meta: {
      cur: 4,
      title: "电竞俱乐部",
      building:true,
    },
    component: () => import('../../pages/club/club'),
  }
]
export default [
  ...Club
]
