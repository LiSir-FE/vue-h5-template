<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  destroyed() {
    window.removeEventListener('popstate', this.popstate, false)
  },
  methods: {
    popstate() {
      // eslint-disable-next-line no-undef
      wx.closeWindow()
    }
  }
}
</script>
<style lang="scss"></style>
