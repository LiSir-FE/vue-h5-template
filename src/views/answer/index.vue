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
          <div class="textBtn">{{ answerNum }}/10</div>
        </div>
        <div class="buttonTextRight">
          <div class="textTop">已用时</div>
          <div class="textBtn">{{ answerTime }} <span>秒</span> </div>
        </div>
      </div>
    </div>

    <van-swipe class="my-swipe" :loop="false" :show-indicators="false" ref="vanSwipe">
       <van-swipe-item v-for="(item, index) in answer" :key="index">
          <div class="ansewerTitle">
            <p class="ansewerTitlep1">第<span>{{ index + 1 }}</span>题</p>
            <p class="ansewerTitlep2">{{ item.title }}</p>
          </div>
         <div>
         <div style="line-height: 1.5rem">
           <div v-for="items in item.option" :key="items.value" @click="optionsClick(items, index, item.correct)" class="answerOption">
             <div class="answerOptionL">{{ items.value }}</div>
             <div class="answerOptionR">{{ items.label }}</div>
           </div>
         </div>
       </div>
       </van-swipe-item>
    </van-swipe>

    <van-overlay :show="show" @click="show = false">
      <div class="content">
        <van-image v-if="ynflag" :src="yes" class="sharImg"/>
        <van-image v-else :src="no" class="sharImg"/>
      </div>
    </van-overlay>
  </div>
</template>

<script>

import globalVue from '@/utils/global'
import answerList from '@/utils/json'
import { loginService } from '@/service/loginService'

export default {

  data() {
    return {
      show: globalVue.show,
      ynflag: false,
      logos: require('../../assets/img/logos.png'),
      main: require('../../assets/img/main.png'),
      border: require('../../assets/img/border.png'),
      buttonLft: require('../../assets/img/addChance.png'),
      buttonRight: require('../../assets/img/again.png'),
      yes: require('../../assets/img/yes.png'),
      no: require('../../assets/img/no.png'),
      answerNum: 0, // 答对数量
      answerTime: 0, // 答对时间
      timer: '',
      answer: answerList.answerList, // 数据
      answersList: [] // 提交数据
    }
  },

  computed: {},
  beforeDestroy() {
    clearInterval(this.timer)
  },
  mounted() {
    this.timer = setInterval(this.addTime, 1000)
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

  methods: {
    optionsClick(items, index, correct) {
      // eslint-disable-next-line eqeqeq
      if (items.value == correct) {
        this.answerNum++
        this.show = true
        this.ynflag = true
        setTimeout(() => {
          this.show = false
          this.$refs.vanSwipe.next()
        }, 200)
      } else {
        this.show = true
        setTimeout(() => {
          this.show = false
          this.ynflag = false
          this.$refs.vanSwipe.next()
        }, 200)
      }
      if (index + 1 >= this.answer.length) {
        loginService.postAnswerGameSaveAnswer({
          nickName: globalVue.userInfo.nickname,
          headImg: globalVue.userInfo.headimgurl,
          score: this.answerNum * 10,
          useTime: this.answerTime,
          userId: globalVue.userInfo.unionid
        }).then(res => {
          clearInterval(this.answerTime)
          this.$router.push({ name: 'RankingList' })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    addTime() {
      this.answerTime++
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.sharImg {
  width: 220px;
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
    text-align: center;
    //background-color: #39a9ed;
    .ansewerTitle{
      .ansewerTitlep1{
        line-height: 10px;
      }
      .ansewerTitlep2{
        line-height: 20px;
        display: inline-block;
        text-align: left;
        width: 100%;
      }

    }
  }
  .ansewerTitle{
    width: 80%;
    display: inline-block;
    height: auto;
    margin: 0 10% 20px 10%;
    font-size: 14px;
    background-color: rgba(#1064c2, 0.2);
    padding: 10px 20px;
    box-sizing: border-box;
    color: #03f9fc;
    p{
      line-height: 12px;
      text-align: left;
      span{
        font-size: 18px;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
  }
  .answerOption{
    width: 80%;
    height: 70px;
    display: inline-block;
    margin: 0 10%;
    background: url("../../assets/img/border.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    line-height: 0px;
    .answerOptionL{
      width: 30%;
      font-size: 18px;
      float: left;
      color: #03f9fc;
      line-height: 70px;
    }
    .answerOptionR{
      width: 60%;
      float: left;
      font-size: 12px;
      color: #03f9fc;
      line-height: 70px;
      text-align: left;
      overflow: hidden;
      height: 100%;
    }
  }
}

</style>

