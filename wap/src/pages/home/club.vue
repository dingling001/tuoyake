<template>
    <div class="jbox">
        <div class="jnav">
            <span :class="{activespan:ind==index}" v-for="(item,index) in clist" :key="item.id">{{item.name}}</span>
        </div>
        <div class="jlist">
            <div class="jitem van-row--flex">
                <div class="jimg"><img src="" alt=""></div>
                <div class="jright">
                    <div class="jname van-ellipsis">Invictus GamingInvictus GamingInvictus GamingInvictus
                        GamingInvictus GamingInvictus Gaming
                    </div>
                    <div class="jinfo"><span class="name">王经理</span><span class="tel">17622687799</span></div>
                    <div class="jaddress van-ellipsis">和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115</div>
                </div>
            </div>
            <div class="jitem van-row--flex">
                <div class="jimg"><img src="" alt=""></div>
                <div class="jright">
                    <div class="jname van-ellipsis">Invictus GamingInvictus GamingInvictus GamingInvictus
                        GamingInvictus GamingInvictus Gaming
                    </div>
                    <div class="jinfo"><span class="name">王经理</span><span class="tel">17622687799</span></div>
                    <div class="jaddress van-ellipsis">和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115和平区大沽南路43号金融街中心1115</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Bus from '../../bin/Bus'

    export default {
        name: "club",
        data() {
            return {
                clist: [],
                ind: 0,
                page: 0,
                keyword:'',
                city:'',
                category_id:''
            }
        },
        created() {
            this._Category()
            this._ClubIndex();
        },
        methods: {
            _Category() {
                this.$api.Category().then(res => {
                    if (res.code == 1) {
                        this.clist = res.data
                    }
                })
            },
            _ClubIndex() {
                let pageNumber = this.page + 1;
                this.$com.showtoast('加载中…', '', '', 1000, '', false, true)
                this.$api.ClubIndex(
                    pageNumber,
                    this.category_id,
                    this.keyword,
                    this.city,
                ).then(res => {

                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .jbox {
        background-color: #fff;
        margin-top: -10px;
        border-radius: 10px 10px 0 0;
        padding: 60px 0;

        .jnav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px;

            span {
                font-size: 12px;
                /*px*/
                padding: 25px 0;
                color: #999;
            }

            .activespan {
                color: #333;
            }

        }

        .jlist {
            .jitem {
                margin: 0 17px 17px 17px;
                /*display: flex;*/
                padding: 0 0 15px 0;
                border-bottom: 1px solid #eee;
                /*no*/
                .jimg {
                    width: 74px;
                    height: 74px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    /*px*/
                    border: 1px solid #eee;
                    /*no*/
                    margin-right: 17px;
                    flex-shrink: 0;
                }

                .jright {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .jname {
                        font-size: 14px;
                        /* px */
                        font-weight: bold;
                        max-width: 240px;
                    }

                    .jinfo {
                        font-size: 12px;
                        /*px*/
                        color: #666666;
                    }

                    .jaddress {
                        color: #666666;
                        font-size: 12px;
                        /*px*/
                        max-width: 240px;
                    }
                }
            }

        }
    }
</style>