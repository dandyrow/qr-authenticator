<template>
  <div class="scan-box">
    <h6>Place the QR code presented on your computer inside this box</h6>
  </div>
</template>

<style scoped>
h6 {
  text-align: center;
  margin: auto 1rem;
}

.scan-box {
  content: '';
  display: grid;
  place-items: center;
  position: absolute;
  width: 75vw;
  height: 75vw;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: visible;
  border: 2px solid #fff;
  border-radius: 5px;
  box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.6);
}

@media (orientation: landscape) {
  .scan-box {
    top: 50%;
    width: 50vh;
    height: 50vh;
  }
}
</style>