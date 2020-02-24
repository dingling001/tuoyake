<template>
    <div class="rbox">
        <div class="aitem" @click="goaddress" v-if="showadd&&addinfo.id!=0">
            <div class="left">
                <div class="address">{{addinfo.province}}{{addinfo.city}}{{addinfo.district}}{{addinfo.address}}</div>
                <div>{{addinfo.name}} {{addinfo.mobile}}</div>
                <span class="default_a" v-if="addinfo.is_default==1">默认</span>
            </div>
            <div class="iconfont iconjiantou"></div>
        </div>
        <div class="aitem noadd" @click="addardess" v-if="showadd&&addinfo.id==0 ">
            <i class="iconfont iconplus-circle"></i><span>添加地址</span>
        </div>
        <div class="ritem" v-if="Object.keys(item).length">
            <div class="rname">奖品信息</div>
            <div class="rinfo">
                <!--<div class="rimg"><img :src="item.image" alt=""></div>-->
                <van-image fit="contain" width="1.6rem" height="1.6rem" :src="item.image"/>
                <div class="rcontent">
                    <div class="rgname">{{item.goods_name}}</div>
                    <div class="rdes">X1</div>
                    <div class="">{{item.content}}</div>
                </div>
            </div>
        </div>
        <div class="aitem">
            <div class="left">
                <div class="address">领取说明</div>
                <div v-html="score_receive_explain"></div>
            </div>
        </div>
        <van-button class="btn" @click="_SignReceive" :disabled ="Object.keys(item).length==0" :loading="loading" type="info" :loading-text="loadingtext">确认领取
        </van-button>
    </div>
</template>

<script>
    // import NoData from '../../components/NoData'
    export default {
        name: "takeReward",
        data() {
            return {
                item: {},
                noorder: require('../../assets/img/nodata.png'),
                goods_id: '',
                addinfo: {},
                score_receive_explain: '',
                showadd: false,
                loadingtext: '',
                loading: false
            }
        },
        created() {
            this.goods_id = this.$route.query.goods_id;
            this._ScoreMyReceived();
            this._CommonGetConfig();
            this._addressSingle();
        },
        components: {
            // NoData
        },
        methods: {
            _addressSingle() {
                this.$api.addressSingle().then(res => {
                    this.showadd = true;
                    if (res.code == 1) {
                        this.addinfo = res.data;
                    }
                })
            },
            goaddress() {
                this.$router.push({path: '/myAddress', query: {choose: 1}})
            },
            addardess() {
                this.$router.push({path: '/myAddress', query: {choose: 1}})
            },
            _ScoreMyReceived() {
                this.$api.ScoreDetail(this.goods_id).then(res => {
                    if (res.code == 1) {
                        this.item = res.data;
                    }
                })
            },
            _CommonGetConfig() {
                this.$api.CommonGetConfig().then(res => {
                    this.score_receive_explain = res.data.score_receive_explain
                })
            },
            _SignReceive() {
                this.loading = true
                this.loadingtext = '领取中...'
                this.$api.ScoreReceive(this.item.id, this.addinfo.id).then(res => {
                    this.loading = false;
                    if (res.code == 1) {
                        this.$com.showtoast('领取成功，等待工作人员处理...');
                       setTimeout(function () {
                           this.$router.go(-1)
                       },1500)
                    } else {
                        this.$com.showtoast(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .rbox {
        min-height: 100vh;
        background-color: #F8F8F8;

        .aitem {
            display: flex;
            justify-content: space-between;
            color: #333;
            padding: 20px 17px;
            background-color: #fff;
            margin: 15px 0 0 0;

            &.noadd {
                display: flex;
                align-items: center;
                justify-content: center;
                color: $baseBlue;
                font-size: 15px;
                /*px*/
                .iconplus-circle {
                    color: $baseBlue;
                    font-weight: bold;
                    margin-right: 5px;
                    font-size: 16px;
                    /*px*/

                }
            }

            .left {
                flex: 1;
                margin-right: 40px;
                position: relative;
                font-size: 13px;
                /*px*/
                .address {
                    font-size: 15px;
                    /*px*/
                    font-weight: bold;
                    padding-bottom: 15px;
                    text-align: justify;
                    line-height: 18px;
                }

                .default_a {
                    position: absolute;
                    right: -35px;
                    top: 0;
                    font-size: 12px;
                    padding: 3px 5px;
                    border-radius: 5px;
                    color: #fff;
                    background-color: $baseBlue;
                }
            }

            .iconfont {
                flex-shrink: 0;
                font-size: 16px;
                /*px*/
                color: #C5CCD8;
            }

        }

        .ritem {
            background-color: #fff;
            padding: 17px;
            margin: 13px 0;

            .rname {
                color: #333;
                font-weight: bold;
                font-size: 14px;
                /*px*/
                padding: 0 0 16px 0;
            }

            .rinfo {
                display: flex;
                justify-content: space-between;

                .rcontent {
                    flex: 1;
                    margin: 0 13px;
                    font-size: 14px;
                    /*px*/
                    color: #333;
                }

                .rgname {

                }

                .rdes {
                    color: #666666;
                    font-size: 14px;
                    /*px*/
                    padding: 12px 0 5px 0;
                }

                /deep/ .van-button {
                    background-color: $baseBlue;
                    border-color: $baseBlue;
                    width: 55px;
                    height: 28px;
                    line-height: 28px;
                    color: #fff;

                    &.van-button--disabled {
                        background-color: #DDDDDD;
                        border-color: #DDDDDD;
                        opacity: 1;
                    }
                }
            }
        }

        .btn {
            width: 342px;
            margin: 40px auto;
            height: 44px;
            font-size: 17px;
            /*px*/
            line-height: 44px;
            color: #fff;
            text-align: center;
            background: $baseBlue;
            border-radius: 5px;
        }

    }
</style>