<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue'
</script>

<template>
  <div class="entete">
    <img src="/src/assets/logo/onde-corail.svg" alt="cloud" />
    <div>
      <p>C'est le moment de vendre</p>
      <BtnPublishOffer />
    </div>
    <img src="/src/assets/logo/feuille-bleue.svg" alt="flower" />
  </div>
</template>

<style scoped>
.entete {
  display: flex;
  background-color: var(--orangeLight);
  margin-bottom: 40px;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  border-radius: 20px;
  width: 100%;
}
.entete > div {
  display: flex;
  align-items: center;
  gap: 20px;
}
p {
  font-size: 20px;
  font-weight: bold;
}
img:first-child {
  border-radius: 20px 0 0 20px;
}
img:last-child {
  border-radius: 0px 20px 20px 0px;
}
</style>
