<!-- home -->
<template>
  <div class="app-container">
    <div class="warpper">
      <van-image width="14em" fit="contain" :src="logos" class="logos"/>
      <div class="summitLogo">
        <van-image :src="main" />
      </div>
      <div class="button">
        <div class="buttonLeft" @click="buttonLeft"><van-image :src="buttonLft" /></div>
        <div class="buttonRight" @click="buttonRght"><van-image :src="buttonRight" /></div>
      </div>
      <div class="rules">
        <p class="gameRules">游戏规则</p>
        1. 点击「开始答题」，答对10道题目即通关。<br>
        2. 排行榜以通关时长排序，作答速度越快排位越高。<br>
        3. 排行榜每日00:00更新，截至23:59排位最高者获
        得当日福利。<br>
        4. 每天有3次挑战机会。做任务可获额外答题机会。
      </div>
    </div>
  </div>

</template>

<script>

export default {

  data() {
    return {
      logos: require('../../assets/img/logos.png'),
      main: require('../../assets/img/main.png'),
      buttonLft: require('../../assets/img/buttonLeft.png'),
      buttonRight: require('../../assets/img/buttonRight.png')
    }
  },

  computed: {},

  mounted() {
  },

  methods: {
    buttonLeft() {
      console.log('查看排行榜')
      this.$router.push({ name: 'RankingList' })
    },
    buttonRght() {
      this.$router.push({ name: 'Answer' })
      console.log('开始答题')
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
  .summitLogo{
    display: inline-block;
    width: 80%;
    margin: 2rem 10% 0.7rem 10%;
    box-sizing: border-box;
  }
  .button{
    display: inline-block;
    width: 80%;
    margin: 0 10%;
    .buttonLeft{
      display: inline-block;
      width: 50%;
      height: 100%;
    }
    .buttonRight{
      display: inline-block;
      width: 50%;
      height: 100%;
    }
  }
  .rules{
    display: inline-block;
    width: 80%;
    height: auto;
    line-height: 20px;
    font-size: 12px;
    margin: 0.5rem 10% 0 10%;
    color: #fff;
    //background-color: #1064c2;
    background-color: rgba(#1064c2, 0.2);
    padding: 15px;
    box-sizing: border-box;
    .gameRules{
      display: inline-block;
      width: 100%;
      line-height: 0;
      font-size: 16px;
      color: #03f9fc;
    }
  }
}

</style>
