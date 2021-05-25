<template>
  <div id="app">
    <div class="audio" @click="changeOn" :class="isOff ? 'isOff' : 'isOn'">
      <audio :src="mus" class="media-audio" loop autoplay ref="MusicPlay" id="audio"></audio>
    </div>
    <router-view v-if="IsRouterAlive" v-wechat-title="$route.meta.title"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      IsRouterAlive: true,
      isOff: true,
      mus: 'https://resource.wetuc.com/g/img/start.mp3'
    }
  },
  methods: {
    reload() {
      this.IsRouterAlive = false
      this.$nextTick(() => {
        this.IsRouterAlive = true
      })
    },
    changeOn(){
      let oAudio = document.querySelector("#audio");
      if(this.isOff){
        oAudio.play();//让音频文件开始播放
      }else{
        oAudio.pause();//让音频文件暂停播放
      }
      this.isOff = !this.isOff;
    },
    audioAutoPlay() {
      let audio = document.getElementById('audio');
      this.isOff = false;
      audio.play();
      document.removeEventListener('touchstart',this.audioAutoPlay);
    }
  },
  mounted() {
    // 自动播放音乐效果，解决微信自动播放问题
    document.addEventListener('touchstart',this.audioAutoPlay,false);
    document.addEventListener('WeixinJSBridgeReady', this.audioAutoPlay,false);
    let oAudio = document.querySelector("#audio");
    oAudio.onended = function () {//播放完毕，重新循环播放
      oAudio.load();
      oAudio.play();
    }
  }
}

</script>
<style lang="scss">
.isOn{
  width: 28px;
  height: 28px;
  position: fixed;
  z-index: 2000;
  left: 10px;
  top: 10px;
  -webkit-animation: rotating 1.2s linear infinite;
  animation: rotating 1.2s linear infinite;
  //background-color: #fff;
  background: url("https://resource.wetuc.com/g/img/on.png") 0 0 no-repeat;
  background-size:100%;
}

.isOff{
  width: 28px;
  height: 28px;
  position: fixed;
  z-index: 2000;
  left: 10px;
  top: 10px;
  //background-color: #000;
  background: url("https://resource.wetuc.com/g/img/off.png") 0 0 no-repeat;
  background-size:100%;
}
</style>
