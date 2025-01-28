<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['sort', 'pricemin', 'pricemax', 'title', 'page', 'numbOfPages'])
console.log(props)

const changePage = (num) => {
  const queries = { ...props }
  delete queries.numbOfPages
  queries.page = num
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <section>
    <font-awesome-icon
      :icon="['fas', 'chevron-left']"
      @click="changePage(page - 1)"
      v-if="page > 1"
    />
    <div>
      <p v-for="num in numbOfPages" @click="changePage(num)">
        {{ num }}
      </p>
    </div>
    <font-awesome-icon
      :icon="['fas', 'chevron-right']"
      @click="changePage(page + 1)"
      v-if="page < numbOfPages"
    />
  </section>
</template>

<style scoped></style>
