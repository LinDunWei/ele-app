<template>
    <div class="index">
        <router-view></router-view>
        <TabBar :data='tabbarData' />
    </div>
</template>

<script>
import TabBar from '../components/TabBar'
export default {
    name: 'index',
    components:{
        TabBar
    },
    data(){
        return{
            tabbarData:[
                {title:"首页",icon:"home",path:'/Home'},
                {title:"订单",icon:"file-text-o",path:'/Order'},
                {title:"我的",icon:"user",path:'/Me'}
            ]
        }
    }
}
</script>

<style scoped>
    .index{
        width: 100%;
        height: calc(100% - 45px);
    }
</style>