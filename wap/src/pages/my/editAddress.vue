<template>
    <div class="ebox">
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
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
    export default {
        name: "editAddress",
        data() {
            return {
                areaList,
                searchResult: [],
                placeholder:['请选择', '请选择', '请选择']
            }
        },
        created() {

        },
        methods: {
            onSave() {
                Toast('save');
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