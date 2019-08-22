<template>
    <!-- 结算页面 -->
    <div class="settlement">
        <Header :isLeft="true"  title="确认订单"/>
    </div>

</template>

<script>
import Header from '../../components/Header'
export default {
    components:{
        Header
    }
}
</script>

<style scoped>
    .settlement{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 44px;
    }
</style>