<template>
  <div id="merchandise">
    <div class="merchandiseHeadline">
      <ul class="content">
        <div
          @click="clicks(index)"
          v-for="(item,index) in goodslist"
          :key="item.id"
          :class="{clickHead:true,headmark:index==cuSelected}"
        >
          <img style="width: 12px" v-show="item.type == 1" src="../assets/img/decrease_1@2x.png" />
          <img style="width: 12px" v-show="item.type == 2" src="../assets/img/discount_1@2x.png" />
          {{ item.name }}
        </div>
      </ul>
    </div>
    <div class="merchandiseIn">
      <ul class="content">
        <ul class="merchandiseInt" v-for="(items,index) in goodslist" :key="items.name" :id="index">
          <li>
            <h4>{{items.name}}</h4>
            <ul v-for="itemss in items.foods" :key="itemss.id" class="commodityDetails">
              <li>
                <img :src="itemss.image" />
              </li>
              <li class="information">
                <h3>{{itemss.name}}</h3>
                <p>{{itemss.description}}</p>
                <p>
                  <span>月售{{itemss.sellCount}}件&emsp;</span>
                  <span>好评率{{itemss.rating}}%</span>
                </p>
                <p class="selectedItems">
                  <i>￥{{itemss.price}}&emsp;</i>
                  <del v-show="itemss.oldPrice>0">￥{{itemss.oldPrice}}</del>
                  <span>
                    <button v-show="itemss.num>0" @click="subtract(itemss.name)">-</button>
                    <span v-show="itemss.num">{{itemss.num}}</span>
                    <button @click="add(itemss.name)">+</button>
                  </span>
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>
<script>
//引入BetterScroll滚动插件
import BScroll from "better-scroll";
//引入api里封装的函数
import { getGoods } from "../api/apis";
export default {
  data() {
    return {
      cuSelected: 0
    };
  },
  created() {
    getGoods().then(res => {
      this.$store.commit("changeName", res.data.data);
      console.log(res.data.data);
    });
  },
  mounted() {
    //左侧滚动
    new BScroll(document.querySelector(".merchandiseHeadline"), {
      click: true
    });
    //右侧滚动
    this.rightScroll = new BScroll(document.querySelector(".merchandiseIn"), {
      probeType: 3
    });
    this.rightScroll.on("scroll", ({ y }) => {
      let _y = Math.abs(y);
      for (let divObj of this.getDivMath) {
        // divObj ===  {min: 0, max: 1078, index: 0}
        // 根据计算完毕的DIV对象，判断y的区间段！如果处于某一个区间段！那么就把左侧索引设置为对应索引
        if (_y >= divObj.min && _y < divObj.max) {
          this.cuSelected = divObj.index;
          return; //结束剩下的所有循环
        }
      }
    });
  },
  methods: {
    clicks(index) {
      this.cuSelected = index;
      this.rightScroll.scrollToElement(document.getElementById(index), 300);
    },
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
    subtract(name) {
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
  },
  computed: {
    getDivMath() {
      let arr = [];
      let tolal = 0;
      for (let i = 0; i < this.goodslist.length; i++) {
        //当前div的高度
        let divHeight = document.getElementById(i).offsetHeight;
        // min: 之前div的高度累加 max: 之前div累加高度 + 自身div的高度
        arr.push({ min: tolal, max: tolal + divHeight, index: i });
        //每循环一次累加上之前的div高度
        tolal += divHeight;
      }
      return arr;
    },
    goodslist() {
      return this.$store.state.goodslist;
    }
  }
};
</script>

<style lang="less" scoped>
#merchandise {
  display: flex;
  height: 62%;
  .merchandiseHeadline {
    width: 140px;
    overflow: auto;
    color: #050f17;
    background-color: #f3f6f6;
    .headmark {
      background-color: white;
      border-right: 2px solid red;
    }
    .clickHead {
      padding: 16px 10px;
      height: 60px;
      align-items: center;
      border-bottom: 1px solid #e0e1e3;
    }
  }
  .merchandiseIn {
    width: 100%;
    color: #09131f;
    overflow: auto;
    .merchandiseInt {
      list-style: none;
      h4 {
        line-height: 30px;
        padding-left: 20px;
        background-color: #f3f6f6;
        color: #a0a7ac;
        font-weight: normal;
      }
      .commodityDetails {
        padding: 20px;
        display: flex;
        list-style: none;
        li {
          img {
            width: 70px;
          }
        }
        .information {
          width: 100%;
          padding: 0 6px;
          .selectedItems {
            color: #f41116;
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          p {
            color: #809495;
            i {
              font-style: normal;
              color: #f41116;
              font-weight: bold;
            }
            button {
              width: 20px;
              height: 20px;
              line-height: 20px !important;
              margin: 0px 10px;
              background-color: #00a1dc;
              color: #fff;
              border: #00a1dc;
              border-radius: 50%;
              outline: 0;
            }
          }
        }
      }
    }
  }
}
</style>