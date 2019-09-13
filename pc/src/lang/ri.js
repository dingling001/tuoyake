module.exports = {
  navs: [
    { name: "ホーム", path: "/" },
    {
      name: "海博へ",
      path: "/intro",
      childs: [
        {
          name: "海博について",
          id: "intro"
        },
        {
          name: "問い合わせ",
          id: "zixun"
        }
      ]
    },
    // { name: "機構配置", path: "/org",childs: [
    //     {
    //       name: "館長メッセージ ",
    //       id: "intro"
    //     },
    //     {
    //       name: "職能について",
    //       id: "zixun"
    //     },
    //     {
    //       name: "組織構成 ",
    //       id: "about"
    //     }
    //   ] },
    { name: "観覧サービス", path: "/guide" ,childs: [
        {
          name: "観覧心得",
          id: "intro"
        },
        {
          name: "交通アクセス ",
          id: "zixun"
        },
        {
          name: "海博の飲食 ",
          id: "about"
        },
        // {
        //   name: "海博周辺",
        //   id: "around"
        // }
      ]},
    { name: "展示", path: "/exb",childs: [
        // {
        //   name: "最新展览",
        //   id: "intro"
        // },
        {
          name: "常設展",
          id: "intro"
        },
        {
          name: "オンライン展示",
          id: "zixun"
        }
      ] },
    { name: "所蔵品", path: "/collection" },
    { name: "シネマ ", path: "/film/film_lang" }
    // { name: "海博文创", path: "/" },
    // { name: "海博大讲堂", path: "/" }
  ],
  pageTo: "Redirect to",
  page: "Page",
  pla:"展示品名称を入力してください",
  allHall: "すべての展示ホール",
  cate:"すべての類群",
  words: '館長メッセージ',
  obj: "職能について",
  org:"組織構成",
  news: "",
  zixun:"",
  info: "注意事項",
  openT: "開放時間",
  tel: "電話番号",
  fullScreen: "海博パノラマ",
  cexb: "常設展",
  more: "もっと見る",
  jexbs: "名品ギャラリー",
  abouts: "フォロワー",
  weChat:"Wechat",
  xiao: "Wechatアプリ",
  about: "問い合わせ",
  intro: "海博について",
  tele: "電話番号",
  email: "メール",
  address: "アドレス",
  title: "中国国家海洋博物館  ·  所蔵名品",
  titles: "中国国家海洋博物館",
  guideAddress:"13412423",
  detail:"詳細を見る",
  watchC: "見る所蔵名品",
  unit: "件/カバー",
  zhinan: "観覧心得",
  visit: "注意事項",
  service: "サービス施設",
  around:"海博周辺",
  traff: "交通アクセス ",
  guide: "観覧心得",
  traffic: "交通情報",
  can: "海博の飲食 ",
  oexb: "オンライン展示",
  etime: "営業時間",
  eaddress: "展示場所",
  ename: "展覧会名",
  edate: "展覧の期日",
  eOpenTime:"営業時間",
  eaddr: "展示場所",
  etype: "展示タイプ",
  eintro: "展示品紹介",
  exbt: "おすすめ",
  d3: "3D",
  movie:"シネマ",
  video: "展示動画",
  jexb: "展示品紹介",
  fword: "はじめに",
  eword: "まとめ",
  zhanai: "身障者用設備",
  search: 'サーチ',
  reset: "リセット",
  copyright: "国家海洋博物館が版権を所有する",
  line: "問い合わせ",
  btns: "映画の紹介",
  movieType: "沈降式実験",
  movieT: "映画の長さ",
  movieUnit:"分",
  movieA: "上映アドレス",
  noMore: "これ以上ないです",
  brief: "ビデオ紹介",
  opens: "9:00～16:30（16:00は入館停止、毎週月曜日は休館日を除く)",
  longtime: "永久",
  noD:`関連した内容が見つかりませんでした。

キーワードを変えてみます。`,
  eintroS: "展覧会の概要",
  hot: "封切り映画",
  hyp:""
};
