<template>
  <div id="app">
    <router-view :title="$route.meta.title"/>
  </div>
</template>
<script>
export default {
  name: 'App'
}

</script>
<style lang="scss"></style>
