<template>
    <van-tabs v-model="active" swipeable @click="changetype" class="coupbox">
        <van-tab v-for="(item,index) in navs" :key="index" :title="item" class="tab">
        </van-tab>
        <div v-show="active==0">
            <div class="couponlist">
                <div :class="['coupitem',item.status==3||item.status==4?'used':'']" v-for="(item,index) in couplist"
                     @click="godetail(item.id)">
                    <span class="leftcricle"></span>
                    <span class="rightcricle"></span>
                    <div class="cl">
                        <div>{{item.name}}</div>
                        <div class="date">{{item.expire_time}}</div>
                    </div>
                    <div class="cr">{{item.status_text}} <span v-if="item.status==1||item.status==2"
                                                               class="iconfont iconcaret-right"></span></div>
                </div>
            </div>
        </div>
        <div v-show="active==1">
            <div class="couponlist" v-if="couplist.length">
                <div :class="['coupitem',item.status==3||item.status==4?'used':'']" v-for="(item,index) in couplist">
                    <span class="leftcricle"></span>
                    <span class="rightcricle"></span>
                    <div class="cl">
                        <div>{{item.name}}</div>
                        <div class="date">{{item.expire_time}}</div>
                    </div>
                    <div class="cr">{{item.status_text}} <span v-if="item.status==1||item.status==2"
                                                               class="iconfont iconcaret-right"></span></div>
                </div>
            </div>
            <div class="nodata" v-else>暂无数据</div>
        </div>
    </van-tabs>
</template>

<script>
    export default {
        name: "myCoupon",
        data() {
            return {
                active: 0,
                page: 0,
                navs: ['未使用', '已使用'],
                couplist: [],
                type: 1
            }
        },
        created() {
            this._GetCouponList()
        },
        methods: {
            // 获取列表
            _GetCouponList() {
                this.$api.GetCouponList(this.type, this.page).then(res => {
                    this.couplist = res.data.data;
                })
            },
            // 切换
            changetype() {
                this.type = this.active + 1;
                this.page = 0;
                this._GetCouponList()
            },
            // 去详情
            godetail(id) {
                this.$router.push({path: 'myCoupondetail', query: {id: id}})
            }

        }
    }
</script>

<style scoped lang="scss">
    .coupbox {
        background-color: #F8F8F8;

        /deep/ .van-hairline--top-bottom, .van-hairline-unset--top-bottom {
            &:after {
                border: 0;
                border-bottom: 1px solid #ebedf0;
            }
        }

        .couponlist {
            padding: 24px 0;
            margin: 0 16px;

            .coupitem {
                background: linear-gradient(90deg, rgba(252, 208, 116, 1), rgba(255, 85, 73, 1));
                /*height: 94px;*/
                position: relative;
                display: flex;
                align-items: center;
                padding: 28px 26px 28px 37px;
                justify-content: space-between;
                margin-bottom: 17px;

                .leftcricle {
                    position: absolute;
                    background-color: #fff;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    left: -10px;
                    top: 0;
                    bottom: 0;
                    margin: auto 0;
                }

                .rightcricle {
                    position: absolute;
                    background-color: #fff;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    right: -10px;
                    top: 0;
                    bottom: 0;
                    margin: auto 0;
                }

                .cl {
                    color: #fff;
                    font-size: 16px;
                    /*px*/
                    line-height: 20px;

                    .date {
                        font-size: 12px;
                    }
                }

                .cr {
                    width: 70px;
                    /*height: 25px;*/
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    border-radius: 13px;
                    flex-shrink: 0;
                    text-align: center;
                    line-height: 25px;
                    color: #fff;
                    font-size: 12px;
                    /*px*/
                    .iconcaret-right {
                        font-size: 12px;
                        /*px*/
                    }

                }

                &.used {
                    background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));

                    .cr {
                        border: 0;
                    }
                }
            }
        }

    }

</style>