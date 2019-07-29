<template>
    <div class="city">
        <div class="search_wrap">
            <div class="search">
                <i class="fa fa-search"></i>
                <input v-model="city_val" type="text" placeholder="输入城市名">
            </div>
            <button @click="$router.push({name:'address',params:{city:city}})">取消</button>
        </div>

        <div style="height:100%">
            <div class="location">
                <Location :address="city"/>
            </div>
            <Alphabet ref="allcity" :cityInfo = "cityInfo" :keys = "keys" />
        </div>
    </div>

</template>

<script>
import Location from '../components/Location'
import Alphabet from '../components/Alphabet'
export default {
    created(){
        this.getCityInfo();
    },
    data(){
        return{
            city_val: '',
            cityInfo: null,
            keys:[]
        }
    },
    components : {
        Location,
        Alphabet
    },
    computed:{
        city(){
            //location下面包含有addressComponent，里面有需要的city
          return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province
        }
    },
    methods:{
        getCityInfo(){
            this.$axios("/api/posts/cities").then(res=>{
                // console.log(res.data);
                this.cityInfo = res.data;
                this.keys = Object.keys(res.data);
                this.keys.pop();  //移除最后一项
                this.keys.sort();  //sort默认按照ascii字母表排序

                this.$nextTick(()=>{
                    this.$refs.allcity.initScroll();
                })
                // this.$refs.allcity.initScroll();
            }).catch(err=>{
                // console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  border: none;
  background: #fff;
  color: #009eef;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>