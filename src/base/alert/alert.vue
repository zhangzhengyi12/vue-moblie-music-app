<template>
  <div class="alert">
    {{ text }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: {}
    }
  }
}
</script>

 <style lang="stylus" scoped>
 .alert 
   display: inline-block
   width: 200px
   height: 20px
   line-height: 20px
   position: fixed
   background-color: #ccc
   color: #fff
   z-index: 888
   font-size: 12px
   left: 50%
   margin-left: -100px
   border-radius: 4px
   text-align : center
   top: 60vh;
</style>



