<script setup lang="ts">



</script>

<template>
  <div class="main">
    <div class="horizontal-sliders">
      <div class="slide h-screen bg-red-500" id="rouge"></div>
      <div class="slide h-screen bg-green-500" id="vert"></div>
    </div>
   
    <div class="next-block">
      <div class="h-screen bg-purple-500" id="purple"></div>
    </div>
  </div>
    
</template>


<style scoped>



.main{
  overflow-x:hidden;
}
.horizontal-sliders{
  display:flex;
  flex-wrap: nowrap;
  width: 200%;
  overflow-x:hidden;
}
.slide{
  height:100vh;
  width:100%;
}
.next-block{
  height:100vh;
}

</style>