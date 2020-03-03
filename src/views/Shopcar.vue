<template>
  <div id="shopcar">
    <ul class="headline">
      <li>购物车</li>
      <li>清空购物车</li>
    </ul>
    <div v-for="item in goodslist" :key="item.id" class="shopcardetails">
      <ul v-for="items in item.foods" :key="items.id" v-show="items.num>0">
        <!-- 111 -->
        <li>
          <img :src="items.image" />
          {{items.name}}
        </li>
        <li>
          <span>￥{{items.price}}</span>
          <button  @click="subtract(items.name)">-</button>
          <span>{{items.num}}</span>
          <button @click="add(items.name)">+</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    goodslist() {
      return this.$store.state.goodslist;
    }
  },
  methods: {
    add(name) {
      for (let index = 0; index < this.goodslist.length; index++) {
        for (let y = 0; y < this.goodslist[index].foods.length; y++) {
          if (this.goodslist[index].foods[y].name == name) {
            console.log(this.goodslist[index].foods[y].num);
            this.goodslist[index].foods[y].num += 1;
            this.$store.state.totalPrice += this.goodslist[index].foods[
              y
            ].price;
            return;
          }
        }
      }
    },
    subtract(name){
        for (let index = 0; index < this.goodslist.length; index++) {
        for (let y = 0; y < this.goodslist[index].foods.length; y++) {
          if (this.goodslist[index].foods[y].name == name) {
            console.log(this.goodslist[index].foods[y].num);
            this.goodslist[index].foods[y].num += -1;
            this.$store.state.totalPrice += -this.goodslist[index].foods[y]
              .price;
            return;
          }
        }
      }
    }
    
  }
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
}
#shopcar {
  max-height: 300px;
  overflow: auto;
  width: 100% !important;
  background-color: rgb(245, 238, 238) !important;
  padding: 0 !important;
  .shopcardetails {
    width: 100% !important;
    background-color: rgb(245, 238, 238) !important;
  }
  ul {
    width: 100% !important;
    display: flex;
    justify-content: space-between;
    background-color: rgb(245, 238, 238) !important;
    li {
      img {
        width: 40px;
        vertical-align: middle;
      }
      color: dimgrey;
      &:nth-child(1) {
        padding: 0 10px;
      }
      span {
        &:nth-child(1) {
          margin: 20px;
          color: coral;
        }
      }
      button {
        width: 20px;
        height: 20px;
        line-height: 20px !important;
        margin: 0px 10px;
      }
    }
  }
}
</style>