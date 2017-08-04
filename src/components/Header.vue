<template>
  <header>
    <slot name="text">Header</slot>
  </header>
</template>

<script>
export default {
  data () {
    return {
      title: '首页',
      content: '内容'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
header {
  height: 44px;
  line-height: 43px;
  border-bottom: 1px solid #dfdfdf;
  font-size: 18px;
  color: #333;
  background-color: #f5f5f5;
  text-align: center;
}
</style>
