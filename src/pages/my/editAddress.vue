<template>
    <div class="ebox">
        <van-address-edit
                :area-list="areaList"
                :show-delete="id"
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder='placeholder'
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        />
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
                id: null,
                placeholder: ['请选择', '请选择', '请选择']
            }
        },
        created() {
            this.id = this.$route.query.aid;
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
            onDelete() {
                Toast('delete');
            },
            onChangeDetail(val) {
                console.log(val)
            }
        }
    }
</script>

<style scoped>

</style>