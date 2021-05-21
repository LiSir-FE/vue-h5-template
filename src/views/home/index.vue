<!-- home -->
<template>
  <div class="warpper">
    <div class="onePage">欢迎页</div>
    <div class="button">
      <van-icon :name="imgSrc" color="#ee0a24" class="icon" />运联创新中心
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      imgSrc: require('../../assets/img/logo.png')
    }
  },

  computed: {},

  mounted() {
  },

  methods: {
  }
}
</script>
<style lang="scss" scoped>
.warpper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;

  .button {
    position: fixed;
    bottom: 5px;
    left: 0;
    width: 100%;
    text-align: center;
    color: black;
    .icon {
      top: 1px;
    }
  }
}
.my-swipe{
  width: 100%;
  height: 100%;
}

.my-swipe .van-swipe-item {
  color: #000;
  font-size: 20px;
  height: 100%;
  text-align: center;
  background-color: whitesmoke;
}

</style>
