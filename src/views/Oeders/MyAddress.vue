<template>
    <div class="myAddress">
        <Header :isLeft="true" :title="title" />
        <div class="addAddressview-bottom" @click="addAddress">
            <i class="fa fa-plus-circle"></i>
            <span>新增收货地址</span>
        </div>
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
            title: '我的收货地址'
        }
    },
    methods:{
        addAddress(){
            this.$router.push('/addAddress');
        }
    }
}
</script>

<style scoped>
    .myAddress{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 45px;
    }
    .addAddressview-bottom{
        position: fixed;
        bottom: 0;
        height: 13.866667vw;
        width: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0.266667vw solid #ddd;
        color: #3190e8;
        font-size: 1rem;
    }
</style>