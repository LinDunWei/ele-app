<template>
    <div class="address">
        <Header :isLeft="true" title="请选择收货地址" />
        <div class="city_search">
            <div class="search">
                <span class="city" @click="$router.push('/city')">
                    {{city}}
                    <i class="fa fa-angle-down"></i>
                </span>
                <i class="fa fa-search"></i>
                <input type="text" placeholder="小区/写字楼/学校等" v-model="search_val">
            </div>
            <Location @click="selectAddress" :address="address" />
        </div>

        <div class="area">
          <ul class="area_list" v-for="(item,index) in areaList" :key="index">
            <li @click="selectAddress(item)">
              <h4>{{item.name}}</h4>
              <p>{{item.district}}{{item.address}}</p>
            </li>
          </ul>
        </div>
    </div>

</template>

<script>
import Header from '../components/Header'
import Location from '../components/Location'
export default {
    beforeRouteEnter(to,from,next){
        next(vm => {
            vm.city = to.params.city
        })
    },
    data(){
        return{
            city:'',
            search_val: '',
            areaList:[]
        }
    },
    computed:{
        address(){
            return this.$store.getters.location.formattedAddress;
        }
    },
    watch:{
      search_val(){
        this.searchPlace();
      }
    },
    components:{
        Header,
        Location
    },
    methods:{
      searchPlace(){
        // console.log(this.search_val);
        const s = this;
        AMap.plugin('AMap.Autocomplete', function(){
          // 实例化Autocomplete
          var autoOptions = {
            //city 限定城市，默认全国
            city: s.city
          }
          var autoComplete= new AMap.Autocomplete(autoOptions);
          autoComplete.search(s.search_val, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
            console.log(result);
            s.areaList = result.tips;
          })
        })
      },


      selectAddress(item){
        if(!item){
          this.$store.dispatch('setAddress',this.address)
        }else{
          this.$store.dispatch(
            "setAddress",
            item.district + item.address + item.name
          );
        }
        this.$router.push("/home");
      }
    }
}
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>