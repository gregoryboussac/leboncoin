<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import OfferCard from '@/components/OfferCard.vue'

const offersList = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar`,
    )
    // console.log(data.data)
    offersList.value = data.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main class="container">
    <p>Des millions de petites annonces et autant d'occasions de se faire plaisir</p>
    <div class="entete">
      <img src="/src/assets/logo/onde-corail.svg" alt="cloud" />
      <p>C'est le moment de vendre</p>
      <button><font-awesome-icon :icon="['far', 'plus-square']" />Déposer une annonce</button>
      <img src="/src/assets/logo/feuille-bleue.svg" alt="flower" />
    </div>
    <div class="offersList">
      <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" />
    </div>
  </main>
</template>

<style scoped>
.offersList {
  border: solid purple 1px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
main > p {
  margin-bottom: 30px;
  text-align: center;
}
.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--orangeLight);
  margin-bottom: 30px;
  font-weight: bold;
}
.entete button {
  background-color: var(--orange);
  color: white;
  padding: 7px 15px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  margin-right: 20px;
  cursor: pointer;
}
</style>
