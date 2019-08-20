<template>
    <div class="addAddress">
        <Header :isLeft="true" :title="title" />

        <div class="viewbody">
            <div class="content">
                <FormBlock label="联系人" placeholder="姓名" :tags="sexes" @checkSex="checkSex" :sex="addressInfo.sex"/>
                <FormBlock label="电话" placeholder="手机号码" />
                <FormBlock label="地址" placeholder="小区/写字楼/学校等" icon="angle-right" />
                <FormBlock label="门牌号" placeholder="101号楼4单元404" icon="edit" textarea="textarea" />
                <div class="formblock">
                    <div class="label-wrap">标签</div>
                    <TabTag :tags="tags" @checkTag="checkTag" :selectTag="addressInfo.tag"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Header from '../../components/Header'
import FormBlock from '../../components/Orders/FormBlock'
import TabTag from "../../components/Orders/TabTag";
export default {
    components:{
        Header,
        FormBlock,
        TabTag
    },
    data(){
        return{
            title: '新增收货地址',
            tags: ['家','学校','公司'],
            sexes:["先生","女士"],
            addressInfo:{
                tag: "",
                sex: ""
            }
        }
    },
    methods:{
        checkTag(item){
            console.log(item);
            this.addressInfo.tag = item;
        },
        checkSex(item){
            console.log(item);
            this.addressInfo.sex = item;
        }
    }
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
    .content{
        padding-left: 10px;
        background: #fff;
        font-size: 0.94rem;
    }
    .formblock{
        background: #fff;
        border-bottom: 1px solid #eee;
        display: flex;
    }
    .formblock .label-wrap{
        flex-basis: 17.33333vw;
        padding: 3.733333vw 0;
        line-height: 4.8vw;
        color: #333; 
        font-weight: 700;
    }

</style>