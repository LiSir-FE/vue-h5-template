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

    <van-swipe class="my-swipe" :loop="false" :show-indicators="false" ref="vanSwipe">
       <van-swipe-item v-for="(item, index) in answer">
          <div>
            <p>第{{ index + 1 }}题</p>
            <p>{{ item.title }}</p>
          </div>
         <div>
         <div v-for="items in item.option" @click="optionsClick(items, item.correct)">
           <p>{{ items.value }}</p>
           <p>{{ items.label }}</p>
         </div>
       </div>
       </van-swipe-item>
    </van-swipe>
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
      answerNum: 0, // 答对数量
      answerTime: 0, // 答对时间
      answer: [{
        title: '（2012年）第一届运联峰会举办于哪一年？',
        option: [{
          value: 'A',
          label: '2011'
        }, {
          value: 'B',
          label: '2012'
        }, {
          value: 'C',
          label: '2013'
        }],
        correct: 'B'
      }, {
        title: '运联峰会坚持的的理念是什么？',
        option: [{
          value: 'A',
          label: '察于未萌，投资未来'
        }, {
          value: 'B',
          label: '让世界重新看见物流'
        }, {
          value: 'C',
          label: '思想驱动变革，创新改变行业'
        }],
        correct: 'C'
      }]
    }
  },

  computed: {},

  mounted() {
  },

  methods: {
    optionsClick(items, correct) {
      // eslint-disable-next-line eqeqeq
      if (items.value == correct) {
        console.log('答对')
        this.$refs.vanSwipe.next()
      } else {
        console.log('答错')
        this.$refs.vanSwipe.next()
      }
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
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}

</style>

