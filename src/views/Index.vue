<template>
  <div id="head">
    <div class="headBig">
      <div class="headline">
        <div class="headlineimg">
          <img :src="data.avatar" alt="加载中" />
        </div>
        <div class="headlineimg-tuo">
          <h2>
            <img src="../assets/img/brand@2x.png" />
            &nbsp;{{data.name}}
          </h2>
          <p>
            <span>{{data.description}}</span>/
            <span>{{data.deliveryTime}}分钟送达</span>
          </p>
          <div class="headlineFull">
            <p>
              <img src="../assets/img/decrease_1@2x.png" />
              <span v-for="item in data.supports" :key="item.id">{{ item.description }},</span>
            </p>
            <p>{{length}}个</p>
          </div>
        </div>
      </div>
      <div class="headBanner">
        <p>
          <i>
            <img src="../assets/img/bulletin@2x.png" />
          </i>
          {{data.bulletin}}
        </p>
      </div>
    </div>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
      <MenuItem name="1">
        <Icon type="ios-basket" />
        <router-link to="/">商品</router-link>
      </MenuItem>
      <MenuItem name="2">
        <Icon type="md-text" />
        <router-link to="/Comment">评价</router-link>
      </MenuItem>
      <MenuItem name="3">
        <Icon type="ios-contact" />
        <router-link to="/merchant">商家</router-link>
      </MenuItem>
    </Menu>
    <router-view />
    <!-- 购物车面板 -->
    <div class="shoppingPanel">
      <div>￥{{totalPrice}}|另需配送费￥4元</div>
      <div v-show="totalPrice<20">￥20起送</div>
      <div v-show="totalPrice>=20">去结算</div>
      <div class="shoppingicon" @click="shopcarShow = !shopcarShow">
        <Icon type="md-cart" />
      </div>
      <div v-show="shopcarShow" class="divlocation">
        <shopcar></shopcar>
      </div>
    </div>
  </div>
</template>

<script>
import shopcar from "./Shopcar";
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      shopcarShow: false,
      theme1: "light",
      data: [],
      length: 0,
    };
  },
  created() {
    getSeller().then(res => {
      this.data = res.data.data;
      this.length = this.data.supports.length;
    });
  },
  components: {
    shopcar
  },
  computed: {
    totalPrice() {
      return this.$store.state.totalPrice;
    }
  }
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}
#head {
  color: #fff;
  height: 100%;
  .headBig {
    background-image: url(../assets/img/11d.jpg);
    .headline {
      display: flex;
      padding: 20px;
      .headlineimg {
        padding-right: 10px;
        img {
          width: 80px;
          height: 80px;
        }
      }
      .headlineimg-tuo {
        width: 100%;
        h2 {
          img {
            width: 36px;
            vertical-align: middle;
          }
        }
        p {
          font-size: 16px;
          line-height: 26px;
        }
        .headlineFull {
          width: 100%;
          display: flex;
          justify-content: space-between;
          p {
            overflow: hidden;
            height: 22px;
            &:nth-child(1) {
              font-size: 14px;
              line-height: 22px;
              img {
                width: 16px;
                vertical-align: middle;
              }
            }
            &:nth-child(2) {
              font-size: 14px;
              width: 50px;
              line-height: 22px;
              text-align: center;
              background-color: rgba(43, 43, 43, 0.3);
              border-radius: 16px;
            }
          }
        }
      }
    }
    .headBanner {
      background-color: rgba(43, 43, 43, 0.3);
      width: 100%;
      height: 40px;
      p {
        padding-left: 10px;
        line-height: 40px;
        img {
          width: 30px;
          vertical-align: middle;
        }
      }
    }
  }
  .ivu-menu-horizontal {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .shoppingPanel {
    display: flex;
    height: 50px;
    line-height: 50px;
    color: #939698;
    width: 100%;
    position: fixed;
    bottom: 0;
    .shoppingicon {
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: #2a353a;
      top: -10px;
      left: 45px;
      border-radius: 25px;
      text-align: center;
      line-height: 50px;
      font-size: 30px;
      z-index: 20;
    }
    .divlocation{
        width: 100%;
        position: absolute;
        bottom: 50px;
        left: 0;
        z-index: 10;
    }
    div {
      &:nth-child(1) {
        padding-left: 100px;
        width: 70%;
        background-color: #131d27;
      }
      &:nth-child(2) {
        width: 30%;
        background-color: #2a353a;
        text-align: center;
      }
      &:nth-child(3) {
        width: 30%;
        background-color: #2a353a;
        text-align: center;
      }
    }
  }
}
</style>