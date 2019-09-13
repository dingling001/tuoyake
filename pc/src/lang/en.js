module.exports = {
  navs: [
    { name: "Home Page", path: "/" },
    {
      name: "About the Museum",
      path: "/intro",
      childs: [
        {
          name: "Introduction to the Museum",
          id: "intro"
        },
        {
          name: "Contact Us",
          id: "zixun"
        }
      ]
    },
    // { name: "Organization Structuring", path: "/org",childs: [
    //     {
    //       name: "Curator’s Words ",
    //       id: "intro"
    //     },
    //     {
    //       name: "Function Introduction",
    //       id: "zixun"
    //     },
    //     {
    //       name: "Organization Structure ",
    //       id: "about"
    //     }
    //   ] },
    { name: "Visiting Services", path: "/guide" ,childs: [
        {
          name: "Visiting Guide",
          id: "intro"
        },
        {
          name: "Traffic ",
          id: "zixun"
        },
        {
          name: "Catering ",
          id: "about"
        },
        // {
        //   name: "Surrounding Haibo",
        //   id: "around"
        // }
      ]},
    { name: "Exhibitions", path: "/exb",childs: [
        // {
        //   name: "最新展览",
        //   id: "intro"
        // },
        {
          name: "Permanent Exhibitions",
          id: "intro"
        },
        {
          name: "Online Exhibitions",
          id: "zixun"
        }
      ] },
    { name: "Collection", path: "/collection" },

    { name: "Cinema ", path: "/film/film_lang" }
    // { name: "海博文创", path: "/" },
    // { name: "海博大讲堂", path: "/" }
  ],
  pageTo: "Redirect to",
  page: "Page",
  pla:"Please type in the exhibit’s name",
  allHall: "All Exhibition Halls ",
  cate:"All Categories ",
  video: "Video",
  words: 'Curator’s Words',
  obj: "Function Introduction",
  org:"Organization Structure",
  jexb: "Exhibition Introduction",
  fword: "Introduction",
  eword: "Epilogue",
  news: "",
  zixun:"",
  info: "Notice",
  openT: "Opening Hours",
  tel: "Visiting telephone number",
  fullScreen: "Panorama of the Museum ",
  cexb: "Permanent Exhibitions",
  more: "See More",
  jexbs: "Selected Exhibits",
  abouts: "Follow Us",
  weChat:"Wechat",
  xiao: "Mini Program",
  about: "Contact Us",
  intro: "Introduction to the Museum",
  tele: "Contact Number",
  email: "Museum E-mail",
  address: "Museum Address",
  title: "National Maritime Museum of China  ·  Collection",
  titles: "National Maritime Museum of China",
  detail:"Exhibit Introduction ",
  watchC: "Check Collection",
  unit: "piece(s)/set(s)",
  zhinan: "Visiting Guide",
  visit: "Notice",
  service: "Supporting Service Facilities",
  around:"Surrounding Haibo",
  zhanai:"Accessible Facilities",
  traff: "Traffic ",
  guide: "Rules and Regulations",
  traffic: "Traffic Information",
  can: "Catering ",
  oexb: "Online Exhibitions",
  etime: "Exhibition time",
  eaddress: "Exhibition location",
  ename: "Exhibition Name",
  edate: "Exhibition date",
  eOpenTime:"Opening hours",
  eaddr: "Exhibition location",
  etype: "Museum Exhibition type",
  eintro: "Exhibit Introduction",
  exbt: "Recommended Exhibits",
  d3: "3D",
  movie: "Cinema",
  search: 'Search',
  reset: "Reset",
  copyright: "All rights reserved by the National Maritime Museum of China",
  line: "Customer Service Hotline ",
  hot: "Hot Showing",
  btns: "Movie Introduction",
  movieType: "Immersive experience",
  movieT: "Film Duration",
  movieUnit: "Minute",
  brief:"Movie introduction",
  movieA: "Show Address",
  noMore: "No more",
  opens: "9:00-16:30 (stop admission at 16:00, except Monday closing holiday)",
  longtime: "permanent",
  noD:`No relevant information was found.

Try another key word~`,
  eintroS: "A Brief Introduction to the Exhibition",
  hyp:"Another Batch"

};
