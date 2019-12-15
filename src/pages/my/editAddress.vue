<template>
    <div class="ebox">
        <div class="nav">
            <span class="iconfont iconfanhui" @click="goback"></span>
            <span>{{title}}</span>
        </div>
        <van-address-edit
                :area-list="areaList"
                :address-info="addressinfo"
                :show-delete="showid"
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder='placeholder'
                @save="onSave"
                @delete="onDelete"
        >
        </van-address-edit>
    </div>
</template>

<script>
    import AreaList from '../../bin/area'

    export default {
        name: "editAddress",
        data() {
            return {
                areaList: AreaList,
                searchResult: [],
                addressinfo: {},
                aid: null,
                showid: false,
                placeholder: ['请选择', '请选择', '请选择'],
                title: '添加地址'
            }
        },
        created() {
            this.aid = this.$route.query.aid;
            if (this.aid) {
                this.showid = true;
                this._AddressDetail();
                this.title = '编辑地址'
            }
        },

        methods: {
            onSave(info) {
                console.log(info)
                this.$api.AddressSetAddress(
                    info.name,
                    info.tel,
                    info.province,
                    info.city,
                    info.county,
                    info.addressDetail,
                    info.isDefault ? 1 : 0,
                    this.aid
                ).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.$com.showtoast(this.aid ? '编辑成功' : '添加成功')
                        this.$router.go(-1)
                    } else {
                        this.$com.showtoast(res.msg)
                    }
                })
            },
            onDelete(item) {
                console.log(item)
                this.$api.addressDel(item.id).then(res => {
                    if (res.code == 1) {
                        this.$com.showtoast('删除成功');
                        this.$router.go(-1);
                    } else {
                        this.$com.showtoast(res.msg)
                    }
                })
            },
            _AddressDetail() {
                this.$api.AddressDetail(this.aid).then(res => {
                    if (res.code == 1 && res.data) {
                        var pcode = '';
                        var areaCode = '';
                        var provincelist = Object.values(AreaList.province_list);
                        var provincecode = Object.keys(AreaList.province_list);
                        var county_list = Object.values(AreaList.county_list);
                        var countycode = Object.keys(AreaList.county_list);
                        for (var j in provincelist) {
                            if (provincelist[j] == res.data.province) {
                                pcode = provincecode[j]
                            }
                        }
                        for (var i in county_list) {
                            if (county_list[i] == res.data.district) {
                                if (countycode[i].substring(0, 2) == pcode.substring(0, 2)) {
                                    areaCode = countycode[i]
                                }
                            }
                        }
                        console.log(areaCode)
                        var info = {};
                        info.name = res.data.name;
                        info.tel = res.data.mobile;
                        info.province = res.data.province;
                        info.city = res.data.city;
                        info.county = res.data.district;
                        info.addressDetail = res.data.address;
                        info.isDefault = res.data.is_default == 1;
                        info.areaCode = areaCode;
                        info.id = res.data.id;
                        this.addressinfo = info;

                    }

                })
            },
            goback() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="scss">
    .ebox {
        padding-top: 60px;

        .nav {
            height: 56px;
            text-align: center;
            /*padding: 0 15px;*/
            line-height: 56px;
            color: #333;
            font-size: 17px;
            /*px*/
            font-weight: bold;
            background-color: #fff;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10;

            .iconfont {
                position: absolute;
                left: 15px;
                top: 0;
                z-index: 1;
                font-weight: normal;
                color: #333333;
                font-size: 17px;
                /*px*/
            }

            .navright {
                position: absolute;
                right: 15px;
                top: 0;
                z-index: 1;
                font-size: 13px;
                /*px*/
                color: #333333;
            }
        }
    }
</style>