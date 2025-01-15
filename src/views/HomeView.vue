<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import OfferCard from '@/components/OfferCard.vue'
import TimeToSell from '@/components/TimeToSell.vue'

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
  <main>
    <p class="container" v-if="offersList.length === 0">Chargement en Cours ...</p>
    <div class="container" v-else>
      <p>Des millions de petites annonces et autant d'occasions de se faire plaisir</p>

      <TimeToSell />

      <div class="offersList">
        <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
}
.container > p {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}
.offersList {
  border: solid purple 1px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
