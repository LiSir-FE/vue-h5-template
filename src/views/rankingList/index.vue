<!-- home -->
<template>
  <div class="warpper">
    <van-image width="14em" fit="contain" :src="logos" class="logos"/>
    <div class="buttonTop">
      <div class="buttonBorder">
        <van-image :src="border" />
      </div>
      <div class="buttonMain">
        <van-image :src="main"  class="main"/>
      </div>
      <div class="buttonText">
        <div class="buttonTextLeft">
          <div class="textTop">已答对</div>
          <div class="textBtn">2/10</div>
        </div>
        <div class="buttonTextRight">
          <div class="textTop">已用时</div>
          <div class="textBtn">123 <span>秒</span> </div>
        </div>
      </div>
    </div>

    <div class="buttonMin">
      <div class="buttonMinLeft">
        <van-image :src="buttonLft" />
      </div>
      <div class="buttonMinRight">
        <van-image :src="buttonRight" />
      </div>
    </div>

    <div class="listBtn">
      <van-tabs v-model="active">
        <van-tab title="排行榜">
          <div class="listAllTop">
            <p v-for="item in listTop">{{ item.value }}</p>
          </div>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in allList" :key="item" :title="item" />
          </van-list>
        </van-tab>
        <van-tab title="我的战绩">
          <div class="listAllTop">
            <p v-for="item in listTop2">{{ item.value }}</p>
          </div>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in allList" :key="item" :title="item" />
          </van-list>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>

export default {

  data() {
    return {
      logos: require('../../assets/img/logos.png'),
      main: require('../../assets/img/main.png'),
      border: require('../../assets/img/border.png'),
      buttonLft: require('../../assets/img/addChance.png'),
      buttonRight: require('../../assets/img/again.png'),
      active: 1,
      allList: [],
      loading: false,
      finished: false,

      listTop: [{
        value: '排 名'
      }, {
        value: '头 像'
      }, {
        value: '昵 称'
      }, {
        value: '分 数'
      }, {
        value: '用 时'
      }],

      listTop2: [{
        value: '日 期'
      }, {
        value: '分 数'
      }, {
        value: '用 时'
      }]
    }
  },

  computed: {},

  mounted() {
    this.onLoad()
  },

  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.allList.push(this.allList.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.allList.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.warpper {
  width: 100%;
  height: 100%;
  position: relative;
  .logos{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .buttonTop{
    position: relative;
    width: 80%;
    display: inline-block;
    margin: 2rem 10% 1rem 10%;
    .buttonBorder{
      width: 100%;
    }
    .buttonMain{
      position: absolute;
      left: -7%;
      top: -35%;
      width: 50%;
    }
    .buttonText{
      width: 53%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      .buttonTextLeft{
        width: 50%;
        height: 100%;
        display: inline-block;
        padding: 20px 0 0 0;
        box-sizing: border-box;
        .textTop{
          color: #fff;
          font-size: 12px;
        }
        .textBtn{
          color: #03f9fc;
          font-size: 16px;
        }
      }
      .buttonTextRight{
        width: 50%;
        height: 100%;
        display: inline-block;
        padding: 20px 0 0 0;
        box-sizing: border-box;
        .textTop{
          color: #fff;
          font-size: 12px;
        }
        .textBtn{
          color: #03f9fc;
          font-size: 16px;
          span{
            font-size: 12px;
          }
        }
      }
    }
  }
  .buttonMin{
    width: 80%;
    display: inline-block;
    margin: 0 10%;
    .buttonMinLeft, .buttonMinRight{
      width: 50%;
      display: inline-block;
      div{
        width: 100%;
      }
    }
  }
  .listBtn{
    width: 80%;
    display: inline-block;
    margin: 1rem 10% 0 10%;
    background-color: rgba(#1064c2, 0.2);

    .listAllTop{
      width: 100%;
      display: flex;
      p{
        flex: 1;
        text-align: center;
        color: #1064c2;
      }
    }
  }
}

</style>
