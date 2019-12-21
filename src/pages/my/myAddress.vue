<template>
    <div class="myadd">
        <div class="loading" v-if="!listshow"><van-loading type="spinner" /></div>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @add="onAdd"
                @edit="onEdit"
                add-button-text="+ 新建收货地址"
        >
            <div slot="default" class="nodata" v-if="listshow&&list.length==0">
                <NoData :text="'暂无地址'"></NoData>
            </div>
            <div class="default_a" v-if="listshow&&list.length&&list[0].isDefault==1">默认</div>
        </van-address-list>
    </div>
<!--    @select="setdefault"-->
</template>

<script>
    export default {
        name: "myAddress",
        data() {
            return {
                chosenAddressId: '',
                list: [],
                listshow:false,
                choose: 0
            }
        },
        created() {
            this.choose = this.$route.query.choose;
            this._AddressIndex();
        },
        methods: {
            _AddressIndex() {
                this.$api.AddressIndex().then(res => {
                    this.listshow=true;
                    if (res.code == 1) {
                        var list = res.data;
                        for (let i in list) {
                            this.list.push({
                                id: list[i].id,
                                name: list[i].name,
                                tel: list[i].mobile,
                                province: list[i].province,
                                city: list[i].city,
                                district: list[i].district,
                                addressd: list[i].address,
                                address: list[i].province + list[i].city + list[i].district + list[i].address,
                                isDefault: list[i].is_default == 1 ? true : false
                            })
                        }
                    }
                })
                console.log(this.list)
            },
            onAdd() {
                this.$router.push({path: '/editAddress', query: {add: 0}})
            },
            onEdit(item) {
                this.$router.push({path: '/editAddress', query: {aid: item.id}})
            },
            setdefault(item) {
                this.$api.AddressSetAddress(
                    item.name,
                    item.tel,
                    item.province,
                    item.city,
                    item.district,
                    item.addressd,
                    1,
                    item.id
                ).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        if (this.choose == 1) {
                            this.$router.go(-1);
                        } else {
                            this.$com.showtoast('已设置为默认地址');
                            this.list = [];
                            this._AddressIndex();
                        }

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

    .myadd {
        .loading{
            text-align: center;
            padding: 10px 0;
        }
        /deep/ .van-address-list {
            .van-address-list__add {
                background-color: $baseBlue;
                border-color: $baseBlue;
                font-size: 15px;
                /*px*/
                bottom: 20px;
                border-radius: 20px;
                height: 40px;
                line-height: 40px;
                margin: 0 auto;
                width: 342px;
                left: 0;
                right: 0;
            }

            .van-radio__icon {
                font-size: 16px !important;
display: none!important;
                &.van-radio__icon--checked {
                    .van-icon {
                        background-color: $baseBlue;
                        border-color: $baseBlue;
                    }
                }
            }

            .van-icon {
                font-size: 16px;
                /*px*/
            }

            .default_a {
                position: absolute;
                top: 75px;
                right: 40px;
                color: #fff;
                border-radius: 3px;
                background-color: $baseBlue;
                font-size: 12px;
                /*px*/
                padding: 4px 6px;
            }
        }
    }

</style>