<template>
    <div class="citybox">
        <div class='main'>
            <div class="searchbox">
                <i class="iconfont iconfanhui" @click="backindex"></i>
                <form class="view_searchbg">
                    <i class="iconfont iconsousuo1"></i>
                    <input v-model="inputText" type="search" class="input" placeholder="输入城市名称..." @input="oninput"
                           @keyup.enter="formSubmit"/>
                </form>
                <van-button type="primary" color="#2F61D2" size="small" @click="formSubmit">搜索</van-button>
            </div>
            <div v-if="showseach">
                <div class="slide">
                <span v-for="(item, index) in temABC" :key='index'>
                    <span class="temABC" @click="slide(item)">{{item}}</span>
                </span>
                </div>
                <div v-if="show==1">
                    <div class="yin">{{strA}}</div>
                </div>
                <div class="top" :style="`height: ${screenHeight}`" ref="topContainer">
                    <div class="common sort">当前城市</div>
                    <div class="city" @click="hotcity(loccity)">{{loccity||'尚未开启定位'}}</div>
                    <div class="common sort">热门城市</div>
                    <div class="hotaddr">
                        <div class="cityx" @click="hotcity(item.city)" v-for="(item, index) in hotaddr" :key="index">{{item.city}}</div>
                    </div>
                    <!--                    <div class="common sort">排序城市</div>-->
                    <div v-for="(item, index) in addr" :key="index" :id="item.key">
                        <div class="sort">{{item.key}}</div>
                        <div v-for="(item1, key) in item.item" :key="key">
                            <div class="add" @click="choosecity(item1.N, item1.E, item1.city)"> {{item1.city}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <b v-if="address&&!showseach" class="add" @click="hotcity(address)">{{address}}</b>
        </div>
    </div>
</template>
<script>
    import {Dialog} from 'vant'
    import addr from '@/bin/add' //引用add.js
    export default {
        props: ['position'], //父组件传过来的值，由于是模拟，所以可以将position的数据写死
        data() {
            return {
                loccity: '',
                // position: {
                //     city: "深圳市",
                //     lat: parseFloat(22.553329),
                //     lng: parseFloat(113.88308)
                // },
                temABC: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                hotaddr: [
                    {
                        "city": "北京",
                        "N": "39.55",
                        "E": "116.24",
                        "firststr": "B"
                    },
                    {
                        "city": "天津",
                        "N": "39.02",
                        "E": "117.12",
                        "firststr": "T"
                    },
                    {
                        "city": "上海",
                        "N": "31.14",
                        "E": "121.29",
                        "firststr": "S"
                    },
                    {
                        "city": "重庆",
                        "N": "29.35",
                        "E": "106.33",
                        "firststr": "Z"
                    },
                    {

                        "city": "广州",
                        "N": "23.08",
                        "E": "113.14",
                        "firststr": "G"
                    },
                    {
                        "city": "深圳",
                        "N": "22.33",
                        "E": "114.07",
                        "firststr": "S"
                    },
                    {
                        city: '杭州',
                        id: 700
                    },
                    {
                        city: '青岛',
                        id: 800
                    },
                    {
                        city: '武汉',
                        id: 800
                    },
                    {
                        city: '成都',
                        id: 900
                    },
                    {
                        city: '长沙',
                        id: 1
                    },
                    {
                        city: '南京',
                        id: 2
                    },
                    {
                        city: '郑州',
                        id: 3
                    },
                    {
                        city: '西安',
                        id: 5
                    },
                    {
                        city: '苏州',
                        id: 6
                    },
                    {
                        city: '太原',
                        id: 7
                    },
                    {
                        city: '石家庄',
                        id: 8
                    },
                    {
                        city: '福州',
                        id: 9
                    },
                    {
                        city: '济南',
                        id: 10
                    },
                    {
                        city: '南宁',
                        id: 11
                    },
                    {
                        city: '大连',
                        id: 12
                    },
                    {
                        city: '沈阳',
                        id: 13
                    },
                    {
                        city: '吉林',
                        id: 14
                    },
                    {
                        city: '哈尔滨',
                        id: 15
                    },
                    {
                        city: '呼和浩特',
                        id: 16
                    },
                    {
                        city: '乌鲁木齐',
                        id: 17
                    },
                    {
                        city: '银川',
                        id: 18
                    },
                    {
                        city: '贵州',
                        id: 19
                    },
                    {
                        city: '昆明',
                        id: 20
                    },
                    {
                        city: '南昌',
                        id: 21
                    },
                    // {
                    //     "city": "南京",
                    //     "N": "32.03",
                    //     "E": "118.46",
                    //     "firststr": "N"
                    // },
                    // {
                    //     "city": "佛山",
                    //     "N": "23.02",
                    //     "E": "113.06",
                    //     "firststr": "F"
                    // },
                    // {
                    //     "city": "西安",
                    //     "N": "34.17",
                    //     "E": "108.57",
                    //     "firststr": "X"
                    // },

                ],
                addr: addr,
                show: 0,
                strA: [],
                screenHeight: 0,
                inputText: '',
                ind: 0,
                address: '',
                showseach: true
            }
        },

        mounted() {
            console.log(this.hotaddr)
            this.loccity = localStorage.loccity;
            this.screenHeight = 100 + 'vh'; //设置#topdiv的高度
            if (sessionStorage.changecity && localStorage.loccity) {
                if (sessionStorage.wapcity != localStorage.loccity) {
                    Dialog.confirm({
                        title: '',
                        message: '检测到您目前所在城市是<b>' + localStorage.loccity + '</b>\n是否要切换'
                    }).then(() => {
                        // on confirm
                        sessionStorage.wapcity = localStorage.loccity;
                        this.$router.go(-1);
                    }).catch(() => {
                        // on cancel
                    });
                }
            }
        },
        methods: {
            slide(item) {
                let that = this;
                this.show = 1;  //弹出右侧点击的字母
                this.strA = item;
                for (let key in addr) {
                    if (item == key) {  //判断城市列表中是否包含右侧点击的字母，不判断会报错
                        let slideScrollHeight = document.querySelector('#' + item).offsetTop - 85; //计算要滚动的距离
                        this.$refs.topContainer.scrollTop = slideScrollHeight;  //赋值给需要滚动的盒子
                    }
                }
                setTimeout(function () {
                    that.show = 0;  //两秒后关闭
                }, 2000)

            },
            choosecity(a, b, c) {
                sessionStorage.wapcity = c;
                sessionStorage.changecity = true;
                this.$router.go(-1);
            },
            hotcity(item) {
                if (item) {
                    sessionStorage.wapcity = item;
                    sessionStorage.changecity = true;
                    this.$router.go(-1);
                }
            },
            oninput() {
                this.showseach = this.address;
            },
            formSubmit() {  //找出与搜索框对应的城市，
                // console.log(addr[0].item[0].city)
                for (let i in addr) {
                    for (let j in addr[i].item) {
                        console.log(addr[i].item[j].city.indexOf(this.inputText))
                        if (addr[i].item[j].city.indexOf(this.inputText) > -1) {
                            this.address = addr[i].item[j].city
                            return
                        } else {
                            this.address = '抱歉，未找到相关位置，可尝试修改后重试'
                        }
                    }
                }
            },
            backindex() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/less">
    .citybox {
        padding-bottom: 0 !important;
    }

    .main {
        width: 100%;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 999;

        .searchbox {
            display: flex;
            align-items: center;
            margin: 25px;

            .iconfanhui {
                font-size: 14px;
                color: #666;
                margin-right: 10px;
            }

            .view_searchbg {
                flex: 1;
                display: flex;
                align-content: center;
                border-radius: 5px;
                padding: 0 20px;
                border-style: solid;
                border-width: 1px;
                overflow: hidden;
                border-color: #cdcdcd;
                align-items: center;
                justify-content: space-between;
                position: relative;
                background-color: #fff;
                margin: 0 10px 0 0;

                i.iconsousuo1 {
                    font-size: 12px;
                    /* px*/
                    color: #999;
                }


                .input {
                    border: 0;
                    flex: 1;
                    margin: 0 0 0 10px;
                    height: 30px;

                    &:focus {
                        outline: 0;
                    }
                }
            }
        }


        /* 当前城市 */
        .top {
            overflow-x: hidden;
            overflow-y: scroll;
            font-size: 13px;
            line-height: 30px;
            width: 97%;
            display: inline-block;


            .hotaddr {
                display: flex;
                flex-wrap: wrap;
                align-content: stretch;
                padding: 0 15px;
                /*justify-content: center;*/

                .cityx {
                    width: 102px;
                    height: 30px;
                    text-align: center;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    border-radius: 4px;
                    /*border: 1px solid #d5d5d5;*/
                    background-color: #f5f5f5;
                    color: black;
                    display: inline-block;
                    font-size: 13px;
                    /*    px*/
                    &:nth-child(3n) {
                        margin: 0 0 10px 0;
                    }
                }
            }
        }
    }

    /*排序城市*/

    .footer1 {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        line-height: 30px
    }

    .add {
        line-height: 40px;
        font-size: 13px;
        padding-left: 15px;
        display: block;

        &:active {
            opacity: .7;
            background-color: #f5f5f5;
        }
    }

    /*右侧*/
    .slide {
        width: 25px;
        height: 100%;
        position: fixed;
        right: 0;
        top: 60px;
        color: #333;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        text-align: center;
        z-index: 3;

        span {
            line-height: 15px;
        }
    }

    /*阴影*/
    .yin {
        width: 88px;
        height: 88px;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 30%;
        left: 40%;
        text-align: center;
        line-height: 88px;
        color: white;
        border-radius: 4px;
        font-size: 40px;
        z-index: 9;
    }

    /*.input {*/
    /*    position: absolute;*/
    /*    left: 50px;*/
    /*    top: 0;*/
    /*    height: 30px;*/
    /*    background-color: #fff;*/
    /*    font-size: 14px;*/
    /*    width: 100%;*/
    /*}*/

    .temABC {

        margin-top: 0.04rem;

    }

    .city {
        height: 32px;
        line-height: 32px;
        padding-left: 15px;
    }

    .common {
        background-color: #fff;
        font-weight: bolder;
        width: 100%;
        padding: 0 0 0 15px;

        &.sort {
            padding-left: 15px;
            background-color: #f5f5f5;
            margin-bottom: 5px;
        }
    }

    .sort {
        padding-left: 15px;
        background-color: #f5f5f5;
    }

</style>