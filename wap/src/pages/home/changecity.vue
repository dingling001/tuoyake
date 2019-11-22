<template>
    <div class="citybox">
        <div class='main'>
            <div class="searchbox">
                <form class="view_searchbg">
                    <van-icon name="search"/>
                    <input v-model="inputText" type="search" class="input" placeholder="输入城市名称..." @input="oninput"/>
                </form>
                <van-button type="primary" color="#2F61D2" size="mini" @click="formSubmit">搜索</van-button>
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
                <div class="top" :style="`height: ${screenHeight}px`" ref="topContainer">
                    <div class="common sort">当前城市</div>
                    <div class="city">{{loccity}}</div>
                    <div class="common sort">热门城市</div>
                    <div class="hotaddr">
                        <div v-for="(item, index) in hotaddr" :key="index">
                            <div class="cityx" @click="hotcity(item.city)"> {{item.city}}</div>
                        </div>
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
            <b v-if="address&&!showseach" class="add">{{address}}</b>
        </div>

    </div>
</template>
<script>

    import addr from '@/bin/add'  //引用add.js
    export default {
        props: ['position'], //父组件传过来的值，由于是模拟，所以可以将position的数据写死
        data() {
            return {
                loccity: localStorage.loccity || '北京',
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
                        "city": "杭州",
                        "N": "30.16",
                        "E": "120.1",
                        "firststr": "H"
                    },
                    {
                        "city": "武汉",
                        "N": "30.35",
                        "E": "114.17",
                        "firststr": "W"
                    },
                    {
                        "city": "成都",
                        "N": "30.4",
                        "E": "104.04",
                        "firststr": "C"
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
            this.screenHeight = window.screen.availHeight - 200; //设置#topdiv的高度
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
                localStorage.wapcity = c;
                location.href = '/'
            },
            hotcity(item) {
                localStorage.wapcity = item;
                location.href = '/'
            },
            oninput() {
                this.showseach = false;
            },
            formSubmit() {  //找出与搜索框对应的城市，
                console.log(addr[0].item[0].city)
                for (let i in addr) {
                    for (let j in addr[i].item) {
                        if (this.inputText == addr[i].item[j].city) {
                            this.address = addr[i].item[j].city
                        } else {
                            this.address = '抱歉，未找到相关位置，可尝试修改后重试'
                        }
                    }
                }
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

                /depp/ .van-icon {
                    font-size: 20px;
                    /* px*/
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
                    width: 72px;
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