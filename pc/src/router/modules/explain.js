export default [
    {
        path: "/explain",
        name: "explain_date",
        meta: {
            cur: 0,
            title: "讲解预约--选择日期"
        },
        component: resolve => require(["../../pages/explain/explain_date"], resolve)
    },
    {
        path: "/explain/message",
        name: "explain_message",
        meta: {
            cur: 0,
            title: "讲解预约--填写预约信息"
        },
        component: resolve => require(["../../pages/explain/message"], resolve)
    },
    {
        path: "/explain/order",
        name: "explain_order",
        meta: {
            cur: 0,
            title: "讲解预约--确认信息"
        },
        component: resolve => require(["../../pages/explain/order"], resolve)
    },
    {
        path: "/explain/pay",
        name: "explain_pay",
        meta: {
            cur: 0,
            title: "讲解预约--支付"
        },
        component: resolve => require(["../../pages/explain/pay"], resolve)
    },
    {
        path: "/explain/success",
        name: "explain_success",
        meta: {
            cur: 0,
            title: "讲解预约--支付完成"
        },
        component: resolve => require(["../../pages/explain/success"], resolve)
    },
    {
        path: "/explain/explainorder",
        name: "explainorder",
        meta: {
            cur: 0,
            title: "讲解预约--订单详情"
        },
        component: resolve => require(["../../pages/explain/explainorder"], resolve)
    },
];
