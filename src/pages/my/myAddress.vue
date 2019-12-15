<template>
    <div class="myadd">
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                :default-tag-text="'默认'"
                @add="onAdd"
                @edit="onEdit"
                add-button-text="+ 新建收货地址"
        >
            <div slot="default" class="nodata" v-if="list.length==0">
                <NoData :text="'暂无地址'"></NoData>
            </div>
        </van-address-list>
    </div>

</template>

<script>
    export default {
        name: "myAddress",
        data() {
            return {
                chosenAddressId: '1',
                list: [],
            }
        },
        created() {
            this._AddressIndex();
        },
        methods: {
            _AddressIndex() {
                this.$api.AddressIndex().then(res => {
                    if (res.code == 1) {
                        var list = res.data;
                        for (let i in list) {
                            this.list.push({
                                id: list[i].id,
                                name: list[i].name,
                                tel: list[i].mobile,
                                address: list[i].address,
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
            onEdit() {

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/reset";

    .myadd {
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
        }
    }

</style>