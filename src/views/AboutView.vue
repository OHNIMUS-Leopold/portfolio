<script setup lang="ts">
import { gsap } from "gsap";
    
import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
    
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(Flip,ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase);


document.addEventListener("DOMContentLoaded", function() {
  
  gsap.defaults({ease: "none", duration: 2});

  const tl = gsap.timeline();
  tl.from("#vert", {xPercent: 100, duration: 1}); // Animate from the right

  // Create a ScrollTrigger to trigger the animation
  let sections = gsap.utils.toArray(".slide");
      
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-sliders",
      pin: ".main",
      pinSpacing: true,
      scrub: 1,
      end: "+=1000",
      markers: true,
    }
  });

  gsap.to('.next-block',{
    scrollTrigger:{
      trigger:'.next-block',
      pinnedContainer: ".main",
      start:'top 100%',
      scrub: 1,
      toggleActions: 'play none reset none',
      markers: true,
    }
  });
});

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