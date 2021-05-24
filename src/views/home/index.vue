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
    <van-overlay :show="$store.state.isShow" @click="$store.state.isShow = false">
      <div class="container">
        <van-image :src="share" class="sharImg"/>
        <p>分享至朋友圈,<br>可额外获得1次答题机会!</p>
      </div>
    </van-overlay>
  </div>

</template>

<script>
import { loginService } from '@/service/loginService'
import { Dialog } from 'vant'
import store from '@/store'
import defaultSettings from '@/config'
export default {

  data() {
    return {
      show: store.state.isShow,
      resNums: store.getters.getShareNum,
      userInfo: JSON.parse(store.getters.getUserInfo),
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
    this.getAnswerGameCheckCount()
  },
  methods: {
    buttonLeft() {
      this.$router.push({ name: 'RankingList' })
    },
    buttonRght() {
      let that = this
      loginService.getAnswerGameCheckCount({ userId: store.getters.getToken }).then(res => {
        if (Number(store.getters.getShareNum) > Number(res.data.datas)) {
          that.$router.push({ path: '/answer' })
        } else {
          Dialog.confirm({
            message: '答题次数已用完,分享即可获得答题次数!'
          }).then(() => {
            store.state.isShow = !store.state.isShow
          }).catch((err) => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getAnswerGameCheckCount() {
      let that = this;
      loginService.getAnswerGameCheckCount({ userId: store.getters.getToken }).then(res => {
        that.resNums = res.data.datas
        if(res.data.datas == '0') {
          store.commit('setShareNum', 3)
        }
        that.$nextTick(() => {
          const share = {
            hasGet: true,
            title: '我是' + JSON.parse(store.getters.getUserInfo).nickname + '，邀请您挑战物流知识竞答',
            desc: '物流知识登顶之战战力通关',
            url: defaultSettings.baseUrl + '/home',
            // img: 'https://qy.wetuc.com/assets/images/02.jpg',
            imageUrl: JSON.parse(store.getters.getUserInfo).headimgurl
          }
          const params = {
            type: 20, typeId: store.getters.getToken
          }
          loginService.getWxJssdk().then(res => {
            loginService.getWxShare(share, share.title, true, params)
          })
        })
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
