<script setup>
import axios from 'axios'
import { onMounted, ref, watchEffect } from 'vue'
import OfferCard from '@/components/OfferCard.vue'
import TimeToSell from '@/components/TimeToSell.vue'
import Filters from '@/components/Filters.vue'
import Pagination from '@/components/Pagination.vue'

const props = defineProps(['sort', 'pricemin', 'pricemax', 'title', 'page'])
// console.log('props >>>>', props)

const offersList = ref([])
const numbOfPages = ref(1)

onMounted(() => {
  watchEffect(async () => {
    try {
      let priceFilters = ''

      if (props.pricemax) {
        priceFilters += `&filters[price][$lte]=${props.pricemax}`
      }
      if (props.pricemin) {
        priceFilters += `&filters[price][$gte]=${props.pricemin}`
      }

      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar${priceFilters}&sort=${props.sort}&filters[title][$containsi]=${props.title}&pagination[page]=${props.page}&pagination[pageSize]=10`,
      )
      console.log('reotur serveur >>>', data.meta.pagination.pageCount)

      offersList.value = data.data
      numbOfPages.value = data.meta.pagination.pageCount
    } catch (error) {
      console.log(error)
    }
  })
})
</script>

<template>
  <main>
    <p class="container" v-if="offersList.length === 0">Chargement en Cours ...</p>
    <div class="container" v-else>
      <Filters :sort="sort" :pricemin="pricemin" :pricemax="pricemax" :title="title" :page="page" />

      <p>Des millions de petites annonces et autant d'occasions de se faire plaisir</p>

      <TimeToSell />

      <div class="offersList">
        <OfferCard v-for="offer in offersList" :key="offer.id" :offerInfos="offer" />
      </div>
      <pagination
        :sort="sort"
        :pricemin="pricemin"
        :pricemax="pricemax"
        :title="title"
        :page="page"
        :numbOfPages="numbOfPages"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--headerHeight) - var(--footerHeight));
}
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
  /* border: solid purple 1px; */
  display: flex;
  flex-wrap: wrap;
  gap: 30px 15px;
}
</style>
