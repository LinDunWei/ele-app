<template>
  <div class="Rating-gray">
    <i v-for="(item,index) in itemClass" :key="index" class="fa" :class="item"></i>
  </div>
</template>

<script>
const LENGTH = 5;   //星星长度

//星星对应样式
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o" 
export default {
    props:{
        rating: Number
    },
    computed:{
        itemClass(){

            //4.8分  对应  4全星加半星
            let result = [];
            //假如4.8分，对分数进行向下取0.5的倍数  为4.5
            let score = Math.floor(this.rating * 2)/2;
            //控制半星
            let hasDecimal = score % 1 !== 0;  //true or fales, true:存在半星，fales： 不存在半星
            //全星
            let integer = Math.floor(score);  //取整 4.5 => 4
            //全星放入数组
            for(let i = 0; i < integer; i++){
                result.push(CLS_ON);
            }

            //半星放入数组
            if(hasDecimal){
                result.push(CLS_HALF);
            }

            //补齐
            while(result.length < LENGTH){
                result.push(CLS_OFF);
            }

            return result;

        }
    }
};
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>