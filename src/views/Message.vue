<template>
  <div id="merchandise">
    <div class="merchandiseHeadline">
      <ul class="content">
        <div
          @click="clicks(index)"
          v-for="(item,index) in data"
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
        <ul class="merchandiseInt" v-for="(items,index) in data" :key="items.name" :id="index">
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
                <p>
                  <i>￥{{itemss.price}}&emsp;</i>
                  <del  v-show="itemss.oldPrice>0">￥{{itemss.oldPrice}}</del>
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
import BScroll from "better-scroll";
import { getGoods } from "../api/apis";
export default {
  data() {
    return {
      data: [],
      cuSelected: 0
    };
  },
  created() {
    getGoods().then(res => {
      this.data = res.data.data;
      console.log(this.data);
    });
  },
  mounted() {
    new BScroll(document.querySelector(".merchandiseHeadline"), {
      click: true
    });
    this.rightScroll = new BScroll(document.querySelector(".merchandiseIn"));
  },
  methods: {
    clicks(index) {
      this.cuSelected = index;
      this.rightScroll.scrollToElement(document.getElementById(index), 800);
    }
  }
};
</script>

<style lang="less" scoped>
#merchandise {
  display: flex;
  height: 65%;
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
          padding: 0 6px;
          p {
            color: #809495;
            i{
              font-style:normal;
              color: #f41116;
              font-weight:bold;
            }
          }
        }
      }
    }
  }
}
</style>