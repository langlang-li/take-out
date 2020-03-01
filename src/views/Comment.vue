<template>
  <div id="Comment">
    <div class="CommentGraded">
      <div class="CommentGradeds">
        <h2>{{data.score}}</h2>
        <p>综合评分</p>
        <p>
          高于周边商家
          <span>{{data.rankRate}}</span>%
        </p>
      </div>
      <div class="CommentGradedss">
        <div>
          <p>服务评分</p>
          <Rate allow-half v-model="data.serviceScore" />
          <span>{{data.serviceScore}}</span>
        </div>
        <div>
          <p>口味评分</p>
          <Rate allow-half v-model="data.foodScore" />
          <span>{{data.foodScore}}</span>
        </div>
        <div>
          <p>送达时间</p>
          <span class="time">{{data.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <div class="vacancy"></div>
    <div class="top">
      <div>
        全部
        <span>{{data.ratingCount}}</span>
      </div>
      <div>
        满意
        <span>{{data.minPrice}}</span>
      </div>
      <div>
        不满意
        <span>{{data.deliveryPrice}}</span>
      </div>
    </div>
    <div class="evaluateIcon">
      <p>
        <Icon type="md-checkmark-circle" />只看有内容的评价
      </p>
    </div>
    <div class="evaluateContent">
      <div v-for="item in movieList" :key="item.id" class="evaluatedetail">
        <div class="imgs">
          <img :src="item.avatar" />
        </div>
        <div class="evaluatedeCharacter">
          <p>{{item.username}}</p>
          <p><Rate allow-half v-model="item.score" />{{item.deliveryTime}}分钟送达</p>
          <p>{{item.text}}</p>
          <div class="orderDishes">
            <Icon type="md-thumbs-up" v-show="item.rateType==0"/>
            <Icon type="md-thumbs-down" v-show="item.rateType==1"/>
            <div v-for="items in item.recommend" :key="items.id">{{items}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
import { getRatings } from "../api/apis";
export default {
  data() {
    return {
      data: [],
      movieList: []
    };
  },
  created() {
    getSeller().then(res => {
      this.data = res.data.data;
    });
    getRatings().then(res => {
      this.movieList = res.data.data;
      console.log(this.movieList);
    });
  }
};
</script>

<style lang="less" scoped>
#Comment {
  color: black;
  .CommentGraded {
    margin: 20px;
    display: flex;
    .CommentGradeds {
      width: 35%;
      border-right: 1px solid #e6e6e6;
      text-align: center;
      h2 {
        color: #fb9a00;
      }
      p {
        &:last-child {
          font-size: 12px;
          color: #8e949d;
        }
      }
    }
    .CommentGradedss {
      padding-left: 10px;
      div {
        display: flex;
        line-height: 30px;
        span {
          color: #fb9a00;
        }
        p {
          padding-right: 6px;
        }
        .time {
          color: #8e959a;
        }
      }
    }
  }
  .vacancy {
    background-color: #f3f6f6;
    height: 26px;
    border: 1px solid #e7e7e7;
  }
  .top {
    padding: 10px;
    display: flex;
    div {
      width: 80px;
      text-align: center;
      line-height: 40px;
      margin: 5px;
      &:nth-child(1) {
        background-color: #00a1dc;
        color: #d4eaff;
      }
      &:nth-child(2) {
        background-color: #cceef7;
      }
      &:nth-child(3) {
        background-color: #e9ecec;
      }
    }
  }
  .evaluateIcon {
    color: #b7bbbf;
    padding-left: 15px;
    line-height: 40px;
    border-bottom: 1px solid #e4e7e7;
    border-top: 1px solid #e4e7e7;
  }
  .evaluateContent {
    .evaluatedetail {
      display: flex;
      border-bottom: 1px solid #92969a;
      margin: 20px;
      padding-bottom: 20px;
      .imgs {
        margin: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
      }
      .evaluatedeCharacter {
        p {
          &:nth-child(3) {
            font-size: 18px;
          }
        }
        .orderDishes {
          display: flex;
          flex-wrap: wrap;
          color: #92969a;
          line-height: 20px;
          font-size: 14px;
          i{
              font-size: 18px;
          }
          div {
            padding: 0 2px;
            border: 1px solid #92969a;
            margin: 2px;
          }
        }
      }
    }
  }
}
</style>