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
    <van-overlay :show="show" @click="show = false">
      <div class="container">
        <van-image :src="share" class="sharImg"/>
        <p>分享至朋友圈,<br>可额外获得1次答题机会!</p>
      </div>
    </van-overlay>
  </div>

</template>

<script>
import { loginService } from '@/service/loginService'
import globalVue from '@/utils/global'
import { Dialog } from 'vant'
export default {

  data() {
    return {
      show: globalVue.show,
      share: require('../../assets/img/share.png'),
      logos: require('../../assets/img/logos.png'),
      main: require('../../assets/img/main.png'),
      buttonLft: require('../../assets/img/buttonLeft.png'),
      buttonRight: require('../../assets/img/buttonRight.png')
    }
  },

  computed: {
  },

  mounted() {
    const share = {
      hasGet: true,
      title: '123123123',
      desc: '12312312312',
      img: require('../../assets/img/logos.png')
    }
    const params = {
      type: 20, typeId: globalVue.userInfo.unionid
    }
    loginService.getWxJssdk().then(res => {
      loginService.getWxShare(share, '123123', true, params)
    })
  },

  watch:{
    'globalVue.show':{ //监听的对象
      deep:true, //深度监听设置为 true
      handler:function(newV,oldV){
        console.log('watch中：',newV)
      }
    }
  },

  methods: {
    buttonLeft() {
      this.$router.push({ name: 'RankingList' })
    },
    buttonRght() {
      loginService.getAnswerGameCheckCount({ userId: globalVue.userInfo.unionid }).then(res => {
        if (globalVue.answerNums >= res.data.datas) {
          this.$router.push({ name: 'Answer' })
        } else {
          Dialog.confirm({
            message: '答题次数已用完,分享即可获得答题次数!'
          }).then(() => {
            this.show = true
          }).catch((err) => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  p{
    font-size: 24px;
    color: #03f9fc;
    line-height: 40px;
    display: inline-block;
    width: 100%;
    text-align: center;
    vertical-align: middle;
  }
}
.sharImg {
  position: absolute;
  transform: rotate(-20deg);
  top: 5px;
  right: 10px;
  width: 150px;
}
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
