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
    <font-awesome-icon :icon="['fas', 'chevron-left']" v-else class="disabled" />
    <div>
      <p v-for="num in numbOfPages" @click="changePage(num)" :class="{ selected: num === page }">
        {{ num }}
      </p>
    </div>
    <font-awesome-icon
      :icon="['fas', 'chevron-right']"
      @click="changePage(page + 1)"
      v-if="page < numbOfPages"
    />
    <font-awesome-icon :icon="['fas', 'chevron-right']" v-else class="disabled" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
}
section div {
  display: flex;
}
p {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
}
svg {
  cursor: pointer;
}
.selected {
  background-color: black;
  color: white;
}
.disabled {
  color: var(--lightGrey);
  cursor: auto;
}
</style>
