<template>
    <div class="addAddress">
        <Header :isLeft="true" :title="title" />
        <!-- 表单 -->
        <div class="viewbody">
            <div class="content">
                <FormBlock label="联系人" placeholder="姓名" v-model="addressInfo.name" :tags="sexes" @checkSex="checkSex" :sex="addressInfo.sex"/>
                <FormBlock label="电话" placeholder="手机号码" v-model="addressInfo.phone"/>
                <FormBlock label="地址" placeholder="小区/写字楼/学校等" v-model="addressInfo.address" icon="angle-right" @click="showSearch=true"/>
                <FormBlock label="门牌号" placeholder="101号楼4单元404" v-model="addressInfo.bottom" icon="edit" textarea="textarea" />
                <div class="formblock">
                    <div class="label-wrap">标签</div>
                    <TabTag :tags="tags" @checkTag="checkTag" :selectTag="addressInfo.tag"/>
                </div>
            </div>
            <div class="form-button-wrap ">
                <button @click="handleSave" class="form-button">确定</button>
            </div>
        </div>
        <!-- 搜索地址页 -->
        <AddressSearch @close="showSearch=false" :showSearch="showSearch" :addressInfo="addressInfo"/>
    </div>

</template>

<script>
import Header from '../../components/Header'
import FormBlock from '../../components/Orders/FormBlock'
import TabTag from "../../components/Orders/TabTag";
import AddressSearch from "../../components/Orders/addressSearch"
import { Toast } from 'mint-ui';
export default {
    components:{
        Header,
        FormBlock,
        TabTag,
        AddressSearch
    },
    data(){
        return{
            title: '新增收货地址',
            tags: ['家','学校','公司'],
            sexes:["先生","女士"],
            addressInfo:{},
            showSearch: false
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm => {
            vm.addressInfo = to.params.addressInfo;
            vm.title = to.params.title;
        })
    },
    methods:{
        checkTag(item){
            console.log(item);
            this.addressInfo.tag = item;
        },
        checkSex(item){
            console.log(item);
            this.addressInfo.sex = item;
        },
        handleSave(){
            // console.log(this.addressInfo);
            if(!this.addressInfo.name){
                this.showMsg("请输入联系人");
                return
            }
            if(!this.addressInfo.phone){
                this.showMsg("请输入手机号码");
                return
            }
            if(!this.addressInfo.address){
                this.showMsg("请输入收货地址");
                return
            }
            if(this.title == "新增收货地址"){
                this.addAddress();
            }else{
                this.editAddress();
            }
        },
        showMsg(msg){    //mintUI 提示框
            Toast({
                message: msg,
                position: 'bottom',
                duration: 2000
            });
        },
        addAddress(){   //存储数据
            this.$axios.post(`/api/user/add_address/${localStorage.ele_login}`,this.addressInfo)
            .then(res => this.$router.push('/myAddress'))
            .catch(err => console.log(err)) 
        },
        editAddress(){
            this.$axios.post(`/api/user/edit_address/${localStorage.ele_login}/${this.addressInfo._id}`,this.addressInfo)
            .then(res => {
                this.$router.push('/myAddress')
            })
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


    /* 确定按钮 */
    .form-button-wrap {
    padding: 5.333333vw 4vw;
    display: flex;
    }
    .form-button-wrap .form-button {
    background: #00d762;
    text-align: center;
    border-radius: 0.533333vw;
    flex: 1;
    font-size: 1.1rem;
    line-height: 5.066667vw;
    color: #fff;
    padding: 3.333333vw 0;
    border: none;
    font-weight: 500;
    }
</style>