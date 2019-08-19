<template>
    <div class="addAddress">
        <Header :isLeft="true" :title="title" />

        <div class="viewbody"></div>
    </div>

</template>

<script>
import Header from '../../components/Header'
export default {
    components:{
        Header
    },
    data(){
        return{
            title: '新增收货地址'
        }
    },
}
</script>

<style scoped>
    .addAddress{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 45px;
    }
    .viewbody{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        background-color: #f5f5f5;
    }
</style>