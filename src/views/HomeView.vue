<template>
    
  <!-- <div class="fond">
    <div class="blob-cont">
        <div class="yellow blob"></div>
        <div class="red blob"></div>
        <div class="green blob"></div>
    </div>
  </div> -->






  <svg class="hidden">
    <filter id='noiseFilter'>
        <feTurbulence 
        type='fractalNoise' 
        baseFrequency='0.6' 
        stitchTiles='stitch'/>
        <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
            <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
    </filter>
  </svg>

</template>









<style scoped>



.fond {
  height: 100vh;
  width: 100vw;
  margin: 0;
  background-color: #F0DBA5;
  display: flex;
  justify-content: flex-end;
}


.fond::before,
.fond::after {
  position: absolute;
  left: 0;
  top: 0;
  content: '';
  width: 100%;
  height: 100%;
  z-index: 1;

  opacity: 40%;
}

.fond::before {
  /* background: black;
  opacity: 0.12; */
  background: #878787;
  filter: url(#noiseFilter);
}


/* Blobs */
.blob-cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  height: 500px;
  width: 500px;
  position: relative;
  right: 5em;
}


.blob {
  border-radius: 100px;
  filter: blur(60px);
}

.yellow {
  background-color: #EDB74D;
  position: absolute;
  top: 200px;
  left: 100px;
  height: 200px;
  width: 200px;
  
  animation: yellow-anim 8s infinite ease;
}

.green {
  background-color: #6FB18A;
  position: absolute;
  top: 80px;
  right: -20px;
  height: 200px;
  width: 250px;
  
  animation: green-anim 8s infinite ease;
}

.red {
  background-color: #EB6666;
  position: absolute;
  right: 0;
  top: 300px;
  height: 250px;
  width: 200px;
  
  animation: red-anim 8s infinite linear;
}

@keyframes yellow-anim {
  0% {top: 200px; left: 100px; transform: scale(1);}
  30% {top: 300px; left: 150px; transform: scale(1.2);}
  60% {top: 100px; left: 200px; transform: scale(1.3);}
  100% {top: 200px; left: 100px; transform: scale(1);}
}

@keyframes green-anim {
  0% {top: 80px; right: -20px; transform: scale(1.2);}
  30% {top: 300px; right: -20px;transform: scale(1);}
  60% {top: 200px; right: 100px;transform: scale(1);}
  100% {top: 80px; right: -20px; transform: scale(1.2);}
}

@keyframes red-anim {
  0% {top: 250px; right: 0px; transform: scale(1);}
  30% {top: 150px; right: 150px;transform: scale(1.4);}
  60% {top: 250px; right: 100px;transform: scale(1);}
  100% {top: 250px; right: 0px; transform: scale(1);}
}



</style>