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
          <div class="textBtn">{{ answerNum }}/10</div>
        </div>
        <div class="buttonTextRight">
          <div class="textTop">已用时</div>
          <div class="textBtn">{{ answerTime }} <span>秒</span> </div>
        </div>
      </div>
    </div>

    <div class="buttonMin">
      <div class="buttonMinLeft" @click="share">
        <van-image :src="buttonLft" />
      </div>
      <div class="buttonMinRight" @click="again">
        <van-image :src="buttonRight" />
      </div>
    </div>

    <div class="listBtn">
      <van-tabs v-model="active" @change="activeChange">
        <van-tab title="排行榜">
          <div class="listAllTop listAllTops">
            <p v-for="item in listTop" :key="item.value">{{ item.value }}</p>
          </div>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text='没有更多了' @load="onLoad" :immediate-check='true' :offset='30'>
              <div v-for="(item, index) in allList" :key="index" class="wanListP">
                <p class="wanListPp">{{ index + 1 }}</p>
                <p class="wanListPps"><van-image round width="1rem" :src="item.headImg" /></p>
                <p class="wanListPp wanListPpsss">{{ item. nickName }}</p>
                <p class="wanListPp">{{ item. score }}<span>分</span></p>
                <p class="wanListPp">{{ item. useTime }}<span>秒</span></p>
              </div>
            </van-list>
          </van-pull-refresh>


        </van-tab>
        <van-tab title="我的战绩">
          <div class="listAllTop">
            <p v-for="item in listTop2" :key="item.value">{{ item.value }}</p>
          </div>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check='true' :offset='30'>
              <div v-for="(item, index) in allLists" :key="index" class="wanListP">
                <p class="wanListPp">{{ (item.createTime) | formatDates }}</p>
                <p class="wanListPp">{{ item. score }}<span>分</span></p>
                <p class="wanListPp">{{ item. useTime }}<span>秒</span></p>
              </div>
            </van-list>
          </van-pull-refresh>

        </van-tab>
      </van-tabs>
    </div>

    <van-overlay :show="$store.state.isShow" @click="$store.state.isShow = false">
      <div class="container">
        <van-image :src="shares" class="sharImg"/>
        <p>分享至朋友或朋友圈,<br>可额外获得1次答题机会!</p>
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

      show: !store.state.isShow,
      answerNum: '',
      answerTime: '',
      logos: 'https://resource.wetuc.com/g/img/logos.png', //require('../../assets/img/logos.png'),
      shares: 'https://resource.wetuc.com/g/img/share.png', //require('../../assets/img/share.png'),
      // main: 'https://resource.wetuc.com/g/img/main.png', //require('../../assets/img/main.png'),
      main: 'https://resource.wetuc.com/g/img/carloadLogos.png', //require('../../assets/img/main.png'),
      border: 'https://resource.wetuc.com/g/img/border.png', //require('../../assets/img/border.png'),
      buttonLft: 'https://resource.wetuc.com/g/img/addChance.png', //require('../../assets/img/addChance.png'),
      buttonRight: 'https://resource.wetuc.com/g/img/again.png', //require('../../assets/img/again.png'),
      active: 0,
      allList: [],
      allLists: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: {
        pageNum: 1,
        pageSize: 20
      },
      pages: {
        pageNum: 1,
        pageSize: 20
      },
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

  computed: {
  },

  filters: {
    formatDates (value) {
      let date = new Date(Number(value));
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      // let h = date.getHours();
      // h = h < 10 ? ('0' + h) : h;
      // let m = date.getMinutes();
      // m = m < 10 ? ('0' + m) : m;
      // let s = date.getSeconds();
      // s = s < 10 ? ('0' + s) : s;
      // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      return y + '-' + MM + '-' + d + ' ';
    }
  },

  mounted() {
    store.state.isShow = false;
    this.getAnswerGameGetOne()
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(value, oldvalue) {
        console.log('val=========================', value, oldvalue)
      }
    }
  },

  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        if (this.refreshing) {
          this.allList = [];
          this.allLists = [];
          this.refreshing = false;
        }
        if(this.active == 0) {
          this.getAnswerGameAllUserRanking()
        } else {
          this.getAnswerGameUserRanking()
        }
        // 加载状态结束
        this.loading = true
      }, 500)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.allList = [];
      this.allLists = [];
      this.page.pageNum= 1
      this.pages.pageNum= 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    activeChange(item) {
      // if (item == 0) {
      //   this.getAnswerGameAllUserRanking()
      // } else {
      //   this.getAnswerGameUserRanking()
      // }
      this.onRefresh()
    },
    // 查询用时和分数
    getAnswerGameGetOne() {
      loginService.getAnswerGameGetOne({
        userId: store.getters.getToken
      }).then(res => {
        this.answerNum = res.data.datas.score / 10
        this.answerTime = res.data.datas.useTime
        this.$nextTick(() => {
          const share = {
            hasGet: true,
            title: '挑战物流知识，我用'+ this.answerTime +'秒通关。你敢来挑战吗？',
            desc: '物流知识登顶之战',
            brief: '物流知识登顶之战',
            url: defaultSettings.baseUrl + '/home',
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
    },
    // 查询全部排名
    getAnswerGameAllUserRanking() {
      loginService.getAnswerGameAllUserRanking({
        pageNo: this.page.pageNum,
        pageSize: this.page.pageSize
      }).then(res => {
        this.loading = false;
        this.allList = this.allList.concat(res.data.datas.datas)
        this.page.pageNum++
        if(this.page.pageNum > res.data.datas.totalPage) {
          this.finished = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询我的排名
    getAnswerGameUserRanking() {
      this.allList = []
      loginService.getAnswerGameUserRanking({
        userId: store.getters.getToken,
        pageNo: this.pages.pageNum,
        pageSize: this.pages.pageSize
      }).then(res => {
        this.loading = false;
        this.allLists = this.allLists.concat(res.data.datas.datas)
        this.pages.pageNum++
        if(this.pages.pageNum > res.data.datas.totalPage) {
          this.finished = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    share() {
      store.state.isShow = !store.state.isShow
    },
    again() {
      loginService.getAnswerGameCheckCount({ userId: store.getters.getToken }).then(res => {
        if (Number(store.getters.getShareNum) > Number(res.data.datas)) {
          this.$router.push({ name: 'Answer' })
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
.wanListP{
  display: flex;
  width: 100%;
  font-size: 12px;
  color: #fff;
  p{
    flex: 1;
    text-align: center;
    overflow: hidden;
    font-size: 12px;
    span{
      font-size: 10px;
    }
  }
  .wanListPpsss{
    flex-grow: 3;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .wanListPps{
    .van-image{
      border: 2px solid #fff;
    }
  }
  .wanListPp{
    line-height: 35px;
  }
}
.wanListP:nth-child(-n+3){
  //font-size: 24px;
  p{
    color: #03f9fc
  }
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
  .listBtn{
    width: 80%;
    display: inline-block;
    margin: 1rem 10% 0 10%;
    background-color: rgba(#1064c2, 0.2);

    .listAllTop{
      width: 100%;
      display: flex;
      background-color: #1064c2;
      p{
        flex: 1;
        text-align: center;
        color: #03f9fc;
      }
    };
    .listAllTops{
      p:nth-child(3) {
        flex-grow: 3;
      }
    }
  }
}

</style>
